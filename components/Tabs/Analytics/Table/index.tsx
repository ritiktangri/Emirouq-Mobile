import React, { useMemo } from 'react';
import { StyleSheet, ScrollView, useColorScheme } from 'react-native';
import { DataTable } from 'react-native-paper';

import getColumns from './columns';

const Table = ({ type, label, data }: any) => {
  const colorScheme = useColorScheme();
  const columns = useMemo(
    () =>
      getColumns({
        type,
        label,
      }),
    [type, label]
  );
  const styles = useMemo(() => {
    return StyleSheet.create({
      cell: {
        fontSize: 10,
        color: colorScheme === 'dark' ? 'white' : '#686868',
      },
    });
  }, [colorScheme]);

  return (
    <ScrollView
      horizontal
      contentContainerClassName="mb-4"
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="always">
      <DataTable className="rounded-lg border-[0.4px]  border-gray-300 bg-white dark:border-none dark:bg-black">
        <DataTable.Header className="rounded-t-lg  dark:bg-dashboard_card">
          {columns.map((col, index) => (
            <DataTable.Title key={index} style={{ width: col.width }} textStyle={styles.cell}>
              {col.title}
            </DataTable.Title>
          ))}
        </DataTable.Header>

        {data?.map((trade: any, rowIndex: any) => (
          <DataTable.Row key={rowIndex}>
            {columns.map((col, colIndex) => (
              <DataTable.Cell key={colIndex} style={{ width: col.width }} textStyle={styles.cell}>
                {col.render(trade)}
              </DataTable.Cell>
            ))}
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  );
};

export default Table;
