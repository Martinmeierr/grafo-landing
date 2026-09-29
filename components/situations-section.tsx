import { situations } from '@/lib/content';

const situationCopy: Record<string, string> = {
  'Construcción no declarada': 'Lo construido no coincide con los planos disponibles.',
  'Venta o escritura': 'La documentación condiciona una operación o escritura.',
  'Obra nueva o ampliación': 'Necesitás verificar indicadores antes de construir.',
  'Final de obra': 'La obra terminó y falta cerrar el expediente.',
  'Observaciones municipales': 'Hay que ordenar una respuesta técnica y documental.',
  'No sé por dónde empezar': 'Revisamos antecedentes y te ayudamos a ordenar la situación.',
};

export function SituationsSection() {
  return <section className="cuando"><div className="wrap reveal"><div className="eyebrow light">Cuándo consultar</div><h2>Tal vez tu caso empieza acá.</h2><p className="section-lead">No hace falta conocer el nombre del trámite. Con una descripción honesta de la situación podemos orientarte.</p><div className="situaciones">{situations.map((title) => <article className="situacion" key={title}><h3>{title}</h3><p>{situationCopy[title]}</p></article>)}</div></div></section>;
}
