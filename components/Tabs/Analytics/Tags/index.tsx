/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React from 'react';
import { FlatList } from 'react-native';

import DistributionChart from './DistributionChart';
import PerformanceByDay from './PerformanceByDay';

import { useReport } from '~/context/ReportContext';
import Table from '../Table';
import Loading from '../Loading';
import { useGlobalSearchParams } from 'expo-router';
const Days = () => {
  const { loadingScreens, chartReport }: any = useReport();

  const state: any = useGlobalSearchParams();
  const components = [
    <DistributionChart chartId={state?.route} />,
    <PerformanceByDay chartId={state?.route} />,
    <Table type="tagName" label="Tag" data={chartReport?.[state?.route]} />,
  ];
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={loadingScreens === 'tags' ? [<Loading id="chart" />] : components}
      contentContainerClassName="mx-4  gap-y-4 mt-2"
      renderItem={({ item }) => item}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default Days;
