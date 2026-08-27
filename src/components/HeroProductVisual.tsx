import Image from "next/image";
import { Truck, ShieldCheck } from "lucide-react";

/**
 * Hero product visual: the photograph with small floating status badges
 * around it, plus scattered accent dots. `src` defaults to the neutral
 * placeholder — the real photograph is reserved for the homepage hero.
 */
export default function HeroProductVisual({
  className = "",
  src = "/products/placeholder.svg",
}: {
  className?: string;
  src?: string;
}) {
  return (
    // py-* gives the badges room to sit clear of the product, which is a
    // wide, thin band and would otherwise be covered by them.
    <div className={`relative py-20 ${className}`}>
      {/* Soft halo behind the product */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[78%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-panel blur-2xl"
      />

      {/* Accent dots */}
      <span aria-hidden className="absolute left-[14%] top-[18%] h-2 w-2 rounded-full bg-ink" />
      <span aria-hidden className="absolute right-[26%] top-[10%] h-2.5 w-2.5 rounded-full bg-ink/70" />
      <span aria-hidden className="absolute bottom-[16%] right-[16%] h-2 w-2 rounded-full bg-ink" />

      <Image
        src={src}
        alt="Nuref reference electrode"
        width={1327}
        height={177}
        priority
        className="relative h-auto w-full"
        style={{ filter: "drop-shadow(0 28px 30px rgba(20,40,76,0.22))" }}
      />

      {/* Floating status badges */}
      <div className="absolute right-[2%] top-2 flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_16px_34px_-14px_rgba(20,40,76,0.3)]">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-ink">
          <Truck size={16} strokeWidth={2} />
        </span>
        <span className="leading-tight">
          <span className="block text-[11px] font-bold text-navy">3–5 days</span>
          <span className="block text-[10px] text-slate">Ships direct</span>
        </span>
      </div>

      <div className="absolute bottom-2 left-[2%] flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_16px_34px_-14px_rgba(20,40,76,0.3)]">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-ink text-white">
          <ShieldCheck size={16} strokeWidth={2} />
        </span>
        <span className="leading-tight">
          <span className="block text-[11px] font-bold text-navy">CP standards</span>
          <span className="block text-[10px] text-slate">Certified</span>
        </span>
      </div>
    </div>
  );
}
