// Import necessary types and utilities

import { callApi } from '../callApis/apiUtils';
import post from '../endpoints/post';
import { ApiEndpoint } from '../types';

export async function createPostService({ body }: any) {
  return callApi({
    uriEndPoint: {
      ...post.createPost.v1,
      // headerProps: {
      //   'Content-Type': 'multipart/form-data',
      //   accept: 'application/json',
      // },
    } as ApiEndpoint,
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
export async function updatePostService({ pathParams, body }: any) {
  return callApi({
    uriEndPoint: { ...post.updatePost.v1 } as ApiEndpoint,
    pathParams,
    body,
    multipart: true,
  });
}
export async function deletePostService({ pathParams }: any) {
  return callApi({
    uriEndPoint: { ...post.deletePost.v1 } as ApiEndpoint,
    pathParams,
  });
}
export async function likePostService({ pathParams }: any) {
  return callApi({
    uriEndPoint: { ...post.likePost.v1 } as ApiEndpoint,
    pathParams,
  });
}
export async function addCommentService({ pathParams, body }: any) {
  return callApi({
    uriEndPoint: { ...post.addComment.v1 } as ApiEndpoint,
    pathParams,
    body,
  });
}
