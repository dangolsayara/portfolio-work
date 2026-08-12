import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { site } from '../../content/site'
import { Icon, type IconName } from '../Icon'
import { Illustration } from '../Illustration'
import { Reveal, Section, SectionMark } from '../ui'

/* Interactive tags. Selecting one prints its note in the panel below rather
   than floating text over the page — quieter, and readable on a phone. */

export function Curiosities() {
  const { curiosities } = site
  const [active, setActive] = useState(0)
  const reduced = useReducedMotion()

  return (
    <Section id="curious" label="Currently exploring">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <Reveal>
          <SectionMark label="Currently" />
          <h2 className="display mt-6 text-[2.15rem] sm:text-[2.5rem] lg:text-[2.9rem]">
            {curiosities.heading}
          </h2>
          <div className="card mt-8 min-h-[9rem] p-6">
            <motion.div
              key={active}
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="flex items-center gap-2 text-accent">
                <Icon name={curiosities.items[active].icon as IconName} size={18} animate="pop" />
              </span>
              <p className="label-sm mt-3 text-accent">
                {String(active + 1).padStart(2, '0')} / {String(curiosities.items.length).padStart(2, '0')}
              </p>
              <p className="measure mt-4 text-[1.05rem] leading-relaxed text-ink sm:text-[1.15rem]">
                {curiosities.items[active].note}
              </p>
            </motion.div>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <Illustration scene="talk" height={124} className="mb-6 hidden lg:block" />
          <ul className="flex flex-wrap gap-2.5">
            {curiosities.items.map((item, i) => {
              const on = active === i
              return (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-pressed={on}
                    className={`rounded-full border px-3.5 py-2.5 text-[14px] transition-colors duration-200 ${
                      on
                        ? 'border-accent bg-accent text-canvas'
                        : 'border-rule bg-white/50 text-ink-soft hover:border-ink/30 hover:text-ink'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Icon name={item.icon as IconName} size={15} />
                      {item.label}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
