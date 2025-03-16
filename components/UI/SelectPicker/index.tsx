import React, { useRef } from 'react';
import { View } from 'react-native';
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
            setData && setData(value);
            onSelect && onSelect(value);
          }}
          ref={pickerRef}
          value={value}
          items={data}
          disabled={isEdit}
          fixAndroidTouchableBug
          placeholder={{ label: placeholder, color: '#949494' }}
          darkTheme={colorScheme === 'dark' ? true : false}
          style={{
            inputIOS: {
              paddingLeft: 12,
              borderWidth: 1,
              borderColor: '#e5e7eb',
              backgroundColor: 'transparent',
              paddingVertical: 13,
              borderRadius: 8,
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
