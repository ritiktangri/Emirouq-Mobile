/* eslint-disable import/order */
import { Stack } from 'expo-router';
import { CategoryProvider } from '~/context/CategoryContext';

const _layout = () => {
  return (
    <CategoryProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </CategoryProvider>
  );
};

export default _layout;
