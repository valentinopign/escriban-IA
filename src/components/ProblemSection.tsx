import React from 'react';

const ProblemSection = () => {
  return (
    <section className="section problemSection" id="problema">
      <div className="problemGrid">
        <div className="problemIntro">
          <div className="sectionEyebrow problemEyebrow">— EL PROBLEMA</div>
          <h2 className="problemTitle">Tu escribanía<br/>pierde tiempo<br/><span className="accent">todos los días.</span></h2>
          <p className="problemLead">Los procesos manuales consumen horas de tu equipo y generan riesgos legales innecesarios. La automatización notarial con inteligencia artificial elimina ese cuello de botella para siempre.</p>
          <div className="problemStat">
            <div className="problemStatNum">
              <span className="problemStatGran">~20 min</span>
            </div>
            <div className="problemStatLabel">SE PIERDEN EN PROMEDIO POR TRÁMITE<br/>EN CARGA MANUAL DE DATOS.</div>
          </div>
        </div>
        <div className="problemCards">
          <div className="problemCard">
            <div className="problemCardIcon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5"/><path d="M9 12h7M9 16h5"/></svg>
            </div>
            <h3 className="problemCardH">El laberinto de personerías</h3>
            <p className="problemCardP">Cruzar datos de actas, estatutos y poderes es un campo minado. Localizar una cláusula de administración en 60 páginas consume tiempo y genera riesgo legal.</p>
          </div>
          <div className="problemCard">
            <div className="problemCardIcon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
            </div>
            <h3 className="problemCardH">Carga manual agotadora</h3>
            <p className="problemCardP">Tu equipo pierde horas cargando DNIs y CUILs. Datos básicos que toman llamadas o formularios manuales en lugar de asesorar al cliente.</p>
          </div>
          <div className="problemCard">
            <div className="problemCardIcon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3 L22 20 L2 20 Z"/><path d="M12 10v5M12 17.5v.5"/></svg>
            </div>
            <h3 className="problemCardH">Vigencias en el limbo</h3>
            <p className="problemCardP">Cálculo manual de plazos de cargos y mandatos. Determinar si una designación sigue vigente es una de las mayores fuentes de observaciones registrales.</p>
          </div>
          <div className="problemCard">
            <div className="problemCardIcon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M12 8v5M12 16v.5"/></svg>
            </div>
            <h3 className="problemCardH">Errores de transcripción</h3>
            <p className="problemCardP">Copiar datos a mano introduce errores críticos. Un número mal tipeado puede invalidar un documento y generar costos legales altísimos.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
