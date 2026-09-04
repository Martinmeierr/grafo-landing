import Image from 'next/image';

const steps = [
  { number: '01', title: 'Conversamos', text: 'Entendemos cómo vivís, qué necesitás y qué esperás sentir en cada espacio.' },
  { number: '02', title: 'Proyectamos', text: 'Traducimos esa escucha en decisiones claras: luz, recorridos, materialidad y paisaje.' },
  { number: '03', title: 'Acompañamos', text: 'Dirigimos cada etapa para que lo proyectado conserve su intención hasta el último detalle.' },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="FOARQ, inicio"><span className="brand-mark">F</span><span>FOARQ</span></a>
        <nav aria-label="Navegación principal">
          <a href="#estudio">Estudio</a><a href="#proyectos">Proyectos</a><a className="nav-cta" href="#contacto">Hablemos</a>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <Image className="hero-image" src="/images/obra-marino.jpg" alt="Vivienda de líneas horizontales en construcción, rodeada de árboles" fill priority sizes="100vw" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow">Arquitectura · Proyecto · Dirección</p>
          <h1>Espacios que nacen de escuchar.</h1>
          <p className="hero-intro">Diseñamos viviendas contemporáneas conectadas con la vida de quienes las habitan y con el paisaje que las rodea.</p>
          <a className="primary-button" href="#proyectos">Conocé nuestro trabajo <span aria-hidden="true">↘</span></a>
        </div>
        <p className="hero-caption">Obra Marino · Vivienda unifamiliar</p>
      </section>

      <section className="studio section-pad" id="estudio">
        <div className="section-kicker"><span>01</span><p>El estudio</p></div>
        <div className="studio-grid">
          <h2>La arquitectura empieza mucho antes del primer plano.</h2>
          <div className="studio-copy">
            <p className="lead">Empieza en una charla, en una rutina, en la manera en que entra el sol o se abre una casa al jardín.</p>
            <p>FOARQ es el estudio del arquitecto Facundo Ojeda. Proyectamos desde la escucha para crear espacios precisos, serenos y profundamente personales.</p>
            <div className="principles" aria-label="Principios del estudio"><span>Escucha</span><span>Claridad</span><span>Oficio</span></div>
          </div>
        </div>
      </section>

      <section className="projects section-pad" id="proyectos">
        <div className="section-heading"><div className="section-kicker light"><span>02</span><p>Proyectos seleccionados</p></div><p className="heading-note">Del concepto a la materia.</p></div>
        <article className="project-feature">
          <div className="feature-image"><Image src="/images/obra-marino-estructura.jpg" alt="Estructura de una vivienda en obra entre árboles" fill sizes="(max-width: 900px) 100vw, 70vw" /></div>
          <div className="project-meta"><div><p className="project-type">Vivienda unifamiliar · En ejecución</p><h3>Obra Marino</h3></div><span className="project-arrow" aria-hidden="true">↗</span></div>
        </article>
        <div className="project-pair">
          <article>
            <div className="pair-image portrait"><Image src="/images/obra-marino-losa.jpg" alt="Armadura de acero preparada para una losa" fill sizes="(max-width: 720px) 100vw, 50vw" /></div>
            <p className="project-type">Materia · Proceso</p><h3>Construir con precisión</h3>
          </article>
          <article className="plan-card">
            <div className="pair-image plan"><Image src="/images/plano-rosa-almada.jpg" alt="Planta arquitectónica de una vivienda organizada alrededor de patios" fill sizes="(max-width: 720px) 100vw, 50vw" /></div>
            <p className="project-type">Vivienda familiar · Estudio</p><h3>Proyecto Rosa Almada</h3>
          </article>
        </div>
      </section>

      <section className="process section-pad" id="proceso">
        <div className="section-kicker"><span>03</span><p>Cómo trabajamos</p></div>
        <div className="process-intro"><h2>Un proceso claro.<br />Un resultado propio.</h2><p>Cada proyecto es una conversación sostenida entre la necesidad, el lugar y la forma de construir.</p></div>
        <div className="steps">{steps.map((step) => <article key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
      </section>

      <section className="manifesto">
        <Image src="/images/obra-marino-frente.jpg" alt="Frente de hormigón de una vivienda en obra" fill sizes="100vw" />
        <div className="manifesto-overlay" />
        <blockquote>“No diseñamos una casa para mirar. Diseñamos una forma de habitar.”</blockquote>
      </section>

      <section className="contact section-pad" id="contacto">
        <div className="section-kicker"><span>04</span><p>Contacto</p></div>
        <div className="contact-grid"><div><p className="contact-label">¿Tenés un proyecto en mente?</p><h2>Hagámosle<br />lugar.</h2></div><div className="contact-side"><p>Conversemos sobre tu terreno, tus ideas y la manera en que querés vivir.</p><div className="architect"><span>FO</span><div><strong>Facundo Ojeda</strong><small>Arquitecto · FOARQ</small></div></div></div></div>
      </section>

      <footer><a className="brand footer-brand" href="#inicio"><span className="brand-mark">F</span><span>FOARQ</span></a><p>Arquitectura · Proyecto · Dirección de obra</p><a href="#inicio">Volver arriba ↑</a></footer>
    </main>
  );
}
