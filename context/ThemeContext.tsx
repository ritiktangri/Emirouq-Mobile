/* eslint-disable import/order */
import { createContext, useContext, useEffect, useState, useMemo, useRef } from 'react';
import { Appearance, Platform } from 'react-native';
import Toast from '~/components/UI/Toast';
import { getStorageItemAsync, setStorageItemAsync } from '~/hooks/useStorageState';
import DarkTheme from '~/theme/DarkTheme';
import DefaultTheme from '~/theme/DefaultTheme';

const defaultProvider = {
  isDarkTheme: false,
  setIsDarkTheme: () => {},
  colors: DefaultTheme?.[0]?.colors,
  onSelectTheme: (payload: any) => {},
};
const ThemeContext = createContext(defaultProvider);
export const useTheme = () => useContext(ThemeContext);

const colorsName = ['DarkBlue', 'Teal', 'Violet', 'Red', 'Yellow'];

const ThemeProvider = ({ children }: any) => {
  const colorScheme = Appearance.getColorScheme();
  const [isDarkTheme, setIsDarkTheme] = useState(colorScheme === 'dark');
  const [colorIndex, setColorIndex] = useState(0);
  const toastRef: any = useRef(null);
  const onSelectTheme = (value: any) => {
    setIsDarkTheme(value);
    Appearance.setColorScheme(!value ? 'light' : 'dark');
    setStorageItemAsync('isDarkTheme', value?.toString());
  };

  const onSelectColor = (index: any) => {
    setStorageItemAsync('colorIndex', index?.toString());
    setColorIndex(+index);
  };

  const showToast = (message: string, type: string) => {
    toastRef.current.toast(message, type);
  };

  useEffect(() => {
    (async () => {
      const isDark = await getStorageItemAsync('isDarkTheme');
      // const colorIndex = await getStorageItemAsync('colorIndex');
      // since first time user will not have any value in storage so its undefined
      setIsDarkTheme(isDark === true ? true : false);
      Appearance.setColorScheme(isDark === true ? 'dark' : 'light');
      // if (colorIndex) {
      //   setColorIndex(JSON.parse(colorIndex));
      // }
    })();
  }, []);

  const value: any = useMemo(
    () => ({
      isDarkTheme,
      colors: isDarkTheme ? DarkTheme?.[colorIndex]?.colors : DefaultTheme?.[colorIndex]?.colors,
      onSelectTheme,
      setColorIndex,
      colorIndex,
      colorsName,
      onSelectColor,
      colorScheme: isDarkTheme ? 'dark' : 'light',
      showToast,
    }),
    [isDarkTheme, colorIndex, onSelectTheme, onSelectColor, colorsName, showToast]
  );

  return (
    <ThemeContext.Provider value={value}>
      <Toast ref={toastRef} />
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
