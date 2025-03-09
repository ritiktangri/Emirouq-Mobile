/* eslint-disable import/order */
import React, { act, useEffect, useState } from 'react';
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { DefaultText as Text } from '~/components/common/DefaultText';

import { Ionicons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import { DropdownProps } from '~/types';
import { useDropdown } from '~/hooks/useDropDown';
import { useDropdownAnimation } from '~/hooks/useDropdownAnimation';
import ThemedCheckbox from '../ThemedCheckBox';
import { useAuth } from '~/context/AuthContext';
import Line from '../Line';
import { setStorageItemAsync } from '~/hooks/useStorageState';
import { Href, useRouter } from 'expo-router';
import { routes } from '~/utils/routes';
import { useTheme } from '~/context/ThemeContext';
import { cn } from '~/utils/helper.utils';

const Dropdown: React.FC<DropdownProps> = ({ options, placeholder }) => {
  const { isVisible, dropdownPosition, buttonLayout, buttonRef, toggleDropdown } = useDropdown();
  const { activeAccount, setActiveAccount } = useAuth();
  const { animatedDropdownStyle, animatedScrollStyle, scrollY, showDropdown, hideDropdown } =
    useDropdownAnimation();
  const router = useRouter();
  const handleToggle = React.useCallback(() => {
    if (isVisible) {
      hideDropdown();
      toggleDropdown();
    } else {
      toggleDropdown();
      showDropdown();
    }
  }, [isVisible, toggleDropdown, showDropdown, hideDropdown]);
  useEffect(() => {
    if (activeAccount?.activeAccountIds?.length) {
      setAccountList(activeAccount);
    }
  }, [activeAccount]);
  const [accountList, setAccountList] = useState({
    accounts: [],
    activeAccountIds: [],
  } as any);

  const onPress = async (item: any) => {
    if (item?.accountName === 'All Accounts') {
      const selectAccount: any = {
        activeAccountIds: accountList?.accounts?.map((i: any) => i?.uuid) || [],
        accounts:
          accountList?.accounts?.map((i: any) => {
            return {
              ...i,
              uuid: i?.uuid,
            };
          }) || [],
      };
      setAccountList(selectAccount);
      return;
    }
    const isSelected = accountList.activeAccountIds?.includes(item?.uuid);
    if (!isSelected) {
      const data: any = [...accountList.activeAccountIds, item?.uuid];
      const selectAccount: any = {
        ...accountList,
        activeAccountIds: data,
      };
      setAccountList(selectAccount);
      return;
    }
    const data = accountList.activeAccountIds?.filter((id: any) => id !== item?.uuid);

    const selectAccount: any = {
      ...accountList,
      activeAccountIds: data,
    };
    setAccountList(selectAccount);
  };

  return (
    <View style={styles.container} className="">
      <TouchableOpacity
        ref={buttonRef}
        className="flex flex-row items-center gap-2 rounded-lg"
        onPress={handleToggle}>
        <Text className={cn('font-interMedium text-base dark:text-white')}>{placeholder}</Text>
        <Ionicons name="chevron-down" size={20} className="!text-black dark:!text-white" />
      </TouchableOpacity>

      <Modal
        supportedOrientations={[
          'portrait',
          'portrait-upside-down',
          'landscape',
          'landscape-left',
          'landscape-right',
        ]}
        visible={isVisible}
        transparent
        animationType="none"
        onRequestClose={handleToggle}>
        <TouchableWithoutFeedback onPress={handleToggle}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        {buttonLayout && (
          <Animated.View
            style={[
              styles.modalContainer,
              dropdownPosition === 'top'
                ? { bottom: buttonLayout.y + buttonLayout.height }
                : { top: buttonLayout.y + buttonLayout.height },
              animatedDropdownStyle,
            ]}
            className={cn('rounded-lg !bg-white dark:!bg-drawer')}>
            <Animated.FlatList
              data={options}
              keyExtractor={(item, index) => `{item?.uuid}-${index}`}
              renderItem={({ item }) => (
                <TouchableOpacity className="w-full py-3" onPress={() => onPress(item)}>
                  <View className="w-full">
                    <ThemedCheckbox
                      disabled={item?.status !== 'active'}
                      className="w-full"
                      label={item.accountName}
                      value={
                        item?.accountName === 'All Accounts'
                          ? item?.uuid?.split(',')?.length === accountList.activeAccountIds?.length
                          : accountList.activeAccountIds?.includes(item?.uuid)
                      }
                      onValueChange={() => {
                        onPress(item);
                      }}
                    />
                    {item?.accountName === 'All Accounts' && <Line />}
                  </View>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              onScroll={(event) => {
                scrollY.value = event.nativeEvent.contentOffset.y;
              }}
              scrollEventThrottle={16}
              style={animatedScrollStyle}
            />
            {options?.length > 6 ? (
              <View className="flex flex-row items-center justify-center ">
                <Ionicons name="chevron-down" size={20} className="!text-black dark:!text-white" />
              </View>
            ) : (
              <></>
            )}
            <View className="mb-3 flex w-full flex-row justify-end">
              <TouchableOpacity
                onPress={async () => {
                  await setStorageItemAsync('activeAccount', JSON.stringify(accountList));
                  setActiveAccount(accountList);
                  handleToggle();
                  // if account is selected then redirect to portfolio else, no need to redirect
                  if (
                    activeAccount?.activeAccountIds?.length !==
                    accountList?.activeAccountIds?.length
                  ) {
                    router.push(routes.drawer.tabs.home as Href);
                  }
                }}
                className="rounded-md bg-primary px-5 py-2">
                <Text className="text-center font-poppinsMedium text-sm text-white">Apply</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
      </Modal>
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 'auto',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position: 'absolute',
    left: '0%',
    right: '0%',
    backgroundColor: 'transparent',
    borderRadius: 0,
    paddingHorizontal: 20,
    overflow: 'hidden',
    marginTop: 25,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  scrollContent: {
    paddingVertical: 10,
  },

  optionText: {
    fontSize: 16,
  },
});
