import { useCallback, useEffect, useState } from 'react'

/* ═══════════════════════════════════════════════════════════════════════════
   THEME
   Defaults to the visitor's system preference, remembers an explicit choice,
   and follows the system if they never make one. The class is applied by a
   tiny inline script in index.html so the first paint is already correct —
   no flash of the wrong theme.
   ═══════════════════════════════════════════════════════════════════════════ */

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

export function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function stored(): Theme | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return v === 'light' || v === 'dark' ? v : null
  } catch {
    return null
  }
}

function apply(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.style.colorScheme = theme
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    typeof document === 'undefined'
      ? 'light'
      : document.documentElement.classList.contains('dark')
        ? 'dark'
        : 'light'
  )

  /* Follow the system until the visitor makes an explicit choice. */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      if (stored()) return
      const next = mq.matches ? 'dark' : 'light'
      apply(next)
      setTheme(next)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark'
      apply(next)
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        /* Private browsing: the choice just won't persist. */
      }
      return next
    })
  }, [])

  return { theme, toggle }
}
