import WidgetKit
import SwiftUI
import ActivityKit

/// The main entry point for the Widget extension
/// This bundle registers all widgets that will be available to the system
@main
struct DinamicIslandWidgetBundle: WidgetBundle {
  var body: some Widget {
    DinamicIslandWidget()
  }
}
