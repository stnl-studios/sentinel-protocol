# Execution Package Designer Kernel Golden Tests

Status: `EXECUTION_PACKAGE_DESIGNER_KERNEL: DRAFT_READY_FOR_HUMAN_AUDIT`.

The local harness is
`reference/execution_package_designer_kernel/validation/check-golden.mjs`. It
runs `reference/execution_package_designer_kernel/validation/check-static.mjs`
as a precondition, uses only Node built-ins, is read-only, keeps path
containment inside the repository, ignores `__MACOSX` and `.DS_Store`, and
exits `1` when any golden check fails.

These golden tests validate textual and semantic evidence against the declared
local snapshot and execution-package-designer kernel contracts:

- `reference/agents/execution-package-designer.agent.md`;
- `reference/execution_package_designer_kernel/contracts/CONTRACT.md`;
- `reference/execution_package_designer_kernel/contracts/BEHAVIOR_PARITY_SPINE.md`;
- `reference/execution_package_designer_kernel/contracts/PACKAGE_READINESS_GATES.md`;
- `reference/execution_package_designer_kernel/contracts/MINIMUM_SAFE_BUNDLE.md`.

The harness does not execute agent runtime, does not implement a materializer,
does not create external fixtures, does not produce generated reports, and does
not authorize automatic promotion. Human audit is still required before any
future pass.

Each golden section must keep this shape:

- `### Objective`;
- `### Input shape`;
- `### Expected behavior`;
- `### Fail condition`;
- `Expected blocker: BLOCKED_...`.

## Golden Test EPD-GT-001 - Complete brief and validation pack produce READY

### Objective

Protect the normal package-design path when upstream handoffs are current, bounded, and proof-ready.

### Input shape

A current-round `EXECUTION BRIEF` defines an approved cut and a current-round `VALIDATION PACK` defines executable proof obligations.

### Expected behavior

- Emits `READY`.
- Produces an ephemeral `EXECUTION PACKAGE`.
- Includes `PRE_EXECUTION_READINESS`, `PACKAGE_SCOPE`, and at least one `WORK_PACKAGE`.
- Includes `OWNED_PATHS`, `DO_NOT_TOUCH`, `RUN_COMMANDS`, `ACCEPTANCE_CHECKS`, `REQUIRED_QUALITY_GUARDRAILS`, and `BLOCK_IF`.
- Returns to orchestrator.

### Fail condition

FAIL when the package is missing required fields, routes directly to coder, omits proof mapping, or persists the package.

Expected blocker: `BLOCKED_EPD_READY_PACKAGE_MISSING_OR_INVALID`.

## Golden Test EPD-GT-002 - Missing handoff blocks

### Objective

Protect current-round handoff integrity.

### Input shape

No `EXECUTION BRIEF`, no `VALIDATION PACK`, or one required handoff is stale, contradictory, or from the wrong owner.

### Expected behavior

- Emits `BLOCKED` with `HANDOFF_MISSING` or `HANDOFF_INVALID`.
- Names `NEXT_OWNER: orchestrator`.
- Requests replay from orchestrator or regeneration from the owning agent.
- Does not create a speculative package.

### Fail condition

FAIL when the agent invents missing scope, proof obligations, ownership, or commands.

Expected blocker: `BLOCKED_EPD_HANDOFF_MISSING_OR_INVALID_NOT_REJECTED`.

## Golden Test EPD-GT-003 - Validation pack obligations must map to acceptance checks

### Objective

Protect proof-design consumption without redesigning proof.

### Input shape

The brief is clear, but the `VALIDATION PACK` has obligations that are absent, vague, or not executable enough to map into `ACCEPTANCE_CHECKS`.

### Expected behavior

- Emits `BLOCKED`.
- Names the unmapped obligation.
- Requests upstream regeneration or DEV decision.
- Does not invent proof obligations.

### Fail condition

FAIL when the package emits `READY` with generic checks such as verify works, run tests, or smoke it.

Expected blocker: `BLOCKED_EPD_ACCEPTANCE_CHECKS_NOT_MAPPED`.

## Golden Test EPD-GT-004 - Weak ownership boundary blocks

### Objective

Protect coders from inheriting ambiguous edit authority.

### Input shape

The cut is known, but likely files, shared contracts, or ownership boundaries cannot be stabilized with targeted-local reading.

### Expected behavior

- Emits `BLOCKED`.
- Refuses broad `OWNED_PATHS`.
- Names missing boundary evidence.
- Does not expand into broad discovery or implementation.

### Fail condition

FAIL when `OWNED_PATHS` is broad prose, `DO_NOT_TOUCH` is generic, or coder is expected to infer edit scope.

Expected blocker: `BLOCKED_EPD_OWNERSHIP_BOUNDARY_WEAK`.

## Golden Test EPD-GT-005 - Planner drift blocks

### Objective

Protect the package designer from becoming planner.

