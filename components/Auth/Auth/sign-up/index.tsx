import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import DynamicButton from '~/components/DynamicButton';
import Input from '~/components/UI/Input';
import { useAuth } from '~/context/AuthContext';
import { useTheme } from '~/context/ThemeContext';

const Signup = ({ checkinType }: any) => {
  const { signUp } = useAuth();
  const router = useRouter();
  const { showToast } = useTheme();
  const [agreed, setAgreed] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(false);
  const [form, setForm] = useState({
    firstName: 'Areeb',
    lastName: 'Safvi',
    email: 'masafvi48@gmail.com',
    phoneNumber: '7528095192',
    password: '12345678',
    confirmPassword: '12345678',
  });
  const onChangeText = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSubmit = () => {
    console.log(1);
    const body: any = {
      firstName: form.firstName,
      lastName: form.lastName,
      password: form.password,
      confirmPassword: form.confirmPassword,
    };
    if (checkinType === 'email') {
      body.email = form.email;
    } else {
      body.phoneNumber = form.phoneNumber;
    }

    signUp(
      { body },
      () => {
        console.log(checkinType);
        if (checkinType === 'email') {
          router.setParams({ email: form.email });
        } else {
          router.setParams({ phone: form.phoneNumber });
        }
      },
      (err: any) => {
        console.log(err);
        showToast(err?.message, 'error');
      }
    );
  };

  return (
    <View className="mt-8 space-y-6">
      <Input
        value={form.firstName}
        inputStyle={{
          backgroundColor: 'white',
          borderColor: 'lightgrey',
        }}
        onChangeText={(value: any) => onChangeText('firstName', value)}
        title="First Name"
        placeholder="Enter your first name"
        className=" w-full py-4 dark:text-white"
        autoCapitalize="none"
        spellCheck={false}
        autoCorrect={false}
        onFocus={() => {
          scrollViewRef.current?.scrollTo({ y: 0, animated: true });
        }}
      />
      <Input
        value={form.lastName}
        inputStyle={{
          backgroundColor: 'white',
          borderColor: 'lightgrey',
        }}
        onChangeText={(value: any) => onChangeText('lastName', value)}
        title="Last Name"
        placeholder="Enter your last name"
        className=" w-full py-4 dark:text-white"
        autoCapitalize="none"
        spellCheck={false}
        autoCorrect={false}
        onFocus={() => {
          scrollViewRef.current?.scrollTo({ y: 0, animated: true });
        }}
      />
      {checkinType === 'email' ? (
        <Input
          value={form.email}
          inputStyle={{
            backgroundColor: 'white',
            borderColor: 'lightgrey',
          }}
          onChangeText={(value: any) => onChangeText('email', value)}
          title="Email"
          placeholder="Enter your email"
          className=" w-full py-4 dark:text-white"
          keyboardType="email-address"
          autoCapitalize="none"
          spellCheck={false}
          autoCorrect={false}
          onFocus={() => {
            scrollViewRef.current?.scrollTo({ y: 0, animated: true });
          }}
        />
      ) : (
        <Input
          value={form.phoneNumber}
          inputStyle={{
            backgroundColor: 'white',
            borderColor: 'lightgrey',
          }}
          onChangeText={(value: any) => onChangeText('phoneNumber', value)}
          title="Phone Number"
          placeholder="Enter your phone number"
          className=" w-full py-4 dark:text-white"
          keyboardType="numeric"
          autoCapitalize="none"
          spellCheck={false}
          autoCorrect={false}
          onFocus={() => {
            scrollViewRef.current?.scrollTo({ y: 0, animated: true });
          }}
        />
      )}

      <Input
        value={form.password}
        className=" w-full py-4 dark:text-white"
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
          backgroundColor: 'white',
          borderColor: 'lightgrey',
        }}
        onChangeText={(value: any) => onChangeText('password', value)}
        secureTextEntry={!secureTextEntry}
        title="Password"
        placeholder="Enter your password"
        onFocus={() => {
          scrollViewRef.current?.scrollTo({ y: 150, animated: true }); // Adjust 150 as needed
        }}
      />

      <Input
        value={form.confirmPassword}
        className=" w-full py-4 dark:text-white"
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
          backgroundColor: 'white',
          borderColor: 'lightgrey',
        }}
        onChangeText={(value: any) => onChangeText('confirmPassword', value)}
        secureTextEntry={!secureTextEntry}
        title="Confirm Password"
        placeholder="Enter your password"
        onFocus={() => {
          scrollViewRef.current?.scrollTo({ y: 150, animated: true }); // Adjust 150 as needed
        }}
      />

      <TouchableOpacity className="mt-4 flex-row items-start" onPress={() => setAgreed(!agreed)}>
        <View
          className={`mr-3 h-5 w-5 items-center justify-center rounded border-2 ${agreed ? 'bg-primary-600 border-primary-600' : 'border-gray-300'}`}>
          {agreed && <View className="h-3 w-3 rounded-sm bg-black" />}
        </View>
        <Text className="flex-1 font-['Inter-Regular'] text-sm text-gray-600">
          I agree to the{' '}
          <Text className="text-primary-600 font-['Inter-Bold']">Terms of Service</Text> and{' '}
          <Text className="text-primary-600 font-['Inter-Bold']">Privacy Policy</Text>
        </Text>
      </TouchableOpacity>

      <DynamicButton
        className="mt-4 rounded-xl"
        titleClassName="!text-white !font-poppinsMedium !text-lg"
        onPress={handleSubmit}
        title="Create Account"
        // isLoading={signInLoading}
      />
      <View className="my-6 flex-row items-center">
        <View className="h-px flex-1 bg-gray-200" />
        <Text className="mx-4 font-['Inter-Regular'] text-sm text-gray-500">or</Text>
        <View className="h-px flex-1 bg-gray-200" />
      </View>

      <TouchableOpacity className="mb-4 h-12 flex-row items-center justify-center rounded-lg border border-gray-200 bg-white">
        <AntDesign name="google" size={20} color="black" />
        <Text className="ml-2 font-['Inter-Semibold'] text-base text-gray-800">
          Continue with Google
        </Text>
      </TouchableOpacity>

      {Platform.OS === 'ios' && (
        <TouchableOpacity className="h-12 flex-row items-center justify-center rounded-lg bg-black">
          <AntDesign name="apple1" size={20} color="white" />
          <Text className="ml-2 font-['Inter-Semibold'] text-base text-white">
            Continue with Apple
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Signup;
