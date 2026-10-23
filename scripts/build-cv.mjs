// Prints every cv-src/*.html to public/cv/<same name>.pdf with headless Chrome/Edge (no extra dependencies).
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const browsers = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
];
const chrome = browsers.find((b) => b && fs.existsSync(b));
if (!chrome) throw new Error("Chrome/Edge not found — set CHROME_PATH");

const src = path.resolve("cv-src");
for (const f of fs.readdirSync(src).filter((f) => f.endsWith(".html"))) {
  const out = path.resolve("public/cv", f.replace(/\.html$/, ".pdf"));
  execFileSync(chrome, ["--headless", "--disable-gpu", "--no-pdf-header-footer", `--print-to-pdf=${out}`, pathToFileURL(path.join(src, f)).href], { stdio: "ignore" });
  console.log("✓", path.relative(process.cwd(), out));
}
