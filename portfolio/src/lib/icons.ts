import type { IconName } from '../components/Icon'
import type { Tag } from '../content/types'

/* Maps content values onto icons. Kept here rather than in the content files so
   `src/content/` stays pure data and you only edit one place when you add a
   discipline or a platform. */

export const TAG_ICON: Record<Tag, IconName> = {
  'Product Design': 'flow',
  'UI/UX': 'cursor',
  Mobile: 'phone',
  Web: 'monitor',
  'Design Systems': 'box',
  Research: 'search',
}

/** Guesses a platform icon from free text like "iOS + Android" or "Web app". */
export function platformIcon(platform: string): IconName {
  const p = platform.toLowerCase()
  if (/ios|android|mobile/.test(p) && /web|desktop/.test(p)) return 'layers'
  if (/ios|android|mobile/.test(p)) return 'phone'
  return 'monitor'
}

/** Icons for the eleven case-study chapters. */
export const CHAPTER_ICON: Record<string, IconName> = {
  challenge: 'target',
  context: 'map',
  understanding: 'search',
  insight: 'lightbulb',
  experience: 'sitemap',
  exploring: 'sparkle',
  system: 'box',
  final: 'monitor',
  prototype: 'motion',
  impact: 'trend',
  reflection: 'brain',
}
