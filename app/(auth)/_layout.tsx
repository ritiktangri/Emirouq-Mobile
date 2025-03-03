import { Stack } from 'expo-router';
import React from 'react';

const _layout = () => {
  return (
    <Stack
      initialRouteName="login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="verify-otp" />
    </Stack>
  );
};

export default _layout;
