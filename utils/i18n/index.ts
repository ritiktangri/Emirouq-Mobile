import { I18n } from 'i18n-js';
import { getLocales } from 'expo-localization';
import en from './locales/en.json';
import ar from './locales/ar.json';

export const deviceLanguage = getLocales()?.[0]?.languageCode ?? 'en';

export const i18n = new I18n({
  en,
  ar,
});

i18n.defaultLocale = deviceLanguage;

i18n.locale = deviceLanguage;
