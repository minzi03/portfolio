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

/* ═══════════════════════════════════════════════════════════════
   PAGE — 8 sections (compressed from 10)
   ═══════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <>
      <HeroSection />
      <FadeIn><FlagshipProjectSection /></FadeIn>
      <Suspense fallback={<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-64 animate-pulse rounded-2xl bg-zinc-800/30" />)}</div>}>
        <FadeIn><ProjectsGridSection /></FadeIn>
      </Suspense>
      <FadeIn><ExperienceSectionComponent /></FadeIn>
      <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-zinc-800/30" />}>
        <FadeIn><LazySkillsProficiency /></FadeIn>
      </Suspense>
      <FadeIn><EngineeringMethodSection /></FadeIn>
      <FadeIn><ProofAndKnowledgeSection /></FadeIn>
      <FadeIn><ContactSectionComponent /></FadeIn>
    </>
  );
}
