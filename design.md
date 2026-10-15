# Arboria Carpintería & Exteriores — Design System & Landing Spec (Carpintería arquitectónica, pérgolas y decks)

> Un taller con luz de tarde: tablones, vetas y herramientas sobre papel crema, y al fondo una terraza recién entregada. Calidez de oficio con precisión de plano: titulares ligeros y enormes, bordes rectos como un corte limpio, verde bosque como firma y la madera como protagonista.

**Nicho:** Carpintería arquitectónica, pérgolas y decks (negocio local)
**Ciudad / zona:** BOGOTA
**Idioma del sitio:** Español (es-CO), tuteo por defecto (configurable a "usted")
**Tema:** Claro (único). Secciones sobre crema alternadas con un panel verde bosque y footer carbón.
**Origen:** Fusión de dos sistemas medidos:
- *Trex (home)*: editorial-corporativo, verde bosque `#084734`, lima como acento puntual, esquinas rectas, estructura de herramientas (calculadora, selector de acabado, antes/después, pasos).
- *Samara*: arquitectónico y aireado, lienzo parchment, titulares ultraligeros con tracking muy apretado, tarjetas cálidas con radio suave, titular con imágenes insertadas.

---

## 0. Instrucciones para el agente (Claude Code)

1. Lee este archivo completo antes de escribir código.
2. Stack sugerido: **Vite + Tailwind v4 compilado** (o Astro). Una sola página, mobile-first. No uses Tailwind por CDN.
3. Usa **solo** los tokens de este documento. No inventes colores, radios, sombras ni fuentes.
4. **Plantilla reutilizable (white-label):** todo lo específico del negocio vive en `/config/site.js`: nombre, ciudad, WhatsApp, servicios, materiales y acabados, precios por m², métricas, reseñas, redes, textos legales e imágenes. Cambiar de cliente = cambiar la config y las fotos.
5. **No inventes datos del negocio:** ni materiales, ni precios, ni cifras, ni reseñas, ni certificaciones. Si el dato no existe, usa un placeholder `{{...}}` o `TODO` visible solo en la config.
6. Incluye la bandera `DEMO_MODE` (ver sección 12).
7. Entrega accesible (WCAG 2.2 AA), rápida (LCP < 2.5 s) y con SEO local básico.
8. Al terminar, ejecuta el checklist de la sección 14.

---

## 1. Principios y resolución de conflictos

### 1.1 Qué se toma de cada sistema

| Idea | Origen | Traducción al nicho |
|---|---|---|
| Verde bosque como color de marca y CTA | Trex | Botón primario y paneles de marca; evoca exterior, jardín y madera tratada |
| Lima fluorescente solo sobre foto o verde oscuro | Trex | Único acento "eléctrico", con texto `#333`, nunca en superficies de lectura |
| Esquinas rectas | Trex | Como un corte limpio: fotos y piezas visuales sin redondeo |
| Herramientas como tarjetas de inicio (calculadora, selector de color, muestras) | Trex | Cotizador, selector de acabado y "solicitar visita técnica" |
| Comparador antes/después | Trex | Terrazas y decks renovados: el mejor argumento visual del nicho |
| Línea de pasos con nodos numerados | Trex | Visita técnica → Diseño → Fabricación → Instalación |
| Tarjeta activa con borde izquierdo verde hoja | Trex | Lista de beneficios "por qué elegirnos" |
| Cifras grandes en lima sobre panel verde | Trex | Solo si son datos reales del negocio |
| Lienzo parchment `#FDFDF7`, nunca blanco puro | Samara | Fondo cálido que se parece al papel de un plano |
| Titulares ultraligeros y enormes con tracking apretado | Samara | La autoridad viene del tamaño, no del peso |
| Mucho espacio en blanco (96 px entre secciones) | Samara | Ritmo de revista de arquitectura |
| Titular con imágenes pequeñas insertadas | Samara | "Pérgolas [foto] y decks [foto] a tu medida": toque de firma, opcional |
| Tarjeta Warm Sand con sombra mínima | Samara | Tarjetas destacadas (cotizador, proyecto estrella) |
| Fotografía soleada, rodeada de naturaleza | Ambos | Terrazas, pérgolas y decks con luz cálida, integrados al paisaje |

### 1.2 Conflictos resueltos

