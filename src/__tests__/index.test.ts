import { startActivity, updateActivity, endActivity } from '../index';

// Mock the native module
jest.mock('expo-modules-core', () => ({
  NativeModulesProxy: {
    ReactNativeDinamicisland: {
      isSupported: jest.fn(() => Promise.resolve(true)),
      startActivity: jest.fn((activityId, title, subtitle, style, progress) =>
        Promise.resolve('activity-123')
      ),
      updateActivity: jest.fn(() => Promise.resolve(true)),
      endActivity: jest.fn(() => Promise.resolve(true)),
    },
  },
}));

describe('react-native-dinamicisland', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('startActivity', () => {
    it('should start an activity with valid inputs', async () => {
      const result = await startActivity({
        activityId: 'test-activity',
        title: 'Test Title',
        subtitle: 'Test Subtitle',
        progress: 0.5,
      });

      expect(result).toBe('activity-123');
    });

    it('should throw error if activityId is empty', async () => {
      await expect(
        startActivity({
          activityId: '',
          title: 'Test',
        })
      ).rejects.toThrow('Activity ID is required and cannot be empty');
    });

    it('should throw error if activityId is only whitespace', async () => {
      await expect(
        startActivity({
          activityId: '   ',
          title: 'Test',
        })
      ).rejects.toThrow('Activity ID is required and cannot be empty');
    });

    it('should throw error if activityId exceeds 100 characters', async () => {
      await expect(
        startActivity({
          activityId: 'a'.repeat(101),
          title: 'Test',
        })
      ).rejects.toThrow('Activity ID must not exceed 100 characters');
    });

    it('should throw error if title is empty', async () => {
      await expect(
        startActivity({
          activityId: 'test',
          title: '',
        })
      ).rejects.toThrow('Title is required and cannot be empty');
    });

    it('should throw error if title is only whitespace', async () => {
      await expect(
        startActivity({
          activityId: 'test',
          title: '   ',
        })
      ).rejects.toThrow('Title is required and cannot be empty');
    });

    it('should throw error if title exceeds 200 characters', async () => {
      await expect(
        startActivity({
          activityId: 'test',
          title: 'a'.repeat(201),
        })
      ).rejects.toThrow('Title must not exceed 200 characters');
    });

    it('should throw error if subtitle exceeds 300 characters', async () => {
      await expect(
        startActivity({
          activityId: 'test',
          title: 'Test',
          subtitle: 'a'.repeat(301),
        })
      ).rejects.toThrow('Subtitle must not exceed 300 characters');
    });

    it('should throw error if progress is not a number', async () => {
      await expect(
        startActivity({
          activityId: 'test',
          title: 'Test',
          progress: 'invalid' as any,
        })
      ).rejects.toThrow('Progress must be a valid number');
    });

    it('should throw error if progress is NaN', async () => {
      await expect(
        startActivity({
          activityId: 'test',
          title: 'Test',
          progress: NaN,
        })
      ).rejects.toThrow('Progress must be a valid number');
    });

    it('should throw error if progress is less than 0', async () => {
      await expect(
        startActivity({
          activityId: 'test',
          title: 'Test',
          progress: -0.1,
        })
      ).rejects.toThrow('Progress must be between 0 and 1');
    });

    it('should throw error if progress is greater than 1', async () => {
      await expect(
        startActivity({
          activityId: 'test',
          title: 'Test',
          progress: 1.1,
        })
      ).rejects.toThrow('Progress must be between 0 and 1');
    });

    it('should accept progress of exactly 0', async () => {
      const result = await startActivity({
        activityId: 'test',
        title: 'Test',
        progress: 0,
      });

      expect(result).toBe('activity-123');
    });

    it('should accept progress of exactly 1', async () => {
      const result = await startActivity({
        activityId: 'test',
        title: 'Test',
        progress: 1,
      });

      expect(result).toBe('activity-123');
    });

    it('should trim whitespace from strings before sending to native', async () => {
      const { NativeModulesProxy } = require('expo-modules-core');

      await startActivity({
        activityId: '  test-id  ',
        title: '  Test Title  ',
        subtitle: '  Test Subtitle  ',
      });

      expect(
        NativeModulesProxy.ReactNativeDinamicisland.startActivity
      ).toHaveBeenCalledWith(
        'test-id',
        'Test Title',
        'Test Subtitle',
        null,
        null
      );
    });
  });

  describe('updateActivity', () => {
    it('should update an activity with valid inputs', async () => {
      const result = await updateActivity({
        title: 'New Title',
        progress: 0.8,
      });

      expect(result).toBe(true);
    });

    it('should throw error if title is empty string', async () => {
      await expect(
        updateActivity({
          title: '',
        })
      ).rejects.toThrow('Title cannot be empty if provided');
    });

    it('should throw error if title is only whitespace', async () => {
      await expect(
        updateActivity({
          title: '   ',
        })
      ).rejects.toThrow('Title cannot be empty if provided');
    });

    it('should throw error if title exceeds 200 characters', async () => {
      await expect(
        updateActivity({
          title: 'a'.repeat(201),
        })
      ).rejects.toThrow('Title must not exceed 200 characters');
    });

    it('should throw error if subtitle exceeds 300 characters', async () => {
      await expect(
        updateActivity({
          subtitle: 'a'.repeat(301),
        })
      ).rejects.toThrow('Subtitle must not exceed 300 characters');
    });

    it('should throw error if progress is not a number', async () => {
      await expect(
        updateActivity({
          progress: 'invalid' as any,
        })
      ).rejects.toThrow('Progress must be a valid number');
    });

    it('should throw error if progress is less than 0', async () => {
      await expect(
        updateActivity({
          progress: -0.1,
        })
      ).rejects.toThrow('Progress must be between 0 and 1');
    });

    it('should throw error if progress is greater than 1', async () => {
      await expect(
        updateActivity({
          progress: 1.1,
        })
      ).rejects.toThrow('Progress must be between 0 and 1');
    });

    it('should allow updating with undefined fields', async () => {
      const result = await updateActivity({});
      expect(result).toBe(true);
    });

    it('should trim whitespace from strings before sending to native', async () => {
      const { NativeModulesProxy } = require('expo-modules-core');

      await updateActivity({
        title: '  New Title  ',
        subtitle: '  New Subtitle  ',
      });

      expect(
        NativeModulesProxy.ReactNativeDinamicisland.updateActivity
      ).toHaveBeenCalledWith(
        'New Title',
        'New Subtitle',
        null,
        null
      );
    });
  });

  describe('endActivity', () => {
    it('should end an activity with dismiss=true by default', async () => {
      const { NativeModulesProxy } = require('expo-modules-core');

      const result = await endActivity();

      expect(result).toBe(true);
      expect(
        NativeModulesProxy.ReactNativeDinamicisland.endActivity
      ).toHaveBeenCalledWith(true);
    });

    it('should end an activity with dismiss=false when specified', async () => {
      const { NativeModulesProxy } = require('expo-modules-core');

      const result = await endActivity(false);

      expect(result).toBe(true);
      expect(
        NativeModulesProxy.ReactNativeDinamicisland.endActivity
      ).toHaveBeenCalledWith(false);
    });
  });
});
