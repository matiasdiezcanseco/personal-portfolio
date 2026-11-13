import Link from "next/link";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Github,
  Linkedin,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { Brand } from "@/components/brand";
import { LanguageSwitch } from "@/components/language-switch";
import { MobileNav } from "@/components/mobile-nav";
import { SectionIndex } from "@/components/section-index";
import { SelectedWork } from "@/components/selected-work";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { PortfolioContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export function Portfolio({
  locale,
  content: c,
}: {
  locale: Locale;
  content: PortfolioContent;
}) {
  const sectionIds = [
    "about",
    "experience",
    "work",
    "projects",
    "skills",
    "background",
  ] as const;
  const links = sectionIds.map((id) => ({ id, label: c.nav[id] }));
  const topLinks = ["about", "experience", "projects", "contact"] as const;
  return (
    <>
      <a className="skip" href="#main">
        {c.ui.skip}
      </a>
      <header id="top">
        <div className="wrap top">
          <Link
            className="wordmark"
            href={`/${locale}`}
            aria-label={`${site.name} · ${c.ui.home}`}
          >
            <Brand />
          </Link>
          <nav className="desktop-nav" aria-label={c.ui.navigation}>
            {topLinks.map((id) => (
              <a key={id} href={`#${id}`}>
                {c.nav[id]}
                {id === "contact" && <ArrowUpRight aria-hidden="true" />}
              </a>
            ))}
          </nav>
          <div className="header-tools">
            <LanguageSwitch locale={locale} label={c.ui.language} />
            <MobileNav
              labels={c.ui}
              links={[...links, { id: "contact", label: c.nav.contact }]}
            />
          </div>
        </div>
      </header>
      <main id="main">
        <section className="hero wrap" aria-labelledby="name" data-enter>
          <p className="intro">{c.hero.intro}</p>
          <h1 id="name">
            <span>Matías</span>
            <span>Diez-Canseco.</span>
          </h1>
          <div className="hero-bottom">
            <div>
              <p className="role">
                {c.hero.headline.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>
              <div className="hero-actions">
                <Button asChild variant="outline" className="action">
                  <a href="#work">
                    {c.ui.seeWork}
                    <ArrowDown aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild variant="link" className="text-link">
                  <a href={site.cv} download title={c.ui.cvLanguage}>
                    {c.ui.download}
                    <ArrowDown aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </div>
            <p className="hero-copy">{c.hero.description}</p>
          </div>
          <div className="hero-meta">
            <span className="location">
              <i className="dot" aria-hidden="true" />
              {c.ui.location}
            </span>
            <div className="socials">
              <a href={site.github}>
                <Github aria-hidden="true" />
                GitHub
                <ArrowUpRight aria-hidden="true" />
              </a>
              <a href={site.linkedin}>
                <Linkedin aria-hidden="true" />
                LinkedIn
                <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
        <div className="wrap reading">
          <SectionIndex
            links={links}
            context={c.ui.context}
            note={c.ui.sideNote}
            label={c.ui.onPage}
          />
          <div className="content">
            <section id="about" aria-labelledby="about-title">
              <h2 id="about-title" tabIndex={-1}>
                {c.nav.about}
              </h2>
              {c.about.map((p) => (
                <p className="prose" key={p}>
                  {p}
                </p>
              ))}
            </section>
            <section id="experience" aria-labelledby="experience-title">
              <h2 id="experience-title" tabIndex={-1}>
                {c.nav.experience}
              </h2>
              <p className="prose">{c.experienceIntro}</p>
              {c.jobs.map((job) => (
                <article className="entry" key={job.id}>
                  <div className="date">{job.date}</div>
                  <div>
                    <h3>{job.title}</h3>
                    {job.company && <p className="company">{job.company}</p>}
                    {job.paragraphs.map((p) => (
                      <p className="description" key={p}>
                        {p}
                      </p>
                    ))}
                    {job.tags.length > 0 && (
                      <div className="tags">
                        {job.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </section>
            <section id="work" aria-labelledby="work-title">
              <h2 id="work-title" tabIndex={-1}>
                {c.nav.work}
              </h2>
              <SelectedWork items={c.work} />
            </section>
            <section id="projects" aria-labelledby="projects-title">
              <div className="section-head">
                <h2 id="projects-title" tabIndex={-1}>
                  {c.nav.projects}
                </h2>
                <a href={`${site.github}?tab=repositories`}>
                  {c.ui.viewGithub}
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
              <p className="prose">{c.projectsIntro}</p>
              {c.projects.map((project) => {
                const body = (
                  <>
                    <div className="project-title">
                      <h3>{project.name}</h3>
                      {project.url && <ArrowUpRight aria-hidden="true" />}
                    </div>
                    <p className="description">{project.description}</p>
                    <p className="project-meta">
                      {project.technologies.join(" · ")}
                    </p>
                    {!project.url && (
                      <span className="source-status">
                        <LockKeyhole aria-hidden="true" />
                        {c.ui.closedSource}
                      </span>
                    )}
                  </>
                );
                return project.url ? (
                  <a className="project" key={project.id} href={project.url}>
                    {body}
                  </a>
                ) : (
                  <article className="project" key={project.id}>
                    {body}
                  </article>
                );
              })}
            </section>
            {(["skills", "background"] as const).map((id) => (
              <section key={id} id={id} aria-labelledby={`${id}-title`}>
                <h2 id={`${id}-title`} tabIndex={-1}>
                  {c.nav[id]}
                </h2>
                {c[id].map((item) => (
                  <div className="credential" key={item.title}>
                    <h3>{item.title}</h3>
                    {item.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                ))}
              </section>
            ))}
          </div>
        </div>
      </main>
      <footer id="contact">
        <div className="wrap">
          <div className="contact-layout">
            <h2 id="contact-title" tabIndex={-1}>
              {c.nav.contact}
            </h2>
            <div>
              <p className="contact-title">{c.ui.contactTitle}</p>
              <p className="description">{c.ui.contactDescription}</p>
              <a className="mail" href={`mailto:${site.email}`}>
                <Mail aria-hidden="true" />
                {site.email}
                <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="foot">
            <p>
              © {new Date().getFullYear()} {site.name}
            </p>
            <a href="#top">
              {c.ui.backTop}
              <ArrowUp aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
