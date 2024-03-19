import {
  MutationFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { variable } from "../helpers/types";

export function useOptimisticRemove<D, V extends variable>(
  updateFunc: MutationFunction<D, V>,
  key: string,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [key],
    mutationFn: async (variables: V) => await updateFunc(variables),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: [key] });
      const cachedData = queryClient.getQueryData([key]);
      await queryClient.setQueryData([key], (oldData: variable[]) => {
        return oldData.filter((item) => item.id !== variables.id);
      });

      return cachedData;
    },
    onError: (_, __, context) => {
      queryClient.setQueryData([key], context);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });
}
