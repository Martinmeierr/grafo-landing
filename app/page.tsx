import Script from 'next/script';
import { SiteFragment } from '@/components/landing/site-fragment';

export default function Home() {
  return <>
    <SiteFragment name="header"/>
    <main>
      <SiteFragment name="hero"/>
      <SiteFragment name="services"/>
      <SiteFragment name="situations"/>
      <SiteFragment name="projects"/>
      <SiteFragment name="lightbox"/>
      <SiteFragment name="process"/>
      <SiteFragment name="municipal-cta"/>
      <SiteFragment name="studio"/>
      <SiteFragment name="press"/>
      <SiteFragment name="contact"/>
      <SiteFragment name="contact-details"/>
    </main>
    <SiteFragment name="footer"/>
    <SiteFragment name="whatsapp-button"/>
    <SiteFragment name="whatsapp-welcome"/>
    <Script src="/scripts/grafo-landing.js" strategy="afterInteractive"/>
  </>;
}
