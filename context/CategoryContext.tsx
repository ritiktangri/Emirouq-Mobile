/* eslint-disable import/order */
import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { useQuery } from './QueryContext';

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
  };

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
      singleCategory,
      setSingleCategory,
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
      singleCategory,
      setSingleCategory,
      getSubCategoryList,
      subCategories,
    ]
  );

  return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>;
};

export { CategoryContext, CategoryProvider };
