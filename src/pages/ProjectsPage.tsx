import React from 'react';
import { ProjectsSection } from '../components/ProjectsSection';
import { CtaSection } from '../components/CtaSection';
import { CaseStudyOverlay } from '../components/CaseStudyOverlay';
import { PageId } from '../types';

interface ProjectsPageProps {
  onNavigate: (page: PageId) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = () => {
  return (
    <div className="space-y-0 pt-20 sm:pt-24 font-sans pb-0">
      {/* Full Projects Showcase */}
      <ProjectsSection />

      {/* Full Viewport Let's Work Together Call-to-Action Section */}
      <CtaSection />

      {/* Fullscreen Interactive Case Study Overlay */}
      <CaseStudyOverlay />
    </div>
  );
};
