import { Stack } from 'expo-router';
import React from 'react';
import { AudioPlayerProvider } from '~/context/AudioPlayerContext';

import { ConversationProvider } from '~/context/ConversationContext';

const _layout = () => {
  return (
    <ConversationProvider>
      <AudioPlayerProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </AudioPlayerProvider>
    </ConversationProvider>
  );
};

export default _layout;
