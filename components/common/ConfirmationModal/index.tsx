import * as React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';

import { DefaultText as Text } from '../DefaultText';
import theme from '~/utils/theme';
const ConfirmationModal = ({
  icon,
  visible,
  onCancel,
  onConfirm,
  description,
  title,
  loading,
}: any) => {
  return (
    <>
      {icon}
      <Portal>
        <Dialog visible={visible} onDismiss={onCancel} style={styles.dialog}>
          <Text light="text-black" dark="text-black" className="font-poppinsMedium text-xl">
            {title}
          </Text>
          <Text light="text-black" dark="text-black" className="font-poppinsMedium ">
            {description}
          </Text>
          <View className="mt- my-4 flex-row justify-end gap-3">
            <TouchableOpacity
              onPress={onCancel}
              className=" rounded-md border border-primary px-3 py-2">
              <Text light="text-black" dark="text-black" className=" font-poppinsMedium">
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onConfirm}
              className="flex-row items-center gap-2 rounded-md border border-primary bg-primary px-3 py-2 ">
              {loading ? <ActivityIndicator color={theme.colors.white} /> : null}

              <Text className="font-poppinsMedium text-white dark:text-white">Confirm</Text>
            </TouchableOpacity>
          </View>
        </Dialog>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  dialog: {
    borderRadius: 8,
    backgroundColor: 'white', // Match background of the modal
    paddingHorizontal: 16,
  },
});

export default ConfirmationModal;
