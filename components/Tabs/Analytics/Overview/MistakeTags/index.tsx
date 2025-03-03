/* eslint-disable import/order */
import React from 'react';
import { View } from 'react-native';
import { useReport } from '~/context/ReportContext';
import { toCurrency } from '~/utils/helper.utils';
import AnimatedAccordion from '../Animated';

const MistakeTags = () => {
  const { tagsReport }: any = useReport();

  const data = [
    {
      id: 1,
      key: 'Most frequent',
      value: (
        <>
          {tagsReport?.mistakes?.mostFrequent?.tagName ? (
            <>
              {tagsReport?.mistakes?.mostFrequent?.tagName}(
              {tagsReport?.mistakes?.mostFrequent?.value})
            </>
          ) : (
            '--'
          )}
        </>
      ),
    },
    {
      id: 2,
      key: 'Least frequent',
      value: (
        <>
          {tagsReport?.mistakes?.leastFrequent?.tagName ? (
            <>
              {tagsReport?.mistakes?.leastFrequent?.tagName}(
              {tagsReport?.mistakes?.leastFrequent?.value})
            </>
          ) : (
            '--'
          )}
        </>
      ),
    },
    {
      id: 3,
      key: 'Most loss caused',
      value: (
        <>
          {tagsReport?.mistakes?.mostLossCaused?.tagName ? (
            <>
              {tagsReport?.mistakes?.mostLossCaused?.tagName}(
              {toCurrency(tagsReport?.mistakes?.mostLossCaused?.value)})
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

export default MistakeTags;
