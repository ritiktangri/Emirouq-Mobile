import { I18n } from 'i18n-js';
import { getLocales } from 'expo-localization';
import en from './locales/en.json';
import sa from './locales/sa.json';

export const deviceLanguage = getLocales()?.[0]?.languageCode ?? 'en';

export const i18n = new I18n({
  en,
  sa,
});

i18n.defaultLocale = deviceLanguage;

i18n.locale = deviceLanguage;
