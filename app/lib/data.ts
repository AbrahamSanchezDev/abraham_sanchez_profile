import fs from "node:fs";
import path from "node:path";
import * as si from "simple-icons";
import en from "@/content/profile.en.json";
import es from "@/content/profile.es.json";

export type Profile = typeof en;
export type Lang = "en" | "es";
export type UI = Profile["ui"];
export const LANGS: Lang[] = ["en", "es"];
// Typed as Profile so a missing/renamed key in the Spanish file fails the build.
const PROFILES: Record<Lang, Profile> = { en, es };
export const isLang = (l: string): l is Lang => l in PROFILES;
export const getProfile = (lang: Lang) => PROFILES[lang];

/** Resolved tech label: brand SVG path when simple-icons has it, otherwise null (UI shows a monogram). */
export interface Tech {
  name: string;
  icon: string | null;
}

export interface Project {
  slug: string;
  order: number;
  tags: string[];
  title: string;
  subtitle: string;
  techBadge: string;
  repoUrl: string;
  demoUrl?: string;
  demoEmbeddable?: boolean;
  challenge: string;
  architecture: string;
  tech: Tech[];
  codeSnippetTitle: string;
  codeSnippet: string;
  cover: string | null;
  media: string[];
}

// Display name (lowercased) -> simple-icons slug. First regex match wins.
const ICON_ALIASES: [RegExp, string][] = [
  [/^unity/, "unity"],
  [/next\.?js/, "nextdotjs"],
  [/node\.?js/, "nodedotjs"],
  [/three\.?js/, "threedotjs"],
  [/^react/, "react"],
  [/^html/, "html5"],
  [/^css/, "css"],
  [/typescript/, "typescript"],
  [/javascript/, "javascript"],
  [/angular/, "angular"],
  [/ionic/, "ionic"],
  [/^php/, "php"],
  [/mysql|mariadb/, "mysql"],
  [/mongo/, "mongodb"],
  [/supabase/, "supabase"],
  [/firebase/, "firebase"],
  [/vercel/, "vercel"],
  [/github pages/, "githubpages"],
  [/github copilot/, "githubcopilot"],
  [/github/, "github"],
  [/^git$/, "git"],
  [/bitbucket/, "bitbucket"],
  [/jira/, "jira"],
  [/trello/, "trello"],
  [/jenkins/, "jenkins"],
  [/postman/, "postman"],
  [/blender/, "blender"],
  [/maya/, "autodeskmaya"],
  [/steam/, "steam"],
  [/android/, "android"],
  [/^ios/, "apple"],
  [/quest|^meta/, "meta"],
  [/webgl/, "webgl"],
  [/whatsapp/, "whatsapp"],
  [/cursor/, "cursor"],
  [/ollama/, "ollama"],
  [/claude/, "claude"],
  [/gemini/, "googlegemini"],
  [/deepseek/, "deepseek"],
  [/bootstrap/, "bootstrap"],
  [/xampp/, "xampp"],
  [/jasmine/, "jasmine"],
  [/arcgis/, "arcgis"],
  [/tailwind/, "tailwindcss"],
  [/facebook/, "facebook"],
  [/nunit|\.net/, "dotnet"],
];

const icons = si as unknown as Record<string, { path: string } | undefined>;

export function tech(name: string): Tech {
  const key = name.toLowerCase();
  const slug = ICON_ALIASES.find(([re]) => re.test(key))?.[1];
  const hit = slug ? icons["si" + slug[0].toUpperCase() + slug.slice(1)] : undefined;
  return { name, icon: hit?.path ?? null };
}

const PROJECTS_DIR = path.join(process.cwd(), "projects_info");
const PUBLIC_DIR = path.join(process.cwd(), "public");

const readJson = (file: string) => (fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : {});

/**
 * Every folder in projects_info/ with a project.json becomes a card. Media comes from public/projects/<slug>/ (see `npm run media`).
 * An optional project.<lang>.json overrides text fields for that language.
 */
export function loadProjects(lang: Lang): Project[] {
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((slug) => fs.existsSync(path.join(PROJECTS_DIR, slug, "project.json")))
    .map((slug) => {
      const { techStack = [], ...raw } = {
        ...readJson(path.join(PROJECTS_DIR, slug, "project.json")),
        ...(lang === "en" ? {} : readJson(path.join(PROJECTS_DIR, slug, `project.${lang}.json`))),
      };
      const mediaDir = path.join(PUBLIC_DIR, "projects", slug);
      const files = fs.existsSync(mediaDir) ? fs.readdirSync(mediaDir).sort() : [];
      const main = files.filter((f) => !f.includes("-poster"));
      const media = main.map((f) => `/projects/${slug}/${f}`);
      // Cover = first media item; if it's animated use its still poster so the grid never downloads big files.
      const posterOfFirst = main[0]?.replace(".webp", "-poster.webp");
      const cover = !main[0] ? null : `/projects/${slug}/${files.includes(posterOfFirst) ? posterOfFirst : main[0]}`;
      return { order: 99, tags: [], ...raw, slug, tech: (techStack as string[]).map(tech), cover, media } as Project;
    })
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

/** Only list CV files that actually exist in public/, so a missing PDF never becomes a broken link. */
export function availableCvs(profile: Profile) {
  return profile.person.cv.filter((c) => fs.existsSync(path.join(PUBLIC_DIR, c.file)));
}
