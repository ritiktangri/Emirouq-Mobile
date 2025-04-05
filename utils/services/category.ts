// Import necessary types and utilities

import { callApi } from '../callApis/apiUtils';
import { category } from '../endpoints';
import { ApiEndpoint } from '../types';

export const getSingleCategory = async (id: string) => {
  return callApi({
    uriEndPoint: { ...category.getSingleCategory.v1 } as ApiEndpoint,
    pathParams: { id },
  });
};

export const getCategories = async ({ query }: any) => {
  return callApi({
    uriEndPoint: { ...category.getCategories.v1 } as ApiEndpoint,
    query,
  });
};
export const getSubCategories = async ({ query, pathParams }: any) => {
  return callApi({
    uriEndPoint: { ...category.getSubCategories.v1 } as ApiEndpoint,
    query,
    pathParams,
  });
};

export async function createCategoryService({ body }: any) {
  return callApi({
    uriEndPoint: { ...category.createCategory.v1 } as ApiEndpoint,
    body,
  });
}
export async function updateCategoryService({ body, pathParams }: any) {
  return callApi({
    uriEndPoint: { ...category.updateCategory.v1 } as ApiEndpoint,
    body,
    pathParams,
  });
}

export async function deleteCategoryService({ pathParams }: any) {
  return callApi({
    uriEndPoint: { ...category.deleteCategory.v1 } as ApiEndpoint,
    pathParams,
  });
}
