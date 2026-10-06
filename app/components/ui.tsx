import { Boxes, Briefcase, Cpu, Gamepad2, GraduationCap, Send, User, type LucideIcon } from "lucide-react";
import type { Tech } from "../lib/data";

/** Icons usable from profile.<lang>.json "sections[].icon". Add here when adding a section. */
export const SECTION_ICONS: Record<string, LucideIcon> = { User, Gamepad2, Boxes, Briefcase, Cpu, GraduationCap, Send };

const btn = "inline-flex items-center gap-2 rounded-theme px-5 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5 focus-visible:-translate-y-0.5";
export const btnPrimary = `${btn} bg-accent text-bg`;
export const btnGhost = `${btn} border border-line text-heading hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent`;

export function TechIcon({ tech, size = 16 }: { tech: Tech; size?: number }) {
  if (tech.icon)
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden className="shrink-0">
        <path d={tech.icon} />
      </svg>
    );
  // ponytail: no brand icon (e.g. C#, AWS, trademark-removed from simple-icons) -> text monogram
  return (
    <span
      aria-hidden
      style={{ width: size, height: size, fontSize: size * 0.5 }}
      className="inline-flex shrink-0 items-center justify-center rounded-[3px] border border-current font-mono font-bold leading-none"
    >
      {tech.name.replace(/[^A-Za-z0-9#+]/g, "").slice(0, 2)}
    </span>
  );
}

export function TechChip({ tech, compact }: { tech: Tech; compact?: boolean }) {
  return (
    <span
      title={tech.name}
      className={`inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2 text-muted transition-colors hover:border-accent hover:text-accent ${
        compact ? "px-2 py-1 text-[11px]" : "px-3 py-1.5 text-sm"
      }`}
    >
      <TechIcon tech={tech} size={compact ? 13 : 16} />
      {tech.name}
    </span>
  );
}

export function SectionHeader({ level, label, title, kicker }: { level: number; label: string; title: string; kicker?: string }) {
  return (
    <header className="mb-10">
      <p className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
        <span className="h-px w-8 bg-accent" />
        {label} {String(level).padStart(2, "0")}
        {kicker && <span className="text-muted">{"//"} {kicker}</span>}
      </p>
      <h2 className="text-balance font-display text-2xl font-bold uppercase tracking-wide text-heading sm:text-3xl">{title}</h2>
    </header>
  );
}
