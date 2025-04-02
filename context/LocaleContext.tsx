/* eslint-disable import/order */
import { createContext, useContext, useState, useMemo, useEffect, useCallback } from 'react';
import { i18n } from '~/utils/i18n';
const defaultProvider = {};
const LocaleContext = createContext(defaultProvider as any);
export const useLocale = () => useContext(LocaleContext);

const LocaleProvider = ({ children }: any) => {
  const [locale, setLocale] = useState(i18n.locale); // Initialize with current locale

  function changeLanguage(lang: string) {
    i18n.locale = lang;
    setLocale(lang); // Update the state with the new locale
  }
  useEffect(() => {
    i18n.locale = locale; // Update the i18n.locale when the state changes
  }, [locale]);

  const value: any = useMemo(
    () => ({
      locale,
      setLocale,
      changeLanguage,
    }),
    [changeLanguage, locale, setLocale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export { LocaleContext, LocaleProvider };
