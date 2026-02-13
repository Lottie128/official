import { PageHeader } from '@/components/shared/page-header'
import { ProjectCard } from '@/components/shared/project-card'
import { useStaggerFadeIn } from '@/hooks/use-stagger-animation'
import { PROJECTS } from '@/config'

export default function ProjectsPage() {
  const projectsRef = useStaggerFadeIn()

  return (
    <>
      <PageHeader
        title="Our Projects"
        subtitle="Innovative solutions that power the future"
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div ref={projectsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
