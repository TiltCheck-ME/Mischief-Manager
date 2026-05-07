# Ethical ad filter — Taxonomy v1

- **Version:** 1.0  
- **Status:** Accepted (subject to legal review via `policy-mapping-template.md`)  
- **Last updated:** 2026-05-06  
- **Linear:** [TIL-70](https://linear.app/tiltcheck/issue/TIL-70/p0-taxonomy-v1-categories-tier-definitions-block-blur-allowlog)  
- **Depends on:** [ADR-001 MVP slice](adr-001-mvp-slice.md) ([TIL-69](https://linear.app/tiltcheck/issue/TIL-69/p0-spike-pick-mvp-slice-dnsvpn-vs-browserwebview-vs-research-export)) — v1 **primary client** is Browser / WebView; taxonomy tiers are defined so they behave predictably there. DNS/VPN-style clients are a **future** track.

This document defines **high-risk ad categories** (user-configurable sensitivities) and **enforcement tiers**. The product does **not** infer mental health status; optional logging is **consent-gated** (see `evidence-bundle-v1.md`, `suslink-integration-spike.md`).

## Enforcement tiers (normative)

Tiers are ordered by strictness for merge logic: **`block` > `blur` > `allow_log` > `allow`** (see merge rule below). Schema enum: `policy-artifact.v1.schema.json` / `evidence-bundle.v1.schema.json`.

### `block`

| Aspect | Definition |
| --- | --- |
| **User-visible** | Ad or slot is **not rendered**. Optional neutral placeholder (“Hidden by your settings”) and **policy/category ID** for explainability. |
| **Gating** | Use when policy + signals meet **high confidence** and **high harm** thresholds *and* the implementation can apply the tier without breaking the host page (WebView/DOM-capable path). |
| **Logging** | May emit a **minimal structured event** (category ID, tier, coarse URL or hashed identifier) **only** where the user has enabled accountability/research exports or product analytics that are disclosed in consent. Never log full page HTML by default. |
| **MVP client note** | Natural fit for **WebView / controlled browser** (remove/hide node, swap creative). |

### `blur` (warn / soft-block)

| Aspect | Definition |
| --- | --- |
| **User-visible** | Creative **obscured** (blur, collapsed card, or overlay) with **friction to reveal** (e.g. second tap + short “why” copy tied to taxonomy ID). |
| **Gating** | **Uncertain** classifier confidence, urgency/shame patterns, or SusLink **elevated** but not **critical** risk—reduces false positives vs `block`. |
| **Logging** | Same consent rules as `block`; optional **allow_log**-style watchlist if user enables “log blurred impressions.” |
| **MVP client note** | Requires **DOM or graphics surface** control. On **DNS-only** clients (future track), there is no blur UX—treat **`blur` as `block`** at the resolver unless a companion Web surface implements blur. |

### `allow_log` (“allow + log”)

| Aspect | Definition |
| --- | --- |
| **User-visible** | Ad **shown normally**; user is **not** interrupted. |
| **Gating** | Low-confidence matches, broad keywords, “watchlist” categories, or SusLink **suspicious** tier when the product policy says observe-first. |
| **Logging** | **Structured metadata** (category, tier, URL or allowed hash, timestamps) recorded **only** if the user opted into **reporting / research / evidence bundle** flows. If reporting is off, behavior matches **`allow`** from the user’s perspective. |
| **MVP client note** | Primary hook for **accountability exports** without blocking. |

### `allow`

| Aspect | Definition |
| --- | --- |
| **User-visible** | Ad **shown**; no tier-based friction. |
| **Gating** | Explicit user allowlist entry, safe default when no rule matches, or engine decision to take no action. |
| **Logging** | **No** taxonomy-driven logging unless a separate user opt-in explicitly covers it (do not silently upgrade `allow` to `allow_log`). |

### Merge and overrides

1. **Strictest wins:** For one impression, the effective tier is the **most restrictive** among: matched category rules, SusLink-derived bumps, and engine defaults.
2. **User allowlist** overrides `block` / `blur` for listed domains or advertisers **where product policy and store rules permit**—document exceptions (e.g. illegal content) in `policy-mapping-template.md`.
3. **SusLink** elevation tables live in `suslink-integration-spike.md`; they **refine** but do not replace taxonomy categories.

## Category index (v1)

Seven **high-risk** categories (within the 3–7 deliverable range). IDs are stable **`CAT-xx`** keys for policy JSON.

| ID | Short name | Summary | Default tier |
| --- | --- | --- | --- |
| **CAT-01** | Predatory lending & BNPL stress | High-cost credit, payday-style, BNPL framed as frictionless | `blur` |
| **CAT-02** | Gambling & sweepstakes urgency | Licensed/unlicensed gambling, urgency / loss-chasing framing | `blur` / `block` |
| **CAT-03** | High-pressure retail & scarcity | False scarcity, manipulative countdowns, aggressive upsell | `blur` |
| **CAT-04** | Weight / body image shock | Shock imagery, miracle weight claims, risky drug ad framing | `blur` |
| **CAT-05** | Alcohol & substances (sensitivity) | Alcohol, cannabis, vaping—**user opt-in** sensitivity | `blur` |
| **CAT-06** | Recovery / disorder-adjacent triggers | **Self-declared** triggers only; never automated diagnosis | `blur` |
| **CAT-07** | Deceptive lead-gen & phishing-adjacent | Scam-like destinations; **SusLink-heavy** | `blur` / `block` |

## Category definitions (v1)

### CAT-01 — Predatory lending & BNPL stress

- **Intent:** Ads that push high-cost credit, payday-style offers, or BNPL framed as “free” or “instant” without clear terms.
- **Default tier:** `blur`; elevate to `block` when combined with SusLink **`high` / `critical`** or denylist domains.
- **`allow_log`:** Broad finance keywords pending classifier tuning.
- **Signals (examples):** Keywords (locale-specific lists), regulated financial claims, landing domains on policy denylists, partner merchant IDs.

### CAT-02 — Gambling & sweepstakes urgency

- **Intent:** Casino / sportsbook / sweepstakes with urgency (“limited time”, “bonus expires”), loss-chasing framing, or unlicensed gambling surfaces.
- **Default tier:** `blur` for urgency patterns; `block` for unlicensed / denylist domains.
- **`allow_log`:** Ambiguous “sweepstakes” creative without destination resolution.
- **Signals:** Advertiser categories (where available), destination domain lists, creative OCR for urgency phrases, SusLink impersonation / typosquat heuristics.

### CAT-03 — High-pressure retail & scarcity loops

- **Intent:** Manipulative scarcity (“only 2 left”), false countdowns, aggressive upsell.
- **Default tier:** `blur`.
- **`allow_log`:** Known templates pending confirmation.
- **Signals:** Creative templates, DOM hints in WebView, policy JSON bad-pattern lists.

### CAT-04 — Weight loss / body image shock

- **Intent:** Before/after shock imagery, miracle claims, prescription drug ads without proper framing.
- **Default tier:** `blur`.
- **`allow_log`:** Borderline wellness ads for accountability sampling.
- **Signals:** Optional on-device CV/OCR flags, advertiser category, policy keywords.

### CAT-05 — Alcohol & substances (sensitivity)

- **Intent:** Alcohol, cannabis, vaping ads for users who opt into this sensitivity pack.
- **Default tier:** `blur` when the user enabled the category.
- **`allow`:** When category is **off** in user settings (no extra logging unless user opts into cross-category research).
- **Signals:** IAB/content taxonomy, landing classification, regional rulesets.

### CAT-06 — Recovery / disorder-adjacent triggers (user-declared)

- **Intent:** Content users flag as harmful to recovery (gambling triggers, diet culture, etc.) via **self-declared** tags only.
- **Default tier:** `blur` when matched.
- **Non-goals:** No automated inference of diagnosis, mood state, or relapse risk.
- **Signals:** User-selected sub-tags only.

### CAT-07 — Deceptive lead-gen & phishing-adjacent

- **Intent:** Destinations that are scam-like, impersonation, or phishing—**overlaps SusLink**.
- **Default tier:** `block` when SusLink **`critical`**; `blur` when **`high`** or heuristic-only match.
- **`allow_log`:** **`suspicious`** SusLink or heuristic weak signals for watchlists.
- **Signals:** SusLink `LinkScanResult`, domain trust feeds, local heuristics.

## Out of scope for v1 taxonomy

- Political / issue ads (separate policy pack).
- Generic “all ads off” as the default story—positioning remains **ethical** filtering unless the user explicitly chooses broader blocking where legally permitted.
- **TLS MITM** or device-wide inspection of third-party apps (see ADR-001 non-goals).

## Versioning

- Taxonomy **major** changes bump `taxonomyVersion` in policy packs; new categories receive new `CAT-xx` IDs; deprecated IDs remain documented for replay of old evidence bundles.
