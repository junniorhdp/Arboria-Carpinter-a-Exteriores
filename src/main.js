import './styles.css'
import site from '../config/site.js'

const DEMO = typeof __DEMO__ !== 'undefined' ? __DEMO__ : site.demoMode
const { business: biz } = site
document.documentElement.classList.add('js')

/* ---------- utilidades ---------- */
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
const photo = (key, w, h) => {
  const base = site.photos[key] || site.photos.hero
  return `${base}?auto=format&fit=crop&q=60&w=${w}${h ? `&h=${h}` : ''}`
}
const srcset = (key, ws, ratio) => ws.map((w) => `${photo(key, w, ratio ? Math.round(w / ratio) : 0)} ${w}w`).join(', ')
const waUrl = (msg) => `https://wa.me/${encodeURIComponent(biz.whatsapp)}?text=${encodeURIComponent(msg)}`
const track = (name, data = {}) => {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: name, ...data })
}
const arrow = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>'
const check = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'
const icoStep = '<svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 20V8l8-4 8 4v12M9 20v-6h6v6"/></svg>'
const phImg = (key, w, h, alt, extra = '') =>
  `<img src="${photo(key, w, h)}" srcset="${srcset(key, [w / 2, w, w * 1.5].map(Math.round), h ? w / h : 0)}" sizes="(min-width:1024px) ${w}px, 100vw" alt="${esc(alt)}" loading="lazy" decoding="async" width="${w}" height="${h || Math.round(w * 0.75)}" ${extra}>`

const nav = [
  ['servicios', 'Servicios'], ['proyectos', 'Proyectos'], ['proceso', 'Proceso'], ['cotizador', 'Cotizador'], ['contacto', 'Contacto'],
]

/* ---------- plantillas ---------- */
const header = () => `
  ${site.promo.enabled ? `<div class="promo"><span>${esc(site.promo.text)}</span><a href="${esc(site.promo.href)}">${esc(site.promo.linkText)}</a></div>` : ''}
  <header class="site-header" id="site-header">
    <div class="wrap nav">
      <a class="brand-mark" href="#top" aria-label="${esc(biz.name)} — inicio">${esc(biz.name)}</a>
      <nav aria-label="Principal"><ul class="nav-links">${nav.map(([id, l]) => `<li><a href="#${id}" data-nav="${id}">${l}</a></li>`).join('')}</ul></nav>
      <a class="btn btn-primary nav-cta" href="#cotizador">Cotizar proyecto</a>
      <a class="btn btn-primary nav-cta-m" href="#cotizador">Cotizar</a>
      <button class="menu-btn" id="menu-open" aria-label="Abrir menú" aria-expanded="false" aria-controls="mobile-menu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>
    </div>
  </header>
  <div class="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menú">
    <div class="top"><span class="brand-mark">${esc(biz.name)}</span>
      <button class="menu-btn" id="menu-close" aria-label="Cerrar menú"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>
    ${nav.map(([id, l]) => `<a class="title" href="#${id}">${l}</a>`).join('')}
  </div>`

const hero = () => {
  const m = site.metrics
  const trust = m.length
    ? m.map((x) => `<span>${esc(x.value)} ${esc(x.label)}</span>`).join('')
    : `<span>${esc(biz.city)} · Cotización por WhatsApp</span>`
  return `
  <section class="hero on-photo" aria-labelledby="hero-title" id="top">
    <picture>
      <source media="(max-width: 767px)" srcset="${photo('hero', 600, 1500)} 600w, ${photo('hero', 900, 2250)} 900w" sizes="100vw">
      <img class="bg" src="${photo('hero', 2000)}" srcset="${srcset('hero', [1280, 2000, 2400])}" sizes="100vw" alt="${esc(site.hero.alt)}" fetchpriority="high" width="1920" height="1280">
    </picture>
    <div class="wrap hero-inner">
      <p class="eyebrow">${esc(site.hero.eyebrow)} · ${esc(biz.city.toUpperCase())}</p>
      <h1 class="display">${esc(site.hero.title)}</h1>
      <p class="hero-sub">${esc(site.hero.subtitle)}</p>
      <div class="hero-ctas">
        <a class="btn btn-primary" href="${waUrl('Hola, quiero cotizar un proyecto.')}" target="_blank" rel="noopener" data-track="click_whatsapp">Cotiza tu proyecto</a>
        <a class="btn btn-outline" href="#proyectos">Ver proyectos</a>
      </div>
      <div class="trust">${trust}</div>
    </div>
  </section>`
}

