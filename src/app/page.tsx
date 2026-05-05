import React from 'react';
import Nav from "@/components/Nav";
import HeroSection from "@/components/HeroSection";
import ProcessSection from "@/components/ProcessSection";
import AdminPanelSection from "@/components/AdminPanelSection";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import ProblemSection from "@/components/ProblemSection";
import UseCaseSection from "@/components/UseCaseSection";
import Footer from "@/components/Footer";
import "./landing.css";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <ProblemSection />
        <UseCaseSection />
        <ProcessSection />
        <AdminPanelSection />
        <PricingSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
