import { Href, Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '~/components/common/Text';
import AuthHeader from '../../UI/AuthHeader';
import Input from '../../UI/Input';
import { useAuth } from '~/context/AuthContext';
import { pwd_background } from '~/image';
import { routes } from '~/utils/routes';
import DynamicButton from '~/components/DynamicButton';
import { useTheme } from '~/context/ThemeContext';
import { Feather } from '@expo/vector-icons';
import DefaultTextInput from '~/components/common/DefaultTextInput';

const ForgotPassword = () => {
  const { forgotPassword, forgotLoading } = useAuth();
  const [email, setEmail] = useState('');
  const { isDarkTheme } = useTheme();
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();
  const { showToast }: any = useTheme();
  const [selectedMethod, setSelectedMethod] = useState('email');

  const forgot = () => {
    if (selectedMethod == 'email') {
      if (email) {
        forgotPassword(
          {
            body: {
              email,
            },
          },
          () => {
            // toast.success('Otp has been sent successfully to your email');
            router.push(routes.auth.verifyOtp as Href);
            router.setParams({ email, isForgotPassword: 'true' });
          }
        );
      } else {
        showToast('Missing Email!', 'error');
      }
    }
  };

  const RadioButton = ({ selected, onPress }: any) => (
    <TouchableOpacity
      onPress={onPress}
      className="mr-3 h-5 w-5 items-center justify-center rounded-full border-2 border-gray-300">
      {selected && <View className="h-2.5 w-2.5 rounded-full bg-primary" />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <AuthHeader />
      <ScrollView className="" contentContainerStyle={{ paddingBottom: 12 }}>
        <View className="px-6">
          {/* Lock Icon */}
          <View className="mb-6 items-center">
            <View className="bg-primary-light rounded-full">
              <Feather name="lock" size={28} color="#FF6F31" />
            </View>
          </View>
          {/* Title */}
          <Text className="mb-2 text-center text-2xl font-bold text-gray-800">
            Reset Your Password
          </Text>
          <Text className="mb-8 text-center text-sm text-gray-500">
            Select a method to verify your identity
          </Text>
          {/* Verification Methods */}
          <TouchableOpacity
            onPress={() => setSelectedMethod('email')}
            className={`mb-4 flex-row items-center rounded-lg border p-4 ${
              selectedMethod === 'email'
                ? 'border-primary bg-white' // No special bg for email when selected, just border
                : 'border-gray-200 bg-white'
            }`}>
            <RadioButton
              selected={selectedMethod === 'email'}
              onPress={() => setSelectedMethod('email')}
            />
            <Feather
              name="mail"
              size={22}
              color={selectedMethod === 'email' ? '#FF6F31' : 'gray'}
              className="mr-3"
            />
            <View>
              <Text
                className={`font-semibold ${selectedMethod === 'email' ? 'text-gray-800' : 'text-gray-700'}`}>
                Reset via Email
              </Text>
              <Text className="text-xs text-gray-500">We'll send a reset link to your email</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedMethod('phone')}
            className={`mb-4 flex-row items-center rounded-lg border p-4 ${
              selectedMethod === 'phone'
                ? 'bg-selected-bg border-primary'
                : 'border-gray-200 bg-white'
            }`}>
            <RadioButton
              selected={selectedMethod === 'phone'}
              onPress={() => setSelectedMethod('phone')}
            />
            <Feather
              name="smartphone"
              size={22}
              color={selectedMethod === 'phone' ? '#FF6F31' : 'gray'}
              className="mr-3"
            />
            <View>
              <Text
                className={`font-semibold ${selectedMethod === 'phone' ? 'text-gray-800' : 'text-gray-700'}`}>
                Reset via Phone Number
              </Text>
              <Text className="text-xs text-gray-500">We'll send an OTP to your phone</Text>
            </View>
          </TouchableOpacity>
          {/* Phone Number Input (Conditional) */}
          {selectedMethod === 'email' && (
            <View className="my-4">
              <Text className="mb-1.5 text-sm text-gray-700">Email</Text>
              <DefaultTextInput
                placeholder="Enter your email"
                placeholderTextColor="#A0AEC0"
                keyboardType="email-address"
                onChangeText={setEmail}
                value={email}
                spellCheck={false}
                className="w-full rounded-lg border border-gray-300 p-3 text-sm text-gray-800"
              />
            </View>
          )}
          {/* Action Button */}
          {selectedMethod === 'email' && (
            <DynamicButton
              titleClassName="!text-white !font-poppinsMedium !text-lg"
              onPress={forgot}
              title="Send Reset Link"
              isLoading={forgotLoading}
              className="my-4"
            />
          )}
          <TouchableOpacity
            onPress={() => console.log('Back to Login')}
            className="mb-8 items-center">
            <Text className="font-medium text-primary">Back to Login</Text>
          </TouchableOpacity>
          {/* Secure Info */}
          <View className="flex-row items-center justify-center">
            <Feather name="shield" size={16} color="gray" />
            <Text className="ml-2 text-xs text-gray-500">Your information is secure with us</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;

// <ImageBackground
//   className="flex-1 flex-col bg-white dark:bg-transparent"
//   source={isDarkTheme ? pwd_background : ''}>
//   <SafeAreaView edges={['top', 'left', 'right']} className="flex-1 flex-col">
//     <AuthHeader />
//     <View className="mt-12 flex-col gap-y-6 p-6">
//       <Text className="font-poppinsMedium text-3xl font-semibold dark:text-white">
//         Forgot Password!
//       </Text>
//       <View className="flex-row border-b border-gray-200">
//         <TouchableOpacity
//           className={`flex-1 pb-4 ${activeTab === 'email' ? 'border-primary-600 border-b-2' : ''}`}
//           onPress={() => setActiveTab('email')}>
//           <Text
//             className={`text-center font-['Inter-Bold'] text-base ${activeTab === 'email' ? 'text-primary-600' : 'text-gray-500'}`}>
//             Email
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           className={`flex-1 pb-4 ${activeTab === 'phone' ? 'border-primary-600 border-b-2' : ''}`}
//           onPress={() => setActiveTab('phone')}>
//           <Text
//             className={`text-center font-['Inter-Bold'] text-base ${activeTab === 'phone' ? 'text-primary-600' : 'text-gray-500'}`}>
//             Phone Number
//           </Text>
//         </TouchableOpacity>
//       </View>
//       {activeTab === 'email' ? (
//         <Input
//           onChangeText={setEmail}
//           className="w-full py-4 dark:text-white"
//           keyboardType="email-address"
//           autoCapitalize="none"
//           spellCheck={false}
//           autoCorrect={false}
//           title="Email"
//           placeholder="Enter your email"
//           value={email}
//         />
//       ) : (
//         <Input
//           onChangeText={setPhoneNumber}
//           className="w-full py-4 dark:text-white"
//           keyboardType="email-address"
//           autoCapitalize="none"
//           spellCheck={false}
//           autoCorrect={false}
//           title="Phone Number"
//           placeholder="Enter your phone number"
//           value={phoneNumber}
//         />
//       )}

//       <DynamicButton
//         titleClassName="!text-white !font-poppinsMedium !text-lg"
//         onPress={forgot}
//         title="Send Reset Link"
//         isLoading={forgotLoading}
//       />

//       <View className="flex flex-row items-center gap-2 self-center">
//         <Text className="my-4 text-center  font-poppinsMedium text-lg text-tertiary dark:text-[#c7c5c58B]">
//           Don't want to reset your password?{' '}
//         </Text>
//         <Link href={routes.auth.auth as Href} asChild>
//           <TouchableOpacity>
//             <Text className="font-poppinsMedium font-medium dark:text-white">Sign In</Text>
//           </TouchableOpacity>
//         </Link>
//       </View>
//     </View>
//   </SafeAreaView>
// </ImageBackground>
