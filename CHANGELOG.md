# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-11-17

### Added

#### Core Functionality
- Initial release of react-native-dinamicisland
- Full support for iOS Dynamic Island Live Activities via ActivityKit
- Simple JavaScript API: `startActivity()`, `updateActivity()`, `endActivity()`, `isSupported()`
- React Hook: `useDynamicIslandActivity()` with built-in state management
- TypeScript support with complete type definitions

#### Native Implementation
- Swift module using Apple's ActivityKit framework
- WidgetKit extension for Dynamic Island UI
- Support for both Dynamic Island and lock screen widgets
- Automatic iOS version checking (requires iOS 16.1+)

#### Automatic Configuration
- Expo Config Plugin for zero-manual-setup installation
- Automatic Widget Extension creation (no Xcode required!)
- Automatic entitlements configuration
- Automatic Info.plist setup
- Automatic Swift files integration

#### Features
- Display text content (title, subtitle)
- Progress indicators (0.0 to 1.0)
- Multiple style presets (player, timer, delivery, etc.)
- Real-time content updates
- Immediate or default dismissal policies

#### Developer Experience
- Comprehensive input validation on both JS and Swift layers
- Detailed error messages for debugging
- Well-documented code with helpful comments
- Example app demonstrating all features
- Production-ready and optimized for performance

#### Documentation
- Complete README with quick start guide
- API reference documentation
- TypeScript type definitions
- SECURITY.md with privacy and best practices guidelines
- Multiple use case examples (music player, timer, delivery tracking)

#### Security
- Input validation:
  - Activity ID: 1-100 characters
  - Title: 1-200 characters
  - Subtitle: 0-300 characters
  - Progress: 0.0-1.0 with type checking
- Automatic string sanitization (trimming)
- Protection against injection attacks
- Privacy guidelines for lock screen content
- Comprehensive test suite with 30+ unit tests

#### Testing
- Unit tests for all public APIs
- Input validation tests
- Edge case testing
- Mock native module testing

### Technical Details

#### Dependencies
- `@expo/config-plugins`: ^8.0.0
- Peer dependencies: `expo`, `react`, `react-native`

#### Requirements
- iOS 16.1 or later
- Expo SDK 51 or later
- React Native 0.74 or later
- Physical device with Dynamic Island for full testing (iPhone 14 Pro or newer)

#### Platform Support
- iOS: ✅ Full support
- Android: ❌ Not applicable (Android doesn't have Dynamic Island)

### Installation

```bash
npm install react-native-dinamicisland

# Add to app.json
{
  "expo": {
    "plugins": ["react-native-dinamicisland"]
  }
}

# Prebuild and run
npx expo prebuild -p ios --clean
npx expo run:ios --device
```

### Migration Guide

This is the initial release, so no migration is needed.

### Known Issues

- Dynamic Island visual previews don't work in iOS Simulator (hardware limitation)
- Live Activities appear in Notification Center on simulator, but not in Dynamic Island
- For full testing, a physical device with Dynamic Island is required

### Credits

- Built with Expo Modules API
- Uses Apple's ActivityKit and WidgetKit frameworks
- Developed by Thomas Soto ([@thomassr30](https://github.com/thomassr30))

---

## Versioning Strategy

- **Major version (X.0.0)**: Breaking changes to the API
- **Minor version (0.X.0)**: New features, backwards compatible
- **Patch version (0.0.X)**: Bug fixes, security updates

## Support

- Report issues: https://github.com/thomassr30/react-native-dinamicisland/issues
- Security issues: Email thomassoto94@gmail.com (see SECURITY.md)

---

[1.0.0]: https://github.com/thomassr30/react-native-dinamicisland/releases/tag/v1.0.0
