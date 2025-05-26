import { callApi } from "../callApis/apiUtils";
import support from "../endpoints/support";
import { ApiEndpoint } from "../types";

export const createTicket = async ({body}:any) => {
  return callApi({
    uriEndPoint: { ...support.createTicket.v1 } as ApiEndpoint,
     body,
    multipart: true,
  });
};

export const getTickets = async ({query}:any) => {
  return callApi({
    uriEndPoint: { ...support.getTickets.v1 } as ApiEndpoint,
    query
  });
};