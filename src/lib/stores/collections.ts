import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CollectionItem {
    productId: string;
    addedAt: string;
}

interface CollectionsState {
    items: CollectionItem[];
    addItem: (productId: string) => void;
    removeItem: (productId: string) => void;
    hasItem: (productId: string) => boolean;
    clearCollection: () => void;
}

export const useCollectionsStore = create<CollectionsState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (productId: string) => {
                const currentItems = get().items;
                if (!currentItems.find((item) => item.productId === productId)) {
                    set({
                        items: [
                            ...currentItems,
                            { productId, addedAt: new Date().toISOString() },
                        ],
                    });
                }
            },
            removeItem: (productId: string) => {
                set((state) => ({
                    items: state.items.filter((item) => item.productId !== productId),
                }));
            },
            hasItem: (productId: string) => {
                return get().items.some((item) => item.productId === productId);
            },
            clearCollection: () => set({ items: [] }),
        }),
        {
            name: 'balisan-collection-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

// Selector helpers
export const selectCollectionCount = (state: CollectionsState) => state.items.length;
