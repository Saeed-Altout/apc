import { createResource } from "../api-client";
import {
  useMutateData,
  usePaginatedData,
  useFetchData,
  useOptimisticMutation,
} from "../react-query/hooks";

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "blocked";
  createdAt: string;
  updatedAt: string;
}

// Create a resource with the user endpoint
const usersResource = createResource<User>("/users");

// Hook to fetch all users
export function useUsers(params?: Record<string, any>) {
  return useFetchData<User[]>(
    ["users", params],
    () => usersResource.getAll(params),
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );
}

// Hook to fetch paginated users
export function usePaginatedUsers(
  page: number,
  limit: number,
  params?: Record<string, any>
) {
  return usePaginatedData<User>(
    "users",
    page,
    limit,
    (page, limit) => usersResource.getPaginated(page, limit, params),
    {
      staleTime: 1000 * 60 * 2, // 2 minutes
    }
  );
}

// Hook to fetch a single user
export function useUser(id: string) {
  return useFetchData<User>(["users", id], () => usersResource.getById(id), {
    enabled: !!id, // Only run if ID is provided
  });
}

// Hook to create a user
export function useCreateUser() {
  return useMutateData<User, Error, Partial<User>>(
    "users",
    (userData) => usersResource.create(userData),
    {
      // Additional configuration can be added here
    }
  );
}

// Hook to update a user
export function useUpdateUser() {
  return useMutateData<User, Error, { id: string; data: Partial<User> }>(
    "users",
    ({ id, data }) => usersResource.update(id, data)
  );
}

// Hook to delete a user
export function useDeleteUser() {
  return useMutateData<void, Error, string>("users", (id) =>
    usersResource.delete(id)
  );
}

// Hook for optimistic user updates
export function useOptimisticUpdateUser() {
  return useOptimisticMutation<
    User,
    Error,
    { id: string; data: Partial<User> },
    { previousUsers: User[] }
  >(
    "users",
    ({ id, data }) => usersResource.update(id, data),
    (oldData, { id, data }) => {
      if (!Array.isArray(oldData)) return oldData;

      return oldData.map((user) =>
        user.id === id ? { ...user, ...data } : user
      );
    }
  );
}

// Hook for optimistic user blocking/unblocking
export function useToggleUserStatus(userId: string) {
  const { data: user } = useUser(userId);

  return useOptimisticMutation<
    User,
    Error,
    void,
    { previousUser: User | undefined }
  >(
    ["users", userId],
    () => {
      const newStatus = user?.status === "active" ? "blocked" : "active";
      return usersResource.update(userId, { status: newStatus });
    },
    (oldData) => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        status: oldData.status === "active" ? "blocked" : "active",
      };
    }
  );
}
