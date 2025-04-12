import { useMutation } from '@tanstack/react-query';

import { createSubscription } from '~/utils/services/stripe';

export const useCreateSubscription = () => {
  return useMutation({
    mutationFn: (payload: any) => createSubscription(payload),
  });
};
