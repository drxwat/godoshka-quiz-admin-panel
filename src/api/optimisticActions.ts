import { variable } from "../helpers/types";

class OptimisticActions {
  remove<V extends variable>(variables: V, oldData: V[]): V[] {
    return oldData.filter((item) => item.id !== variables.id);
  }

  update<V extends variable>(variables: V, oldData: V[]): V[] {
    return oldData.map((item) =>
      item.id === variables.id ? { ...item, ...variables } : item,
    );
  }

  add<V extends variable>(variables: V, oldData: V[]): V[] {
    return [...oldData, variables];
  }
}

export default new OptimisticActions();
