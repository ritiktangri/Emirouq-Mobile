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
export const handleSeenMessage = async (payload: any) => {
  if (!payload?.conversationId) return;

  return queryClient.setQueryData(['messages', payload.conversationId], (oldData: any) => {
    if (!oldData) return;

    const updatedPages = oldData?.pages?.map((page: any) => {
      return {
        ...page,
        data: page?.data?.map((item: any) =>
          item.conversationId === payload?.conversationId
            ? { ...item, seenBy: payload?.seenBy }
            : item
        ),
      };
    });
    return {
      ...oldData,
      pages: updatedPages,
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

// export const saveConversationCache = async (data: any, keyword = '') => {
//   queryClient.setQueryData(['conversation', keyword], (oldData: any) => {
//     if (!oldData) return;

//     // Case 1: New conversation (no conversationId)
//     if (data?.firstConversation) {
//       const updatedFirstPage = {
//         ...oldData?.pages?.[0],
//         data: [data, ...(oldData.pages[0]?.data || [])],
//       };

//       return {
//         ...oldData,
//         pages: [updatedFirstPage, ...oldData.pages.slice(1)],
//       };
//     }

//     // Case 2: Existing conversation — update it in all pages
//     const updatedPages = oldData?.pages?.map((page: any) => {
//       return {
//         ...page,
//         data: page?.data?.map((item: any) =>
//           item?.uuid === data?.conversationId ? { ...item, ...data } : item
//         ),
//       };
//     });

//     return {
//       ...oldData,
//       pages: updatedPages,
//     };
//   });
// };

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

    // Case 2: Existing conversation — update it and move to top
    if (data?.conversationId) {
      // Find the conversation and update it
      const updatedPages = oldData?.pages?.map((page: any) => {
        return {
          ...page,
          data: page?.data?.map((item: any) =>
            item?.uuid === data?.conversationId ? { ...item, ...data } : item
          ),
        };
      });

      // Find the page containing the updated conversation
      let conversationPage = -1;
      let conversationIndex = -1;

      for (let i = 0; i < updatedPages?.length; i++) {
        const pageData = updatedPages?.[i]?.data;
        if (pageData) {
          const index = pageData?.findIndex((item: any) => item?.uuid === data?.conversationId);
          if (index !== -1) {
            conversationPage = i;
            conversationIndex = index;
            break;
          }
        }
      }

      // If the conversation was found, move it to the top of the first page.
      if (conversationPage !== -1 && conversationIndex !== -1) {
        const conversationToMove = updatedPages?.[conversationPage]?.data?.[conversationIndex];

        // Remove from old position
        updatedPages[conversationPage].data.splice(conversationIndex, 1);

        // Add to the beginning of the first page
        updatedPages[0].data.unshift(conversationToMove);

        // Clean up empty page if conversation moved from a page other than the first.
        if (conversationPage > 0 && updatedPages[conversationPage].data.length === 0) {
          updatedPages.splice(conversationPage, 1); // Remove the empty page
        }

        return {
          ...oldData,
          pages: updatedPages,
        };
      } else {
        // Conversation ID was provided but wasn't found.  Log a warning.
        console.warn('Conversation ID not found in cache:', data?.conversationId);
        return {
          ...oldData,
          pages: updatedPages,
        };
      }
    }
    return oldData;
  });
};
