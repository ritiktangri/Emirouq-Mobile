/* eslint-disable import/order */
import { Stack } from 'expo-router';
import { CategoryProvider } from '~/context/CategoryContext';
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
