import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

/* ═══════════════════════════════════════════════════════════════════════════
   SPOT ILLUSTRATIONS
   Five drawn scenes that stroke themselves in as they scroll into view, then
   hold a slow ambient drift. They are abstract on purpose — a diagram of the
   idea rather than a picture of a person, which keeps them relevant when the
   copy changes and keeps the file size at zero.

   Every scene is built from the same vocabulary as the icons: 1.6px strokes,
   one accent, generous empty space. Under `prefers-reduced-motion` they render
   complete and still.
   ═══════════════════════════════════════════════════════════════════════════ */

export type Scene = 'discover' | 'structure' | 'craft' | 'measure' | 'talk'

const ACCENT = 'var(--accent)'
const RULE = 'var(--rule-strong)'
const SOFT = 'var(--accent-soft)'

export function Illustration({
  scene,
  className = '',
  height = 200,
}: {
  scene: Scene
  className?: string
  height?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const on = reduced || inView

  /* Shared stroke-in for outline shapes. */
  const draw = (i: number, dur = 0.7) =>
    reduced
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          animate: on ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 },
          transition: {
            pathLength: { duration: dur, delay: 0.05 + i * 0.11, ease: [0.22, 1, 0.36, 1] as const },
            opacity: { duration: 0.15, delay: 0.05 + i * 0.11 },
          },
        }

  /* Shared fade-and-rise for filled shapes. `to` lets translucent fills settle
     at their own opacity instead of being animated to a flat 1. */
  const rise = (i: number, to = 1) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 10 },
          animate: on ? { opacity: to, y: 0 } : { opacity: 0, y: 10 },
          transition: { duration: 0.5, delay: 0.15 + i * 0.09, ease: [0.22, 1, 0.36, 1] as const },
        }

  /* A slow drift that keeps the scene alive without asking for attention. */
  const float = (range = 5, dur = 7) =>
    reduced
      ? {}
      : {
          animate: { y: [0, -range, 0] },
          transition: { duration: dur, repeat: Infinity, ease: 'easeInOut' as const },
        }

  /* No `fill` here: every shape sets its own, and a spread `fill: none` would
     silently win over it. */
  const stroke = {
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  const scenes: Record<Scene, React.ReactNode> = {
    /* ── Discover: a magnifier moving over a list of findings ─────────── */
    discover: (
      <>
        {[0, 1, 2].map((r) => (
          <motion.rect
            key={r}
            x={12}
            y={24 + r * 34}
            width={132}
            height={24}
            rx={7}
            fill={SOFT}
            stroke={RULE}
            {...stroke}
            {...rise(r)}
          />
        ))}
        {[0, 1, 2].map((r) => (
          <motion.line
            key={`t${r}`}
            x1={24}
            y1={36 + r * 34}
            x2={r === 1 ? 118 : 96}
            y2={36 + r * 34}
            fill="none" stroke={RULE}
            {...stroke}
            {...draw(r + 1, 0.5)}
          />
        ))}
        <motion.g {...float(6, 6.5)}>
          <motion.circle cx={148} cy={62} r={30} fill="none" stroke={ACCENT} {...stroke} {...draw(3, 0.9)} />
          <motion.line x1={169} y1={83} x2={190} y2={104} fill="none" stroke={ACCENT} {...stroke} strokeWidth={3} {...draw(4, 0.5)} />
          <motion.circle cx={148} cy={62} r={30} fill={ACCENT} {...rise(4, 0.08)} />
        </motion.g>
      </>
    ),

    /* ── Structure: nodes resolving into a flow ───────────────────────── */
    structure: (
      <>
        <motion.path d="M34 40h44a18 18 0 0 1 18 18v0" fill="none" stroke={RULE} {...stroke} {...draw(1)} />
        <motion.path d="M34 96h44a18 18 0 0 0 18-18v0" fill="none" stroke={RULE} {...stroke} {...draw(2)} />
        <motion.path d="M96 68h34" fill="none" stroke={ACCENT} {...stroke} {...draw(3, 0.5)} />
        <motion.path d="M124 62l7 6-7 6" fill="none" stroke={ACCENT} {...stroke} {...draw(4, 0.3)} />
        {[
          [22, 40],
          [22, 96],
        ].map(([x, y], i) => (
          <motion.rect
            key={i}
            x={x - 10}
            y={y - 12}
            width={26}
            height={24}
            rx={7}
            fill={SOFT}
            stroke={RULE}
            {...stroke}
            {...rise(i)}
          />
        ))}
        <motion.g {...float(4, 8)}>
          <motion.rect
            x={132}
            y={40}
            width={58}
            height={56}
            rx={12}
            fill={SOFT}
            stroke={ACCENT}
            {...stroke}
            {...rise(3)}
          />
          <motion.line x1={144} y1={58} x2={178} y2={58} fill="none" stroke={ACCENT} {...stroke} {...draw(5, 0.4)} />
          <motion.line x1={144} y1={70} x2={168} y2={70} fill="none" stroke={RULE} {...stroke} {...draw(6, 0.4)} />
          <motion.line x1={144} y1={82} x2={172} y2={82} fill="none" stroke={RULE} {...stroke} {...draw(7, 0.4)} />
        </motion.g>
      </>
    ),

    /* ── Craft: stacked layers under a nib ────────────────────────────── */
    craft: (
      <>
        {[0, 1, 2].map((i) => (
          <motion.path
            key={i}
            d={`M100 ${44 + i * 22}l52 26-52 26-52-26 52-26z`}
            fill={i === 0 ? SOFT : 'none'}
            stroke={i === 0 ? ACCENT : RULE}
            {...stroke}
            {...draw(i, 0.8)}
          />
        ))}
        <motion.g {...float(5, 7.5)}>
          <motion.path
            d="M156 20l14 14-38 38-16 4 4-16 36-40z"
            fill="none"
            stroke={ACCENT}
            {...stroke}
            {...draw(3, 0.9)}
          />
          <motion.line x1={150} y1={26} x2={164} y2={40} fill="none" stroke={ACCENT} {...stroke} {...draw(4, 0.3)} />
        </motion.g>
      </>
    ),

    /* ── Measure: a rising trend over bars ───────────────────────────── */
    measure: (
      <>
        <motion.line x1={20} y1={112} x2={188} y2={112} fill="none" stroke={RULE} {...stroke} {...draw(0, 0.6)} />
        {[38, 62, 86, 110, 134, 158].map((x, i) => (
          <motion.rect
            key={x}
            x={x}
            y={112 - (26 + i * 11)}
            width={16}
            height={26 + i * 11}
            rx={5}
            fill={SOFT}
            stroke={i === 5 ? ACCENT : RULE}
            {...stroke}
            {...rise(i)}
          />
        ))}
        <motion.path
          d="M30 92c26-6 42 4 62-14s44-22 84-40"
          stroke={ACCENT}
          {...stroke}
          strokeWidth={2}
          {...draw(3, 1.1)}
        />
        <motion.g {...float(4, 6)}>
          <motion.circle cx={176} cy={38} r={7} fill={ACCENT} {...rise(6, 0.18)} />
          <motion.circle cx={176} cy={38} r={4} fill={ACCENT} {...rise(6)} />
        </motion.g>
      </>
    ),

    /* ── Talk: two bubbles mid-conversation ──────────────────────────── */
    talk: (
      <>
        <motion.path
          d="M16 34h104v50H60l-22 18V84H16z"
          fill={SOFT}
          stroke={ACCENT}
          {...stroke}
          {...draw(0, 0.9)}
        />
        <motion.line x1={32} y1={52} x2={100} y2={52} fill="none" stroke={ACCENT} {...stroke} {...draw(1, 0.5)} />
        <motion.line x1={32} y1={66} x2={80} y2={66} fill="none" stroke={RULE} {...stroke} {...draw(2, 0.5)} />
        <motion.g {...float(5, 7)}>
          <motion.path
            d="M188 60h-56v42h40l16 14v-14h0z"
            fill="none"
            stroke={RULE}
            {...stroke}
            {...draw(3, 0.9)}
          />
          <motion.line x1={144} y1={76} x2={176} y2={76} fill="none" stroke={RULE} {...stroke} {...draw(4, 0.4)} />
          <motion.line x1={144} y1={88} x2={164} y2={88} fill="none" stroke={RULE} {...stroke} {...draw(5, 0.4)} />
        </motion.g>
      </>
    ),
  }

  return (
    <div ref={ref} className={className} style={{ height }} aria-hidden="true">
      <svg viewBox="0 0 204 128" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
        {scenes[scene]}
      </svg>
    </div>
  )
}
