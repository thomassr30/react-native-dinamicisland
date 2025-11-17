# Security Policy

## Supported Versions

We actively maintain and provide security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Security Best Practices

### Input Validation

This library implements comprehensive input validation on both JavaScript and native Swift layers to prevent injection attacks and ensure data integrity:

#### String Length Limits
- **Activity ID**: 1-100 characters (required, non-empty after trimming)
- **Title**: 1-200 characters (required, non-empty after trimming)
- **Subtitle**: 0-300 characters (optional)
- **Style**: No enforced limit (optional)

#### Numeric Validation
- **Progress**: Must be a valid number between 0.0 and 1.0 (inclusive)
- Type checking ensures only numbers are accepted (no strings, NaN, or invalid values)

#### Sanitization
All string inputs are automatically trimmed of leading/trailing whitespace before being sent to the native layer.

### Privacy Considerations

**IMPORTANT**: Live Activities and Dynamic Island content are visible in several locations:

1. **Dynamic Island** - Visible when the device is unlocked
2. **Lock Screen** - Visible even when the device is locked
3. **Notification Center** - May appear in notifications

#### What NOT to Display

Never display the following types of information in Live Activities:

- Personal identifiable information (PII)
- Passwords or authentication tokens
- Credit card numbers or financial data
- Health information
- Private messages or email content
- Location data (unless explicitly part of your app's purpose)
- Any data the user wouldn't want visible on their lock screen

#### What IS Safe to Display

- Song/podcast titles (music players)
- Timer/countdown values
- Delivery status updates (general, non-specific)
- Sports scores
- Workout session summaries (time, basic stats)
- General app status (e.g., "Processing...", "Complete")

### Permissions and Entitlements

The library automatically configures the following iOS entitlements:

1. **User Notifications** (`com.apple.developer.usernotifications`)
   - Required for Live Activities to function
   - Users must grant notification permissions

2. **Activity Types** (`com.apple.developer.activity-types`)
   - Set to `['liveActivities']`
   - Enables ActivityKit functionality

3. **NSSupportsLiveActivities** (Info.plist)
   - Set to `true` in both main app and Widget Extension
   - Declares Live Activities support

### User Consent

Users have full control over Live Activities:

- They can disable Live Activities system-wide in Settings > Face ID & Passcode
- They can dismiss individual activities at any time
- Always respect user preferences when checked via `isSupported()`

### Error Handling

The library provides descriptive error messages without exposing sensitive system information:

```typescript
try {
  await startActivity({ ... });
} catch (error) {
  // Errors are user-friendly and safe to display
  console.error(error.message);
}
```

Error types:
- Input validation errors (client-side)
- Platform support errors (iOS version checks)
- ActivityKit errors (native layer)

### Config Plugin Security

The Expo Config Plugin performs file system operations during the prebuild process. Security measures include:

1. **Path Validation**: Validates that all required directories and files exist before operations
2. **Error Handling**: Provides clear error messages if files are missing or operations fail
3. **No User Input**: The plugin doesn't accept user-provided file paths, only uses predetermined safe paths
4. **Read-Only Source Files**: Source files in `node_modules` are only read, never modified

### Dependency Security

This library has minimal dependencies:

- `expo-modules-core` - Official Expo framework
- Native iOS frameworks: `ActivityKit`, `WidgetKit`, `SwiftUI` (Apple-provided, system frameworks)

We recommend:
- Keeping dependencies up to date
- Running `npm audit` regularly
- Using `npm audit fix` to automatically update vulnerable dependencies

## Reporting a Vulnerability

If you discover a security vulnerability in this library, please follow responsible disclosure:

1. **DO NOT** open a public GitHub issue
2. Email the maintainer directly at: **thomassoto94@gmail.com**
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if you have one)

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 1 week
- **Fix Release**: Depends on severity
  - Critical: Within 72 hours
  - High: Within 1 week
  - Medium: Within 2 weeks
  - Low: Next regular release

### Disclosure Policy

- We will acknowledge your contribution in the release notes (unless you prefer to remain anonymous)
- We will coordinate the disclosure timeline with you
- We ask that you do not publicly disclose the vulnerability until a fix is released

## Security Updates

Security updates will be released as patch versions (e.g., 1.0.1, 1.0.2) and clearly marked in:

- GitHub Releases
- CHANGELOG.md
- npm package release notes

Subscribe to GitHub releases or watch this repository to stay informed about security updates.

## Additional Resources

- [Apple's Live Activities Security Guidelines](https://developer.apple.com/documentation/activitykit)
- [Expo Security Best Practices](https://docs.expo.dev/guides/security/)
- [OWASP Mobile Security](https://owasp.org/www-project-mobile-security/)

---

**Last Updated**: November 2025
