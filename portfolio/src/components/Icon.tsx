import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

/* ═══════════════════════════════════════════════════════════════════════════
   ICONS
   One component, one registry, no dependency. Every icon is drawn on the same
   24×24 grid with a 1.6px stroke and inherits `currentColor`, so it works in
   both themes and next to any text size without looking bolted on.

   Icons are stored as primitive descriptions rather than raw markup, which is
   what lets any of them animate: `animate="draw"` strokes each shape in with
   `pathLength`, `animate="pop"` scales the whole mark in. Both no-op under
   `prefers-reduced-motion`.

   To add an icon: add a key to ICONS below. Keep to the same grid and the same
   optical weight — that consistency is the whole value of a bespoke set.
   ═══════════════════════════════════════════════════════════════════════════ */

type Shape =
  | ['p', string] // path
  | ['c', number, number, number] // circle: cx, cy, r
  | ['l', number, number, number, number] // line: x1, y1, x2, y2

export const ICONS: Record<string, Shape[]> = {
  /* ── Research & thinking ─────────────────────────────────────────────── */
  search: [
    ['c', 10.5, 10.5, 6.5],
    ['l', 15.3, 15.3, 21, 21],
  ],
  users: [
    ['c', 9, 8, 3.4],
    ['p', 'M2.5 20a6.5 6.5 0 0 1 13 0'],
    ['p', 'M16.8 5.3a3.4 3.4 0 0 1 0 5.4'],
    ['p', 'M18.2 20a6.6 6.6 0 0 0-2.4-4.6'],
  ],
  lightbulb: [
    ['p', 'M12 3a6 6 0 0 1 3.7 10.7c-.7.6-1.1 1.3-1.2 2.3H9.5c-.1-1-.5-1.7-1.2-2.3A6 6 0 0 1 12 3z'],
    ['l', 9.5, 19, 14.5, 19],
    ['l', 10.5, 21.5, 13.5, 21.5],
  ],
  brain: [
    ['p', 'M12 5.6A3.1 3.1 0 0 0 6.3 7a2.9 2.9 0 0 0-1.4 5.1 2.9 2.9 0 0 0 2.1 4.7A3.1 3.1 0 0 0 12 19V5.6z'],
    ['p', 'M12 5.6A3.1 3.1 0 0 1 17.7 7a2.9 2.9 0 0 1 1.4 5.1 2.9 2.9 0 0 1-2.1 4.7A3.1 3.1 0 0 1 12 19'],
  ],
  eye: [
    ['p', 'M2.6 12S6 6.2 12 6.2 21.4 12 21.4 12 18 17.8 12 17.8 2.6 12 2.6 12z'],
    ['c', 12, 12, 2.7],
  ],
  quote: [
    ['p', 'M9.6 6.2C6.6 7.7 5 10.2 5 13.2V18h5v-6H7.6c0-1.9.7-3.3 2-4.3l0-1.5z'],
    ['p', 'M18.6 6.2C15.6 7.7 14 10.2 14 13.2V18h5v-6h-2.4c0-1.9.7-3.3 2-4.3l0-1.5z'],
  ],

  /* ── Structure & craft ──────────────────────────────────────────────── */
  layers: [
    ['p', 'M12 3l8.5 4.4L12 11.8 3.5 7.4 12 3z'],
    ['p', 'M3.5 12.2L12 16.6l8.5-4.4'],
    ['p', 'M3.5 16.6L12 21l8.5-4.4'],
  ],
  grid: [
    ['p', 'M4 4h6.2v6.2H4z'],
    ['p', 'M13.8 4H20v6.2h-6.2z'],
    ['p', 'M4 13.8h6.2V20H4z'],
    ['p', 'M13.8 13.8H20V20h-6.2z'],
  ],
  flow: [
    ['c', 5.5, 5.5, 2.2],
    ['c', 5.5, 18.5, 2.2],
    ['c', 18.5, 12, 2.2],
    ['p', 'M7.7 5.5h4.6a4 4 0 0 1 4 4v0.3'],
    ['p', 'M7.7 18.5h4.6a4 4 0 0 0 4-4v-0.3'],
  ],
  sitemap: [
    ['p', 'M9.5 3.5h5v4h-5z'],
    ['p', 'M3.5 16.5h5v4h-5z'],
    ['p', 'M15.5 16.5h5v4h-5z'],
    ['p', 'M12 7.5V12'],
    ['p', 'M6 16.5V12h12v4.5'],
  ],
  pen: [
    ['p', 'M4 20.2l3.6-.9L20.1 6.8a2.4 2.4 0 0 0-3.4-3.4L4.2 16 3.3 19.6l.7.6z'],
    ['l', 15.3, 5, 18.5, 8.2],
  ],
  palette: [
    ['p', 'M12 21a9 9 0 1 1 9-9c0 2.4-1.9 3.6-3.9 3.6h-1.4a2 2 0 0 0-1.3 3.5A2 2 0 0 1 12 21z'],
    ['c', 8.4, 10.2, 1.1],
    ['c', 12, 7.6, 1.1],
    ['c', 15.6, 10, 1.1],
  ],
  type: [
    ['p', 'M4.5 7V5h15v2'],
    ['l', 12, 5, 12, 19],
    ['l', 9, 19, 15, 19],
  ],
  box: [
    ['p', 'M12 2.9l8 4.1v10L12 21.1 4 17V7l8-4.1z'],
    ['p', 'M4 7l8 4.1L20 7'],
    ['l', 12, 11.1, 12, 21.1],
  ],
  wand: [
    ['l', 4.8, 19.2, 14.6, 9.4],
    ['p', 'M15.2 3.4l.9 2 2 .9-2 .9-.9 2-.9-2-2-.9 2-.9.9-2z'],
    ['p', 'M19.6 12.4l.7 1.5 1.5.7-1.5.7-.7 1.5-.7-1.5-1.5-.7 1.5-.7.7-1.5z'],
  ],
  sparkle: [
    ['p', 'M11 3.2l1.7 4.4 4.4 1.7-4.4 1.7L11 15.4 9.3 11 4.9 9.3 9.3 7.6 11 3.2z'],
    ['p', 'M18.2 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2z'],
  ],

  /* ── Testing & outcome ──────────────────────────────────────────────── */
  flask: [
    ['l', 9, 3, 15, 3],
    ['p', 'M10 3v5.6L5.6 17a3 3 0 0 0 2.6 4.5h7.6a3 3 0 0 0 2.6-4.5L14 8.6V3'],
    ['l', 7.6, 14.6, 16.4, 14.6],
  ],
  target: [
    ['c', 12, 12, 8.5],
    ['c', 12, 12, 4.4],
    ['c', 12, 12, 1],
  ],
  chart: [
    ['p', 'M4 4v16h16'],
    ['l', 8, 20, 8, 14],
    ['l', 12.5, 20, 12.5, 9],
    ['l', 17, 20, 17, 11.5],
  ],
  trend: [
    ['p', 'M3.5 17.5l5-5 3.5 3.5 7-7'],
    ['p', 'M14.5 9h5v5'],
  ],
  check: [['p', 'M4.5 12.6l4.9 4.9L19.5 6.6']],
  x: [
    ['l', 6, 6, 18, 18],
    ['l', 18, 6, 6, 18],
  ],
  shield: [
    ['p', 'M12 3l7.5 2.8v6c0 4.3-3 8-7.5 9.4C7.5 19.8 4.5 16.1 4.5 11.8v-6L12 3z'],
    ['p', 'M9 12.2l2.2 2.2 4-4.4'],
  ],

  /* ── Platform & artefacts ───────────────────────────────────────────── */
  monitor: [
    ['p', 'M3.2 5h17.6v11H3.2z'],
    ['l', 9, 20, 15, 20],
    ['l', 12, 16, 12, 20],
  ],
  phone: [
    ['p', 'M7.6 2.8h8.8a2 2 0 0 1 2 2v14.4a2 2 0 0 1-2 2H7.6a2 2 0 0 1-2-2V4.8a2 2 0 0 1 2-2z'],
    ['l', 10.5, 18.4, 13.5, 18.4],
  ],
  calendar: [
    ['p', 'M4 6.2h16V21H4z'],
    ['l', 4, 10.6, 20, 10.6],
    ['l', 8.4, 3.4, 8.4, 7.4],
    ['l', 15.6, 3.4, 15.6, 7.4],
  ],
  clock: [
    ['c', 12, 12, 8.5],
    ['p', 'M12 7.4V12l3.4 2'],
  ],
  briefcase: [
    ['p', 'M3.5 7.8h17V20h-17z'],
    ['p', 'M9 7.8V5.4h6v2.4'],
    ['l', 3.5, 13, 20.5, 13],
  ],
  graduation: [
    ['p', 'M2.5 9L12 5l9.5 4L12 13 2.5 9z'],
    ['p', 'M6.6 11v4.6c0 1.6 2.4 2.7 5.4 2.7s5.4-1.1 5.4-2.7V11'],
  ],
  book: [
    ['p', 'M4.5 4.8A1.8 1.8 0 0 1 6.3 3H19.5v15.4H6.3a1.8 1.8 0 0 0-1.8 1.8V4.8z'],
    ['p', 'M19.5 18.4H6.3a1.8 1.8 0 0 0-1.8 1.8'],
  ],
  docs: [
    ['p', 'M6.5 3.5h8L18 7v13.5h-11.5z'],
    ['p', 'M14 3.5V7h3.5'],
    ['l', 9.5, 12, 15, 12],
    ['l', 9.5, 15.5, 15, 15.5],
  ],
  map: [
    ['p', 'M9 3.5L3.5 6v14.5L9 18l6 2.5 5.5-2.5V3.5L15 6 9 3.5z'],
    ['l', 9, 3.5, 9, 18],
    ['l', 15, 6, 15, 20.5],
  ],
  code: [
    ['p', 'M8.6 8.4L4.6 12l4 3.6'],
    ['p', 'M15.4 8.4l4 3.6-4 3.6'],
    ['l', 13.4, 5, 10.6, 19],
  ],
  cursor: [
    ['p', 'M6.6 3.4v14.8l4-3.3 2.6 5.5 2.3-1.1-2.6-5.5 5-.6L6.6 3.4z'],
  ],
  filter: [
    ['l', 4, 6.5, 20, 6.5],
    ['l', 7, 12, 17, 12],
    ['l', 10, 17.5, 14, 17.5],
  ],
  accessibility: [
    ['c', 12, 4.4, 1.7],
    ['l', 4.5, 8.8, 19.5, 8.8],
    ['l', 12, 8.8, 12, 13.6],
    ['p', 'M12 13.6L9 20.4'],
    ['p', 'M12 13.6l3 6.8'],
  ],
  motion: [
    ['c', 6, 12, 2.6],
    ['p', 'M10 12h4'],
    ['p', 'M14.5 8.4l3.6 3.6-3.6 3.6'],
    ['p', 'M20.5 7v10'],
  ],
  heart: [
    ['p', 'M12 20.4S3.6 15.2 3.6 9.6A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8.4 2.6c0 5.6-8.4 10.8-8.4 10.8z'],
  ],
  message: [
    ['p', 'M4 5h16v10.5h-8.5L6.5 19.5V15.5H4z'],
    ['l', 8, 8.6, 16, 8.6],
    ['l', 8, 11.8, 13, 11.8],
  ],
  location: [
    ['p', 'M12 21s6.4-6 6.4-10.5A6.4 6.4 0 0 0 5.6 10.5C5.6 15 12 21 12 21z'],
    ['c', 12, 10.4, 2.4],
  ],
  star: [
    ['p', 'M12 3.6l2.6 5.5 6 .8-4.4 4.1 1.1 5.9-5.3-2.9-5.3 2.9 1.1-5.9L3.4 9.9l6-.8L12 3.6z'],
  ],

  /* ── Navigation & actions ───────────────────────────────────────────── */
  mail: [
    ['p', 'M3.5 6h17v12h-17z'],
    ['p', 'M3.5 7l8.5 6 8.5-6'],
  ],
  download: [
    ['l', 12, 4, 12, 15.4],
    ['p', 'M7.8 11.4L12 15.6l4.2-4.2'],
    ['l', 4.5, 20, 19.5, 20],
  ],
  external: [
    ['p', 'M14 4h6v6'],
    ['l', 20, 4, 11.5, 12.5],
    ['p', 'M18 13.6V20H4V6h6.4'],
  ],
  arrowRight: [
    ['l', 4, 12, 18.6, 12],
    ['p', 'M13 6l6 6-6 6'],
  ],
  arrowDown: [
    ['l', 12, 4, 12, 18.6],
    ['p', 'M6 13l6 6 6-6'],
  ],
  chevronDown: [['p', 'M6 9.6l6 6 6-6']],
  sun: [
    ['c', 12, 12, 4],
    ['l', 12, 3, 12, 5],
    ['l', 12, 19, 12, 21],
    ['l', 3, 12, 5, 12],
    ['l', 19, 12, 21, 12],
    ['l', 5.6, 5.6, 7, 7],
    ['l', 17, 17, 18.4, 18.4],
    ['l', 18.4, 5.6, 17, 7],
    ['l', 7, 17, 5.6, 18.4],
  ],
  moon: [['p', 'M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z']],

  /* ── Social ──────────────────────────────────────────────────────────── */
  linkedin: [
    ['l', 6, 9.6, 6, 18.6],
    ['c', 6, 5.8, 1.4],
    ['l', 11, 18.6, 11, 9.6],
    ['p', 'M11 13.4c0-2.1 1.3-3.4 3-3.4s3 1.3 3 3.6v5'],
  ],
  dribbble: [
    ['c', 12, 12, 9],
    ['p', 'M5 7.4c4.1 5 9.2 6.6 14.7 5.9'],
    ['p', 'M8.5 3.6c4 4 6.4 9.5 7 16.3'],
    ['p', 'M20.4 9.2c-6.6.6-11.5 4.3-13.8 9.6'],
  ],
  behance: [
    ['p', 'M3.5 6.4h5.2a2.9 2.9 0 0 1 0 5.8H3.5z'],
    ['p', 'M3.5 12.2h5.8a2.9 2.9 0 0 1 0 5.8H3.5z'],
    ['p', 'M14 14.6h6.5a3.2 3.2 0 1 0-.6 2.4'],
    ['l', 15, 8.6, 20, 8.6],
  ],
  github: [
    [
      'p',
      'M15.4 21v-3.1c1.9-.3 3.4-1.4 3.4-4 0-1-.4-1.9-1-2.6.1-.3.4-1.4-.1-2.9 0 0-1.2-.4-3.7 1.1a8.6 8.6 0 0 0-4 0C7.5 8 6.3 8.4 6.3 8.4c-.5 1.5-.2 2.6-.1 2.9-.6.7-1 1.6-1 2.6 0 2.6 1.5 3.7 3.4 4-.3.4-.5.9-.6 1.5V21',
    ],
    ['p', 'M8 18.6c-2 .6-2.8-.8-3.2-1.3'],
  ],
}

