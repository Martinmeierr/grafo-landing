import { ConsultationProvider } from '@/components/consultation-context';
import { ContactWizard } from '@/components/contact-wizard';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { ProcessSection } from '@/components/process-section';
import { ProjectsSection } from '@/components/projects-section';
import { RevealObserver } from '@/components/reveal-observer';
import { ServicesSection } from '@/components/services-section';
import { SituationsSection } from '@/components/situations-section';
import { StudioSection } from '@/components/studio-section';

export default function Home() {
  return <ConsultationProvider>
    <RevealObserver/>
    <Header/>
    <main>
      <Hero/>
      <ServicesSection/>
      <SituationsSection/>
      <ProjectsSection/>
      <ProcessSection/>
      <StudioSection/>
      <ContactWizard/>
    </main>
    <Footer/>
  </ConsultationProvider>;
}