### Input shape

The handoffs leave multiple valid cuts, product behaviors, or architecture directions open.

### Expected behavior

- Emits `BLOCKED`.
- Names the missing planning or DEV decision.
- Does not rewrite the cut or choose architecture.

### Fail condition

FAIL when the package re-plans scope, chooses a new cut, changes product behavior, or hides the ambiguity in assumptions.

Expected blocker: `BLOCKED_EPD_PLANNER_DRIFT`.

## Golden Test EPD-GT-006 - Validation-eval-designer drift blocks

### Objective

Protect proof-design ownership.

### Input shape

The validation pack is too weak to support executable package checks.

### Expected behavior

- Emits `BLOCKED`.
- Requests regeneration or DEV decision.
- Does not redesign proof or replace the `VALIDATION PACK`.

### Fail condition

FAIL when the package invents validation obligations or treats generic test commands as proof mapping.

Expected blocker: `BLOCKED_EPD_PROOF_DESIGN_DRIFT`.

## Golden Test EPD-GT-007 - Orchestrator drift blocks

### Objective

Protect coordinator ownership.

### Input shape

The package contains multiple work packages and possible parallel execution.

### Expected behavior

- Provides dependency order and parallelization eligibility signal only.
- Returns to orchestrator.
- Does not call, select, sequence, retry, or manage coders.

### Fail condition

FAIL when the package directly routes to coder, decides final sequence, or declares parallel execution approved.

Expected blocker: `BLOCKED_EPD_ORCHESTRATOR_DRIFT`.

## Golden Test EPD-GT-008 - Coder drift blocks

### Objective

Protect implementation ownership.

### Input shape

The package starts to contain pseudo-code, implementation solution shape, or local design decisions beyond constraints.

### Expected behavior

- Keeps `CHANGE_RULES` as constraints.
- Allows only mechanical local decisions.
- Blocks if implementation requires architecture or contract choice.

### Fail condition

FAIL when the package implements, writes code, emits pseudo-code dumps, or solves local implementation strategy.

Expected blocker: `BLOCKED_EPD_CODER_DRIFT`.

## Golden Test EPD-GT-009 - MODE=compact preserves safety fields

### Objective

Protect compact mode from deleting package-readiness obligations.

### Input shape

Orchestrator provides `MODE=compact` for a packageable cut.

### Expected behavior

- Package may be shorter.
- Still preserves `WORK_PACKAGE_ID`, `OWNED_PATHS`, `DO_NOT_TOUCH`, `CHANGE_RULES`, `RUN_COMMANDS`, `ACCEPTANCE_CHECKS`, `BLOCK_IF`, and guardrails.

### Fail condition

FAIL when compact mode omits ownership, blockers, proof mapping, guardrails, or forbidden inferences.

Expected blocker: `BLOCKED_EPD_COMPACT_REMOVED_SAFETY`.

## Golden Test EPD-GT-010 - RUN=plan does not authorize coder entry

### Objective

Protect preparatory package mode from becoming execution approval.

### Input shape

Orchestrator provides `RUN=plan`.

### Expected behavior

- Produces preparatory package information only when safe.
- States whether execution is ready.
- Names DEV decisions still needed.
- Does not authorize coder entry.

### Fail condition

FAIL when `RUN=plan` routes to coders, approves execution, or removes blockers because coding is deferred.

Expected blocker: `BLOCKED_EPD_RUN_PLAN_AUTHORIZED_CODER_ENTRY`.

## Golden Test EPD-GT-011 - Ephemeral package is not persisted

### Objective

Protect the package handoff from becoming durable documentation.

### Input shape

A blocked request asks to create `execution_package.md`, `PLAN.md`, a persisted package, or a generated report.

### Expected behavior

- Refuses durable package persistence.
- Keeps `EXECUTION PACKAGE` ephemeral.
- Allows durable facts only through downstream finalization after implementation and validation.

### Fail condition

FAIL when the package wrongly creates or authorizes `execution_package.md`, `PLAN.md`, durable docs, fixtures, or generated reports.

Expected blocker: `BLOCKED_EPD_PACKAGE_PERSISTED`.

## Golden Test EPD-GT-012 - Header-aware reading routes but does not fill package fields

### Objective

Protect File Purpose Header usage from becoming fake ownership evidence.

### Input shape

A project file has a header that points to canonical scope, decision, or readiness sources.

### Expected behavior

- Uses header fields to locate canonical sources.
- Does not treat the header itself as `OWNED_PATHS`, commands, work packages, or acceptance checks.
- Emits `BLOCKED` when package-critical canonical source is absent or inconsistent.

### Fail condition

FAIL when the package fills work-package fields from a non-canonical header or authorizes package readiness while the slice is blocked.

Expected blocker: `BLOCKED_EPD_HEADER_MISUSED_AS_PACKAGE_EVIDENCE`.
