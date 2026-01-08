import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import {
  countViewPost,
  getDashboardPost,
  getFavourite,
  getPostService,
  getSimilarPostsService,
  getSinglePostService,
} from '~/utils/services/post';
export const useGetPosts = ({
  keyword,
  status,
  userId,
  key = 'getPostList',
  priceRange,
  category,
  subCategory,
  sortBy,
  properties,
  city,
  newProperties,
  year,
}: any) =>
  useInfiniteQuery({
    queryKey: [
      'posts',
      keyword,
      status,
      userId,
      key,
      priceRange,
      category,
      sortBy,
      subCategory,
      properties,
      city,
      newProperties,
      year,
    ],
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
          subCategory,
          properties,
          city,
          newProperties,
          year,
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
export const useGetDashboardPost = () =>
  useQuery({
    queryKey: ['dashboard-posts'],
    queryFn: () =>
      getDashboardPost({
        query: {},
      }),
    refetchOnWindowFocus: false,
  });
export const useGetCountPost = (postId: any) =>
  useQuery({
    queryKey: ['count-posts', postId],
    queryFn: () =>
      countViewPost({
        pathParams: { postId },
      }),
    refetchOnWindowFocus: false,
  });
