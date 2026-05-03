import { Href, router } from 'expo-router';
import { Image, TouchableOpacity } from 'react-native';
import { useMemo } from 'react';

import { Text } from '~/components/common/Text';
import { View } from '~/components/common/View';
import { routes } from '~/utils/routes';

export default function Categories({ data }: any) {
  // Shuffle a copy of the array every time the component mounts / data changes
  const shuffled = useMemo(() => {
    if (!data?.length) return [];
    const arr = [...data];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [data]);

  return (
    <View className="mt-5 px-4">
      <View className="mb-5 flex flex-row items-center justify-between">
        <Text className="font-poppinsSemiBold text-xl tracking-tight text-gray-900">
          Browse Categories
        </Text>
        {data?.length > 8 && (
          <TouchableOpacity onPress={() => router.push(routes.tabs.category as Href)}>
            <Text className="font-poppinsMedium text-sm text-primary">See more</Text>
          </TouchableOpacity>
        )}
      </View>

      <View className="flex-row flex-wrap justify-between gap-y-1">
        {shuffled.slice(0, 8).map((cat: any, index: number) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              router.push({
                pathname: routes.tabs.category,
                params: { category: cat.uuid },
              } as Href);
            }}
            style={{ height: 95 }}
            className="w-[23%] items-center justify-start p-1">
            <View className="h-16 w-16 items-center justify-center rounded-[16px] border border-gray-100 bg-white">
              <View className="h-14 w-14 items-center justify-center rounded-2xl bg-gray-50/80">
                <Image
                  source={{ uri: cat.logo }}
                  alt={cat.title}
                  className="h-14 w-14 rounded-[20px]"
                  resizeMode="cover"
                />
              </View>
            </View>

            <Text
              style={{ height: 30 }}
              className="mt-2 w-full text-center font-poppinsMedium text-[11px] leading-tight text-gray-800"
              numberOfLines={2}>
              {cat.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
