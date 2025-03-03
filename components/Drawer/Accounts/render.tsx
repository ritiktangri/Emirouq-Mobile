/* eslint-disable import/order */
import { View, TouchableOpacity, ActivityIndicator, Platform, ActionSheetIOS } from 'react-native';
import React, { useCallback, useState } from 'react';
import { FontAwesome6 } from '@expo/vector-icons';
import theme from '~/utils/theme';
import { DefaultText as Text } from '~/components/common/DefaultText';
import { cn } from '~/utils/helper.utils';
import ConfirmationModal from '~/components/common/ConfirmationModal';
import { useAuth } from '~/context/AuthContext';
import { deleteAccountService } from '~/utils/services/account';
import { DeleteSVG } from '~/svgs/drawer';
import { useTheme } from '~/context/ThemeContext';

const RenderItem = ({ item, onEdit }: any) => {
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const { isSubscriptionInActive, user, activeAccount, setUser, setActiveAccount } = useAuth();
  const showDialog = () => setVisible(true);
  const { isDarkTheme, colorScheme }: any = useTheme();
  const hideDialog = () => setVisible(false);
  const onConfirm = useCallback(() => {
    const isSubInActive = isSubscriptionInActive();

    if (isSubInActive) {
      return;
    }
    setLoading(true);
    deleteAccountService({
      pathParams: {
        id: item?.uuid,
      },
    })
      .then(() => {
        const allAccountsList = {
          ...user,
          accounts: user?.accounts?.filter((i: any) => i?.uuid !== item?.uuid),
        };
        setUser(allAccountsList);
        const updatedActiveAccount = {
          activeAccountIds: activeAccount?.activeAccountIds?.filter((i: any) => i !== item?.uuid),
          accounts: activeAccount?.accounts?.filter((i: any) => i?.uuid !== item?.uuid),
        };
        setActiveAccount(updatedActiveAccount);
        setLoading(false);
        hideDialog();
      })
      .catch(() => {
        setLoading(false);
      });
  }, [activeAccount, item, user]);

  const showIOSDialog = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Delete'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
        userInterfaceStyle: colorScheme,
        title: 'Delete Account',
        message: 'Are you sure you want to delete this account?',
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          onConfirm();
        }
      }
    );
  };
  return (
    <View className="flex-row items-center rounded-lg bg-gray-200 p-4 dark:bg-account_table_bg">
      <View className="flex-1">
        <Text className="font-poppinsMedium text-black dark:text-white">{item.accountName}</Text>
      </View>

      <View className="flex-1 items-center justify-center">
        <Text className="font-poppinsMedium text-black dark:text-white ">
          {item.calculationMethod === 'fifo' ? 'FIFO' : 'WA'}
        </Text>
      </View>

      <View className="flex-1 flex-row items-center justify-center space-x-2">
        <View
          className={cn(
            item.status === 'active' ? 'bg-green-500' : 'bg-red-500',
            'h-2 w-2 rounded-full '
          )}
        />
        <Text
          className={cn(
            item.status === 'active' ? 'text-green-500' : 'text-red-500',
            'font-poppinsMedium '
          )}>
          {item.status === 'active' ? 'Active' : 'Inactive'}
        </Text>
      </View>

      <View className="flex-2 flex-row items-end justify-end space-x-4">
        <TouchableOpacity
          onPress={() => {
            onEdit(item);
          }}
          className="p-1">
          <FontAwesome6
            name="edit"
            size={18}
            color={isDarkTheme ? theme.colors.dashboard_card_text : theme.colors.analytics_card}
          />
        </TouchableOpacity>

        <ConfirmationModal
          visible={visible}
          title="Delete Account?"
          description="Are you sure you want to delete this account?"
          onConfirm={onConfirm}
          onCancel={hideDialog}
          loading={loading}
          icon={
            <TouchableOpacity
              onPress={() => {
                Platform.OS === 'android' ? showDialog() : showIOSDialog();
              }}
              className="flex flex-row items-center gap-2 p-1">
              <DeleteSVG
                fill={isDarkTheme ? theme.colors.dashboard_card_text : theme.colors.analytics_card}
              />
            </TouchableOpacity>
          }
        />
      </View>
    </View>
  );
};

export default RenderItem;
