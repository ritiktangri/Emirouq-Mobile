import React, { memo, useRef } from 'react';
import { TextInput as DefaultTextInput, Platform, TextInputProps } from 'react-native';
import { Text } from '../Text';
import { useLocale } from '~/context/LocaleContext';
import { View } from '../View';

type InputProps = TextInputProps & {
  className?: string;
  title?: string;
  containerClassName?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
};

const TextInput = ({
  title,
  className,
  prefix,
  containerClassName,
  suffix,
  ...props
}: InputProps) => {
  // Access theme colors using "color"

  const inputRef = useRef<DefaultTextInput>(null);
  const { locale } = useLocale();
  return (
    <View className={containerClassName}>
      {title && <Text className="mb-1.5 font-interMedium text-base ">{title}</Text>}
      <View direction={locale} className="">
        {prefix ? prefix : <></>}
        <DefaultTextInput
          className={className}
          allowFontScaling={false}
          ref={inputRef}
          {...props}
        />
        {suffix ? suffix : <></>}
      </View>
    </View>
  );
};

export default memo(TextInput);
