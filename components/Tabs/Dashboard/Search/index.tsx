/* eslint-disable import/order */
import React from 'react';
import DefaultTextInput from '~/components/common/DefaultTextInput';
import { Ionicons } from '@expo/vector-icons';
import theme from '~/utils/theme';
import { i18n } from '~/utils/i18n';
import { View } from '~/components/common/View';
import { useLocale } from '~/context/LocaleContext';

const Search = () => {
  const { locale } = useLocale();

  return (
    <View direction={locale} className="w-full">
      <DefaultTextInput
        prefix={<Ionicons name="search" size={20} color="#000" />}
        placeholder={i18n.t('home.searchPlaceHolder')}
        containerClassName="bg-search_bg rounded-lg p-3 w-full"
        textAlign={locale === 'ar' ? 'right' : 'left'}
        placeholderTextColor={theme.colors.gray}
        className=" w-full px-4 text-lg"
      />
    </View>
  );
};

export default Search;
