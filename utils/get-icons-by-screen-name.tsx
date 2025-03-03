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
  const iconSource: any = {
    portfolio: active ? <ActiveHomeSVG active={true} /> : <InActiveHomeSVG />,
    trades: active ? <ActiveTradeSVG active={true} /> : <InActiveTradeSVG />,
    analytics: active ? <ActiveAnalyticsSVG active={true} /> : <InActiveAnalyticsSVG />,
    diary: active ? <ActiveDiarySVG active={true} /> : <InActiveDiarySVG />,
  };
  const lightIconSource: any = {
    portfolio: active ? <ActiveHomeSVG active={true} /> : <ActiveHomeSVG />,
    trades: active ? <ActiveTradeSVG active={true} /> : <ActiveTradeSVG />,
    analytics: active ? <ActiveAnalyticsSVG active={true} /> : <ActiveAnalyticsSVG />,
    diary: active ? <ActiveDiarySVG active={true} /> : <ActiveDiarySVG />,
  };

  if (!iconSource) return null;

  return <>{theme === 'light' ? lightIconSource[screenName] : iconSource[screenName]}</>;
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
