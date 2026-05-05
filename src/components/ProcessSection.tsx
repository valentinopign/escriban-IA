'use client';

import React, { useEffect, useRef, useState } from 'react';

const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState<number>(-1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const pulsesRef = useRef<(SVGPathElement | null)[]>([]);
  const cablesRef = useRef<(SVGPathElement | null)[]>([]);
  const [paths, setPaths] = useState<string[]>([]);
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });

  const updatePaths = () => {
    if (!cardsRef.current[0]) return;
    
    const container = cardsRef.current[0].parentElement;
    if (!container) return;
    
    const parentRect = container.getBoundingClientRect();
    setSvgSize({ width: parentRect.width, height: parentRect.height });

    const getPin = (index: number, side: 'left' | 'right' | 'top' | 'bottom') => {
      const el = cardsRef.current[index];
      if (!el) return { x: 0, y: 0 };
      const r = el.getBoundingClientRect();
      let x = r.left + r.width / 2;
      let y = r.top + r.height / 2;
      
      if (side === 'left') x = r.left;
      if (side === 'right') x = r.right;
      if (side === 'top') y = r.top;
      if (side === 'bottom') y = r.bottom;
      
      return {
        x: x - parentRect.left,
        y: y - parentRect.top
      };
    };

    const p: string[] = [];

    // Detectar si estamos en columna única (mobile)
    const el0 = cardsRef.current[0]!.getBoundingClientRect();
    const el1 = cardsRef.current[1]!.getBoundingClientRect();
    const isSingleCol = Math.abs((el0.left + el0.width / 2) - (el1.left + el1.width / 2)) < 20;

    if (isSingleCol) {
      // Mobile: cables verticales rectos entre todas las tarjetas
      for (let i = 0; i < 4; i++) {
        const b = getPin(i, 'bottom');
        const t = getPin(i + 1, 'top');
        p.push(`M ${b.x} ${b.y} L ${t.x} ${t.y}`);
      }
    } else {
      // Desktop: layout original
      // 0 -> 1 (Horizontal Straight)
      const c0r = getPin(0, 'right');
      const c1l = getPin(1, 'left');
      p.push(`M ${c0r.x} ${c0r.y} L ${c1l.x} ${c1l.y}`);

      // 1 -> 2 (Rectilinear Step)
      const c1b = getPin(1, 'bottom');
      const c2t = getPin(2, 'top');
      const midY12 = (c1b.y + c2t.y) / 2;
      p.push(`M ${c1b.x} ${c1b.y} L ${c1b.x} ${midY12} L ${c2t.x} ${midY12} L ${c2t.x} ${c2t.y}`);

      // 2 -> 3 (Horizontal Straight)
      const c2r = getPin(2, 'right');
      const c3l = getPin(3, 'left');
      p.push(`M ${c2r.x} ${c2r.y} L ${c3l.x} ${c3l.y}`);

      // 3 -> 4 (Rectilinear Step to Wide Card)
      const c3b = getPin(3, 'bottom');
      const c4t = getPin(4, 'top');
      const midY34 = (c3b.y + c4t.y) / 2;
      p.push(`M ${c3b.x} ${c3b.y} L ${c3b.x} ${midY34} L ${c4t.x} ${midY34} L ${c4t.x} ${c4t.y}`);
    }

    setPaths(p);
  };

  const animatePulse = (index: number, duration: number) => {
    return new Promise<void>(resolve => {
      const pulseEl = pulsesRef.current[index];
      if (!pulseEl) return resolve();

      const len = pulseEl.getTotalLength();
      const pulseLen = Math.min(80, len * 0.4);
      
      pulseEl.setAttribute('stroke-dasharray', `${pulseLen} ${len + pulseLen}`);
      pulseEl.style.opacity = '1';
      pulseEl.style.transition = 'none';
      pulseEl.setAttribute('stroke-dashoffset', String(pulseLen));
      
      pulseEl.getBoundingClientRect();
      
      pulseEl.style.transition = `stroke-dashoffset ${duration}ms linear`;
      pulseEl.setAttribute('stroke-dashoffset', String(-len));
      
      setTimeout(() => {
        pulseEl.style.opacity = '0';
        cablesRef.current[index]?.classList.add('lit');
        resolve();
      }, duration);
    });
  };

  const runSequence = async () => {
    const delay = (ms: number) => new Promise(r => setTimeout(r, ms));
    setActiveStep(-1);
    cablesRef.current.forEach(c => c?.classList.remove('lit'));
    await delay(500);

    for (let i = 0; i <= 4; i++) {
      setActiveStep(i);
      await delay(400);
      if (i < 4) await animatePulse(i, 600);
    }
  };

  useEffect(() => {
    updatePaths();
    const handleResize = () => updatePaths();
    window.addEventListener('resize', handleResize);
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && activeStep === -1) {
        runSequence();
      }
    }, { threshold: 0.2 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [activeStep]);

  const cardData = [
    { h: 'Cargás tus Modelos', p: 'Subís tus plantillas de Word actuales. escribanIA respeta tu estilo.', icon: <><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9m-4-4l4 4 4-4"/></> },
    { h: 'Extracción Directa', p: 'El cliente sube su DNI y la IA extrae los datos automáticamente.', icon: <><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></> },
    { h: 'Chat Inteligente', p: 'Una entrevista guiada solicita solo los datos faltantes que requerís.', icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/> },
    { h: 'Experiencia Ágil', p: 'Garantiza velocidad sin sacrificar precisión notarial.', icon: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/> }
  ];

  return (
    <section className="section processSection" id="proceso" ref={sectionRef}>
      <div className="processGrid">
        <div className="processIntro">
          <div className="sectionEyebrow processEyebrow">SIMPLICIDAD OPERATIVA</div>
          <h2 className="processTitle">Tu proceso,<br/><span className="accent">optimizado.</span></h2>
          <p className="processLead">Digitalizamos tu flujo de trabajo sin cambiar tu forma de redactar. Una transición invisible hacia la máxima eficiencia.</p>
        </div>
        
        <div className="processCards" style={{ position: 'relative' }}>
          <svg className="processCables" width={svgSize.width} height={svgSize.height} style={{ position: 'absolute', inset: 0, overflow: 'visible', fill: 'none' }}>
            {paths.map((d, i) => (
              <g key={i} fill="none">
                <path ref={el => { cablesRef.current[i] = el }} className={`processCable${i === 3 ? ' processCableFinal' : ''}`} d={d} strokeWidth="1.5" fill="none" />
                <path ref={el => { pulsesRef.current[i] = el }} className={`processPulse${i === 3 ? ' processPulseFinal' : ''}`} d={d} strokeWidth="2.5" fill="none" style={{ opacity: 0 }} />
              </g>
            ))}
          </svg>

          {cardData.map((card, i) => (
            <div key={i} className={`processCard ${activeStep >= i ? 'lit' : ''}`} ref={el => { cardsRef.current[i] = el }}>
              <div className="processCardIcon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">{card.icon}</svg>
              </div>
              <h3 className="processCardH">{card.h}</h3>
              <p className="processCardP">{card.p}</p>
            </div>
          ))}

          <div className={`processCard wide ${activeStep >= 4 ? 'litFinal' : ''}`} ref={el => { cardsRef.current[4] = el }}>
            <div className="processCardIcon" style={activeStep >= 4 ? { color: 'var(--log)', borderColor: 'var(--log)', background: 'rgba(var(--log-glow), 0.1)' } : {}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 15l2 2 4-4"/>
              </svg>
            </div>
            <div className="wideContent">
              <h3 className="processCardH">Borrador Final</h3>
              <p className="processCardP">Recibís el documento listo para imprimir o firmar, adaptado perfectamente a los datos validados.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
