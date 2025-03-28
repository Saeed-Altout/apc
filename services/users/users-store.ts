import { create } from "zustand";
import { UsersService } from "./users-service";

export interface IUserFilter {
  status?: string;
  is_user?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

interface UsersStore {
  // State
  users: IUsersResponse | null;
  isLoading: boolean;
  error: string | null;
  filter: IUserFilter;

  // Actions
  fetchUsers: () => Promise<void>;
  setFilter: (filter: Partial<IUserFilter>) => void;
  resetFilter: () => void;
  exportUsers: () => Promise<void>;
  createUser: (userData: IAddUserCredentials) => Promise<IUserResponse>;

  // Pagination
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

export const useUsersStore = create<UsersStore>((set, get) => ({
  // Initial state
  users: null,
  isLoading: false,
  error: null,
  filter: {
    page: 1,
    limit: 10,
    sortBy: "timeCreated",
    sortOrder: "desc",
  },

  // Actions
  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await UsersService.getUsers({
        params: get().filter,
      });
      set({ users: response, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch users", isLoading: false });
      console.error("Error fetching users:", error);
    }
  },

  setFilter: (newFilter) => {
    set((state) => ({
      filter: {
        ...state.filter,
        ...newFilter,
        // Reset to page 1 when filter changes (except when explicitly changing page)
        ...(newFilter.page ? {} : { page: 1 }),
      },
    }));
    get().fetchUsers();
  },

  resetFilter: () => {
    set({
      filter: {
        page: 1,
        limit: 10,
        sortBy: "timeCreated",
        sortOrder: "desc",
      },
    });
    get().fetchUsers();
  },

  exportUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      // This will be implemented in the UsersService
      await UsersService.exportUsers(get().filter);
      set({ isLoading: false });
    } catch (error) {
      set({ error: "Failed to export users", isLoading: false });
      console.error("Error exporting users:", error);
    }
  },

  createUser: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await UsersService.addUser(userData);
      // Refresh users list after creating a new user
      get().fetchUsers();
      set({ isLoading: false });
      return response;
    } catch (error) {
      set({ error: "Failed to create user", isLoading: false });
      console.error("Error creating user:", error);
      throw error;
    }
  },

  // Pagination methods
  nextPage: () => {
    const { filter, users } = get();
    if (users && filter.page && filter.page < users.data.pages) {
      get().setFilter({ page: filter.page + 1 });
    }
  },

  prevPage: () => {
    const { filter } = get();
    if (filter.page && filter.page > 1) {
      get().setFilter({ page: filter.page - 1 });
    }
  },

  goToPage: (page) => {
    get().setFilter({ page });
  },

  setLimit: (limit) => {
    get().setFilter({ limit, page: 1 });
  },
}));
