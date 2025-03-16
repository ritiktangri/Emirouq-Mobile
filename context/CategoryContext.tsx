/* eslint-disable import/order */
import { createContext, useContext, useState, useMemo, useEffect, useCallback } from 'react';
import { cumulativeStatsService, getSingleTradeService, getTrades } from '~/utils/services/trade';
import { useQuery } from './QueryContext';
import { getColumns } from '~/components/Tabs/Trades/Table/columns';
import { width } from '~/constants/Colors';
import { useTheme } from './ThemeContext';
import { useAuth } from './AuthContext';
import { getStorageAsync } from '~/hooks/useStorageState';
import { getCategories, getSubCategories } from '~/utils/services/category';

const defaultProvider = {
  categories: {},
  setCategories: () => {},
  loading: '',
};
const CategoryContext = createContext(defaultProvider);
export const useCategory = () => useContext(CategoryContext);

const CategoryProvider = ({ children }: any) => {
  const [categories, setCategories] = useState([] as any);
  const [subCategories, setSubCategories] = useState([] as any);
  const [singleCategory, setSingleCategory] = useState({} as any);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { globalQueries } = useQuery();
  const [keyword, setKeyword] = useState('');
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [singleCategoryLoading, setSingleCategoryLoading] = useState(true);

  //filter keys from trade table
  // Toggle individual row selection

  const getCategoryList = async (
    signal: any,
    limit = 10,
    start = 0,
    keyword = '',
    onRefresh: boolean
  ) => {
    setCategoryLoading(true);
    const res: any = await getCategories({
      query: { limit, start, ...(keyword && { keyword }) },
      ...(signal && { signal }),
    });
    setTotal(res?.count);
    setCategories(res?.data);
    onRefresh || (keyword && setCurrentPage(1));
    setCategoryLoading(false);
    // if (keyword || onRefresh) {
    //   setTrades(res?.data);
    // } else {
    //   setTrades((prev: any) => [...(prev || []), ...res?.data]);
    // }
    // setHasMoreData(res?.count > limit);
    // setBottomLoading(false);
  };
  const getSubCategoryList = async (
    id: any,
    signal: any,
    limit = 10,
    start = 0,
    keyword = '',
    onRefresh: boolean
  ) => {
    // setCategoryLoading(true);
    const res: any = await getSubCategories({
      query: { limit, start, ...(keyword && { keyword }) },
      ...(signal && { signal }),
      pathParams: { id },
    });
    setTotal(res?.count);
    setSubCategories(res?.data);
    onRefresh || (keyword && setCurrentPage(1));
    // setCategoryLoading(false);
    // if (keyword || onRefresh) {
    //   setTrades(res?.data);
    // } else {
    //   setTrades((prev: any) => [...(prev || []), ...res?.data]);
    // }
    // setHasMoreData(res?.count > limit);
    // setBottomLoading(false);
  };

  const getSingleTrade = async (id: any) => {
    setSingleCategoryLoading(true);
    const res: any = await getSingleTradeService({
      pathParams: { id },
    });
    setSingleCategory(res?.data);
    setSingleCategoryLoading(false);
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
    getCategoryList(signal, 10, 0, keyword, false);
    // Cleanup function to abort the request if the component unmounts or dependencies change
    return () => {
      controller.abort();
    };
  }, [globalQueries]);
  const value: any = useMemo(
    () => ({
      setCategories,
      categories,
      categoryLoading,
      getCategoryList,
      keyword,
      setKeyword,
      setCurrentPage,
      currentPage,
      total,
      // setBottomLoading,
      // bottomLoading,
      // hasMoreData,
      // setHasMoreData,
      // handleOnEndReached,
      singleCategory,
      setSingleCategory,
      getSingleTrade,
      singleCategoryLoading,
      getSubCategoryList,
      subCategories,
    }),
    [
      setCategories,
      categories,
      categoryLoading,
      getCategoryList,
      keyword,
      setKeyword,
      setCurrentPage,
      currentPage,
      total,
      // setBottomLoading,
      // bottomLoading,
      // hasMoreData,
      // setHasMoreData,
      // handleOnEndReached,
      singleCategory,
      setSingleCategory,
      getSingleTrade,
      singleCategoryLoading,
      getSubCategoryList,
      subCategories,
    ]
  );

  return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>;
};

export { CategoryContext, CategoryProvider };
