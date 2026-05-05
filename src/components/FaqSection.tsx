'use client';

import React, { useState } from 'react';

const faqs = [
  {
    q: '¿Es compatible con el sistema del Colegio de Escribanos?',
    a: 'Sí. escribanIA no reemplaza el sistema del Colegio — funciona en paralelo. Vos seguís operando tu software habitual para el protocolo y el registro. Lo que hacemos es automatizar el trabajo previo: la identificación del cliente, la extracción de datos y el borrador del documento, que luego incorporás a tu flujo de siempre.',
  },
  {
    q: '¿Necesito instalar algo en mi computadora?',
    a: 'No. escribanIA es 100% web — abrís el panel desde cualquier navegador, sin instalaciones ni actualizaciones manuales. El cliente accede desde su celular para subir el DNI. Vos gestionás todo desde tu escritorio o laptop, sin dependencias de sistema operativo.',
  },
  {
    q: '¿Qué tipos de trámites puedo procesar?',
    a: 'Hoy soportamos certificaciones de firma (persona humana y representación legal), autorizaciones de viaje, poderes notariales y contratos de alquiler. Estamos incorporando nuevos tipos de trámites de forma continua. En el plan Pro podés solicitar la integración de trámites específicos de tu escribanía.',
  },
  {
    q: '¿Puedo usar mis propias plantillas de escritura?',
    a: 'Sí. Podés cargar tus propias plantillas en formato Word y el sistema las completará con los datos extraídos del DNI o los documentos del cliente. Los planes Estándar y Pro incluyen gestión de plantillas personalizadas desde el panel administrativo.',
  },
  {
    q: '¿Qué pasa si la IA extrae un dato mal del DNI?',
    a: 'Antes de generar cualquier documento, el sistema muestra un panel de auditoría con todos los datos extraídos para que los revisés y corrijás. La IA nunca produce el documento final de forma directa: la revisión humana es obligatoria. Un error en el borrador no tiene ninguna consecuencia legal.',
  },
  {
    q: '¿Dónde se guardan los datos de mis clientes?',
    a: 'Los archivos subidos (fotos de DNI, estatutos, poderes) se procesan en el momento y se eliminan automáticamente a las 24 horas. No almacenamos documentos de forma permanente. Toda la comunicación está cifrada con TLS y los datos en reposo con AES-256, cumpliendo con la Ley 25.326 de Protección de Datos Personales.',
  },
];

const FaqSection = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section faqSection" id="faq">
      <div className="faqHead">
        <div className="sectionEyebrow faqEyebrow">— CONSULTAS FRECUENTES</div>
        <h2 className="faqTitle">Respuestas <span className="accent">concretas.</span></h2>
      </div>

      <div className="faqList">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className={`faqItem${open === i ? ' faqItemOpen' : ''}`}
          >
            <button className="faqQuestion" onClick={() => setOpen(open === i ? null : i)}>
              <span>{faq.q}</span>
              <svg
                className="faqChevron"
                width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="1.5"
              >
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
            {open === i && (
              <div className="faqAnswer">{faq.a}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
