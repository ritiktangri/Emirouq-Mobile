import { keepPreviousData, useQuery } from '@tanstack/react-query';

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
  useQuery({
    queryKey: ['conversation', start, limit, keyword],
    queryFn: () =>
      getConversationService({
        query: { start, limit, keyword },
      }),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });
