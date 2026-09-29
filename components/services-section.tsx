'use client';

import { useConsultation } from './consultation-context';

const services = [
  { tag: 'Gestión y regularización', title: 'Planos municipales', copy: 'Primero diagnosticamos. Después definimos qué trámite y documentación corresponden según el inmueble y el municipio.', items: ['Relevamiento y antecedentes', 'Análisis normativo', 'Expediente y seguimiento'], action: 'Evaluar mi propiedad ↗' },
  { tag: 'Diseño y documentación', title: 'Proyecto arquitectónico', copy: 'Convertimos necesidades, condicionantes del sitio y recursos disponibles en una propuesta definida y construible.', items: ['Programa y anteproyecto', 'Plantas, cortes y vistas', 'Definiciones y próximos pasos'], action: 'Contarnos el proyecto ↗' },
];

export function ServicesSection() {
  const { selectService } = useConsultation();
  return <section id="servicios"><div className="wrap reveal"><div className="eyebrow"><span className="num">01</span>Qué hacemos</div><div className="servicios-head"><h2>Servicios con un alcance<br/>claro desde el principio.</h2><p>Dos formas de ayudarte a avanzar con menos incertidumbre.</p></div><div className="servicios-grid">{services.map((service) => <article className="servicio-card" key={service.title}><div className="tag">{service.tag}</div><h3>{service.title}</h3><p>{service.copy}</p><ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul><a href="#contacto" className="go" onClick={() => selectService(service.title)}>{service.action}</a></article>)}</div></div></section>;
}
