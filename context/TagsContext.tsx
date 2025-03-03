/* eslint-disable import/order */

import {
  createCategoryService,
  deleteCategoryService,
  getCategoryWithTagsService,
  updateCategoryService,
} from '~/utils/services/category';
import { addTagService, deleteTagService, updateTagService } from '~/utils/services/tags';
// ** React Imports
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';
import { useDashboard } from './DashboardContext';
import { getStorageAsync } from '~/hooks/useStorageState';

// ** Defaults
const defaultProvider = {
  data: [],
  setData: () => {},
  loading: true,
  setLoading: () => {},
  setBtnLoading: () => {},
  btnLoading: '',
};
const TagsContext = createContext(defaultProvider as any);
export const useTags = () => useContext(TagsContext);

const TagsProviders = ({ children }: any) => {
  const [data, setData] = useState(defaultProvider?.data);
  const [btnLoading, setBtnLoading] = useState('' as any);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [selectCategory, setSelectCategory] = useState(null as any);
  const { tagsStats }: any = useDashboard();

  const getCategories = async () => {
    setLoading(true);
    const res: any = await getCategoryWithTagsService();
    setData(res.data);
    setLoading(false);
  };

  useEffect(() => {
    if (user?.uuid) {
      getCategories();
    }
  }, [user?.uuid]);

  const createCategory = async ({ body }: any, cb: any, errCb: any) => {
    setBtnLoading(true);
    createCategoryService({
      body: {
        name: body?.name,
        color: body?.color,
      },
    })
      .then(() => {
        // toast.success('Category created successfully');
        setBtnLoading(false);
        getCategories();
        cb() && cb();
      })
      .catch((err) => {
        // toast.error(err.message);
        errCb() && errCb(err);
        setBtnLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const updateCategory = async ({ id, body }: any, cb: any, errCb: any) => {
    setBtnLoading(true);
    updateCategoryService({
      body: {
        name: body?.name,
        color: body?.color,
      },
      pathParams: {
        id,
      },
    })
      .then(() => {
        // toast.success('Category updated successfully');
        setBtnLoading(false);
        getCategories();
        cb() && cb();
      })
      .catch((err) => {
        // toast.error(err.message);
        errCb() && errCb(err);
        setBtnLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const addTag = async ({ body }: any, cb: any, errCb: any) => {
    setBtnLoading(true);
    addTagService({
      body,
    })
      .then(() => {
        // toast.success('Tag created successfully');
        setBtnLoading(false);
        getCategories();
        cb() && cb();
      })
      .catch((err) => {
        // toast.error(err.message);
        errCb() && errCb(err);
        setBtnLoading(false);
      })
      .finally(() => {});
  };
  const updateTag = async ({ id, body }: any, cb: any, errCb: any) => {
    setBtnLoading(true);
    updateTagService({
      body,
      pathParams: {
        id,
      },
    })
      .then(() => {
        // toast.success('Tag updated successfully');
        setBtnLoading(false);
        getCategories();
        // getTags();
        cb() && cb();
      })
      .catch((err) => {
        // toast.error(err.message);
        errCb() && errCb(err);
        setBtnLoading(false);
      })
      .finally(() => {});
  };
  const deleteTags = ({ id }: any, cb: any, errCb: any) => {
    setBtnLoading(true);
    deleteTagService({ pathParams: { id } })
      .then(() => {
        setBtnLoading(false);
        getCategories();
        // toast.success('Tag deleted successfully');
        cb() && cb();
      })
      .catch((err) => {
        // toast.error(err?.message);
        setBtnLoading(false);
        errCb() && errCb(err);
      });
  };
  const deleteCategory = ({ id }: any, cb: any, errCb: any) => {
    setBtnLoading(true);

    deleteCategoryService({
      pathParams: {
        id,
      },
    })
      .then(() => {
        setBtnLoading(false);
        // toast.success('Category deleted successfully');
        getCategories();
        cb() && cb();
      })
      .catch((error) => {
        // toast.error(error?.message);
        setBtnLoading(false);
        errCb() && errCb(error);
      })
      .finally(() => {});
  };

  const getChartData = (name: string) => {
    const category: any = data.find((tag: any) => tag.name === name);

    if (!category) {
      return []; // Handle case where category is not found
    }

    const tagsStatsArray = tagsStats.find((tag: any) => tag._id === category.uuid);

    if (!tagsStatsArray) {
      return []; // Handle case where stats are not found
    }

    const totalTrades = tagsStatsArray.tags.reduce((acc: number, tag: any) => acc + tag.trades, 0);

    const sortedTags = [...tagsStatsArray.tags].sort((a, b) => b.trades - a.trades); // Sort outside of map

    const chartData: any = sortedTags.map((tag) => {
      const percent = totalTrades ? Number(((tag.trades / totalTrades) * 100).toFixed(2)) : 0;
      const tagName = category.tags.find((t: any) => t.uuid === tag.tag)?.name || ''; // Provide a default value

      // Color mapping needs to be defined. Assuming a function getColorForTag exists.

      return {
        name: tagName,
        value: tag.trades,
        percent,
        tagId: tag.tag,
      };
    });

    return chartData;
  };
  const getCategoryColor = useCallback(
    (name: string) => {
      const category: any = data.find((tag: any) => tag.name === name);
      return category?.color;
    },
    [data]
  );

  useEffect(() => {
    async function fetchData() {
      const selectedTag: any = await getStorageAsync('selectedTag');
      if (selectedTag) {
        setSelectCategory(selectedTag);
      }
    }
    fetchData();
  }, []);
  const category: any = useMemo(
    () => data?.find((tag: any) => tag?.uuid === selectCategory?.uuid),
    [data, selectCategory?.uuid]
  );
  const selectedTagsArray = useMemo(
    () => tagsStats?.find((tag: any) => tag?._id === category?.uuid),
    [tagsStats, category?.uuid]
  );

  const onSave = useCallback(({ body, id, type }: any, cb: any, errCb: any) => {
    const reportServices = {
      'add-category': createCategory,
      'edit-category': updateCategory,
      'delete-category': deleteCategory,
      'add-tag': addTag,
      'delete-tag': deleteTags,
      'edit-tag': updateTag,
    };
    if (reportServices.hasOwnProperty(type)) {
      const service: any = reportServices[type as keyof typeof reportServices];
      try {
        service(
          {
            body,
            id,
          },
          cb,
          errCb
        );
      } catch (error) {
        console.log(error);
      } finally {
      }
    }
  }, []);

  const values = {
    setLoading,
    loading,
    btnLoading,
    setBtnLoading,
    getCategories,
    tagList: data,
    setTagList: setData,
    updateCategory,
    createCategory,
    updateTag,
    addTag,
    deleteTags,
    deleteCategory,
    getChartData,
    getCategoryColor,
    selectedTagsArray,
    setSelectCategory,
    selectCategory,
    onSave,
  };
  return <TagsContext.Provider value={values as any}>{children}</TagsContext.Provider>;
};

export { TagsContext, TagsProviders };
