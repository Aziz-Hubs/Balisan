import { create } from 'zustand';

interface SearchStore {
    query: string;
    recentSearches: string[];
    isOpen: boolean;
    setQuery: (query: string) => void;
    addRecentSearch: (query: string) => void;
    setIsOpen: (isOpen: boolean) => void;
    toggleOpen: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
    query: "",
    recentSearches: [],
    isOpen: false,
    setQuery: (query) => set({ query }),
    addRecentSearch: (query) => set((state) => {
        const newSearches = [query, ...state.recentSearches.filter(q => q !== query)].slice(0, 5);
        return { recentSearches: newSearches };
    }),
    setIsOpen: (isOpen) => set({ isOpen }),
    toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));