const services = () => `
  <section class="section bg-canvas" id="servicios" aria-labelledby="t-serv"><div class="wrap">
    <div class="section-head reveal"><p class="eyebrow"><span class="num">01 —</span> SERVICIOS</p>
      <h2 class="h-xl" id="t-serv">Todo lo que tu espacio necesita, hecho en madera.</h2></div>
    <div class="grid-3">${site.services.map((s) => `
      <article class="card reveal">
        <div class="ph ph-45" style="aspect-ratio:4/5">${phImg(s.photo, 640, 800, `${s.name}: foto de ejemplo`)}</div>
        <div class="body"><h3 class="subheading">${esc(s.name)}</h3><p class="body-sm muted" style="margin:0">${esc(s.desc)}</p>
          <a class="link-arrow" href="#cotizador" data-type="${esc(s.id)}">Cotizar ${arrow}</a></div>
      </article>`).join('')}</div>
  </div></section>`

const projects = () => {
  const sp = site.starProject
  const cats = ['Todos', ...new Set(site.gallery.map((g) => g.cat))]
  const ig = site.social.instagram
  return `
  <section class="section bg-band" id="proyectos" aria-labelledby="t-proy"><div class="wrap">
    <div class="section-head reveal"><p class="eyebrow"><span class="num">02 —</span> PROYECTOS</p>
      <h2 class="h-xl" id="t-proy">Mira cómo cambia un espacio.</h2></div>
    <div class="compare-layout reveal">
      <div class="card-sand">
        <div class="compare" id="compare" role="slider" tabindex="0" aria-label="Comparador antes y después" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" aria-valuetext="50% antes">
          ${phImg(sp.after, 1200, 900, 'Proyecto después', 'class="after"').replace('loading="lazy"', 'loading="lazy"')}
          ${phImg(sp.before, 1200, 900, 'Proyecto antes', 'class="before"')}
          <span class="tag l">ANTES</span><span class="tag r">DESPUÉS</span>
          <span class="handle-line"></span>
          <span class="handle" aria-hidden="true"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 7l-5 5 5 5M15 7l5 5-5 5"/></svg></span>
        </div>
        <p class="caption" style="margin:12px 0 0">${esc(sp.title)} — ${esc(sp.place)}</p>
      </div>
      <div class="panel">
        <h3 class="subheading">${esc(sp.title)}</h3><p style="margin:0">${esc(sp.text)}</p>
        <ul>${sp.advantages.map((a) => `<li>${check}<span>${esc(a)}</span></li>`).join('')}</ul>
        <a class="btn btn-primary" href="#cotizador" style="align-self:flex-start">Cotiza tu proyecto</a>
      </div>
    </div>
    <div class="chips reveal" role="group" aria-label="Filtrar proyectos">${cats.map((c, i) => `<button class="chip" type="button" data-filter="${esc(c)}" aria-pressed="${i === 0}">${esc(c)}</button>`).join('')}</div>
    <div class="gallery" id="gallery">${site.gallery.map((g, i) => `
      <div data-cat="${esc(g.cat)}"><button type="button" data-i="${i}" aria-label="Ampliar: ${esc(g.alt)}">${phImg(g.photo, 800, 600, g.alt)}</button></div>`).join('')}</div>
    <p style="margin-top:32px">${ig ? `<a class="link-arrow" href="${esc(ig)}" target="_blank" rel="noopener">Ver más en Instagram ${arrow}</a> ` : '<span class="link-arrow">Ver más en Instagram</span> '}<span class="muted">@${esc(site.instagramHandle.replace(/^@/, ''))}</span></p>
  </div></section>
  <dialog class="lightbox" id="lightbox" aria-label="Galería ampliada">
    <div class="stage">
      <button class="lb-btn lb-close" id="lb-close" aria-label="Cerrar">${'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 6l12 12M18 6L6 18"/></svg>'}</button>
      <button class="lb-btn lb-prev" id="lb-prev" aria-label="Anterior"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 6l-6 6 6 6"/></svg></button>
      <button class="lb-btn lb-next" id="lb-next" aria-label="Siguiente"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 6l6 6-6 6"/></svg></button>
      <img id="lb-img" alt="">
      <p class="meta" id="lb-meta" aria-live="polite"></p>
    </div>
  </dialog>`
}

