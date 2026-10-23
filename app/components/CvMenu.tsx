"use client";

import { useEffect, useRef } from "react";
import { ChevronDown, Download } from "lucide-react";

interface Props {
  cvs: { label: string; file: string }[];
  label: string;
  className: string;
  /** Open the list above the button (for buttons at the bottom of the screen). */
  up?: boolean;
}

/** One "Download CV" button; with several CVs it opens a short list (native <details>, closes on outside click / Esc / pick). */
export default function CvMenu({ cvs, label, className, up }: Props) {
  const root = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const away = (e: PointerEvent) => {
      const d = root.current;
      if (d?.open && !d.contains(e.target as Node)) d.open = false;
    };
    const esc = (e: KeyboardEvent) => {
      const d = root.current;
      if (e.key === "Escape" && d?.open) {
        e.stopImmediatePropagation(); // don't also close the intro behind it
        d.open = false;
        d.querySelector("summary")?.focus();
      }
    };
    addEventListener("pointerdown", away);
    addEventListener("keydown", esc, true);
    return () => {
      removeEventListener("pointerdown", away);
      removeEventListener("keydown", esc, true);
    };
  }, []);

  if (cvs.length === 0) return null;
  if (cvs.length === 1)
    return (
      <a href={cvs[0].file} download className={className}>
        <Download size={16} /> {label}
      </a>
    );

  return (
    <details ref={root} className="group relative">
      <summary className={`${className} cursor-pointer list-none [&::-webkit-details-marker]:hidden`}>
        <Download size={16} /> {label} <ChevronDown size={14} className="transition-transform group-open:rotate-180" />
      </summary>
      <ul onClick={() => root.current && (root.current.open = false)} className={`absolute left-0 z-20 w-max ${up ? "bottom-full mb-2" : "mt-2"} min-w-full rounded-theme border border-line bg-surface p-1`}>
        {cvs.map((c) => (
          <li key={c.file}>
            <a href={c.file} download className="block rounded-theme px-3 py-2 text-sm text-heading transition-colors hover:bg-surface-2 hover:text-accent">
              {c.label}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
