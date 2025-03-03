/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React from 'react';
import { FlatList } from 'react-native';

import DistributionChart from './DistributionChart';
import PerformanceByDay from './PerformanceByDay';

import { useReport } from '~/context/ReportContext';
import Table from '../Table';
import Loading from '../Loading';

const DaysTillExpiration = () => {
  const { loadingScreens, chartReport }: any = useReport();

  const components = [
    <DistributionChart chartId="options_distribution" />,
    <PerformanceByDay chartId="options_performance" />,
    <Table type="range" label="Range" data={chartReport?.daysTillExpiration} />,
  ];
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={loadingScreens === 'daysTillExpiration' ? [<Loading id="chart" />] : components}
      contentContainerClassName="mx-4  gap-y-4 mt-2"
      renderItem={({ item }) => item}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default DaysTillExpiration;
