import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useModal } from "@/hooks/use-modal";
import { UsersService, IParams } from "@/services/users/users-service";
import { AxiosError } from "axios";
/**
 * Hook to fetch users with pagination and filtering
 * @param {Object} options - Query options
 * @param {IParams} options.params - Parameters for filtering and pagination
 * @returns {Object} Query result with users data
 */
export const useGetUsersQuery = ({ params }: { params: IParams }) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => UsersService.getUsers({ params }),
    enabled: !!params,
    placeholderData: keepPreviousData,
  });
};

/**
 * Hook to fetch a single user by ID
 * @param {string} id - User ID
 * @returns {Object} Query result with user data
 */
export const useGetUserByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => UsersService.getUserById(id),
    enabled: !!id,
  });
};

/**
 * Hook to delete a single user
 * @returns {Object} Mutation object with delete function
 */
export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();
  const { onClose } = useModal();
  return useMutation({
    mutationKey: ["delete-user"],
    mutationFn: (id: string) => UsersService.deleteUser(id),
    onSuccess: (data) => {
      invalidateUsersQuery(queryClient);
      toast.success(data.message || "User deleted successfully");
      onClose();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    },
  });
};

/**
 * Hook to block a single user
 * @returns {Object} Mutation object with block function
 */
export const useBlockUserMutation = () => {
  const queryClient = useQueryClient();
  const { onClose } = useModal();
  return useMutation({
    mutationKey: ["block-user"],
    mutationFn: (id: string) => UsersService.blockUser(id),
    onSuccess: (data) => {
      invalidateUsersQuery(queryClient);
      toast.success(data.message || "User blocked successfully");
      onClose();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    },
  });
};

/**
 * Hook to delete multiple users at once
 * @returns {Object} Mutation object with delete function for multiple users
 */
export const useDeleteMultipleUsersMutation = () => {
  const queryClient = useQueryClient();
  const { onClose } = useModal();
  return useMutation({
    mutationKey: ["delete-multiple-users"],
    mutationFn: (data: IDeleteMultipleUsersCredentials) =>
      UsersService.deleteMultipleUsers(data),
    onSuccess: (data) => {
      invalidateUsersQuery(queryClient);
      toast.success(data.message || "Users deleted successfully");
      onClose();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    },
  });
};

/**
 * Hook to block multiple users at once
 * @returns {Object} Mutation object with block function for multiple users
 */
export const useBlockMultipleUsersMutation = () => {
  const queryClient = useQueryClient();
  const { onClose } = useModal();
  return useMutation({
    mutationKey: ["block-multiple-users"],
    mutationFn: (data: IBlockMultipleUsersCredentials) =>
      UsersService.blockMultipleUsers(data),
    onSuccess: (data) => {
      invalidateUsersQuery(queryClient);
      toast.success(data.message || "Users blocked successfully");
      onClose();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    },
  });
};

/**
 * Hook to add a new user
 * @returns {Object} Mutation object with add user function
 */
export const useAddUserMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-user"],
    mutationFn: (data: IAddUserCredentials) => UsersService.addUser(data),
    onSuccess: (data) => {
      invalidateUsersQuery(queryClient);
      toast.success(data.message || "User added successfully");
      router.push("/users");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    },
  });
};

/**
 * Hook to update an existing user
 * @param {Object} options - Options object
 * @param {string} options.id - ID of the user to update
 * @returns {Object} Mutation object with update user function
 */
export const useUpdateUserMutation = ({ id }: { id: string }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-user"],
    mutationFn: (data: IUpdateUserCredentials) =>
      UsersService.updateUser(id, data),
    onSuccess: (data) => {
      invalidateUsersQuery(queryClient);
      invalidateUserQuery(queryClient, id);
      toast.success(data.message || "User updated successfully");
      router.push("/users");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    },
  });
};

/**
 * Helper function to invalidate users query cache
 * Forces a refetch of users data after mutations
 */
export const invalidateUsersQuery = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: ["users"] });
};
export const invalidateUserQuery = (queryClient: QueryClient, id: string) => {
  queryClient.invalidateQueries({ queryKey: ["user", id] });
};
