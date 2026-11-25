import { site } from '../content/site'
import { useMeta } from '../lib/useMeta'
import { Hero } from '../components/sections/Hero'
import { Intro } from '../components/sections/Intro'
import { SelectedWork } from '../components/sections/SelectedWork'
import { GraphicsSection } from '../components/sections/GraphicsSection'
import { DesignToCode } from '../components/sections/DesignToCode'
import { LearningSection } from '../components/sections/LearningSection'
import { ProcessSection } from '../components/sections/ProcessSection'
import { Philosophy } from '../components/sections/Philosophy'
import { AboutSection } from '../components/sections/AboutSection'
import { SkillsSection } from '../components/sections/SkillsSection'
import { ExperienceTimeline } from '../components/sections/ExperienceTimeline'
import { Testimonials } from '../components/sections/Testimonials'
import { Curiosities } from '../components/sections/Curiosities'
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
      <Intro />
      <SelectedWork />
      <GraphicsSection />
      <DesignToCode />
      <LearningSection />
      <ProcessSection />
      <Philosophy />
      <AboutSection />
      <SkillsSection />
      <ExperienceTimeline />
      <Testimonials />
      <Curiosities />
      <ContactCTA />
    </>
  )
}
