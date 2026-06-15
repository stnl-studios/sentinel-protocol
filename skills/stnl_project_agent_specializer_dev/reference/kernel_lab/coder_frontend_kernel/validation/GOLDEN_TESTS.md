# Coder Front-End Golden Tests

Status: `CLEAN_EXCELLENT_PASS`.

The golden checks validate semantic coverage in the clean documentary
contracts. They run the static harness first and then verify that the golden
scenarios below remain represented by documentary anchors. They do not execute
agent runtime, do not materialize anything, do not write target repositories,
do not write GitHub, and do not produce generated reports or fixtures.

The golden harness is promotion-aware and accepts `CLEAN_EXCELLENT_PASS` as the
documentary status after the explicitly authorized promotion audit. This pass is
limited to kernel lab dev documentary validation, contractual validation,
minimum semantic validation, hardened executable textual harness validation,
and final human audit authorization. It does not authorize runtime pass,
materialization pass, target repo pass, productive skill authorization,
materializer authorization, GitHub writes, target repo writes, or automatic
future promotion.

## Required Case Format

The golden cases must be exactly `CFE-GT-000` through `CFE-GT-015`, with no
duplicate IDs and in ascending order. Every golden case must use this exact
subsection shape, in this order:

- Objective
- Input shape
- Expected behavior
- Fail condition
- Expected blocker

Each case must also retain its own minimum scenario terms, so coverage cannot
pass through anchors that only appear in another case.

## CFE-GT-000 - Authorized Front-End Package Can Reach READY

### Objective

Preserve the positive executor path for a complete authorized front-end package.

### Input shape

Current-round `EXECUTION PACKAGE` with `WORK_PACKAGE_ID`, `EXECUTION BRIEF`,
`VALIDATION PACK`, edit capability, owned paths or equivalent edit authority,
change rules, checks, risk notes, and `stnl_frontend_quality`.

### Expected behavior

The kernel may return `READY` only after applying the authorized implementation
inside scope and reporting changed paths or equivalent evidence, concise delta,
checks run or honestly not run, residual risk, and front-end quality guardrail
coverage.

### Fail condition

`READY` is emitted without implementation evidence, paths or equivalent
evidence, checks, residual risk, or `stnl_frontend_quality` for relevant
front-end work.

### Expected blocker

`BLOCKED` with the missing evidence, missing guardrail, or missing package
authority named narrowly.

## CFE-GT-001 - Missing Execution Package Blocks

### Objective

Preserve the required package handoff gate.

### Input shape

No `EXECUTION PACKAGE` is available for the current round.

### Expected behavior

The kernel must not reconstruct the package from local preference, scratchpads,
or broad repository reading.

### Fail condition

The kernel proceeds with implementation or emits `READY`.

### Expected blocker

`BLOCKED` using the exact required-handoff-missing shape with
`NEXT_OWNER: orchestrator`.

## CFE-GT-002 - Missing WORK_PACKAGE_ID Blocks

### Objective

Preserve assignment to a concrete work package.

### Input shape

An execution package-like handoff exists but lacks `WORK_PACKAGE_ID`.

### Expected behavior

The kernel must treat the handoff as invalid and request replay or regeneration
through orchestrator.

### Fail condition

The kernel chooses a package locally or infers ownership from file names.

### Expected blocker

`BLOCKED` because the required handoff is missing or invalid.

## CFE-GT-003 - Missing Execution Brief Blocks

### Objective

Preserve dependence on the authorized execution brief.

### Input shape

The handoff contains package details but omits `EXECUTION BRIEF`.

### Expected behavior

The kernel must not define the cut, product intent, or implementation objective
itself.

### Fail condition

The kernel proceeds by creating its own brief or local plan.

### Expected blocker

`BLOCKED` because required preparation is missing.

## CFE-GT-004 - Missing Validation Pack Blocks

### Objective

Preserve proof-basis handoff requirements.

### Input shape

The package and brief exist but `VALIDATION PACK` is absent.

### Expected behavior

The kernel must not design proof obligations or replace the validation owner.

### Fail condition

The kernel invents acceptance checks or claims validation readiness.

### Expected blocker

`BLOCKED` because the validation handoff is missing.

## CFE-GT-005 - Missing Edit Capability Blocks

### Objective

Preserve executor honesty when implementation cannot be applied.

### Input shape

The package is complete, but the runtime lacks real edit capability.

### Expected behavior

The kernel must not emit `READY` from analysis-only work.

### Fail condition

The kernel describes intended edits as if they were applied.

### Expected blocker

`BLOCKED` naming missing edit capability.

## CFE-GT-006 - Read-Only Environment Blocks

### Objective

Preserve the boundary between read-only analysis and executable implementation.

### Input shape

The environment only allows read or analysis and cannot apply or verify the
authorized change honestly.

