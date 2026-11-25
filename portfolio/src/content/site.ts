/* ═══════════════════════════════════════════════════════════════════════════
   SITE CONTENT
   ───────────────────────────────────────────────────────────────────────────
   ▲ SAMPLE CONTENT. Everything below is written to be replaced. Nothing here
     is a claim about a real company, client, result or person — swap it for
     your own before publishing, and delete anything you can't defend.
   ═══════════════════════════════════════════════════════════════════════════ */

export const site = {
  /* ── Identity ─────────────────────────────────────────────────────────── */
  name: 'Sayara', // EDIT: your full name. Used in the wordmark, SEO and footer.
  wordmark: 'Sayara', // EDIT: shorter form for the navbar, if different.
  role: 'UI/UX & Product Designer',
  email: 'hello@example.com', // EDIT
  location: 'Kathmandu, Nepal', // EDIT
  resumeUrl: '/resume.pdf', // EDIT: drop your PDF in /public

  /* `icon` keys come from src/components/Icon.tsx — add one there if you need
     a network that isn't listed. */
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sayara-dangol-3883b8192', icon: 'linkedin' },
  ],

  /* ── Hero ─────────────────────────────────────────────────────────────── */
  hero: {
    eyebrow: 'Available for work',
    headline: 'Designing digital experiences that make complex things feel simple.',
    subhead:
      "I'm Sayara, a UI/UX & Product Designer focused on creating thoughtful, intuitive and visually refined digital products.",
    status: {
      available: true,
      availableText: 'Available for Product Design opportunities',
      // Shown instead when `available` is false:
      currentText: 'Currently designing digital experiences at CloudTechService',
    },
    scrollHint: 'See the work',
    /** Small facts beside the hero. Keep these honest and specific — the count
     *  of case studies is read from your project files, not typed here. */
    facts: [
      { value: '4+ yrs', label: 'Designing products', icon: 'clock' },
      { value: 'Web + Mobile', label: 'Platforms', icon: 'monitor' },
      { value: 'End-to-end', label: 'Research → handoff', icon: 'flow' },
    ],
    /** Rotates in the hero's small apparatus panel, one principle at a time. */
    principles: [
      'Clarity beats cleverness.',
      'The interface is the last thing I design.',
      'A system is a promise you keep twice.',
      'If it needs a tooltip, it needs another draft.',
      'Constraints are the brief, not the obstacle.',
    ],
  },

  /* ── Introduction ─────────────────────────────────────────────────────── */
  intro: {
    heading: "Hi, I'm Sayara. I design with curiosity.",
    lead: "I'm drawn to the small moments that make an interface feel effortless — the button that feels obvious, the flow that needs no explaining, the detail you only notice when it's missing.",
    /** Words given visual weight inside the paragraph flow. */
    keywords: [
      { label: 'Research', icon: 'search' },
      { label: 'Structure', icon: 'sitemap' },
      { label: 'Empathy', icon: 'heart' },
      { label: 'Systems', icon: 'layers' },
      { label: 'Craft', icon: 'pen' },
    ],
    statement: ["I don't just design screens.", 'I design how people experience products.'],
  },

  /* ── Selected Work intro ──────────────────────────────────────────────── */
  work: {
    heading: 'Selected Work',
    support:
      'Five problems I explored, simplified and shipped. Each one opens as a case study — skim the highlights or read the whole thing.',
  },

  /* ── Process ──────────────────────────────────────────────────────────── */
  process: {
    heading: 'How I turn messy problems into clear experiences.',
    support:
      "It isn't linear — I loop back constantly. But these five moves are always in the work somewhere.",
    steps: [
      {
        n: '01',
        icon: 'search',
        title: 'Understand',
        short: 'Research users, business goals, and context.',
        detail:
          'Interviews, support logs, analytics, and a lot of listening to how people describe the problem in their own words. I want the constraint I don’t know about yet.',
        artifact: 'Research plan · 12 interviews · behavioural audit',
      },
      {
        n: '02',
        icon: 'target',
        title: 'Define',
        short: 'Turn observations into clear problems and opportunities.',
        detail:
          'Synthesis into themes, then a single sharpened problem statement. If I can’t write the problem in one sentence, I don’t understand it yet.',
        artifact: 'Affinity map · problem statement · success metrics',
      },
      {
        n: '03',
        icon: 'sparkle',
        title: 'Explore',
        short: 'Generate multiple ideas and challenge assumptions.',
        detail:
          'Cheap, fast, plural. I sketch the version I believe in and the version I’m arguing against, because the second one usually improves the first.',
        artifact: 'Sketches · 3 divergent concepts · tradeoff matrix',
      },
      {
        n: '04',
        icon: 'pen',
        title: 'Design',
        short: 'Build flows, interfaces, systems, and prototypes.',
        detail:
          'Flows before screens, components before pages, states before polish. Empty, loading, error and edge cases are part of the design, not a follow-up ticket.',
        artifact: 'Flows · component library · high-fidelity prototype',
      },
      {
        n: '05',
        icon: 'flask',
        title: 'Validate',
        short: 'Test, learn, refine, and measure.',
        detail:
          'Five users will tell you most of it. Then I instrument the thing so the next decision is informed by behaviour instead of opinion.',
        artifact: 'Usability sessions · findings log · post-launch metrics',
      },
    ],
    statement: [
      "Good design isn't about getting the first idea right.",
      "It's about being willing to keep asking better questions.",
    ],
  },

  /* ── Philosophy ───────────────────────────────────────────────────────── */
  philosophy: {
    heading: 'What I believe about design.',
    support: 'Five things I keep coming back to, and what each one costs.',
    principles: [
      {
        n: '01',
        icon: 'eye',
        title: 'Clarity beats cleverness.',
        body: 'A clever interface makes the designer look smart. A clear one makes the user feel smart. Only one of those gets used twice.',
      },
      {
        n: '02',
        icon: 'grid',
        title: 'Every pixel should have a purpose.',
        body: 'Not minimalism for its own sake — intent. If I can’t say what a mark is doing, it isn’t restraint that removes it, it’s honesty.',
      },
      {
        n: '03',
        icon: 'sitemap',
        title: 'Good UX starts before the interface.',
        body: 'By the time you’re choosing a component, most of the experience has already been decided by the model, the naming and the order of the questions.',
      },
      {
        n: '04',
        icon: 'box',
        title: 'Design systems create freedom, not limitations.',
        body: 'A good system removes the thousand decisions that were never interesting, so the team can spend its judgement on the ten that are.',
      },
      {
        n: '05',
        icon: 'check',
        title: 'The best interfaces feel obvious.',
        body: 'Obvious is expensive. It is what’s left after you’ve removed every explanation the design was leaning on.',
      },
    ],
  },

  /* ── About ────────────────────────────────────────────────────────────── */
  about: {
    /** Drop a portrait at /public/portrait.jpg and set this to '/portrait.jpg'.
     *  Left null, an editorial drawn placeholder is used instead. */
    portrait: '/portrait.png' as string | null,
    portraitCaption: 'Portrait',
    body: [
      'Most of my work starts somewhere unglamorous: a support thread nobody reads, a spreadsheet built to work around the product, a sentence a user says twice without noticing. I treat those as evidence, then look for the structure underneath, because a confusing screen is rarely a screen problem.',
      'What keeps me in the work is diagnosis: finding the one wrong assumption beneath a struggling flow and watching the friction disappear. Screens are the output; the reasoning is the craft.',
      "I work best with collaborators who challenge decisions directly, and I aim to do the same. I keep a running log of design decisions I would revisit, which teaches me more than a record of the ones that worked.",
    ],
    /** Small factual panel. Keep it honest and specific. */
    facts: [
      { label: 'Based in', value: 'Teku, Kathmandu, Nepal', icon: 'location' },
      { label: 'Working in', value: 'Product & UI/UX Design', icon: 'briefcase' },
      { label: 'Currently reading', value: 'The Mountain Is You', icon: 'book' },
      { label: 'Outside design', value: 'Table Tennis, Travel, Dance', icon: 'heart' },
    ],
    closing:
      "When I'm not designing interfaces, I like to travel and explore new things. I think those experiences influence how I notice details, understand people, and approach problems.",
  },

  /* ── Skills ───────────────────────────────────────────────────────────── */
  skills: {
    heading: 'What I bring to a team.',
    groups: [
      {
        label: 'Product Design',
        icon: 'flow',
        items: [
          'UX Strategy',
          'User Research',
          'Information Architecture',
          'User Flows',
          'Interaction Design',
          'Prototyping',
        ],
      },
      {
        label: 'Visual Design',
        icon: 'palette',
        items: [
          'UI Design',
          'Design Systems',
          'Visual Hierarchy',
          'Typography',
          'Responsive Design',
          'Accessibility',
        ],
      },
      {
        label: 'Tools',
        icon: 'wand',
        items: [
          'Figma',
          'FigJam',
          'Adobe Creative Suite',
          'Framer',
          'Notion',
          'AI design tools',
        ],
      },
      {
        label: 'Collaboration',
        icon: 'users',
        items: [
          'Developer Handoff',
          'Stakeholder Communication',
          'Design Critique',
          'Workshop Facilitation',
        ],
      },
    ],
  },

  /* ── Experience ───────────────────────────────────────────────────────── */
  experience: {
    heading: "Where I've been learning and building.",
    support: 'Roles in reverse order. The full history is in my resume.',
    /** ▲ SAMPLE. Replace every entry — do not publish invented roles. */
    roles: [
      {
        company: 'CloudTech Services',
        role: 'UI/UX Designer',
        dates: '2025 — Present',
        location: 'Kathmandu',
        description:
          'Designed interfaces for a sport related platform, the sunset platform and many more, balancing a small team, a fast release cadence and a codebase that predated any design system.',
        responsibilities: [
          'Redesigned core flows for clarity and conversion',
          'Established typography, spacing and colour foundations',
          'Documented components for engineering handoff',
        ],
      },
      {
        company: 'Sherpa Technologies → CloudTech Services',
        role: 'Design Intern → Junior Designer',
        dates: '2023 — 2024',
        location: 'Kathmandu',
        description:
          'Supported senior designers across insurance-related applications while learning the craft in production rather than in isolation.',
        responsibilities: [
          'Produced screens, assets and prototypes to spec',
          'Assisted research synthesis and note-taking',
          'Built and maintained Figma files and libraries',
        ],
      },
    ],
    education: {
      label: 'Education',
      items: [
        {
          level: 'Bachelor’s',
          title: 'Information Technology',
          school: 'Purbanchal Vishwavidalaya',
          period: 'Oct 2015 – 2020',
        },
        {
          level: '+2',
          title: 'Higher Secondary',
          school: 'Everest College, Thapathali',
          period: '2071 – 2072 BS',
        },
        {
          level: 'School',
          title: 'Schooling',
          school: 'Arniko Boarding School',
          period: 'Batch 2070 BS',
        },
      ],
    },
  },

  /* ── Testimonials ─────────────────────────────────────────────────────────
     Empty by default and the section will not render. Add ONLY real quotes,
     with permission. A fabricated testimonial is the fastest way to lose a
     recruiter's trust. */
  testimonials: [] as {
    quote: string
    person: string
    role: string
    company: string
  }[],

  /* ── Currently exploring ──────────────────────────────────────────────── */
  curiosities: {
    heading: 'Currently curious about…',
    items: [
      { label: 'AI × Product Design', icon: 'wand', note: 'Where the interface should disappear — and where it absolutely should not.' },
      { label: 'Design Systems', icon: 'box', note: 'Governance as a design problem, not a documentation problem.' },
      { label: 'Behavioural Psychology', icon: 'brain', note: 'Why people do the slower thing on purpose.' },
      { label: 'Accessibility', icon: 'accessibility', note: 'Designing for the edge and watching the middle get better.' },
      { label: 'Complex Workflows', icon: 'flow', note: 'Density done kindly. Power users deserve craft too.' },
      { label: 'Design Engineering', icon: 'code', note: 'Getting close enough to the code to keep my promises.' },
    ],
  },

  /* ── Contact ──────────────────────────────────────────────────────────── */
  contact: {
    heading: 'Have a problem worth solving?',
    support:
      "I'm always interested in thoughtful products, challenging problems, and people who care about creating better experiences.",
    responseNote: 'I reply to everything within a couple of days.',
  },

  footer: {
    tagline: 'Designed with curiosity & attention to detail.',
  },
} as const

export const NAV = [
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/#about' },
  { label: 'Process', href: '/#process' },
  { label: 'Resume', href: '/#experience' },
  { label: 'Contact', href: '/#contact' },
] as const