| Conflicto | Decisión final |
|---|---|
| **Color del botón principal.** Trex: verde bosque. Samara: azul cielo | **Verde bosque `#084734`** sobre fondos claros; **lima `#CEF17B`** solo sobre foto o panel verde. Se **descarta el azul y el naranja de Samara** (fríos contra madera) |
| **Radios.** Trex: 0 px. Samara: 12 px | **Fotos, hero y galería: 0** (Trex). **Botones, inputs y tarjetas estándar: 4 px** (valor intermedio nuevo, "arista biselada"). **Tarjetas destacadas (cotizador, proyecto estrella): 12 px** (Samara). Chips y paginación: 999 px |
| **Sombras.** Trex: difusas `0 4px 16px .25`. Samara: casi invisibles | Reposo: `0 0.5px 2px rgba(0,0,0,.12)` (Samara). Hover de tarjetas: `0 4px 16px rgba(51,51,51,.18)` (Trex, algo más suave). Flotantes (WhatsApp, flechas): `0 4px 8px rgba(51,51,51,.25)` |
| **Fondo.** Trex: blanco + crema `#F7F5F2`. Samara: parchment `#FDFDF7` + sand `#F5F2DE` | Lienzo base **parchment**; banda alterna **crema `#F7F5F2`**; **sand** solo en tarjetas destacadas; panel neutro `#ECEDE8` solo en el comparador |
| **Texto.** Trex: `#333`. Samara: negro puro | **`#333333`**, nunca negro puro |
| **Peso de titulares.** Trex: 300–400 (600 en medios). Samara: ligero | **Sobre claro: 300. Sobre foto: 400** (para que el blanco se lea). **600 solo en títulos medios y botones.** Nunca 700+ |
| **Fuentes propietarias** (Proxima Nova y Regola) | **Figtree** como única familia (pesos 300–700). Alternativa: Plus Jakarta Sans |
| **Verde de Samara `#375033`** vs verde de marca de Trex | Se **descarta el de Samara**; manda `#084734` para no tener dos verdes oscuros casi iguales |
| **Espaciado.** Trex: 64–96 px. Samara: 96–120 px | **96 px** de escritorio, 72 px tablet, 56 px móvil |
| **Carrusel de hero** (Trex) | **Hero estático** de una sola foto (mejor LCP y menos riesgo de accesibilidad). Sin autoplay en ningún carrusel |
| **Barra de reconocimientos / sostenibilidad** (Trex) | **Solo si el negocio tiene sellos o cifras reales.** Si no, se omite |

### 1.3 Añadidos propios del nicho (marcados como "nuevo")
- **Timber `#8A5D33`**: tono madera para números de sección, filetes y detalles. Contraste ≈ 5.5:1 sobre parchment (verificar con la herramienta de contraste del proyecto).
- **Timber light `#C9A57A`**: solo ornamento (líneas, iconos grandes). **Nunca texto.**
- **Radio 4 px** como valor intermedio entre ambos sistemas.

---

## 2. Color

### 2.1 Paleta

| Token | Valor | Rol |
|---|---|---|
| `--color-canvas` | `#FDFDF7` | Fondo base (parchment). Nunca blanco puro como fondo grande |
| `--color-band` | `#F7F5F2` | Banda alterna entre secciones |
| `--color-sand` | `#F5F2DE` | Tarjetas destacadas |
| `--color-panel` | `#ECEDE8` | Paneles secundarios (comparador, listas) |
| `--color-white` | `#FFFFFF` | Tarjetas de producto/proyecto, formulario, texto sobre oscuro |
| `--color-text` | `#333333` | Texto principal y titulares |
| `--color-text-muted` | `#555555` | Texto secundario, eyebrows |
| `--color-text-meta` | `#666666` | Metadatos y notas |
| `--color-brand` | `#084734` | Verde bosque: CTA sólido, paneles, enlaces |
| `--color-brand-deep` | `#00493D` | Hover y estados oscuros |
| `--color-accent` | `#CEF17B` | Lima: CTA sobre foto o verde, cifras grandes. Texto siempre `#333` |
| `--color-leaf` | `#6F9C32` | Verde hoja: nodos de pasos, borde izquierdo de tarjeta activa, flechas. **No para texto sobre claro** |
| `--color-timber` | `#8A5D33` | **Nuevo.** Números de sección, filetes, detalles de madera |
| `--color-timber-light` | `#C9A57A` | **Nuevo.** Solo ornamento, nunca texto |
| `--color-footer` | `#333333` | Fondo del pie |
| `--color-border` | `#B3B3B3` | Borde de inputs |
| `--color-border-soft` | `#CCCCCC` | Divisores |
| `--color-hairline` | `rgba(51,51,51,.12)` | Hairlines sobre claro |
| `--color-overlay` | `rgba(51,51,51,.25)` | Fondo del botón fantasma sobre foto |
| `--color-wa` | `#25D366` | **Excepción funcional:** solo el botón flotante de WhatsApp |

### 2.2 Superficies

| Nivel | Nombre | Valor | Uso |
|---|---|---|---|
| 0 | Foto a sangre | — | Hero y banda de cifras (con panel verde) |
| 1 | Canvas | `#FDFDF7` | Fondo por defecto |
| 2 | Band | `#F7F5F2` | Secciones alternas |
| 3 | Sand | `#F5F2DE` | Tarjetas destacadas |
| 4 | Brand | `#084734` | Panel de contacto, banda de cifras, banda promo |
| 5 | Footer | `#333333` | Pie |

### 2.3 Reglas de color
- La paleta es ~85% neutros cálidos, ~10% verde de marca y el resto fotografía. El color es **marca y acción**, no decoración.
- **Lima:** solo sobre foto, panel verde o cifras grandes. Con texto `#333`. Nunca texto blanco sobre lima ni lima como fondo de superficies de lectura. **Máximo un CTA lima por pantalla.**
- **Timber y leaf nunca en el mismo componente.** Timber = números y filetes sobre claro. Leaf = pasos, borde de tarjeta activa y flechas.
- **Un solo CTA sólido por bloque.** El secundario es contorno.
- **Prohibidos los degradados y patrones decorativos**, salvo la línea de pasos que se desvanece a transparente.
- **Texto sobre foto:** blanco directamente, **sin velo**. Si el contraste es < 4.5:1, se reencuadra o se cambia la foto.

---

## 3. Tipografía

### 3.1 Familia

