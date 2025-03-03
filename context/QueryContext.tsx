/* eslint-disable import/order */
import { createContext, useContext, useState, useMemo, useEffect, useCallback } from 'react';
import DefaultTheme from '~/theme/DefaultTheme';
import { useAuth } from './AuthContext';
import { DefaultText as Text } from '~/components/common/DefaultText';
import dayjs from 'dayjs';
type QueryContextType = {
  globalQueries: any;
  setGlobalQueries: (newQueries: any) => void;
  setQuery: (newQueries: any) => void;
  clearQuery: (key: any) => void;
  clearAllQueries: () => void;
};
type QueryQueriesProps = {
  accountIds?: string;
  startDate?: string;
  endDate?: string;
  [key: string]: any;
};
const defaultProvider = {
  globalQueries: {},
  setGlobalQueries: () => {},
  setQuery: () => {},
  clearQuery: () => {},
  clearAllQueries: () => {},
};
const QueryContext = createContext(defaultProvider as QueryContextType);
export const useQuery = () => useContext(QueryContext);

const QueryProvider = ({ children }: any) => {
  const { activeAccount } = useAuth();
  const [globalQueries, setGlobalQueries] = useState({} as QueryQueriesProps);
  useEffect(() => {
    if (activeAccount?.activeAccountIds) {
      setGlobalQueries({
        ...globalQueries,
        accountIds: activeAccount?.activeAccountIds?.join(','),
      });
    }
  }, [activeAccount?.activeAccountIds?.join(',')]);
  const setQuery = (newQueries: any) => {
    // Merge with current queries to avoid overwriting
    const updatedQueries = { ...globalQueries, ...newQueries };
    setGlobalQueries(updatedQueries);
  };

  const clearQuery = (key: any) => {
    const updatedQueries: any = { ...globalQueries };
    delete updatedQueries[key];
    setGlobalQueries(updatedQueries);
  };

  const clearAllQueries = () => {
    setGlobalQueries({});
  };

  const selectedDateText = useMemo(() => {
    return (
      <Text className={`font-poppinsMedium text-xs text-gray-400 dark:text-dashboard_card_text `}>
        {globalQueries?.startDate && globalQueries?.endDate
          ? `From ${dayjs(globalQueries?.startDate).format('DD MMM, YYYY')} to ${dayjs(globalQueries?.endDate).format('DD MMM, YYYY')}`
          : globalQueries?.startDate
            ? `From ${dayjs(globalQueries?.startDate).format('DD MMM, YYYY')}`
            : '(All Dates)'}
      </Text>
    );
  }, [globalQueries.startDate, globalQueries.endDate]);
  const value: any = useMemo(
    () => ({
      globalQueries,
      setGlobalQueries,
      setQuery,
      clearQuery,
      clearAllQueries,
      selectedDateText,
    }),
    [globalQueries, setGlobalQueries, setQuery, clearQuery, clearAllQueries, selectedDateText]
  );

  return <QueryContext.Provider value={value}>{children}</QueryContext.Provider>;
};

export { QueryContext, QueryProvider };
