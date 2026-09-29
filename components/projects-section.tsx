'use client';

import Image from 'next/image';
import { useEffect, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { galleries, type GalleryKey } from '@/lib/content';

export function ProjectsSection() {
  const [compare, setCompare] = useState(50);
  const [galleryKey, setGalleryKey] = useState<GalleryKey | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const gallery = galleryKey ? galleries[galleryKey] : null;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!gallery) return;
      if (event.key === 'Escape') setGalleryKey(null);
      if (event.key === 'ArrowRight') setGalleryIndex((value) => (value + 1) % gallery.images.length);
      if (event.key === 'ArrowLeft') setGalleryIndex((value) => (value - 1 + gallery.images.length) % gallery.images.length);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [gallery]);

  const setCompareFromPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setCompare(Math.max(4, Math.min(96, ((event.clientX - rect.left) / rect.width) * 100)));
  };

  const openGallery = (key: GalleryKey) => {
    setGalleryKey(key);
    setGalleryIndex(0);
  };

  return <>
    <section id="proyectos"><div className="wrap reveal"><div className="proyecto-head"><div className="eyebrow"><span className="num">03</span>Proyecto seleccionado</div><h2>De la idea a la materia.</h2><p className="lead">Casa Marino · Benavidez, Tigre: proyecto, documentación técnica, cómputos y seguimiento de obra. Una misma lógica desde las primeras decisiones hasta la ejecución.</p></div><div className="compare" onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); setCompareFromPointer(event); }} onPointerMove={(event) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) setCompareFromPointer(event); }}><Image src="/images/reference-02.webp" alt="Casa Marino en obra" fill sizes="(max-width: 1240px) 100vw, 1176px"/><div className="after-wrap" style={{ width: `${compare}%` }}><Image src="/images/reference-03.webp" alt="Casa Marino, render del proyecto" fill sizes="(max-width: 1240px) 100vw, 1176px"/></div><div className="handle" style={{ left: `${compare}%` }}/><div className="knob" style={{ left: `${compare}%` }}><span/><span/></div><div className="label obra">Obra</div><div className="label render">Proyecto</div><input className="compare-range" type="range" min="4" max="96" value={compare} onChange={(event) => setCompare(Number(event.target.value))} aria-label="Comparar obra y proyecto"/></div><div className="compare-caption"><span className="hint">← Deslizá para comparar →</span><span className="hint muted">Casa Marino · Octubre 2025 / 2026</span></div><div className="otras-obras"><button type="button" className="obra-card" onClick={() => openGallery('ana')}><Image src="/images/reference-04.webp" alt="Casa Ana, Rincón de Milberg" fill sizes="(max-width: 700px) 100vw, 50vw"/><span className="ver-mas">Ver más ↗</span><span className="info"><b>Casa Ana</b><span>Rincón de Milberg, Tigre</span></span></button><button type="button" className="obra-card" onClick={() => openGallery('carmen')}><Image src="/images/reference-05.webp" alt="Casa Carmen, Victoria" fill sizes="(max-width: 700px) 100vw, 50vw"/><span className="ver-mas">Ver más ↗</span><span className="info"><b>Casa Carmen</b><span>Victoria, Gran Buenos Aires</span></span></button></div></div></section>
    {gallery && <div className="lightbox" role="dialog" aria-modal="true" aria-label={gallery.title} onClick={(event) => { if (event.target === event.currentTarget) setGalleryKey(null); }}><div className="lightbox-inner"><button type="button" className="lightbox-close" onClick={() => setGalleryKey(null)}>Cerrar ✕</button><div className="lightbox-frame"><span className="lightbox-tag">{gallery.images[galleryIndex].tag}</span><Image src={gallery.images[galleryIndex].src} alt={`${gallery.title} · ${gallery.images[galleryIndex].tag}`} fill sizes="(max-width: 920px) 100vw, 920px"/><button type="button" className="lightbox-nav prev" aria-label="Anterior" onClick={() => setGalleryIndex((value) => (value - 1 + gallery.images.length) % gallery.images.length)}>‹</button><button type="button" className="lightbox-nav next" aria-label="Siguiente" onClick={() => setGalleryIndex((value) => (value + 1) % gallery.images.length)}>›</button></div><div className="lightbox-meta"><b>{gallery.title}</b><span>{galleryIndex + 1} / {gallery.images.length}</span></div></div></div>}
  </>;
}
