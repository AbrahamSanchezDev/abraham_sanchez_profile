---
target: intro
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:E:\\Dev\\GitHub\\abraham_sanchez_profile\\app\\components\\Intro.tsx"
target_fingerprint: "sha256:ff2eaddb1c1635d94081c9ab07b47d7fd0c2c0b5c806e6e85cd5fb28f9856160"
target_path: "E:\\Dev\\GitHub\\abraham_sanchez_profile\\app\\components\\Intro.tsx"
timestamp: 2026-10-06T21-02-28Z
slug: app-components-intro-tsx
---
Method: dual-agent (A: design review, B: detector + static evidence). No browser available; layout/focus claims unverified.

# Critique: intro level-select (app/components/Intro.tsx)

Score 22/32 (69%, n/a: 7, 10). Acceptable.

Verdict: half-authored. Copy is specific; form is the generic dark-neon dev-portfolio look; proof from PRODUCT.md is absent on screen.

Detector: 3 findings in globals.css (side-tab :101 false positive, grid bg :76 false positive, backdrop color :110 minor true positive).

## Priority Issues
- [P1] Dialog focus handling incomplete: no inert background, no focus trap/return. Fix: inert or native dialog showModal, restore focus. /impeccable harden
- [P1] Card hover/focus glow probably dead: .glow is a plain class, Tailwind v4 variants need @utility; focus-visible:outline-none removes outline. Fix: @utility glow + visible outline. /impeccable polish
- [P1] Recruiter next step (CV/email) not on intro. Fix: ghost button row under cards. /impeccable clarify
- [P2] Eight equal tiles, no hierarchy, >4 choices. Fix: promote Spotlight/Projects/Experience, full-width Press Start, proof line. /impeccable layout, bolder
- [P2] Mobile entry: autoFocus on last tile scrolls hero away; sticky hover. Fix: focus container, compact 2-up cards. /impeccable adapt

## Personas
Jordan: no CV/email/proof, cannot tell strongest level. Sam: Tab leaves dialog, focus not restored, ring likely missing, 11px muted labels. Casey: 7 stacked cards, autoFocus scroll jump, sticky hover.

## Minor
go() races unmount; global Esc/Enter ignore theme panel; generic blurbs.
