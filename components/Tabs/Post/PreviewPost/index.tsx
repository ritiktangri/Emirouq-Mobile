import React, { useState } from 'react';
import { Href, useGlobalSearchParams, useRouter } from 'expo-router';
import { ScrollView, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { routes } from '~/utils/routes';
import { toCurrency } from '~/utils/helper';
import { i18n } from '~/utils/i18n';
import { View } from '~/components/common/View';
import { Text } from '~/components/common/Text';
import { useLocale } from '~/context/LocaleContext';
import { usePosts } from '~/context/PostContext';
import { useTheme } from '~/context/ThemeContext';
import theme from '~/utils/theme';
import ImageCarousel from '../SinglePost/imageCarousel';

const PreviewPost = () => {
  const params: any = useGlobalSearchParams();
  const data = params?.data ? JSON.parse(params?.data) : {};
  const router: any = useRouter();
  const { showToast } = useTheme();
  const { createPost, updatePost } = usePosts();
  const [saveLoading, setSaveLoading] = useState(false);
  const [draftLoading, setDraftLoading] = useState(false);
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
  const [expandedFeatures, setExpandedFeatures] = useState<Record<number, boolean>>({});
  const { locale } = useLocale();
  const insets = useSafeAreaInsets();
  if (!params?.data) {
    return;
  }
  const onSubmit = async (isDraft = false) => {
    if (data?.isEdit) {
      setSaveLoading(true);
      updatePost(
        {
          ...data,
          locationName: data?.location?.name,
          locationPlaceId: data?.location?.placeId,
          location: JSON.stringify(data?.location),
          isDraft,
        },
        {
          id: data?.uuid,
        },
        () => {
          showToast('Ad updated successfully', 'success');
          router.push(routes.success as Href);
          setSaveLoading(false);
        },
        (err: any) => {
          showToast(err?.message, 'error');
          setSaveLoading(false);
        }
      );
    } else {
      if (isDraft) {
        setDraftLoading(true);
      } else {
        setSaveLoading(true);
      }
      createPost(
        {
          ...data,
          locationName: data?.location?.name,
          locationPlaceId: data?.location?.placeId,
          location: JSON.stringify(data?.location),
          isDraft,
        },
        () => {
          if (!isDraft) {
            showToast('Ad created successfully', 'success');
            router.push(routes.success as Href);
          } else {
            showToast('Ad saved as draft successfully', 'success');
            router.push(routes.tabs.home as Href);
          }
          setDraftLoading(false);
          setSaveLoading(false);
        },
        (err: any) => {
          showToast(err?.message, 'error');
          setDraftLoading(false);
          setSaveLoading(false);
        }
      );
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center gap-3 px-4 py-2">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold">Preview Ad</Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="bg-blue-50 p-3">
          <Text placement={locale} className="flex-row items-center text-sm text-blue-500">
            <AntDesign name="infocirlceo" size={12} color="#3B82F6" />
            {'  '}
            {i18n.t('previewAd.info')}
          </Text>
        </View>

        <View className="flex-1">
          {/* Image Carousel */}
          <ImageCarousel
            data={{
              data: {
                file: data?.images?.map((img: any) => img.uri) || [],
              },
            }}
          />

          {/* Product Details */}
          <View className="p-4">
            <Text className="mb-2 text-2xl font-bold">{data?.title}</Text>
            <Text className="text-2xl font-semibold text-primary">{toCurrency(data?.price)}</Text>

            <View className="mt-1 flex-row items-center">
              <Feather name="map-pin" size={16} color="gray" />
              <Text className="ml-1 text-gray-600">{data?.location?.name || 'N/A'}</Text>
            </View>
          </View>

          {/* Description & Specs (SinglePost Style) */}
          <View className="bg-white px-6 py-4">
            {/* --- Specifications Section --- */}
            <View>
              <View className="mb-4 flex-row items-center justify-between">
                <Text className="font-serif text-lg font-bold text-gray-900">Details & Specs</Text>
              </View>

              {/* Single Premium Card Container */}
              <View
                className="overflow-hidden rounded-3xl border border-gray-200 bg-white"
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.08,
                  shadowRadius: 12,
                  elevation: 4,
                }}>
                {/* Content - Grid Layout */}
                <View className="flex-row flex-wrap">
                  {/* Condition */}
                  <View className="w-[50%] border-b border-r border-gray-100 p-4">
                    <Text className="mb-1.5 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                      {i18n.t('post.condition')}
                    </Text>
                    <Text className="text-[15px] font-bold capitalize text-gray-900">
                      {data?.condition || 'N/A'}
                    </Text>
                  </View>

                  {/* Category */}
                  <View className="w-[50%] border-b border-gray-100 p-4">
                    <Text className="mb-1.5 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                      {i18n.t('post.category')}
                    </Text>
                    <Text className="text-[15px] font-bold text-gray-900" numberOfLines={2}>
                      {data?.categoryName || 'N/A'}
                    </Text>
                  </View>

                  {/* Dynamic Single-Value Properties */}
                  {(() => {
                    const singleValueProps = (data?.properties || [])
                      .filter(
                        (p: any) =>
                          !Array.isArray(p.selectedValue) ||
                          (Array.isArray(p.selectedValue) && p.selectedValue.length <= 1)
                      )
                      .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
                    const displayedProps = isDetailsExpanded
                      ? singleValueProps
                      : singleValueProps.slice(0, 4);

                    return (
                      <>
                        {displayedProps.map((property: any, index: number) => {
                          const isLeft = index % 2 === 0;
                          const isLastRow =
                            index >= displayedProps.length - (displayedProps.length % 2 || 2);

                          return (
                            <View
                              key={index}
                              className={`mb-0 w-[50%] p-4 ${isLeft ? 'border-r' : ''} ${!isLastRow ? 'border-b' : ''} border-gray-100`}>
                              <Text
                                className="mb-1.5 text-[11px] font-bold uppercase tracking-widest text-gray-400"
                                numberOfLines={1}>
                                {property.label?.trim()}
                              </Text>
                              <Text className="text-[15px] font-bold leading-5 text-gray-900">
                                {Array.isArray(property.selectedValue)
                                  ? property.selectedValue[0]?.value || '-'
                                  : property.selectedValue?.value || '-'}
                              </Text>
                            </View>
                          );
                        })}

                        {singleValueProps.length > 4 && (
                          <TouchableOpacity
                            className="mt-2 w-full flex-row items-center justify-center border-t border-gray-100 pt-4"
                            onPress={() => setIsDetailsExpanded(!isDetailsExpanded)}>
                            <Text className="mr-1 font-bold text-primary">
                              {isDetailsExpanded ? 'View Less' : 'View More'}
                            </Text>
                            <Feather
                              name={isDetailsExpanded ? 'chevron-up' : 'chevron-down'}
                              size={16}
                              color={theme.colors.primary}
                            />
                          </TouchableOpacity>
                        )}
                      </>
                    );
                  })()}
                </View>
              </View>

              {/* Dynamic Multi-Value Properties (e.g. Features) */}
              {(data?.properties || [])
                .filter((p: any) => Array.isArray(p.selectedValue) && p.selectedValue.length > 1)
                .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
                .map((property: any, index: number) => {
                  const isExpanded = expandedFeatures[index] || false;
                  const displayItems = isExpanded
                    ? property.selectedValue
                    : property.selectedValue.slice(0, 4);

                  return (
                    <View key={index} className="mt-6">
                      <Text className="mb-3 font-serif text-lg font-bold text-gray-900">
                        {property.label?.trim()}
                      </Text>
                      <View
                        className="overflow-hidden rounded-3xl border border-gray-200 bg-white p-4"
                        style={{
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.05,
                          shadowRadius: 8,
                          elevation: 3,
                        }}>
                        {displayItems.map((item: any, idx: number) => {
                          const isLast =
                            idx === displayItems.length - 1 &&
                            (!property.selectedValue ||
                              property.selectedValue.length <= 4 ||
                              isExpanded);
                          return (
                            <View
                              key={idx}
                              className={`flex-row items-center py-3.5 ${!isLast ? 'border-b border-gray-100' : ''}`}>
                              <View className="mr-4 h-6 w-6 items-center justify-center rounded-full bg-[#f9ece8]">
                                <Ionicons name="checkmark-circle" size={18} color="#FF5722" />
                              </View>
                              <Text className="flex-1 text-[16px] font-semibold leading-6 tracking-tight text-slate-800">
                                {item.value}
                              </Text>
                            </View>
                          );
                        })}

                        {property.selectedValue.length > 4 && (
                          <TouchableOpacity
                            className="mt-2 w-full flex-row items-center justify-center pt-3"
                            onPress={() =>
                              setExpandedFeatures((prev) => ({ ...prev, [index]: !isExpanded }))
                            }>
                            <Text className="mr-1 font-bold text-primary">
                              {isExpanded ? 'View Less' : 'View More'}
                            </Text>
                            <Feather
                              name={isExpanded ? 'chevron-up' : 'chevron-down'}
                              size={16}
                              color={theme.colors.primary}
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  );
                })}
            </View>

            {/* --- Description Section --- */}
            <View className="my-6">
              <Text className="mb-3 font-serif text-lg font-bold text-gray-900">
                {i18n.t('post.description')}
              </Text>

              {/* Premium Description Card */}
              <View
                className="overflow-hidden rounded-3xl border border-gray-200 bg-white"
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.08,
                  shadowRadius: 12,
                  elevation: 4,
                }}>
                <View className="p-5">
                  <Text className="text-base leading-7 tracking-wide text-gray-900">
                    {data?.description}
                  </Text>
                </View>
              </View>
            </View>

            {/* Time Period if exists */}
            {data?.timePeriod && (
              <View className="mb-6 flex-row items-center justify-between rounded-xl bg-gray-50 p-4">
                <Text className="font-semibold text-gray-600">Time Period</Text>
                <Text className="font-bold text-gray-900">{data?.timePeriod}</Text>
              </View>
            )}

            {/* Action buttons */}
            <View className="mb-10 flex flex-col gap-y-3">
              <Pressable
                className="flex-1 flex-row items-center justify-center gap-2 rounded-xl bg-primary py-4 shadow-sm"
                onPress={() => onSubmit(false)}>
                {saveLoading && <ActivityIndicator size="small" color="white" />}
                <Text className="text-base font-bold text-white">
                  {i18n.t('previewAd.confirm')}
                </Text>
              </Pressable>

              {!data?.isEdit && (
                <Pressable
                  onPress={() => onSubmit(true)}
                  className="flex-1 flex-row items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-4">
                  {draftLoading && <ActivityIndicator size="small" color="black" />}
                  <Text className="text-base font-bold text-gray-700">
                    {i18n.t('previewAd.saveDraft')}
                  </Text>
                </Pressable>
              )}

              <Pressable
                className="flex-1 items-center rounded-xl border border-primary/20 bg-primary/5 py-4"
                onPress={() => router.back()}>
                <Text className="text-base font-bold text-primary">{i18n.t('previewAd.edit')}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PreviewPost;
