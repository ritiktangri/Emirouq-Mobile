import React, { useRef } from 'react';
import {
  Animated,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import theme from '~/utils/theme';

interface Props {
  items: string[];
  onIndexChange: (index: number) => void;
  itemHeight: number;
}

const Picker: React.FC<Props> = (props) => {
  const { items, onIndexChange, itemHeight } = props;

  const scrollY = useRef(new Animated.Value(0)).current;

  const renderItem = ({ item, index }: ListRenderItemInfo<string>) => {
    const inputRange = [(index - 2) * itemHeight, (index - 1) * itemHeight, index * itemHeight];
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.6, 1, 0.6],
    });

    return (
      <Animated.View
        style={[{ height: itemHeight, transform: [{ scale }] }, styles.animatedContainer]}>
        <Text style={styles.pickerItem}>{item}</Text>
      </Animated.View>
    );
  };

  const modifiedItems = ['', ...items, ''];

  const momentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / itemHeight);
    onIndexChange(index);
  };

  return (
    <View style={{ height: itemHeight * 3 }}>
      <Animated.FlatList
        data={modifiedItems}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        onMomentumScrollEnd={momentumScrollEnd}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index,
        })}
      />
      <View style={[styles.indicatorHolder, { top: itemHeight }]}>
        <View style={[styles.indicator]} />
        <View style={[styles.indicator, { marginTop: itemHeight }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerItem: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
  },
  indicatorHolder: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  indicator: {
    width: 120,
    height: 1,
    backgroundColor: theme.colors.analytics_card,
  },
  animatedContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Picker;
