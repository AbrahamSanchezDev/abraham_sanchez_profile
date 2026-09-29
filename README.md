# Abraham Sanchez — Developer Profile

Next.js 16 portfolio. All content is data-driven: edit JSON, the page updates.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Languages

The site lives at `/en` and `/es`. `/` redirects based on the browser language (`proxy.ts`). The EN/ES button keeps the reader on the same section.

## Updating content

| What | Where |
|---|---|
| Name, summary, stats, experience, skills, education, contact, intro on/off, default theme/nav, button labels (`ui`) | `content/profile.en.json` (English) and `content/profile.es.json` (Spanish) — keep both with the same keys; the build fails if the Spanish file is missing one |
| Projects | one folder per project in `projects_info/<project-slug>/` |
| CV downloads | drop PDFs in `public/cv/` using the file names listed in `person.cv` (buttons only appear if the file exists) |

### Adding a project

1. Create `projects_info/<project-slug>/project.json` (kebab-case folder name = project id). Fields: `tags` (`Unity` / `Web` / `XR` — drive the filter chips), `title`, `subtitle`, `techBadge`, `repoUrl`, `demoUrl` (optional → "Try demo" pop-up), `demoEmbeddable: false` (for links that can't load in an iframe, e.g. npm), `challenge`, `architecture`, `techStack`, `codeSnippetTitle`, `codeSnippet`.
   Add the slug to `projects_info/order.json` where the card should appear (the list order is the display order; unlisted projects go last).
2. Add media as `preview-01.gif`, `preview-02.png`, … (sorted by name; the first is the card cover).
3. Optional: add `project.es.json` with the Spanish `title`, `subtitle`, `challenge`, `architecture`, `codeSnippetTitle` (any field left out falls back to English).
4. Run `npm run media` — converts media to optimized WebP in `public/projects/<slug>/` (GIFs → animated WebP + still poster). Raw media in `projects_info/` is git-ignored; commit the `public/projects` output.

Tech icons come from [simple-icons](https://simpleicons.org); names are matched in `app/lib/data.ts` (`ICON_ALIASES`). Unknown tech shows a monogram badge.

### Sections

`sections` (in both profile files) controls nav order, labels, intro "levels" and icons (`User`, `Gamepad2`, `Boxes`, `Briefcase`, `Cpu`, `GraduationCap`, `Send` — add more in `app/components/ui.tsx`).
