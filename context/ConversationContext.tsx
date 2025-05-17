/* eslint-disable import/order */
import { createContext, useContext, useMemo, useEffect } from 'react';
import { handleSeenMessage, saveConversationCache, saveMessageCache } from '~/hooks/chats/query';

import { useAuth } from './AuthContext';
const defaultProvider = {
  conversationList: [],
  createConversationHandler: (a: any) => {},
  getConversationList: (a: any, b: any, c: any, d: any, e: any, f: any) => {},
};
const ConversationContext = createContext(defaultProvider as any);
export const useConversation = () => useContext(ConversationContext);

const ConversationProvider = ({ children }: any) => {
  const { socketIo } = useAuth();

  useEffect(() => {
    if (socketIo?.connected) {
      const handleUpdateConversationCacheHandler = (data: any) => {
        saveConversationCache(data);
      };
      const handleMessageCacheHandler = ({ message }: any) => {
        //save the message to the cache
        saveMessageCache(message);
      };
      const handleSeenMessageHandler = ({ conversationId, seenBy }: any) => {
        //save the message to the cache
        handleSeenMessage({ conversationId, seenBy });
      };
      socketIo.on('message', handleMessageCacheHandler);
      socketIo?.on('update_conversation_cache', handleUpdateConversationCacheHandler);
      socketIo?.on('seen_message', handleSeenMessageHandler);

      return () => {
        socketIo?.off('message', handleMessageCacheHandler);
        socketIo?.off('update_conversation_cache', handleUpdateConversationCacheHandler);
        socketIo?.off('seen_message', handleSeenMessageHandler);
      };
    }
  }, [socketIo]);

  const value: any = useMemo(() => ({}), []);

  return <ConversationContext.Provider value={value}>{children}</ConversationContext.Provider>;
};

export { ConversationContext, ConversationProvider };