| Token | Fuente | Uso |
|---|---|---|
| `--font-sans` | **Figtree** (fallback: Plus Jakarta Sans, system-ui, Arial) | Todo el sitio: titulares, cuerpo, navegación y botones |

Una sola familia. Carga con `font-display: swap` y `preload` de los pesos 300, 400 y 600, subset latino.

### 3.2 Escala

| Rol | Tamaño (móvil → escritorio) | Line-height | Tracking | Peso | Superficie |
|---|---|---|---|---|---|
| `display` (hero) | `clamp(48px, 7vw, 88px)` | 1.0 | -0.035em | 400 | sobre foto |
| `heading-xl` | `clamp(40px, 5.5vw, 72px)` | 1.0 | -0.03em | 300 | claro |
| `heading` | `clamp(32px, 4vw, 48px)` | 1.1 | -0.02em | 300 | claro |
| `title` | `clamp(24px, 2.6vw, 32px)` | 1.25 | -0.01em | 600 | ambas |
| `subheading` | `clamp(19px, 1.8vw, 23px)` | 1.3 | -0.01em | 600 | ambas |
| `figure` (cifras) | `clamp(40px, 5vw, 56px)` | 1.0 | -0.02em | 600 | panel verde |
| `body-lg` | 18px | 1.4 | 0 | 400 | ambas |
| `body` | 16px | 1.5 | 0 | 400 | ambas |
| `body-sm` | 14px | 1.5 | 0 | 400 | ambas |
| `button` | 16–18px | 1.2 | 0 | 600 | ambas |
| `eyebrow` | 14px | 1.4 | 1px | 600, MAYÚSCULAS | ambas |
| `caption` | 12px | 1.5 | 0 | 400 | ambas |

### 3.3 Reglas tipográficas
- **Titulares grandes y ligeros:** autoridad por tamaño y tracking negativo, no por peso. 600 solo para títulos medios y botones.
- **Tracking negativo solo desde 32 px.** El cuerpo va sin tracking, para que el español se lea cómodo.
- Eyebrows: Figtree 14px 600 MAYÚSCULAS con 1px de tracking. Numeración de sección `01 —` en `timber`.
- Titular con **imágenes insertadas** (opcional, máx. 2 por titular): foto recortada en píldora de la altura de la línea (`height: 0.9em`, radio 999 px) entre palabras. Solo en el hero o en un titular por página.
- Largo de línea de cuerpo: 60–72 caracteres. Titulares: máximo 3 líneas en móvil.
- Nunca más de una familia tipográfica.

---

## 4. Espaciado, forma y elevación

### 4.1 Espaciado (base 4px)
`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 120`

| Token | Valor |
|---|---|
| `--page-max` | 1280px (contenido) · 900px (texto largo) |
| `--section-gap` | 96px escritorio · 72px tablet · 56px móvil |
| `--gutter` | 40px escritorio · 20px móvil |
| `--card-padding` | 32px (grandes) · 24px (estándar) · 36px (sand) |
| `--element-gap` | 8–24px · 24px entre tarjetas |

### 4.2 Radios

| Elemento | Radio |
|---|---|
| Fotos, hero, galería, muestras | **0** |
| Botones, inputs, tarjetas estándar | **4px** (nuevo) |
| Tarjetas destacadas (cotizador, proyecto estrella) | **12px** |
| Chips, etiquetas, punto/píldora de paginación | 999px |
| Controles circulares (flechas, play, WhatsApp) | 50% |

### 4.3 Elevación
- **Reposo:** `0 0.5px 2px rgba(0,0,0,.12)` o ninguna.
- **Hover de tarjeta:** `0 4px 16px rgba(51,51,51,.18)`.
- **Flotantes (WhatsApp, flechas):** `0 4px 8px rgba(51,51,51,.25)`.
- **Header al hacer scroll:** `0 5px 8px rgba(0,0,0,.12)`.
- Nada de sombras duras ni de color.

---

## 5. Componentes

### 5.1 Banda promocional (opcional)
Barra de 40px en `brand` con texto blanco 14px y un enlace subrayado. Configurable y **oculta por defecto**. Solo si el negocio tiene una oferta real (por ejemplo, "Visita técnica sin costo").

### 5.2 Navegación
- Barra blanca de 72px (`canvas` al hacer scroll con la sombra del header).
- Izquierda: logo o wordmark `[NOMBRE]`. Centro/derecha (escritorio): Servicios · Proyectos · Proceso · Cotizador · Contacto, en Figtree 16px peso 300.
- Extremo derecho: botón primario `Cotizar proyecto`.
- Móvil: logo + botón `Cotizar` + hamburguesa → menú a pantalla completa en `canvas`, enlaces en `title`.
- Enlace activo: subrayado 2px en `timber`.

### 5.3 Botones

| Variante | Sobre claro | Sobre foto o panel verde |
|---|---|---|
| **Primario** | Fondo `brand`, texto blanco, borde 2px `brand` | Fondo `accent` (lima), texto `#333` |
| **Secundario (contorno)** | Fondo blanco, texto y borde 2px `brand` | Fondo `overlay`, borde 2px blanco, texto blanco 700 |
| **Enlace con flecha** | Texto `brand` 16px 700 + chevron `leaf` | Texto blanco 700 + chevron blanco |

- Radio 4px · alto 48px (mínimo táctil 44px) · padding `12px 24px` · Figtree 16–18px peso 600.
- Hover: primario pasa a `brand-deep`; contorno rellena de `brand` con texto blanco. Transición `0.2s`.
- Foco: `outline: 3px solid var(--color-leaf); outline-offset: 3px` (sobre oscuro, blanco).

