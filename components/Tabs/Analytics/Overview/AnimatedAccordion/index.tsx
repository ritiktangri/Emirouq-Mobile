/* eslint-disable import/order */
import { Accordion } from '@animatereactnative/accordion';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { DefaultText as Text } from '~/components/common/DefaultText';

import {
  AnalyticsBreakDownSVG,
  AnalyticsDistributionSVG,
  AnalyticsMistakeTagSVG,
  AnalyticsPerformanceSVG,
  AnalyticsSetupTagSVG,
  AnalyticsStreakSVG,
} from '~/svgs';
import {
  MemoizedActivityBreakDown,
  MemoizedMistakeTags,
  MemoizedPerformanceMetrics,
  MemoizedSetUpTags,
  MemoizedStreakMetrics,
  MemoizedTradeDistribution,
} from '../../export';
import React from 'react';

const data = [
  {
    id: 0,
    title: 'Trade Distribution',
    component: MemoizedTradeDistribution,
    icon: <AnalyticsDistributionSVG />,
  },
  {
    id: 1,
    title: 'Performance Metrics',
    component: MemoizedPerformanceMetrics,
    icon: <AnalyticsPerformanceSVG />,
  },
  {
    id: 2,
    title: 'Streak Metrics',
    component: MemoizedStreakMetrics,
    icon: <AnalyticsStreakSVG />,
  },
  {
    id: 3,
    title: 'Activity Breakdown',
    component: MemoizedActivityBreakDown,
    icon: <AnalyticsBreakDownSVG />,
  },
  {
    id: 4,
    title: 'Set Up Tags',
    component: MemoizedSetUpTags,
    icon: <AnalyticsSetupTagSVG />,
  },
  {
    id: 5,
    title: 'Mistake Tags',
    component: MemoizedMistakeTags,
    icon: <AnalyticsMistakeTagSVG />,
  },
];
export default function AnimatedAccordion() {
  return (
    <View className="mx-4 mb-3 gap-y-3">
      {data?.map((item) => <AccordionData item={item} key={item.id} type={item?.title} />)}
    </View>
  );
}

function AccordionData({ item }: any) {
  return (
    <Accordion.Accordion className="overflow-hidden rounded-lg bg-white dark:bg-analytics_card">
      <Accordion.Header>
        <View className="flex-row items-center p-4">
          <View className="flex-1 flex-row items-center gap-2">
            {item?.icon ? item?.icon : null}
            <Text className="flex-1 font-poppinsMedium dark:text-analytics_stats_heading_text">
              {item.title}
            </Text>
          </View>
          <Accordion.HeaderIcon>
            <Ionicons name="chevron-up" size={20} className="dark:!text-white" />
          </Accordion.HeaderIcon>
        </View>
      </Accordion.Header>

      {item?.id === 0 ? (
        <Accordion.Collapsed className={`rounded-lg  bg-white p-3 dark:bg-analytics_card`}>
          {React.createElement(item?.component)}
        </Accordion.Collapsed>
      ) : (
        <Accordion.Expanded className={`rounded-lg  bg-white p-3 dark:bg-analytics_card`}>
          {React.createElement(item?.component)}
        </Accordion.Expanded>
      )}
    </Accordion.Accordion>
  );
}
