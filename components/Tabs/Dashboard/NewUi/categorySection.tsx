import { Href, router } from 'expo-router';
import { ScrollView, Image, TouchableOpacity } from 'react-native';
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

  const chunkArray = (arr: any[], size: number) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const groupedData = chunkArray(shuffled, 2);

  return (
    <View className="mt-5 px-4">
      <View className="mb-5 flex flex-row items-center justify-between">
        <Text className="font-poppinsSemiBold text-xl tracking-tight text-gray-900">
          Browse Categories
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="-mx-4 px-4"
        contentContainerStyle={{ paddingRight: 12 }}>
        <View className="flex-row gap-x-4 pb-2">
          {groupedData.map((group: any, columnIndex: number) => (
            <View key={columnIndex} className="flex-col gap-y-2">
              {group.map((cat: any, index: number) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    router.push({
                      pathname: routes.tabs.category,
                      params: { category: cat.uuid },
                    } as Href);
                  }}
                  style={{ height: 118 }}
                  className="items-center justify-start p-1">
                  <View className="h-20 w-20 items-center justify-center rounded-[24px] border border-gray-100 bg-white">
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
                    style={{ height: 30 }}
                    className="mt-2 w-20 text-center font-poppinsMedium text-[11px] leading-tight text-gray-800"
                    numberOfLines={2}>
                    {cat.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
