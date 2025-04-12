/* eslint-disable import/order */
import { useStripe } from '@stripe/stripe-react-native';
import React from 'react';
import { ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { Text } from '../common/Text';
import { useCreateSubscription } from '~/hooks/stripe/mutation';

export default function CheckoutScreen({ id, item }: any) {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const createSubscription = useCreateSubscription();

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
    if (error?.code === 'Canceled') {
      return;
    }
    Alert.alert('Success', 'Your order is confirmed!');
  };
  const initializePaymentSheet = async (clientSecret: any) => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: 'Emirouq',
      paymentIntentClientSecret: clientSecret,
      returnURL: 'emirouq-mobile://payment-sheet',
      allowsDelayedPaymentMethods: true,
    });
    if (error) {
      return console.log('Error initializing payment sheet:', error);
    }
    console.log('Payment sheet initialized successfully');
    openPaymentSheet();
  };

  const handlePayment = async (priceId: any) => {
    createSubscription
      .mutateAsync({
        body: {
          priceId,
        },
      })
      .then(async (res: any) => {
        initializePaymentSheet(res?.clientSecret);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <TouchableOpacity
      className="gap-32rounded-lg mt-4 flex-row items-center justify-center border-2 border-primary bg-white py-3"
      activeOpacity={0.7}
      onPress={() => {
        handlePayment(item?.priceId);
      }}>
      {createSubscription?.isPending ? (
        <ActivityIndicator size="small" className="!text-primary" />
      ) : (
        <></>
      )}
      <Text className=" text-lg font-semibold text-primary">Select Plan</Text>
    </TouchableOpacity>
  );
}
