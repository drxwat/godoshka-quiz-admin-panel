import { QueryFunction, useQuery } from "@tanstack/react-query";

export const useFetchData = <T>(key: string, fetchFunc: QueryFunction<T>) => {
  return useQuery<T>({
    queryKey: [key],
    queryFn: async (id) => await fetchFunc(id),
  });
};
