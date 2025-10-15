import { ScrollView, Image, TouchableOpacity } from 'react-native';

import { Text } from '~/components/common/Text';
import { View } from '~/components/common/View';

export default function Categories({ data }: any) {
  return (
    <View className="mt-6 ">
      <View className="flex flex-row items-center">
        <Text className="mb-3 flex-1 px-5 font-poppinsSemiBold text-lg">Browse Categories</Text>
        <Text className="mb-3 px-5 font-poppinsMedium text-sm text-primary">See All</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data?.map((cat: any, index: any) => (
          <TouchableOpacity key={index} className="mx-5 flex items-center justify-center">
            <View className="mb-1 h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <Image
                source={{ uri: cat.logo }}
                alt={cat.title}
                className="h-16 w-16 rounded-full"
                resizeMode="contain"
              />
            </View>
            <Text className="ml-2 max-w-28 truncate font-poppinsMedium text-gray-700">
              {cat.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
