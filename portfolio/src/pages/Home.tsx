import { site } from '../content/site'
import { useMeta } from '../lib/useMeta'
import { Hero } from '../components/sections/Hero'
import { AboutSection } from '../components/sections/AboutSection'
import { SelectedWork } from '../components/sections/SelectedWork'
import { GraphicsSection } from '../components/sections/GraphicsSection'
import { DesignToCode } from '../components/sections/DesignToCode'
import { ProcessSection } from '../components/sections/ProcessSection'
import { Philosophy } from '../components/sections/Philosophy'
import { SkillsSection } from '../components/sections/SkillsSection'
import { ExperienceTimeline } from '../components/sections/ExperienceTimeline'
import { Testimonials } from '../components/sections/Testimonials'
import { ContactCTA } from '../components/sections/ContactCTA'

/* The page order is the argument:
   introduce → personality → work → thinking → process → impact → story → contact */

export default function Home() {
  useMeta({
    title: `${site.name} — ${site.role}`,
    description: `Portfolio of ${site.name}, a UI/UX and Product Designer creating thoughtful, intuitive and impactful digital experiences.`,
    path: '/',
  })

  return (
    <>
      <Hero />
      <AboutSection />
      <SelectedWork />
      <GraphicsSection />
      <DesignToCode />
      <ProcessSection />
      <Philosophy />
      <SkillsSection />
      <ExperienceTimeline />
      <Testimonials />
      <ContactCTA />
    </>
  )
}
