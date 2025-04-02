import React, { memo, useRef } from 'react';
import { TextInput as DefaultTextInput, TextInputProps, View } from 'react-native';
import { Text } from '../Text';

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

  return (
    <View className={containerClassName}>
      {title && <Text className="mb-1.5 font-interMedium text-base ">{title}</Text>}
      <View className="flex-row items-center gap-2">
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
