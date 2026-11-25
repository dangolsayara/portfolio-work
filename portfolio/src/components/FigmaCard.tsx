import { Link } from 'react-router-dom'
import type { FigmaFile } from '../content/figmaFiles'
import { Pill, Reveal } from './ui'

export function FigmaCard({ f, index = 0 }: { f: FigmaFile; index?: number }) {
  return (
  <Reveal delay={index * 0.08}>
    <Link
      to={`/${f.slug}`}
      aria-label={`${f.title} — open in Figma editor`}
      className="group card flex h-full flex-col overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-accent"
    >
      {/* Preview: a mini editor window, so the card hints at what opens */}
      <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-accent-soft via-surface to-canvas sm:h-52">
        <div
          aria-hidden
          className="absolute inset-0 opacity-60 [background-image:radial-gradient(var(--color-rule-strong)_1px,transparent_1px)] [background-size:18px_18px]"
        />
        <div className="relative w-[78%] rounded-xl border border-rule bg-canvas shadow-lg transition-transform duration-300 group-hover:scale-[1.03]">
          <div className="flex items-center gap-1.5 border-b border-rule px-3 py-2">
            <span className="size-2 rounded-full bg-rule-strong" />
            <span className="size-2 rounded-full bg-rule-strong" />
            <span className="size-2 rounded-full bg-rule-strong" />
            <span className="ml-2 truncate text-[11px] font-medium text-ink-faint">
              {f.title}.fig
            </span>
          </div>
          <div className="grid grid-cols-[28%_1fr] gap-3 p-3">
            <div className="space-y-1.5">
              <span className="block h-2 rounded bg-accent/30" />
              <span className="block h-2 w-3/4 rounded bg-rule" />
              <span className="block h-2 w-1/2 rounded bg-rule" />
            </div>
            <div className="h-16 rounded-md bg-accent-soft sm:h-20" />
          </div>
        </div>
        <span className="absolute top-3 right-3 rounded-full bg-canvas/90 px-2.5 py-1 text-[11px] font-semibold text-ink-soft shadow-sm">
          Figma
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
        <h3 className="display text-[1.5rem] sm:text-[1.75rem]">{f.title}</h3>
        <p className="text-[15px] leading-relaxed text-ink-soft">{f.description}</p>
        <ul className="flex flex-wrap gap-2" aria-label="Project tags">
          {f.tags.map((t) => (
            <li key={t}>
              <Pill>{t}</Pill>
            </li>
          ))}
        </ul>
        <span className="mt-auto inline-flex items-center gap-2 pt-2 text-[14.5px] font-semibold text-accent">
          View in Figma editor
          <span
            aria-hidden
            className="transition-transform duration-200 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  </Reveal>
  )
}
