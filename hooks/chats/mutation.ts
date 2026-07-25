import { useMutation } from '@tanstack/react-query';

import { createConversationService, uploadFilesService } from '~/utils/services/conversation';

export const useCreateConversation = () => {
  return useMutation({
    mutationFn: (payload: any) => createConversationService(payload),
    onSuccess: () => {
      // // ✅ refetch posts
      // queryClient.invalidateQueries({ queryKey: ['conversation'] });
    },
  });
};
export const useUploadFile = () => {
  return useMutation({
    mutationFn: (payload: any) => uploadFilesService(payload),
    onSuccess: () => {
      // // ✅ refetch posts
      // queryClient.invalidateQueries({ queryKey: ['conversation'] });
    },
  });
};
