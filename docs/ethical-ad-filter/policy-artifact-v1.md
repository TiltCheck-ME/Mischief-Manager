# Policy artifact v1 — distribution, integrity, rollback

- **Linear:** [TIL-73](https://linear.app/tiltcheck/issue/TIL-73/p1-policy-artifact-versioned-json-schema-integrity-signing)  
- **Schema:** [`../../schemas/policy-artifact.v1.schema.json`](../../schemas/policy-artifact.v1.schema.json)  
- **Example:** [`../../examples/policy-v1.example.json`](../../examples/policy-v1.example.json)  
- **Taxonomy:** [`taxonomy-v1.md`](taxonomy-v1.md)

## Purpose

A **policy artifact** is versioned JSON consumed by the client rule engine. It must be **safe to fetch over the network**: clients validate shape, versions, and (once enabled) **cryptographic integrity** before applying rules.

## Fields (semantics)

| Field | Required | Meaning |
| --- | --- | --- |
| `policyVersion` | Yes | **Monotonic** release id for this artifact (e.g. `2026.05.07.1`). Bumps on any rule change. |
| `taxonomyVersion` | Yes | Must match the **taxonomy** the rules assume (`1.0` for v1). If taxonomy doc bumps, ship new policy + align `categoryId` rows. |
| `effectiveFrom` | No | ISO-8601 **not-before** instant; clients ignore or hold rules until clock ≥ this (optional guard against skew). |
| `rules` | Yes | Array of rules; each references `CAT-xx` and a `defaultTier`. |

## Channels

| Channel | Use |
| --- | --- |
| **Production** | Default URL baked into app or resolved via config; **HTTPS only**. |
| **Staging** | QA / dogfood; must not be reachable in production builds without a debug flag. |

Clients should log **`policyVersion`** applied at startup and after updates (privacy policy permitting).

## Integrity (recommended path)

**v1.0 clients:** Validate JSON against schema; pin **TLS** to known CDN; optionally pin **ETag** / content hash configured in-app.

**v1.1+ (recommended):** Attach a **detached signature** (e.g. Ed25519) over **canonical JSON** bytes (stable key order, UTF-8, no trailing whitespace) or use **JWS**; public key shipped in-app or via key rotation doc. *Schema fields for signatures are intentionally not added until the signing format is fixed—avoid partial implementations.*

## Rollback

- Ship **previous** artifact file at a stable URL **or** keep **N** last versions on CDN.  
- Client on failed validation or signature verify **keeps last-known-good** artifact and surfaces a **non-alarming** UX (“rules temporarily unavailable”).  
- **Emergency:** publish artifact that **raises** no tiers (all `allow`) only if product/legal approves—document in runbook.

## Client validation checklist

1. Parse JSON → schema validate.  
2. Reject if `taxonomyVersion` unsupported.  
3. Reject unknown `categoryId` values for this taxonomy major.  
4. (When signing enabled) verify signature before replacing active rules.  
5. Atomically swap in-memory rule set after success.

## Related

- Rule merge / tiers: `taxonomy-v1.md`  
- Legal mapping: `policy-mapping-template.md`  
