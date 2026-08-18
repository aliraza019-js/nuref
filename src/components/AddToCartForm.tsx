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
    <div className="mt-6 flex flex-wrap items-stretch gap-3">
      <div className="flex items-center rounded-xl border border-powder">
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="h-12 w-11 text-lg font-semibold text-navy"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="w-12 text-center text-base font-bold text-navy">{quantity}</span>
        <button
          type="button"
          onClick={() => setQuantity((q) => q + 1)}
          className="h-12 w-11 text-lg font-semibold text-navy"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className="h-12 min-w-[200px] flex-1 rounded-xl bg-gold text-sm font-bold text-navy transition-colors hover:bg-navy hover:text-white"
      >
        Add to cart
      </button>
    </div>
  );
}
