/* eslint-disable import/order */
import { TextInput, Pressable, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomDropdown from '~/components/UI/CustomDropdown';
import SelectPicker from '~/components/UI/SelectPicker';
import { Image as ExpoImage } from 'expo-image';
import { useCategory } from '~/context/CategoryContext';
import { usePosts } from '~/context/PostContext';
import { useAuth } from '~/context/AuthContext';
import { useRouter } from 'expo-router';
import { routes } from '~/utils/routes';
import { useTheme } from '~/context/ThemeContext';
import { View } from '~/components/common/View';
import { Text } from '~/components/common/Text';
import { useLocale } from '~/context/LocaleContext';
import { i18n } from '~/utils/i18n';

const schema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  category: z.string().min(1, 'Please select a category'),
  subCategory: z.string().min(1, 'Please select a subCategory'),
  condition: z.enum(['new', 'used']),
  price: z.string().min(1, 'Price is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  location: z.string().min(1, 'Location is required'),
  timePeriod: z.string().min(1, 'Time period is required'),
});

type FormData = z.infer<typeof schema>;

const locations = [
  'New York, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Houston, TX',
  'Phoenix, AZ',
  'Philadelphia, PA',
];

const timePeriods = ['7 days', '14 days', '30 days', '60 days', '90 days'];

const AddPost = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      condition: 'new',
    },
  });
  const router: any = useRouter();
  const { locale } = useLocale();
  const { categories, getSubCategoryList, subCategories }: any = useCategory();
  const { createPost, btnLoading }: any = usePosts();
  const { user }: any = useAuth();
  const { showToast }: any = useTheme();
  const [properties, setProperties] = useState([]);

  const selectedCategory = watch('category');
  const selectedSubCategory = watch('subCategory');

  useLayoutEffect(() => {
    if (!user?._id) {
      //navigate to login
    } else if (user?._id && !user?.userHandle) {
      router.push(routes.tabs.create_profile);
      //navigate to create profile
    }
  }, [user]);
  useEffect(() => {
    if (selectedCategory) {
      getSubCategoryList(selectedCategory);
    }
  }, [selectedCategory]);

  const [images, setImages] = useState<string[]>([]);

  const onSubmit = (data: any) => {
    delete data?.category;
    const body = { ...data, properties };
    router.push(routes.tabs.preview_post, { params: { data: JSON.stringify(body) } });
    // createPost({ ...data, properties, images }, () => {
    //   showToast('Post added successfully!', 'success');
    // });
  };

  const pickImages = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      aspect: [4, 3],
      quality: 0.8,
      base64: true,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setImages(result.assets.map((asset: any) => asset));
    }
  };

  const handlePropertyChange = (name: string, text: string) => {
    setProperties((prevProperties: any) =>
      prevProperties.map((prop: any) => (prop.name === name ? { ...prop, value: text } : prop))
    );
  };
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-white px-4 py-6">
      <View className="mb-8">
        <Pressable
          className="items-center justify-center rounded-xl border-2 border-dashed border-gray-200 p-6"
          onPress={pickImages}>
          <Feather name="camera" size={24} className="text-primary" />
          <Text className="mb-4 mt-3 text-base text-gray-600">{i18n.t('post.uploadText')}</Text>
          <Pressable className="rounded-full border border-primary bg-white px-6 py-3">
            <Text className="text-base font-semibold text-primary">
              {i18n.t('post.chooseFile')}
            </Text>
          </Pressable>
        </Pressable>
        {images.length > 0 && (
          <View className="mt-4 flex-row flex-wrap gap-2">
            {images.map((uri: any, index) =>
              uri?.uri ? (
                <View key={index} className="relative h-[75px] w-[75px] rounded-full">
                  <ExpoImage
                    source={{ uri: uri?.uri }}
                    contentFit="fill"
                    placeholder={{ blurhash: 'LEHV6nWB2yk8pyo0adR*.7kCMdnj' }}
                    transition={1000}
                    style={{
                      height: '100%',
                      width: '100%',
                      borderRadius: 10,
                    }}
                  />
                </View>
              ) : (
                <View
                  key={index}
                  className="h-20 w-20 items-center justify-center rounded-lg bg-gray-100">
                  <Text>Image {index + 1}</Text>
                </View>
              )
            )}
          </View>
        )}
      </View>

      <View className="mb-6">
        <Text className="mb-2 text-base font-semibold text-gray-800">{i18n.t('post.title')}</Text>
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
        {errors.title && <Text className="mt-1 text-sm text-red-500">{errors.title.message}</Text>}
      </View>
      <View className="mb-6">
        <Text className="mb-2 text-base font-semibold text-gray-800">
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
      {selectedCategory ? (
        <View className="mb-6">
          <Text className="mb-2 text-base font-semibold text-gray-800">
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
                    if (selectedItem && setProperties) {
                      setProperties(
                        selectedItem?.properties?.map((ite: any) => {
                          return { name: ite, value: '' };
                        })
                      );
                    } else {
                      setProperties([]);
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
        <Text className="mb-2 text-base font-semibold text-gray-800">
          {i18n.t('post.condition')}
        </Text>
        <Controller
          control={control}
          name="condition"
          render={({ field: { onChange, value } }) => (
            <View className="flex-row gap-4">
              <Pressable
                className={`flex-1 items-center rounded-lg py-3 ${
                  value === 'new' ? 'bg-primary' : 'bg-gray-100'
                }`}
                onPress={() => onChange('new')}>
                <Text
                  className={`text-base font-semibold ${
                    value === 'new' ? 'text-white' : 'text-gray-600'
                  }`}>
                  {i18n.t('post.new')}
                </Text>
              </Pressable>
              <Pressable
                className={`flex-1 items-center rounded-lg py-3 ${
                  value === 'used' ? 'bg-primary' : 'bg-gray-100'
                }`}
                onPress={() => onChange('used')}>
                <Text
                  className={`text-base font-semibold ${
                    value === 'used' ? 'text-white' : 'text-gray-600'
                  }`}>
                  {i18n.t('post.used')}
                </Text>
              </Pressable>
            </View>
          )}
        />
      </View>

      <View className="mb-6">
        <Text className="mb-2 text-base font-semibold text-gray-800">{i18n.t('post.price')}</Text>
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
            />
          )}
        />
        {errors.price && <Text className="mt-1 text-sm text-red-500">{errors.price.message}</Text>}
      </View>

      <View className="mb-6">
        <Text className="mb-2 text-base font-semibold text-gray-800">
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
      <View className="mb-6">
        <Text className="mb-2 text-base font-semibold text-gray-800">
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
      </View>

      <View className="mb-6">
        <Text className="mb-2 text-base font-semibold text-gray-800">
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
      {properties.length > 0 && (
        <View className="mb-6">
          {properties.map((prop: any, index) => (
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
      <View className="mb-8 flex-row gap-4">
        <Pressable
          className="flex-1 items-center rounded-lg bg-gray-100 py-4"
          onPress={() => console.log('Save draft')}>
          <Text className="text-base font-semibold text-gray-700">{i18n.t('post.saveDraft')}</Text>
        </Pressable>

        <Pressable
          className="flex-1 flex-row items-center justify-center gap-1 rounded-lg bg-primary py-4"
          // onPress={handleSubmit(onSubmit)}>
          onPress={() => {
            router.push(routes.tabs.preview_post);
          }}>
          {btnLoading ? <ActivityIndicator size="small" color={'white'} /> : <></>}
          <Text className="text-base font-semibold text-white">{i18n.t('post.continue')}</Text>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AddPost;
