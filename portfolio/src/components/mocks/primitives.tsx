import type { ReactNode } from 'react'
import type { Visual } from '../../content/types'

/* ═══════════════════════════════════════════════════════════════════════════
   MOCKUP PRIMITIVES
   The shared vocabulary every drawn mockup is built from, so twenty different
   screens read as one system rather than twenty illustrations.
   ═══════════════════════════════════════════════════════════════════════════ */

export type Tone = NonNullable<Visual['tone']>

export const ACCENT: Record<Tone, string> = {
  neutral: '#475467',
  accent: '#4f46e5',
  positive: '#0a6d62',
}

export const WASH: Record<Tone, string> = {
  neutral: '#f2f4f7',
  accent: '#eef2ff',
  positive: '#eefaf7',
}

/* The drawn screens keep a light interior in both site themes — that is how a
   real screenshot behaves, and it keeps small UI text legible. Values come from
   the `--m-*` tokens in index.css. */
export const INK = 'var(--m-ink)'
export const BODY = 'var(--m-body)'
export const RULE = 'var(--m-rule)'
export const RULE_SOFT = 'var(--m-rule-soft)'
export const FAINT = 'var(--m-faint)'
export const PAPER = 'var(--m-paper)'
export const GROUND = 'var(--m-ground)'
export const FILL = '#dfe3ea'
export const FILL_SOFT = '#e9ecf1'

/* ── Atoms ─────────────────────────────────────────────────────────────── */

export function Bar({
  w,
  h = 6,
  color = RULE,
  r = 4,
}: {
  w: number | string
  h?: number
  color?: string
  r?: number
}) {
  return (
    <div
      style={{
        width: typeof w === 'number' ? w : w,
        height: h,
        background: color,
        borderRadius: r,
        flexShrink: 0,
      }}
    />
  )
}

export function Lines({
  rows,
  w = 200,
  gap = 7,
  h = 5,
  color = RULE,
}: {
  rows: number
  w?: number
  gap?: number
  h?: number
  color?: string
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap }}>
      {Array.from({ length: rows }).map((_, i) => (
        <Bar key={i} w={i === rows - 1 ? w * 0.62 : w} h={h} color={color} />
      ))}
    </div>
  )
}

export function Label({
  children,
  size = 10,
  color = FAINT,
  track = 0.14,
  weight = 400,
}: {
  children: ReactNode
  size?: number
  color?: string
  track?: number
  weight?: number
}) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: size,
        letterSpacing: `${track}em`,
        textTransform: 'uppercase',
        color,
        fontWeight: weight,
        lineHeight: 1,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  )
}

export function Text({
  children,
  size = 12,
  weight = 400,
  color = INK,
  track = -0.01,
  lh = 1.35,
}: {
  children: ReactNode
  size?: number
  weight?: number
  color?: string
  track?: number
  lh?: number
}) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: size,
        fontWeight: weight,
        color,
        letterSpacing: `${track}em`,
        lineHeight: lh,
      }}
    >
      {children}
    </span>
  )
}

export function Chip({
  children,
  active = false,
  tone = 'accent',
  removable = false,
}: {
  children: ReactNode
  active?: boolean
  tone?: Tone
  removable?: boolean
}) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '4px 9px',
        borderRadius: 999,
        border: `1px solid ${active ? ACCENT[tone] : RULE}`,
        background: active ? ACCENT[tone] : PAPER,
        color: active ? PAPER : BODY,
        fontFamily: 'var(--font-sans)',
        fontSize: 10,
        letterSpacing: '0.01em',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
      {removable && (
        <span style={{ opacity: 0.55, fontSize: 9, lineHeight: 1 }}>✕</span>
      )}
    </span>
  )
}

export function Btn({
  children,
  tone = 'accent',
  variant = 'solid',
  w,
}: {
  children: ReactNode
  tone?: Tone
  variant?: 'solid' | 'ghost'
  w?: number | string
}) {
  const solid = variant === 'solid'
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: w,
        padding: '7px 14px',
        borderRadius: 7,
        background: solid ? ACCENT[tone] : 'transparent',
        border: solid ? 'none' : `1px solid ${RULE}`,
        color: solid ? PAPER : BODY,
        fontFamily: 'var(--font-sans)',
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: '-0.005em',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  )
}

export function Avatar({ i = 0, size = 26 }: { i?: number; size?: number }) {
  const hues = ['#4f46e5', '#0e9384', '#b54708', '#175cd3', '#c11574', '#5925dc']
  const c = hues[i % hues.length]
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        background: `linear-gradient(145deg, ${c}, ${c}88)`,
        flexShrink: 0,
      }}
    />
  )
}

