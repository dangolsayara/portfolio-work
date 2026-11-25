import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FIGMA_FILES } from '../content/figmaFiles'
import { useMeta } from '../lib/useMeta'
import { FigmaSkeleton } from '../components/FigmaSkeleton'
import { Pill, Reveal, Section } from '../components/ui'

/* Accessible variant of the Figma viewer.
   - Everything is reachable and operable by keyboard; Esc closes the drawer.
   - Controls are labelled, at least 44px tall, and state is exposed to
     assistive tech (aria-expanded / aria-pressed / aria-current / live region).
   - While the design loads, a calm skeleton with tips fades out when ready. */

const btn =
  'inline-flex min-h-11 items-center gap-2 rounded-lg border border-rule bg-canvas px-3.5 text-[14px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-40'

export default function FigmaPageAccessible({ slug }: { slug?: string }) {
  const params = useParams()
  const file = FIGMA_FILES.find((f) => f.slug === (slug ?? params.slug)) ?? FIGMA_FILES[0]
  const pages = file.pages

  const [active, setActive] = useState(0)
  const [drawer, setDrawer] = useState(false)
  const [full, setFull] = useState(false)
  const [resetKey, setResetKey] = useState(0)
  const [announce, setAnnounce] = useState('')
  const [loadedKey, setLoadedKey] = useState('')
  const stage = useRef<HTMLDivElement>(null)
  const drawerBtn = useRef<HTMLButtonElement>(null)
  const page = pages[active]

  useMeta({
    title: `${file.title} — Figma viewer`,
    description: `Explore the ${file.title} design file with a keyboard- and screen-reader-friendly viewer.`,
    path: `/${file.slug}`,
  })

  const open = (nodeId: string) => (nodeId ? `${file.fileUrl}?node-id=${nodeId}` : file.fileUrl)
  const embed = (nodeId: string) =>
    `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(open(nodeId))}`

  useEffect(() => {
    const onFs = () => setFull(document.fullscreenElement === stage.current)
    document.addEventListener('fullscreenchange', onFs)
    return () => document.removeEventListener('fullscreenchange', onFs)
  }, [])

  const go = (i: number) => {
    const n = Math.min(Math.max(i, 0), pages.length - 1)
    if (n === active) return
    setActive(n)
    setAnnounce(`Showing page ${n + 1} of ${pages.length}: ${pages[n].name}`)
  }

  const closeDrawer = () => {
    setDrawer(false)
    drawerBtn.current?.focus()
  }

  const toggleFull = () => {
    if (document.fullscreenElement) document.exitFullscreen?.()
    else stage.current?.requestFullscreen?.()
  }

  const sidebar = (
    <nav aria-label={`${file.title} pages`} className="p-3">
      <h2 className="px-2 pb-2 text-[12px] font-bold tracking-wider text-ink-soft uppercase">
        Pages ({pages.length})
      </h2>
      <ul className="space-y-1">
        {pages.map((p, i) => (
          <li key={p.name}>
            <button
              type="button"
              onClick={() => {
                go(i)
                setDrawer(false)
              }}
              aria-current={i === active ? 'page' : undefined}
              className={`flex min-h-11 w-full items-center gap-2 rounded-lg px-3 text-left text-[14px] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                i === active
                  ? 'bg-accent font-semibold text-accent-contrast'
                  : 'text-ink hover:bg-surface'
              }`}
            >
              <span aria-hidden>{i === active ? '●' : '○'}</span>
              <span className="truncate">{p.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )

  return (
    <Section
      label={`${file.title} in Figma`}
      className="pt-24 pb-10 sm:pt-24 sm:pb-12 lg:pt-24 lg:pb-12"
    >
      <a
        href="#figma-canvas"
        className="sr-only focus:not-sr-only focus:fixed focus:top-20 focus:left-4 focus:z-[80] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-3 focus:text-canvas"
      >
        Skip to design canvas
      </a>

      <Reveal>
        <Link
          to="/#work"
          className="inline-flex min-h-11 items-center text-[14px] font-semibold text-accent underline-offset-4 hover:underline"
        >
          ← Back to work
        </Link>
        <h1 className="display mt-1 text-[1.75rem] sm:text-[2.25rem]">{file.title}</h1>
        <p className="mt-2 max-w-[60ch] text-[15px] leading-relaxed text-ink-soft">
          {file.description}
        </p>
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Project tags">
          {file.tags.map((t) => (
            <li key={t}>
              <Pill>{t}</Pill>
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="card mt-5 overflow-hidden p-0" ref={stage}>
        <div
          role="toolbar"
          aria-label="Viewer controls"
          className="flex flex-wrap items-center gap-2 border-b border-rule bg-surface p-2"
        >
          <button
            ref={drawerBtn}
            type="button"
            className={`${btn} sm:hidden`}
            aria-expanded={drawer}
            aria-controls="figma-pages-drawer"
            onClick={() => setDrawer((d) => !d)}
          >
            ☰ Pages
          </button>
          <button
            type="button"
            className={btn}
            onClick={() => go(active - 1)}
            disabled={active === 0}
            aria-label="Previous page"
          >
            ← <span className="hidden md:inline">Previous</span>
          </button>
          <span className="px-1 text-[14px] text-ink-soft" aria-hidden>
            {active + 1} / {pages.length}
          </span>
          <button
            type="button"
            className={btn}
            onClick={() => go(active + 1)}
            disabled={active === pages.length - 1}
            aria-label="Next page"
          >
            <span className="hidden md:inline">Next</span> →
          </button>
          <span className="flex-1" />
          <button
            type="button"
            className={btn}
            onClick={() => setResetKey((k) => k + 1)}
            aria-label="Reset view"
          >
            ⟲ <span className="hidden sm:inline">Reset view</span>
          </button>
          <button
            type="button"
            className={btn}
            onClick={toggleFull}
            aria-pressed={full}
            aria-label="Full screen"
          >
            ⛶ <span className="hidden sm:inline">Full screen</span>
          </button>
          <a href={open(page.nodeId)} target="_blank" rel="noopener noreferrer" className={btn}>
            Open in Figma<span className="sr-only"> (opens in a new tab)</span>{' '}
            <span aria-hidden>↗</span>
          </a>
        </div>

        <div className="relative flex h-[calc(100vh-17rem)] min-h-[420px]">
          <div className="hidden w-60 shrink-0 overflow-y-auto border-r border-rule bg-surface sm:block">
            {sidebar}
          </div>

          {drawer && (
            <div
              id="figma-pages-drawer"
              role="dialog"
              aria-label="Pages"
              onKeyDown={(e) => e.key === 'Escape' && closeDrawer()}
              className="absolute inset-y-0 left-0 z-20 w-64 overflow-y-auto border-r border-rule bg-surface shadow-xl sm:hidden"
            >
              <button type="button" className={`${btn} m-3 mb-0`} onClick={closeDrawer} autoFocus>
                ✕ Close pages
              </button>
              {sidebar}
            </div>
          )}

          <div
            id="figma-canvas"
            tabIndex={-1}
            className="relative min-w-0 flex-1 bg-canvas outline-none"
          >
            <FigmaSkeleton title={file.title} visible={loadedKey !== `${page.name}-${resetKey}`} />
            <iframe
              key={`${page.name}-${resetKey}`}
              onLoad={() => setLoadedKey(`${page.name}-${resetKey}`)}
              title={`${file.title}: ${page.name}, interactive Figma design`}
              src={embed(page.nodeId)}
              className="block h-full w-full border-0"
              allowFullScreen
            />
          </div>
        </div>

        <div aria-live="polite" className="sr-only">
          {announce}
        </div>
      </div>

      <details className="mt-4 rounded-lg border border-rule bg-surface p-4 text-[14px] text-ink-soft">
        <summary className="min-h-11 cursor-pointer py-2 font-semibold text-ink focus-visible:outline-3 focus-visible:outline-accent">
          How to move around the design
        </summary>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            <b>Mouse:</b> hold Ctrl (or ⌘) and scroll to zoom, hold Space and drag to pan.
          </li>
          <li>
            <b>Touch:</b> pinch to zoom, drag with two fingers to pan.
          </li>
          <li>
            <b>Pages:</b> use Previous / Next, pick one from the list, or choose “All pages” and use
            the page menu inside the viewer.
          </li>
          <li>
            <b>Stuck?</b> choose “Reset view”, or open the file in Figma for the full experience.
          </li>
        </ul>
      </details>
    </Section>
  )
}
