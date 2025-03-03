import { Stack } from 'expo-router';
import { DiaryProvider } from '~/context/DiaryContext';

const _layout = () => {
  return (
    <DiaryProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </DiaryProvider>
  );
};

export default _layout;
