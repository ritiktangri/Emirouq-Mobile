/* eslint-disable import/order */
import { useInfiniteQuery } from '@tanstack/react-query';
import { queryClient } from '~/app/_layout';

import { getConversationService, getMessageService } from '~/utils/services/conversation';

export const saveMessageCache = async (payload: any) => {
  if (!payload?.conversationId) return;

  return queryClient.setQueryData(['messages', payload.conversationId], (oldData: any) => {
    if (!oldData) return;

    const updatedFirstPage = {
      ...oldData.pages[0],
      data: [payload, ...(oldData.pages[0]?.data || [])],
    };

    return {
      ...oldData,
      pages: [updatedFirstPage, ...oldData.pages.slice(1)],
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
      const currentStart = allPages?.length || 0 * 25;
      if (currentStart < lastPage?.total) {
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

export const useGetConversations = (keyword = '', enabled = true) =>
  useInfiniteQuery({
    queryKey: ['conversation', keyword],
    queryFn: ({ pageParam }) =>
      getConversationService({
        query: { start: pageParam, keyword },
      }),
    getNextPageParam: (lastPage: any, allPages: any) => {
      if (!lastPage) {
        return undefined;
      }

      if (lastPage?.totalCount === 0) {
        return undefined;
      }

      const currentStart = allPages?.length * 10 || 0; // Ensure currentStart is a number
      const totalCount = lastPage?.totalCount || 0; // Default to 0 if totalCount is undefined.

      if (currentStart < totalCount) {
        return currentStart;
      } else {
        return undefined;
      }
    },
    initialPageParam: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled,
  });

export const saveConversationCache = async (data: any, keyword = '') => {
  queryClient.setQueryData(['conversation', keyword], (oldData: any) => {
    if (!oldData) return;

    // Case 1: New conversation (no conversationId)
    if (data?.firstConversation) {
      const updatedFirstPage = {
        ...oldData?.pages?.[0],
        data: [data, ...(oldData.pages[0]?.data || [])],
      };

      return {
        ...oldData,
        pages: [updatedFirstPage, ...oldData.pages.slice(1)],
      };
    }

    // Case 2: Existing conversation — update it in all pages
    const updatedPages = oldData?.pages?.map((page: any) => {
      return {
        ...page,
        data: page?.data?.map((item: any) =>
          item?.uuid === data?.conversationId ? { ...item, ...data } : item
        ),
      };
    });

    return {
      ...oldData,
      pages: updatedPages,
    };
  });
};
