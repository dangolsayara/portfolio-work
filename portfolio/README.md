# Portfolio — UI/UX & Product Designer

A UI-forward portfolio site: React + TypeScript + Tailwind CSS v4 + Framer Motion, built with Vite.
Light and dark themes, and case studies you can read in three minutes or thirty.

Five projects, each with a complete eleven-chapter case study, all generated from one template so
adding a project means writing a data file — never touching layout code.

**Icons, illustrations and motion.** A bespoke 52-icon line set (`src/components/Icon.tsx`) runs
through every section, five self-drawing SVG scenes sit at the section breaks, metrics count up as
they scroll into view, and mock screens wake as they enter. All of it collapses to a static, complete
final state under `prefers-reduced-motion`.

**Built for scanning.** Every case study opens with an *In short* card — the problem, what you did,
what changed, and the headline numbers — then a **Quick read / Full case study** switch. Quick read
keeps the five chapters that carry the argument and collapses the supporting detail; the full read
expands everything. Sticky chapter tabs with a progress bar sit under the navbar, and each chapter
heading carries an at-a-glance line (*"5 research methods · 4 problems found"*) so you can follow
the story by reading only the headings.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to /dist
npm run preview  # serve the built site
```

---

## The one thing to know

**All copy lives in `src/content/`. No component contains editorial text.**

```
src/content/
├── site.ts                 ← everything outside the projects: hero, about, skills, experience…
├── types.ts                ← the content contract (edit only if you want new fields)
└── projects/
    ├── index.ts            ← the registry: order of projects on the homepage
    ├── cemetric.ts         ← featured card
    ├── ledgerline.ts
    ├── northwind.ts
    ├── atlas.ts
    └── sundry.ts
