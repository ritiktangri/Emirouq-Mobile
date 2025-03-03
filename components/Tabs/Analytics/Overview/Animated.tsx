import React from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { DefaultText as Text } from '~/components/common/DefaultText';

const AnimatedDropdown = ({ item, index, total }: any) => {
  return (
    <Animated.View
      key={item.id}
      entering={FadeInDown.springify()
        .damping(80)
        .stiffness(200)
        .delay(index * 75)}
      className={`${
        index === total - 1 ? 'border-b-0' : 'border-b-[1px] border-gray-700'
      } flex-row py-3
        `}>
      <Text className="flex-1 font-poppinsMedium text-sm text-gray-600 dark:text-dashboard_card_text">
        {item.key}
      </Text>
      <Text className="font-poppinsMedium text-sm dark:text-dashboard_card_text">{item.value}</Text>
    </Animated.View>
  );
};

export default AnimatedDropdown;
