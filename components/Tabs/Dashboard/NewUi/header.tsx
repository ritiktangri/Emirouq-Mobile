// components/LocationHeader.tsx
import { AntDesign, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { Href, router } from 'expo-router';
import React, { useRef } from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Text } from '~/components/common/Text';
import { View } from '~/components/common/View';
import { useAuth } from '~/context/AuthContext';
import { cn, screenHeight } from '~/utils/helper';
import { routes } from '~/utils/routes';

export default function Header({ user }: any) {
  const { city, setCity } = useAuth();
  const refRBSheet = useRef<any>(null);

  const cities = React.useMemo(
    () => [
      { label: 'Dubai', value: 'Dubai', uuid: 'Dubai' },
      { label: 'Abu Dhabi', value: 'Abu Dhabi', uuid: 'Abu Dhabi' },
      { label: 'Sharjah', value: 'Sharjah', uuid: 'Sharjah' },
      { label: 'Ajman', value: 'Ajman', uuid: 'Ajman' },
      { label: 'Umm Al Quwain', value: 'Umm Al Quwain', uuid: 'Umm Al Quwain' },
      { label: 'Ras Al Khaimah', value: 'Ras Al Khaimah', uuid: 'Ras Al Khaimah' },
      { label: 'Fujairah', value: 'Fujairah', uuid: 'Fujairah' },
    ],
    []
  );

  return (
    <View className="mx-4 mt-4 flex-row items-center justify-between">
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => refRBSheet.current?.open()}
        className="flex flex-row items-center gap-2">
        <SimpleLineIcons name="location-pin" size={25} color="black" />
        <View>
          <Text className="font-poppinsMedium text-sm text-gray-500">Location</Text>
          <View className="flex-row items-center gap-1">
            <Text className="font-poppinsSemiBold text-lg text-black">{city || 'Select City'}</Text>
            <Ionicons name="chevron-down" size={16} color="black" />
          </View>
        </View>
      </TouchableOpacity>

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

      <RBSheet
        ref={refRBSheet}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}
        height={screenHeight * 0.6}
        customModalProps={{
          animationType: 'fade',
        }}>
        <View className="flex-1 p-4">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="font-poppinsSemiBold text-xl">Select Location</Text>
            {city ? (
              <TouchableOpacity
                onPress={() => {
                  setCity('');
                  refRBSheet.current?.close();
                }}>
                <Text className="font-poppinsMedium text-primary">Clear</Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="gap-3">
              {cities.map((item) => (
                <TouchableOpacity
                  onPress={() => {
                    setCity(item.value);
                    refRBSheet.current?.close();
                  }}
                  key={item.uuid}
                  className={cn(
                    'flex flex-row items-center rounded-xl p-3',
                    city === item.value ? 'bg-primary/10' : 'bg-gray-50'
                  )}>
                  <Text
                    className={cn(
                      'flex-1 font-poppinsMedium text-base',
                      city === item.value ? 'text-primary' : 'text-black'
                    )}>
                    {item.label}
                  </Text>
                  {city === item.value && <Ionicons name="checkmark" color={'#FF5722'} size={20} />}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </RBSheet>
    </View>
  );
}
