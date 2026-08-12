import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion'
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Icon, type IconName } from './Icon'

/* ═══════════════════════════════════════════════════════════════════════════
   SHARED UI
   Layout shells, editorial headings and the scroll-reveal primitives. Motion
   is fast and subtle: 150–300ms for micro-interactions, 400–700ms for
   structural transitions, and nothing at all when the visitor has asked for
   reduced motion.
   ═══════════════════════════════════════════════════════════════════════════ */

export function Container({
  children,
  className = '',
  wide = false,
}: {
  children: ReactNode
  className?: string
  wide?: boolean
}) {
  return (
    <div
      className={`mx-auto w-full px-6 sm:px-8 lg:px-12 ${
        wide ? 'max-w-[1560px]' : 'max-w-[1280px]'
      } ${className}`}
    >
      {children}
    </div>
  )
}

export function Section({
  id,
  children,
  className = '',
  label,
  bleed = false,
}: {
  id?: string
  children: ReactNode
  className?: string
  label?: string
  bleed?: boolean
}) {
  return (
    <section
      id={id}
      aria-label={label}
      className={`relative py-16 sm:py-20 lg:py-24 ${className}`}
    >
      {bleed ? children : <Container>{children}</Container>}
    </section>
  )
}

/** Section eyebrow. A small pill rather than a specimen tag — it reads as a
 *  signpost, which is what it is. `n` is accepted for compatibility with the
 *  older call sites but is no longer shown; the label does the work. */
export function SectionMark({
  n: _n,
  label,
  className = '',
}: {
  n?: string
  label: string
  className?: string
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-rule bg-surface px-3 py-1.5 ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
      <span className="label-sm">{label}</span>
    </div>
  )
}

export function SectionHead({
  n,
  label,
  title,
  support,
  align = 'left',
  className = '',
}: {
  n: string
  label: string
  title: ReactNode
  support?: string
  align?: 'left' | 'wide'
  className?: string
}) {
  return (
    <Reveal className={className}>
      <SectionMark n={n} label={label} className="mb-8" />
      <div
        className={
          align === 'wide'
            ? 'grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-16'
            : ''
        }
      >
        <h2 className="display max-w-[22ch] text-[2.25rem] leading-[0.98] sm:text-[3rem] lg:text-[3.75rem]">
          {title}
        </h2>
        {support && (
          <p className="measure text-[15px] leading-relaxed text-ink-soft sm:text-base">
            {support}
          </p>
        )}
      </div>
    </Reveal>
  )
}

/* ── Motion ────────────────────────────────────────────────────────────── */

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
  },
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'li' | 'span'
}) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as]

  if (reduced) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      variants={revealVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-12% 0px -8% 0px' }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  )
}

/** Reveals children one after another. Children should be <Reveal> or motion. */
export function Stagger({
  children,
  className = '',
  gap = 0.07,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  gap?: number
  as?: 'div' | 'ul' | 'ol'
}) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as]

  if (reduced) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px' }}
      variants={{ show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </MotionTag>
  )
}

export function StaggerItem({
  children,
  className = '',
  as = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'li'
}) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as]

  if (reduced) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag className={className} variants={revealVariants}>
      {children}
    </MotionTag>
  )
}

/** Line-by-line text reveal for editorial statements.
 *  The in-view test lives on the unclipped wrapper: a line translated 110% down
 *  is fully hidden by its overflow-hidden parent, and a clipped element never
 *  intersects the viewport — so `whileInView` on the line itself never fires. */
export function LineReveal({
  lines,
  className = '',
  lineClassName = '',
}: {
  lines: readonly string[]
  className?: string
  lineClassName?: string
}) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px -6% 0px' })

  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) =>
        reduced ? (
          <span key={line} className={`block ${lineClassName}`}>
            {line}
          </span>
        ) : (
          <span key={line} className="block overflow-hidden pb-[0.12em]">
            <motion.span
              className={`block ${lineClassName}`}
              initial={{ y: '110%' }}
              animate={inView ? { y: 0 } : { y: '110%' }}
              transition={{
                duration: 0.68,
                delay: i * 0.09,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {line}
            </motion.span>
          </span>
        )
      )}
    </div>
  )
}

