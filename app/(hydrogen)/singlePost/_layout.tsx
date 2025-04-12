/* eslint-disable import/order */
import { Stack } from 'expo-router';
import { PostProvider } from '~/context/PostContext';

const _layout = () => {
  return (
    <PostProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </PostProvider>
  );
};

export default _layout;
