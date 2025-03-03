import { Stack } from 'expo-router';
import { SupportProvider } from '~/context/SupportContext';

const _layout = () => {
  return (
    <SupportProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </SupportProvider>
  );
};

export default _layout;
