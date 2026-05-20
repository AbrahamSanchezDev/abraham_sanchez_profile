"use client";

import type { ComponentType } from "react";
import { Cloud, Cpu, Gamepad2, Terminal, Wrench } from "lucide-react";
import { skillCategories } from "@/app/data/skills";

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Gamepad2,
  Cpu,
  Cloud,
  Wrench,
  Terminal,
};

export default function SkillsSection() {
  return (
    <section className="w-full bg-slate-950 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-4 text-center">
          <div className="mx-auto flex items-center justify-center gap-3 rounded-full border border-slate-800 bg-slate-900/80 px-4 py-2 text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.08)]">
            <Cpu className="h-5 w-5 text-emerald-300" />
            <span className="text-sm uppercase tracking-[0.3em] text-cyan-400 font-semibold">
              Tech Matrix
            </span>
          </div>
          <div>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Skill Tree
            </h2>
            <p className="mt-3 text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
              Categorías de expertise técnico con un estilo de nodo activo y experiencia relevantemente enfocada.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {skillCategories.map((category) => {
            const Icon = iconMap[category.iconName] ?? Cpu;

            return (
              <article
                key={category.id}
                className="rounded-[1.75rem] border border-slate-800 bg-slate-900 p-6 shadow-[0_0_0_rgba(0,0,0,0)] transition duration-300 hover:border-cyan-400/60 hover:bg-slate-900/95 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
              >
                <div className="mb-5 flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-400/20">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white">{category.categoryTitle}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.25em] text-slate-500">
                      {category.skills.length} skills
                    </p>
                  </div>
                </div>

                <div className="grid gap-3">
                  {category.skills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-slate-200 transition-colors duration-200 hover:border-cyan-400/60"
                    >
                      <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.35)]" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