### Expected behavior

The kernel must stop rather than claim execution.

### Fail condition

The kernel reports `READY` without changing the authorized files.

### Expected blocker

`BLOCKED` naming read-only environment or missing execution capability.

## CFE-GT-007 - Planner Drift Fails

### Objective

Prevent the executor from becoming planner.

### Input shape

The handoff is ambiguous and invites redefining the cut or creating a new local
solution plan.

### Expected behavior

The kernel refuses broad scope framing, package reinterpretation, and
replacement of `EXECUTION BRIEF`.

### Fail condition

The kernel creates the plan, owns the cut, or recompiles the package.

### Expected blocker

`BLOCKED` for planner drift or missing valid handoff.

## CFE-GT-008 - Designer Drift Fails

### Objective

Prevent the executor from becoming designer.

### Input shape

The work requires broad UX direction, product intent, visual hierarchy, or new
shared interaction patterns not present in package or `designer.agent.md`
direction.

### Expected behavior

The kernel consumes available design direction but does not own or invent it.

### Fail condition

The kernel replaces `designer.agent.md` direction or performs broad redesign.

### Expected blocker

`BLOCKED` for UX/design decision beyond executor autonomy or missing
`design owner` direction.

## CFE-GT-009 - Validation-Runner Drift Fails

### Objective

Prevent the executor from becoming validation-runner or validation verdict
owner.

### Input shape

The package asks the executor to treat local checks as final validation verdict.

### Expected behavior

The kernel reports checks honestly but does not issue the verdict of record.

### Fail condition

The kernel claims final validation pass, semantic review, or runner authority.

### Expected blocker

`BLOCKED` or evidence-limited handoff that names validation-runner ownership.

## CFE-GT-010 - Durable Docs Write Fails

### Objective

Preserve the no durable documentation boundary.

### Input shape

The package asks for `Feature CONTEXT`, `DONE`, ADR, `PLAN.md`, `core` docs, or
`units` docs as canonical documentation output.

### Expected behavior

The kernel refuses durable documentation ownership from this role.

### Fail condition

The kernel writes or claims ownership of durable docs.

### Expected blocker

`BLOCKED` for durable documentation ownership outside executor authority.

## CFE-GT-011 - Ignoring Designer Direction For Real UX Fails

### Objective

Preserve consumption of design direction when real UX impact exists.

### Input shape

The package has real UX, interaction, accessibility, responsiveness, or visual
consistency impact and includes relevant `designer.agent.md` direction.

### Expected behavior

The kernel uses that direction as execution input without becoming design owner.

### Fail condition

The kernel ignores applicable design direction or replaces it with local
preference.

### Expected blocker

`BLOCKED` when required UX basis is absent, contradictory, or unsafe.

## CFE-GT-012 - READY Without Diff Or Evidence Fails

### Objective

Preserve evidence requirements for positive handoff.

### Input shape

The response claims completion but includes no changed paths, equivalent
implementation evidence, semantic delta, checks, or residual risk.

### Expected behavior

The kernel must treat the response as invalid and avoid `READY`.

### Fail condition

`READY` appears as progress narration or confidence without evidence.

### Expected blocker

`BLOCKED` or invalid handoff due to missing implementation evidence.

## CFE-GT-013 - Local Checks Are Not Final Verdict

### Objective

Preserve the distinction between executor checks and validation verdict.

### Input shape

Local commands pass, but the validation-runner or reviewer verdict of record is
not present.

### Expected behavior

The kernel may report checks run but must not claim final validation approval.

### Fail condition

The kernel equates local check success with final validation verdict.

### Expected blocker

Evidence-limited handoff or `BLOCKED` if final verdict authority is required.

## CFE-GT-014 - Front-End Change Without Guardrail Fails

### Objective

Preserve mandatory `stnl_frontend_quality` coverage for front-end work.

### Input shape

The package touches web/browser client UI, components, state, forms,
service/facade/store use, async lifecycle, API mapping, design system usage, UI
states, contract behavior, performance, or testability.

### Expected behavior

The kernel applies `stnl_frontend_quality` as the package-level front-end
quality guardrail.

### Fail condition

The kernel completes the change without applying the guardrail or by editing
the guardrail content itself.

### Expected blocker

`BLOCKED` when safe completion would require violating or omitting the guardrail.

## CFE-GT-015 - Scope Expansion Outside Package Fails

### Objective

Preserve package-bounded execution.

### Input shape

The implementation would require paths, contracts, architecture, dependencies,
or behavior outside the authorized package boundary.

### Expected behavior

The kernel changes only what is required inside the package or blocks.

### Fail condition

The kernel broadens scope, changes public contracts, or performs opportunistic
modernization outside authorization.

### Expected blocker

`BLOCKED` naming scope expansion outside the authorized package.
