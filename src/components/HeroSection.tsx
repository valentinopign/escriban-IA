'use client';

import React, { useState } from 'react';
import Hero from './Hero';
import Diagram from './Diagram';

export default function HeroSection() {
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);

  return (
    <Hero isAnimationFinished={isAnimationFinished}>
      <Diagram onAnimationEnd={() => setIsAnimationFinished(true)} />
    </Hero>
  );
}