export type IconName = keyof typeof ICONS

export function Icon({
  name,
  size = 20,
  className = '',
  animate = 'none',
  delay = 0,
  strokeWidth = 1.6,
}: {
  name: IconName
  size?: number
  className?: string
  /** 'draw' strokes each shape in; 'pop' scales the mark in; 'none' is static. */
  animate?: 'draw' | 'pop' | 'none'
  delay?: number
  strokeWidth?: number
}) {
  /* A missing key should never take a page down — fall back to a neutral dot
     and warn in development instead. */
  const shapes = ICONS[name] ?? ICONS.check
  if (import.meta.env.DEV && !ICONS[name]) {
    console.warn(`[Icon] unknown icon "${String(name)}"`)
  }
  const reduced = useReducedMotion()
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })

  const still = reduced || animate === 'none'

  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    vectorEffect: 'non-scaling-stroke' as const,
  }

  const render = (shape: Shape, i: number) => {
    /* Each shape strokes itself in sequence. Under reduced motion — or when the
       icon is static — the final state is rendered immediately. */
    const anim = still
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          animate: inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 },
          transition: {
            pathLength: { duration: 0.55, delay: delay + i * 0.09, ease: [0.22, 1, 0.36, 1] as const },
            opacity: { duration: 0.12, delay: delay + i * 0.09 },
          },
        }

    if (shape[0] === 'c') {
      return <motion.circle key={i} cx={shape[1]} cy={shape[2]} r={shape[3]} {...common} {...anim} />
    }
    if (shape[0] === 'l') {
      return (
        <motion.line
          key={i}
          x1={shape[1]}
          y1={shape[2]}
          x2={shape[3]}
          y2={shape[4]}
          {...common}
          {...anim}
        />
      )
    }
    return <motion.path key={i} d={shape[1]} {...common} {...anim} />
  }

  const pop =
    still || animate !== 'pop'
      ? {}
      : {
          initial: { scale: 0.6, opacity: 0 },
          animate: inView ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 },
          transition: { duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] as const },
        }

  return (
    <motion.svg
      ref={ref}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`shrink-0 ${className}`}
      aria-hidden="true"
      focusable="false"
      {...pop}
    >
      {shapes.map(render)}
    </motion.svg>
  )
}

