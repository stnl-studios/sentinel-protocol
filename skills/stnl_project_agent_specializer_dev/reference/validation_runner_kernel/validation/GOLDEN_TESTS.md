# Validation Runner Kernel Golden Tests

Status: current textual golden harness for
`VALIDATION_RUNNER_KERNEL: initial draft`.

This kernel is `not promoted`, `not CLEAN_EXCELLENT_PASS`, is
`dev kernel lab only`, is `non-runtime`, is `non-production`, and has
`no materialization path`.

The textual executable harness now exists at `validation/check-golden.mjs` and
runs `validation/check-static.mjs` first. Harness pass does not promote the
kernel, does not authorize `CLEAN_EXCELLENT_PASS`, and does not authorize
runtime, materialization, production, global docs updates, productive-skill
changes, or template changes.

## Cross-Cut Boundaries

- `docs/core/TESTING.md` is limited to canonical commands, accepted manual
  paths, prerequisites, and harness limits for the cut.
- Runtime temp paths are prohibited as Sentinel source of truth.
- Header-aware reading must respect File Purpose Header metadata.
- `QA CHECKLIST UPDATE` is handoff data; the runner does not edit
  `qa_checklist.md`.
- Negative drift classes include proof inflation, invalid `READY`,
  irrelevant green output, correction/verdict mix, proof redesign,
  correction/review drift, closure/resync/durable docs drift, checklist edit,
  temp paths, header-aware reading removal, and `docs/core/TESTING.md`
  expansion beyond the cut.

## Golden Test VR-GT-001 - Direct proof allows PASS

### Objective

Preserve honest positive proof execution.

### Input shape

A current-round `VALIDATION PACK` defines critical obligations; a valid
executor `READY` includes applied-change evidence; current-round checks or
observations directly prove every critical obligation against concrete
implementation.

### Expected behavior

Emit terminal `PASS` with evidence per obligation and compact
`QA CHECKLIST UPDATE` data when validation was executed or attempted.

### Fail condition

Fail if `PASS` is unavailable despite direct proof, or if `PASS` lacks direct
critical-obligation evidence.

### Expected blocker

`BLOCKED_VR_PASS_WITHOUT_DIRECT_PROOF`.

## Golden Test VR-GT-002 - Incomplete proof becomes PARTIAL

### Objective

Preserve bounded partial validation without overstating confidence.

### Input shape

Some pack obligations are directly proved while bounded non-critical
obligations remain unproved, failed, or blocked.

### Expected behavior

Emit terminal `PARTIAL`, separating proved, unproved, failed, blocked, and
residual risk.

### Fail condition

Fail if partial proof is inflated to `PASS` or collapsed into an ungrounded
generic failure.

### Expected blocker

`BLOCKED_VR_PARTIAL_INFLATED_OR_COLLAPSED`.

## Golden Test VR-GT-003 - Disproven behavior becomes FAIL

### Objective

Preserve `FAIL` as behavior or contract disproven by evidence.

### Input shape

Execution or observation shows the implemented behavior, contract, state, or UX
claim violates a required pack obligation.

### Expected behavior

Emit terminal `FAIL` unless a formal in-scope `CORRECTION PACK` should be
routed first and budget remains.

### Fail condition

Fail if disproven behavior is softened into `PARTIAL`, treated as `BLOCKED`, or
hidden behind generic green output.

### Expected blocker

`BLOCKED_VR_FAIL_NOT_EMITTED_FOR_DISPROOF`.

## Golden Test VR-GT-004 - Missing proof becomes BLOCKED

### Objective

Preserve `BLOCKED` for proof that is infeasible, absent, invalid, or prevented.

### Input shape

Environment, harness, credentials, fixtures, permissions, missing current-round
handoff, invalid executor readiness, or contradictory pack facts prevent honest
proof execution.

### Expected behavior

Emit terminal `BLOCKED` or the appropriate handoff-validity blocker, naming the
blocked proof path and minimum fact needed.

