import { StyleSheet } from 'react-native';
import React from 'react';
import { Menu, MenuOptions, MenuTrigger, MenuOption } from 'react-native-popup-menu';
import { View } from '../View';
import { Text } from '../Text';

const Divider = () => <View style={styles.divider} />;
const CustomMenu = ({ icon, data, customStyles = { optionsContainer: {}, optionsWrapper: {} } }: any) => {
  return (
    <Menu>
      <MenuTrigger
        customStyles={{
          triggerWrapper: {},
        }}>
        {icon}
      </MenuTrigger>
      <MenuOptions customStyles={customStyles}>
        {data &&
          data.map((item: any, index: number) => (
            <View key={index}>
              <MenuOption
                key={index}
                onSelect={item.onPress}
                customStyles={{
                  optionWrapper: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 6,
                  },
                }}>
                <Text className="font-regular text-sm">{item?.label}</Text>
                {item.icon}
              </MenuOption>
              <Divider />
            </View>
          ))}
      </MenuOptions>
    </Menu>
  );
};

export default CustomMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginVertical: 100,
    marginHorizontal: 100,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#7F8487',
  },
});
