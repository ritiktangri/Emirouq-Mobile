import { Dimensions } from 'react-native';
const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export default {
  light: {
    text: '#fff',
    background: '#282C30',
    backgroundColor: '#23282C',
    tint: tintColorLight,
    tabIconDefault: '#fff',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};

export const { width, height } = Dimensions.get('window');
