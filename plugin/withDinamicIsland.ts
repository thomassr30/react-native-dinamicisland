import {
  ConfigPlugin,
  withEntitlementsPlist,
  withInfoPlist,
} from '@expo/config-plugins';
import { withDinamicIslandWidget } from './withDinamicIslandWidget';

/**
 * Configuration options for the Dynamic Island plugin
 */
export type DinamicIslandPluginProps = {
  /** Whether to enable Live Activities (default: true) */
  enableLiveActivities?: boolean;

  /** Whether to automatically create Widget Extension (default: true) */
  autoCreateWidget?: boolean;
};

/**
 * Adds the necessary entitlements for Live Activities to work
 * This configures the app to use ActivityKit and notifications
 */
const withDinamicIslandEntitlements: ConfigPlugin<DinamicIslandPluginProps> = (
  config,
  props
) => {
  return withEntitlementsPlist(config, (config) => {
    if (props.enableLiveActivities ?? true) {
      // Required for sending notifications to Live Activities
      config.modResults['com.apple.developer.usernotifications'] = [
        'alert',
        'badge',
        'sound',
      ];

      // Required for using ActivityKit and Live Activities
      config.modResults['com.apple.developer.activity-types'] = [
        'liveActivities',
      ];
    }
    return config;
  });
};

/**
 * Adds required Info.plist entries for notifications
 * This ensures the user is prompted for notification permissions properly
 */
const withDinamicIslandInfoPlist: ConfigPlugin<DinamicIslandPluginProps> = (
  config,
  _props
) => {
  return withInfoPlist(config, (config) => {
    config.modResults.NSUserNotificationUsageDescription =
      config.modResults.NSUserNotificationUsageDescription ??
      'This app uses notifications to show live activities on your Dynamic Island and lock screen.';

    config.modResults.NSSupportsLiveActivities = true;

    return config;
  });
};

/**
 * Main Config Plugin for react-native-dinamicisland
 * This plugin automatically configures your Expo app to support Live Activities
 * and creates the Widget Extension target automatically
 *
 * @example
 * // In app.json or app.config.ts
 * {
 *   plugins: [
 *     ['react-native-dinamicisland', { enableLiveActivities: true }]
 *   ]
 * }
 */
const withDinamicIsland: ConfigPlugin<DinamicIslandPluginProps> = (
  config,
  props = {}
) => {
  // Apply entitlements and Info.plist configurations
  config = withDinamicIslandEntitlements(config, props);
  config = withDinamicIslandInfoPlist(config, props);

  // Automatically create and configure Widget Extension
  if (props.autoCreateWidget !== false) {
    config = withDinamicIslandWidget(config);
  }

  return config;
};

export default withDinamicIsland;