/* ── Icon in a tile ──────────────────────────────────────────────────────
   The pattern used for every feature/step/principle: a rounded tile that tints
   on hover, so the icon reads as part of a control rather than decoration. */

export function IconTile({
  name,
  tone = 'accent',
  size = 'md',
  animate = 'draw',
  delay = 0,
  className = '',
}: {
  name: IconName
  tone?: 'accent' | 'positive' | 'neutral'
  size?: 'sm' | 'md' | 'lg'
  animate?: 'draw' | 'pop' | 'none'
  delay?: number
  className?: string
}) {
  const box = { sm: 'h-9 w-9 rounded-[0.65rem]', md: 'h-11 w-11 rounded-[0.8rem]', lg: 'h-14 w-14 rounded-[1rem]' }[
    size
  ]
  const glyph = { sm: 17, md: 20, lg: 26 }[size]
  const tones = {
    accent: 'border-accent/20 bg-accent-soft text-accent',
    positive: 'border-positive/20 bg-positive-soft text-positive',
    neutral: 'border-rule bg-surface text-ink-soft',
  }[tone]

  return (
    <span
      className={`grid shrink-0 place-items-center border transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-3 group-hover:scale-105 ${box} ${tones} ${className}`}
    >
      <Icon name={name} size={glyph} animate={animate} delay={delay} />
    </span>
  )
}
