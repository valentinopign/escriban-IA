import React from 'react';

const WA = 'https://wa.me/541123808166?text=';

const plans = [
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
    desc: '',
    callout: 'A partir de 100 trámites/mes, Pro te conviene más →',
    features: [
      'OCR de DNI + validación de vencimiento',
      '100 trámites/mes incluidos',
      'Panel Administrativo completo',
      'Gestión de clientes (CRM)',
      'Soporte prioritario por WhatsApp',
    ],
    href: WA + encodeURIComponent('Hola, quiero solicitar acceso al plan Estándar de escribanIA.'),
    featured: true,
    badge: 'Popular',
    trial: true,
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
    trial: false,
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

            {plan.badge && <span className="pricingBadge">{plan.badge}</span>}

            <div className="pricingCardIcon">{plan.icon}</div>

            <div className="pricingCardMeta">
              <div className="pricingCardName">{plan.name}</div>
              <div className="pricingCardIdeal">{plan.ideal}</div>
            </div>

            <div className="pricingCardPriceBlock">
              {plan.trial ? (
                <>
                  <div className="pricingCardPriceRow">
                    <div className="pricingCardPriceStrike">
                      {plan.price}<span className="pricingUnit">{plan.unit}</span>
                    </div>
                    <div className="pricingCardPriceFree">Gratis <span className="pricingCardPriceFreeUnit">· 1 mes</span></div>
                  </div>
                  <div className="pricingTrialNote">30 días · trámites limitados · para nuevas escribanías</div>
                </>
              ) : (
                <>
                  <div className="pricingCardPrice">
                    {plan.price}<span className="pricingUnit">{plan.unit}</span>
                  </div>
                  {plan.priceExtra
                    ? <div className="pricingPriceExtra">{plan.priceExtra}</div>
                    : <div className="pricingPriceExtraEmpty" />
                  }
                </>
              )}
            </div>

            <p className="pricingCardDesc">{plan.desc}</p>

            <div className="pricingCalloutSlot">
              {plan.callout && (
                <div className="pricingCallout">{plan.callout}</div>
              )}
            </div>

            <ul className="pricingFeatures">
              {plan.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>

            <a
              href={plan.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`pricingCta${plan.featured ? ' pricingCtaFeatured' : ''}`}
            >
              {plan.trial ? 'Empezar gratis →' : 'Solicitar acceso →'}
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
