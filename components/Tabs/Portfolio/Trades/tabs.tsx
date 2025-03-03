import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import theme from '~/utils/theme';
import { DefaultText as Text } from '~/components/common/DefaultText';
import { cn } from '~/utils/helper.utils';

const Tabs = ({
  state,
  setState,
  list,
  textClassName,
}: {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  list: any;
  textClassName?: string;
}) => {
  const [tabWidths, setTabWidths] = useState({} as any); // Store widths of each tab
  const animatedValue = useRef(new Animated.Value(0)).current;

  const handleTabPress = (tabKey: any, tabWidth: any) => {
    const selectedIndex = list?.findIndex((tab: any) => tab.key === tabKey);
    const targetValue = list
      .slice(0, selectedIndex)
      .reduce((sum: any, tab: any) => sum + (tabWidths[tab.key] || 0), 0);

    Animated.timing(animatedValue, {
      toValue: targetValue,
      duration: 250,
      useNativeDriver: false, // We're animating layout properties
    }).start();

    setState(tabKey);
  };

  const handleLayout = (event: any, tabKey: any) => {
    const { width } = event.nativeEvent.layout;
    setTabWidths((prevWidths: any) => ({ ...prevWidths, [tabKey]: width }));
  };

  const activeTabWidth = tabWidths[state] || 0;

  return (
    <View className="relative  flex-row ">
      {/* Animated Underline */}
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 0,
          left: animatedValue,
          width: activeTabWidth,
          height: 2,
          backgroundColor: theme.colors.primary,
        }}
      />

      {/* Tabs */}
      {list?.map((tab: any) => (
        <TouchableOpacity
          key={tab.id}
          onLayout={(event) => handleLayout(event, tab.key)}
          className="flex-1"
          onPress={() => handleTabPress(tab.key, tabWidths[tab.key])}>
          <Text
            className={cn(
              state === tab.key ? 'text-primary' : 'dark:text-dashboard_card_text',
              'pb-2 text-center font-poppinsMedium text-base',
              textClassName
            )}>
            {tab.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Tabs;
