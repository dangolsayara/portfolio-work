import { site } from '../../content/site'
import { Icon, IconTile, type IconName } from '../Icon'
import { Reveal, Section, SectionMark, Stagger, StaggerItem } from '../ui'

/* Categorised, not scored. No percentage bars: a number beside a tool name is
   a claim nobody can verify and everybody discounts. */

export function SkillsSection() {
  const { skills } = site

  return (
    <Section id="skills" label="Skills" className="bg-surface/45">
      <Reveal>
        <SectionMark label="Capability" />
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
          <h2 className="display text-[2.15rem] sm:text-[2.6rem] lg:text-[3rem]">
            {skills.heading}
          </h2>
          <p className="measure text-[15px] leading-relaxed text-ink-soft sm:text-base">
            {skills.support}
          </p>
        </div>
      </Reveal>

      <Stagger as="ul" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skills.groups.map((group, gi) => (
          <StaggerItem as="li" key={group.label} className="card h-full p-6">
            <div className="flex items-center gap-3">
              <IconTile name={group.icon as IconName} size="sm" delay={gi * 0.06} />
              <h3 className="text-[15.5px] font-semibold tracking-[-0.015em] text-ink">
                {group.label}
              </h3>
            </div>
            <ul className="mt-5 space-y-2.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="group flex items-baseline gap-2.5 text-[14.5px] leading-snug text-ink-soft"
                >
                  <span className="mt-[3px] text-ink-ghost transition-colors duration-200 group-hover:text-positive">
                    <Icon name="check" size={14} />
                  </span>
                  <span className="transition-colors duration-200 group-hover:text-ink">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
