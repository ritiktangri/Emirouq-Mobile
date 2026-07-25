import { routes } from './routes';

const getNotificationContext = (item: any) =>
  String(item?.contextType || item?.eventType || '').toLowerCase();

const getNotificationData = (item: any) => item?.data || {};

export const getNotificationTarget = (item: any) => {
  const context = getNotificationContext(item);
  const data = getNotificationData(item);

  const adId = data?.adId || data?.postId || item?.contextId;
  const conversationId = data?.conversationId || item?.contextId;

  if (context.includes('message')) {
    return conversationId
      ? { pathname: routes.tabs.chatScreen(conversationId) }
      : { pathname: routes.tabs.chat };
  }

  if (
    context.includes('ad') ||
    context.includes('offer') ||
    context.includes('favorite') ||
    context.includes('saved') ||
    context.includes('boost') ||
    context.includes('budget')
  ) {
    return adId ? { pathname: routes.tabs.singlePost(adId) } : null;
  }

  if (
    context.includes('payment') ||
    context.includes('package') ||
    context.includes('refund') ||
    context.includes('renewal')
  ) {
    return {
      pathname: routes.tabs.profile.profile,
      params: {
        section: 'subscriptions',
      },
    };
  }

  if (
    context.includes('verification') ||
    context.includes('security') ||
    context.includes('account')
  ) {
    return {
      pathname: routes.tabs.profile.profile,
      params: {
        section: 'profile',
      },
    };
  }

  return null;
};