```

You can rewrite the entire portfolio without opening a single file in `src/components/`.

---

## ⚠️ Replace the sample content before publishing

Every project in here is **fictional sample content**, written to show you the shape of a strong
case study. The narrative structure is the deliverable; the words are a placeholder.

**Nothing invented should survive to your live site.** In particular:

| Where | What to replace |
| --- | --- |
| `site.ts` → `name`, `wordmark`, `email`, `location`, `socials` | Your real details |
| `site.ts` → `experience.roles[]` | Every role. Placeholders read `[COMPANY]`, `[MAJOR ACHIEVEMENT]` |
| `site.ts` → `about.facts`, `about.closing` | Placeholders read `[CITY, COUNTRY]`, `[PERSONAL INTEREST]` |
| `site.ts` → `footer.sampleNotice` | **Delete this line** — it prints "Sample content" in the footer |
| every `projects/*.ts` → `impact.metrics` | **Sample figures.** Use measured numbers, or delete the array and keep `qualitative` only |
| every `projects/*.ts` → `understanding.methods`, `competitors` | Your actual research, not invented interviews |
| `site.ts` → `testimonials` | Empty by default; the section hides itself. Add **only real quotes, with permission** |

A qualitative outcome you can defend in an interview beats a percentage you can't. Deleting
`metrics` is a supported path — the Impact chapter renders fine without it.

### Your own details

1. `src/content/site.ts` — name, role, email, location, socials, resume path.
2. `index.html` — `<title>`, meta description, canonical URL, Open Graph URL and image, JSON-LD.
3. `public/resume.pdf` — drop your PDF here (referenced by `site.resumeUrl`).
4. `public/og.png` — 1200×630 social preview image.
5. `public/robots.txt` — replace the sitemap URL.
6. Portrait: put a photo at `public/portrait.jpg` and set `about.portrait = '/portrait.jpg'`.
   Left `null`, an obvious "Add your photo" placeholder card is shown instead.

---

## Adding a project

1. Copy any file in `src/content/projects/` and rename it.
2. Fill in the eleven chapters. TypeScript will tell you if a field is missing.
3. Register it in `src/content/projects/index.ts`.

Nothing else. Cards, filtering, routing, the case-study page, the summary card, reading times,
chapter tabs and prev/next navigation are all generated from that array.

Two fields control how a project looks on the homepage:

- **`tags`** — drives the filter row and the pills on the card. Only tags actually in use appear as
  filters, and each filter shows its count.
- **`cover`** — the card visual. A `frame: 'mobile'` cover is automatically centred and cropped so
  cards in a row stay comparable in height.

The first project in `projects` renders as the wide featured card; the rest fall into a two-up grid.
Reorder the array to change which one leads. (`layout` is still in the type and is now unused by the
card — it is kept so older project files keep compiling.)

---

## Icons

`src/components/Icon.tsx` holds a single component and a registry of 52 icons drawn on one 24×24
grid at a 1.6px stroke, all inheriting `currentColor` so they work in both themes at any text size.
No dependency, ~9kB of geometry.

```tsx
<Icon name="search" />                        // static
<Icon name="target" animate="draw" />         // strokes itself in on scroll
<IconTile name="flask" tone="accent" />       // the tile pattern used on cards
```

Icons are stored as primitive descriptions (`['p', 'M4 12h15']`, `['c', 12, 12, 8]`) rather than raw
markup — that is what lets any of them animate with `pathLength`. Add a key to `ICONS` to add an
icon; an unknown name falls back safely and warns in development rather than blanking the page.

Which icon appears where is content, not markup: `icon` fields live in `src/content/site.ts` (process
steps, principles, skill groups, curiosities, about facts, socials) and the tag / platform / chapter
maps live in `src/lib/icons.ts`.

## Illustrations

`src/components/Illustration.tsx` has five drawn scenes — `discover`, `structure`, `craft`,
`measure`, `talk`. Each strokes itself in as it enters the viewport, then holds a slow ambient
drift. They are abstract by design: a diagram of the idea rather than a picture of a person, so they
stay true when the copy changes.

```tsx
<Illustration scene="measure" height={150} />
```

## The imagery

**No image files are required.** Every project visual is a mockup drawn in code —
`src/components/mocks/registry.tsx` holds twenty interface studies (feed, upload, dashboard, dense
table, rota calendar, token plate, component sheet, wireframe, flow diagram, journey map, IA tree,
sketch sheet, invoice, and more), built from a shared primitive vocabulary in `primitives.tsx`.

Nothing to optimise, nothing to break, and they read as one system rather than twenty
illustrations. Every mockup is authored at a true design size and scaled to its container by
`Scaled.tsx`, so proportion and type size stay exactly as drawn at every breakpoint.

In content, a visual is:

```ts
{
  kind: 'dashboard',        // a key from MockKey — see types.ts
  frame: 'desktop',         // 'desktop' | 'mobile' | 'bare'
  tone: 'accent',           // 'neutral' | 'accent' | 'positive'
  label: 'FIG. 04 — OVERVIEW',
  caption: 'What this screen is arguing.',
  alt: 'Required. Describes the visual for screen readers.',
}
```

### Dropping in your real screens

Already wired. Put a file in `public/work/` and add one field:

```ts
cover: {
  kind: 'feed',                            // ignored once `image` is set
  frame: 'desktop',                        // still controls the device frame
  image: '/work/cemetric-discovery.webp',  // ← your screenshot or photo
  alt: 'Cemetric discovery page: filter rail on the left, athlete cards in a grid.',
}
```

It renders inside the same frame, cropped to the frame's proportions, lazily loaded and decoded off
the main thread. Delete the `image` line to go back to the drawn mockup, so you can migrate one
project at a time. See `public/work/README.md` for sizes.

Recommended: `.webp` or `.avif`, roughly 2× the display size — desktop frames are 1240×776, mobile
380×762, bare 1040×505.

---

## Design system

Every colour is a **semantic token** named for its job, with a light and a dark value. They live at
the top of `src/index.css`; `@theme inline` maps them onto Tailwind utilities, so `bg-canvas`,
`text-ink-soft` and `border-rule` all switch theme automatically.

| Token | Light | Dark | Role |
| --- | --- | --- | --- |
| `canvas` | `#FFFFFF` | `#0B0D12` | Page background |
| `surface` / `surface-2` | `#F7F8FA` / `#EEF1F6` | `#12151C` / `#181C25` | Cards, alternating sections, recessed panels |
| `ink` | `#101828` | `#F2F4F7` | Primary text |
| `ink-soft` / `ink-faint` | `#475467` / `#667085` | `#B6BDC9` / `#98A2B3` | Body and secondary text (all ≥ 4.5:1) |
| `rule` / `rule-strong` | `#E4E7EC` / `#D0D5DD` | `#232833` / `#333A48` | Borders and dividers |
| `accent` | `#4F46E5` | `#A5A0FB` | The one interactive colour: primary action, current state |
| `positive` | `#0A6D62` | `#2ED3B7` | Reserved: availability, success, outcomes |

To rebrand the whole site, change `--accent` in both blocks. Nothing else needs touching.

**Radius and elevation** are tokens too — `--radius-card` (20px), `--radius-panel` (16px),
`--radius-control` (10px) — and the `.card` utility carries the single shadow recipe, which becomes
a border in dark mode where shadows read as smudges.

Type: **Inter** only, self-hosted via `@fontsource`, so there is no third-party request on first
paint and no layout shift. Three utilities do most of the work: `.label` / `.label-sm` for small
uppercase eyebrows, `.display` for tracked-in headings, and `.nums` for tabular figures wherever
numbers line up in a column.

### Dark mode

Class-based (`.dark` on `<html>`), so the toggle can override the system preference:

- `src/lib/theme.ts` — `useTheme()`. Follows `prefers-color-scheme` until the visitor makes an
  explicit choice, then remembers it in `localStorage`.
- An inline script in `index.html` sets the class **before first paint**, so there is no flash of the
  wrong theme.
- `src/components/ThemeToggle.tsx` — the control. `aria-pressed` reports the current mode.
- Drawn mockups keep a light interior in both themes (via the `--m-*` tokens) because that is how a
  real product screenshot behaves; only the chrome around them changes.

---

## The scannable case study

`src/components/case/` holds the reading experience:

| File | What it does |
| --- | --- |
| `CaseSummary.tsx` | The *In short* card and the Quick/Full switch. Every value is derived from the project data, so it can never drift out of sync with the chapters |
| `ChapterTabs.tsx` | Sticky tab bar, active-chapter tracking, scroll progress. Replaces the thin right-hand rail from the first version, which was elegant and undiscoverable — and absent on phones |
| `CaseStudy.tsx` | The eleven chapters, and which of them the quick read keeps |
| `parts.tsx` | Chapter shell, openers, prose, fact lists, callouts |

To change what the quick read includes, edit `QUICK_CHAPTERS` in `src/lib/readingTime.ts`. Reading
times are computed from your actual word count, so they stay honest when you rewrite the copy.

Secondary material — research methods, competitor notes, IA trees, interaction lists — sits inside
`<Disclosure>`, a native `<details>` element. It is collapsed in the quick read and expanded in the
full read, and it works with keyboard, find-in-page and no JavaScript.

## Motion

What moves, and why:

| Effect | Where | Component |
| --- | --- | --- |
| Icons stroke themselves in | Section cards, chapter headings, summary tiles | `Icon animate="draw"` |
| Scenes draw, then drift | Section breaks | `Illustration` |
| Numbers count up | Hero facts, card outcomes, summary and impact metrics | `AnimatedNumber` |
| Screens wake — 2% scale and a short rise | Every mock and cover | `ScreenWake` |
| Button leans toward the cursor (4px) | Hero primary action | `MagneticLink` |
| Cards lift; icon tiles tilt | Work, process, philosophy, skills | `.card-hover`, `IconTile` |
| Text rises line by line | Statements | `LineReveal` |
| Content fades up on entry | Everywhere | `Reveal`, `Stagger` |

- Micro-interactions **150–300ms**, structural transitions **400–700ms**, easing
  `cubic-bezier(0.22, 1, 0.36, 1)`.
- Nothing loops in the reader's field of view except the illustration drift (7s, ~5px) and the
  availability dot.
- `MagneticLink` also disables itself on coarse pointers, where there is no hover to react to.
- `prefers-reduced-motion: reduce` is honoured everywhere: `Reveal`, `Stagger`, `LineReveal`,
  page transitions, the timeline meridian, the hero scroll indicator and the case-study progress bar
  all check `useReducedMotion()` and render the final state instantly. The CSS media query is a
  second safety net.
- Scroll reveals are `once: true` — nothing re-animates as you scroll back up.

One gotcha worth knowing if you extend the motion code: an element translated fully outside an
`overflow: hidden` parent never intersects the viewport, so `whileInView` on the element itself will
never fire. `LineReveal` puts the in-view test on the unclipped wrapper for exactly this reason.

---

## Accessibility

- Semantic landmarks, one `<h1>` per page, logical heading order.
- Skip-to-content link, visible `:focus-visible` outline on every interactive element (2px indigo,
  3px offset — never removed for aesthetics).
- **axe reports zero WCAG 2.1 AA violations** on the homepage and case-study pages, in both light
  and dark themes. Worth re-running after you change the palette or the copy.
- Every icon and illustration is `aria-hidden`: they sit beside a real text label, never instead of
  one. Under reduced motion all 216 drawn marks render complete and still — verified, not assumed.
- Every interactive target on mobile is at least 32px tall; buttons and links are 44px.
- Every drawn mockup carries a description via `role="img"` + `aria-label`; decorative SVG is
  `aria-hidden`.
- Interactive process steps and curiosity tags respond to hover **and** focus **and** click, so
  keyboard users get the same content.
- Filter buttons expose `aria-pressed`; the chapter rail exposes `aria-current`.

Worth doing before you publish: run axe or Lighthouse, tab through the whole page once, and check it
with reduced motion enabled in your OS.

---

## Routing & deployment

`BrowserRouter` with clean URLs (`/work/cemetric`), so the host needs an SPA rewrite:

- **Netlify** — `public/_redirects` is already included.
- **Vercel** — add `vercel.json`: `{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }`
- **GitHub Pages** — copy `dist/index.html` to `dist/404.html` after build, and set
  `base: '/<repo-name>/'` in `vite.config.ts` for a project site.
- **Cloudflare Pages / Render / Amplify** — enable "single-page app" rewrite.

Case studies are code-split, so the homepage doesn't ship eleven chapters of layout it may never
need.

---

## Structure

```
src/
├── App.tsx                       routes, page transitions, scroll + hash manager, skip link
├── main.tsx
├── index.css                     design tokens, base styles, utilities, reduced-motion
├── content/                      ← ALL COPY LIVES HERE
├── lib/
│   ├── theme.ts                  dark mode: system preference, persistence
│   ├── icons.ts                  tag / platform / chapter → icon maps
│   ├── readingTime.ts            reading estimates + which chapters the quick read keeps
│   └── useMeta.ts                per-route title / description / OG / canonical
├── pages/
│   ├── Home.tsx                  section order = the argument
│   └── CaseStudyPage.tsx         slug lookup + 404 state
└── components/
    ├── Navbar.tsx                sticky, compacts on scroll, full-screen mobile menu
    ├── Footer.tsx
    ├── ProjectCard.tsx           four layouts
    ├── Icon.tsx                  the 52-icon registry + IconTile
    ├── Illustration.tsx          five self-drawing SVG scenes
    ├── ThemeToggle.tsx           light / dark switch
    ├── ui.tsx                    Container, Section, SectionMark, Reveal, Stagger,
    │                             LineReveal, ActionLink, Pill, StepBadge,
    │                             Disclosure, Statement, BackToTop,
    │                             AnimatedNumber, MagneticLink, ScreenWake
    ├── case/
    │   ├── CaseSummary.tsx       the "In short" card + Quick/Full switch
    │   ├── ChapterTabs.tsx       sticky chapter tabs + scroll progress
    │   ├── CaseStudy.tsx         the eleven chapters
    │   └── parts.tsx             CasePart, Opener, Prose, FactList, Numbered, Callout
    ├── mocks/
    │   ├── Mock.tsx              device chrome, labels, captions, accessible descriptions
    │   ├── Scaled.tsx            authored-size → container scaling
    │   ├── primitives.tsx        the shared drawing vocabulary
    │   └── registry.tsx          the twenty interface studies
    └── sections/
        Hero · Intro · SelectedWork · ProcessSection · Philosophy · AboutSection ·
        SkillsSection · ExperienceTimeline · Testimonials · Curiosities · ContactCTA
```

---

## Checklist before you publish

- [ ] Replaced every `[PLACEHOLDER]` in `site.ts`
- [ ] Rewrote or replaced all five case studies
- [ ] Removed or verified every number in `impact.metrics`
- [ ] Deleted `footer.sampleNotice`
- [ ] Added `resume.pdf`, `og.png`, favicon, portrait
- [ ] Updated `index.html` meta, canonical URL and JSON-LD
- [ ] Set the sitemap URL in `robots.txt`
- [ ] Configured the SPA rewrite on your host
- [ ] Tabbed through the site; ran Lighthouse and axe in **both themes**; checked reduced motion