### 5.4 Tarjeta de servicio / proyecto
Fondo blanco, radio 4px, **foto superior sin radio**, cuerpo de 24–32px con título (`subheading`), descripción de dos líneas (`body-sm`, `text-muted`) y enlace con flecha. Sombra en reposo mínima; en hover sube a la de 4.3.

### 5.5 Tarjeta destacada (sand)
Fondo `sand`, radio 12px, padding 36px, sombra mínima. Para el resumen del cotizador y el proyecto estrella.

### 5.6 Tarjeta de beneficio (activa / inactiva)
Lista vertical al lado de una imagen grande. Activa: fondo blanco, borde izquierdo 4px `leaf`, sombra de reposo. Inactiva: texto atenuado y sin sombra. Se activan por hover o foco, sin autoplay.

### 5.7 Línea de pasos
Nodos circulares de 28px con número blanco sobre `leaf`, unidos por una línea horizontal de 2px `leaf` que se desvanece a transparente. Una columna por paso: icono lineal, título `subheading`, texto de 2–3 líneas. En móvil se apila en vertical con la línea a la izquierda.

### 5.8 Comparador antes/después
Imagen partida con manija circular de 44px y línea vertical de 2px blanca. Etiquetas `ANTES` / `DESPUÉS` en eyebrow blanco. A su lado, panel `panel` (`#ECEDE8`) con lista de ventajas con icono y un CTA verde. Operable con flechas del teclado y táctil. Sin autoplay.

### 5.9 Selector de acabado / muestras
Fila de muestras cuadradas de 72px (radio 0) con borde 1px `border-soft`; la activa lleva borde 2px `brand` y el nombre debajo. Al elegir una, cambia la foto grande de referencia. **Los acabados y materiales salen de la config del cliente; no inventes cuáles ofrece.**

### 5.10 Cifras destacadas
Panel `brand`, número en `figure` color `accent` y rótulo blanco 16px/600 centrado. **Solo si son datos reales**; si no, se omite la banda.

### 5.11 Inputs de formulario
Fondo blanco, borde 1px `border`, radio 4px, padding `12px 16px`, alto 52px, texto 18px `#333`. Label de 14px 600 arriba, color `text-muted`. Foco: borde 2px `brand` + outline `leaf`. Error: borde y mensaje en rojo accesible `#B3261E` con icono y texto (nunca solo color). Éxito: check en `leaf`.

### 5.12 Chips
Píldora (999px), borde 1px `border`, texto `#333` 14px. Activo: relleno `brand`, texto blanco. Para tipo de proyecto, filtros de galería y acabados.

### 5.13 Paginación y flechas
Puntos de 10px; el activo es píldora de 32×12px en `brand`. Flechas circulares blancas de 44px con la sombra flotante.

### 5.14 Divisor
Hairline `1px solid var(--color-hairline)`. Entre secciones manda el espacio, no la línea.

### 5.15 Botón flotante de WhatsApp
- Círculo 60px (56px móvil), fondo `--color-wa`, icono blanco SVG, `position: fixed; right: 20px; bottom: calc(20px + env(safe-area-inset-bottom))`, sombra flotante.
- Entrada tras 3 s o al pasar el hero. Tooltip al hover (escritorio): "Escríbenos por WhatsApp".
- `href="https://wa.me/{{WHATSAPP_NUMBER}}?text=..."` con mensaje prellenado, `target="_blank" rel="noopener"`, `aria-label="Escribir por WhatsApp"`.
- Se oculta en móvil mientras la barra inferior del cotizador o el formulario estén visibles.

---

## 6. Layout y ritmo

- Una columna centrada a **1280px**. Hero y galería pueden ir a sangre completa.
- **Ritmo de fondos:** foto hero → canvas (servicios) → band (proyectos) → canvas (por qué elegirnos) → band (proceso) → canvas (acabados) → sand en la tarjeta del cotizador sobre band → panel `brand` (cifras, solo si hay datos) → canvas (opiniones) → panel `brand` (contacto) → footer `#333`.
- Grid de 12 columnas escritorio, 4 móvil. Gap de tarjetas 24px.
- Breakpoints: `sm 640 · md 768 · lg 1024 · xl 1280`. Mobile-first. Nav sticky; sin mega-menú ni sidebar.

---

## 7. Estructura de la landing

> Copy como **borrador editable** en español. Lo que va entre `[ ]` o `{{ }}` es variable de `config/site.js`.

### 7.0 Banda promo (opcional) + navegación + botón flotante
Ver 5.1, 5.2 y 5.15.

### 7.1 Hero — *(foto a sangre)*
- Foto de una pérgola o deck terminado, al atardecer, integrado con jardín o paisaje. Altura `100svh`. **Sin velo**: la foto va ya oscurecida de origen en la zona del texto.
- **Eyebrow** blanco: `CARPINTERÍA A MEDIDA · [CIUDAD]`.
- **H1** (`display`, blanco, peso 400, abajo-izquierda): `Pérgolas, decks y carpintería a tu medida.` (opcional: dos imágenes en píldora insertadas, según 3.3).
- **Subtexto** (`body-lg`, blanco, máx. 520px): `Diseñamos, fabricamos e instalamos. Cotiza tu proyecto por WhatsApp.`
- **CTAs:** primario lima `Cotiza tu proyecto` (WhatsApp) + fantasma blanco `Ver proyectos`.
- **Barra de confianza** opcional: solo cifras reales de la config (años, proyectos, ciudad). Si no hay, solo `[CIUDAD] · COTIZACIÓN POR WHATSAPP`.

