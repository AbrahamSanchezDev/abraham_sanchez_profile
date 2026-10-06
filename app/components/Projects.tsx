"use client";

import { useEffect, useRef, useState } from "react";
import { Code2, ExternalLink, ImageOff, Play, X } from "lucide-react";
import type { Project, UI } from "../lib/data";
import { TechChip } from "./ui";

function Modal({ open, onClose, label, className, children }: {
  open: boolean; onClose: () => void; label: string; className: string; children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current!;
    if (open && !d.open) d.showModal();
    else if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog ref={ref} aria-label={label} onClose={onClose} onClick={(e) => e.target === ref.current && onClose()}
      className={`m-auto max-h-[92dvh] w-[calc(100%-2rem)] overflow-hidden rounded-theme border border-line bg-surface p-0 text-text ${className}`}>
      {open && children}
    </dialog>
  );
}

function CloseBtn({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button onClick={onClick} aria-label={label} className="rounded-theme bg-bg/70 p-2 text-muted backdrop-blur hover:text-heading">
      <X size={18} />
    </button>
  );
}

function DemoDialog({ project, onClose, ui }: { project: Project | null; onClose: () => void; ui: UI }) {
  const [loading, setLoading] = useState(true);
  return (
    <Modal open={!!project} onClose={onClose} label={ui.liveDemo} className="h-[92dvh] max-w-6xl">
      {project && (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2">
            <p className="truncate font-mono text-xs uppercase tracking-widest text-muted">
              <span className="text-accent"><span aria-hidden>▶</span> {ui.liveDemo}</span> {"//"} {project.title}
            </p>
            <div className="flex items-center gap-2">
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-muted hover:text-accent">
                {ui.newTab} <ExternalLink size={14} />
              </a>
              <CloseBtn onClick={onClose} label={ui.close} />
            </div>
          </div>
          <div className="relative flex-1 bg-black">
            {loading && (
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-4 border-line border-t-accent" />
                  <p className="font-mono text-xs uppercase tracking-widest text-muted">{ui.loadingBuild}</p>
                </div>
              </div>
            )}
            <iframe src={project.demoUrl} title={`${project.title} demo`} onLoad={() => setLoading(false)}
              allow="autoplay; fullscreen; gamepad; xr-spatial-tracking; clipboard-write" className="relative h-full w-full border-0" />
          </div>
        </div>
      )}
    </Modal>
  );
}

function DemoButton({ project, onPlay, ui }: { project: Project; onPlay: (p: Project) => void; ui: UI }) {
  if (!project.demoUrl) return null;
  const cls = "inline-flex items-center gap-2 rounded-theme bg-accent px-4 py-2 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5";
  // Some links (e.g. npm pages) refuse to be embedded — open those in a new tab instead.
  return project.demoEmbeddable === false ? (
    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={cls}><ExternalLink size={16} /> {ui.open}</a>
  ) : (
    <button onClick={() => onPlay(project)} className={cls}><Play size={16} /> {ui.tryDemo}</button>
  );
}

