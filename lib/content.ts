export const municipalities = ['Vicente López', 'San Isidro', 'Tigre', 'General San Martín', 'Escobar', 'San Fernando'];

export const situations = [
  'Construcción no declarada',
  'Venta o escritura',
  'Obra nueva o ampliación',
  'Final de obra',
  'Observaciones municipales',
  'No sé por dónde empezar',
];

export const projectCategories = ['ambientes', 'cocina', 'galeria', 'dormitorios', 'banos', 'exterior'] as const;
export type ProjectCategory = (typeof projectCategories)[number];
export type AnswerMap = Record<string, string>;

export const categoryLabels: Record<ProjectCategory, string> = {
  ambientes: 'Ambientes',
  cocina: 'Cocina',
  galeria: 'Galería',
  dormitorios: 'Dormitorios',
  banos: 'Baños',
  exterior: 'Exterior',
};

type QuestionGroup = { key: string; label: string; options: string[]; two?: boolean };

export const projectPanels: Record<ProjectCategory, { title: string; note?: string; groups: QuestionGroup[] }> = {
  ambientes: { title: 'Ambientes principales', note: 'Son varias preguntas: te van a ayudar a llegar con un anteproyecto mucho más preciso. Tomate tu tiempo.', groups: [
    { key: 'ambientes_estar', label: 'Estar / Comedor', options: ['Integrado', 'Separado'], two: true },
    { key: 'ambientes_cocina', label: 'Cocina', options: ['Integrado', 'Separado'], two: true },
    { key: 'ambientes_estudio', label: 'Estudio', options: ['Sí', 'No'], two: true },
  ] },
  cocina: { title: 'Cocina', groups: [
    { key: 'cocina_formato', label: 'Formato', options: ['Recta', 'En L', 'En U'] },
    { key: 'cocina_isla', label: 'Con isla', options: ['Sí', 'No'], two: true },
    { key: 'cocina_comedor', label: 'Comedor diario', options: ['Sí', 'No'], two: true },
  ] },
  galeria: { title: 'Galería', groups: [
    { key: 'galeria_estar', label: 'Estar exterior', options: ['Sí', 'No'], two: true },
    { key: 'galeria_isla', label: 'Isla', options: ['Sí', 'No'], two: true },
    { key: 'galeria_parrilla', label: 'Parrilla', options: ['Sí', 'No'], two: true },
  ] },
  dormitorios: { title: 'Dormitorios', groups: [
    { key: 'dorm_cantidad', label: 'Cantidad', options: ['1', '2', '3'] },
    { key: 'dorm_vestidor', label: 'Vestidor', options: ['0', '1', '2'] },
    { key: 'dorm_ensuite', label: 'En suite', options: ['0', '1', '2'] },
  ] },
  banos: { title: 'Baños', groups: [
    { key: 'banos_toilette', label: 'Toilette', options: ['0', '1', '2'] },
    { key: 'banos_bano', label: 'Baño', options: ['1', '2', '3'] },
    { key: 'banos_antebano', label: 'Antebaño', options: ['Sí', 'No'], two: true },
  ] },
  exterior: { title: 'Exterior', groups: [
    { key: 'ext_piscina', label: 'Piscina', options: ['Sí', 'No'], two: true },
    { key: 'ext_cochera', label: 'Cochera', options: ['Cubierta', 'Pérgola'], two: true },
    { key: 'ext_complementarios', label: 'Complementarios', options: ['Ninguno', 'Baño exterior', 'Depósito exterior'] },
  ] },
};

export const galleries = {
  ana: {
    title: 'Casa Ana · Rincón de Milberg, Tigre',
    images: [
      ...[7, 8, 9, 10].map((number) => ({ src: `/images/reference-${String(number).padStart(2, '0')}.webp`, tag: 'Render' })),
      ...[11, 12, 13, 14].map((number) => ({ src: `/images/reference-${String(number).padStart(2, '0')}.webp`, tag: 'Obra' })),
    ],
  },
  carmen: {
    title: 'Casa Carmen · Victoria, Gran Buenos Aires',
    images: [
      ...[15, 16].map((number) => ({ src: `/images/reference-${String(number).padStart(2, '0')}.webp`, tag: 'Render' })),
      ...[17, 18, 19, 20].map((number) => ({ src: `/images/reference-${String(number).padStart(2, '0')}.webp`, tag: 'Obra' })),
    ],
  },
};

export type GalleryKey = keyof typeof galleries;

export function summarizeCategory(category: ProjectCategory, answers: AnswerMap) {
  const plural = (value: string, singular: string, pluralWord = `${singular}s`) => `${value} ${value === '1' ? singular : pluralWord}`;
  const items: (string | false | undefined)[] = category === 'ambientes'
    ? [answers.ambientes_estar && `estar/comedor ${answers.ambientes_estar.toLowerCase()}`, answers.ambientes_cocina && `cocina ${answers.ambientes_cocina.toLowerCase()}`, answers.ambientes_estudio === 'Sí' && 'con estudio']
    : category === 'cocina'
      ? [answers.cocina_formato && `formato ${answers.cocina_formato.toLowerCase()}`, answers.cocina_isla === 'Sí' && 'con isla', answers.cocina_comedor === 'Sí' && 'comedor diario']
      : category === 'galeria'
        ? [answers.galeria_estar === 'Sí' && 'estar exterior', answers.galeria_isla === 'Sí' && 'isla', answers.galeria_parrilla === 'Sí' && 'parrilla']
        : category === 'dormitorios'
          ? [answers.dorm_cantidad && plural(answers.dorm_cantidad, 'dormitorio'), answers.dorm_vestidor !== '0' && answers.dorm_vestidor && plural(answers.dorm_vestidor, 'vestidor', 'vestidores'), answers.dorm_ensuite !== '0' && answers.dorm_ensuite && `${answers.dorm_ensuite} en suite`]
          : category === 'banos'
            ? [answers.banos_bano && plural(answers.banos_bano, 'baño'), answers.banos_toilette !== '0' && answers.banos_toilette && `${answers.banos_toilette} toilette`, answers.banos_antebano === 'Sí' && 'antebaño']
            : [answers.ext_piscina === 'Sí' && 'piscina', answers.ext_cochera && `cochera ${answers.ext_cochera.toLowerCase()}`, answers.ext_complementarios !== 'Ninguno' && answers.ext_complementarios?.toLowerCase()];

  return items.filter(Boolean).join(' · ');
}
