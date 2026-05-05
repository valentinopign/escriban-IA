'use client';

import React, { useEffect, useRef, useState } from 'react';

interface DiagramProps {
  onAnimationEnd?: () => void;
}

const Diagram = ({ onAnimationEnd }: DiagramProps) => {
  const [hasRun, setHasRun] = useState(false);
  const diagramWrapRef = useRef<HTMLDivElement>(null);
  
  const boxClienteRef = useRef<SVGGElement>(null);
  const boxIARef = useRef<SVGGElement>(null);
  const boxEscriRef = useRef<SVGGElement>(null);
  const cable1Ref = useRef<SVGPathElement>(null);
  const cable1bRef = useRef<SVGPathElement>(null);
  const cable2Ref = useRef<SVGPathElement>(null);
  const cable2bRef = useRef<SVGPathElement>(null);
  const light1Ref = useRef<SVGPathElement>(null);
  const light1bRef = useRef<SVGPathElement>(null);
  const light2Ref = useRef<SVGPathElement>(null);
  const light2bRef = useRef<SVGPathElement>(null);
  
  const logLinesRef = useRef<(HTMLDivElement | null)[]>([]);

  const animateLight = (lightEl: SVGPathElement, duration: number) => {
    return new Promise<void>(resolve => {
      const len = lightEl.getTotalLength ? lightEl.getTotalLength() : 300;
      const pulseLen = Math.max(40, len * 0.18);
      lightEl.setAttribute('stroke-dasharray', `${pulseLen} ${len + pulseLen}`);
      lightEl.style.opacity = '1';
      lightEl.style.transition = 'none';
      lightEl.setAttribute('stroke-dashoffset', String(pulseLen));
      lightEl.getBoundingClientRect();
      lightEl.style.transition = `stroke-dashoffset ${duration}ms cubic-bezier(.4,.0,.2,1)`;
      lightEl.setAttribute('stroke-dashoffset', String(-len));
      setTimeout(() => {
        lightEl.style.opacity = '0';
        resolve();
      }, duration);
    });
  };

  const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

  const showLog = (i: number) => {
    const el = logLinesRef.current[i];
    if (!el) return;
    el.classList.add('visible', 'fresh');
    setTimeout(() => el.classList.remove('fresh'), 1300);
  };

  const runSequence = async () => {
    [boxClienteRef, boxIARef, boxEscriRef].forEach(b => {
      b.current?.classList.remove('lit', 'litFinal');
    });
    [cable1Ref, cable1bRef, cable2Ref, cable2bRef].forEach(c => c.current?.classList.remove('lit'));
    logLinesRef.current.forEach(l => l?.classList.remove('visible', 'fresh'));
    [light1Ref, light1bRef, light2Ref, light2bRef].forEach(l => {
      if (l.current) l.current.style.opacity = '0';
    });

    await delay(400);

    boxClienteRef.current?.classList.add('lit');
    // 2. Light travels Cliente → IA
    cable1Ref.current?.classList.add('lit');
    cable1bRef.current?.classList.add('lit');
    if (light1Ref.current) animateLight(light1Ref.current, 1100);
    setTimeout(() => {
      if (light1bRef.current) animateLight(light1bRef.current, 1100);
    }, 180);

    await delay(1100); // Wait for light to reach IA

    // 3. IA lights up
    boxIARef.current?.classList.add('lit');
    showLog(0); await delay(450); // Log: Lectura de DNI
    showLog(1); await delay(700); // Log: Validación de datos
    showLog(2); await delay(700); // Log: Auditoría de representación
    showLog(3); await delay(700); // Log: Generación de .docx


    cable2Ref.current?.classList.add('lit');
    cable2bRef.current?.classList.add('lit');
    if (light2Ref.current) animateLight(light2Ref.current, 1100);
    setTimeout(() => {
      if (light2bRef.current) animateLight(light2bRef.current, 1100);
    }, 180);
    await delay(900);

    boxEscriRef.current?.classList.add('litFinal');
    showLog(4);
    
    // Notify that the animation has reached the final stage
    if (onAnimationEnd) onAnimationEnd();
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasRun) {
        setHasRun(true);
        runSequence();
      }
    }, { threshold: 0.1 });

    if (diagramWrapRef.current) {
      observer.observe(diagramWrapRef.current);
    }

    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasRun]);

  return (
    <div className="diagramWrap" ref={diagramWrapRef}>
      <svg viewBox="0 0 1100 500" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="microgrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="0.5"/>
          </pattern>
        </defs>

        <rect x="0" y="0" width="1100" height="500" fill="url(#microgrid)" opacity="0.6"/>

        <g fontFamily="var(--font-geist-mono), monospace" fontSize="9" fill="rgba(255,255,255,0.18)" letterSpacing="0.1em">
          <text x="20" y="20">A1</text>
          <text x="1075" y="20">A2</text>
          <text x="20" y="490">B1</text>
          <text x="1062" y="490">B2</text>
          <text x="540" y="20">N · 250</text>
          <text x="20" y="252">W · 000</text>
        </g>

        <g stroke="rgba(255,255,255,0.08)" strokeDasharray="2 4" fill="none">
          <line x1="120" y1="60" x2="120" y2="170"/>
          <line x1="980" y1="60" x2="980" y2="200"/>
        </g>

        <path ref={cable1Ref} className="cable" d="M 310 220 L 360 220 L 360 250 L 430 250"/>
        <path ref={cable1bRef} className="cable cableSecondary" d="M 310 240 L 350 240 L 350 290 L 430 290"/>
        <path ref={cable2Ref} className="cable" d="M 670 230 L 740 230 L 740 200 L 840 200"/>
        <path ref={cable2bRef} className="cable cableSecondary" d="M 670 270 L 760 270 L 760 240 L 840 240"/>

        <path ref={light1Ref} className="cableLight" d="M 310 220 L 360 220 L 360 250 L 430 250" strokeDasharray="0 1000" strokeDashoffset="0" style={{ opacity: 0 }}/>
        <path ref={light2Ref} className="cableLight" d="M 670 230 L 740 230 L 740 200 L 840 200" strokeDasharray="0 1000" strokeDashoffset="0" style={{ opacity: 0 }}/>
        <path ref={light1bRef} className="cableLight" d="M 310 240 L 350 240 L 350 290 L 430 290" strokeDasharray="0 1000" strokeDashoffset="0" style={{ opacity: 0 }}/>
        <path ref={light2bRef} className="cableLight" d="M 670 270 L 760 270 L 760 240 L 840 240" strokeDasharray="0 1000" strokeDashoffset="0" style={{ opacity: 0 }}/>

        <g className="box" ref={boxClienteRef}>
          <rect className="boxRect" x="80" y="170" width="230" height="100" rx="2"/>
          <g stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="none">
            <path d="M85 175 L85 180 M85 175 L90 175"/>
            <path d="M305 175 L305 180 M305 175 L300 175"/>
            <path d="M85 265 L85 260 M85 265 L90 265"/>
            <path d="M305 265 L305 260 M305 265 L300 265"/>
          </g>
          <text className="boxTag" x="88" y="190">NODE · 01</text>
          <text className="boxLabel" x="195" y="232" textAnchor="middle" fontSize="22">CLIENTE</text>
          <text className="boxTag" x="195" y="252" textAnchor="middle">SUBIDA · DNI · PODER · ESTATUTO</text>
          <circle className="nodePin" cx="310" cy="220" r="3"/>
          <circle className="nodePin" cx="310" cy="240" r="3"/>
        </g>

        <g className="box" ref={boxIARef}>
          <rect className="boxRect" x="430" y="180" width="240" height="140" rx="2"/>
          <g stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="none">
            <path d="M435 185 L435 190 M435 185 L440 185"/>
            <path d="M665 185 L665 190 M665 185 L660 185"/>
            <path d="M435 315 L435 310 M435 315 L440 315"/>
            <path d="M665 315 L665 310 M665 315 L660 315"/>
          </g>
          <text className="boxTag" x="438" y="200">NODE · 02 · CORE</text>
          <text className="boxLabel" x="550" y="265" textAnchor="middle" fontSize="38" fontWeight="600">IA</text>
          <text className="boxTag" x="550" y="290" textAnchor="middle">CLAUDE · VISION + CHAT</text>
          <circle className="nodePin" cx="430" cy="250" r="3"/>
          <circle className="nodePin" cx="430" cy="290" r="3"/>
          <circle className="nodePin" cx="670" cy="230" r="3"/>
          <circle className="nodePin" cx="670" cy="270" r="3"/>
        </g>

        <g className="box" ref={boxEscriRef}>
          <rect className="boxRect" x="840" y="150" width="200" height="110" rx="2"/>
          <g stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="none">
            <path d="M845 155 L845 160 M845 155 L850 155"/>
            <path d="M1035 155 L1035 160 M1035 155 L1030 155"/>
            <path d="M845 255 L845 250 M845 255 L850 255"/>
            <path d="M1035 255 L1035 250 M1035 255 L1030 255"/>
          </g>
          <text className="boxTag" x="848" y="170">NODE · 03 · OUTPUT</text>
          <text className="boxLabel" x="940" y="218" textAnchor="middle" fontSize="22">ESCRIBANÍA</text>
          <text className="boxTag" x="940" y="238" textAnchor="middle">.DOCX · LISTO</text>
          <circle className="nodePin" cx="840" cy="200" r="3"/>
          <circle className="nodePin" cx="840" cy="240" r="3"/>
        </g>

        <g fontFamily="var(--font-geist-mono), monospace" fontSize="10" fill="var(--ink-3)" letterSpacing="0.05em" opacity="0.55">
          <text x="335" y="170">flujo · datos</text>
          <line x1="365" y1="175" x2="350" y2="195" stroke="currentColor" strokeWidth="0.8"/>
        </g>
        <g fontFamily="var(--font-geist-mono), monospace" fontSize="10" fill="var(--ink-3)" letterSpacing="0.05em" opacity="0.55">
          <text x="745" y="155">salida · word</text>
          <line x1="780" y1="160" x2="770" y2="180" stroke="currentColor" strokeWidth="0.8"/>
        </g>
      </svg>

      <div className="logs">
        {[
          { ts: '[00:00.412]', text: 'Lectura de DNI' },
          { ts: '[00:01.847]', text: 'Validación de datos' },
          { ts: '[00:02.913]', text: 'Auditoría de representación' },
          { ts: '[00:03.601]', text: 'Generación de .docx' },
          { ts: '[00:04.122]', text: 'Listo para descargar' },
        ].map((log, i) => (
          <div key={i} className="logLine" ref={(el) => { logLinesRef.current[i] = el; }}>
            <span className="ts">{log.ts}</span>
            <span className="arrow">›</span>
            <span>{log.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Diagram;
