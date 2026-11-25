import { useState } from 'react'
import { designToCode as d } from '../../content/designToCode'
import { Pill, Reveal, Section, SectionMark } from '../ui'

type Tab = 'html' | 'css'

export function DesignToCode() {
  const [tab, setTab] = useState<Tab>('css')

  return (
    <Section id="design-to-code" label={d.label}>
      <Reveal>
        <SectionMark label={d.label} />
        <h2 className="display mt-4 text-[1.75rem] sm:text-[2.25rem]">{d.heading}</h2>
        <p className="mt-2 max-w-[62ch] text-[15px] leading-relaxed text-ink-soft">{d.intro}</p>
      </Reveal>

      {/* Design on the left, the code it becomes on the right */}
      <Reveal delay={0.05}>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className="card flex flex-col overflow-hidden p-0">
            <div className="flex items-center justify-between border-b border-rule bg-surface px-4 py-2.5">
              <span className="text-[13px] font-semibold">Figma design</span>
              <span className="text-[12px] text-ink-faint">Button / Primary</span>
            </div>
            <div className="relative grid flex-1 place-items-center bg-accent-soft/50 p-10 [background-image:radial-gradient(var(--color-rule-strong)_1px,transparent_1px)] [background-size:18px_18px]">
              <div className="relative">
                <span className="inline-flex items-center rounded-xl bg-accent px-5 py-3 text-[15px] font-semibold text-accent-contrast shadow-md">
                  Get started
                </span>
                {/* Figma-style selection box with spacing handles */}
                <span aria-hidden className="pointer-events-none absolute -inset-1.5 rounded-[14px] border border-accent" />
                <span aria-hidden className="absolute -top-6 left-1/2 -translate-x-1/2 rounded bg-accent px-1.5 py-0.5 text-[10px] font-semibold text-accent-contrast">
                  hug × 48
                </span>
              </div>
            </div>
          </div>

          <div className="card flex flex-col overflow-hidden p-0">
            <div role="tablist" aria-label="Code sample" className="flex border-b border-rule bg-surface">
              {(['html', 'css'] as Tab[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  aria-selected={tab === t}
                  onClick={() => setTab(t)}
                  className={`min-h-11 px-5 text-[13px] font-semibold uppercase transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent ${
                    tab === t ? 'border-b-2 border-accent text-accent' : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <pre
              role="tabpanel"
              tabIndex={0}
              className="flex-1 overflow-x-auto bg-ink p-5 text-[13px] leading-relaxed text-canvas focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
            >
              <code>{d.samples[tab]}</code>
            </pre>
          </div>
        </div>
      </Reveal>

      {/* Process */}
      <Reveal delay={0.05}>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {d.steps.map((s, n) => (
            <li key={s.title} className="card p-5">
              <span className="grid size-7 place-items-center rounded-full bg-accent text-[13px] font-semibold text-accent-contrast">
                {n + 1}
              </span>
              <p className="mt-3 text-[15px] font-semibold">{s.title}</p>
              <p className="mt-1 text-[13.5px] leading-relaxed text-ink-soft">{s.text}</p>
            </li>
          ))}
        </ol>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Front-end skills">
          {d.skills.map((s) => (
            <li key={s}>
              <Pill tone="accent">{s}</Pill>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
