/* eslint-disable import/order */
import {
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  Button,
} from 'react-native';
import { Text } from '~/components/common/Text';
import React, { useCallback, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '~/context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import TabLayout from './tabbar';
import UserProfile from './UserProfile';
import ManageAds from './ManageAds';

const Profile = () => {
  const [activeTab, setActiveTab] = useState(0);

  // const onUpdateProfile = useCallback(async () => {
  //   updateProfile(
  //     {
  //       // data:image/png;base64
  //       body: {
  //         // check if the user has changed the value before updating
  //         ...(userData?.firstName !== user?.firstName && { firstName: userData?.firstName }),
  //         ...(userData?.lastName !== user?.lastName && { lastName: userData?.lastName }),
  //         ...(userData?.userHandle !== user?.userHandle && { userHandle: userData?.userHandle }),
  //         ...(profileImage?.base64 && {
  //           profile: {
  //             base64: `data:${profileImage?.mimeType};base64,${profileImage?.base64}`,
  //             fileName: profileImage?.fileName,
  //           },
  //         }),
  //       },
  //     },
  //     () => {}
  //   );
  // }, [userData, profileImage]);
  return (
    <SafeAreaView className="flex-1 bg-white px-4 py-2" edges={['left', 'right']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={10}
        className="flex-1">
        <TabLayout activeTab={activeTab} setActiveTab={setActiveTab} />
        <View className="flex-1">
          {activeTab === 0 ? <UserProfile /> : activeTab === 2 ? <ManageAds /> : null}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Profile;
