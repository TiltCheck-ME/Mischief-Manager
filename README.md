# Mischief Manager

**Mischief Manager** is a habit-tracking and awareness app for people who want to understand **impulse spending**—especially alongside ADHD, bipolar disorder, or similar patterns. It focuses on **triggers, cooldowns, and reflection**, not shame or hard blocks.

**Repository:** [github.com/TiltCheck-ME/Mischief-Manager](https://github.com/TiltCheck-ME/Mischief-Manager)

---

## In this repo

| Area | What it is |
| --- | --- |
| [`reactSetup/`](reactSetup/) | React + TypeScript + Vite + Tailwind UI (primary app prototype) |
| [`docs/ethical-ad-filter/`](docs/ethical-ad-filter/) | **Ethical ad filter** specs: taxonomy, ADR, evidence bundles, SusLink integration notes |
| [`schemas/`](schemas/) | JSON Schemas for policy artifacts and evidence bundles |
| [`examples/`](examples/) | Example policy JSON |
| [`planning/roadmap.md`](planning/roadmap.md) | High-level roadmap |
| [`docs/setup.md`](docs/setup.md) | Setup notes (to be expanded) |

Policy and accountability design index: [`docs/ethical-ad-filter/README.md`](docs/ethical-ad-filter/README.md).

---

## Core features (app)

### Habit tracking and pattern recognition

- **Impulse spending tracker** — log purchases with emotional context  
- **Trigger identification** — what led to the purchase (emotions, situations, time)  
- **Pattern analysis** — surface spending patterns and risk factors  
- **Emotional state tracking** — mood, stress, energy around purchases  

### Real-time support

- **Cooldown periods** — 5 / 10 / 15 minute pause when triggered  
- **Quick actions** — fast paths for common scenarios  
- **Mindful interventions** — breathing and reflection during cooldowns  

### Insights

- **Personalized analytics** — trends and trigger patterns  
- **Time-based insights** — higher-risk times of day  
- **Success tracking** — log resisting impulses  
- **Prevention strategies** — suggestions from your patterns  

---

## Degen edition (positioning)

*Outsmart the urge. Protect the stack. Learn your patterns.*

A **behavioral awareness** angle for people who gamble: same philosophy as Mischief Manager (awareness, optional guardrails, user control)—applied to **avoiding rinse cycles** and tilt without telling people they “can’t play.”

**Highlights**

- Max bet awareness and soft, reflective warnings  
- Optional auto-vault of a % of winnings (visible, user-controlled)  
- Session tagging, tilt and “rinse” history, game-type trends  
- Budget guardrails as **charts and reflection**, not locks  
- Post-rinse optional prompts and trends—**opt-in**  

This is not about restriction; it’s about **how** you play and building self-trust.

---

## Ethical ad filter (product architecture)

Cross-cutting work on **user-controlled ad sensitivity**, **policy JSON**, **evidence exports**, and optional **SusLink** URL signals lives under `docs/ethical-ad-filter/` and `schemas/`. It complements the app’s mission (reducing harm from predatory or high-pressure ads) without inferring clinical diagnoses.

---

## Getting started (local dev)

```bash
cd reactSetup
npm install
npm run dev
```

See [`docs/setup.md`](docs/setup.md) for environment notes.

## Tech stack

- **Frontend:** React, TypeScript  
- **Styling:** Tailwind CSS  
- **Icons:** Lucide React  
- **Build:** Vite  

**Note:** The prototype mainly uses **local state**; persistence is still evolving.

## License

[PolyForm Noncommercial 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0/) — you may use and modify this project for **noncommercial** purposes; **selling** the software, offering it for a fee, or using it primarily to make money requires a separate license from the copyright holder. Full terms: [`LICENSE`](LICENSE).
