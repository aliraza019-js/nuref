// Text-based recreation of the Nuref logo (three bars + wordmark + gold
// underline), used until the real logo asset file is dropped into /public.
// Swap this for an <Image> of the real file once it's available.
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex items-end gap-1">
        <span className="h-9 w-2 rounded-sm bg-navy" />
        <span className="h-7 w-2 rounded-sm bg-slate" />
        <span className="h-5 w-2 rounded-sm bg-powder" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-2xl font-bold tracking-tight text-navy">NUREF</span>
        <span className="mt-1 block h-[3px] w-full bg-gold" />
        <span className="mt-1 text-[10px] font-semibold tracking-[0.25em] text-slate">ELECTRODES</span>
      </div>
    </div>
  );
}
