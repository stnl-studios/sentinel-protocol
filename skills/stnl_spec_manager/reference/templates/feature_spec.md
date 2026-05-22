# <Feature / Spec Title>

## Metadata
- spec_id: <SPEC-001>
- slug: <spec-slug>
- state: Draft | Structured | Execution Ready | Blocked
- lifecycle_status: active | closed | closed_with_residuals
- closed_at: <YYYY-MM-DD-or-none>
- closed_in_session: <n-or-none>
- readiness_score: <0-100>
- readiness_label: not_ready | ready_for_consumption | blocked
- split_required: yes | no
- scope_kind: transversal | feature
- canonical_location: <docs/SPEC/<spec-slug>/ | docs/features/<feature>/SPEC/>
- related_feature: <feature-slug-or-none>
- owner: <name-or-team>
- created_at: <YYYY-MM-DD>
- last_updated: <YYYY-MM-DD>
- last_session: <1>

> This is the canonical persisted shape for the final SPEC artifact. A closed SPEC must be readable, understandable, and reusable starting and ending in this file. Keep every section in place even when the content is partial. If something is unknown, mark it as pending, conditional, or `none` instead of collapsing the document or inventing certainty.
>
> Keep this file directly consumable, but do not turn it into an execution plan or an early implementation prescription. Detailed investigation or temporary working notes may live elsewhere while the SPEC matures, but no auxiliary artifact should be required to understand the final business scope, rules, acceptance, decisions, or closure captured here.
>
> When `closure_status` is `closed` or `closed_with_residuals`, the SPEC folder must contain only `feature_spec.md`, except ignored system entries such as `__MACOSX` and `.DS_Store`. `closed_with_residuals` records known residual product, scope, or validation limits inside this file; it does not retain auxiliary files.
>
> `state` tracks maturity and consumability. `lifecycle_status` tracks whether this SPEC artifact remains active or has been closed after explicit reconciliation against existing evidence.
>
> Use canonical stable IDs for questions (`Q-001`), decisions (`D-001`), acceptance criteria (`AC-001`), slices (`SL-001`), risks (`R-001`), and constraints (`C-001`). Every identified item must include the ID in its heading and an explicit `id:` field. Do not renumber, reuse removed IDs, or convert uncertainty into requirements.

## Executive Summary
[Describe in 3 to 6 lines what must be implemented, why it must exist, and what final outcome this spec authorizes.]

## Problem
[Describe the current pain, risk, gap, or opportunity. Explain why the current behavior is not sufficient.]

## Objective
[Describe the intended end state. Focus on what must be true when this work is done.]

## Consolidated Direction
[State the currently authorized direction at the level needed to preserve scope, acceptance, constraints, and honest implementation consumption. Do not freeze internal strategy, sequencing, or technology choices here unless they are already confirmed as source of truth or materially required.]

## Expected Outcome
[Describe the concrete product or operational outcome expected after implementation.]

## Classification Notes
- factual_confidence: confirmed | mixed | preliminary | conditional
- classification_notice: [Use this field to state when the current classification is preliminary, conditional, depends on external validation, or should not be read as a strong completion claim.]

## Actors and Access
### Affected Actors
- **<Actor 1>**: <how this actor is impacted>
- **<Actor 2>**: <how this actor is impacted>

### Permissions and Access
[Describe who can view, trigger, approve, configure, or administer the behavior covered by this spec.]

## Relevant Project Context
### Related Docs
- `docs/INDEX.md`
- `<related core / unit / feature docs>`

### Factual Context Summary
[Summarize only the context that materially affects implementation. Prefer referencing existing docs instead of copying project-wide knowledge or investigation notes.]

## Scope
### In Scope
- [Item 1]
- [Item 2]
- [Item 3]

### Out of Scope
- [Item 1]
- [Item 2]
- [Item 3]

## Functional Flow
### Primary Flow
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Alternate Flows
#### Flow A
1. [Step 1]
2. [Step 2]

#### Flow B
1. [Step 1]
2. [Step 2]

### Error / Exception Flows
- [Error case 1]: [Expected behavior]
- [Error case 2]: [Expected behavior]

## Implementation-Relevant Shape
> Use this section only for the minimum contracts, surfaces, or constraints that must be clear for honest implementation consumption. Do not turn this into a technical plan or lock speculative solution details. Move expanded tradeoff analysis or provisional direction to optional working artifacts only when they are actually in use.

### Behavior / Contracts / Surfaces
- [Item 1]: [What must exist, change, or be respected.] Rationale: [Optional short rationale only when it improves clarity.]
- [Item 2]: [What must exist, change, or be respected.] Rationale: [Optional short rationale only when it improves clarity.]
- [Item 3]: [What must exist, change, or be respected.] Rationale: [Optional short rationale only when it improves clarity.]

