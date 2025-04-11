import { useQuery } from '@tanstack/react-query';

import { getPlansService } from '~/utils/services/stripe';

export const useGetPlans = () =>
  useQuery({
    queryKey: ['plan-list'],
    queryFn: () => getPlansService(),
    refetchOnWindowFocus: false,
  });
