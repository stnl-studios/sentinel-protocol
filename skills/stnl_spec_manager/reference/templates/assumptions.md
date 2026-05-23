# Assumptions

## File Purpose Header
- purpose: Canonical register of provisional assumptions used during SPEC maturation.
- read_when: A temporary assumption may affect scope, acceptance, readiness, risk, or a target slice.
- do_not_use_for: Final decisions, closure evidence, execution plans, or accepted product behavior.
- canonical_source_for: `A-*` assumptions, materiality, confirmation requirement, risk, status, and related questions.
- canonical_source_not_for: Final decisions, resolved scope, closure evidence, implementation sequence, or validation commands.
- update_owner: `stnl_spec_manager` while the SPEC is active.
- downstream_consumers: `planner`, `orchestrator`, `validation-eval-designer`, `reviewer`, `finalizer`.
- token_policy: Read Summary and material/blocking assumptions first; read low-risk assumptions only when referenced.
- related_files: `feature_spec.md`, `spec_slices.md`, `open_questions.md`, `decision_log.md`, `readiness_report.md`.

> Use this file for provisional direction and temporary hypotheses that are useful for honest scope or acceptance framing but are not confirmed enough to become fact or decision. Do not promote them into `feature_spec.md` or `decision_log.md` prematurely.
> Any `ACTIVE` assumption with `must_be_confirmed_by: before execution ready` blocks `Execution Ready` until it is confirmed, rejected, expired, or reclassified through a related decision or question. Reclassification means updating `must_be_confirmed_by` away from `before execution ready` and citing the decision or question that made it non-blocking.
> Any material assumption about product behavior, data, permission, persistence, validation, or error handling must also be represented in `open_questions.md` and referenced through `related_questions`.

## Summary
- active_assumptions: <0>
- assumptions_requiring_confirmation: <0>
- high_risk_assumptions: <0>

## Assumptions Register
### A-001
- status: ACTIVE | CONFIRMED | REJECTED | EXPIRED
- confidence: low | medium | high
- category: scope | behavior | actor | rule | dependency | technical_context | rollout | product | data | permission | persistence | validation | error_handling
- assumption: [Describe the temporary assumption clearly.]
- rationale: [Explain why this assumption is currently reasonable.]
- based_on: [What evidence or context partially supports it?]
- impact_if_wrong: [Describe what breaks or changes if it is false.]
- must_be_confirmed_by: <before structured | before execution ready | before implementation | optional>
- related_questions: [Q-001, Q-002]
- related_spec_sections: [List sections]
- owner: <name-or-team>
- notes: [Optional notes.]

### A-002
- status: ACTIVE | CONFIRMED | REJECTED | EXPIRED
- confidence: low | medium | high
- category: scope | behavior | actor | rule | dependency | technical_context | rollout | product | data | permission | persistence | validation | error_handling
- assumption: [Assumption]
- rationale: [Rationale]
- based_on: [Evidence]
- impact_if_wrong: [Impact]
- must_be_confirmed_by: <before structured | before execution ready | before implementation | optional>
- related_questions: [Q-001]
- related_spec_sections: [Sections]
- owner: <name-or-team>
- notes: [Optional notes.]
