import type { Project } from '../../content/types'
import type { ReadingTime } from '../../lib/readingTime'
import { Icon, type IconName } from '../Icon'
import { AnimatedNumber, Pill, Reveal } from '../ui'

/* ═══════════════════════════════════════════════════════════════════════════
   CASE SUMMARY — "the whole thing in thirty seconds"
   A recruiter with nine tabs open should be able to answer four questions
   without scrolling: what was broken, what I did, what changed, and how long
   the full read takes. Everything here is derived from the project data, so it
   can never drift out of sync with the chapters below.
   ═══════════════════════════════════════════════════════════════════════════ */

export type ReadMode = 'quick' | 'full'

function Tile({
  label,
  icon,
  children,
  wide = false,
}: {
  label: string
  icon: IconName
  children: React.ReactNode
  wide?: boolean
}) {
  return (
    <div
      className={`group rounded-panel border border-rule bg-canvas p-5 transition-colors duration-300 hover:border-rule-strong ${
        wide ? 'sm:col-span-2' : ''
      }`}
    >
      <p className="flex items-center gap-2">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-accent/20 bg-accent-soft text-accent transition-transform duration-300 group-hover:scale-110">
          <Icon name={icon} size={15} animate="draw" />
        </span>
        <span className="label-sm">{label}</span>
      </p>
      <div className="mt-2.5 text-[14.5px] leading-relaxed text-ink">{children}</div>
    </div>
  )
}

export function CaseSummary({
  project,
  time,
  mode,
  onModeChange,
}: {
  project: Project
  time: ReadingTime
  mode: ReadMode
  onModeChange: (m: ReadMode) => void
}) {
  const metrics = project.study.impact.metrics.slice(0, 4)

  return (
    <Reveal>
      <section aria-label="Summary" className="card overflow-hidden">
        {/* Read mode */}
        <div className="flex flex-col gap-4 border-b border-rule bg-surface/70 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <h2 className="text-[16px] font-semibold tracking-[-0.015em]">In short</h2>
            <p className="mt-1 text-[13.5px] text-ink-faint">
              The whole case study, or just the highlights — your call.
            </p>
          </div>

          <div
            className="flex shrink-0 rounded-full border border-rule bg-canvas p-1"
            role="group"
            aria-label="Choose how much to read"
          >
            {(
              [
                ['quick', 'Quick read', time.quick],
                ['full', 'Full case study', time.full],
              ] as [ReadMode, string, number][]
            ).map(([value, label, mins]) => {
              const on = mode === value
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => onModeChange(value)}
                  aria-pressed={on}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors duration-200 ${
                    on ? 'bg-accent text-accent-contrast' : 'text-ink-faint hover:text-ink'
                  }`}
                >
                  <Icon name={value === 'quick' ? 'sparkle' : 'book'} size={14} />
                  {label}
                  <span
                    className={`nums ml-1.5 font-normal ${
                      on ? 'text-accent-contrast/90' : 'text-ink-faint'
                    }`}
                  >
                    {mins} min
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Four answers */}
        <div className="grid gap-3 p-6 sm:grid-cols-2 sm:p-8">
          <Tile label="The problem" icon="target" wide>
            {project.study.challenge.statement}
          </Tile>
          <Tile label="What I did" icon="cursor">
            {project.meta.role}
            <span className="mt-2 block text-[13.5px] text-ink-faint">
              {project.meta.team} · {project.meta.timeline}
            </span>
          </Tile>
          <Tile label="What changed" icon="trend">
            {project.impactLine}
          </Tile>
        </div>

        {/* Headline numbers */}
        {metrics.length > 0 && (
          <div className="border-t border-rule px-6 py-6 sm:px-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="flex items-center gap-1.5 label-sm">
                <span className="text-positive">
                  <Icon name="chart" size={14} />
                </span>
                Results
              </p>
              <Pill icon="sparkle">Sample figures — replace with your own</Pill>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {metrics.map((m) => (
                <div key={m.label} className="rounded-panel bg-surface p-4">
                  <dd>
                    <AnimatedNumber
                      value={m.value}
                      className="display block text-[1.6rem] text-accent sm:text-[1.9rem]"
                    />
                  </dd>
                  <dt className="mt-1.5 text-[13px] leading-snug text-ink-soft">{m.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        )}
      </section>
    </Reveal>
  )
}
