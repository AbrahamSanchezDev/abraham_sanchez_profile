"use client";

import { useEffect, useState } from "react";
import { Download, Languages, LayoutGrid, Mail, Menu, Palette, X } from "lucide-react";
import type { Lang, Tech, UI } from "../lib/data";
import { SECTION_ICONS, TechIcon } from "./ui";
import Intro from "./Intro";
import ThemePanel from "./ThemePanel";

export interface Section {
  id: string;
  label: string;
  icon: string;
  blurb: string;
}
export interface Social {
  label: string;
  href: string;
  tech: Tech;
}

interface Props {
  sections: Section[];
  name: string;
  initials: string;
  headline: string;
  subheadline: string;
  tagline: string;
  email: string;
  socials: Social[];
  cvs: { label: string; file: string }[];
  showIntro: boolean;
  defaultTheme: string;
  lang: Lang;
  ui: UI;
  children: React.ReactNode;
}

export default function Shell(p: Props) {
  const [active, setActive] = useState(p.sections[0]?.id);
  const [introOpen, setIntroOpen] = useState(p.showIntro);
  const [themeOpen, setThemeOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Deep links (/#projects) skip the intro.
  useEffect(() => {
    if (location.hash) setIntroOpen(false); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    p.sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [p.sections]);

  const links = (onPick?: () => void) =>
    p.sections.map((s, i) => {
      const Icon = SECTION_ICONS[s.icon] ?? LayoutGrid;
      const on = active === s.id;
      return (
        <a
          key={s.id}
          href={`#${s.id}`}
          onClick={onPick}
          aria-current={on ? "true" : undefined}
          className={`group relative flex items-center gap-3 rounded-theme px-3 py-2.5 text-sm font-medium transition-colors ${
            on ? "bg-accent/10 text-heading" : "text-muted hover:bg-surface-2 hover:text-heading"
          }`}
        >
          <span className={`absolute -left-3 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r bg-accent transition-opacity ${on ? "opacity-100" : "opacity-0"}`} />
          <Icon size={18} className={on ? "text-accent" : ""} />
          <span className="flex-1">{s.label}</span>
          <span className="font-mono text-[10px] opacity-50">{String(i + 1).padStart(2, "0")}</span>
        </a>
      );
    });

  const socials = (
    <div className="flex items-center gap-1">
      {p.socials.map((s) => (
        <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label}
          className="rounded-theme p-2 text-muted transition-colors hover:bg-surface-2 hover:text-accent">
          <TechIcon tech={s.tech} size={18} />
        </a>
      ))}
      <a href={`mailto:${p.email}`} aria-label={p.ui.email} title={p.ui.email} className="rounded-theme p-2 text-muted transition-colors hover:bg-surface-2 hover:text-accent">
        <Mail size={18} />
      </a>
    </div>
  );

  const logo = (
    <button onClick={() => p.showIntro && setIntroOpen(true)} className="flex items-center gap-3 text-left" title={p.showIntro ? p.ui.levelSelect : undefined}>
      <span className="grid h-9 w-9 rotate-45 place-items-center rounded-md border border-accent/60 bg-accent/10 glow">
        <span className="-rotate-45 font-display text-xs font-bold text-accent">{p.initials}</span>
      </span>
      <span className="leading-tight">
        <span className="block font-display text-sm font-bold tracking-wide text-heading">{p.name}</span>
        <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">{p.headline}</span>
      </span>
    </button>
  );

  const other: Lang = p.lang === "en" ? "es" : "en";
  const themeBtn = (
    <>
      <a
        href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/${other}`}
        hrefLang={other}
        // Keep the reader on the same section (and skip the intro) when switching language.
        onClick={(e) => {
          e.preventDefault();
          location.href = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/${other}${location.hash || "#" + active}`;
        }}
        title={p.ui.switchTitle}
        aria-label={p.ui.switchTitle}
        className="inline-flex items-center gap-1 rounded-theme p-2 font-mono text-xs font-bold text-muted transition-colors hover:bg-surface-2 hover:text-accent"
      >
        <Languages size={16} /> {p.ui.switchLabel}
      </a>
      <button onClick={() => setThemeOpen(true)} aria-label={p.ui.themeSettings} title={p.ui.themeSettings}
        className="rounded-theme p-2 text-muted transition-colors hover:bg-surface-2 hover:text-accent">
        <Palette size={18} />
      </button>
    </>
  );

  return (
    <>
      {/* Sidebar layout (desktop) */}
      <aside className="nav-side fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-line bg-surface/80 px-6 py-6 backdrop-blur lg:flex">
        {logo}
        <nav className="mt-10 flex flex-col gap-1" aria-label={p.ui.menu}>{links()}</nav>
        <div className="mt-auto space-y-4">
          {p.cvs[0] && (
            <a href={p.cvs[0].file} download className="flex items-center justify-center gap-2 rounded-theme border border-accent/60 px-3 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent/10">
              <Download size={16} /> {p.ui.downloadCv}
            </a>
          )}
          <div className="flex flex-wrap items-center justify-between gap-y-1 border-t border-line pt-4">
            {socials}
            <div className="flex">{themeBtn}</div>
          </div>
        </div>
      </aside>

      {/* Top bar: always on mobile, and on desktop when nav = top */}
      <header className="nav-top sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          {logo}
          <nav className="nav-top-links hidden items-center gap-1 lg:flex" aria-label={p.ui.menu}>
            {p.sections.map((s) => (
              <a key={s.id} href={`#${s.id}`}
                className={`rounded-theme px-3 py-2 text-sm font-medium transition-colors ${active === s.id ? "text-accent" : "text-muted hover:text-heading"}`}>
                {s.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center">
            {themeBtn}
            <button onClick={() => setMenuOpen((o) => !o)} aria-label={p.ui.menu} aria-expanded={menuOpen}
              className="rounded-theme p-2 text-muted hover:text-accent lg:hidden">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="border-t border-line px-7 pb-4 pt-2 lg:hidden">
            <nav className="flex flex-col gap-1" aria-label={p.ui.menu}>{links(() => setMenuOpen(false))}</nav>
            <div className="mt-3 border-t border-line pt-3">{socials}</div>
          </div>
        )}
      </header>

      <div className="content">{p.children}</div>

      {introOpen && (
        <Intro ui={p.ui} name={p.name} headline={p.headline} subheadline={p.subheadline} tagline={p.tagline} sections={p.sections} onClose={() => setIntroOpen(false)} />
      )}
      <ThemePanel ui={p.ui} open={themeOpen} onClose={() => setThemeOpen(false)} defaultTheme={p.defaultTheme} />
    </>
  );
}
