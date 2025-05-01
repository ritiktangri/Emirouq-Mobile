import { useMutation } from '@tanstack/react-query';
import { queryClient } from '~/app/_layout';
import { createConversationService } from '~/utils/services/conversation';

export const useCreateConversation = () => {
  return useMutation({
    mutationFn: (payload: any) => createConversationService(payload),
    onSuccess: () => {
      // // ✅ refetch posts
      // queryClient.invalidateQueries({ queryKey: ['conversation'] });
    },
  });
};
