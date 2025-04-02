import { StyleSheet, TouchableWithoutFeedback, useColorScheme, View } from 'react-native';
import React from 'react';
// import SelectDropdown from 'react-native-select-dropdown';
import { useTheme } from '~/context/ThemeContext';
import { Entypo } from '@expo/vector-icons';

import { Text } from '~/components/common/Text';

const Select = ({
  data,
  renderButton,
  renderItem,
  suffix,
  description,
  placeholder,
  containerStyle,
  title,
  prefix,
  inputStyle,
  transparent,
  type,
  customTitle,
  onSelect,
  value,
}: any) => {
  const { colors } = useTheme();
  const colorScheme = useColorScheme();
  return (
    <View style={containerStyle} className="mt-3">
      {title && !customTitle && (
        <Text className="mb-1.5 ml-0.5 font-interMedium text-base text-black dark:text-white">
          {title}
        </Text>
      )}
      {customTitle ? customTitle : null}
      <TouchableWithoutFeedback>
        <View
          className={`flex-row items-center justify-between rounded-lg border border-gray-400 px-4 ${!transparent && 'bg-gray-900'}`} // Tailwind classes for styling
          style={inputStyle}>
          <View className="flex-row items-center">
            {prefix && <View>{prefix}</View>}
            {/* <SelectDropdown
              data={data}
              onSelect={onSelect}
              searchPlaceHolder={placeholder}
              renderButton={(selectedItem, isOpened) => {
                return (
                  <View style={{ ...styles.dropdownButtonStyle, width: prefix ? '95%' : '100%' }}>
                    {renderButton ? (
                      renderButton(selectedItem, isOpened)
                    ) : (
                      <Text
                        style={{
                          ...styles.dropdownButtonTxtStyle,
                          color: selectedItem?.label ? 'white' : colors.placeholder,
                        }}>
                        {(selectedItem && selectedItem.label) || 'Select'}
                      </Text>
                    )}
                    <Entypo
                      name={isOpened ? 'chevron-up' : 'chevron-down'}
                      size={24}
                      color="white"
                      style={styles.dropdownButtonArrowStyle}
                    />
                  </View>
                );
              }}
              renderItem={(item, index, isSelected) => {
                return (
                  <View
                    style={{
                      ...styles.dropdownItemStyle,
                      ...(isSelected && {
                        backgroundColor: colorScheme === 'dark' ? '#808080' : 'lightgrey',
                      }),
                    }}>
                    {renderItem(item, index, isSelected)}
                  </View>
                );
              }}
              dropdownStyle={{
                backgroundColor: colorScheme === 'dark' ? '#282E36' : 'white',
                borderRadius: 4,
              }}
              showsVerticalScrollIndicator={false}
              defaultValue={value}
            /> */}
          </View>
          <View className="absolute right-0">{suffix}</View>
        </View>
      </TouchableWithoutFeedback>
      {description && <Text className="mt-1 text-xs text-tertiary">{description}</Text>}
    </View>
  );
};

export default Select;
const styles = StyleSheet.create({
  dropdownButtonStyle: {
    paddingVertical: 8,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 2,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  dropdownButtonArrowStyle: {
    fontSize: 22,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#282E36',
    borderRadius: 4,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
});
