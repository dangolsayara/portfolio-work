import { Icon } from './Icon'
import { useTheme } from '../lib/theme'

/* A single control with a clear state, not a mystery icon. The label is
   readable by screen readers and `aria-pressed` reports the current mode. */

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const dark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`group relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-rule text-ink-faint transition-colors duration-200 hover:border-rule-strong hover:text-ink ${className}`}
    >
      <span className="sr-only">
        {dark ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>

      <span
        className={`absolute transition-all duration-300 ${
          dark ? 'scale-50 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <Icon name="sun" size={17} />
      </span>
      <span
        className={`absolute transition-all duration-300 ${
          dark ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}
      >
        <Icon name="moon" size={17} />
      </span>
    </button>
  )
}
