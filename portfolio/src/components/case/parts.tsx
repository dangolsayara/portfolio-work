import type { ReactNode } from 'react'
import { Icon, type IconName } from '../Icon'
import { Container, Reveal, StepBadge } from '../ui'

/* ═══════════════════════════════════════════════════════════════════════════
   CASE STUDY PARTS
   The shells every chapter is built from. Each chapter opens with a numbered
   badge, a title and a one-line takeaway, so you can read only the takeaways
   and still follow the story.
   ═══════════════════════════════════════════════════════════════════════════ */

export function toParas(x: string | string[]): string[] {
  return Array.isArray(x) ? x : [x]
}

/** First sentence of a passage — used as a chapter takeaway. */
export function firstSentence(text: string, max = 150): string {
  const match = text.match(/^.*?[.!?](?=\s|$)/)
  const s = (match ? match[0] : text).trim()
  return s.length > max ? `${s.slice(0, max - 1).trimEnd()}…` : s
}

export function CasePart({
  id,
  n,
  label,
  icon,
  takeaway,
  children,
  tinted = false,
}: {
  id: string
  n: string
  label: string
  icon?: IconName
  takeaway?: string
  children: ReactNode
  tinted?: boolean
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`scroll-mt-32 py-14 sm:py-20 ${tinted ? 'bg-surface/60' : ''}`}
    >
      <Container>
        <Reveal>
          <div className="flex items-start gap-4">
            {icon ? (
              <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-[0.8rem] border border-accent/20 bg-accent-soft text-accent">
                <Icon name={icon} size={21} animate="draw" />
                <span className="nums absolute -right-1.5 -bottom-1.5 grid h-5 w-5 place-items-center rounded-full border border-rule bg-canvas text-[10px] font-semibold text-ink-faint">
                  {n}
                </span>
              </span>
            ) : (
              <StepBadge n={n} />
            )}
            <div className="pt-1">
              <h2
                id={`${id}-title`}
                className="display text-[1.5rem] sm:text-[1.9rem] lg:text-[2.1rem]"
              >
                {label}
              </h2>
              {takeaway && (
                <p className="measure mt-3 text-[15.5px] leading-relaxed text-ink-soft">
                  {takeaway}
                </p>
              )}
            </div>
          </div>
        </Reveal>
        <div className="mt-8 sm:mt-10 sm:pl-12">{children}</div>
      </Container>
    </section>
  )
}

/** The opening line of a chapter — large, quoted, load-bearing. */
export function Opener({ children }: { children: ReactNode }) {
  return (
    <Reveal>
      <div className="card relative overflow-hidden p-6 sm:p-9">
        <span aria-hidden="true" className="absolute top-0 left-0 h-full w-1 bg-accent" />
        <p className="display max-w-[30ch] text-[1.4rem] leading-[1.16] sm:text-[1.9rem]">
          {children}
        </p>
      </div>
    </Reveal>
  )
}

export function Prose({
  paras,
  className = '',
  size = 'base',
}: {
  paras: string[]
  className?: string
  size?: 'base' | 'lead'
}) {
  return (
    <div className={className}>
      {paras.map((p, i) => (
        <Reveal key={i} delay={i * 0.04}>
          <p
            className={`measure ${i === 0 ? '' : 'mt-4'} leading-[1.75] ${
              size === 'lead' ? 'text-[16.5px] text-ink' : 'text-[15.5px] text-ink-soft'
            }`}
          >
            {p}
          </p>
        </Reveal>
      ))}
    </div>
  )
}

export function MiniHead({ children }: { children: ReactNode }) {
  return <h3 className="label mb-5 text-ink">{children}</h3>
}

export function FactList({ items }: { items: { label: string; value: string }[] }) {
  return (
    <dl className="overflow-hidden rounded-panel border border-rule">
      {items.map((f, i) => (
        <div
          key={f.label}
          className={`grid gap-1 px-5 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6 ${
            i % 2 ? 'bg-canvas' : 'bg-surface/70'
          }`}
        >
          <dt className="label-sm sm:pt-[3px]">{f.label}</dt>
          <dd className="text-[14.5px] leading-relaxed text-ink">{f.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export function Numbered({
  items,
  columns = 2,
}: {
  items: { label: string; detail: string }[]
  columns?: 1 | 2
}) {
  return (
    <ol className={`grid gap-4 ${columns === 2 ? 'sm:grid-cols-2' : ''}`}>
      {items.map((m, i) => (
        <Reveal as="li" key={m.label} delay={i * 0.03}>
          <div className="card h-full p-5">
            <div className="flex items-center gap-3">
              <StepBadge n={String(i + 1).padStart(2, '0')} />
              <h4 className="text-[15px] font-semibold tracking-[-0.01em] text-ink">
                {m.label}
              </h4>
            </div>
            <p className="mt-3 text-[14.5px] leading-[1.7] text-ink-soft">{m.detail}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  )
}

export function Callout({
  children,
  tone = 'accent',
}: {
  children: ReactNode
  tone?: 'accent' | 'positive'
}) {
  return (
    <div
      className={`rounded-card border p-6 sm:p-8 ${
        tone === 'accent'
          ? 'border-accent/25 bg-accent-soft'
          : 'border-positive/25 bg-positive-soft'
      }`}
    >
      {children}
    </div>
  )
}

/** Compact key/value grid, each row labelled with an icon. */
export function MetaGrid({ items }: { items: [string, string, IconName][] }) {
  return (
    <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-3 lg:grid-cols-6">
      {items.map(([k, v, icon], i) => (
        <div key={k}>
          <dt className="flex items-center gap-1.5">
            <span className="text-accent">
              <Icon name={icon} size={14} animate="draw" delay={i * 0.05} />
            </span>
            <span className="label-sm">{k}</span>
          </dt>
          <dd className="mt-1.5 text-[13.5px] leading-snug text-ink">{v}</dd>
        </div>
      ))}
    </dl>
  )
}
