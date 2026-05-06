# Ethical ad filter — documentation index

Artifacts implementing the product/architecture plan (implementation phase — docs & schemas only).

| Doc | Purpose |
| --- | --- |
| [taxonomy-v1.md](taxonomy-v1.md) | v1 categories (CAT-01–07) + block / blur / allow_log tiers |
| [adr-001-mvp-slice.md](adr-001-mvp-slice.md) | **Accepted:** Browser/WebView MVP + parallel evidence bundle |
| [evidence-bundle-v1.md](evidence-bundle-v1.md) | Accountability export format |
| [policy-mapping-template.md](policy-mapping-template.md) | Draft taxonomy → regulation/platform mapping (legal review) |
| [suslink-integration-spike.md](suslink-integration-spike.md) | SusLink via HTTP API; `riskLevel` → tier merge table |

**Schemas (repo root)**

- [`../../schemas/evidence-bundle.v1.schema.json`](../../schemas/evidence-bundle.v1.schema.json)
- [`../../schemas/policy-artifact.v1.schema.json`](../../schemas/policy-artifact.v1.schema.json)
- Example policy: [`../../examples/policy-v1.example.json`](../../examples/policy-v1.example.json)

**Linear:** [Project](https://linear.app/tiltcheck/project/ethical-ad-filter-mvp-03a29bd944cb) · [Epic TIL-68](https://linear.app/tiltcheck/issue/TIL-68/epic-ethical-ad-filter-discovery-policy-engine-mvp-client)
