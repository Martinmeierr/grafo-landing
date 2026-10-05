/* ---------- burbuja de bienvenida de WhatsApp ----------
   Aparece a los 3 segundos de entrar y se puede cerrar.
   NOTA PARA HOSTINGER: si se quiere que quede cerrada para siempre en ese navegador,
   agregar localStorage en waCerrar (acá no se usa para que el preview funcione bien). */
(function(){
  const burbuja = document.getElementById('waBurbuja');
  const cerrar = document.getElementById('waCerrar');
  if(!burbuja) return;
  let cerrada = false;
  /* En celular no tapa el hero: aparece recién cuando la persona baja más allá del primer bloque. */
  const esCelular = window.matchMedia('(max-width:560px)').matches;
  function mostrar(){ if(!cerrada) burbuja.hidden = false; }
  if(esCelular){
    const hero = document.getElementById('inicio');
    const alBajar = () => {
      if(window.scrollY > (hero ? hero.offsetHeight : 600)){ setTimeout(mostrar, 1200); window.removeEventListener('scroll', alBajar); }
    };
    window.addEventListener('scroll', alBajar, { passive:true });
  } else {
    setTimeout(mostrar, 3000);
  }
  cerrar.addEventListener('click', () => { cerrada = true; burbuja.hidden = true; });

  /* si ya llegó al formulario, la burbuja se corre sola para no tapar */
  const contacto = document.getElementById('contacto');
  if(contacto && 'IntersectionObserver' in window){
    new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if(e.isIntersecting){ cerrada = true; burbuja.hidden = true; }
      });
    }, { threshold: .15 }).observe(contacto);
  }
})();

/* ---------- header mobile toggle ---------- */
const header = document.getElementById('siteHeader');
document.getElementById('burgerBtn').addEventListener('click', () => header.classList.toggle('open'));
document.querySelectorAll('nav.main a').forEach(a => a.addEventListener('click', () => header.classList.remove('open')));

/* ---------- scroll reveal ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => { el.classList.add('pre'); io.observe(el); });

/* ---------- carruseles de tarjetas en celular ----------
   En desktop las grillas siguen siendo grillas y esta navegación queda oculta por CSS. */
document.querySelectorAll('[data-swipe]').forEach(grid => {
  const nav = document.querySelector('[data-swipe-nav="' + grid.dataset.swipe + '"]');
  if(!nav) return;
  const prev = nav.querySelector('[data-swipe-prev]');
  const next = nav.querySelector('[data-swipe-next]');
  const cuenta = nav.querySelector('.swipe-count');
  const total = grid.children.length;

  function paso(){
    const primera = grid.children[0];
    if(!primera) return grid.clientWidth;
    const gap = parseFloat(getComputedStyle(grid).columnGap || getComputedStyle(grid).gap || 0) || 0;
    return primera.getBoundingClientRect().width + gap;
  }
  function actualizar(){
    const i = Math.round(grid.scrollLeft / paso());
    if(cuenta) cuenta.textContent = Math.min(i + 1, total) + ' / ' + total;
    if(prev) prev.disabled = grid.scrollLeft <= 2;
    if(next) next.disabled = grid.scrollLeft >= grid.scrollWidth - grid.clientWidth - 2;
  }
  if(prev) prev.addEventListener('click', () => grid.scrollBy({ left: -paso(), behavior: 'smooth' }));
  if(next) next.addEventListener('click', () => grid.scrollBy({ left: paso(), behavior: 'smooth' }));
  grid.addEventListener('scroll', actualizar);
  window.addEventListener('resize', actualizar);
  actualizar();
});

/* ---------- pestañas de "cuándo consultar" ---------- */
document.querySelectorAll('.pestana').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    document.querySelectorAll('.pestana').forEach(b => b.classList.toggle('activa', b === btn));
    document.querySelectorAll('[data-panel-tab]').forEach(p => { p.hidden = p.dataset.panelTab !== tab; });
  });
});

