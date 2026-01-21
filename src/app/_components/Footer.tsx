import { personalInfo } from "../_lib/data";

export function Footer() {
  return (
    <footer className="w-full py-8 border-t border-border bg-background">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground font-mono">
          © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </p>

        <div className="flex gap-6">
          {Object.entries(personalInfo.socials).map(([key, url]) => (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium uppercase hover:text-primary transition-colors text-muted-foreground"
            >
              {key}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
