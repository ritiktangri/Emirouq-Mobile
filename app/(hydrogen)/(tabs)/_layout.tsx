/* eslint-disable import/order */
import { Tabs } from 'expo-router';
import { Platform, useColorScheme } from 'react-native';
import GlobalHeader from '~/components/GlobalHeader';
import { QueryProvider } from '~/context/QueryContext';
import { getIconsByScreenName } from '~/utils/get-icons-by-screen-name';
import { Text } from '~/components/common/Text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cn } from '~/utils/helper';
import { i18n } from '~/utils/i18n';
import { useLocale } from '~/context/LocaleContext';
export default function TabLayout() {
  const theme: any = useColorScheme();
  const { locale } = useLocale();

  return (
    <QueryProvider>
      <SafeAreaView edges={['bottom']} className={cn('flex-1 bg-white ')}>
        <Tabs
          initialRouteName="home"
          screenOptions={{
            headerShown: true,
            header: (route) => {
              return <GlobalHeader route={route} />;
            },
            sceneStyle: {
              backgroundColor: 'transparent',
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            },
            tabBarStyle: {
              backgroundColor: theme === 'dark' ? 'black' : 'white',
              borderColor: theme === 'dark' ? 'black' : 'white',
              borderTopWidth: 0.2,
              paddingTop: 12,
              minHeight: Platform.OS === 'ios' ? 0 : 80,
              maxHeight: 75,
            },
          }}>
          {/* Your Tabs.Screen components here */}
          <Tabs.Screen
            name="home"
            options={{
              tabBarLabel: (props) => (
                <Text
                  className={cn(
                    'mt-1 text-center font-poppinsSemiBold text-sm capitalize md:ml-3 md:mt-0 ',
                    props.focused ? 'text-primary' : 'text-bottom_inactive '
                  )}
                  style={{ textAlign: locale === 'ar' ? 'right' : 'left' }}>
                  {i18n.t('tab.home')}
                </Text>
              ),
              tabBarIcon: (props) => getIconsByScreenName(theme, 'home', props.focused),
            }}
          />
          <Tabs.Screen
            name="search"
            options={{
              tabBarLabel: (props) => (
                <Text
                  className={cn(
                    'mt-1 text-center font-poppinsSemiBold text-sm capitalize md:ml-3 md:mt-0 ',
                    props.focused ? 'text-primary' : 'text-bottom_inactive '
                  )}
                  style={{ textAlign: locale === 'ar' ? 'right' : 'left' }}>
                  {i18n.t('tab.search')}
                </Text>
              ),
              tabBarIcon: (props) => getIconsByScreenName(theme, 'search', props.focused),
            }}
          />
          <Tabs.Screen
            name="post"
            options={{
              tabBarLabel: (props) => (
                <Text
                  className={cn(
                    'mt-1 text-center font-poppinsSemiBold text-sm capitalize md:ml-3 md:mt-0 ',
                    props.focused ? 'text-primary' : 'text-bottom_inactive '
                  )}
                  style={{ textAlign: locale === 'ar' ? 'right' : 'left' }}>
                  {i18n.t('tab.post')}
                </Text>
              ),
              tabBarIcon: (props) => getIconsByScreenName(theme, 'post', props.focused),
            }}
          />
          <Tabs.Screen
            name="chat"
            options={{
              tabBarLabel: (props) => (
                <Text
                  className={cn(
                    'mt-1 text-center font-poppinsSemiBold text-sm capitalize md:ml-3 md:mt-0 ',
                    props.focused ? 'text-primary' : 'text-bottom_inactive '
                  )}
                  style={{ textAlign: locale === 'ar' ? 'right' : 'left' }}>
                  {i18n.t('tab.chat')}
                </Text>
              ),
              tabBarIcon: (props) => getIconsByScreenName(theme, 'chat', props.focused),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              tabBarLabel: (props) => (
                <Text
                  className={cn(
                    'mt-1 text-center font-poppinsSemiBold text-sm capitalize md:ml-3 md:mt-0 ',
                    props.focused ? 'text-primary' : 'text-bottom_inactive '
                  )}
                  style={{ textAlign: locale === 'ar' ? 'right' : 'left' }}>
                  {i18n.t('tab.profile')}
                </Text>
              ),
              tabBarIcon: (props) => getIconsByScreenName(theme, 'profile', props.focused),
            }}
          />
        </Tabs>
      </SafeAreaView>
    </QueryProvider>
  );
}
