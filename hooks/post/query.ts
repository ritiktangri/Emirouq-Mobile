import { useInfiniteQuery } from '@tanstack/react-query';

import { getPostService } from '~/utils/services/post';

export const useGetPosts = (keyword = '', status = '') =>
  useInfiniteQuery({
    queryKey: ['posts', keyword, status],
    queryFn: ({ pageParam }) =>
      getPostService({
        query: { start: pageParam, keyword, status },
      }),
    getNextPageParam: (lastPage: any, allPages: any) => {
      const currentStart = allPages?.length * 10; // Calculate the start value for the next page
      if (currentStart < lastPage?.count) {
        return currentStart;
      } else {
        return undefined;
      }
    },
    initialPageParam: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
