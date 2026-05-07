# Ethical ad filter — documentation index

Artifacts implementing the product/architecture plan (implementation phase — docs & schemas only).

| Doc | Purpose |
| --- | --- |
| [taxonomy-v1.md](taxonomy-v1.md) | v1 categories (CAT-01–07) + tier definitions ([TIL-70](https://linear.app/tiltcheck/issue/TIL-70/p0-taxonomy-v1-categories-tier-definitions-block-blur-allowlog)) |
| [adr-001-mvp-slice.md](adr-001-mvp-slice.md) | **Accepted:** Browser/WebView MVP + parallel evidence bundle ([TIL-69](https://linear.app/tiltcheck/issue/TIL-69/p0-spike-pick-mvp-slice-dnsvpn-vs-browserwebview-vs-research-export)) |
| [interception-points-spike.md](interception-points-spike.md) | WebView vs extension vs Safari — v1 integration choice ([TIL-81](https://linear.app/tiltcheck/issue/TIL-81/p2-b-spike-interception-points-extension-vs-webview)) |
| [policy-artifact-v1.md](policy-artifact-v1.md) | Policy pack distribution, integrity, rollback ([TIL-73](https://linear.app/tiltcheck/issue/TIL-73/p1-policy-artifact-versioned-json-schema-integrity-signing)) |
| [evidence-bundle-v1.md](evidence-bundle-v1.md) | Accountability export format |
| [policy-mapping-template.md](policy-mapping-template.md) | Draft taxonomy → regulation/platform mapping; legal checkpoint ([TIL-72](https://linear.app/tiltcheck/issue/TIL-72/p0-legal-review-checkpoint-tos-reporting-claims-store-policies)) |
| [suslink-integration-spike.md](suslink-integration-spike.md) | SusLink via HTTP API; `riskLevel` → tier merge table |

**Schemas (repo root)**

- [`../../schemas/evidence-bundle.v1.schema.json`](../../schemas/evidence-bundle.v1.schema.json)
- [`../../schemas/policy-artifact.v1.schema.json`](../../schemas/policy-artifact.v1.schema.json)
- Example policy: [`../../examples/policy-v1.example.json`](../../examples/policy-v1.example.json)

**Linear:** [Project](https://linear.app/tiltcheck/project/ethical-ad-filter-mvp-03a29bd944cb) · [Epic TIL-68](https://linear.app/tiltcheck/issue/TIL-68/epic-ethical-ad-filter-discovery-policy-engine-mvp-client)
