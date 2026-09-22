# Impostograma Landing Redesign — Design Spec

**Date:** 2026-09-17  
**Status:** Draft for user review  
**Source content:** `content/inventory.json`, `content/CONTEUDO.md`  
**Reference vibe:** Finpay-style SaaS landing (whitespace, clear hierarchy, product mockups)  
**Chosen approach:** HTML/CSS/JS static site + GSAP ScrollTrigger (CDN)

---

## 1. Goal

Restructure the Impostograma marketing landing into a professional, serious, interactive page that:

- Keeps all existing marketing copy (from the content inventory)
- Uses brand colors `#250D7D` and `#582AFE` with a deep→bright gradient
- Feels like Finpay (clean B2B SaaS), not a purple full-bleed template or “AI slop”
- Features a scroll-linked journey where steps connect via an animated SVG path
- Remains deployable on GitHub Pages with minimal dependencies

**Non-goals (this phase):**

- Building the real product app / auth
- New marketing copy beyond inventory (except minor UI labels)
- React/Vite migration
- Full CMS

---

## 2. Tech architecture

| Piece | Decision |
|--------|----------|
| Markup | Rewrite `index.html` with unique section IDs |
| Styles | Rewrite `style.css` around CSS variables |
| Behavior | Rewrite `script.js`: modules tabs, pricing toggle (with annual math), GSAP journey |
| Motion lib | GSAP 3 + ScrollTrigger via CDN |
| Content source | `content/inventory.json` is the canonical copy archive; HTML embeds the same text |
| Fonts | **DM Sans** (Google Fonts: 400, 500, 700, 800) |
| Icons | Keep Font Awesome 6 sparingly, or replace with simple inline SVG line icons in pillars |
| Deploy | GitHub Pages (unchanged) |

**Files to update:**

- `index.html`, `style.css`, `script.js`
- `.github/agents/impostograma-landing-page.agent.md` — allow GSAP; lock new color tokens + DM Sans
- `.vscode/extensions.json` — recommend Live Preview + HTML CSS Support
- Keep `content/` as archive (do not delete)

**Reduced motion:** If `prefers-reduced-motion: reduce`, draw the journey path fully and skip scroll scrubbing; keep instant module/pricing state changes.

---

## 3. Design tokens

```css
:root {
  --deep: #250D7D;
  --bright: #582AFE;
  --gradient: linear-gradient(135deg, #250D7D 0%, #582AFE 100%);
  --bg: #FAFAFC;
  --surface: #FFFFFF;
  --surface-muted: #F3F2F8;
  --ink: #14122B;
  --muted: #5C5A72;
  --line: #E4E1F0;
  --radius: 16px;
  --radius-lg: 24px;
  --shadow: 0 18px 40px rgba(37, 13, 125, 0.10);
  --font: "DM Sans", system-ui, sans-serif;
}
```

**Usage rules:**

- Page default background: `--bg` (not full purple)
- Dark bands: `--deep` only (journey section, optional mockup chrome)
- Primary CTAs / active states: `--bright`
- Gradient only on: featured pricing card, final CTA band, and subtle hero corner wash
- Journey path stroke on dark band: `#582AFE` → soft lavender/white (readable on `--deep`; not deep→bright which would vanish into the background)
- No purple glow, no heavy multi-layer shadows, no emoji decoration

---

## 4. Page map

| # | Section | Anchor | Notes |
|---|---------|--------|--------|
| 0 | Header | — | Sticky, blur after scroll |
| 1 | Hero | `#inicio` | Finpay split: copy left, mock stack right |
| 2 | Ticker | — | Obligation names marquee |
| 3 | Pillars | `#funcionalidades` | 3 columns, light |
| 4 | Bento | `#resultados` | Metrics + mini-flow + mini panel |
| 5 | Journey | `#como-funciona` | Dark; SVG scroll-link (hero interaction) |
| 6 | Modules | `#modulos` | 6-item list + detail pane |
| 7 | Testimonials | `#depoimentos` | 3 quotes |
| 8 | Pricing | `#precos` | 3 plans; annual toggle applies −20% |
| 9 | Final CTA | `#contato` | Gradient band |
| 10 | Footer | — | 4 link columns |

Fix current bugs: duplicate IDs, empty placeholder sections, dual footers.

---

## 5. Section specs

### 5.1 Header

- Logo left (violet asset on light; white asset on dark sections if header overlays — prefer always light header so violet logo stays)
- Nav center: Sobre · Funcionalidades · Como funciona · Módulos · Preços (smooth scroll to unique anchors)
- Right: Instagram · “Entrar” text → `https://impostograma.com/` · button “Começar grátis” → `/teste-gratis`
- Sticky: white/95% + backdrop blur after ~12px scroll