const why = () => `
  <section class="section bg-canvas" aria-labelledby="t-why"><div class="wrap">
    <div class="why">
      <div class="ph big reveal">${phImg(site.benefitsPhoto, 800, 1000, 'Detalle de carpintería en el taller')}</div>
      <div>
        <h2 class="h" id="t-why" style="margin-bottom:32px">Un trabajo hecho para durar.</h2>
        <div id="benefits">${site.benefits.map((b, i) => `
          <div class="benefit${i === 0 ? ' is-active' : ''}" tabindex="0"><h3 class="subheading">${esc(b.title)}</h3><p class="muted" style="margin:0">${esc(b.text)}</p></div>`).join('')}</div>
      </div>
    </div>
  </div></section>`

const process = () => `
  <section class="section bg-band" id="proceso" aria-labelledby="t-proc"><div class="wrap">
    <div class="section-head reveal"><p class="eyebrow"><span class="num">03 —</span> PROCESO</p>
      <h2 class="h-xl" id="t-proc">Del primer mensaje a tu terraza lista.</h2></div>
    <ol class="steps">${site.process.map((s, i) => `
      <li class="step reveal"><span class="node">${i + 1}</span>${icoStep}<h3 class="subheading">${esc(s.title)}</h3><p class="muted" style="margin:8px 0 0">${esc(s.text)}</p></li>`).join('')}</ol>
  </div></section>`

const finishes = () => `
  <section class="section bg-canvas" id="acabados" aria-labelledby="t-acab"><div class="wrap">
    <div class="section-head reveal"><p class="eyebrow"><span class="num">04 —</span> ACABADOS</p>
      <h2 class="h-xl" id="t-acab">Elige el material y el acabado.</h2></div>
    <div class="finish-view">
      <div class="ph big" id="finish-big">${phImg(site.finishes[0].photo, 900, 675, `Referencia: ${site.finishes[0].name}`)}</div>
      <div>
        <div class="swatches" role="radiogroup" aria-label="Acabado" id="swatches">${site.finishes.map((f, i) => `
          <button type="button" class="swatch" role="radio" aria-checked="${i === 0}" data-i="${i}" tabindex="${i === 0 ? 0 : -1}">
            <div class="sq">${phImg(f.photo, 144, 144, '')}</div>${esc(f.name)}</button>`).join('')}</div>
        ${site.finishesNote ? `<p class="body-lg" style="margin-top:16px">${esc(site.finishesNote)}</p>` : ''}
      </div>
    </div>
  </div></section>`

const quote = () => `
  <section class="section bg-band" id="cotizador" aria-labelledby="t-cot"><div class="wrap">
    <div class="section-head reveal"><p class="eyebrow"><span class="num">05 —</span> COTIZA</p>
      <h2 class="h-xl" id="t-cot">Cuéntanos tu proyecto. Te respondemos por WhatsApp.</h2></div>
    <div class="quote">
      <form id="quote-form" novalidate onsubmit="return false">
        <fieldset class="field"><legend>Tipo de proyecto</legend>
          <div class="chips" style="margin:0" id="q-types">${site.projectTypes.map((t, i) => `<button class="chip" type="button" data-id="${t.id}" aria-pressed="${i === 0}">${esc(t.label)}</button>`).join('')}</div></fieldset>
        <div class="field"><label class="lbl" for="q-size">Medidas aproximadas (<span id="q-unit">m²</span>)</label>
          <div class="range-row"><input id="q-range" type="range" min="1" max="200" value="20" aria-label="Medidas aproximadas, control deslizante">
          <input class="input" id="q-size" type="number" min="1" max="1000" value="20" inputmode="decimal"></div></div>
        <fieldset class="field"><legend>Acabado</legend>
          <div class="chips" style="margin:0" id="q-finish">${site.finishes.map((f, i) => `<button class="chip" type="button" data-name="${esc(f.name)}" aria-pressed="${i === 0}">${esc(f.name)}</button>`).join('')}</div></fieldset>
        <fieldset class="field"><legend>Extras</legend>
          <div id="q-extras">${site.extras.map((e, i) => `<label class="check"><input type="checkbox" value="${esc(e)}" id="x${i}"> ${esc(e)}</label>`).join('')}</div></fieldset>
      </form>
      <aside class="card-sand summary" aria-label="Resumen de tu cotización">
        <h3 class="subheading">Resumen</h3>
        <div aria-live="polite" id="q-summary"></div>
        <a class="btn btn-primary" id="q-send" href="#" target="_blank" rel="noopener" style="width:100%">Enviar cotización por WhatsApp</a>
        <p class="caption" style="margin:12px 0 0">Estimado de referencia. El precio final se confirma tras la visita técnica.</p>
      </aside>
    </div>
  </div></section>
  <div class="quote-bar" id="quote-bar"><span id="q-bar-text"></span><a class="btn btn-primary" id="q-bar-send" href="#" target="_blank" rel="noopener">Enviar</a></div>`

