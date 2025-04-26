/* eslint-disable import/order */
import { createContext, useContext, useMemo, useEffect } from 'react';
import { saveConversationCache } from '~/hooks/chats/query';

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
      const handleUpdateConversationCache = (data: any) => {
        saveConversationCache(data);
      };

      socketIo?.on('update_conversation_cache', handleUpdateConversationCache);

      return () => {
        socketIo?.off('update_conversation_cache', handleUpdateConversationCache);
      };
    }
  }, [socketIo]);

  const value: any = useMemo(() => ({}), []);

  return <ConversationContext.Provider value={value}>{children}</ConversationContext.Provider>;
};

export { ConversationContext, ConversationProvider };
