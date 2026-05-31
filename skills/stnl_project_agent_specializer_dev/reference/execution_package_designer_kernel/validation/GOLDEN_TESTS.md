# Execution Package Designer Kernel Golden Tests

Status: `EXECUTION_PACKAGE_DESIGNER_KERNEL: HARDENED_FOR_FINAL_AUDIT`.

The local harness is
`reference/execution_package_designer_kernel/validation/check-golden.mjs`. It
runs `reference/execution_package_designer_kernel/validation/check-static.mjs`
as a precondition, uses only Node built-ins, is read-only, keeps path
containment inside the repository, ignores `__MACOSX` and `.DS_Store`, and
exits `1` when any golden check fails.

Each golden scenario must contain its own local evidence. Evidence from another
scenario, the snapshot, or aggregated contracts cannot fill an empty or
incomplete scenario. Each section must keep this shape:

- `### Objective`;
- `### Input shape`;
- `### Expected behavior`;
- `### Fail condition`;
- `Expected blocker: BLOCKED_...`.

Embedded omission fixtures derive the required `PRE_EXECUTION_READINESS` and
`PACKAGE_SCOPE` subfields from
`reference/agents/execution-package-designer.agent.md`. Any compact return with
`HANDOFF_STATUS` must include the complete `STATUS`, `HANDOFF_STATUS`,
`REQUEST`, `NEXT_OWNER`, and `REASON` envelope. Recovery validation does not
depend on an artificial `RECOVERY ENVELOPE` marker.

## Golden Test EPD-GT-001 - Complete package emits READY

### Objective

Protect the bounded positive path.

### Input shape

A current-round `EXECUTION BRIEF` and current-round `VALIDATION PACK` support an ephemeral `EXECUTION PACKAGE`.

### Expected behavior

- Emits `STATUS: READY`.
- Includes `PRE_EXECUTION_READINESS`, `PACKAGE_SCOPE`, `WORK_PACKAGE_ID`, `OWNED_PATHS`, `DO_NOT_TOUCH`, `RUN_COMMANDS`, `ACCEPTANCE_CHECKS`, `REQUIRED_QUALITY_GUARDRAILS`, and `BLOCK_IF`.

### Fail condition

FAIL when a mandatory field is absent or the package is persisted.

Expected blocker: `BLOCKED_EPD_READY_PACKAGE_MISSING_OR_INVALID`.

## Golden Test EPD-GT-002 - Missing handoff blocks

### Objective

Reject a missing current-round handoff.

### Input shape

The `EXECUTION BRIEF` or `VALIDATION PACK` is missing.

### Expected behavior

- Emits `STATUS: BLOCKED`.
- Emits `HANDOFF_STATUS: HANDOFF_MISSING`.
- Includes `REQUEST:`, `NEXT_OWNER: orchestrator`, and `REASON:`.

### Fail condition

FAIL when missing scope or proof is invented.

Expected blocker: `BLOCKED_EPD_HANDOFF_MISSING`.

## Golden Test EPD-GT-003 - Invalid handoff blocks

### Objective

Reject a contradictory or malformed handoff.

### Input shape

The `EXECUTION BRIEF` or `VALIDATION PACK` is invalid or contradictory.

### Expected behavior

- Emits `STATUS: BLOCKED`.
- Emits `HANDOFF_STATUS: HANDOFF_INVALID`.
- Includes `REQUEST:`, `NEXT_OWNER: orchestrator`, and `REASON:`.

### Fail condition

FAIL when an invalid handoff is silently repaired inside the package.

Expected blocker: `BLOCKED_EPD_HANDOFF_INVALID`.

## Golden Test EPD-GT-004 - Stale wrong-round or wrong-owner handoff blocks

### Objective

Protect current-round owner integrity.

### Input shape

A required handoff is stale, from the wrong round, or from the wrong owner.

### Expected behavior

- Emits `STATUS: BLOCKED`.
- Names stale, wrong-round, or wrong-owner basis in `REASON:`.
- Requests replay or regeneration through `NEXT_OWNER: orchestrator`.

### Fail condition

FAIL when stale, wrong-round, or wrong-owner handoff content authorizes coder entry.

Expected blocker: `BLOCKED_EPD_HANDOFF_STALE_WRONG_ROUND_OR_OWNER`.

## Golden Test EPD-GT-005 - Missing proof mapping blocks

