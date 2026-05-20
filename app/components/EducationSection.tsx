"use client";

import { Award, BookOpen, GraduationCap } from "lucide-react";
import { educationHistory } from "@/app/data/education";

export default function EducationSection() {
  return (
    <section className="w-full bg-slate-950 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-3 text-center">
          <div className="mx-auto flex items-center justify-center gap-3 rounded-full border border-slate-800 bg-slate-900/70 px-4 py-2 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.08)]">
            <GraduationCap className="h-5 w-5 text-cyan-300" />
            <span className="text-xs uppercase tracking-[0.35em] text-cyan-400 font-semibold">
              Education Logs
            </span>
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Education
            </h2>
            <p className="mt-2 text-slate-400 max-w-2xl mx-auto text-sm">
              Academic credentials supporting your professional development and
              expertise.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {educationHistory.map((degree) => (
            <article
              key={degree.id}
              className="rounded-[1.5rem] border border-slate-800 bg-slate-900/95 p-5 transition duration-300 hover:border-cyan-400/50 hover:bg-slate-900"
            >
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-400/20">
                  <BookOpen className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <h3 className="flex items-center gap-2 text-lg font-bold text-white tracking-tight">
                    {degree.degree}
                    <Award className="h-4 w-4 text-cyan-400" />
                  </h3>
                  <p className="mt-1 text-slate-400 text-sm">
                    {degree.institution}
                  </p>
                  <p className="text-slate-500 text-xs mt-1">{degree.period}</p>
                </div>
              </div>
              <p className="mt-4 text-slate-300 text-sm leading-relaxed tracking-tight">
                {degree.details}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
