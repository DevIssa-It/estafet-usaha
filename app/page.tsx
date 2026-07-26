"use client";

import { Navbar } from "@/features/landing/components/Navbar";
import { HeroSection } from "@/features/landing/components/HeroSection";
import { StatsSection } from "@/features/landing/components/StatsSection";
import { FeaturesSection } from "@/features/landing/components/FeaturesSection";
import { HowItWorksSection } from "@/features/landing/components/HowItWorksSection";
import { RolesSection } from "@/features/landing/components/RolesSection";
import { CtaSection } from "@/features/landing/components/CtaSection";
import { LandingFooter } from "@/features/landing/components/LandingFooter";

export default function LandingPage() {
  return (
    <div style={{ backgroundColor: "#f8fafc", color: "#0f172a", minHeight: "100vh", fontFamily: "var(--font-body)" }}>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <RolesSection />
      <CtaSection />
      <LandingFooter />
    </div>
  );
}
