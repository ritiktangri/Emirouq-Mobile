import { Href, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import Search from '~/components/Tabs/Search';
import { useCategory } from '~/context/CategoryContext';
import { routes } from '~/utils/routes';

export default function Page() {
  const { categories, getSubCategoryList, subCategories, subCategoryLoading }: any = useCategory();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(categories?.[0]?.uuid);

  useEffect(() => {
    if (selectedCategory) {
      getSubCategoryList(selectedCategory);
    }
  }, [selectedCategory]);

  return (
    <View className="flex-1 flex-row bg-white">
      <Search />
      {/* Left - Category List */}
      {/* <FlatList
        data={categories}
        keyExtractor={(item) => item?.uuid}
        renderItem={({ item }) => (
          <TouchableOpacity
            className={` p-3 ${
              selectedCategory === item?.uuid ? 'border-l-4 border-orange-500 bg-white' : ''
            }`}
            onPress={() => setSelectedCategory(item?.uuid)}>
            <Text className={`text-sm ${item?.uuid == selectedCategory ? 'font-semibold' : ''}`}>
              {item?.title}
            </Text>
          </TouchableOpacity>
        )}
        className="w-1/3 bg-gray-100"
        showsVerticalScrollIndicator={false}
      /> */}

      {/* Right - Subcategory Grid */}
      {/* <FlatList
        data={subCategories}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="mb-4 w-[33%] items-center"
            onPress={() => {
              router.push({
                pathname: routes.tabs.post_list,
                params: {
                  tag: 'search',
                },
              } as Href);
            }}>
            {item.image ? (
              <Image
                source={{ uri: item.image }}
                className="h-16 w-16 rounded-full"
                resizeMode="cover"
              />
            ) : (
              <View className="h-12 w-12 flex-row items-center justify-center rounded-full bg-primary">
                <Text className="text-lg font-semibold text-white">
                  {item?.title?.charAt(0)?.toUpperCase()}
                </Text>
              </View>
            )}
            <Text className="mt-1 text-center text-xs font-[500]">{item.title}</Text>
          </TouchableOpacity>
        )}
        numColumns={3}
        className="mt-2 w-2/3 px-2"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="">
            <Text className="text-gray-500">
              {selectedCategory && subCategoryLoading
                ? 'Loading...'
                : selectedCategory && subCategories?.length == 0
                  ? 'No product found!'
                  : 'Select category to search...'}
            </Text>
          </View>
        }
      /> */}
    </View>
  );
}