### 7.2 Servicios — *(canvas)*
- **Eyebrow** `01 — SERVICIOS` (número en `timber`). **H2** (`heading-xl`, 300): `Todo lo que tu espacio necesita, hecho en madera.`
- **3 tarjetas** (5.4), una por línea, con foto 4:5:
  1. **Pérgolas** — cubre y da vida a terrazas y jardines.
  2. **Decks y terrazas** — pisos y estructuras exteriores.
  3. **Carpintería arquitectónica** — puertas, closets, cocinas, revestimientos y muebles a medida.
- Los materiales y las medidas concretas salen de la config del cliente; **no inventes cuáles ofrece**.

### 7.3 Proyectos — *(band)*
- **Eyebrow** `02 — PROYECTOS`. **H2:** `Mira cómo cambia un espacio.`
- **Comparador antes/después** (5.8) con un proyecto estrella en tarjeta destacada.
- **Galería** (grid de 3 columnas, gap 24px) con filtros (chips): `Todos · Pérgolas · Decks · Carpintería`. Lightbox con flechas, `Esc`, contador y caption (`Proyecto — [Barrio], [Año]`).
- Cierre: enlace `Ver más en Instagram →` + `@[usuario]`.

### 7.4 Por qué elegirnos — *(canvas)*
- **H2** (`heading`): `Un trabajo hecho para durar.`
- Imagen grande a la izquierda (taller o detalle de unión) y **pila vertical de tarjetas de beneficio** (5.6) a la derecha. Textos editables: fabricación propia, medidas exactas, instalación incluida, garantía escrita. **Solo lo que el negocio realmente ofrezca.**

### 7.5 Cómo trabajamos — *(band)*
- **Eyebrow** `03 — PROCESO`. **H2:** `Del primer mensaje a tu terraza lista.`
- **Línea de pasos** (5.7): 1. Visita técnica → 2. Diseño y propuesta → 3. Fabricación en taller → 4. Instalación y entrega.

### 7.6 Acabados y muestras — *(canvas)*
- **Eyebrow** `04 — ACABADOS`. **H2:** `Elige el material y el acabado.`
- Selector de muestras (5.9) con foto grande de referencia. Texto: `Te llevamos muestras a tu visita técnica` (solo si es cierto).

### 7.7 Cotizador — *(band; tarjeta destacada sobre la banda)*
`id="cotizador"` — **sección de conversión principal.**
- **Eyebrow** `05 — COTIZA`. **H2:** `Cuéntanos tu proyecto. Te respondemos por WhatsApp.`
- **Controles:**
  1. Tipo de proyecto (chips): Pérgola · Deck o terraza · Carpintería arquitectónica · Otro.
  2. Medidas aproximadas (m² o metros lineales) con slider y campo numérico sincronizado.
  3. Acabado (muestras de 5.9).
  4. Extras (checkboxes, desde la config): iluminación, techo, baranda, instalación, otros.
- **Resumen** (tarjeta sand, sticky en escritorio): lista de selección. Si la config trae precios por m², muestra **rango estimado** (±15%); si no, `Cotización personalizada`. Texto: `Estimado de referencia. El precio final se confirma tras la visita técnica.`
- **CTA primario:** `Enviar cotización por WhatsApp` con mensaje prellenado y `encodeURIComponent`: `Hola, quiero cotizar {{proyecto}} de aprox. {{medidas}}, acabado {{acabado}}, extras: {{extras}}.`
- Accesibilidad: `aria-live="polite"` en el resumen, todos los controles con label, operable por teclado. Móvil: barra inferior fija con resumen y botón.

### 7.8 Cifras — *(panel verde; solo si hay datos reales)*
Tres cifras grandes en lima (5.10), por ejemplo años de experiencia, proyectos entregados y m² instalados. **Si el negocio no tiene datos, se omite toda la banda.**

### 7.9 Opiniones — *(canvas)*
- **Eyebrow** `06 — OPINIONES`. **H2:** `Lo que dicen quienes ya estrenaron su espacio.`
- Tres tarjetas blancas con estrellas, cita, nombre y proyecto. **Solo reseñas reales y verificables.** Mientras no existan, tarjetas claramente marcadas como `Reseña de ejemplo`.
- Controles con flechas circulares (5.13); sin autoplay.

### 7.10 Contacto — *(panel `brand`)*
`id="contacto"`
- Dos columnas en escritorio. **Izquierda** (texto blanco): eyebrow `RESPONDEMOS POR WHATSAPP`, H2 `Agenda tu visita técnica.`, datos de contacto (WhatsApp, correo, dirección o zona de cobertura, horario) e iconos de redes.
- **Derecha:** tarjeta blanca (radio 12px, padding 40px) con formulario: Nombre* · WhatsApp* · Tipo de proyecto (select)* · Medidas aproximadas · Ciudad o barrio · Mensaje · Consentimiento de datos (Ley 1581) con enlace a la política de privacidad*.
- CTA `Solicitar cotización` (primario verde) + enlace `o escríbenos por WhatsApp →`.
- Honeypot anti-spam, validación en cliente y servidor, estados *cargando / éxito / error* con fallback a WhatsApp. Endpoint por variable de entorno.
- `autocomplete` correcto (`name`, `tel`) e `inputmode="tel"`.

