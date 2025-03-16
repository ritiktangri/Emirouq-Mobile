// Import necessary types and utilities

import { callApi } from '../callApis/apiUtils';
import post from '../endpoints/post';
import { ApiEndpoint } from '../types';


export async function createPostService({ body , pathParams}: any) {
  return callApi({
    uriEndPoint: { ...post.createPost.v1 } as ApiEndpoint,
    pathParams,
    body,
    multipart: true,
  });
}
