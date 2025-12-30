import { create } from 'zustand';
import { Product } from '@/types';

interface CompareStore {
    compareItems: Product[];
    addToCompare: (product: Product) => void;
    removeFromCompare: (productId: string) => void;
    clearCompare: () => void;
    isComparing: boolean;
    setIsComparing: (isComparing: boolean) => void;
}

export const useCompareStore = create<CompareStore>((set) => ({
    compareItems: [],
    isComparing: false,
    addToCompare: (product) => set((state) => {
        if (state.compareItems.length >= 4) return state; // Limit to 4
        if (state.compareItems.find(p => p.id === product.id)) return state;
        return { compareItems: [...state.compareItems, product] };
    }),
    removeFromCompare: (productId) => set((state) => ({
        compareItems: state.compareItems.filter(p => p.id !== productId)
    })),
    clearCompare: () => set({ compareItems: [] }),
    setIsComparing: (isComparing) => set({ isComparing }),
}));
