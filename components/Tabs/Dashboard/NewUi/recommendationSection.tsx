// components/Marketplace.tsx
import { Ionicons } from '@expo/vector-icons';
import { Image, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Text } from '~/components/common/Text';
import { View } from '~/components/common/View';
import { noData } from '~/image';
import theme from '~/utils/theme';

const sections = [
  {
    title: 'Featured',
    // data: [
    //   {
    //     id: '1',
    //     name: 'Macbook 14',
    //     price: 'Rs 450,000',
    //     condition: 'New',
    //     rating: '10/10',
    //     image:
    //       'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mba13-midnight-cto-hero-202503?wid=840&hei=498&fmt=jpeg&qlt=90&.v=Q2E5SzQzQ0daYWpuZGNscHpUSFFEZktybEU1S0RNR1JRamRyTlliVTJCd2VSQkVmNWJCc0NzWFZ1VVFQblZWdnZvdUZlR0V0VUdJSjBWaDVNVG95YkVTMzRwekd2aEllbUhqT2JVR2ZFU3M',
    //     date: '22 Sep',
    //     location: 'Gulberg Phase 4, India',
    //     featured: true,
    //   },
    //   {
    //     id: '2',
    //     name: 'Iphone 14 Pro Max',
    //     price: 'Rs 600,000',
    //     condition: 'Used',
    //     rating: '08/10',
    //     image:
    //       'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mba13-midnight-cto-hero-202503?wid=840&hei=498&fmt=jpeg&qlt=90&.v=Q2E5SzQzQ0daYWpuZGNscHpUSFFEZktybEU1S0RNR1JRamRyTlliVTJCd2VSQkVmNWJCc0NzWFZ1VVFQblZWdnZvdUZlR0V0VUdJSjBWaDVNVG95YkVTMzRwekd2aEllbUhqT2JVR2ZFU3M',
    //     date: '22 Sep',
    //     location: 'Gulberg Phase 4, India',
    //     featured: true,
    //   },
    //   {
    //     id: '2a',
    //     name: 'iPad Pro',
    //     price: 'Rs 300,000',
    //     condition: 'New',
    //     rating: '10/10',
    //     image:
    //       'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mba13-midnight-cto-hero-202503?wid=840&hei=498&fmt=jpeg&qlt=90&.v=Q2E5SzQzQ0daYWpuZGNscHpUSFFEZktybEU1S0RNR1JRamRyTlliVTJCd2VSQkVmNWJCc0NzWFZ1VVFQblZWdnZvdUZlR0V0VUdJSjBWaDVNVG95YkVTMzRwekd2aEllbUhqT2JVR2ZFU3M',
    //     date: '21 Sep',
    //     location: 'DHA Phase 5, Lahore',
    //     featured: true,
    //   },
    // ],
  },
  {
    title: 'Cars',
    // data: [
    //   {
    //     id: '3',
    //     name: 'Iphone 14 Pro Max',
    //     price: 'Rs 400,000',
    //     condition: 'New',
    //     rating: '10/10',
    //     image:
    //       'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-1inch-spaceblack?wid=5120&hei=2880&fmt=jpeg&qlt=90&.v=1660753619946',
    //     date: '22 Sep',
    //     location: 'Gulberg Phase 4, India',
    //     featured: true,
    //   },
    //   {
    //     id: '4',
    //     name: 'Iphone 12 Pro Max',
    //     price: 'Rs 200,000',
    //     condition: 'Used',
    //     rating: '08/10',
    //     image:
    //       'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-1inch-spaceblack?wid=5120&hei=2880&fmt=jpeg&qlt=90&.v=1660753619946',
    //     date: '22 Sep',
    //     location: 'Gulberg Phase 4, India',
    //   },
    //   {
    //     id: '4a',
    //     name: 'Samsung Galaxy S24',
    //     price: 'Rs 350,000',
    //     condition: 'New',
    //     rating: '09/10',
    //     image:
    //       'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-1inch-spaceblack?wid=5120&hei=2880&fmt=jpeg&qlt=90&.v=1660753619946',
    //     date: '20 Sep',
    //     location: 'Model Town, Lahore',
    //   },
    // ],
  },
  {
    title: 'Mobile',
    // data: [
    //   {
    //     id: '3',
    //     name: 'Iphone 14 Pro Max',
    //     price: 'Rs 400,000',
    //     condition: 'New',
    //     rating: '10/10',
    //     image:
    //       'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-1inch-spaceblack?wid=5120&hei=2880&fmt=jpeg&qlt=90&.v=1660753619946',
    //     date: '22 Sep',
    //     location: 'Gulberg Phase 4, India',
    //     featured: true,
    //   },
    //   {
    //     id: '4',
    //     name: 'Iphone 12 Pro Max',
    //     price: 'Rs 200,000',
    //     condition: 'Used',
    //     rating: '08/10',
    //     image:
    //       'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-1inch-spaceblack?wid=5120&hei=2880&fmt=jpeg&qlt=90&.v=1660753619946',
    //     date: '22 Sep',
    //     location: 'Gulberg Phase 4, India',
    //   },
    //   {
    //     id: '4a',
    //     name: 'Samsung Galaxy S24',
    //     price: 'Rs 350,000',
    //     condition: 'New',
    //     rating: '09/10',
    //     image:
    //       'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-1inch-spaceblack?wid=5120&hei=2880&fmt=jpeg&qlt=90&.v=1660753619946',
    //     date: '20 Sep',
    //     location: 'Model Town, Lahore',
    //   },
    // ],
  },
  {
    title: 'Nike',
    // data: [
    //   {
    //     id: '9',
    //     name: 'Nike Air Max',
    //     price: 'Rs 25,000',
    //     condition: 'New',
    //     rating: '10/10',
    //     image:
    //       'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png',
    //     date: '21 Sep',
    //     location: 'Liberty Market, Lahore',
    //   },
    //   {
    //     id: '10',
    //     name: 'Nike Metcon',
    //     price: 'Rs 30,000',
    //     condition: 'Used',
    //     rating: '08/10',
    //     image:
    //       'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png',
    //     date: '19 Sep',
    //     location: 'Anarkali Bazaar, Lahore',
    //   },
    // ],
  },
  {
    title: 'Most Viewed',
    // data: [
    //   {
    //     id: '5',
    //     name: 'Iphone 14 Pro Max',
    //     price: 'Rs 400,000',
    //     condition: 'New',
    //     rating: '10/10',
    //     image:
    //       'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png',

    //     location: 'Gulberg Phase 4, India',
    //   },
    //   {
    //     id: '6',
    //     name: 'Macbook Pro',
    //     price: 'Rs 450,000',
    //     condition: 'Used',
    //     rating: '08/10',
    //     image:
    //       'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mba13-midnight-cto-hero-202503?wid=840&hei=498&fmt=jpeg&qlt=90&.v=Q2E5SzQzQ0daYWpuZGNscHpUSFFEZktybEU1S0RNR1JRamRyTlliVTJCd2VSQkVmNWJCc0NzWFZ1VVFQblZWdnZvdUZlR0V0VUdJSjBWaDVNVG95YkVTMzRwekd2aEllbUhqT2JVR2ZFU3M',
    //     date: '22 Sep',
    //     location: 'Gulberg Phase 4, India',
    //   },
    //   {
    //     id: '6a',
    //     name: 'AirPods Pro',
    //     price: 'Rs 75,000',
    //     condition: 'New',
    //     rating: '10/10',
    //     image:
    //       'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MQD83?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1660803972361',
    //     date: '18 Sep',
    //     location: 'MM Alam Road, Lahore',
    //   },
    // ],
  },
  {
    title: 'MotorBikes',
    // data: [
    //   {
    //     id: '7',
    //     name: 'Suzuki Red Dragon',
    //     price: 'Rs 100,000',
    //     condition: 'New',
    //     rating: '10/10',
    //     image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800',
    //     date: '22 Sep',
    //     location: 'Gulberg Phase 4, India',
    //   },
    //   {
    //     id: '8',
    //     name: 'Suzuki Kawasaki',
    //     price: 'Rs 200,000',
    //     condition: 'Used',
    //     rating: '08/10',
    //     image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800',
    //     date: '22 Sep',
    //     location: 'Gulberg Phase 4, India',
    //   },
    //   {
    //     id: '8a',
    //     name: 'Honda CBR',
    //     price: 'Rs 350,000',
    //     condition: 'New',
    //     rating: '10/10',
    //     image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    //     date: '17 Sep',
    //     location: 'Johar Town, Lahore',
    //     featured: true,
    //   },
    // ],
  },
];

