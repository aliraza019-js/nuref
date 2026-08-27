"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return <p className="text-sm font-semibold text-navy">You&rsquo;re subscribed — thanks for joining.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        className="min-w-0 flex-1 rounded-full border border-powder bg-white px-5 py-3 text-sm text-ink placeholder:text-slate outline-none focus:border-ink"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex h-12 flex-shrink-0 items-center gap-2 rounded-full bg-ink px-7 text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-85 disabled:opacity-50"
      >
        Get Start
        <ArrowRight size={15} strokeWidth={2.25} />
      </button>
      {status === "error" && <p className="mt-1 text-xs text-red-600">Could not subscribe. Try again.</p>}
    </form>
  );
}