function DetailDialog({ project, onClose, onPlay, ui }: { project: Project | null; onClose: () => void; onPlay: (p: Project) => void; ui: UI }) {
  const [shown, setShown] = useState(0);
  const p = project;
  return (
    <Modal open={!!p} onClose={onClose} label={p?.title ?? "Project"} className="max-w-4xl">
      {p && (
        <div className="max-h-[92dvh] overflow-y-auto">
          <div className="relative bg-black">
            <div className="absolute right-3 top-3 z-10"><CloseBtn onClick={onClose} label={ui.close} /></div>
            {p.media.length ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.media[shown]} alt={`${p.title} — ${ui.preview} ${shown + 1}`} className="mx-auto max-h-[55dvh] w-full object-contain" />
            ) : (
              <div className="grid h-40 place-items-center text-muted"><ImageOff /></div>
            )}
          </div>
          {p.media.length > 1 && (
            <div className="flex gap-2 border-b border-line px-3">
              {p.media.map((m, i) => (
                // padded button = comfortable tap target around the thin bar
                <button key={m} onClick={() => setShown(i)} aria-label={`${ui.preview} ${i + 1}`} aria-current={i === shown} className="group/dot flex-1 py-3">
                  <span className={`block h-2 rounded-full transition-colors ${i === shown ? "bg-accent" : "bg-line group-hover/dot:bg-muted"}`} />
                </button>
              ))}
            </div>
          )}
          <div className="p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-widest text-accent">{p.techBadge}</p>
            <h3 className="mt-1 font-display text-xl font-bold uppercase tracking-wide text-heading">{p.title}</h3>
            <p className="mt-2 text-muted">{p.subtitle}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <DemoButton project={p} onPlay={onPlay} ui={ui} />
              {p.repoUrl && (
                <a href={p.repoUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-theme border border-line px-4 py-2 text-sm font-semibold text-heading hover:border-accent hover:text-accent">
                  <Code2 size={16} /> {ui.sourceCode}
                </a>
              )}
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="panel panel-bar p-5">
                <h4 className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">{ui.challenge}</h4>
                <p className="text-sm">{p.challenge}</p>
              </div>
              <div className="panel panel-bar p-5 [&::before]:bg-accent-2">
                <h4 className="mb-2 font-mono text-xs uppercase tracking-widest text-accent-2">{ui.architecture}</h4>
                <p className="text-sm">{p.architecture}</p>
              </div>
            </div>
            <h4 className="mb-3 mt-8 font-mono text-xs uppercase tracking-widest text-muted">{ui.techStack}</h4>
            <div className="flex flex-wrap gap-2">{p.tech.map((t) => <TechChip key={t.name} tech={t} />)}</div>
            {p.codeSnippet && (
              <>
                <h4 className="mb-3 mt-8 font-mono text-xs uppercase tracking-widest text-muted">{p.codeSnippetTitle}</h4>
                <pre className="overflow-x-auto rounded-theme border border-line bg-bg p-4 font-mono text-xs leading-relaxed text-text"><code>{p.codeSnippet}</code></pre>
              </>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}

export default function Projects({ projects, ui }: { projects: Project[]; ui: UI }) {
  const tags = ["All", ...Array.from(new Set(projects.flatMap((p) => p.tags)))];
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<Project | null>(null);
  const [demo, setDemo] = useState<Project | null>(null);
  const shown = filter === "All" ? projects : projects.filter((p) => p.tags.includes(filter));

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2" role="toolbar" aria-label={ui.filterProjects}>
        {tags.map((t) => {
          const count = t === "All" ? projects.length : projects.filter((p) => p.tags.includes(t)).length;
          return (
            <button key={t} onClick={() => setFilter(t)} aria-pressed={filter === t}
              className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                filter === t ? "border-accent bg-accent/10 text-accent" : "border-line text-muted hover:border-muted hover:text-heading"
              }`}>
              {t === "All" ? ui.all : t} <span className="opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {shown.map((p) => (
          <article
            key={p.slug}
            className="panel glow-hover group relative flex min-h-[28rem] flex-col justify-end transition-all duration-300 hover:-translate-y-1 hover:border-accent/70"
          >
            <button onClick={() => setOpen(p)} className="absolute inset-0 block overflow-hidden bg-bg" aria-label={p.title}>
              {p.cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.cover} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              ) : (
                <span className="hud-bg grid h-full place-items-center font-display text-5xl font-black text-accent/40">{p.title.slice(0, 2)}</span>
              )}
            </button>
            <div className="pointer-events-none relative px-5 pb-5 pt-20" style={{ background: "linear-gradient(to top, var(--bg) 62%, transparent)" }}>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-accent">{p.techBadge}</span>
                {p.demoUrl && p.demoEmbeddable !== false && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 font-mono text-[11px] font-bold uppercase text-bg">
                    <Play size={10} /> {ui.playable}
                  </span>
                )}
              </div>
              <h3 className="mt-1 font-display text-base font-bold uppercase tracking-wide text-heading">{p.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-text">{p.subtitle}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.tech.slice(0, 3).map((t) => <TechChip key={t.name} tech={t} compact />)}
                {p.tech.length > 3 && <span className="px-1 py-1 text-[11px] text-muted">+{p.tech.length - 3}</span>}
              </div>
              <div className="pointer-events-auto mt-4 flex items-center gap-4 border-t border-line pt-3 text-sm">
                <button onClick={() => setOpen(p)} className="font-semibold text-accent hover:underline">{ui.details}</button>
                {p.demoUrl && p.demoEmbeddable !== false && (
                  <button onClick={() => setDemo(p)} className="inline-flex items-center gap-1 text-muted hover:text-accent"><Play size={14} /> {ui.demo}</button>
                )}
                {p.repoUrl && (
                  <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className="ml-auto inline-flex items-center gap-1 text-muted hover:text-accent">
                    <Code2 size={14} /> {ui.code}
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <DetailDialog ui={ui} key={open?.slug} project={open} onClose={() => setOpen(null)} onPlay={(p) => { setOpen(null); setDemo(p); }} />
      <DemoDialog ui={ui} key={demo?.slug} project={demo} onClose={() => setDemo(null)} />
    </>
  );
}
