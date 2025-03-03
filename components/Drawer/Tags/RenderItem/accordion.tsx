import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useImperativeHandle, useState, useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTheme } from '~/context/ThemeContext';

import { cn } from '~/utils/helper.utils';
import theme from '~/utils/theme';

type Props = {
  title: React.ReactNode;
  children?: React.ReactNode;
  buttonClassName?: string;
  item?: any;
};

export const Accordion = React.forwardRef((props: Props, ref) => {
  const { title, children, buttonClassName, item } = props;
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<Animatable.View>(null);
  const [contentHeight, setContentHeight] = useState(0); // State to store content height
  const measured = useRef(false);

  useEffect(() => {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }, []);

  const toggleOpen = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  }, [isOpen]);

  useImperativeHandle(
    ref,
    () => ({
      open: () => {
        if (isOpen) {
          return;
        }
        return toggleOpen();
      },
    }),
    [toggleOpen, isOpen]
  );

  const iconName = isOpen ? 'chevron-up' : 'chevron-down';

  const onLayout = useCallback((event: any) => {
    const { height } = event.nativeEvent.layout;
    if (!measured.current) {
      setContentHeight(height);
      measured.current = true;
    }
  }, []);
  const { isDarkTheme } = useTheme();

  return (
    <View className="overflow-hidden rounded-md bg-white dark:bg-analytics_card ">
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={item?.tags?.length ? toggleOpen : () => {}}
        className={cn('flex-row items-center gap-x-2 p-4', buttonClassName)}>
        {item?.tags?.length ? (
          <Ionicons
            name={iconName}
            size={24}
            color={isDarkTheme ? theme.colors.dashboard_card_text : theme.colors.analytics_card}
          />
        ) : (
          <Ionicons
            name={iconName}
            size={24}
            // color={isDarkTheme ? theme.colors.dashboard_card_text : theme.colors.analytics_card}
            className="!text-gray-200 dark:!text-account_table_bg"
          />
        )}
        {title}
      </TouchableOpacity>

      <View style={{ height: isOpen ? 'auto' : 0, overflow: 'hidden' }}>
        <Animatable.View
          ref={contentRef}
          className="bg-white dark:bg-black"
          duration={300}
          useNativeDriver
          onLayout={onLayout}
          style={{ opacity: isOpen ? 1 : 0 }}
          animation={isOpen ? 'fadeIn' : 'fadeOut'}>
          {children}
        </Animatable.View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  content: {
    padding: 10,
  },
});
