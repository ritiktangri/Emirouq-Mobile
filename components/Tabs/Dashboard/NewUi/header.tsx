// components/LocationHeader.tsx
import { AntDesign, Ionicons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { Href, router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Text } from '~/components/common/Text';
import { View } from '~/components/common/View';
import { useLocation } from '~/context/LocationContext';
import { routes } from '~/utils/routes';

export default function Header({ user }: any) {
  const { address } = useLocation();
  return (
    <View className="mx-4 mt-4 flex-row items-center justify-between">
      <View className="flex flex-row items-center gap-2">
        <SimpleLineIcons name="location-pin" size={25} color="black" />
        <View>
          <Text className="font-poppinsMedium text-sm text-gray-500">Location</Text>
          <Text className="font-poppinsSemiBold text-lg text-black">
            {address?.city}, {address?.country}
          </Text>
        </View>
      </View>
      {user?.uuid ? (
        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: routes.user.search,
                params: {
                  headerTitle: 'home.search',
                },
              } as Href);
            }}
            className="rounded-lg border border-gray-200 p-2">
            <AntDesign name="search1" size={20} color="black" />
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: routes.tabs.notification,
                params: {
                  headerTitle: 'notification.title',
                },
              } as Href);
            }}
            className="rounded-lg border border-gray-200 p-2">
            <SimpleLineIcons name="bell" size={20} color="black" />
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: routes.tabs.favourites,
                params: {
                  headerTitle: 'notification.title',
                },
              } as Href);
            }}
            className="rounded-lg border border-gray-200 p-2">
            <SimpleLineIcons name="heart" size={20} color="black" />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}
