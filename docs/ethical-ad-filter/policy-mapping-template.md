# Policy mapping template (taxonomy → external obligations)

**Internal draft — not legal advice.** Complete rows with counsel before external use. Link each row to evidence bundles that motivated the mapping.

## Legal checkpoint (process)

| Field | Value |
| --- | --- |
| **Linear gate** | [TIL-72 — Legal review checkpoint](https://linear.app/tiltcheck/issue/TIL-72/p0-legal-review-checkpoint-tos-reporting-claims-store-policies) |
| **Review owner** | *Assign internally (e.g. product lead)* |
| **Counsel / firm** | *TBD — add when engaged* |
| **Target review date** | *TBD* |
| **Artifacts to send** | This file (completed rows), [`taxonomy-v1.md`](taxonomy-v1.md), [`evidence-bundle-v1.md`](evidence-bundle-v1.md), [`suslink-integration-spike.md`](suslink-integration-spike.md), draft UX copy for consent + reporting |

**Until the review checklist below is signed off:** do **not** ship public-facing language that asserts a **regulatory violation**, **illegal conduct**, or **platform ToS breach** based on this taxonomy. Prefer internal wording such as “may raise concerns under [jurisdiction]” only after counsel approves.

When counsel completes review, add a short **“Review record”** subsection (date, reviewer initials, doc version or git SHA).

| Taxonomy ID | Category name (short) | External reference | Clause / section (summary) | Notes / evidence |
| --- | --- | --- | --- | --- |
| CAT-01 | Predatory lending & BNPL | *e.g. FTC Act §5 (US unfair/deceptive)* | *TBD* | *TBD* |
| CAT-02 | Gambling urgency | *e.g. state gaming commission rules; platform gambling ads policy* | *TBD* | *TBD* |
| CAT-03 | High-pressure retail | *e.g. EU UCPD-style unfair commercial practices* | *TBD* | *TBD* |
| CAT-04 | Weight / body shock | *e.g. platform restricted content; FDA/health claims* | *TBD* | *TBD* |
| CAT-05 | Alcohol & substances | *e.g. local ad standards; platform age/region policies* | *TBD* | *TBD* |
| CAT-06 | User-declared triggers | *N/A — user preference* | User autonomy | No regulatory claim required |
| CAT-07 | Deceptive / phishing-adjacent | *e.g. platform misrepresentation; phishing reporting* | *TBD* | Align with SusLink outputs |

## IAB / industry frameworks (optional column)

Add when adopting standard taxonomies:

| IAB category / Content taxonomy ID | Maps to |
| --- | --- |
| *TBD* | CAT-02, CAT-05, … |

## Review checklist (before publishing)

- [ ] Counsel reviewed wording of “violation” vs “may raise concerns under.”
- [ ] Jurisdiction-specific annexes attached.
- [ ] Version tag matches `policyVersion` in bundles.
