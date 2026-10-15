// Toda la información específica del negocio vive aquí. Cambiar de cliente = cambiar este archivo y las fotos.
// Valores con {{...}} o TODO son placeholders: no son datos reales.

// Fotos de ejemplo de Unsplash (licencia Unsplash). TODO: reemplazar por fotos reales del cliente.
const U = (id) => `https://images.unsplash.com/${id}`

export default {
  // true = propuesta para prospecto (noindex, marca DEMO, formulario simulado). false = sitio real.
  demoMode: true,

  demo: {
    clientName: 'Arboria Carpintería & Exteriores',
    devName: 'el equipo de diseño',  // TODO: quién creó la propuesta
    devWhatsapp: '573227454759',   // número del desarrollador (dígitos, con 57, sin +)
  },

  business: {
    name: 'Arboria Carpintería & Exteriores',
    city: 'Bogotá',
    areaServed: 'Bogotá y alrededores', // TODO: confirmar zona de cobertura
    whatsapp: '573227454759',        // número de contacto (dígitos, con 57, sin +)
    phoneDisplay: '+57 322 745 4759',
    email: 'hola@tutaller.example',   // TODO: correo real
    address: 'Visitas técnicas a domicilio', // TODO: dirección o zona reales
    hours: 'Lunes a viernes, 8:00 a. m. a 5:00 p. m.', // TODO: horario real
    hasRealData: false,               // true cuando los datos de arriba sean reales (activa JSON-LD)
  },

  // Banda promocional: solo con una oferta real.
  promo: { enabled: false, text: 'Visita técnica sin costo', linkText: 'Cotiza ahora', href: '#cotizador' },

  social: { instagram: '', facebook: '', tiktok: '' }, // TODO: URLs reales
  instagramHandle: 'tutaller.demo', // TODO: usuario real

  seo: {
    description: 'Pérgolas, decks y carpintería arquitectónica a tu medida en Bogotá. Diseñamos, fabricamos e instalamos. Cotiza tu proyecto por WhatsApp.',
    siteUrl: '', // TODO: URL final, para sitemap
  },

  hero: {
    eyebrow: 'CARPINTERÍA A MEDIDA',
    title: 'Pérgolas, decks y carpintería a tu medida.',
    subtitle: 'Diseñamos, fabricamos e instalamos. Cotiza tu proyecto por WhatsApp.',
    alt: 'Pérgola de madera al atardecer, con luz cálida y vegetación al fondo', // TODO: ajustar a la foto real
    photo: 'hero',
  },

  // Cifras reales. Vacío = se omite la banda y la barra de confianza del hero.
  metrics: [], // ej. [{ value: '{{N}}', label: 'años de experiencia' }]

  services: [
    { id: 'pergolas', name: 'Pérgolas', desc: 'Cubre y da vida a terrazas y jardines.', photo: 'pergola' },
    { id: 'decks', name: 'Decks y terrazas', desc: 'Pisos y estructuras exteriores.', photo: 'deck' },
    { id: 'carpinteria', name: 'Carpintería arquitectónica', desc: 'Puertas, closets, cocinas, revestimientos y muebles a medida.', photo: 'joinery' },
  ],

  // TODO: el cliente define qué materiales y acabados ofrece. No inventar.
  finishes: [
    { id: 'a1', name: 'Natural', photo: 'pergola' },      // TODO: acabados reales del cliente
    { id: 'a2', name: 'Tono miel', photo: 'deck' },
    { id: 'a3', name: 'Tono oscuro', photo: 'joinery' },
  ],
  finishesNote: 'Te llevamos muestras a tu visita técnica', // TODO: dejar solo si es cierto; si no, ''

  extras: ['Iluminación', 'Techo', 'Baranda', 'Instalación', 'Otros'],

  projectTypes: [
    { id: 'pergola', label: 'Pérgola', unit: 'm²' },
    { id: 'deck', label: 'Deck o terraza', unit: 'm²' },
    { id: 'carpinteria', label: 'Carpintería arquitectónica', unit: 'm lineales' },
    { id: 'otro', label: 'Otro', unit: 'm²' },
  ],

  // Precio de referencia por unidad en COP, por tipo de proyecto. null = "Cotización personalizada".
  // TODO: solo con datos del cliente. ej. { pergola: 0, deck: 0 } (se muestra rango ±15%).
  pricePerUnit: null,

  starProject: {
    title: 'Proyecto estrella',
    text: 'Una terraza renovada, antes y después con el mismo encuadre.', // TODO: texto real
    place: 'Usaquén, 2025',            // TODO: barrio y año reales
    before: 'deckWorn', after: 'deck', // TODO: fotos reales "antes" y "después" con el mismo encuadre (Unsplash de ejemplo)
    advantages: ['Fabricación a medida', 'Instalación incluida', 'Garantía escrita'], // TODO: solo lo que el negocio ofrezca
  },

  gallery: [
    { photo: 'pergola', cat: 'Pérgolas', alt: 'Pérgola de madera entre vegetación' },
    { photo: 'deck', cat: 'Decks', alt: 'Deck de madera al aire libre' },
    { photo: 'joinery', cat: 'Carpintería', alt: 'Detalle de carpintería en madera' },
    { photo: 'pergola', cat: 'Pérgolas', alt: 'Estructura de pérgola de madera' },
    { photo: 'deck', cat: 'Decks', alt: 'Terraza con piso de madera' },
    { photo: 'joinery', cat: 'Carpintería', alt: 'Mueble de madera a medida' },
  ],
  galleryCaption: 'Usaquén, 2025', // TODO: barrio y año reales de cada proyecto

  // TODO: solo lo que el negocio realmente ofrezca
  benefits: [
    { title: 'Fabricación propia', text: 'Cada pieza se hace en taller, a tu medida.' },
    { title: 'Medidas exactas', text: 'Tomamos medidas en sitio antes de diseñar.' },
    { title: 'Instalación incluida', text: 'Nuestro equipo instala y entrega el proyecto.' },
    { title: 'Garantía escrita', text: 'Cada proyecto se entrega con su garantía por escrito.' },
  ],
  benefitsPhoto: 'joinery',

  process: [
    { title: 'Visita técnica', text: 'Vamos a tu espacio, tomamos medidas y escuchamos lo que necesitas.' },
    { title: 'Diseño y propuesta', text: 'Te entregamos una propuesta clara con diseño y alcance.' },
    { title: 'Fabricación en taller', text: 'Fabricamos las piezas a la medida de tu proyecto.' },
    { title: 'Instalación y entrega', text: 'Instalamos y te entregamos el espacio listo.' },
  ],

  // Reseñas de ejemplo: reemplazar por reseñas reales y verificables.
  reviews: [
    { sample: true, stars: 5, quote: 'Reseña de ejemplo: aquí irá el testimonio real de un cliente.', name: 'Nombre del cliente', project: 'Proyecto de ejemplo' },
    { sample: true, stars: 5, quote: 'Reseña de ejemplo: aquí irá el testimonio real de un cliente.', name: 'Nombre del cliente', project: 'Proyecto de ejemplo' },
    { sample: true, stars: 5, quote: 'Reseña de ejemplo: aquí irá el testimonio real de un cliente.', name: 'Nombre del cliente', project: 'Proyecto de ejemplo' },
  ],

  privacyUrl: '#privacidad', // TODO: política de tratamiento de datos (Ley 1581)
  legal: '© 2026 Arboria Carpintería & Exteriores. Todos los derechos reservados.', // TODO: razón social y año reales
  formEndpoint: import.meta.env?.VITE_FORM_ENDPOINT || '', // endpoint por variable de entorno

  // IDs de foto de Unsplash. TODO: reemplazar por fotos del cliente (cada una: srcset + alt).
  photos: {
    hero: U('photo-1775541398290-b842ee31b545'),    // Unsplash: pérgola de madera al atardecer, zona izquierda oscura. TODO: foto real
    deckWorn: U('photo-1775884889860-c29c2d898588'), // Unsplash: deck gastado ("antes"). TODO: foto real del cliente
    pergola: U('photo-1744974222352-dd077085f60e'), // Unsplash: jardín con pérgola. TODO: foto real
    deck: U('photo-1574120583586-de8847ae992c'),    // Unsplash: terraza de madera. TODO: foto real
    joinery: U('photo-1683115099191-51e617fc5ff1'), // Unsplash: herramientas de taller. TODO: foto real
    structure: U('photo-1666442129770-bc5a4292e5a5'), // Unsplash: estructura de madera. TODO: foto real
  },
}
