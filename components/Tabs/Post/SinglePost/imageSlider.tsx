import {
  View,
  FlatList,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Image,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import { width } from '~/constants/Colors';

const ImageSlider = ({ images, setModalVisible, fittedSize }: any) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const IMAGE_WIDTH = width;
  const IMAGE_GAP = 10;

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (IMAGE_WIDTH + IMAGE_GAP));
    setActiveIndex(index);
  };

  return (
    <>
      <FlatList
        data={images}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        snapToInterval={IMAGE_WIDTH + IMAGE_GAP}
        decelerationRate="fast"
        snapToAlignment="start"
        onMomentumScrollEnd={onScrollEnd}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible?.(true)}>
            <Image
              source={{ uri: item }}
              style={{
                width: IMAGE_WIDTH,
                height: IMAGE_WIDTH * 0.7,
                borderRadius: 8,
                marginRight: IMAGE_GAP,
              }}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
      />

      {/* Dots */}
      <View style={styles.dotsContainer}>
        {images.map((_, index) => (
          <View key={index} style={[styles.dot, index === activeIndex && styles.activeDot]} />
        ))}
      </View>
    </>
  );
};

export default ImageSlider;

const styles = StyleSheet.create({
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#bbb',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000',
  },
  closeBtn: {
    position: 'absolute',
    right: 20,
    top: 40,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: '#fff',
    fontSize: 24,
    marginTop: -2,
  },
});
