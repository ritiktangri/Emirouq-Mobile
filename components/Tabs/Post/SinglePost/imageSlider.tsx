import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  type ImageStyle,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { FlatList, Pressable } from 'react-native-gesture-handler';

import { width as screenWidth } from '~/constants/Colors';

type ImageSliderProps = {
  images?: string[];
  setModalVisible?: (visible: boolean) => void;
  width?: number;
  height?: number;
  showPagination?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  dotColor?: string;
  activeDotColor?: string;
  onSwipeStart?: () => void;
  onSwipeEnd?: () => void;
};

const ImageSlider = ({
  images = [],
  setModalVisible,
  width = screenWidth - 20,
  height = Math.round(screenWidth * 0.7),
  showPagination = true,
  containerStyle,
  imageStyle,
  dotColor = '#D1D5DB',
  activeDotColor = '#111827',
  onSwipeStart,
  onSwipeEnd,
}: ImageSliderProps) => {
  const normalizedImages = React.useMemo(() => images.filter(Boolean), [images]);
  const hasMultipleImages = normalizedImages.length > 1;
  const [activeIndex, setActiveIndex] = React.useState(0);
  const listRef = React.useRef<any>(null);
  const isAdjustingRef = React.useRef(false);
  const loopedImages = React.useMemo(() => {
    if (!hasMultipleImages) {
      return normalizedImages;
    }

    return [
      normalizedImages[normalizedImages.length - 1],
      ...normalizedImages,
      normalizedImages[0],
    ];
  }, [hasMultipleImages, normalizedImages]);

  React.useEffect(() => {
    setActiveIndex(0);
    isAdjustingRef.current = false;

    if (!listRef.current) {
      return;
    }

    requestAnimationFrame(() => {
      listRef.current?.scrollToOffset({
        offset: hasMultipleImages ? width : 0,
        animated: false,
      });
    });
  }, [hasMultipleImages, normalizedImages, width]);

  const handleScrollStart = () => {
    if (hasMultipleImages) {
      onSwipeStart?.();
    }
  };

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!hasMultipleImages) {
      onSwipeEnd?.();
      return;
    }

    if (isAdjustingRef.current) {
      isAdjustingRef.current = false;
      onSwipeEnd?.();
      return;
    }

    const nextIndex = Math.round(event.nativeEvent.contentOffset.x / width);

    if (nextIndex <= 0) {
      isAdjustingRef.current = true;
      listRef.current?.scrollToOffset({
        offset: width * normalizedImages.length,
        animated: false,
      });
      setActiveIndex(normalizedImages.length - 1);
      onSwipeEnd?.();
      setTimeout(() => {
        isAdjustingRef.current = false;
      }, 50);
      return;
    }

    if (nextIndex >= loopedImages.length - 1) {
      isAdjustingRef.current = true;
      listRef.current?.scrollToOffset({
        offset: width,
        animated: false,
      });
      setActiveIndex(0);
      onSwipeEnd?.();
      setTimeout(() => {
        isAdjustingRef.current = false;
      }, 50);
      return;
    }

    setActiveIndex(Math.max(0, Math.min(nextIndex - 1, normalizedImages.length - 1)));
    onSwipeEnd?.();
  };

  if (!normalizedImages.length) {
    return <View style={[styles.fallback, { width, height }, containerStyle]} />;
  }

  return (
    <View style={[styles.container, { width, height }, containerStyle]}>
      <FlatList
        ref={listRef}
        data={loopedImages}
        keyExtractor={(item, index) => `${item}-${index}`}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        disableIntervalMomentum
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        scrollEventThrottle={16}
        initialScrollIndex={hasMultipleImages ? 1 : 0}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onScrollBeginDrag={handleScrollStart}
        onMomentumScrollEnd={handleScrollEnd}
        onScrollEndDrag={handleScrollEnd}
        renderItem={({ item }) => {
          const image = (
            <Image source={{ uri: item }} style={[styles.image, imageStyle]} resizeMode="cover" />
          );

          return (
            <View style={{ width, height }}>
              {setModalVisible ? (
                <Pressable
                  onPress={() => setModalVisible(true)}
                  style={styles.slidePressable}
                  android_ripple={{ color: 'transparent' }}>
                  {image}
                </Pressable>
              ) : (
                image
              )}
            </View>
          );
        }}
      />

      {showPagination && hasMultipleImages ? (
        <View pointerEvents="none" style={styles.pagination}>
          {normalizedImages.map((_, index) => {
            const isActive = index === activeIndex;
            return (
              <View
                key={`${index}`}
                style={[
                  styles.dot,
                  {
                    backgroundColor: isActive ? activeDotColor : dotColor,
                    opacity: isActive ? 1 : 0.55,
                    width: isActive ? 10 : 5,
                  },
                ]}
              />
            );
          })}
        </View>
      ) : null}
    </View>
  );
};

export default ImageSlider;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    alignSelf: 'center',
  },
  slidePressable: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  fallback: {
    backgroundColor: '#E5E7EB',
  },
  pagination: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 5,
    borderRadius: 999,
    marginHorizontal: 3,
  },
});
