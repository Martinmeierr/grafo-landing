const steps = [
  ['01', 'Consulta inicial', 'Ubicación, objetivo y estado conocido de la propiedad o el proyecto.'],
  ['02', 'Relevamiento', 'Medimos y reunimos los antecedentes disponibles.'],
  ['03', 'Análisis', 'Contrastamos la situación real con la normativa o el programa.'],
  ['04', 'Documentación', 'Producimos las piezas del alcance acordado.'],
  ['05', 'Presentación y seguimiento', 'Organizamos el ingreso y respondemos observaciones incluidas.'],
];

export function ProcessSection() {
  return <section className="proceso"><div className="wrap reveal"><div className="eyebrow"><span className="num">04</span>Cómo trabajamos</div><h2>Una secuencia clara, de punta a punta.</h2><div className="pasos">{steps.map(([number, title, copy]) => <article className="paso" key={number}><span className="n">{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>;
}
