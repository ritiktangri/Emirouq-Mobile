import { useMutation } from '@tanstack/react-query';
import { queryClient } from '~/app/_layout';
import { addCommentService, likePostService, updateFavourite } from '~/utils/services/post';

export const useUpdateFavourite = () => {
  return useMutation({
    mutationFn: (payload: any) => updateFavourite(payload),
    onSuccess: () => {
      // ✅ refetch posts
      queryClient.invalidateQueries({
        queryKey: ['favourite'],
      });
    },
  });
};
export const useLikePost = () => {
  return useMutation({
    mutationFn: (payload: any) => likePostService(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['like-post'],
      });
    },
  });
};

export const useAddComment = () => {
  return useMutation({
    mutationFn: (payload: any) => addCommentService(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comment-post'],
      });
    },
  });
};
