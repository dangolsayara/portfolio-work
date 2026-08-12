import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Project } from '../../content/types'
import { projectNeighbours } from '../../content/projects'
import { site } from '../../content/site'
import { QUICK_CHAPTERS, readingTime } from '../../lib/readingTime'
import { CHAPTER_ICON, TAG_ICON, platformIcon } from '../../lib/icons'
import { IconTile, type IconName } from '../Icon'
import { Illustration } from '../Illustration'
import { Mock } from '../mocks/Mock'
import {
  AnimatedNumber,
  Arrow,
  Container,
  Disclosure,
  Pill,
  Reveal,
  ScreenWake,
  Stagger,
  StaggerItem,
  StepBadge,
} from '../ui'
import { CaseSummary, type ReadMode } from './CaseSummary'
import { ChapterTabs } from './ChapterTabs'
import {
  Callout,
  CasePart,
  FactList,
  MetaGrid,
  MiniHead,
  Numbered,
  Opener,
  Prose,
  toParas,
} from './parts'

/* ═══════════════════════════════════════════════════════════════════════════
   CASE STUDY
   One template, eleven chapters, driven entirely by the project data file.
   Two ways to read it: a quick read that keeps the five chapters carrying the
   argument, and the full version. Secondary material — research methods,
   competitor notes, interaction lists — sits behind disclosures, so the page
   stays scannable without hiding anything from anyone who wants it.
   ═══════════════════════════════════════════════════════════════════════════ */

const ALL_CHAPTERS = [
  { id: 'challenge', label: 'The challenge' },
  { id: 'context', label: 'Context' },
  { id: 'understanding', label: 'Research' },
  { id: 'insight', label: 'The insight' },
  { id: 'experience', label: 'Defining it' },
  { id: 'exploring', label: 'Exploring' },
  { id: 'system', label: 'Design system' },
  { id: 'final', label: 'Final screens' },
  { id: 'prototype', label: 'Interaction' },
  { id: 'impact', label: 'Impact' },
  { id: 'reflection', label: 'Reflection' },
] as const

/* ── Header ────────────────────────────────────────────────────────────── */

function CaseHeader({ project }: { project: Project }) {
  return (
    <header className="pt-24 pb-2 sm:pt-28">
      <Container>
        <Reveal>
          <Link
            to="/#work"
            className="group inline-flex items-center gap-2 rounded-full border border-rule bg-surface px-3.5 py-2 text-[13px] font-medium text-ink-soft transition-colors hover:border-rule-strong hover:text-ink"
          >
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            >
              ←
            </span>
            All work
          </Link>
        </Reveal>

        <Reveal delay={0.04}>
          <ul className="mt-8 flex flex-wrap gap-1.5">
            {project.tags.map((t, i) => (
              <li key={t}>
                <Pill tone={i === 0 ? 'accent' : 'neutral'} icon={TAG_ICON[t]}>
                  {t}
                </Pill>
              </li>
            ))}
          </ul>

          <h1 className="display mt-5 text-[2.35rem] sm:text-[3.25rem] lg:text-[4rem]">
            {project.title}
          </h1>
          <p className="measure mt-4 text-[16.5px] leading-relaxed text-ink-soft sm:text-[19px]">
            {project.subtitle}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="card mt-9 overflow-hidden bg-surface p-5 sm:p-8">
            <ScreenWake
              className={`relative mx-auto ${
                project.cover.frame === 'mobile' ? 'max-w-[290px]' : ''
              }`}
            >
              <Mock visual={{ ...project.cover, label: undefined }} showCaption={false} />
            </ScreenWake>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8">
            <MetaGrid
              items={[
                ['Role', project.meta.role, 'cursor'],
                ['Platform', project.meta.platform, platformIcon(project.meta.platform)],
                ['Industry', project.meta.industry, 'briefcase'],
                ['Team', project.meta.team, 'users'],
                ['Timeline', project.meta.timeline, 'clock'],
                ['Year', project.meta.year, 'calendar'],
              ]}
            />
          </div>
        </Reveal>
      </Container>
    </header>
  )
}

/* ── The chapters ──────────────────────────────────────────────────────── */

