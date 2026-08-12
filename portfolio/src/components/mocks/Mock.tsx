import { memo } from 'react'
import type { Visual } from '../../content/types'
import { MOCKS } from './registry'
import { Scaled } from './Scaled'

/* ═══════════════════════════════════════════════════════════════════════════
   MOCK — a drawn interface study inside device chrome.
   Every project visual on the site goes through here, so framing, labelling
   and captioning are consistent to the pixel.
   ═══════════════════════════════════════════════════════════════════════════ */

const SIZES = {
  desktop: { w: 1240, h: 776 },
  mobile: { w: 380, h: 762 },
  bare: { w: 1040, h: 505 },
} as const

function Chrome({
  frame,
  children,
}: {
  frame: NonNullable<Visual['frame']>
  children: React.ReactNode
}) {
  if (frame === 'mobile') {
    return (
      <div className="mx-auto w-full max-w-[300px]">
        <div className="rounded-[2.1rem] bg-ink p-[5px] shadow-[0_18px_40px_-24px_rgba(23,22,27,0.45)]">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-white">
            <div className="absolute top-2 left-1/2 z-10 h-1 w-14 -translate-x-1/2 rounded-full bg-ink/85" />
            {children}
          </div>
        </div>
      </div>
    )
  }

  if (frame === 'bare') {
    return (
      <div className="overflow-hidden rounded-xl border border-rule bg-white">{children}</div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-rule bg-white shadow-[0_20px_44px_-30px_rgba(23,22,27,0.35)]">
      <div className="flex items-center gap-2 border-b border-rule-soft bg-surface/60 px-3.5 py-2.5">
        <span className="h-2 w-2 rounded-full bg-ink/15" />
        <span className="h-2 w-2 rounded-full bg-ink/15" />
        <span className="h-2 w-2 rounded-full bg-ink/15" />
        <span className="ml-2 h-3.5 flex-1 rounded-full bg-canvas" />
      </div>
      {children}
    </div>
  )
}

export const Mock = memo(function Mock({
  visual,
  className = '',
  showCaption = true,
}: {
  visual: Visual
  className?: string
  showCaption?: boolean
}) {
  const frame = visual.frame ?? 'desktop'
  const tone = visual.tone ?? 'neutral'
  const size = SIZES[frame]
  const Body = MOCKS[visual.kind]

  return (
    <figure className={className}>
      {visual.label && (
        <div className="mb-2.5 flex items-baseline gap-3">
          <span className="apparatus-sm">{visual.label}</span>
          <span className="h-px flex-1 bg-rule" aria-hidden="true" />
        </div>
      )}

      <Chrome frame={frame}>
        {visual.image ? (
          /* A real screenshot or photo, cropped to the frame's proportions. */
          <img
            src={visual.image}
            alt={visual.alt}
            loading="lazy"
            decoding="async"
            className="block w-full object-cover"
            style={{ aspectRatio: `${size.w} / ${size.h}` }}
          />
        ) : (
          /* The drawn mockup is decorative markup, so its description lives on
             a role="img" wrapper rather than on any single shape. */
          <div role="img" aria-label={visual.alt}>
            <Scaled width={size.w} height={size.h}>
              <Body tone={tone} mobile={frame === 'mobile'} />
            </Scaled>
          </div>
        )}
      </Chrome>

      {showCaption && visual.caption && (
        <figcaption className="mt-3.5 flex gap-3 text-[13px] leading-relaxed text-ink-faint">
          <span className="mt-[7px] h-px w-6 shrink-0 bg-accent/50" aria-hidden="true" />
          <span className="measure">{visual.caption}</span>
        </figcaption>
      )}
    </figure>
  )
})
