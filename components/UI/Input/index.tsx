/* eslint-disable import/order */
import { TextInput, TouchableWithoutFeedback, View } from 'react-native';
import React, { useRef } from 'react';
import { useTheme } from '~/context/ThemeContext'; // Import useTheme
import { DefaultText as Text } from '~/components/common/DefaultText';

interface InputProps {
  className?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  title?: string;
  containerStyle?: object;
  description?: string;
  onClick?: () => void;
  value?: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
  inputStyle?: object;
  onSubmitEditing?: () => void;
  onFocus?: () => void; // Add onFocus prop
  keyboardType?: any;
  autoCapitalize?: any;
  spellCheck?: boolean;
  autoCorrect?: boolean;
  transparent?: boolean;
  textArea?: boolean;
  descriptionStyle?: string;
}

const Input = ({
  className,
  prefix,
  suffix,
  placeholder,
  onChangeText,
  title,
  containerStyle,
  description,
  onClick,
  value,
  secureTextEntry,
  multiline,
  inputStyle,
  onSubmitEditing,
  onFocus,
  keyboardType,
  autoCapitalize,
  spellCheck,
  autoCorrect,
  transparent,
  textArea,
  descriptionStyle,
}: InputProps) => {
  const { colors } = useTheme(); // Access theme colors using "color"

  const inputRef = useRef<TextInput>(null);

  return (
    <View style={containerStyle} className="mt-3">
      {title && (
        <Text className="mb-1.5 ml-0.5 font-interMedium text-base text-black dark:text-white">
          {title}
        </Text>
      )}
      <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
        <View
          className={`flex-row items-center justify-between rounded-lg border border-gray-400 px-4 ${!transparent && 'dark:bg-gray-900'}`} // Tailwind classes for styling
          style={inputStyle}>
          <View className="flex-row items-center">
            {prefix && <View className="mr-2">{prefix}</View>}
            <TextInput
              ref={inputRef}
              className={`!dark:text-white w-full py-3 text-black ${className} ${textArea ? 'h-20' : ''}`} // Apply provided className
              // style={{ color: colors.text }}
              value={value?.toString()}
              placeholder={placeholder}
              placeholderTextColor={colors.placeholder} // Placeholder color from theme
              onChangeText={onChangeText}
              onFocus={onFocus} // Handle onFocus
              secureTextEntry={secureTextEntry}
              multiline={multiline}
              onSubmitEditing={onSubmitEditing}
              keyboardType={keyboardType}
              autoCapitalize={autoCapitalize}
              spellCheck={spellCheck}
              autoCorrect={autoCorrect}
              numberOfLines={textArea ? 5 : 1}
            />
          </View>
          <View className="absolute right-2">{suffix}</View>
        </View>
      </TouchableWithoutFeedback>
      {description && (
        <Text className={`mt-1 text-xs text-tertiary ${descriptionStyle}`}>{description}</Text>
      )}
    </View>
  );
};

export default Input;