/* ── Actions ───────────────────────────────────────────────────────────── */

const btnBase =
  'group inline-flex items-center justify-center gap-2 rounded-full text-[14.5px] font-semibold transition-colors duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]'

/** One primary, one secondary, one quiet. Every button is at least 44px tall. */
export function ActionLink({
  href,
  children,
  variant = 'solid',
  external = false,
  className = '',
  onClick,
}: {
  href: string
  children: ReactNode
  variant?: 'solid' | 'outline' | 'quiet'
  external?: boolean
  className?: string
  onClick?: () => void
}) {
  const styles = {
    solid: 'bg-accent text-accent-contrast px-6 py-3.5 hover:bg-accent-strong',
    outline:
      'border border-rule-strong bg-canvas px-6 py-3.5 text-ink hover:border-accent hover:text-accent',
    quiet: 'px-0 py-2 text-ink-soft hover:text-accent',
  }[variant]

  return (
    <a
      href={href}
      onClick={onClick}
      className={`${btnBase} ${styles} ${className}`}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
    >
      {children}
    </a>
  )
}

/* ── Small parts ───────────────────────────────────────────────────────── */

/** Status / category pill. `tone` classifies; it never just decorates. */
export function Pill({
  children,
  tone = 'neutral',
  icon,
  className = '',
}: {
  children: ReactNode
  tone?: 'neutral' | 'accent' | 'positive'
  icon?: IconName
  className?: string
}) {
  const styles = {
    neutral: 'border-rule bg-surface text-ink-soft',
    accent: 'border-accent/25 bg-accent-soft text-accent',
    positive: 'border-positive/25 bg-positive-soft text-positive',
  }[tone]
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12px] font-medium ${styles} ${className}`}
    >
      {icon && <Icon name={icon} size={13} />}
      {children}
    </span>
  )
}

/** Numbered step badge, used by the process and case-study chapters. */
export function StepBadge({
  n,
  active = false,
}: {
  n: string
  active?: boolean
}) {
  return (
    <span
      aria-hidden="true"
      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border text-[12.5px] font-semibold nums transition-colors duration-200 ${
        active
          ? 'border-accent bg-accent text-accent-contrast'
          : 'border-rule bg-surface text-ink-faint'
      }`}
    >
      {n}
    </span>
  )
}

/** Progressive disclosure for secondary detail. Native <details> so it works
 *  with keyboard, find-in-page and no JavaScript. */
export function Disclosure({
  summary,
  count,
  children,
  open = false,
}: {
  summary: string
  count?: number
  children: ReactNode
  open?: boolean
}) {
  return (
    <details open={open} className="group rounded-panel border border-rule bg-surface/60">
      <summary className="flex items-center justify-between gap-4 px-5 py-4 text-[14.5px] font-medium text-ink">
        <span className="flex items-center gap-2.5">
          {summary}
          {count !== undefined && (
            <span className="rounded-full bg-canvas px-2 py-0.5 text-[11.5px] text-ink-faint nums">
              {count}
            </span>
          )}
        </span>
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-rule bg-canvas text-ink-faint transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:rotate-180">
          <Icon name="chevronDown" size={15} />
        </span>
      </summary>
      <div className="border-t border-rule px-5 pt-5 pb-6">{children}</div>
    </details>
  )
}

/** Small arrow that travels on hover — 200ms, no bounce. */
export function Arrow({
  dir = 'right',
  size = 16,
}: {
  dir?: 'right' | 'up-right' | 'down'
  size?: number
}) {
  const name: IconName =
    dir === 'down' ? 'arrowDown' : dir === 'up-right' ? 'external' : 'arrowRight'
  const move = {
    right: 'group-hover:translate-x-1',
    'up-right': 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5',
    down: 'group-hover:translate-y-1',
  }[dir]
  return (
    <span className={`inline-flex transition-transform duration-200 ${move}`}>
      <Icon name={name} size={size} />
    </span>
  )
}

/** A short statement between sections, set in a card so it reads as a moment
 *  rather than stray text. */