### 7.11 Footer — *(`#333333`)*
Logo, descripción breve, columnas (Servicios, Proyectos, Contacto, Legal) con título en mayúsculas 14px y filete superior, enlaces blancos de 14px, redes, legal y créditos. JSON-LD `LocalBusiness` (solo con datos reales).

### 7.12 Botón flotante de WhatsApp
Ver 5.15. Presente en toda la página.

---

## 8. Imagen y dirección de arte

- **Fotografía cálida, de oficio y de resultado:** terrazas, pérgolas y decks con luz de tarde e integrados con el paisaje; primeros planos de vetas, uniones y herrajes; manos trabajando en el taller; antes y después con el mismo encuadre y la misma luz.
- **Evitar:** stock genérico de "casa de revista", renders poco realistas, personas posando, filtros saturados, collages.
- **Contenedores:** fotos a sangre o en rectángulos **sin radio** (0). Las únicas imágenes redondeadas son las píldoras del titular y las tarjetas destacadas.
- **Contraste de texto sobre foto:** blanco sobre zonas oscuras; si el recorte no da ≥ 4.5:1, se reencuadra o se cambia la foto. Sin velo ni degradado.
- **Sin fotos propias del cliente:** placeholders `#ECEDE8` con la proporción correcta y `TODO: foto real`.
- **Formatos:** hero 16:9 y 9:16 en móvil; servicios 4:5; galería 4:3 y 1:1. AVIF/WebP con `srcset`, `aspect-ratio` fijo, `alt` descriptivo en español (por ejemplo, "Pérgola de madera sobre terraza al atardecer").
- **Iconografía:** trazo lineal de 1.5px, 24px, color `#333` o `brand`; sin iconos rellenos.

---

## 9. Movimiento

- **Filosofía:** sobrio y preciso en la interfaz, lento y natural en la imagen.
- Hover, foco y toggles: `0.2s cubic-bezier(0.4, 0, 0.2, 1)`.
- Revelado al scroll: `opacity 0→1` + `translateY(16px→0)`, 0.6s, un solo disparo.
- Hero: zoom lento `scale 1 → 1.03` en 10s.
- Prohibido: parallax agresivo, rebotes, 3D, autoplay con sonido y **carruseles con autoplay**.
- **`prefers-reduced-motion: reduce`** → desactivar todo lo anterior salvo cambios de color instantáneos.

---

## 10. Voz y contenido

- **Tono:** cálido, seguro y de oficio; claro, sin pretensión. Tuteo por defecto (configurable a "usted").
- **Fórmulas:** beneficio concreto primero (a tu medida, instalación incluida), detalle práctico después.
- **Evitar:** superlativos vacíos ("los mejores del mundo"), jerga técnica innecesaria, urgencias falsas y promesas de plazos que el negocio no haya confirmado.
- **CTAs consistentes:** `Cotiza tu proyecto` (principal), `Ver proyectos`, `Escribir por WhatsApp`, `Agenda tu visita técnica`.

---

## 11. Accesibilidad, rendimiento y SEO

**Accesibilidad (WCAG 2.2 AA)**
- Contraste ≥ 4.5:1 en texto normal. Lima solo con texto `#333`; `leaf` y `timber-light` nunca como texto sobre claro.
- Áreas táctiles ≥ 44×44px; foco visible; orden de tabulación lógico.
- HTML semántico (`header`, `nav`, `main`, `section[aria-labelledby]`, `footer`); un solo `h1`.
- Comparador, lightbox, selector de muestras y menú móvil operables por teclado, con `aria-*` correctos y focus trap.

**Rendimiento**
- LCP < 2.5s, CLS < 0.1, INP < 200ms. Hero con `fetchpriority="high"`.
- Imágenes AVIF/WebP con `srcset`; galería y comparador cargados de forma diferida.
- JS mínimo, sin librerías de animación pesadas. Tailwind compilado, no por CDN.

**SEO local**
- `<title>`: `[Negocio] | Pérgolas, decks y carpintería en [Ciudad]`.
- Meta description de 150–160 caracteres con CTA. Open Graph y Twitter Card 1200×630.
- JSON-LD `LocalBusiness` con `areaServed`, `telephone` y `sameAs` (solo datos reales). `lang="es-CO"`, `sitemap.xml`, `robots.txt`.
- Eventos de analítica: `click_whatsapp`, `submit_form`, `quote_started`, `quote_sent`.

---

## 12. Modo demo (para propuestas a prospectos)

Una bandera `DEMO_MODE` en la config. Cuando está activa:
- **Píldora discreta fija abajo a la izquierda:** `DEMO · Propuesta de diseño para [CLIENTE]`. En móvil, solo `DEMO` con icono "i" que despliega el texto. El despliegue dice quién la creó (`DEV_NAME`) y enlaza a `wa.me/{{DEV_WHATSAPP}}`.
- **Marca de agua** `DEMO` en diagonal al 3–4% de opacidad, `pointer-events: none`.
- **Anti-indexación:** `noindex,nofollow`, `robots.txt` con `Disallow: /`, sin JSON-LD de negocio real, título `DEMO — [Cliente]`.
- **Formulario simulado:** no envía datos; el cotizador y WhatsApp sí abren el chat del cliente.
- Build minificado, sin source maps.
- Con `DEMO_MODE = false` se quita todo lo anterior y se activa el envío real del formulario.

