/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Modal, View, Pressable, Image, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { fitContainer, useImageResolution } from 'react-native-zoom-toolkit';
import { screenWidth } from '~/utils/helper';
import PinchZoom from './pinch-zoom';

type ZoomImageProps = {
  uri: string;
  thumbHeight?: number;
};

const ZoomImage: React.FC<ZoomImageProps> = ({ uri, thumbHeight = 300 }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Pressable onPress={() => setVisible(true)}>
        <Image
          source={{ uri }}
          style={{ width: screenWidth, height: thumbHeight }}
          resizeMode="cover"
        />
      </Pressable>

      <ZoomImageModal uri={uri} visible={visible} onRequestClose={() => setVisible(false)} />
    </>
  );
};

type ZoomImageModalProps = {
  uri: string;
  visible: boolean;
  onRequestClose: () => void;
};

const ZoomImageModal: React.FC<ZoomImageModalProps> = ({ uri, visible, onRequestClose }) => {
  const { resolution } = useImageResolution({ uri });

  if (!visible) return null;

  const containerSize = { width: screenWidth, height: screenWidth * 1.4 };

  const fittedSize =
    resolution != null
      ? fitContainer(resolution.width / resolution.height, containerSize)
      : containerSize;

  return (
    <Modal visible={visible} onRequestClose={onRequestClose} transparent animationType="fade">
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.backdrop}>
          <View style={styles.viewerContainer}>
            <Pressable style={StyleSheet.absoluteFill} onPress={onRequestClose} />

            <PinchZoom uri={uri} containerSize={fittedSize} />
          </View>
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewerContainer: {
    overflow: 'hidden',
    borderRadius: 12,
  },
  loader: {
    position: 'absolute',
    alignSelf: 'center',
  },
});

export default ZoomImage;
