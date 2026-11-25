import { FIGMA_FILES } from '../../content/figmaFiles'
import { FigmaCard } from '../FigmaCard'
import { Reveal, Section, SectionMark } from '../ui'

export function GraphicsSection() {
  return (
    <Section id="graphics" label="Flyers and graphics" className="pt-0 sm:pt-0 lg:pt-0">
      <Reveal>
        <SectionMark label="Flyers & Graphics" />
        <h2 className="display mt-4 text-[1.75rem] sm:text-[2.25rem]">Flyers &amp; graphic design</h2>
        <p className="mt-2 max-w-[60ch] text-[15px] leading-relaxed text-ink-soft">
          Visual work beyond product screens: flyers, posters and promotional graphics.
        </p>
      </Reveal>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {FIGMA_FILES.filter((f) => f.category === 'graphic').map((f, i) => (
          <FigmaCard key={f.slug} f={f} index={i} />
        ))}
      </div>
    </Section>
  )
}
