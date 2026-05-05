'use client';

import React, { useState } from 'react';
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Diagram from "@/components/Diagram";
import ProcessSection from "@/components/ProcessSection";
import AdminPanelSection from "@/components/AdminPanelSection";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import ProblemSection from "@/components/ProblemSection";
import UseCaseSection from "@/components/UseCaseSection";
import Footer from "@/components/Footer";
import "./landing.css";

export default function Home() {
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);

  return (
    <>
      <Nav />
      <main>
        <Hero isAnimationFinished={isAnimationFinished}>
          <Diagram onAnimationEnd={() => setIsAnimationFinished(true)} />
        </Hero>
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
