/* eslint-disable import/order */
import { Ionicons } from '@expo/vector-icons';
import React, { useCallback } from 'react';
import { View, TouchableOpacity, SectionList } from 'react-native';
import { DefaultText as Text } from '~/components/common/DefaultText';
import { sections } from './export';
import { AnalyticFilterSVG } from '~/svgs';
import theme from '~/utils/theme';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import { useReport } from '~/context/ReportContext';
import { TagSVG } from '~/svgs/drawer';
import { WinLossSVG } from '~/svgs/analytics';

const FilterDrawer = (props: any) => {
  const { navigation } = props;
  const router = useRouter();
  const state = useGlobalSearchParams();
  const route = state.route || 'overview';

  const onPress = useCallback(
    (id: any) => {
      console.time('drawer');
      console.timeEnd('drawer');
      router.setParams({ route: id });
      navigation.closeDrawer();

      // it will run after drawer is closed
      // requestAnimationFrame(() => {
      //   InteractionManager.runAfterInteractions(() => {
      //     router.setParams({ route: id });
      //   });
      // });
    },
    [navigation, router]
  );
  const RenderItem = useCallback(
    ({ item, section }: any) => {
      const itemStyle = [
        'bg-[#F1F1F1] dark:bg-analytics_filter',
        'flex-row',
        'items-center',
        'gap-2',
        'rounded-full',
        'px-4',
        'py-1',
      ];
      if (route === item.id || `tags-${item.id}` === route) {
        itemStyle.push('!bg-primary');
      }

      return (
        <TouchableOpacity
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 3.84,

            elevation: 5,
          }}
          className={itemStyle.join(' ')}
          onPress={() => {
            if (section?.data?.length === 0) return;
            onPress(section?.id === 'tags' ? `tags-${item?.id}` : item.id);
          }}>
          <Text
            className={`font-poppinsMedium text-sm  dark:text-white ${route === item.id || `tags-${item.id}` === route ? 'text-white' : 'text-gray-600'}`}>
            {item.label}
          </Text>
        </TouchableOpacity>
      );
    },
    [route]
  );

  const renderSectionHeader = useCallback(
    ({ section }: any) => {
      return (
        <TouchableOpacity
          activeOpacity={section?.data?.length ? 1 : 0.5}
          onPress={() => {
            if (section?.data?.length) return;
            onPress(section.id);
          }}
          className={`flex-col ${section?.id !== 'overview' ? 'border-t-[1px] border-gray-600' : ''} ${section?.data?.length ? 'mx-4 gap-4 py-4' : ''}`}>
          <View
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 3.84,
              elevation: 5,
            }}
            className={`  flex-row items-center gap-2 ${section?.data?.length ? '' : route === section.id ? 'mt-3  rounded-lg bg-primary p-2' : 'mt-3 rounded-lg bg-[#F1F1F1] p-2 dark:bg-analytics_filter'}`}>
            {section.icon}
            <Text
              className={`${section?.data?.length === 0 ? 'text-gray-600 dark:text-white ' : 'text-sm text-analytics_filter_text'} font-poppinsMedium `}>
              {section.title}
            </Text>
          </View>
          <View className=" flex-row flex-wrap gap-2 py-1">
            {section.data.map((item: any) => (
              <RenderItem key={item.id} item={item} section={section} />
            ))}
          </View>
        </TouchableOpacity>
      );
    },
    [route]
  );
  const { tagsList }: any = useReport();

  const tags = [
    {
      title: 'Tags',
      icon: <TagSVG width={20} height={20} fill="#768EA7" />,
      data: (tagsList || [])?.map((item: any) => ({ label: item.name, id: item.uuid })),
      id: 'tags',
    },
    {
      title: 'Wins & Losses',
      icon: <WinLossSVG width={20} height={20} />,
      data: [],
      id: 'winLoss',
    },
  ];
  const list = [...sections, ...tags];

  return (
    <View className=" bg-white px-3 dark:bg-drawer">
      <SectionList
        showsVerticalScrollIndicator={false}
        ListHeaderComponentClassName="mb-2 py-3 border-b-[1px] border-gray-600"
        ListHeaderComponent={() => (
          <View className="flex-row items-center">
            <View className="flex-1 flex-row items-center gap-2">
              <View>
                <AnalyticFilterSVG />
              </View>

              <View>
                <Text className="font-poppinsMedium text-sm dark:text-white">Reports</Text>
                <Text className="text-xs text-tertiary dark:text-dashboard_card_text">
                  Select category to view
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.closeDrawer();
              }}>
              <Ionicons name="close" size={24} color={theme.colors.dashboard_card_text} />
            </TouchableOpacity>
          </View>
        )} // Add some space at the top
        sections={list}
        keyExtractor={(item) => item.id}
        renderItem={() => null} // We are rendering items within section header
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={false}
        getItemLayout={(data, index) => ({
          length: 50, // Replace with your estimated item height
          offset: 50 * index,
          index,
        })}
        maxToRenderPerBatch={10}
        windowSize={15}
      />
    </View>
  );
};

export default FilterDrawer;
