import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useModal } from "@/hooks/use-modal";
import { UsersService, IParams } from "@/services/users/users-service";
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
  const { onClose } = useModal();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-user"],
    mutationFn: (id: string) => UsersService.deleteUser(id),
    onSuccess: () => {
      invalidateUsersQuery(queryClient);
      toast.success("User deleted successfully");
      onClose();
    },
    onError: () => {
      toast.error("Failed to delete user");
    },
  });
};

/**
 * Hook to block a single user
 * @returns {Object} Mutation object with block function
 */
export const useBlockUserMutation = () => {
  const { onClose } = useModal();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["block-user"],
    mutationFn: (id: string) => UsersService.blockUser(id),
    onSuccess: () => {
      invalidateUsersQuery(queryClient);
      toast.success("User blocked successfully");
      onClose();
    },
    onError: () => {
      toast.error("Failed to block user");
    },
  });
};

/**
 * Hook to delete multiple users at once
 * @returns {Object} Mutation object with delete function for multiple users
 */
export const useDeleteMultipleUsersMutation = () => {
  const { onClose } = useModal();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-multiple-users"],
    mutationFn: (data: IDeleteMultipleUsersCredentials) =>
      UsersService.deleteMultipleUsers(data),
    onSuccess: () => {
      invalidateUsersQuery(queryClient);
      toast.success("Users deleted successfully");
      onClose();
    },
    onError: () => {
      toast.error("Failed to delete multiple users");
    },
  });
};

/**
 * Hook to block multiple users at once
 * @returns {Object} Mutation object with block function for multiple users
 */
export const useBlockMultipleUsersMutation = () => {
  const { onClose } = useModal();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["block-multiple-users"],
    mutationFn: (data: IBlockMultipleUsersCredentials) =>
      UsersService.blockMultipleUsers(data),
    onSuccess: () => {
      invalidateUsersQuery(queryClient);
      toast.success("Users blocked successfully");
      onClose();
    },
    onError: () => {
      toast.error("Failed to block multiple users");
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
    onSuccess: () => {
      invalidateUsersQuery(queryClient);
      toast.success("User added successfully");
      router.push("/users");
    },
    onError: () => {
      toast.error("Failed to add user");
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
    onSuccess: () => {
      invalidateUsersQuery(queryClient);
      toast.success("User updated successfully");
      router.push("/users");
    },
    onError: () => {
      toast.error("Failed to update user");
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
