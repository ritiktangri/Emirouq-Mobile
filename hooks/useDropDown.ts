/* eslint-disable import/order */
import React from 'react';
import { LayoutRectangle, Pressable } from 'react-native';
import { height as screenHeight } from '~/constants/Colors';

export const useDropdown = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [dropdownPosition, setDropdownPosition] = React.useState<'top' | 'bottom'>('bottom');
  const [buttonLayout, setButtonLayout] = React.useState<LayoutRectangle | null>(null);
  const buttonRef = React.useRef<React.ElementRef<typeof Pressable>>(null);

  const toggleDropdown = React.useCallback(() => {
    if (!isVisible && buttonRef?.current) {
      buttonRef?.current?.measure((fx, fy, width, height, px, py) => {
        const spaceBelow = screenHeight - (py + height);
        const spaceAbove = py;

        setDropdownPosition(spaceBelow >= 200 || spaceBelow > spaceAbove ? 'bottom' : 'top');
        setButtonLayout({ x: px, y: py, width, height });
        setIsVisible(true);
      });
    } else {
      setIsVisible(false);
    }
  }, [isVisible]);

  const handleSelect = React.useCallback(() => {
    setIsVisible(false);
  }, []);

  return {
    isVisible,
    dropdownPosition,
    buttonLayout,
    buttonRef,
    toggleDropdown,
    handleSelect,
  };
};
