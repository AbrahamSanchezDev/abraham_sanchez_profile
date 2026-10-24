---
target: intro
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:E:\\Dev\\GitHub\\abraham_sanchez_profile\\app\\components\\Intro.tsx"
target_fingerprint: "sha256:b36cee4a92dfd105df4877991fe3cb1b4829d07f0238ba821636dfa781c8ddf9"
target_path: "E:\\Dev\\GitHub\\abraham_sanchez_profile\\app\\components\\Intro.tsx"
timestamp: 2026-10-06T21-11-18Z
slug: app-components-intro-tsx
---
Method: dual-agent (A: design review, B: detector + static evidence). No browser available; layout/focus claims unverified except where noted.

# Critique: intro level-select (app/components/Intro.tsx), run 2

Score 23/32 (72%, n/a: 7, 10). Good. Previous run 22/32.

Verdict: mostly authored; icon-card grid still present; no proof of delivery on screen.

Detector: 3 findings in globals.css (side-tab false positive, grid bg false positive, backdrop color minor).

## Priority Issues
- [P1] Card hover/focus feedback mostly dead: hover:glow / focus-visible:glow absent from served CSS (verified on dev server, possibly stale); unlayered .panel border beats hover:border-accent. Fix: explicit .glow-hover rule, .panel into @layer components. /impeccable polish
- [P1] Focus return on close is a no-op: autoFocus runs before the effect so the captured opener is the Start button. Fix: capture opener in Shell via ref, or focus dialog container. /impeccable harden
- [P2] autoFocus on last tile may scroll mobile past the hero. Fix: preventScroll or focus container; sticky Start. /impeccable adapt
- [P2] No dominant path and no proof on screen; 10 equal choices. Fix: Start as the one filled CTA, CV/email beside it, one proof line. /impeccable distill
- [P3] Intro flashes on deep links and shows every load. Fix: sessionStorage flag / resolve hash before paint. /impeccable harden

## Personas
Jordan: no proof, Press start vague, CV/email secondary. Sam: focus return broken, 11px muted labels. Casey: stacked cards, autoFocus scroll, CV/email far below.

## Minor
All icons cyan; muted headline line; orphan cell if section count changes.
