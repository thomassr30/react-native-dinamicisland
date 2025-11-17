import {
  ConfigPlugin,
  withEntitlementsPlist,
  withInfoPlist,
} from '@expo/config-plugins';

/**
 * Configuration options for the Dynamic Island plugin
 */
export type DinamicIslandPluginProps = {
  /** Whether to enable Live Activities (default: true) */
  enableLiveActivities?: boolean;
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
    return config;
  });
};

/**
 * Main Config Plugin for react-native-dinamicisland
 * This plugin automatically configures your Expo app to support Live Activities
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
  props
) => {
  config = withDinamicIslandEntitlements(config, props);
  config = withDinamicIslandInfoPlist(config, props);
  return config;
};

export default withDinamicIsland;
