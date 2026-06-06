# Validation Runner Proof Execution Gates

Status: `VALIDATION_RUNNER_KERNEL: initial draft`.

This kernel is `not promoted`, `not CLEAN_EXCELLENT_PASS`, is
`dev kernel lab only`, is `non-runtime`, is `non-production`, and has
`no materialization path`.

The textual executable harness now exists and validates these documented gates
read-only. Harness pass does not promote the kernel and does not authorize
runtime, materialization, production, global docs updates, productive-skill
changes, or template changes.

These gates document current proof-execution checks for the
`validation-runner` kernel.

## Gate 1 - Current-Round Proof Contract

Gate 1 current-round proof contract requires the runner to receive a
current-round `VALIDATION PACK` from `validation-eval-designer` or orchestrator
replay.

Reject or block when the pack is absent, stale, contradictory, too incomplete,
or not tied to the implementation cut. Do not redesign the pack and do not
invent missing criteria.

## Gate 2 - Valid Executor READY

Gate 2 valid executor `READY` requires a valid terminal executor `READY`
handoff with applied-change evidence.

Reject or block when the executor output is absent, implicit, ambiguous,
intermediate, descriptive-only, pseudo-implementation, command-log-only, or
`READY` without applied evidence. Do not validate invalid readiness.

## Gate 3 - Concrete Implementation

Gate 3 concrete implementation requires the validation target to be a concrete
implemented artifact matching the planned cut.

Reject or block when there is only a plan, promise, partial narration, intended
change, or unverifiable claim. Validation against no artifact is not a runner
verdict on implementation quality.

## Gate 4 - Obligation-by-Obligation Evidence

Gate 4 obligation-by-obligation evidence requires each pack obligation and
deterministic check to be executed or honestly classified from the available
harness and observation path.

Preserve `required`, `optional`, `not_applicable`, and `blocked_by_harness`.
Do not use broad repository health, generic green output, or adjacent checks as
proof when they do not touch the cut.

## Gate 5 - Direct Proof Threshold

Gate 5 direct proof threshold requires direct evidence for `PASS` on critical
obligations. Manual evidence is valid only when it contains observable
scenario, state, action, and result matching the pack.

Inference, implementation inspection, stale logs, intent, or unscoped success
can be recorded but cannot satisfy direct proof.

## Gate 6 - Verdict Selection

Gate 6 verdict selection requires exactly one terminal verdict only when no
correction handoff should be routed first:

- `PASS` when critical obligations are directly proved;
- `PARTIAL` when proof is real but incomplete or bounded residual gaps remain;
- `FAIL` when behavior or contract is disproven;
- `BLOCKED` when proof is infeasible, absent, invalid, or prevented.

The terminal verdict set is `PASS`, `PARTIAL`, `FAIL`, and `BLOCKED`.

## Gate 7 - Correction Exclusivity

Gate 7 correction exclusivity requires exactly one formal `CORRECTION PACK`
block when an in-scope corrigible issue should be corrected before terminal
verdict and budget remains.

Do not emit `PASS`, `PARTIAL`, `FAIL`, or `BLOCKED` in the same handoff. Do not
turn correction into broad architecture review, code fixing, replanning, or a
generic "fix all problems" request.

## Gate 8 - Finalizer Handoff Evidence

Gate 8 finalizer handoff evidence requires compact `QA CHECKLIST UPDATE`
evidence when validation was executed or attempted and terminal handoff goes to
`finalizer`.

The runner supplies handoff data only. It does not edit checklist files, does
not edit `qa_checklist.md`, does not close the round, does not create `DONE`,
does not update `Feature CONTEXT`, does not perform resync, and does not write
durable documentation.
