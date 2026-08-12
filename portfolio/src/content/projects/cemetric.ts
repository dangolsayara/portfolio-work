import type { Project } from '../types'

/* ═══════════════════════════════════════════════════════════════════════════
   PLATE 01 — CEMETRIC
   ▲ SAMPLE CASE STUDY. The structure is the deliverable; the copy is a
     placeholder written to show you the shape of a strong narrative. Replace
     the words, keep the eleven beats. All figures under `impact.metrics` are
     invented for layout purposes — swap them for measured results or delete
     them and keep `qualitative` only.
   ═══════════════════════════════════════════════════════════════════════════ */

export const cemetric: Project = {
  slug: 'cemetric',
  index: '01',
  title: 'Cemetric Sports Platform',
  subtitle: 'Making sports video sharing and athlete discovery feel effortless.',
  tags: ['Product Design', 'UI/UX', 'Web', 'Mobile'],
  meta: {
    role: 'Product Designer',
    platform: 'Web + Mobile',
    year: '2026',
    industry: 'Sports Technology',
    team: '1 designer · 4 engineers · 1 PM',
    timeline: '14 weeks',
  },
  impactLine: 'Upload abandonment cut by more than half; scouts began finding athletes without search.',
  layout: 'full',
  cover: {
    kind: 'feed',
    frame: 'desktop',
    tone: 'accent',
    label: 'FIG. 01 — DISCOVERY',
    alt: 'Cemetric discovery feed: a grid of athlete highlight cards with position, level and region filters.',
  },

  study: {
    /* 01 ─────────────────────────────────────────────────────────────────── */
    challenge: {
      statement: "Uploading a sports video shouldn't feel like filling out a form.",
      body: [
        'Cemetric is a platform where athletes publish highlight footage and scouts, coaches and recruiters find them. Both halves depend on the same thing: enough good footage, tagged well enough to be found.',
        'Neither half was working. Athletes started uploads and abandoned them. Scouts opened the platform, searched once, found nothing relevant, and did not come back. The product had a library problem that looked like a growth problem.',
        'The team had assumed the fix was distribution — more athletes, more marketing. The data suggested something less flattering: people were arriving, trying, and quietly giving up.',
      ],
    },

    /* 02 ─────────────────────────────────────────────────────────────────── */
    context: {
      body: [
        'The platform served two audiences with almost opposite needs. Athletes were mostly 16–22, on phones, on mobile data, uploading a clip minutes after a game while emotionally invested and impatient. Scouts were on desktop, mid-week, working through dozens of prospects with a specific position and level in mind.',
        'The existing upload flow had been built for the scout — every field a recruiter might one day want to filter by was asked of the athlete first, in one long form, before the video began transferring.',
        'I joined at the point where the team knew retention was the problem and had not yet agreed on why.',
      ],
      facts: [
        { label: 'My role', value: 'Product Designer — research, IA, flows, UI, design system, handoff' },
        { label: 'Timeline', value: '14 weeks, two releases' },
        { label: 'Team', value: 'Me, a PM, four engineers, one part-time analyst' },
        { label: 'Surfaces', value: 'Responsive web app + mobile web upload' },
      ],
      constraints: [
        'No native app in scope — mobile web only, on unreliable connections',
        'Video processing took 2–8 minutes and could not be made faster in this cycle',
        'Existing tagging taxonomy was in use by paying scouts and could not be discarded',
        'One engineer for the upload path; the redesign had to be shippable in slices',
      ],
    },

    /* 03 ─────────────────────────────────────────────────────────────────── */
    understanding: {
      intro:
        'I wanted to know where people stopped, and what they believed was happening when they stopped. Analytics gave me the first; only watching people gave me the second.',
      methods: [
        {
          label: 'Funnel analysis',
          detail:
            'Instrumented every step of upload. The drop was not evenly distributed — it clustered at two specific moments, both of which involved waiting without feedback.',
        },
        {
          label: '11 athlete interviews',
          detail:
            'Recruited across three sports and two levels. Each session began with "show me how you shared your last clip" — often on a competitor or on Instagram.',
        },
        {
          label: '6 scout sessions',
          detail:
            'Observed real prospect hunts. Scouts almost never used free-text search; they arrived with a shape in mind — position, level, region — and wanted to browse within it.',
        },
        {
          label: 'Support ticket audit',
          detail:
            'Read nine months of tickets. A third of upload complaints were from users whose upload had in fact succeeded. They simply had no way of knowing.',
        },
        {
          label: 'Competitive teardown',
          detail:
            'Mapped upload flows across four adjacent products, plus the two social apps athletes actually used, to understand the interaction they had already learned.',
        },
      ],
      painPoints: [
        {
          title: 'The form came before the video',
          body: 'Fourteen fields stood between an athlete and a progress bar. Nothing began transferring until all of them were valid, so a slow connection meant a long wait that hadn’t started yet.',
        },
        {
          title: 'Silence read as failure',
          body: 'Processing produced no state. Athletes closed the tab, assumed it had broken, and re-uploaded — or contacted support about a video that had already published.',
        },
        {
          title: 'Tags described the sport, not the athlete',
          body: 'The taxonomy asked what happened in the clip. Scouts were looking for who was in it, at what level, in what region.',
        },
        {
          title: 'Discovery required knowing the answer',
          body: 'The home page was a search bar. Scouts who did not already have a name had nowhere to go, and the platform’s best footage was invisible to them.',
        },
      ],
      competitors: [
        { name: 'Adjacent platform A', note: 'Strong scout tooling, upload flow equally form-first. Same abandonment, unaddressed.' },
        { name: 'Adjacent platform B', note: 'Excellent upload UX; no structured metadata, so discovery collapsed into search.' },
        { name: 'Social apps', note: 'Where athletes were already fluent: upload starts instantly, details are optional and editable after.' },
      ],
      visual: {
        kind: 'journey',
        frame: 'bare',
        tone: 'neutral',
        label: 'FIG. 02 — ABANDONMENT MAP',
        caption:
          'Where athletes stopped, and what they believed was happening. The two spikes both sit at moments of unexplained waiting.',
        alt: 'A journey map of the upload flow with drop-off spikes marked at the metadata form and at video processing.',
      },
    },

    /* 04 ─────────────────────────────────────────────────────────────────── */
    insight: {
      statement: "The problem wasn't the number of steps. It was the uncertainty between them.",
      support: [
        'Athletes tolerated long flows elsewhere — they routinely spent longer editing a clip for social. What they would not tolerate was not knowing whether their work was safe.',
        'Every abandonment spike coincided with a moment where the system knew something and had not said it: the upload had started, the file was too large, the video was live.',
        'And the mirror image held for scouts. Search assumed certainty they did not have. They needed a starting point, not an input field.',
      ],
    },

    /* 05 ─────────────────────────────────────────────────────────────────── */
    experience: {
      intro:
        'I restructured the flow around one rule: begin transferring immediately, and never let the athlete wonder what state their video is in. Metadata became something you add while waiting, not something you complete before starting.',
      flow: [
        { step: '01', label: 'Select', detail: 'Choose the clip. Transfer begins on selection — before a single field is asked.' },
        { step: '02', label: 'Transfer', detail: 'Persistent progress, plainly worded, safe to navigate away from and return to.' },
        { step: '03', label: 'Describe', detail: 'Three required fields. Everything else optional, prefilled from the athlete profile, editable later.' },
        { step: '04', label: 'Tag', detail: 'Position, level and region as structured chips — the vocabulary scouts actually browse by.' },
        { step: '05', label: 'Process', detail: 'Explicit, narrated states with a real estimate. Leaving the page is safe and the flow says so.' },
        { step: '06', label: 'Published', detail: 'Confirmation with the live link, a share action, and one prompt to complete the profile.' },
      ],
      ia: [
        { label: 'Discover', children: ['By position', 'By level', 'By region', 'Recently added', 'Saved searches'] },
        { label: 'Athlete', children: ['Profile', 'Highlights', 'Stats & measurables', 'Contact'] },
        { label: 'Upload', children: ['Transfer', 'Details', 'Tags', 'Status'] },
        { label: 'Scout tools', children: ['Shortlists', 'Comparisons', 'Notes', 'Exports'] },
      ],
      visual: {
        kind: 'flow',
        frame: 'bare',
        tone: 'accent',
        label: 'FIG. 03 — REVISED FLOW',
        caption:
          'Transfer moved to the first step. The metadata form now runs in parallel with the upload rather than gating it.',
        alt: 'A six-step flow diagram of the revised upload path, with transfer beginning at step one and metadata collected in parallel.',
      },
    },

    /* 06 ─────────────────────────────────────────────────────────────────── */
    exploring: {
      intro:
        'Three structures survived sketching. I built each far enough to test the assumption underneath it, including the one I expected to lose — which is the one that changed the final design most.',
      options: [
        {
          label: 'A',
          title: 'Wizard, shortened',
          body: 'Keep the sequential form, cut fourteen fields to six, add a step counter.',
          verdict: 'rejected',
          why: 'Faster, and still wrong. Testing showed the counter made the wait feel measured but did not address the silence during processing. It treated length as the disease.',
        },
        {
          label: 'B',
          title: 'Upload-first, details in parallel',
          body: 'Transfer starts on file selection. Metadata is a panel alongside live progress, saved continuously.',
          verdict: 'chosen',
          why: 'Every tested athlete described it as "already working" within the first few seconds. It also matched the mental model they had learned from social apps, so nothing needed teaching.',
        },
        {
          label: 'C',
          title: 'Zero-input publish, tag later',
          body: 'Publish immediately with no metadata; nudge for tags afterwards via notification.',
          verdict: 'rejected',
          why: 'Best possible upload experience and the worst possible library. Athletes did not return to tag, and untagged footage is invisible to scouts — it moved the failure downstream where it was harder to see.',
        },
      ],
    },

    /* 07 ─────────────────────────────────────────────────────────────────── */
    system: {
      intro:
        'The platform had three shades of grey doing the same job and two buttons that looked identical but behaved differently. Before designing screens I built the vocabulary — so that "this is a destructive action" or "this is still processing" had exactly one visual answer.',
      colors: [
        { name: 'Ground', hex: '#F7F8FA', role: 'Page surface. A soft neutral rather than pure white, so footage reads as the brightest thing on screen.' },
        { name: 'Ink', hex: '#101828', role: 'Primary text and iconography. Near-black rather than pure black, which is easier to read at length.' },
        { name: 'Indigo', hex: '#4F46E5', role: 'Primary action and current state. One accent, used sparingly enough to still mean something.' },
        { name: 'Signal', hex: '#0E9384', role: 'Success and confirmed states only. Reserved — it appears once per flow.' },
        { name: 'Rule', hex: '#E4E7EC', role: 'Borders, dividers, table structure. Structure without shadow.' },
      ],
      type: [
        { name: 'Display', role: 'Section and page titles', sample: 'Discover athletes' },
        { name: 'Body', role: 'Interface copy, 16px baseline', sample: 'Your video is processing. It is safe to leave this page.' },
        { name: 'Apparatus', role: 'Labels, metadata, counts', sample: 'MIDFIELD · U18 · REGION 04' },
      ],
      components: [
        { name: 'Progress bar', note: 'Four states: queued, transferring, processing, published. Wording written before visuals.' },
        { name: 'Tag chip', note: 'Position, level and region variants. Read-only, editable and removable states.' },
        { name: 'Athlete card', note: 'Compact, comfortable and comparison densities from one component.' },
        { name: 'Filter rail', note: 'Desktop sidebar collapses to a bottom sheet under 768px with identical logic.' },
        { name: 'Empty state', note: 'Every list has a written empty state with a next action. Designed first, not last.' },
        { name: 'Status banner', note: 'Informational, warning and destructive. Distinguished by more than colour alone.' },
      ],
      outcome:
        'Twenty-nine components with documented states replaced roughly sixty ad-hoc variations. The practical result was speed: the second release reused existing pieces almost entirely, and engineers stopped asking me which grey.',
    },

    /* 08 ─────────────────────────────────────────────────────────────────── */
    final: {
      intro:
        'The finished experience does less on every individual screen. The upload path in particular is almost boring to look at, which is the highest compliment I can pay it.',
      screens: [
        {
          kind: 'feed',
          frame: 'desktop',
          tone: 'accent',
          label: 'FIG. 04 — DISCOVERY',
          caption: 'Discovery replaces the search-first home page. Scouts land inside a browsable structure rather than an empty input.',
          alt: 'Desktop discovery page with a left filter rail for position, level and region, and a grid of athlete highlight cards.',
        },
        {
          kind: 'upload',
          frame: 'mobile',
          tone: 'accent',
          label: 'FIG. 05 — UPLOAD',
          caption: 'Transfer begins on selection. Progress is always visible; details are collected alongside it, never before it.',
          alt: 'Mobile upload screen showing a transfer progress bar at the top and an optional details form below it.',
        },
        {
          kind: 'profile',
          frame: 'desktop',
          tone: 'neutral',
          label: 'FIG. 06 — ATHLETE',
          caption: 'The athlete profile leads with footage and keeps measurables in a fixed, scannable apparatus column.',
          alt: 'Athlete profile page with a large video player, highlight reel thumbnails and a metadata column of measurables.',
        },
        {
          kind: 'table',
          frame: 'desktop',
          tone: 'positive',
          label: 'FIG. 07 — SHORTLIST',
          caption: 'Scout shortlists: dense by intention. Power users get craft too — alignment, tabular figures, real keyboard support.',
          alt: 'A dense shortlist comparison table of athletes with columns for position, level, region and notes.',
        },
      ],
    },

    /* 09 ─────────────────────────────────────────────────────────────────── */
    prototype: {
      intro:
        'I prototyped the upload path in full before any of it was built, because the whole argument rested on how the waiting felt — and you cannot review that in a static frame.',
      interactions: [
        { name: 'Immediate acknowledgement', detail: 'The progress bar appears within 100ms of file selection. Nothing else on the screen moves; the point is reassurance, not spectacle.' },
        { name: 'Narrated processing', detail: 'States advance with plain language and a real estimate. When the estimate is unknown, it says so instead of inventing a number.' },
        { name: 'Safe to leave', detail: 'Navigating away keeps a persistent status pill. Returning restores the exact step, including half-typed details.' },
        { name: 'Tag entry', detail: 'Chips commit on select with a 180ms settle. Removal is one tap with an undo window rather than a confirmation dialog.' },
        { name: 'Filter transitions', detail: 'Result grids re-layout in 240ms with position retained, so scouts do not lose the card they were reading.' },
        { name: 'Reduced motion', detail: 'Every transition has a no-motion equivalent that changes state instantly. Nothing depends on animation to be understood.' },
      ],
    },

    /* 10 ─────────────────────────────────────────────────────────────────── */
    impact: {
      intro:
        'Measured over the eight weeks after the second release, against the same eight weeks before it.',
      metrics: [
        { value: '+32%', label: 'Upload completion', note: 'Athletes who began an upload and reached published' },
        { value: '−54%', label: 'Upload abandonment', note: 'Sessions ending between file selection and publish' },
        { value: '−41%', label: 'Upload support tickets', note: 'Largely the "did it work?" category disappearing' },
        { value: '+18%', label: 'Scout return rate', note: 'Weekly returning scouts, attributed to browsable discovery' },
      ],
      qualitative: [
        'Scouts began arriving through discovery rather than search — a behaviour the previous home page made impossible.',
        'The tagging taxonomy stopped being a support topic. Structured chips removed the guessing without retiring the existing vocabulary paying customers relied on.',
        'The component library outlived the project: the next two features shipped without new foundational design work.',
      ],
    },

    /* 11 ─────────────────────────────────────────────────────────────────── */
    reflection: {
      worked:
        'Instrumenting the funnel before forming an opinion. It cost a week and saved the team from a redesign aimed at the wrong problem — the fix was never "fewer fields", it was "no silence".',
      didnt:
        'I designed the scout side second and it shows in the first release. Discovery shipped thinner than it should have, because I let the louder metric set the order of work rather than the harder problem.',
      improve:
        'I would test concept C — publish-first, tag-later — with a longer horizon. It failed on a two-week window, but with the right prompt at the right moment it might have been the better system, and I dismissed it slightly too fast.',
      learned:
        'That the perceived cost of a flow has far more to do with certainty than length. I now design the states before the screens, and I write the waiting copy first — if I cannot explain what the system is doing in one honest sentence, the design is not finished.',
    },
  },
}
