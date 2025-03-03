/* eslint-disable prettier/prettier */
import React from 'react';
import { FlatList } from 'react-native';

import MostTradedSymbol from './MostTradedSymbol';
import HighestPerformingSymbol from './HighestPerformingSymbol';
import LeastPerformingSymbol from './LeastPerformingSymbol';
import Table from '../../Table';

import { useReport } from '~/context/ReportContext';
import Loading from '../../Loading';

const Instrument = () => {
  const { loadingScreens, chartReport }: any = useReport();
  const components = [
    <MostTradedSymbol chartId="most_trades_symbol" />,
    <HighestPerformingSymbol chartId="highest_performance_symbol" />,
    <LeastPerformingSymbol chartId="least_performance_symbol" />,
    <Table type="symbolName" label="Symbol" data={chartReport?.instrument?.symbolPerformance} />,
  ];
  return (
    <FlatList
      data={loadingScreens === 'instrument' ? [<Loading id="chart" />] : components}
      contentContainerClassName="mx-4  gap-y-4 mt-2"
      renderItem={({ item }) => item}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default Instrument;
