"use client";

import { useEffect, useRef, useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
import type { UI } from "../lib/data";
import { applyTheme, defaults, PRESETS, STORAGE_KEY, type Mode, type Nav, type ThemeSettings } from "../lib/theme";

function read(fallback: ThemeSettings): ThemeSettings {
  try {
    return { ...fallback, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") };
  } catch {
    return fallback;
  }
}

function Segmented<T extends string>({ value, options, onChange }: { value: T; options: [T, string][]; onChange: (v: T) => void }) {
  return (
    <div className="flex rounded-full border border-line bg-surface-2 p-1">
      {options.map(([v, label]) => (
        <button key={v} onClick={() => onChange(v)} aria-pressed={value === v}
          className={`flex-1 rounded-full px-3 py-1.5 text-sm transition-colors ${value === v ? "bg-accent font-semibold text-bg" : "text-muted hover:text-heading"}`}>
          {label}
        </button>
      ))}
    </div>
  );
}

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-2 mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{children}</p>
);

export default function ThemePanel({ open, onClose, defaultTheme, ui }: { open: boolean; onClose: () => void; defaultTheme: string; ui: UI }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [t, setT] = useState<ThemeSettings | null>(null);

  useEffect(() => {
    const d = ref.current!;
    if (open && !d.open) {
      // Seed from what's actually on <html> (server defaults) + saved settings.
      const nav = (document.documentElement.dataset.nav as Nav) ?? "sidebar";
      setT(read(defaults(defaultTheme, nav)));
      d.showModal();
    } else if (!open && d.open) d.close();
  }, [open, defaultTheme]);

  const update = (patch: Partial<ThemeSettings>) => {
    const next = { ...t!, ...patch };
    setT(next);
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  };

  const reset = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    location.reload();
  };

  return (
    <dialog ref={ref} onClose={onClose} onClick={(e) => e.target === ref.current && onClose()}
      className="m-0 ml-auto h-dvh max-h-none w-full max-w-sm border-l border-line bg-surface p-0 text-text">
      {t && (
        <div className="flex h-full flex-col overflow-y-auto p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-display text-lg font-bold uppercase tracking-wide text-heading">{ui.themes}</h2>
              <p className="text-sm text-muted">{ui.themesSub}</p>
            </div>
            <button onClick={onClose} aria-label={ui.close} className="rounded-theme p-1.5 text-muted hover:text-heading"><X size={20} /></button>
          </div>

          <Label>{ui.mode}</Label>
          <Segmented<Mode> value={t.mode} onChange={(mode) => update({ mode })} options={[["auto", ui.auto], ["light", ui.light], ["dark", ui.dark]]} />

          <Label>{ui.presets}</Label>
          <div className="grid grid-cols-3 gap-2">
            {PRESETS.map((p) => (
              <button key={p.id} onClick={() => update({ preset: p.id, mode: p.mode, accent: p.accent, accent2: p.accent2 })}
                className={`flex flex-col items-center gap-2 rounded-theme border p-3 text-xs transition-colors ${t.preset === p.id ? "border-accent text-heading" : "border-line text-muted hover:border-muted"}`}>
                <span className="relative flex">
                  <span className="h-6 w-6 rounded-full" style={{ background: p.accent, boxShadow: `0 0 14px ${p.accent}88` }} />
                  <span className="-ml-2 h-6 w-6 rounded-full border-2 border-surface" style={{ background: p.accent2 }} />
                  {t.preset === p.id && <Check size={14} className="absolute -right-3 -top-1 text-accent" />}
                </span>
                {p.label}
              </button>
            ))}
          </div>

          <Label>{ui.customColors}</Label>
          <div className="grid grid-cols-2 gap-2">
            {([["accent", ui.primary], ["accent2", ui.secondary]] as const).map(([k, label]) => (
              <label key={k} className="flex cursor-pointer items-center gap-3 rounded-theme border border-line p-2 text-sm hover:border-muted">
                <input type="color" value={t[k]} onChange={(e) => update({ [k]: e.target.value, preset: "custom" })}
                  className="h-8 w-8 cursor-pointer rounded border-0 bg-transparent p-0" />
                <span>{label}<span className="block font-mono text-[10px] uppercase text-muted">{t[k]}</span></span>
              </label>
            ))}
          </div>

          <Label>{ui.cornerRadius} · {t.radius}px</Label>
          <input type="range" min={0} max={20} value={t.radius} onChange={(e) => update({ radius: +e.target.value })} className="w-full accent-[var(--accent)]" />

          <Label>{ui.navigation}</Label>
          <Segmented<Nav> value={t.nav} onChange={(nav) => update({ nav })} options={[["sidebar", ui.sidebar], ["top", ui.topBar]]} />
          <p className="mt-1 text-xs text-muted">{ui.navHint}</p>

          <label className="mt-6 flex cursor-pointer items-center justify-between gap-4">
            <span>
              <span className="block text-sm text-heading">{ui.animations}</span>
              <span className="block text-xs text-muted">{ui.animationsSub}</span>
            </span>
            <input type="checkbox" checked={t.motion} onChange={(e) => update({ motion: e.target.checked })} className="h-5 w-5 accent-[var(--accent)]" />
          </label>

          <button onClick={reset} className="mt-auto flex items-center justify-center gap-2 pt-8 text-sm text-muted hover:text-accent">
            <RotateCcw size={14} /> {ui.reset}
          </button>
        </div>
      )}
    </dialog>
  );
}