const figures = () => site.metrics.length ? `
  <section class="section bg-brand on-dark" aria-label="Cifras"><div class="wrap"><div class="figures">${site.metrics.map((m) => `
    <div><span class="figure">${esc(m.value)}</span><p>${esc(m.label)}</p></div>`).join('')}</div></div></section>` : ''

const reviews = () => `
  <section class="section bg-canvas" aria-labelledby="t-op"><div class="wrap">
    <div class="section-head reveal"><p class="eyebrow"><span class="num">06 —</span> OPINIONES</p>
      <h2 class="h-xl" id="t-op">Lo que dicen quienes ya estrenaron su espacio.</h2></div>
    <div class="reviews">${site.reviews.map((r) => `
      <figure class="review reveal" style="margin:0">
        ${r.sample ? '<span class="sample-tag">Reseña de ejemplo</span>' : ''}
        <span class="stars" role="img" aria-label="${r.stars} de 5 estrellas">${'★'.repeat(r.stars)}</span>
        <blockquote style="margin:0">“${esc(r.quote)}”</blockquote>
        <figcaption><strong>${esc(r.name)}</strong><br><span class="muted body-sm">${esc(r.project)}</span></figcaption>
      </figure>`).join('')}</div>
  </div></section>`

const contact = () => `
  <section class="section bg-brand on-dark" id="contacto" aria-labelledby="t-con"><div class="wrap contact">
    <div>
      <p class="eyebrow">RESPONDEMOS POR WHATSAPP</p>
      <h2 class="h-xl" id="t-con" style="font-weight:400">Agenda tu visita técnica.</h2>
      <ul>
        <li>WhatsApp: <a href="${waUrl('Hola, quiero agendar una visita técnica.')}" target="_blank" rel="noopener" data-track="click_whatsapp">${esc(biz.phoneDisplay)}</a></li>
        <li>Correo: ${esc(biz.email)}</li>
        <li>Zona: ${esc(biz.address)} · ${esc(biz.areaServed)}</li>
        <li>Horario: ${esc(biz.hours)}</li>
      </ul>
    </div>
    <div class="form-card">
      <form id="contact-form" novalidate>
        <div class="hp" aria-hidden="true"><label>No llenar <input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
        <div class="f-row"><label class="f-label" for="c-name">Nombre *</label><input class="input" id="c-name" name="name" autocomplete="name" required><p class="f-err" hidden></p></div>
        <div class="f-row"><label class="f-label" for="c-tel">WhatsApp *</label><input class="input" id="c-tel" name="tel" type="tel" inputmode="tel" autocomplete="tel" required><p class="f-err" hidden></p></div>
        <div class="f-row"><label class="f-label" for="c-type">Tipo de proyecto *</label>
          <select class="input" id="c-type" name="type" required><option value="">Selecciona…</option>${site.projectTypes.map((t) => `<option>${esc(t.label)}</option>`).join('')}</select><p class="f-err" hidden></p></div>
        <div class="f-row"><label class="f-label" for="c-size">Medidas aproximadas</label><input class="input" id="c-size" name="size"></div>
        <div class="f-row"><label class="f-label" for="c-place">Ciudad o barrio</label><input class="input" id="c-place" name="place" autocomplete="address-level2"></div>
        <div class="f-row"><label class="f-label" for="c-msg">Mensaje</label><textarea class="input" id="c-msg" name="message"></textarea></div>
        <div class="f-row"><label class="check" style="align-items:flex-start"><input type="checkbox" id="c-consent" name="consent" required>
          <span>Autorizo el tratamiento de mis datos personales (Ley 1581). <a href="${esc(site.privacyUrl)}">Política de privacidad</a> *</span></label><p class="f-err" hidden></p></div>
        <button class="btn btn-primary" type="submit" id="c-submit">Solicitar cotización</button>
        <p style="margin:16px 0 0"><a class="link-arrow" href="${waUrl('Hola, quiero agendar una visita técnica.')}" target="_blank" rel="noopener" data-track="click_whatsapp">o escríbenos por WhatsApp ${arrow}</a></p>
        <div class="form-status" id="c-status" role="status" hidden></div>
      </form>
    </div>
  </div></section>`

