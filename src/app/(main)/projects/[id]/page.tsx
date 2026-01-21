import { projects } from "../../../_lib/data";
import { Navbar } from "../../../_components/Navbar";
import { Footer } from "../../../_components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Correctly typing params as a Promise
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
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link href="/" className="text-primary hover:underline">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background flex flex-col pt-24">
      <Navbar />

      <article className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">
          {project.name}
        </h1>

        <div className="flex flex-wrap gap-2 mb-12">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-secondary text-secondary-foreground text-sm font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="aspect-video w-full bg-secondary mb-12 flex items-center justify-center text-muted-foreground">
          {/* Placeholder for project image, since we don't have actual images yet */}
          <span className="text-xl">Project Image Placeholder</span>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-xl leading-relaxed mb-6">{project.description}</p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {project.details}
          </p>
        </div>
      </article>

      <Footer />
    </main>
  );
}
