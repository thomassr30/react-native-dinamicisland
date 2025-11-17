import WidgetKit
import SwiftUI
import ActivityKit

/// The main widget configuration for Dynamic Island Live Activities
/// This handles both the lock screen view and the Dynamic Island regions
struct DinamicIslandWidget: Widget {
  var body: some WidgetConfiguration {
    ActivityConfiguration(for: DinamicIslandActivityAttributes.self) { context in
      // Lock screen view when device is locked
      LockScreenView(context: context)

    } dynamicIsland: { context in
      // Dynamic Island configuration with all expansion states
      DynamicIsland {
        // Expanded view - shown when user long-presses the island
        DynamicIslandExpandedRegion(.center) {
          ExpandedIslandView(context: context)
        }
      } compactLeading: {
        // Small icon shown on the left side when minimized
        CompactLeadingView(context: context)
      } compactTrailing: {
        // Small info shown on the right side when minimized
        CompactTrailingView(context: context)
      } minimal: {
        // Smallest view when there are multiple activities
        MinimalView(context: context)
      }
    }
  }
}

// MARK: - Lock Screen View

/// View shown on the lock screen when the device is locked
/// Displays the activity information in a vertical layout
struct LockScreenView: View {
  let context: ActivityViewContext<DinamicIslandActivityAttributes>

  var body: some View {
    VStack(alignment: .leading, spacing: 4) {
      Text(context.state.title)
        .font(.headline)
        .lineLimit(1)

      if let subtitle = context.state.subtitle {
        Text(subtitle)
          .font(.subheadline)
          .lineLimit(1)
      }

      if let progress = context.state.progress {
        ProgressView(value: progress)
      }
    }
    .padding()
  }
}

// MARK: - Expanded Region View

/// The expanded view of the Dynamic Island
/// Shown when the user long-presses or interacts with the island
struct ExpandedIslandView: View {
  let context: ActivityViewContext<DinamicIslandActivityAttributes>

  var body: some View {
    HStack {
      VStack(alignment: .leading, spacing: 4) {
        Text(context.state.title)
          .font(.headline)
          .lineLimit(1)

        if let subtitle = context.state.subtitle {
          Text(subtitle)
            .font(.caption)
            .lineLimit(1)
            .foregroundColor(.secondary)
        }
      }

      Spacer()

      if let progress = context.state.progress {
        VStack(spacing: 4) {
          ProgressView(value: progress)
            .frame(width: 60)

          Text("\(Int(progress * 100))%")
            .font(.caption2)
            .foregroundColor(.secondary)
        }
      }
    }
    .padding(.horizontal, 12)
    .padding(.vertical, 8)
  }
}

// MARK: - Compact Leading View

/// The small icon shown on the leading (left) side of the compact island
/// This gives a quick visual indicator of the activity type
struct CompactLeadingView: View {
  let context: ActivityViewContext<DinamicIslandActivityAttributes>

  var body: some View {
    // Simple play icon - you can customize based on context.state.style
    Image(systemName: "play.fill")
      .font(.caption)
      .foregroundColor(.white)
  }
}

// MARK: - Compact Trailing View

/// The small info shown on the trailing (right) side of the compact island
/// Typically shows progress or status information
struct CompactTrailingView: View {
  let context: ActivityViewContext<DinamicIslandActivityAttributes>

  var body: some View {
    if let progress = context.state.progress {
      Text("\(Int(progress * 100))%")
        .font(.caption2)
        .foregroundColor(.white)
    } else {
      Text("•••")
        .font(.caption2)
        .foregroundColor(.white)
    }
  }
}

// MARK: - Minimal View

/// The smallest possible view when space is very limited
/// Usually just a simple indicator that the activity is running
struct MinimalView: View {
  let context: ActivityViewContext<DinamicIslandActivityAttributes>

  var body: some View {
    Circle()
      .fill(Color.blue)
      .frame(width: 12, height: 12)
  }
}
