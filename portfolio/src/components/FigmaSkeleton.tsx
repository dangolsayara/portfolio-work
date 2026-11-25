import { useEffect, useState } from 'react'

const TIPS = [
  'Hold Ctrl (or ⌘) and scroll to zoom.',
  'Hold Space and drag to pan around.',
  'Pick another page from the sidebar anytime.',
  'On touch screens, pinch to zoom.',
]

/* A calm placeholder shaped like the editor. It sits above the iframe, ignores
   pointer events, and fades out once the design has loaded, so the page never
   feels empty or stuck. Motion is disabled for reduced-motion visitors. */
export function FigmaSkeleton({ title, visible }: { title: string; visible: boolean }) {
  const [tip, setTip] = useState(0)

  useEffect(() => {
    if (!visible) return
    const t = window.setInterval(() => setTip((n) => (n + 1) % TIPS.length), 3200)
    return () => window.clearInterval(t)
  }, [visible])

  const bar = 'rounded-md bg-rule/70 motion-safe:animate-pulse'

  return (
    <div
      aria-hidden={!visible}
      className={`pointer-events-none absolute inset-0 z-10 flex flex-col bg-canvas transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <span role="status" className="sr-only">
        {visible ? `Opening ${title}` : ''}
      </span>

      {/* Progress sliver */}
      <div className="h-0.5 w-full overflow-hidden bg-rule/50">
        <div className="h-full w-1/3 bg-accent motion-safe:animate-[figma-slide_1.4s_ease-in-out_infinite]" />
      </div>

      <div className="relative flex min-h-0 flex-1 gap-4 p-4">
        {/* Faux frames on a canvas */}
        <div className="grid flex-1 grid-cols-2 content-start gap-4 sm:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="space-y-2" style={{ animationDelay: `${i * 120}ms` }}>
              <div className={`h-3 w-1/3 ${bar}`} />
              <div className={`h-28 sm:h-36 ${bar}`} style={{ animationDelay: `${i * 120}ms` }} />
            </div>
          ))}
        </div>

        {/* Message card */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="max-w-xs rounded-2xl border border-rule bg-canvas/95 px-6 py-5 text-center shadow-lg backdrop-blur">
            <p className="text-[15px] font-semibold text-ink">Opening {title}…</p>
            <p className="mt-1 text-[13px] text-ink-soft">Your design is on its way.</p>
            <p key={tip} className="mt-3 text-[12.5px] text-accent motion-safe:animate-[figma-fade_0.5s_ease]">
              Tip: {TIPS[tip]}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
