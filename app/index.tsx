/* eslint-disable import/order */
import { Href, Redirect } from 'expo-router';
import React from 'react';

import SplashScreen from '~/components/SplashScreen';
import { useAuth } from '~/context/AuthContext';
import { useLocale } from '~/context/LocaleContext';
import { routes } from '~/utils/routes';

const App = () => {
  const { loading } = useAuth();
  const { locale } = useLocale();

  // if Rest API is loading, show splash screen
  if (loading) {
    return <SplashScreen />;
  }
  if (!locale) {
    return <Redirect href={routes['select-language'] as Href} />;
  }
  // if user is not logged in, redirect to login page
  // if (!user?.uuid) {
  //   // return <Redirect href={routes.auth.auth as Href} />;
  //   return <Redirect href={routes.auth.auth as Href} />;
  // }
  // if user is logged in, redirect to portfolio page
  // if (user?.uuid) {
  return <Redirect href={routes.tabs.home as Href} />;
  // }
};

export default App;
