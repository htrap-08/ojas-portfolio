import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Intro } from "@/components/Intro";
import { profile } from "@/data/profile";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ojas Patkar — Portfolio" },
      { name: "description", content: "Ojas Patkar — first-year Computer Engineering student in Mumbai. Curious, creative, and always learning." },
      { property: "og:title", content: "Ojas Patkar — Portfolio" },
      { property: "og:description", content: "First-year Computer Engineering student in Mumbai. Curious, creative, and always learning." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  ...(profile.projects.length ? [{ id: "work", label: "Work" }] : []),
  { id: "contact", label: "Contact" },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("is-visible"), io.unobserve(e.target))),
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Index() {
  const [intro, setIntro] = useState<"pending" | "show" | "done">("pending");
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIntro("done");
      return;
    }
    setIntro("show");
  }, []);
  const finish = useCallback(() => {
    setIntro("done");
  }, []);
  useReveal();

  return (
    <>
      {intro === "show" && <Intro onDone={finish} />}
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">
        Skip to content
      </a>
      <header className="site-header">
        <nav className="site-nav" aria-label="Main">
          <a href="#top" className="wordmark" aria-label={`${profile.name} home`}>{profile.name}</a>
          <ul className="nav-links">
            <li><a href="#top" className="nav-home">Home</a></li>
            {NAV.map((n) => <li key={n.id}><a href={`#${n.id}`}>{n.label}</a></li>)}
          </ul>
        </nav>
      </header>

      <main id="main">
        <section id="top" className={`portfolio-hero ${intro === "done" ? "hero-ready" : ""}`} aria-labelledby="hero-heading">
          <h1 id="hero-heading" className="hero-heading"><span className="sr-only">{profile.name} — </span>PORTFOLIO</h1>
          <div className="hero-bottom">
            <div className="hero-role"><span>Computer Engineering</span><em>Student & explorer</em></div>

          </div>
        </section>

        <Section id="about" title="About me">
          <div className="grid gap-12 md:grid-cols-[1fr_16rem]">
            <div className="space-y-6 text-lg leading-relaxed text-foreground/85">
              {profile.about.map((p, i) => (
                <p key={i} className={i === profile.about.length - 1 ? "font-display text-2xl font-bold text-foreground" : ""}>{p}</p>
              ))}
            </div>
            <aside className="space-y-4 border-l border-border pl-6">
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Off the clock</h3>
              <ul className="flex flex-wrap gap-2">
                {profile.interests.map((t) => (
                  <li key={t} className="rounded-full border border-border px-3 py-1 text-sm">{t}</li>
                ))}
              </ul>
            </aside>
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <div className="grid gap-16 md:grid-cols-2">
            <SkillList heading="Technical" items={profile.technicalSkills} />
            <SkillList heading="Personal" items={profile.personalSkills} />
          </div>
        </Section>

        {profile.projects.length > 0 && (
          <Section id="work" title="Work">
            <ul className="divide-y divide-border border-y border-border">
              {profile.projects.map((p) => (
                <li key={p.title} className="group py-8 transition-colors hover:bg-card">
                  <h3 className="font-display text-3xl font-bold group-hover:text-primary">
                    {p.href ? <a href={p.href} target="_blank" rel="noreferrer">{p.title} ↗</a> : p.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">{p.description}</p>
                </li>
              ))}
            </ul>
          </Section>
        )}

        <Section id="contact" title="Let's talk">
          <p className="max-w-xl text-lg text-muted-foreground">Have an idea, a question, or just want to say hi? My inbox is open.</p>
          <a
            href={`mailto:${profile.email}`}
            className="group mt-10 inline-block break-all font-display text-[clamp(1.05rem,3.3vw,2.5rem)] font-bold leading-tight tracking-tight"
          >
            <span className="bg-gradient-to-r from-primary to-primary bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">
              {profile.email}
            </span>
          </a>
          <ul className="mt-12 flex gap-6 font-mono text-sm uppercase tracking-widest">
            {profile.socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noreferrer" className="text-muted-foreground transition-colors hover:text-primary">{s.label} ↗</a>
              </li>
            ))}
          </ul>
        </Section>
      </main>

    </>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-14 border-t border-border">
      <div className="reveal mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="mb-14 flex items-baseline gap-4">
          <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-6xl">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function SkillList({ heading, items }: { heading: string; items: { name: string; detail: string }[] }) {
  return (
    <div>
      <h3 className="mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">{heading}</h3>
      <ul className="border-t border-border">
        {items.map((s) => (
          <li key={s.name} className="group border-b border-border py-5">
            <p className="font-display text-2xl font-bold transition-colors group-hover:text-primary">{s.name}</p>
            <p className="mt-1 text-muted-foreground">{s.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
