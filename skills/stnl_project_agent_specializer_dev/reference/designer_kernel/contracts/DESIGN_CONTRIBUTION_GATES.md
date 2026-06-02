# Design Contribution Gates

Status: `DRAFT_INITIAL_DESIGNER_KERNEL`.

These gates decide whether a designer contribution is allowed, ready, blocked,
or safely bypassable. They are documentary gates for the initial draft, not a
runtime implementation.

## Entry Gate

Allow designer entry only when the round has real UX impact.

Pass evidence must name at least one affected interface concern: user flow,
screen structure, interaction behavior, component state, accessibility, keyboard
or focus behavior, responsive behavior, error behavior, hierarchy, primary
action clarity, or visual consistency.

Fail when the request is pure backend, infra, schema, contract, obvious
pattern-following, generic cosmetic confirmation, or broad product strategy.

## Classification Gate

The orchestrator classifies the contribution as `required` or `advisory`.

The designer must preserve that classification in its output. It may explain why
the design question is risky or narrow, but it must not reclassify its own role,
force a mandatory design phase, or decide round continuation.

## READY Gate

`READY` is valid only when the contribution:

- is tied to real UX impact;
- uses one primary delivery mode;
- names the UX problem or risk;
- considers current product reality and nearby patterns;
- recommends a practical direction;
- covers relevant states and edge cases;
- makes accessibility expectations explicit when relevant;
- makes responsive expectations explicit when relevant;
- gives downstream execution or validation cues that avoid guessing;
- stays inside targeted-local authority.

Missing any material item makes `READY` unsafe.

## BLOCKED Gate

`BLOCKED` is valid and required when honest UX direction cannot be produced
inside the round.

Common blockers:

- no real UX impact after inspection;
- insufficient interface context;
- missing product decision;
- product-wide pattern or redesign needed;
- technical feasibility conflict without an acceptable fallback;
- required current pattern cannot be identified from targeted-local reading.

The blocker must include the missing fact or decision, why it matters, and the
next owner, normally orchestrator or DEV.

## Required Block Gate

If orchestrator classified the design contribution as `required`, `BLOCKED`
stops the round. The designer must return the blocker to orchestrator and must
not launder uncertainty into implementation or validation.

## Advisory Bypass Gate

If orchestrator classified the contribution as `advisory`, `BLOCKED` may be
bypassed only when execution and validation can proceed honestly without design
guessing.

Bypass is unsafe when the missing design answer affects primary behavior,
accessibility, focus, responsive layout, visible states, error recovery, or
meaningful product intent.

## Drift Gates

Reject any contribution that attempts to:

- must not plan the cut;
- must not own `VALIDATION PACK`;
- must not own `EXECUTION PACKAGE`;
- must not implement;
- must not run validation;
- must not close the round;
- must not write durable docs;
- must not perform resync/finalization;
- must not materialize target artifacts.
