import { Stack } from 'expo-router';
import { TradeProvider } from '~/context/TradeContext';

const _layout = () => {
  return (
    <TradeProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </TradeProvider>
  );
};

export default _layout;
