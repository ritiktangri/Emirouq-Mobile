import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';

export default function PromoBanner() {
  return (
    <View className="bg-white px-4 py-4">
      <View className="overflow-hidden rounded-lg border-2 border-purple-500">
        <ImageBackground
          source={{ uri: '/two-people-in-car-smiling.jpg' }}
          className="h-48 justify-end p-4"
          resizeMode="cover">
          <View className="rounded-lg bg-black/50 p-3">
            <Text className="text-xl font-bold text-white">BELI MOBIL BEKAS</Text>
            <Text className="text-xl font-bold text-white">BERKUALITAS</Text>
            <TouchableOpacity className="mt-2 self-start rounded-md bg-blue-600 px-4 py-2">
              <Text className="font-semibold text-white">CARI DISINI</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}
