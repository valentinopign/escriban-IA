import React from 'react';

const UseCaseSection = () => {
  return (
    <section className="section usecaseSection" id="casos">
      <div className="usecaseHead">
        <div className="sectionEyebrow" style={{ textAlign: 'center' }}>— CASOS DE USO</div>
        <h2 className="usecaseTitle">Trámites optimizados para la <span className="accent">agilidad operativa.</span></h2>
      </div>

      <div className="usecaseGrid usecaseGridFeatured">
        <div className="usecaseCard featured">
          <div className="usecaseTop">
            <div className="usecaseIcon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>
            </div>
            <div className="timePill agentic"><span>PROCESO AGÉNTICO</span></div>
          </div>
          <h3 className="usecaseH">Auditoría de Personerías</h3>
          <p className="usecaseP">Lectura automática de estatutos y actas. Cruza con el BORA y alerta cuando un mandato está por vencer.</p>
          <ul className="usecaseFeats">
            <li>Lectura de estatutos y actas</li>
            <li>Verificación en BORA</li>
            <li>Alertas de vencimiento</li>
          </ul>
        </div>

        <div className="usecaseCard featured">
          <div className="usecaseTop">
            <div className="usecaseIcon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 17 L9 12 L13 16 L20 8"/><path d="M14 8h6v6"/></svg>
            </div>
            <div className="timePill"><b>20MIN</b> → <span>4MIN</span></div>
          </div>
          <h3 className="usecaseH">Certificación de Firmas</h3>
          <p className="usecaseP">Procesamiento masivo de múltiples firmantes en un solo flujo.</p>
          <ul className="usecaseFeats">
            <li>Validación de identidad</li>
            <li>Trazabilidad</li>
            <li>Archivo digital</li>
          </ul>
        </div>

        <div className="usecaseCard featured">
          <div className="usecaseTop">
            <div className="usecaseIcon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 16 L22 12 L19 9 L11 11 L7 6 L4 7 L7 12 L4 13 L2 12 Z"/></svg>
            </div>
            <div className="timePill"><b>30MIN</b> → <span>5MIN</span></div>
          </div>
          <h3 className="usecaseH">Autorizaciones de Viaje</h3>
          <p className="usecaseP">Recopilación de datos de menores, padres y acompañantes en minutos.</p>
          <ul className="usecaseFeats">
            <li>Lectura de DNI + vencimiento</li>
            <li>Acreditación de vínculo</li>
            <li>Generación Word</li>
          </ul>
        </div>
      </div>

      <div className="usecaseGrid usecaseGridSecondary">
        <div className="usecaseCard">
          <div className="usecaseTop">
            <div className="usecaseIcon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5"/><path d="M9 12h7M9 16h5"/></svg>
            </div>
            <div className="timePill"><b>40MIN</b> → <span>6MIN</span></div>
          </div>
          <h3 className="usecaseH">Poderes Notariales</h3>
          <p className="usecaseP">Definición precisa de facultades y apoderados sin errores de carga.</p>
          <ul className="usecaseFeats">
            <li>Múltiples apoderados</li>
            <li>Vigencia automática</li>
            <li>Formato legal</li>
          </ul>
        </div>

        <div className="usecaseCard">
          <div className="usecaseTop">
            <div className="usecaseIcon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 11 L12 4 L21 11 V20 H3 Z"/><path d="M9 20v-6h6v6"/></svg>
            </div>
            <div className="timePill"><b>35MIN</b> → <span>5MIN</span></div>
          </div>
          <h3 className="usecaseH">Contratos de Alquiler</h3>
          <p className="usecaseP">Gestión bilateral de datos entre propietarios e inquilinos.</p>
          <ul className="usecaseFeats">
            <li>Datos del inmueble</li>
            <li>Montos y plazos</li>
            <li>Borrador inmediato</li>
          </ul>
        </div>

        <div className="usecaseCard">
          <div className="usecaseTop">
            <div className="usecaseIcon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 13l2-5h14l2 5v5H3z"/><circle cx="7" cy="18" r="1.8"/><circle cx="17" cy="18" r="1.8"/><path d="M9 8V5h6v3"/></svg>
            </div>
            <div className="timePill"><b>25MIN</b> → <span>4MIN</span></div>
          </div>
          <h3 className="usecaseH">Formulario 08</h3>
          <p className="usecaseP">Transferencia automotor sin idas y vueltas al registro.</p>
          <ul className="usecaseFeats">
            <li>Lectura de DNI</li>
            <li>Chat con IA para datos del automotor</li>
          </ul>
        </div>

        <div className="usecaseCard">
          <div className="usecaseTop">
            <div className="usecaseIcon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="14" r="4"/><path d="M11 12 L20 4 M16 8 L18 10 M14 6 L17 9"/></svg>
            </div>
            <div className="timePill"><b>20MIN</b> → <span>3MIN</span></div>
          </div>
          <h3 className="usecaseH">Autorización de Manejo</h3>
          <p className="usecaseP">Permiso para conducir vehículos de terceros con datos cargados automáticamente.</p>
          <ul className="usecaseFeats">
            <li>Datos del titular + autorizado</li>
            <li>Vigencia configurable</li>
            <li>Listo para presentar</li>
          </ul>
        </div>

        <div className="usecaseCard">
          <div className="usecaseTop">
            <div className="usecaseIcon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="8" y="3" width="12" height="14" rx="1.5"/><rect x="4" y="7" width="12" height="14" rx="1.5"/></svg>
            </div>
            <div className="timePill"><b>15MIN</b> → <span>2MIN</span></div>
          </div>
          <h3 className="usecaseH">Certificación Fotocopias</h3>
          <p className="usecaseP">Validación de copia fiel del original con acta automática.</p>
          <ul className="usecaseFeats">
            <li>Lectura del DNI</li>
            <li>Almacena documento para imprimir</li>
            <li>Cuenta páginas y las define</li>
          </ul>
        </div>
      </div>

      <div className="usecaseCta">
        <div className="usecaseCtaText">
          <h3 className="usecaseCtaH">¿Necesitás un trámite específico?</h3>
          <p className="usecaseCtaP">Cada documento nuevo son <span className="hl">~20 líneas de código</span>. Lo hacemos sin costo porque nos ayudamos a crecer mutuamente.</p>
        </div>
        <button className="usecaseCtaBtn">PEDÍ TU TRÁMITE <span aria-hidden="true">→</span></button>
      </div>
    </section>
  );
};

export default UseCaseSection;
