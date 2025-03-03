import { View, Modal, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Entypo, FontAwesome6 } from '@expo/vector-icons';
import Input from '~/components/UI/Input';
import CustomDatePicker from '~/components/UI/Datepicker';
import Select from '~/components/UI/Select';
import dayjs from 'dayjs';
import { DefaultText as Text } from '~/components/common/DefaultText';

const AddTradeModal = ({ singleTrade, open, setOpen, setTradesList, tab }: any) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [expDate, setExpDate] = useState(new Date());
  const [data, setData] = useState({
    quantity: 0,
    side: '',
    price: 0,
    commission: 0,
    instrument: '',
    strike: 0,
    contractMultiplier: 0,
  });

  useEffect(() => {
    if (open === 'edit') {
      setData({ ...singleTrade });
      setDate(new Date(singleTrade?.date));
      setTime(new Date(singleTrade?.time));
    }
  }, [open]);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={open !== ''}
      onRequestClose={() => setOpen('')}>
      <View className="flex-1 items-center justify-center bg-gray-500/50">
        <View className="w-4/5 rounded-xl bg-[#282e36] p-5">
          <View className="flex-row items-center justify-between">
            <Text className="text-xl font-semibold text-white">
              {open === 'add' ? 'Add Trade' : 'Update Trade'}
            </Text>
            <Entypo name="cross" size={24} color="white" onPress={() => setOpen('')} />
          </View>

          <View className="flex-row justify-between">
            <CustomDatePicker title="Select Date" date={date} setDate={setDate} mode="date" />
            <CustomDatePicker title="Select Time" date={time} setDate={setTime} mode="time" />
          </View>
          {tab === 1 ? (
            <>
              <View className="flex-row items-center justify-between">
                {/* <Select
                  containerStyle={{ width: '45%' }}
                  data={[
                    { label: 'CALL', value: 'call' },
                    { label: 'PUT', value: 'put' },
                  ]}
                  renderItem={(item: any) => {
                    return (
                      <View className="">
                        <Text className="text-white">{item.label}</Text>
                      </View>
                    );
                  }}
                  value={data?.side}
                  showsVerticalScrollIndicator={false}
                  title="Instrument"
                  placeholder="Select"
                  transparent={true}
                  onSelect={(e: any) => {
                    setData({ ...data, instrument: e?.value });
                  }}
                /> */}
                <CustomDatePicker
                  title="Exp Date"
                  date={expDate}
                  setDate={setExpDate}
                  mode="date"
                />
              </View>
              <View className="flex-row items-center justify-between">
                <Input
                  containerStyle={{ width: '45%' }}
                  placeholder="Select strike"
                  title="Strike"
                  transparent={true}
                  onChangeText={(text) => {
                    setData({ ...data, strike: Number(text) });
                  }}
                  value={data?.strike?.toString()}
                />
                <Input
                  containerStyle={{ width: '45%' }}
                  placeholder="Multiplier"
                  title="Contract Multiplier"
                  transparent={true}
                  onChangeText={(text) => {
                    setData({ ...data, contractMultiplier: Number(text) });
                  }}
                  value={data?.contractMultiplier?.toString()}
                />
              </View>
            </>
          ) : null}
          <View className="flex-row justify-between">
            <Input
              containerStyle={{ width: '45%' }}
              placeholder="Quantity"
              title="QTY"
              transparent
              onChangeText={(text) => {
                setData({ ...data, quantity: Number(text) });
              }}
              value={data?.quantity?.toString()}
            />
            {/* <Select
              containerStyle={{ width: '45%' }}
              data={[
                { label: 'BUY', value: 'buy' },
                { label: 'SELL', value: 'sell' },
              ]}
              renderItem={(item: any) => {
                return (
                  <View className="">
                    <Text className="text-white">{item.label}</Text>
                  </View>
                );
              }}
              value={data?.side}
              showsVerticalScrollIndicator={false}
              title="Side"
              placeholder="Select"
              transparent={true}
              onSelect={(e: any) => {
                setData({ ...data, side: e?.value });
              }}
            /> */}
          </View>
          <View className="flex-row justify-between">
            <Input
              containerStyle={{ width: '45%' }}
              placeholder="Price"
              title="Price"
              transparent={true}
              prefix={<Text className="text-white">$</Text>}
              onChangeText={(text) => {
                setData({ ...data, price: Number(text) });
              }}
              value={data?.price?.toString()}
            />
            <Input
              containerStyle={{ width: '45%' }}
              placeholder="Commission"
              title="Commission"
              transparent={true}
              prefix={<Text className="text-white">$</Text>}
              onChangeText={(text) => {
                setData({ ...data, commission: Number(text) });
              }}
              value={data?.commission?.toString()}
            />
          </View>

          <View className="my-4 flex-row justify-between">
            <TouchableOpacity
              className="w-[45%] rounded-lg bg-[#3e454d] p-3"
              onPress={() => setOpen('')}>
              <Text className="text-center font-semibold text-[#CECFD2]">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-[45%] rounded-lg bg-primary p-3"
              onPress={() => {
                if (open === 'edit') {
                  setTradesList((prevTrades: any) => {
                    const newTrades = [...prevTrades];
                    newTrades[singleTrade.index] = {
                      ...data,
                      date,
                      time,
                    };
                    return newTrades;
                  });
                } else {
                  setTradesList((prev: any) => [
                    ...prev,
                    {
                      date,
                      time,
                      ...data,
                    },
                  ]);
                }
                setOpen('');
              }}>
              <Text className="text-center font-semibold text-white">
                {open === 'edit' ? 'Update' : 'Add'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddTradeModal;
