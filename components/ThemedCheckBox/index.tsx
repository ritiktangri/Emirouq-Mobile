import Checkbox from 'expo-checkbox';
import React from 'react';
import { View } from 'react-native';
import { Text } from '~/components/common/Text';

import { useTheme } from '~/context/ThemeContext';
import { cn } from '~/utils/helper';

const ThemedCheckbox = ({ disabled = false, label, value, onValueChange }: any) => {
  const {
    colors: { primary },
  } = useTheme();

  return (
    <View className="w-full flex-row items-center">
      <Checkbox
        disabled={disabled}
        value={value}
        onValueChange={onValueChange}
        style={{ marginRight: 8, borderRadius: 4 }}
        color={value ? primary : 'gray'}
      />
      {label ? (
        <Text className={cn('font-poppinsMedium text-sm text-black dark:text-white')}>{label}</Text>
      ) : (
        <></>
      )}
    </View>
  );
};

export default ThemedCheckbox;
