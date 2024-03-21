import { QueryFunction, useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../helpers/types";

export const useFetchData = <T>(
  key: QueryKeys,
  fetchFunc: QueryFunction<T>,
) => {
  return useQuery<T>({
    queryKey: [key],
    queryFn: async (id) => await fetchFunc(id),
  });
};