export function Statement({
  lines,
  attribution,
}: {
  lines: readonly string[]
  attribution?: string
}) {
  return (
    <div className="card relative overflow-hidden px-7 py-12 sm:px-12 sm:py-16">
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 h-full w-1 bg-accent"
      />
      <LineReveal
        lines={lines}
        lineClassName="display text-[1.5rem] leading-[1.18] text-ink sm:text-[2rem] lg:text-[2.4rem]"
      />
      {attribution && <p className="label mt-8">{attribution}</p>}
    </div>
  )
}

/** Floating "back to top" affordance on long pages. */
export function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 1400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed right-4 bottom-4 z-40 grid h-11 w-11 place-items-center rounded-full border border-rule bg-canvas/90 text-ink-soft shadow-[0_8px_24px_-12px_rgb(16_24_40/0.3)] backdrop-blur transition-all duration-300 hover:text-accent sm:right-6 sm:bottom-6 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
    >
      <span className="sr-only">Back to top</span>
      <span className="rotate-180">
        <Icon name="arrowDown" size={17} />
      </span>
    </button>
  )
}

/* ── Numbers that count up ─────────────────────────────────────────────── */

/** Splits "−54%" into "−", 54, "%" so the digits can animate and the
 *  punctuation stays put. Returns null when there is nothing numeric. */
function splitNumber(value: string) {
  const m = value.match(/^([^\d]*?)([\d][\d.,]*)(.*)$/)
  if (!m) return null
  const digits = m[2].replace(/,/g, '')
  const n = Number(digits)
  if (!Number.isFinite(n)) return null
  return { prefix: m[1], n, suffix: m[3], decimals: (digits.split('.')[1] ?? '').length }
}

/** Counts a metric up when it scrolls into view. Falls back to the literal
 *  string for anything unparseable, and renders the final value immediately
 *  under reduced motion. */
export function AnimatedNumber({
  value,
  className = '',
  duration = 1.1,
}: {
  value: string
  className?: string
  duration?: number
}) {
  /* Memoised: `splitNumber` returns a fresh object every render, and using it
     as an effect dependency directly restarted the count on any parent
     re-render — which left numbers stuck partway up. */
  const parts = useMemo(() => splitNumber(value), [value])
  const reduced = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })
  const [progress, setProgress] = useState(0)

  const shouldAnimate = Boolean(parts) && !reduced

  useEffect(() => {
    if (!shouldAnimate || !inView) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000))
      /* easeOutExpo: quick, then settles — confident rather than sluggish. */
      setProgress(t === 1 ? 1 : 1 - Math.pow(2, -10 * t))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [shouldAnimate, inView, duration])

  if (!parts) return <span className={className}>{value}</span>

  const shown = shouldAnimate && inView ? parts.n * progress : parts.n

  return (
    <span ref={ref} className={className}>
      {parts.prefix}
      <span className="nums">
        {shown.toLocaleString(undefined, {
          minimumFractionDigits: parts.decimals,
          maximumFractionDigits: parts.decimals,
        })}
      </span>
      {parts.suffix}
    </span>
  )
}

/* ── Pointer-reactive primary action ──────────────────────────────────── */

/** The hero's main button leans very slightly toward the cursor. It is a 4px
 *  movement — enough to feel alive on approach, not enough to make the target
 *  move out from under anyone. Disabled entirely for reduced motion and for
 *  coarse pointers, where there is no hover to react to. */
export function MagneticLink({
  href,
  children,
  className = '',
  onClick,
}: {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
}) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLAnchorElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const fine =
    typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches

  const onMove = (e: React.PointerEvent) => {
    if (reduced || !fine || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    setOffset({
      x: ((e.clientX - (r.left + r.width / 2)) / r.width) * 8,
      y: ((e.clientY - (r.top + r.height / 2)) / r.height) * 6,
    })
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onPointerMove={onMove}
      onPointerLeave={() => setOffset({ x: 0, y: 0 })}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 260, damping: 22, mass: 0.4 }}
      className={className}
    >
      {children}
    </motion.a>
  )
}

/* ── Screen wake ───────────────────────────────────────────────────────── */

/** Mock screens settle into place as they enter the viewport — a 2% scale and
 *  a short fade, like a display waking up. Applied once, then it stays put. */
export function ScreenWake({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.975, y: 14 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
