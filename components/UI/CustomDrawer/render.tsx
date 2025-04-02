/* eslint-disable import/order */
import { useRouter } from 'expo-router';
import React from 'react';
import { View, TouchableOpacity, InteractionManager, Switch, useColorScheme } from 'react-native';
import { useAuth } from '~/context/AuthContext';
import { removeStorageItemAsync } from '~/hooks/useStorageState';
import { Text } from '~/components/common/Text';
import { useTheme } from '~/context/ThemeContext';

const Render = ({
  item,
  index,
  isActive,
  props,
}: {
  item: any;
  index: number;
  isActive: boolean;
  props: any;
}) => {
  const { setUser, setActiveAccount } = useAuth();
  const { onSelectTheme, isDarkTheme } = useTheme();
  const router = useRouter();
  return (
    <TouchableOpacity
      key={index}
      className="flex-row justify-between"
      onPress={async () => {
        if (!item?.routes) return;
        if (item?.name !== 'Sign Out') {
          router.push(item?.routes);

          requestAnimationFrame(() => {
            InteractionManager.runAfterInteractions(async () => {
              props.navigation.closeDrawer();
            });
          });
        }
        if (item?.name === 'Sign Out') {
          router.push(item?.routes);
          requestAnimationFrame(() => {
            InteractionManager.runAfterInteractions(async () => {
              setUser({});
              props.navigation.closeDrawer();
              setActiveAccount([]);
              await removeStorageItemAsync('accessToken');
            });
          });
        }
      }}>
      <View className="flex flex-row items-center gap-3  p-3">
        <View className=" dark:text-white">{item?.icon(isActive)}</View>
        <View className="flex flex-row items-center gap-1">
          <Text className=" font-interMedium text-lg dark:text-dashboard_card_text">
            {item?.name}
          </Text>
        </View>
      </View>
      <View>
        {item?.id === 4 ? (
          <Switch
            onValueChange={(value: any) => {
              onSelectTheme(value);
            }}
            value={isDarkTheme}
            trackColor={{ false: '#767577', true: '#FF5722' }}
            ios_backgroundColor="#3e3e3e"
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default Render;
