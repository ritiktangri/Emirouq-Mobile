/* eslint-disable import/order */
import { Stack } from 'expo-router';
import { ConversationProvider } from '~/context/ConversationContext';

const _layout = () => {
  return (
    <ConversationProvider>
      <Stack
        initialRouteName="page"
        screenOptions={{
          headerShown: false,
        }}
      />
    </ConversationProvider>
  );
};

export default _layout;
