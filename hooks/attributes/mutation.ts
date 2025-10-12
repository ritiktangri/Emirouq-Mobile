
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '~/app/_layout';
import { createTicket } from '~/utils/services/support';

export const useCreateTicket = () => {
  return useMutation({
    mutationFn: (payload: any) => createTicket(payload),
    onSuccess: () => {
      // ✅ refetch posts
      queryClient.invalidateQueries({
        queryKey: ['createTicket'],
      });
    },
  });
};
