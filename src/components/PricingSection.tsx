import React from 'react';

const WA = 'https://wa.me/541170605707?text=';

const plans: {
  id: string;
  icon: React.ReactNode;
  name: string;
  price: string;
  unit: string;
  priceExtra: string;
  ideal: string;
  desc: string;
  callout: string | null;
  features: string[];
  href: string;
  featured: boolean;
  badge: string | null;
  trial: boolean;
  custom?: boolean;
}[] = [
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
      'Lectura automática de DNI y control de vencimiento',
      '100 trámites/mes incluidos',
      'Panel Administrativo completo',
      'Gestión de clientes',
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
      'Conexión con tus sistemas actuales',
      'Capacitación personalizada',
      'Account Manager dedicado',
    ],
    href: WA + encodeURIComponent('Hola, quiero solicitar acceso al plan Pro de escribanIA.'),
    featured: false,
    badge: null,
    trial: false,
  },
  {
    id: 'amedida',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l2.09 4.26L18 7.27l-3 2.92.71 4.13L12 12.18l-3.71 1.95.71-4.13-3-2.92 3.91-.57L12 2z"/><circle cx="12" cy="19" r="2"/><path d="M12 15v2"/>
      </svg>
    ),
    name: 'A Medida',
    price: 'A cotizar',
    unit: '',
    priceExtra: 'Precio según requerimientos',
    ideal: 'Para escribanías que necesitan una solución propia y completamente personalizada.',
    desc: 'Construimos exactamente lo que necesitás. Sin límites, sin compromisos predefinidos.',
    callout: null,
    features: [
      'Todo lo de Pro, incluido',
      'Desarrollo y configuración 100% personalizada',
      'Integraciones y flujos diseñados para vos',
      'Solución propia y única',
      'Acompañamiento continuo del equipo técnico',
    ],
    href: WA + encodeURIComponent('Hola quiero cotizar el plan a medida'),
    featured: false,
    badge: 'Premium',
    trial: false,
    custom: true,
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
          <div key={plan.id} className={`pricingCard${plan.featured ? ' pricingCardFeatured' : ''}${plan.id === 'pro' ? ' pricingCardPro' : ''}${plan.id === 'amedida' ? ' pricingCardAMedida' : ''}`}>
            {(plan.featured || plan.custom) && <div className="pricingCardTopLine" />}

            {plan.badge && <span className={`pricingBadge${plan.custom ? ' pricingBadgePremium' : ''}`}>{plan.badge}</span>}

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
                    <span className="pricingDiscountBadge">75% OFF</span>
                  </div>
                  <div className="pricingCardPriceFree">$9.999 <span className="pricingCardPriceFreeUnit">· 1er mes</span></div>
                  <div className="pricingTrialNote">Precio especial de lanzamiento · para nuevas escribanías</div>
                </>
              ) : plan.custom ? (
                <>
                  <div className="pricingPriceRowSpacer" />
                  <div className="pricingCardPriceQuote">{plan.price}</div>
                  <div className="pricingPriceExtra">{plan.priceExtra}</div>
                </>
              ) : (
                <>
                  <div className="pricingPriceRowSpacer" />
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
              className={`pricingCta${plan.featured ? ' pricingCtaFeatured' : ''}${plan.custom ? ' pricingCtaAMedida' : ''}`}
            >
              {plan.trial ? 'Comenzar por $9.999 →' : plan.custom ? 'Cotizar ahora →' : 'Solicitar acceso →'}
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
