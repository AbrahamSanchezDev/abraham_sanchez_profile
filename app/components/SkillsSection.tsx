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
    <section className="w-full bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950 py-20 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-emerald-500/5 opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16 flex flex-col gap-6 text-center">
          <div className="mx-auto flex items-center justify-center gap-3 rounded-full border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 px-4 py-2 shadow-[0_0_30px_rgba(34,211,238,0.12)] backdrop-blur-sm">
            <Cpu className="h-5 w-5 text-cyan-400 animate-pulse" />
            <span className="text-sm uppercase tracking-[0.3em] text-cyan-300 font-semibold">
              Tech Matrix
            </span>
          </div>
          <div>
            <h2 className="text-5xl sm:text-6xl font-black text-white tracking-tight bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              Skill Tree
            </h2>
            <p className="mt-4 text-slate-400 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
              Technical expertise categorized across different domains. Each
              category represents a set of relevant skills and practical
              hands-on experience.
            </p>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => {
            const Icon = iconMap[category.iconName] ?? Cpu;

            return (
              <article
                key={category.id}
                className="group relative rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-950 p-7 shadow-xl transition-all duration-500 hover:border-cyan-400/70 hover:from-slate-900 hover:to-slate-900/50 hover:shadow-[0_0_40px_rgba(34,211,238,0.2)] overflow-hidden"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-emerald-500/0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl" />

                <div className="relative mb-6 flex items-center gap-4">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/10 text-cyan-300 ring-1 ring-cyan-400/30 shadow-lg group-hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-200 transition-colors">
                      {category.categoryTitle}
                    </h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.25em] text-slate-500 group-hover:text-slate-400 transition-colors">
                      {category.skills.length} skills
                    </p>
                  </div>
                </div>

                <div className="relative space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skill}
                      className="flex items-center gap-3 rounded-xl border border-slate-700/30 bg-slate-900/40 px-4 py-3 text-sm text-slate-200 transition-all duration-300 hover:border-cyan-400/60 hover:bg-slate-800/60 hover:translate-x-1 group-hover:border-slate-600/50"
                      style={{
                        animation: `fadeIn 0.5s ease-out ${0.3 + skillIndex * 0.05}s both`,
                      }}
                    >
                      <span className="inline-flex h-2 w-2 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                      <span className="font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
