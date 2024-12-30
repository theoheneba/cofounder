import { create } from 'zustand';

interface Filters {
  subscriptionTier: string;
  status: string;
  dateRange: string;
}

interface UserFiltersStore {
  filters: Filters;
  updateFilter: (key: keyof Filters, value: string) => void;
  resetFilters: () => void;
}

const initialFilters: Filters = {
  subscriptionTier: '',
  status: '',
  dateRange: '',
};

export const useUserFilters = create<UserFiltersStore>((set) => ({
  filters: initialFilters,
  updateFilter: (key, value) => 
    set((state) => ({
      filters: { ...state.filters, [key]: value }
    })),
  resetFilters: () => set({ filters: initialFilters }),
}));