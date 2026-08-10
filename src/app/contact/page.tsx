"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error((await res.json()).message || "Failed to send");
      toast.success("Message sent — our sales team will be in touch shortly.");
      setForm({ name: "", email: "", company: "", message: "" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="mx-auto max-w-xl px-6 py-16">
      <h1 className="text-3xl font-bold text-navy">Contact Us</h1>
      <p className="mt-3 text-base leading-relaxed text-black">
        Have a project, bulk order, or question about our electrodes? Send us a message and our
        sales team will follow up.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="mb-1 block text-xs font-semibold text-black">Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-md border border-powder px-3 py-2 text-sm text-black outline-none focus:border-navy"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-black">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-md border border-powder px-3 py-2 text-sm text-black outline-none focus:border-navy"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-black">Company (optional)</label>
          <input
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="w-full rounded-md border border-powder px-3 py-2 text-sm text-black outline-none focus:border-navy"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-black">Message</label>
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full rounded-md border border-powder px-3 py-2 text-sm text-black outline-none focus:border-navy"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-navy px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {submitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </main>
  );
}
