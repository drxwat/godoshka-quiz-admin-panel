import {
  MutationFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { QueryKeys } from "../helpers/types";

type OptimisticMutationProps<D, V> = {
  mutationKey: QueryKeys;
  updateFunc: MutationFunction<D, V>;
  optimisticUpdateFn: (variables: V, oldData: V[]) => V[];
};

export function useOptimisticMutation<D, V>({
  mutationKey,
  updateFunc,
  optimisticUpdateFn,
}: OptimisticMutationProps<D, V>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [mutationKey],
    mutationFn: async (variables: V) => await updateFunc(variables),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: [mutationKey] });
      const cachedData = queryClient.getQueryData([mutationKey]);
      await queryClient.setQueryData([mutationKey], (oldData: V[]) => {
        return optimisticUpdateFn(variables, oldData);
      });

      return cachedData;
    },
    onError: (_, __, context) => {
      queryClient.setQueryData([mutationKey], context);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [mutationKey] });
    },
  });
}
