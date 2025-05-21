import { useState, useEffect } from 'react';

import { Text, View, Pressable, Alert, Button, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from 'expo-av';

export default function AudioRecorder() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordingFileURI, setRecordingFileURI] = useState<string | null>(null);
  // Add state to hold the sound object for playback
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false); // Optional: track playback status

  async function handleRecordingStart() {
    // Ensure previous sound is unloaded if it exists (though unlikely here)
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
      setIsPlaying(false);
    }

    const { granted } = await Audio.getPermissionsAsync();

    if (granted) {
      try {
        // Set appropriate audio mode for recording
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          interruptionModeIOS: InterruptionModeIOS.DoNotMix,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
          playThroughEarpieceAndroid: false, // Usually you record via microphone, not earpiece
          // Optional: Add recording quality settings here if needed
          // web: { disablePlaybackAndFocus: true, progressUpdateIntervalMillis: 16 }
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY // Use a preset for quality
        );
        setRecording(recording);
        setRecordingFileURI(null); // Clear previous recording URI
        console.log('Recording started');
      } catch (error) {
        console.log('error starting recording', error);
        Alert.alert('Error Recording', 'Unable to start recording audio.');
        setRecording(null); // Ensure state is reset on error
      }
    } else {
      Alert.alert('Permission Required', 'Please grant microphone permission.');
    }
  }

  async function handleRecordingStop() {
    try {
      if (recording) {
        console.log('Stopping recording..');
        // Set appropriate audio mode for playback again
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false, // Disable recording mode
          interruptionModeIOS: InterruptionModeIOS.DoNotMix,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
          playThroughEarpieceAndroid: true, // Allow playback via earpiece
        });

        await recording.stopAndUnloadAsync();
        const fileUri = recording.getURI();

        console.log('Recording stopped and stored at', fileUri);

        setRecordingFileURI(fileUri);
        setRecording(null);

        // Optional: Reload permissions check if needed, though useEffect should handle it
        // Audio.requestPermissionsAsync();
      }
    } catch (error) {
      console.log('error stopping recording', error);
      // Changed alert message from 'pausing' to 'stopping'
      Alert.alert('Error Stopping', 'Unable to stop recording audio.');
      // Even if stop fails, attempt to clear recording state? Depends on desired behavior.
      setRecording(null);
    }
  }

  async function handleAudioPlayPause() {
    if (!recordingFileURI) {
      console.log('No recording file URI available.');
      return;
    }

    try {
      if (sound) {
        // If sound exists, check its status
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          if (status.isPlaying) {
            console.log('Pausing Sound');
            await sound.pauseAsync();
            setIsPlaying(false);
          } else {
            console.log('Playing Sound');
            await sound.playAsync();
            setIsPlaying(true);
          }
          return; // Handled play/pause on existing sound
        }
        // If status is not loaded, maybe unload it and create a new one
        console.log('Sound not loaded, attempting unload...');
        await sound.unloadAsync();
        setSound(null);
        setIsPlaying(false);
      }

      // If no sound object exists or previous one was unloaded, create a new one
      console.log('Loading Sound');
      const { sound: newSound, status: newStatus } = await Audio.Sound.createAsync(
        { uri: recordingFileURI }
        // { shouldPlay: true } // Don't auto-play here, play explicitly below
      );
      setSound(newSound);
      // Optional: Set up a listener to automatically unload when playback finishes
      newSound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.isLoaded && status.didJustFinish) {
          console.log('Playback finished, unloading sound');
          await newSound.unloadAsync(); // Unload resources
          setSound(null); // Clear state
          setIsPlaying(false);
        }
      });

      console.log('Playing Sound');
      await newSound.playAsync();
      setIsPlaying(true);
    } catch (error) {
      console.log('Error playing audio', error);
      Alert.alert('Error Playback', 'Unable to play audio.');
      // Ensure state is reset on error during creation/playback
      if (sound) {
        await sound.unloadAsync().catch(() => {}); // Attempt unload, ignore errors
        setSound(null);
      }
      setIsPlaying(false);
    }
  }

  // Effect to request permissions and set initial audio mode on mount
  useEffect(() => {
    // Initial mode set for potential playback on startup (less common for this flow)
    // The mode is explicitly set in handleRecordingStart and handleRecordingStop as well
    // to switch between recording and playback needs.
    Audio.requestPermissionsAsync().then(({ granted }) => {
      if (granted) {
        Audio.setAudioModeAsync({
          allowsRecordingIOS: false, // Start in playback-friendly mode
          interruptionModeIOS: InterruptionModeIOS.DoNotMix,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
          playThroughEarpieceAndroid: true,
        });
      } else {
        Alert.alert('Permission Required', 'Microphone permission is needed for recording.');
      }
    });

    // Cleanup effect: Unload the sound when the component unmounts
    return () => {
      if (sound) {
        console.log('Component unmounting, unloading sound');
        sound.unloadAsync(); // No await in cleanup return
      }
    };
  }, [sound]); // Add sound to dependency array so the cleanup runs when sound changes

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, recording && styles.recording]}
        onPressIn={handleRecordingStart}
        onPressOut={handleRecordingStop}>
        <MaterialIcons name="mic" size={44} color="#212121" />
      </Pressable>

      {recording && <Text style={styles.label}>Recording...</Text>}
      {isPlaying && <Text style={styles.label}>Playing...</Text>}
      {!recording && !isPlaying && recordingFileURI && (
        <Text style={styles.label}>Ready to Play</Text>
      )}
      {!recording && !isPlaying && !recordingFileURI && (
        <Text style={styles.label}>Hold to Record</Text>
      )}

      {recordingFileURI && (
        <Button
          title={isPlaying ? 'Pause' : 'Listen'} // Button title changes based on state
          onPress={handleAudioPlayPause}
        />
      )}
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20, // Added padding
  },
  button: {
    width: 94,
    height: 94,
    borderRadius: 47,
    backgroundColor: '#B3B3B3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center', // Center text
  },
  recording: {
    backgroundColor: '#1DB954',
  },
});
