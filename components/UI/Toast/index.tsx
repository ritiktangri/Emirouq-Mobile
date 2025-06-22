// Toast.js

import { MaterialIcons } from '@expo/vector-icons';
import React, { useState, useImperativeHandle, forwardRef, useRef, useEffect } from 'react';
import { Text, StyleSheet, Animated, Platform, UIManager, Keyboard } from 'react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Toast = (props: any, ref: any) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const toast = (newMessage: string, newType: string, duration = 3000) => {
    setMessage(newMessage);
    setType(newType);
    setVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setVisible(false);
      });
    }, duration);
  };

  useImperativeHandle(ref, () => ({
    toast,
  }));

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', handleKeyboardShow);
    const hideSubscription = Keyboard.addListener('keyboardDidHide', handleKeyboardHide);
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleKeyboardShow = () => {
    setIsKeyboardVisible(true);
  };

  const handleKeyboardHide = () => {
    setIsKeyboardVisible(false);
  };
  if (visible) {
    const icon: any = {
      success: <MaterialIcons name="check-circle-outline" className="!text-lg !text-green-500" />,
      error: <MaterialIcons name="error-outline" className="!text-lg !text-red-500" />,
      warning: <MaterialIcons name="warning" className="!text-lg !text-yellow-500" />,
      info: <MaterialIcons name="info-outline" className="!text-lg !text-blue-500" />,
    };
    return (
      <Animated.View
        className={`mx-2 flex-row items-center gap-2`}
        style={[
          {
            opacity: fadeAnim,
            backgroundColor: '#292929',
            borderRadius: 10,
            padding: 10,
            position: 'absolute',
            bottom: isKeyboardVisible ? 320 : 100,
            alignSelf: 'center',
            zIndex: 999,
          },
        ]}>
        {type ? <>{icon[type]}</> : <></>}
        <Text style={styles.toastText}>{message}</Text>
      </Animated.View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    borderRadius: 30,
    overflow: 'hidden',
    flexDirection: 'row',
    bottom: 20,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  toastText: {
    color: 'white',
    fontSize: 14,
  },
});

export default forwardRef(Toast);
