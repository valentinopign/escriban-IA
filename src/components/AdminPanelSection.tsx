import React from 'react';
import EscribanIADemo from './EscribanIADemo';

const AdminPanelSection = () => {
  return (
    <section className="section adminSection" id="admin">
      <div className="adminHead">
        <div className="sectionEyebrow adminEyebrow">— PANEL DE CONTROL</div>
        <h2 className="adminTitle">Todo tu estudio,<br/>en <span className="accent">un solo lugar.</span></h2>
        <p className="adminLead">Gestiona tus clientes y sus documentos desde un panel diseñado para escribanos. Sin curva de aprendizaje.</p>
      </div>

      <div className="adminGrid">
        <div className="adminFeatures">
          <div className="adminFeatureCard">
            <div className="adminFeatureIcon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
            </div>
            <div className="adminFeatureText">
              <h3>CRM Notarial Inteligente</h3>
              <p>Control total de documentos y estados de trámites en tiempo real.</p>
            </div>
          </div>

          <div className="adminFeatureCard">
            <div className="adminFeatureIcon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div className="adminFeatureText">
              <h3>Seguridad de Grado Bancario</h3>
              <p>Encriptación de extremo a extremo para proteger la fe pública.</p>
            </div>
          </div>

          <div className="adminFeatureCard">
            <div className="adminFeatureIcon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div className="adminFeatureText">
              <h3>Gestión de Clientes</h3>
              <p>Base de datos centralizada con historial completo de actuaciones.</p>
            </div>
          </div>

          <div className="adminFeatureCard">
            <div className="adminFeatureIcon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            </div>
            <div className="adminFeatureText">
              <h3>Archivo Digital</h3>
              <p>Trazabilidad absoluta y backups automáticos en la nube.</p>
            </div>
          </div>
        </div>

        <div className="adminVideoPlaceholder">
          <div className="macWindow">
            <div className="macTitleBar">
              <div className="macTrafficLights">
                <span className="macDot" style={{ background: '#ff5f57' }} />
                <span className="macDot" style={{ background: '#febc2e' }} />
                <span className="macDot" style={{ background: '#28c840' }} />
              </div>
              <div className="macTitle">escribanIA — Panel Administrativo</div>
            </div>
            <div className="macContent">
              <EscribanIADemo />
            </div>
          </div>
        </div>
      </div>

      <div className="adminSecurityStrip">
        <div className="securityItem">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <div>
            <strong>LEY 25.326</strong>
            <span>Protección de Datos</span>
          </div>
        </div>
        <div className="securityItem">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
          <div>
            <strong>PRIVACIDAD</strong>
            <span>Archivos se borran en 24hs</span>
          </div>
        </div>
        <div className="securityItem">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <div>
            <strong>ENCRIPTACIÓN</strong>
            <span>TLS + AES-256</span>
          </div>
        </div>
        <div className="securityItem">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><circle cx="12" cy="12" r="3"/></svg>
          <div>
            <strong>ROLES CLAROS</strong>
            <span>Responsable / Procesador</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminPanelSection;
