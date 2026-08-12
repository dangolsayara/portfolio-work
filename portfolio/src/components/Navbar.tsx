import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { NAV, site } from '../content/site'
import { Icon, type IconName } from './Icon'
import { ThemeToggle } from './ThemeToggle'

/* Sticky navigation. Compacts on scroll, highlights the section you're in, and
   keeps one obvious primary action. On mobile it becomes a full-screen sheet
   with touch-sized rows, each one labelled with its section icon. */

const NAV_ICON: Record<string, IconName> = {
  Work: 'grid',
  About: 'users',
  Process: 'flow',
  Resume: 'briefcase',
  Contact: 'mail',
}

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    if (!enabled) return
    const ids = NAV.map((n) => n.href.split('#')[1]).filter(Boolean) as string[]
    const obs = new IntersectionObserver(
      (entries) => {
        const seen = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (seen) setActive(seen.target.id)
      },
      { rootMargin: '-30% 0px -55% 0px' }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [enabled])

  return active
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const reduced = useReducedMotion()
  const active = useActiveSection(pathname === '/')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  /* Escape closes the mobile sheet. */
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? 'border-b border-rule bg-canvas/80 backdrop-blur-xl'
            : 'border-b border-transparent'
        }`}
      >
        <nav
          aria-label="Primary"
          className={`mx-auto flex max-w-[1400px] items-center justify-between px-5 transition-all duration-300 sm:px-8 ${
            scrolled ? 'h-14' : 'h-[68px]'
          }`}
        >
          <Link
            to="/"
            className="flex items-center gap-2.5 rounded-full"
            aria-label={`${site.name} — home`}
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[0.7rem] bg-accent text-[15px] font-bold text-accent-contrast">
              {site.wordmark.charAt(0)}
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-[15px] font-semibold tracking-[-0.02em]">
                {site.wordmark}
              </span>
              <span className="mt-1 hidden text-[11px] text-ink-faint sm:block">
                {site.role}
              </span>
            </span>
          </Link>

          {/* Desktop links, grouped in a pill so they read as one control */}
          <div className="hidden items-center gap-1 rounded-full border border-rule bg-surface/70 p-1 md:flex">
            {NAV.map((item) => {
              const id = item.href.split('#')[1]
              const on = pathname === '/' && id === active
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  aria-current={on ? 'true' : undefined}
                  className={`rounded-full px-3.5 py-1.5 text-[13.5px] transition-colors duration-200 ${
                    on
                      ? 'bg-canvas text-ink shadow-[0_1px_2px_rgb(16_24_40/0.06)]'
                      : 'text-ink-faint hover:text-ink'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href={`mailto:${site.email}`}
              className="group hidden items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-[13.5px] font-semibold text-accent-contrast transition-colors duration-200 hover:bg-accent-strong sm:inline-flex"
            >
              <Icon name="mail" size={15} />
              Let's talk now
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid h-9 w-9 place-items-center rounded-full border border-rule md:hidden"
            >
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
              <span className="flex flex-col gap-[5px]">
                <span
                  className={`block h-[1.5px] w-4 rounded bg-ink transition-transform duration-200 ${
                    open ? 'translate-y-[3.25px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-4 rounded bg-ink transition-transform duration-200 ${
                    open ? '-translate-y-[3.25px] -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-canvas px-5 pt-24 md:hidden"
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 1 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
          >
            <ul className="flex flex-col gap-2">
              {NAV.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className="card card-hover flex items-center justify-between px-5 py-4"
                  >
                    <span className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-[0.65rem] border border-accent/20 bg-accent-soft text-accent">
                        <Icon name={NAV_ICON[item.label] ?? 'arrowRight'} size={18} />
                      </span>
                      <span className="text-[17px] font-medium">{item.label}</span>
                    </span>
                    <span className="text-ink-faint">
                      <Icon name="arrowRight" size={17} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <a
              href={`mailto:${site.email}`}
              className="mt-6 flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-[16px] font-semibold text-accent-contrast"
            >
              <Icon name="mail" size={17} />
              Let's talk
            </a>
            <p className="mt-4 text-center text-[13px] text-ink-faint">{site.email}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
