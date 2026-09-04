import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://foarq-arquitectura.martinmeierr.chatgpt.site'),
  title: 'FOARQ — Arquitectura que nace de escuchar',
  description: 'Estudio de arquitectura de Facundo Ojeda. Proyecto, dirección y construcción de viviendas contemporáneas.',
  openGraph: {
    title: 'FOARQ — Espacios que nacen de escuchar',
    description: 'Arquitectura residencial conectada con la vida y el paisaje.',
    images: [{ url: '/og.png', width: 1536, height: 1024, alt: 'FOARQ — Espacios que nacen de escuchar' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FOARQ — Espacios que nacen de escuchar',
    description: 'Arquitectura residencial conectada con la vida y el paisaje.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