### Objective

Protect proof mapping.

### Input shape

`VALIDATION PACK` obligations are absent from `ACCEPTANCE_CHECKS`.

### Expected behavior

- Emits `STATUS: BLOCKED`.
- Names the missing proof mapping.
- Does not invent proof obligations or substitute generic `run tests`.

### Fail condition

FAIL when unmapped validation obligations produce `STATUS: READY`.

Expected blocker: `BLOCKED_EPD_ACCEPTANCE_CHECKS_NOT_MAPPED`.

## Golden Test EPD-GT-006 - Broad discovery blocks

### Objective

Keep reading targeted-local.

### Input shape

Package boundaries cannot be stabilized without broad discovery.

### Expected behavior

- Emits `STATUS: BLOCKED`.
- Refuses repository-wide scanning as a substitute for weak upstream evidence.
- Does not transfer discovery cost to coder.

### Fail condition

FAIL when broad discovery is permitted to manufacture `OWNED_PATHS`.

Expected blocker: `BLOCKED_EPD_BROAD_DISCOVERY`.

## Golden Test EPD-GT-007 - Planner drift blocks

### Objective

Protect planner ownership.

### Input shape

Multiple valid cuts, product behaviors, or architecture directions remain open.

### Expected behavior

- Emits `STATUS: BLOCKED`.
- Does not rewrite the cut or choose a new cut.
- Requests the missing planning or DEV decision.

### Fail condition

FAIL when package design performs re-planning.

Expected blocker: `BLOCKED_EPD_PLANNER_DRIFT`.

## Golden Test EPD-GT-008 - Validation-eval-designer drift blocks

### Objective

Protect proof-design ownership.

### Input shape

The `VALIDATION PACK` is too weak for executable package checks.

### Expected behavior

- Emits `STATUS: BLOCKED`.
- Does not redesign proof or replace the `VALIDATION PACK`.
- Requests regeneration or a DEV decision.

### Fail condition

FAIL when package design invents validation obligations.

Expected blocker: `BLOCKED_EPD_PROOF_DESIGN_DRIFT`.

## Golden Test EPD-GT-009 - Orchestrator drift blocks

### Objective

Protect coordinator ownership.

### Input shape

Multiple `WORK_PACKAGE_ID` values expose dependency order and parallelization eligibility.

### Expected behavior

- Returns a parallelization eligibility signal to orchestrator.
- Does not call, select, sequence, retry, or manage coders.

### Fail condition

FAIL when final sequence or parallel execution is approved by package design.

Expected blocker: `BLOCKED_EPD_ORCHESTRATOR_DRIFT`.

## Golden Test EPD-GT-010 - Coder drift blocks

### Objective

Protect implementation ownership.

### Input shape

Package content starts to include pseudo-code, writes code, or implementation strategy.

### Expected behavior

- Keeps `CHANGE_RULES` as constraints.
- Allows only mechanical local decisions.

### Fail condition

FAIL when package design implements or emits a pseudo-code dump.

Expected blocker: `BLOCKED_EPD_CODER_DRIFT`.

## Golden Test EPD-GT-011 - Validation-runner drift blocks

### Objective

Protect proof-execution ownership.

### Input shape

Package design attempts to claim `VALIDATION PASSED`, `TESTS PASSED`, or `IMPLEMENTATION VERIFIED`.

### Expected behavior

- Emits `STATUS: BLOCKED`.
- Does not emit runner verdicts or close validation.

### Fail condition

FAIL when any of `VALIDATION PASSED`, `TESTS PASSED`, or `IMPLEMENTATION VERIFIED` is treated as package-design output.

Expected blocker: `BLOCKED_EPD_VALIDATION_RUNNER_DRIFT`.

## Golden Test EPD-GT-012 - Compact mode preserves safety

### Objective

Protect `MODE=compact`.

### Input shape

Orchestrator provides `MODE=compact`.

### Expected behavior

- Preserves `WORK_PACKAGE_ID`, `OWNED_PATHS`, `DO_NOT_TOUCH`, `CHANGE_RULES`, `RUN_COMMANDS`, `ACCEPTANCE_CHECKS`, `BLOCK_IF`, and guardrails.

### Fail condition

FAIL when compact mode removes safety fields.

Expected blocker: `BLOCKED_EPD_COMPACT_REMOVED_SAFETY`.

