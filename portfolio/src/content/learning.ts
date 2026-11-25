/* Extra learning: notes from a presentation on types of design systems. */

export const learning = {
  label: 'Extra learning',
  heading: 'Types of design systems',
  intro:
    'How companies structure, scale and govern their product design, with real-world examples from Google, IBM, Microsoft, Shopify and Airbnb.',
  definition:
    "A design system is a shared library of reusable components, design tokens and documented guidelines that keeps a product's user experience consistent, scalable and efficient to build.",
  parts: [
    { title: 'Design tokens', text: 'Color, spacing, type scale: the raw variables everything else is built from.' },
    { title: 'Component library', text: 'Buttons, inputs, cards: reusable, tested UI building blocks.' },
    { title: 'Patterns & guidelines', text: 'Rules for layout, voice, accessibility and interaction.' },
    { title: 'Documentation site', text: 'The living reference where teams find and use it all.' },
  ],
  types: [
    {
      name: 'Component-based',
      example: 'Google — Material Design',
      short: 'Google Material',
      summary: 'Cross-platform UI kit for many products',
      what: 'A comprehensive, code-backed component library plus a physics-inspired visual language (elevation, motion, ink ripples).',
      how: 'Powers Gmail, Android OS, Google Workspace, and thousands of third-party Android apps via open Material components.',
      strength:
        'Extremely well documented, open-sourced and adaptable. Teams can restyle it (Material You) while keeping the same interaction logic.',
      fit: 'Products spanning many platforms that need one shared interaction language.',
      goal: 'Cross-platform consistency',
      governance: 'Open, community-fed',
    },
    {
      name: 'Enterprise',
      example: 'IBM — Carbon Design System',
      short: 'IBM Carbon',
      summary: 'Deep, governed system for one large platform',
      what: 'An open-source system of React/Vue components, data-visualization patterns and strict accessibility (WCAG) rules.',
      how: 'Unifies IBM Cloud, Watson, and dozens of internal enterprise tools that share dense data tables and forms.',
      strength:
        'Deep governance model: a dedicated team reviews every component and pattern before it ships across products.',
      fit: 'Large organizations with many internal teams needing strict consistency.',
      goal: 'Accessibility & data density',
      governance: 'Centralized review team',
    },
    {
      name: 'Multi-brand',
      example: 'Microsoft — Fluent Design',
      short: 'Microsoft Fluent',
      summary: 'One system flexing across several distinct brands',
      what: 'A layered token system where base components adapt their look per product surface, while behavior stays consistent.',
      how: 'Same core buttons and inputs power Windows 11, Microsoft 365, Teams and Xbox, each with its own finish.',
      strength:
        'Scales across wildly different products and platforms (desktop, web, gaming console, mobile) without fragmenting.',
      fit: 'Companies running several distinct product lines under one master brand.',
      goal: 'Shared core, local finish',
      governance: 'Federated per product',
    },
    {
      name: 'Platform',
      example: 'Shopify — Polaris',
      short: 'Shopify Polaris',
      summary: 'Built for a marketplace of third-party builders',
      what: 'A component library, content style guide and UX patterns built for merchants running online stores.',
      how: 'Powers the Shopify admin itself and is required guidance for the entire third-party App Store ecosystem.',
      strength:
        'Extends trust beyond one company: external developers build apps that feel native to the platform.',
      fit: 'Platforms with an external developer or partner ecosystem to align.',
      goal: 'Ecosystem-wide trust',
      governance: 'Published spec + review',
    },
    {
      name: 'Brand-driven',
      example: 'Airbnb — Design Language System',
      short: 'Airbnb DLS',
      summary: 'Storytelling and emotion lead the component rules',
      what: 'A system where illustration, imagery and micro-copy carry as much weight as buttons and grids.',
      how: 'Keeps web, iOS and Android booking flows feeling emotionally consistent across a global, high-trust marketplace.',
      strength:
        'Balances rapid, tool-assisted design with a distinctive, unmistakable brand feel.',
      fit: 'Consumer brands where emotional tone is a competitive advantage.',
      goal: 'Emotional brand consistency',
      governance: 'In-house design team',
    },
  ],
  takeaways: [
    { title: 'Start with the problem', text: "Ask what's actually inconsistent today (platforms, brands or partners) before picking a model." },
    { title: 'Match your org structure', text: 'Federated teams need Fluent-style flexibility; one product benefits from Carbon-style rigor.' },
    { title: 'Plan for governance early', text: 'Every strong example has clear ownership: a team or process that says yes or no.' },
    { title: 'Let it evolve', text: 'Material, Carbon and Fluent all began small and grew. A design system is a product, not a one-off deliverable.' },
  ],
}
