# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: recruiters and hiring managers evaluating Abraham Sanchez for remote senior software engineering roles. They want to judge seniority and fit quickly, then download a CV or send an email.

## Product Purpose

A personal developer portfolio for Abraham Sanchez, Senior Software Engineer (Unity, XR, full-stack web). Success is a visitor reaching a CV download or the contact email with a clear picture of his experience, shipped work and projects.

## Positioning

He has shipped and operated live products: two games on Steam, player-retention gains on a high-traffic F2P mobile title, an XR team lead whose iOS AR app was nominated for the Unity Awards, and pipeline automation that saved production costs. The portfolio shows delivery and live operations, not only prototypes.

## Operating Context

Next.js 16 site at `/en` and `/es`, with `/` redirecting by browser language. Content comes from `content/profile.en.json` and `content/profile.es.json`. Projects live one folder each in `projects_info/<slug>/`, with media converted to WebP by `npm run media`. CV PDFs go in `public/cv/`, and their buttons appear only if the file exists.

## Capabilities and Constraints

- Content is JSON-driven. Both profile files keep identical keys, and the build fails if the Spanish file is missing one.
- Sections: About, Spotlight (The Capture Worlds on Steam), Projects (filterable by Unity / Web / XR, with demo pop-ups), Experience, Skills, Education, Contact.
- Full-screen "level select" intro (`site.showIntro`), theme and nav-layout panel, EN/ES switch that keeps the reader on the same section.
- Education currently lists degrees only. There are no training certificates on display.

## Brand Commitments

The game/HUD identity is binding: level-select intro, player card, "level" section framing and neon default theme.

## Evidence on Hand

Real data in the profile JSON files: stats, achievements, experience, three CV PDFs (Software Engineer, Unity Developer, Spanish), Steam store widget, and project folders with media. Absent and not to be fabricated: training certificates, testimonials, metrics beyond those in the JSON.

## Product Principles

- Show delivery: shipped and live work comes before potential.
- Make the recruiter's next step, a CV download or email, findable within seconds.
- Both languages are first-class; no change ships in one language only.
- Every claim traces to content in the JSON files; invent nothing.
- The game framing serves scanning and navigation and never hides content.

## Accessibility & Inclusion

No product-specific standard established. Keyboard and reduced-motion support are expected, and the site already honors `prefers-reduced-motion` and a motion-off setting.
