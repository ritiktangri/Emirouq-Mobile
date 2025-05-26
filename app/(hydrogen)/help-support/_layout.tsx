import React from 'react';
import { Stack } from 'expo-router';
import { PostProvider } from '~/context/PostContext';

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};

export default _layout;
