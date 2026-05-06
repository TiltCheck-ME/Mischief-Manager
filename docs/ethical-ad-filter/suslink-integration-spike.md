# SusLink integration spike — policy engine

**Decision:** For mischiefmanager / ethical ad filter, integrate SusLink via **HTTP to the existing TiltCheck safety API** (same pattern as `apps/chrome-extension` → `/safety/suslink/scan`) for v1.

**Rationale:** Keeps `@tiltcheck/suslink` and its dependency graph (`event-router`, `ai-client`) **out of** the thin mobile/WebView client; centralizes scanning, rate limits, and model updates on the backend.

**Alternatives considered**

| Option | Pros | Cons |
| --- | --- | --- |
| **Workspace package** `@tiltcheck/suslink` | On-device, no URL egress | Heavy deps; AI path needs keys; not ideal for minimal mobile binary |
| **Heuristic-only extract** (`LinkScanner` subset) | Small, offline | Misses AI moderation; duplicate maintenance |
| **HTTP API (chosen)** | Reuse production scanner; one place to update | Requires consent for URL egress; network latency |

## `LinkScanResult` → enforcement tier mapping

SusLink returns `riskLevel`: `safe` | `suspicious` | `high` | `critical` (plus `reason`, `url`, `scannedAt`).

**Merge with taxonomy tiers (additive):**

| SusLink `riskLevel` | Suggested minimum tier from URL signal alone | Notes |
| --- | --- | --- |
| `safe` | *(no upgrade)* | Base decision from taxonomy/creative rules only |
| `suspicious` | `allow_log` if user enabled reporting; else no change | Good for watchlists |
| `high` | `blur` | User can override per domain if false positive |
| `critical` | `block` | Aligns with scam/phish/impersonation |

**Final tier** = `max(strictness)` among category rules, SusLink mapping, and user overrides.

## Latency strategy

- On navigation or ad click-through resolution: call **full** scan when consent allows.
- For high-frequency prefetch: optional **`quickCheck`** (heuristic-only) if exposed by API; otherwise batch/debounce and cache by `landingUrlHash` TTL **5–15 min**.

## Privacy

- Disclose URL transmission in consent copy (pairs with privacy model issue).
- Do not send ad **creative** body to SusLink unless product scope expands; **URL only** for v1.

## API contract (implementation note)

- **Request:** normalized HTTPS URL, optional `userId` for authenticated TiltCheck users.
- **Response:** `LinkScanResult` JSON; map fields into `evidence-bundle-v1` `suslink` object.

## Test cases (acceptance)

1. Typosquat gambling domain → at least `high`.
2. Known safe retailer → `safe` does not upgrade a benign CAT-03 creative to blur.
3. `critical` + user allowlist domain → allowlist wins (document product policy).
