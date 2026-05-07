# ADR-001: MVP client slice for ethical ad filter

- **Status:** Accepted  
- **Date:** 2026-05-06  
- **Linear:** [TIL-69](https://linear.app/tiltcheck/issue/TIL-69/p0-spike-pick-mvp-slice-dnsvpn-vs-browserwebview-vs-research-export)  
- **Decision makers:** Product / eng (update with names as needed)

## Context

**Mischief Manager** is exploring an **ethical ad filter**: user-controlled sensitivity aligned to the v1 **taxonomy** (`taxonomy-v1.md`), versioned **policy JSON**, and optional **SusLink** URL signals—without claiming inference of mental health status.

We need one **v1 MVP track** that balances:

- **Platform reality** on Android and iOS (especially whether “system-wide” blocking is credible).
- **Privacy posture** (what leaves the device, what users must trust).
- **Time-to-value** (how fast we can ship something trustworthy).

Three slices were compared:

| Track | Summary |
| --- | --- |
| **A — DNS / VPN** | Device-wide filtering by steering DNS or tunneling traffic (mostly Android-feasible; iOS via Network Extension / VPN-style UX). |
| **B — Browser / WebView** | Filtering only where we control rendering (embedded WebView, companion browser, or extension-class surfaces). |
| **C — Research export** | Opt-in **evidence bundles** (`evidence-bundle-v1.md`) for accountability and research—not a consumer “ad blocker” by itself. |

### Comparison: Android / iOS constraints (system-wide blocking)

| Dimension | Track A (DNS / VPN) | Track B (Browser / WebView) | Track C (Research export) |
| --- | --- | --- | --- |
| **Android — system-wide reach** | **Strong:** `VpnService` / private DNS patterns can cover most apps’ DNS lookups; still imperfect for hard-coded IPs, non-DNS paths, or encrypted first-party ad delivery inside apps. | **Narrow:** Only pages rendered in surfaces we own (WebView, in-app browser, etc.). | **N/A** (no blocking). |
| **iOS — system-wide reach** | **Constrained:** Consumer-grade “filter everything” generally implies **Network Extension** (VPN-style) with Apple review, battery/background limits, and clear user consent. DNS-only profiles are not a casual App Store pattern for arbitrary third-party filtering. | **Narrow but viable:** **WKWebView** and app-controlled navigation; **Safari** coverage may require **Content Blocker** extensions or separate distribution—additional spikes. | **N/A** (no blocking). |
| **HTTPS / in-app ads** | DNS blocks domains; **cannot** inspect TLS payloads inside arbitrary apps without unacceptable MITM. | Can apply policy at resource/navigation layer **inside** our Web stack; no claim on other apps’ TLS. | N/A. |
| **Store / policy risk** | Higher: VPN/networking apps face stricter review, “what data do you see?” questions, and user trust bar. | Moderate: standard app + WebView; extensions add channel-specific rules. | Lower if export is explicit, local-first, and consent-gated. |

### Comparison: privacy posture

| Track | Sensitive data exposure | User trust story |
| --- | --- | --- |
| **A** | VPN/DNS path can observe **destinations and timing** for broad traffic (metadata). Must be crystal-clear on retention, logging, and whether any server sees queries. | “We route your network” is a **high** trust ask even if payload is not decrypted. |
| **B** | Can keep adjudication **on-device** for URLs the Web surface loads; optional SusLink calls only with **explicit consent** (see `suslink-integration-spike.md`). | Smaller blast radius: “only pages you open in this layer.” |
| **C** | Exports are **user-initiated**; schema can minimize PII; strongest alignment with accountability narrative. | Strong for research and policy; weak alone for day-to-day protection. |

### Comparison: time-to-value (v1)

| Track | Rough v1 effort shape | Why |
| --- | --- | --- |
| **A** | **Slower:** networking edge cases, entitlements, store narrative, kill-switch UX, iOS NE packaging. | High leverage later; poor “first ship” if policy/UI are still moving. |
| **B** | **Faster:** policy engine + tier UI + WebView/browser shell + policy distribution. | Validates taxonomy and “why this was blurred” UX early. |
| **C** | **Parallel-friendly:** schema + export UI + signing/integrity notes. | Builds accountability without blocking scope creep. |

## Decision

**Primary MVP: Track B — Browser / WebView ethical layer.**

**In parallel (not a substitute): Track C — evidence bundle** for opt-in accountability exports (`evidence-bundle-v1.md`), so v1 ships both **protection in controlled web surfaces** and **documentability** for users who want it.

**Deferred:** Track A (DNS / VPN) is **not** the v1 centerpiece; revisit as a **possible ADR-002** once policy JSON, rule engine, and UX are stable—especially for Android power users.

### Rationale (summary)

1. **Explainability:** Blur/block with **policy ID → human copy** is central to trust; controlled Web surfaces expose enough context for a “why” panel without device-wide TLS MITM.
2. **Cross-product fit:** Reuse HTTP-based **SusLink** and policy distribution patterns (TiltCheck ecosystem) without making “install our VPN” the onboarding cliff on day one.
3. **Honest scope:** Avoid marketing **OS-wide** blocking on iOS before we have a defensible implementation path; Track B matches what we can truthfully promise in v1.

## Explicit non-goals (v1)

The following are **out of scope** for the first shippable ethical-filter MVP, unless a future ADR explicitly adopts them:

- **Device-wide ad blocking** as the **only** or **primary** product story (especially on iOS, where that implies VPN-class extensions and commensurate trust/review overhead).
- **TLS interception, custom root CAs, or MITM** for arbitrary third-party apps to inspect ad payloads.
- **Inferring or displaying** user mental-health status, clinical labels, or “you are manic/depressed” style conclusions from ad exposure.
- **Covert telemetry:** uploading browsing or DNS history without **clear, granular consent** aligned to SusLink and store policies.
- **Replacing** platform content policies or app-store enforcement; we are a **user-controlled assistive layer**, not a regulator.
- **Research-only** v1 with **no** in-product protective surface—Track C is **additive**, not the sole MVP.
- **Guaranteeing** block rates across every in-app WebView or embedded browser in third-party apps (only surfaces we control are in scope for Track B v1).

## Consequences

### Positive

- Faster iteration on **policy engine** + UI tiers.
- Easier **legal/privacy** story: URLs sent to SusLink only with explicit consent (see `suslink-integration-spike.md`).
- Clear ladder: WebView v1 → optional Safari/content-blocker path → optional Android DNS/VPN depth.

### Negative

- Does **not** protect users **outside** the browser/WebView surfaces in v1.
- Marketing must be precise: **“Protects you in [named surfaces]”**—not “all ads on your phone.”

## Follow-ups

- Spike **Safari / WebKit** constraints if targeting iOS web traffic outside embedded WebViews.
- Revisit **Track A (DNS/VPN)** after policy JSON + rule engine stabilize (high impact for Android power users).
