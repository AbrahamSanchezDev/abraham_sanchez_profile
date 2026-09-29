export type Mode = "dark" | "light" | "auto";
export type Nav = "sidebar" | "top";

export interface ThemeSettings {
  preset: string; // preset id, or "custom" once the user picks their own colors
  mode: Mode;
  accent: string;
  accent2: string;
  radius: number;
  motion: boolean;
  nav: Nav;
}

export const PRESETS = [
  { id: "neon", label: "Neon", mode: "dark", accent: "#00e5ff", accent2: "#7fff4f" },
  { id: "coral", label: "Coral", mode: "dark", accent: "#ff6b5a", accent2: "#ffd166" },
  { id: "gold", label: "Gold", mode: "dark", accent: "#f5c542", accent2: "#60a5fa" },
  { id: "violet", label: "Violet", mode: "dark", accent: "#a78bfa", accent2: "#22d3ee" },
  { id: "emerald", label: "Emerald", mode: "dark", accent: "#34d399", accent2: "#fbbf24" },
  { id: "paper", label: "Paper", mode: "light", accent: "#0e7490", accent2: "#c2410c" },
] as const;

export const STORAGE_KEY = "theme";

export function defaults(presetId: string, nav: Nav): ThemeSettings {
  const p = PRESETS.find((x) => x.id === presetId) ?? PRESETS[0];
  return { preset: p.id, mode: p.mode, accent: p.accent, accent2: p.accent2, radius: 10, motion: true, nav };
}

/** Kept as a plain string-able function: it is also inlined in <head> to apply saved settings before first paint. */
export function applyTheme(t: ThemeSettings) {
  const d = document.documentElement;
  d.dataset.mode = t.mode;
  d.dataset.nav = t.nav;
  d.dataset.motion = t.motion ? "on" : "off";
  d.style.setProperty("--accent", t.accent);
  d.style.setProperty("--accent-2", t.accent2);
  d.style.setProperty("--radius", t.radius + "px");
}
