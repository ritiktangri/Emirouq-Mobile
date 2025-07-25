import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import {
  getFavourite,
  getPostService,
  getSimilarPostsService,
  getSinglePostService,
} from '~/utils/services/post';

export const useGetPosts = (
  keyword = '',
  status = '',
  userId = null,
  key = 'getPostList',
  priceRange = null,
  category = null,
  sortBy = ''
) =>
  useInfiniteQuery({
    queryKey: ['posts', keyword, status, userId, key, priceRange, category, sortBy],
    queryFn: ({ pageParam }) =>
      getPostService({
        query: {
          start: pageParam,
          keyword,
          status,
          userId,
          priceRange,
          category,
          sortBy,
        },
        key,
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

export const useGetSinglePosts = (id: any) =>
  useQuery({
    queryKey: ['singlePost', id],
    queryFn: () =>
      getSinglePostService({
        pathParams: { id },
      }),
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

export const useGetFavouritePosts = () =>
  useInfiniteQuery({
    queryKey: ['favourite_posts'],
    queryFn: ({ pageParam }) =>
      getFavourite({
        query: { start: pageParam },
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
    refetchOnReconnect: false,
  });
export const useGetSimilarPosts = (id: any) =>
  useQuery({
    queryKey: ['similarPosts', id],
    queryFn: () =>
      getSimilarPostsService({
        pathParams: { categoryId: id },
      }),
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
