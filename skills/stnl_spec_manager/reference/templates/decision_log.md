# Decision Log

> Use this file as the auditable trail behind the implementation-facing SPEC. Capture only decisions that were actually taken or explicitly confirmed as source of truth, why they were chosen, which alternatives were considered, what was discarded, and how hard they are to reverse.
>
> If a direction is still speculative, depends on missing validation, or has not been consciously closed, keep it in `assumptions.md` or `open_questions.md` instead of forcing it into the decision log. The existence of a decision entry alone never proves strong `Execution Ready`.

## Summary
- active_decisions: <0>
- superseded_decisions: <0>
- high_reversal_cost_decisions: <0>

## Decisions
### D-001
- status: ACTIVE | SUPERSEDED
- decided_in_session: <1>
- decision_scope: global | item-specific
- related_item: <spec-wide | endpoint/report/export/etc>
- decision: [Describe the decision clearly and unambiguously.]
- rationale: [Explain why this decision was made.]
- alternatives_considered:
  - option: [Alternative 1]
    outcome: chosen | discarded
    why: [Short reason.]
  - option: [Alternative 2]
    outcome: discarded
    why: [Short reason.]
- impacts:
  - [Impact 1]
  - [Impact 2]
- related_questions: [Q-001]
- related_assumptions: [A-001]
- related_spec_sections: [List sections]
- reversal_cost: low | medium | high
- source_of_truth: [User confirmation, project rule, prior product decision, validated existing contract, etc. If this is still speculative, do not create a decision entry yet.]
- reversal_notes: [Why reversal cost has this level.]
- notes: [Optional notes, evidence pointer, or bounded comparison detail.]

### D-002
- status: ACTIVE | SUPERSEDED
- decided_in_session: <1>
- decision_scope: global | item-specific
- related_item: <spec-wide | endpoint/report/export/etc>
- decision: [Decision]
- rationale: [Rationale]
- alternatives_considered:
  - option: [Alternative 1]
    outcome: chosen | discarded
    why: [Short reason.]
- impacts:
  - [Impact 1]
- related_questions: [Q-002]
- related_assumptions: [A-002]
- related_spec_sections: [Sections]
- reversal_cost: low | medium | high
- source_of_truth: [Source. If still speculative, this should remain outside the decision log.]
- reversal_notes: [Why reversal cost has this level.]
- notes: [Optional notes.]
