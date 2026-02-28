import { projects } from "../../../_lib/data";
import { Navbar } from "../../../_components/Navbar";
import { Footer } from "../../../_components/Footer";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Folder,
  Calendar,
  Layers,
} from "lucide-react";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.id === resolvedParams.id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <div className="w-16 h-16 rounded-sm bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Folder className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Project Not Found</h1>
          <p className="text-muted-foreground mb-6 text-sm">
            The project you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject =
    projects[(currentIndex - 1 + projects.length) % projects.length];

  return (
    <main className="min-h-screen bg-background flex flex-col pt-24">
      <Navbar />

      <article className="flex-1 container mx-auto px-6 md:px-12 lg:px-20 py-12">
        {/* Back Link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-12"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Projects
        </Link>

        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          {/* Project Number + Featured Badge */}
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-mono text-muted-foreground/60">
              Project {String(currentIndex + 1).padStart(2, "0")}
            </span>
            {project.featured && (
              <>
                <span className="w-px h-3 bg-foreground/10" />
                <span className="text-xs font-medium text-primary/80 px-2 py-0.5 rounded-sm bg-primary/8 border border-primary/10">
                  Featured
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            {project.name}
          </h1>

          {/* Description */}
          <p className="text-lg text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Meta Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {/* Technologies */}
          <div className="md:col-span-2 rounded-sm bg-card border border-foreground/5 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-4 h-4 text-primary/60" />
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Tech Stack
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-sm font-medium rounded-sm bg-foreground/[0.03] border border-foreground/5 text-foreground/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="rounded-sm bg-card border border-foreground/5 p-6 flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4 text-primary/60" />
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Project Link
              </span>
            </div>
            {project.link && project.link !== "#" ? (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                View Live Project
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <span className="text-sm text-muted-foreground/60">
                Private / Under NDA
              </span>
            )}
          </div>
        </div>

        {/* Details Section */}
        {project.details && (
          <div className="max-w-3xl mb-20">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-lg font-semibold">About This Project</h2>
              <div className="flex-1 h-px bg-foreground/5" />
            </div>
            <p className="text-base text-muted-foreground leading-relaxed">
              {project.details}
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="border-t border-foreground/5 pt-10">
          <div className="grid grid-cols-2 gap-4">
            <Link
              href={`/projects/${prevProject.id}`}
              className="group rounded-sm border border-foreground/5 p-5 hover:border-primary/20 transition-all duration-200 hover:bg-card"
            >
              <span className="text-xs text-muted-foreground/60 mb-2 block">
                ← Previous
              </span>
              <span className="text-sm font-semibold group-hover:text-primary transition-colors">
                {prevProject.name}
              </span>
            </Link>
            <Link
              href={`/projects/${nextProject.id}`}
              className="group rounded-sm border border-foreground/5 p-5 hover:border-primary/20 transition-all duration-200 hover:bg-card text-right"
            >
              <span className="text-xs text-muted-foreground/60 mb-2 block">
                Next →
              </span>
              <span className="text-sm font-semibold group-hover:text-primary transition-colors">
                {nextProject.name}
              </span>
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
