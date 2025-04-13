/* eslint-disable import/order */
import React, { useEffect, useState } from 'react';
import { Pressable, Alert, TouchableOpacity } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { z } from 'zod';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Entypo, Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';
import { useAuth } from '~/context/AuthContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCategory } from '~/context/CategoryContext';
import CustomDropdown from '~/components/UI/CustomDropdown';
import { useTheme } from '~/context/ThemeContext';
import { i18n } from '~/utils/i18n';
import { useLocale } from '~/context/LocaleContext';
import { Text } from '~/components/common/Text';
import { View } from '~/components/common/View';
import DefaultTextInput from '~/components/common/DefaultTextInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '~/components/Chat/ChatScreen/header';
import { useRouter } from 'expo-router';

const profileSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phoneNumber: z.string().min(8, 'Phone must be at least 8 characters'),
  userHandle: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  location: z.string().min(2, 'Location is required'),
  bio: z.string().max(150, 'Bio must be less than 150 characters').optional(),
  interests: z.array(z.string()).min(1, 'Select at least one interest'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const SetupProfile = () => {
  const [profileImage, setProfileImage] = useState<any>(null);
  const { locale } = useLocale();
  const { categories }: any = useCategory();
  const { showToast }: any = useTheme();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<ProfileFormData>({ resolver: zodResolver(profileSchema) });
  const { user, updateProfile } = useAuth();

  useEffect(() => {
    if (user?.uuid) {
      setValue('firstName', user?.firstName);
      setValue('lastName', user?.lastName);
      setValue('userHandle', user?.userHandle || '');
      setValue('email', user?.email || '');
      setValue('phoneNumber', user?.phoneNumber || '');
      setValue('bio', user?.bio);
      setValue('interests', user?.userInterest);
    }
  }, [user]);

  const locations = [
    'New York, NY',
    'Los Angeles, CA',
    'Chicago, IL',
    'Houston, TX',
    'Phoenix, AZ',
    'Philadelphia, PA',
  ];

  const pickImage = async (source: 'camera' | 'gallery') => {
    if (source === 'camera') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Please allow camera access in settings.');
        return;
      }
    } else {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Please allow gallery access in settings.');
        return;
      }
    }

    let result: any;
    const config: any = {
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      base64: true,
    };

    try {
      if (source === 'camera') {
        result = await ImagePicker.launchCameraAsync({
          ...config,
          cameraType: ImagePicker.CameraType.back,
        });
      } else {
        result = await ImagePicker.launchImageLibraryAsync(config);
      }

      if (!result.canceled) {
        setProfileImage(result.assets[0]);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while opening the camera.');
    }
    if (!result.canceled) {
      setProfileImage(result?.assets?.[0]);
    }
  };
  const onSubmit = (data: any) => {
    updateProfile(
      {
        body: {
          ...(data?.firstName !== user?.firstName && { firstName: data?.firstName }),
          ...(data?.lastName !== user?.lastName && { lastName: data?.lastName }),
          ...(data?.userHandle !== user?.userHandle && { userHandle: data?.userHandle }),
          ...(data?.location !== user?.location && { location: data?.location }),
          ...(data?.bio !== user?.bio && { bio: data?.bio }),
          ...(data?.countryCode !== user?.countryCode && { countryCode: data?.countryCode }),
          ...(data?.interests && { userInterest: JSON.stringify(data?.interests) }),
          ...(profileImage?.base64 && {
            profileImage: {
              base64: `data:${profileImage?.mimeType};base64,${profileImage?.base64}`,
              fileName: profileImage?.fileName,
            },
          }),
        },
      },
      (res: any) => {
        showToast('Profile Updated!', 'success');
      },
      (err: any) => {
        showToast(err?.message, 'error');
      }
    );
  };

  const selectedInterests = watch('interests') || [];

  const toggleInterest = (interest: string) => {
    const currentInterests = selectedInterests;
    const newInterests = currentInterests.includes(interest)
      ? currentInterests.filter((i) => i !== interest)
      : [...currentInterests, interest];
    setValue('interests', newInterests, { shouldValidate: true });
  };
  return (
    <SafeAreaView className="flex-1 bg-white px-4 py-6">
      <View className="">
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => {
            router.back();
          }}
        />
      </View>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} className="flex flex-col gap-3">
        <Text className="mb-2 text-center text-2xl font-semibold text-gray-800">
          {i18n.t('createProfile.welcome')}
        </Text>
        <Text className="text-center text-lg  text-gray-800">{i18n.t('createProfile.title')}</Text>
        <View className="mb-8 items-center">
          <Pressable
            className="my-3 h-[120px] w-[120px] items-center justify-center rounded-full border-2 border-dashed border-gray-200 "
            onPress={() => pickImage('gallery')}>
            {profileImage ? (
              <ExpoImage
                className="h-full w-full rounded-full"
                source={{ uri: profileImage?.uri }}
                contentFit="fill"
                placeholder={{ blurhash: 'LEHV6nWB2yk8pyo0adR*.7kCMdnj' }}
                transition={1000}
                style={{
                  height: '100%',
                  width: '100%',
                  borderRadius: '50%',
                }}
              />
            ) : (
              <>
                <View className="absolute bottom-0 right-0 h-10 w-10 items-center justify-center rounded-full bg-primary">
                  <Entypo name="camera" size={20} className="!text-white" />
                </View>
                <FontAwesome name="user-o" size={40} color="gray" />
              </>
            )}
          </Pressable>
          <Text className="mb-4 font-poppinsMedium text-base text-gray-800">
            {i18n.t('createProfile.addProfilePicture')}
          </Text>

          <View className="flex-row gap-3">
            <Pressable
              className="flex flex-row items-center gap-2 rounded-lg border border-gray-300 px-4 py-2"
              onPress={() => pickImage('camera')}>
              <Entypo name="camera" size={20} className="!text-black" />

              <Text className=" text-gray-600">{i18n.t('createProfile.camera')}</Text>
            </Pressable>
            <Pressable
              className="flex flex-row items-center gap-2 rounded-lg border border-gray-300 px-4 py-2"
              onPress={() => pickImage('gallery')}>
              <FontAwesome name="image" size={20} className="!text-black" />

              <Text className=" text-gray-600">{i18n.t('createProfile.gallery')}</Text>
            </Pressable>
          </View>
        </View>
        <View className="">
          <Text placement={locale} className="mb-2 text-base font-semibold text-gray-800">
            {i18n.t('createProfile.firstName')} *
          </Text>
          <Controller
            control={control}
            name="firstName"
            render={({ field: { onChange, value } }) => (
              <DefaultTextInput
                className="w-full"
                prefix={<Ionicons name="person-outline" size={20} color="gray" />}
                containerClassName="w-full rounded-lg border border-gray-200 bg-white px-4 py-4"
                onChangeText={onChange}
                value={value}
                placeholder={i18n.t('createProfile.firstNamePlaceholder')}
              />
            )}
          />
          {errors.firstName && (
            <Text className="mt-1 text-sm text-red-500">{errors.firstName.message}</Text>
          )}
        </View>
        <View className="">
          <Text placement={locale} className="mb-2 text-base font-semibold text-gray-800">
            {i18n.t('createProfile.lastName')} *
          </Text>
          <Controller
            control={control}
            name="lastName"
            render={({ field: { onChange, value } }) => (
              <DefaultTextInput
                className="w-full"
                prefix={<Ionicons name="person-outline" size={20} color="gray" />}
                containerClassName="w-full rounded-lg border border-gray-200 bg-white px-4 py-4"
                onChangeText={onChange}
                value={value}
                placeholder={i18n.t('createProfile.lastNamePlaceholder')}
              />
            )}
          />
          {errors.lastName && (
            <Text className="mt-1 text-sm text-red-500">{errors.lastName.message}</Text>
          )}
        </View>

        <View>
          <Text placement={locale} className="mb-2 text-base font-semibold text-gray-800">
            {i18n.t('createProfile.userName')} *
          </Text>
          <Controller
            control={control}
            name="userHandle"
            render={({ field: { onChange, value } }) => (
              <DefaultTextInput
                className="w-full"
                prefix={<Ionicons name="at" size={20} color="gray" />}
                containerClassName="w-full rounded-lg border border-gray-200 bg-white px-4 py-4"
                onChangeText={onChange}
                value={value}
                placeholder={i18n.t('createProfile.userNamePlaceholder')}
              />
            )}
          />
          {errors.userHandle && (
            <Text className="mt-1 text-sm text-red-500">{errors.userHandle.message}</Text>
          )}
        </View>

        <View>
          <Text placement={locale} className="mb-2 text-base font-semibold text-gray-800">
            {i18n.t('createProfile.emailAddress')} *
          </Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <DefaultTextInput
                className="w-full"
                editable={false}
                prefix={<Feather name="mail" size={20} color="gray" />}
                containerClassName="w-full rounded-lg border border-gray-200 bg-white px-4 py-4"
                onChangeText={!user?.isEmail ? onChange : () => {}}
                value={value}
                placeholder={i18n.t('createProfile.emailPlaceholder')}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />
          {errors.email && (
            <Text className="mt-1 text-sm text-red-500">{errors.email.message}</Text>
          )}
        </View>

        <View>
          <Text placement={locale} className="mb-2 text-base font-semibold text-gray-800">
            {i18n.t('createProfile.phoneNumber')} *
          </Text>
          <View className="flex-row gap-2">
            <View className="w-16 items-center justify-center rounded-lg border border-gray-200 px-4 py-4">
              <Text>+1</Text>
            </View>
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field: { onChange, value } }) => (
                <DefaultTextInput
                  className="w-full"
                  containerClassName="w-full flex-1 rounded-lg border border-gray-200 bg-white px-4 py-4"
                  onChangeText={user?.isEmail ? onChange : () => {}}
                  value={value}
                  placeholder={i18n.t('createProfile.phoneNumberPlaceholder')}
                  keyboardType="phone-pad"
                />
              )}
            />
          </View>
          {errors.phoneNumber && (
            <Text className="mt-1 text-sm text-red-500">{errors.phoneNumber.message}</Text>
          )}
        </View>

        <View className="mb-2">
          <Text placement={locale} className="mb-2 text-base font-semibold text-gray-800">
            {i18n.t('createProfile.location')} *
          </Text>
          <Controller
            control={control}
            name="location"
            render={({ field: { onChange, value } }) => (
              <CustomDropdown
                value={value}
                data={locations}
                onChange={onChange}
                placeholder={i18n.t('createProfile.locationPlaceholder')}
              />
            )}
          />
          {errors.location && (
            <Text className="mt-1 text-sm text-red-500">{errors.location.message}</Text>
          )}
        </View>

        <View>
          <Text placement={locale} className="mb-2 text-base font-semibold text-gray-800">
            {i18n.t('createProfile.bio')} *
          </Text>
          <Controller
            control={control}
            name="bio"
            render={({ field: { onChange, value } }) => (
              <DefaultTextInput
                className="w-full"
                containerClassName="h-24 w-full rounded-lg border border-gray-200 bg-white px-4 py-4"
                onChangeText={onChange}
                value={value}
                placeholder={i18n.t('createProfile.bioPlaceholder')}
                multiline
                numberOfLines={4}
                maxLength={150}
                textAlignVertical="top"
              />
            )}
          />
          <Text className="mt-1 text-right text-xs text-gray-500">
            {watch('bio')?.length || 0}/150
          </Text>
          {errors.bio && <Text className="mt-1 text-sm text-red-500">{errors.bio.message}</Text>}
        </View>
        <View>
          <Text placement={locale} className="mb-2 text-base font-semibold text-gray-800">
            {i18n.t('createProfile.selectInterests')} *
          </Text>
          <Text placement={locale} className="mb-3 text-sm text-gray-500">
            {i18n.t('createProfile.chooseCategoryTitle')}
          </Text>

          <View className="flex-row flex-wrap gap-2">
            {(categories || [])?.map((interest: any) => {
              const isSelected = selectedInterests.includes(interest?.uuid);
              return (
                <Pressable
                  key={interest?.uuid}
                  onPress={() => toggleInterest(interest?.uuid)}
                  className={`flex-row items-center rounded-full border px-4 py-2 ${
                    isSelected ? 'border-primary bg-primary' : 'border-gray-200 bg-white'
                  }`}>
                  <Text className={`text-sm ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                    {interest?.title}
                  </Text>
                  {isSelected && (
                    <View className="ml-2">
                      <Entypo name="cross" size={14} color="white" />
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>
          {errors.interests && (
            <Text className="mt-2 text-sm text-red-500">{errors.interests.message}</Text>
          )}
        </View>
      </KeyboardAwareScrollView>

      <TouchableOpacity
        className="mt-6 w-full items-center rounded-lg bg-primary py-4"
        onPress={handleSubmit(onSubmit)}>
        <Text className="text-base font-semibold text-white">
          {i18n.t('createProfile.btnText')}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SetupProfile;
