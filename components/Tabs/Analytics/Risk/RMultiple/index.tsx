/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React from 'react';
import { FlatList } from 'react-native';

import DistributionChart from './DistributionChart';
import PerformanceByDay from './PerformanceByDay';
import Table from '../../Table';

import { useReport } from '~/context/ReportContext';
import Loading from '../../Loading';

const RMultiple = () => {
  const { loadingScreens, chartReport }: any = useReport();

  const components = [
    <DistributionChart chartId="rMultiple_distribution" />,
    <PerformanceByDay chartId="rMultiple_performance" />,
    <Table type="range" label="Range" data={chartReport?.rMultiple} />,
  ];
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={loadingScreens === 'rMultiple' ? [<Loading id="chart" />] : components}
      contentContainerClassName="mx-4  gap-y-4 mt-2"
      renderItem={({ item }) => item}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default RMultiple;
