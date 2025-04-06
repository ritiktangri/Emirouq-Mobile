import { Stack } from 'expo-router';
import React from 'react';

import { ConversationProvider } from '~/context/ConversationContext';

const _layout = () => {
  return (
    <ConversationProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ConversationProvider>
  );
};

export default _layout;
