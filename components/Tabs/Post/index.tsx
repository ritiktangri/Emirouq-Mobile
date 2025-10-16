/* eslint-disable import/order */
import { TextInput, Pressable, Image, Platform, Alert, TouchableOpacity, View } from 'react-native';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useRef } from 'react';
import { Feather, Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SelectPicker from '~/components/UI/SelectPicker';
import { useCategory } from '~/context/CategoryContext';
import { useAuth } from '~/context/AuthContext';
import { useFocusEffect, useGlobalSearchParams, useRouter } from 'expo-router';
import { routes } from '~/utils/routes';
import { useTheme } from '~/context/ThemeContext';
import { Text } from '~/components/common/Text';
import { useLocale } from '~/context/LocaleContext';
import { i18n } from '~/utils/i18n';
import LocationInput from '~/components/UI/GooglePlaceAutocomplete';
import { useGetSinglePosts } from '~/hooks/post/query';
import { saveFileLocally, screenHeight } from '~/utils/helper';
import { useIsSubscribedForCategory } from '~/hooks/stripe/query';
import RBSheet from 'react-native-raw-bottom-sheet';
import SubscriptionPlanList from '~/components/Stripe/subscriptionPlanList';
import { useGetAttributes } from '~/hooks/attributes/query';
import CheckValidation from '~/components/CheckValidation';
import { SelectField } from './selectField';

const schema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  category: z.string().min(1, 'Please select a category'),
  subCategory: z.string().min(1, 'Please select a subCategory'),
  condition: z.enum(['new', 'used']),
  price: z.string().min(1, 'Price is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  location: z.object({
    name: z.string().min(1, 'Location is required'),
    placeId: z.string().min(1, 'Place ID is required'),
  }),
  timePeriod: z.any().optional(),
  images: z
    .array(
      z.object({
        uri: z.string().min(1, 'Image URI is required'),
        uuid: z.string().min(1, 'Image UUID is required'),
        name: z.string().min(1, 'Image name is required'),
        type: z.string().min(1, 'Image type is required'),
      })
    )
    .min(1, 'Please upload at least one image'),
  properties: z.array(
    z.object({
      uuid: z.string().min(1, 'UUID is required'),
      label: z.string().min(1, 'Label is required'),
      filterType: z.string(),
      dependsOn: z.string().optional(),
      attributeKey: z.string(),
      selectedValue: z.union([
        z.object({
          value: z.string(),
          id: z.string(),
        }),
        z.array(
          z.object({
            value: z.string(),
            id: z.string(),
          })
        ),
      ]),
    })
  ),
});

type FormData = z.infer<typeof schema>;

