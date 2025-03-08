import { Href, Redirect } from 'expo-router';
import React, { useState } from 'react';

import SplashScreen from '~/components/SplashScreen';
import { useAuth } from '~/context/AuthContext';
import { routes } from '~/utils/routes';
import * as Localizations from 'expo-localization';
import { I18n } from 'i18n-js';

const App = () => {
  const { loading, user } = useAuth();
  const [locale, setLocale] = useState(Localizations.locale);
  const translations = new I18n({
    en: {
      appName: 'Emirouq',
      welcome: 'Welcome',
    },
    ar: {
      appName: 'Emirouq',
      welcome: "'مرحباً'",
    },
  });
  const i18n = new I18n(translations);
  i18n.defaultLocale = 'en';
  i18n.enableFallback = true;
  // if Rest API is loading, show splash screen
  if (loading) {
    return <SplashScreen />;
  }
  // if user is not logged in, redirect to login page
  if (!user?.uuid) {
    return <Redirect href={routes.auth.auth as Href} />;
  }
  // if user is logged in, redirect to portfolio page
  if (user?.uuid) {
    return <Redirect href={routes.drawer.tabs.portfolio as Href} />;
  }
};

export default App;
