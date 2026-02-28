import { personalInfo } from "../_lib/data";
import { SiGithub, SiLinkedin, SiUpwork, SiX } from "react-icons/si";
import { Copyright, Mail } from "lucide-react";

const socialIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  github: SiGithub,
  linkedin: SiLinkedin,
  upwork: SiUpwork,
  twitter: SiX,
};

export function Footer() {
  return (
    <footer className="w-full py-8 bg-background border-t border-foreground/5">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left: Logo + copyright */}
          <div className="flex items-center gap-3">
            <span className="text-base font-bold">
              SR<span className="text-primary">.</span>
            </span>
            <span className="w-px h-4 bg-foreground/10" />
            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
              <Copyright className="w-3.5 h-3.5" />
              {new Date().getFullYear()} {personalInfo.name}. All rights
              reserved.
            </p>
          </div>

          {/* Right: Social icons */}
          <div className="flex items-center gap-1">
            <a
              href={`mailto:${personalInfo.email}`}
              className="p-2.5 rounded-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-150"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            {Object.entries(personalInfo.socials).map(([key, url]) => {
              const Icon = socialIcons[key];
              return (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-150"
                  aria-label={key}
                >
                  {Icon ? (
                    <Icon className="w-4 h-4" />
                  ) : (
                    <span className="text-xs font-medium uppercase">{key}</span>
                  )}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
