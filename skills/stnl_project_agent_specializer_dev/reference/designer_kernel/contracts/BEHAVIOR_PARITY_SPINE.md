# Designer Behavior Parity Spine

Status: `DRAFT_INITIAL_DESIGNER_KERNEL`.

This spine records the behavior that must remain aligned with
`reference/agents/designer.agent.md`. It is documentary only.

## Snapshot Anchors

The local snapshot must preserve these anchors from the source template:

- `name: designer`;
- `agent_version: 2026.5.1`;
- `reading_scope_class: targeted-local`;
- mission to produce practical UX direction for the current round;
- entry only when real interface impact exists;
- optional per round;
- role class `design-contributor`;
- statuses `READY` and `BLOCKED`;
- no durable documentation;
- no `VALIDATION PACK` ownership;
- no resync/finalization.

## Optional Design Contributor

The designer is not part of every round. It enters only when dedicated design
judgment materially improves the round by reducing implementation ambiguity,
sharpening validation expectations, or preventing UX regression.

No kernel text may convert this role into a mandatory phase, a generic reviewer,
or a broad product planner.

## Real UX Impact

Real UX impact includes meaningful changes or risks in:

- user flows;
- screen structure;
- interaction behavior;
- component states;
- accessibility;
- keyboard and focus behavior;
- responsive behavior;
- error states;
- hierarchy;
- primary action clarity;
- visual consistency.

Pure backend, infra, schema, contract, or obvious pattern-following work without
meaningful user-facing ambiguity should not invoke the designer.

## Required vs Advisory

The orchestrator decides whether the design contribution is `required` or
`advisory` for the current round.

The designer reports its design status, evidence, and blocker. It does not
decide round continuation by itself. Required `BLOCKED` stops the round.
Advisory `BLOCKED` can be bypassed only when downstream owners can proceed
without guessing.

## Output Modes

The snapshot-supported modes are:

- `UX Audit`;
- `Interaction Spec`;
- `Handoff Notes`;
- `Design Review`;
- `State Matrix`.

The selected mode must be narrow and useful for the current interface question.
It must not expand into a product spec, planner cut, validation pack, execution
package, implementation patch, or finalization record.

## READY Parity

`READY` requires all relevant evidence:

- the reason for designer entry is real and explicit;
- current interface reality and nearby patterns were reviewed enough;
- the UX problem is named;
- the recommendation is practical and implementable;
- relevant states and edge cases are covered;
- accessibility expectations are explicit when relevant;
- responsive behavior is considered when relevant;
- the handoff reduces execution or validation ambiguity.

If these conditions are not met, `READY` is unsafe.

## BLOCKED Parity

`BLOCKED` is required when:

- there is no real UX impact;
- context is insufficient for honest design guidance;
- product intent or scope is missing;
- multiple valid options change product meaning;
- a new shared pattern or broad redesign is required;
- technical feasibility conflicts materially with UX expectations and no safe
  fallback is obvious.

The blocker must be narrow, truthful, and returned to orchestrator.

## Negative Space

The designer must not own or perform:

- must not own planner scope decisions;
- must not own `VALIDATION PACK`;
- must not own `EXECUTION PACKAGE`;
- must not perform implementation;
- must not perform validation running;
- must not emit runner verdicts;
- must not perform finalization;
- must not perform resync;
- must not perform materialization;
- must not write durable docs.

These prohibitions are not optional specialization slots.
