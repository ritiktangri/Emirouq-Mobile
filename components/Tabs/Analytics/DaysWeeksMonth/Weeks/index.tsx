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
    <DistributionChart chartId="weeks_distribution" />,
    <PerformanceByDay chartId="weeks_performance" />,
    <Table type="week" label="Week" data={chartReport?.weeks} />,
  ];
  return (
    <FlatList
      data={loadingScreens === 'weeks' ? [<Loading id="chart" />] : components}
      contentContainerClassName="mx-4  gap-y-4 mt-2"
      renderItem={({ item }) => item}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default Days;
