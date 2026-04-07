# Readiness Report

> This is the canonical readiness gate. Preserve every section even when the content is partial. Do not let `readiness_score` override blockers, critical gaps, unresolved validation, or explicit conditionality.

## Current Status
- state: Draft | Structured | Execution Ready | Blocked
- readiness_score: <0-100>
- readiness_label: not_ready | ready_for_consumption | blocked
- split_required: yes | no
- last_assessed_in_session: <1>
- classification_strength: preliminary | conditional | strong
- classification_notice: [State why this classification is preliminary, conditional, or strong, and what still limits confidence.]
- strong_ready_claim_supported: yes | no
- spec_consumability: structured_but_not_yet_consumable | consumable_with_explicit_conditions | blocked_by_critical_gaps
- recommendation: [Continue structuring | resolve blockers | close critical gaps | split spec | ready for downstream consumption]
- rationale: [Explain why this recommendation is honest in terms of downstream SPEC consumption, without routing another agent.]

## Coverage Summary
- coverage_summary: [Short synthesis of what is already SPEC-consumable and what still lacks confidence.]
- conditionality_summary: [State exactly what keeps the current classification preliminary or conditional, or why a strong classification is justified.]
- problem_clarity: <0-10>
- objective_clarity: <0-10>
- scope_clarity: <0-10>
- out_of_scope_clarity: <0-10>
- actor_clarity: <0-10>
- flow_clarity: <0-10>
- edge_case_coverage: <0-10>
- acceptance_quality: <0-10>
- dependency_visibility: <0-10>
- risk_visibility: <0-10>
- decision_traceability: <0-10>
- assumption_visibility: <0-10>

## Concrete Item Discovery Snapshot
> Fill this section when the current uncertainty depends on classifying concrete project items such as endpoints, screens, jobs, integrations, exporters, reports, workflows, or equivalent surfaces. Use it to reduce and narrow later user questions, not to force a final architecture or implementation decision. If it does not apply, mark the section as `not_applicable`.

- snapshot_status: not_applicable | pending_scan | recorded

### Item-001
- item: [Concrete item name or `none`]
- evidence_observed: [Short factual evidence observed in docs or controlled codebase fallback.]
- dominant_factor: [Main cost, complexity, or risk observed, or `none`]
- preliminary_direction: local_optimization_candidate | structural_support_candidate | inconclusive
- confidence: low | medium | high
- remaining_gap: [What still prevents a legitimate final decision or stronger readiness claim.]

### Item-002
- item: [Concrete item name or `none`]
- evidence_observed: [Evidence]
- dominant_factor: [Factor]
- preliminary_direction: local_optimization_candidate | structural_support_candidate | inconclusive
- confidence: low | medium | high
- remaining_gap: [Remaining gap]

## State Gate Check
### Draft Exit Check
- problem_defined: yes | no
- objective_defined: yes | no
- actor_defined: yes | no
- initial_scope_defined: yes | no
- known_constraints_captured: yes | no

### Structured Check
- out_of_scope_defined: yes | no
- main_flows_defined: yes | no
- preliminary_acceptance_criteria_defined: yes | no
- known_risks_captured: yes | no
- open_questions_organized: yes | no

### Execution Ready Check
- out_of_scope_defined: yes | no
- acceptance_criteria_testable: yes | no
- primary_decisions_recorded: yes | no
- consolidated_direction_consumable: yes | no
- decision_basis_sustained: yes | no
- assumptions_explicit: yes | no
- relevant_edge_cases_mapped: yes | no
- minimum_technical_impact_described: yes | no
- critical_dependencies_visible: yes | no
- critical_pending_items_resolved_or_consciously_accepted: yes | no
- blocking_or_critical_questions_closed_or_explicitly_conditional: yes | no
- external_validation_closed_or_explicitly_conditional: yes | no
- external_decisions_closed_or_explicitly_conditional: yes | no

### Blocked Trigger Check
- contradictory_objective: yes | no
- essential_dependency_unknown: yes | no
- main_flow_missing: yes | no
- rule_conflict_present: yes | no
- acceptance_missing: yes | no

## Critical Gaps
- [Gap 1]
- [Gap 2]

## Blockers
- [Blocker 1]
- [Blocker 2]

## SPEC Consumption Assessment
- current_consumability: [Explain whether another agent could consume the current `feature_spec.md` as the primary SPEC artifact without depending on the investigation trail as the main document.]
- missing_for_consumption: [List only the remaining gaps that still prevent honest downstream consumption of the SPEC.]
- why_not_strong_yet: [If `classification_strength` is not `strong`, explain exactly why. If it is `strong`, explain why that claim is fully supported.]

## Questions Requiring User Answer
- [Repeat each blocking or critical pending question briefly here. Do not omit them from this section when they materially affect classification.]

## External Validation Notes
- [State clearly what is observed fact, what is hypothesis, what depends on external validation, and whether that still prevents a strong readiness claim.]

## Residual Risks
- [Risk 1]
- [Risk 2]

## Spec DoD Status
### SDOD-001
- status: MET | PARTIAL | NOT MET | BLOCKED
- notes: [Why this item has this status.]

### SDOD-002
- status: MET | PARTIAL | NOT MET | BLOCKED
- notes: [Why this item has this status.]

## Split Assessment
- should_split: yes | no
- why: [Explain why splitting is or is not needed.]
- split_guidance: [Describe the best vertical functional cuts when applicable.]

## Slice Readiness
> Fill only when `spec_slices.md` exists.

### S-001
- state: Draft | Structured | Execution Ready | Blocked
- readiness_label: not_ready | ready_for_consumption | blocked
- covers_spec_dod: [SDOD-001]
- blockers: [List blockers or `none`]
- notes: [Optional notes.]

## Optional Manual Handoff Prompt
- use: include only when the SPEC is materially consumable and a short manual prompt would help the user invoke another agent by choice
- prompt: [Optional short prompt for the user to copy manually. Never phrase this section as automatic routing.]

## Next Recommended Questions
- [Question candidate 1]
- [Question candidate 2]
- [Question candidate 3]
