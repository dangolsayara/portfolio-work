import type { Project } from '../types'

/* ═══════════════════════════════════════════════════════════════════════════
   PLATE 03 — NORTHWIND CARE
   ▲ SAMPLE CASE STUDY. The structure is the deliverable; the copy is a
     placeholder written to show you the shape of a strong narrative. Replace
     the words, keep the eleven beats. All figures under `impact.metrics` are
     invented for layout purposes — swap them for measured results or delete
     them and keep `qualitative` only.
   ═══════════════════════════════════════════════════════════════════════════ */

export const northwind: Project = {
  slug: 'northwind',
  index: '03',
  title: 'Northwind Care',
  subtitle: 'The rota software could compute a schedule; it could not hold what the coordinator knew.',
  tags: ['Product Design', 'UI/UX', 'Web'],
  meta: {
    role: 'Lead Product Designer',
    platform: 'Web app (desktop-first)',
    year: '2025',
    industry: 'Healthcare Operations',
    team: '1 designer · 6 engineers · 1 PM · clinical advisor',
    timeline: '20 weeks',
  },
  impactLine: 'Coordinators came back off the spreadsheets; overrides became reusable constraints instead of daily rework.',
  layout: 'asymmetric',
  cover: {
    kind: 'calendar',
    frame: 'desktop',
    tone: 'accent',
    label: 'FIG. 01 — WEEK ROTA',
    alt: 'Northwind Care weekly rota board: carer rows across a seven-day grid, visit blocks with client initials, travel gaps and unfilled slots marked.',
  },

  study: {
    /* 01 ─────────────────────────────────────────────────────────────────── */
    challenge: {
      statement: 'Every coordinator we had built for was doing the real work somewhere else.',
      body: [
        'Northwind Care is scheduling software for community and home-care providers. A coordinator builds the visit rota for a region: sixty to ninety care workers, four hundred clients, roughly two and a half thousand visits a week, each one a named person arriving at a named door inside a promised window.',
        'The product had an optimiser, a rules engine and a compliance report. It also had four regions where coordinators had quietly stopped using it to plan. They planned in a spreadsheet, argued with a whiteboard, and typed the finished rota back into Northwind on Friday afternoon so the payroll export would run.',
        'The company read this as training debt and low adoption. I read the Friday typing as the strongest signal in the product: people were paying a two-hour tax every week to keep planning somewhere the software could not reach.',
      ],
    },

    /* 02 ─────────────────────────────────────────────────────────────────── */
    context: {
      body: [
        'Care scheduling is not a puzzle with one right answer. A visit has a legal shape — minimum rest between shifts, maximum consecutive days, working-time limits, a qualification the visit requires and the carer must hold. Underneath that sits a second layer that no rules engine had ever been told about: which carer a client will actually open the door to, who is on the third day of a bad back, which hillside round is impossible in the rain, which two carers cannot be sent to the same house.',
        'Coordinators are experts. Most had five to fifteen years in the role, several had been carers themselves, and they could rebuild a collapsed morning in about ninety seconds — on paper. The existing software asked them to express that judgement as a series of dropdowns, and when it disagreed it simply reassigned their work overnight.',
        'I joined as the only designer, reporting into a PM who had already agreed the goal with the executive team: get planning back into the product. What that meant in the interface was undecided, and the prevailing internal answer was "make it simpler", which I came to think was the wrong instinct.',
      ],
      facts: [
        { label: 'My role', value: 'Lead Product Designer — field research, IA, flows, interaction, design system, handoff, accessibility' },
        { label: 'Timeline', value: '20 weeks, three releases behind a per-region flag' },
        { label: 'Team', value: 'Me, a PM, six engineers, a clinical advisor two days a week' },
        { label: 'Surfaces', value: 'Desktop-first web planning app; read-only companion view for the carer app team' },
      ],
      constraints: [
        'Statutory shift rules are non-negotiable — rest periods, consecutive-day limits and qualification matching can be explained but never overridden',
        'A four-year-old codebase with the optimiser wired directly to the rota table; anything that changed the write path had to ship behind a region flag',
        'Carers work from vans with patchy signal — published rotas must survive going offline, so a rota cannot be a live document that shifts under someone mid-shift',
        'The payroll and invoicing exports were untouchable; whatever we built had to keep producing the same file, to the byte',
        'Zero training budget. Coordinators would get a release note and a fifteen-minute call, so the new model had to be learnable in place',
      ],
    },

    /* 03 ─────────────────────────────────────────────────────────────────── */
    understanding: {
      intro:
        'I could not learn this from a screen recording. The decisions I needed to see were happening on paper, in a corridor, and in a phone call at 06:40 — so I went and sat next to them.',
      methods: [
        {
          label: 'Four days of on-site observation',
          detail:
            'Two regions, a Monday build and a Thursday firefight in each. I logged every decision and where it was made. Sixty-one per cent of planning decisions in the observed sessions happened outside Northwind, and about a third involved a fact the software had no field for.',
        },
        {
          label: '9 coordinator interviews',
          detail:
            'Semi-structured, each anchored on one real rota they had built that week. I asked them to explain the assignments an optimiser would have got wrong, and why. Every one of them could, immediately, without looking.',
        },
        {
          label: 'Spreadsheet and whiteboard artefact study',
          detail:
            'I collected eleven of the shadow spreadsheets. They were not simpler than our product — several were denser. What they had was columns of the coordinator\'s own invention: "will not accept male carer", "needs the early van", "do not pair".',
        },
        {
          label: 'Override log analysis',
          detail:
            'Eighteen months of manual reassignments. Around forty per cent of overrides repeated the same carer–client pairing more than five times. The system was recording these as one-off exceptions and discarding the pattern every night.',
        },
        {
          label: 'Ride-alongs with three carers',
          detail:
            'Two urban rounds and one rural. The rural round was the one that mattered: it showed me that travel time in the model was arithmetic, and travel time in reality was a locked gate, a hill and a bus timetable.',
        },
      ],
      painPoints: [
        {
          title: 'The optimiser overwrote judgement overnight',
          body: 'A coordinator would place a carer deliberately, and the next scheduled solve would move them for a two-minute travel gain. Nothing in the interface let them say "this one is fixed, and here is why", so the only durable defence was to plan outside the product entirely.',
        },
        {
          title: 'Knowledge had nowhere to live',
          body: 'Client preferences, incompatible pairings, a carer\'s temporary lifting restriction — all of it existed in free-text notes nobody read at assignment time, or in one coordinator\'s memory. When she took annual leave, the region\'s rota quality dropped visibly.',
        },
        {
          title: 'Violations were reported, not explained',
          body: 'The compliance panel listed forty-one red rows with a rule code. Working out which visit caused which breach, and what would fix it, took a coordinator through five screens — so they checked compliance at the end, when everything was expensive to change.',
        },
        {
          title: 'Density was punished, not supported',
          body: 'The rota grid showed nine carers at a time and no travel gaps. Coordinators printed it, taped four sheets together, and worked on the paper. The product had decided that less on screen was kinder; for this job it was just less information.',
        },
      ],
      competitors: [
        { name: 'Enterprise workforce suite', note: 'Powerful constraint solver, no way to enter a soft human constraint. Its own documentation calls coordinator changes "exceptions" — which is exactly the framing that loses the knowledge.' },
        { name: 'Regional rota tool', note: 'Beautifully calm interface, one visit per card, six carers visible. Sold on simplicity and abandoned at scale; two of our interviewees had used and left it.' },
        { name: 'Spreadsheets', note: 'The real incumbent. Infinitely dense, instantly editable, no rules, no audit trail, no export. Whatever we built had to beat it on edit speed before anything else.' },
      ],
      visual: {
        kind: 'journey',
        frame: 'bare',
        tone: 'neutral',
        label: 'FIG. 02 — WHERE THE WORK HAPPENED',
        caption:
          'A Monday rota build, mapped by location of decision rather than by step. The shaded band is time spent outside the product we were being asked to improve.',
        alt: 'A journey map of a coordinator building a weekly rota, with decisions plotted as happening in the software, in a spreadsheet, on a whiteboard or on the phone.',
      },
    },

    /* 04 ─────────────────────────────────────────────────────────────────── */
    insight: {
      statement:
        'The software optimised for the assignment it could compute, and had no way to hold what the coordinator knew.',
      support: [
        'Every constraint the system understood was one it could measure — distance, duration, qualification, cost. Every constraint that actually decided the rota was one it could not: acceptance, fragility, weather, the politics of a shared house.',
        'So the coordinator\'s expertise could only ever enter the system as a correction after the fact, and a correction is by definition temporary. Forty per cent of overrides were the same override, made again, because the product treated knowledge as an exception rather than an input.',
        'That reframed the brief. The problem was not that the interface was too complex for the user — the user was more sophisticated than the interface. The problem was that judgement was unspeakable in the data model.',
        'Which gave me the rule the whole design hangs on: the system proposes, the human decides, and every override is captured as a constraint rather than discarded as an exception. Density done kindly — not less information, but information that earns its place and never argues with the person reading it.',
      ],
    },

    /* 05 ─────────────────────────────────────────────────────────────────── */
    experience: {
      intro:
        'I designed the week as one continuous surface a coordinator works across, rather than a sequence of screens they pass through. The optimiser became a colleague who suggests and shows its reasoning, and the coordinator became the author of record — including the author of the rules the optimiser has to respect next time.',
      flow: [
        {
          step: '01',
          label: 'Open the week',
          detail:
            'The rota loads as last left, not as freshly solved. Nothing has moved since Friday. Carer rows, visit blocks, travel gaps and unfilled slots are all visible at once, twenty-eight rows deep before scrolling.',
        },
        {
          step: '02',
          label: 'Read the proposal',
          detail:
            'Suggested assignments arrive as outlined blocks, visually distinct from committed ones by pattern and label as well as tone. Each carries a one-line reason: "nearest qualified, seen this client 14 times".',
        },
        {
          step: '03',
          label: 'Interrogate',
          detail:
            'Selecting any visit shows what the system considered and rejected, ranked, with the reason each candidate lost. This is the screen that earned trust; coordinators stopped asking why and started arguing with specifics.',
        },
        {
          step: '04',
          label: 'Override',
          detail:
            'Dsurface a visit to the carer you know is right. Statutory breaches are refused with a plain-language explanation and a route to the fixable part; everything else is accepted immediately, without a dialogue.',
        },
        {
          step: '05',
          label: 'Capture the reason',
          detail:
            'One optional line after an override, offered as chips drawn from real language — preference, pairing, route, capability, temporary. Answering teaches the model; ignoring it costs nothing and still keeps the assignment.',
        },
        {
          step: '06',
          label: 'Publish and hold',
          detail:
            'Publishing freezes the week for the carer apps and vans. Later changes become explicit amendments with a notification trail, so nothing shifts under someone who is already offline and driving.',
        },
      ],
      ia: [
        {
          label: 'Rota',
          children: ['Week board', 'Day board', 'Unfilled visits', 'Amendments', 'Publish history'],
        },
        {
          label: 'Constraints',
          children: ['Statutory rules', 'Client preferences', 'Carer capabilities', 'Do-not-pair', 'Temporary restrictions'],
        },
        {
          label: 'People',
          children: ['Carers', 'Availability', 'Clients', 'Care packages'],
        },
        {
          label: 'Review',
          children: ['Compliance', 'Travel and cost', 'Continuity', 'Payroll export'],
        },
      ],
      visual: {
        kind: 'flow',
        frame: 'bare',
        tone: 'accent',
        label: 'FIG. 03 — PROPOSE, OVERRIDE, LEARN',
        caption:
          'The loop the product was missing. An override used to end in the audit log; it now ends in the constraint library, where the next solve has to respect it.',
        alt: 'A six-step flow diagram showing a suggested assignment, a coordinator override, an optional captured reason, and that reason feeding back into the constraint set.',
      },
    },

    /* 06 ─────────────────────────────────────────────────────────────────── */
    exploring: {
      intro:
        'Three directions survived the first fortnight of sketching. I built each far enough to test the belief underneath it, in front of the same four coordinators, on their own regions\' data.',
      options: [
        {
          label: 'A',
          title: 'Guided queue',
          body: 'Retire the grid. Present unassigned visits one at a time as a decision queue with three ranked candidates and a confirm action.',
          verdict: 'rejected',
          why:
            'This was the "make it simpler" answer and it failed hard. Coordinators do not schedule one visit at a time — they see that Tuesday morning is thin and move four visits together to protect it. Stripping the week removed the peripheral vision the job runs on. One coordinator got eleven visits in and said she had no idea whether she was making things better or worse.',
          visual: {
            kind: 'wireframe',
            frame: 'desktop',
            tone: 'neutral',
            label: 'FIG. 04 — CONCEPT A',
            caption: 'One decision per screen. Calm, testable, and blind to everything the coordinator was actually reasoning about.',
            alt: 'Wireframe of a single-decision queue interface showing one unassigned visit with three ranked carer suggestions.',
          },
        },
        {
          label: 'B',
          title: 'Dense board with a reasoning layer',
          body: 'Keep the full week visible and add two things it never had: travel gaps drawn to scale, and an inspector that explains every suggestion and every warning in place.',
          verdict: 'chosen',
          why:
            'It won on the only measure that mattered — a coordinator could rebuild a collapsed morning faster here than in her own spreadsheet, because the board matched her mental model and the inspector answered the question she would otherwise have phoned someone about. Density stopped being the problem once nothing on the board was unexplained.',
          visual: {
            kind: 'calendar',
            frame: 'desktop',
            tone: 'accent',
            label: 'FIG. 05 — CONCEPT B',
            caption: 'Twenty-eight carer rows, travel drawn to scale, suggestions outlined rather than filled. The inspector opens without displacing the grid.',
            alt: 'Wireframe of a dense weekly rota board with many carer rows, scaled travel gaps between visits, and a side inspector panel explaining one assignment.',
          },
        },
        {
          label: 'C',
          title: 'Constraint-authoring workspace',
          body: 'Treat the rota as an output. Coordinators spend their time writing and tuning rules, then read a solved week and approve it.',
          verdict: 'rejected',
          why:
            'Rejected as a whole product and mined for the best idea in the project. Nobody wanted to maintain a rulebook in the abstract — writing rules ahead of a problem felt like paperwork, and the prototype sat unused. But watching them author constraints taught me the vocabulary they used to justify a decision, and that became the override-reason chips in concept B. The capture step exists because concept C failed in a specific, useful way.',
          visual: {
            kind: 'settings',
            frame: 'desktop',
            tone: 'neutral',
            label: 'FIG. 06 — CONCEPT C',
            caption: 'Rules first, rota second. Unloved as a workspace; its language survived as the override-capture chips.',
            alt: 'Wireframe of a constraint authoring workspace listing scheduling rules with conditions, scopes and priorities.',
          },
        },
      ],
    },

    /* 07 ─────────────────────────────────────────────────────────────────── */
    system: {
      intro:
        'A board holding two and a half thousand visits punishes every inconsistency. Before drawing screens I fixed the vocabulary — what a suggestion looks like, what a breach looks like, what "published" looks like — because on a surface this dense an unexplained variation reads as a status the coordinator has to decode.',
      colors: [
        {
          name: 'Ground',
          hex: '#F7F8FA',
          role: 'The board surface. Deliberately recessive so that visit blocks, not the canvas, carry the contrast on a screen someone stares at for six hours.',
        },
        {
          name: 'Ink',
          hex: '#101828',
          role: 'All text, client initials and visit times. Near-black rather than pure black, and never lightened below AA on any tone in this set — including inside filled blocks. There is deliberately no alarm hue in the palette: a breach is carried by an ink hatch, an icon and the named rule, because a coordinator scanning a thousand blocks cannot be asked to distinguish two reds.',
        },
        {
          name: 'Indigo',
          hex: '#4F46E5',
          role: 'Selection and system proposal. It marks what the optimiser is suggesting and what the coordinator currently has open. One accent, so an outlined accent block reliably means "not yours yet".',
        },
        {
          name: 'Signal',
          hex: '#0E9384',
          role: 'Confirmed and published only. Reserved hard: a positive edge means this visit is committed and has gone to the vans, and it appears nowhere else in the interface.',
        },
        {
          name: 'Rule',
          hex: '#E4E7EC',
          role: 'Grid lines, hour marks, row separators and travel gaps. It does the structural work that shadows and boxes would otherwise do, which keeps a dense board legible.',
        },
      ],
      type: [
        { name: 'Display', role: 'Page and panel titles, week ranges', sample: 'Week 14 · North Valley · 2,418 visits' },
        { name: 'Body', role: 'Interface copy and explanations, 15px baseline on the board', sample: 'Moved by you. Kept because this client has refused two other carers.' },
        { name: 'Apparatus', role: 'Times, durations, initials, rule codes — tabular figures so columns align down a long grid', sample: '07:45–08:15 · 30M · R.O. · WTR-04' },
      ],
      components: [
        {
          name: 'Visit block',
          note: 'The atom of the product. Six states — unfilled, suggested, assigned, overridden, published, breaching — each distinguished by fill, border treatment, an icon and a text label. Colour is never the only difference.',
        },
        {
          name: 'Carer row',
          note: 'Three densities from one component: comfortable, compact and a 20px scan mode for reading a whole region. Travel gaps are drawn to scale in all three.',
        },
        {
          name: 'Reasoning inspector',
          note: 'Opens beside the board without reflowing it. Shows the ranked candidates the optimiser considered and the reason each one lost, in the coordinator\'s own vocabulary.',
        },
        {
          name: 'Constraint chip',
          note: 'One captured piece of knowledge — preference, pairing, route, capability, temporary. Carries scope, author and expiry, and can be dismissed from the visit it constrains.',
        },
        {
          name: 'Breach explainer',
          note: 'Replaces the rule-code list. Names the rule in plain English, points at the two visits in conflict, and offers the smallest change that would resolve it.',
        },
        {
          name: 'Publish bar',
          note: 'Persistent summary of what is about to change, who is affected and which carers are currently offline. Amendments after publish route through the same component.',
        },
      ],
      outcome:
        'Thirty-four components with documented states, and a written rule that no state may be signalled by colour alone — every one also carries a shape, an icon or a word, which is what made the board usable for the two coordinators in the pilot with colour-vision deficiency. The practical dividend was speed: the third release added the day board and the amendment trail with no new foundational work, and engineers stopped inventing statuses in the grid.',
    },

    /* 08 ─────────────────────────────────────────────────────────────────── */
    final: {
      intro:
        'The finished product is denser than what it replaced, and that is the point. It shows more, explains everything it shows, and never quietly changes its mind about the coordinator\'s work.',
      screens: [
        {
          kind: 'calendar',
          frame: 'desktop',
          tone: 'accent',
          label: 'FIG. 07 — WEEK BOARD',
          caption:
            'Twenty-eight carers, seven days, travel drawn to scale. Outlined blocks are proposals, solid are committed, hatched are breaching — legible without relying on colour.',
          alt: 'Desktop weekly rota board with carer rows, visit blocks in outlined and solid treatments, scaled travel gaps, and a column of unfilled visits on the right.',
        },
        {
          kind: 'table',
          frame: 'desktop',
          tone: 'neutral',
          label: 'FIG. 08 — REASONING INSPECTOR',
          caption:
            'Why this carer, and who else was considered. Each rejected candidate carries the reason it lost, which is what turned arguments with the optimiser into decisions.',
          alt: 'Inspector panel listing ranked carer candidates for one visit in a table, with travel time, continuity count and the reason each candidate was rejected.',
        },
        {
          kind: 'form',
          frame: 'desktop',
          tone: 'accent',
          label: 'FIG. 09 — OVERRIDE CAPTURE',
          caption:
            'One optional line after a manual move. Chips use the coordinator\'s language; skipping is free, and the assignment is already saved before this appears.',
          alt: 'Override capture panel showing a completed manual assignment with optional reason chips for preference, pairing, route, capability and temporary restriction.',
        },
        {
          kind: 'dashboard',
          frame: 'desktop',
          tone: 'positive',
          label: 'FIG. 10 — REVIEW BEFORE PUBLISH',
          caption:
            'Compliance, continuity, travel and cost read together rather than in four places, with the offline vans listed by name before anything is sent.',
          alt: 'Pre-publish review dashboard showing compliance breaches, client continuity, travel totals, cost against budget and a list of carers currently offline.',
        },
      ],
    },

    /* 09 ─────────────────────────────────────────────────────────────────── */
    prototype: {
      intro:
        'The whole argument was about how it felt to move fifty visits with real consequences attached, so I prototyped the board against a copy of one region\'s actual week. Static frames could not have settled a single one of these decisions.',
      interactions: [
        {
          name: 'Dsurface with live legality',
          detail:
            'While dragging, target rows show whether the move is legal and what it costs in travel. Statutory breaches refuse the drop and say which rule and which other visit; soft conflicts accept it and annotate.',
        },
        {
          name: 'Multi-select move',
          detail:
            'Shift-select a run of visits and move them as one, because protecting a thin Tuesday morning is a single decision to a coordinator, not four. Full keyboard equivalents — arrows to traverse, space to lift, enter to drop.',
        },
        {
          name: 'Inspector without displacement',
          detail:
            'Opening the inspector never reflows the grid. The board holds position so the coordinator does not lose the row they were reading, which was the single most requested behaviour in testing.',
        },
        {
          name: 'Deferred capture',
          detail:
            'The reason prompt appears after the move is saved, never as a gate. It can be answered later from the amendments list, so a firefight is never slowed down by bookkeeping.',
        },
        {
          name: 'Publish as a held snapshot',
          detail:
            'Publishing freezes the week and disables silent re-solving. Post-publish edits become named amendments with an explicit notification, and the bar states plainly which carers are offline and will see it late.',
        },
        {
          name: 'Reduced motion and zoom',
          detail:
            'Every transition has an instant equivalent, and the board holds up to 200% browser zoom by reducing rows rather than reflowing the grid. Nothing on the board depends on animation or hover to be understood.',
        },
      ],
    },

    /* 10 ─────────────────────────────────────────────────────────────────── */
    impact: {
      intro:
        'Measured across the four pilot regions over the twelve weeks after the second release, against the same twelve weeks the previous year.',
      metrics: [
        { value: '−63%', label: 'Planning done outside the product', note: 'Observed decisions made in spreadsheets or on the whiteboard' },
        { value: '−38%', label: 'Time to build a week', note: 'Monday rota build, coordinator-timed across the four pilot regions' },
        { value: '2.1k', label: 'Constraints captured', note: 'Knowledge that previously lived in memory or an unread note field' },
        { value: '−27%', label: 'Repeat overrides', note: 'The same carer–client correction being made again the following week' },
      ],
      qualitative: [
        'Three of the four pilot regions stopped keeping a shadow spreadsheet. The fourth kept one for annual leave, which was a genuine gap we had not designed for and shipped later.',
        'Handover stopped depending on one person. A coordinator covering an unfamiliar region could read why an assignment existed instead of phoning the colleague who was on holiday, because the reasons were now in the rota rather than in her head.',
        'The optimiser\'s reputation changed without the optimiser changing much. Once it showed its reasoning and stopped overwriting decisions, coordinators started accepting more of its suggestions than they had when it was silently correct.',
      ],
    },

    /* 11 ─────────────────────────────────────────────────────────────────── */
    reflection: {
      worked:
        'Refusing the brief. "Make it simpler" would have shipped concept A, and concept A failed in front of a coordinator within eleven visits. Sitting in the room for four days is what let me argue that the interface was less sophisticated than its user, and that density was not the defect.',
      didnt:
        'I made the override reason a required field for the first six weeks of the pilot. I told myself it was a small ask; it was a toll on the person having the worst morning of their week. Coordinators did what anyone would — they picked the first chip to clear the dialogue, and we poisoned the early constraint data with about three hundred meaningless "preference" entries that we had to identify and discard by hand. Making capture optional collected less data and far better data, and I should have known that before shipping rather than after.',
      improve:
        'Absence is the case I underweighted. The whole design assumes a week you are shaping, not a Tuesday where two carers call in sick at 06:40 and everything must be rebuilt against a clock. The tools work for it, but the interface does not acknowledge it — no triage mode, no sense of urgency, no way to say "just get today covered legally and I will fix continuity tomorrow". If I had the twenty weeks again I would spend two of them on the bad morning.',
      learned:
        'That when expert users leave your software for a spreadsheet, they are rarely telling you it is too complicated. They are telling you it cannot hold something they know. I now start work like this by asking what the person knows that the data model has no field for — and I treat every override as an unanswered design question rather than a user error.',
    },
  },
}
