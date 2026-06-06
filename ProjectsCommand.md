
# ProjectsCommand

This file is a single copy-paste prompt you can run inside any project repository (web or Unity) to generate two artefacts:
- `ProjectInfo.md` — a standardized metadata file used by the profile to display the project in the arcade gallery and to generate an entry for `app/data/games.json`.
- `README.md` — a recruiter-friendly repository README with clear description, tech stack and run instructions.

How to use
1. From the root of your project, open your AI assistant (ChatGPT, local LLM, etc.) and paste the prompt below.
2. Provide any additional context (build system, main entry files, deployment URL if available).
3. Review the generated `ProjectInfo.md`, `README.md` and the JSON snippet. Save `ProjectInfo.md` in the repo root and paste the JSON into the profile's `app/data/games.json`.

Copy-paste prompt (ENGLISH) — paste exactly into an LLM:

**Command**

"You are a technical writer and engineer. Generate two files for the current repository: `ProjectInfo.md` and `README.md`, and provide a JSON snippet ready to paste into the profile `games.json`.

Rules and output format:
- Output only valid Markdown and JSON blocks. Do not output commentary outside the requested files.
- Use English for the generated `ProjectInfo.md` and `README.md` content.
- Keep `ProjectInfo.md` fields exact and machine-readable; use the YAML-like frontmatter block shown in the template.
- For web projects (React, Vite, Next, etc.), extract information from `package.json`, `public` folder and primary source files. For Unity projects, inspect `ProjectSettings`, `Build` folders and describe how the WebGL build is published.
- Always include a `demoUrl` field. If no public demo exists, set `demoUrl: ""` and add a short note under `README.md` about how to deploy to get a demo URL.
- Provide a short technical `challenge` (2–3 sentences) and a concise `architecture` description (1–2 sentences with patterns like "Object pooling", "Event-driven", "Observer pattern", etc.).
- Include a `codeSnippet` (no more than ~15 lines) that highlights a key implementation detail. For Unity, prefer a short C# snippet; for web projects prefer TypeScript/JS.
- Provide a clear `techStack` array listing the most important technologies.

Required `ProjectInfo.md` template (exact format to produce):
---
id: your-project-slug
title: Human Friendly Title
subtitle: One-line description
techBadge: ShortBadgeText
gifUrl: /games/your-game.gif
repoUrl: https://github.com/username/repo
demoUrl: https://your-deployment.example  # or empty string if none
challenge: "Brief description of the technical challenge and outcome."
architecture: "Short architecture summary with patterns used."
techStack:
  - Technology A
  - Technology B
codeSnippetTitle: "Short Snippet Title"
codeSnippet: |
  // up to ~15 lines of representative code
---

Required `README.md` structure (generate full Markdown):
- Project title and one-liner
- Short description for recruiters (2–4 short paragraphs): goals, what you learned, impact or metrics
- Tech stack section: bullet list with 1-line justification per tech
- How to run locally: copyable commands for install, dev, build, and deploy
- If a demo exists, show the `demoUrl` prominently and explain what to test in the demo
- For Unity WebGL provide short publish instructions (Build -> upload to Netlify/GitHub Pages or point to `Build` folder hosting)

JSON snippet (produce a single JSON object, compact and valid) that will be used in `app/data/games.json`:
{
  "id": "your-project-slug",
  "title": "Human Friendly Title",
  "subtitle": "One-line description",
  "techBadge": "ShortBadgeText",
  "gifUrl": "/games/your-game.gif",
  "repoUrl": "https://github.com/username/repo",
  "demoUrl": "https://your-deployment.example",
  "challenge": "Brief technical challenge",
  "architecture": "Short architecture summary",
  "techStack": ["Tech1", "Tech2"],
  "codeSnippetTitle": "Short Snippet Title",
  "codeSnippet": "// representative snippet as a single string with newlines escaped or preserved"
}

At the end of your response include three separate outputs only, in this exact order and format:
1) A full `ProjectInfo.md` content block (the YAML-like frontmatter as shown above),
2) A full `README.md` in Markdown,
3) A JSON snippet ready to paste into `app/data/games.json`.

Do not include any additional commentary or notes. Ensure all URLs are absolute when available. If you cannot determine a field, leave it empty but include the key.

Below add a visual separator and add the Spanish translation of the same content"