/* eslint-disable import/order */
import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withRepeat,
} from 'react-native-reanimated';
import { height, width } from '~/constants/Colors';

const Loading = React.memo(({ id }: any) => {
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
    { id: 'overview', type: 'card1' },
    { id: 'overview', type: 'card2' },
    { id: 'overview', type: 'card3' },
    { id: 'overview', type: 'card4' },
    { id: 'chart', type: 'trade-distribution' },
    { id: 'chart', type: 'performance' },
    { id: 'chart', type: 'chart-table' },
    { id: 'winLoss', type: 'win-stats' },
    { id: 'winLoss', type: 'win-chart' },
    { id: 'winLoss', type: 'loss-stats' },
    { id: 'winLoss', type: 'loss-chart' },
  ];

  const renderItem = ({ item }: any) => {
    switch (item.type) {
      case 'card1':
      case 'card2':
      case 'card3':
      case 'card4':
        return (
          <View className="mb-3 rounded-lg p-4 dark:bg-dashboard_card">
            {[1, 2, 3, 4, 5]?.map((i) => (
              <Animated.View
                key={i}
                style={[
                  {
                    width: i * 50,
                    height: 20,
                    marginBottom: 10,
                    backgroundColor: 'rgba(0,0,0,0.2)',
                  },
                  animatedStyles,
                ]}
              />
            ))}
          </View>
        );
      case 'performance':
      case 'trade-distribution':
        return (
          <View
            className=" mb-3 h-[457px] rounded-lg p-4 dark:bg-dashboard_card"
            style={
              {
                // height: height * 0.4,
              }
            }>
            <View className=" h-full flex-col  justify-between rounded-lg ">
              <View>
                <Animated.View
                  style={[
                    {
                      width: '100%',
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
                      width: '50%',
                      height: 24,
                      marginBottom: 8,
                      backgroundColor: 'rgba(0,0,0,0.2)',
                    },
                    animatedStyles,
                  ]}
                />
              </View>
              <View className="flex-row items-end justify-between" style={{ height: width * 0.4 }}>
                {/* Create 7 animated bars (Mon - Sun) */}
                {[1, 2, 3, 4, 5, 6, 7].map((day, index) => (
                  <Animated.View
                    key={day}
                    style={[
                      {
                        width: width * 0.08, // Adjust width as needed
                        height: ((Math.floor(Math.random() * 6) + 1 + 1) * height * 0.3) / 6, // Example height variation
                        backgroundColor: 'rgba(0,0,0,0.2)',
                      },
                      animatedStyles,
                    ]}
                  />
                ))}
              </View>
            </View>
          </View>
        );
      case 'chart-table':
        return (
          <View className=" my-2 flex-1 rounded-lg p-3  dark:bg-dashboard_card">
            {[...Array(5)].map((_, index) => (
              <View key={index} className="my-2 flex-row items-center justify-between ">
                <Animated.View
                  style={[
                    {
                      width: width / 6,
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
                      width: width / 6,
                      height: 18,
                      borderRadius: 4,
                      backgroundColor: 'rgba(0,0,0,0.5)',
                    },
                    animatedStyles,
                  ]}
                />

                {[...Array(3)].map((_, colIndex) => (
                  <Animated.View
                    key={colIndex}
                    style={[
                      {
                        width: width / 6,
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

      case 'win-stats':
        return (
          <View className="gap-3">
            <View className="flex-1 flex-row  gap-2 rounded-lg p-4 dark:bg-dashboard_card">
              <Animated.View
                style={[
                  {
                    width: 80,
                    height: 20,
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
                    height: 20,
                    borderRadius: 8,
                    backgroundColor: 'rgba(0,0,0,0.2)',
                  },
                  animatedStyles,
                ]}
              />
            </View>
            <View className="flex-1 flex-col  gap-2 rounded-lg p-4 dark:bg-dashboard_card">
              <Animated.View
                style={[
                  {
                    width: 80,
                    height: 20,
                    marginBottom: 8,
                    backgroundColor: 'rgba(0,0,0,0.2)',
                  },
                  animatedStyles,
                ]}
              />
              {[1, 2, 3, 4]?.map((i) => (
                <View className="my-2 flex flex-row justify-between gap-y-2" key={i}>
                  <Animated.View
                    style={[
                      {
                        width: 128,
                        height: 14,
                        borderRadius: 8,
                        backgroundColor: 'rgba(0,0,0,0.2)',
                      },
                      animatedStyles,
                    ]}
                  />
                  <Animated.View
                    key={i}
                    style={[
                      {
                        width: 128,
                        height: 14,
                        borderRadius: 8,
                        backgroundColor: 'rgba(0,0,0,0.2)',
                      },
                      animatedStyles,
                    ]}
                  />
                </View>
              ))}
            </View>
          </View>
        );
      // case 'loss-chart':
      case 'win-chart':
        return (
          <View className="mt-4 rounded-lg p-4 dark:bg-dashboard_card">
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
        );
      default:
        return <></>;
    }
  };
  return (
    <FlatList
      contentContainerClassName="m-4 gap-y-4"
      className=""
      data={data?.filter((item) => item.id === id)}
      renderItem={renderItem}
      keyExtractor={(item) => item.type}
    />
  );
});

export default Loading;
