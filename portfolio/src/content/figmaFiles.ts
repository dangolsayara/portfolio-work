/* Figma files shown as project cards on the homepage, each opening a
   Figma-style viewer page. To add a page to the sidebar, copy a frame link in
   Figma and use its node-id. */

export type FigmaFile = {
  slug: string
  category: 'project' | 'graphic'
  title: string
  description: string
  tags: string[]
  fileUrl: string
  pages: { name: string; nodeId: string }[]
}

export const FIGMA_FILES: FigmaFile[] = [
  {
    slug: 'kikisapo',
    category: 'project',
    title: 'Kikisapo',
    description:
      'A product design exploration, from first sketches to polished screens, built and organised in Figma.',
    tags: ['Product Design', 'UI/UX', 'Web'],
    fileUrl: 'https://www.figma.com/design/IsAXu4yDsgAClZaXHbpJQG/Untitled',
    pages: [
      { name: 'Kikisapo — Overview', nodeId: '1-17002' },
      { name: 'All pages (use the page menu in the viewer)', nodeId: '' },
    ],
  },
  {
    slug: 'taskly',
    category: 'project',
    title: 'Taskly',
    description:
      'A simple task manager that helps teams plan their week, track progress and stay in sync, designed end to end in Figma.',
    tags: ['Product Design', 'UI/UX', 'Web', 'Mobile'],
    fileUrl: 'https://www.figma.com/design/66cADA9k9dpahUNLNP4SUD/Taskly',
    pages: [
      { name: 'Taskly — Overview', nodeId: '14-1422' },
      { name: 'All pages (use the page menu in the viewer)', nodeId: '' },
    ],
  },
  {
    slug: 'graphics-flyer',
    category: 'graphic',
    title: 'Graphics & Flyers',
    description:
      'Flyers, posters and promotional graphics, designed to catch the eye and get the message across at a glance.',
    tags: ['Graphic Design', 'Flyer', 'Print', 'Social'],
    fileUrl: 'https://www.figma.com/design/atgxeLCQPqtUSNWzzPGn1D/Graphics-Flyer',
    pages: [
      { name: 'Flyers — Overview', nodeId: '2001-2' },
      { name: 'All pages (use the page menu in the viewer)', nodeId: '' },
    ],
  },
]
