import { site } from '../../content/site'
import { IconTile } from '../Icon'
import type { IconName } from '../Icon'
import { Illustration } from '../Illustration'
import { Pill, Reveal, Section, SectionMark, Stagger, StaggerItem, Statement } from '../ui'

/* Every step shows its detail without being hovered or clicked. The old version
   hid the substance behind an interaction, which meant most visitors — and
   every phone — never saw it. */

export function ProcessSection() {
  const { process } = site

  return (
    <Section id="process" label="Design process" className="bg-surface/60">
      <Reveal>
        <SectionMark label="Process" />
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-start lg:gap-16">
          <h2 className="display text-[2.15rem] sm:text-[2.6rem] lg:text-[3rem]">
            {process.heading}
          </h2>
          <div className="flex flex-col items-start gap-4 lg:pt-3">
            <p className="measure text-[15.5px] leading-relaxed text-ink-soft">
              {process.support}
            </p>
            <Illustration scene="structure" height={116} className="hidden w-full sm:block" />
          </div>
        </div>
      </Reveal>

      <Stagger as="ol" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {process.steps.map((step, i) => (
          <StaggerItem
            as="li"
            key={step.n}
            className={`card card-hover flex h-full flex-col p-6 ${
              i === process.steps.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''
            }`}
          >
            <div className="flex items-center gap-3.5">
              <IconTile name={step.icon as IconName} delay={i * 0.05} />
              <div>
                <span className="nums label-sm text-accent">{step.n}</span>
                <h3 className="mt-1 text-[17px] font-semibold tracking-[-0.02em]">
                  {step.title}
                </h3>
              </div>
            </div>

            <p className="mt-4 text-[15px] leading-relaxed font-medium text-ink">
              {step.short}
            </p>
            <p className="mt-3 text-[14.5px] leading-[1.7] text-ink-soft">{step.detail}</p>

            <div className="mt-5 flex flex-wrap gap-1.5 border-t border-rule pt-4">
              {step.artifact.split(' · ').map((a) => (
                <Pill key={a}>{a}</Pill>
              ))}
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <div className="mt-12">
        <Statement lines={process.statement} />
      </div>
    </Section>
  )
}
