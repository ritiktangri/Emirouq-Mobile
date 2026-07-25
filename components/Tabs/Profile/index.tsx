/* eslint-disable import/order */
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import TabLayout from './tabbar';
import UserProfile from './UserProfile';
import ManageAds from './ManageAds';
import { usePosts } from '~/context/PostContext';
import { useAuth } from '~/context/AuthContext';
import LoggedOutView from './LoggedOutView';

const Profile = ({ initialTab }: { initialTab?: string }) => {
  const activeTabParam = Array.isArray(initialTab) ? initialTab[0] : initialTab;
  const [activeTab, setActiveTab] = useState(() => (activeTabParam === 'profile' ? 1 : 0));

  useEffect(() => {
    setActiveTab(activeTabParam === 'profile' ? 1 : 0);
  }, [activeTabParam]);

  const { user } = useAuth();

  const render: any = useMemo(() => {
    return {
      '0': <ManageAds />,
      '1': <UserProfile />,
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
        {user?.uuid ? (
          <>
            <TabLayout activeTab={activeTab} setActiveTab={setActiveTab} />
            <View className="flex-1">{render[activeTab?.toString()]}</View>
          </>
        ) : (
          <LoggedOutView />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Profile;
