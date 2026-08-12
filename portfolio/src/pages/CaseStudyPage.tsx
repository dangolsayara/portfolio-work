import { Link, useParams } from 'react-router-dom'
import { getProject } from '../content/projects'
import { site } from '../content/site'
import { useMeta } from '../lib/useMeta'
import { CaseStudy } from '../components/case/CaseStudy'
import { Container } from '../components/ui'

export default function CaseStudyPage() {
  const { slug = '' } = useParams()
  const project = getProject(slug)

  useMeta({
    title: project
      ? `${project.title} — ${site.name}, ${site.role}`
      : `Not found — ${site.name}`,
    description: project
      ? `${project.subtitle} A ${project.meta.role} case study by ${site.name}.`
      : 'That case study could not be found.',
    path: project ? `/work/${project.slug}` : undefined,
  })

  if (!project) {
    return (
      <div className="flex min-h-[70vh] items-center pt-28">
        <Container>
          <p className="apparatus-sm text-accent">404</p>
          <h1 className="display mt-6 text-[2.5rem] sm:text-[3.5rem]">
            That case study isn't here.
          </h1>
          <Link
            to="/#work"
            className="mt-8 inline-flex items-center gap-2 text-[14px] text-ink-soft hover:text-ink"
          >
            <span aria-hidden="true">←</span> Back to all work
          </Link>
        </Container>
      </div>
    )
  }

  return <CaseStudy project={project} />
}
