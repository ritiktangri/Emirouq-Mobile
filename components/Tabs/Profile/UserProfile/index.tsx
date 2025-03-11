import { View, Text, TouchableOpacity, Switch } from 'react-native';
import React, { useState } from 'react';
import { useAuth } from '~/context/AuthContext';
import { Image as ExpoImage } from 'expo-image';
import { AntDesign, EvilIcons, Feather, FontAwesome, Fontisto, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const UserProfile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(user);
  const [profileImage, setProfileImage] = useState<any>({
    uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D',
  });

  const { logout } = useAuth();

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
  return (
    <View className="">
      <View className="flex-col items-center gap-y-1 rounded-lg bg-white py-4">
        {profileImage?.uri || user?.profileImage ? (
          <View className="relative h-[80px] w-[80px] rounded-full ">
            <ExpoImage
              source={{ uri: profileImage?.uri || user?.profileImage }}
              contentFit="cover"
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
          <FontAwesome name="user-circle-o" size={80} color="gray" />
        )}
        <AntDesign
          name="camerao"
          size={18}
          color="white"
          onPress={pickImage}
          className="relative bottom-8 left-6 rounded-full bg-primary p-1"
        />

        <View className="flex flex-col gap-y-2">
          <Text className="text-center text-lg font-semibold">{`${user?.firstName} ${user?.lastName || ''}`}</Text>
          <Text className="text-center text-gray-600">{user?.email}</Text>
          <View className="flex-row items-center justify-center ">
            <EvilIcons name="location" size={18} color="#4b5563" />
            <Text className="text-center text-gray-600">San Franciso, CA</Text>
          </View>
        </View>
      </View>
      {/* STATS */}
      <View className="mt-2 flex-row justify-between rounded-lg bg-white px-3 py-3">
        <View className="flex items-center">
          <Text className="text-xl font-semibold">45</Text>
          <Text>Ads Posted</Text>
        </View>
        <View className="flex items-center">
          <Text className="text-xl font-semibold">38</Text>
          <Text>Items Sold</Text>
        </View>
        <View className="flex items-center">
          <Text className="text-xl font-semibold">90%</Text>
          <Text>Response Rate</Text>
        </View>
      </View>
      {/* PERSONAL INFORMATION */}
      <View className="mt-2 rounded-lg bg-white px-3 py-3">
        <Text className="text-xl font-semibold">Personal Information</Text>
        <View className="flex justify-start">
          <View className="flex-row items-center gap-x-2">
            <AntDesign name="mobile1" size={24} color="gray" />
            <View className="flex-col border-b-[0.2px] border-gray-300 py-2">
              <Text className="text-gray-600">Phone</Text>
              <Text className="text-lg">{user?.phoneNumber || 'N/A'}</Text>
            </View>
          </View>
          <View className="flex-row items-center gap-x-2">
            <Fontisto name="email" size={24} color="gray" />
            <View className="flex-col border-b-[0.2px] border-gray-300 py-2">
              <Text className="text-gray-600">Email</Text>
              <Text className="text-lg">{user?.email}</Text>
            </View>
          </View>
          <View className="flex-row items-center gap-x-2">
            <EvilIcons name="location" size={24} color="gray" />
            <View className="flex-col py-2">
              <Text className="text-gray-600">Location</Text>
              <Text className="text-lg">San Francisco, CA</Text>
            </View>
          </View>
        </View>
      </View>
      {/* ACCOUNT SETTINGS */}
      <View className="my-2 rounded-lg bg-white p-2">
        <Text className="text-xl font-semibold">Account Settings</Text>
        <View className="my-3 flex-row items-center justify-between">
          <View className="flex-row  items-center gap-x-2">
            <AntDesign name="mobile1" size={20} color="gray" />
            <Text className="text-lg">Show Contact Details</Text>
          </View>
          <Switch value={true} />
        </View>
        <View className="my-3 flex-row items-center justify-between">
          <View className="flex-row  items-center gap-x-2">
            <Ionicons name="notifications-outline" size={20} color="gray" />
            <Text className="text-lg">Direct Messages</Text>
          </View>
          <Switch value={true} />
        </View>
        <View className="my-3 flex-row items-center justify-between">
          <View className="flex-row  items-center gap-x-2">
            <Feather name="lock" size={20} color="gray" />
            <Text className="text-lg">Two Factor Authentication</Text>
          </View>
          <Switch value={true} />
        </View>
      </View>
      <TouchableOpacity
        onPress={logout}
        className="my-2 flex-row items-center justify-center gap-x-3 rounded-xl border-2 border-red-500 py-2">
        <AntDesign name="delete" size={20} color="red" />
        <Text className="font-semibold text-red-500">Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserProfile;
