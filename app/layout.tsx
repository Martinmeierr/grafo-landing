import type { Metadata } from 'next';
import { Archivo, Inter } from 'next/font/google';
import './globals.css';

const archivo = Archivo({ variable: '--font-archivo', subsets: ['latin'] });
const inter = Inter({ variable: '--font-inter', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.GRAFO_SITE_URL || 'https://estudiografo.com'),
  icons: { icon: '/favicon.svg' },
  title: 'Grafo Estudio · Arquitectura y planos municipales',
  description: 'Grafo Estudio. Arquitectura, planos municipales y gestión de regularización en Vicente López, San Isidro, Tigre, General San Martín, Escobar y San Fernando.',
  openGraph: {
    title: 'Grafo Estudio — Arquitectura clara',
    description: 'Grafo Estudio. Arquitectura, planos municipales y gestión de regularización en Vicente López, San Isidro, Tigre, General San Martín, Escobar y San Fernando.',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Grafo Estudio — Arquitectura clara' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grafo Estudio — Arquitectura clara',
    description: 'Grafo Estudio. Arquitectura, planos municipales y gestión de regularización en Zona Norte.',
    images: ['/og.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${archivo.variable} ${inter.variable}`}>{children}</body>
    </html>
  );
}
