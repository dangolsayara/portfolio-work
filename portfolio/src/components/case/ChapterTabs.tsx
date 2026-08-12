import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { CHAPTER_ICON } from '../../lib/icons'
import { Icon } from '../Icon'

/* ═══════════════════════════════════════════════════════════════════════════
   CHAPTER TABS
   A sticky, horizontally scrollable tab bar with a progress line. It replaces
   the thin right-hand rail from the first version — that was elegant and
   almost undiscoverable, and it did not exist at all on a phone.
   ═══════════════════════════════════════════════════════════════════════════ */

export function ChapterTabs({
  chapters,
}: {
  chapters: readonly { id: string; label: string }[]
}) {
  const [active, setActive] = useState(chapters[0]?.id ?? '')
  const listRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 30, mass: 0.3 })

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const seen = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (seen) setActive(seen.target.id)
      },
      { rootMargin: '-22% 0px -65% 0px' }
    )
    chapters.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [chapters])

  /* Keep the active tab in view as you scroll the page. */
  useEffect(() => {
    const list = listRef.current
    const el = list?.querySelector<HTMLElement>(`[data-tab="${active}"]`)
    if (!list || !el) return
    const left = el.offsetLeft - list.clientWidth / 2 + el.clientWidth / 2
    list.scrollTo({ left, behavior: reduced ? 'auto' : 'smooth' })
  }, [active, reduced])

  return (
    <div className="sticky top-14 z-30 -mx-px border-y border-rule bg-canvas/85 backdrop-blur-xl">
      <div
        ref={listRef}
        className="no-scrollbar mx-auto flex max-w-[1280px] gap-1 overflow-x-auto px-4 py-2.5 sm:px-8"
        role="navigation"
        aria-label="Case study chapters"
      >
        {chapters.map(({ id, label }, i) => {
          const on = active === id
          return (
            <a
              key={id}
              href={`#${id}`}
              data-tab={id}
              aria-current={on ? 'true' : undefined}
              className={`shrink-0 rounded-full px-3.5 py-2 text-[13px] font-medium whitespace-nowrap transition-colors duration-200 ${
                on
                  ? 'bg-accent-soft text-accent'
                  : 'text-ink-faint hover:bg-surface hover:text-ink'
              }`}
            >
              <span className="inline-flex items-center gap-1.5">
                <Icon name={CHAPTER_ICON[id] ?? 'arrowRight'} size={14} />
                <span className="nums">{String(i + 1).padStart(2, '0')}</span>
                {label}
              </span>
            </a>
          )
        })}
      </div>

      {!reduced && (
        <motion.div
          className="h-[2px] origin-left bg-accent"
          style={{ scaleX: progress }}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
