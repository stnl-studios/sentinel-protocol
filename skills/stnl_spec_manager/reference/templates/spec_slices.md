# Spec Slices

## Split Rationale
- parent_spec: <SPEC-001>
- split_required: yes
- reason: [Explain why the full spec should not be consumed as a single slice.]
- split_principle: [Describe the vertical cut logic used to preserve meaningful end-to-end delivery without turning slices into a technical plan.]

## Parent Spec Summary
[Summarize the overall initiative in 3 to 6 lines.]

## Slice Identity Contract
- canonical_id_format: `SL-001`, `SL-002`, `SL-003`, sequential and zero-padded with three digits
- recommended_heading: `### SL-001 — [Short slice title]`
- id_field_required: every slice must include `id: SL-001`
- dependencies_must_use: canonical slice IDs only, for example `dependencies: [SL-001, SL-002]`
- prohibited_slice_identifiers: `S-001`, `Slice 1`, `SLICE - 001`, `S1`, `slice-1`, title-only references
- id_stability: once assigned, a slice ID must not be renumbered or reused
- migration_rule: when reviewing, closing, or resuming a SPEC with inconsistent slice labels, do not normalize silently; create a migration plan or ask for human confirmation when traceability could change

## Post-Slice Closure Contract
- owner: `finalizer`
- applies_after_execution: yes
- slice_reference_must_use: canonical `SL-001`, `SL-002`, `SL-003` IDs only
- final_slice_status_values: `concluida`, `parcial`, `bloqueada`
- required_closure_fields: slice ID, final status, evidence used for the status, pending work or blockers, resync yes/no, next eligible slice when applicable
- rule: this template defines slice identity and execution readiness; only the `finalizer` declares post-execution slice closure state

## Slice Dependency Overview
- SL-001 depends_on: []
- SL-002 depends_on: [SL-001]
- SL-003 depends_on: [SL-001, SL-002]

## Slices
### SL-001 — [Short slice title]
- id: SL-001
- title: [Slice title]
- objective: [What outcome this slice must deliver.]
- in_scope:
  - [Item 1]
  - [Item 2]
- out_of_scope:
  - [Item 1]
  - [Item 2]
- key_flows:
  - [Flow 1]
  - [Flow 2]
- dependencies: []
- state: Draft | Structured | Execution Ready | Blocked
- state_scope: SPEC readiness state only; post-execution closure status belongs to the `finalizer`
- readiness_label: not_ready | ready_for_consumption | blocked
- spec_dod_items_covered: [SDOD-001, SDOD-002]
- classification_strength: preliminary | conditional | strong
- why_this_is_a_good_consumption_cut: [Explain why this slice is coherent and does not over-fragment downstream consumption.]
- open_questions: [Q-001]
- assumptions: [A-001]
- decisions: [D-001]

### SL-002 — [Short slice title]
- id: SL-002
- title: [Slice title]
- objective: [Outcome]
- in_scope:
  - [Item 1]
- out_of_scope:
  - [Item 1]
- key_flows:
  - [Flow 1]
- dependencies: [SL-001]
- state: Draft | Structured | Execution Ready | Blocked
- readiness_label: not_ready | ready_for_consumption | blocked
- spec_dod_items_covered: [SDOD-003]
- classification_strength: preliminary | conditional | strong
- why_this_is_a_good_consumption_cut: [Rationale]
- open_questions: [Q-002]
- assumptions: [A-002]
- decisions: [D-002]
