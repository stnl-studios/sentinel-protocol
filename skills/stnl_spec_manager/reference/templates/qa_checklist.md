# QA Checklist

## File Purpose Header
- purpose: Working checklist for SPEC quality, completeness, ambiguity, and testability.
- read_when: A SPEC or slice needs quality review before downstream consumption or validation design.
- do_not_use_for: Accepted behavior, closure evidence, execution plans, file paths, commands, or work packages.
- canonical_source_for: SPEC quality checks, completeness checks, ambiguity checks, and testability checks.
- canonical_source_not_for: Final accepted behavior, final decisions, validation evidence, closure summary, or implementation sequence.
- update_owner: `stnl_spec_manager` while the SPEC is active.
- downstream_consumers: `validation-eval-designer`, `reviewer`, `finalizer`.
- token_policy: Read failed/warning checks first; skip passed checks unless investigating a specific risk.
- related_files: `feature_spec.md`, `spec_slices.md`, `readiness_report.md`, `open_questions.md`, `assumptions.md`, `decision_log.md`.

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

## Observability / Telemetry Checks
- [ ] Relevant logs are emitted as expected
- [ ] Relevant metrics or events are visible
- [ ] Failures are diagnosable with available signals

## Notes
- [Add relevant validation notes, known tradeoffs, or partial validation decisions here.]
