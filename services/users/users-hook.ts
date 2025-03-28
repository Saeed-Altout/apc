import { useQuery } from "@tanstack/react-query";
import { UsersService } from "./users-service";
import { useUsersStore, IUserFilter } from "./users-store";
import { useEffect } from "react";

export const useUsers = ({ params }: { params: IParams }) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => UsersService.getUsers({ params }),
  });
};

export const useUsersWithStore = (initialFilters?: Partial<IUserFilter>) => {
  const store = useUsersStore();

  useEffect(() => {
    if (initialFilters) {
      store.setFilter(initialFilters);
    } else {
      store.fetchUsers();
    }
  }, []);

  return store;
};
