/* eslint-disable prettier/prettier */
import { Dimensions, StyleSheet } from 'react-native';

import theme from '.';

//myStyles.js
export const themeStyle = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingVertical: 10,
  },
  flex: {
    flex: 1,
  },

  flexRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  textColor: {
    color: '#fff',
    fontSize: 16,
    fontFamily: theme.font.interMedium,
  },
  interFont: {
    fontFamily: theme.font.interMedium,
  },
  poppinsFont: {
    fontFamily: theme.font.poppinsMedium,
  },
  windowDimensions: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  screenDimensions: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
});