export default function Marketplace({ handleRefresh }: any) {
  const renderProductCard = ({ item }: any) => (
    <TouchableOpacity className=" ml-4  w-56 overflow-hidden rounded-2xl border border-gray-300 bg-white  p-3">
      <View className="relative">
        <Image source={{ uri: item.image }} className="h-28 w-full " resizeMode="stretch" />
        <TouchableOpacity className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5">
          <Ionicons name="heart-outline" size={18} color="#666" />
        </TouchableOpacity>
        {item.featured && (
          <View className="absolute bottom-2 left-2 rounded-md bg-yellow-400 px-2 py-1">
            <Text className="text-xs font-medium text-black">Featured</Text>
          </View>
        )}
      </View>
      <View className="p-3">
        <Text className="text-sm font-semibold text-gray-900" numberOfLines={1}>
          {item.name}
        </Text>
        <Text className="mt-1 text-base font-bold text-black">{item.price}</Text>

        <Text className="flex-1 font-interMedium text-xs text-gray-600" numberOfLines={1}>
          {item.location}
        </Text>
        <View className="mt-1 flex flex-row items-center self-start rounded-full bg-gray-300 px-2 py-1">
          <Text className=" text-xs font-medium text-gray-600"> {item.condition}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderSectionHeader = (title: string) => (
    <View className="mb-3 mt-6 flex-row items-center justify-between px-4">
      <Text className="text-xl font-bold text-gray-900">{title}</Text>
      <TouchableOpacity>
        <Text className="text-sm font-medium text-primary">See more</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHorizontalSection = (section: any, handleRefresh: any) => (
    <View key={section.title} className="mb-2">
      {renderSectionHeader(section.title)}
      <FlatList
        data={section.data}
        renderItem={renderProductCard}
        refreshControl={
          <RefreshControl
            colors={[theme.colors.primary]}
            refreshing={false}
            onRefresh={handleRefresh}
            tintColor={theme.colors.primary}
          />
        }
        keyExtractor={(item) => item.id}
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

  return sections.map((section) => renderHorizontalSection(section, handleRefresh));
}
