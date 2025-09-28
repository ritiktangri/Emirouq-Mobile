// components/ProductCard.tsx
import { Image } from 'react-native';
import { Text } from '~/components/common/Text';
import { View } from '~/components/common/View';

export default function ProductCard({ item }: { item: any }) {
  return (
    <View className="mb-4 w-[48%] rounded-2xl border border-gray-200 bg-white p-3 ">
      {item.featured && (
        <View className="absolute left-2 top-2 rounded-md bg-yellow-400 px-2 py-1">
          <Text className="text-xs font-semibold text-white">Featured</Text>
        </View>
      )}
      <Image source={{ uri: item.image }} className="h-28 w-full rounded-lg" resizeMode="contain" />
      <Text className="mt-2 text-sm font-semibold">{item.name}</Text>
      <Text className="text-xs text-gray-600">{item.condition}</Text>
      <Text className="mt-1 font-bold">${item.price}</Text>
    </View>
  );
}
