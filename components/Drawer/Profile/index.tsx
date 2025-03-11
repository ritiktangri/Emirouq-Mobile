/* eslint-disable import/order */
import {
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { DefaultText as Text } from '~/components/common/DefaultText';
import React, { useCallback, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '~/context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import DefaultTextInput from '~/components/common/DefaultTextInput';
import theme from '~/utils/theme';
import CustomHeader from '~/components/UI/CustomHeader';
import { FontAwesome6 } from '@expo/vector-icons';
import { useTheme } from '~/context/ThemeContext';
import { Image as ExpoImage } from 'expo-image';

const Profile = () => {
  const { user, updateProfile, btnLoading } = useAuth();
  const [userData, setUserData] = useState(user);
  const { isDarkTheme } = useTheme();
  const [profileImage, setProfileImage] = useState<any>({});
  const pickImage = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      aspect: [4, 3],
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled) {
      setProfileImage(result?.assets?.[0]);
    }
  };

  const onUpdateProfile = useCallback(async () => {
    updateProfile(
      {
        // data:image/png;base64
        body: {
          // check if the user has changed the value before updating
          ...(userData?.firstName !== user?.firstName && { firstName: userData?.firstName }),
          ...(userData?.lastName !== user?.lastName && { lastName: userData?.lastName }),
          ...(userData?.userHandle !== user?.userHandle && { userHandle: userData?.userHandle }),
          ...(profileImage?.base64 && {
            profile: {
              base64: `data:${profileImage?.mimeType};base64,${profileImage?.base64}`,
              fileName: profileImage?.fileName,
            },
          }),
        },
      },
      () => {}
    );
  }, [userData, profileImage]);
  return (
    <SafeAreaView className="flex-1 bg-white px-4 dark:bg-[#282E36]">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={10}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="gap-y-2">
              <View className="mb-6 mt-3">
                <Text className="mb-1 text-2xl font-semibold text-white">Profile Information</Text>
                <Text className="text-tertiary">Update your photo and personal details here</Text>
              </View>
              <View className="flex-col items-center gap-y-2">
                {profileImage?.uri || user?.profileImage ? (
                  <View className="relative h-[140px] w-[140px] rounded-full ">
                    <ExpoImage
                      source={{ uri: profileImage?.uri || user?.profileImage }}
                      contentFit="fill"
                      placeholder={{ blurhash: 'LEHV6nWB2yk8pyo0adR*.7kCMdnj' }}
                      transition={1000}
                      style={{
                        height: '100%',
                        width: '100%',
                        borderRadius: 100,
                      }}
                    />
                  </View>
                ) : (
                  <FontAwesome6
                    name="user-large"
                    size={100}
                    color={isDarkTheme ? 'white' : 'black'}
                  />
                )}
                <Text
                  dark="text-white"
                  light="text-black"
                  onPress={pickImage}
                  className=" font-poppinsMedium">
                  Change photo
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Profile;
