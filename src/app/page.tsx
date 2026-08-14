import { Suspense } from "react";
import FadeIn from "@/components/ui/FadeIn";
import { LazySkillsProficiency } from "@/components/ui/LazySection";
import HeroSection from "@/components/home/HeroSection";
import FlagshipProjectSection from "@/components/home/FlagshipProject";
import ProjectsGridSection from "@/components/home/ProjectsGrid";
import ExperienceSectionComponent from "@/components/home/ExperienceSection";
import EngineeringMethodSection from "@/components/home/EngineeringMethod";
import ProofAndKnowledgeSection from "@/components/home/ProofAndKnowledge";
import ContactSectionComponent from "@/components/home/ContactSection";
import { ProjectCardSkeleton, ExperienceCardSkeleton } from "@/components/ui/Skeleton";

/* ═══════════════════════════════════════════════════════════════
   PAGE — 8 sections (compressed from 10)
   ═══════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <>
      <HeroSection />
      <FadeIn><FlagshipProjectSection /></FadeIn>
      <Suspense fallback={<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }).map((_, i) => <ProjectCardSkeleton key={i} />)}</div>}>
        <FadeIn><ProjectsGridSection /></FadeIn>
      </Suspense>
      <FadeIn><ExperienceSectionComponent /></FadeIn>
      <Suspense fallback={<div className="space-y-5">{Array.from({ length: 3 }).map((_, i) => <ExperienceCardSkeleton key={i} />)}</div>}>
        <FadeIn><LazySkillsProficiency /></FadeIn>
      </Suspense>
      <FadeIn><EngineeringMethodSection /></FadeIn>
      <FadeIn><ProofAndKnowledgeSection /></FadeIn>
      <FadeIn><ContactSectionComponent /></FadeIn>
    </>
  );
}
