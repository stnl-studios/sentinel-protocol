# Session Summary

## File Purpose Header
- purpose: Append-only working log of SPEC maturation sessions while the SPEC is active.
- read_when: Session history, maturity deltas, changed questions, assumptions, decisions, or next recommended questions need to be checked.
- do_not_use_for: Canonical final scope, accepted behavior, execution plans, file paths, commands, validation proof, or closure evidence.
- canonical_source_for: Session-by-session working history, maturity deltas, changed artifacts, and remaining session-level follow-up candidates.
- canonical_source_not_for: Final product decisions, accepted behavior, implementation sequencing, validation commands, or final closure summary.
- update_owner: `stnl_spec_manager` while the SPEC is active.
- downstream_consumers: `stnl_spec_manager`, `planner`, `orchestrator`, `reviewer`, `finalizer`.
- token_policy: Read only the latest session block first; open older sessions only when lineage, regression, or changed decision history is relevant.
- related_files: `feature_spec.md`, `spec_slices.md`, `open_questions.md`, `assumptions.md`, `decision_log.md`, `readiness_report.md`.

> Append-only log. Add a new session block for each working round. Do not rewrite old sessions except to correct a factual mistake explicitly.

## Session 1
- date: <YYYY-MM-DD>
- objective: [What was the purpose of this session?]
- state_before: Draft | Structured | Execution Ready | Blocked
- state_after: Draft | Structured | Execution Ready | Blocked
- readiness_before: <0-100>
- readiness_after: <0-100>
- what_was_defined:
  - [Item 1]
  - [Item 2]
- what_changed:
  - [Item 1]
  - [Item 2]
- what_was_removed_or_invalidated:
  - [Item 1]
- critical_open_items_remaining:
  - Q-001: [Question title or `none`]
  - Q-002: [Question title or `none`]
- blocking_questions_for_user:
  - Q-001: [Compact question or `none`]
  - Q-002: [Compact question or `none`]
- assumptions_added_or_updated: [A-001, A-002]
- decisions_added_or_updated: [D-001]
- questions_added_or_resolved: [Q-001, Q-002]
- files_updated:
  - `feature_spec.md`
  - `open_questions.md`
  - `readiness_report.md`
- next_recommended_questions:
  - Q-003: [Compact question candidate or `none`]
  - Q-004: [Compact question candidate or `none`]
- operational_output_status: [Draft | Structured | Execution Ready | Blocked]
- notes: [Optional notes.]

## Session 2
- date: <YYYY-MM-DD>
- objective: [Purpose]
- state_before: Draft | Structured | Execution Ready | Blocked
- state_after: Draft | Structured | Execution Ready | Blocked
- readiness_before: <0-100>
- readiness_after: <0-100>
- what_was_defined:
  - [Item 1]
- what_changed:
  - [Item 1]
- what_was_removed_or_invalidated:
  - [Item 1]
- critical_open_items_remaining:
  - Q-003: [Question title or `none`]
- blocking_questions_for_user:
  - Q-003: [Compact question or `none`]
- assumptions_added_or_updated: [A-003]
- decisions_added_or_updated: [D-002]
- questions_added_or_resolved: [Q-003]
- files_updated:
  - `feature_spec.md`
  - `decision_log.md`
  - `readiness_report.md`
- next_recommended_questions:
  - Q-004: [Compact question candidate or `none`]
- operational_output_status: [Draft | Structured | Execution Ready | Blocked]
- notes: [Optional notes.]
