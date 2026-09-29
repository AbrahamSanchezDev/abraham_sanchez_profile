#!/usr/bin/env python3
"""Build this Next.js app as a static export and force-push it to a GitHub Pages branch.

Usage: python deploy-gh-pages.py   (answers are remembered in nextjs-deployer-config.json)
"""
import json
import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent
CONFIG = ROOT / "nextjs-deployer-config.json"
OUT = ROOT / "out"
PROXY = ROOT / "proxy.ts"  # proxy can't run on a static host; index.html below redirects instead

# "/" picks /es or /en like proxy.ts did, but in the browser.
INDEX_HTML = """<!doctype html><meta charset="utf-8"><title>Redirecting…</title>
<script>location.replace("{base}/" + ((navigator.language || "").toLowerCase().startsWith("es") ? "es" : "en") + location.hash)</script>
<meta http-equiv="refresh" content="0; url={base}/en">
"""


def ask(prompt, default=""):
    answer = input(f"{prompt} [{default}]: ").strip()
    return answer or default


def run(cmd, cwd=ROOT, env=None):
    print(f"\n→ {' '.join(cmd)}")
    subprocess.run(cmd, cwd=cwd, env=env, check=True)


def repo_name(url):
    return url.rstrip("/").split("/")[-1].removesuffix(".git")


def main():
    cfg = json.loads(CONFIG.read_text()) if CONFIG.exists() else {}
    origin = subprocess.run(["git", "remote", "get-url", "origin"], cwd=ROOT, capture_output=True, text=True).stdout.strip()

    print("=" * 60 + "\nNext.js → GitHub Pages Deployer\n" + "=" * 60)
    cfg["repo_url"] = ask("GitHub repository URL", cfg.get("repo_url", origin))
    if "github.com" not in cfg["repo_url"]:
        sys.exit("✗ URL must be a GitHub repository")
    name = repo_name(cfg["repo_url"])
    # <user>.github.io repos and custom domains are served from "/", project repos from "/<repo>".
    default_base = cfg.get("base_path", "" if name.endswith(".github.io") else f"/{name}")
    cfg["base_path"] = ask("Base path ('/' for user site or custom domain)", default_base or "/").rstrip("/")
    cfg["target_branch"] = ask("Target branch", cfg.get("target_branch", "gh-pages"))
    cfg["commit_message"] = ask("Commit message", cfg.get("commit_message", "Deploy Next.js build to GitHub Pages"))
    cfg["custom_domain"] = ask("Custom domain for CNAME (blank for none)", cfg.get("custom_domain", ""))

    if input("\nSave this configuration? (y/n) [y]: ").strip().lower() != "n":
        CONFIG.write_text(json.dumps(cfg, indent=2))
    if input(f"Build and force-push to {cfg['target_branch']}? (y/n) [y]: ").strip().lower() == "n":
        sys.exit("✗ Deployment cancelled")

    # --- Build ---
    env = {**os.environ, "NEXT_EXPORT": "1", "NEXT_PUBLIC_BASE_PATH": cfg["base_path"]}
    npm = shutil.which("npm") or "npm"  # npm.cmd on Windows
    hidden = PROXY.with_suffix(".ts.deploying")
    if PROXY.exists():
        PROXY.rename(hidden)
    try:
        run([npm, "run", "build"], env=env)
    finally:
        if hidden.exists():
            hidden.rename(PROXY)

    (OUT / "index.html").write_text(INDEX_HTML.format(base=cfg["base_path"]), encoding="utf-8")
    (OUT / ".nojekyll").touch()  # otherwise Pages hides the _next/ folder
    if cfg["custom_domain"]:
        (OUT / "CNAME").write_text(cfg["custom_domain"])

    # --- Push: fresh one-commit repo each time, so gh-pages never accumulates history ---
    with tempfile.TemporaryDirectory() as tmp:
        site = Path(tmp) / "site"
        shutil.copytree(OUT, site)
        run(["git", "init", "-q"], cwd=site)
        run(["git", "add", "-A"], cwd=site)
        run(["git", "commit", "-q", "-m", cfg["commit_message"]], cwd=site)
        run(["git", "push", "--force", cfg["repo_url"], f"HEAD:{cfg['target_branch']}"], cwd=site)
        # git marks objects read-only on Windows; let TemporaryDirectory delete them
        for p in site.rglob("*"):
            os.chmod(p, 0o700)

    user = cfg["repo_url"].split("github.com")[1].strip(":/").split("/")[0]
    host = cfg["custom_domain"] or f"{user.lower()}.github.io"
    print("\n" + "=" * 60 + f"\n✓ Deployed. Live at: https://{host}{cfg['base_path']}/")
    print(f"  (first time: repo Settings → Pages → Source = branch '{cfg['target_branch']}', folder '/')\n" + "=" * 60)


if __name__ == "__main__":
    try:
        main()
    except subprocess.CalledProcessError as e:
        sys.exit(f"✗ Command failed ({e.returncode}): {' '.join(e.cmd)}")
    except KeyboardInterrupt:
        sys.exit("\n✗ Cancelled")
