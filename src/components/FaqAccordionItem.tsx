"use client";

import { Minus, Plus } from "lucide-react";

export default function FaqAccordionItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-powder">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-base font-bold leading-snug text-navy">{question}</span>
        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-panel text-navy">
          {open ? <Minus size={15} strokeWidth={2.25} /> : <Plus size={15} strokeWidth={2.25} />}
        </span>
      </button>
      {open && <p className="pb-5 pr-10 text-sm leading-relaxed text-ink">{answer}</p>}
    </div>
  );
}
