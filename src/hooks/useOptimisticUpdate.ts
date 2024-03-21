import {
  MutationFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { TablesUpdate } from "../core/client/database.types";
import { QueryKeys } from "../helpers/types";

type variable =
  | TablesUpdate<"modules">
  | TablesUpdate<"answers">
  | TablesUpdate<"questions">;

export function useOptimisticUpdate<D, V extends variable>(
  serviceFunc: MutationFunction<D, V>,
  key: QueryKeys,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [key],
    mutationFn: async (variables: V) => await serviceFunc(variables),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: [key] });
      const cachedData = queryClient.getQueryData([key]);
      await queryClient.setQueryData([key], (oldData: variable[]) => {
        return oldData.map((item) =>
          item.id === variables.id ? { ...item, ...variables } : item,
        );
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
