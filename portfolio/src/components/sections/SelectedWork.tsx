import { FIGMA_FILES } from '../../content/figmaFiles'
import { FigmaCard } from '../FigmaCard'
import { Section } from '../ui'

export function SelectedWork() {
  return (
    <Section id="work" label="Selected work">
      <div className="grid gap-6 md:grid-cols-2">
        {FIGMA_FILES.filter((f) => f.category === 'project').map((f, i) => (
          <FigmaCard key={f.slug} f={f} index={i} />
        ))}
      </div>
    </Section>
  )
}
