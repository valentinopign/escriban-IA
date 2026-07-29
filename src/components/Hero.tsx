import React from 'react';

interface HeroProps {
  children: React.ReactNode;
  isAnimationFinished: boolean;
}

const Hero = ({ children, isAnimationFinished }: HeroProps) => {
  return (
    <section className="hero">
      <h1 className="heroTitle">Digitalizá tu escribanía<br/><span className="accent">con inteligencia artificial.</span></h1>
      <p className="heroSubtitle">Del DNI al .docx en minutos. Tu cliente sube las fotos, la IA extrae los datos, audita y genera el documento. Vos lo firmás.</p>
      
      {children}

      <div className="heroCtas">
        <a href={`https://wa.me/541170605707?text=${encodeURIComponent('Hola, quiero solicitar acceso a escribanIA.')}`} target="_blank" rel="noopener noreferrer" className={`btnPrimary ${isAnimationFinished ? 'glow' : ''}`}>
          Solicitar acceso →
        </a>
        <a href="#proceso" className="btnSecondary">Ver cómo funciona</a>
      </div>

      <div className="heroTrust">
        <span className="heroTrustDots">
          <span className="heroTrustDot" />
          <span className="heroTrustDot" />
          <span className="heroTrustDot" />
        </span>
        +10 oficinas de escribanos ya confiaron en nosotros
      </div>
    </section>
  );
};

export default Hero;
