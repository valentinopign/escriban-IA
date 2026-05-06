import React from 'react';

const WA = 'https://wa.me/541123808166?text=';

const plans = [
  {
    id: 'basico',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    name: 'Básico',
    price: '$2.000',
    unit: 'por trámite',
    priceExtra: null,
    ideal: 'Ideal para escribanías que empiezan o con bajo volumen mensual.',
    desc: 'Sin abono mensual. Pagás solo cuando usás el sistema. Sin mínimos ni compromisos.',
    callout: 'A partir de 18 trámites/mes, Estándar te conviene más →',
    features: [
      'OCR de DNI + validación de vencimiento',
      'Análisis de personería',
      'Redacción de borrador en Word',
      'Sin mínimos ni compromisos',
    ],
    href: WA + encodeURIComponent('Hola, quiero solicitar acceso al plan Básico de escribanIA.'),
    featured: false,
  },
  {
    id: 'estandar',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="2" width="14" height="20" rx="2"/><path d="M9 7h6M9 11h6M9 15h4"/>
      </svg>
    ),
    name: 'Estándar',
    price: '$34.999',
    unit: '/mes',
    priceExtra: '+ $900 por trámite adicional',
    ideal: 'Ideal para escribanías con flujo constante de operaciones.',
    desc: 'Hasta 100 trámites incluidos. El plan más elegido.',
    callout: 'A partir de 100 trámites/mes, Pro te conviene más →',
    features: [
      'Todo lo de Básico, incluido',
      '100 trámites/mes incluidos',
      'Panel Administrativo completo',
      'Gestión de clientes (CRM)',
      'Soporte prioritario por WhatsApp',
    ],
    href: WA + encodeURIComponent('Hola, quiero solicitar acceso al plan Estándar de escribanIA.'),
    featured: true,
    badge: 'Popular',
  },
  {
    id: 'pro',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    name: 'Pro',
    price: '$54.999',
    unit: '/mes',
    priceExtra: 'Sin costo por trámite adicional',
    ideal: 'Ideal para grandes escribanías y registros con alto volumen.',
    desc: 'Trámites ilimitados. Para estudios que no pueden permitirse fricciones.',
    callout: null,
    features: [
      'Todo lo de Estándar, incluido',
      'Trámites ilimitados, sin techo',
      'API personalizada e integración',
      'Implementación y capacitación In-Situ',
      'Account Manager dedicado',
    ],
    href: WA + encodeURIComponent('Hola, quiero solicitar acceso al plan Pro de escribanIA.'),
    featured: false,
  },
];

const PricingSection = () => {
  return (
    <section className="section pricingSection" id="precios">
      <div className="pricingHead">
        <div className="sectionEyebrow pricingEyebrow">— INVERSIÓN EN EFICIENCIA</div>
        <h2 className="pricingTitle">
          Modelos de <span className="accent">negocio transparentes.</span>
        </h2>
        <p className="pricingLead">
          Sin costos ocultos ni sorpresas. Elegí el plan que mejor se adapte al volumen de tu escribanía.
        </p>
      </div>

      <div className="pricingGrid">
        {plans.map((plan) => (
          <div key={plan.id} className={`pricingCard${plan.featured ? ' pricingCardFeatured' : ''}${plan.id === 'pro' ? ' pricingCardPro' : ''}`}>
            {plan.featured && <div className="pricingCardTopLine" />}

            {/* Badge — absolute, no afecta el flujo */}
            {plan.badge && <span className="pricingBadge">{plan.badge}</span>}

            {/* Row 1 */}
            <div className="pricingCardIcon">{plan.icon}</div>

            {/* Row 3 */}
            <div className="pricingCardMeta">
              <div className="pricingCardName">{plan.name}</div>
              <div className="pricingCardIdeal">{plan.ideal}</div>
            </div>

            {/* Row 4 */}
            <div className="pricingCardPriceBlock">
              <div className="pricingCardPrice">
                {plan.price}<span className="pricingUnit">{plan.unit}</span>
              </div>
              {plan.priceExtra
                ? <div className="pricingPriceExtra">{plan.priceExtra}</div>
                : <div className="pricingPriceExtraEmpty" />
              }
            </div>

            {/* Row 5 */}
            <p className="pricingCardDesc">{plan.desc}</p>

            {/* Row 6 — always rendered, empty if no callout */}
            <div className="pricingCalloutSlot">
              {plan.callout && (
                <div className="pricingCallout">{plan.callout}</div>
              )}
            </div>

            {/* Row 7 */}
            <ul className="pricingFeatures">
              {plan.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>

            {/* Row 8 */}
            <a
              href={plan.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`pricingCta${plan.featured ? ' pricingCtaFeatured' : ''}`}
            >
              Solicitar acceso →
            </a>
          </div>
        ))}
      </div>

      <div className="pricingTrust">
        <span>Sin permanencia</span>
        <span className="pricingTrustDot">·</span>
        <span>Cancelá cuando quieras</span>
        <span className="pricingTrustDot">·</span>
        <span>Soporte directo por WhatsApp</span>
      </div>
    </section>
  );
};

export default PricingSection;
