import { useEffect, useRef, useState, type ReactNode } from 'react'

/* Every mockup is authored once at a true design size, then scaled to fit its
   container. Proportion and type size stay exactly as drawn at any breakpoint —
   geometry is computed, never eyeballed. */

export function Scaled({
  width,
  height,
  children,
}: {
  width: number
  height: number
  children: ReactNode
}) {
  const hostRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    const measure = () => setScale(host.clientWidth / width)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(host)
    return () => ro.disconnect()
  }, [width])

  return (
    <div
      ref={hostRef}
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{ width, height, transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  )
}
