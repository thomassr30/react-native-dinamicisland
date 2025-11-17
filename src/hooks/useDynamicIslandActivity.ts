import { useCallback, useState } from 'react';
import {
  isSupported as isSupportedNative,
  startActivity,
  updateActivity,
  endActivity,
} from '../index';
import type {
  DinamicIslandStartOptions,
  DinamicIslandUpdateOptions,
} from '../types';

/**
 * React hook for managing Dynamic Island Live Activities
 * Provides an easy-to-use interface with state management built in
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { supported, start, update, end } = useDynamicIslandActivity();
 *
 *   useEffect(() => {
 *     checkSupport();
 *   }, []);
 *
 *   const handleStart = async () => {
 *     await start({
 *       activityId: 'my-activity',
 *       title: 'Playing Music',
 *       subtitle: 'Artist Name - Song Title',
 *       progress: 0.5
 *     });
 *   };
 * }
 * ```
 */
export function useDynamicIslandActivity() {
  const [activityId, setActivityId] = useState<string | null>(null);
  const [supported, setSupported] = useState<boolean | null>(null);

  /**
   * Checks if Live Activities are supported on this device
   * Updates the `supported` state
   */
  const checkSupport = useCallback(async () => {
    const result = await isSupportedNative();
    setSupported(result);
    return result;
  }, []);

  /**
   * Starts a new Live Activity with the specified options
   * Updates the `activityId` state with the system-generated ID
   */
  const start = useCallback(
    async (options: DinamicIslandStartOptions) => {
      const id = await startActivity(options);
      setActivityId(id);
      return id;
    },
    []
  );

  /**
   * Updates the currently active Live Activity
   * Returns false if no activity is currently active
   */
  const update = useCallback(
    async (options: DinamicIslandUpdateOptions) => {
      if (!activityId) return false;
      return updateActivity(options);
    },
    [activityId]
  );

  /**
   * Ends the currently active Live Activity
   * Clears the `activityId` state on success
   */
  const end = useCallback(
    async (dismiss: boolean = true) => {
      if (!activityId) return false;
      const result = await endActivity(dismiss);
      if (result) setActivityId(null);
      return result;
    },
    [activityId]
  );

  return {
    /** Whether Live Activities are supported (null if not checked yet) */
    supported,
    /** The ID of the currently active activity (null if no active activity) */
    activityId,
    /** Function to check if Live Activities are supported */
    checkSupport,
    /** Function to start a new Live Activity */
    start,
    /** Function to update the current Live Activity */
    update,
    /** Function to end the current Live Activity */
    end,
  };
}
