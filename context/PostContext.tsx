/* eslint-disable import/order */
import { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';

import { createPostService, getPostService, getSinglePostService } from '~/utils/services/post';

const defaultProvider = {
  posts: [] as any,
  setPosts: () => {},
  loading: '',
  btnLoading: false,
  createPost: (a: any, b: any, c: any) => {},
  keyword: '',
  setKeyword: (a: any) => {},
  total: 0,
  singlePost: {} as any,
  setSinglePost: (a: any) => {},
  singlePostLoading: false,
  getAdsList: (a: any, b: any, c: any, d: any, e: any, f: any) => {},
  setSinglePostLoading: (a: any) => {},
  setBtnLoading: (a: any) => {},
  start: 0,
  setStart: (a: any) => {},
  setStatus: (a: any) => {},
  getSinglePost: (a: any, b: any) => {},
  status: '' as any,
};
const PostContext = createContext(defaultProvider);
export const usePosts = () => useContext(PostContext);

const PostProvider = ({ children }: any) => {
  const [posts, setPosts] = useState([] as any);
  const [singlePost, setSinglePost] = useState({} as any);
  const [start, setStart] = useState(0);
  const [total, setTotal] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [singlePostLoading, setSinglePostLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  const createPost = useCallback(async (body: any, cb: any, errCb: any) => {
    setBtnLoading(true);
    const formData: any = new FormData();
    formData.append('title', body?.title);
    formData.append('description', body?.description);
    formData.append('price', body?.price);
    formData.append('condition', body?.condition);
    formData.append('location', body?.location);
    formData.append('timePeriod', body?.timePeriod);
    formData.append('category', body?.category);
    formData.append('subCategory', body?.subCategory);
    body?.isDraft && formData.append('isDraft', body?.isDraft);
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
    })
      .then((res) => {
        setBtnLoading(false);
        cb && cb();
      })
      .catch((err: any) => {
        errCb && errCb(err);
        setBtnLoading(false);
      })
      .finally(() => {
        setBtnLoading(false);
      });
  }, []);

  const getAdsList = async (
    signal: any,
    limit = 10,
    start = 0,
    keyword = '',
    status = '',
    onRefresh: boolean
  ) => {
    setLoading(true);
    const res: any = await getPostService({
      query: { limit, start, ...(keyword && { keyword }), status },
      ...(signal && { signal }),
    });
    setTotal(res?.count);
    setPosts(res?.data);
    setLoading(false);
    onRefresh || (keyword && setKeyword(''));
  };
  const getSinglePost = async (id: string, cb: any) => {
    setSinglePostLoading(true);
    getSinglePostService({ pathParams: { id } })
      .then((res: any) => {
        setSinglePost(res?.data);
        setSinglePostLoading(false);
        cb && cb(res?.data);
      })
      .catch(() => {
        setSinglePostLoading(false);
      })
      .finally(() => {});
  };

  const value: any = useMemo(
    () => ({
      setPosts,
      posts,
      loading,
      keyword,
      setKeyword,
      total,
      singlePost,
      setSinglePost,
      singlePostLoading,
      createPost,
      btnLoading,
      getAdsList,
      setStart,
      start,
      setStatus,
      status,
      getSinglePost,
    }),
    [
      setPosts,
      posts,
      loading,
      keyword,
      setKeyword,
      total,
      singlePost,
      setSinglePost,
      singlePostLoading,
      createPost,
      btnLoading,
      getAdsList,
      setStart,
      start,
      setStatus,
      status,
      getSinglePost,
    ]
  );

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export { PostContext, PostProvider };