export function CaseStudy({ project }: { project: Project }) {
  const s = project.study
  const { prev, next } = projectNeighbours(project.slug)
  const [mode, setMode] = useState<ReadMode>('quick')
  const time = useMemo(() => readingTime(s), [s])

  const quick = mode === 'quick'
  const show = (id: string) => !quick || (QUICK_CHAPTERS as readonly string[]).includes(id)
  const chapters = ALL_CHAPTERS.filter((c) => show(c.id))

  /* Detail is expanded in the full read, collapsed in the quick read. */
  const detailOpen = !quick

  return (
    <article>
      <CaseHeader project={project} />

      <Container className="pt-2 pb-10">
        <CaseSummary project={project} time={time} mode={mode} onModeChange={setMode} />
      </Container>

      <ChapterTabs chapters={chapters} />

      {/* 01 ─ The challenge */}
      <CasePart
        id="challenge"
        n="01"
        label="The challenge"
          icon={CHAPTER_ICON.challenge}
      >
        <Opener>{s.challenge.statement}</Opener>
        <Prose paras={s.challenge.body} size="lead" className="mt-8" />
      </CasePart>

      {/* 02 ─ Context */}
      {show('context') && (
        <CasePart
          id="context"
          n="02"
          label="Context"
          icon={CHAPTER_ICON.context}
          takeaway={`${project.meta.team} · ${project.meta.timeline} · ${project.meta.platform}`}
          tinted
        >
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
            <Prose paras={s.context.body} />
            <div className="space-y-4">
              <FactList items={s.context.facts} />
              <Disclosure
                summary="Constraints I was designing inside"
                count={s.context.constraints.length}
                open={detailOpen}
              >
                <ul className="space-y-3">
                  {s.context.constraints.map((c) => (
                    <li
                      key={c}
                      className="flex gap-3 text-[14.5px] leading-relaxed text-ink-soft"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </Disclosure>
            </div>
          </div>
        </CasePart>
      )}

      {/* 03 ─ Research */}
      {show('understanding') && (
        <CasePart
          id="understanding"
          n="03"
          label="Research"
          icon={CHAPTER_ICON.understanding}
          takeaway={`${s.understanding.methods.length} research methods · ${s.understanding.painPoints.length} problems found`}
        >
          <Prose paras={[s.understanding.intro]} size="lead" />

          <div className="mt-10">
            <MiniHead>What was going wrong</MiniHead>
            <Stagger as="ul" className="grid gap-4 sm:grid-cols-2">
              {s.understanding.painPoints.map((pp) => (
                <StaggerItem as="li" key={pp.title} className="card h-full p-5">
                  <h4 className="text-[15.5px] font-semibold tracking-[-0.015em] text-ink">
                    {pp.title}
                  </h4>
                  <p className="mt-2.5 text-[14.5px] leading-[1.7] text-ink-soft">{pp.body}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {s.understanding.visual && (
            <Reveal className="mt-10">
              <Mock visual={s.understanding.visual} />
            </Reveal>
          )}

          <div className="mt-8 space-y-4">
            <Disclosure
              summary="How I looked into it"
              count={s.understanding.methods.length}
              open={detailOpen}
            >
              <Numbered items={s.understanding.methods} />
            </Disclosure>

            {s.understanding.competitors && (
              <Disclosure
                summary="What already existed"
                count={s.understanding.competitors.length}
              >
                <dl className="space-y-4">
                  {s.understanding.competitors.map((c) => (
                    <div key={c.name} className="sm:grid sm:grid-cols-[13rem_1fr] sm:gap-8">
                      <dt className="text-[14.5px] font-semibold text-ink">{c.name}</dt>
                      <dd className="mt-1 text-[14.5px] leading-relaxed text-ink-soft sm:mt-0">
                        {c.note}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Disclosure>
            )}
          </div>
        </CasePart>
      )}

      {/* 04 ─ The insight */}
      <section
        id="insight"
        aria-labelledby="insight-title"
        className="scroll-mt-32 py-14 sm:py-20"
      >
        <Container>
          <Reveal>
            <div className="card relative overflow-hidden bg-accent-soft p-7 sm:p-12">
              <div className="flex items-center gap-3">
                <IconTile name="lightbulb" size="md" animate="draw" />
                <span className="label-sm text-accent">The insight</span>
              </div>
              <h2
                id="insight-title"
                className="display mt-6 max-w-[26ch] text-[1.6rem] leading-[1.12] sm:text-[2.4rem] lg:text-[2.9rem]"
              >
                {s.insight.statement}
              </h2>
              <ul className="mt-9 grid gap-4 sm:grid-cols-3">
                {s.insight.support.map((sup, i) => (
                  <li key={i} className="rounded-panel border border-accent/20 bg-canvas/70 p-5">
                    <p className="nums label-sm text-accent">{String(i + 1).padStart(2, '0')}</p>
                    <p className="mt-2.5 text-[14.5px] leading-[1.7] text-ink-soft">{sup}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 05 ─ Defining the experience */}
      {show('experience') && (
        <CasePart
          id="experience"
          n="05"
          label="Defining the experience"
          icon={CHAPTER_ICON.experience}
          takeaway={`${s.experience.flow.length} steps${s.experience.ia ? ` · ${s.experience.ia.length} top-level sections` : ''}`}
          tinted
        >
          <Prose paras={[s.experience.intro]} size="lead" />

          <div className="mt-10">
            <MiniHead>The flow, step by step</MiniHead>
            <Stagger as="ol" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {s.experience.flow.map((f) => (
                <StaggerItem as="li" key={f.step} className="card h-full p-5">
                  <div className="flex items-center gap-3">
                    <StepBadge n={f.step} />
                    <h4 className="text-[15px] font-semibold tracking-[-0.01em]">{f.label}</h4>
                  </div>
                  <p className="mt-3 text-[14px] leading-[1.7] text-ink-soft">{f.detail}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {s.experience.visual && (
            <Reveal className="mt-10">
              <Mock visual={s.experience.visual} />
            </Reveal>
          )}

          {s.experience.ia && (
            <div className="mt-8">
              <Disclosure summary="Information architecture" count={s.experience.ia.length}>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {s.experience.ia.map((group) => (
                    <div key={group.label}>
                      <p className="border-b border-rule pb-2.5 text-[14.5px] font-semibold text-ink">
                        {group.label}
                      </p>
                      <ul className="mt-3 space-y-2">
                        {group.children.map((c) => (
                          <li key={c} className="text-[13.5px] leading-relaxed text-ink-soft">
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Disclosure>
            </div>
          )}
        </CasePart>
      )}

      {/* 06 ─ Exploring solutions */}
      {show('exploring') && (
        <CasePart
          id="exploring"
          n="06"
          label="Exploring solutions"
          icon={CHAPTER_ICON.exploring}
          takeaway={`${s.exploring.options.length} concepts explored · 1 shipped`}
        >
          <Prose paras={[s.exploring.intro]} size="lead" />
          <ul className="mt-10 grid gap-4 lg:grid-cols-3">
            {s.exploring.options.map((o) => {
              const chosen = o.verdict === 'chosen'
              return (
                <Reveal as="li" key={o.label}>
                  <div
                    className={`card h-full p-6 ${
                      chosen ? 'border-accent/40 ring-1 ring-accent/20' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="label-sm">Option {o.label}</span>
                      <Pill tone={chosen ? 'positive' : 'neutral'} icon={chosen ? 'check' : 'x'}>
                        {chosen ? 'Chosen' : 'Rejected'}
                      </Pill>
                    </div>
                    <h4 className="display mt-4 text-[1.25rem] sm:text-[1.4rem]">{o.title}</h4>
                    <p className="mt-3 text-[14.5px] leading-[1.7] text-ink-soft">{o.body}</p>
                    <div className="mt-5 rounded-panel border border-rule bg-surface/70 p-4">
                      <p className="label-sm">{chosen ? 'Why it won' : 'Why it lost'}</p>
                      <p className="mt-2 text-[14px] leading-[1.7] text-ink">{o.why}</p>
                    </div>
                    {o.visual && (
                      <div className="mt-5">
                        <Mock visual={o.visual} />
                      </div>
                    )}
                  </div>
                </Reveal>
              )
            })}
          </ul>
        </CasePart>
      )}

      {/* 07 ─ Design system */}
      {show('system') && (
        <CasePart
          id="system"
          n="07"
          label="Design system"
          icon={CHAPTER_ICON.system}
          takeaway={`${s.system.colors.length} colour roles · ${s.system.components.length} documented components`}
          tinted
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="card h-full p-6">
                <MiniHead>Colour</MiniHead>
                <ul className="space-y-4">
                  {s.system.colors.map((c) => (
                    <li key={c.name} className="flex gap-4">
                      <span
                        className="mt-0.5 h-10 w-10 shrink-0 rounded-[0.7rem] border border-rule"
                        style={{ background: c.hex }}
                        aria-hidden="true"
                      />
                      <div>
                        <div className="flex flex-wrap items-baseline gap-x-3">
                          <p className="text-[14.5px] font-semibold text-ink">{c.name}</p>
                          <p className="nums label-sm">{c.hex}</p>
                        </div>
                        <p className="mt-1 text-[13.5px] leading-relaxed text-ink-soft">
                          {c.role}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="card h-full p-6">
                <MiniHead>Type</MiniHead>
                <ul className="divide-y divide-rule">
                  {s.system.type.map((t, i) => (
                    <li key={t.name} className={i === 0 ? 'pb-4' : 'py-4 last:pb-0'}>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <p className="label-sm text-accent">{t.name}</p>
                        <p className="text-[12.5px] text-ink-faint">{t.role}</p>
                      </div>
                      <p
                        className={`mt-2.5 text-ink ${
                          i === 0
                            ? 'display text-[1.45rem]'
                            : i === 1
                              ? 'text-[15px] leading-relaxed'
                              : 'label'
                        }`}
                      >
                        {t.sample}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="mt-6">
            <Callout>
              <MiniHead>What the system changed</MiniHead>
              <p className="measure text-[15.5px] leading-[1.72] text-ink">{s.system.outcome}</p>
            </Callout>
          </div>

          <div className="mt-6 space-y-4">
            <Disclosure
              summary="Components and their states"
              count={s.system.components.length}
            >
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {s.system.components.map((c) => (
                  <li key={c.name} className="rounded-panel border border-rule bg-canvas p-4">
                    <h4 className="text-[14.5px] font-semibold text-ink">{c.name}</h4>
                    <p className="mt-2 text-[13.5px] leading-[1.65] text-ink-soft">{c.note}</p>
                  </li>
                ))}
              </ul>
            </Disclosure>

            <Disclosure summary="How the system is put together">
              <Prose paras={toParas(s.system.intro)} />
            </Disclosure>
          </div>
        </CasePart>
      )}

      {/* 08 ─ Final screens */}
      <CasePart
        id="final"
        n="08"
        label="Final screens"
          icon={CHAPTER_ICON.final}
        takeaway={`${s.final.screens.length} key screens${
          s.final.screens.some((v) => v.frame === 'mobile') ? ' · desktop and mobile' : ''
        }`}
      >
        <Prose paras={[s.final.intro]} size="lead" />
        <div className="mt-10 space-y-10">
          {s.final.screens.map((v, i) => (
            <Reveal key={i}>
              <div className="card overflow-hidden">
                <div
                  className={`bg-surface p-5 sm:p-7 ${
                    v.frame === 'mobile' ? 'flex justify-center' : ''
                  }`}
                >
                  <ScreenWake className={v.frame === 'mobile' ? 'w-full max-w-[280px]' : ''}>
                    <Mock visual={{ ...v, label: undefined }} showCaption={false} />
                  </ScreenWake>
                </div>
                {(v.label || v.caption) && (
                  <div className="border-t border-rule px-5 py-4 sm:px-7">
                    {v.label && <p className="label-sm">{v.label}</p>}
                    {v.caption && (
                      <p className="measure mt-2 text-[14.5px] leading-relaxed text-ink-soft">
                        {v.caption}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </CasePart>

      {/* 09 ─ Interaction */}
      {show('prototype') && (
        <CasePart
          id="prototype"
          n="09"
          label="Interaction"
          icon={CHAPTER_ICON.prototype}
          takeaway={`${s.prototype.interactions.length} interactions specified`}
          tinted
        >
          <Prose paras={[s.prototype.intro]} size="lead" />
          <div className="mt-8">
            <Disclosure
              summary="Interaction details"
              count={s.prototype.interactions.length}
              open={detailOpen}
            >
              <ul className="grid gap-4 sm:grid-cols-2">
                {s.prototype.interactions.map((it, i) => (
                  <li key={it.name} className="rounded-panel border border-rule bg-canvas p-5">
                    <div className="flex items-center gap-3">
                      <StepBadge n={String(i + 1).padStart(2, '0')} />
                      <h4 className="text-[14.5px] font-semibold tracking-[-0.01em]">
                        {it.name}
                      </h4>
                    </div>
                    <p className="mt-3 text-[14px] leading-[1.7] text-ink-soft">{it.detail}</p>
                  </li>
                ))}
              </ul>
            </Disclosure>
          </div>
        </CasePart>
      )}

      {/* 10 ─ Impact */}
      <CasePart
        id="impact"
        n="10"
        label="Impact"
          icon={CHAPTER_ICON.impact}
        takeaway={`${s.impact.metrics.length} measures · ${s.impact.qualitative.length} qualitative outcomes`}
      >
        <Prose paras={[s.impact.intro]} size="lead" />

        {s.impact.metrics.length > 0 && (
          <>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Pill tone="accent">Sample figures</Pill>
              <p className="text-[13px] text-ink-faint">
                Replace with measured results, or delete them and keep the qualitative outcomes.
              </p>
            </div>
            <Stagger as="ul" className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {s.impact.metrics.map((m) => (
                <StaggerItem as="li" key={m.label} className="card h-full p-5">
                  <AnimatedNumber
                    value={m.value}
                    className="display block text-[2rem] text-accent sm:text-[2.4rem]"
                  />
                  <p className="mt-2.5 text-[14.5px] font-semibold text-ink">{m.label}</p>
                  {m.note && (
                    <p className="mt-1.5 text-[13px] leading-relaxed text-ink-faint">{m.note}</p>
                  )}
                </StaggerItem>
              ))}
            </Stagger>
          </>
        )}

        <Illustration scene="measure" height={150} className="mt-10" />

        <div className="mt-8">
          <MiniHead>Beyond the numbers</MiniHead>
          <ul className="grid gap-4 lg:grid-cols-3">
            {s.impact.qualitative.map((q, i) => (
              <Reveal as="li" key={i} delay={i * 0.04}>
                <div className="h-full rounded-panel border border-positive/25 bg-positive-soft p-5">
                  <p className="text-[14.5px] leading-[1.7] text-ink">{q}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </CasePart>

      {/* 11 ─ Reflection */}
      <CasePart
        id="reflection"
        n="11"
        label="What I learned"
          icon={CHAPTER_ICON.reflection}
        tinted
      >
        <dl className="grid gap-4 sm:grid-cols-2">
          {(
            [
              ['What worked', s.reflection.worked, 'positive', 'check'],
              ["What didn't", s.reflection.didnt, 'neutral', 'x'],
              ['What I would improve', s.reflection.improve, 'neutral', 'wand'],
              ['What I took with me', s.reflection.learned, 'accent', 'brain'],
            ] as [string, string, 'positive' | 'neutral' | 'accent', IconName][]
          ).map(([k, v, tone, icon], i) => (
            <Reveal key={k} delay={i * 0.04} className="card h-full p-6">
              <dt className="mb-3">
                <Pill tone={tone} icon={icon}>
                  {k}
                </Pill>
              </dt>
              <dd className="text-[15px] leading-[1.72] text-ink-soft">{v}</dd>
            </Reveal>
          ))}
        </dl>
      </CasePart>

      {/* ── Next / prev ─────────────────────────────────────────────────── */}
      <nav aria-label="More projects" className="border-t border-rule py-14 sm:py-20">
        <Container>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="text-[16px] font-semibold">More work</h2>
            <Link
              to="/#work"
              className="group inline-flex items-center gap-2 text-[13.5px] font-medium text-ink-soft hover:text-accent"
            >
              All projects <Arrow />
            </Link>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[prev, next].map((p, i) =>
              p ? (
                <Link key={p.slug} to={`/work/${p.slug}`} className="card card-hover group p-6">
                  <span className="label-sm">{i === 0 ? '← Previous' : 'Next →'}</span>
                  <p className="display mt-3 text-[1.35rem] transition-colors group-hover:text-accent sm:text-[1.6rem]">
                    {p.title}
                  </p>
                  <p className="measure-tight mt-2 text-[14px] leading-relaxed text-ink-faint">
                    {p.subtitle}
                  </p>
                </Link>
              ) : null
            )}
          </div>

          <div className="card mt-8 flex flex-wrap items-center justify-between gap-5 p-6 sm:p-8">
            <div>
              <p className="text-[17px] font-semibold tracking-[-0.015em]">
                Working on something like this?
              </p>
              <p className="mt-1.5 text-[14px] text-ink-faint">{site.contact.responseNote}</p>
            </div>
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[14.5px] font-semibold text-accent-contrast transition-colors duration-200 hover:bg-accent-strong"
            >
              Let's talk <Arrow dir="up-right" />
            </a>
          </div>
        </Container>
      </nav>
    </article>
  )
}
