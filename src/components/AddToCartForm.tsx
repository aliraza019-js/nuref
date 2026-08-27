"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useCartStore } from "@/store/useCartStore";
import type { Product } from "@/lib/products";

export default function AddToCartForm({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    addItem(product, quantity);
    toast.success(`Added ${quantity} x ${product.name} to cart`);
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          aria-label="Decrease quantity"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-base text-ink transition-colors hover:bg-ink/5"
        >
          &minus;
        </button>
        <span className="w-6 text-center text-base font-semibold text-ink">{quantity}</span>
        <button
          type="button"
          onClick={() => setQuantity((q) => q + 1)}
          aria-label="Increase quantity"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-base text-ink transition-colors hover:bg-ink/5"
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className="h-12 flex-1 rounded-full bg-ink px-9 text-sm font-semibold text-white transition-opacity hover:opacity-85"
      >
        Add to Cart
      </button>
    </div>
  );
}
