# Reference Bundle Manifest

Skill: `stnl_spec_manager`

Required reference template files:
- `reference/templates/assumptions.md`
- `reference/templates/decision_log.md`
- `reference/templates/feature_spec.md`
- `reference/templates/open_questions.md`
- `reference/templates/qa_checklist.md`
- `reference/templates/readiness_report.md`
- `reference/templates/session_summary.md`
- `reference/templates/spec_slices.md`

These files are required in the installed reference bundle so the skill can render every supported artifact shape without searching outside its own bundle.

Generated artifact contract:
- New active SPEC creation or legitimate fork must materialize the canonical bundle artifacts required by `SKILL.md`: feature spec, open questions, assumptions, decision log, readiness report, spec slices, and session summary.
- Public modes are only `MODE=RESUME`, `MODE=PLANNING_INTERFACE`, and `MODE=CLOSE`; `MODE=NEW` is not a public mode.
- `spec_slices.md` is mandatory for every active SPEC. It is the canonical consumption map for the active SPEC, not only a split file.
- Single-slice SPECs still have `spec_slices.md` and `SL-001`; in that case, `SL-001` represents the whole approved consumption boundary.
- Every active SPEC must have at least `SL-001`, but `SL-001` does not mean the SPEC is ready for execution. It may remain deferred or blocked while planning readiness is unstable.
- Slice IDs must use canonical sequential zero-padded identifiers such as `SL-001`, `SL-002`, and `SL-003`; do not use `S-001`, `Slice 1`, `S1`, `slice-1`, or title-only references.
- `Planning Interface` lives in `spec_slices.md` as a bridge from SPEC to later planning. It may be enriched through `MODE=PLANNING_INTERFACE`, informs planning, does not authorize execution, and does not replace the planner, execution-package-designer, validation-eval-designer, or finalizer.
- `MODE=PLANNING_INTERFACE` acts only on an existing active SPEC, updates mainly `spec_slices.md`, may reflect minimal status in `readiness_report.md`, and must not generate an execution plan, work packages, final owned paths, final commands, or a final validation pack.
- Planning Interface fields must stay consumption-oriented: `planning_intent` states later planning intent without a plan; `planning_inputs_required` lists confirmed inputs still needed, not tasks; `planning_focus` names attention areas without technical sequence; `likely_implementation_surfaces` uses semantic hints, never final paths, owned paths, or ownership authorization; `validation_focus` names acceptance or validation focus, never commands or a final validation pack; `anti_drift_constraints` records decisions, constraints, or rules the planner must preserve; `handoff_notes_for_planner` gives short planner-facing notes without choosing an agent or calling orchestrator.
- Slice planning fields must stay non-executable: `planning_notes` captures boundary and consumption notes; `implementation_surface_hints` gives semantic surface hints, not final paths; `validation_hints` records risks or acceptance hints without commands; `risks_for_planner` names risks that can affect later planning; `downstream_handoff_expectations` states consumption expectations without building an execution package.
- Allowed `Planning Interface` states are `deferred`, `partial`, `active`, and `blocked`. Use `deferred` as the safe initial state when readiness is not stable; keep it deferred or blocked for blocking questions, unconfirmed material assumptions, ambiguity, unresolved heavy edge cases, scope or decision conflicts, or missing product/auth/schema/API/contract/architecture decisions.
- SPEC artifacts and `spec_slices.md` must not contain file-editing plans, commands, `OWNED_PATHS`, edit anchors, work packages, step-by-step implementation tasks, technical sequencing, executable validation plans, or post-execution closure.
- Generated SPEC files in the required bundle, including `session_summary.md`, include a `File Purpose Header` to reduce token usage and help downstream agents open the correct file. The header includes `token_policy`, but it does not replace canonical content, duplicate business rules, duplicate acceptance criteria or decisions, or authorize execution.
- Older projects without `File Purpose Header` remain compatible; absence of the header in legacy material is not an error.
- Active SPECs keep the auxiliary bundle, including `spec_slices.md`. Closed SPECs remain compact: when `MODE=CLOSE` results in `closed` or `closed_with_residuals`, only `feature_spec.md` remains in the SPEC folder, except ignored system entries, so `spec_slices.md` is not retained in the closed bundle.
- `qa_checklist.md` remains a required reference template and a conditional generated artifact while a SPEC is below execution readiness; when a SPEC or slice becomes `Execution Ready`, it must be materialized before `orchestrator` consumption unless `qa_tracking: not_applicable` is explicitly justified.
- While a SPEC remains active, an applicable `qa_checklist.md` may be reconciled by the finalizer from compact `validation-runner` evidence; it must not store raw logs, replace the runner verdict, or record success without real evidence.
- There is no Quick Plan, no Design First, and no Kiro-style `requirements/design/tasks` structure.
