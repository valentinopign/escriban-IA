import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "EscribanIA — Digitalizá tu escribanía con IA",
  description: "Del DNI al .docx en minutos. Tu cliente sube las fotos, la IA extrae los datos, audita y genera el documento. Vos lo firmás.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <div className="grid-bg" />
        <div className="vignette" />
        <div className="noise" />
        {children}
      </body>
    </html>
  );
}
