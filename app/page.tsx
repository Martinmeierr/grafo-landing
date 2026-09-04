'use client';

import Image from 'next/image';
import { FormEvent, useEffect, useState } from 'react';

const municipalities = ['Vicente López', 'San Isidro', 'Tigre', 'General San Martín', 'Escobar'];
const situations = ['Construcción no declarada', 'Venta o escritura', 'Obra nueva o ampliación', 'Final de obra', 'Observaciones municipales', 'No sé por dónde empezar'];

export default function Home() {
  const [compare, setCompare] = useState(52);
  const [step, setStep] = useState(0);
  const [service, setService] = useState('');
  const [situation, setSituation] = useState('');
  const [zone, setZone] = useState('');
  const [name, setName] = useState('');
  const [comments, setComments] = useState('');

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.14 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const sendBrief = (event: FormEvent) => {
    event.preventDefault();
    const message = `Hola Grafo, soy ${name || '—'}. Quiero consultar por: ${service}. Situación: ${situation}. Zona: ${zone}. ${comments}`;
    window.open(`https://wa.me/5491132273109?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Grafo Estudio, inicio"><Image src="/images/grafo-logo.png" alt="Grafo Estudio" width={220} height={60} priority /></a>
        <nav aria-label="Navegación principal"><a href="#servicios">Servicios</a><a href="#proyectos">Proyectos</a><a href="#estudio">Estudio</a><a className="nav-cta" href="#contacto">Contanos tu caso</a></nav>
      </header>

      <section className="hero" id="inicio">
        <Image className="hero-image" src="/images/obra-marino.webp" alt="Casa Marino en construcción entre árboles" fill priority sizes="100vw" />
        <div className="hero-shade" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">Arquitectura · Planos municipales · Zona Norte</p>
          <h1><span>Claridad</span> para proyectar. Criterio para avanzar.</h1>
          <p>Ordenamos lo complejo para que cada decisión —de un plano municipal a una vivienda— tenga fundamento, dirección y un próximo paso claro.</p>
          <div className="hero-actions"><a className="button light" href="#contacto">Evaluar mi caso <span>↘</span></a><a className="text-link" href="#servicios">Ver servicios ↓</a></div>
        </div>
        <div className="hero-index"><span>G</span><p>La arquitectura como una herramienta para decidir mejor.</p></div>
      </section>

      <section className="trust-strip" aria-label="Cobertura y matrícula"><p>Mat. profesional T-54041</p><p>Benavidez · Tigre</p><div>{municipalities.map((item) => <span key={item}>{item}</span>)}</div></section>

      <section className="services section-pad" id="servicios">
        <div className="section-label" data-reveal><span>01</span><p>Qué hacemos</p></div>
        <div className="section-title" data-reveal><p>Dos formas de ayudarte a avanzar con menos incertidumbre.</p><h2>Servicios con un alcance claro desde el principio.</h2></div>
        <div className="service-list">
          <article className="service" data-reveal><div className="service-number">01</div><div><p className="service-kicker">Gestión y regularización</p><h3>Planos municipales</h3><p>Primero diagnosticamos. Después definimos qué trámite y documentación corresponden según el inmueble y el municipio.</p><ul><li>Relevamiento y antecedentes</li><li>Análisis normativo</li><li>Expediente y seguimiento</li></ul><a href="#contacto">Evaluar mi propiedad ↗</a></div></article>
          <article className="service" data-reveal><div className="service-number">02</div><div><p className="service-kicker">Diseño y documentación</p><h3>Proyecto arquitectónico</h3><p>Convertimos necesidades, condicionantes del sitio y recursos disponibles en una propuesta definida y construible.</p><ul><li>Programa y anteproyecto</li><li>Plantas, cortes y vistas</li><li>Definiciones y próximos pasos</li></ul><a href="#contacto">Contarnos el proyecto ↗</a></div></article>
        </div>
      </section>

      <section className="situations section-pad">
        <div className="section-label inverse" data-reveal><span>02</span><p>Cuándo consultar</p></div>
        <div className="situations-head" data-reveal><h2>Tal vez tu caso empieza acá.</h2><p>No hace falta conocer el nombre del trámite. Con una descripción honesta de la situación podemos orientar el primer paso.</p></div>
        <div className="situation-grid">{situations.map((item, index) => <article key={item} data-reveal style={{ transitionDelay: `${index * 55}ms` }}><span>0{index + 1}</span><h3>{item}</h3><p>{index === 0 ? 'Lo construido no coincide con los planos disponibles.' : index === 1 ? 'La documentación condiciona una operación o escritura.' : index === 2 ? 'Necesitás verificar indicadores antes de construir.' : index === 3 ? 'La obra terminó y falta cerrar el expediente.' : index === 4 ? 'Hay que ordenar una respuesta técnica y documental.' : 'Revisamos antecedentes y te ayudamos a ordenar la situación.'}</p></article>)}</div>
      </section>

      <section className="projects section-pad" id="proyectos">
        <div className="section-label" data-reveal><span>03</span><p>Proyecto seleccionado</p></div>
        <div className="project-head" data-reveal><div><p>Casa Marino · Benavidez, Tigre</p><h2>De la idea<br />a la materia.</h2></div><p>Proyecto, documentación técnica, cómputos y seguimiento. Una misma lógica desde las primeras decisiones hasta la obra.</p></div>
        <div className="comparison" data-reveal>
          <div className="compare-frame">
            <Image src="/images/casa-marino-obra.webp" alt="Casa Marino durante la construcción" fill sizes="100vw" />
            <div className="compare-after" style={{ clipPath: `inset(0 0 0 ${compare}%)` }}><Image src="/images/casa-marino-render.webp" alt="Visualización final de Casa Marino" fill sizes="100vw" /></div>
            <div className="compare-line" style={{ left: `${compare}%` }}><span>↔</span></div>
            <span className="compare-tag before">Obra</span><span className="compare-tag after">Proyecto</span>
            <input aria-label="Comparar obra y proyecto" type="range" min="8" max="92" value={compare} onChange={(event) => setCompare(Number(event.target.value))} />
          </div>
          <p className="compare-help">Deslizá para comparar <span aria-hidden="true">← →</span></p>
        </div>
      </section>

      <section className="method section-pad">
        <div className="section-label" data-reveal><span>04</span><p>Cómo trabajamos</p></div>
        <div className="method-grid">{['Consulta inicial', 'Relevamiento', 'Análisis', 'Documentación', 'Presentación y seguimiento'].map((item, index) => <article key={item} data-reveal><span>0{index + 1}</span><h3>{item}</h3><p>{index === 0 ? 'Ubicación, objetivo y estado conocido.' : index === 1 ? 'Medimos y reunimos los antecedentes.' : index === 2 ? 'Contrastamos situación real y normativa.' : index === 3 ? 'Producimos las piezas del alcance acordado.' : 'Organizamos el ingreso y respondemos observaciones incluidas.'}</p></article>)}</div>
      </section>

      <section className="about" id="estudio">
        <div className="about-image"><Image src="/images/casa-marino-seguimiento.webp" alt="Seguimiento profesional de Casa Marino en obra" fill sizes="(max-width: 800px) 100vw, 48vw" /></div>
        <div className="about-copy section-pad"><div className="section-label inverse" data-reveal><span>05</span><p>Conocé a Grafo</p></div><div data-reveal><h2>El estudio pone el proceso por delante de las promesas.</h2><p>Grafo está dirigido por Facundo Ojeda, Maestro Mayor de Obras con matrícula profesional T-54041. El trabajo combina proyecto, documentación y gestión con una idea simple: explicar con claridad qué se puede hacer, qué hace falta y cuál es el camino razonable.</p><div className="credentials"><div><strong>T-54041</strong><small>Matrícula profesional</small></div><div><strong>5</strong><small>Municipios de cobertura</small></div></div></div></div>
      </section>

      <section className="contact section-pad" id="contacto">
        <div className="section-label" data-reveal><span>06</span><p>Armá tu consulta</p></div>
        <div className="contact-head" data-reveal><h2>Unos datos.<br />Un primer diagnóstico.</h2><p>Cuatro pasos cortos para llegar a la conversación con la información que realmente importa.</p></div>
        <form className="wizard" onSubmit={sendBrief} data-reveal>
          <div className="wizard-top"><p>Paso {step + 1} de 4</p><div className="progress"><span style={{ width: `${(step + 1) * 25}%` }} /></div></div>
          <div className="wizard-body">
            {step === 0 && <fieldset><legend>¿En qué podemos ayudarte?</legend><div className="choice-grid">{['Planos municipales', 'Proyecto arquitectónico'].map((item) => <button className={service === item ? 'selected' : ''} type="button" key={item} onClick={() => { setService(item); setStep(1); }}>{item}<span>↗</span></button>)}</div></fieldset>}
            {step === 1 && <fieldset><legend>¿Cuál describe mejor tu situación?</legend><div className="choice-grid compact">{situations.map((item) => <button className={situation === item ? 'selected' : ''} type="button" key={item} onClick={() => { setSituation(item); setStep(2); }}>{item}</button>)}</div></fieldset>}
            {step === 2 && <fieldset><legend>¿Dónde está el proyecto o inmueble?</legend><div className="choice-grid compact">{[...municipalities, 'Otra localidad'].map((item) => <button className={zone === item ? 'selected' : ''} type="button" key={item} onClick={() => { setZone(item); setStep(3); }}>{item}</button>)}</div></fieldset>}
            {step === 3 && <fieldset><legend>Listo. Contanos quién sos.</legend><div className="fields"><label>Nombre completo<input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Tu nombre" /></label><label>Comentario opcional<textarea value={comments} onChange={(e) => setComments(e.target.value)} placeholder="Algo más que debamos saber" /></label></div><button className="button dark submit" type="submit">Enviar consulta por WhatsApp ↗</button></fieldset>}
          </div>
          <div className="wizard-footer">{step > 0 ? <button type="button" onClick={() => setStep(step - 1)}>← Anterior</button> : <span />}<p>También podés escribir a <a href="mailto:ojedaf.arq@gmail.com">ojedaf.arq@gmail.com</a></p></div>
        </form>
      </section>

      <footer>
        <a className="footer-logo" href="#inicio"><Image src="/images/grafo-logo.png" alt="Grafo Estudio" width={260} height={72} /></a>
        <div><p>Facundo Ojeda · M.M.O.</p><p>Matrícula profesional T-54041</p></div>
        <div><a href="mailto:ojedaf.arq@gmail.com">ojedaf.arq@gmail.com</a><a href="tel:+541132273109">+54 11 3227-3109</a><p>Benavidez, Tigre</p></div>
        <a href="#inicio">Volver arriba ↑</a>
        <div className="footer-bottom">
          <span>© Grafo Estudio · Todos los derechos reservados</span>
          <a className="windstudies-credit" href="https://windstudies.com" target="_blank" rel="noopener noreferrer">
            <span>Desarrollado por</span>
            <Image src="/images/windstudies.png" alt="WindStudies" width={432} height={66} />
          </a>
        </div>
      </footer>

      <div className="float-actions" aria-label="Contacto directo"><a className="float-ig" href="https://www.instagram.com/foarq_/" target="_blank" rel="noreferrer" aria-label="Instagram de Grafo">IG</a><a className="float-wa" href="https://wa.me/5491132273109?text=Hola%20Grafo%2C%20vi%20su%20web%20y%20quiero%20hacer%20una%20consulta." target="_blank" rel="noreferrer" aria-label="Escribir a Grafo por WhatsApp">WA</a></div>
    </main>
  );
}
