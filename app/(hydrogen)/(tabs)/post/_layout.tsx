/* eslint-disable import/order */
import { Stack } from 'expo-router';
import { CategoryProvider } from '~/context/CategoryContext';
import { PostProvider } from '~/context/PostContext';

const _layout = () => {
  return (
    <CategoryProvider>
      <PostProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </PostProvider>
    </CategoryProvider>
  );
};

export default _layout;
