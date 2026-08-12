import type { Project } from '../types'

/* ═══════════════════════════════════════════════════════════════════════════
   PLATE 04 — ATLAS DESIGN SYSTEM
   ▲ SAMPLE CASE STUDY. The structure is the deliverable; the copy is a
     placeholder written to show you the shape of a strong narrative. Replace
     the words, keep the eleven beats. All figures under `impact.metrics` are
     invented for layout purposes — swap them for measured results or delete
     them and keep `qualitative` only.
   ═══════════════════════════════════════════════════════════════════════════ */

export const atlas: Project = {
  slug: 'atlas',
  index: '04',
  title: 'Atlas Design System',
  subtitle: 'Three products from one company that looked like three companies.',
  tags: ['Design Systems', 'UI/UX', 'Web'],
  meta: {
    role: 'Product Designer — Design Systems',
    platform: 'Web · 3 products',
    year: '2024',
    industry: 'B2B SaaS',
    team: '2 designers · 4 engineers across 3 squads',
    timeline: '6 months, ongoing',
  },
  impactLine: 'Adoption, not authorship: 71% of production UI on shared components, and squads contributing back.',
  layout: 'meta-column',
  cover: {
    kind: 'components',
    frame: 'desktop',
    tone: 'accent',
    label: 'FIG. 01 — LIBRARY',
    alt: 'Atlas component library overview: a grid of shared components with variant and state labels beneath each.',
  },

  study: {
    /* 01 ─────────────────────────────────────────────────────────────────── */
    challenge: {
      statement: 'A component library is not a design system until somebody else ships with it.',
      body: [
        'The company sold three products to the same buyer. A customer could move between them in a single afternoon and meet three different button hierarchies, three date pickers, three ideas of what red meant. Sales decks showed one brand; the software did not.',
        'This was the second attempt. Eighteen months earlier the team had built a library — properly built it, with a Figma file, a published npm package and a documentation site. It was announced, and then it died. The components existed; the products did not use them.',
        'So the brief I was handed ("build the design system") was the wrong brief. The components were never the hard part. Getting three squads with three roadmaps to give up code they already trusted was the hard part, and nothing in the first attempt had addressed it.',
      ],
    },

    /* 02 ─────────────────────────────────────────────────────────────────── */
    context: {
      body: [
        'Atlas had to serve three products at different ages. The oldest was seven years of accumulated patterns and a styling approach nobody wanted to touch. The middle one had been rebuilt recently and had opinions of its own. The youngest was six months old and desperate for anything it could reuse.',
        'The three squads reported to different product managers with independent quarterly commitments. Nobody was measured on consistency. Any adoption cost that landed on a squad without a matching benefit was, correctly from their point of view, a tax.',
        'I came in as one of two designers on a system with no dedicated engineering team. The four engineers were embedded in the squads and lent to Atlas a few days a sprint. That constraint shaped everything: I could not build a system and hand it over, because there was nobody to hand it to.',
      ],
      facts: [
        { label: 'My role', value: 'Product Designer — audit, token architecture, component API design, governance, documentation, migration planning' },
        { label: 'Timeline', value: '6 months to v1, ongoing as a maintained system' },
        { label: 'Team', value: 'Two designers, four engineers borrowed from three squads, no dedicated platform team' },
        { label: 'Surfaces', value: 'Three web products, one shared React package, one Figma library' },
      ],
      constraints: [
        'No feature freeze — every migration had to happen alongside roadmap work',
        'The oldest product could not be re-themed at the CSS layer without regressions nobody had budget to chase',
        'Engineers were shared, so anything requiring sustained platform capacity was out of scope',
        'A previous failed library meant genuine scepticism; I had one credible attempt, not three',
        'Accessibility was a contractual requirement in two enterprise deals already signed',
      ],
    },

    /* 03 ─────────────────────────────────────────────────────────────────── */
    understanding: {
      intro:
        'I spent the first six weeks not designing. I needed two things: an honest inventory of what existed, and an honest account of why the last library was ignored. The second was more uncomfortable and more useful.',
      methods: [
        {
          label: 'Component audit across three products',
          detail:
            'Screenshotted and catalogued every interactive element in production. Three hundred and forty button variants, eleven date pickers, four different table components with incompatible sorting behaviour. The audit was the argument — nobody disputes a spreadsheet.',
        },
        {
          label: 'Codebase inventory',
          detail:
            'Scripted a pass over the three repositories counting imports, hardcoded hex values and one-off spacing. It told me which components were genuinely shared already, and which were copy-pasted forks with three years of divergent bug fixes inside them.',
        },
        {
          label: '9 designer and engineer interviews',
          detail:
            'Three per squad. I asked one question about the old library and then stopped talking: "walk me through the last time you decided not to use it." The answers were consistent and had nothing to do with component quality.',
        },
        {
          label: 'Adoption analytics on the previous library',
          detail:
            'Instrumented package imports per repository over the previous year. Adoption had peaked in week three and declined from there — the shape of an announcement, not the shape of a migration.',
        },
        {
          label: 'Failure post-mortem',
          detail:
            'Read the old library’s issue tracker end to end. Forty-one unanswered contribution requests. Every one of them was a squad trying to help and getting no reply, which is how a shared library teaches people to fork it.',
        },
      ],
      painPoints: [
        {
          title: 'The library was published, not migrated',
          body: 'It shipped as an announcement with a link to docs. Every unit of adoption work was pushed onto squads who had not asked for it, in the middle of quarters they had already committed. The library was available; adopting it was somebody else’s unfunded problem.',
        },
        {
          title: 'It asked for something before it gave anything',
          body: 'The first thing a squad had to do was delete working code and accept a component with fewer features than the one they had. The payoff — speed later — arrived long after the cost. Nobody trades in that direction voluntarily.',
        },
        {
          title: 'There was no way in',
          body: 'When a component was missing a variant, the options were open an issue that nobody triaged, or fork. Forking was faster and it worked. Forty-one dead requests turned three products into three private libraries with a shared ancestor.',
        },
        {
          title: 'Names described appearance, not intent',
          body: 'Tokens were called things like `indigo-600` and `grey-3`. When the brand shifted, every usage had to be reviewed by hand because the name recorded what a colour looked like rather than what job it was doing. Designers and engineers also used different names for the same value, so handoff was a translation exercise.',
        },
      ],
      competitors: [
        {
          name: 'Material Design',
          note: 'Read as a reference, not a rival. Its strength is completeness and its cost is opinion — adopting the whole thing means adopting a visual language we did not want. I took its documentation of component states and borrowed the rigour, not the aesthetics.',
        },
        {
          name: 'Carbon',
          note: 'The clearest public example of a token layer built for an enterprise product family with multiple themes. Its separation between raw palette and semantic role is what convinced me to spend three weeks on naming before drawing a single component.',
        },
        {
          name: 'Primer',
          note: 'Useful mainly for governance. Its published contribution path and deprecation policy show a system treated as a maintained product with a lifecycle, which was precisely the part our first attempt had no answer for.',
        },
      ],
      visual: {
        kind: 'table',
        frame: 'desktop',
        tone: 'neutral',
        label: 'FIG. 02 — AUDIT',
        caption:
          'The component audit. Three hundred and forty button variants across three products, grouped by intent to show how few distinct jobs they were actually doing.',
        alt: 'A dense audit table listing button variants found across three products, with columns for product, usage count, styling source and proposed replacement.',
      },
    },

    /* 04 ─────────────────────────────────────────────────────────────────── */
    insight: {
      statement: 'The first system failed because it was published rather than migrated — and because it asked designers to give something up before it gave them anything back.',
      support: [
        'Nobody adopts a library. They migrate to one, and a migration is work: pull requests, regression checks, a squad’s time. If the system does not do that work with the squad, the squad will not do it alone, and no amount of documentation changes that arithmetic.',
        'Adoption curves do not lie. The old package peaked three weeks after launch and decayed. That is the signature of an announcement people tried once, not of a system being absorbed into how the products get built.',
        'The order of the trade matters more than the size of it. Every squad that adopted something early did so because it arrived with a benefit already attached — a theming layer they wanted, a table they had been about to build anyway. Cost first, benefit later is a proposal people decline politely and then ignore.',
        'And a system with no contribution path is not shared, whatever the repository says. Forty-one unanswered requests taught three squads that forking was the supported workflow.',
      ],
    },

    /* 05 ─────────────────────────────────────────────────────────────────── */
    experience: {
      intro:
        'The experience I was designing was not a screen. It was what happens to a designer or engineer who needs something the system does not have yet — because that moment is where the old library lost. I designed it as a flow with owners, service levels and a visible queue, then wrote it down as an RFC process so it survived without me in the room.',
      flow: [
        {
          step: '01',
          label: 'Propose',
          detail: 'A one-page RFC in the shared repository: the problem, the products that hit it, the closest existing component. Fifteen minutes to write, and it is allowed to conclude "no new component needed".',
        },
        {
          step: '02',
          label: 'Triage',
          detail: 'Reviewed within five working days at a standing thirty-minute session with one designer and one engineer from each squad. Three outcomes only: extend an existing component, build a new one, or solve it locally with a documented exception.',
        },
        {
          step: '03',
          label: 'Build, paired',
          detail: 'The proposing squad builds it with an Atlas engineer alongside them. This is the part the first attempt skipped. It keeps the component grounded in a real use case and it means the squad that needed it has authorship of it.',
        },
        {
          step: '04',
          label: 'Review against the API rules',
          detail: 'Props checked against the naming and variant conventions, every state accounted for, keyboard and screen-reader behaviour verified before merge. The review is a checklist, not a matter of taste, so it does not depend on who is reviewing.',
        },
        {
          step: '05',
          label: 'Release and migrate',
          detail: 'Semantic version, changelog written for humans, and where the change is mechanical, a codemod shipped with it. Atlas opens the migration pull requests in the consuming products rather than filing tickets asking somebody else to.',
        },
        {
          step: '06',
          label: 'Deprecate',
          detail: 'The replaced pattern is marked deprecated with a console warning, a documented replacement and a removal date two minor versions out. Nothing is deleted without a stated alternative, and nothing stays deprecated forever.',
        },
      ],
      ia: [
        {
          label: 'Foundations',
          children: ['Colour and semantic tokens', 'Type scale', 'Spacing and layout grid', 'Elevation and rules', 'Motion tokens', 'Accessibility baseline'],
        },
        {
          label: 'Components',
          children: ['Anatomy', 'Props and API', 'Variants', 'States matrix', 'Accessibility notes', 'Do / instead-of examples'],
        },
        {
          label: 'Patterns',
          children: ['Forms and validation', 'Empty and error states', 'Tables and density', 'Navigation shells', 'Destructive confirmation'],
        },
        {
          label: 'Contributing',
          children: ['RFC template', 'Triage and service levels', 'Naming rules', 'Versioning policy', 'Deprecation policy', 'Adoption dashboard'],
        },
      ],
      visual: {
        kind: 'flow',
        frame: 'bare',
        tone: 'accent',
        label: 'FIG. 03 — CONTRIBUTION PATH',
        caption:
          'The contribution flow, with owners and service levels attached. Triage has exactly three outcomes, and one of them is a documented local exception — a legal answer, so people stop forking silently.',
        alt: 'A six-step contribution flow diagram running from RFC proposal through triage, paired build, API review, release with migration, and deprecation.',
      },
    },

    /* 06 ─────────────────────────────────────────────────────────────────── */
    exploring: {
      intro:
        'Three approaches were on the table, and the argument between them was about sequencing rather than craft. I wrote each one up as a plan with a cost per squad, because that is the number that actually decided it.',
      options: [
        {
          label: 'A',
          title: 'Version two, published properly',
          body: 'Rebuild the library to a higher standard, write comprehensive documentation, launch it with a proper internal announcement, and let teams adopt on their own schedule.',
          verdict: 'rejected',
          why: 'This is precisely what failed eighteen months earlier, and the failure had nothing to do with quality. Doing it again with better components would have produced a better library that nobody used. The scepticism in the room was itself evidence: three squads had already watched this plan run once.',
          visual: {
            kind: 'sketch',
            frame: 'bare',
            tone: 'neutral',
            label: 'FIG. 04 — OPTION A',
            alt: 'A rough sketch of the publish-and-announce model, with a single launch moment and adoption left to individual squads.',
          },
        },
        {
          label: 'B',
          title: 'Ship it as a migration, with paired engineering',
          body: 'Tokens first, then components in the order the products actually need them. Atlas engineers work inside each squad for part of every sprint and open the migration pull requests themselves. Coverage is tracked publicly per product.',
          verdict: 'chosen',
          why: 'It puts the cost of adoption on the system rather than on the squads, which is the only version of the trade anyone accepts. The public dashboard did more than I expected — once coverage was visible per product, squads started closing their own gaps without being asked, because the number was theirs.',
          visual: {
            kind: 'dashboard',
            frame: 'desktop',
            tone: 'positive',
            label: 'FIG. 05 — OPTION B',
            alt: 'An adoption dashboard showing component coverage per product over time, with per-squad breakdowns and remaining legacy imports.',
          },
        },
        {
          label: 'C',
          title: 'Tokens only, no shared components',
          body: 'Ship the semantic token layer as the entire system. Each product keeps its own components and simply consumes shared values, so nothing has to be rewritten.',
          verdict: 'rejected',
          why: 'Rejected as the whole answer — it would have made three products look related while leaving eleven date pickers and four table components in place, so the maintenance and accessibility problems survived untouched. But it was the most useful thing I explored. It proved tokens could land with almost no cost to a squad, so tokens became phase zero: three weeks in, all three products were visually coherent and every squad had received something before being asked for anything. That sequencing is why the component migration was welcome rather than resented.',
          visual: {
            kind: 'tokens',
            frame: 'desktop',
            tone: 'accent',
            label: 'FIG. 06 — OPTION C',
            alt: 'A token-only architecture diagram showing three products consuming one shared semantic token layer while keeping their own components.',
          },
        },
      ],
    },

    /* 07 ─────────────────────────────────────────────────────────────────── */
    system: {
      intro:
        'The system is three layers and one rule. Layer one is the raw palette — literal values with literal names, `indigo-600`, `sand-050`. Nothing in a product is ever allowed to reference this layer; it exists so that the layer above it has something to point at. Layer two is semantic tokens named for the job rather than the appearance: `surface.page`, `text.primary`, `action.primary`, `feedback.success`, `border.subtle`. Products consume only this layer. Layer three is component-scoped aliases (`button.primary.background`) that resolve to semantics, which is what makes a single component re-themable without touching a product. The rule: if a value appears in a product without a semantic name, it is a bug, and the linter treats it as one. This is not pedantry — the first library used appearance names, so when the brand shifted, every usage had to be read by a human to work out what it had meant. Renaming a semantic token is a find-and-replace; renaming `indigo-600` is an archaeology project. Type is a six-step scale with line heights baked into each step, so nobody sets them independently and drifts. Spacing is a four-based scale with only seven values, because a scale with twenty values is a suggestion rather than a system. Every component ships a full state matrix — default, hover, focus-visible, active, disabled, loading, error, empty, and the read-only variant everyone forgets — and the states are drawn before the component is considered designed. Focus is never removed and never colour-only. Component APIs follow three conventions written into the review checklist: `variant` for intent and never for colour, `size` from a shared three-step set, boolean props only for genuinely binary things. No `isBlueButton`, no props that exist to satisfy one screen. Every component page in the documentation carries anatomy, props, variants, the state matrix, accessibility notes and a "do this instead" section pointing at the pattern it replaces — that last section is what stops a component being reinvented next quarter.',
      colors: [
        {
          name: 'Ground',
          hex: '#F7F8FA',
          role: 'Raw value `sand-050`, exposed to products only as `surface.page`. The default canvas for all three products — a soft neutral rather than pure white, so content and data carry the visual weight instead of the chrome. Two semantic siblings, `surface.raised` and `surface.sunken`, resolve to neighbouring steps, which is why no product ever hardcodes a background.',
        },
        {
          name: 'Ink',
          hex: '#101828',
          role: 'Raw value `ink-900`, consumed as `text.primary` and `icon.primary`. Near-black rather than pure black. The semantic layer also defines `text.secondary` and `text.disabled` as opacity-derived steps, so hierarchy comes from three named tokens rather than whatever grey a designer had open.',
        },
        {
          name: 'Indigo',
          hex: '#4F46E5',
          role: 'Raw value `indigo-600`, exposed as `action.primary` and `state.selected`. The single accent, and the clearest argument for semantic naming: products asking for `action.primary` rather than `indigo-600` is what lets a future theme change one line instead of four hundred usages.',
        },
        {
          name: 'Signal',
          hex: '#0E9384',
          role: 'Raw value `teal-700`, exposed only as `feedback.success` and `status.passing`. Deliberately narrow. Because the semantic name is scoped to meaning, the linter can flag a positive border used decoratively — something an appearance-named token cannot detect.',
        },
        {
          name: 'Rule',
          hex: '#E4E7EC',
          role: 'Raw value `sand-300`, consumed as `border.subtle` and `divider.default`. Structure without shadow: tables, cards and input outlines all resolve here, which is why the three products stopped disagreeing about what a boundary looks like.',
        },
      ],
      type: [
        { name: 'Display', role: 'Page and section titles. Steps 5 and 6 of the scale, line height fixed to the step.', sample: 'Foundations · Semantic tokens' },
        { name: 'Body', role: 'Interface copy and documentation prose, 16px baseline at step 3.', sample: 'Products consume semantic tokens. The raw palette is not importable.' },
        { name: 'Apparatus', role: 'Token names, props, labels and code references. Monospace, tabular figures.', sample: 'action.primary → indigo-600' },
      ],
      components: [
        {
          name: 'Button',
          note: 'Four intents (`primary`, `secondary`, `subtle`, `destructive`) as `variant`, never as colour props. Three sizes from the shared set. Eight states including loading and focus-visible. Replaced three hundred and forty audited variants, which mostly proved the products had four jobs and no vocabulary for them.',
        },
        {
          name: 'Field',
          note: 'One wrapper owning label, help text, error, required marker and the `aria-describedby` wiring, so validation cannot be styled inconsistently per product. Inputs slot into it. Read-only and disabled are distinct states with distinct meanings, documented because two squads had been using them interchangeably.',
        },
        {
          name: 'Table',
          note: 'Replaced four incompatible implementations. Three densities driven by a `density` token rather than per-instance overrides, sortable headers with real keyboard and `aria-sort` support, sticky header, and a documented empty state. The most negotiated component in the system and the one that saved the most time.',
        },
        {
          name: 'Modal',
          note: 'Focus trap, restore-on-close, escape handling and scroll lock solved once. Three sizes, no arbitrary widths. Exists mainly because every product had reimplemented focus management and all three had done it slightly wrong.',
        },
        {
          name: 'Feedback',
          note: 'Inline, toast and banner variants sharing one status vocabulary bound to `feedback.*` tokens. Status is carried by icon and text as well as colour, so it survives colour-blindness and greyscale printing.',
        },
        {
          name: 'Navigation shell',
          note: 'The app frame: sidebar, header, breadcrumb and content region with landmark roles and a skip link built in. Themable per product through component-scoped aliases, which is how three products keep distinct identities without three codebases.',
        },
      ],
      outcome:
        'Forty-eight components with documented APIs and full state matrices, sitting on eighty-one semantic tokens resolving to a raw palette of twenty-six values. The measurable outcome is duplication removed: two hundred and fourteen bespoke components deleted across three repositories. The more useful outcome is that arguments changed shape. "Which grey" and "is this the same red as theirs" stopped being questions, and reviews moved to whether a component belonged in the system at all — which is the conversation a maintained system is supposed to be having.',
    },

    /* 08 ─────────────────────────────────────────────────────────────────── */
    final: {
      intro:
        'What shipped is deliberately unexciting to look at. A design system that draws attention to itself is competing with the products that depend on it — the work is visible in what the three products stopped having to decide.',
      screens: [
        {
          kind: 'components',
          frame: 'desktop',
          tone: 'accent',
          label: 'FIG. 07 — LIBRARY',
          caption: 'The component index. Every entry shows variant count, state coverage and which products consume it, so gaps are visible without reading a changelog.',
          alt: 'Component library index page listing forty-eight components in a grid, each with variant, state-coverage and consuming-product labels.',
        },
        {
          kind: 'tokens',
          frame: 'desktop',
          tone: 'neutral',
          label: 'FIG. 08 — TOKENS',
          caption: 'The token reference. Semantic name, resolved raw value, and permitted usage side by side — the raw column is informational, not an import path.',
          alt: 'Token documentation page showing semantic token names in one column, the raw palette values they resolve to in another, and usage rules alongside.',
        },
        {
          kind: 'settings',
          frame: 'desktop',
          tone: 'accent',
          label: 'FIG. 09 — THEMING',
          caption: 'The theming and density playground. Switching theme or density re-renders every component on the page, which is how we caught the assumptions hardcoded into two of them.',
          alt: 'A theming control panel with theme, density and motion toggles beside a live preview of components re-rendering under the selected settings.',
        },
        {
          kind: 'dashboard',
          frame: 'desktop',
          tone: 'positive',
          label: 'FIG. 10 — ADOPTION',
          caption: 'The adoption dashboard, visible to everyone. Coverage per product, remaining legacy imports, and the deprecation queue with removal dates attached.',
          alt: 'Adoption dashboard with coverage percentages per product, a trend chart, a list of remaining legacy component imports and a deprecation queue.',
        },
      ],
    },

    /* 09 ─────────────────────────────────────────────────────────────────── */
    prototype: {
      intro:
        'For a system, the prototype is not a happy path — it is the matrix. I prototyped the awkward combinations, because a component that only works in its default state is a screenshot, not a component.',
      interactions: [
        {
          name: 'State matrices',
          detail: 'Every component prototyped across all eight states at all three sizes and all three densities, on one page. Tedious, and it caught the disabled-plus-loading combination that three squads had each solved differently and none had documented.',
        },
        {
          name: 'Focus order',
          detail: 'Tabbed every composite pattern with the mouse unplugged. Focus is visible on every interactive element, order follows visual order, and modal focus returns to the trigger on close. Where those conflicted, the pattern was rebuilt rather than annotated.',
        },
        {
          name: 'Theming',
          detail: 'A live switch between the three product themes. Because products consume semantics and components consume aliases, a theme is a token file — the prototype exists to prove nothing leaked, and twice it proved something had.',
        },
        {
          name: 'Density switching',
          detail: 'Comfortable, compact and condensed driven by one token, switchable at runtime. Tables and forms were prototyped at all three, because condensed is where touch targets and truncation quietly break.',
        },
        {
          name: 'Motion tokens',
          detail: 'Three durations and two easings, named for purpose (`motion.enter`, `motion.exit`, `motion.state`). Prototyped so reviewers argued about the tokens once rather than about each transition forever.',
        },
        {
          name: 'Reduced motion',
          detail: 'Every motion token has a no-motion resolution that changes state instantly. Prototyped with the preference on, so nothing in the system depends on animation to be understood.',
        },
      ],
    },

    /* 10 ─────────────────────────────────────────────────────────────────── */
    impact: {
      intro:
        'Measured six months after phase zero, across the three consuming products. Coverage is the number I care about, because it is the only one the first attempt could not produce.',
      metrics: [
        { value: '71%', label: 'Component coverage', note: 'Share of production UI rendered by Atlas components across all three products' },
        { value: '−38%', label: 'Time to ship a standard screen', note: 'Median from design start to merged, for screens with no novel patterns' },
        { value: '214', label: 'Duplicate components removed', note: 'Bespoke implementations deleted from three repositories' },
        { value: '−64%', label: 'Accessibility failures', note: 'Automated audit failures per product; focus and contrast issues largely resolved at the token layer' },
      ],
      qualitative: [
        'Squads began contributing instead of forking. Nineteen RFCs in six months, eleven of them concluding that no new component was needed — which is the outcome that proves the path is being used honestly rather than as a request queue.',
        'The adoption dashboard changed the politics. Once coverage was visible per product, migration stopped being something Atlas asked for and became something squads reported on, and two of them closed gaps I had not scheduled.',
        'Design reviews got shorter and better. With colour, spacing and state settled by the system, reviews moved from "which grey" to whether the flow was right — and the youngest product shipped two features with no foundational design work at all.',
      ],
    },

    /* 11 ─────────────────────────────────────────────────────────────────── */
    reflection: {
      worked:
        'Sequencing tokens before components. Three weeks of work gave every squad a visible benefit before Atlas asked anyone for anything, and it inverted the trade that killed the first library. The paired engineering model did the rest: the system opened the migration pull requests, so adoption was never an unfunded ask.',
      didnt:
        'I over-documented before anyone had adopted anything. I wrote roughly forty pages of foundations documentation in month two — usage rules, rationale, decision records — and almost none of it was read, because nobody reads documentation for a system they are not yet using. I also had to reverse a naming decision in public. I shipped a numeric surface scale (`surface.1`, `surface.2`, `surface.3`) on the theory that it was flexible, and within a month every product was using the numbers to mean different things. I renamed them to `surface.page`, `surface.raised` and `surface.sunken`, which meant a breaking release, a codemod and an apology at the standing session six weeks after I had argued for the numbers.',
      improve:
        'I would write the contribution path and the deprecation policy in week one, before any component. Governance was the actual product and I treated it as month-three work. I would also cap documentation at one page per component until coverage passed roughly a quarter, then write the deep material against real questions people had asked instead of the ones I imagined they would.',
      learned:
        'That a design system is an adoption problem wearing a component problem’s clothes. The craft in the components is necessary and it is not what determines whether the system lives — sequencing, governance and who pays the migration cost determine that. I now judge a system by two things: how fast somebody with an unmet need gets a real answer, and whether the last release removed anything. A system that only ever adds is a library that has not learned to say no.',
    },
  },
}
