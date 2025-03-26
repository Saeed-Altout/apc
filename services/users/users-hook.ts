import { useQuery } from "@tanstack/react-query";
import { UsersService } from "./users-service";

export const useUsers = ({ params }: { params: IParams }) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => UsersService.getUsers({ params }),
  });
};
