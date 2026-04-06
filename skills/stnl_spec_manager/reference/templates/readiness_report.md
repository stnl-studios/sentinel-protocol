# Readiness Report

## Current Status
- state: Draft | Structured | Execution Ready | Blocked
- readiness_score: <0-100>
- ready_for_orchestrator: yes | no
- split_required: yes | no
- last_assessed_in_session: <1>
- recommendation: [Continue discovery | resolve blockers | split spec | prepare handoff | ready to orchestrate]
- rationale: [Explain why this recommendation is honest.]

## Coverage Summary
- coverage_summary: [Short synthesis of what is already well specified and what still lacks confidence.]
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
- assumptions_explicit: yes | no
- relevant_edge_cases_mapped: yes | no
- minimum_technical_impact_described: yes | no
- critical_dependencies_visible: yes | no
- critical_pending_items_resolved_or_consciously_accepted: yes | no

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
- split_guidance: [Describe the best vertical handoff cuts when applicable.]

## Slice Readiness
> Fill only when `spec_slices.md` exists.

### S-001
- state: Draft | Structured | Execution Ready | Blocked
- ready_for_orchestrator: yes | no
- covers_spec_dod: [SDOD-001]
- blockers: [List blockers or `none`]
- notes: [Optional notes.]

## Orchestrator Handoff Recommendation
- handoff_scope: [Full spec | slice S-001 | not ready]
- why_now: [Explain why this handoff is valid or premature.]
- preconditions_before_handoff:
  - [Precondition 1]
  - [Precondition 2]

## Next Recommended Questions
- [Question candidate 1]
- [Question candidate 2]
- [Question candidate 3]
