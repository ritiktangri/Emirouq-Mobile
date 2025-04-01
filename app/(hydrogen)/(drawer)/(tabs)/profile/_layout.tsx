/* eslint-disable import/order */
import { Stack } from 'expo-router';
import { CategoryProvider } from '~/context/CategoryContext';
import { DashboardProvider } from '~/context/DashboardContext';
import { TagsProviders } from '~/context/TagsContext';

const _layout = () => {
  return (
    <CategoryProvider>
      <TagsProviders>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </TagsProviders>
    </CategoryProvider>
  );
};

export default _layout;
