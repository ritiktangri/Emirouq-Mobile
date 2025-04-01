import { StatusBar } from 'expo-status-bar';
import { Image, Text, useColorScheme, View } from 'react-native';
import Dashboard from '~/components/Tabs/Dashboard';
import { cn } from '~/utils/helper.utils';

export default function Page() {
  const colorScheme: any = useColorScheme();
  return (
    <View className={cn('flex-1 bg-white dark:bg-black')}>
      <StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />
      <View className="z-1 absolute left-0 right-0 top-0 mt-10 flex h-full w-full items-center"></View>
      <View className="z-2 flex-1">
        <Dashboard />
      </View>
    </View>
  );
}
