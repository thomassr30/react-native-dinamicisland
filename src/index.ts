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
 * @throws Error if Live Activities are not supported or inputs are invalid
 */
export async function startActivity(
  options: DinamicIslandStartOptions
): Promise<string> {
  // Validate inputs on JS side for better error messages
  if (!options.activityId || options.activityId.trim().length === 0) {
    throw new Error('Activity ID is required and cannot be empty');
  }

  if (options.activityId.length > 100) {
    throw new Error('Activity ID must not exceed 100 characters');
  }

  if (!options.title || options.title.trim().length === 0) {
    throw new Error('Title is required and cannot be empty');
  }

  if (options.title.length > 200) {
    throw new Error('Title must not exceed 200 characters');
  }

  if (options.subtitle && options.subtitle.length > 300) {
    throw new Error('Subtitle must not exceed 300 characters');
  }

  if (options.progress !== undefined && options.progress !== null) {
    if (typeof options.progress !== 'number' || isNaN(options.progress)) {
      throw new Error('Progress must be a valid number');
    }
    if (options.progress < 0 || options.progress > 1) {
      throw new Error('Progress must be between 0 and 1');
    }
  }

  return ReactNativeDinamicisland.startActivity(
    options.activityId.trim(),
    options.title.trim(),
    options.subtitle?.trim() ?? null,
    options.style ?? null,
    options.progress ?? null
  );
}

/**
 * Updates the currently active Dynamic Island Live Activity
 * Only the fields you provide will be updated
 * @param options - Fields to update (all optional)
 * @returns Promise<boolean> - true if update was successful
 * @throws Error if inputs are invalid
 */
export async function updateActivity(
  options: DinamicIslandUpdateOptions
): Promise<boolean> {
  // Validate inputs
  if (options.title !== undefined && options.title !== null) {
    if (options.title.trim().length === 0) {
      throw new Error('Title cannot be empty if provided');
    }
    if (options.title.length > 200) {
      throw new Error('Title must not exceed 200 characters');
    }
  }

  if (options.subtitle && options.subtitle.length > 300) {
    throw new Error('Subtitle must not exceed 300 characters');
  }

  if (options.progress !== undefined && options.progress !== null) {
    if (typeof options.progress !== 'number' || isNaN(options.progress)) {
      throw new Error('Progress must be a valid number');
    }
    if (options.progress < 0 || options.progress > 1) {
      throw new Error('Progress must be between 0 and 1');
    }
  }

  return ReactNativeDinamicisland.updateActivity(
    options.title?.trim() ?? null,
    options.subtitle?.trim() ?? null,
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
