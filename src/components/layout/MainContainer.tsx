import { HomeHero } from "../sections/HomeHero";
import { AboutSection } from "../sections/AboutSection";
import { ExperienceSection } from "../sections/ExperienceSection";
import { ProjectsSection } from "../sections/ProjectsSection";
import { ResearchSection } from "../sections/ResearchSection";
import { SkillsSection } from "../sections/SkillsSection";
import { AchievementsSection } from "../sections/AchievementsSection";
import { LeadershipSection } from "../sections/LeadershipSection";
import { CertificationsSection } from "../sections/CertificationsSection";
import { ContactSection } from "../sections/ContactSection";
import { FooterSection } from "../sections/FooterSection";

type MainContainerProps = {
  resumeHref: string | null;
};

export function MainContainer({ resumeHref }: MainContainerProps) {
  return (
    <main id="main-content" className="main-content" tabIndex={-1}>
      <HomeHero resumeHref={resumeHref} />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <ResearchSection />
      <SkillsSection />
      <AchievementsSection />
      <LeadershipSection />
      <CertificationsSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
