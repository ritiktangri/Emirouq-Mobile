import React, { useRef } from 'react';
import { useColorScheme, View } from 'react-native';
import { DefaultText as Text } from '~/components/common/DefaultText';
import RNPickerSelect from 'react-native-picker-select';
import { useTheme } from '~/context/ThemeContext';

const SelectPicker = ({
  data,
  setData,
  placeholder,
  title,
  value,
  isEdit,
  iosInputStyle,
  onSelect,
}: any) => {
  const { colorScheme }: any = useTheme();
  const pickerRef: any = useRef(null);

  return (
    <View>
      {title && (
        <Text className="mb-1.5 font-interMedium text-base text-black dark:text-white">
          {title}
        </Text>
      )}
      <View className="rounded-lg">
        <RNPickerSelect
          onValueChange={(value: any) => {
            setData(value);
            onSelect && onSelect(value);
          }}
          ref={pickerRef}
          value={value}
          items={data}
          disabled={isEdit}
          fixAndroidTouchableBug
          placeholder={{ label: placeholder, color: '#3872F9' }}
          darkTheme={colorScheme === 'dark' ? true : false}
          style={{
            inputIOS: {
              borderRadius: 10,
              marginTop: 0,
              paddingVertical: 11,
              paddingHorizontal: 4,
              paddingLeft: 12,
              fontWeight: '400',
              color: colorScheme === 'dark' ? 'white' : 'black',
              ...iosInputStyle,
            },
            inputAndroid: {
              borderRadius: 10,
              color: colorScheme === 'dark' ? 'white' : 'black',
              ...iosInputStyle,
            },
          }}
          textInputProps={{
            onPress: () => pickerRef.current?.togglePicker(),
          }}
        />
      </View>
    </View>
  );
};

export default SelectPicker;
