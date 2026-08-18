// Text-based recreation of the Nuref logo (three bars + wordmark + gold
// underline), used until the real logo asset file is dropped into /public.
// Swap this for an <Image> of the real file once it's available.
export default function Logo({ className = "", inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex items-end gap-1">
        <span className="h-[15px] w-[5px] rounded-sm bg-powder" />
        <span className="h-[26px] w-[5px] rounded-sm bg-gold" />
        <span className="h-[20px] w-[5px] rounded-sm bg-slate" />
      </div>
      <div className="flex flex-col leading-none">
        <span className={`text-2xl font-bold tracking-tight ${inverted ? "text-white" : "text-navy"}`}>NUREF</span>
        <span className="mt-1 block h-[3px] w-full bg-gold" />
        <span className={`mt-1 text-[10px] font-semibold tracking-[0.25em] ${inverted ? "text-powder" : "text-slate"}`}>
          ELECTRODES
        </span>
      </div>
    </div>
  );
}
