/* eslint-disable import/order */
import { createContext, useContext, useState, useMemo, useCallback } from 'react';

import { getCategories } from '~/utils/services/category';
import { createPostService } from '~/utils/services/post';

const defaultProvider = {
  posts: {},
  setPosts: () => {},
  loading: '',
  btnLoading: false,
};
const PostContext = createContext(defaultProvider);
export const usePosts = () => useContext(PostContext);

const PostProvider = ({ children }: any) => {
  const [posts, setPosts] = useState([] as any);
  const [singlePost, setSinglePost] = useState({} as any);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [postLoading, setPostLoading] = useState(true);
  const [singlePostLoading, setSinglePostLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  const getCategoryList = async (
    signal: any,
    limit = 10,
    start = 0,
    keyword = '',
    onRefresh: boolean
  ) => {
    setPostLoading(true);
    const res: any = await getCategories({
      query: { limit, start, ...(keyword && { keyword }) },
      ...(signal && { signal }),
    });
    setTotal(res?.count);
    setPosts(res?.data);
    onRefresh || (keyword && setCurrentPage(1));
    setPostLoading(false);
    // if (keyword || onRefresh) {
    //   setTrades(res?.data);
    // } else {
    //   setTrades((prev: any) => [...(prev || []), ...res?.data]);
    // }
    // setHasMoreData(res?.count > limit);
    // setBottomLoading(false);
  };

  const createPost = useCallback(async (body: any, cb: any, errCb: any) => {
    setBtnLoading(true);
    const formData: any = new FormData();
    formData.append('title', body?.title);
    formData.append('description', body?.description);
    formData.append('price', body?.price);
    formData.append('condition', body?.condition);
    formData.append('location', body?.location);
    formData.append('timePeriod', body?.timePeriod);
    formData.append('properties', JSON.stringify(body?.properties));
    for (const imageAsset of body?.images) {
      formData.append('file', {
        // Use 'images' as the field name for multiple files
        uri: imageAsset.uri,
        name: imageAsset.fileName,
        type: imageAsset.type,
      });
    }
    createPostService({
      body: formData,
      pathParams: {
        id: body?.subCategory,
      },
    })
      .then((res) => {
        // toast.success('Category created successfully');
        setBtnLoading(false);
        // getCategories();
        cb && cb();
      })
      .catch((err: any) => {
        // toast.error(err.message);
        errCb && errCb(err);
        setBtnLoading(false);
      })
      .finally(() => {
        setBtnLoading(false);
      });
  }, []);
  //   const getSubCategoryList = async (
  //     id: any,
  //     signal: any,
  //     limit = 10,
  //     start = 0,
  //     keyword = '',
  //     onRefresh: boolean
  //   ) => {
  //     // setCategoryLoading(true);
  //     const res: any = await getSubCategories({
  //       query: { limit, start, ...(keyword && { keyword }) },
  //       ...(signal && { signal }),
  //       pathParams: { id },
  //     });
  //     setTotal(res?.count);
  //     setSubCategories(res?.data);
  //     onRefresh || (keyword && setCurrentPage(1));
  //     // setCategoryLoading(false);
  //     // if (keyword || onRefresh) {
  //     //   setTrades(res?.data);
  //     // } else {
  //     //   setTrades((prev: any) => [...(prev || []), ...res?.data]);
  //     // }
  //     // setHasMoreData(res?.count > limit);
  //     // setBottomLoading(false);
  //   };

  //   const getSingleTrade = async (id: any) => {
  //     setSingleCategoryLoading(true);
  //     const res: any = await getSingleTradeService({
  //       pathParams: { id },
  //     });
  //     setSingleCategory(res?.data);
  //     setSingleCategoryLoading(false);
  //   };

  //   useEffect(() => {
  //     const controller = new AbortController();
  //     const signal = controller.signal;
  //     getCategoryList(signal, 10, 0, keyword, false);
  //     return () => {
  //       controller.abort();
  //     };
  //   }, [globalQueries]);
  const value: any = useMemo(
    () => ({
      setPosts,
      posts,
      postLoading,
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
      singlePost,
      setSinglePost,
      //   getSingleTrade,
      singlePostLoading,
      createPost,
      btnLoading,
    }),
    [
      setPosts,
      posts,
      postLoading,
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
      singlePost,
      setSinglePost,
      //   getSingleTrade,
      singlePostLoading,
      createPost,
      btnLoading,
    ]
  );

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export { PostContext, PostProvider };
