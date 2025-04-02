import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTheme } from '~/context/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Text } from '~/components/common/Text';

const CustomDatePicker = ({ mode, date, setDate, title, className }: any) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        marginTop: 20,
        width: '45%',
      }}>
      <Text className="mb-1.5 ml-0.5 font-interMedium text-base" style={{ color: colors.text }}>
        {title}
      </Text>
      <DateTimePicker
        mode={mode}
        themeVariant="dark"
        style={{
          position: 'relative',
          right: 10,
        }}
        value={date}
        onChange={(event, selectedDate) => {
          if (selectedDate) {
            setDate(selectedDate);
          }
        }}
      />
    </View>
  );
};

export default CustomDatePicker;
