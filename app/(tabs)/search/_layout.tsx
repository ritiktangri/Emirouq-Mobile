/* eslint-disable import/order */
import { Stack } from 'expo-router';
import { DashboardProvider } from '~/context/DashboardContext';
import { TagsProviders } from '~/context/TagsContext';

const _layout = () => {
  return (
    <TagsProviders>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </TagsProviders>
  );
};

export default _layout;
