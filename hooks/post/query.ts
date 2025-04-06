import { useInfiniteQuery } from '@tanstack/react-query';

import { getPostService } from '~/utils/services/post';

export const useGetPosts = (start = 0, limit = 10, keyword = '', status = '') =>
  useInfiniteQuery({
    queryKey: ['posts', start, limit, keyword, status],
    queryFn: ({ pageParam = start }) =>
      getPostService({
        query: { start: pageParam, limit, keyword, status },
      }),
    getNextPageParam: (lastPage: any, allPages: any) => {
      const currentStart = allPages?.length * limit; // Calculate the start value for the next page
      if (currentStart < lastPage?.count) {
        return currentStart;
      } else {
        return undefined;
      }
    },
    initialPageParam: start,
  });
