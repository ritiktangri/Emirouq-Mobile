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
  });
