// components/Categories.tsx
import { ScrollView, Image, TouchableOpacity } from 'react-native';
import { Text } from '~/components/common/Text';
import { View } from '~/components/common/View';
import { car, phone, property } from '~/image';

const categories = [
  { label: 'Phone', icon: phone },
  { label: 'Vehicles', icon: car },
  { label: 'Property', icon: property },
  { label: 'Fashion', icon: phone },
];

export default function Categories() {
  return (
    <View className="mt-6 ">
      <View className="flex flex-row items-center">
        <Text className="mb-3 flex-1 px-5 font-poppinsSemiBold text-lg">Browse Categories</Text>
        <Text className="mb-3 px-5 font-poppinsMedium text-sm text-primary">See All</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((cat, index) => (
          <TouchableOpacity key={index} className="mx-5 flex items-center justify-center">
            <View className="mb-1 h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <Image
                source={cat.icon}
                alt={cat.label}
                className="h-16 w-16 rounded-full"
                resizeMode="contain"
              />
            </View>
            <Text className="ml-2 font-poppinsMedium text-gray-700">{cat.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
