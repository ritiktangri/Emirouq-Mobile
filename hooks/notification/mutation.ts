import { useMutation } from '@tanstack/react-query';

import { queryClient } from '~/app/_layout';
import { markNotificationReadService } from '~/utils/services/notification';

export const useMarkNotificationRead = () => {
  return useMutation({
    mutationFn: ({ id }: { id: string }) => markNotificationReadService({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-notifications'] });
      queryClient.invalidateQueries({ queryKey: ['unread-notification-count'] });
    },
  });
};
