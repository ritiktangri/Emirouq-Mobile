import { useQuery } from "@tanstack/react-query";
import { getTickets } from "~/utils/services/support";

export const useGetSupportTickets = ({query}:any) =>
  useQuery({
    queryKey: ['support'],
    queryFn: () =>
      getTickets({
        query,
      }),
    refetchOnWindowFocus: false,
  });
