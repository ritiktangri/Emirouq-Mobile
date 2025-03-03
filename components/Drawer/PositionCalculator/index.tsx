import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import { DefaultText as Text } from '~/components/common/DefaultText';
import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import Input from '~/components/UI/Input';
import CustomHeader from '~/components/UI/CustomHeader';
import { round } from 'lodash';
import SelectPicker from '~/components/UI/SelectPicker';

const PositionCalculator = () => {
  const [tab, setTab] = useState(0);
  const [price, setPrice] = useState<any>('');
  const [shares, setShares] = useState<any>('');
  const [positionSize, setPositionSize] = useState<any>('');
  const [manualEntry, setManualEntry] = useState('');
  const [contractMultiplier, setContractMultiplier] = useState<any>(100);
  const [error, setError] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState();
  useEffect(() => {
    if (price) {
      const multiplier = tab === 1 ? contractMultiplier : 1;
      //if price and shares are entered, and also manualEntry is not positionSize then calculate positionSize
      if (shares && manualEntry !== 'positionSize') {
        setPositionSize(round(Number(price) * Number(shares) * multiplier, 2));
        //if price and positionSize are entered, and  also manualEntry is not shares then calculate shares
      } else if (positionSize && manualEntry !== 'shares') {
        setShares(round(Number(positionSize) / Number(price), 2));
        //if price and positionSize are entered, and also manualEntry is not price then calculate price
      } else if (positionSize && manualEntry !== 'price') {
        setPrice(round(Number(positionSize) / Number(shares), 2));
        // if price and positionSize are entered, and also manualEntry is not contractMultiplier then calculate positionSize
      } else if (positionSize && manualEntry !== 'contractMultiplier') {
        setPositionSize(round(Number(price) * Number(shares) * multiplier, 2));
        // if price and shares are entered, then calculate positionSize
      } else if (shares) {
        setPositionSize(round(Number(price) * Number(shares) * multiplier, 2));
      }
    }
  }, [price, shares, positionSize, tab, contractMultiplier, manualEntry]);

  const onChange = (value: string, type: string) => {
    setManualEntry(type);
    setError(null);
    switch (type) {
      case 'price':
        setPrice(value || '');
        break;
      case 'shares':
        setShares(value || '');
        setPositionSize('');
        break;
      case 'positionSize':
        setPositionSize(value || '');
        setShares('');
        break;
    }
  };

  const handleContractMultiplierChange = (value: string) => {
    if (!value || Number(value) <= 0) {
      setError('Contract multiplier must be at least 1');
    } else {
      setError(null);
    }
    setManualEntry('contractMultiplier');
    setContractMultiplier(value);
  };
  return (
    <ScrollView className="flex-1 bg-white p-6 dark:bg-black" showsVerticalScrollIndicator={false}>
      <SafeAreaView>
        <CustomHeader />
        <Text className="text-2xl font-semibold text-black dark:text-white">
          Position Calculator
        </Text>
        <Text className="mt-2 leading-normal text-gray-600 dark:text-[#CBD5E2]">
          Calculate your position size, number of shares, or total position value for stocks and
          options.
        </Text>
        <View className="mt-4 flex-row justify-between rounded-md border border-gray-800 p-[3px]">
          <TouchableOpacity
            onPress={() => {
              setTab(0);
              setManualEntry('');
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
              setManualEntry('');
            }}
            className={`w-[50%] rounded-md px-8 py-2 ${tab === 1 ? 'bg-primary' : ''}`}>
            <Text
              className={`text-center text-lg font-semibold ${tab === 1 ? 'text-white' : 'text-black dark:text-white'}`}>
              Option
            </Text>
          </TouchableOpacity>
        </View>
        <View className="mt-6 flex-col gap-y-3">
          <Input
            transparent={true}
            title={tab === 0 ? 'Contract Price' : 'Option Price'}
            prefix={<Text className="dark:text-white">$</Text>}
            placeholder={tab === 0 ? 'Enter stock price' : 'Enter option price'}
            onChangeText={(e) => onChange(e, 'price')}
            value={price}
          />
          <Input
            transparent={true}
            title={tab === 0 ? 'Number of shares' : 'Number of contracts'}
            placeholder={tab === 0 ? 'Enter number of shares' : 'Enter number of contracts'}
            onChangeText={(e) => onChange(e, 'shares')}
            value={shares}
          />
          <Input
            transparent={true}
            title="Position Size"
            prefix={<Text className="dark:text-white">$</Text>}
            placeholder="Enter position size"
            onChangeText={(e) => onChange(e, 'positionSize')}
            value={positionSize}
          />
          {tab === 1 ? (
            <Input
              transparent={true}
              title="Contract Multiplier"
              placeholder="Enter contract multiplier"
              suffix={<Feather name="info" size={16} color={error ? 'red' : 'white'} />}
              onChangeText={(e) => handleContractMultiplierChange(e)}
              value={contractMultiplier}
              description={error || ''}
              descriptionStyle="!text-red-500 !text-sm"
              inputStyle={{
                borderColor: error ? 'red' : '#9ca3af',
              }}
            />
          ) : null}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default PositionCalculator;
