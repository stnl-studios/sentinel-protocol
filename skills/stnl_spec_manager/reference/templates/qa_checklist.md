# QA Checklist

## File Purpose Header
- purpose: Working checklist for SPEC quality, completeness, ambiguity, testability, minimum completion/QA expectations, and compact active validation tracking.
- read_when: A SPEC or slice needs quality review before downstream consumption, reaches `Execution Ready`, needs validation design, or needs post-validation checklist reconciliation while still active.
- do_not_use_for: Accepted behavior, closure substitute, raw logs, execution plans, file paths, work packages, or detailed command transcripts.
- canonical_source_for: SPEC quality checks, completeness checks, ambiguity checks, testability checks, minimum completion/QA checks for an executable SPEC, and runner-backed QA checklist results for an active SPEC when applicable.
- canonical_source_not_for: Final accepted behavior, final decisions, raw validation logs, final closure summary, implementation sequence, or replacement for the validation verdict.
- update_owner: `stnl_spec_manager` while the SPEC is being matured and before `Execution Ready`; `finalizer` may only reconcile runner-backed validation results during active-SPEC round closure when this artifact is already applicable.
- downstream_consumers: `validation-eval-designer`, `validation-runner`, `reviewer`, `finalizer`.
- token_policy: Read failed/warning checks first; skip passed checks unless investigating a specific risk.
- related_files: `feature_spec.md`, `spec_slices.md`, `readiness_report.md`, `open_questions.md`, `assumptions.md`, `decision_log.md`.

## Applicability Gate
> `qa_checklist.md` is expected for every executable SPEC or executable slice. Omit it only when the SPEC is not entering execution or when `qa_tracking: not_applicable` is explicitly justified in the SPEC lifecycle metadata. Even when no automated test exists, list the minimum manual, static, visual, rules, smoke, or contract validation expected for the cut.

- qa_tracking: applicable | not_applicable
- not_applicable_reason: <required only when qa_tracking is not_applicable>

## Validation Scope
- spec_id: <SPEC-001>
- target_scope: <full spec or slice id>
- readiness_reference: `readiness_report.md`
- spec_dod_items_in_scope: [SDOD-001]

## Core Acceptance Validation
- [ ] AC-001 validated
- [ ] AC-002 validated
- [ ] AC-003 validated

## Happy Paths
- [ ] Primary user flow completes successfully
- [ ] Expected outputs are visible and correct
- [ ] Required state transitions happen as specified

## Error Paths
- [ ] Expected validation failures behave correctly
- [ ] Permission or access denial behaves correctly
- [ ] External or dependency failures degrade safely

## Edge Cases
- [ ] Edge case 1 validated
- [ ] Edge case 2 validated
- [ ] Edge case 3 validated

## Regression Checks
- [ ] Related existing flow remains intact
- [ ] No unintended behavior change in adjacent areas
- [ ] Relevant backward compatibility expectations are preserved

## Executed Validation Tracking
> Use only compact evidence produced or preserved by `validation-runner` in the same round. Do not paste full logs, long commands, stack traces, or broad transcripts. Never mark an item as passed unless the runner evidence shows real execution or observation of that check. If evidence is absent, record `blocked` or `not_run` with a short reason instead.

| Check / AC | Result | Type | Compact command or method | Evidence |
| --- | --- | --- | --- | --- |
| AC-001 | not_run | automated/manual/unit/build/lint/smoke/rules | pending | pending |

## Observability / Telemetry Checks
- [ ] Relevant logs are emitted as expected
- [ ] Relevant metrics or events are visible
- [ ] Failures are diagnosable with available signals

## Notes
- [Add relevant validation notes, known tradeoffs, or partial validation decisions here.]
