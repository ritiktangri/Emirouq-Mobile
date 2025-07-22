/* eslint-disable import/order */
import { View } from 'react-native';
import Dashboard from '~/components/Tabs/Dashboard';
import { useCurrentLocation } from '~/components/UserLocation';
import { cn } from '~/utils/helper';

export default function Page() {
  return (
    <View className={cn('flex-1 bg-white dark:bg-black', 'rtl-container')}>
      <View className="z-2 flex-1">
        <Dashboard />
      </View>
    </View>
  );
}
