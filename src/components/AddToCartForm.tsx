"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCartStore } from "@/store/useCartStore";
import type { Product } from "@/lib/products";

export default function AddToCartForm({ product }: { product: Product }) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    addItem(product, quantity);
    toast.success(`Added ${quantity} x ${product.name} to cart`);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    router.push("/cart");
  };

  return (
    <div className="mt-6 flex items-center gap-3">
      <div className="flex items-center rounded-md border border-powder">
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="h-11 w-11 text-lg font-semibold text-navy"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="w-8 text-center text-sm font-semibold text-black">{quantity}</span>
        <button
          type="button"
          onClick={() => setQuantity((q) => q + 1)}
          className="h-11 w-11 text-lg font-semibold text-navy"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className="h-11 flex-1 rounded-md border border-navy px-4 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
      >
        Add to Cart
      </button>
      <button
        type="button"
        onClick={handleBuyNow}
        className="h-11 flex-1 rounded-md bg-navy px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Buy Now
      </button>
    </div>
  );
}
