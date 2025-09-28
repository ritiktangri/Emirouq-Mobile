import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React from 'react';

export const getIconsByScreenName = (theme: string, screenName: string, active: boolean) => {
  const iconSource: any = {
    home: (
      <Ionicons
        name="home-outline"
        size={24}
        className={active ? '!text-primary' : '!text-bottom_inactive'}
      />
    ),
    category: (
      <Ionicons
        name="grid-outline"
        size={24}
        className={active ? '!text-primary' : '!text-bottom_inactive'}
      />
    ),
    post: <Ionicons name="add-circle-sharp" size={30} className="!text-primary" />,
    chat: (
      <Ionicons
        name="chatbubble-outline"
        size={24}
        className={active ? '!text-primary' : '!text-bottom_inactive'}
      />
    ),
    profile: (
      <FontAwesome
        name="user-o"
        size={24}
        className={active ? '!text-primary' : '!text-bottom_inactive'}
      />
    ),
  };

  if (!iconSource) return null;

  return <>{iconSource[screenName]}</>;
};
