/* eslint-disable import/order */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useState, useMemo, useEffect, useCallback } from 'react';
import { i18n } from '~/utils/i18n';
const defaultProvider = {
  locale: 'en',
  setLocale: () => {},
  changeLocale: () => {},
};
const LocaleContext = createContext(defaultProvider as any);
export const useLocale = () => useContext(LocaleContext);

const LocaleProvider = ({ children }: any) => {
  const [locale, setLocale] = useState('' as any); // Initialize with current locale

  async function changeLocale(lang: string) {
    await AsyncStorage.setItem('locale', lang);
    i18n.locale = lang;
    setLocale(lang); // Update the state with the new locale
  }

  useEffect(() => {
    async function fetchLocale() {
      const res = await AsyncStorage.getItem('locale');
      if (res) {
        changeLocale(res);
      }
    }
    fetchLocale();
    return () => {
      // Cleanup function if needed
    };
  }, []);

  const value: any = useMemo(
    () => ({
      locale,
      setLocale,
      changeLocale,
    }),
    [changeLocale, locale, setLocale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export { LocaleContext, LocaleProvider };
