import { NativeModulesProxy } from 'expo-modules-core';
import type {
  DinamicIslandStartOptions,
  DinamicIslandUpdateOptions,
} from './types';

const { ReactNativeDinamicisland } = NativeModulesProxy as any;

/**
 * Checks if Dynamic Island Live Activities are supported on this device
 * Requires iOS 16.1+ and Live Activities must be enabled by the user
 * @returns Promise<boolean> - true if supported and enabled
 */
export async function isSupported(): Promise<boolean> {
  return ReactNativeDinamicisland.isSupported();
}

/**
 * Starts a new Dynamic Island Live Activity
 * This will display content in the Dynamic Island and on the lock screen
 * @param options - Configuration for the activity
 * @returns Promise<string> - The system-generated activity ID
 * @throws Error if Live Activities are not supported
 */
export async function startActivity(
  options: DinamicIslandStartOptions
): Promise<string> {
  return ReactNativeDinamicisland.startActivity(
    options.activityId,
    options.title,
    options.subtitle ?? null,
    options.style ?? null,
    options.progress ?? null
  );
}

/**
 * Updates the currently active Dynamic Island Live Activity
 * Only the fields you provide will be updated
 * @param options - Fields to update (all optional)
 * @returns Promise<boolean> - true if update was successful
 */
export async function updateActivity(
  options: DinamicIslandUpdateOptions
): Promise<boolean> {
  return ReactNativeDinamicisland.updateActivity(
    options.title ?? null,
    options.subtitle ?? null,
    options.style ?? null,
    options.progress ?? null
  );
}

/**
 * Ends the currently active Dynamic Island Live Activity
 * This removes it from the Dynamic Island and lock screen
 * @param dismiss - If true, dismisses immediately; if false, uses default dismissal
 * @returns Promise<boolean> - true if activity was ended successfully
 */
export async function endActivity(dismiss: boolean = true): Promise<boolean> {
  return ReactNativeDinamicisland.endActivity(dismiss);
}

// Re-export types and hooks for convenience
export * from './types';
export { useDynamicIslandActivity } from './hooks/useDynamicIslandActivity';
