// Import necessary types and utilities

import { callApi } from '../callApis/apiUtils';
import { tags } from '../endpoints';
import { ApiEndpoint } from '../types';

export const getAllTagsService = async () => {
  return callApi({
    uriEndPoint: { ...tags.getAllTags.v1 } as ApiEndpoint,
  });
};
export const getTagsService = async ({ pathParams }: any) => {
  return callApi({
    uriEndPoint: { ...tags.getTagList.v1 } as ApiEndpoint,
    pathParams,
  });
};

export async function addTagService({ body }: any) {
  return callApi({
    uriEndPoint: { ...tags.addTag.v1 } as ApiEndpoint,
    body,
  });
}
export async function updateTagService({ body, pathParams }: any) {
  return callApi({
    uriEndPoint: { ...tags.updateTag.v1 } as ApiEndpoint,
    body,
    pathParams,
  });
}

export async function deleteTagService({ pathParams }: any) {
  return callApi({
    uriEndPoint: { ...tags.deleteTag.v1 } as ApiEndpoint,
    pathParams,
  });
}
