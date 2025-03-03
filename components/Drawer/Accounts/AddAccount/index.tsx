/* eslint-disable no-unused-expressions */
/* eslint-disable import/order */
import React, { useCallback, useState } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Keyboard,
  Platform,
} from 'react-native';
import { DefaultText as Text } from '~/components/common/DefaultText';
import DefaultTextInput from '~/components/common/DefaultTextInput';
import theme from '~/utils/theme';
import { SelectPnl as SelectAccount } from '~/components/common/SelectPnl';
import { useAuth } from '~/context/AuthContext';
import SelectPicker from '~/components/UI/SelectPicker';
import { useTheme } from '~/context/ThemeContext';

const renderValue: any = {
  default: 'Select Calculation Method',
  fifo: 'FIFO',
  wa: 'Weighted Average',
  'weighted-average': 'Weighted Average',
};

const AddAccount = ({ open, setOpen }: any) => {
  const { updateAccount, addAccount } = useAuth();
  const [loading, setLoading] = useState(false);
  const { isDarkTheme } = useTheme();
  const cb = useCallback(() => {
    setLoading(false);
    setOpen({
      open: false,
    });
  }, []);

  const errCb = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <Modal
      supportedOrientations={[
        'portrait',
        'portrait-upside-down',
        'landscape',
        'landscape-left',
        'landscape-right',
      ]}
      animationType="fade" // Changed to fade
      transparent
      visible={open?.open}
      onDismiss={() => {
        setTimeout(() => {
          setOpen({ open: false });
        }, 5);
      }}
      onRequestClose={() => {
        setTimeout(() => {
          setOpen({ open: false });
        }, 5);
      }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          className="flex-1 items-center justify-center px-4"
          style={{
            backgroundColor: 'rgba(0,0,0,0.8)',
            elevation: 5,
            zIndex: 10,
            transform: [{ translateY: 0 }],
          }} // Added background color, elevation, zIndex, and translateZ
        >
          <View className="w-full gap-y-5 rounded-xl bg-white p-5 dark:bg-analytics_card">
            <Text className="my-4 text-xl font-semibold dark:text-white">
              {open?.uuid ? 'Update Account' : 'Add Account'}
            </Text>
            <DefaultTextInput
              title="Account Name"
              value={open?.accountName}
              onChangeText={(text: any) => setOpen({ ...open, accountName: text })}
              className="w-full rounded-lg border-[1px] border-gray-400 p-4 dark:border-2 dark:border-gray-600 dark:bg-dashboard_card dark:text-white"
              placeholder="Enter Account Name"
              placeholderTextColor={theme.colors.dashboard_card_text}
            />

            <View className="gap-y-2">
              {Platform.OS === 'ios' ? (
                <SelectPicker
                  data={[
                    { label: 'FIFO', value: 'fifo' },
                    { label: 'Weighted Average', value: 'wa' },
                  ]}
                  title="Calculation Method"
                  setData={async (value: any) => {
                    setOpen({
                      ...open,
                      calculationMethod: value,
                    });
                  }}
                  placeholder="Select"
                  iosInputStyle={{
                    borderWidth: isDarkTheme ? 2 : 1,
                    borderColor: isDarkTheme ? '#4b5563' : '#9ca3af',
                    backgroundColor: isDarkTheme ? '#131B24' : 'transparent',
                    paddingVertical: 13,
                  }}
                />
              ) : (
                <>
                  <Text className="text-base font-semibold dark:text-white">
                    Calculation Method
                  </Text>
                  <SelectAccount
                    options={{
                      data: [
                        { label: 'FIFO', value: 'fifo' },
                        { label: 'Weighted Average', value: 'wa' },
                      ],
                    }}
                    selected={open?.calculationMethod}
                    value={renderValue[open?.calculationMethod || 'default']}
                    setSelected={async (value: any) => {
                      setOpen({
                        ...open,
                        calculationMethod: value,
                      });
                    }}
                    overlay={false}
                    width="w-full"
                    buttonClassName="bg-white dark:bg-dashboard_card"
                    className="w-full rounded-lg border-[1px] border-gray-400  bg-dashboard_card dark:border-2 dark:border-gray-600 dark:text-white"
                  />
                </>
              )}
            </View>
            <View className="mb-4 flex-row gap-3">
              <TouchableOpacity
                className="flex-1 rounded-lg bg-[#3e454d] p-3"
                onPress={() =>
                  setOpen({
                    open: false,
                  })
                }>
                <Text className="text-center font-semibold text-white dark:text-[#CECFD2]">
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 rounded-lg bg-primary p-3"
                onPress={() => {
                  const body = {
                    accountName: open?.accountName,
                    calculationMethod: open?.calculationMethod,
                    uuid: open?.uuid || '',
                  };
                  setLoading(true);
                  open?.uuid ? updateAccount(body, cb, errCb) : addAccount(body, cb, errCb);
                }}>
                {loading ? (
                  <ActivityIndicator color={theme.colors.white} />
                ) : (
                  <Text className="text-center font-semibold text-white">
                    {open?.uuid ? 'Update' : 'Add'} Account
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {/*</KeyboardAvoidingView>*/}
    </Modal>
  );
};

export default AddAccount;
