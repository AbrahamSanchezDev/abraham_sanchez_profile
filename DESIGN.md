---
name: Abraham Sanchez Profile
description: A cockpit-style developer portfolio, a dark HUD with neon readouts and a level-select intro, built for recruiters to scan fast.
colors:
  accent-cyan: "#00e5ff"
  accent-lime: "#7fff4f"
  bg-void: "#0b1017"
  surface-panel: "#121a26"
  surface-tint: "#19243433"
  line-hairline: "#22303f"
  text-body: "#d3e0ec"
  text-muted: "#7d91a3"
  text-heading: "#eef6ff"
  paper-bg: "#f4f6f9"
  paper-surface: "#ffffff"
  paper-line: "#d8e0e8"
  paper-text: "#2a3643"
  paper-muted: "#5e6e7e"
  paper-heading: "#0c1520"
typography:
  display:
    fontFamily: "Orbitron, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 4.5rem)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "0.025em"
  headline:
    fontFamily: "Orbitron, system-ui, sans-serif"
    fontSize: "1.5rem to 1.875rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.025em"
  title:
    fontFamily: "Orbitron, system-ui, sans-serif"
    fontSize: "0.875rem to 1rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.025em"
  body:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "1rem to 1.125rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Share Tech Mono, ui-monospace, monospace"
    fontSize: "0.6875rem to 0.875rem"
    fontWeight: 400
    letterSpacing: "0.2em to 0.35em"
rounded:
  theme: "10px"
  pill: "9999px"
  chip-icon: "3px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  section: "80px"
components:
  button-primary:
    backgroundColor: "{colors.accent-cyan}"
    textColor: "{colors.bg-void}"
    rounded: "{rounded.theme}"
    padding: "10px 20px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text-heading}"
    rounded: "{rounded.theme}"
    padding: "10px 20px"
  button-ghost-hover:
    textColor: "{colors.accent-cyan}"
  panel:
    backgroundColor: "{colors.surface-panel}"
    textColor: "{colors.text-body}"
    rounded: "{rounded.theme}"
    padding: "24px"
  chip:
    backgroundColor: "{colors.surface-tint}"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
---

# Design System: Abraham Sanchez Profile

## Overview

**Creative North Star: "The Cockpit Dashboard"**

The portfolio reads like an instrument panel: a near-black field with a faint HUD grid, hairline-bordered panels, and a single neon accent that lights up only what matters. Sections are "levels", the sidebar is a status rail, and the About aside is a player card. The game framing is a navigation and scanning device, so a recruiter can find the CV, the proof and the contact in seconds. It is never decoration for its own sake.

Density is moderate and deliberate. Wide display type (Orbitron) names things, a clean humanist sans (Barlow) carries reading, and a monospace (Share Tech Mono) handles readouts, labels and periods. Color is rationed: one cyan accent, one lime secondary for status and checkmarks, everything else is tonal blue-grey.

The look must stay clean and modern. It rejects the generic SaaS landing template, over-gamified clutter that slows a recruiter down, 8-bit or skeuomorphic retro, and the cold, personality-free corporate résumé.

**Key Characteristics:**
- Dark-first HUD: tonal surfaces, hairline borders, a faint 48px grid and an accent bloom at the top edge
- One accent at a time; the whole accent pair is user-swappable at runtime through six presets (Neon, Coral, Gold, Violet, Emerald, Paper)
- Orbitron for naming, Barlow for reading, Share Tech Mono for readouts
- Game vocabulary (levels, player card, press start) as wayfinding

## Colors

A cool blue-black field with one electric cyan accent and a lime secondary. The values below are the default "Neon" preset; `--accent`, `--accent-2` and `--radius` are overwritten at runtime by the theme panel, so components must reference the variables and never hard-code hex.

