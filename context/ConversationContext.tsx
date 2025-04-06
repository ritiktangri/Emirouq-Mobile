/* eslint-disable import/order */
import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import {
  createConversationService,
  getConversationService,
  getMessageService,
  sendMessageService,
} from '~/utils/services/conversation';
const defaultProvider = {
  conversationList: [],
  createConversationHandler: (a: any) => {},
  getConversationList: (a: any, b: any, c: any, d: any, e: any, f: any) => {},
};
const ConversationContext = createContext(defaultProvider as any);
export const useConversation = () => useContext(ConversationContext);

const ConversationProvider = ({ children }: any) => {
  const [conversationList, setConversationList] = useState([] as any);
  const [messages, setMessages] = useState([] as any);

  const getConversationListHandler = useCallback(
    async (signal: any, start = 0, limit = 10, keyword = '', cb: any, errCb: any) => {
      const res: any = await getConversationService({
        query: {
          start,
          limit,
          keyword,
        },
        ...(signal && { signal }),
      });
      setConversationList(res?.data);
      cb() && cb();
    },
    []
  );
  const createConversationHandler = useCallback(async ({ body }: any) => {
    createConversationService({ body })
      .then(() => {
        getConversationListHandler(
          '',
          0,
          10,
          '',
          () => {},
          () => {}
        );
      })
      .catch((err: any) => {
        console.error('Error creating conversation:', err);
      });
  }, []);

  const sendMessage = useCallback(async (body: any, cb: any, errCb: any) => {
    sendMessageService({ body, pathParams: { conversationId: body?.conversationId } })
      .then((res: any) => {
        setConversationList((prev: any) => [...prev, res]);
        cb(res);
      })
      .catch((err: any) => {
        errCb(err);
        console.error('Error sending message:', err);
      });
  }, []);

  const getMessageHandler = useCallback(
    async (conversationId: any, start = 0, limit = 10, cb: any) => {
      getMessageService({
        pathParams: {
          conversationId,
        },
        query: {
          start,
          limit,
        },
      })
        .then((res: any) => {
          setMessages((prev: any) => [...prev, ...(res?.data || [])]);
          cb && cb();
        })
        .catch((err: any) => {
          console.error('Error sending message:', err);
        });
    },
    []
  );
  const value: any = useMemo(
    () => ({
      conversationList,
      setConversationList,
      createConversationHandler,
      getConversationListHandler,
      sendMessage,
      getMessageHandler,
      setMessages,
      messages,
    }),
    [
      conversationList,
      setConversationList,
      createConversationHandler,
      getConversationListHandler,
      sendMessage,
      getMessageHandler,
      setMessages,
      messages,
    ]
  );

  return <ConversationContext.Provider value={value}>{children}</ConversationContext.Provider>;
};

export { ConversationContext, ConversationProvider };
