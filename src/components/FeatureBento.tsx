import { BadgeCheck, Droplets, FileCheck2, QrCode, ShieldCheck } from "lucide-react";

export default function FeatureBento() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-navy">Product features</p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
          Built to measure. Built to last.
        </h2>

        <div className="mt-9 grid auto-rows-[168px] gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Lead feature tile — spans 2×2 */}
          <div
            className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-powder p-7 sm:col-span-2 sm:row-span-2"
            style={{
              background:
                "radial-gradient(70% 70% at 50% 45%, #ffffff 0%, #fbfbfb 32%, #f4f4f4 62%, #e9e9e9 100%)",
            }}
          >
            <div>
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-panel text-navy">
                <Droplets size={20} strokeWidth={1.75} />
              </span>
              <h3 className="text-xl font-bold text-navy">Sealed for harsh service</h3>
              <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-ink">
                Potted body and sealed cable gland, rated for permanent embedment in concrete, soil
                and seawater.
              </p>
            </div>

            <ul className="mt-6 flex flex-wrap gap-2">
              {["Potted body", "Sealed cable gland", "IP68 marine housing"].map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-powder bg-white px-3 py-1.5 text-xs font-semibold text-navy"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Stat value="±5 mV" label="Potential stability over design life" />
          <Stat value="20+ yr" label="Design life, embedded or submerged" />

          <Tile
            icon={QrCode}
            title="Serialised & traceable"
            body="Every unit laser-marked with a serial number and QR code."
          />
          <Tile
            icon={FileCheck2}
            title="Calibration certificate"
            body="Supplied with traceable calibration so survey data stays defensible."
          />

          <Tile
            icon={ShieldCheck}
            title="Standards compliant"
            body="Designed to comply with international cathodic protection standards."
            span2
          />
          <Tile
            icon={BadgeCheck}
            title="Nine models, in stock"
            body="Four electrode families plus field accessories, shipped direct."
            span2
          />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col justify-center rounded-2xl border border-powder bg-panel p-6">
      <div className="text-3xl font-extrabold tracking-tight text-navy">{value}</div>
      <div className="mt-1.5 text-xs leading-relaxed text-slate">{label}</div>
    </div>
  );
}

function Tile({
  icon: Icon,
  title,
  body,
  span2 = false,
}: {
  icon: React.ElementType;
  title: string;
  body: string;
  span2?: boolean;
}) {
  return (
    <div
      className={`flex flex-col justify-center rounded-2xl border border-powder p-6 ${
        span2 ? "sm:col-span-2" : ""
      }`}
    >
      <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-panel text-navy">
        <Icon size={19} strokeWidth={1.75} />
      </span>
      <h3 className="text-base font-bold text-navy">{title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-ink">{body}</p>
    </div>
  );
}
