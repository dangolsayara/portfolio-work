import { useState } from 'react'
import { learning } from '../../content/learning'
import { Reveal, Section, SectionMark } from '../ui'

function Num({ n }: { n: number }) {
  return (
    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent text-[13px] font-semibold text-accent-contrast">
      {n}
    </span>
  )
}

export function LearningSection() {
  const [i, setI] = useState(0)
  const t = learning.types[i]

  return (
    <Section id="learning" label={learning.label}>
      <Reveal>
        <SectionMark label={learning.label} />
        <h2 className="display mt-4 text-[1.75rem] sm:text-[2.25rem]">{learning.heading}</h2>
        <p className="mt-2 max-w-[62ch] text-[15px] leading-relaxed text-ink-soft">
          {learning.intro}
        </p>
      </Reveal>

      {/* What is a design system */}
      <Reveal delay={0.05}>
        <div className="card mt-8 grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h3 className="text-[17px] font-semibold">What is a design system?</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{learning.definition}</p>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2">
            {learning.parts.map((p, n) => (
              <li key={p.title} className="flex gap-3">
                <Num n={n + 1} />
                <div>
                  <p className="text-[14.5px] font-semibold">{p.title}</p>
                  <p className="text-[13.5px] leading-relaxed text-ink-soft">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      {/* Five types */}
      <Reveal delay={0.05}>
        <h3 className="mt-12 text-[17px] font-semibold">Five common types</h3>
        <div
          role="group"
          aria-label="Types of design systems"
          className="mt-4 flex flex-wrap gap-2"
        >
          {learning.types.map((x, n) => (
            <button
              key={x.name}
              type="button"
              aria-pressed={n === i}
              onClick={() => setI(n)}
              className={`min-h-11 rounded-full border px-4 text-[14px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                n === i
                  ? 'border-accent bg-accent text-accent-contrast'
                  : 'border-rule bg-surface text-ink-soft hover:border-accent hover:text-accent'
              }`}
            >
              {n + 1}. {x.name}
            </button>
          ))}
        </div>

        <div className="card mt-4 grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_2fr]" aria-live="polite">
          <div className="rounded-2xl bg-accent-soft p-5">
            <p className="text-[12px] font-bold tracking-wider text-accent uppercase">
              Type {String(i + 1).padStart(2, '0')}
            </p>
            <p className="display mt-2 text-[1.35rem]">{t.example}</p>
            <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft italic">{t.summary}</p>
          </div>
          <dl className="space-y-4">
            {[
              ['What it is', t.what],
              ['How it is used', t.how],
              ['Strength', t.strength],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[14.5px] font-semibold">{k}</dt>
                <dd className="mt-0.5 text-[14.5px] leading-relaxed text-ink-soft">{v}</dd>
              </div>
            ))}
            <div className="rounded-xl bg-surface px-4 py-3 text-[14px] font-semibold text-accent">
              Best fit: {t.fit}
            </div>
          </dl>
        </div>
      </Reveal>

      {/* Comparison */}
      <Reveal delay={0.05}>
        <h3 className="mt-12 text-[17px] font-semibold">How they compare</h3>
        <div className="card mt-4 overflow-x-auto p-0">
          <table className="w-full min-w-[560px] text-left text-[14px]">
            <thead>
              <tr className="bg-surface text-[12px] tracking-wider text-ink-soft uppercase">
                {['Type', 'Example', 'Primary goal', 'Governance'].map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 font-bold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {learning.types.map((x) => (
                <tr key={x.name} className="border-t border-rule">
                  <th scope="row" className="px-4 py-3 font-semibold text-accent">
                    {x.name}
                  </th>
                  <td className="px-4 py-3">{x.short}</td>
                  <td className="px-4 py-3 text-ink-soft">{x.goal}</td>
                  <td className="px-4 py-3 text-ink-soft">{x.governance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      {/* Takeaways */}
      <Reveal delay={0.05}>
        <h3 className="mt-12 text-[17px] font-semibold">Choosing the right approach</h3>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {learning.takeaways.map((k, n) => (
            <li key={k.title} className="card flex gap-3 p-5">
              <Num n={n + 1} />
              <div>
                <p className="text-[15px] font-semibold">{k.title}</p>
                <p className="mt-0.5 text-[14px] leading-relaxed text-ink-soft">{k.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
