# Mischief Manager

**Mischief Manager** helps people notice **impulse spending** before it becomes a habit—especially if you live with **ADHD**, **bipolar disorder**, or similar patterns that can amplify “add to cart” moments. The focus is **awareness**: triggers, cooldowns, and reflection—not shame, paywalls, or pretending an app can diagnose you.

A related direction in this repo is an **ethical ad filter** concept: user-controlled sensitivity and policy so high-pressure or predatory ads are easier to avoid or document, paired with optional **URL safety** signals (e.g. [SusLink](docs/ethical-ad-filter/suslink-integration-spike.md) via TiltCheck) where it fits.

**Live site (GitHub Pages):** [tiltcheck-me.github.io/Mischief-Manager](https://tiltcheck-me.github.io/Mischief-Manager/)  
**Repository:** [TiltCheck-ME/Mischief-Manager](https://github.com/TiltCheck-ME/Mischief-Manager)

---

## What’s in this repository

| Area | Purpose |
| --- | --- |
| [`reactSetup/`](reactSetup/) | **App prototype** — React, TypeScript, Vite, Tailwind (habit / impulse UI) |
| [`docs/ethical-ad-filter/`](docs/ethical-ad-filter/) | **Ethical ad filter** — taxonomy, ADR, evidence bundles, SusLink notes |
| [`schemas/`](schemas/) | JSON Schema for **policy packs** and **evidence exports** |
| [`examples/`](examples/) | Example policy JSON |
| [`planning/roadmap.md`](planning/roadmap.md) | Roadmap notes |
| [`docs/setup.md`](docs/setup.md) | Dev setup (to be expanded) |

Design index for the filter work: [`docs/ethical-ad-filter/README.md`](docs/ethical-ad-filter/README.md).

---

## App prototype (today)

The Vite app is **early-stage**: useful for demos and iteration; **data is mostly session-local** until persistence is wired up.

- **Spending / urge logging** with emotional context  
- **Trigger tagging** (what was going on before a purchase or near-miss)  
- **Cooldown timers** and quick actions when you feel pulled to spend  
- **Insights-style views** for patterns (trends depend on what you log)  

Roadmap items (not all built yet) are captured in [`planning/roadmap.md`](planning/roadmap.md)—treat marketing copy on the Pages site as **direction**, not a feature guarantee.

---

## Ethical ad filter (research & architecture)

Work in **`docs/ethical-ad-filter/`** and **`schemas/`** defines:

- A **v1 taxonomy** of high-harm ad categories and tiers (`block` / `blur` / `allow + log`)  
- An **MVP direction** (browser / WebView + policy JSON) documented in the ADR  
- **Evidence bundle** shape for optional accountability exports  
- How **SusLink**-style URL risk could **merge** with policy (noncommercial / research-friendly; no clinical claims)

---

## Degen edition (positioning)

*Outsmart the urge. Protect the stack. Learn your patterns.*

The same **awareness-first** idea can speak to people who gamble: optional guardrails, tilt and “rinse” reflection, and charts that **inform** rather than lock accounts. Nothing here replaces responsible gambling resources or platform rules—it’s a product direction, not a license to ignore harm.

---

## Local development

```bash
cd reactSetup
npm install
npm run dev
```

Stack: **React**, **TypeScript**, **Tailwind**, **Vite**, **Lucide**.

---

## GitHub Pages

The public landing page is built from the **`gh-pages`** branch (`index.html`, `style.css`). After you change those files, push **`gh-pages`** so [the site](https://tiltcheck-me.github.io/Mischief-Manager/) updates (usually within a minute or two).

---

## License

[PolyForm Noncommercial 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0/) — noncommercial use and modification are allowed; **commercial** use needs permission from the copyright holder. See [`LICENSE`](LICENSE).
