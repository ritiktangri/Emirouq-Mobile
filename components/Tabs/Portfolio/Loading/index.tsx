import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withRepeat,
} from 'react-native-reanimated';
import { width } from '~/constants/Colors';
import { cn } from '~/utils/helper.utils';

const Loading = () => {
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1, // Repeat indefinitely
      true // Reverse the animation on each repeat
    );
  }, []);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const data = [
    { id: 'select-pnl', type: 'select-pnl' },
    { id: 'metric-stats', type: 'metric-stats' },
    { id: 'net-pnl', type: 'net-pnl' },
    { id: 'trade-wins', type: 'trade-wins' },
    { id: 'profit-loss', type: 'profit-loss' },
    { id: 'recent-trades', type: 'recent-trades' },
  ];

  const renderItem = ({ item }: any) => {
    switch (item.type) {
      case 'metric-stats':
        return (
          <View className="flex-row justify-between ">
            {[1, 2, 3].map((item) => (
              <View key={item} className="mx-1 flex">
                <Animated.View
                  style={[
                    {
                      width: '100%',
                      borderRadius: 8,
                      backgroundColor: 'rgba(0,0,0,0.2)',
                    },
                    animatedStyles,
                  ]}
                />
                <Animated.View
                  style={[
                    {
                      width: '50%',
                      borderRadius: 8,
                      backgroundColor: 'rgba(0,0,0,0.2)',
                    },
                    animatedStyles,
                  ]}
                />
              </View>
            ))}
          </View>
        );
      case 'net-pnl':
        return (
          <View className="p-2">
            <View className=" flex-row justify-between">
              <View className={cn('mr-2 flex-1 rounded-lg p-4 dark:bg-dashboard_card')}>
                <Animated.View
                  style={[
                    {
                      width: 80,
                      height: 24,
                      marginBottom: 8,
                      backgroundColor: 'rgba(0,0,0,0.2)',
                    },
                    animatedStyles,
                  ]}
                />
                <Animated.View
                  style={[
                    {
                      width: 128,
                      height: 32,
                      borderRadius: 8,
                      backgroundColor: 'rgba(0,0,0,0.2)',
                    },
                    animatedStyles,
                  ]}
                />
              </View>
              <View className={cn('ml-2 flex-1 rounded-lg p-4 dark:bg-dashboard_card ')}>
                <Animated.View
                  style={[
                    {
                      width: 80,
                      height: 24,
                      marginBottom: 8,
                      backgroundColor: 'rgba(0,0,0,0.2)',
                    },
                    animatedStyles,
                  ]}
                />
                <Animated.View
                  style={[
                    {
                      width: 128,
                      height: 32,
                      borderRadius: 8,
                      backgroundColor: 'rgba(0,0,0,0.2)',
                    },
                    animatedStyles,
                  ]}
                />
              </View>
            </View>
          </View>
        );
      case 'trade-wins':
        return (
          <View className="p-2">
            <View className={cn('dar:bg-dashboard_card rounded-lg p-4')}>
              <Animated.View
                style={[
                  {
                    width: 96,
                    height: 32,
                    marginBottom: 16,
                    backgroundColor: 'rgba(0,0,0,0.2)',
                  },
                  animatedStyles,
                ]}
              />
              <View className="flex-row justify-around">
                <Animated.View
                  style={[
                    {
                      width: width * 0.4,
                      height: width * 0.4,
                      borderRadius: width * 0.2,
                      alignSelf: 'center',
                      backgroundColor: 'rgba(0,0,0,0.2)',
                    },
                    animatedStyles,
                  ]}
                />
                <View className="flex-col justify-evenly">
                  {[1, 2, 3].map((item) => (
                    <Animated.View
                      key={item}
                      style={[
                        {
                          width: 64,
                          height: 16,
                          borderRadius: 8,
                          backgroundColor: 'rgba(0,0,0,0.2)',
                        },
                        animatedStyles,
                      ]}
                    />
                  ))}
                </View>
              </View>
            </View>
          </View>
        );
      case 'profit-loss':
        return (
          <View className="p-2">
            <View className={cn(' rounded-lg p-4 dark:bg-dashboard_card')}>
              <Animated.View
                style={[
                  {
                    width: 96,
                    height: 32,
                    marginBottom: 16,
                    backgroundColor: 'rgba(0,0,0,0.2)',
                  },
                  animatedStyles,
                ]}
              />
              <Animated.View
                style={[
                  {
                    width: width * 0.4,
                    height: width * 0.4,
                    borderRadius: width * 0.2,
                    alignSelf: 'center',
                    marginBottom: 16,
                    backgroundColor: 'rgba(0,0,0,0.2)',
                  },
                  animatedStyles,
                ]}
              />
            </View>
          </View>
        );
      case 'select-pnl':
      case 'recent-trades':
        return (
          <View className="p-2">
            <View className={cn(' rounded-lg p-4 dark:bg-dashboard_card')}>
              <Animated.View
                style={[
                  {
                    width: '100%',
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    backgroundColor: 'rgba(0,0,0,0.2)',
                  },
                  animatedStyles,
                ]}
              />
              <Animated.View
                style={[
                  {
                    width: '100%',
                    paddingVertical: 20,
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    borderRadius: 8,
                  },
                  animatedStyles,
                ]}
              />
            </View>
          </View>
        );
      default:
        return <></>;
    }
  };

  return <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.id} />;
};

export default Loading;
