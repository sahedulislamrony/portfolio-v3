import { Navbar } from "../_components/Navbar";
import { HeroSection } from "../_components/HeroSection";
import { ExperienceSection } from "../_components/ExperienceSection";
import { EducationSection } from "../_components/EducationSection";
import { CertificationsSection } from "../_components/CertificationsSection";
import { FeaturedProjects } from "../_components/FeaturedProjects";
import { TestimonialSection } from "../_components/TestimonialSection";
import { ContactSection } from "../_components/ContactSection";
import { Footer } from "../_components/Footer";
import { SkillsSection } from "../_components/SkillsSection";
import { StatsSection } from "../_components/StatsSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <HeroSection />
      <SkillsSection />
      <StatsSection />
      <ExperienceSection />
      <EducationSection />
      <CertificationsSection />
      <FeaturedProjects />
      <TestimonialSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
