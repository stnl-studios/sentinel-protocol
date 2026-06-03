# Designer Golden Tests

Status: `CLEAN_EXCELLENT_PASS`.

These golden tests describe positive and negative designer-kernel behavior for
the controlled designer kernel harness. They are textual contract scenarios,
not runtime materialization.

The golden harness is promotion-aware and accepts `CLEAN_EXCELLENT_PASS` as the
documentary status after the separately authorized promotion audit. This pass is
limited to kernel lab dev documentary validation, contractual validation,
minimum semantic validation, hardened executable textual harness validation, and
final human audit authorization. It does not authorize runtime pass,
materialization pass, target repo pass, productive skill authorization,
materializer authorization, GitHub writes, or target repo writes.

The harness validates each scenario by local subsection evidence. A phrase in
one golden test or subsection must not satisfy another test or subsection.
Negative fixtures are class-specific and must match exactly the expected
blocker classes, so generic wording cannot hide role drift.

## Negative Fixture Classes

- no-entry work claiming `READY` despite no real UX impact;
- planner drift through cut ownership, scope rewrite, or replacing
  `EXECUTION BRIEF`;
- `VALIDATION PACK` ownership drift and validation sufficiency claims;
- `EXECUTION PACKAGE` ownership drift, package readiness, coder prompt,
  executor-owned file list, or implementation order;
- implementation or validation-runner drift through edits, file writes, test
  execution, tests passed, validation passed, or implementation verified;
- durable docs, closure, resync/finalization, and materialization drift;
- broad redesign or product decision accepted without DEV-owned decision.
- `READY` claimed for real UX work without enough current surface, state,
  accessibility, responsive, or handoff evidence;
- advisory design output treated as a mandatory phase or round-continuation
  gate;
- required design output guessed from missing product intent, current UI
  reality, canonical pattern, or state behavior.

## Golden Test DSG-GT-001 - Required design contribution reaches READY

### Objective

Verify that a required current-round design contribution with real UX impact can
emit `READY`.

### Input shape

Orchestrator classifies the designer as `required` for a user-facing flow change
with interaction behavior, visible states, accessibility, and responsive impact.

### Expected behavior

The designer uses a narrow delivery mode, names the UX problem, checks current
patterns, recommends a practical direction, covers relevant states and edge
cases, includes accessibility and responsive expectations, and provides local
handoff cues for `coder-frontend` or `validation-eval-designer` without
guessing.

### Fail condition

Expected blocker: `BLOCKED_DSG_READY_WITHOUT_DESIGN_EVIDENCE`.

Fail if `READY` appears without real UX impact, current surface evidence,
states, accessibility, responsive behavior, and downstream handoff cues.

## Golden Test DSG-GT-002 - Advisory contribution remains bypassable only when safe

### Objective

Verify that advisory design work does not become a mandatory phase.

### Input shape

Orchestrator classifies the design contribution as `advisory`; the UI question
is useful but not required for honest execution or validation.

### Expected behavior

The designer may return useful UX direction or a narrow `BLOCKED`, but
orchestrator decides continuation. Advisory bypass is allowed only when
execution and validation can proceed honestly without design guessing. The
designer must not turn advisory classification into a required blocker or
mandatory phase.

### Fail condition

Expected blocker: `BLOCKED_DSG_ADVISORY_TREATED_AS_MANDATORY`.

Fail if the designer decides round continuation by itself or forces a mandatory
design phase.

## Golden Test DSG-GT-003 - No real UX impact does not enter

### Objective

Verify that pure non-interface work does not create a design phase.

### Input shape

The round is backend, infra, schema, contract, or obvious pattern-following work
with no meaningful user-facing ambiguity.

### Expected behavior

The designer returns `BLOCKED` or no-entry guidance explaining that there is no
real UX impact and returns control to orchestrator without inventing design
work.

### Fail condition

Expected blocker: `BLOCKED_DSG_NO_UX_IMPACT_READY`.

Fail if the designer emits `READY` for work with no real UX impact.

## Golden Test DSG-GT-004 - Required missing context blocks honestly

