import { Suspense, lazy, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { BackToTop } from './components/ui'
import Home from './pages/Home'

/* Case studies are code-split: the homepage ships without eleven chapters of
   layout it may never need. */
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'))
const FigmaPageAccessible = lazy(() => import('./pages/FigmaPageAccessible'))

/** Restores scroll on navigation, and honours #hash targets from any route. */
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}

function Page({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion()
  if (reduced) return <>{children}</>
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-[13px] focus:text-canvas"
      >
        Skip to content
      </a>

      <Navbar />
      <ScrollManager />

      <main id="main">
        <AnimatePresence mode="wait">
          <Page key={location.pathname}>
            <Suspense
              fallback={
                <div className="flex min-h-[60vh] items-center justify-center">
                  <span className="apparatus-sm">Loading…</span>
                </div>
              }
            >
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/taskly" element={<FigmaPageAccessible slug="taskly" />} />
                <Route path="/kikisapo" element={<FigmaPageAccessible slug="kikisapo" />} />
                <Route path="/graphics-flyer" element={<FigmaPageAccessible slug="graphics-flyer" />} />
                <Route path="/work/:slug" element={<CaseStudyPage />} />
                <Route path="*" element={<CaseStudyPage />} />
              </Routes>
            </Suspense>
          </Page>
        </AnimatePresence>
      </main>

      <Footer />
      <BackToTop />
    </>
  )
}
