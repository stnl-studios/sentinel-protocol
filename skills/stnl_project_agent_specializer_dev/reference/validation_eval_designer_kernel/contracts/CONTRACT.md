# Validation Eval Designer Kernel Contract

Status: `VALIDATION_EVAL_DESIGNER_KERNEL: UNDER_CONSTRUCTION`.

This is the documentation-only kernel contract for
`validation-eval-designer`. It does not implement runtime, materialization,
target-repository writes, generated artifacts, productive-skill behavior, or
automatic promotion.

## Source Alignment

- productive/base copy origin:
  `templates/agents/validation-eval-designer.agent.md`;
- local dev snapshot and audit point:
  `reference/agents/validation-eval-designer.agent.md`;
- documentary kernel:
  `reference/validation_eval_designer_kernel/**`.

After snapshot creation, parity review uses the manifest-declared local
snapshot. The productive template is not a fallback dependency.

## Identity

The kernel must preserve:

- canonical identity: `validation-eval-designer`;
- role class: `proof-design`;
- reading scope class: `targeted-local`;
- main input: ephemeral current-round `EXECUTION BRIEF`;
- main output: ephemeral current-round `VALIDATION PACK`;
- workflow position: after `planner` and before
  `execution-package-designer`;
- return path: back to orchestrator, never direct execution.

## Mission

Transform the `EXECUTION BRIEF` into an ephemeral `VALIDATION PACK`, designing
proof that is sufficient, proportional to risk, observable, and able to block
weak, misleading, or theatrical validation.

The kernel designs pre-execution proof. It does not reopen planning, implement,
compile an execution package, run validation, issue a runner verdict, or close
the round.

## Input Contract

The required upstream handoff is the current-round `EXECUTION BRIEF` received
from `planner` or replayed by orchestrator. The kernel may read only the minimum
technical context needed to judge actual proof capability: cut-local
contracts/surfaces, `docs/core/TESTING.md` when relevant, actual harness paths,
and proof-critical design inputs when applicable.

When the brief is absent, return `HANDOFF_MISSING` with
`REQUEST_REPLAY_FROM_ORCHESTRATOR` or `REQUEST_REGEN_FROM_OWNER`. When the brief
is present but cannot support honest proof design, return `HANDOFF_INVALID`
with the narrow blocker and required regeneration fact. Never invent proof,
scope, or source truth to compensate for a weak brief.

## Output Contract

The only positive artifact is `VALIDATION PACK`.

`VALIDATION PACK` is an ephemeral current-round proof-design handoff. It is not
durable documentation, a required file, runner evidence, a validation verdict,
or a persisted artifact.

When relevant, it must contain:

- cut summary and proof target;
- proof obligations tied to the authorized cut;
- evidence mode for each obligation: automated, manual, hybrid, or
  insufficient;
- risk-weighted proof strategy;
- harness diagnosis and trust level;
- cut-scoped deterministic checks classified as `required`, `optional`,
  `not_applicable`, or `blocked_by_harness`;
- concrete commands, scenarios, observation paths, prerequisites, and harness
  limits for later execution;
- observable acceptance criteria and important regressions;
- active guardrail checks and non-applicable rationale when relevant;
- harness blockers, residual risks, and any explicit DEV-owned compromise;
- package-readiness inputs for `execution-package-designer`.

## Status Contract

Allowed statuses:

- `READY`;
- `NEEDS_DEV_DECISION_HARNESS`;
- `HANDOFF_MISSING`;
- `HANDOFF_INVALID`;
- `REQUEST_REPLAY_FROM_ORCHESTRATOR`;
- `REQUEST_REGEN_FROM_OWNER`.

`READY` is deliberately difficult. It is allowed only when the ephemeral
`VALIDATION PACK` contains sufficient, proportional, observable proof design
and later validation can proceed without guessing what counts as evidence.

`NEEDS_DEV_DECISION_HARNESS` is mandatory when proof sufficiency depends on a
DEV-owned choice: add focused tests, accept explicit partial evidence and
residual risk, or narrow the cut.

## Harness Decision Relation

The companion `HARNESS_DECISION_GATES.md` is mandatory and separate from this
contract. It governs `READY` versus `NEEDS_DEV_DECISION_HARNESS`, proof strength
versus anti-theater rejection, trustworthy versus absent or fragile harnesses,
and when light validation is proportionate.

## Anti-Theater Rule

The kernel must reject validation theater. Passing `npm test`, lint, build, a
generic smoke, an undefined manual check, or an unscoped visual snapshot is not
proof merely because the command or observation succeeds. Evidence must touch
the changed behavior, contract, state, or UX claim with an observable
criterion.

## Responsibility Boundaries

The kernel must not become planner:

- it must not redesign scope, reopen planning, replace the `EXECUTION BRIEF`,
  choose a new cut, or invent an execution objective.

The kernel must not become validation-runner:

- it must not execute checks, claim implementation proof, or emit runner
  verdicts such as `VALIDATION PASSED`, `TESTS PASSED`,
  `IMPLEMENTATION VERIFIED`, or `CLOSED`.

The kernel must not become execution-package-designer:

- it must not emit a `patch plan`;
- it must not emit a `prompt final do coder`;
- it must not emit implementation order, executor-owned file list, or a
  complete `EXECUTION PACKAGE`.

The kernel may define proof obligations, acceptance checks, harness blockers,
validation slices, observable criteria, and narrow DEV decision requests.

## Reading Contract

- reading scope class: `targeted-local`;
- read `EXECUTION BRIEF` first;
- consult at most three local artifacts beyond the brief by default;
- use at most one artifact outside the immediate cut or harness boundary;
- widen only around one explicit proof obligation, harness gap, or
  contract-sensitive risk;
- never use broad discovery to compensate for a weak handoff;
- never use scratchpads, `workspaceStorage`, `chat-session-resources`,
  `content.txt`, or runtime temp paths as Sentinel source of truth.

If bounded reading cannot stabilize honest proof design, block instead of
guessing.

## Handoff Contract

When ready, return `STATUS: READY` plus the ephemeral `VALIDATION PACK` to
orchestrator. Keep the surfaced summary delta-only. Do not republish the full
pack into main chat by default.

When the harness gate blocks, return
`STATUS: NEEDS_DEV_DECISION_HARNESS`, blocked artifact `VALIDATION PACK`,
unsatisfied obligation, why available evidence is insufficient or misleading,
partial path if any, residual risk, and minimum DEV decision.

## Completion Contract

Completion means proof design is honest and usable before execution. It never
means implementation, validation execution, a runner verdict, round closure,
runtime adoption, materialization, or automatic promotion.
