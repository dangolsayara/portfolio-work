/* Design to code: what I do when a Figma file becomes a working page. */

export const designToCode = {
  label: 'Design to code',
  heading: 'From Figma to HTML & CSS',
  intro:
    'I do not stop at the handoff. I can turn my own Figma designs into clean, responsive HTML and CSS, so what ships matches what was designed.',
  steps: [
    {
      title: 'Read the design',
      text: 'Frames, auto layout, spacing and styles in Figma map directly to structure and CSS.',
    },
    {
      title: 'Build the structure',
      text: 'Semantic HTML first: headings, landmarks, buttons and links that work without styling.',
    },
    {
      title: 'Style it faithfully',
      text: 'Figma styles become CSS variables, and flexbox or grid reproduces the layout.',
    },
    {
      title: 'Make it responsive',
      text: 'Check every breakpoint, then test with a keyboard before calling it done.',
    },
  ],
  skills: [
    'Semantic HTML',
    'CSS Flexbox & Grid',
    'CSS variables (design tokens)',
    'Responsive layouts',
    'Pixel-accurate spacing',
    'Accessible markup',
    'Basic JavaScript',
  ],
  samples: {
    html: [
      '<button class="btn btn--primary">',
      '  Get started',
      '</button>',
    ].join('\n'),
    css: [
      ':root {',
      '  --accent: #4f46e5;',
      '  --radius: 12px;',
      '  --space-3: 12px;',
      '}',
      '',
      '.btn--primary {',
      '  display: inline-flex;',
      '  align-items: center;',
      '  padding: var(--space-3) 20px;',
      '  border-radius: var(--radius);',
      '  background: var(--accent);',
      '  color: #fff;',
      '  font-weight: 600;',
      '}',
    ].join('\n'),
  },
}
