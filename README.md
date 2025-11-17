# 🏝️ react-native-dinamicisland

[![npm version](https://img.shields.io/npm/v/react-native-dinamicisland.svg)](https://www.npmjs.com/package/react-native-dinamicisland)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Platform: iOS](https://img.shields.io/badge/Platform-iOS%2016.1+-lightgrey.svg)](https://www.apple.com/ios/)

A powerful React Native library for controlling iOS Dynamic Island through Live Activities. Built with Expo Modules, ActivityKit, and WidgetKit.

## ✨ Features

- 🎯 **Simple API** - Easy-to-use functions for controlling Dynamic Island
- ⚛️ **React Hook** - Built-in `useDynamicIslandActivity` hook for state management
- 🔌 **Auto Configuration** - Expo Config Plugin handles all setup automatically
- 🎨 **Customizable** - Support for titles, subtitles, progress bars, and custom styles
- 📱 **Lock Screen Support** - Activities appear on both Dynamic Island and lock screen
- 🔒 **Type Safe** - Written in TypeScript with full type definitions
- 🚀 **Production Ready** - Well-tested and optimized for performance

## 📋 Requirements

- iOS 16.1 or later
- Expo SDK 51 or later
- React Native 0.74 or later
- Physical device with Dynamic Island (iPhone 14 Pro or newer) for full testing

## 📦 Installation

### ⚡ Automatic Installation (2 minutes)

```bash
# 1. Install the package
npm install react-native-dinamicisland

# 2. Add to your app.json
{
  "expo": {
    "plugins": ["react-native-dinamicisland"]
  }
}

# 3. Prebuild (creates Widget Extension automatically)
npx expo prebuild -p ios --clean

# 4. Run!
npx expo run:ios --device
```

✅ **That's it!** The Config Plugin automatically:
- Creates the Widget Extension target
- Configures all entitlements
- Sets up Info.plist
- Adds all Swift files
- Configures build settings

No Xcode needed! 🎉

## 🚀 Quick Start

### Basic Usage

```typescript
import { startActivity, updateActivity, endActivity } from 'react-native-dinamicisland';

// Start a Live Activity
await startActivity({
  activityId: 'music-player',
  title: 'Now Playing',
  subtitle: 'Artist - Song Title',
  progress: 0.5
});

// Update it
await updateActivity({
  progress: 0.75,
  subtitle: 'New song is playing'
});

// End it
await endActivity(true);
```

### Using the React Hook

```typescript
import React, { useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import { useDynamicIslandActivity } from 'react-native-dinamicisland';

export default function MusicPlayer() {
  const { supported, checkSupport, start, update, end } = useDynamicIslandActivity();

  useEffect(() => {
    checkSupport().then((isSupported) => {
      if (!isSupported) {
        Alert.alert('Not Supported', 'Live Activities require iOS 16.1+ on supported devices.');
      }
    });
  }, []);

  const handlePlayMusic = async () => {
    await start({
      activityId: 'music-player',
      title: 'Now Playing',
      subtitle: 'My Favorite Song',
      progress: 0.0
    });
  };

  const handleUpdateProgress = async () => {
    await update({ progress: 0.5 });
  };

  const handleStop = async () => {
    await end(true);
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Start Playing" onPress={handlePlayMusic} />
      <Button title="Update Progress" onPress={handleUpdateProgress} />
      <Button title="Stop" onPress={handleStop} />
    </View>
  );
}
```

## 📚 API Reference

### Functions

#### `isSupported()`

Checks if Live Activities are supported on the current device.

```typescript
const supported: boolean = await isSupported();
```

**Returns:** `Promise<boolean>` - `true` if supported and enabled

---

#### `startActivity(options)`

Starts a new Live Activity in the Dynamic Island.

```typescript
const activityId: string = await startActivity({
  activityId: 'unique-id',
  title: 'Main Text',
  subtitle: 'Secondary Text',
  progress: 0.5,
  style: 'player'
});
```

**Parameters:**
- `activityId` (string) - Unique identifier for this activity
- `title` (string) - Main text to display
- `subtitle` (string, optional) - Secondary text
- `progress` (number, optional) - Progress value between 0 and 1
- `style` (string, optional) - Style identifier

**Returns:** `Promise<string>` - System-generated activity ID

**Throws:** Error if Live Activities are not supported

---

#### `updateActivity(options)`

Updates the currently active Live Activity.

```typescript
const success: boolean = await updateActivity({
  title: 'New Title',
  progress: 0.8
});
```

**Parameters:** All fields are optional
- `title` (string, optional) - New title
- `subtitle` (string, optional) - New subtitle
- `progress` (number, optional) - New progress value
- `style` (string, optional) - New style

**Returns:** `Promise<boolean>` - `true` if update was successful

---

#### `endActivity(dismiss)`

Ends the currently active Live Activity.

```typescript
await endActivity(true); // Dismiss immediately
await endActivity(false); // Use default dismissal policy
```

**Parameters:**
- `dismiss` (boolean, default: `true`) - Whether to dismiss immediately

**Returns:** `Promise<boolean>` - `true` if activity was ended successfully

---

### Hook: `useDynamicIslandActivity()`

React hook for managing Dynamic Island activities with built-in state management.

```typescript
const {
  supported,      // boolean | null - Support status
  activityId,     // string | null - Current activity ID
  checkSupport,   // () => Promise<boolean>
  start,          // (options) => Promise<string>
  update,         // (options) => Promise<boolean>
  end             // (dismiss?: boolean) => Promise<boolean>
} = useDynamicIslandActivity();
```

---

### TypeScript Types

```typescript
type DinamicIslandStartOptions = {
  activityId: string;
  title: string;
  subtitle?: string;
  style?: string;
  progress?: number;
};

type DinamicIslandUpdateOptions = {
  title?: string;
  subtitle?: string;
  style?: string;
  progress?: number;
};

enum DinamicIslandStyle {
  DEFAULT = 'default',
  PLAYER = 'player',
  TIMER = 'timer',
  DELIVERY = 'delivery',
  CALL = 'call'
}
```

## 🎨 Use Cases

### Music Player

```typescript
await start({
  activityId: 'music',
  title: 'Now Playing',
  subtitle: 'Artist Name - Song Title',
  style: 'player',
  progress: 0.3
});
```

### Timer/Countdown

```typescript
await start({
  activityId: 'timer',
  title: 'Timer',
  subtitle: '5:00 remaining',
  style: 'timer'
});
```

### Delivery Tracking

```typescript
await start({
  activityId: 'delivery',
  title: 'Your Order',
  subtitle: 'Out for delivery',
  style: 'delivery',
  progress: 0.6
});
```

## 🔒 Security & Privacy

- Do not display sensitive information (personal data, passwords, health info)
- Remember that Live Activities are visible on the lock screen
- Users must explicitly enable Live Activities in their system settings
- The library checks permissions automatically

## 🐛 Troubleshooting

### "Live Activities not showing"

1. **Check iOS Version**: Ensure you're on iOS 16.1+ on a supported device
   ```typescript
   const supported = await isSupported();
   console.log('Live Activities supported:', supported);
   ```

2. **Check System Settings**:
   - Go to Settings > Face ID & Passcode
   - Scroll down to "Live Activities"
   - Ensure it's enabled

3. **Verify Installation**:
   ```bash
   # Clean and rebuild
   npx expo prebuild -p ios --clean
   npx expo run:ios --device
   ```

4. **Check Entitlements**: Open your iOS project in Xcode and verify:
   - Main app has `com.apple.developer.activity-types: ['liveActivities']`
   - Widget Extension exists and is configured
   - Both targets have matching team and bundle IDs

### "Module not found" or "Native module cannot be null"

This usually means the native module isn't linked properly:

```bash
# Solution 1: Clean rebuild
npx expo prebuild -p ios --clean
cd ios && pod install && cd ..
npx expo run:ios --device

# Solution 2: If using development build
npx expo install --fix
eas build --profile development --platform ios
```

### "Plugin error during prebuild"

If the Config Plugin fails:

1. **Check package installation**:
   ```bash
   npm ls react-native-dinamicisland
   # Should show version 1.0.0 or higher
   ```

2. **Verify app.json plugin configuration**:
   ```json
   {
     "expo": {
       "plugins": ["react-native-dinamicisland"]
     }
   }
   ```

3. **Check for conflicting plugins**: Some plugins may conflict. Try disabling other plugins temporarily.

### Input Validation Errors

If you see errors like "Title must not exceed 200 characters":

```typescript
// ❌ Wrong - exceeds limits
await startActivity({
  activityId: 'a'.repeat(101),  // Too long!
  title: 'Very long title...'.repeat(50),  // Too long!
  progress: 1.5  // Invalid range!
});

// ✅ Correct - within limits
await startActivity({
  activityId: 'music-player',  // 1-100 chars
  title: 'Now Playing',  // 1-200 chars
  subtitle: 'Artist - Song',  // 0-300 chars
  progress: 0.5  // 0.0-1.0
});
```

### Testing on Simulator

**Important**: Dynamic Island hardware is NOT available in iOS Simulator.

- ✅ Live Activities will appear in **Notification Center**
- ✅ You can test the **lock screen widget**
- ❌ Dynamic Island UI will **NOT show** (requires physical device)

For full testing, use a physical device:
- iPhone 14 Pro / 14 Pro Max
- iPhone 15 Pro / 15 Pro Max
- Any future iPhone with Dynamic Island

### Common Development Issues

#### Activity not updating

```typescript
// Make sure you're calling update, not start again
const id = await startActivity({ activityId: 'test', title: 'Initial' });

// ✅ Correct - update existing
await updateActivity({ title: 'Updated' });

// ❌ Wrong - this creates a NEW activity
await startActivity({ activityId: 'test', title: 'Updated' });
```

#### Multiple activities

Currently, this library supports **one active activity at a time**. Starting a new activity while one is active will replace it.

```typescript
// First activity
await startActivity({ activityId: 'music', title: 'Music' });

// This replaces the first activity
await startActivity({ activityId: 'timer', title: 'Timer' });
```

### Getting Help

1. **Check the logs**:
   ```bash
   npx expo run:ios --device
   # Watch for error messages
   ```

2. **Enable verbose logging**:
   ```bash
   npx expo run:ios --device --verbose
   ```

3. **Report issues**: https://github.com/thomassr30/react-native-dinamicisland/issues
   - Include error messages
   - Include iOS version
   - Include device model
   - Include code snippet that reproduces the issue

## 🗺️ Roadmap

- [x] Phase 1: Basic start/update/end functionality
- [ ] Phase 2: Multiple visual presets (player, timer, delivery)
- [ ] Phase 3: Multiple simultaneous activities support
- [ ] Phase 4: Deep links and actions from Dynamic Island
- [ ] Phase 5: Advanced theming and custom layouts
- [ ] Phase 6: Real-world integration examples

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Thomas Soto**
- GitHub: [@thomassr30](https://github.com/thomassr30)
- Email: thomassoto94@gmail.com

## 🙏 Acknowledgments

Built with:
- [Expo Modules API](https://docs.expo.dev/modules/)
- Apple's ActivityKit
- Apple's WidgetKit

---

**Note:** This library is iOS only. Android does not have Dynamic Island functionality.

Made with ❤️ for the React Native community
