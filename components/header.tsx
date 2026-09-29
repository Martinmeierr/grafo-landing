'use client';

import { useState } from 'react';
import { Brand } from './brand';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return <header className={`site ${menuOpen ? 'open' : ''}`}><div className="nav-row"><a href="#inicio" aria-label="Grafo Estudio, inicio" onClick={closeMenu}><Brand/></a><nav className="main" aria-label="Navegación principal">{[['Servicios', '#servicios'], ['Proyectos', '#proyectos'], ['Estudio', '#estudio']].map(([label, href]) => <a key={href} href={href} onClick={closeMenu}>{label}</a>)}</nav><a href="#contacto" className="btn btn-dark">Trabajemos juntos</a><button className="burger" type="button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}><span/><span/><span/></button></div></header>;
}
