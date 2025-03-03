import { View, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import React, { useState } from 'react';
import Input from '~/components/UI/Input';
import Select from '~/components/UI/Select';
import { useAuth } from '~/context/AuthContext';
import { routes } from '~/utils/routes';
import { useRouter } from 'expo-router';
import { useTheme } from '~/context/ThemeContext';
import Modalize from '~/components/Modalize';
import { useModalize } from 'react-native-modalize';
import { timezones } from '~/components/Drawer/Timezone/timezone';
import { Feather, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { DefaultText as Text } from '~/components/common/DefaultText';
import TradeList from './Table';
import AddTradeModal from './AddTradeModal';
import SelectPicker from '~/components/UI/SelectPicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '~/components/UI/CustomHeader';

const AddTradeComponent = () => {
  const { activeAccount } = useAuth();
  const router: any = useRouter();
  const [tab, setTab] = useState(0);
  const { colors } = useTheme();
  const [keyword, setKeyword] = useState('');
  const { ref, open, close }: any = useModalize();
  const [timezone, setTimezone] = useState('');
  const [isModalOpen, setModalOpen] = useState('');
  const [singleTrade, setSingleTrade] = useState({});
  const [selectedValue, setSelectedValue] = useState('');
  const colorScheme = useColorScheme();
  const [tradesList, setTradesList] = useState([
    {
      id: 3848,
      date: '2024-01-31',
      time: '2024-01-31 13:59:03',
      quantity: 3,
      side: 'buy',
      price: 3434,
      commission: 45,
      netPosition: 2,
      contractMultiplier: '100',
      instrument: 'call',
      strike: 3,
    },
  ]);
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <CustomHeader />
      <ScrollView className="flex-1 bg-white p-6 dark:bg-black">
        <Text className="text-2xl font-semibold dark:text-white">Trade Details</Text>
        <Text className="mt-2 leading-normal text-gray-600 dark:text-[#CBD5E2]">
          Use your account time zone when entering trade details
        </Text>
        <SelectPicker
          setData={setSelectedValue}
          // onSelect={(item: any) => {
          //   if (item.value === '') {
          //     router.push(routes.user.account_settings);
          //   }
          // }}
          data={[
            { label: 'Add Account', value: '' },
            ...activeAccount?.accounts?.map((val: any) => {
              return {
                label: val?.accountName,
                value: val?._id,
              };
            }),
          ]}
          title={'Calculation Method'}
          placeholder="Select"
          value={selectedValue}
          iosInputStyle={{
            borderColor: 'gray',
            borderWidth: 1,
          }}
        />
        <View className="mt-3">
          <Text className="mb-1.5 ml-0.5 font-interMedium text-base" style={{ color: colors.text }}>
            Type
          </Text>
          <View className="flex-row justify-between rounded-md border border-gray-800 p-[3px]">
            <TouchableOpacity
              onPress={() => {
                setTab(0);
              }}
              className={`w-[50%] rounded-md ${tab === 0 ? 'bg-primary' : ''} px-8 py-2`}>
              <Text
                className={`text-center text-lg font-semibold ${tab === 0 ? 'text-white' : 'text-black dark:text-white'}`}>
                Stock
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setTab(1);
              }}
              className={`w-[50%] rounded-md px-8 py-2 ${tab === 1 ? 'bg-primary' : ''}`}>
              <Text
                className={`text-center text-lg font-semibold ${tab === 1 ? 'text-white' : 'text-black dark:text-white'}`}>
                Option
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Input placeholder="ex:USDT" transparent={true} title="Symbol" />
        <View className="p-4">
          <View className="mb-6 mt-3">
            <Text className="mb-1 text-2xl font-semibold dark:text-white">Timezone</Text>
            <Text className="text-tertiary">
              Please select the file timezone. Note that if you want to see data in the application
              in a different timezone please update it in your profile.
            </Text>
          </View>
          <Modalize
            isSearch
            setKeyword={setKeyword}
            onClose={close}
            isExpanded={'timezone'}
            modalTopOffset={200}
            ref={ref}
            icon={
              <TouchableOpacity
                onPress={open}
                className="flex-row items-center rounded-lg border-[0.5px] border-gray-400 px-3 py-2">
                <View className="flex-row items-center gap-x-2">
                  <Feather
                    name="clock"
                    size={20}
                    color={colorScheme === 'dark' ? '#fff' : 'black'}
                  />
                  <Text
                    className={`flex-1 font-interMedium ${timezone !== '' ? 'dark:text-white' : 'text-gray-400'} `}>
                    {timezone !== '' ? timezone : 'Select timezone'}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-down"
                  size={24}
                  color={colorScheme === 'dark' ? '#fff' : 'black'}
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

        <View className="my-3">
          <View className="flex-row justify-end">
            <TouchableOpacity
              className="mb-3 mt-2 flex-row items-center justify-center gap-x-1 rounded-lg bg-primary px-3 py-2"
              onPress={() => {
                setModalOpen('add');
              }}>
              <FontAwesome6 name="add" size={20} color="white" />
              <Text className="text-center font-semibold text-white">Add Trade</Text>
            </TouchableOpacity>
          </View>
          <TradeList
            setSingleTrade={setSingleTrade}
            data={tradesList}
            setTradesList={setTradesList}
            setOpen={setModalOpen}
            tab={tab}
          />
        </View>
        <View className="flex-row justify-end">
          <TouchableOpacity
            className="mb-3 mt-2 flex-row items-center justify-center gap-x-1 rounded-lg bg-primary px-3 py-3"
            onPress={() => {}}>
            <Text className="text-center font-semibold text-white">Save Trade</Text>
          </TouchableOpacity>
        </View>
        <AddTradeModal
          singleTrade={singleTrade}
          setTradesList={setTradesList}
          open={isModalOpen}
          setOpen={setModalOpen}
          tab={tab}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddTradeComponent;