---

## 13. Do's & Don'ts (resumen)

### Do
- Fondo parchment y bandas crema; texto `#333`; nunca blanco puro como fondo grande.
- Titulares enormes y ligeros (300 sobre claro, 400 sobre foto), con tracking apretado.
- Fotos a sangre y sin radio; botones de 4px; tarjetas destacadas de 12px.
- Verde bosque para el CTA principal; lima solo sobre foto o panel verde.
- Alternar bandas y dejar 96px de aire entre secciones.
- Mostrar antes/después, proceso y herramientas (cotizador, acabados): es lo que convence en este nicho.

### Don't
- No azul ni naranja de Samara; no lima en superficies de lectura ni texto blanco sobre lima.
- No peso 700+; no más de una familia tipográfica; no negro puro de texto.
- No radios grandes ni sombras duras; no degradados decorativos.
- No carruseles con autoplay; no más de un CTA sólido por bloque.
- No inventar materiales, precios, cifras, sellos ni reseñas.

---

## 14. Checklist final para Claude Code

- [ ] Tokens cargados una sola vez; nada de colores, radios o sombras hardcodeados fuera de ellos.
- [ ] Fondos alternados según la sección 6; el blanco puro solo en tarjetas y formularios.
- [ ] Titulares: 300 sobre claro, 400 sobre foto, 600 solo en títulos medios y botones.
- [ ] Un solo CTA sólido por bloque; lima solo sobre foto o panel verde, con texto `#333`.
- [ ] Fotos sin radio; botones, inputs y tarjetas a 4px; tarjetas destacadas a 12px.
- [ ] Contraste AA verificado, incluido `timber` sobre canvas.
- [ ] Hero con CTA visible sin hacer scroll.
- [ ] Cotizador funcional con mensaje prellenado a WhatsApp.
- [ ] Comparador, galería y lightbox operables por teclado.
- [ ] Formulario con validación, honeypot, estados y fallback a WhatsApp.
- [ ] Todo lo del negocio vive en `config/site.js`.
- [ ] `DEMO_MODE` implementado y probado en ambos estados.
- [ ] Sin cifras, precios, materiales ni reseñas inventados.
- [ ] Lighthouse móvil: Performance ≥ 90, Accesibilidad ≥ 95, SEO ≥ 95.
- [ ] Probado en 360, 768, 1024 y 1440px.

---

## 15. Tokens (copiar tal cual)

### 15.1 CSS Custom Properties

```css
:root {
  /* Superficies */
  --color-canvas: #fdfdf7;
  --color-band: #f7f5f2;
  --color-sand: #f5f2de;
  --color-panel: #ecede8;
  --color-white: #ffffff;
  --color-footer: #333333;

  /* Texto */
  --color-text: #333333;
  --color-text-muted: #555555;
  --color-text-meta: #666666;

  /* Marca y acento */
  --color-brand: #084734;
  --color-brand-deep: #00493d;
  --color-accent: #cef17b;       /* lima: solo sobre foto o verde, texto #333 */
  --color-leaf: #6f9c32;         /* nodos, borde activo, flechas; no texto sobre claro */
  --color-timber: #8a5d33;       /* nuevo: números y filetes */
  --color-timber-light: #c9a57a; /* nuevo: solo ornamento */
  --color-error: #b3261e;

  /* Bordes y overlay */
  --color-border: #b3b3b3;
  --color-border-soft: #cccccc;
  --color-hairline: rgba(51, 51, 51, 0.12);
  --color-overlay: rgba(51, 51, 51, 0.25);

  /* Excepción funcional */
  --color-wa: #25d366;

  /* Tipografía */
  --font-sans: 'Figtree', 'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif;

  --text-display: clamp(48px, 7vw, 88px);       --leading-display: 1;     --tracking-display: -0.035em;
  --text-heading-xl: clamp(40px, 5.5vw, 72px);  --leading-heading-xl: 1;  --tracking-heading-xl: -0.03em;
  --text-heading: clamp(32px, 4vw, 48px);       --leading-heading: 1.1;   --tracking-heading: -0.02em;
  --text-title: clamp(24px, 2.6vw, 32px);       --leading-title: 1.25;    --tracking-title: -0.01em;
  --text-subheading: clamp(19px, 1.8vw, 23px);  --leading-subheading: 1.3; --tracking-subheading: -0.01em;
  --text-figure: clamp(40px, 5vw, 56px);        --leading-figure: 1;      --tracking-figure: -0.02em;
  --text-body-lg: 18px;  --leading-body-lg: 1.4;
  --text-body: 16px;     --leading-body: 1.5;
  --text-body-sm: 14px;  --leading-body-sm: 1.5;
  --text-button: 17px;   --leading-button: 1.2;
  --text-eyebrow: 14px;  --leading-eyebrow: 1.4;  --tracking-eyebrow: 1px;
  --text-caption: 12px;  --leading-caption: 1.5;

  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-semibold: 600;

  /* Espaciado (base 4px) */
  --space-1: 4px;  --space-2: 8px;  --space-3: 12px; --space-4: 16px;
  --space-6: 24px; --space-8: 32px; --space-12: 48px; --space-16: 64px;
  --space-24: 96px; --space-30: 120px;

  /* Layout */
  --page-max: 1280px;
  --page-narrow: 900px;
  --gutter: 40px;
  --section-gap: 96px;
  --card-padding: 24px;
  --card-padding-lg: 36px;

  /* Radios */
  --radius-none: 0;
  --radius-sm: 4px;      /* botones, inputs, tarjetas estándar (nuevo) */
  --radius-lg: 12px;     /* tarjetas destacadas */
  --radius-pill: 999px;
  --radius-round: 50%;

  /* Elevación */
  --shadow-rest: 0 0.5px 2px rgba(0, 0, 0, 0.12);
  --shadow-hover: 0 4px 16px rgba(51, 51, 51, 0.18);
  --shadow-float: 0 4px 8px rgba(51, 51, 51, 0.25);
  --shadow-header: 0 5px 8px rgba(0, 0, 0, 0.12);

  /* Movimiento */
  --ease-ui: cubic-bezier(0.4, 0, 0.2, 1);
  --dur-ui: 0.2s;
  --dur-reveal: 0.6s;
}

@media (max-width: 1023px) { :root { --section-gap: 72px; } }
@media (max-width: 767px)  { :root { --gutter: 20px; --section-gap: 56px; } }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### 15.2 Tailwind v4

```css
@import "tailwindcss";