/* ---------- sliders deslizables (perfil y fotos) ---------- */
document.querySelectorAll('.slider').forEach(sl => {
  const track = sl.querySelector('.slider-track');
  const counter = sl.querySelector('.slider-count');
  const prevBtn = sl.querySelector('[data-slider-prev]');
  const nextBtn = sl.querySelector('[data-slider-next]');
  const total = track.children.length;

  function paso(){
    const primero = track.children[0];
    if(!primero) return track.clientWidth;
    const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || 0) || 0;
    return primero.getBoundingClientRect().width + gap;
  }
  function indice(){ return Math.round(track.scrollLeft / paso()); }
  function actualizar(){
    if(counter) counter.textContent = Math.min(indice() + 1, total) + ' / ' + total;
    if(prevBtn) prevBtn.disabled = track.scrollLeft <= 2;
    if(nextBtn) nextBtn.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
  }
  /* Las fotos pasan solas cada X segundos (data-auto).
     Si la persona interactúa, se frena un rato y después sigue sola. Nunca se apaga del todo. */
  let hover = false, pausadoHasta = 0;
  function pausarUnRato(ms){ pausadoHasta = Date.now() + (ms || 6000); }

  if(prevBtn) prevBtn.addEventListener('click', () => { pausarUnRato(); track.scrollBy({ left: -paso(), behavior: 'smooth' }); });
  if(nextBtn) nextBtn.addEventListener('click', () => { pausarUnRato(); track.scrollBy({ left: paso(), behavior: 'smooth' }); });
  track.addEventListener('scroll', actualizar);
  window.addEventListener('resize', actualizar);

  const cada = parseInt(sl.dataset.auto || '0', 10);
  if(cada > 0){
    sl.addEventListener('mouseenter', () => { hover = true; });
    sl.addEventListener('mouseleave', () => { hover = false; });
    sl.addEventListener('touchstart', () => pausarUnRato(), { passive: true });

    setInterval(() => {
      if(hover || Date.now() < pausadoHasta) return;
      if(track.scrollLeft >= track.scrollWidth - track.clientWidth - 2){
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: paso(), behavior: 'smooth' });
      }
    }, cada);
  }

  actualizar();
});

