# Assumptions

## Summary
- active_assumptions: <0>
- assumptions_requiring_confirmation: <0>
- high_risk_assumptions: <0>

## Assumptions Register
### A-001
- status: ACTIVE | CONFIRMED | REJECTED | EXPIRED
- confidence: low | medium | high
- category: scope | behavior | actor | rule | dependency | technical_context | rollout
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
- category: scope | behavior | actor | rule | dependency | technical_context | rollout
- assumption: [Assumption]
- rationale: [Rationale]
- based_on: [Evidence]
- impact_if_wrong: [Impact]
- must_be_confirmed_by: <before structured | before execution ready | before implementation | optional>
- related_questions: [Q-001]
- related_spec_sections: [Sections]
- owner: <name-or-team>
- notes: [Optional notes.]