const footer = () => `
  <footer class="site-footer"><div class="wrap">
    <div class="foot-grid">
      <div><span class="brand-mark" style="color:#fff">${esc(biz.name)}</span><p class="body-sm" style="max-width:360px">Pérgolas, decks y carpintería arquitectónica a medida en ${esc(biz.city)}.</p></div>
      <div class="foot-col"><h3>Servicios</h3><ul>${site.services.map((s) => `<li><a href="#servicios">${esc(s.name)}</a></li>`).join('')}</ul></div>
      <div class="foot-col"><h3>Proyectos</h3><ul><li><a href="#proyectos">Galería</a></li><li><a href="#proceso">Proceso</a></li><li><a href="#cotizador">Cotizador</a></li></ul></div>
      <div class="foot-col"><h3>Contacto</h3><ul><li><a href="#contacto">Visita técnica</a></li><li><a href="${waUrl('Hola')}" target="_blank" rel="noopener">WhatsApp</a></li></ul></div>
    </div>
    <p class="legal">${esc(site.legal)} <a href="${esc(site.privacyUrl)}" style="color:#ddd">Política de privacidad</a></p>
  </div></footer>`

const waFloat = () => `
  <a class="wa-float" id="wa-float" href="${waUrl('Hola, quiero cotizar un proyecto.')}" target="_blank" rel="noopener" aria-label="Escribir por WhatsApp" data-track="click_whatsapp">
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" aria-hidden="true"><path d="M4 20l1.3-4.2A8 8 0 1 1 8.400 18.800z"/><path d="M9 9c0 3 3 6 6 6l1.200-1.600-2-1-1 .8c-1-.4-2-1.400-2.400-2.400l.8-1-1-2z" fill="#fff" stroke="none"/></svg>
    <span class="tip">Escríbenos por WhatsApp</span>
  </a>`

const demoUi = () => !DEMO ? '' : `
  <div class="watermark" aria-hidden="true"><span>DEMO</span></div>
  <button class="demo-pill" id="demo-pill" aria-expanded="false" aria-controls="demo-detail">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.500v.01"/></svg>
    <span class="short">DEMO</span><span class="full">DEMO · Propuesta de diseño para ${esc(site.demo.clientName)}</span>
  </button>
  <div class="demo-detail" id="demo-detail" hidden>
    <p style="margin:0 0 8px">Propuesta de diseño para <strong>${esc(site.demo.clientName)}</strong>, creada por ${esc(site.demo.devName)}.</p>
    <a class="link-arrow" href="https://wa.me/${encodeURIComponent(site.demo.devWhatsapp)}" target="_blank" rel="noopener">Escribir al desarrollador ${arrow}</a>
  </div>`

document.getElementById('app').innerHTML =
  header() + `<main id="main">${hero()}${services()}${projects()}${why()}${process()}${finishes()}${quote()}${figures()}${reviews()}${contact()}</main>` + footer() + waFloat() + demoUi()

/* ---------- comportamiento ---------- */
const $ = (s, r = document) => r.querySelector(s)
const $$ = (s, r = document) => [...r.querySelectorAll(s)]