### Objective

Verify that required design work blocks when current interface reality is too
unclear.

### Input shape

Orchestrator classifies the contribution as `required`, but the affected
surface, current pattern, product intent, or key state behavior is missing.

### Expected behavior

The designer emits `BLOCKED`, names the missing fact or decision, explains why
it matters, and returns the blocker to orchestrator or DEV.

### Fail condition

Expected blocker: `BLOCKED_DSG_REQUIRED_CONTEXT_GUESSED`.

Fail if the designer invents product intent, current UI reality, canonical
patterns, or state behavior.

## Golden Test DSG-GT-005 - Planner drift is rejected

### Objective

Verify that designer does not become planner.

### Input shape

The output rewrites scope, chooses a new cut, owns operational planning,
replaces `EXECUTION BRIEF`, or makes product-wide decisions.

### Expected behavior

Reject planner drift and return the issue to orchestrator or DEV.

### Fail condition

Expected blocker: `BLOCKED_DSG_PLANNER_DRIFT`.

Fail if broad planning behavior is accepted as designer output.

## Golden Test DSG-GT-006 - VALIDATION PACK ownership drift is rejected

### Objective

Verify that designer does not become validation-eval-designer.

### Input shape

The designer output creates or owns `VALIDATION PACK`, claims validation
sufficiency, persists validation pack content, or replaces proof-design
ownership.

### Expected behavior

Reject validation ownership drift while allowing design cues for
`validation-eval-designer`.

### Fail condition

Expected blocker: `BLOCKED_DSG_VALIDATION_PACK_OWNERSHIP`.

Fail if `VALIDATION PACK` ownership is accepted as designer behavior.

## Golden Test DSG-GT-007 - EXECUTION PACKAGE ownership drift is rejected

### Objective

Verify that designer does not become execution-package-designer.

### Input shape

The designer output creates or owns `EXECUTION PACKAGE`, package readiness,
coder prompt, executor-owned file list, or implementation order.

### Expected behavior

Reject execution package drift while allowing implementation notes for
`coder-frontend`.

### Fail condition

Expected blocker: `BLOCKED_DSG_EXECUTION_PACKAGE_OWNERSHIP`.

Fail if `EXECUTION PACKAGE` ownership is accepted as designer behavior.

## Golden Test DSG-GT-008 - Implementation and validation running are rejected

### Objective

Verify that designer does not become coder or validation-runner.

### Input shape

The output edits code, writes files, runs tests, claims tests passed, claims
validation passed, or claims implementation verified.

### Expected behavior

Reject implementation and validation running drift. The designer may provide UX
direction and validation cues only.

### Fail condition

Expected blocker: `BLOCKED_DSG_IMPLEMENTATION_OR_RUNNER_DRIFT`.

Fail if implementation, validation running, or runner verdicts are accepted.

## Golden Test DSG-GT-009 - Durable docs and resync/finalization are rejected

### Objective

Verify that designer does not become durable documentation owner, finalizer, or
resync.

### Input shape

The output writes durable docs, updates `Feature CONTEXT`, `DONE`, ADR,
`PLAN.md`, closes the round, performs resync/finalization, or materializes
target artifacts.

### Expected behavior

Reject durable docs, closure, resync/finalization, and materialization drift.

### Fail condition

Expected blocker: `BLOCKED_DSG_DURABLE_DOCS_OR_CLOSURE`.

Fail if durable documentation, closure, resync, or materialization behavior is
accepted.

## Golden Test DSG-GT-010 - Broad redesign escalates to DEV

### Objective

Verify that designer does not smuggle product-wide redesign into a round-level
handoff.

### Input shape

The issue needs a new shared pattern, broad navigation change, product intent
decision, or multiple valid directions with different business meaning.

### Expected behavior

The designer emits `BLOCKED`, names the DEV-owned decision, and avoids inventing
a redesign.

### Fail condition

Expected blocker: `BLOCKED_DSG_BROAD_REDESIGN_NOT_ESCALATED`.

Fail if broad redesign or product decision is accepted as local design
contribution.
