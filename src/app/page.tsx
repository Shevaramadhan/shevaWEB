import { ShaderFlowBackground } from "@/components/ShaderFlowBackground";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import {
  ExperienceJourneySection,
  EducationSection,
} from "@/components/ExperienceJourneySection";
import { SkillsSection } from "@/components/SkillsSection";
import {
  ProjectsSection,
  ContactSection,
} from "@/components/ProjectsAndContactSection";
import { LanguageProvider } from "@/context/LanguageContext";

export default function HomePage() {
  return (
    <LanguageProvider>
      <div className="relative min-h-screen">
        <ShaderFlowBackground />
        <Navbar />
        {/* Strictly ordered to match Navbar: About -> Work (01) -> Projects (02) -> Skills (03) -> Edu (04) -> Contact (05) */}
        <main id="main-content" className="relative z-10 flex flex-col">
          <HeroSection />
          <ExperienceJourneySection />
          <ProjectsSection />
          <SkillsSection />
          <EducationSection />
          <ContactSection />
        </main>
      </div>
    </LanguageProvider>
  );
}