## Rules and Constraints
### Functional Requirements
- [Requirement 1]
- [Requirement 2]

### Business Rules
- [Rule 1]
- [Rule 2]

### Validation Rules
- [Validation rule 1]
- [Validation rule 2]

### Product / UX Constraints
#### C-001 — [Constraint title]
- id: C-001
- category: product_ux
- constraint: [Constraint]
- source: [Confirmed source, decision ID, or `pending`]

#### C-002 — [Constraint title]
- id: C-002
- category: product_ux
- constraint: [Constraint]
- source: [Confirmed source, decision ID, or `pending`]

### Technical / Operational Constraints
#### C-003 — [Constraint title]
- id: C-003
- category: technical_operational
- constraint: [Constraint]
- source: [Confirmed source, decision ID, or `pending`]

### Security / Privacy / Compliance
#### C-004 — [Constraint title]
- id: C-004
- category: security_privacy_compliance
- constraint: [Constraint]
- source: [Confirmed source, decision ID, or `pending`]

### Non-Functional Requirements
- [Performance / reliability / observability requirement 1]
- [Performance / reliability / observability requirement 2]

## Interfaces and Contracts Impacted
### User-Facing / UI
- [Route, screen, modal, export, notification, or user-facing surface]

### API / Backend / Jobs
- [Endpoint, service, job, webhook, or processing surface]

### Data / Persistence
- [Schema, migration, record, index, or storage impact]

### External Integrations
- [External service, contract, retry, fallback, or compatibility impact]

## Minimum Technical Impact
[Describe the minimum implementation impact required to realize this spec without turning this document into an execution plan, sequencing guide, or long investigation report.]

## Edge Cases and Exceptions
- [Edge case 1]
- [Edge case 2]
- [Edge case 3]

## Dependencies
- [Dependency 1]
- [Dependency 2]
- [Dependency 3]

## Acceptance Criteria
### AC-001 — [Acceptance criterion title]
- id: AC-001
**Given** [context]
**When** [action]
**Then** [expected result]

### AC-002 — [Acceptance criterion title]
- id: AC-002
**Given** [context]
**When** [action]
**Then** [expected result]

### AC-003 — [Acceptance criterion title]
- id: AC-003
**Given** [context]
**When** [action]
**Then** [expected result]

## Final Decisions
- [Decision 1]: [Only keep decisions that are final and materially necessary to understand scope, rules, acceptance, constraints, or closure. Otherwise use `none`.]
- [Decision 2]

## Spec Definition of Done
> This is the canonical completion target for the feature or fix. Execution plans may define smaller local DoDs, but they must map to these items and cannot contradict them.

### SDOD-001
- title: [Outcome item]
- definition: [Describe the concrete result that must be true for the feature to be honestly considered done.]
- primary_evidence: [Acceptance criteria, QA checklist, rollout proof, or other artifact.]

### SDOD-002
- title: [Outcome item]
- definition: [Describe another concrete result.]
- primary_evidence: [Evidence source.]

### SDOD-003
- title: [Outcome item]
- definition: [Describe another concrete result.]
- primary_evidence: [Evidence source.]

## Risks
### R-001 — [Risk title]
- id: R-001
- risk: [Risk]
- impact: low | medium | high
- mitigation: [Mitigation, decision ID, or `pending`]

### R-002 — [Risk title]
- id: R-002
- risk: [Risk]
- impact: low | medium | high
- mitigation: [Mitigation, decision ID, or `pending`]

## Residual Gaps and Conditions
- [Residual gap, pending validation, or condition that still matters for honest reading of this SPEC. Use `none` when there are no material residuals. Keep this summary product/contract focused; do not include implementation plans, session history, validation commands, checklist trails, or maturity logs.]

## Spec Closure
- closure_status: not_closed | closed | closed_with_residuals
- closure_basis: not_applicable_yet | validation_evidence | manual_verification | combined_evidence
- closure_summary: [State whether this SPEC artifact remains active or what explicitly justified closure.]
- evidence_used:
  - [Short evidence category or observation 1, without command logs]
  - [Short evidence category or observation 2, without command logs]
- residuals_after_closure:
  - [Known residual product, scope, or validation limit, or `none`]
- canonical_close_folder_state: [If `closed` or `closed_with_residuals`, must be `feature_spec.md only`; if `not_closed`, use `not_applicable`.]

## Active Working Artifacts
> Use this section only while the SPEC is active. In new SPEC creation or legitimate fork, canonical bundle artifacts are required by the bundle contract; conditional artifacts are generated only when applicable. For `closed` or `closed_with_residuals`, set this section to `not_applicable_closed` and do not list retained auxiliary artifacts.

- status: active | not_applicable_closed
- active_artifacts: [List active working artifacts while `lifecycle_status: active`, or `none` after closure.]
