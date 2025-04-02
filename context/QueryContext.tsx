/* eslint-disable import/order */
import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { useAuth } from './AuthContext';
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

  const value: any = useMemo(
    () => ({
      globalQueries,
      setGlobalQueries,
      setQuery,
      clearQuery,
      clearAllQueries,
    }),
    [globalQueries, setGlobalQueries, setQuery, clearQuery, clearAllQueries]
  );

  return <QueryContext.Provider value={value}>{children}</QueryContext.Provider>;
};

export { QueryContext, QueryProvider };
