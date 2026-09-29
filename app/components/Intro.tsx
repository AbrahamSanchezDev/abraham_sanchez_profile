"use client";

import { useEffect } from "react";
import { ChevronRight, LayoutGrid } from "lucide-react";
import type { UI } from "../lib/data";
import type { Section } from "./Shell";
import { SECTION_ICONS } from "./ui";

interface Props {
  name: string;
  headline: string;
  subheadline: string;
  tagline: string;
  sections: Section[];
  ui: UI;
  onClose: () => void;
}

/** Full-screen "level select" landing. Enabled with site.showIntro in content/profile.<lang>.json. */
export default function Intro({ name, headline, subheadline, tagline, sections, ui, onClose }: Props) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => (e.key === "Escape" || (e.key === "Enter" && e.target === document.body)) && onClose();
    addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const go = (id: string) => {
    onClose();
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
  };

  const [first, ...rest] = name.split(" ");

  return (
    <div role="dialog" aria-modal="true" aria-label={ui.levelSelect} className="hud-bg fixed inset-0 z-[60] overflow-y-auto bg-bg">
      <div className="mx-auto flex min-h-full max-w-5xl flex-col justify-center px-4 py-12 sm:px-6">
        <p className="rise mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.35em] text-accent">
          <span className="h-px w-8 bg-accent" /> {ui.playerProfile} {"//"} {subheadline}
        </p>
        <h1 className="rise font-display text-5xl font-black uppercase leading-none tracking-wide text-heading sm:text-7xl" style={{ animationDelay: "80ms" }}>
          {first} <span className="text-accent text-glow">{rest.join(" ")}</span>
        </h1>
        <p className="rise mt-4 font-mono text-sm uppercase tracking-[0.2em] text-muted" style={{ animationDelay: "160ms" }}>{headline}</p>
        <p className="rise mt-6 max-w-xl text-lg text-text" style={{ animationDelay: "220ms" }}>{tagline}</p>

        <p className="mb-4 mt-12 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-muted">
          <LayoutGrid size={14} /> {ui.selectLevel}
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map((s, i) => {
            const Icon = SECTION_ICONS[s.icon] ?? LayoutGrid;
            return (
              <button
                key={s.id}
                onClick={() => go(s.id)}
                className="rise panel group p-4 text-left transition-all hover:-translate-y-1 hover:border-accent hover:glow"
                style={{ animationDelay: `${300 + i * 60}ms` }}
              >
                <span className="flex items-center justify-between">
                  <Icon size={22} className="text-accent" />
                  <span className="font-mono text-[10px] tracking-widest text-muted">{ui.lvl} {String(i + 1).padStart(2, "0")}</span>
                </span>
                <span className="mt-3 block font-display text-sm font-bold uppercase tracking-wide text-heading">{s.label}</span>
                <span className="mt-1 block text-sm text-muted">{s.blurb}</span>
              </button>
            );
          })}
          <button
            onClick={onClose}
            className="rise flex items-center justify-center gap-2 rounded-theme bg-accent p-4 font-display text-sm font-bold uppercase tracking-wider text-bg transition-transform hover:-translate-y-1"
            style={{ animationDelay: `${300 + sections.length * 60}ms` }}
          >
            {ui.pressStart} <ChevronRight size={18} />
          </button>
        </div>
        <p className="mt-6 font-mono text-[11px] text-muted">{ui.introHint}</p>
      </div>
    </div>
  );
}
