/* eslint-disable import/order */
import { useInfiniteQuery } from '@tanstack/react-query';
import { queryClient } from '~/app/_layout';

import { getConversationService, getMessageService } from '~/utils/services/conversation';

export const saveMessageCache = async (payload: any) => {
  return queryClient.setQueryData(['messages', payload?.conversationId], (oldData: any) => {
    return {
      ...(oldData || {}),
      pages: [
        {
          ...(oldData?.pages?.[0] || []),
          data: [payload, ...(oldData?.pages?.[0]?.data || [])],
        },
      ],
    };
  });
};
export const useGetMessages = (conversationId: any) =>
  useInfiniteQuery({
    queryKey: ['messages', conversationId],

    queryFn: ({ pageParam }) =>
      getMessageService({
        pathParams: { conversationId },
        query: { start: pageParam },
      }),
    getNextPageParam: (lastPage: any, allPages: any) => {
      const currentStart = allPages?.length * 10;
      if (currentStart < lastPage?.totalCount) {
        return currentStart;
      } else {
        return undefined;
      }
    },
    initialPageParam: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false, // 👈 prevents fetch on remount
    refetchOnReconnect: false, // 👈 prevents fetch on network reconnect
    enabled: !!conversationId,
  });

export const useGetConversations = (keyword = '') =>
  useInfiniteQuery({
    queryKey: ['conversation', keyword],
    queryFn: ({ pageParam }) =>
      getConversationService({
        query: { start: pageParam, keyword },
      }),
    getNextPageParam: (lastPage: any, allPages: any) => {
      const currentStart = allPages?.length * 10;
      if (currentStart < lastPage?.totalCount) {
        return currentStart;
      } else {
        return undefined;
      }
    },
    initialPageParam: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false, // 👈 prevents fetch on remount
    refetchOnReconnect: false, // 👈 prevents fetch on network reconnect
  });

export const saveConversationCache = async (data: any) => {
  queryClient.setQueryData(['conversation', ''], (oldData: any) => {
    return {
      ...(oldData || {}),
      pages: [
        {
          ...(oldData?.pages?.[0] || []),
          data: oldData?.pages?.[0]?.data?.map((item: any) => {
            console.log(item?.uuid === data?.conversationId);
            if (item?.uuid === data?.conversationId) {
              return {
                ...item,
                ...data,
              };
            }
            return item;
          }),
        },
      ],
    };
  });
};
