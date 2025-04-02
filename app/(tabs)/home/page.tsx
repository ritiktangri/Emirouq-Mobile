/* eslint-disable import/order */
import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import Dashboard from '~/components/Tabs/Dashboard';
import { cn } from '~/utils/helper';

import { useLocale } from '~/context/LocaleContext';
import { i18n } from '~/utils/i18n';

export default function Page() {
  const colorScheme: any = useColorScheme();
  const { changeLocale, locale } = useLocale();

  return (
    <View className={cn('flex-1 bg-white dark:bg-black', locale === 'sa' && 'rtl-container')}>
      <StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />
      <View className="z-2 flex-1">
        <Dashboard />
        <Text style={{ textAlign: locale === 'sa' ? 'right' : 'left' }}>
          {i18n.t('hello', { name: 'Toy' })}
        </Text>
        <TouchableOpacity onPress={() => changeLocale(locale === 'sa' ? 'en' : 'sa')}>
          <Text style={{}}>Change Language</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
