/* eslint-disable import/order */
import React, { forwardRef, useRef, useState } from 'react';
import { Alert, Pressable } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { audioRecorder } from '~/image';
import LottieFilesAnimation from '~/components/LottieFiles';
import { useTheme } from '~/context/ThemeContext';

const MAX_DURATION = 10; // seconds
const MIN_RECORDING_DURATION = 2000;

const AudioRecorder = forwardRef(({ onRecordingComplete, audio }: any, ref: any) => {
  // ref is currentlyPlayingRef

  const [recording, setRecording] = useState(false);

  // const [recording, setRecording] = useState(null);
  // const [recordings, setRecordings] = useState([] as any);
  const { showToast } = useTheme();
  const recordingRef: any = useRef(null);
  const pressStartTime: any = useRef(null);
  const durationRef: any = useRef(0);
  const intervalIdRef: any = useRef(null);

  const startRecording = async () => {
    if (ref.current) {
      // await ref.current.stopAsync();
      showToast(`Wait for the current audio to finish`, 'warning', 1000);
      // ref.current = null;
      return;
    }

    if (recordingRef.current) {
      try {
        await recordingRef.current.stopAndUnloadAsync();
        // showToast(`Recording stopped`, 'info', 1000);
      } catch {}
      recordingRef.current = null;
    }

    if (ref.current) {
      await ref.current.stopAsync();
      // showToast(`Playback stopped`, 'info', 1000);
      ref.current = null;
    }

    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== 'granted') {
        Alert.alert('Permission Required', 'Microphone permission is required.');
        return;
      }
      showToast(`Recording`, 'info', 10000);

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      // const recordingOptions = {
      //   android: {
      //     extension: '.m4a',
      //     outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
      //     audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
      //     sampleRate: 44100,
      //     numberOfChannels: 2,
      //     bitRate: 128000,
      //   },
      //   ios: {
      //     extension: '.caf',
      //     audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
      //     sampleRate: 44100,
      //     numberOfChannels: 2,
      //     bitRate: 128000,
      //     linearPCMBitDepth: 16,
      //     linearPCMIsBigEndian: false,
      //     linearPCMIsFloat: false,
      //   },
      // };
      setRecording(true);
      // const { recording }: any = await Audio.Recording.createAsync(recordingOptions);
      const { recording }: any = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      recordingRef.current = recording;
      durationRef.current = 0;

      intervalIdRef.current = setInterval(() => {
        if (durationRef.current >= MAX_DURATION) {
          stopRecording();
          return;
        }
        durationRef.current++;
      }, 1000);
    } catch (err) {
      console.error('Failed to start recording:', err);
      setRecording(false);
      showToast(`Error starting recording`, 'error', 1000);
    }
  };

  const stopRecording = async () => {
    setRecording(false);

    clearInterval(intervalIdRef.current);
    intervalIdRef.current = null;

    const elapsed = Date.now() - pressStartTime.current;

    if (!recordingRef.current) return;

    try {
      await recordingRef.current.stopAndUnloadAsync();
      const uri = recordingRef.current.getURI();

      if (elapsed < MIN_RECORDING_DURATION) {
        console.warn('Recording too short, discarded.');
        showToast(`Please record for at least 2 seconds`, 'warning', 1000);

        if (uri) {
          await FileSystem.deleteAsync(uri, { idempotent: true });
        }
      } else {
        const res = await recordingRef.current.createNewLoadedSoundAsync();
        const { sound, status } = res;
        const newRecording = {
          sound,
          duration: formatTime(status.durationMillis),
          uri,
        };
        showToast(`Uploading ...`, 'info', 1000);
        onRecordingComplete(newRecording);
        // setRecordings((prev: any) => [...prev, newRecording]);
      }
    } catch (err) {
      showToast(`Error stopping recording`, 'error', 1000);
      // console.error('Error stopping recording:', err);
    } finally {
      recordingRef.current = null;
      durationRef.current = 0;
      setRecording(false);
    }
  };

  const formatTime = (millis: any) => {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  return (
    <Pressable
      // style={[styles.recordButton, recording && styles.recordingActive]}
      onLongPress={() => {
        if (audio?.sound) {
          showToast('Only one audio can be recorded at a time', 'warning', 1000);
          return;
        }
        pressStartTime.current = Date.now();
        startRecording();
      }}
      className=""
      hitSlop={{ top: 40, bottom: 40, left: 40, right: 40 }}
      pressRetentionOffset={{ top: 40, bottom: 40, left: 40, right: 40 }}
      onPressOut={stopRecording}>
      <LottieFilesAnimation source={audioRecorder} play={recording} />
    </Pressable>
  );
});

export default AudioRecorder;
