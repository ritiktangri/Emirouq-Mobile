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
        <SafeAreaView className={cn('flex-1 bg-white dark:bg-black')}>
          <Tabs
            initialRouteName="portfolio"
            screenOptions={{
              headerShown: true,
              header: () => {
                return <GlobalHeader />;
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
                paddingTop: 8,
                minHeight: Platform.OS === 'ios' ? 0 : 80,
                maxHeight: 75,
              },
            }}>
            {/* Your Tabs.Screen components here */}
            <Tabs.Screen
              name="portfolio"
              options={{
                tabBarLabel: (props) => (
                  <Text
                    className={cn(
                      'mt-1 text-center font-poppinsSemiBold text-sm capitalize md:ml-3 md:mt-0 ',
                      props.focused ? 'text-primary' : 'text-[#6e7077] dark:text-white'
                    )}>
                    Portfolio
                  </Text>
                ),
                tabBarIcon: (props) => getIconsByScreenName(theme, 'portfolio', props.focused),
              }}
            />
            <Tabs.Screen
              name="trades"
              options={{
                tabBarLabel: (props) => (
                  <Text
                    className={cn(
                      'mt-1 text-center font-poppinsSemiBold text-sm capitalize md:ml-3 md:mt-0 ',
                      props.focused ? 'text-primary' : 'text-[#6e7077] dark:text-white'
                    )}>
                    Trades
                  </Text>
                ),
                tabBarIcon: (props) => getIconsByScreenName(theme, 'trades', props.focused),
              }}
            />
            <Tabs.Screen
              name="analytics"
              options={{
                tabBarLabel: (props) => (
                  <Text
                    className={cn(
                      'mt-1 text-center font-poppinsSemiBold text-sm capitalize md:ml-3 md:mt-0 ',
                      props.focused ? 'text-primary' : 'text-[#6e7077] dark:text-white'
                    )}>
                    Analytics
                  </Text>
                ),
                tabBarIcon: (props) => getIconsByScreenName(theme, 'analytics', props.focused),
              }}
            />
            <Tabs.Screen
              name="diary"
              options={{
                tabBarLabel: (props) => (
                  <Text
                    className={cn(
                      'mt-1 text-center font-poppinsSemiBold text-sm capitalize md:ml-3 md:mt-0 ',
                      props.focused ? 'text-primary' : 'text-[#6e7077] dark:text-white '
                    )}>
                    Diary
                  </Text>
                ),
                tabBarIcon: (props) => getIconsByScreenName(theme, 'diary', props.focused),
              }}
            />
          </Tabs>
        </SafeAreaView>
      </EChartsProvider>
    </QueryProvider>
  );
}
