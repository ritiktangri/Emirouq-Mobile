import { useMutation } from '@tanstack/react-query';
import { queryClient } from '~/app/_layout';
import { updateFavourite } from '~/utils/services/post';

export const useUpdateFavourite = () => {
  return useMutation({
    mutationFn: (payload: any) => updateFavourite(payload),
    onSuccess: () => {
      // ✅ refetch posts
    //   queryClient.invalidateQueries({
    //     queryKey: ['favourite'],
    //   });
    },
  });
};
