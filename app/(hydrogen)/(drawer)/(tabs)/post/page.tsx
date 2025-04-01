import { Text, View } from 'react-native';
import AddPost from '~/components/Tabs/Post';
import { cn } from '~/utils/helper.utils';

export default function Page() {
  return (
    <View className={cn('flex-1 bg-default_light_bg dark:bg-black')}>
      <AddPost />
    </View>
  );
}
