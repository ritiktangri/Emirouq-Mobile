/* eslint-disable import/order */
import { TextInput, Pressable, Image, Platform, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useRef, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SelectPicker from '~/components/UI/SelectPicker';
import { useCategory } from '~/context/CategoryContext';
import { useAuth } from '~/context/AuthContext';
import { useFocusEffect, useGlobalSearchParams, useRouter } from 'expo-router';
import { routes } from '~/utils/routes';
import { useTheme } from '~/context/ThemeContext';
import { View } from '~/components/common/View';
import { Text } from '~/components/common/Text';
import { useLocale } from '~/context/LocaleContext';
import { i18n } from '~/utils/i18n';
import LocationInput from '~/components/UI/GooglePlaceAutocomplete';
import { useGetSinglePosts } from '~/hooks/post/query';

const schema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  category: z.string().min(1, 'Please select a category'),
  subCategory: z.string().min(1, 'Please select a subCategory'),
  condition: z.enum(['new', 'used']),
  price: z.string().min(1, 'Price is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  location: z.any(),
  timePeriod: z.string().min(1, 'Time period is required'),
  images: z.array(
    z.object({
      uri: z.string(),
      assetId: z.string(),
      fileName: z.string(),
      fileSize: z.number(),
      mimeType: z.string(),
      width: z.number(),
      height: z.number(),
      type: z.string(),
      duration: z.string().nullable(),
      exif: z.string().nullable(),
      pairedVideoAsset: z.string().nullable(),
    })
  ),
  properties: z.array(
    z.object({
      name: z.string(),
      value: z.string(),
    })
  ),
});

type FormData = z.infer<typeof schema>;

const timePeriods = ['7 days', '14 days', '30 days', '60 days', '90 days'];

