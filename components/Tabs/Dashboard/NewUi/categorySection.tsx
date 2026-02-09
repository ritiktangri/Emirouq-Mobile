import { Href, router } from 'expo-router';
import { ScrollView, Image, TouchableOpacity } from 'react-native';

import { Text } from '~/components/common/Text';
import { View } from '~/components/common/View';
import { routes } from '~/utils/routes';

export default function Categories({ data }: any) {
  return (
    <View className="mt-5 px-4">
      <View className="mb-5 flex flex-row items-center justify-between">
        <Text className="font-poppinsSemiBold text-xl text-gray-900 tracking-tight">
          Browse Categories
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="-mx-4 px-4"
        contentContainerStyle={{ paddingRight: 20 }}
      >
        <View className="flex-row gap-x-4 pb-2">
          {data?.slice(0, 6).map((cat: any, index: any) => (
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: routes.tabs.category,
                  params: { category: cat.uuid },
                } as Href);
              }}
              key={index}
              className="items-center justify-center p-1"
            >
              <View
                className="h-20 w-20 items-center justify-center rounded-[24px] bg-white border border-gray-100"

              >
                <View className="h-16 w-16 items-center justify-center rounded-2xl bg-gray-50/80">
                  <Image
                    source={{ uri: cat.logo }}
                    alt={cat.title}
                    className="h-14 w-14"
                    resizeMode="contain"
                  />
                </View>
              </View>

              <Text
                className="mt-2 text-center font-poppinsMedium text-[11px] text-gray-800 leading-tight w-20"
                numberOfLines={2}
              >
                {cat.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
