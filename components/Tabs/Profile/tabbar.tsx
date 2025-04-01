import { View, TouchableOpacity, Dimensions, Text } from 'react-native';
import Animated, { useAnimatedStyle, withSpring, useSharedValue } from 'react-native-reanimated';

const TABS = [
  {
    key: 'profile',
    title: 'Profile',
    component: <Text>profile</Text>,
  },
  {
    key: 'dashboard',
    title: 'Ads Dashboard',
    component: <Text>sddashboardsd</Text>,
  },
  {
    key: 'manageAds',
    title: 'Manage Ads',
    component: <Text>setting</Text>,
  },
] as const;

export default function TabLayout({ activeTab, setActiveTab }: any) {
  return (
    <View className="rounded-md border-b-[0.4px] border-gray-300 bg-white p-1">
      <View className="">
        <View className="flex-row">
          {TABS.map((tab, index) => {
            const isFocused = activeTab === index;
            return (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setActiveTab(index)}
                className={`${isFocused ? 'rounded-md bg-primary' : ''} z-10 flex-1 items-center gap-1 py-3`}
                activeOpacity={0.7}>
                <Animated.Text className={`${isFocused ? ' text-white' : 'text-slate-800'}`}>
                  {tab.title}
                </Animated.Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}
