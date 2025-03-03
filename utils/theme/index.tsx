/* eslint-disable prettier/prettier */
import { Dimensions } from 'react-native';
const theme = {
  colors: {
    btn_primary: '#3872FA',
    primary: '#0A84FF',
    commission: '#9c041b',
    bank: '#049F80',
    dashboard_card: '#131B24',
    dashboard_card_text: '#BFBFBF',
    analytics_card: '#282E36',
    drawer: '#282E36',
    analytics_stats_heading_text: '#768EA7',
    //diary
    diary_bg: '#0D1319',
    diary_date_bg: '#6C849D3D',
    //account
    account_table_bg: '#111827',
    trade_table_header: '#2F4257',
    trade_table_column: '#1B2531',
    calendar_border: '#192839',
    calendar_week: '#0F161E',
    secondary: '#EC9B3B',
    backgroundPrimary: '#282C30',
    backgroundSecondary: '#23282C',
    dark_primary: '#FF6D6D',
    light_primary: '#FFD7D7',
    button_primary: '#222222',
    danger: '#eb090d',
    light_danger: '#fddce0',
    text: 'rgba(12,13,52,0.7)',
    white: '#ffffffff',
    transparent: 'rgba(0,0,0,0)',
    black: '#00000000',
    grey: 'rgba(12,13,52,0.05)',
    gray: '#5C5C5C',
    lightGrey: '#718096',
    violet: '#30336B',
    orange: '#F4C724',
    skyBlue: '#01CBC6',
    pink: '#E74292',
    primaryLight: '#93c5fd',
    green: '#3ab43e3B',
    lightgrey: 'rgba(0,0,0,0.2)',
    red: '#FF0000',
    secondaryRed: '#FF6D6D',
    lightRed: '#FFD7D7',
    textSecondary: '#c7c5c5',
  },
  spacing: {
    xxs: 2,
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    xxl: 60,
    xxxl: 80,
  },
  borderRadii: {
    s: 4,
    m: 10,
    l: 25,
    xl: 75,
  },
  textVariants: {
    hero: {
      fontSize: 80,
      lineHeight: 80,
      color: 'white',
      textAlign: 'center',
    },
    title1: {
      fontSize: 28,
      color: 'secondary',
    },
    body: {
      fontSize: 16,
      lineHeight: 20,
      color: 'text',
    },
    button: {
      fontSize: 15,
      color: 'text',
    },
    breakpoints: {},
  },
  font: {
    interMedium: 'Inter-Medium',
    poppinsMedium: 'Poppins-Medium',
    poppinsBlack: 'Poppins-Black',
    poppinsSemiBold: 'Poppins-SemiBold',
    poppinsBold: 'Poppins-Bold',
  },
  shadowGenerator: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  shadowGenerator1: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  shadowGenerator2: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  windowDimensions: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  screenDimensions: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
};

export default theme;
