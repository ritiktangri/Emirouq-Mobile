/* eslint-disable import/order */

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Dropdown from './dropdown';
import { useAuth } from '~/context/AuthContext';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { SimpleLineIcons } from '@expo/vector-icons';

const SelectAccount = () => {
  const { activeAccount } = useAuth();
  const navigation = useNavigation();
  return (
    <View className="flex flex-1 flex-row items-center gap-4">
      <TouchableOpacity
        onPress={() => {
          navigation.dispatch(DrawerActions.toggleDrawer());
        }}>
        {/* {unSeenCount > 0 ? (
          <View className="absolute right-0 top-0 z-10 h-3 w-3 rounded-full bg-primary" />
        ) : null} */}
        {/* <MenuIcon className="!text-black dark:!text-white" /> */}
        <SimpleLineIcons name="menu" size={20} className="!text-black dark:!text-white" />
      </TouchableOpacity>

      <Dropdown
        options={[
          {
            uuid: activeAccount?.accounts?.map((item: any) => item?.uuid)?.join(','),
            label: 'All Accounts',
            accountName: 'All Accounts',
            status: 'active',
          },
          ...(activeAccount?.accounts || []),
        ]}
        placeholder={
          activeAccount?.activeAccountIds?.length !== activeAccount?.accounts?.length
            ? activeAccount?.accounts?.find(
                (i: any) => i?.uuid === activeAccount?.activeAccountIds[0]
              )?.accountName
            : activeAccount?.activeAccountIds?.length === activeAccount?.accounts?.length
              ? 'All Accounts'
              : `Account Selected (${activeAccount?.activeAccountIds?.length})`
        }
        onSelect={() => {}}
      />
    </View>
  );
};

export default SelectAccount;