const AddPost = () => {
  const {
    control,
    formState: { errors },
    watch,
    setValue,
    reset,
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      condition: 'new',
      title: '',
      category: '',
      subCategory: '',
      price: '',
      description: '',
      location: {
        name: '',
        placeId: '',
      },
      timePeriod: '7 days',
      images: [],
      properties: [],
    },
  });
  const router: any = useRouter();
  const { locale } = useLocale();
  const refRBSheet: any = useRef(null);
  const { showToast } = useTheme();
  const { categories, getSubCategoryList, subCategories }: any = useCategory();
  const { user }: any = useAuth();
  const selectedCategory = watch('category');
  const selectedSubCategory = watch('subCategory');
  //get attributes for the selected sub category

  const { data } = useGetAttributes({ id: selectedSubCategory });
  const { fields, append, update, replace } = useFieldArray({
    control,
    name: 'properties',
  });
  const params: any = useGlobalSearchParams();

  useEffect(() => {
    if (data?.pages?.length && selectedSubCategory && !params?.postId) {
      const attributes = data.pages.flatMap((page: any) => page.data);
      // Replace existing properties with mapped attributes
      replace(
        attributes.map((attr: any) => ({
          uuid: attr.uuid,
          label: attr.label,
          filterType: attr.filterType,
          dependsOn: attr.dependsOn,
          attributeKey: attr.attributeKey,
          selectedValue: attr.filterType === 'checkbox' ? [] : { value: '', id: '' },
        }))
      );
    }
  }, [data && selectedSubCategory, params?.postId]);

  //check if user is subscribed to the selected category
  const isSubscribed: any = useIsSubscribedForCategory(selectedCategory);
  const locationRef: any = useRef(null);
  const { data: postDetails }: any = useGetSinglePosts(params?.postId);
  const singlePost = postDetails?.data;

  useEffect(() => {
    if (singlePost) {
      const currentText = locationRef.current.getAddressText();
      if (currentText !== singlePost?.location?.name) {
        locationRef.current.setAddressText(singlePost?.location?.name);
      }

      const properties = singlePost.properties;
      reset({
        title: singlePost?.title || '',
        category: singlePost?.category?.uuid || '',
        subCategory: singlePost?.subCategory?.uuid || '',
        condition: singlePost?.condition || '',
        price: singlePost?.price?.toString() || '',
        description: singlePost?.description || '',
        timePeriod: '7 days',
        images:
          singlePost?.file?.map((val: any, index: any) => ({
            uri: val,
            uuid: val,
            name: val,
            type: val?.split('.')?.[val?.split('.')?.length - 1],
          })) || [],
        location: {
          name: singlePost?.location?.name || '',
          placeId: singlePost?.location?.placeId || '',
        },
        properties,
      });
    }
  }, [params?.postId, singlePost]);
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

    // if (isIncluded) {
    //   const filterImages = watch('images')?.filter(
    //     (item: any) => !assetIds?.includes(item?.uuid || item?.name)
    //   );
    //   setValue('images', [...filterImages, ...formattedAssets]);
    // } else {

    if (Platform.OS === 'ios') {
      setValue('images', [...watch('images'), ...formattedAssets]);
    }
    if (Platform.OS === 'android') {
      const res = await saveFileLocally(formattedAssets);
      setValue('images', res);
    }

    // }
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

  const onConfirm = async (data: any) => {
    if (!user?._id) {
      return router.push({
        pathname: routes.auth.auth,
      });
    }

    if (!isSubscribed?.data?.isSubscribed) {
      if (isSubscribed?.data?.subscriptionPlan?.length === 0) {
        return console.log('no subscription plan available');
      }
      return refRBSheet.current.open();
    }
    router.push({
      pathname: routes.tabs.preview_post,
      params: {
        headerTitle: 'post.previewAd',
        data: JSON.stringify({
          ...watch(),
          categoryName: categories?.find((item: any) => item?.uuid === watch('category'))?.title,
          subCategoryName: subCategories?.find((item: any) => item?.uuid === watch('subCategory'))
            ?.title,
          isEdit: !!postDetails?.data?.uuid,
          ...(postDetails && { uuid: postDetails?.data?.uuid }),
        }),
      },
    });
  };
  return (
    <View className="flex-1 bg-white px-4 " style={{}}>
      <TouchableOpacity
        className="pb-4"
        onPress={async () => {
          // here we are leaving the conversation
          router.back();
          reset();
        }}>
        <Ionicons name="arrow-back-sharp" size={24} color="black" />
      </TouchableOpacity>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-3">
        <View className="">
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
            <View className="mt-4 flex-row flex-wrap gap-1">
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
          {errors.images && (
            <Text className="mt-1 text-sm text-red-500">{errors.images.message}</Text>
          )}
        </View>

        <View className="gap-1">
          <Text placement={locale} className=" text-base font-semibold text-gray-800">
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
        <View className="gap-1">
          <Text placement={locale} className=" text-base font-semibold text-gray-800">
            {i18n.t('post.category')}
          </Text>
          <Controller
            control={control}
            name="category"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
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
                {error && <Text className="mt-1 text-sm text-red-500">{error.message}</Text>}
              </>
            )}
          />
        </View>
        {selectedCategory && subCategories?.length ? (
          <View className="gap-1">
            <Text placement={locale} className=" text-base font-semibold text-gray-800">
              {i18n.t('post.subCategory')}
            </Text>
            <Controller
              control={control}
              name="subCategory"
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <View>
                  <SelectPicker
                    value={value}
                    data={subCategories?.map((ite: any) => {
                      return {
                        label: ite?.title,
                        value: ite?.uuid,
                        key: ite?.uuid,
                      };
                    })}
                    placeholder={i18n.t('post.subCategoryPlaceholder')}
                    onSelect={(e: any) => {
                      // const selectedItem = subCategories.find(
                      //   (item: any) => item.uuid === selectedSubCategory
                      // );

                      onChange(e);
                      setValue('properties', []);
                    }}
                  />
                  {error && <Text className="mt-1 text-sm text-red-500">{error.message}</Text>}
                </View>
              )}
            />
          </View>
        ) : null}

        <View className="gap-1">
          <Text placement={locale} className=" text-base font-semibold text-gray-800">
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

        <View className="gap-1">
          <Text placement={locale} className=" text-base font-semibold text-gray-800">
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
        <LocationInput control={control} ref={locationRef} />

        <View className=" mb-6 gap-1">
          <Text placement={locale} className=" text-base font-semibold text-gray-800">
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

        {/* Dynamic Attributes will be shown here */}
        {fields.map((field, index) => (
          <View key={field.id} className="mb-2 gap-1">
            <Text className="text-base font-semibold text-gray-800">{field.label}</Text>

            <CheckValidation isValid={['text', 'number'].includes(field.filterType)}>
              <Controller
                control={control}
                name={`properties.${index}.selectedValue`}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="rounded-lg border border-gray-200 bg-white p-4"
                    onChangeText={(value) => {
                      onChange({
                        value,
                        id: value,
                      });
                    }}
                    value={Array.isArray(value) ? '' : value.value}
                    placeholder={`Enter ${field.label}`}
                  />
                )}
              />
            </CheckValidation>

            <CheckValidation isValid={['select', 'checkbox']?.includes(field.filterType)}>
              <SelectField
                control={control}
                attributeId={field.uuid}
                filterType={field.filterType}
                parentId={(() => {
                  const found = watch('properties')?.find((prop) => {
                    const selectedValue = prop.selectedValue;
                    if (Array.isArray(selectedValue)) {
                      return selectedValue.length > 0 && prop.label === field.dependsOn;
                    } else {
                      return selectedValue.value && prop.label === field.dependsOn;
                    }
                  });
                  if (!found) return undefined;
                  if (Array.isArray(found.selectedValue)) {
                    // Return the id of the first selected value if exists
                    return found.selectedValue[0]?.id;
                  }
                  return found.selectedValue?.id;
                })()}
                name={`properties.${index}.selectedValue`}
                label={field.label}
                dependsOn={field.dependsOn}
                onSelect={() => {
                  const list: any = watch('properties')?.map((i) => {
                    if (i?.dependsOn === field?.label) {
                      return {
                        ...i,
                        selectedValue: {},
                      };
                    }
                    return i;
                  });
                  setValue('properties', list);
                }}
              />
            </CheckValidation>
          </View>
        ))}
      </KeyboardAwareScrollView>
      <View className=" flex-row gap-4">
        <TouchableOpacity
          className="flex-1 flex-row items-center justify-center gap-1 rounded-lg bg-primary py-4"
          onPress={handleSubmit(onConfirm)}>
          <Text className="text-base font-semibold text-white">{i18n.t('post.continue')}</Text>
        </TouchableOpacity>
      </View>
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
        }}>
        <SubscriptionPlanList
          categoryId={selectedCategory}
          cb={() => {
            refRBSheet.current.close();
            showToast('Your subscription has been activated.', 'success', 1500);
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
                  isEdit: !!postDetails?.data?.uuid,
                  ...(postDetails && { uuid: postDetails?.data?.uuid }),
                }),
              },
            });
          }}
          list={isSubscribed?.data?.subscriptionPlan || []}
        />
      </RBSheet>
    </View>
  );
};

export default AddPost;
