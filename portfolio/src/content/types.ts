/* ═══════════════════════════════════════════════════════════════════════════
   CONTENT TYPES
   All copy lives in `src/content/`. No component in `src/components/` contains
   editorial text, so you can rewrite the entire portfolio without touching UI.
   ═══════════════════════════════════════════════════════════════════════════ */

export const TAGS = [
  'Product Design',
  'UI/UX',
  'Mobile',
  'Web',
  'Design Systems',
  'Research',
] as const

export type Tag = (typeof TAGS)[number]

/** Keys of the hand-built mockups in `src/components/mocks/registry.tsx`.
 *  Every project visual is drawn in code — there are no image files to lose. */
export type MockKey =
  | 'feed'
  | 'upload'
  | 'profile'
  | 'dashboard'
  | 'table'
  | 'form'
  | 'calendar'
  | 'chat'
  | 'onboarding'
  | 'checkout'
  | 'search'
  | 'settings'
  | 'tokens'
  | 'components'
  | 'wireframe'
  | 'flow'
  | 'journey'
  | 'ia'
  | 'sketch'
  | 'invoice'

export interface Visual {
  /** Which drawn mockup to render. Ignored when `image` is set. */
  kind: MockKey
  /** A real screenshot or photo. Put the file in /public and point here —
   *  e.g. `image: '/work/cemetric-discovery.webp'`. It renders inside the same
   *  device frame, lazily, with `alt` used as the alt text. This is the one
   *  field to change when you swap the drawn mockups for your own work. */
  image?: string
  /** Device chrome drawn around the mock. */
  frame?: 'desktop' | 'mobile' | 'bare'
  /** Which chromatic voice the mock uses. Colour classifies; it never decorates. */
  tone?: 'neutral' | 'accent' | 'positive'
  /** Small monospace stamp printed on the frame, e.g. "FIG. 04". */
  label?: string
  /** Annotation set beneath the visual. */
  caption?: string
  /** Required. Describes the visual for screen readers. */
  alt: string
}

export interface Fact {
  label: string
  value: string
}

export interface Metric {
  value: string
  label: string
  note?: string
}

/* ── The eleven-part case-study narrative ──────────────────────────────── */

export interface CaseStudy {
  /** 01 — The Challenge */
  challenge: {
    statement: string
    body: string[]
  }
  /** 02 — Context */
  context: {
    body: string[]
    facts: Fact[]
    constraints: string[]
  }
  /** 03 — Understanding the Problem */
  understanding: {
    intro: string
    methods: { label: string; detail: string }[]
    painPoints: { title: string; body: string }[]
    competitors?: { name: string; note: string }[]
    visual?: Visual
  }
  /** 04 — The Insight */
  insight: {
    statement: string
    support: string[]
  }
  /** 05 — Defining the Experience */
  experience: {
    intro: string
    flow: { step: string; label: string; detail: string }[]
    ia?: { label: string; children: string[] }[]
    visual?: Visual
  }
  /** 06 — Exploring Solutions */
  exploring: {
    intro: string
    options: {
      label: string
      title: string
      body: string
      verdict: 'chosen' | 'rejected'
      why: string
      visual?: Visual
    }[]
  }
  /** 07 — Design System */
  system: {
    /** One or more paragraphs. */
    intro: string | string[]
    colors: { name: string; hex: string; role: string }[]
    type: { name: string; role: string; sample: string }[]
    components: { name: string; note: string }[]
    outcome: string
  }
  /** 08 — Final Experience */
  final: {
    intro: string
    screens: Visual[]
  }
  /** 09 — Prototype / Interaction */
  prototype: {
    intro: string
    interactions: { name: string; detail: string }[]
  }
  /** 10 — Impact */
  impact: {
    intro: string
    /** SAMPLE FIGURES. Replace with measured results, or delete the array and
     *  rely on `qualitative` — an honest qualitative outcome reads better than
     *  a number nobody can defend in an interview. */
    metrics: Metric[]
    qualitative: string[]
  }
  /** 11 — Reflection */
  reflection: {
    worked: string
    didnt: string
    improve: string
    learned: string
  }
}

export interface Project {
  slug: string
  /** Plate number, e.g. "01". */
  index: string
  title: string
  /** One-line problem statement, in quotation marks on the card. */
  subtitle: string
  tags: Tag[]
  meta: {
    role: string
    platform: string
    year: string
    industry: string
    team: string
    timeline: string
  }
  /** Short impact line shown on the work card. */
  impactLine: string
  /** Card layout. The grid alternates deliberately — never a 3-up card wall. */
  layout: 'full' | 'split' | 'asymmetric' | 'meta-column'
  cover: Visual
  study: CaseStudy
}