// header con sombra al scroll + enlace activo
const hdr = $('#site-header')
const onScroll = () => hdr.classList.toggle('is-scrolled', window.scrollY > 8)
onScroll(); addEventListener('scroll', onScroll, { passive: true })
const secIO = new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) $$('[data-nav]').forEach((a) => a.setAttribute('aria-current', String(a.dataset.nav === e.target.id)))
}), { rootMargin: '-40% 0px -55% 0px' })
nav.forEach(([id]) => { const s = document.getElementById(id); if (s) secIO.observe(s) })

// menú móvil con focus trap
const menu = $('#mobile-menu'), openB = $('#menu-open'), closeB = $('#menu-close')
const setMenu = (open) => {
  menu.classList.toggle('is-open', open); openB.setAttribute('aria-expanded', String(open))
  document.body.style.overflow = open ? 'hidden' : ''
  ;(open ? closeB : openB).focus()
}
openB.addEventListener('click', () => setMenu(true))
closeB.addEventListener('click', () => setMenu(false))
$$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)))
menu.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') return setMenu(false)
  if (e.key !== 'Tab') return
  const f = $$('a,button', menu); const first = f[0], last = f[f.length - 1]
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
})

// reveal al scroll (un solo disparo)
const revIO = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); revIO.unobserve(e.target) } }), { threshold: 0.12 })
$$('.reveal').forEach((el) => revIO.observe(el))

// WhatsApp flotante: tras 3 s o al pasar el hero
const wa = $('#wa-float')
const showWa = () => wa.classList.add('is-on')
setTimeout(showWa, 3000)
new IntersectionObserver((es) => { if (!es[0].isIntersecting) showWa() }).observe($('.hero'))
$$('[data-track="click_whatsapp"]').forEach((a) => a.addEventListener('click', () => track('click_whatsapp')))

// comparador antes/después
const cmp = $('#compare')
const setPos = (p) => {
  p = Math.max(0, Math.min(100, p)); cmp.style.setProperty('--pos', p + '%')
  cmp.setAttribute('aria-valuenow', String(Math.round(p))); cmp.setAttribute('aria-valuetext', `${Math.round(p)}% antes`)
}
let cmpPos = 50
const fromEvent = (e) => { const r = cmp.getBoundingClientRect(); cmpPos = ((e.clientX - r.left) / r.width) * 100; setPos(cmpPos) }
cmp.addEventListener('pointerdown', (e) => { cmp.setPointerCapture(e.pointerId); fromEvent(e); cmp.onpointermove = fromEvent })
cmp.addEventListener('pointerup', () => { cmp.onpointermove = null })
cmp.addEventListener('keydown', (e) => {
  const step = e.shiftKey ? 10 : 5
  if (e.key === 'ArrowLeft') cmpPos -= step
  else if (e.key === 'ArrowRight') cmpPos += step
  else if (e.key === 'Home') cmpPos = 0
  else if (e.key === 'End') cmpPos = 100
  else return
  e.preventDefault(); cmpPos = Math.max(0, Math.min(100, cmpPos)); setPos(cmpPos)
})

