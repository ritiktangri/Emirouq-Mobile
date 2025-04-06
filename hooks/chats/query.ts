import { keepPreviousData, useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { getConversationService, getMessageService } from '~/utils/services/conversation';

export const useGetMessages = (conversationId: any, start = 0, limit = 10, keyword = '') =>
  useQuery({
    queryKey: ['chat', conversationId, start, limit, keyword],
    queryFn: () =>
      getMessageService({
        pathParams: { conversationId },
        query: { start, limit, keyword },
      }),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    enabled: !!conversationId,
  });

export const useGetConversations = (start = 0, limit = 10, keyword = '') =>
  useInfiniteQuery({
    queryKey: ['conversation', start, limit, keyword],
    queryFn: ({ pageParam = start }) =>
      getConversationService({
        query: { start: pageParam, limit, keyword },
      }),
    getNextPageParam: (lastPage: any, allPages: any) => {
      const currentStart = allPages?.length * limit; // Calculate the start value for the next page
      if (currentStart < lastPage?.totalCount) {
        return currentStart;
      } else {
        return undefined;
      }
    },
    initialPageParam: start,
  });
