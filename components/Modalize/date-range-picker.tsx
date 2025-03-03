import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { DefaultText as Text } from '~/components/common/DefaultText';

const DateRangePicker = () => {
  const [selectedDateRange, setSelectedDateRange] = useState('2024-12-27 ~ 2024-12-27');
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateRangeSelect = (range) => {
    setSelectedDateRange(range);
    setShowCalendar(false);
  };

  const handleDayPress = (day) => {
    const dateString = day.dateString;
    setSelectedDateRange(`${dateString} ~ ${dateString}`);
    setShowCalendar(false);
  };

  const handlePresetSelect = (preset) => {
    let startDate = new Date();
    let endDate = new Date();

    switch (preset) {
      case 'Today':
        break;
      case 'This Week':
        startDate.setDate(startDate.getDate() - startDate.getDay()); // Start of the week (Sunday)
        endDate.setDate(startDate.getDate() + 6); // End of the week (Saturday)
        break;
      case 'This Month':
        startDate.setDate(1); // First day of the month
        endDate.setMonth(endDate.getMonth() + 1, 0); // Last day of the month
        break;
      case 'Last 30 days':
        startDate.setDate(startDate.getDate() - 30);
        break;
      case 'Last Month':
        startDate.setMonth(startDate.getMonth() - 1, 1);
        endDate.setMonth(endDate.getMonth() + 1, 0);
        break;
      case 'This Quarter':
        const currentQuarter = Math.floor(startDate.getMonth() / 3);
        startDate.setMonth(currentQuarter * 3, 1);
        endDate.setMonth((currentQuarter + 1) * 3, 0);
        break;
      case 'YTD (Year to date)':
        startDate.setMonth(0, 1);
        break;
    }

    const format = (date) => date.toISOString().split('T')[0];
    setSelectedDateRange(`${format(startDate)} ~ ${format(endDate)}`);
    setShowCalendar(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.openButton} onPress={() => setShowCalendar(true)}>
        <Text style={styles.openButtonText}>Choose Date range</Text>
      </TouchableOpacity>

      {showCalendar && (
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowCalendar(false)}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>

            <View style={styles.presetOptions}>
              <TouchableOpacity
                style={styles.presetButton}
                onPress={() => handlePresetSelect('Today')}>
                <Text style={styles.presetButtonText}>Today</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.presetButton}
                onPress={() => handlePresetSelect('This Week')}>
                <Text style={styles.presetButtonText}>This Week</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.presetButton}
                onPress={() => handlePresetSelect('This Month')}>
                <Text style={styles.presetButtonText}>This Month</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.presetButton}
                onPress={() => handlePresetSelect('Last 30 days')}>
                <Text style={styles.presetButtonText}>Last 30 days</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.presetButton}
                onPress={() => handlePresetSelect('Last Month')}>
                <Text style={styles.presetButtonText}>Last Month</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.presetButton}
                onPress={() => handlePresetSelect('This Quarter')}>
                <Text style={styles.presetButtonText}>This Quarter</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.presetButton}
                onPress={() => handlePresetSelect('YTD (Year to date)')}>
                <Text style={styles.presetButtonText}>YTD (Year to date)</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.calendarContainer}>
              <Text style={styles.calendarHeader}>{selectedDateRange}</Text>
              <Calendar
                onDayPress={handleDayPress}
                markedDates={{
                  [selectedDateRange.split(' ~ ')[0]]: {
                    selected: true,
                    marked: true,
                    selectedColor: '#2979FF',
                  },
                }}
                current={'2024-12-27'}
                theme={{
                  backgroundColor: '#212121',
                  calendarBackground: '#212121',
                  textSectionTitleColor: '#b6c1cd',
                  selectedDayBackgroundColor: '#2979FF',
                  selectedDayTextColor: '#ffffff',
                  todayTextColor: '#2979FF',
                  dayTextColor: '#d9e1e8',
                  textDisabledColor: '#757575',
                  arrowColor: '#2979FF',
                }}
              />

              <View style={styles.bottomButtons}>
                <TouchableOpacity
                  style={styles.resetButton}
                  onPress={() => handlePresetSelect('2024-12-27 ~ 2024-12-27')}>
                  <Text style={styles.resetButtonText}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.okButton} onPress={() => setShowCalendar(false)}>
                  <Text style={styles.okButtonText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Dark background
  },
  openButton: {
    backgroundColor: '#2979FF',
    padding: 10,
    borderRadius: 5,
  },
  openButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#212121',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  presetOptions: {
    marginBottom: 20,
  },
  presetButton: {
    backgroundColor: '#303030',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  presetButtonText: {
    color: '#fff',
  },
  calendarContainer: {
    marginBottom: 20,
  },
  calendarHeader: {
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  resetButton: {
    backgroundColor: '#303030',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  resetButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  okButton: {
    backgroundColor: '#2979FF',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  okButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default DateRangePicker;
