import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import Header from '../header';
import Input from '~/components/UI/Input';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { DefaultText as Text } from '~/components/common/DefaultText';
import { useAuth } from '~/context/AuthContext';
import { encode } from 'js-base64';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '~/components/UI/CustomHeader';

const Security = () => {
  const router = useRouter();
  const [secureTextEntry, setSecureTextEntry] = useState(false);
  const [secureTextNewPassword, setSecureTextNewPassword] = useState(false);
  const [secureTextConfirmPassword, setSecureTextConfirmPassword] = useState(false);
  const { userResetPassword, btnLoading } = useAuth();
  const [password, setPassword] = useState<any>({
    currentPassword: '',
    newPassword: '',
    confirmedPassword: '',
  });

  const [errors, setErrors] = useState<any>({
    currentPassword: '',
    newPassword: '',
    confirmedPassword: '',
  });

  const onChangeText = (field: any, value: string) => {
    const newErrors = { ...errors };
    const newPassword = { ...password, [field]: value };

    if (field === 'newPassword' && value.length < 6) {
      newErrors.newPassword = 'Your new password must be more than 6 characters';
    } else if (field === 'confirmedPassword' && value !== password.newPassword) {
      newErrors.confirmedPassword = "Passwords don't match";
    } else if (!value) {
      newErrors[field] = 'Password is required!';
    } else {
      newErrors[field] = '';
    }
    setErrors(newErrors);
    setPassword(newPassword);
  };

  const onUpdatePassword = () => {
    if (
      errors?.currentPassword == '' &&
      errors?.newPassword == '' &&
      errors?.confirmedPassword == '' &&
      password.currentPassword &&
      password.newPassword
    ) {
      userResetPassword(
        {
          pathParams: {
            token: encode(`${password.currentPassword}:${password.newPassword}`),
          },
        },
        () => {
          router.back();
        }
      );
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white px-4 dark:bg-[#282E36]">
      <CustomHeader />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled">
            <View className="mb-6 ">
              <Text className="mb-1 text-2xl font-semibold dark:text-white">Security</Text>
              <Text className="font-poppinsMedium text-tertiary">Update your password here</Text>
              <Input
                transparent
                className=" w-full dark:text-white"
                suffix={
                  <TouchableOpacity className="px-2">
                    <Ionicons
                      name={secureTextEntry ? 'eye' : 'eye-off'}
                      size={20}
                      color="#c7c7c7"
                      onPress={() => setSecureTextEntry(!secureTextEntry)}
                    />
                  </TouchableOpacity>
                }
                inputStyle={{
                  borderColor: errors?.currentPassword ? 'red' : 'grey',
                }}
                onChangeText={(value: any) => onChangeText('currentPassword', value)}
                secureTextEntry={!secureTextEntry}
                title="Current Password"
                placeholder="Enter your password"
                description={errors?.currentPassword}
                descriptionStyle="!text-red-500"
              />

              <Input
                transparent={true}
                className=" w-full dark:text-white"
                suffix={
                  <TouchableOpacity className="px-2">
                    <Ionicons
                      name={secureTextNewPassword ? 'eye' : 'eye-off'}
                      size={20}
                      color="#c7c7c7"
                      onPress={() => setSecureTextNewPassword(!secureTextNewPassword)}
                    />
                  </TouchableOpacity>
                }
                inputStyle={{
                  borderColor: errors?.newPassword ? 'red' : 'grey',
                }}
                onChangeText={(value: any) => onChangeText('newPassword', value)}
                secureTextEntry={!secureTextNewPassword}
                title="New Password"
                placeholder="Enter your password"
                // description="Your new password must be more than 8 characters"
                description={errors?.newPassword}
                descriptionStyle="!text-red-500"
              />
              <Input
                transparent={true}
                className=" w-full dark:text-white"
                suffix={
                  <TouchableOpacity className="px-2">
                    <Ionicons
                      name={secureTextConfirmPassword ? 'eye' : 'eye-off'}
                      size={20}
                      color="#c7c7c7"
                      onPress={() => setSecureTextConfirmPassword(!secureTextConfirmPassword)}
                    />
                  </TouchableOpacity>
                }
                inputStyle={{
                  borderColor: errors?.confirmedPassword ? 'red' : 'grey',
                }}
                onChangeText={(value: any) => onChangeText('confirmedPassword', value)}
                secureTextEntry={!secureTextConfirmPassword}
                title="Confirm Password"
                placeholder="Enter your password"
                description={errors?.confirmedPassword}
                descriptionStyle="!text-red-500"
              />
            </View>
          </ScrollView>
          <TouchableOpacity
            className=" mb-8 mt-2 flex-row justify-center gap-2 rounded-lg bg-primary p-3"
            onPress={() => {
              onUpdatePassword();
              // router.push('/(hydrogen)/(accounts)/page');
            }}>
            {btnLoading && <ActivityIndicator />}
            <Text className="text-center font-semibold text-white">Update password</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Security;
