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

1. Ensure you're on iOS 16.1+ on a supported device
2. Check that Live Activities are enabled in Settings > Face ID & Passcode
3. Make sure you ran `npx expo prebuild` after installation
4. Verify entitlements are correctly configured in Xcode

### "Module not found"

Run these commands:
```bash
npx expo prebuild -p ios --clean
npx expo run:ios
```

### Testing on Simulator

Dynamic Island will not show on simulator, but Live Activities will appear in the notification center. For full testing, use a physical device with Dynamic Island (iPhone 14 Pro or newer).

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
