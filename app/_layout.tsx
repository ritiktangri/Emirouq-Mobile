/* eslint-disable no-unused-expressions */
/* eslint-disable import/order */
import { useEffect } from 'react';
import '../global.css';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Slot } from 'expo-router';
import { LogBox, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider as CustomThemeProvider } from '~/context/ThemeContext';
import { interMedium, poppinsBlack, poppinsBold, poppinsMedium, poppinsSemiBold } from '~/font';
import { useFonts } from 'expo-font';
import { AuthProvider, useAuth } from '~/context/AuthContext';
import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen';
import { Host } from 'react-native-portalize';
import { PaperProvider } from 'react-native-paper';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { LocaleProvider } from '~/context/LocaleContext';
import SocketEventScreen from '~/components/SocketEventScreen';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo';
import { StripeProvider } from '@stripe/stripe-react-native';
import 'react-native-get-random-values';
import { MenuProvider } from 'react-native-popup-menu';
import * as Notifications from 'expo-notifications';
import { usePushNotifications } from '~/hooks/usePushNotification';
import { LocationProvider } from '~/context/LocationContext';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldShowAlert: true,
  }),
});
export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        return failureCount < 3 && error instanceof AxiosError;
      },
      refetchOnWindowFocus: false,
      staleTime: 10 * 1000, // 10s
    },
    mutations: {
      onError: (error) => {},
      onSuccess: ({ message }: any) => {},
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof AxiosError) {
      }
    },
  }),
});

LogBox.ignoreLogs([
  'TNodeChildrenRenderer: Support for defaultProps',
  'MemoizedTNodeRenderer: Support for defaultProps',
  'TRenderEngineProvider: Support for defaultProps',
]);

// this is required to prevent the white background flash on splash screen
preventAutoHideAsync();

function InitialLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Poppins-Medium': poppinsMedium,
    'Poppins-Black': poppinsBlack,
    'Poppins-Bold': poppinsBold,
    'Poppins-SemiBold': poppinsSemiBold,
    'Inter-Medium': interMedium,
    ...FontAwesome.font,
  });
  const { user } = useAuth();
  usePushNotifications(user); // ✅ add this line
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    `The issue was that useFont (or any hook) would cause a re-render of the layout route, 
     which would unmount the <SplashScreen /> component, and therefore hide the splash screen prematurely.
     This SplashScreen-component API was flawed which is why it's been deprecated.`;
    if (loaded) {
      setTimeout(() => {
        hideAsync();
      }, 300);
    }
  }, [loaded]);
  if (!loaded) {
    return null;
  }

  return <Slot />;
}

const clerkPublishableKey = 'pk_test_Y29uY3JldGUtZmluY2gtMTIuY2xlcmsuYWNjb3VudHMuZGV2JA';
if (!clerkPublishableKey) {
  throw new Error('Missing publishable key');
}
export default function RootLayoutNav() {
  return (
    <StripeProvider publishableKey="pk_test_51RCXW12eQ2oCOo2662257iWYlAxXnJRsOhf2SkadbyB69x07L9TwyiSVsq4KomNvBQHuqBMPULMatDVxHU5iSdPF00UVgHa8BQ">
      <ClerkProvider publishableKey={clerkPublishableKey}>
        <ClerkLoaded>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            {/* portalize is a library that allows you to render a component in a different part of the tree, */}
            {/* host is a component that allows you to render a component in a different part of the tree. */}
            <Host>
              <QueryClientProvider client={queryClient}>
                <ThemeProvider value={DarkTheme}>
                  <CustomThemeProvider>
                    <ActionSheetProvider>
                      <SafeAreaProvider>
                        <AuthProvider>
                          <LocaleProvider>
                            <PaperProvider>
                              <MenuProvider>
                                <LocationProvider>
                                  <SocketEventScreen />
                                  <InitialLayout />
                                </LocationProvider>
                              </MenuProvider>
                              {/* The Slot component is where the current route will be rendered */}
                              {/* It is used to render the current route in the layout */}
                            </PaperProvider>
                          </LocaleProvider>
                        </AuthProvider>
                      </SafeAreaProvider>
                    </ActionSheetProvider>
                  </CustomThemeProvider>
                </ThemeProvider>
              </QueryClientProvider>
            </Host>
          </GestureHandlerRootView>
        </ClerkLoaded>
      </ClerkProvider>
    </StripeProvider>
  );
}