/* ---------- galería de "otras obras" (lightbox) ---------- */
(function(){
  const GALLERIES = {
    marino: {
      title: 'Casa Marino · Benavidez, Tigre',
      images: [
        { src: '/images/landing/landing-d7bc8ab19282.jpg', tag: 'Proyecto' },
        { src: '/images/landing/landing-af1c7bd653b2.jpg', tag: 'Proyecto' },
        { src: '/images/landing/landing-28859fdf9d4d.jpg', tag: 'Interior' },
        { src: '/images/landing/landing-1cb1063fb616.jpg', tag: 'Interior' },
        { src: '/images/landing/landing-eab6fb2fc662.jpg', tag: 'Interior' },
        { src: '/images/landing/landing-3dab11d01cbf.jpg', tag: 'Interior' },
        { src: '/images/landing/landing-6d4c4ad4d6d0.jpg', tag: 'Obra' },
        { src: '/images/landing/landing-a0a77e4b9ae7.jpg', tag: 'Obra' },
        { src: '/images/landing/landing-e338f843b3f9.jpg', tag: 'Obra' },
        { src: '/images/landing/landing-505adc7a9018.jpg', tag: 'Obra' }
      ]
    },
    zarate: {
      title: 'Monoambiente en Zárate · Propuesta 2018',
      images: [
        { src: '/images/landing/landing-b055670d872a.jpg', tag: 'Propuesta' },
        { src: '/images/landing/landing-6c9e4b59262d.jpg', tag: 'Propuesta' },
        { src: '/images/landing/landing-175f4dad5d55.jpg', tag: 'Propuesta' }
      ]
    },
    prensa: {
      title: 'Diario Clarín · Suplemento ARQ · 4 de octubre de 2022',
      images: [
        { src: '/images/landing/landing-909e9b3f418f.jpg', tag: 'Tapa ARQ', contain: true },
        { src: '/images/landing/landing-f5c552168b55.jpg', tag: 'Autores', contain: true },
        { src: '/images/landing/landing-6874473067aa.jpg', tag: 'El proyecto', contain: true },
        { src: '/images/landing/landing-4b54b11cbbcc.jpg', tag: 'El proyecto', contain: true }
      ]
    },
    ana: {
      title: 'Casa Ana · Rincón de Milberg, Tigre',
      images: [
        { src: '/images/landing/landing-5bb96d19292a.jpg', tag: 'Render' },
        { src: '/images/landing/landing-f4ea21defb8b.jpg', tag: 'Render' },
        { src: '/images/landing/landing-d30052766872.jpg', tag: 'Render' },
        { src: '/images/landing/landing-0a1c8132be91.jpg', tag: 'Render' },
        { src: '/images/landing/landing-7b2e36bb7ce2.jpg', tag: 'Obra' },
        { src: '/images/landing/landing-fe36c5cb3e65.jpg', tag: 'Obra' },
        { src: '/images/landing/landing-73c41bec2791.jpg', tag: 'Obra' },
        { src: '/images/landing/landing-8f4c26e806cb.jpg', tag: 'Obra' }
      ]
    },
    carmen: {
      title: 'Casa Carmen · Victoria, Gran Buenos Aires',
      images: [
        { src: '/images/landing/landing-1d1337bccdc2.jpg', tag: 'Render' },
        { src: '/images/landing/landing-7101f7be6430.jpg', tag: 'Render' },
        { src: '/images/landing/landing-ed6365c9a952.jpg', tag: 'Obra' },
        { src: '/images/landing/landing-caff5436c5dc.jpg', tag: 'Obra' },
        { src: '/images/landing/landing-220721029f03.jpg', tag: 'Obra' },
        { src: '/images/landing/landing-7b367e1d3184.jpg', tag: 'Obra' }
      ]
    }
  };

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTag = document.getElementById('lightboxTag');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCount = document.getElementById('lightboxCount');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  let current = null;
  let index = 0;

  function render(){
    const gallery = GALLERIES[current];
    const item = gallery.images[index];
    lightboxImg.src = item.src;
    lightboxImg.alt = gallery.title + ' · ' + item.tag;
    lightboxImg.style.objectFit = item.contain ? 'contain' : 'cover';
    lightboxTag.textContent = item.tag;
    lightboxTitle.textContent = gallery.title;
    lightboxCount.textContent = (index + 1) + ' / ' + gallery.images.length;
  }

  function open(key){
    current = key;
    index = 0;
    render();
    lightbox.hidden = false;
  }

  function close(){ lightbox.hidden = true; }

  function next(){ const g = GALLERIES[current]; index = (index + 1) % g.images.length; render(); }
  function prev(){ const g = GALLERIES[current]; index = (index - 1 + g.images.length) % g.images.length; render(); }

  document.querySelectorAll('[data-gallery]').forEach(btn => {
    btn.addEventListener('click', () => open(btn.dataset.gallery));
  });

  closeBtn.addEventListener('click', close);
  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);
  lightbox.addEventListener('click', (e) => { if(e.target === lightbox) close(); });
  document.addEventListener('keydown', (e) => {
    if(lightbox.hidden) return;
    if(e.key === 'Escape') close();
    if(e.key === 'ArrowRight') next();
    if(e.key === 'ArrowLeft') prev();
  });

  /* deslizar con el dedo o arrastrando el mouse */
  const frame = lightbox.querySelector('.lightbox-frame');
  let startX = null;
  frame.addEventListener('pointerdown', (e) => { startX = e.clientX; });
  frame.addEventListener('dragstart', (e) => e.preventDefault());
  frame.addEventListener('pointerup', (e) => {
    if(startX === null) return;
    const dx = e.clientX - startX;
    startX = null;
    if(Math.abs(dx) < 40) return;
    if(dx < 0) next(); else prev();
  });
  frame.addEventListener('pointercancel', () => { startX = null; });
})();

