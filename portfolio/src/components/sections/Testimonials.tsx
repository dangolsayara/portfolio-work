import { site } from '../../content/site'
import { Reveal, Section, SectionMark } from '../ui'

/* Renders nothing until `site.testimonials` has real entries. An invented quote
   is worse than no quote — recruiters check. */

export function Testimonials() {
  const items = site.testimonials
  if (items.length === 0) return null

  return (
    <Section id="testimonials" label="Testimonials">
      <Reveal>
        <SectionMark label="Testimonials" />
        <h2 className="display mt-6 text-[2.15rem] sm:text-[2.6rem] lg:text-[3rem]">
          Nice things people have said.
        </h2>
      </Reveal>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2">
        {items.map((t, i) => (
          <Reveal as="li" key={i} delay={i * 0.05} className="card p-7 sm:p-9">
            <blockquote className="text-[1.15rem] leading-[1.45] font-medium tracking-[-0.015em] text-ink sm:text-[1.3rem]">
              “{t.quote}”
            </blockquote>
            <footer className="mt-7 border-t border-rule pt-4">
              <p className="text-[14.5px] font-medium text-ink">{t.person}</p>
              <p className="apparatus-sm mt-2">
                {t.role} · {t.company}
              </p>
            </footer>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
