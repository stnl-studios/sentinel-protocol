# Open Questions

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
- a critical open question may still be non-blocking if it does not prevent honest current maturity classification

## Questions
### Q-001
- status: OPEN | ANSWERED | DEFERRED | INVALIDATED
- priority: critical | high | medium | low
- question_kind: blocking | informative
- blocking: yes | no
- introduced_in_session: <1>
- category: objective | scope | actor | flow | rule | edge_case | dependency | acceptance | split
- question: [Write the question as clearly and narrowly as possible.]
- why_this_matters: [Explain the consequence of not knowing the answer.]
- affects: [List sections, flows, decisions, or slices impacted.]
- current_best_known_answer: [Optional interim understanding.]
- answer: [Fill once answered.]
- resolved_in_session: <session-number-or-none>
- follow_up_needed: yes | no
- notes: [Optional notes.]

### Q-002
- status: OPEN | ANSWERED | DEFERRED | INVALIDATED
- priority: critical | high | medium | low
- question_kind: blocking | informative
- blocking: yes | no
- introduced_in_session: <1>
- category: objective | scope | actor | flow | rule | edge_case | dependency | acceptance | split
- question: [Question]
- why_this_matters: [Impact]
- affects: [Affected artifacts or sections]
- current_best_known_answer: [Optional interim understanding.]
- answer: [Answer]
- resolved_in_session: <session-number-or-none>
- follow_up_needed: yes | no
- notes: [Optional notes.]
