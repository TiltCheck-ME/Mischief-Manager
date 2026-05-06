# ADR-001: MVP client slice for ethical ad filter

- **Status:** Accepted  
- **Date:** 2026-05-06  
- **Decision makers:** Product / eng (update with names as needed)

## Context

The ethical ad filter needs a first shippable surface that:

- Respects **user-declared sensitivities** and the v1 **taxonomy** (`taxonomy-v1.md`).
- Can consume **versioned policy JSON** and optional **SusLink** URL signals.
- Avoids claiming inference of mental health status.

Three MVP slices were considered:

1. **DNS / VPN (Android-first)** — system-wide blocking; weak on in-app HTTPS ads; iOS constraints.
2. **Browser / WebView** — interception where the stack controls rendering; narrower reach but higher **precision** and explainability (“why” panel).
3. **Research instrument** — opt-in evidence export; strongest for accountability narrative; not mass consumer distribution alone.

## Decision

**Primary MVP: Track B — Browser / WebView ethical layer** (with **Track C** evidence bundle developed **in parallel** for accountability).

**Rationale**

- **Explainability:** Blur/block with **policy ID → human copy** is central to trust; WebView/browser surfaces expose enough context to show “why” without TLS MITM on the whole device.
- **TiltCheck alignment:** Existing patterns (e.g. Chrome extension calling safety APIs, in-app WebViews) reuse **HTTP SusLink** and policy distribution without shipping a VPN SKUs on day one.
- **Platform reality:** Full-device filtering on iOS is limited without VPN/MDM; a **controlled WebView + optional Safari Content Blocker**-style follow-on is a clearer ladder than promising OS-wide blocking everywhere.

**Non-goals (v1)**

- System-wide DNS/VPN blocking as the **only** product (may follow as **ADR-002** for Android).
- TLS interception for arbitrary third-party apps.

## Consequences

### Positive

- Faster iteration on **policy engine** + UI tiers.
- Easier **legal/privacy** story: URLs sent to SusLink only with explicit consent (see `suslink-integration-spike.md`).

### Negative

- Does not protect users **outside** the browser/WebView surfaces in v1.
- Requires clear marketing: “Protects you in [app/browser scope]” not “all ads on phone.”

## Follow-ups

- Spike **Safari / WebKit** constraints if targeting iOS web traffic outside embedded WebViews.
- Revisit **Track A (DNS/VPN)** after policy JSON + rule engine stabilize (high impact for Android power users).