### 5.2 Hero

- Headline / sub / metrics / CTAs from inventory
- Primary CTA filled `--bright`; secondary outline `--deep`
- No email field in hero (B2B seriousness)
- Right: stacked product mock (deliveries panel aesthetic); deep card chrome + bright accents
- Subtle corner gradient wash only — not a purple hero slab
- Mobile: stack; mock below copy; full-width CTAs

### 5.3 Ticker

- Same obligation list as inventory
- Quiet gray strip; CSS loop; duplicate nodes for seamless scroll (existing pattern)

### 5.4 Pillars

- Tag + “Menos portal. Mais resultado.”
- Three items: Hub operacional · Processos e entregas · Automações fiscais/contábeis
- Line icons; no heavy cards (border or simple separation only)
- BPO Financeiro deferred to modules/bento — not a fourth pillar

### 5.5 Bento

- Background `--surface-muted`
- Asymmetric grid:
  - Large: `+40%` / `−70%` + short outcome line
  - Medium: company → obligation → delivery mini-flow
  - Wide: static mini deliveries list with statuses
- Minimal motion; do not compete with journey

### 5.6 Journey (primary interaction)

- Background `--deep`, light text
- Headline: “Do cadastro à entrega em 4 passos”
- Four nodes from inventory how-it-works steps
- Vertical SVG path (desktop) / simplified vertical (mobile)
- GSAP ScrollTrigger scrubs `stroke-dashoffset`; active node fills `--bright`
- Path stroke: bright → light (see tokens); path ends at step 4 — does not continue into modules
- Copy per node: title + one paragraph from inventory

### 5.7 Modules

- List 01–06 + detail panel; content from `script.js` modules array / inventory
- Active item uses `--bright`
- Click to switch; optional keyboard up/down on desktop

### 5.8 Testimonials

- Three quotes from inventory
- Clean cards or open layout; avoid loud gold star clusters (subtle or omit)

### 5.9 Pricing

- Toggle Mensal / Anual (−20%)
- **Behavior:** annual mode shows `floor(monthly * 0.8)` (or equivalent display) for Starter/Pro; Enterprise stays “Sob consulta”
- Starter & Enterprise: white surfaces
- Profissional: `--gradient` surface, “Mais popular”, light text
- Feature lists from inventory

### 5.10 Final CTA + Footer

- CTA: gradient rounded band; inventory headline/sub/buttons/LGPD note
- Footer: `--surface-muted`; violet logo; tagline; columns Plataforma / Empresa / Suporte / Legal; © 2026
- Unbuilt routes may use `#` stubs without inventing new pages

---

## 6. Interaction & data flow

```
Scroll position
  → ScrollTrigger on journey section
  → update path draw progress
  → toggle .is-active on nodes 1..4

Click module item
  → set active index
  → render detail from modules[] 

Click billing toggle
  → set billingMode monthly|annual
  → update visible prices for Starter/Pro
```

No backend. No form posts in this phase (CTAs are links).

---

## 7. Accessibility & QA

- Unique landmarks and heading order
- Focus visible on buttons/links
- Contrast: white text only on `--deep` or gradient regions dark enough for AA
- Keyboard: nav, module list, billing toggle
- Manual checks: desktop 1280+, tablet, mobile 375; reduced-motion on
- Visual check against Finpay reference: whitespace, not purple-on-purple chrome

---

## 8. Agent & tooling updates

- Landing agent: new tokens, DM Sans, GSAP allowed, still prefer surgical edits after rewrite lands
- VS Code recommendations: Live Preview (`ms-vscode.live-server` or Cursor equivalent) + HTML CSS Support

---

## 9. Success criteria

1. Page reads as one professional Impostograma brand composition (not Finpay clone with teal leftovers)
2. Journey line visibly links steps while scrolling
3. All inventory copy present (no silent content loss)
4. Pricing annual toggle changes numbers
5. No duplicate IDs / leftover empty sections / dual footers
6. Lighthouse-friendly: no layout thrash; GSAP only for journey + light reveals if used

---

## 10. Open points (resolved in brainstorm)

| Topic | Decision |
|--------|----------|
| Stack | A — HTML/CSS + GSAP |
| Font | DM Sans |
| Hero email field | No |
| Scroll line scope | Journey section only |
| Colors | `#250D7D` → `#582AFE` |
| Content | Reuse inventory; no rewrite |

---

## 11. Next step

After user approves this spec file, create an implementation plan via the writing-plans skill, then execute the rewrite of `index.html` / `style.css` / `script.js`.
