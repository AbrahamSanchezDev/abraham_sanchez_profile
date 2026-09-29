# ProjectsCommand

This file is a single copy-paste prompt you can run inside any project repository (web or Unity) to generate two artefacts:

- `ProjectInfo.json` — a standardized metadata file used by the profile to display the project in the arcade gallery and to generate an entry for `projects_info/<project-slug>/project.json`.
- `README.md` — a recruiter-friendly repository README with strong structure, preview image info, and polished sections.

How to use

1. From the root of your project, open your AI assistant (ChatGPT, local LLM, etc.) and paste the prompt below.
2. Provide any additional context about the repository, build system, public preview URL, or main entry files.
3. Save the generated `ProjectInfo.json` in the repo root, save `README.md` in the repo root, and copy the JSON snippet to the profile's `projects_info/<project-slug>/project.json`.

Copy-paste prompt (ENGLISH) — paste exactly into an LLM:

## **Command**

You are a technical writer and engineer. Generate two files for the current repository: `ProjectInfo.json` and `README.md`, and provide a JSON snippet ready to paste into the profile `projects_info/<project-slug>/project.json`.

Rules and output format:

- Output only valid Markdown and JSON blocks. Do not output commentary outside the requested files.
- Use English for the generated `ProjectInfo.json` and `README.md` content.
- Keep `ProjectInfo.json` fields exact and machine-readable; produce the JSON object shown in the template.
- For web projects (React, Vite, Next, etc.), extract information from `package.json`, `public` folder and primary source files. For Unity projects, inspect `ProjectSettings`, `Build` folders, and describe how the WebGL build is published.
- Always include a `demoUrl` field. If no public demo exists, set `demoUrl: ""` and add a short note under `README.md` about how to deploy to get a demo URL.
- Include a `previewImageUrl` in the `README.md` section if a preview asset exists, and show the demo URL clearly.
- Provide a short technical `challenge` (2–3 sentences) and a concise `architecture` description (1–2 sentences with patterns like "Object pooling", "Event-driven", "Observer pattern", etc.).
- Include a `codeSnippet` (no more than ~15 lines) that highlights a key implementation detail. For Unity, prefer a short C# snippet; for web projects prefer TypeScript/JS.
- Provide a clear `techStack` array listing the most important technologies.
- Use icons and section headings in `README.md` to improve readability, similar to a polished project portfolio document.

Required `ProjectInfo.json` template (exact format to produce):

```json
{
  "tags": ["Unity", "Web", "XR"],
  "title": "Human Friendly Title",
  "subtitle": "One-line description",
  "techBadge": "ShortBadgeText",
  "repoUrl": "https://github.com/username/repo",
  "demoUrl": "https://your-deployment.example",
  "challenge": "Brief description of the technical challenge and outcome.",
  "architecture": "Short architecture summary with patterns used.",
  "techStack": ["Technology A", "Technology B"],
  "codeSnippetTitle": "Short Snippet Title",
  "codeSnippet": "// up to ~15 lines of representative code\\nfunction example() { return true; }"
}
```

Required `README.md` structure (generate full Markdown with icons and preview image):

- Project title and one-liner
- Project summary section with development objective, challenge context, and delivery timeframe if available
- Project overview section describing gameplay or user experience
- Key features section with checklist-style bullets
- Preview section with a public image URL or local preview asset reference and the demo URL
- Project structure section summarizing top-level folders and key systems
- Architecture highlights section with patterns and system responsibilities
- Technology stack section: bullet list with 1-line justification per tech
- Code quality and engineering practices section explaining architecture, maintainability, and professional standards
- How to build & run locally section with copyable commands
- Development insights / timeline section if available
- Learning outcomes section summarizing what the author demonstrated or practiced
- Contact or author section if available

JSON snippet (produce a single JSON object, compact and valid) that will be used in `projects_info/<project-slug>/project.json`:
{
"tags": ["Unity", "Web", "XR"],
"title": "Human Friendly Title",
"subtitle": "One-line description",
"techBadge": "ShortBadgeText",
"repoUrl": "https://github.com/username/repo",
"demoUrl": "https://your-deployment.example",
"challenge": "Brief technical challenge",
"architecture": "Short architecture summary",
"techStack": ["Tech1", "Tech2"],
"codeSnippetTitle": "Short Snippet Title",
"codeSnippet": "// representative snippet as a single string with newlines escaped or preserved"
}

