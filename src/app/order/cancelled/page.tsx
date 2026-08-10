import Link from "next/link";

export default function OrderCancelledPage() {
  return (
    <main className="mx-auto max-w-xl px-6 py-20 text-center">
      <h1 className="text-2xl font-bold text-navy">Checkout Cancelled</h1>
      <p className="mt-4 text-base leading-relaxed text-black">
        Your order was not completed and you have not been charged. Your cart is still saved.
      </p>
      <Link
        href="/cart"
        className="mt-8 inline-block rounded-md bg-navy px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Return to Cart
      </Link>
    </main>
  );
}
