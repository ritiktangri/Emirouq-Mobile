/* eslint-disable import/order */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useQuery } from './QueryContext';
import { getTradesService } from '~/utils/services/trading-diary';
import dayjs from 'dayjs';

const defaultProvider = {};
const DiaryContext = createContext(defaultProvider);
export const useDiary = () => useContext(DiaryContext);

const DiaryProvider = ({ children }: any) => {
  const { globalQueries } = useQuery();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const getTrades = () => {
    setLoading(true);
    getTradesService({
      query: {
        ...globalQueries,
        startDate: globalQueries?.startDate
          ? dayjs(globalQueries?.startDate).format('YYYY-MM-DD')
          : dayjs().subtract(10, 'week').format('YYYY-MM-DD'),
        endDate: globalQueries?.endDate
          ? dayjs(globalQueries?.endDate).format('YYYY-MM-DD')
          : dayjs().format('YYYY-MM-DD'),
      },
    })
      .then((res: any) => {
        setData(res?.data || []);
        setLoading(false);
      })
      .catch(() => {})
      .finally(() => {});
  };
  useEffect(() => {
    getTrades();
  }, [globalQueries]);
  const value: any = useMemo(
    () => ({
      data,
      loading,
      getTrades,
    }),
    [data, loading, getTrades]
  );

  return <DiaryContext.Provider value={value}>{children}</DiaryContext.Provider>;
};

export { DiaryContext, DiaryProvider };
