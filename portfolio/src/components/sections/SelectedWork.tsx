import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { site } from '../../content/site'
import { projects } from '../../content/projects'
import { TAGS, type Tag } from '../../content/types'
import { ProjectCard } from '../ProjectCard'
import { Icon } from '../Icon'
import { TAG_ICON } from '../../lib/icons'
import { Reveal, Section, SectionMark } from '../ui'

/* Filtering is a segmented control with live counts, so it is always obvious
   what you are looking at and how to get back to everything. */

type Filter = 'All' | Tag

export function SelectedWork() {
  const [filter, setFilter] = useState<Filter>('All')
  const reduced = useReducedMotion()

  const filters = useMemo<Filter[]>(() => {
    const used = new Set(projects.flatMap((p) => p.tags))
    return ['All', ...TAGS.filter((t) => used.has(t))]
  }, [])

  const counts = useMemo(() => {
    const m = new Map<Filter, number>([['All', projects.length]])
    TAGS.forEach((t) => m.set(t, projects.filter((p) => p.tags.includes(t)).length))
    return m
  }, [])

  const shown = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.tags.includes(filter))),
    [filter]
  )

  return (
    <Section id="work" label="Selected work">
      <Reveal>
        <SectionMark label="Selected work" />
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
          <h2 className="display text-[2.15rem] sm:text-[2.75rem] lg:text-[3.25rem]">
            {site.work.heading}
          </h2>
          <p className="measure text-[15.5px] leading-relaxed text-ink-soft">
            {site.work.support}
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div
            className="no-scrollbar flex gap-1 overflow-x-auto rounded-full border border-rule bg-surface p-1"
            role="group"
            aria-label="Filter projects by discipline"
          >
            {filters.map((t) => {
              const active = filter === t
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setFilter(t)}
                  aria-pressed={active}
                  className={`relative shrink-0 rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-200 ${
                    active ? 'text-accent-contrast' : 'text-ink-faint hover:text-ink'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="work-filter-pill"
                      className="absolute inset-0 rounded-full bg-accent"
                      transition={
                        reduced
                          ? { duration: 0 }
                          : { type: 'spring', stiffness: 460, damping: 36 }
                      }
                    />
                  )}
                  <span className="relative flex items-center gap-1.5">
                    {t !== 'All' && <Icon name={TAG_ICON[t]} size={14} />}
                    {t === 'All' && <Icon name="grid" size={14} />}
                    {t}
                    <span className="nums opacity-70">{counts.get(t) ?? 0}</span>
                  </span>
                </button>
              )
            })}
          </div>

          <p aria-live="polite" className="shrink-0 text-[13px] text-ink-faint">
            Showing <span className="nums font-semibold text-ink">{shown.length}</span> of{' '}
            <span className="nums">{projects.length}</span>
          </p>
        </div>
      </Reveal>

      {/* Featured card, then a two-up grid on desktop. Same card, two sizes. */}
      <div className="mt-8 grid gap-6 sm:mt-10">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((project, i) => (
            <motion.div
              key={project.slug}
              layout={!reduced}
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 1 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={i === 0 ? '' : 'lg:hidden'}
            >
              <ProjectCard project={project} featured={i === 0} />
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="hidden gap-6 lg:grid lg:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.slice(1).map((project) => (
              <motion.div
                key={project.slug}
                layout={!reduced}
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 1 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {shown.length === 0 && (
        <div className="card mt-8 p-10 text-center">
          <p className="text-[15px] text-ink-soft">Nothing filed under that discipline yet.</p>
          <button
            type="button"
            onClick={() => setFilter('All')}
            className="mt-4 text-[14px] font-semibold text-accent"
          >
            Show all projects
          </button>
        </div>
      )}
    </Section>
  )
}
