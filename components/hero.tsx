import Image from 'next/image';
import { municipalities } from '@/lib/content';

export function Hero() {
  return <><section className="hero" id="inicio"><Image className="hero-bg" src="/images/reference-01.webp" alt="Relevamiento de obra de Grafo" fill priority sizes="100vw"/><div className="fade"/><div className="wrap content"><div className="eyebrow light">Arquitectura · Planos municipales · Zona Norte</div><h1>Claridad para proyectar.<br/>Criterio para avanzar.</h1><p className="lead">Ordenamos lo complejo para que cada decisión, de un plano municipal a una vivienda, tenga fundamento, dirección y un próximo paso claro.</p><div className="ctas"><a href="#contacto" className="btn btn-light">Evaluar mi caso</a><a href="#servicios" className="btn btn-ghost-light">Ver servicios ↓</a></div><div className="tagline">La arquitectura como una herramienta para decidir mejor.</div></div></section><div className="cobertura"><div className="wrap"><div className="mat">Matrícula profesional <span>T-54041</span></div><div className="sep"/><div className="chips">{municipalities.map((item) => <span className="chip" key={item}>{item}</span>)}</div></div></div></>;
}
