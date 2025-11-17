import { createRunOncePlugin } from '@expo/config-plugins';
import withDinamicIsland, {
  DinamicIslandPluginProps,
} from './withDinamicIsland';

const pkg = require('../package.json');

/**
 * Expo Config Plugin for react-native-dinamicisland
 * Automatically adds the necessary entitlements and Info.plist entries
 */
export default createRunOncePlugin<DinamicIslandPluginProps>(
  withDinamicIsland,
  pkg.name,
  pkg.version
);
