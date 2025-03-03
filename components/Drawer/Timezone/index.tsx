/* eslint-disable import/order */
import {
  View,
  TouchableOpacity,
  Dimensions,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { useAuth } from '~/context/AuthContext';
import { useModalize } from 'react-native-modalize';
import { timezones } from './timezone';
import { Feather, Ionicons } from '@expo/vector-icons';
import Modalize from '~/components/Modalize';
import { DefaultText as Text } from '~/components/common/DefaultText';
import CustomHeader from '~/components/UI/CustomHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

const Timezone = () => {
  const { user, updateProfile, btnLoading } = useAuth();
  const { ref, open, close }: any = useModalize();
  const [timezone, setTimezone] = useState(user?.timeZone);
  const [keyword, setKeyword] = useState('');
  const { height, width } = Dimensions.get('screen');
  const isLandscape = width > height;
  const colorScheme = useColorScheme();

  const onUpdateTimezone = async () => {
    updateProfile(
      {
        body: {
          timeZone: timezone,
        },
      },
      () => {}
    );
  };
  return (
    <SafeAreaView className="flex-1 bg-white px-4 dark:bg-drawer">
      <CustomHeader />
      <View className=" flex-1 justify-between">
        <View className="mb-6 mt-3">
          <Text className="mb-1 text-2xl font-semibold dark:text-white">Timezone</Text>
          <Text className="text-tertiary">Here you can set your timezone</Text>
          <View className="h-[70px]">
            <Modalize
              isSearch
              setKeyword={setKeyword}
              onClose={close}
              isExpanded={'timezone'}
              modalTopOffset={isLandscape ? 10 : 200}
              ref={ref}
              icon={
                <TouchableOpacity
                  onPress={open}
                  className=" flex-row items-center  rounded-md border-[0.5px] border-gray-300 p-3">
                  <View className="flex-1 flex-row items-center gap-x-2">
                    <Feather
                      name="clock"
                      size={20}
                      color={colorScheme === 'dark' ? 'white' : 'black'}
                    />
                    <Text className="flex-1 font-interMedium dark:text-white">{timezone}</Text>
                  </View>
                  <Ionicons
                    name="chevron-down"
                    size={24}
                    color={colorScheme === 'dark' ? 'white' : 'black'}
                  />
                </TouchableOpacity>
              }
              title="Select Timezone"
              onSelect={(value: any, key: any) => {
                setTimezone(key);
              }}
              text=""
              data={[
                {
                  id: 'timezone',
                  heading: '',
                  data: timezones
                    ?.filter((ite) => ite?.value?.toLowerCase()?.includes(keyword?.toLowerCase()))
                    ?.slice(0, 15)
                    ?.map((val, idx) => {
                      return {
                        id: idx?.toString(),
                        ...val,
                      };
                    }),
                },
              ]}
            />
          </View>
        </View>
        <TouchableOpacity
          className=" mb-8 mt-2 flex-row justify-center gap-x-2 rounded-lg bg-primary p-3"
          onPress={() => {
            onUpdateTimezone();
            //   router.push('/(hydrogen)/(accounts)/page');
          }}>
          {btnLoading && <ActivityIndicator />}
          <Text className="text-center font-semibold text-white">Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Timezone;
