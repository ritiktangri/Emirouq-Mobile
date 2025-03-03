/* eslint-disable prettier/prettier */
import React from 'react';
import { FlatList } from 'react-native';

import DistributionChart from './DistributionChart';
import PerformanceByDay from './PerformanceByDay';
import Loading from '../../Loading';
import Table from '../../Table';

import { useReport } from '~/context/ReportContext';

const PositionSize = () => {
  const { loadingScreens, chartReport }: any = useReport();
  const components = [
    <DistributionChart chartId="positionSize_distribution" />,
    <PerformanceByDay chartId="positionSize_performance" />,
    <Table type="range" label="Range" data={chartReport?.positionSize} />,
  ];
  return (
    <FlatList
      data={loadingScreens === 'positionSize' ? [<Loading id="chart" />] : components}
      contentContainerClassName="mx-4  gap-y-4 mt-2"
      renderItem={({ item }) => item}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default PositionSize;
