import ElectrodeGraphic from "./ElectrodeGraphic";

export default function HeroProductVisual({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`} style={{ perspective: "1200px" }}>
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(240,180,41,0.14) 0%, rgba(20,40,76,0) 66%)" }}
      />

      <div className="nr-float relative" style={{ transform: "rotateX(6deg) rotateY(-9deg)", transformStyle: "preserve-3d" }}>
        <div className="relative overflow-hidden rounded-3xl border border-powder bg-powder/20 p-3.5 shadow-[0_60px_110px_-30px_rgba(20,40,76,0.18)]">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-white">
            <ElectrodeGraphic className="h-full w-full p-8" />
          </div>
        </div>

        <div className="absolute -left-8 top-10 rounded-xl border border-powder bg-white px-4 py-3 shadow-[0_22px_46px_-16px_rgba(20,40,76,0.16)]">
          <div className="text-[10px] font-bold uppercase tracking-wide text-navy">Potential</div>
          <div className="mt-0.5 text-lg font-bold text-navy">&minus;0.800 V</div>
        </div>

        <div className="absolute -right-7 bottom-16 rounded-xl border border-powder bg-white px-4 py-3 shadow-[0_22px_46px_-16px_rgba(20,40,76,0.16)]">
          <div className="text-[10px] font-bold uppercase tracking-wide text-slate">Service</div>
          <div className="mt-0.5 text-lg font-bold text-navy">Buried · Marine</div>
        </div>
      </div>
    </div>
  );
}