At the end of your response include three separate outputs only, in this exact order and format:

1. A full `ProjectInfo.json` content block (the JSON object as shown above),
2. A full `README.md` in Markdown,
3. A JSON snippet ready to paste into `projects_info/<project-slug>/project.json`.

Do not include any additional commentary or notes. Ensure all URLs are absolute when available. If you cannot determine a field, leave it empty but include the key.

Once you finish add a spanish translated version in the README.md file with the same content as the english version

----------------------------

## **Command Option B: Metadata Only Mode (Skips README)**

You are a technical writer and engineer. I already have a completed README.md file for this repository. Parse the project's source code, project setup, and the existing README.md data to extract metadata. Generate exactly two outputs: ProjectInfo.json and a JSON snippet ready to paste into the portfolio profile's projects_info/<project-slug>/project.json.

Rules and output format:

- Output only valid JSON code blocks. Do not output any chat commentary, introduction, or notes outside the requested files.

- All JSON contents must be generated in English.

- Extract the challenge (2–3 sentences), architecture patterns (1–2 sentences), and techStack from the existing code or README data.

- Extract or isolate a relevant codeSnippet (max ~15 lines) from the codebase highlighting an architectural or implementation detail (C# for Unity, TS/JS for Web). Escape or preserve newlines cleanly.

- Ensure id matches your standard project URL slug. If demoUrl or repoUrl are missing or cannot be inferred from the current files, leave them as "".

Required `ProjectInfo.json` schema layout:

```json
{
  "tags": ["Unity", "Web", "XR"],
  "title": "Human Friendly Title",
  "subtitle": "One-line description",
  "techBadge": "ShortBadgeText",
  "repoUrl": "[https://github.com/username/repo](https://github.com/username/repo)",
  "demoUrl": "[https://your-deployment.example](https://your-deployment.example)",
  "challenge": "Brief description of the technical challenge and outcome.",
  "architecture": "Short architecture summary with patterns used.",
  "techStack": ["Technology A", "Technology B"],
  "codeSnippetTitle": "Short Snippet Title",
  "codeSnippet": "// up to ~15 lines of representative code\\nfunction example() { return true; }"
}
```

Required `project.json` snippet layout (compact and flat structure):

```json
{
  "tags": ["Unity", "Web", "XR"],
  "title": "Human Friendly Title",
  "subtitle": "One-line description",
  "techBadge": "ShortBadgeText",
  "repoUrl": "[https://github.com/username/repo](https://github.com/username/repo)",
  "demoUrl": "[https://your-deployment.example](https://your-deployment.example)",
  "challenge": "Brief technical challenge",
  "architecture": "Short architecture summary",
  "techStack": ["Tech1", "Tech2"],
  "codeSnippetTitle": "Short Snippet Title",
  "codeSnippet": "// representative snippet as a single string with newlines escaped or preserved"
}
```

At the end of your response include two separate outputs only, in this exact order and format:

A full `ProjectInfo.json` content block,

A JSON snippet ready to paste into `projects_info/<project-slug>/project.json`.

Do not include any additional commentary or notes.

## **How To Do Github Pages Deploy**

1. Navigate to your build folder: **_Open terminal_**.Change directories to your exact build output folder:
   `bash
    cd /d E:\Dev\Builds\"NameOfFolder"
    `
   (Note: The /d switch ensures Windows changes both the drive letter and the directory at the same time).

2. Initialize a fresh Git repo: **_Set default branch_**
   Initialize Git right inside this folder and instantly name the gh-pages:
   `bash
    git init -b gh-pages
    `

3. Stage and commit your build files:**_Prepare the payload_**. Add your index.html, WebGL framework files, or engine artifacts:
   ```bash
   git add .
   git commit -m "Deploying latest game build to GitHub Pages"
   ```
4. Link your existing repo and force push:
   **_Publishing live_**
   Link this build folder directly to your existing "RepoName" repository on GitHub and force-push it up:
   `bash
    git remote add origin https://github.com/AbrahamSanchezDev/"RepoName".git
    git push -u origin gh-pages --force
    `
