import { useInfiniteQuery } from '@tanstack/react-query';

import { getCategories, getSubCategories } from '~/utils/services/category';

export const useGetCategory = (keyword = '', limit: number) =>
  useInfiniteQuery({
    queryKey: ['category', keyword],
    queryFn: ({ pageParam }) =>
      getCategories({
        query: { start: pageParam, keyword, limit },
      }),
    getNextPageParam: (lastPage: any, allPages: any) => {
      const currentStart = allPages?.length * 10;
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

export const useGetSubCategory = (categoryId: string) =>
  useInfiniteQuery({
    queryKey: ['subcategory', categoryId],
    queryFn: ({ pageParam }) =>
      getSubCategories({
        query: { start: pageParam },
        pathParams: { id: categoryId },
      }),
    getNextPageParam: (lastPage: any, allPages: any) => {
      const currentStart = allPages?.length * 10;
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
    enabled: !!categoryId,
  });
