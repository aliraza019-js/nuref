"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", enquiryType: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          message: form.enquiryType ? `[${form.enquiryType}] ${form.message}` : form.message,
        }),
      });
      if (!res.ok) throw new Error((await res.json()).message || "Failed to send");
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="bg-white py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-navy">Sales desk</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">Contact Us</h1>
          <p className="mt-5 text-base leading-relaxed text-black">
            Have a project, bulk order or a question about our electrodes? Send a message and our
            sales team will follow up — usually the same working day.
          </p>

          <div className="mt-7 flex flex-col gap-3">
            <div className="rounded-2xl border border-powder bg-powder/15 p-5">
              <div className="text-[11px] font-bold uppercase tracking-wide text-navy">Technical support</div>
              <div className="mt-1 text-sm text-black">Electrode selection, installation guidance, calibration and testing</div>
            </div>
            <div className="rounded-2xl border border-powder bg-powder/15 p-5">
              <div className="text-[11px] font-bold uppercase tracking-wide text-navy">Procurement</div>
              <div className="mt-1 text-sm text-black">Bulk pricing, project documentation packs and delivery schedules</div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-powder p-8 shadow-[0_40px_76px_-34px_rgba(20,40,76,0.28)]">
          {sent ? (
            <div className="py-12 text-center">
              <div className="mx-auto flex h-[54px] w-[54px] items-center justify-center rounded-full bg-gold text-xl font-extrabold text-navy">
                ✓
              </div>
              <div className="mt-5 text-xl font-extrabold tracking-tight text-navy">Message sent</div>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-black">
                Thanks — our sales team will follow up shortly with pricing and lead time.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid gap-3.5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-black">Name</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="nr-checkout-input"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-black">Work email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@company.com"
                    className="nr-checkout-input"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-black">Company</label>
                  <input
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Company Ltd"
                    className="nr-checkout-input"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-black">Enquiry type</label>
                  <input
                    value={form.enquiryType}
                    onChange={(e) => setForm({ ...form, enquiryType: e.target.value })}
                    placeholder="Quote / technical / order"
                    className="nr-checkout-input"
                  />
                </div>
              </div>

              <div className="mt-3.5">
                <label className="mb-1.5 block text-xs font-semibold text-black">Message</label>
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about the structure, environment and quantities"
                  className="nr-checkout-input resize-y"
                />
              </div>

              {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="mt-5 w-full rounded-xl bg-navy px-4 py-3.5 text-sm font-bold text-white transition-colors hover:bg-gold hover:text-navy disabled:opacity-50"
              >
                {submitting ? "Sending..." : "Send message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
