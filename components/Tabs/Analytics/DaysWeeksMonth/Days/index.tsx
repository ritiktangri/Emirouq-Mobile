/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React from 'react';
import { FlatList } from 'react-native';

import DistributionChart from './DistributionChart';
import PerformanceByDay from './PerformanceByDay';
import Table from '../../Table';

import { useReport } from '~/context/ReportContext';
import Loading from '../../Loading';

const Days = () => {
  const { loadingScreens, chartReport }: any = useReport();

  const components = [
    <DistributionChart chartId="day_distribution" />,
    <PerformanceByDay chartId="day_performance" />,
    <Table type="day" label="Day" data={chartReport?.days} />,
  ];
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={loadingScreens === 'days' ? [<Loading id="chart" />] : components}
      contentContainerClassName="mx-4  gap-y-4 mt-2"
      renderItem={({ item }) => item}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default Days;
