import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import DynamicButton from '~/components/DynamicButton';
import Input from '~/components/UI/Input';
import { useAuth } from '~/context/AuthContext';
import { useTheme } from '~/context/ThemeContext';
import { routes } from '~/utils/routes';

type SignupFormData = {
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  password: string;
  confirmPassword: string;
  agreed: boolean;
};

const Signup = ({ checkinType }: { checkinType: 'email' | 'phone' }) => {
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();
  const { showToast } = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);

  const [secureTextEntry, setSecureTextEntry] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignupFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      agreed: false,
    },
  });

  const password = watch('password');

  const onSubmit = (data: SignupFormData) => {
    if (!data.agreed) {
      showToast('You must agree to the terms before continuing', 'error');
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('password', data.password);
    formData.append('confirmPassword', data.confirmPassword);

    if (checkinType === 'email') {
      formData.append('email', data.email || '');
    } else {
      formData.append('phoneNumber', data.phoneNumber || '');
    }

    signUp(
      { body: formData },
      () => {
        // if (checkinType === 'email') {
        //   router.setParams({ email: data.email });
        // } else {
        //   router.setParams({ phone: data.phoneNumber });
        // }
        router.push({
          pathname: routes.auth.verifyOtp,
          params: {
            email: data.email,
            phone: data.phoneNumber,
          },
        } as any);
        setLoading(false);
      },
      (err: any) => {
        showToast(err?.message, 'error');
        setLoading(false);
      }
    );
  };

  return (
    <View className="mt-8 space-y-6">
      {/* First Name */}
      <Controller
        control={control}
        name="firstName"
        rules={{ required: 'First name is required' }}
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            title="First Name"
            placeholder="Enter your first name"
            inputStyle={{ backgroundColor: 'white', borderColor: 'lightgrey' }}
            className="w-full py-4 dark:text-white"
            autoCapitalize="none"
            onFocus={() => scrollViewRef.current?.scrollTo({ y: 0, animated: true })}
          />
        )}
      />
      {errors.firstName && <Text className="text-red-500">{errors.firstName.message}</Text>}

      {/* Last Name */}
      <Controller
        control={control}
        name="lastName"
        rules={{ required: 'Last name is required' }}
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            title="Last Name"
            placeholder="Enter your last name"
            inputStyle={{ backgroundColor: 'white', borderColor: 'lightgrey' }}
            className="w-full py-4 dark:text-white"
            autoCapitalize="none"
            onFocus={() => scrollViewRef.current?.scrollTo({ y: 0, animated: true })}
          />
        )}
      />
      {errors.lastName && <Text className="text-red-500">{errors.lastName.message}</Text>}

      {/* Email or Phone */}
      {checkinType === 'email' ? (
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'Email is required',
            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
          }}
          render={({ field: { value, onChange, onBlur } }) => (
            <Input
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              title="Email"
              placeholder="Enter your email"
              keyboardType="email-address"
              inputStyle={{ backgroundColor: 'white', borderColor: 'lightgrey' }}
              className="w-full py-4 dark:text-white"
              onFocus={() => scrollViewRef.current?.scrollTo({ y: 0, animated: true })}
            />
          )}
        />
      ) : (
        <Controller
          control={control}
          name="phoneNumber"
          rules={{ required: 'Phone number is required' }}
          render={({ field: { value, onChange, onBlur } }) => (
            <Input
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              title="Phone Number"
              placeholder="Enter your phone number"
              keyboardType="numeric"
              inputStyle={{ backgroundColor: 'white', borderColor: 'lightgrey' }}
              className="w-full py-4 dark:text-white"
              onFocus={() => scrollViewRef.current?.scrollTo({ y: 0, animated: true })}
            />
          )}
        />
      )}
      {(errors.email || errors.phoneNumber) && (
        <Text className="text-red-500">{errors.email?.message || errors.phoneNumber?.message}</Text>
      )}

      {/* Password */}
      <Controller
        control={control}
        name="password"
        rules={{
          required: 'Password is required',
          minLength: { value: 6, message: 'Password must be at least 6 characters' },
        }}
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            title="Password"
            placeholder="Enter your password"
            secureTextEntry={!secureTextEntry}
            inputStyle={{ backgroundColor: 'white', borderColor: 'lightgrey' }}
            className="w-full py-4 dark:text-white"
            suffix={
              <TouchableOpacity
                className="px-2"
                onPress={() => setSecureTextEntry(!secureTextEntry)}>
                <Ionicons name={secureTextEntry ? 'eye' : 'eye-off'} size={20} color="#c7c7c7" />
              </TouchableOpacity>
            }
            onFocus={() => scrollViewRef.current?.scrollTo({ y: 150, animated: true })}
          />
        )}
      />
      {errors.password && <Text className="text-red-500">{errors.password.message}</Text>}

      {/* Confirm Password */}
      <Controller
        control={control}
        name="confirmPassword"
        rules={{
          required: 'Confirm password is required',
          validate: (val) => val === password || 'Passwords do not match',
        }}
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            title="Confirm Password"
            placeholder="Enter your password again"
            secureTextEntry={!secureTextEntry}
            inputStyle={{ backgroundColor: 'white', borderColor: 'lightgrey' }}
            className="w-full py-4 dark:text-white"
            suffix={
              <TouchableOpacity
                className="px-2"
                onPress={() => setSecureTextEntry(!secureTextEntry)}>
                <Ionicons name={secureTextEntry ? 'eye' : 'eye-off'} size={20} color="#c7c7c7" />
              </TouchableOpacity>
            }
            onFocus={() => scrollViewRef.current?.scrollTo({ y: 150, animated: true })}
          />
        )}
      />
      {errors.confirmPassword && (
        <Text className="text-red-500">{errors.confirmPassword.message}</Text>
      )}

      {/* Terms */}
      <Controller
        control={control}
        name="agreed"
        render={({ field: { value } }) => (
          <TouchableOpacity
            className="mt-4 flex-row items-start"
            onPress={() => setValue('agreed', !value)}>
            <View
              className={`mr-3 h-5 w-5 items-center justify-center rounded border-2 ${
                value ? 'bg-primary-600 border-primary-600' : 'border-gray-300'
              }`}>
              {value && <View className="h-3 w-3 rounded-sm bg-black" />}
            </View>
            <Text className="flex-1 font-['Inter-Regular'] text-sm text-gray-600">
              I agree to the{' '}
              <Text className="text-primary-600 font-['Inter-Bold']">Terms of Service</Text> and{' '}
              <Text className="text-primary-600 font-['Inter-Bold']">Privacy Policy</Text>
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Submit */}
      <DynamicButton
        className="mb-10 mt-4 rounded-xl"
        titleClassName="!text-white !font-poppinsMedium !text-lg"
        onPress={handleSubmit(onSubmit)}
        title="Create Account"
        isLoading={loading}
      />
    </View>
  );
};

export default Signup;
