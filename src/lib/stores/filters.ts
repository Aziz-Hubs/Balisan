import { create } from 'zustand';

interface FilterStore {
    category: string | null;
    subcategory: string | null;
    priceRange: [number, number];
    brands: string[];
    abvRange: [number, number];
    minRating: number;
    dietary: string[];
    sortBy: "relevance" | "price_asc" | "price_desc" | "rating" | "newest";
    viewMode: "grid" | "list";
    setFilter: <K extends keyof FilterStore>(key: K, value: FilterStore[K]) => void;
    resetFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
    category: null,
    subcategory: null,
    priceRange: [0, 2000],
    brands: [],
    abvRange: [0, 100],
    minRating: 0,
    dietary: [],
    sortBy: "relevance",
    viewMode: "grid",
    setFilter: (key, value) => set((state) => ({ ...state, [key]: value })),
    resetFilters: () => set({
        category: null,
        subcategory: null,
        priceRange: [0, 2000],
        brands: [],
        abvRange: [0, 100],
        minRating: 0,
        dietary: [],
        sortBy: "relevance",
        viewMode: "grid",
    }),
}));
