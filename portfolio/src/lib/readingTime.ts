import type { CaseStudy } from '../content/types'

/* Rough reading time, computed from the content rather than guessed, so the
   estimate stays honest when you rewrite the copy. */

const WORDS_PER_MINUTE = 220

function countWords(value: unknown): number {
  if (typeof value === 'string') {
    /* Skip machine-ish fields: hex codes, mock keys, alt text is short anyway. */
    return value.trim().split(/\s+/).filter(Boolean).length
  }
  if (Array.isArray(value)) return value.reduce((n, v) => n + countWords(v), 0)
  if (value && typeof value === 'object') {
    return Object.values(value).reduce((n: number, v) => n + countWords(v), 0)
  }
  return 0
}

export interface ReadingTime {
  quick: number
  full: number
}

/** Quick read shows five of the eleven chapters. */
export const QUICK_CHAPTERS = ['challenge', 'insight', 'final', 'impact', 'reflection'] as const

export function readingTime(study: CaseStudy): ReadingTime {
  const total = countWords(study)
  const quickWords = QUICK_CHAPTERS.reduce(
    (n, key) => n + countWords(study[key as keyof CaseStudy]),
    0
  )
  return {
    quick: Math.max(1, Math.round(quickWords / WORDS_PER_MINUTE)),
    full: Math.max(2, Math.round(total / WORDS_PER_MINUTE)),
  }
}
