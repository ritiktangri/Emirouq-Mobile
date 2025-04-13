import { useQuery } from '@tanstack/react-query';

import {
  checkSubscription,
  fetchPaymentSheetService,
  getPlansService,
} from '~/utils/services/stripe';

export const useGetPlans = () =>
  useQuery({
    queryKey: ['plan-list'],
    queryFn: () => getPlansService(),
    refetchOnWindowFocus: false,
  });

export const useFetchPaymentSheet = (id: any) =>
  useQuery({
    queryKey: ['fetch-payment', id],
    queryFn: () => fetchPaymentSheetService(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

export const useCheckSubscription = (id: any, refetchInterval: any) =>
  useQuery({
    queryKey: ['check-subscription', id],
    queryFn: () => checkSubscription(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
    refetchInterval: (data: any) => {
      if (data?.state?.data?.status === 'active') {
        return 0;
      }
      return refetchInterval;
    },
  });
