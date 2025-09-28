/* eslint-disable import/order */
import { useStripe } from '@stripe/stripe-react-native';
import React from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { Text } from '../common/Text';
import { useCreateSubscription } from '~/hooks/stripe/mutation';
import { Href, router } from 'expo-router';
import { routes } from '~/utils/routes';

export default function CheckoutScreen({ id, categoryId, item, cb }: any) {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const createSubscription = useCreateSubscription();

  const openPaymentSheet = async (subscriptionId: any) => {
    const { error } = await presentPaymentSheet();
    if (error?.code === 'Canceled') {
      return;
    }
    // setSubscriptionId(subscriptionId);
    cb && cb();
    // router.replace(routes.paymentSuccess(subscriptionId) as Href);
  };
  const initializePaymentSheet = async (clientSecret: any, subscriptionId: any) => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: 'Emirouq',
      paymentIntentClientSecret: clientSecret,
      returnURL: 'emirouq-mobile://payment-sheet',
      allowsDelayedPaymentMethods: true,
    });
    if (error) {
      return;
    }
    openPaymentSheet(subscriptionId);
  };

  const handlePayment = async (priceId: any, categoryId: any) => {
    createSubscription
      .mutateAsync({
        body: {
          priceId,
          categoryId,
        },
      })
      .then(async (res: any) => {
        initializePaymentSheet(res?.clientSecret, res?.subscriptionId);
      })
      .catch((err) => {});
  };
  return (
    <TouchableOpacity
      className="gap-32rounded-lg mt-4 flex-row items-center justify-center border-2 border-primary bg-white py-3"
      activeOpacity={0.7}
      onPress={() => {
        handlePayment(item?.priceId, categoryId);
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
