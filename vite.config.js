import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import site from './config/site.js'

const demo = process.env.VITE_DEMO_MODE !== undefined
  ? process.env.VITE_DEMO_MODE === 'true'
  : site.demoMode

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// Inyecta título, meta, JSON-LD, robots y sitemap según config/site.js y DEMO_MODE.
function siteHead() {
  const { business, seo, demo: d } = site
  const title = demo ? `DEMO — ${d.clientName}` : `${business.name} | Pérgolas, decks y carpintería en ${business.city}`
  const jsonld = demo || !business.hasRealData ? '' : `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.name,
    areaServed: business.areaServed,
    telephone: business.phoneDisplay,
    sameAs: Object.values(site.social).filter(Boolean),
  })}</script>`
  const hero = site.photos.hero
  const q = (w, h) => `${hero}?auto=format&fit=crop&q=60&w=${w}${h ? `&h=${h}` : ''}`
  const preload = `<link rel="preconnect" href="https://images.unsplash.com" crossorigin />
    <link rel="preload" as="image" media="(max-width: 767px)" href="${q(600, 1500)}" fetchpriority="high" />
    <link rel="preload" as="image" media="(min-width: 768px)" href="${q(2000)}" fetchpriority="high" />`
  return {
    name: 'site-head',
    transformIndexHtml(html) {
      return html
        .replace('%TITLE%', esc(title))
        .replaceAll('%DESCRIPTION%', esc(seo.description))
        .replaceAll('%TITLE_OG%', esc(title))
        .replace('%ROBOTS%', demo ? '<meta name="robots" content="noindex,nofollow" />' : '')
        .replace('%JSONLD%', jsonld)
        .replace('</head>', `${preload}
  </head>`)
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: demo ? 'User-agent: *\nDisallow: /\n' : 'User-agent: *\nAllow: /\n' })
      if (!demo && seo.siteUrl) {
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${seo.siteUrl}</loc></url></urlset>\n` })
      }
    },
  }
}

export default defineConfig({
  plugins: [tailwindcss(), siteHead()],
  define: { __DEMO__: JSON.stringify(demo) },
  build: { sourcemap: false },
})
