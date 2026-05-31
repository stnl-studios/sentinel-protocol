# Validation Eval Designer Kernel Golden Tests

Status: read-only semantic support for
`VALIDATION_EVAL_DESIGNER_KERNEL: UNDER_CONSTRUCTION`.

The local harness is
`reference/validation_eval_designer_kernel/validation/check-golden.mjs`. It
runs the static harness as a precondition and validates the ten mandatory
semantic scenarios below. It also classifies three embedded negative text
fixtures and fails if their bad inputs are accepted without the required
blockers. Passing does not grant automatic promotion or final status.

## Embedded Negative Fixtures

- `VED-NF-001`: theatrical `READY` supported by build, lint, generic smoke,
  and unrelated test success must produce
  `BLOCKED_VED_GENERIC_CHECK_THEATER_ACCEPTED`.
- `VED-NF-002`: vague manual `READY` with no scenario, state, action, or
  observable result must produce `BLOCKED_VED_VAGUE_MANUAL_PROOF_ACCEPTED`.
- `VED-NF-003`: runner verdicts, execution-package output, and
  `validation_pack.md` persistence drift must produce `BLOCKED_VED_RUNNER_DRIFT`,
  `BLOCKED_VED_EXECUTION_PACKAGE_DRIFT`, and `BLOCKED_VED_PACK_PERSISTED`.

## Golden Test VED-GT-001 - Sufficient observable proof allows READY

### Objective

Preserve honest positive readiness.

### Input shape

A valid `EXECUTION BRIEF` defines a bounded cut with sufficient, proportional,
observable proof paths.

### Expected behavior

Emit `READY` with an ephemeral `VALIDATION PACK`, proof obligations, evidence
modes, harness trust, and acceptance criteria.

### Fail condition

Fail if a sufficient pack cannot become ready or readiness lacks observable
proof.

Expected blocker: `BLOCKED_VED_READY_PACK_MISSING_OR_WEAK`.

## Golden Test VED-GT-002 - Critical weak harness asks DEV

### Objective

Preserve the harness decision gate for critical surfaces.

### Input shape

A critical changed surface has an absent, fragile, or misleading harness.

### Expected behavior

Emit `NEEDS_DEV_DECISION_HARNESS`, name blocked artifact `VALIDATION PACK`,
unsatisfied obligation, residual risk, and minimum DEV decision.

### Fail condition

Fail if weak proof is labeled ready or the agent silently chooses risk
tolerance.

Expected blocker: `BLOCKED_VED_CRITICAL_WEAK_HARNESS_READY`.

## Golden Test VED-GT-003 - Missing EXECUTION BRIEF blocks

### Objective

Preserve current-round handoff integrity.

### Input shape

No `EXECUTION BRIEF` is available.

### Expected behavior

Emit `HANDOFF_MISSING` with `REQUEST_REPLAY_FROM_ORCHESTRATOR` or
`REQUEST_REGEN_FROM_OWNER`.

### Fail condition

Fail if proof design is invented without the brief.

Expected blocker: `BLOCKED_VED_HANDOFF_MISSING_NOT_REJECTED`.

## Golden Test VED-GT-004 - Invalid EXECUTION BRIEF blocks

### Objective

Prevent proof invention from an unusable brief.

### Input shape

An `EXECUTION BRIEF` is present but too weak or ambiguous for honest proof
design.

### Expected behavior

Emit `HANDOFF_INVALID`, identify the narrow blocker, and request regeneration.

### Fail condition

Fail if the agent invents scope, evidence, or source truth.

Expected blocker: `BLOCKED_VED_HANDOFF_INVALID_NOT_REJECTED`.

## Golden Test VED-GT-005 - Generic build lint smoke cannot prove behavior

### Objective

Reject command-shaped validation theater.

### Input shape

A behavioral or business-rule change is supported only by build, lint, generic
smoke, or unrelated `npm test` success.

### Expected behavior

Reject `READY`; require claim-specific observable proof or
`NEEDS_DEV_DECISION_HARNESS`.

### Fail condition

Fail if generic command success is treated as sufficient behavioral evidence.

Expected blocker: `BLOCKED_VED_GENERIC_CHECK_THEATER_ACCEPTED`.

## Golden Test VED-GT-006 - Vague manual validation blocks

### Objective

Reject manual evidence without observability.

### Input shape

A manual check or visual snapshot lacks defined scenario, state, action, or
observable result.

### Expected behavior

Reject `READY` until the manual proof path becomes falsifiable and observable.

### Fail condition

Fail if vague manual text is accepted as proof.

Expected blocker: `BLOCKED_VED_VAGUE_MANUAL_PROOF_ACCEPTED`.

## Golden Test VED-GT-007 - Planner drift blocks

### Objective

Keep proof design from reopening planning.

### Input shape

The agent attempts to redesign scope, choose a new cut, replace the
`EXECUTION BRIEF`, or invent an execution objective.

### Expected behavior

Block and return the narrow upstream issue to orchestrator.

### Fail condition

Fail if validation design becomes planning.

Expected blocker: `BLOCKED_VED_PLANNER_DRIFT`.

## Golden Test VED-GT-008 - Validation-runner drift blocks

### Objective

Keep pre-execution proof design separate from proof execution.

### Input shape

The agent attempts to run checks or emit `VALIDATION PASSED`, `TESTS PASSED`,
`IMPLEMENTATION VERIFIED`, or `CLOSED`.

### Expected behavior

Reject the runner verdict and remain pre-execution proof-design only.

### Fail condition

Fail if a runner verdict is emitted.

Expected blocker: `BLOCKED_VED_RUNNER_DRIFT`.

## Golden Test VED-GT-009 - Execution-package drift blocks

### Objective

Keep proof design separate from executable package design.

### Input shape

The agent attempts to emit a `patch plan`, `prompt final do coder`, detailed
implementation order, executor-owned file list, or complete
`EXECUTION PACKAGE`.

### Expected behavior

Reject execution-package-designer drift and retain only proof obligations,
acceptance checks, harness blockers, validation slices, and observable
criteria.

### Fail condition

Fail if proof design becomes an implementation package.

Expected blocker: `BLOCKED_VED_EXECUTION_PACKAGE_DRIFT`.

## Golden Test VED-GT-010 - VALIDATION PACK remains ephemeral

### Objective

Prevent a current-round handoff from becoming durable storage.

### Input shape

The agent is asked to create `validation_pack.md` or another persisted stand-in.

### Expected behavior

Reject persistence and keep `VALIDATION PACK` ephemeral.

### Fail condition

Fail if a durable pack file or persistent substitute is created.

Expected blocker: `BLOCKED_VED_PACK_PERSISTED`.
