/* eslint-disable import/order */
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import TabLayout from './tabbar';
import UserProfile from './UserProfile';
import ManageAds from './ManageAds';
import AdsDashboard from './AdsDashboard';
import { usePosts } from '~/context/PostContext';

const Profile = () => {
  const [activeTab, setActiveTab] = useState(0);

  const render: any = useMemo(() => {
    return {
      '0': <UserProfile />,
      '1': <AdsDashboard />,
      '2': <ManageAds />,
    };
  }, [activeTab]);

  const { getAdsList, start, status } = usePosts();
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    getAdsList(signal, 10, start, '', status, false);
    return () => {
      controller.abort();
    };
  }, [status]);
  return (
    <SafeAreaView className="flex-1 bg-white px-4 py-2" edges={['left', 'right']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={10}
        className="flex-1">
        <TabLayout activeTab={activeTab} setActiveTab={setActiveTab} />
        <View className="flex-1">{render[activeTab?.toString()]}</View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Profile;
