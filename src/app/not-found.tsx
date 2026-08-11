import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-xl flex-col items-center px-6 py-24 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">404</p>
      <h1 className="mt-3 text-3xl font-bold text-navy">Page Not Found</h1>
      <p className="mt-4 text-base leading-relaxed text-black">
        The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          href="/"
          className="rounded-md bg-navy px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Back to Home
        </Link>
        <Link
          href="/products"
          className="rounded-md border border-navy px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
        >
          Shop Electrodes
        </Link>
      </div>
    </main>
  );
}
