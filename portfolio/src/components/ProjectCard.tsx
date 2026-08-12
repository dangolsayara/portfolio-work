import { Link } from 'react-router-dom'
import type { Project } from '../content/types'
import { Mock } from './mocks/Mock'
import { Icon, type IconName } from './Icon'
import { TAG_ICON, platformIcon } from '../lib/icons'
import { Arrow, AnimatedNumber, Pill, ScreenWake } from './ui'

/* ═══════════════════════════════════════════════════════════════════════════
   PROJECT CARD
   One card pattern, two sizes. The first project is featured wide; the rest sit
   in a two-up grid. Every card answers the same four questions in the same
   place — what it was, my role, what changed, and where to click — so scanning
   five projects doesn't mean re-learning five layouts.
   ═══════════════════════════════════════════════════════════════════════════ */

/** The single number a recruiter's eye lands on, if the project has one. */
function headlineMetric(project: Project) {
  return project.study.impact.metrics[0]
}

function Meta({ project, wide }: { project: Project; wide: boolean }) {
  const items: [string, string, IconName][] = [
    ['Role', project.meta.role, 'cursor'],
    ['Platform', project.meta.platform, platformIcon(project.meta.platform)],
    ['Year', project.meta.year, 'calendar'],
  ]
  if (wide) items.splice(2, 0, ['Industry', project.meta.industry, 'briefcase'])

  return (
    <dl
      className={`grid gap-x-6 gap-y-4 ${wide ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-3'}`}
    >
      {items.map(([k, v, icon]) => (
        <div key={k}>
          <dt className="flex items-center gap-1.5">
            <span className="text-ink-ghost">
              <Icon name={icon} size={13} />
            </span>
            <span className="label-sm">{k}</span>
          </dt>
          <dd className="mt-1.5 text-[13.5px] leading-snug text-ink">{v}</dd>
        </div>
      ))}
    </dl>
  )
}

function Outcome({ project }: { project: Project }) {
  const metric = headlineMetric(project)
  return (
    <div className="rounded-panel border border-rule bg-surface/70 p-4">
      <p className="flex items-center gap-1.5 label-sm">
        <span className="text-positive">
          <Icon name="trend" size={14} />
        </span>
        Outcome
      </p>
      <div className="mt-2.5 flex items-start gap-3">
        {metric && (
          <AnimatedNumber
            value={metric.value}
            className="display shrink-0 text-[1.5rem] text-positive"
          />
        )}
        <p className="text-[13.5px] leading-relaxed text-ink-soft">{project.impactLine}</p>
      </div>
    </div>
  )
}

function Cta() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-rule-strong bg-canvas px-5 py-2.5 text-[13.5px] font-semibold text-ink transition-colors duration-200 group-hover:border-accent group-hover:bg-accent-soft group-hover:text-accent">
      View case study <Arrow />
    </span>
  )
}

function Tags({ project, max = 3 }: { project: Project; max?: number }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {project.tags.slice(0, max).map((t, i) => (
        <li key={t}>
          <Pill tone={i === 0 ? 'accent' : 'neutral'} icon={TAG_ICON[t]}>
            {t}
          </Pill>
        </li>
      ))}
    </ul>
  )
}

export function ProjectCard({
  project,
  featured = false,
}: {
  project: Project
  featured?: boolean
}) {
  const mobileCover = project.cover.frame === 'mobile'

  return (
    <Link
      to={`/work/${project.slug}`}
      className="card card-hover group block overflow-hidden"
      aria-label={`${project.title} — view case study`}
    >
      <div className={featured ? 'grid lg:grid-cols-[1.15fr_1fr]' : ''}>
        {/* Visual */}
        <div
          className={`relative overflow-hidden bg-surface ${
            featured ? 'p-6 sm:p-8 lg:order-2' : 'p-5 sm:p-6'
          }`}
        >
          <div
            className="dot-grid pointer-events-none absolute inset-0 opacity-40"
            aria-hidden="true"
          />
          <ScreenWake
            className={`relative mx-auto ${
              mobileCover
                ? `${featured ? 'max-w-[250px]' : 'max-w-[215px]'} max-h-[330px] overflow-hidden`
                : ''
            }`}
          >
            <Mock visual={{ ...project.cover, label: undefined }} showCaption={false} />
            {/* A tall phone is cropped rather than shrunk, so cards in a row stay
                comparable. The fade uses the card's own surface colour, which
                keeps it invisible in both themes. */}
            {mobileCover && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-surface"
              />
            )}
          </ScreenWake>
        </div>

        {/* Content */}
        <div className={`p-6 sm:p-8 ${featured ? 'lg:order-1 lg:p-10' : ''}`}>
          <div className="flex items-center justify-between gap-4">
            <Tags project={project} max={featured ? 4 : 2} />
            {featured && (
              <Pill tone="positive" icon="star">
                Featured
              </Pill>
            )}
          </div>

          <h3
            className={`display mt-5 ${
              featured
                ? 'text-[1.75rem] sm:text-[2.25rem] lg:text-[2.5rem]'
                : 'text-[1.4rem] sm:text-[1.6rem]'
            }`}
          >
            {project.title}
          </h3>

          <p
            className={`measure mt-3 leading-relaxed text-ink-soft ${
              featured ? 'text-[16px]' : 'text-[14.5px]'
            }`}
          >
            {project.subtitle}
          </p>

          <div className="mt-6">
            <Meta project={project} wide={featured} />
          </div>

          <div className="mt-6">
            <Outcome project={project} />
          </div>

          <div className="mt-6">
            <Cta />
          </div>
        </div>
      </div>
    </Link>
  )
}
