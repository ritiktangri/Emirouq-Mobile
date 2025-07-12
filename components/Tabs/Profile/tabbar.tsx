import { View, TouchableOpacity, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import { i18n } from '~/utils/i18n';

export default function TabLayout({ activeTab, setActiveTab }: any) {
  const TABS = [
    {
      key: 'profile',
      title: i18n.t('profile.profile'),
      component: <Text>profile</Text>,
    },
    // {
    //   key: 'dashboard',
    //   title: i18n.t('profile.ads_dashboard'),
    //   component: <Text>sddashboardsd</Text>,
    // },
    {
      key: 'manageAds',
      title: i18n.t('profile.manage_ads'),
      component: <Text>setting</Text>,
    },
  ];
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
