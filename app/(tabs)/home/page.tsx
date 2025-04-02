/* eslint-disable import/order */
import { StatusBar } from 'expo-status-bar';
import { useColorScheme, View } from 'react-native';
import Dashboard from '~/components/Tabs/Dashboard';
import { cn } from '~/utils/helper';

export default function Page() {
  const colorScheme: any = useColorScheme();

  return (
    <View className={cn('flex-1 bg-white dark:bg-black', 'rtl-container')}>
      <StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />
      <View className="z-2 flex-1">
        <Dashboard />
      </View>
    </View>
  );
}
