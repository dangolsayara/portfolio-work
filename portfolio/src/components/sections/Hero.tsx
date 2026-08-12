import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { site } from '../../content/site'
import { projects } from '../../content/projects'
import { Icon, type IconName } from '../Icon'
import { Illustration } from '../Illustration'
import { ActionLink, AnimatedNumber, Arrow, Container, MagneticLink, Pill } from '../ui'

/* ═══════════════════════════════════════════════════════════════════════════
   HERO
   One clear sentence, one primary action, three facts. The only motion is a
   status dot and a rotating principle card — enough personality to be
   memorable, not enough to get in the way of the headline.
   ═══════════════════════════════════════════════════════════════════════════ */

function RotatingPrinciple() {
  const [i, setI] = useState(0)
  const reduced = useReducedMotion()
  const items = site.hero.principles

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setI((v) => (v + 1) % items.length), 4400)
    return () => clearInterval(id)
  }, [items.length, reduced])

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <span className="label-sm">How I think</span>
        <span className="nums label-sm">
          {String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </span>
      </div>

      <div className="relative mt-4 h-14">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={i}
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 1 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 text-[17px] leading-snug font-medium tracking-[-0.015em] text-ink"
          >
            {items[i]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Progress ticks that double as a manual control */}
      <div className="mt-2 flex gap-1.5" role="group" aria-label="Choose a principle">
        {items.map((principle, k) => (
          <button
            key={principle}
            type="button"
            onClick={() => setI(k)}
            aria-label={principle}
            aria-pressed={k === i}
            className="group flex min-h-[36px] flex-1 items-center py-2"
          >
            <span
              className={`block h-[3px] rounded-full transition-colors duration-200 ${
                k === i ? 'bg-accent' : 'bg-rule-strong/70 group-hover:bg-rule-strong'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export function Hero() {
  const reduced = useReducedMotion()
  const { hero } = site
  const words = hero.headline.split(' ')
  const lastWord = words.pop() ?? ''

  const disciplines = new Set(projects.flatMap((p) => p.tags)).size

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 pb-14 sm:pt-32 sm:pb-20"
      aria-label="Introduction"
    >
      <div className="aurora pointer-events-none absolute inset-0" aria-hidden="true" />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[1.45fr_1fr] lg:items-center lg:gap-16">
          <div>
            <motion.div
              initial={reduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-positive/30 bg-positive-soft px-3 py-1.5">
                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                  {!reduced && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-positive opacity-70" />
                  )}
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-positive" />
                </span>
                <span className="flex items-center gap-1.5 text-[12.5px] font-semibold text-positive">
                  {hero.status.available ? hero.status.availableText : hero.status.currentText}
                </span>
              </span>
            </motion.div>

            <h1 className="display mt-7 text-[2.4rem] sm:text-[3.5rem] lg:text-[4.25rem]">
              {words.map((w, i) => (
                <span
                  key={`${w}-${i}`}
                  className="inline-block overflow-hidden pb-[0.08em] align-bottom"
                >
                  <motion.span
                    className="inline-block pr-[0.25em]"
                    initial={reduced ? { y: 0 } : { y: '105%' }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.05 + i * 0.03,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
              <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  className="inline-block text-accent"
                  initial={reduced ? { y: 0 } : { y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.05 + words.length * 0.03,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {lastWord}
                </motion.span>
              </span>
            </h1>

            <motion.div
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.35 }}
            >
              <p className="measure mt-6 text-[16.5px] leading-relaxed text-ink-soft sm:text-[18px]">
                {hero.subhead}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <MagneticLink
                  href="#work"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[14.5px] font-semibold text-accent-contrast transition-colors duration-200 hover:bg-accent-strong"
                >
                  <Icon name="grid" size={16} />
                  View my work <Arrow dir="down" />
                </MagneticLink>
                <ActionLink href={`mailto:${site.email}`} variant="outline">
                  Let's talk <Arrow dir="up-right" />
                </ActionLink>
                <ActionLink href={site.resumeUrl} variant="quiet" external className="ml-1">
                  Resume <Arrow dir="up-right" />
                </ActionLink>
              </div>

              {/* Three facts. Two are counted from the content, not typed. */}
              <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-rule pt-6 sm:grid-cols-3">
                {(
                  [
                    ['grid', 'Case studies', String(projects.length)],
                    ['layers', 'Disciplines', String(disciplines)],
                    ...hero.facts.map((f) => [f.icon, f.label, f.value]),
                  ] as [IconName, string, string][]
                ).map(([icon, label, value], i) => (
                  <div key={label} className="group">
                    <dt className="flex items-center gap-1.5">
                      <span className="text-accent">
                        <Icon name={icon} size={14} animate="draw" delay={0.5 + i * 0.08} />
                      </span>
                      <span className="label-sm">{label}</span>
                    </dt>
                    <dd className="mt-1.5 text-[19px] font-semibold tracking-[-0.02em]">
                      {i < 2 ? <AnimatedNumber value={value} /> : value}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>

          <motion.aside
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.45 }}
            className="space-y-4"
          >
            <RotatingPrinciple />

            <div className="card overflow-hidden">
              <Illustration scene="craft" height={132} className="bg-surface/60 px-4 pt-4" />
              <div className="p-6">
                <span className="flex items-center gap-1.5">
                  <span className="text-accent">
                    <Icon name="location" size={14} />
                  </span>
                  <span className="label-sm">Based in</span>
                </span>
                <p className="mt-2 text-[15px] font-medium">{site.location}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  <Pill tone="accent" icon="flow">
                    Product design
                  </Pill>
                  <Pill icon="cursor">UI/UX</Pill>
                  <Pill icon="box">Design systems</Pill>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>

        <motion.a
          href="#work"
          initial={reduced ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="group mt-14 inline-flex min-h-[44px] items-center gap-2 py-2 text-[13.5px] font-medium text-ink-faint transition-colors hover:text-ink"
        >
          {hero.scrollHint}
          <span className="grid h-7 w-7 place-items-center rounded-full border border-rule transition-transform duration-200 group-hover:translate-y-0.5">
            <Icon name="arrowDown" size={14} />
          </span>
        </motion.a>
      </Container>
    </section>
  )
}
