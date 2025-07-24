import { Stack } from 'expo-router';
import React from 'react';

const _layout = () => {
  return (
    <Stack
      initialRouteName="auth"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="auth" />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="verify-otp" />
      <Stack.Screen name="oauth-callback" />
    </Stack>
  );
};

export default _layout;
