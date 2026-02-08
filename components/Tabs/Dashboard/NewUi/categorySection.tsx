import { Href, router } from 'expo-router';
import { ScrollView, Image, TouchableOpacity } from 'react-native';

import { Text } from '~/components/common/Text';
import { View } from '~/components/common/View';
import { routes } from '~/utils/routes';

export default function Categories({ data }: any) {
  return (
    <View className="mt-3 px-2">
      <View className="mb-4 flex flex-row items-center justify-between">
        <Text className="font-poppinsSemiBold text-xl text-gray-900">Browse Categories</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-4 ml-[2px] px-2">
        <View className="flex-row gap-x-3">
          {data?.slice(0, 6).map((cat: any, index: any) => (
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: routes.tabs.category,
                  params: { category: cat.uuid },
                } as Href);
              }}
              key={index}
              className="m-1 w-24 items-center justify-center rounded-2xl bg-gray-50 p-2"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
              }}>
              {/* Icon Container */}
              <View className="mb-3 h-16 w-16 items-center justify-center rounded-xl bg-orange-50">
                <Image
                  source={{ uri: cat.logo }}
                  alt={cat.title}
                  className="h-10 w-10"
                  resizeMode="contain"
                />
              </View>

              {/* Category Label */}
              <Text
                className="text-center font-poppinsMedium text-xs text-gray-700"
                numberOfLines={2}>
                {cat.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
