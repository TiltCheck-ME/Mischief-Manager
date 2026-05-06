# Evidence bundle v1 (accountability export)

Version: **1.0** · Status: **draft**

Minimal, **consent-gated** package for user-initiated reporting, research cohorts, or regulator/platform submissions. **No PII** beyond what the user explicitly provides in a report form.

## Principles

1. **Data minimization** — hashes and categories over raw creative where possible.
2. **No mental-health inference** — only user-declared sensitivity flags and policy category IDs.
3. **Reproducibility** — `policyVersion`, `taxonomyVersion`, and artifact hashes tie the bundle to a specific rule set.
4. **Optional SusLink** — include scan output only if URL was sent under consent.

## Bundle structure

Top-level object: `EvidenceBundle` (JSON). Schema: [`../../schemas/evidence-bundle.v1.schema.json`](../../schemas/evidence-bundle.v1.schema.json).

### Required fields

| Field | Type | Description |
| --- | --- | --- |
| `bundleVersion` | string | e.g. `"1.0.0"` |
| `createdAt` | string (ISO 8601) | Client clock at export time |
| `taxonomyVersion` | string | Must match active taxonomy (e.g. `1.0`) |
| `policyVersion` | string | Policy pack version applied at decision time |
| `events` | array | One or more `ImpressionEvent` records |

### `ImpressionEvent` (per ad or per session rollup)

| Field | Type | Description |
| --- | --- | --- |
| `eventId` | string | UUID v4 |
| `decidedAt` | string (ISO 8601) | When tier was computed |
| `tier` | enum | `block` \| `blur` \| `allow` \| `allow_log` |
| `matchedCategories` | string[] | Taxonomy IDs, e.g. `CAT-02` |
| `policyRuleIds` | string[] | Stable IDs from policy JSON |
| `surface` | string | e.g. `webview`, `browser_extension` |
| `landingUrlHash` | string | SHA-256 of canonical URL (no query if policy strips) |
| `creativeHash` | string | Optional; hash of normalized creative payload or screenshot digest |
| `suslink` | object? | Present only if scan performed; see below |

### `suslink` sub-object (optional)

| Field | Type | Description |
| --- | --- | --- |
| `riskLevel` | string | `safe` \| `suspicious` \| `high` \| `critical` |
| `reason` | string | Scanner reason text |
| `scannedAt` | string (ISO 8601) | Scan timestamp |

### User report overlay (optional)

When the user files a report, merge:

| Field | Type | Description |
| --- | --- | --- |
| `userReport` | object | `freeText` (optional), `contactRef` (optional opaque id), `jurisdiction` (optional) |
| `userDeclaredSensitivities` | string[] | Subset of user settings at time of event |

## Storage and transport

- **Default:** export as `.json` file or encrypted blob; **no cloud** until a backend is specified.
- **Retention:** client-defined; recommend **≤ 90 days** for local queue unless research IRB says otherwise.

## Legal

All public claims tying bundles to **platform policies or regulations** must go through **legal review**; use `policy-mapping-template.md` for internal draft mapping only.

## Example

See [`examples/evidence-bundle.example.json`](examples/evidence-bundle.example.json).
