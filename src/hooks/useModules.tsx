import { useQuery } from "@tanstack/react-query";
import moduleService from "../api/services/module.service";

export const useModules = () => {
  return useQuery({
    queryKey: ["modules"],
    queryFn: () => moduleService.getAllModulesWithQuestions(),
  });
};
