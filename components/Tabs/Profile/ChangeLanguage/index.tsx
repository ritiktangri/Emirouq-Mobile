/* eslint-disable import/order */
import React, { useState } from 'react';
import { TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocale } from '~/context/LocaleContext';
import theme from '~/utils/theme';
import { useTheme } from '~/context/ThemeContext';
import { Text } from '~/components/common/Text';
import { arabic, english } from '~/image';
import { i18n } from '~/utils/i18n';
import { View } from '~/components/common/View';

const ChangeLanguage = () => {
  const { locale, changeLocale } = useLocale();
  const { showToast } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState(locale);

  const languages = [
    {
      name: 'Arabic (العربية)',
      code: 'ar',
    },
    {
      name: 'English (US)',
      code: 'en',
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F8FA' }}>
      <View style={{ padding: 16 }}>
        <Text placement={locale} className="py-2 text-lg font-bold text-black">
          {i18n.t('profile.selectLanguage.title')}
        </Text>
        <TouchableOpacity className="mb-2  rounded-lg bg-gray-200 p-4">
          <View direction={locale} className="">
            <View className="flex-1" direction={locale}>
              <Image source={locale === 'ar' ? arabic : english} className="h-8 w-8 rounded-full" />
              <Text className="text-base font-bold ">
                {languages.find((lang) => lang.code === locale)?.name}
              </Text>
            </View>
            <MaterialCommunityIcons name="radiobox-marked" size={24} className="!text-primary" />
          </View>
        </TouchableOpacity>

        {/* All Languages */}
        <Text placement={locale} className="my-4  text-lg text-black">
          {i18n.t('profile.selectLanguage.description')}
        </Text>

        {/* Language List */}
        {languages.map((language, index) => (
          <TouchableOpacity
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,

              elevation: 2,
            }}
            key={index}
            className="mb-2  rounded-lg bg-white p-4"
            onPress={() => setSelectedLanguage(language?.code)}>
            <View direction={locale}>
              <View className="flex-1" direction={locale}>
                <Image
                  source={language?.code === 'ar' ? arabic : english}
                  className="h-8 w-8 rounded-full"
                />

                <Text className="text-base font-bold text-black">{language?.name}</Text>
              </View>
              <MaterialCommunityIcons
                name={selectedLanguage === language?.code ? 'circle-slice-8' : 'circle-outline'}
                size={24}
                color={theme.colors.primary}
                className="ml-4"
              />
            </View>
          </TouchableOpacity>
        ))}

        {/* Save Settings Button */}
        <TouchableOpacity
          onPress={() => {
            changeLocale(selectedLanguage);
            showToast('Language changed successfully', 'success');
          }}
          className="mt-4 flex-row items-center justify-center rounded-lg bg-primary p-4">
          <Text className="text-base font-bold text-white">Save Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChangeLanguage;