// galería: filtros + lightbox
const gItems = $$('#gallery > div')
$$('[data-filter]').forEach((b) => b.addEventListener('click', () => {
  $$('[data-filter]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)))
  gItems.forEach((it) => { it.hidden = b.dataset.filter !== 'Todos' && it.dataset.cat !== b.dataset.filter })
}))
const lb = $('#lightbox'); let lbList = [], lbIdx = 0, lbOpener = null
const lbShow = () => {
  const g = site.gallery[lbList[lbIdx]]
  $('#lb-img').src = photo(g.photo, 1600); $('#lb-img').alt = g.alt
  $('#lb-meta').textContent = `${lbIdx + 1} / ${lbList.length} — Proyecto — ${site.galleryCaption}`
}
const lbStep = (d) => { lbIdx = (lbIdx + d + lbList.length) % lbList.length; lbShow() }
gItems.forEach((it) => $('button', it).addEventListener('click', (e) => {
  lbList = gItems.filter((x) => !x.hidden).map((x) => Number($('button', x).dataset.i))
  lbIdx = lbList.indexOf(Number(e.currentTarget.dataset.i)); lbOpener = e.currentTarget
  lbShow(); lb.showModal(); $('#lb-close').focus()
}))
$('#lb-close').addEventListener('click', () => lb.close())
$('#lb-prev').addEventListener('click', () => lbStep(-1))
$('#lb-next').addEventListener('click', () => lbStep(1))
lb.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') lbStep(-1); if (e.key === 'ArrowRight') lbStep(1) })
lb.addEventListener('click', (e) => { if (e.target === lb) lb.close() })
lb.addEventListener('close', () => lbOpener && lbOpener.focus())

// beneficios: activar por hover/foco
const bens = $$('.benefit')
bens.forEach((b) => ['mouseenter', 'focus'].forEach((ev) => b.addEventListener(ev, () => bens.forEach((x) => x.classList.toggle('is-active', x === b)))))

// selector de acabado
const sw = $$('#swatches .swatch')
const pickFinish = (i, focus) => {
  sw.forEach((s, k) => { s.setAttribute('aria-checked', String(k === i)); s.tabIndex = k === i ? 0 : -1 })
  const f = site.finishes[i]
  $('#finish-big').innerHTML = phImg(f.photo, 900, 675, `Referencia: ${f.name}`)
  if (focus) sw[i].focus()
  q.finish = i; $$('#q-finish .chip').forEach((c, k) => c.setAttribute('aria-pressed', String(k === i))); renderQuote()
}
sw.forEach((s, i) => {
  s.addEventListener('click', () => pickFinish(i))
  s.addEventListener('keydown', (e) => {
    const n = sw.length
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); pickFinish((i + 1) % n, true) }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); pickFinish((i - 1 + n) % n, true) }
  })
})

// cotizador
const q = { type: 0, size: 20, finish: 0, started: false }
const fmt = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })
const quoteMsg = () => {
  const t = site.projectTypes[q.type], f = site.finishes[q.finish]
  const extras = $$('#q-extras input:checked').map((x) => x.value)
  return { t, f, extras, msg: `Hola, quiero cotizar ${t.label.toLowerCase()} de aprox. ${q.size} ${t.unit}, acabado ${f.name}, extras: ${extras.length ? extras.join(', ') : 'ninguno'}.` }
}
function renderQuote() {
  const { t, f, extras, msg } = quoteMsg()
  let price = 'Cotización personalizada'
  const p = site.pricePerUnit && site.pricePerUnit[t.id]
  if (p) price = `${fmt.format(p * q.size * 0.85)} – ${fmt.format(p * q.size * 1.15)}`
  $('#q-summary').innerHTML = `<dl><dt>Proyecto</dt><dd>${esc(t.label)}</dd><dt>Medidas</dt><dd>${q.size} ${esc(t.unit)}</dd><dt>Acabado</dt><dd>${esc(f.name)}</dd><dt>Extras</dt><dd>${extras.length ? esc(extras.join(', ')) : 'Ninguno'}</dd><dt>Estimado</dt><dd><strong>${esc(price)}</strong></dd></dl>`
  $('#q-unit').textContent = t.unit
  const url = waUrl(msg)
  $('#q-send').href = url; $('#q-bar-send').href = url
  $('#q-bar-text').textContent = `${t.label} · ${q.size} ${t.unit}`
}
const markStarted = () => { if (!q.started) { q.started = true; track('quote_started'); $('#quote-bar').classList.add('is-on') } }
$$('#q-types .chip').forEach((c, i) => c.addEventListener('click', () => {
  q.type = i; $$('#q-types .chip').forEach((x) => x.setAttribute('aria-pressed', String(x === c))); markStarted(); renderQuote()
}))
$$('#q-finish .chip').forEach((c, i) => c.addEventListener('click', () => { markStarted(); pickFinish(i) }))
const rng = $('#q-range'), num = $('#q-size')
rng.addEventListener('input', () => { q.size = Number(rng.value); num.value = rng.value; markStarted(); renderQuote() })
num.addEventListener('input', () => { const v = Number(num.value); if (v > 0) { q.size = v; rng.value = Math.min(v, 200); markStarted(); renderQuote() } })
$$('#q-extras input').forEach((c) => c.addEventListener('change', () => { markStarted(); renderQuote() }))
$$('#q-send, #q-bar-send').forEach((a) => a.addEventListener('click', () => { track('quote_sent'); track('click_whatsapp') }))
// tarjetas de servicio preseleccionan el tipo
const typeMap = { pergolas: 0, decks: 1, carpinteria: 2 }
$$('[data-type]').forEach((a) => a.addEventListener('click', () => { const i = typeMap[a.dataset.type]; if (i !== undefined) $$('#q-types .chip')[i].click() }))
renderQuote()
// ocultar WhatsApp flotante en móvil si la barra del cotizador o el formulario están visibles
const hideWa = new Set()
const hideIO = new IntersectionObserver((es) => {
  es.forEach((e) => (e.isIntersecting ? hideWa.add(e.target) : hideWa.delete(e.target)))
  wa.classList.toggle('is-hidden-m', hideWa.size > 0 || $('#quote-bar').classList.contains('is-on'))
})
hideIO.observe($('#cotizador')); hideIO.observe($('#contact-form'))
new MutationObserver(() => wa.classList.toggle('is-hidden-m', hideWa.size > 0 || $('#quote-bar').classList.contains('is-on'))).observe($('#quote-bar'), { attributes: true })
// el botón flotante solo se oculta en pantallas < 1024 (donde existe la barra inferior)
const style = document.createElement('style')
style.textContent = '@media (min-width:1024px){.wa-float.is-hidden-m{display:grid}}'
document.head.append(style)

