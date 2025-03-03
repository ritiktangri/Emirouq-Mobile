/* eslint-disable import/order */
import { forwardRef } from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { DefaultText as Text } from '~/components/common/DefaultText';

type ButtonProps = {
  title: string;
} & TouchableOpacityProps;

export const Button = forwardRef<View, ButtonProps>(({ title, ...touchableProps }, ref) => {
  return (
    <TouchableOpacity
      ref={ref}
      {...touchableProps}
      className={`${styles.button} ${touchableProps.className}`}>
      <Text className={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
});

const styles = {
  button: 'items-center bg-indigo-500 rounded-[28px]  p-4',
  buttonText: 'text-white text-lg font-semibold text-center',
};
