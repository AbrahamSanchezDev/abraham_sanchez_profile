import { ArrowRight, Download, ExternalLink, GraduationCap, Languages, Mail, MapPin, Trophy } from "lucide-react";
import { notFound } from "next/navigation";
import { availableCvs, getProfile, isLang, loadProjects, tech } from "../lib/data";
import Shell from "../components/Shell";
import Projects from "../components/Projects";
import { SectionHeader, TechChip } from "../components/ui";

const btn = "inline-flex items-center gap-2 rounded-theme px-5 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5";
const btnPrimary = `${btn} bg-accent text-bg`;
const btnGhost = `${btn} border border-line text-heading hover:border-accent hover:text-accent`;

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const profile = getProfile(lang);
  const { person, site, sections, stats, achievements, spotlight, experience, skills, education, ui } = profile;
  const level = (id: string) => sections.findIndex((s) => s.id === id) + 1;
  const title = (id: string) => sections.find((s) => s.id === id)?.label ?? id;
  const projects = loadProjects(lang);
  const cvs = availableCvs(profile);
  const socials = [
    { label: "GitHub", href: person.links.github, tech: tech("GitHub") },
    { label: "LinkedIn", href: person.links.linkedin, tech: { name: "in", icon: null } },
    { label: "Steam", href: person.links.steam, tech: tech("Steam") },
  ];
  const [first, ...rest] = person.name.split(" ");

  return (
    <Shell
      sections={sections}
      name={person.name}
      initials={person.initials}
      headline={person.headline}
      subheadline={person.subheadline}
      tagline={person.tagline}
      email={person.email}
      socials={socials}
      cvs={cvs}
      showIntro={site.showIntro}
      defaultTheme={site.defaultTheme}
      lang={lang}
      ui={ui}
    >
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
        {/* ABOUT / HERO */}
        <section id="about" className="grid gap-10 pb-20 pt-14 lg:grid-cols-[1fr_300px] lg:pt-20">
          <div>
            <p className="rise inline-flex items-center gap-2 rounded-full border border-accent-2/40 bg-accent-2/10 px-3 py-1 font-mono text-xs uppercase tracking-wider text-accent-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-accent-2" /> {person.availability}
            </p>
            <h1 className="rise mt-6 font-display text-4xl font-black uppercase leading-none tracking-wide text-heading sm:text-6xl" style={{ animationDelay: "60ms" }}>
              {first} <span className="text-accent text-glow">{rest.join(" ")}</span>
            </h1>
            <p className="rise mt-4 font-mono text-sm uppercase tracking-[0.2em] text-muted" style={{ animationDelay: "120ms" }}>
              {person.headline} <span className="text-accent">{"//"}</span> {person.subheadline}
            </p>
            <p className="rise mt-6 max-w-2xl text-lg text-text" style={{ animationDelay: "180ms" }}>{person.summary}</p>
            <div className="rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "240ms" }}>
              <a href="#projects" className={btnPrimary}>{ui.viewProjects} <ArrowRight size={16} /></a>
              {cvs.map((c) => (
                <a key={c.file} href={c.file} download className={btnGhost}><Download size={16} /> {c.label}</a>
              ))}
              <a href="#contact" className={btnGhost}><Mail size={16} /> {ui.contact}</a>
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="panel panel-bar flex flex-col-reverse p-4">
                  <dt className="mt-1 text-xs text-muted">{s.label}</dt>
                  <dd className="font-display text-2xl font-bold text-heading">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <aside className="panel h-fit p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">{ui.playerCard}</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex gap-3"><MapPin size={16} className="mt-0.5 shrink-0 text-muted" />{person.location}<br />{person.timezone}</li>
              <li className="flex gap-3"><Languages size={16} className="mt-0.5 shrink-0 text-muted" />{person.languages.join(" · ")}</li>
            </ul>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.25em] text-accent">{ui.achievements}</p>
            <ul className="mt-3 space-y-3 text-sm">
              {achievements.map((a) => (
                <li key={a} className="flex gap-3"><Trophy size={16} className="mt-0.5 shrink-0 text-accent-2" />{a}</li>
              ))}
            </ul>
          </aside>
        </section>

        {/* SPOTLIGHT */}
        <section id="spotlight" className="border-t border-line py-20">
          <SectionHeader level={level("spotlight")} label={ui.level} title={spotlight.title} kicker={ui.spotlightKicker} />
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://cdn.akamai.steamstatic.com/steam/apps/${spotlight.steamAppId}/header.jpg`}
                alt={`${spotlight.title} key art`}
                className="w-full rounded-theme border border-line"
              />
              <iframe
                src={`https://store.steampowered.com/widget/${spotlight.steamAppId}/?l=${lang === "es" ? "spanish" : "english"}`}
                title={`${spotlight.title} on Steam`}
                loading="lazy"
                className="mt-4 h-[190px] w-full rounded-theme border-0"
              />
            </div>
            <div className="panel panel-bar p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-accent">{spotlight.role} · {spotlight.period}</p>
              <p className="mt-1 text-sm text-muted">{spotlight.status}</p>
              <p className="mt-4">{spotlight.description}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {spotlight.highlights.map((h) => (
                  <li key={h} className="flex gap-2"><span className="text-accent">▸</span>{h}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">{spotlight.tech.map((t) => <TechChip key={t} tech={tech(t)} compact />)}</div>
              <a href={person.links.steam} target="_blank" rel="noopener noreferrer" className={`${btnPrimary} mt-6`}>
                {ui.viewOnSteam} <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="border-t border-line py-20">
          <SectionHeader level={level("projects")} label={ui.level} title={title("projects")} kicker={ui.projectsKicker} />
          <Projects projects={projects} ui={ui} />
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="border-t border-line py-20">
          <SectionHeader level={level("experience")} label={ui.level} title={title("experience")} kicker={ui.experienceKicker} />
          <ol className="relative space-y-6 border-l border-line pl-6 sm:pl-8">
            {experience.map((job) => (
              <li key={job.company + job.period} className="relative">
                <span className="absolute -left-[31px] top-6 h-3 w-3 rotate-45 border border-accent bg-bg sm:-left-[39px]" />
                <article className="panel p-6 transition-colors hover:border-accent/60">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display text-base font-bold uppercase tracking-wide text-heading">{job.company}</h3>
                      <p className="text-accent">{job.role}</p>
                    </div>
                    <span className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">{job.period}</span>
                  </div>
                  <p className="mt-3 text-sm italic text-muted">{job.summary}</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    {job.highlights.map((h) => (
                      <li key={h} className="flex gap-2"><span className="text-accent-2">▸</span>{h}</li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-1.5">{job.tech.map((t) => <TechChip key={t} tech={tech(t)} compact />)}</div>
                </article>
              </li>
            ))}
          </ol>
        </section>

        {/* SKILLS */}
        <section id="skills" className="border-t border-line py-20">
          <SectionHeader level={level("skills")} label={ui.level} title={title("skills")} kicker={ui.skillsKicker} />
          <div className="grid gap-4 md:grid-cols-2">
            {skills.map((cat) => (
              <div key={cat.title} className={`panel panel-bar p-6 ${"concepts" in cat ? "md:col-span-2" : ""}`}>
                <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">{cat.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {"concepts" in cat
                    ? cat.items.map((s) => (
                        <span key={s} className="rounded-full border border-line px-3 py-1.5 text-sm text-muted">{s}</span>
                      ))
                    : cat.items.map((s) => <TechChip key={s} tech={tech(s)} />)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" className="border-t border-line py-20">
          <SectionHeader level={level("education")} label={ui.level} title={title("education")} kicker={ui.educationKicker} />
          <div className="grid gap-4 md:grid-cols-2">
            {education.map((e) => (
              <article key={e.degree} className="panel p-6">
                <GraduationCap className="text-accent" />
                <h3 className="mt-3 font-semibold text-heading">{e.degree}</h3>
                <p className="text-sm text-muted">{e.institution} · {e.period}</p>
                <p className="mt-3 text-sm">{e.details}</p>
              </article>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="border-t border-line py-20">
          <div className="panel hud-bg p-8 text-center sm:p-14">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">{ui.finalLevel}</p>
            <h2 className="mt-3 font-display text-3xl font-black uppercase tracking-wide text-heading sm:text-4xl">{ui.contactTitle}</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">{person.availability}. {ui.contactBody}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={`mailto:${person.email}`} className={btnPrimary}><Mail size={16} /> {person.email}</a>
              {socials.slice(0, 2).map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={btnGhost}>{s.label} <ExternalLink size={14} /></a>
              ))}
            </div>
            <p className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted">
              <span className="inline-flex items-center gap-2"><MapPin size={14} /> {person.location}</span>
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-line py-8 text-center font-mono text-xs tracking-widest text-muted">
        © {new Date().getFullYear()} <span className="text-accent">{person.name}</span> {"//"} {ui.builtWith}
      </footer>
    </Shell>
  );
}
