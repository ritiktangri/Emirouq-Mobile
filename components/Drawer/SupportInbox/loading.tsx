import React, { useEffect } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withRepeat,
} from 'react-native-reanimated';

const Loading = ({ id }: any) => {
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
    { id: 'cumulative-pnl', type: 'cumulative-pnl' },
    { id: 'filter', type: 'filter' },
    { id: 'recent-trades', type: 'recent-trades' },
  ];

  const renderItem = ({ item }: any) => {
    const screenWidth = Dimensions.get('window').width;
    const columnWidth = screenWidth / 6;

    switch (item.type) {
      case 'recent-trades':
        return (
          <View className=" my-2 flex-1 rounded-lg  p-3 dark:dark:bg-dashboard_card">
            {[...Array(8)].map((_, index) => (
              <View key={index} className="my-2 flex-row items-center justify-between ">
                <Animated.View
                  style={[
                    {
                      width: columnWidth,
                      height: 18,
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      borderRadius: 4,
                    },
                    animatedStyles,
                  ]}
                />

                <Animated.View
                  style={[
                    {
                      width: columnWidth,
                      height: 18,
                      borderRadius: 4,
                      backgroundColor: 'rgba(0,0,0,0.5)',
                    },
                    animatedStyles,
                  ]}
                />

                {[...Array(2)].map((_, colIndex) => (
                  <Animated.View
                    key={colIndex}
                    style={[
                      {
                        width: columnWidth,
                        height: 18,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        borderRadius: 4,
                      },
                      animatedStyles,
                    ]}
                  />
                ))}
              </View>
            ))}
          </View>
        );
      case 'cumulative-pnl':
        return (
          <View className="my-2 h-[240px] rounded-lg p-2 dark:bg-dashboard_card">
            <View className=" flex-row items-center ">
              {[1, 2]?.map((i) => {
                return (
                  <View key={i} className=" flex-1  gap-4 rounded-lg p-4 dark:bg-dashboard_card">
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
                          height: 24,
                          borderRadius: 5,
                          backgroundColor: 'rgba(0,0,0,0.2)',
                        },
                        animatedStyles,
                      ]}
                    />
                    <Animated.View
                      style={[
                        {
                          width: 128,
                          height: 24,
                          borderRadius: 5,
                          backgroundColor: 'rgba(0,0,0,0.2)',
                        },
                        animatedStyles,
                      ]}
                    />
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
                          height: 24,
                          borderRadius: 5,
                          backgroundColor: 'rgba(0,0,0,0.2)',
                        },
                        animatedStyles,
                      ]}
                    />
                  </View>
                );
              })}
            </View>
          </View>
        );
      case 'filter':
        return (
          <View className=" rounded-lg p-3 dark:bg-dashboard_card">
            <View className="flex-row items-center justify-between">
              <Animated.View
                style={[
                  {
                    width: 128,
                    height: 24,
                    borderRadius: 5,
                    backgroundColor: 'rgba(0,0,0,0.2)',
                  },
                  animatedStyles,
                ]}
              />
              <Animated.View
                style={[
                  {
                    width: 128,
                    height: 24,
                    borderRadius: 5,
                    backgroundColor: 'rgba(0,0,0,0.2)',
                  },
                  animatedStyles,
                ]}
              />
              <Animated.View
                style={[
                  {
                    width: 128,
                    height: 24,
                    borderRadius: 5,
                    backgroundColor: 'rgba(0,0,0,0.2)',
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

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data?.filter((item) => (id ? item.id === id : true))}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default Loading;
