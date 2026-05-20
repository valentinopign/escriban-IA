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
  title: "escribanIA — Digitalizá tu escribanía con IA",
  description: "Del DNI al .docx en minutos. Tu cliente sube las fotos, la IA extrae los datos, audita y genera el documento. Vos lo firmás.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "escribanIA — Digitalizá tu escribanía con IA",
    description: "Del DNI al .docx en minutos. Tu cliente sube las fotos, la IA extrae los datos, audita y genera el documento. Vos lo firmás.",
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
    card: "summary",
    title: "escribanIA — Digitalizá tu escribanía con IA",
    description: "Del DNI al .docx en minutos. Tu cliente sube las fotos, la IA extrae los datos, audita y genera el documento. Vos lo firmás.",
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'escribanIA',
  url: 'https://escriban-ia.com.ar',
  description: 'Software de automatización notarial con inteligencia artificial. Del DNI al .docx en minutos.',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: [
    { '@type': 'Offer', price: '34999', priceCurrency: 'ARS', name: 'Estándar' },
    { '@type': 'Offer', price: '54999', priceCurrency: 'ARS', name: 'Pro' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Escribanos y escribanías de Argentina',
  },
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
