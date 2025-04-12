import { useQuery } from '@tanstack/react-query';

import { fetchPaymentSheetService, getPlansService } from '~/utils/services/stripe';

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
