"use client";

import { ShieldAlert, Terminal, Layers, Milestone } from "lucide-react";
import { workExperiences } from "@/app/data/experience";

const timelineIcons = [Terminal, ShieldAlert, Layers, Milestone];

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="w-full bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950 py-20 relative overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-emerald-500/5 opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 px-4 py-2 mb-6 shadow-[0_0_30px_rgba(34,211,238,0.12)] backdrop-blur-sm">
            <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-sm uppercase tracking-[0.3em] text-cyan-300 font-semibold">
              Experience Log
            </span>
          </div>
          <h2 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent tracking-tight">
            Experience Timeline
          </h2>
          <p className="mt-4 text-slate-400 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            Technical missions designed with architecture, optimization, and AI
            for high-impact and measurable deliverables.
          </p>
        </div>

        <div className="relative pl-6 sm:pl-10">
          {/* Timeline line */}
          <div className="absolute left-2.5 sm:left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/50 via-emerald-500/50 to-cyan-500/50" />

          {workExperiences.map((mission, index) => {
            const Icon = timelineIcons[index % timelineIcons.length];

            return (
              <div
                key={mission.id}
                className="group relative mb-12 last:mb-0"
                style={{
                  animation: `fadeInLeft 0.6s ease-out ${index * 0.15}s both`,
                }}
              >
                {/* Timeline node */}
                <div className="absolute -left-4.5 sm:-left-7 top-6 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border-2 border-cyan-400 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 shadow-[0_0_25px_rgba(34,211,238,0.4)] group-hover:shadow-[0_0_35px_rgba(34,211,238,0.6)] transition-all duration-300 z-10">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-300 group-hover:text-cyan-200 transition-colors" />
                </div>

                {/* Experience card */}
                <article className="rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-950 p-7 sm:p-8 shadow-xl transition-all duration-500 hover:border-cyan-400/70 hover:from-slate-900 hover:to-slate-900/50 hover:shadow-[0_0_40px_rgba(34,211,238,0.2)] relative overflow-hidden group-hover:translate-x-1">
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-emerald-500/0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl" />

                  <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-cyan-200 transition-colors tracking-tight">
                        {mission.role}
                      </h3>
                      <p className="mt-2 text-slate-300 text-base sm:text-lg font-medium">
                        {mission.company}
                      </p>
                      <div className="mt-3 inline-flex items-center rounded-xl border border-slate-600/50 bg-slate-800/50 px-4 py-2 text-slate-200 text-sm sm:text-base font-medium shadow-sm group-hover:border-slate-500 transition-colors">
                        {mission.stackSummary}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
                      <span className="inline-flex items-center rounded-full border border-cyan-500/50 bg-gradient-to-r from-cyan-500/15 to-cyan-400/10 px-3 py-1 text-cyan-300 font-semibold shadow-sm group-hover:border-cyan-400/70 transition-colors">
                        {mission.type}
                      </span>
                      <span className="inline-flex items-center rounded-full border border-emerald-500/50 bg-gradient-to-r from-emerald-500/15 to-emerald-400/10 px-3 py-1 text-emerald-300 font-semibold shadow-sm group-hover:border-emerald-400/70 transition-colors">
                        {mission.period}
                      </span>
                    </div>
                  </div>

                  <p className="relative mt-6 text-cyan-300/90 italic text-base sm:text-lg leading-relaxed font-medium border-l-2 border-cyan-400/50 pl-4">
                    {mission.coreAchievement}
                  </p>

                  <ul className="relative mt-6 space-y-3">
                    {mission.highlights.map((highlight, hIndex) => (
                      <li
                        key={highlight}
                        className="flex gap-3 text-slate-200 text-sm sm:text-base group/item"
                        style={{
                          animation: `fadeIn 0.5s ease-out ${0.3 + hIndex * 0.08}s both`,
                        }}
                      >
                        <span className="mt-0.5 text-emerald-400 font-bold group-hover/item:text-emerald-300 transition-colors flex-shrink-0">
                          ✓
                        </span>
                        <span className="group-hover/item:text-white transition-colors">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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
