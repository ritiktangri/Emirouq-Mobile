/* eslint-disable import/order */
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import TabLayout from './tabbar';
import UserProfile from './UserProfile';
import ManageAds from './ManageAds';

const Profile = () => {
  const [activeTab, setActiveTab] = useState(0);

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
