import ActivityKit
import Foundation

/// Defines the structure and data for our Dynamic Island Live Activity
/// This follows Apple's ActivityKit pattern where attributes are immutable
/// and state can be updated dynamically throughout the activity lifecycle
public struct DinamicIslandActivityAttributes: ActivityAttributes {

  /// The dynamic state that can be updated while the activity is live
  /// Changes to this state will refresh the Dynamic Island UI in real-time
  public struct ContentState: Codable, Hashable {
    public var title: String
    public var subtitle: String?
    public var progress: Double?
    public var style: String?

    /// Creates a new content state with the specified parameters
    /// - Parameters:
    ///   - title: The main text to display in the Dynamic Island
    ///   - subtitle: Optional secondary text for additional context
    ///   - progress: Optional progress value between 0 and 1
    ///   - style: Optional style identifier for different visual presets
    public init(
      title: String,
      subtitle: String? = nil,
      progress: Double? = nil,
      style: String? = nil
    ) {
      self.title = title
      self.subtitle = subtitle
      self.progress = progress
      self.style = style
    }
  }

  /// Unique identifier for this activity instance
  /// This helps track and manage specific activities when multiple might exist
  public var activityId: String

  /// Initializes the activity attributes with a unique identifier
  /// - Parameter activityId: A unique string to identify this activity
  public init(activityId: String) {
    self.activityId = activityId
  }
}
