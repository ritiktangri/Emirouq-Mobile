import { Stack } from 'expo-router';
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
