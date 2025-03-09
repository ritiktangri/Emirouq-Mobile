/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],

  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2560px', // only need to control product grid mode in ultra 4k device
    },
    extend: {
      colors: {
        primary: '#FF5722',
        background: '#000',
        text: '#fff',
        border: '#0A84FF',
        placeholder: '#BDBDBDCC',
        tertiary: '#94969C',
        drawer: '#282E36',
        bottom_tab_active: '#00B9E7',
        dashboard_card: '#131B24',
        dashboard_card_text: '#BFBFBF',
        calendar_border: '#192839',
        //analytics
        analytics_card: '#282E36',
        analytics_stats_heading_text: '#768EA7',
        analytics_filter: '#474E5B',
        analytics_filter_text: '#768EA7',
        //diary
        diary_bg: '#0D1319',
        diary_date_bg: '#6C849D3D',
        //account
        account_table_bg: '#111827',
        trade_table_header: '#2F4257',
        trade_table_column: '#1B2531',
        default_light_bg: '#f5f5f5',
      },
      fontFamily: {
        interMedium: ['Inter-Medium'],
        poppinsMedium: ['Poppins-Medium'],
        poppinsBlack: ['Poppins-Black'],
        poppinsBold: ['Poppins-Bold'],
        poppinsSemiBold: ['Poppins-SemiBold'],
      },
      text: {
        secondary: '#c7c5c5',
      },
    },
    fontWeight: {
      thin: '100',
      hairline: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      'extra-bold': '900',
      black: '900',
    },
  },
  plugins: [],
};
