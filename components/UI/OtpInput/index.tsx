import React, { useState, useRef, useEffect, type RefObject } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

interface OTPInputProps {
  codes: string[];
  refs: RefObject<TextInput>[];
  errorMessages: string[] | undefined;
  onChangeCode: (text: string, index: number) => void;
  config: OTPInputConfig;
}

interface OTPInputConfig {
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  errorColor?: string;
  focusColor?: string;
}

export function OTPInput({ codes, refs, errorMessages, onChangeCode, config }: OTPInputProps) {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    },
    input: {
      fontSize: 40,
      height: 75,
      width: 75,
      borderRadius: 8,
      textAlign: 'center',
      backgroundColor: config?.backgroundColor,
      color: config?.textColor,
      borderColor: config?.borderColor,
      borderWidth: 2,
    },
    errorInput: {
      borderColor: config?.errorColor,
      color: config?.errorColor,
    },
    focusedInput: {
      borderColor: config?.focusColor,
    },
  });

  const handleFocus = (index: number) => setFocusedIndex(index);
  const handleBlur = () => setFocusedIndex(null);

  // Use useEffect to manage focus changes after rendering
  useEffect(() => {
    if (focusedIndex !== null && focusedIndex < refs.length) {
      refs[focusedIndex]?.current?.focus();
    }
  }, [focusedIndex, refs]);

  const handleInputChange = (text: string, index: number) => {
    onChangeCode(text, index); // Update the code state immediately
    if (text?.length === 1 && index < refs.length - 1) {
      // Move focus to the next input after a slight delay
      setTimeout(() => {
        setFocusedIndex(index + 1);
      }, 10); // Adjust delay if needed
    } else if (text.length === 0 && index > 0) {
      // Move focus to the previous input on backspace
      setTimeout(() => {
        setFocusedIndex(index - 1);
      }, 10);
    }
  };

  return (
    <View style={styles.container}>
      {codes.map((code, index) => (
        <TextInput
          key={index}
          autoComplete="one-time-code"
          keyboardType="numeric"
          style={[
            styles.input,
            errorMessages && styles.errorInput,
            focusedIndex === index && styles.focusedInput,
          ]}
          inputMode="numeric"
          onChangeText={(text) => handleInputChange(text, index)}
          value={code}
          onFocus={() => handleFocus(index)}
          onBlur={handleBlur}
          maxLength={1} // Always limit to 1 character
          ref={refs[index]}
        />
      ))}
    </View>
  );
}