/** Footage / imagery placeholder — a drawn frame, never a broken image. */
export function Thumb({
  w = '100%',
  h = 90,
  tone = 'accent',
  play = false,
  r = 8,
  seed = 0,
}: {
  w?: number | string
  h?: number
  tone?: Tone
  play?: boolean
  r?: number
  seed?: number
}) {
  const a = ACCENT[tone]
  return (
    <div
      style={{
        width: w,
        height: h,
        borderRadius: r,
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(${125 + seed * 23}deg, ${a}2e 0%, ${a}14 44%, ${GROUND} 100%)`,
        border: `1px solid ${RULE_SOFT}`,
        flexShrink: 0,
      }}
    >
      <svg
        width="100%"
        height="100%"
        style={{ position: 'absolute', inset: 0, opacity: 0.5 }}
        aria-hidden="true"
      >
        <defs>
          <pattern
            id={`hatch-${tone}-${seed}`}
            width="7"
            height="7"
            patternTransform="rotate(45)"
            patternUnits="userSpaceOnUse"
          >
            <line x1="0" y1="0" x2="0" y2="7" stroke={a} strokeWidth="0.6" opacity="0.42" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#hatch-${tone}-${seed})`} />
      </svg>
      {play && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 999,
              background: '#ffffffdd',
              border: `1px solid ${RULE}`,
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                marginLeft: 2,
                borderTop: '4px solid transparent',
                borderBottom: '4px solid transparent',
                borderLeft: `7px solid ${a}`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Structure ─────────────────────────────────────────────────────────── */

export function Panel({
  children,
  pad = 14,
  style,
}: {
  children: ReactNode
  pad?: number
  style?: React.CSSProperties
}) {
  return (
    <div
      style={{
        background: PAPER,
        border: `1px solid ${RULE_SOFT}`,
        borderRadius: 12,
        padding: pad,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export function Row({
  children,
  gap = 8,
  align = 'center',
  justify = 'flex-start',
  style,
}: {
  children: ReactNode
  gap?: number
  align?: React.CSSProperties['alignItems']
  justify?: React.CSSProperties['justifyContent']
  style?: React.CSSProperties
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: align,
        justifyContent: justify,
        gap,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export function Col({
  children,
  gap = 8,
  style,
}: {
  children: ReactNode
  gap?: number
  style?: React.CSSProperties
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap, ...style }}>
      {children}
    </div>
  )
}

/** Graduated tick strip — the surveyor's plate, borrowed. */
export function Graduation({
  w = 200,
  count = 40,
  tone = 'neutral',
}: {
  w?: number
  count?: number
  tone?: Tone
}) {
  return (
    <svg width={w} height={12} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => {
        const major = i % 5 === 0
        return (
          <line
            key={i}
            x1={(i * w) / count}
            y1={major ? 0 : 5}
            x2={(i * w) / count}
            y2={12}
            stroke={major ? ACCENT[tone] : RULE}
            strokeWidth="0.75"
            opacity={major ? 0.55 : 1}
          />
        )
      })}
    </svg>
  )
}

export function Spark({
  w = 120,
  h = 34,
  tone = 'accent',
  seed = 1,
}: {
  w?: number
  h?: number
  tone?: Tone
  seed?: number
}) {
  const pts = Array.from({ length: 18 }, (_, i) => {
    const t = i / 17
    const v =
      0.5 +
      0.32 * Math.sin(t * 5.2 + seed) +
      0.14 * Math.sin(t * 11.4 + seed * 2) +
      t * 0.18
    return [t * w, h - Math.min(0.96, Math.max(0.06, v)) * h]
  })
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')
  return (
    <svg width={w} height={h} aria-hidden="true">
      <path d={`${d} L${w},${h} L0,${h} Z`} fill={ACCENT[tone]} opacity="0.08" />
      <path d={d} fill="none" stroke={ACCENT[tone]} strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  )
}

export function Bars({
  w = 140,
  h = 44,
  n = 12,
  tone = 'accent',
  seed = 2,
}: {
  w?: number
  h?: number
  n?: number
  tone?: Tone
  seed?: number
}) {
  const bw = w / n - 3
  return (
    <svg width={w} height={h} aria-hidden="true">
      {Array.from({ length: n }).map((_, i) => {
        const v = 0.28 + 0.62 * Math.abs(Math.sin(i * 1.31 + seed))
        return (
          <rect
            key={i}
            x={i * (bw + 3)}
            y={h - v * h}
            width={bw}
            height={v * h}
            rx="1.5"
            fill={ACCENT[tone]}
            opacity={i === n - 2 ? 0.85 : 0.24}
          />
        )
      })}
    </svg>
  )
}

/** Small circular status dial — apparatus, not decoration. */
export function Dial({
  size = 46,
  pct = 0.72,
  tone = 'accent',
}: {
  size?: number
  pct?: number
  tone?: Tone
}) {
  const r = size / 2 - 3
  const c = 2 * Math.PI * r
  return (
    <svg width={size} height={size} aria-hidden="true">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={RULE} strokeWidth="2.5" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={ACCENT[tone]}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray={`${c * pct} ${c}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  )
}
