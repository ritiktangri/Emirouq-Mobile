// Import necessary types and utilities

import { callApi } from '../callApis/apiUtils';
import { user } from '../endpoints';
import { ApiEndpoint } from '../types';

// Assuming callApi and user.fetchMe.v1 are already correctly typed,
// this conversion should be straightforward.

export const getCurrentUser = async () => {
  return callApi({
    uriEndPoint: { ...user.fetchMe.v1 } as ApiEndpoint,
  });
};
export const getUserDetails = async (id: any) => {
  return callApi({
    uriEndPoint: { ...user.getUserDetails.v1 } as ApiEndpoint,
    pathParams: { id },
  });
};
export const saveNotificationToken = async ({ body }: any) =>
  callApi({
    uriEndPoint: {
      ...user.saveNotificationToken.v1,
    } as ApiEndpoint,
    body,
  });
export const updateProfileService = async ({ body }: any) => {
  return callApi({
    uriEndPoint: { ...user.updateProfile.v1 } as ApiEndpoint,
    body,
  });
};
export const resetPasswordService = async ({ pathParams }: any) => {
  return callApi({
    uriEndPoint: { ...user.resetPassword.v1 } as ApiEndpoint,
    pathParams,
  });
};
export const getSingleUserService = async (id: any) => {
  return callApi({
    uriEndPoint: { ...user.getSingleUser.v1 } as ApiEndpoint,
    pathParams: {
      id,
    },
  });
};
