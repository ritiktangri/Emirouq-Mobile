// MultiRangeSlider.tsx
import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  LayoutChangeEvent,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';

type MultiRangeSliderProps = {
  min: number;
  max: number;
  step?: number;
  initialLow?: number;
  initialHigh?: number;
  onChange?: (low: number, high: number) => void;
  trackHeight?: number;
  thumbSize?: number;
  trackColor?: string;
  selectedTrackColor?: string;
  thumbColor?: string;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const roundToStep = (value: number, step: number) => Math.round(value / step) * step;

const MultiRangeSlider: React.FC<MultiRangeSliderProps> = ({
  min,
  max,
  step = 1,
  initialLow,
  initialHigh,
  onChange,
  trackHeight = 4,
  thumbSize = 24,
  trackColor = '#ccc',
  selectedTrackColor = '#4a90e2',
  thumbColor = '#4a90e2',
}) => {
  const [containerWidth, setContainerWidth] = useState(0);

  const [low, setLow] = useState(initialLow ?? min);
  const [high, setHigh] = useState(initialHigh ?? max);

  const lowX = useRef(0);
  const highX = useRef(0);

  // Update external listener
  useEffect(() => {
    if (onChange) onChange(low, high);
  }, [low, high, onChange]);

  const valueToX = (value: number) => {
    if (max === min) return 0;
    const ratio = (value - min) / (max - min);
    return ratio * containerWidth;
  };

  const xToValue = (x: number) => {
    if (containerWidth === 0) return min;
    const ratio = x / containerWidth;
    const value = min + ratio * (max - min);
    return clamp(roundToStep(value, step), min, max);
  };

  const onContainerLayout = (e: LayoutChangeEvent) => {
    const width = e.nativeEvent.layout.width;
    setContainerWidth(width);

    // Initialize X positions when layout is known
    lowX.current = valueToX(low);
    highX.current = valueToX(high);
  };

  // PanResponder for LOW thumb
  const lowPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        lowX.current = valueToX(low);
      },
      onPanResponderMove: (_evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        const newX = clamp(lowX.current + gestureState.dx, 0, valueToX(high));
        const newValue = xToValue(newX);
        setLow(newValue);
      },
    })
  ).current;

  // PanResponder for HIGH thumb
  const highPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        highX.current = valueToX(high);
      },
      onPanResponderMove: (_evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        const newX = clamp(highX.current + gestureState.dx, valueToX(low), containerWidth);
        const newValue = xToValue(newX);
        setHigh(newValue);
      },
    })
  ).current;

  const lowOffset = valueToX(low);
  const highOffset = valueToX(high);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container} onLayout={onContainerLayout}>
        {/* Unselected full track */}
        <View
          style={[
            styles.track,
            {
              height: trackHeight,
              backgroundColor: trackColor,
            },
          ]}
        />

        {/* Selected range track */}
        <View
          style={[
            styles.trackSelected,
            {
              height: trackHeight,
              left: lowOffset,
              width: Math.max(highOffset - lowOffset, 0),
              backgroundColor: selectedTrackColor,
            },
          ]}
        />

        {/* Low thumb */}
        <View
          style={[
            styles.thumb,
            {
              left: lowOffset - thumbSize / 2,
              width: thumbSize,
              height: thumbSize,
              borderRadius: thumbSize / 2,
              backgroundColor: thumbColor,
            },
          ]}
          {...lowPanResponder.panHandlers}
        />

        {/* High thumb */}
        <View
          style={[
            styles.thumb,
            {
              left: highOffset - thumbSize / 2,
              width: thumbSize,
              height: thumbSize,
              borderRadius: thumbSize / 2,
              backgroundColor: thumbColor,
            },
          ]}
          {...highPanResponder.panHandlers}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
  },
  track: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderRadius: 999,
  },
  trackSelected: {
    position: 'absolute',
    borderRadius: 999,
  },
  thumb: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3, // Android shadow
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
});

export default MultiRangeSlider;
