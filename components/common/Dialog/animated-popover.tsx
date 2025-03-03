import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const TooltipPopover = ({
  isVisible,
  onClose,
  children,
  anchorRef, // Ref to the anchor button/component
  backgroundColor = 'white',
  borderRadius = 5,
  arrowSize = 8,
  arrowColor = 'white',
  placement = 'bottom', // 'top', 'bottom', 'left', 'right' (relative to button)
}) => {
  const [anchorPosition, setAnchorPosition] = useState(null);

  useEffect(() => {
    if (isVisible && anchorRef.current) {
      anchorRef.current.measureInWindow((x, y, width, height) => {
        setAnchorPosition({ x, y, width, height });
      });
    }
  }, [isVisible, anchorRef.current]);

  if (!anchorPosition) {
    return null; // Don't render anything until we have the anchor's position
  }

  const calculatePopoverPosition = () => {
    const { x, y, width: anchorWidth, height: anchorHeight } = anchorPosition;
    const popoverWidth = 150; // Fixed width for simplicity
    const popoverHeight = 50; // Fixed height for simplicity
    let top = 0;
    let left = 0;

    switch (placement) {
      case 'top':
        top = y - popoverHeight - arrowSize;
        left = x + anchorWidth / 2 - popoverWidth / 2;
        break;
      case 'bottom':
        top = y + anchorHeight + arrowSize;
        left = x + anchorWidth / 2 - popoverWidth / 2;
        break;
      case 'left':
        top = y + anchorHeight / 2 - popoverHeight / 2;
        left = x - popoverWidth - arrowSize;
        break;
      case 'right':
        top = y + anchorHeight / 2 - popoverHeight / 2;
        left = x + anchorWidth + arrowSize;
        break;
      default: // Bottom
        top = y + anchorHeight + arrowSize;
        left = x + anchorWidth / 2 - popoverWidth / 2;
    }

    return { top, left, width: popoverWidth, height: popoverHeight }; // Return width and height
  };

  const popoverPosition = calculatePopoverPosition();

  const renderArrow = () => {
    let arrowStyle = {
      position: 'absolute',
      width: 0,
      height: 0,
      borderWidth: arrowSize,
      borderColor: 'transparent',
    };

    switch (placement) {
      case 'top':
        arrowStyle = {
          ...arrowStyle,
          borderBottomColor: arrowColor,
          bottom: -arrowSize * 2,
          left: popoverPosition.width / 2 - arrowSize, // Center arrow horizontally
        };
        break;
      case 'bottom':
        arrowStyle = {
          ...arrowStyle,
          borderTopColor: arrowColor,
          top: -arrowSize * 2,
          left: popoverPosition.width / 2 - arrowSize, // Center arrow horizontally
        };
        break;
      case 'left':
        arrowStyle = {
          ...arrowStyle,
          borderRightColor: arrowColor,
          right: -arrowSize * 2,
          top: popoverPosition.height / 2 - arrowSize, // Center arrow vertically
        };
        break;
      case 'right':
        arrowStyle = {
          ...arrowStyle,
          borderLeftColor: arrowColor,
          left: -arrowSize * 2,
          top: popoverPosition.height / 2 - arrowSize, // Center arrow vertically
        };
        break;
    }

    return <View style={arrowStyle} />;
  };

  return (
    <>
      {isVisible && (
        <TouchableOpacity
          style={styles.overlay} // Use absolute overlay to capture taps
          activeOpacity={1}
          onPress={onClose}
        />
      )}

      {isVisible && (
        <View
          style={[
            styles.popoverContainer,
            {
              position: 'absolute',
              top: popoverPosition.top,
              left: popoverPosition.left,
              width: popoverPosition.width,
              height: popoverPosition.height,
              backgroundColor: backgroundColor,
              borderRadius: borderRadius,
            },
          ]}>
          {renderArrow()}
          <View style={styles.content}>{children}</View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    zIndex: 1, // Below popover, above everything else
  },
  popoverContainer: {
    zIndex: 2, // Above overlay and other content
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
    overflow: 'hidden', // Clip content
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
});

export default TooltipPopover;
