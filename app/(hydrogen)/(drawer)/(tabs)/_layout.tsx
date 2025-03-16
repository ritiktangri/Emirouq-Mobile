/* eslint-disable import/order */
import { Tabs } from 'expo-router';
import { Platform, useColorScheme } from 'react-native';
import GlobalHeader from '~/components/GlobalHeader';
import { QueryProvider } from '~/context/QueryContext';
import { getIconsByScreenName } from '~/utils/get-icons-by-screen-name';
import { DefaultText as Text } from '~/components/common/DefaultText';
import { EChartsProvider } from '~/context/ChartContext';
import { cn } from '~/utils/helper.utils';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabLayout() {
  const theme: any = useColorScheme();
  return (
    <QueryProvider>
      <EChartsProvider>
        <SafeAreaView edges={['top']} className={cn('flex-1 bg-[#FF5722] ')}>
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
                        props.focused ? 'text-primary' : 'text-[#6e7077] dark:text-white'
                      )}>
                      Home
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
                        props.focused ? 'text-primary' : 'text-[#6e7077] dark:text-white'
                      )}>
                      Search
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
                        props.focused ? 'text-primary' : 'text-[#6e7077] dark:text-white'
                      )}>
                      Post Ad
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
                        props.focused ? 'text-primary' : 'text-[#6e7077] dark:text-white'
                      )}>
                      Chat
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
                        props.focused ? 'text-primary' : 'text-[#6e7077] dark:text-white '
                      )}>
                      Profile
                    </Text>
                  ),
                  tabBarIcon: (props) => getIconsByScreenName(theme, 'profile', props.focused),
                }}
              />
            </Tabs>
          </SafeAreaView>
        </SafeAreaView>
      </EChartsProvider>
    </QueryProvider>
  );
}
