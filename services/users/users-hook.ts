import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useModal } from "@/hooks/use-modal";
import { UsersService } from "./users-service";
import { useUsersStore, IUserFilter } from "./users-store";
import { toast } from "sonner";

export const useUsers = ({ params }: { params: IParams }) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => UsersService.getUsers({ params }),
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const onClose = useModal((state) => state.onClose);
  return useMutation({
    mutationKey: ["delete-user"],
    mutationFn: (id: string) => UsersService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onClose();
      toast.success("User deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete user");
    },
  });
};

export const useBlockUser = () => {
  const queryClient = useQueryClient();
  const onClose = useModal((state) => state.onClose);
  return useMutation({
    mutationKey: ["block-user"],
    mutationFn: (id: string) => UsersService.blockUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onClose();
      toast.success("User blocked successfully");
    },
    onError: () => {
      toast.error("Failed to block user");
    },
  });
};

export const useDeleteMultipleUsers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-multiple-users"],
    mutationFn: (data: IDeleteMultipleUsersCredentials) =>
      UsersService.deleteMultipleUsers(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Users deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete multiple users");
    },
  });
};
export const useBlockMultipleUsers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["block-multiple-users"],
    mutationFn: (data: IBlockMultipleUsersCredentials) =>
      UsersService.blockMultipleUsers(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Users blocked successfully");
    },
    onError: () => {
      toast.error("Failed to block multiple users");
    },
  });
};

export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-user"],
    mutationFn: (data: IAddUserCredentials) => UsersService.addUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User added successfully");
    },
    onError: () => {
      toast.error("Failed to add user");
    },
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