@theme {
  --font-sans: 'Figtree', 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;

  --color-canvas: #fdfdf7;
  --color-band: #f7f5f2;
  --color-sand: #f5f2de;
  --color-panel: #ecede8;
  --color-footer: #333333;
  --color-ink: #333333;
  --color-ink-muted: #555555;
  --color-ink-meta: #666666;
  --color-brand: #084734;
  --color-brand-deep: #00493d;
  --color-accent: #cef17b;
  --color-leaf: #6f9c32;
  --color-timber: #8a5d33;
  --color-timber-light: #c9a57a;
  --color-line: #b3b3b3;
  --color-wa: #25d366;

  --radius-sm: 4px;
  --radius-lg: 12px;

  --shadow-rest: 0 0.5px 2px rgba(0, 0, 0, 0.12);
  --shadow-hover: 0 4px 16px rgba(51, 51, 51, 0.18);
  --shadow-float: 0 4px 8px rgba(51, 51, 51, 0.25);

  --container-page: 1280px;
  --container-prose: 900px;
}
```

### 15.3 Snippets de referencia

```css
/* Botón primario sobre claro */
.btn-primary { background: var(--color-brand); color: #fff; border: 2px solid var(--color-brand);
  min-height: 48px; padding: 12px 24px; border-radius: var(--radius-sm);
  font: 600 17px/1.2 var(--font-sans);
  transition: background-color var(--dur-ui) var(--ease-ui); }
.btn-primary:hover { background: var(--color-brand-deep); }

/* Botón primario sobre foto o panel verde (lima) */
.on-photo .btn-primary { background: var(--color-accent); color: var(--color-text); border-color: var(--color-accent); }

/* Botón secundario sobre claro / sobre foto */
.btn-outline { background: #fff; color: var(--color-brand); border: 2px solid var(--color-brand);
  min-height: 48px; padding: 12px 24px; border-radius: var(--radius-sm); font: 600 17px/1.2 var(--font-sans); }
.on-photo .btn-outline { background: var(--color-overlay); color: #fff; border-color: #fff; font-weight: 700; }

/* Titular ligero sobre claro */
.h-light { font: 300 var(--text-heading-xl)/var(--leading-heading-xl) var(--font-sans);
  letter-spacing: var(--tracking-heading-xl); color: var(--color-text); }

/* Eyebrow */
.eyebrow { font: 600 14px/1.4 var(--font-sans); letter-spacing: 1px; text-transform: uppercase; color: var(--color-text-muted); }
.eyebrow .num { color: var(--color-timber); }

/* Tarjeta de servicio */
.card { background: #fff; border-radius: var(--radius-sm); box-shadow: var(--shadow-rest);
  transition: box-shadow var(--dur-ui) var(--ease-ui); }
.card:hover { box-shadow: var(--shadow-hover); }
.card img { display: block; width: 100%; border-radius: 0; }

/* Tarjeta destacada (sand) */
.card-sand { background: var(--color-sand); border-radius: var(--radius-lg);
  padding: var(--card-padding-lg); box-shadow: var(--shadow-rest); }

/* Tarjeta de beneficio activa */
.benefit.is-active { background: #fff; border-left: 4px solid var(--color-leaf); box-shadow: var(--shadow-rest); }

/* Chip */
.chip { border: 1px solid var(--color-border); border-radius: var(--radius-pill); padding: 8px 16px; font-size: 14px; }
.chip[aria-pressed="true"] { background: var(--color-brand); color: #fff; border-color: var(--color-brand); }

/* Input */
.input { background: #fff; border: 1px solid var(--color-border); border-radius: var(--radius-sm);
  min-height: 52px; padding: 12px 16px; font-size: 18px; color: var(--color-text); }
.input:focus { outline: 3px solid var(--color-leaf); outline-offset: 2px; border-color: var(--color-brand); }

/* WhatsApp flotante */
.wa-float { position: fixed; right: 20px; bottom: calc(20px + env(safe-area-inset-bottom, 0px));
  width: 60px; height: 60px; border-radius: var(--radius-round); background: var(--color-wa);
  display: grid; place-items: center; box-shadow: var(--shadow-float); z-index: 50; }
```