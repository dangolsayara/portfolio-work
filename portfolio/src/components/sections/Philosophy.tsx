import { site } from '../../content/site'
import { IconTile, type IconName } from '../Icon'
import { Reveal, Section, SectionMark } from '../ui'

/* Five beliefs. Each carries a small drawn interaction that animates on hover —
   the mark is a diagram of the principle, not an icon set. */

export function Philosophy() {
  const { philosophy } = site

  return (
    <Section id="philosophy" label="Design philosophy">
      <Reveal>
        <SectionMark label="Philosophy" />
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
          <h2 className="display text-[2.15rem] sm:text-[2.6rem] lg:text-[3rem]">
            {philosophy.heading}
          </h2>
          <p className="measure text-[15.5px] leading-relaxed text-ink-soft">
            {philosophy.support}
          </p>
        </div>
      </Reveal>

      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {philosophy.principles.map((p, i) => (
          <Reveal
            as="li"
            key={p.n}
            delay={i * 0.05}
            className={`card card-hover group relative p-6 sm:p-8 ${
              i === philosophy.principles.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''
            }`}
          >
            <div className="flex h-full flex-col gap-6">
              <div className="flex items-center gap-3.5">
                <IconTile name={p.icon as IconName} delay={i * 0.05} />
                <span className="nums label-sm text-accent">{p.n}</span>
              </div>
              <div>
                <h3
                  className="display text-[1.25rem] text-ink sm:text-[1.45rem]"
                >
                  {p.title}
                </h3>
                <p className="measure mt-4 text-[14.5px] leading-[1.7] text-ink-soft">
                  {p.body}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