/* ---------- wizard ---------- */
(function(){
  const FLOWS = {
    'Planos municipales': ['servicio','situacion','municipio','datos'],
    'Proyecto arquitectónico': ['servicio','ambientes','cocina','galeria','dormitorios','banos','exterior','municipio','datos'],
    'Reforma o ampliación': ['servicio','reforma','municipio','datos']
  };
  const CATS = ['ambientes','cocina','galeria','dormitorios','banos','exterior'];
  const CAT_LABELS = { ambientes:'Ambientes', cocina:'Cocina', galeria:'Galería', dormitorios:'Dormitorios', banos:'Baños', exterior:'Exterior' };

  const answers = {
    servicio:null, situacion:null, municipio:null,
    ambientes_estar:null, ambientes_cocina:null, ambientes_estudio:null,
    cocina_formato:null, cocina_isla:null, cocina_comedor:null,
    galeria_estar:null, galeria_isla:null, galeria_parrilla:null,
    dorm_cantidad:null, dorm_vestidor:null, dorm_ensuite:null,
    banos_toilette:null, banos_bano:null, banos_antebano:null,
    ext_piscina:null, ext_cochera:null, ext_complementarios:null,
    reforma_ambientes:[], reforma_detalle:null
  };

  let flow = FLOWS['Planos municipales'];
  let stepIndex = 0;

  const progressBar = document.getElementById('progressBar');
  const backBtn = document.getElementById('backBtn');
  const panels = {};
  ['servicio','situacion','reforma','municipio','ambientes','cocina','galeria','dormitorios','banos','exterior','datos'].forEach(k => {
    panels[k] = document.getElementById('panel-' + k);
  });
  const resumen = document.getElementById('resumen');
  const sendWa = document.getElementById('sendWa');
  const nombreInput = document.getElementById('nombre');
  const comentarioInput = document.getElementById('comentario');
  const proyectoGraph = document.getElementById('proyectoGraph');
  const graphTags = document.getElementById('graphTags');

  function currentKey(){ return flow[stepIndex]; }

  function esProyecto(){ return answers.servicio === 'Proyecto arquitectónico'; }
  function esReforma(){ return answers.servicio === 'Reforma o ampliación'; }

  function summarizeCat(cat){
    switch(cat){
      case 'ambientes':
        return [
          answers.ambientes_estar && ('estar/comedor ' + answers.ambientes_estar.toLowerCase()),
          answers.ambientes_cocina && ('cocina ' + answers.ambientes_cocina.toLowerCase()),
          answers.ambientes_estudio === 'Sí' && 'con estudio'
        ].filter(Boolean).join(' · ');
      case 'cocina':
        return [
          answers.cocina_formato && ('formato ' + answers.cocina_formato.replace('En ', 'en ')),
          answers.cocina_isla === 'Sí' && 'con isla',
          answers.cocina_comedor === 'Sí' && 'comedor diario'
        ].filter(Boolean).join(' · ');
      case 'galeria':
        return [
          answers.galeria_estar === 'Sí' && 'estar exterior',
          answers.galeria_isla === 'Sí' && 'isla',
          answers.galeria_parrilla === 'Sí' && 'parrilla'
        ].filter(Boolean).join(' · ');
      case 'dormitorios':
        return [
          answers.dorm_cantidad && (answers.dorm_cantidad + ' dormitorio' + (answers.dorm_cantidad === '1' ? '' : 's')),
          answers.dorm_vestidor && answers.dorm_vestidor !== '0' && (answers.dorm_vestidor + ' vestidor' + (answers.dorm_vestidor === '1' ? '' : 'es')),
          answers.dorm_ensuite && answers.dorm_ensuite !== '0' && (answers.dorm_ensuite + ' en suite')
        ].filter(Boolean).join(' · ');
      case 'banos':
        return [
          answers.banos_bano && (answers.banos_bano + ' baño' + (answers.banos_bano === '1' ? '' : 's')),
          answers.banos_toilette && answers.banos_toilette !== '0' && (answers.banos_toilette + ' toilette'),
          answers.banos_antebano === 'Sí' && 'antebaño'
        ].filter(Boolean).join(' · ');
      case 'exterior':
        return [
          answers.ext_piscina === 'Sí' && 'piscina',
          answers.ext_cochera && ('cochera ' + answers.ext_cochera.toLowerCase()),
          answers.ext_complementarios && answers.ext_complementarios !== 'Ninguno' && answers.ext_complementarios.toLowerCase()
        ].filter(Boolean).join(' · ');
      default:
        return '';
    }
  }

  function updateGraph(){
    if(!proyectoGraph) return;
    if(!esProyecto()){ proyectoGraph.hidden = true; return; }
    proyectoGraph.hidden = false;
    const key = currentKey();
    let tagsHtml = '';
    CATS.forEach((cat, i) => {
      const nodeEl = proyectoGraph.querySelector('[data-node="' + cat + '"]');
      const edgeEl = proyectoGraph.querySelector('[data-edge="e' + i + '"]');
      /* una categoría está completada solo si ya la pasamos en el flujo actual */
      const catIdx = flow.indexOf(cat);
      const isDone = catIdx !== -1 && catIdx < stepIndex;
      const isActive = cat === key;
      if(nodeEl){ nodeEl.classList.toggle('done', isDone); nodeEl.classList.toggle('active', isActive); }
      if(edgeEl){ edgeEl.classList.toggle('done', isDone); }
      if(isDone){
        const summary = summarizeCat(cat);
        tagsHtml += '<span class="tag' + (summary ? '' : ' tag-empty') + '"><b>' + CAT_LABELS[cat] + ':</b> ' + (summary || 'sin datos') + '</span>';
      }
    });
    graphTags.innerHTML = tagsHtml;
  }

  function fila(label, value, destacada){
    return '<div class="resumen-row' + (destacada ? ' destacada' : '') + '">' +
      '<span class="k">' + label + '</span><span class="v">' + value + '</span></div>';
  }

  function buildResumenHtml(){
    if(esProyecto()){
      let html = fila('Servicio', answers.servicio, true);
      html += fila('Zona', answers.municipio || 'a confirmar', true);
      CATS.forEach(cat => {
        const s = summarizeCat(cat);
        if(s) html += fila(CAT_LABELS[cat], s);
      });
      return html;
    }
    if(esReforma()){
      let html = fila('Servicio', 'Reforma o ampliación', true);
      html += fila('Zona', answers.municipio || 'a confirmar', true);
      html += fila('Ambientes a reformar', (answers.reforma_ambientes || []).join(' · ') || 'a definir');
      if(answers.reforma_detalle) html += fila('Detalle', answers.reforma_detalle);
      return html;
    }
    return fila('Servicio', answers.servicio || 'a confirmar', true) +
      fila('Situación', answers.situacion || 'a confirmar') +
      fila('Zona', answers.municipio || 'a confirmar');
  }

  function showStep(){
    const key = currentKey();
    Object.values(panels).forEach(p => { if(p) p.hidden = true; });
    if(panels[key]) panels[key].hidden = false;
    progressBar.style.width = ((stepIndex + 1) / flow.length * 100) + '%';
    backBtn.disabled = stepIndex === 0;
    if(key === 'datos'){
      resumen.innerHTML = buildResumenHtml();
      pintarRecordatorio();
    }
    updateGraph();
  }

  /* Qué conviene tener a mano. Los marcados como "minimo" son los que deberían estar sí o sí.
     Fuente: lista de requerimientos mínimos de Facundo. */
  const REQUISITOS = {
    'Planos municipales': [
      { titulo: 'Asesoramiento y gestión', items: [
        { t: 'Fotos significativas', minimo: true },
        { t: 'Esquemas de lo que hay' }
      ]},
      { titulo: 'Para los planos', items: [
        { t: 'Datos del propietario', minimo: true },
        { t: 'Planos de antecedentes (arquitectura, civil e instalaciones)', minimo: true },
        { t: 'Uso del inmueble', minimo: true },
        { t: 'Imágenes significativas' },
        { t: 'Croquis de anteproyecto' },
        { t: 'Distrito' },
        { t: 'Volumetría y espacialidad' }
      ]}
    ],
    'Proyecto arquitectónico': [
      { titulo: 'Del terreno o la casa', items: [
        { t: 'Fotos significativas', minimo: true },
        { t: 'Datos del propietario', minimo: true },
        { t: 'Uso previsto', minimo: true },
        { t: 'Medidas o esquemas aproximados' }
      ]},
      { titulo: 'Si ya existe algo dibujado', items: [
        { t: 'Planos de antecedentes (arquitectura, civil e instalaciones)', minimo: true },
        { t: 'Croquis de anteproyecto' },
        { t: 'Distrito' },
        { t: 'Volumetría y espacialidad' },
        { t: 'Referencias o imágenes que te gusten' }
      ]}
    ]
  };
  REQUISITOS['Reforma o ampliación'] = REQUISITOS['Proyecto arquitectónico'];

  function pintarRecordatorio(){
    const lista = document.getElementById('recLista');
    if(!lista) return;
    const bloques = REQUISITOS[answers.servicio] || REQUISITOS['Planos municipales'];
    const minimos = [];
    bloques.forEach(b => b.items.forEach(i => { if(i.minimo) minimos.push(i.t); }));
    lista.innerHTML = minimos.map(i => '<li>' + i + '</li>').join('');
  }


  function goNext(){ if(stepIndex < flow.length - 1){ stepIndex++; showStep(); } }
  function goBack(){ if(stepIndex > 0){ stepIndex--; showStep(); } }

  /* limpia las respuestas que no pertenecen a la rama elegida */
  function resetRama(servicio){
    const camposProyecto = Object.keys(answers).filter(k => k !== 'servicio' && k !== 'municipio' && k !== 'situacion');
    let aLimpiar;
    if(servicio === 'Proyecto arquitectónico'){ aLimpiar = ['situacion', 'reforma_ambientes']; }
    else if(servicio === 'Reforma o ampliación'){ aLimpiar = ['situacion'].concat(camposProyecto.filter(k => k !== 'reforma_ambientes')); }
    else { aLimpiar = camposProyecto; }
    aLimpiar.forEach(k => { answers[k] = Array.isArray(answers[k]) ? [] : null; });
    aLimpiar.forEach(k => {
      const groupEl = document.querySelector('[data-group="' + k + '"], [data-multi-select="' + k + '"]');
      if(groupEl) groupEl.querySelectorAll('.opt').forEach(o => o.classList.remove('selected'));
    });
    chequearReforma();
    document.querySelectorAll('.continue-btn').forEach(b => { checkContinue(b.dataset.panel); });
  }

  /* grupos de selección única con avance automático (servicio, situación, municipio) */
  function selectSingle(group, btn){
    const groupEl = btn.closest('[data-group]');
    groupEl.querySelectorAll('.opt').forEach(o => o.classList.remove('selected'));
    btn.classList.add('selected');
    const value = btn.textContent.trim();
    answers[group] = value;
    if(group === 'servicio'){
      resetRama(value);
      answers.servicio = value;
      flow = FLOWS[value] || FLOWS['Planos municipales'];
      stepIndex = 0;
    }
    setTimeout(goNext, 220);
  }

  /* grupos dentro de un panel con varias preguntas (ambientes, cocina, etc.): requieren botón Continuar.
     Si se vuelve a tocar la opción ya elegida, se destilda y el dato se borra. */
  function selectMulti(group, btn, panelKey){
    const groupEl = btn.closest('[data-group]');
    const yaSeleccionada = btn.classList.contains('selected');
    groupEl.querySelectorAll('.opt').forEach(o => o.classList.remove('selected'));
    if(yaSeleccionada){
      answers[group] = null;
    } else {
      btn.classList.add('selected');
      answers[group] = btn.textContent.trim();
    }
    updateGraph();
    checkContinue(panelKey);
  }

  function checkContinue(panelKey){
    const panel = panels[panelKey];
    if(!panel) return;
    const groups = panel.querySelectorAll('[data-group]');
    const allAnswered = Array.from(groups).every(g => answers[g.dataset.group] !== null);
    const contBtn = panel.querySelector('.continue-btn');
    if(contBtn) contBtn.disabled = !allAnswered;
  }

  document.querySelectorAll('[data-group]').forEach(groupEl => {
    const group = groupEl.dataset.group;
    const isMulti = groupEl.hasAttribute('data-multi');
    groupEl.querySelectorAll('.opt').forEach(btn => {
      btn.addEventListener('click', () => {
        if(isMulti){ selectMulti(group, btn, groupEl.dataset.multi); }
        else { selectSingle(group, btn); }
      });
    });
  });

  /* selección múltiple: los ambientes a reformar */
  function chequearReforma(){
    const btn = document.getElementById('reformaContinuar');
    if(btn) btn.disabled = !(answers.reforma_ambientes && answers.reforma_ambientes.length);
  }
  document.querySelectorAll('[data-multi-select]').forEach(groupEl => {
    const campo = groupEl.dataset.multiSelect;
    groupEl.querySelectorAll('.opt').forEach(btn => {
      btn.addEventListener('click', () => {
        const valor = btn.textContent.trim();
        const yaEsta = answers[campo].indexOf(valor);
        if(yaEsta > -1){ answers[campo].splice(yaEsta, 1); btn.classList.remove('selected'); }
        else { answers[campo].push(valor); btn.classList.add('selected'); }
        chequearReforma();
      });
    });
  });
  const reformaCont = document.getElementById('reformaContinuar');
  if(reformaCont) reformaCont.addEventListener('click', goNext);
  const reformaDetalle = document.getElementById('reformaDetalle');
  if(reformaDetalle) reformaDetalle.addEventListener('input', () => { answers.reforma_detalle = reformaDetalle.value.trim(); });

  document.querySelectorAll('.continue-btn').forEach(btn => {
    btn.addEventListener('click', goNext);
  });


  backBtn.addEventListener('click', goBack);

  function toggleSend(){ sendWa.disabled = nombreInput.value.trim().length < 2; }
  nombreInput.addEventListener('input', toggleSend);

  sendWa.addEventListener('click', () => {
    const nombre = nombreInput.value.trim();
    const comentario = comentarioInput.value.trim();
    let msg = 'Hola Grafo, mi nombre es ' + nombre + '. ';
    if(esProyecto()){
      msg += 'Quiero armar un proyecto arquitectónico en ' + (answers.municipio || 'una zona a confirmar') + '. ';
      CATS.forEach(cat => {
        const s = summarizeCat(cat);
        if(s) msg += CAT_LABELS[cat] + ': ' + s + '. ';
      });
    } else if(esReforma()){
      msg += 'Quiero hacer una reforma en ' + (answers.municipio || 'una zona a confirmar') + '. ';
      const amb = (answers.reforma_ambientes || []).join(', ');
      if(amb) msg += 'Ambientes a reformar: ' + amb + '. ';
      if(answers.reforma_detalle) msg += answers.reforma_detalle + '. ';
    } else {
      msg += 'Consulto por: ' + (answers.servicio || 'un caso') + '. ';
      msg += 'Situación: ' + (answers.situacion || 'a definir') + '. ';
      msg += 'Zona: ' + (answers.municipio || 'a confirmar') + '.';
    }
    if(comentario) msg += ' Comentario: ' + comentario;
    const url = 'https://wa.me/5491132273109?text=' + encodeURIComponent(msg);
    window.open(url, '_blank', 'noopener,noreferrer');
  });

  /* deep-link desde los botones "Evaluar mi propiedad" / "Contarnos el proyecto" */
  document.querySelectorAll('[data-servicio]').forEach(link => {
    link.addEventListener('click', () => {
      const value = link.dataset.servicio;
      resetRama(value);
      answers.servicio = value;
      flow = FLOWS[value] || FLOWS['Planos municipales'];
      const groupEl = document.querySelector('[data-group="servicio"]');
      if(groupEl){
        groupEl.querySelectorAll('.opt').forEach(o => { o.classList.toggle('selected', o.textContent.trim() === value); });
      }
      stepIndex = 1;
      setTimeout(showStep, 300);
    });
  });

  showStep();
})();
