import useSWR, { mutate } from "swr";
import { Tables } from "./types";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

export const useSWRTable = <T>(
  table: Tables,
  fetcher: () => Promise<PostgrestSingleResponse<T>>,
) => {
  return useSWR(table, async () => {
    const { data } = await fetcher();
    return data;
  });
};

export const mutateSWRTable = (table: Tables) => mutate(table);
