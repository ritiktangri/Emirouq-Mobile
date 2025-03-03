/* eslint-disable import/order */
import { round } from 'lodash';
import React from 'react';
import { View } from 'react-native';
import { DefaultText as Text } from '~/components/common/DefaultText';
import { useReport } from '~/context/ReportContext';
import AnimatedAccordion from '../Animated';

const SetUpTags = () => {
  const { tagsReport }: any = useReport();
  const data = [
    {
      id: 1,
      key: 'Most win%',
      value: (
        <>
          {tagsReport?.setups?.mostWinRate?.tagName ? (
            <>
              {tagsReport?.setups?.mostWinRate?.tagName}(
              {round(tagsReport?.setups?.mostWinRate?.value || 0, 2)})
            </>
          ) : (
            '--'
          )}
        </>
      ),
    },
    {
      id: 2,
      key: 'Least win%',
      value: (
        <>
          {tagsReport?.setups?.leastWinRate?.tagName ? (
            <>
              {tagsReport?.setups?.leastWinRate?.tagName}(
              {round(tagsReport?.setups?.leastWinRate?.value || 0, 2)})
            </>
          ) : (
            '--'
          )}
        </>
      ),
    },
    {
      id: 3,
      key: 'Best profit/loss ratio',
      value: (
        <>
          {tagsReport?.setups?.bestProfitFactor?.tagName ? (
            <>
              {tagsReport?.setups?.bestProfitFactor?.tagName}(
              {round(tagsReport?.setups?.bestProfitFactor?.value || 0, 2)})
            </>
          ) : (
            '--'
          )}
        </>
      ),
    },
    {
      id: 4,
      key: 'Least profit/loss ratio',
      value: (
        <>
          {tagsReport?.setups?.leastProfitFactor?.tagName ? (
            <>
              {tagsReport?.setups?.leastProfitFactor?.tagName}(
              {round(tagsReport?.setups?.leastProfitFactor)})
            </>
          ) : (
            '--'
          )}
        </>
      ),
    },
    {
      id: 5,
      key: 'Most traded',
      value: (
        <>
          {tagsReport?.setups?.mostTraded?.tagName ? (
            <>
              {tagsReport?.setups?.mostTraded?.tagName}({tagsReport?.setups?.mostTraded?.value || 0}
              )
            </>
          ) : (
            '--'
          )}
        </>
      ),
    },
    {
      id: 6,
      key: 'Least traded',
      value: (
        <>
          {tagsReport?.setups?.leastTraded?.tagName ? (
            <>
              {tagsReport?.setups?.leastTraded?.tagName}(
              {tagsReport?.setups?.leastTraded?.value || 0})
            </>
          ) : (
            '--'
          )}
        </>
      ),
    },
  ];

  return (
    <View className=" flex-1 rounded-lg border-gray-700 p-4 dark:border-2 dark:bg-dashboard_card">
      {data?.map((item, index) => (
        <AnimatedAccordion key={item.id} item={item} index={index} total={data?.length} />
      ))}
    </View>
  );
};

export default SetUpTags;
