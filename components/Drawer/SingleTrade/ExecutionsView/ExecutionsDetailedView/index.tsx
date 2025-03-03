import {
  View,
  Switch,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import React, { useMemo } from 'react';
import { DataTable } from 'react-native-paper';
import dayjs from 'dayjs';
import { DefaultText as Text } from '~/components/common/DefaultText';

const ExecutionsDetailedView = ({ data }: any) => {
  const { width } = Dimensions.get('screen');
  const colorScheme = useColorScheme();

  const styles = useMemo(() => {
    return StyleSheet.create({
      cell: {
        color: colorScheme === 'dark' ? 'white' : '#686868',
      },
    });
  }, [colorScheme]);
  return (
    <View className="mx-4">
      <View className="flex-row items-center justify-between">
        <Text className="font-interMedium text-lg dark:text-tertiary">Mark as Break Even</Text>
        <Switch value={false} />
      </View>
      <ScrollView
        horizontal
        className="mb-2 mt-4"
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        <DataTable className="rounded-lg border-[0.4px] border-gray-400">
          <DataTable.Header className="rounded-t-lg bg-[#F1F1F1]  dark:bg-[#4f6073]">
            <DataTable.Title
              style={{
                width: width * 0.25,
              }}
              textStyle={styles.cell}>
              Date/Time
            </DataTable.Title>
            <DataTable.Title
              style={{
                width: width * 0.25,
              }}
              textStyle={styles.cell}>
              Quantity
            </DataTable.Title>
            <DataTable.Title
              style={{
                width: width * 0.25,
              }}
              textStyle={styles.cell}>
              Price
            </DataTable.Title>
            <DataTable.Title
              style={{
                width: width * 0.25,
              }}
              textStyle={styles.cell}>
              Side
            </DataTable.Title>
            <DataTable.Title
              style={{
                width: width * 0.25,
              }}
              textStyle={styles.cell}>
              Comm $
            </DataTable.Title>
            <DataTable.Title
              style={{
                width: width * 0.3,
              }}
              textStyle={styles.cell}>
              Open Position
            </DataTable.Title>
            <DataTable.Title
              style={{
                width: width * 0.3,
              }}
              textStyle={styles.cell}>
              Adjusted Cost
            </DataTable.Title>
          </DataTable.Header>

          {data?.executions?.map((item: any, index: any) => (
            <DataTable.Row key={index} className="dark:bg-[#1B2531]">
              <DataTable.Cell
                style={{
                  width: width * 0.25,
                }}
                textStyle={styles.cell}>
                <View>
                  <Text className="text-sm dark:text-white">
                    {dayjs(item?.date)?.format('YYYY-MM-DD')}
                  </Text>
                  <Text className="text-sm text-tertiary">
                    {dayjs(item?.date)?.format('hh:mm:ss')}
                  </Text>
                </View>
              </DataTable.Cell>
              <DataTable.Cell
                style={{
                  width: width * 0.25,
                }}
                textStyle={styles.cell}>
                {item.quantity}
              </DataTable.Cell>
              <DataTable.Cell
                style={{
                  width: width * 0.25,
                }}
                textStyle={styles.cell}>
                {item.price}
              </DataTable.Cell>
              <DataTable.Cell
                style={{
                  width: width * 0.25,
                }}
                textStyle={styles.cell}>
                <View className="flex-row items-center gap-1">
                  <View
                    className={`${item?.side == 'buy' ? 'bg-green-500' : 'bg-red-500'} h-2 w-2 rounded-full`}
                  />
                  <Text className={`${item?.side == 'buy' ? 'text-green-500' : 'text-red-500'}`}>
                    {item.side?.toUpperCase()}
                  </Text>
                </View>
              </DataTable.Cell>
              <DataTable.Cell
                style={{
                  width: width * 0.25,
                }}
                textStyle={styles.cell}>
                {item.commission}
              </DataTable.Cell>
              <DataTable.Cell
                style={{
                  width: width * 0.3,
                }}
                textStyle={styles.cell}>
                {item.currentPosition}
              </DataTable.Cell>
              <DataTable.Cell
                style={{
                  width: width * 0.3,
                }}
                textStyle={styles.cell}>
                {item[item.calculationMethod].adjusted}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
      <View className="mt-3 flex-row justify-end">
        <TouchableOpacity className="rounded-lg bg-[#1F242F] px-4 py-3 text-center">
          <Text className="font-interMedium text-white dark:text-tertiary">Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExecutionsDetailedView;