## Golden Test EPD-GT-013 - RUN plan does not authorize coder entry

### Objective

Protect preparatory mode.

### Input shape

Orchestrator provides `RUN=plan`.

### Expected behavior

- Produces a preparatory package only.
- Does not authorize coder entry.

### Fail condition

FAIL when `RUN=plan` routes to coders or approves execution.

Expected blocker: `BLOCKED_EPD_RUN_PLAN_AUTHORIZED_CODER_ENTRY`.

## Golden Test EPD-GT-014 - Package persistence blocks

### Objective

Protect ephemeral package handling.

### Input shape

A request asks for `execution_package.md`, `PLAN.md`, durable documentation, a persisted package, or a generated report.

### Expected behavior

- Keeps `EXECUTION PACKAGE` ephemeral.
- Refuses package persistence and durable documentation.

### Fail condition

FAIL when package design creates or authorizes persisted artifacts.

Expected blocker: `BLOCKED_EPD_PACKAGE_PERSISTED`.

## Golden Test EPD-GT-015 - Header routes but does not fill fields

### Objective

Protect header-aware reading.

### Input shape

A `File Purpose Header` points to canonical sources.

### Expected behavior

- Uses the header to locate canonical sources.
- Does not fill `OWNED_PATHS`, commands, work packages, or acceptance checks from the header.

### Fail condition

FAIL when package readiness is manufactured from a non-canonical header.

Expected blocker: `BLOCKED_EPD_HEADER_MISUSED_AS_PACKAGE_EVIDENCE`.

## Golden Test EPD-GT-016 - HANDOFF_READY is not READY

### Objective

Protect the readiness gate from a parallel marker.

### Input shape

The package emits `HANDOFF_READY` without `STATUS: READY`.

### Expected behavior

- Enforces `HANDOFF_READY != READY`.
- Rejects coder entry until explicit `STATUS: READY`.

### Fail condition

FAIL when `HANDOFF_READY` is treated as `READY`.

Expected blocker: `BLOCKED_EPD_HANDOFF_READY_TREATED_AS_READY`.

## Golden Test EPD-GT-017 - Replay recovery routes through orchestrator

### Objective

Protect replay recovery.

### Input shape

A current-round handoff was lost by the consumer but remains replayable by orchestrator.

### Expected behavior

- Emits `STATUS: BLOCKED`.
- Emits `HANDOFF_STATUS: REQUEST_REPLAY_FROM_ORCHESTRATOR`.
- Includes `REQUEST:`, `NEXT_OWNER: orchestrator`, and `REASON:`.

### Fail condition

FAIL when replay recovery searches temporary files or fabricates content.

Expected blocker: `BLOCKED_EPD_REQUEST_REPLAY_FROM_ORCHESTRATOR`.

## Golden Test EPD-GT-018 - Regeneration recovery routes through orchestrator

### Objective

Protect regeneration recovery.

### Input shape

A handoff cannot be replayed and must be regenerated by its owner.

### Expected behavior

- Emits `STATUS: BLOCKED`.
- Emits `HANDOFF_STATUS: REQUEST_REGEN_FROM_OWNER`.
- Includes `REQUEST:`, `NEXT_OWNER: orchestrator`, and `REASON:`.

### Fail condition

FAIL when regeneration recovery bypasses orchestrator or invents replacement content.

Expected blocker: `BLOCKED_EPD_REQUEST_REGEN_FROM_OWNER`.

## Embedded Negative Fixture Coverage

The harness keeps isolated negative fixtures for:

- every mandatory top-level package field omitted one at a time;
- every snapshot-derived `PRE_EXECUTION_READINESS` subfield omitted one at a
  time;
- every snapshot-derived `PACKAGE_SCOPE` subfield omitted one at a time;
- every recovery-envelope field omitted one at a time for `HANDOFF_MISSING`,
  `HANDOFF_INVALID`, `REQUEST_REPLAY_FROM_ORCHESTRATOR`, and
  `REQUEST_REGEN_FROM_OWNER`;
- package persistence;
- planner drift;
- coder drift;
- orchestrator drift;
- validation-runner drift;
- missing handoff;
- invalid handoff;
- stale, wrong-round, and wrong-owner handoffs;
- missing proof mapping;
- broad discovery;
- `HANDOFF_READY` treated as `READY`;
- replay and regeneration recovery.
