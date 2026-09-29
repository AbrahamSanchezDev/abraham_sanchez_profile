You are a technical writer and engineer. Generate two files for the current repository: ProjectInfo.json and README.md, and provide a JSON snippet ready to paste into the profile games.json.

Rules and output format:

Output only valid Markdown and JSON blocks. Do not output commentary outside the requested files.
Use English for the generated ProjectInfo.json and README.md content.
Keep ProjectInfo.json fields exact and machine-readable; produce the JSON object shown in the template.
For web projects (React, Vite, Next, etc.), extract information from package.json, public folder and primary source files. For Unity projects, inspect ProjectSettings, Build folders, and describe how the WebGL build is published.
Always include a demoUrl field. If no public demo exists, set demoUrl: "" and add a short note under README.md about how to deploy to get a demo URL.
Include a previewImageUrl in the README.md section if a preview asset exists, and show the demo URL clearly.
Provide a short technical challenge (2–3 sentences) and a concise architecture description (1–2 sentences with patterns like "Object pooling", "Event-driven", "Observer pattern", etc.).
Include a codeSnippet (no more than ~15 lines) that highlights a key implementation detail. For Unity, prefer a short C# snippet; for web projects prefer TypeScript/JS.
Provide a clear techStack array listing the most important technologies.
Use icons and section headings in README.md to improve readability, similar to a polished project portfolio document.
Required ProjectInfo.json template (exact format to produce):

{
  "id": "your-project-slug",
  "title": "Human Friendly Title",
  "subtitle": "One-line description",
  "techBadge": "ShortBadgeText",
  "gifUrl": "/games/your-game.gif",
  "repoUrl": "https://github.com/username/repo",
  "demoUrl": "https://your-deployment.example",
  "challenge": "Brief description of the technical challenge and outcome.",
  "architecture": "Short architecture summary with patterns used.",
  "techStack": ["Technology A", "Technology B"],
  "codeSnippetTitle": "Short Snippet Title",
  "codeSnippet": "// up to ~15 lines of representative code\\nfunction example() { return true; }"
}
Required README.md structure (generate full Markdown with icons and preview image):

Project title and one-liner
Project summary section with development objective, challenge context, and delivery timeframe if available
Project overview section describing gameplay or user experience
Key features section with checklist-style bullets
Preview section with a public image URL or local preview asset reference and the demo URL
Project structure section summarizing top-level folders and key systems
Architecture highlights section with patterns and system responsibilities
Technology stack section: bullet list with 1-line justification per tech
Code quality and engineering practices section explaining architecture, maintainability, and professional standards
How to build & run locally section with copyable commands
Development insights / timeline section if available
Learning outcomes section summarizing what the author demonstrated or practiced
Contact or author section if available
JSON snippet (produce a single JSON object, compact and valid) that will be used in app/data/games.json: { "id": "your-project-slug", "title": "Human Friendly Title", "subtitle": "One-line description", "techBadge": "ShortBadgeText", "gifUrl": "/games/your-game.gif", "repoUrl": "https://github.com/username/repo", "demoUrl": "https://your-deployment.example", "challenge": "Brief technical challenge", "architecture": "Short architecture summary", "techStack": ["Tech1", "Tech2"], "codeSnippetTitle": "Short Snippet Title", "codeSnippet": "// representative snippet as a single string with newlines escaped or preserved" }

At the end of your response include three separate outputs only, in this exact order and format:

A full generated ProjectInfo.json content block (the JSON object as shown above),
A full generated README.md in Markdown,
A JSON snippet ready to paste into app/data/games.json.
Do not include any additional commentary or notes. Ensure all URLs are absolute when available. If you cannot determine a field, leave it empty but include the key.