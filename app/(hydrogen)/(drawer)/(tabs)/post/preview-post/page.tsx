import { Text, View } from 'react-native';
import AddPost from '~/components/Tabs/Post';
import PreviewPost from '~/components/Tabs/Post/PreviewPost';
import { cn } from '~/utils/helper.utils';

export default function Page() {
  // const colorScheme: any = useColorScheme();
  return (
    <View className={cn('flex-1 bg-default_light_bg dark:bg-black')}>
      <PreviewPost />
    </View>
  );
}
