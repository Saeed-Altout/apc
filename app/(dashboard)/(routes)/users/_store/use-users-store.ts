import { create } from "zustand";

export type FilterOption = {
  value: string;
  label: string;
  isSelected: boolean;
};

interface UsersStore {
  searchTerm: string;
  filterOptions: FilterOption[];
  setSearchTerm: (term: string) => void;
  toggleFilter: (value: string) => void;
  resetFilters: () => void;
}

export const useUsersStore = create<UsersStore>()((set) => ({
  searchTerm: "",
  filterOptions: [
    { value: "email", label: "Email", isSelected: false },
    { value: "role", label: "Role", isSelected: false },
    { value: "telegram", label: "Telegram", isSelected: false },
    {
      value: "tradingAccounts",
      label: "Trading Accounts",
      isSelected: false,
    },
    { value: "wallets", label: "Wallets", isSelected: false },
    { value: "country", label: "Country", isSelected: false },
  ],
  setSearchTerm: (term) => set({ searchTerm: term }),
  toggleFilter: (value) =>
    set((state) => ({
      filterOptions: state.filterOptions.map((option) =>
        option.value === value
          ? { ...option, isSelected: !option.isSelected }
          : option
      ),
    })),
  resetFilters: () =>
    set((state) => ({
      filterOptions: state.filterOptions.map((option) => ({
        ...option,
        isSelected: false,
      })),
      searchTerm: "",
    })),
}));
