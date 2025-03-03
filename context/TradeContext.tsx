/* eslint-disable import/order */
import { createContext, useContext, useState, useMemo, useEffect, useCallback } from 'react';
import { cumulativeStatsService, getSingleTradeService, getTrades } from '~/utils/services/trade';
import { useQuery } from './QueryContext';
import { getColumns } from '~/components/Tabs/Trades/Table/columns';
import { width } from '~/constants/Colors';
import { useTheme } from './ThemeContext';
import { useAuth } from './AuthContext';
import { getStorageAsync } from '~/hooks/useStorageState';

const defaultProvider = {
  trades: {},
  setTrades: () => {},
  loading: '',
};
const TradeContext = createContext(defaultProvider);
export const useTrade = () => useContext(TradeContext);

const TradeProvider = ({ children }: any) => {
  const [trades, setTrades] = useState([] as any);
  const { user } = useAuth();
  const [singleTrade, setSingleTrade] = useState({} as any);
  // const [hasMoreData, setHasMoreData] = useState(true); // Assume more data initially
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  // const [bottomLoading, setBottomLoading] = useState(false);
  const { globalQueries } = useQuery();
  const [keyword, setKeyword] = useState('');
  const [tradeLoading, setTradeLoading] = useState(true);
  const [singleTradeLoading, setSingleTradeLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [cumulative, setCumulative] = useState({});
  //filter keys from trade table
  // Toggle individual row selection

  const [filterModal, setFilterModal] = useState(false);
  const [bulkActionModal, setBulkActionModal] = useState(false);
  const [filterColumns, setFilterColumns] = useState([
    'select',
    'accountId',
    'status',
    'result',
    'tradeType',
    'symbol',
    'openDate',
    'closeDate',
    'avgEntryPrice',
    'avgExitPrice',
    'netPnl',
    'totalCommission',
    'strike',
    'instrument',
    'expDate',
    'contractMultiplier',
  ]);

  const toggleRowSelection = useCallback((uuid: any) => {
    setSelectedRows((prevSelectedRows: any) => {
      const newSelectedRows = new Set(prevSelectedRows);
      if (newSelectedRows.has(uuid)) {
        newSelectedRows.delete(uuid);
      } else {
        newSelectedRows.add(uuid);
      }
      return newSelectedRows;
    });
  }, []);

  const columns = useMemo(() => {
    return getColumns({
      selectedItems: selectedRows,
      handleSelectItem: toggleRowSelection,
      user,
      width,
    });
  }, [selectedRows, user, width]);

  useEffect(() => {
    const getCacheFilterColumns = async () => {
      const res = await getStorageAsync('filterColumns');
      if (res) {
        setFilterColumns(JSON.parse(res));
      }
    };
    getCacheFilterColumns();
  }, []);

  // Select all/deselect all
  const toggleSelectAll = useCallback(() => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.size === trades.length) {
        return new Set();
      } else {
        return new Set(trades.map((item: any) => item?.uuid));
      }
    });
  }, [trades]);

  const cumulativeChart = async (signal: any) => {
    setChartLoading(true);
    const res: any = await cumulativeStatsService({
      query: { ...globalQueries },
      signal,
    });
    setCumulative(res);
    setChartLoading(false);
  };
  const getTradesList = async (
    signal: any,
    limit = 10,
    start = 0,
    keyword = '',
    onRefresh: boolean
  ) => {
    setTradeLoading(true);
    const res: any = await getTrades({
      query: { ...globalQueries, limit, start, ...(keyword && { keyword }) },
      ...(signal && { signal }),
    });
    setTotal(res?.count);
    setTrades(res?.data);
    onRefresh || (keyword && setCurrentPage(1));
    setTradeLoading(false);
    // if (keyword || onRefresh) {
    //   setTrades(res?.data);
    // } else {
    //   setTrades((prev: any) => [...(prev || []), ...res?.data]);
    // }
    // setHasMoreData(res?.count > limit);
    // setBottomLoading(false);
  };

  const getSingleTrade = async (id: any) => {
    setSingleTradeLoading(true);
    const res: any = await getSingleTradeService({
      pathParams: { id },
    });
    setSingleTrade(res?.data);
    setSingleTradeLoading(false);
  };

  // Debounce function using a ref to hold the timeout ID
  // const debounceRef: any = useRef(null);
  // const debounceTime = 100; // Adjust this value as needed (e.g., 300ms, 500ms, etc.)
  // const loadMoreData = useCallback(() => {
  //   if (hasMoreData && !bottomLoading) {
  //     setBottomLoading(true);
  //     const tradeLength = trades?.length || 0;
  //     getTradesList(null, 15, tradeLength + 15, '');
  //   }
  // }, [hasMoreData, tradeLoading, trades, getTradesList]);

  // const handleOnEndReached = useCallback(() => {
  //   if (bottomLoading) return;
  //   if (debounceRef.current) {
  //     clearTimeout(debounceRef.current);
  //   }
  //   debounceRef.current = setTimeout(() => {
  //     loadMoreData();
  //   }, debounceTime);
  // }, [loadMoreData]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    getTradesList(signal, 10, 0, keyword, false);
    cumulativeChart(signal);
    // Cleanup function to abort the request if the component unmounts or dependencies change
    return () => {
      controller.abort();
    };
  }, [globalQueries]);
  const value: any = useMemo(
    () => ({
      setTrades,
      trades,
      tradeLoading,
      getTradesList,
      cumulativeChart,
      cumulative,
      keyword,
      setKeyword,
      setCurrentPage,
      currentPage,
      total,
      toggleSelectAll,
      selectedRows,
      setSelectedRows,
      chartLoading,
      // setBottomLoading,
      // bottomLoading,
      // hasMoreData,
      // setHasMoreData,
      // handleOnEndReached,
      singleTrade,
      setSingleTrade,
      getSingleTrade,
      singleTradeLoading,
      //filter keys from trade table
      toggleRowSelection,
      columns,
      setFilterColumns,
      filterColumns,
      setFilterModal,
      filterModal,
      setBulkActionModal,
      bulkActionModal,
    }),
    [
      trades,
      setTrades,
      tradeLoading,
      getTradesList,
      cumulativeChart,
      cumulative,
      keyword,
      setKeyword,
      total,
      setCurrentPage,
      currentPage,
      toggleSelectAll,
      selectedRows,
      setSelectedRows,
      chartLoading,

      // bottomLoading,
      // sselectedRowsetBottomLoading,
      // hasMoreData,
      // setHasMoreData,
      // handleOnEndReached,
      singleTrade,
      setSingleTrade,
      getSingleTrade,
      singleTradeLoading,
      setFilterColumns,
      filterColumns,
      setFilterModal,
      filterModal,
      toggleRowSelection,
      columns,
      setBulkActionModal,
      bulkActionModal,
    ]
  );

  return <TradeContext.Provider value={value}>{children}</TradeContext.Provider>;
};

export { TradeContext, TradeProvider };
