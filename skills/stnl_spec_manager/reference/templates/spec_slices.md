# Spec Slices

## Split Rationale
- parent_spec: <SPEC-001>
- split_required: yes
- reason: [Explain why the full spec should not be handed off in a single orchestration cycle.]
- split_principle: [Describe the vertical cut logic used to preserve meaningful end-to-end execution.]

## Parent Spec Summary
[Summarize the overall initiative in 3 to 6 lines.]

## Slice Dependency Overview
- S-001 depends_on: []
- S-002 depends_on: [S-001]
- S-003 depends_on: [S-001, S-002]

## Slices
### S-001
- title: [Slice title]
- objective: [What outcome this slice must deliver.]
- in_scope:
  - [Item 1]
  - [Item 2]
- out_of_scope:
  - [Item 1]
  - [Item 2]
- key_flows:
  - [Flow 1]
  - [Flow 2]
- dependencies: []
- state: Draft | Structured | Execution Ready | Blocked
- ready_for_orchestrator: yes | no
- spec_dod_items_covered: [SDOD-001, SDOD-002]
- why_this_is_a_good_handoff_cut: [Explain why this slice is coherent and does not over-fragment execution.]
- open_questions: [Q-001]
- assumptions: [A-001]
- decisions: [D-001]

### S-002
- title: [Slice title]
- objective: [Outcome]
- in_scope:
  - [Item 1]
- out_of_scope:
  - [Item 1]
- key_flows:
  - [Flow 1]
- dependencies: [S-001]
- state: Draft | Structured | Execution Ready | Blocked
- ready_for_orchestrator: yes | no
- spec_dod_items_covered: [SDOD-003]
- why_this_is_a_good_handoff_cut: [Rationale]
- open_questions: [Q-002]
- assumptions: [A-002]
- decisions: [D-002]
