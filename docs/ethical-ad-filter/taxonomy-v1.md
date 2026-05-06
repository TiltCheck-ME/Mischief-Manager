# Ethical ad filter — Taxonomy v1

Version: **1.0** · Status: **draft** · Last updated: 2026-05-06

This document defines **high-risk ad categories** and **enforcement tiers** for the mobile ethical ad filter. Categories are **user-configurable sensitivities**; the product does **not** infer mental health status.

## Enforcement tiers

| Tier | User-visible behavior | Typical use |
| --- | --- | --- |
| **block** | Ad unit not shown; optional placeholder (“Hidden by your settings”). | High confidence + high harm; legal/store-policy safe patterns only. |
| **blur** (warn / soft-block) | Creative blurred or collapsed; tap to reveal after friction (e.g. second tap + “why”). | Uncertain model scores, urgency/shame patterns, or SusLink elevated risk. |
| **allow_log** | Shown normally; metadata captured only if user opted into reporting / research. | Low confidence signals, broad keywords, or “watchlist” for accountability exports. |

**Merge rule (normative):** For a single impression, the **strictest** tier wins among all matched category rules and URL-level signals (e.g. SusLink). User **allowlist** overrides block/blur for specific domains or advertisers where permitted.

## Category definitions (v1)

Seven categories; each maps to default tier suggestions and example signals. Defaults can be tightened per user profile.

### CAT-01 — Predatory lending & BNPL stress

- **Intent:** Ads that push high-cost credit, payday-style offers, or BNPL framed as “free” or “instant” without clear terms.
- **Default tier:** `blur` (upgrade to `block` when combined with SusLink `high`/`critical`).
- **Signals (examples):** Keywords (language-specific lists), regulated financial claims, landing domains on policy denylists, partner-provided merchant IDs.

### CAT-02 — Gambling & sweepstakes urgency

- **Intent:** Casino/sportsbook/sweepstakes with urgency (“limited time”, “bonus expires”), loss-chasing framing, or unlicensed gambling surfaces.
- **Default tier:** `blur` for urgency patterns; `block` for unlicensed / denylist domains.
- **Signals:** Advertiser category tags (where available), destination domain lists, creative OCR for urgency phrases, SusLink casino-impersonation / typosquat heuristics.

### CAT-03 — High-pressure retail & scarcity loops

- **Intent:** Manipulative scarcity (“only 2 left”), false countdowns, aggressive upsell.
- **Default tier:** `blur`.
- **Signals:** Creative templates, DOM hints in WebView, known bad patterns in policy JSON.

### CAT-04 — Weight loss / body image shock

- **Intent:** Before/after shock imagery, miracle claims, prescription drug ads without proper framing.
- **Default tier:** `blur`.
- **Signals:** CV/OCR flags (optional, on-device), advertiser category, policy keywords.

### CAT-05 — Alcohol & substances (sensitivity)

- **Intent:** Alcohol, cannabis, vaping ads for users who opt out.
- **Default tier:** `blur` (user opt-in category).
- **Signals:** IAB/content taxonomy, landing page classification, regional rulesets.

### CAT-06 — Recovery / disorder-adjacent triggers (user-declared)

- **Intent:** Content users flag as harmful to recovery (gambling triggers, diet culture, etc.) via **self-declared** sensitivity only.
- **Default tier:** `blur` when matched.
- **Signals:** User-selected sub-tags; never automated diagnosis.

### CAT-07 — Deceptive lead-gen & phishing-adjacent

- **Intent:** Ads whose destinations are scam-like, impersonation, or phishing—**overlaps SusLink**.
- **Default tier:** `block` when SusLink `critical`; `blur` when `high` or heuristic-only match.
- **Signals:** SusLink `LinkScanResult`, domain trust feeds, local heuristics.

## Out of scope for v1 taxonomy

- Political/issue ads (separate policy pack).
- Generic “all ads off” (product positioning is **ethical** filtering, not general ad blocking unless user explicitly chooses).

## Versioning

- Taxonomy **major** changes bump `policy` pack major version; new categories get new `CAT-xx` IDs; deprecated IDs remain in schema for replay of old bundles.
