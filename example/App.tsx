import React, { useEffect, useState } from 'react';
import { useDynamicIslandActivity } from 'react-native-dinamicisland';
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function App() {
  const { supported, activityId, checkSupport, start, update, end } =
    useDynamicIslandActivity();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    checkSupport().then((isSupported) => {
      if (!isSupported) {
        Alert.alert(
          'Not Supported',
          'Live Activities are only available on iOS 16.1+ with supported devices.'
        );
      }
    });
  }, [checkSupport]);

  const handleStartMusic = async () => {
    try {
      await start({
        activityId: 'music-player',
        title: 'Now Playing',
        subtitle: 'React Native - Dynamic Island',
        style: 'player',
        progress: 0,
      });
      setProgress(0);
      Alert.alert('Success', 'Music activity started! Check your Dynamic Island.');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to start activity');
    }
  };

  const handleStartTimer = async () => {
    try {
      await start({
        activityId: 'timer',
        title: 'Timer Running',
        subtitle: '10:00 remaining',
        style: 'timer',
      });
      Alert.alert('Success', 'Timer activity started!');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to start activity');
    }
  };

  const handleStartDelivery = async () => {
    try {
      await start({
        activityId: 'delivery',
        title: 'Your Order',
        subtitle: 'Preparing your package',
        style: 'delivery',
        progress: 0.2,
      });
      setProgress(0.2);
      Alert.alert('Success', 'Delivery tracking started!');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to start activity');
    }
  };

  const handleUpdateProgress = async () => {
    if (!activityId) {
      Alert.alert('Error', 'No active activity. Start one first!');
      return;
    }

    const newProgress = Math.min(progress + 0.2, 1);
    setProgress(newProgress);

    try {
      await update({
        progress: newProgress,
        subtitle: `Progress: ${Math.round(newProgress * 100)}%`,
      });
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to update activity');
    }
  };

  const handleEnd = async () => {
    if (!activityId) {
      Alert.alert('Error', 'No active activity to end.');
      return;
    }

    try {
      await end(true);
      setProgress(0);
      Alert.alert('Success', 'Activity ended!');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to end activity');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Dynamic Island Demo</Text>
        <Text style={styles.subtitle}>React Native + Live Activities</Text>

        <View style={styles.statusCard}>
          <Text style={styles.statusLabel}>Status:</Text>
          <Text style={styles.statusValue}>
            {supported === null ? 'Checking...' : supported ? 'Supported ✓' : 'Not Supported ✗'}
          </Text>
          {activityId && (
            <>
              <Text style={styles.statusLabel}>Active Activity:</Text>
              <Text style={styles.statusValue}>Yes</Text>
            </>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Start Activity</Text>
          <View style={styles.buttonContainer}>
            <Button title="🎵 Music Player" onPress={handleStartMusic} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="⏱️ Timer" onPress={handleStartTimer} color="#FF9500" />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="📦 Delivery" onPress={handleStartDelivery} color="#34C759" />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Control Activity</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Update Progress"
              onPress={handleUpdateProgress}
              disabled={!activityId}
              color="#5856D6"
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="End Activity" onPress={handleEnd} disabled={!activityId} color="#FF3B30" />
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>📱 How to test:</Text>
          <Text style={styles.infoText}>
            1. Start an activity above{'\n'}
            2. Look at your Dynamic Island{'\n'}
            3. Long press to see expanded view{'\n'}
            4. Check lock screen for widget{'\n'}
            5. Update or end the activity
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
  },
  statusCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginTop: 8,
  },
  statusValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: '#000',
  },
  buttonContainer: {
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: '#E5F3FF',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#007AFF',
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
});
