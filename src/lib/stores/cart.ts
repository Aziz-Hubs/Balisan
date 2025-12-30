import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    variant?: string;
}

interface CartState {
    items: CartItem[];
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: string, variant?: string) => void;
    updateQuantity: (id: string, variant: string | undefined, quantity: number) => void;
    clearCart: () => void;
    isOpen: boolean;
    toggleDrawer: () => void;
}

// Helper selectors to compute derived values from store state
export const selectTotalItems = (state: CartState) =>
    state.items.reduce((total, item) => total + item.quantity, 0);

export const selectSubtotal = (state: CartState) =>
    state.items.reduce((total, item) => total + item.price * item.quantity, 0);

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (item) => {
                const currentItems = get().items;
                const existingItemIndex = currentItems.findIndex(
                    (i) => i.id === item.id && i.variant === item.variant
                );

                if (existingItemIndex > -1) {
                    const newItems = [...currentItems];
                    newItems[existingItemIndex].quantity += 1;
                    set({ items: newItems });
                } else {
                    set({ items: [...currentItems, { ...item, quantity: 1 }] });
                }
            },
            removeItem: (id, variant) => {
                set((state) => ({
                    items: state.items.filter(
                        (i) => !(i.id === id && i.variant === variant)
                    ),
                }));
            },
            updateQuantity: (id, variant, quantity) => {
                set((state) => ({
                    items: state.items.map((i) => {
                        if (i.id === id && i.variant === variant) {
                            return { ...i, quantity: Math.max(0, quantity) };
                        }
                        return i;
                    }),
                }));
            },
            clearCart: () => set({ items: [] }),
            isOpen: false,
            toggleDrawer: () => set((state) => ({ isOpen: !state.isOpen })),
        }),
        {
            name: 'balisan-cart-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
