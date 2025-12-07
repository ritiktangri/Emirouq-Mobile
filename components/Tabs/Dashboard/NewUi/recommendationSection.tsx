// components/Marketplace.tsx
import { Ionicons } from '@expo/vector-icons';
import { Href, router } from 'expo-router';
import { Image, FlatList, TouchableOpacity } from 'react-native';
import { Text } from '~/components/common/Text';
import { View } from '~/components/common/View';
import { noData } from '~/image';
import { toCurrency } from '~/utils/helper';
import { routes } from '~/utils/routes';
import AddToFavourite from '../AddToFavourite';
const RenderProductCard = ({ item, user }: any) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(routes.tabs.singlePost(item?.uuid) as Href);
      }}
      className=" ml-4  w-56 overflow-hidden rounded-2xl border border-gray-300 bg-white  p-3">
      <View className="relative">
        <Image
          source={{ uri: item.file?.[0] }}
          className="h-28 w-full rounded-lg"
          resizeMode="stretch"
        />
        {user && <AddToFavourite item={item} />}

        {item.featuredAd.isFeatured && (
          <View className="absolute bottom-2 left-2 rounded-md bg-yellow-400 px-2 py-1">
            <Text className="text-xs font-medium text-black">Featured</Text>
          </View>
        )}
      </View>
      <View className="p-3">
        <Text className="text-sm font-semibold text-gray-900" numberOfLines={1}>
          {item.title}
        </Text>
        <Text className="mt-1 text-base font-bold text-black">{toCurrency(item.price)}</Text>

        <Text className="flex-1 font-interMedium text-xs text-gray-600" numberOfLines={1}>
          {item.location.name}
        </Text>
        <View className="mt-2 flex flex-row items-center self-start rounded-full bg-primary px-3 ">
          <Text className=" text-sm font-medium uppercase text-white">{item.condition}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const renderSectionHeader = (title: string, categoryId: any) => (
  <View className="mb-3 mt-6 flex-row items-center justify-between px-4">
    <Text className="text-xl font-bold text-gray-900">{title}</Text>
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: routes.tabs.post_list,
          params: { tag: 'search', category: categoryId },
        } as Href);
      }}>
      <Text className="text-sm font-medium text-primary">See more</Text>
    </TouchableOpacity>
  </View>
);
const renderHorizontalSection = (section: any, user: any) => (
  <View key={section.title} className="mb-2">
    {renderSectionHeader(section.title, section.categoryId)}
    <FlatList
      data={section.data}
      renderItem={({ item, index }) => <RenderProductCard item={item} user={user} />}
      keyExtractor={(item) => item.uuid}
      horizontal
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View className="w-1" />}
      ListEmptyComponent={() => (
        <View className="flex w-screen flex-1 items-center justify-center ">
          <Image source={noData} className=" flex h-56 w-56" />
        </View>
      )}
    />
  </View>
);
export default function Marketplace({ data, user }: any) {
  return data?.map((section: any) => renderHorizontalSection(section, user));
}
