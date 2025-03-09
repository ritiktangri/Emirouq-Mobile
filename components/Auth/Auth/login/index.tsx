import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import DynamicButton from '~/components/DynamicButton';
import Input from '~/components/UI/Input';
import { useAuth } from '~/context/AuthContext';

const Login = ({ checkinType }: any) => {
  const [agreed, setAgreed] = useState(false);
  const { login } = useAuth();
  const { router }: any = useRouter();
  const [secureTextEntry, setSecureTextEntry] = useState(false);
  const [form, setForm] = useState({
    email: 'Gurpreets0207@gmail.com',
    phoneNumber: '',
    password: '12345678',
  });
  const onChangeText = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };
  const scrollViewRef = useRef<ScrollView>(null);

  const handleLogin = () => {
    const body: any = {
      password: form.password,
    };
    if (checkinType === 'email') {
      body.email = form.email;
    } else {
      body.phoneNumber = form.phoneNumber;
    }
    console.log('body', body);
    login(
      body,
      () => {
        console.log('success');
      },
      (err: any) => {
        console.log('err', err.data.error.message);
      }
    );
  };
  return (
    <View className="mt-8 space-y-6">
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

      <TouchableOpacity className="mt-4 flex-row items-start" onPress={() => setAgreed(!agreed)}>
        <View
          className={`mr-3 h-5 w-5 items-center justify-center rounded border-2 ${agreed ? 'bg-primary-600 border-primary-600' : 'border-gray-300'}`}>
          {agreed && <View className="h-3 w-3 rounded-sm bg-white" />}
        </View>
        <Text className="flex-1 font-['Inter-Regular'] text-sm text-gray-600">Remember me</Text>
      </TouchableOpacity>

      <DynamicButton
        className="mt-4 rounded-xl"
        titleClassName="!text-white !font-poppinsMedium !text-lg"
        onPress={handleLogin}
        title="Sign In"
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

export default Login;
