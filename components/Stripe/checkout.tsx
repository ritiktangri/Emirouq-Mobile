/* eslint-disable import/order */
import { useStripe } from '@stripe/stripe-react-native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { Text } from '../common/Text';
import { useFetchPaymentSheet } from '~/hooks/stripe/query';
import { queryClient } from '~/app/_layout';

export default function CheckoutScreen({ id }: any) {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [planId, setPlanId] = useState(null as any);
  const { data, isLoading, isFetching }: any = useFetchPaymentSheet(planId);

  const clear = () => {
    //clear the query cache
    queryClient.removeQueries({ queryKey: ['fetch-payment', planId] });
    setPlanId(null);
    console.log('canceled');
  };
  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
    if (error?.code === 'Canceled') {
      clear();
      return;
    }
    Alert.alert('Success', 'Your order is confirmed!');
    clear();
  };
  const initializePaymentSheet = async () => {
    const { paymentIntent, customer } = data;
    const { error } = await initPaymentSheet({
      merchantDisplayName: 'Emirouq',
      customerId: customer,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      returnURL: 'emirouq-mobile://stripe-redirect',
    });
    if (!error) {
      console.log('Payment sheet initialized successfully');
      openPaymentSheet();
    }
  };

  useEffect(() => {
    if (planId && data?.paymentIntent && !isFetching) initializePaymentSheet();
  }, [planId, data?.data, isFetching]);

  return (
    <TouchableOpacity
      className="gap-32rounded-lg mt-4 flex-row items-center justify-center border-2 border-primary bg-white py-3"
      activeOpacity={0.7}
      onPress={() => {
        setPlanId(id);
      }}>
      {isLoading ? <ActivityIndicator size="small" className="!text-primary" /> : <></>}
      <Text className=" text-lg font-semibold text-primary">Select Plan</Text>
    </TouchableOpacity>
  );
}
