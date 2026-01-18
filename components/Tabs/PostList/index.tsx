/* eslint-disable import/order */
import {
  View,
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
import { useAuth } from '~/context/AuthContext';
import { noData } from '~/image';
import { debounce } from 'lodash';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Divider } from 'react-native-paper';
import Input from '~/components/UI/Input';
import { useGetAttributeOptions, useGetAttributes } from '~/hooks/attributes/query';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { width } from '~/constants/Colors';
import { Text } from '~/components/common/Text';
import dayjs from 'dayjs';
const PostList = () => {
  const router = useRouter();
  const params: any = useGlobalSearchParams();
  const inputRef: any = useRef(null);
  const refRBSheet: any = useRef(null);
  const [searchAttributes, setSearchAttributes] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [isAllFilterSelected, setIsAllFilterSelected] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [yearRange, setYearRange] = useState({ min: 1900, max: dayjs().year() });
  const [isPriceApplied, setIsPriceApplied] = useState(false);
  const [yearApplied, setYearApplied] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [appliedFilter, setAppliedFilter] = useState({} as any);
  const [city, setCity] = useState('');
  const selectedFilterCount = React.useMemo(() => {
    let count = 0;

    Object.entries(appliedFilter || {}).forEach(([key, value]) => {
      if (!value) return;

      // 1️⃣ Properties: count attribute keys (NOT values)
      if (key === 'properties' && typeof value === 'object') {
        count += Object.keys(value).length;
        return;
      }

      // 2️⃣ City: count as 1 if truthy
      if (key === 'city' && typeof value === 'string' && value.trim()) {
        count += 1;
        return;
      }

      // 3️⃣ Price: count as 1 if meaningful
      if (key === 'price' && isPriceApplied) {
        if (typeof value === 'string') {
          const [min, max] = value.split('-').map(Number);
          if ((min && min > 0) || (max && max > 0)) {
            count += 1;
          }
        }
        return;
      }

      // 4️⃣ Any other applied primitive filter (e.g. sortBy)
      if (typeof value === 'string' && value.trim()) {
        count += 1;
      }
    });

    return count;
  }, [appliedFilter, isPriceApplied]);

  const attributes: any = useGetAttributes({ id: params.subCategory });
  const attributeOptions = useGetAttributeOptions({
    attributeId: selectedSection,
    keyword: searchAttributes,
  });
  const yearData = (attributes?.data?.pages?.map((i: any) => i?.data)?.flat() || [])?.find(
    (j: any) => j.attributeKey?.toLowerCase() === 'year'
  );
  const yearId = yearData?.uuid;
  const isYearSelected = yearData?.uuid === selectedSection;
  const showSlider = isYearSelected || selectedSection === 'price';
  const isFilterApplied = (sectionUuid: string) => {
    if (sectionUuid === 'city') {
      return Boolean(appliedFilter.city) || Boolean(city);
    }

    if (sectionUuid === 'price') {
      return Boolean(appliedFilter.price) || Boolean(isPriceApplied);
    }

    return (
      Boolean(appliedFilter?.properties?.[sectionUuid]) || Boolean(selectedFilters?.[sectionUuid])
    );
  };
  const [keyword, setKeyword] = useState('');
  const { isFetching, data, refetch }: any = useGetPosts({
    status: 'active',
    subCategory: params.subCategory,
    category: params.category,
    keyword,
    sortBy: appliedFilter.sortBy,
    properties: Object.values(appliedFilter.properties || {})?.flat(),
    city: appliedFilter.city,
    priceRange: appliedFilter.price?.split('-'),
  });

  useEffect(() => {
    if (data?.pages?.[0]?.maxPrice && !isPriceApplied) {
      setPriceRange({
        min: 0,
        max: data.pages[0].maxPrice,
      });
    }
  }, [data?.pages?.[0]?.maxPrice, isPriceApplied]);

  const handleRefresh = useCallback(() => {
    queryClient.removeQueries({ queryKey: ['posts'] });

    refetch();
    attributes.refetch();
    attributeOptions.refetch();
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

  const onSelect = (attributeKey: string, value: string) => {
    setSelectedFilters((prev) => {
      const currentValues = prev[attributeKey] || [];

      if (currentValues.includes(value)) {
        const updatedValues = currentValues.filter((v) => v !== value);

        if (updatedValues.length === 0) {
          const { [attributeKey]: _, ...rest } = prev;
          return rest;
        }

        return {
          ...prev,
          [attributeKey]: updatedValues,
        };
      }

      return {
        ...prev,
        [attributeKey]: [...currentValues, value],
      };
    });
  };

  const sections = React.useMemo(
    () => [
      ...(attributes?.data?.pages?.map((i: any) => i?.data)?.flat() || []),
      { label: 'Price', uuid: 'price' },
      { label: 'City', uuid: 'city' },
    ],
    [attributes]
  );

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
        {/* <TouchableOpacity
          onPress={() => {
            refRBSheet.current.open();
          }}
          className="rounded-lg border border-gray-200 px-4 py-1">
          <Ionicons name="filter" className="!text-2xl" />
        </TouchableOpacity> */}
      </View>
      <View className=" flex-row items-center gap-4 px-3 py-2">
        <TouchableOpacity
          activeOpacity={selectedFilterCount ? 0 : 0.8}
          className="flex flex-row items-center gap-2"
          onPress={() => {
            // if (!!selectedFilterCount === false) return;
            refRBSheet.current.open();
            setIsAllFilterSelected(true);
            setSelectedSection(
              (attributes?.data?.pages?.map((i: any) => i?.data)?.flat() || [])?.[0]?.uuid
            );
          }}>
          <Ionicons name="filter" className="!text-xl" />
          <Text className="font-poppinsMedium">Filters</Text>
          {!!selectedFilterCount === true ? (
            <View className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
              <Text className=" font-poppinsMedium text-white">{selectedFilterCount}</Text>
            </View>
          ) : (
            <></>
          )}
        </TouchableOpacity>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName=" gap-2 items-center">
          <View className="ml-3 flex-row items-center gap-2">
            {[
              ...(attributes?.data?.pages?.map((i: any) => i?.data)?.flat() || []),
              { label: 'Price', uuid: 'price', visibleInFilter: true },
              { label: 'City', uuid: 'city', visibleInFilter: true },
              // { label: 'All Filters', uuid: 'all-filters' },
            ]
              ?.filter((j) => j?.visibleInFilter)
              .map((section: any) => (
                <TouchableOpacity
                  onPress={() => {
                    refRBSheet.current.open();
                    if (section?.uuid === 'all-filters') {
                      setIsAllFilterSelected(true);
                      setSelectedSection(
                        (attributes?.data?.pages?.map((i: any) => i?.data)?.flat() || [])?.[0]?.uuid
                      );
                    } else {
                      setSelectedSection(section.uuid);
                    }
                  }}
                  key={section.uuid}
                  className={cn(
                    'flex flex-row items-center rounded-lg border-2    ',
                    isFilterApplied(section.uuid)
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-200'
                  )}>
                  <Text
                    className={cn(
                      'px-3 font-poppinsMedium',
                      isFilterApplied(section.uuid) ? 'text-primary' : ''
                    )}>
                    {section.label}
                  </Text>
                  <Ionicons
                    className={cn('!text-lg', isFilterApplied(section.uuid) ? '!text-primary' : '')}
                    name={isFilterApplied(section.uuid) ? 'chevron-forward' : 'chevron-down'}
                  />
                </TouchableOpacity>
              ))}
          </View>
        </ScrollView>
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

              <Text allowFontScaling={false} className="font-interMedium text-xl">
                No Product found
              </Text>
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
          setIsAllFilterSelected(false);
          setSelectedFilters({});
          setIsPriceApplied(false);
          setYearApplied(false);
          setCity('');
        }}>
        <>
          <View className="flex-1 flex-row">
            {isAllFilterSelected ? (
              <View className="w-1/3">
                <FlatList
                  data={sections}
                  keyExtractor={(item) => item.uuid}
                  contentContainerStyle={{
                    gap: 10,
                    paddingHorizontal: 12,
                    paddingTop: 24,
                  }}
                  className="h-full"
                  renderItem={({ item: section }) => (
                    <TouchableOpacity
                      onPress={() => {
                        refRBSheet.current.open();
                        setSelectedSection(section.uuid);
                      }}
                      className={cn(
                        'flex flex-row items-center rounded-lg border-2 p-1',
                        isFilterApplied(section.uuid)
                          ? 'border-primary bg-primary/10'
                          : 'border-gray-200'
                      )}>
                      <Text
                        className={cn(
                          'flex-1 font-poppinsMedium text-sm',
                          isFilterApplied(section.uuid) ? 'text-primary' : 'text-black'
                        )}>
                        {section.label}
                      </Text>

                      <Ionicons
                        name={selectedSection === section.uuid ? 'chevron-forward' : 'chevron-down'}
                        className={cn(
                          '!text-lg',
                          isFilterApplied(section.uuid) ? '!text-primary' : '!text-gray-500'
                        )}
                      />
                    </TouchableOpacity>
                  )}
                />
              </View>
            ) : (
              <></>
            )}
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
                  {!['price', 'city']?.includes(selectedSection) && !isYearSelected ? (
                    <View className="bg-white pt-3">
                      <Input
                        onChangeText={handleAttributeDebounceSearch}
                        className="mr-3 w-full rounded-lg !py-2"
                        placeholder="Search.."
                        prefix={<Ionicons name="search" className="!text-lg" />}
                      />
                    </View>
                  ) : (
                    <View />
                  )}

                  {['city']?.includes(selectedSection) ? (
                    <View className="gap-3 p-3">
                      {[
                        { value: 'Dubai', uuid: 'Dubai' },
                        { value: 'Abu Dhabi', uuid: 'Abu Dhabi' },
                        { value: 'Sharjah', uuid: 'Sharjah' },
                        { value: 'Ajman', uuid: 'Ajman' },
                        { value: 'Umm Al Quwain', uuid: 'Umm Al Quwain' },
                        { value: 'Ras Al Khaimah', uuid: 'Ras Al Khaimah' },
                        { value: 'Fujairah', uuid: 'Fujairah' },
                      ].map((section: any) => (
                        <TouchableOpacity
                          onPress={() => {
                            setCity((prev) => (prev === section.value ? '' : section.value));
                          }}
                          key={section.uuid}
                          className={cn('flex flex-row items-center rounded-lg')}>
                          <Text
                            allowFontScaling={false}
                            className={cn(
                              'flex-1 font-poppinsMedium',
                              city === section.value ? 'text-primary' : ''
                            )}>
                            {section.value}
                          </Text>
                          {city === section.value ? (
                            <Ionicons name="checkmark" color={'#FF5722'} size={20} />
                          ) : null}
                        </TouchableOpacity>
                      ))}
                    </View>
                  ) : (
                    <View className="mt-3 gap-3">
                      {!showSlider &&
                        (attributeOptions?.data?.pages || [])
                          .map((i: any) => i?.data)
                          .flat()
                          .map((section: any) => (
                            <TouchableOpacity
                              onPress={() => {
                                onSelect(selectedSection, section.value);
                              }}
                              key={section.uuid}
                              className={cn('flex flex-row items-center rounded-lg')}>
                              <Text
                                allowFontScaling={false}
                                className={cn(
                                  'flex-1 font-poppinsMedium',
                                  selectedFilters[selectedSection]?.includes(section.value)
                                    ? 'text-primary'
                                    : 'text-black'
                                )}>
                                {section.value}
                              </Text>
                              {selectedFilters[selectedSection]?.includes(section.value) ? (
                                <Ionicons name="checkmark" color={'#FF5722'} size={20} />
                              ) : null}
                            </TouchableOpacity>
                          ))}
                      {isYearSelected ? (
                        <View className="px-1 pt-4">
                          <Text
                            allowFontScaling={false}
                            className="mb-2 font-poppinsMedium text-base">
                            Set your desired year range
                          </Text>

                          <View className="mb-2 flex-row items-center justify-between">
                            {/* Min Price */}
                            <View className=" flex-1 flex-row items-center rounded-lg border border-gray-300 px-2">
                              <TextInput
                                keyboardType="numeric"
                                placeholder="0"
                                allowFontScaling={false}
                                value={yearRange.min?.toString()}
                                maxLength={4}
                                onChangeText={(v) => {
                                  const onlyNumbers = v.replace(/[^0-9]/g, '');

                                  // block if min > max
                                  if (
                                    onlyNumbers.length === 4 &&
                                    yearRange.max &&
                                    Number(onlyNumbers) > Number(yearRange.max)
                                  ) {
                                    return;
                                  }

                                  setYearRange({
                                    ...yearRange,
                                    min: onlyNumbers ? Number(onlyNumbers) : 0,
                                  });

                                  setYearApplied(true);
                                }}
                                className="flex-1 py-2 text-base leading-5 text-gray-700"
                              />
                            </View>

                            {/* Dash separator */}
                            <Text className="mx-1 font-poppinsMedium text-lg text-gray-600">-</Text>

                            {/* Max Price */}
                            <View className=" flex-1 flex-row items-center rounded-lg border border-gray-300 px-2">
                              <TextInput
                                keyboardType="numeric"
                                placeholder="Any"
                                value={yearRange.max?.toString()}
                                onChangeText={(v) => {
                                  const onlyNumbers = v.replace(/[^0-9]/g, '');

                                  // max must be >= min
                                  if (
                                    onlyNumbers.length === 4 &&
                                    yearRange.min &&
                                    Number(onlyNumbers) < Number(yearRange.min)
                                  ) {
                                    return;
                                  }

                                  setYearRange({
                                    ...yearRange,
                                    max: onlyNumbers ? Number(onlyNumbers) : 0,
                                  });

                                  setYearApplied(true);
                                }}
                                allowFontScaling={false}
                                className="flex-1 py-2 text-base leading-5 text-gray-700"
                                style={{ textAlignVertical: 'center' }}
                              />
                            </View>
                          </View>
                          <View className="flex items-center justify-center ">
                            <MultiSlider
                              min={1900}
                              max={dayjs().year()}
                              values={[yearRange.min, yearRange.max]}
                              containerStyle={{}}
                              sliderLength={isAllFilterSelected ? width * 0.5 : width * 0.85}
                              // enableLabel
                              onValuesChangeFinish={(value) => {
                                const [min, max] = value;
                                setYearRange((prev) => ({
                                  min,
                                  max,
                                }));
                                setYearApplied(true);
                              }}
                            />
                          </View>
                          {yearApplied ? (
                            <TouchableOpacity
                              className="mt-4  flex flex-1 items-center justify-center rounded-lg bg-primary px-3 py-2"
                              onPress={() => {
                                setYearRange({ min: 1900, max: dayjs().year() });
                                setYearApplied(false);
                              }}>
                              <Text className="text-right text-white">Clear</Text>
                            </TouchableOpacity>
                          ) : (
                            <></>
                          )}
                        </View>
                      ) : (
                        <></>
                      )}
                      {selectedSection === 'price' ? (
                        <View className="px-1 pt-4">
                          <Text
                            allowFontScaling={false}
                            className="mb-2 font-poppinsMedium text-base">
                            Set your desired price range
                          </Text>

                          <View className="mb-2 flex-row items-center justify-between">
                            {/* Min Price */}
                            <View className=" flex-1 flex-row items-center rounded-lg border border-gray-300 px-2">
                              <TextInput
                                keyboardType="numeric"
                                placeholder="0"
                                allowFontScaling={false}
                                value={priceRange.min?.toString()}
                                onChangeText={(v) => {
                                  const onlyNumbers = v.replace(/[^0-9]/g, '');

                                  setPriceRange({
                                    ...priceRange,
                                    min: onlyNumbers ? Number(onlyNumbers) : 0,
                                  });

                                  setIsPriceApplied(true);
                                }}
                                className="flex-1 py-2 text-base leading-5 text-gray-700"
                              />
                              <Text className="text-xs">AED</Text>
                            </View>

                            {/* Dash separator */}
                            <Text className="mx-1 font-poppinsMedium text-lg text-gray-600">-</Text>

                            {/* Max Price */}
                            <View className=" flex-1 flex-row items-center rounded-lg border border-gray-300 px-2">
                              <TextInput
                                keyboardType="numeric"
                                placeholder="Any"
                                value={priceRange.max?.toString()}
                                onChangeText={(v) => {
                                  const onlyNumbers = v.replace(/[^0-9]/g, '');

                                  setPriceRange({
                                    ...priceRange,
                                    max: onlyNumbers ? Number(onlyNumbers) : 0,
                                  });

                                  setIsPriceApplied(true);
                                }}
                                allowFontScaling={false}
                                className="flex-1 py-2 text-base leading-5 text-gray-700"
                                style={{ textAlignVertical: 'center' }}
                              />
                              <Text className="text-xs">AED</Text>
                            </View>
                          </View>
                          {data?.pages?.[0]?.maxPrice ? (
                            <View className="flex items-center justify-center">
                              <MultiSlider
                                min={0}
                                max={data?.pages?.[0]?.maxPrice}
                                values={[priceRange.min, priceRange.max]}
                                containerStyle={{}}
                                sliderLength={isAllFilterSelected ? width * 0.5 : width * 0.8}
                                // enableLabel
                                onValuesChangeFinish={(value) => {
                                  const [min, max] = value;
                                  setPriceRange((prev) => ({
                                    min,
                                    max,
                                  }));
                                  setIsPriceApplied(true);
                                }}
                              />
                            </View>
                          ) : (
                            <></>
                          )}

                          {isPriceApplied ? (
                            <TouchableOpacity
                              className="mt-4  flex flex-1 items-center justify-center rounded-lg bg-primary px-3 py-2"
                              onPress={() => {
                                setPriceRange({ min: 0, max: priceRange.max });
                                setIsPriceApplied(false);
                              }}>
                              <Text className="text-right text-white">Clear Price</Text>
                            </TouchableOpacity>
                          ) : (
                            <></>
                          )}
                        </View>
                      ) : (
                        <></>
                      )}

                      {attributeOptions.isFetchingNextPage && (
                        <ActivityIndicator
                          size="small"
                          color={theme.colors.primary}
                          className="my-3"
                        />
                      )}
                    </View>
                  )}
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
                setSelectedFilters({});
                setSortBy('');
                setCity('');
                setPriceRange({ min: 0, max: 0 });
                setIsPriceApplied(false);
                setYearApplied(false);
                setYearRange({ min: 1900, max: dayjs().year() });
              }}>
              <Text>Reset all</Text>
            </TouchableOpacity>
            <View className="flex-row items-center gap-2">
              <TouchableOpacity
                className="rounded-lg border-[1px] border-primary px-3 py-2"
                onPress={() => {
                  refRBSheet.current.close();
                }}>
                <Text className="text-dimgray text-center font-poppinsMedium dark:text-white">
                  Close
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="rounded-lg bg-primary px-3 py-2"
                onPress={() => {
                  setAppliedFilter({
                    ...appliedFilter,
                    properties: {
                      ...selectedFilters,
                      ...(yearApplied && {
                        [yearId]: [yearRange?.min, yearRange?.max],
                      }),
                    },
                    sortBy,
                    price:
                      isPriceApplied && (priceRange.min || priceRange.max)
                        ? `${priceRange.min || 0}-${priceRange.max || ''}`
                        : undefined,

                    city,
                  });

                  refRBSheet.current.close();
                  setIsAllFilterSelected(false);
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
