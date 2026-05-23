# Spec Slices

## File Purpose Header
- purpose: Canonical consumption map for an active SPEC, including the minimum slice boundary required for downstream planning.
- read_when: A downstream agent needs slice boundaries, readiness labels, dependencies by slice ID, or the Planning Interface state.
- do_not_use_for: Execution authorization, execution plans, file paths, commands, work packages, validation packs, or closure decisions.
- canonical_source_for: Slice IDs, slice boundaries, slice dependencies, slice readiness labels, and planning-facing constraints once activated.
- canonical_source_not_for: Business acceptance, final product decisions, detailed questions, implementation sequencing, validation commands, or post-execution closure.
- update_owner: `stnl_spec_manager` while the SPEC is active; closure removal follows the approved close flow.
- downstream_consumers: `planner`, `orchestrator`, `validation-eval-designer`, `execution-package-designer`, `reviewer`, `finalizer`.
- token_policy: Read Slice Model, Planning Interface, and the target slice first; read other slices only for declared dependencies.
- related_files: `feature_spec.md`, `open_questions.md`, `assumptions.md`, `decision_log.md`, `readiness_report.md`, `qa_checklist.md`.

## Slice Model
- parent_spec: SPEC-001
- split_required: pending | no | yes
- slice_model: pending | single_slice | multi_slice
- status: deferred | active | blocked
- reason: [short reason]
- rule: single-slice does not mean no slice; it means SL-001 represents the whole approved consumption boundary.

## Slice Identity Contract
- canonical_id_format: `SL-001`, `SL-002`, `SL-003`, sequential and zero-padded with three digits
- recommended_heading: `### SL-001 — [Short slice title]`
- id_field_required: every slice must include `id: SL-001`
- dependencies_must_use: canonical slice IDs only
- prohibited_slice_identifiers: `S-001`, `Slice 1`, `SLICE - 001`, `S1`, `slice-1`, title-only references
- id_stability: once assigned, a slice ID must not be renumbered or reused
- migration_rule: when labels are inconsistent, do not normalize silently; create a migration plan or ask for human confirmation when traceability could change

## Planning Interface
- status: deferred
- allowed_status_values: deferred | partial | active | blocked
- reason: Planning constraints must not be generated before readiness is stable.
- activation_condition: SPEC reaches Structured or Execution Ready with no blocking question that affects slice boundaries.
- informs: Later planning consumption only.
- does_not_authorize: execution
- does_not_define:
  - execution plan
  - file paths
  - commands
  - work packages
  - owned paths
- does_not_replace:
  - `planner`
  - `execution-package-designer`
  - `validation-eval-designer`
  - `finalizer`
- rule: do not infer semantic dependencies, parallelization hints, or planning constraints while deferred.

## Slice Dependency Overview
- SL-001 depends_on: []

## Slices

### SL-001 — Pending approved consumption boundary
- id: SL-001
- title: Pending approved consumption boundary
- objective: [Pending stable objective]
- in_scope:
  - [Pending]
- out_of_scope:
  - [Pending]
- dependencies: []
- state: deferred
- readiness_label: blocked
- planning_status: blocked_for_planning
- must_satisfy_acceptance: []
- must_preserve_decisions: []
- must_not_infer: []
- planning_blockers:
  - Waiting for SPEC readiness stabilization.
- can_be_planned_independently: no
- parallelization_hint: unknown
