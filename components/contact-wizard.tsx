'use client';

import { useMemo, useState, type Dispatch, type SetStateAction } from 'react';
import { categoryLabels, municipalities, projectCategories, projectPanels, situations, summarizeCategory, type AnswerMap, type ProjectCategory } from '@/lib/content';
import { useConsultation } from './consultation-context';

export function ContactWizard() {
  const { answers, setAnswers, stepIndex, setStepIndex } = useConsultation();
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const flow = useMemo(() => answers.servicio === 'Proyecto arquitectónico' ? ['servicio', ...projectCategories, 'municipio', 'datos'] : ['servicio', 'situacion', 'municipio', 'datos'], [answers.servicio]);
  const stepKey = flow[stepIndex] ?? 'servicio';
  const activeProjectIndex = projectCategories.indexOf(stepKey as ProjectCategory);

  const selectSingle = (key: string, value: string) => {
    setAnswers((current) => ({ ...current, [key]: value }));
    setStepIndex(key === 'servicio' ? 1 : Math.min(stepIndex + 1, flow.length - 1));
  };

  const sendBrief = () => {
    if (name.trim().length < 2) return;
    let message = `Hola Grafo, mi nombre es ${name.trim()}. `;
    if (answers.servicio === 'Proyecto arquitectónico') {
      message += `Quiero armar un proyecto arquitectónico en ${answers.municipio || 'una zona a confirmar'}. `;
      projectCategories.forEach((category) => {
        const summary = summarizeCategory(category, answers);
        if (summary) message += `${categoryLabels[category]}: ${summary}. `;
      });
    } else {
      message += `Consulto por: ${answers.servicio || 'un caso'}. Situación: ${answers.situacion || 'a definir'}. Zona: ${answers.municipio || 'a confirmar'}.`;
    }
    if (comment.trim()) message += ` Comentario: ${comment.trim()}`;
    window.open(`https://wa.me/5491132273109?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return <section id="contacto"><div className="wrap reveal"><div className="wizard-wrap"><div className="wizard-head"><div className="eyebrow"><span className="num">06</span>Armá tu consulta</div><h2>Unos datos. Un primer diagnóstico.</h2><p>Cuatro pasos cortos para llegar a la conversación con la información que realmente importa.</p></div>{answers.servicio === 'Proyecto arquitectónico' && <ProjectGraph activeIndex={activeProjectIndex} answers={answers}/>}<form className="wizard" onSubmit={(event) => { event.preventDefault(); sendBrief(); }}><div className="wizard-progress"><span className="step-label">Paso {stepIndex + 1} de {flow.length}</span><div className="bar"><i style={{ width: `${((stepIndex + 1) / flow.length) * 100}%` }}/></div></div><div className="wizard-body"><WizardPanel stepKey={stepKey} answers={answers} setAnswers={setAnswers} selectSingle={selectSingle} name={name} setName={setName} comment={comment} setComment={setComment} onContinue={() => setStepIndex((value) => value + 1)}/></div><div className="wizard-foot"><button type="button" className="link-back" disabled={stepIndex === 0} onClick={() => setStepIndex((value) => Math.max(0, value - 1))}>← Anterior</button><span className="escribir">También podés escribir a <a href="mailto:ojedaf.arq@gmail.com">ojedaf.arq@gmail.com</a></span></div></form></div></div></section>;
}

function ProjectGraph({ activeIndex, answers }: { activeIndex: number; answers: AnswerMap }) {
  return <div className="proyecto-graph"><svg viewBox="0 0 640 96" aria-hidden="true">{[0, 1, 2, 3, 4].map((index) => <line key={index} className={`edge ${activeIndex === -1 || index < activeIndex ? 'done' : ''}`} x1={50 + index * 108} y1="40" x2={158 + index * 108} y2="40"/>)}{projectCategories.map((category, index) => { const done = activeIndex === -1 || index < activeIndex; const active = index === activeIndex; return <g key={category} className={`node ${done ? 'done' : ''} ${active ? 'active' : ''}`}><circle cx={50 + index * 108} cy="40" r="19"/><text className="node-num" x={50 + index * 108} y="41">{index + 1}</text><text className="node-label" x={50 + index * 108} y="76">{categoryLabels[category]}</text></g>; })}</svg><div className="graph-tags">{projectCategories.slice(0, activeIndex === -1 ? 6 : Math.max(activeIndex, 0)).map((category) => <span className={`tag ${summarizeCategory(category, answers) ? '' : 'tag-empty'}`} key={category}><b>{categoryLabels[category]}:</b> {summarizeCategory(category, answers) || 'ninguno'}</span>)}</div></div>;
}

type PanelProps = {
  stepKey: string;
  answers: AnswerMap;
  setAnswers: Dispatch<SetStateAction<AnswerMap>>;
  selectSingle: (key: string, value: string) => void;
  name: string;
  setName: (value: string) => void;
  comment: string;
  setComment: (value: string) => void;
  onContinue: () => void;
};

function WizardPanel({ stepKey, answers, setAnswers, selectSingle, name, setName, comment, setComment, onContinue }: PanelProps) {
  if (stepKey === 'servicio') return <div className="panel"><h3 className="q">¿En qué podemos ayudarte?</h3><div className="opciones opciones-2">{['Planos municipales', 'Proyecto arquitectónico'].map((value) => <Option key={value} value={value} selected={answers.servicio === value} onClick={() => selectSingle('servicio', value)}/>)}</div></div>;
  if (stepKey === 'situacion') return <div className="panel"><h3 className="q">¿Cuál describe mejor tu situación?</h3><div className="opciones">{situations.map((value) => <Option key={value} value={value} selected={answers.situacion === value} onClick={() => selectSingle('situacion', value)}/>)}</div></div>;
  if (projectCategories.includes(stepKey as ProjectCategory)) {
    const category = stepKey as ProjectCategory;
    const panel = projectPanels[category];
    const complete = panel.groups.every((group) => answers[group.key]);
    return <div className="panel"><h3 className="q">{panel.title}</h3>{panel.note && <p className="panel-note">{panel.note}</p>}{panel.groups.map((group) => <div className="subq" key={group.key}><p className="sublabel">{group.label}</p><div className={`opciones compact ${group.two ? 'opciones-2' : ''}`}>{group.options.map((value) => <Option key={value} value={value} selected={answers[group.key] === value} onClick={() => setAnswers((current) => ({ ...current, [group.key]: value }))}/>)}</div></div>)}<button type="button" className="btn btn-dark continue-btn" disabled={!complete} onClick={onContinue}>Continuar →</button></div>;
  }
  if (stepKey === 'municipio') return <div className="panel"><h3 className="q">¿Dónde está el proyecto o inmueble?</h3><div className="opciones">{municipalities.map((value) => <Option key={value} value={value} selected={answers.municipio === value} onClick={() => selectSingle('municipio', value)}/>)}</div></div>;
  return <div className="panel"><h3 className="q">Listo. Contanos quién sos.</h3><Summary answers={answers}/><div className="campos-grid"><label className="campo">Nombre completo<input value={name} onChange={(event) => setName(event.target.value)} placeholder="Tu nombre" required/></label><label className="campo">Comentario opcional<textarea value={comment} onChange={(event) => setComment(event.target.value)} rows={2} placeholder="Algo más que debamos saber"/></label></div><button type="submit" className="btn btn-dark send-wa" disabled={name.trim().length < 2}>Enviar consulta por WhatsApp ↗</button></div>;
}

function Option({ value, selected, onClick }: { value: string; selected: boolean; onClick: () => void }) {
  return <button type="button" className={`opt ${selected ? 'selected' : ''}`} onClick={onClick}>{value}</button>;
}

function Summary({ answers }: { answers: AnswerMap }) {
  const projectSummary = projectCategories.map((category) => summarizeCategory(category, answers)).filter(Boolean);
  return <div className="resumen">{answers.servicio === 'Proyecto arquitectónico' ? <>Proyecto arquitectónico en <b>{answers.municipio || 'zona a confirmar'}</b>.{projectSummary.length > 0 && <><br/>{projectSummary.join(' · ')}</>}</> : <>Consulta: <b>{answers.servicio || 'a confirmar'}</b> · Situación: <b>{answers.situacion || 'a confirmar'}</b> · Zona: <b>{answers.municipio || 'a confirmar'}</b></>}</div>;
}
