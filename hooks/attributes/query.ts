import { useInfiniteQuery } from '@tanstack/react-query';

import {
  getAttributeOptions,
  getAttributes,
  getParentAttributeOptions,
} from '~/utils/services/attributes';

export const useGetAttributes = ({ id, keyword }: any) =>
  useInfiniteQuery({
    queryKey: ['attributes', id, keyword],
    queryFn: ({ pageParam }) =>
      getAttributes({
        query: { start: pageParam, keyword },
        pathParams: { id },
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
    enabled: !!id,
  });

export const useGetAttributeOptions = ({ attributeId, keyword, dependsOn }: any) =>
  useInfiniteQuery({
    queryKey: ['attributes-options', attributeId, keyword],
    queryFn: ({ pageParam }) =>
      getAttributeOptions({
        query: { start: pageParam, ...(keyword && { keyword }) },
        pathParams: { attributeId },
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
    enabled: !!attributeId && !!dependsOn === false,
  });
export const useGetParentAttributeOptions = ({ parentId, keyword, dependsOn }: any) =>
  useInfiniteQuery({
    queryKey: ['parent-attribute-options', parentId, keyword],
    queryFn: ({ pageParam }) =>
      getParentAttributeOptions({
        query: { start: pageParam, ...(keyword && { keyword }) },
        pathParams: { parentId },
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
    enabled: !!parentId && !!dependsOn,
  });
