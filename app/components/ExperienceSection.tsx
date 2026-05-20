"use client";

import { ShieldAlert, Terminal, Layers, Milestone } from "lucide-react";
import { workExperiences } from "@/app/data/experience";

const timelineIcons = [Terminal, ShieldAlert, Layers, Milestone];

export default function ExperienceSection() {
  return (
    <section id="experience" className="w-full bg-slate-950 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-cyan-400 uppercase tracking-[0.35em] text-sm font-semibold">
            Experience Log
          </p>
          <h2 className="mt-4 text-4xl sm:text-5xl font-black text-white tracking-tight">
            Mission Timeline
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            Misiones técnicas diseñadas con arquitectura, optimización e IA para entregas de alto impacto.
          </p>
        </div>

        <div className="relative border-l border-slate-800 pl-10 sm:pl-14">
          {workExperiences.map((mission, index) => {
            const Icon = timelineIcons[index % timelineIcons.length];

            return (
              <div key={mission.id} className="group relative mb-10 last:mb-0">
                <div className="absolute -left-6 top-2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-cyan-400 bg-slate-950 shadow-[0_0_20px_rgba(14,116,144,0.3)]">
                  <Icon className="h-5 w-5 text-cyan-300" />
                </div>

                <article className="rounded-[2rem] border border-slate-800 bg-slate-900 p-6 pl-10 shadow-[inset_0_0_0px_rgba(0,0,0,0)] transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] sm:pl-8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                    <div className="min-w-0">
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {mission.role}
                      </h3>
                      <p className="mt-2 text-slate-400 text-sm sm:text-base">
                        {mission.company}
                      </p>
                      <p className="mt-3 inline-flex items-center rounded-full border border-slate-700 bg-slate-800/70 px-3 py-1 text-slate-300 text-xs sm:text-sm opacity-90">
                        {mission.stackSummary}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
                      <span className="inline-flex items-center rounded-full border border-cyan-700 bg-cyan-500/10 px-3 py-1 text-cyan-300 font-semibold">
                        {mission.type}
                      </span>
                      <span className="inline-flex items-center rounded-full border border-emerald-700 bg-emerald-500/10 px-3 py-1 text-emerald-300 font-semibold">
                        {mission.period}
                      </span>
                    </div>
                  </div>

                  <p className="mt-5 text-cyan-300 italic text-sm sm:text-base">
                    {mission.coreAchievement}
                  </p>

                  <ul className="mt-5 space-y-3">
                    {mission.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3 text-slate-300 text-sm sm:text-base">
                        <span className="mt-1 text-emerald-400">›</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
