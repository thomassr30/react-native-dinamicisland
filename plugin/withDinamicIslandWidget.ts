import {
  ConfigPlugin,
  IOSConfig,
  withXcodeProject,
} from '@expo/config-plugins';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Automatically creates and configures the Widget Extension target
 * This eliminates the need for manual Xcode setup
 */
export const withDinamicIslandWidget: ConfigPlugin = (config) => {
  return withXcodeProject(config, async (config) => {
    const xcodeProject = config.modResults;
    const projectRoot = config.modRequest.projectRoot;

    // Paths
    const iosPath = path.join(projectRoot, 'ios');
    const widgetPath = path.join(iosPath, 'DinamicIslandWidget');
    const modulePath = path.join(projectRoot, 'node_modules', 'react-native-dinamicisland');

    // Create Widget directory
    if (!fs.existsSync(widgetPath)) {
      fs.mkdirSync(widgetPath, { recursive: true });
    }

    // Copy Widget files
    const widgetFiles = [
      'DinamicIslandWidget.swift',
      'DinamicIslandWidgetBundle.swift',
    ];

    for (const file of widgetFiles) {
      const sourcePath = path.join(modulePath, 'ios', 'Widgets', file);
      const destPath = path.join(widgetPath, file);

      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
      }
    }

    // Copy ActivityAttributes to main iOS folder
    const attributesSource = path.join(modulePath, 'ios', 'DinamicIslandActivityAttributes.swift');
    const attributesDest = path.join(iosPath, 'DinamicIslandActivityAttributes.swift');

    if (fs.existsSync(attributesSource)) {
      fs.copyFileSync(attributesSource, attributesDest);
    }

    // Create Widget Info.plist
    const infoPlist = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleDevelopmentRegion</key>
    <string>$(DEVELOPMENT_LANGUAGE)</string>
    <key>CFBundleDisplayName</key>
    <string>DinamicIslandWidget</string>
    <key>CFBundleExecutable</key>
    <string>$(EXECUTABLE_NAME)</string>
    <key>CFBundleIdentifier</key>
    <string>$(PRODUCT_BUNDLE_IDENTIFIER)</string>
    <key>CFBundleInfoDictionaryVersion</key>
    <string>6.0</string>
    <key>CFBundleName</key>
    <string>$(PRODUCT_NAME)</string>
    <key>CFBundlePackageType</key>
    <string>$(PRODUCT_BUNDLE_PACKAGE_TYPE)</string>
    <key>CFBundleShortVersionString</key>
    <string>1.0</string>
    <key>CFBundleVersion</key>
    <string>1</string>
    <key>NSExtension</key>
    <dict>
        <key>NSExtensionPointIdentifier</key>
        <string>com.apple.widgetkit-extension</string>
    </dict>
    <key>NSSupportsLiveActivities</key>
    <true/>
</dict>
</plist>`;

    fs.writeFileSync(path.join(widgetPath, 'Info.plist'), infoPlist);

    // Get bundle identifier from main app
    const appBundleId = IOSConfig.BundleIdentifier.getBundleIdentifier(config);
    const widgetBundleId = `${appBundleId}.DinamicIslandWidget`;

    // Add Widget Extension Target to Xcode project
    const widgetTargetName = 'DinamicIslandWidget';

    // Check if target already exists
    const existingTarget = xcodeProject.getTarget(widgetTargetName);

    if (!existingTarget) {
      // Add new target
      const widgetTarget = xcodeProject.addTarget(
        widgetTargetName,
        'app_extension',
        widgetTargetName,
        `${appBundleId}.${widgetTargetName}`
      );

      // Add source files to target
      const widgetGroup = xcodeProject.addPbxGroup(
        [],
        widgetTargetName,
        widgetTargetName
      );

      // Add Swift files
      widgetFiles.forEach(file => {
        const fileRef = xcodeProject.addFile(
          path.join('DinamicIslandWidget', file),
          widgetGroup,
          { target: widgetTarget.uuid }
        );
      });

      // Add ActivityAttributes to both targets
      const mainTarget = xcodeProject.getFirstTarget();
      xcodeProject.addFile(
        'DinamicIslandActivityAttributes.swift',
        null,
        { target: [mainTarget.uuid, widgetTarget.uuid] }
      );

      // Add Info.plist
      xcodeProject.addFile(
        path.join('DinamicIslandWidget', 'Info.plist'),
        widgetGroup,
        { target: widgetTarget.uuid }
      );

      // Configure build settings
      const configurations = xcodeProject.pbxXCBuildConfigurationSection();
      Object.keys(configurations).forEach(key => {
        const config = configurations[key];
        if (config.buildSettings && config.name) {
          if (key.includes(widgetTarget.uuid)) {
            config.buildSettings.PRODUCT_BUNDLE_IDENTIFIER = widgetBundleId;
            config.buildSettings.INFOPLIST_FILE = 'DinamicIslandWidget/Info.plist';
            config.buildSettings.SWIFT_VERSION = '5.0';
            config.buildSettings.TARGETED_DEVICE_FAMILY = '1,2';
            config.buildSettings.IPHONEOS_DEPLOYMENT_TARGET = '16.1';
          }
        }
      });

      // Add Widget framework dependencies
      xcodeProject.addFramework('WidgetKit.framework', {
        target: widgetTarget.uuid,
        weak: true
      });
      xcodeProject.addFramework('SwiftUI.framework', {
        target: widgetTarget.uuid,
        weak: true
      });
      xcodeProject.addFramework('ActivityKit.framework', {
        target: widgetTarget.uuid,
        weak: true
      });
    }

    return config;
  });
};
