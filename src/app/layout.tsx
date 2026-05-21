import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "escribanIA — Software Notarial con IA para Escribanos de Argentina",
  description: "Automatizá tu escribanía con inteligencia artificial. Procesá certificaciones de firma, autorizaciones de viaje y poderes notariales en minutos. Del DNI al documento listo para firmar.",
  keywords: [
    "escribano digital argentina",
    "software notarial inteligencia artificial",
    "automatización notarial",
    "trámites notariales online",
    "autorización de viaje escribano",
    "poder notarial digital",
    "escribano inteligencia artificial",
    "certificación de firma digital",
    "escribanía digital",
    "OCR DNI escribano",
  ],
  alternates: {
    canonical: "https://escriban-ia.com.ar",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "escribanIA — Software Notarial con IA para Escribanos de Argentina",
    description: "Automatizá tu escribanía con inteligencia artificial. Procesá certificaciones de firma, autorizaciones de viaje y poderes notariales en minutos.",
    url: "https://escriban-ia.com.ar",
    siteName: "escribanIA",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "https://escriban-ia.com.ar/og-image.png",
        width: 1024,
        height: 1024,
        alt: "escribanIA — Automatización notarial con IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "escribanIA — Software Notarial con IA para Escribanos de Argentina",
    description: "Automatizá tu escribanía con inteligencia artificial. Procesá certificaciones de firma, autorizaciones de viaje y poderes notariales en minutos.",
    images: ["https://escriban-ia.com.ar/og-image.png"],
  },
};

const jsonLdApp = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'escribanIA',
  url: 'https://escriban-ia.com.ar',
  description: 'Software de automatización notarial con inteligencia artificial para escribanos de Argentina. Procesá certificaciones de firma, autorizaciones de viaje, poderes notariales y contratos. Del DNI al documento listo en minutos.',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  inLanguage: 'es-AR',
  offers: [
    { '@type': 'Offer', price: '34999', priceCurrency: 'ARS', name: 'Estándar', description: '100 trámites/mes incluidos, panel administrativo y soporte prioritario.' },
    { '@type': 'Offer', price: '54999', priceCurrency: 'ARS', name: 'Pro', description: 'Trámites ilimitados, API personalizada, account manager dedicado.' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Escribanos y escribanías de Argentina',
  },
  featureList: [
    'OCR de DNI con validación de vencimiento',
    'Generación automática de documentos notariales',
    'Certificaciones de firma',
    'Autorizaciones de viaje',
    'Poderes notariales',
    'Contratos de alquiler',
    'Panel administrativo y CRM de clientes',
    'Cumplimiento Ley 25.326 de Protección de Datos Personales',
  ],
};

const jsonLdFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Es compatible con el sistema del Colegio de Escribanos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. escribanIA no reemplaza el sistema del Colegio — funciona en paralelo. Vos seguís operando tu software habitual para el protocolo y el registro. Lo que hacemos es automatizar el trabajo previo: la identificación del cliente, la extracción de datos y el borrador del documento, que luego incorporás a tu flujo de siempre.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Necesito instalar algo en mi computadora?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. escribanIA es 100% web — abrís el panel desde cualquier navegador, sin instalaciones ni actualizaciones manuales. El cliente accede desde su celular para subir el DNI. Vos gestionás todo desde tu escritorio o laptop, sin dependencias de sistema operativo.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué tipos de trámites notariales puedo procesar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hoy soportamos certificaciones de firma (persona humana y representación legal), autorizaciones de viaje, poderes notariales y contratos de alquiler. Estamos incorporando nuevos tipos de trámites de forma continua. En el plan Pro podés solicitar la integración de trámites específicos de tu escribanía.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puedo usar mis propias plantillas de escritura?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Podés cargar tus propias plantillas en formato Word y el sistema las completará con los datos extraídos del DNI o los documentos del cliente. Los planes Estándar y Pro incluyen gestión de plantillas personalizadas desde el panel administrativo.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué pasa si la IA extrae un dato mal del DNI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Antes de generar cualquier documento, el sistema muestra un panel de auditoría con todos los datos extraídos para que los revisés y corrijás. La IA nunca produce el documento final de forma directa: la revisión humana es obligatoria. Un error en el borrador no tiene ninguna consecuencia legal.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Dónde se guardan los datos de mis clientes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Los archivos subidos (fotos de DNI, estatutos, poderes) se procesan en el momento y se eliminan automáticamente a las 24 horas. No almacenamos documentos de forma permanente. Toda la comunicación está cifrada con TLS y los datos en reposo con AES-256, cumpliendo con la Ley 25.326 de Protección de Datos Personales.',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdApp) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
      </head>
      <body>
        <div className="grid-bg" />
        <div className="vignette" />
        <div className="noise" />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
