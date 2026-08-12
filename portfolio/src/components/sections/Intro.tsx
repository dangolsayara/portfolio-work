import { site } from '../../content/site'
import type { IconName } from '../Icon'
import { Illustration } from '../Illustration'
import { Pill, Reveal, Section, SectionMark, Statement } from '../ui'

/* Personality before portfolio — but short. Two paragraphs, five words, one
   statement. Anything longer and nobody reaches the work. */

export function Intro() {
  const { intro } = site

  return (
    <Section id="intro" label="About the designer" className="pt-6 sm:pt-10 lg:pt-14">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
        <Reveal>
          <SectionMark label="Introduction" />
          <ul className="mt-7 flex flex-wrap gap-2">
            {intro.keywords.map((k, i) => (
              <li key={k.label}>
                <Pill tone={i === 0 ? 'accent' : 'neutral'} icon={k.icon as IconName}>
                  {k.label}
                </Pill>
              </li>
            ))}
          </ul>

          <Illustration scene="discover" height={168} className="mt-10 hidden lg:block" />
        </Reveal>

        <div>
          <Reveal>
            <h2 className="display text-[1.9rem] sm:text-[2.4rem] lg:text-[2.8rem]">
              {intro.heading}
            </h2>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="measure mt-6 text-[17px] leading-[1.65] text-ink sm:text-[18px]">
              {intro.lead}
            </p>
          </Reveal>

          {intro.body.map((para, i) => (
            <Reveal key={i} delay={0.09 + i * 0.04}>
              <p className="measure mt-5 text-[15.5px] leading-[1.75] text-ink-soft">{para}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-16 sm:mt-20">
        <Statement lines={intro.statement} />
      </div>
    </Section>
  )
}