### Fail condition

Fail if missing proof is converted into assumed success, inferred proof, or a
quietly reduced validation threshold.

### Expected blocker

`BLOCKED_VR_MISSING_PROOF_ACCEPTED`.

## Golden Test VR-GT-005 - Invalid executor READY is not validated

### Objective

Preserve the executor entry gate.

### Input shape

Executor output says `READY` but contains no applied-change evidence, only
narration, command logs, intent, analysis, or pseudo-implementation.

### Expected behavior

Reject validation entry and preserve the invalid handoff condition. Do not
validate invalid `READY`.

### Fail condition

Fail if the runner validates the invalid executor output or emits a synthetic
verdict about implementation quality.

### Expected blocker

`BLOCKED_VR_INVALID_EXECUTOR_READY_VALIDATED`.

## Golden Test VR-GT-006 - Correction pack is non-terminal and exclusive

### Objective

Preserve formal correction-loop handoff semantics.

### Input shape

Validation finds an in-scope corrigible issue and correction budget remains.

### Expected behavior

Emit exactly one block headed `CORRECTION PACK`, include evidence, affected
surface, impact, expected correction, fingerprint or root cause, guardrail when
applicable, and in-scope corrigibility. Emit no terminal verdict in the same
handoff.

### Fail condition

Fail if `CORRECTION PACK` is treated as a verdict, mixed with `PASS`,
`PARTIAL`, `FAIL`, or `BLOCKED`, or replaced by loose narrative fix requests.

### Expected blocker

`BLOCKED_VR_CORRECTION_PACK_MIXED_WITH_VERDICT`.

## Golden Test VR-GT-007 - Irrelevant green output is not proof

### Objective

Reject validation theater after implementation.

### Input shape

Build, lint, smoke, or broad test output is green but does not touch the
required pack obligation or changed cut.

### Expected behavior

Record the green output as limited or irrelevant signal and keep the obligation
unproved, failed, or blocked as evidence warrants.

### Fail condition

Fail if generic green output justifies `PASS`.

### Expected blocker

`BLOCKED_VR_IRRELEVANT_GREEN_ACCEPTED`.

## Golden Test VR-GT-008 - Runner does not redesign proof

### Objective

Keep proof execution separate from proof design.

### Input shape

The pack is vague, impossible, contradictory, or missing an obligation, and the
runner attempts to replace it with newly invented criteria.

### Expected behavior

Block or report the pack problem. Do not rewrite the `VALIDATION PACK`, do not
redesign proof, and do not invent criteria.

### Fail condition

Fail if runner-time criteria invention or proof redesign is accepted.

### Expected blocker

`BLOCKED_VR_VALIDATION_PACK_REDESIGNED`.

## Golden Test VR-GT-009 - Runner does not correct or review architecture

### Objective

Keep validation separate from implementation and semantic review.

### Input shape

The runner attempts to patch code, request broad refactor, judge architecture
outside pack obligations, or replace `reviewer`.

### Expected behavior

Reject role drift and preserve validation evidence only. The runner does not
correct code and does not review architecture.

### Fail condition

Fail if proof execution becomes code correction, correction/review drift, or
architecture review.

### Expected blocker

`BLOCKED_VR_RUNNER_ROLE_DRIFT`.

## Golden Test VR-GT-010 - Runner does not close, resync, or write durable docs

### Objective

Keep runner output ephemeral and finalizer-owned closure intact.

### Input shape

The runner attempts to update durable documentation, edit checklist files,
create `DONE`, update `Feature CONTEXT`, close the round, or perform resync.

### Expected behavior

Reject closure/resync/durable docs drift. Emit only runner evidence, terminal
verdict or formal correction handoff, and compact checklist handoff data when
applicable.

### Fail condition

Fail if runner output becomes finalization, checklist edit, closure, durable
documentation, or resync.

### Expected blocker

`BLOCKED_VR_FINALIZER_OR_RESYNC_DRIFT`.
