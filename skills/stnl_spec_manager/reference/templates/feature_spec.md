# <Feature / Spec Title>

## Metadata
- spec_id: <SPEC-001>
- slug: <spec-slug>
- state: Draft | Structured | Execution Ready | Blocked
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

> This is the canonical persisted shape for the primary SPEC artifact. Keep every section in place even when the content is partial. If something is unknown, mark it as pending, conditional, or `none` instead of collapsing the document or inventing certainty.
>
> Keep this file directly consumable, but do not turn it into an execution plan or an early implementation prescription. Put detailed investigation, expanded evidence, speculative direction, assumptions, open questions, and decision history in the dedicated companion artifacts.

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
> Use this section only for the minimum contracts, surfaces, or constraints that must be clear for honest implementation consumption. Do not turn this into a technical plan or lock speculative solution details. Move expanded tradeoff analysis to `decision_log.md` and provisional direction to `assumptions.md` or `open_questions.md`.

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
- [Constraint 1]
- [Constraint 2]

### Technical / Operational Constraints
- [Constraint 1]
- [Constraint 2]

### Security / Privacy / Compliance
- [Constraint 1]
- [Constraint 2]

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
### AC-001
**Given** [context]
**When** [action]
**Then** [expected result]

### AC-002
**Given** [context]
**When** [action]
**Then** [expected result]

### AC-003
**Given** [context]
**When** [action]
**Then** [expected result]

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
- [Risk 1]
- [Risk 2]
- [Risk 3]

## Critical Pending Items
- [Critical item 1]
- [Critical item 2]

## External Validation and Decisions Pending
- [Dependency, validation, infra, DBA, index, volume, or operational-policy item still required before strong completion claims.]

## Related Artifacts
> Do not inline assumptions, open questions, decision history, expanded evidence, or speculative technical direction here beyond a brief pointer. Keep their canonical content in the dedicated artifacts below.

- `open_questions.md`
- `assumptions.md`
- `decision_log.md`
- `readiness_report.md`
- `session_summary.md`
- `spec_slices.md` (only when split is needed)
- `qa_checklist.md` (only when approaching execution readiness)
