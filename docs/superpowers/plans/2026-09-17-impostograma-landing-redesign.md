# Impostograma Landing Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans or superpowers:subagent-driven-development. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the Impostograma static landing into a Finpay-inspired, DM Sans, `#250D7D`/`#582AFE` page with a GSAP scroll-linked journey, reusing all inventory copy.

**Architecture:** Single-page HTML + CSS variables + vanilla JS; GSAP ScrollTrigger via CDN for journey path only; HTML mock panels instead of missing PNGs.

**Tech Stack:** HTML5, CSS3, JavaScript, GSAP 3 + ScrollTrigger (CDN), DM Sans, Font Awesome (sparing)

**Spec:** `docs/superpowers/specs/2026-09-17-impostograma-landing-redesign-design.md`

## Global Constraints

- Colors: `--deep #250D7D`, `--bright #582AFE`, gradient deep→bright only on Pro plan + final CTA + subtle hero wash
- Font: DM Sans 400/500/700/800
- Copy: from `content/inventory.json` only
- Journey path stroke on dark: bright → light (not deep→bright)
- Unique anchors; no duplicate IDs; one footer
- `prefers-reduced-motion`: full path, no scrub
- No React; GitHub Pages static
- Do not commit unless user asks

## File map

| File | Role |
|------|------|
| `index.html` | Full page structure |
| `style.css` | Tokens + layout + responsive |
| `script.js` | Header, ticker, modules, pricing math, GSAP journey |
| `.github/agents/impostograma-landing-page.agent.md` | Align agent with new system |
| `.vscode/extensions.json` | Live Preview + HTML CSS Support |

---

### Task 1: HTML shell + all sections

**Files:** Create/overwrite `index.html`

- [ ] Build semantic page: header, hero, ticker, pillars, bento, journey (SVG + 4 nodes), modules, about (`#sobre`), testimonials, pricing, CTA, footer
- [ ] Unique IDs per spec page map + `#sobre`
- [ ] Embed inventory copy verbatim
- [ ] Hero mock = HTML/CSS panels (no missing PNGs)
- [ ] GSAP + ScrollTrigger script tags before `script.js`

### Task 2: CSS design system + layouts

**Files:** Create/overwrite `style.css`

- [ ] Tokens from spec
- [ ] Header sticky, hero split, ticker, pillars, bento grid, journey, modules, pricing, CTA, footer
- [ ] Responsive breakpoints ~900px / 640px
- [ ] Reduced-motion overrides

### Task 3: JS interactions

**Files:** Create/overwrite `script.js`

- [ ] Header scrolled class
- [ ] Ticker clone loop
- [ ] Modules tab render
- [ ] Billing toggle with annual `Math.round(monthly * 0.8)`
- [ ] GSAP ScrollTrigger journey path + node `.is-active`
- [ ] Smooth nav scroll
- [ ] Guard when GSAP missing / reduced motion

### Task 4: Agent + extensions

**Files:** Modify agent md + `.vscode/extensions.json`

- [ ] Document new colors, DM Sans, GSAP allowed
- [ ] Recommend `ms-vscode.live-server` and `ecmel.vscode-html-css`

### Task 5: Verify

- [ ] Open page locally / check structure
- [ ] Confirm no duplicate IDs
- [ ] `graphify update .` if graphify-out exists

---

## Spec coverage check

Hero, pillars, bento, journey, modules, testimonials, pricing+annual, CTA, footer, tokens, a11y reduced-motion, agent/extensions — all tasked.
