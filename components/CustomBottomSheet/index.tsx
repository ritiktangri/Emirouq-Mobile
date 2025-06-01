import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Animated, Platform, StyleSheet, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { screenHeight } from '~/utils/helper';

interface CustomBottomSheetHandle {
  open: () => void;
  close: () => void;
}

interface CustomBottomSheetProps {
  showIndicator?: boolean;
  bottomSheetHeight?: number;
  visible?: boolean;
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
  expandable?: boolean;
  dragFromTopOnly?: boolean;
  closeOnPressMask?: boolean;
  expanded?: boolean;
  setExpanded?: React.Dispatch<React.SetStateAction<boolean>>;
  dragIconHeight?: number;
  children: React.ReactNode;
}

const CustomBottomSheet = forwardRef<CustomBottomSheetHandle, CustomBottomSheetProps>(
  (
    {
      children,
      showIndicator = false,
      bottomSheetHeight = screenHeight * 0.5,
      visible,
      setVisible = () => {},
      onClose = () => {},
      expandable,
      dragFromTopOnly = false,
      closeOnPressMask = true,
      expanded,
      setExpanded = () => {},
      dragIconHeight = 16,
    },
    ref
  ) => {
    const open = () => setVisible(true);
    const close = () => setVisible(false);

    useImperativeHandle(ref, () => ({ open, close }));

    const [opacity, setOpacity] = useState(0.4);

    const sheetRef = useRef<any>(null);

    const [sheetHeight, setSheetHeight] = useState(bottomSheetHeight);

    useEffect(() => {
      if (expanded) {
        setSheetHeight(screenHeight * 0.9);
      } else {
        setSheetHeight(bottomSheetHeight);
      }
    }, [expanded, bottomSheetHeight]);

    useEffect(() => {
      if (visible) {
        sheetRef.current.open();
      } else {
        sheetRef.current.close();
        setExpanded(false);
      }
    }, [visible]);

    return (
      <RBSheet
        ref={sheetRef}
        closeOnDragDown
        dragFromTopOnly={dragFromTopOnly}
        closeOnPressMask={closeOnPressMask}
        closeOnPressBack
        onClose={() => {
          setVisible(false);
          onClose();
        }}
        animationType="fade"
        keyboardAvoidingViewEnabled
        customStyles={{
          draggableIcon: {
            height: expanded || expandable ? dragIconHeight : 0,
            width: 0,
          },
          wrapper: {
            backgroundColor: `rgba(47,47,47,${opacity})`,
          },
          container: {
            justifyContent: 'center',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: sheetHeight,
          },
        }}>
        <Animated.View
          onTouchMove={(event) => {
            const height = bottomSheetHeight - sheetRef.current?.state?.pan?.y?._value;
            const newOpacity = ((height / bottomSheetHeight) * 100).toFixed(2);
            if (
              ((Platform.OS === 'android' && event?.nativeEvent?.locationY < 20) ||
                event?.nativeEvent?.locationY < -100) &&
              !expanded &&
              expandable
            ) {
              setExpanded(true);
            }
            setOpacity((parseFloat(newOpacity) * 0.04) / 10);
            return event;
          }}
          onTouchEnd={(event) => {
            setTimeout(() => setOpacity(0.4), 1000);
            return event;
          }}
          style={{ flex: 1, marginTop: -18 }}>
          {showIndicator && <View style={styles.dash} />}
          {children}
        </Animated.View>
      </RBSheet>
    );
  }
);

export default CustomBottomSheet;

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  common: {
    shadowColor: '#000',
    shadowOffset: {
      height: -3,
      width: 0,
    },
    shadowOpacity: 0.24,
    shadowRadius: 4,
  },
  backDrop: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 80,
    backgroundColor: 'rgba(47,47,47,0.4)',
  },
  dash: {
    backgroundColor: '#D9D9D9',
    marginTop: 8,
    width: '20%',
    height: 4,
    borderRadius: 4,
    alignSelf: 'center',
  },
});