### Primary
- **Electric Cyan** (#00e5ff): the accent. Primary buttons, kickers, active nav, links on hover, headline highlights, panel bars and glows.

### Secondary
- **Signal Lime** (#7fff4f): the second accent. Availability pulse dot, achievement trophies, timeline bullets. Never competes with cyan for the main action.

### Neutral
- **Void Navy** (#0b1017): page background.
- **Panel Slate** (#121a26): panel and card surface.
- **Tint Wash** (#19243433): translucent chip and hover surface.
- **Hairline Steel** (#22303f): all borders, dividers and the HUD grid lines (mixed 45% transparent).
- **Frost Body** (#d3e0ec): body text.
- **Mist Muted** (#7d91a3): secondary text, labels, periods.
- **Ice Heading** (#eef6ff): headings and button text on ghost buttons.
- **Paper mode:** #f4f6f9 background, #ffffff surface, #d8e0e8 lines, #2a3643 text, #5e6e7e muted, #0c1520 heading, with the accent pair swapped to teal #0e7490 and burnt orange #c2410c.

### Named Rules
**The One Voice Rule.** Cyan is the only action color on a screen. Lime marks status and reward, never a call to action.
**The Variable Accent Rule.** Always `var(--accent)` / `var(--accent-2)`; any hex that matches a preset in a component is a bug, because it breaks theme switching.

## Typography

**Display Font:** Orbitron (system-ui fallback)
**Body Font:** Barlow (system-ui fallback)
**Label/Mono Font:** Share Tech Mono (ui-monospace fallback)

**Character:** Wide, geometric Orbitron gives the machine voice; Barlow keeps long reading calm and human; the monospace adds telemetry texture only where something is measured or labelled.

### Hierarchy
- **Display** (900, clamp 2.25rem to 4.5rem, line-height 1, uppercase, +0.025em): hero and intro name only; last word glows in accent.
- **Headline** (700, 1.5 to 1.875rem, uppercase, +0.025em): section titles.
- **Title** (700, 0.875 to 1rem, uppercase): company names, level-card titles.
- **Body** (400, 1 to 1.125rem, 1.65): copy; keep to ~65 to 75ch (`max-w-xl`/`2xl` in use).
- **Label** (mono, 11 to 14px, uppercase, +0.2em to +0.35em): kickers, periods, level numbers, hints.

### Named Rules
**The Readout Rule.** Monospace is for labels, periods and levels. Never use it for paragraphs.
**The Wide Voice Rule.** Orbitron is uppercase and display-only; do not set body copy or long strings in it.

## Layout

A single centered column (`max-w-6xl`, 16/24/40px gutters) with a fixed 16rem sidebar on desktop (`data-nav="sidebar"`) or a top bar (`data-nav="top"`), both user-selectable. Sections are separated by a hairline top border and 80px of vertical padding. The hero is a content column plus a 300px player-card aside; card sections use a 2-column grid from `md`, the intro level grid goes 1, 2 then 4 columns. Stat tiles are 2 columns on mobile, 4 from `md`. Spacing runs on a 4px base: 8/12/16/24 inside components, 40 between a section header and content, 80 between sections.

## Elevation & Depth

Flat by default. Depth comes from tonal layering (void, then panel slate) and 1px hairline borders, not shadows. Glow is the single depth effect and it is responsive or identity-bearing: the logo diamond, the headline accent word, and hover or focus on interactive panels. The top of the page carries a soft accent bloom (radial gradient) behind the HUD grid.

### Shadow Vocabulary
- **Accent ring and bloom** (`box-shadow: 0 0 0 1px accent/50%, 0 0 24px accent/25%`, class `.glow`): hover and focus on level cards, and the logo mark.
- **Text glow** (`text-shadow: 0 0 28px accent/55%`, class `.text-glow`): the highlighted last word of the name only.

### Named Rules
**The Flat-Until-Touched Rule.** Panels sit flat at rest. Glow appears on hover, focus or the logo; it is never added to resting content.

## Shapes

Gently rounded rectangles driven by `--radius` (10px default, adjustable in the theme panel). Chips and status pills are full-radius. The logo mark and timeline nodes are 45-degree rotated squares (diamonds), a deliberate HUD motif. Panels may carry a 3px accent bar on the left edge (`.panel-bar`) to mark a featured or categorised block; keep it at 3px.

## Components

### Buttons
- **Shape:** theme radius (10px), 10px by 20px padding, 14px semibold.
- **Primary:** accent fill with void-navy text; lifts 2px on hover.
- **Ghost:** 1px hairline border, heading text; border and text turn accent on hover.
- **Focus:** buttons lift 2px on keyboard focus as on hover, with the same border and text change; level cards show a 2px accent outline plus the glow. Other controls (nav, theme, chips) still rely on browser defaults, a known gap.

### Chips
- **Style:** full-radius, hairline border, tint wash fill, muted text with a brand icon (simple-icons path) or a bordered monogram when no icon exists.
- **State:** border and text turn accent on hover. Compact size is 11px, regular is 14px.

### Cards / Containers (`.panel`)
- **Corner Style:** theme radius.
- **Background:** panel slate with a 1px hairline border; overflow hidden.
- **Shadow Strategy:** none at rest; see Elevation.
- **Internal Padding:** 16px (stat tiles, level cards), 24px (content panels), 32 to 56px (contact).

### Navigation
- **Style:** sidebar rail with an icon, label and mono index per level; the active item gets an accent tint, an accent icon and a 3px accent tab at its left edge. Top-bar variant uses text-only links that turn accent when active. Theme, language and CV controls sit in the same rail.

### Level Select (signature component)
Full-screen intro with the HUD grid, display-size name, a large role line, two proof stats as number readouts, and an action row (filled Download CV, ghost Press Start and Email), above a grid of level cards (icon, `LVL 0N`, title, blurb). Cards rise in with a short stagger, lift 4px and glow on hover (real pointers only) or keyboard focus; the last card spans the leftover grid cell. The page behind is inert, the dialog takes focus on open, and Enter or Esc skips. Deep links (`#section`) never show it.

## Do's and Don'ts

### Do:
- **Do** use `var(--accent)` and `var(--accent-2)` so every theme preset works.
- **Do** keep the game vocabulary (levels, player card, press start) as navigation, with the real content always one click or scroll away.
- **Do** keep monospace labels uppercase with wide tracking, and Orbitron uppercase with wide tracking.
- **Do** separate sections with a hairline border and 80px padding rather than boxes or shadows.
- **Do** respect `prefers-reduced-motion` and the in-site motion toggle; entrances use the exponential ease-out `cubic-bezier(0.16, 1, 0.3, 1)`.

### Don't:
- **Don't** build a generic SaaS landing template: no gradient heroes, icon-card feature grids or stock testimonials.
- **Don't** over-gamify: no XP bars, fake loot or decorative mechanics that slow a recruiter down.
- **Don't** go 8-bit, pixel-art or skeuomorphic; the HUD stays clean and modern.
- **Don't** drift to a cold corporate résumé look: keep the accent, the grid and the wide display type.
- **Don't** put glow on resting content, use gradient text, or hard-code a preset's hex value in a component.
