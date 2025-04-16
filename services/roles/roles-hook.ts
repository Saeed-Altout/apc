import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { RolesService } from "./roles-service";

export const useGetRolesQuery = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: () => RolesService.getRoles(),
  });
};