// formulario de contacto
const form = $('#contact-form'), status = $('#c-status')
const rules = {
  name: (v) => v.trim().length >= 2 || 'Escribe tu nombre.',
  tel: (v) => /^[+\d][\d\s-]{6,}$/.test(v.trim()) || 'Escribe un número de WhatsApp válido.',
  type: (v) => v !== '' || 'Selecciona un tipo de proyecto.',
  consent: (_v, el) => el.checked || 'Debes autorizar el tratamiento de datos.',
}
function validate() {
  let ok = true
  Object.entries(rules).forEach(([n, fn]) => {
    const el = form.elements[n]; const r = fn(el.value, el)
    const err = el.closest('.f-row').querySelector('.f-err')
    if (r !== true) {
      ok = false; el.setAttribute('aria-invalid', 'true'); el.setAttribute('aria-describedby', `${el.id}-e`)
      err.id = `${el.id}-e`; err.hidden = false
      err.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16.500v.01"/></svg>${esc(r)}`
    } else { el.removeAttribute('aria-invalid'); err.hidden = true }
  })
  return ok
}
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  status.hidden = true
  if (form.elements.website.value) return // honeypot
  if (!validate()) { form.querySelector('[aria-invalid="true"]').focus(); return }
  const btn = $('#c-submit'); btn.disabled = true; btn.textContent = 'Enviando…'
  const data = Object.fromEntries(new FormData(form))
  try {
    if (DEMO) {
      await new Promise((r) => setTimeout(r, 600)) // formulario simulado
    } else if (!site.formEndpoint) {
      throw new Error('sin endpoint') // sin destino real: fallback a WhatsApp
    } else {
      const res = await fetch(site.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      if (!res.ok) throw new Error('http ' + res.status)
    }
    track('submit_form')
    status.className = 'form-status ok'
    status.textContent = DEMO ? 'Modo demo: tu solicitud no se envió. Usa el botón de WhatsApp para probar el contacto.' : 'Recibimos tu solicitud. Te escribiremos por WhatsApp.'
    status.hidden = false; form.reset()
  } catch {
    const msg = `Hola, quiero cotizar: ${data.type}. Soy ${data.name}.`
    status.className = 'form-status err'
    status.innerHTML = `No pudimos enviar el formulario. <a href="${waUrl(msg)}" target="_blank" rel="noopener">Escríbenos por WhatsApp</a>.`
    status.hidden = false
  } finally { btn.disabled = false; btn.textContent = 'Solicitar cotización' }
})

// píldora demo
const pill = $('#demo-pill')
if (pill) pill.addEventListener('click', () => {
  const d = $('#demo-detail'); d.hidden = !d.hidden; pill.setAttribute('aria-expanded', String(!d.hidden))
})
