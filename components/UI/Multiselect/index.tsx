import React, { useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTheme } from '~/context/ThemeContext';
import { Entypo } from '@expo/vector-icons';
import { Text } from '~/components/common/Text';

const MultiSelectComponent = ({
  selected,
  setSelected,
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
}: any) => {
  const { colors } = useTheme();
  const ref: any = useRef(null);
  // const openDropdown = () => {
  //   if (ref.current) {
  //     ref.current.open();
  //   }
  // };

  return (
    <View style={containerStyle} className="mt-3">
      {title && !customTitle && (
        <Text className="mb-1.5 ml-0.5 font-interMedium text-base" style={{ color: colors.text }}>
          {title}
        </Text>
      )}
      {customTitle ? customTitle : null}
      <TouchableWithoutFeedback>
        <View
          className={`flex-row items-center justify-between rounded-lg border border-gray-700 px-4 ${!transparent && 'bg-gray-900'}`} // Tailwind classes for styling
          style={inputStyle}>
          <View className="flex-row items-center">
            {prefix && <View>{prefix}</View>}
            <MultiSelect
              ref={ref}
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              renderSelectedItem={(selectedItem) => (
                <View className="m-1 flex-row items-center gap-2 rounded-lg border border-gray-200 bg-gray-300 p-1 dark:border-gray-700 dark:bg-[#0C111D]">
                  <Text className="text-sm dark:text-[#CECFD2] ">{selectedItem?.label}</Text>
                  <Entypo name="cross" size={16} className="dark:!text-[#CECFD2]" />
                </View>
              )}
              inputSearchStyle={styles.inputSearchStyle}
              containerStyle={{
                backgroundColor: 'black',
                borderWidth: 0.2,
                borderColor: 'gray',
                width: '80%',
              }}
              itemTextStyle={{
                color: 'white',
              }}
              renderItem={(item, selected) => (
                <View
                  style={{
                    backgroundColor: selected ? '#5A5A5A' : 'black',
                    padding: 10,
                  }}>
                  <Text
                    style={{
                      color: selected ? 'white' : 'white',
                    }}>
                    {item.label}
                  </Text>
                </View>
              )}
              data={data}
              labelField="label"
              valueField="value"
              placeholder="Select item"
              searchPlaceholder="Search..."
              value={selected}
              onChange={(item) => {
                setSelected(item);
              }}
              selectedStyle={styles.selectedStyle}
            />
          </View>
          <View className="absolute right-0">{suffix}</View>
        </View>
      </TouchableWithoutFeedback>
      {description && <Text className="mt-1 text-xs text-tertiary">{description}</Text>}
    </View>
  );
};

export default MultiSelectComponent;

const styles = StyleSheet.create({
  container: { padding: 16 },
  dropdown: {
    height: 38,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 12,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 2,
  },
  selectedStyle: {
    borderRadius: 4,
    padding: 4,
  },
});
