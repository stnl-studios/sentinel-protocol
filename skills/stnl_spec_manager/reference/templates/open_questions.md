# Open Questions

## File Purpose Header
- purpose: Canonical register of material uncertainty for the active SPEC.
- read_when: Questions, blocker status, severity, or confirmation needs affect scope, acceptance, readiness, or a target slice.
- do_not_use_for: Final accepted scope, resolved product decisions, implementation direction, or closure evidence.
- canonical_source_for: `Q-*` items, blocker status, severity, confirmation need, answer state, and question-to-decision references.
- canonical_source_not_for: Final accepted behavior, resolved decisions, execution plans, or implementation details.
- update_owner: `stnl_spec_manager` while the SPEC is active.
- downstream_consumers: `planner`, `orchestrator`, `validation-eval-designer`, `reviewer`, `finalizer`.
- token_policy: Read Summary and only blocking/high questions first, unless the target slice references more.
- related_files: `feature_spec.md`, `spec_slices.md`, `assumptions.md`, `decision_log.md`, `readiness_report.md`.

> This is the canonical question register. Do not replace it with a reduced summary. Keep one full question block per material item, and preserve answered, deferred, or invalidated entries when they matter for traceability.
>
> Any uncertainty, inference, probable behavior, missing product decision, or AI-suggested direction that is not confirmed must live here instead of becoming a requirement in `feature_spec.md`. Suggested options are allowed, but they are never defaults.

## Summary
- total_open: <0>
- blocking_open: <0>
- critical_open: <0>
- high_open: <0>
- medium_open: <0>
- low_open: <0>

## Prioritization Rules
- **critical**: blocks scope, acceptance, or execution readiness
- **high**: materially affects behavior, edge cases, or risk
- **medium**: improves precision but does not block progress
- **low**: useful refinement, wording, or later optimization

## Blocking Rules
- use `blocking: yes` only when the question prevents honest strong maturity or full consumption of the SPEC
- treat `blocking: no` as an informative question by default
- blocking questions must also be repeated in the skill's operational output under `QUESTIONS FOR USER`
- blocking or critical questions must also appear in `readiness_report.md` under `Questions Requiring User Answer`
- a critical open question may still be non-blocking if it does not prevent honest current maturity classification
- if a blocking question remains open, strong `Execution Ready` classification is not honest
- `Execution Ready` is prohibited while any question with `status: OPEN` and `blocking: yes` remains
- resolving a blocking question requires a factual direct evidence pointer or a human answer; suggested options are not decisions

## Questions
Use one full block per question. Do not collapse material open items into shorthand like `open: none` or `resolved: none`.

### Q-001 — [Generic question title]
- id: Q-001
- status: OPEN | ANSWERED | DEFERRED | INVALIDATED
- priority: critical | high | medium | low
- question_kind: blocking | informative
- blocking: yes | no
- introduced_in_session: <1>
- category: product_decision | data_contract | ux_flow | validation | non_blocking | objective | scope | actor | flow | rule | edge_case | dependency | acceptance | split
- evidence: [Factual evidence or `none`. Do not turn evidence into a default decision.]
- question: [Write the question as clearly and narrowly as possible.]
- why_it_matters: [Explain the consequence of not knowing the answer.]
- affects: [List sections, flows, decisions, or slices impacted.]
- suggested_options:
  - A) [Generic option]
  - B) [Generic option]
  - C) Other: describe expected behavior
- default: none
- do_not_assume: yes
- answer: [Fill once answered.]
- decision_log_ref: [D-001 or `none`]
- resolved_in_session: <session-number-or-none>
- follow_up_needed: yes | no
- notes: [Optional notes.]

### Q-002 — [Generic question title]
- id: Q-002
- status: OPEN | ANSWERED | DEFERRED | INVALIDATED
- priority: critical | high | medium | low
- question_kind: blocking | informative
- blocking: yes | no
- introduced_in_session: <1>
- category: product_decision | data_contract | ux_flow | validation | non_blocking | objective | scope | actor | flow | rule | edge_case | dependency | acceptance | split
- evidence: [Evidence or `none`]
- question: [Question]
- why_it_matters: [Impact]
- affects: [Affected artifacts or sections]
- suggested_options:
  - A) [Generic option]
  - B) [Generic option]
  - C) Other: describe expected behavior
- default: none
- do_not_assume: yes
- answer: [Answer]
- decision_log_ref: [D-002 or `none`]
- resolved_in_session: <session-number-or-none>
- follow_up_needed: yes | no
- notes: [Optional notes.]
