/* eslint-disable import/order */
/* eslint-disable prettier/prettier */

import queryString from 'querystring';
import Axios from 'axios';
import { getStorageAsync } from '~/hooks/useStorageState';
export const socketHostname = () => 'wss://api-v1.emirouq.ae';
// export const socketHostname = () => 'ws://192.168.29.33:4001';

export const hostname = () => {
  const hostUrl = 'https://api-v1.emirouq.ae';
  // const hostUrl = 'http://192.168.29.33:4001';
  return hostUrl;
};
const hostUrl = hostname();
export const makeUrl = ({ uri = '', pathParams, query, version }: any, host: any) =>
  `${host || hostUrl}${version || ''}${uri
    .split('/')
    .map((param: any) => (param.charAt(0) === ':' ? encodeURI(pathParams[param.slice(1)]) : param))
    .join('/')}${query ? `?${queryString.stringify(query)}` : ''}`;
export const getDefaultHeaders = async (multipart: boolean) => {
  const authorization = await getStorageAsync('accessToken');
  const contentType = multipart ? 'multipart/form-data' : 'application/json';
  return {
    authorization,
    'Content-Type': contentType,
  };
};
/**
 * Returns true if the input apiResponse has errors.
 * @param {*} apiResponse
 */
export const hasErrors = (apiResponse: any) => {
  const { error } = apiResponse;
  if (error) {
    return true;
  }
  return false;
};
/**
 * Generic utility method that should be called when invoking any REST API
 *
 * This function streamlines the functionality to make api calls,
 * and carries easy management for controlling versions of the apis
 *
 * @since 1.0.0
 *
 * @todo all the incoming values for the APIParamaters.pathParams and APIParamaters.query
 * should be uri encoded.
 * @alias callAxios
 * @memberof apiUtils
 * @param {Object} APIParamaters - Set of objects required to make the api call.
 * @param {Object} APIParamaters.uriEndPoint - Endpoint object as described in apiEndPoints.js.
 * @param {String} APIParamaters.uriEndPoint.api - Path to your endpoint
 * @param {String} APIParamaters.uriEndPoint.method - POST/GET/PUT/DELETE etc.
 * @param {String} APIParamaters.uriEndPoint.version - Versioning of your api
 * @param {Object} APIParamaters.uriEndPoint.headerProps - Object of headers you want to pass.
 * @param {Object} APIParamaters.pathParams - Path parameters. Example :id in the path,
 * then pathParams object will be {id:value}.
 * @param {Object} APIParamaters.query - GET/POST/PUT/DELETE Endpoint.
 * @param {Object} APIParamaters.body - Body of the request.
 * @returns {Promise<object>} Body Data from the server.
 */
const callAxios = async (
  { uriEndPoint, pathParams, query, body, apiHostUrl, multipart, onUploadProgress, signal }: any,
  options?: CallApiOptions
) => {
  const defHeaders = await getDefaultHeaders(multipart);
  let headers = {};
  if (!options?.hideDefaultHeaders) {
    headers = {
      ...defHeaders,
    };
  }

  return Axios({
    method: uriEndPoint.method,
    url: makeUrl({ ...uriEndPoint, pathParams, query }, apiHostUrl),
    headers: {
      ...headers,
      ...uriEndPoint.headerProps,
    },
    data: body || undefined,
    onUploadProgress,
    ...(signal ? { signal } : {}),
  });
};
/**
 * Extract the error messages from a failed API response.
 * @param {} apiResponse
 */
// const extractErrors = () => {};
/**
 * Generic utility method that should be called when invoking any REST API
 *
 * This function streamlines the functionality to make api calls,
 * and carries easy management for controlling versions of the apis
 *
 * @since 2.0.0
 *
 * @todo all the incoming values for the APIParamaters.pathParams and APIParamaters.query
 * should be uri encoded.
 * @alias callApi
 * @memberof apiUtils
 * @param {Object} APIParamaters - Set of objects required to make the api call.
 * @param {Object} APIParamaters.uriEndPoint - Endpoint object as described in apiEndPoints.js.
 * @param {String} APIParamaters.uriEndPoint.api - Path to your endpoint
 * @param {String} APIParamaters.uriEndPoint.method - POST/GET/PUT/DELETE etc.
 * @param {String} APIParamaters.uriEndPoint.version - Versioning of your api
 * @param {Object} APIParamaters.uriEndPoint.headerProps - Object of headers you want to pass.
 * @param {Object} APIParamaters.pathParams - Path parameters. Example :id in the path,
 * then pathParams object will be {id:value}.
 * @param {Object} APIParamaters.query - GET/POST/PUT/DELETE Endpoint.
 * @param {Object} APIParamaters.body - Body of the request.
 * @returns {Promise<object>} Body Data from the server.
 */
export const callApi = (
  {
    uriEndPoint = {
      uri: '',
      method: '',
      version: '',
      headerProps: {},
      service: '',
    },
    pathParams,
    query,
    body,
    apiHostUrl,
    multipart,
    signal,
  }: CallApiType,
  options?: CallApiOptions
) =>
  new Promise((resolve, reject) => {
    callAxios(
      {
        uriEndPoint,
        pathParams,
        query,
        body,
        apiHostUrl,
        multipart,
        signal,
      },
      options
    )
      .then((response) => {
        resolve(response?.data);
      })
      .catch((err) => {
        if (!err?.response?.data?.error) {
          reject(err);
          return;
        }
        if (err?.response?.status === 401) {
          reject(err?.response?.data?.error);
        }
        if (err?.response) {
          reject(err?.response?.data?.error);
        }
      });
  });
interface CallApiType {
  uriEndPoint?: UriEndPoint;
  pathParams?: HeaderPropsOrPathParamsOrQueryOrBody;
  query?: HeaderPropsOrPathParamsOrQueryOrBody;
  body?: HeaderPropsOrPathParamsOrQueryOrBody;
  apiHostUrl?: string;
  multipart?: boolean;
  onUploadProgress?: any;
  signal?: any;
}
interface CallApiOptions {
  hideDefaultHeaders: boolean;
}
export interface UriEndPoint {
  pathParams?: UriEndPoint;
  uri: string;
  method: string;
  version: string;
  headerProps?: HeaderPropsOrPathParamsOrQueryOrBody;
  apiKey?: string;
  service?: string;
}
interface HeaderPropsOrPathParamsOrQueryOrBody {}
export interface UriEndPointWithVersions {
  v1: UriEndPoint;
}
