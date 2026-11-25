import { site } from '../../content/site'
import { Icon, type IconName } from '../Icon'
import { Pill, Reveal, Section, SectionMark, Statement } from '../ui'

/* One About section: introduction, story, focus areas and a facts panel,
   followed by the closing statement. */

function PortraitPlate() {
  return (
    <div className="card relative flex aspect-[4/5] w-full flex-col items-center justify-center overflow-hidden bg-surface">
      <div className="dot-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative flex flex-col items-center px-8 text-center">
        <span
          aria-hidden="true"
          className="grid h-20 w-20 place-items-center rounded-full border border-rule bg-canvas"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-9 w-9 text-ink-ghost"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <circle cx="12" cy="8.5" r="3.75" />
            <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
          </svg>
        </span>
        <p className="mt-5 text-[15px] font-semibold">Add your photo</p>
        <p className="mt-2 text-[13px] leading-relaxed text-ink-faint">
          Drop a portrait at <code className="rounded bg-canvas px-1 py-0.5">/public/portrait.jpg</code>{' '}
          and set <code className="rounded bg-canvas px-1 py-0.5">about.portrait</code> in site.ts.
        </p>
      </div>
    </div>
  )
}

export function AboutSection() {
  const { about, intro } = site

  return (
    <Section id="about" label="About" className="pt-6 sm:pt-10 lg:pt-14">
      <Reveal>
        <SectionMark label="About" />
      </Reveal>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
        <div>
          <Reveal>
            <h2 className="display text-[2rem] sm:text-[2.5rem] lg:text-[2.9rem]">
              {intro.heading}
            </h2>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="measure mt-6 text-[17px] leading-[1.65] text-ink sm:text-[18px]">
              {intro.lead}
            </p>
          </Reveal>

          {about.body.map((para, i) => (
            <Reveal key={i} delay={0.09 + i * 0.04}>
              <p className="measure mt-5 text-[15.5px] leading-[1.75] text-ink-soft">{para}</p>
            </Reveal>
          ))}

          <Reveal delay={0.2}>
            <ul className="mt-8 flex flex-wrap gap-2">
              {intro.keywords.map((k, i) => (
                <li key={k.label}>
                  <Pill tone={i === 0 ? 'accent' : 'neutral'} icon={k.icon as IconName}>
                    {k.label}
                  </Pill>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.08} className="lg:pt-2">
          {about.portrait ? (
            <img
              src={about.portrait}
              alt={`${site.name}, ${site.role}`}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full rounded-xl border border-rule bg-black object-cover object-[50%_15%]"
            />
          ) : (
            <PortraitPlate />
          )}

          <dl className="mt-6 overflow-hidden rounded-panel border border-rule">
            {about.facts.map((f, i) => (
              <div
                key={f.label}
                className={`flex items-baseline justify-between gap-4 px-5 py-3.5 ${
                  i % 2 ? 'bg-canvas' : 'bg-surface/70'
                }`}
              >
                <dt className="flex items-center gap-2">
                  <span className="text-accent">
                    <Icon name={f.icon as IconName} size={14} />
                  </span>
                  <span className="label-sm">{f.label}</span>
                </dt>
                <dd className="text-right text-[13.5px] text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <div className="mt-16 sm:mt-20">
        <Statement lines={intro.statement} />
      </div>
    </Section>
  )
}
