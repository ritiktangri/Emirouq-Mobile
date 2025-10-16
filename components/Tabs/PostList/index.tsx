/* eslint-disable import/order */
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { cn, screenHeight } from '~/utils/helper';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import { i18n } from '~/utils/i18n';
import { useGetPosts } from '~/hooks/post/query';
import Render from './render';
import theme from '~/utils/theme';
import { queryClient } from '~/app/_layout';
import { noData } from '~/image';
import { debounce } from 'lodash';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Divider } from 'react-native-paper';
import Input from '~/components/UI/Input';
import { useGetAttributeOptions, useGetAttributes } from '~/hooks/attributes/query';
import { MemoizedSorting } from '../Dashboard/Search/FilterComponents/export';
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  // { value: 'relevant', label: 'Most Relevant' },
];
const PostList = () => {
  const router = useRouter();
  const params: any = useGlobalSearchParams();
  const inputRef: any = useRef(null);
  const refRBSheet: any = useRef(null);
  const [searchAttributes, setSearchAttributes] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [appliedFilter, setAppliedFilter] = useState({} as any);
  const [selectedSectionOption, setSelectedSectionOption] = useState([] as any);
  const [keyword, setKeyword] = useState('');
  const { isFetching, data, refetch }: any = useGetPosts({
    status: 'active',
    subCategory: params.subCategory,
    category: params.category,
    keyword,
    sortBy: appliedFilter.sortBy,
    properties: appliedFilter?.properties,
  });
  const handleRefresh = useCallback(() => {
    queryClient.removeQueries({ queryKey: ['posts'] });

    refetch();
  }, [queryClient, refetch]);
  const handleDebounce = useCallback(
    debounce((text: string) => setKeyword(text), 300),
    []
  );
  const handleAttributeDebounceSearch = useCallback(
    debounce((text: string) => setSearchAttributes(text), 300),
    []
  );
  useEffect(() => {
    if (inputRef.current?.getNativeRef && params.keyword) {
      // Get the actual native input and set its text
      inputRef.current.getNativeRef().setNativeProps({ text: params.keyword });
      setKeyword(params.keyword);
    }
  }, [params.keyword, inputRef]);

  const attributes: any = useGetAttributes({ id: params.subCategory });
  const attributeOptions = useGetAttributeOptions({
    attributeId: selectedSection,
    keyword: searchAttributes,
  });

  const onSelect = (value: any) => {
    setSelectedSectionOption((prev: any[]) => {
      if (prev.includes(value)) {
        return prev.filter((v) => v !== value); // unselect if already selected
      }
      return [...prev, value]; // otherwise add
    });
  };

  console.log(sortBy, 'selectedSectionOption');
  return (
    <View className="flex-1 bg-white">
      <View
        style={{
          paddingTop: useSafeAreaInsets().top,
        }}
        className={cn('flex-row rounded-b-xl', 'bg-primary')}>
        <View className="flex-row items-center justify-between bg-primary p-4">
          <View className="w-[10%]">
            <Ionicons name="chevron-back" size={24} color="white" onPress={() => router.back()} />
          </View>
          <View className="w-[80%] items-center justify-center bg-primary ">
            <Text className=" text-center text-2xl font-semibold capitalize text-white">
              {i18n.t(`home.${params.tag}`)}
            </Text>
          </View>
          <View className="w-[10%]" />
        </View>
      </View>
      <View className="flex flex-row items-center gap-3 px-5 py-3">
        <TextInput
          ref={inputRef}
          placeholder="Search..."
          onChangeText={handleDebounce}
          className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-base text-gray-700"
          placeholderTextColor="#999"
          autoFocus
        />
        <TouchableOpacity
          onPress={() => {
            refRBSheet.current.open();
          }}
          className="rounded-lg border border-gray-200 px-4 py-1">
          <Ionicons name="filter" className="!text-2xl" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data?.pages.map((page: any) => page?.data).flat() || []}
        keyExtractor={(item) => item?.uuid?.toString()}
        renderItem={({ item, index }) => <Render item={item} index={index} />}
        ItemSeparatorComponent={() => <View className="m-1.5" />}
        showsHorizontalScrollIndicator={false}
        className="mb-5"
        contentContainerStyle={{
          paddingHorizontal: 8,
          paddingVertical: 8,
        }}
        refreshControl={
          <RefreshControl
            colors={[theme.colors.primary]}
            refreshing={isFetching}
            onRefresh={handleRefresh}
            tintColor={theme.colors.primary}
          />
        }
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => {
          return (
            <View className="mt-10 flex-1 items-center justify-center">
              <Image source={noData} className=" flex h-56 w-56" />

              <Text className="font-interMedium text-xl">No Product found</Text>
            </View>
          );
        }}
      />
      <RBSheet
        ref={refRBSheet}
        // useNativeDriver
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
        height={screenHeight * 0.6}
        customModalProps={{
          animationType: 'fade',
        }}
        onClose={() => {
          setSearchAttributes('');
        }}>
        <>
          <View className="flex-1 flex-row items-center gap-5 ">
            {/* Category Tabs */}
            <View className="flex h-full w-[30%] justify-start gap-5 px-3 pt-6">
              {[
                ...(attributes?.data?.pages?.map((i: any) => i?.data)?.flat() || []),
                { label: 'Price', uuid: 'price' },
              ].map((section: any) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedSection(section.uuid);
                  }}
                  key={section.uuid}
                  className={cn('flex flex-row items-center  rounded-lg  ')}>
                  <Text
                    className={cn(
                      'flex-1 font-poppinsMedium',
                      selectedSection === section.uuid ? 'text-primary' : ''
                    )}>
                    {section.label}
                  </Text>
                  <Ionicons
                    className={cn(
                      '!text-lg',
                      selectedSection === section.uuid ? '!text-primary' : ''
                    )}
                    name={selectedSection === section.uuid ? 'chevron-forward' : 'chevron-down'}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <View className="h-full w-[2px] bg-gray-100" />

            {/* Filter Options */}
            {selectedSection ? (
              <View className="flex-1">
                <ScrollView
                  stickyHeaderIndices={[0]}
                  contentContainerClassName="gap-2 pb-10  px-3"
                  onScroll={({ nativeEvent }) => {
                    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
                    const isCloseToBottom =
                      layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
                    if (
                      isCloseToBottom &&
                      attributeOptions.hasNextPage &&
                      !attributeOptions.isFetchingNextPage
                    ) {
                      attributeOptions.fetchNextPage();
                    }
                  }}
                  scrollEventThrottle={400}>
                  {!['price']?.includes(selectedSection) ? (
                    <View className="bg-white pt-3">
                      <Input
                        onChangeText={handleAttributeDebounceSearch}
                        className="mr-3 w-full rounded-lg"
                        placeholder="Search.."
                        prefix={<Ionicons name="search" className="!text-lg" />}
                      />
                    </View>
                  ) : null}

                  <View className="mt-3 gap-3">
                    {(attributeOptions?.data?.pages || [])
                      .map((i: any) => i?.data)
                      .flat()
                      .map((section: any) => (
                        <TouchableOpacity
                          onPress={() => {
                            onSelect(section.value);
                          }}
                          key={section.uuid}
                          className={cn('flex flex-row items-center rounded-lg')}>
                          <Text
                            className={cn(
                              'flex-1 font-poppinsMedium',
                              selectedSectionOption?.includes(section.value) ? 'text-primary' : ''
                            )}>
                            {section.value}
                          </Text>
                        </TouchableOpacity>
                      ))}

                    {!['price']?.includes(selectedSection)
                      ? null
                      : SORT_OPTIONS.map((option) => (
                          <TouchableOpacity
                            key={option.value}
                            className="my-1 flex-row items-center py-2"
                            activeOpacity={0.7}
                            onPress={() => {
                              setSortBy(option.value);
                            }}>
                            <View
                              className={`mr-3 flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                                sortBy === option.value ? 'border-orange-500' : 'border-gray-300'
                              }`}>
                              {sortBy === option.value && (
                                <View className="h-3 w-3 rounded-full bg-orange-500" />
                              )}
                            </View>

                            <Text className="flex-1 text-base text-gray-700">{option.label}</Text>
                          </TouchableOpacity>
                        ))}

                    {attributeOptions.isFetchingNextPage && (
                      <ActivityIndicator
                        size="small"
                        color={theme.colors.primary}
                        className="my-3"
                      />
                    )}
                  </View>
                </ScrollView>
              </View>
            ) : (
              <View className="flex w-screen flex-1 items-center justify-center">
                <Image source={noData} className="flex h-56 w-56" />
              </View>
            )}
          </View>

          <Divider />

          <View className="ios:mb-5 w-full flex-row items-center justify-between p-4">
            <TouchableOpacity
              onPress={() => {
                setSelectedSectionOption([]);
                setSortBy('');
              }}>
              <Text>Reset all</Text>
            </TouchableOpacity>
            <View className="flex-row items-center gap-2">
              <TouchableOpacity className="rounded-lg border-[1px] border-primary px-3 py-2">
                <Text className="text-dimgray text-center font-poppinsMedium dark:text-white">
                  Close
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="rounded-lg bg-primary px-3 py-2"
                onPress={() => {
                  console.log(appliedFilter);
                  setAppliedFilter({
                    ...appliedFilter,
                    properties: selectedSectionOption || [],
                    sortBy,
                  });
                  refRBSheet.current.close();
                }}>
                <Text className="font-poppinsMedium text-white">Apply filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      </RBSheet>
    </View>
  );
};

export default PostList;
