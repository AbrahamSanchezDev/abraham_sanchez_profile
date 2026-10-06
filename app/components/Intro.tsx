"use client";

import { useEffect, useRef } from "react";
import { ChevronRight, Download, LayoutGrid, Mail } from "lucide-react";
import type { UI } from "../lib/data";
import type { Section } from "./Shell";
import { btnGhost, btnPrimary, SECTION_ICONS } from "./ui";

interface Props {
  name: string;
  headline: string;
  subheadline: string;
  tagline: string;
  proof: { value: string; label: string }[];
  sections: Section[];
  email: string;
  cv?: { label: string; file: string };
  ui: UI;
  onClose: () => void;
}

/** Full-screen "level select" landing. Enabled with site.showIntro in content/profile.<lang>.json. */
export default function Intro({ name, headline, subheadline, tagline, proof, sections, email, cv, ui, onClose }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Focus the dialog itself (not a button) so the browser never scrolls a far-down control into view on phones.
    root.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) =>
      (e.key === "Escape" || (e.key === "Enter" && (e.target === document.body || e.target === root.current))) && onClose();
    addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const go = (id: string) => {
    onClose();
    requestAnimationFrame(() => {
      const section = document.getElementById(id);
      section?.scrollIntoView();
      // Hand keyboard focus to the chosen level's heading so the next Tab continues from there, not the nav.
      const heading = section?.querySelector<HTMLElement>("h1, h2");
      if (heading) {
        heading.tabIndex = -1;
        heading.focus({ preventScroll: true });
      }
    });
  };

  const [first, ...rest] = name.split(" ");

  return (
    <div
      ref={root}
      tabIndex={-1}
      data-intro
      role="dialog"
      aria-modal="true"
      aria-label={ui.levelSelect}
      className="hud-bg fixed inset-0 z-[60] overflow-y-auto bg-bg outline-none"
    >
      <div className="mx-auto flex min-h-full max-w-5xl flex-col justify-center px-4 py-12 sm:px-6">
        <p className="rise mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-accent sm:tracking-[0.35em]">
          <span className="h-px w-8 shrink-0 bg-accent" /> {ui.playerProfile} {"//"} {subheadline}
        </p>
        <h1 className="rise text-balance font-display text-5xl font-black uppercase leading-none tracking-wide text-heading sm:text-7xl" style={{ animationDelay: "80ms" }}>
          {first} <span className="text-accent text-glow">{rest.join(" ")}</span>
        </h1>
        <p className="rise mt-4 font-display text-lg font-bold uppercase tracking-wide text-heading sm:text-2xl" style={{ animationDelay: "160ms" }}>{headline}</p>
        <p className="rise mt-4 max-w-xl text-pretty text-lg text-text" style={{ animationDelay: "220ms" }}>{tagline}</p>
        <dl className="rise mt-6 flex flex-wrap gap-x-10 gap-y-3" style={{ animationDelay: "260ms" }}>
          {proof.map((s) => (
            <div key={s.label} className="flex flex-col-reverse">
              <dt className="text-sm text-muted">{s.label}</dt>
              <dd className="font-display text-3xl font-bold text-accent-2">{s.value}</dd>
            </div>
          ))}
        </dl>

        <div className="rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "300ms" }}>
          {cv && <a href={cv.file} download className={btnPrimary}><Download size={16} /> {ui.downloadCv}</a>}
          <button onClick={onClose} className={cv ? btnGhost : btnPrimary}>{ui.pressStart} <ChevronRight size={16} /></button>
          <a href={`mailto:${email}`} className={btnGhost}><Mail size={16} /> {ui.email}</a>
        </div>

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
                // ponytail: last card spans the leftover cell(s); assumes 7 sections, revisit if the count changes
                className="rise panel glow-hover group p-4 text-left last:sm:col-span-2 transition-all hover:-translate-y-1 hover:border-accent focus-visible:-translate-y-1 focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                style={{ animationDelay: `${280 + i * 35}ms` }}
              >
                <span className="flex items-center justify-between">
                  <Icon size={22} className="text-accent" />
                  <span className="font-mono text-[11px] tracking-widest text-muted">{ui.lvl} {String(i + 1).padStart(2, "0")}</span>
                </span>
                <span className="mt-3 block font-display text-sm font-bold uppercase tracking-wide text-heading">{s.label}</span>
                <span className="mt-1 block text-sm text-muted">{s.blurb}</span>
              </button>
            );
          })}
        </div>
        <p className="mt-6 font-mono text-xs text-muted">{ui.introHint}</p>
      </div>
    </div>
  );
}