const AddPost = () => {
  const {
    control,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      condition: 'new',
      title: '',
      category: '',
      subCategory: '',
      price: '',
      description: '',
      location: '',
      timePeriod: '',
      images: [],
      properties: [
        // { name: 'Brand', value: '1' },
        // { name: 'Model', value: '1' },
        // { name: 'Condition', value: '1' },
        // { name: 'Operating System', value: '1' },
        // { name: 'Screen Size', value: '1' },
        // { name: 'Storage', value: '1' },
        // { name: 'Network Type', value: '1' },
        // { name: 'Seller Contact Info', value: '1' },
      ],
    },
  });
  const router: any = useRouter();
  const { locale } = useLocale();
  const { categories, getSubCategoryList, subCategories }: any = useCategory();
  const { user }: any = useAuth();
  const { showToast }: any = useTheme();
  const selectedCategory = watch('category');
  const selectedSubCategory = watch('subCategory');
  const [isEdit, setIsEdit] = useState(false);
  const params: any = useGlobalSearchParams();
  const locationRef: any = useRef(null);
  const { data: postDetails, refetch }: any = useGetSinglePosts(params?.postId);
  console.log('params?.postId', params?.postId, typeof params?.postId);
  useEffect(() => {
    if (params?.postId) {
      setIsEdit(true);
      refetch()?.then((res: any) => {
        let singlePost = res?.data?.data;

        const updatedProperties = singlePost?.properties?.map((prop: any) => ({
          ...prop,
          value: prop.value,
        }));

        reset({
          title: singlePost?.title || '',
          category: singlePost?.category?.uuid || '',
          subCategory: singlePost?.subCategory?.uuid || '',
          condition: singlePost?.condition || '',
          price: singlePost?.price?.toString() || '',
          description: singlePost?.description || '',
          timePeriod: singlePost?.timePeriod || '',
          images: singlePost?.file?.map((val: any) => ({ uri: val })) || [],
          location: {
            name: singlePost?.location?.name || '',
            placeId: singlePost?.location?.placeId || '',
          },
          properties: updatedProperties || [],
        });
      });
    }
  }, [params?.postId]);

  console.log(watch('images'));

  useFocusEffect(
    React.useCallback(() => {
      if (!user?.uuid) {
        router.push({
          pathname: routes.auth.auth,
        });
      } else if (user?._id && !user?.userHandle) {
        router.push({
          pathname: routes.tabs.create_profile,
          params: {
            headerTitle: 'createProfile.heading',
          },
        });
      }
    }, [user])
  );
  useEffect(() => {
    if (selectedCategory) {
      getSubCategoryList(selectedCategory);
    }
  }, [selectedCategory]);

  const pickImages = async () => {
    const result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      aspect: [4, 3],
      quality: 0.8,
      base64: false,
      allowsMultipleSelection: true,
    });
    console.log('result', result);
    if (result.canceled) return;
    const formattedAssets = result?.assets?.map((item: any) => {
      return {
        uuid: item?.assetId || item?.fileName,
        name: item?.fileName,
        type: item?.mimeType,
        uri: item?.uri,
      };
    });
    //if image already exists in the array, then do not add it
    // const assetIds = result?.assets?.map((item: any) => item?.assetId || item?.fileName);
    // const isIncluded = watch('images')?.some((item: any) =>
    //   assetIds?.includes(item?.assetId || item?.fileName)
    // );

    // console.log(formattedAssets, 'formattedAssets');
    // if (isIncluded) {
    //   const filterImages = watch('images')?.filter(
    //     (item: any) => !assetIds?.includes(item?.uuid || item?.name)
    //   );
    //   setValue('images', [...filterImages, ...formattedAssets]);
    // } else {
    setValue('images', [...watch('images'), ...formattedAssets]);
    // }
  };

  const handlePropertyChange = (name: string, text: string) => {
    const updatedProperties = watch('properties').map((prop: any) => {
      if (prop.name === name) {
        return { ...prop, value: text };
      }
      return prop;
    });
    setValue('properties', updatedProperties);
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          return Alert.alert('Permission Denied', 'Please allow gallery access in settings.');
        }
      }
    })();
  }, []);
  return (
    <View className="flex-1 bg-white px-4 py-6">
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        className="flex-1">
        <View className="mb-8">
          <Pressable
            className="items-center justify-center rounded-xl border-2 border-dashed border-gray-200 p-6"
            onPress={pickImages}>
            <Feather name="camera" size={24} className="text-primary" />
            <Text className="mb-4 mt-3 text-base text-gray-600">{i18n.t('post.uploadText')}</Text>
            <View className="rounded-full border border-primary bg-white px-6 py-3">
              <Text className="text-base font-semibold text-primary">
                {i18n.t('post.chooseFile')}
              </Text>
            </View>
          </Pressable>
          {watch('images')?.length > 0 ? (
            <View className="mt-4 flex-row flex-wrap gap-2">
              {watch('images')?.map((uri: any, index: number) => (
                <View key={index} className="relative h-[75px] w-[75px] rounded-full">
                  <Feather
                    name="x"
                    size={16}
                    className="absolute right-0 top-0 z-10 rounded-full bg-gray-200 p-1 text-gray-600"
                    onPress={() => {
                      const images = watch('images')?.filter((item: any) => item?.uri !== uri?.uri);
                      setValue('images', images);
                    }}
                  />

                  <Image
                    source={{ uri: uri?.uri }}
                    resizeMode="cover"
                    style={{
                      width: 75,
                      height: 75,
                      borderRadius: 10,
                    }}
                  />
                </View>
              ))}
            </View>
          ) : (
            <></>
          )}
        </View>

        <View className="mb-6">
          <Text placement={locale} className="mb-2 text-base font-semibold text-gray-800">
            {i18n.t('post.title')}
          </Text>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="rounded-lg border border-gray-200 bg-white p-4"
                onChangeText={onChange}
                value={value}
                placeholder={i18n.t('post.titlePlaceholder')}
              />
            )}
          />
          {errors.title && (
            <Text className="mt-1 text-sm text-red-500">{errors.title.message}</Text>
          )}
        </View>
        <View className="mb-6">
          <Text placement={locale} className="mb-2 text-base font-semibold text-gray-800">
            {i18n.t('post.category')}
          </Text>
          <Controller
            control={control}
            name="category"
            render={({ field: { onChange, value } }) => (
              <SelectPicker
                value={value}
                data={categories?.map((ite: any) => {
                  return {
                    label: ite?.title,
                    value: ite?.uuid,
                    key: ite?.uuid,
                  };
                })}
                placeholder={i18n.t('post.categoryPlaceholder')}
                onSelect={onChange}
              />
            )}
          />
          {errors.category && (
            <Text className="mt-1 text-sm text-red-500">{errors.category.message}</Text>
          )}
        </View>
        {selectedCategory && subCategories?.length ? (
          <View className="mb-6">
            <Text placement={locale} className="mb-2 text-base font-semibold text-gray-800">
              {i18n.t('post.subCategory')}
            </Text>
            <Controller
              control={control}
              name="subCategory"
              render={({ field: { onChange, value } }) => (
                <View>
                  <SelectPicker
                    value={value}
                    data={subCategories?.map((ite: any) => {
                      return {
                        label: ite?.title,
                        value: ite?.uuid,
                        key: ite?.uuid,
                        properties: ite?.properties,
                      };
                    })}
                    placeholder={i18n.t('post.subCategoryPlaceholder')}
                    onSelect={(e: any) => {
                      const selectedItem = subCategories.find(
                        (item: any) => item.uuid === selectedSubCategory
                      );
                      if (selectedItem) {
                        setValue(
                          'properties',
                          selectedItem?.properties?.map((ite: any) => {
                            return { name: ite, value: '' };
                          })
                        );
                      } else {
                        setValue('properties', []);
                      }
                      onChange(e);
                    }}
                  />
                </View>
              )}
            />
            {errors.category && (
              <Text className="mt-1 text-sm text-red-500">{errors.category.message}</Text>
            )}
          </View>
        ) : null}

        <View className="mb-6">
          <Text placement={locale} className="mb-2 text-base font-semibold text-gray-800">
            {i18n.t('post.condition')}
          </Text>
          <Controller
            control={control}
            name="condition"
            render={({ field: { onChange, value } }) => (
              <View className="flex-row gap-4">
                <Pressable
                  className={`flex-1 items-center rounded-xl py-3 ${
                    value === 'new'
                      ? 'border-[1px] border-primary bg-btn_bg'
                      : 'border-[1px] border-gray-200 bg-white'
                  }`}
                  onPress={() => onChange('new')}>
                  <Text
                    className={`font-poppinsSemiBold text-lg ${value === 'new' ? 'text-primary' : 'text-gray-600'}`}>
                    {i18n.t('post.new')}
                  </Text>
                </Pressable>
                <Pressable
                  className={`flex-1 items-center rounded-lg py-3 ${
                    value === 'used'
                      ? 'border-[1px] border-primary bg-btn_bg'
                      : 'border-[1px] border-gray-200 bg-white'
                  }`}
                  onPress={() => onChange('used')}>
                  <Text
                    className={`font-poppinsSemiBold text-lg ${value === 'used' ? 'text-primary' : 'text-gray-600'}`}>
                    {i18n.t('post.used')}
                  </Text>
                </Pressable>
              </View>
            )}
          />
        </View>

        <View className="mb-6">
          <Text placement={locale} className="mb-2 text-base font-semibold text-gray-800">
            {i18n.t('post.price')}
          </Text>
          <Controller
            control={control}
            name="price"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="rounded-lg border border-gray-200 bg-white p-4"
                onChangeText={onChange}
                value={value}
                placeholder="0.00"
                keyboardType="decimal-pad"
                textAlign="right"
              />
            )}
          />
          {errors.price && (
            <Text className="mt-1 text-sm text-red-500">{errors.price.message}</Text>
          )}
        </View>

        <View className="mb-6">
          <Text placement={locale} className="mb-2 text-base font-semibold text-gray-800">
            {i18n.t('post.description')}
          </Text>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="h-32 rounded-lg border border-gray-200 bg-white p-3 text-base"
                onChangeText={onChange}
                value={value}
                placeholder={i18n.t('post.descriptionPlaceholder')}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            )}
          />
          {errors.description && (
            <Text className="mt-1 text-sm text-red-500">{errors.description.message}</Text>
          )}
        </View>
        <LocationInput control={control} errors={errors} ref={locationRef} />
        {/* <View className="mb-6">
          <Text placement={locale} className="mb-2 text-base font-semibold text-gray-800">
            {i18n.t('post.location')}
          </Text>
          <Controller
            control={control}
            name="location"
            render={({ field: { onChange, value } }) => (
              <CustomDropdown
                value={value}
                data={locations}
                onChange={onChange}
                placeholder={i18n.t('post.locationPlaceholder')}
              />
            )}
          />
          {errors.location && (
            <Text className="mt-1 text-sm text-red-500">{errors.location.message}</Text>
          )}
        </View> */}

        <View className="mb-6">
          <Text placement={locale} className="mb-2 text-base font-semibold text-gray-800">
            {i18n.t('post.timePeriod')}
          </Text>
          <Controller
            control={control}
            name="timePeriod"
            render={({ field: { onChange, value } }) => (
              <SelectPicker
                value={value}
                data={timePeriods?.map((ite: any) => {
                  return {
                    label: ite,
                    value: ite,
                  };
                })}
                placeholder={`${i18n.t('post.timePeriodPlaceholder')}`}
                onSelect={onChange}
              />
            )}
          />
          {errors.timePeriod && (
            <Text className="mt-1 text-sm text-red-500">{errors.timePeriod.message}</Text>
          )}
        </View>
        {watch('properties')?.length > 0 && (
          <View className="mb-6">
            {watch('properties')?.map((prop: any, index: number) => (
              <View key={index} className="mb-4">
                <Text className="mb-2 text-base font-semibold text-gray-800">{prop.name}</Text>
                <TextInput
                  className="rounded-lg border border-gray-200 bg-white p-4"
                  onChangeText={(text) => handlePropertyChange(prop.name, text)}
                  value={prop.value}
                  placeholder={`Enter ${prop.name}`}
                />
              </View>
            ))}
          </View>
        )}
      </KeyboardAwareScrollView>
      <View className=" flex-row gap-4">
        <Pressable
          className="flex-1 flex-row items-center justify-center gap-1 rounded-lg bg-primary py-4"
          onPress={() => {
            router.push({
              pathname: routes.tabs.preview_post,
              params: {
                headerTitle: 'post.previewAd',
                data: JSON.stringify({
                  ...watch(),
                  categoryName: categories?.find((item: any) => item?.uuid === watch('category'))
                    ?.title,
                  subCategoryName: subCategories?.find(
                    (item: any) => item?.uuid === watch('subCategory')
                  )?.title,
                  isEdit,
                  ...(postDetails && { uuid: postDetails?.data?.uuid }),
                }),
              },
            });
          }}>
          <Text className="text-base font-semibold text-white">{i18n.t('post.continue')}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AddPost;
