import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface WorkspaceItem {
    id: string; // product id or category slug
    type: 'product' | 'category';
    label: string;
    link: string;
}

interface WorkspaceState {
    pinnedItems: WorkspaceItem[];
    pinItem: (item: WorkspaceItem) => void;
    unpinItem: (id: string) => void;
    isDockOpen: boolean;
    toggleDock: () => void;
}

export const useWorkspaceStore = create<WorkspaceState>()(
    persist(
        (set) => ({
            pinnedItems: [],
            pinItem: (item) => set((state) => ({
                pinnedItems: [...state.pinnedItems, item],
                isDockOpen: true // Open dock when item is pinned
            })),
            unpinItem: (id) => set((state) => ({
                pinnedItems: state.pinnedItems.filter(i => i.id !== id)
            })),
            isDockOpen: false,
            toggleDock: () => set((state) => ({ isDockOpen: !state.isDockOpen })),
        }),
        {
            name: 'balisan-workspace',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
