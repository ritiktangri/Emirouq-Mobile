/* eslint-disable import/order */
import { createContext, useContext, useState, useMemo, useEffect, useCallback } from 'react';

import {
  closeOpenSupportService,
  createActivityService,
  createSupportTicketService,
  deleteActivityService,
  deleteSupportTicketService,
  getActivitiesService,
  getSupportTickerService,
  readTicketService,
} from '~/utils/services/support';
import { useAuth } from './AuthContext';

const defaultProvider = {};
const SupportContext = createContext(defaultProvider);
export const useSupport = () => useContext(SupportContext);

const SupportProvider = ({ children }: any) => {
  const [supportTickets, setSupportTickets] = useState([] as any);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [supportLoading, setSupportLoading] = useState(true);
  const [singleSupportLoading, setSingleSupportLoading] = useState(true);
  const { getUnSeenCount } = useAuth();
  const [activityList, setActivityList] = useState({});
  const [status, setStatus] = useState('open');
  const [type, setType] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);
  const getSupportList = async (
    signal: any,
    limit = 10,
    start = 0,
    keyword = '',
    status: string,
    type: string,
    onRefresh: boolean
  ) => {
    try {
      setSupportLoading(true);
      const res: any = await getSupportTickerService({
        query: { limit, start, status, keyword, type },
        ...(signal && { signal }),
      });
      setTotal(res?.count || 0);
      setSupportTickets(res?.data);
      onRefresh || (keyword && setCurrentPage(0));
    } catch (error) {
      // Handle errors appropriately, e.g., log them
      console.error('Error fetching support tickets:', error);
    } finally {
      setSupportLoading(false);
    }
  };

  const saveSupportTicket = useCallback(
    async (data: any, cb: any, errorCb: any) => {
      const formData: any = new FormData();
      formData.append('subject', data?.subject);
      formData.append('type', data?.type);
      formData.append('description', data?.description);
      for (const imageAsset of data?.images) {
        formData.append('image', {
          // Use 'images' as the field name for multiple files
          uri: imageAsset.uri,
          name: imageAsset.fileName,
          type: imageAsset.type,
        });
      }

      setSaveLoading(true);
      createSupportTicketService({
        body: formData,
      })
        .then((res) => {
          getSupportList(null, 10, 0, keyword, 'open', '', false);
          setSaveLoading(false);
          cb && cb();
        })
        .catch(() => {
          setSaveLoading(false);
          errorCb && errorCb();
        });
    },
    [keyword, status, type, getSupportList]
  );
  const deleteSupportTicket = useCallback(async (id: string, status: any, type: any) => {
    setSaveLoading(true);
    deleteSupportTicketService({
      pathParams: {
        supportId: id,
      },
    })
      .then(() => {
        getSupportList(null, 10, 0, '', status, type, false);
        setSaveLoading(false);
      })
      .catch((error) => {
        setSaveLoading(false);
        // Handle errors appropriately, e.g., log them
        console.error('Error deleting support ticket:', error);
      });
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    // Immediately set loading to true when the effect runs
    setSupportLoading(true);

    getSupportList(signal, 10, 0, keyword, status, type, false);

    return () => {
      controller.abort();
    };
  }, [keyword]); // Add keyword to the dependency array

  //activity services
  const getActivityList = ({ supportId, query }: any) => {
    if (!supportId) return;
    setSingleSupportLoading(true);
    getActivitiesService({ query, pathParams: { supportId } })
      .then((res: any) => {
        setActivityList(res?.data);
      })
      .finally(() => {
        setSingleSupportLoading(false);
      });
  };

  const createActivity = ({ body, supportId }: any, cb: any) => {
    setSaveLoading(true);
    createActivityService({ body, pathParams: { supportId } })
      .then(() => {
        getActivityList({ supportId });
        // toast.success('Message sent successfully');
        cb();
      })
      .catch((err) => {
        // toast.error(err?.message || 'Error creating activity');
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const deleteActivity = ({ supportId }: any) => {
    deleteActivityService({ pathParams: { supportId } })
      .then((res) => {
        getActivityList({ supportId });
      })
      .catch((err) => {
        // toast.error(err?.message || 'Error deleting ticket');
      });
  };

  const closeOpenSupport = ({ supportId, status }: any, cb: any, errCb: any) => {
    closeOpenSupportService({
      pathParams: { supportId },
      body: {
        status,
      },
    })
      .then(() => {
        getActivityList({
          supportId,
          query: {},
        });
        getSupportList('', 10, 0, keyword, 'open', '', false);
        cb && cb();
      })
      .catch(() => {
        errCb && errCb();
      });
  };
  const readTicket = ({ supportId }: any) => {
    if (!supportId) return;
    readTicketService({ pathParams: { supportId } })
      .then(() => {
        getUnSeenCount();
        getSupportList('', 10, 0, keyword, 'open', '', false);
      })
      .catch(() => {});
  };

  const value: any = useMemo(
    () => ({
      setSupportTickets,
      supportTickets,
      supportLoading,
      keyword,
      setKeyword,
      setCurrentPage,
      currentPage,
      total,
      getSupportList,
      status,
      setStatus,
      setType,
      type,
      saveSupportTicket,
      saveLoading,
      deleteSupportTicket,
      //activity
      getActivityList,
      activityList,
      deleteActivity,
      createActivity,
      closeOpenSupport,
      readTicket,
      singleSupportLoading,
    }),
    [
      setSupportTickets,
      supportTickets,
      supportLoading,
      keyword,
      setKeyword,
      total,
      setCurrentPage,
      currentPage,
      getSupportList,
      setStatus,
      setType,
      status,
      type,
      saveSupportTicket,
      saveLoading,
      deleteSupportTicket,
      //activity
      getActivityList,
      activityList,
      deleteActivity,
      createActivity,
      closeOpenSupport,
      readTicket,
      singleSupportLoading,
    ]
  );

  return <SupportContext.Provider value={value}>{children}</SupportContext.Provider>;
};

export { SupportContext, SupportProvider };
