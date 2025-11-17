import ActivityKit
import ExpoModulesCore

/// The main Expo module that bridges ActivityKit functionality to JavaScript
/// This module allows React Native apps to control Dynamic Island Live Activities
public class ReactNativeDinamicislandModule: Module {

  /// Keeps track of the currently active Live Activity
  /// We maintain a reference to update or end it later
  private var currentActivity: Activity<DinamicIslandActivityAttributes>?

  public func definition() -> ModuleDefinition {
    Name("ReactNativeDinamicisland")

    /// Checks if Live Activities are supported and enabled on this device
    /// Live Activities require iOS 16.1+ and must be enabled by the user
    /// - Returns: true if activities are supported and enabled, false otherwise
    AsyncFunction("isSupported") { () -> Bool in
      if #available(iOS 16.1, *) {
        return ActivityAuthorizationInfo().areActivitiesEnabled
      }
      return false
    }

    /// Starts a new Live Activity with the specified content
    /// This will show the Dynamic Island and lock screen widgets
    /// - Parameters:
    ///   - activityId: Unique identifier for this activity
    ///   - title: Main text to display
    ///   - subtitle: Optional secondary text
    ///   - style: Optional style identifier for different visual presets
    ///   - progress: Optional progress value (0.0 to 1.0)
    /// - Returns: The system-generated activity ID
    /// - Throws: DinamicislandError.notSupported if iOS version is too old
    AsyncFunction("startActivity") { (
      activityId: String,
      title: String,
      subtitle: String?,
      style: String?,
      progress: Double?
    ) throws -> String in
      guard #available(iOS 16.1, *) else {
        throw DinamicislandError.notSupported
      }

      // Validate inputs
      guard !activityId.isEmpty && activityId.count <= 100 else {
        throw DinamicislandError.invalidInput("Activity ID must be between 1-100 characters")
      }

      guard !title.isEmpty && title.count <= 200 else {
        throw DinamicislandError.invalidInput("Title must be between 1-200 characters")
      }

      if let subtitle = subtitle, subtitle.count > 300 {
        throw DinamicislandError.invalidInput("Subtitle must not exceed 300 characters")
      }

      if let progress = progress {
        guard progress >= 0.0 && progress <= 1.0 else {
          throw DinamicislandError.invalidInput("Progress must be between 0.0 and 1.0")
        }
      }

      let attributes = DinamicIslandActivityAttributes(activityId: activityId)

      let state = DinamicIslandActivityAttributes.ContentState(
        title: title,
        subtitle: subtitle,
        progress: progress,
        style: style
      )

      let content = ActivityContent(state: state, staleDate: nil)

      let activity = try Activity.request(
        attributes: attributes,
        content: content
      )

      self.currentActivity = activity
      return activity.id
    }

    /// Updates the content of the currently active Live Activity
    /// This refreshes the Dynamic Island and lock screen displays
    /// - Parameters:
    ///   - title: New title text (optional, keeps current if nil)
    ///   - subtitle: New subtitle text (optional, keeps current if nil)
    ///   - style: New style identifier (optional, keeps current if nil)
    ///   - progress: New progress value (optional, keeps current if nil)
    /// - Returns: true if update was successful, false if no active activity
    AsyncFunction("updateActivity") { (
      title: String?,
      subtitle: String?,
      style: String?,
      progress: Double?
    ) async throws -> Bool in
      guard #available(iOS 16.1, *),
            let activity = self.currentActivity else {
        return false
      }

      // Validate inputs
      if let title = title {
        guard !title.isEmpty && title.count <= 200 else {
          throw DinamicislandError.invalidInput("Title must be between 1-200 characters")
        }
      }

      if let subtitle = subtitle, subtitle.count > 300 {
        throw DinamicislandError.invalidInput("Subtitle must not exceed 300 characters")
      }

      if let progress = progress {
        guard progress >= 0.0 && progress <= 1.0 else {
          throw DinamicislandError.invalidInput("Progress must be between 0.0 and 1.0")
        }
      }

      var newState = activity.content.state

      // Only update fields that were provided
      if let title = title { newState.title = title }
      if let subtitle = subtitle { newState.subtitle = subtitle }
      if let style = style { newState.style = style }
      if let progress = progress { newState.progress = progress }

      let content = ActivityContent(state: newState, staleDate: nil)
      await activity.update(content)

      return true
    }

    /// Ends the currently active Live Activity
    /// This removes the Dynamic Island and lock screen displays
    /// - Parameter dismiss: If true, removes immediately; if false, uses default dismissal policy
    /// - Returns: true if activity was ended successfully, false if no active activity
    AsyncFunction("endActivity") { (dismiss: Bool) async throws -> Bool in
      guard #available(iOS 16.1, *),
            let activity = self.currentActivity else {
        return false
      }

      await activity.end(nil, dismissalPolicy: dismiss ? .immediate : .default)
      self.currentActivity = nil
      return true
    }
  }
}

// MARK: - Error Handling

/// Custom errors specific to Dynamic Island operations
enum DinamicislandError: Error, LocalizedError {
  case notSupported
  case invalidInput(String)

  var errorDescription: String? {
    switch self {
    case .notSupported:
      return "Live Activities are only supported on iOS 16.1 or later. Please update your device to use this feature."
    case .invalidInput(let message):
      return "Invalid input: \(message)"
    }
  }
}
