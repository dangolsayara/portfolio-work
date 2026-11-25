import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { site } from '../../content/site'
import { Icon, IconTile } from '../Icon'
import { ActionLink, Arrow, Reveal, Section, SectionMark } from '../ui'

/* A vertical timeline whose meridian draws itself as you scroll — the rule is
   the only thing that moves, and it stops moving if you have asked it to. */

export function ExperienceTimeline() {
  const { experience } = site
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 70%', 'end 55%'],
  })
  const raw = useTransform(scrollYProgress, [0, 1], [0, 1])
  const progress = useSpring(raw, { stiffness: 110, damping: 26, mass: 0.4 })

  return (
    <Section id="experience" label="Experience">
      <Reveal>
        <SectionMark label="Experience" />
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
          <h2 className="display text-[2.15rem] sm:text-[2.6rem] lg:text-[3rem]">
            {experience.heading}
          </h2>
          <div className="flex flex-col items-start gap-6">
            <p className="measure text-[15px] leading-relaxed text-ink-soft sm:text-base">
              {experience.support}
            </p>
            <ActionLink href={site.resumeUrl} variant="outline" external>
              Download Resume <Arrow dir="down" />
            </ActionLink>
          </div>
        </div>
      </Reveal>

      <div ref={ref} className="relative mt-16 pl-8 sm:pl-14">
        {/* The meridian */}
        <div className="absolute top-2 bottom-2 left-[3px] w-px bg-rule sm:left-[5px]" aria-hidden="true">
          <motion.div
            className="absolute inset-x-0 top-0 origin-top bg-accent"
            style={
              reduced
                ? { height: '100%' }
                : { height: '100%', scaleY: progress }
            }
          />
        </div>

        <ol className="space-y-14 sm:space-y-20">
          {experience.roles.map((role, i) => (
            <Reveal as="li" key={`${role.company}-${i}`} delay={i * 0.05} className="relative">
              <span
                className="absolute top-[9px] -left-8 h-[7px] w-[7px] rounded-full border border-accent bg-canvas sm:-left-14 sm:h-2.5 sm:w-2.5"
                aria-hidden="true"
              />
              <div className="card p-6 sm:p-7">
                <div className="flex items-start gap-3.5">
                  <IconTile name="briefcase" size="sm" delay={i * 0.05} />
                  <div className="flex flex-wrap items-center gap-2 pt-1.5">
                    <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[12px] font-semibold text-accent">
                      {role.dates}
                    </span>
                    <span className="flex items-center gap-1 label-sm">
                      <Icon name="location" size={12} />
                      {role.location}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="display text-[1.35rem] sm:text-[1.6rem]">{role.role}</h3>
                  <p className="mt-1.5 text-[15px] font-medium text-ink-soft">{role.company}</p>
                  <p className="measure mt-4 text-[15px] leading-[1.7] text-ink-soft">
                    {role.description}
                  </p>
                  <ul className="mt-5 grid gap-2.5 sm:grid-cols-2 sm:gap-x-8">
                    {role.responsibilities.map((r) => (
                      <li
                        key={r}
                        className="flex gap-2.5 text-[14px] leading-relaxed text-ink-faint"
                      >
                        <span
                          className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-rule-strong"
                          aria-hidden="true"
                        />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal as="li" className="relative">
            <span
              className="absolute top-[9px] -left-8 h-[7px] w-[7px] rounded-full border border-rule bg-canvas sm:-left-14 sm:h-2.5 sm:w-2.5"
              aria-hidden="true"
            />
            <div className="grid gap-4 lg:grid-cols-[10rem_1fr] lg:gap-12">
              <p className="flex items-center gap-2">
                <span className="text-accent">
                  <Icon name="graduation" size={15} />
                </span>
                <span className="label-sm">{experience.education.label}</span>
              </p>
              <ul className="grid gap-3 sm:grid-cols-3">
                {experience.education.items.map((e) => (
                  <li key={e.school} className="card flex flex-col gap-1.5 p-4">
                    <span className="w-fit rounded-full bg-accent-soft px-2.5 py-0.5 text-[11.5px] font-semibold text-accent">
                      {e.level}
                    </span>
                    <p className="mt-1 text-[15px] leading-snug font-semibold">{e.title}</p>
                    <p className="text-[13.5px] text-ink-soft">{e.school}</p>
                    <p className="nums mt-auto pt-2 text-[12.5px] font-medium text-ink-faint">
                      {e.period}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </ol>
      </div>
    </Section>
  )
}
