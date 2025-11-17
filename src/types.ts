/**
 * Options for starting a new Dynamic Island Live Activity
 */
export type DinamicIslandStartOptions = {
  /** Unique identifier for this activity instance */
  activityId: string;

  /** Main text to display in the Dynamic Island */
  title: string;

  /** Optional secondary text for additional context */
  subtitle?: string;

  /** Optional style identifier for different visual presets */
  style?: string;

  /** Optional progress value between 0 and 1 */
  progress?: number;
};

/**
 * Options for updating an active Dynamic Island Live Activity
 * All fields are optional - only provided fields will be updated
 */
export type DinamicIslandUpdateOptions = {
  /** New title text */
  title?: string;

  /** New subtitle text */
  subtitle?: string;

  /** New style identifier */
  style?: string;

  /** New progress value between 0 and 1 */
  progress?: number;
};

/**
 * Predefined style identifiers for common use cases
 * You can use these or define your own custom styles
 */
export enum DinamicIslandStyle {
  /** Default style */
  DEFAULT = 'default',

  /** Music or media player style */
  PLAYER = 'player',

  /** Timer or countdown style */
  TIMER = 'timer',

  /** Delivery or tracking style */
  DELIVERY = 'delivery',

  /** Call or communication style */
  CALL = 'call',
}
