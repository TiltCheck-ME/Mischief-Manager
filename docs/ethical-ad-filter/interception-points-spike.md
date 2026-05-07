# Spike: interception points (extension vs WebView)

- **Linear:** [TIL-81](https://linear.app/tiltcheck/issue/TIL-81/p2-b-spike-interception-points-extension-vs-webview)  
- **Status:** Accepted recommendation (subject to implementation spikes on target platforms)  
- **Depends on:** [ADR-001](adr-001-mvp-slice.md) — Track B (Browser / WebView) is the v1 primary client.

## Goal

Pick **where** the ethical layer can observe navigation / ad slots and apply **`block` / `blur` / `allow_log`** (`taxonomy-v1.md`) with enough context for a **“why”** panel.

## Options compared

| Surface | Android | iOS | DOM / blur UX | Reach | Store / review notes |
| --- | --- | --- | --- | --- | --- |
| **In-app WebView** (`WebView`, `WKWebView`) | Yes | Yes | **Full** (hide/blur nodes, overlays) | Only URLs opened inside the app’s WebView | Standard app review; clearest fit for **Mischief Manager** v1. |
| **Thin native shell + WebView** (e.g. Capacitor, Cordova, custom Activity hosting WebView) | Yes | Yes | **Full** (same as above) | Packaged app; same scope as WebView | Common pattern for shipping a **Vite/React** bundle inside mobile. |
| **Chrome extension** (MV3) | N/A (desktop Chrome) | N/A | **Strong** on desktop web (`declarativeNetRequest`, content scripts) | **Desktop web** only unless user uses Chrome on Android with extensions (limited) | Separate SKU, separate review track; good **Phase 2** for desktop. |
| **Safari Web Extension + Content Blockers** | N/A | Partial | Block rules yes; **rich blur** harder than WebView | Safari only | Extra spike; Apple-specific constraints. |
| **Trusted Web Activity / Custom Tabs** | TWA opens Chrome; Custom Tabs | N/A / SFSafariViewController | **No** reliable DOM control in the system browser | Broad web | **Poor fit** for blur/explainability; optional deep-link target only. |

## Repo reality (today)

`reactSetup/` is a **Vite + React** web app. It does **not** by itself get `WKWebView` / Android `WebView` APIs—that requires a **wrapper** (Capacitor, React Native WebView screen, or minimal native host).

## Decision (v1)

1. **Primary v1 integration:** **Embedded WebView inside the Mischief Manager mobile app** (via **Capacitor** or equivalent) hosting the existing web bundle for flows that need filtering, **or** a dedicated **“Safer browse”** WebView route that wraps external shopping/ads-heavy sites the user chooses to open in-app.  
2. **Secondary (later):** **Chrome extension** for **desktop** users who want the same policy engine on the open web—reuse policy JSON + evaluator; different interception hooks.  
3. **Defer:** **Safari Content Blocker**–only MVP (insufficient for **blur + “why”** without additional UI surface).

## Implications

- **Policy evaluation** should accept **URL**, optional **page context** (path, referrer), and later **creative hints** from DOM/message channels—not assume extension-only APIs.  
- **SusLink** calls remain **opt-in** and tied to navigation events the WebView already sees (`suslink-integration-spike.md`).  
- **QA** (TIL-83): automated tests can use **headless WebView** harnesses or **WebView in emulator**; desktop-only tests are insufficient for v1.

## Follow-ups

- **TIL-82** — Blur/block UI + “why” panel wired to `CAT-xx` + tier.  
- **TIL-83** — End-to-end MVP surface + QA.  
- Optional: small **Capacitor spike** (separate issue) to prove `WKWebView` loads the bundle and injects a content bridge for tier actions.
