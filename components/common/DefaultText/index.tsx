import React from 'react';
import { Text, useColorScheme } from 'react-native';

import { useTheme } from '~/context/ThemeContext';
import { cn } from '~/utils/helper';

const DefaultText = ({ light, dark, children, className, ...props }: any) => {
  const colorScheme = useColorScheme();
  return (
    <Text
      allowFontScaling={false}
      className={cn(colorScheme === 'dark' ? dark : light, className)}
      {...props}>
      {children}
    </Text>
  );
};

export { DefaultText };
