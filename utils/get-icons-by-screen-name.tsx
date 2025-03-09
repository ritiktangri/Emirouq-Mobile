import { AntDesign, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';

import {
  ActiveAnalyticsSVG,
  ActiveDiarySVG,
  ActiveHomeSVG,
  ActiveTradeSVG,
  InActiveAnalyticsSVG,
  InActiveDiarySVG,
  InActiveHomeSVG,
  InActiveTradeSVG,
} from '~/svgs/bottombar';

export const getIconsByScreenName = (theme: string, screenName: string, active: boolean) => {
  console.log('active', active);
  const iconSource: any = {
    home: (
      <AntDesign
        name="home"
        size={24}
        className={active ? '!text-primary' : ''}
        // color={active ? 'text-primary' : 'black'}
      />
    ),
    search: <Ionicons name="search-outline" size={24} className={active ? '!text-primary' : ''} />,
    post: (
      <Ionicons name="add-circle-outline" size={24} className={active ? '!text-primary' : ''} />
    ),
    chat: (
      <Ionicons name="chatbubbles-outline" size={24} className={active ? '!text-primary' : ''} />
    ),
    profile: <AntDesign name="user" size={24} className={active ? '!text-primary' : ''} />,
  };
  // const lightIconSource: any = {
  //   home: active ? <ActiveHomeSVG active={true} /> : <ActiveHomeSVG />,
  //   sell: active ? <ActiveTradeSVG active={true} /> : <ActiveTradeSVG />,
  //   chat: active ? <ActiveAnalyticsSVG active={true} /> : <ActiveAnalyticsSVG />,
  //   profile: active ? <ActiveDiarySVG active={true} /> : <ActiveDiarySVG />,
  // };

  if (!iconSource) return null;

  return <>{iconSource[screenName]}</>;
};

const styles = StyleSheet.create({
  icon: {
    width: 22,
    height: 22,
  },
  activeIcon: {
    width: 22,
    height: 22,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 14,
    backgroundColor: '#0A84FF',
    borderRadius: 8,
  },
});
