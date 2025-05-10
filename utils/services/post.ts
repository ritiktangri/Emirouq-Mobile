// Import necessary types and utilities

import { callApi } from '../callApis/apiUtils';
import post from '../endpoints/post';
import { ApiEndpoint } from '../types';

export async function createPostService({ body }: any) {
  return callApi({
    uriEndPoint: { ...post.createPost.v1 } as ApiEndpoint,
    body,
    multipart: true,
  });
}
export async function getPostService({ query, signal }: any) {
  return callApi({
    uriEndPoint: { ...post.getPostList.v1 } as ApiEndpoint,
    query,
    ...(signal ? { signal } : {}),
  });
}
export async function getSinglePostService({ pathParams }: any) {
  return callApi({
    uriEndPoint: { ...post.getSinglePost.v1 } as ApiEndpoint,
    pathParams,
  });
}
export async function updateFavourite({ pathParams }: any) {
  return callApi({
    uriEndPoint: { ...post.favourite.v1 } as ApiEndpoint,
    pathParams,
  });
}
export async function getFavourite({ query }: any) {
  return callApi({
    uriEndPoint: { ...post.getFavourite.v1 } as ApiEndpoint,
    query,
  });
}
