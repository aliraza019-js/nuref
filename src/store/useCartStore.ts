import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/products";

export interface CartItem {
  slug: string;
  sku: string;
  name: string;
  priceCents: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  /** Slide-out cart panel visibility. Opens automatically on add-to-cart. */
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      drawerOpen: false,

      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),

      addItem: (product, quantity = 1) => {
        const items = get().items;
        const existing = items.find((i) => i.slug === product.slug);
        if (existing) {
          set({
            drawerOpen: true,
            items: items.map((i) =>
              i.slug === product.slug ? { ...i, quantity: i.quantity + quantity } : i,
            ),
          });
        } else {
          set({
            drawerOpen: true,
            items: [
              ...items,
              {
                slug: product.slug,
                sku: product.sku,
                name: product.name,
                priceCents: product.priceCents,
                image: product.image,
                quantity,
              },
            ],
          });
        }
      },

      removeItem: (slug) => set({ items: get().items.filter((i) => i.slug !== slug) }),

      setQuantity: (slug, quantity) => {
        if (quantity <= 0) {
          set({ items: get().items.filter((i) => i.slug !== slug) });
          return;
        }
        set({ items: get().items.map((i) => (i.slug === slug ? { ...i, quantity } : i)) });
      },

      clear: () => set({ items: [] }),
    }),
    { name: "nuref-cart", partialize: (s) => ({ items: s.items }) },
  ),
);

export function cartTotalCents(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0);
}

export function cartItemCount(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}
