import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, TouchableOpacity } from 'react-native';
import Modal, { ModalProps } from 'react-native-modal';
import { useRouter } from 'expo-router'; // Assuming you are using Expo Router
import { height, width } from '~/constants/Colors';
import { DefaultText as Text } from '~/components/common/DefaultText';

export const theme = {
  colors: {
    white: '#ffffff',
    black: '#000',
  },
  buttons: {
    smallWidth: 80,
    standardWidth: 100,
    smallHeight: 30,
    standardHeight: 40,
  },
  iconSizes: {
    bottomTab: 26,
  },
  fontSizes: {
    bottomTab: 12,
    standard: 16,
  },
};

interface Props {
  hideModal: () => void;
  hideCloseButton?: boolean;
  style?: StyleProp<ViewStyle>;
}

const ModalComponent = ({
  hideModal,
  hideCloseButton,
  style,
  children,
  ...props
}: Props & Partial<ModalProps>) => {
  const router = useRouter();

  return (
    <Modal {...props}>
      <View style={[styles.modal, style]}>
        <TouchableOpacity
          onPress={() => {
            hideModal(); // Assuming you want to close the modal on this action
            router.setParams({ route: 'days' });
          }}>
          <Text style={styles.text}>Place your filter here</Text>
        </TouchableOpacity>
        {children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    padding: 10, // Add some padding for better visual spacing
    flex: 1,
  },
  text: {
    fontSize: theme.fontSizes.standard,
    color: theme.colors.black, // Assuming you want black text on white background
  },
});

export default ModalComponent;
