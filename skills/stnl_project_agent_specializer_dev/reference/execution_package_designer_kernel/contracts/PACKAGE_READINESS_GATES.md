# Execution Package Designer Package Readiness Gates

Status: `EXECUTION_PACKAGE_DESIGNER_KERNEL: DRAFT_READY_FOR_HUMAN_AUDIT`.

This document defines the mandatory gate set for deciding whether an
`EXECUTION PACKAGE` is safe for coder entry. It is read-only kernel-lab
documentation, not runtime behavior.

## READY Gate

Emit `READY` only when all of these are true:

- current-round `EXECUTION BRIEF` is present and defines the authorized cut;
- current-round `VALIDATION PACK` is present and defines executable proof
  obligations;
- `PRE_EXECUTION_READINESS` states cut, approved scope, likely surfaces,
  guardrails with rationale, acceptance criteria, expected validations,
  relevant risks, must-not-change constraints, and known blockers;
- every `WORK_PACKAGE_ID` has one concrete objective and one owner candidate;
- `OWNED_PATHS` is bounded enough to define edit authority;
- `DO_NOT_TOUCH` protects shared contracts and non-package surfaces;
- `CHANGE_RULES` and `FORBIDDEN_INFERENCES` prevent architecture, product,
  auth, schema, persistence, payload, migration, or scope guessing;
- `RUN_COMMANDS` and `ACCEPTANCE_CHECKS` are package-local when available;
- `ACCEPTANCE_CHECKS` map to `VALIDATION PACK` obligations;
- `BLOCK_IF` is concrete enough for a coder to stop instead of expanding
  scope;
- the compact return preserves package ids, `OWNED_PATHS`, dependency order,
  parallelization eligibility signal, and exact blocker when blocked.

## BLOCKED Gate

Emit `BLOCKED` when any of these are true:

- `EXECUTION BRIEF` or `VALIDATION PACK` is missing, stale, contradictory,
  invalid, or from the wrong round;
- the package would require choosing architecture, product behavior, auth,
  schema, persistence, migration, payload, or public contract strategy;
- package boundaries cannot be made safe without re-planning the cut;
- validation obligations cannot be mapped into executable `ACCEPTANCE_CHECKS`;
- the package would authorize edits outside the approved cut;
- `OWNED_PATHS`, `DO_NOT_TOUCH`, dependency order, or `BLOCK_IF` remains broad,
  vague, or unsafe after targeted-local reading;
- producing a usable package would require broad discovery equivalent to
  implementation;
- correction-loop package updates would change the approved cut rather than
  refresh the minimum correction boundary.

## Handoff Error Gate

For absent or invalid upstream handoff, return a compact blocker equivalent to:

```text
STATUS: BLOCKED
REASON: required handoff missing or invalid
NEXT_OWNER: orchestrator
REQUEST: replay previous handoff or regenerate from owner
```

The blocker must name the blocked handoff, missing basis, unsafe coder-entry
reason, and the minimum upstream refresh or DEV decision needed to unblock.

## Parallelization Eligibility Gate

The package may state that work packages are eligible for parallel execution
only when:

- `OWNED_PATHS` do not overlap;
- dependencies do not require one coder to consume another coder's unmerged
  result;
- shared contracts are stable before coding;
- `DO_NOT_TOUCH` and `BLOCK_IF` make conflict handling explicit.

This is a signal only. The orchestrator decides whether to parallelize.

## Anti-Theater Package Gate

A package is not ready merely because it contains many fields. Reject `READY`
when the fields are broad prose, placeholders, generic commands, or unmapped
checks. In particular:

- `OWNED_PATHS: relevant files` is not ownership;
- `DO_NOT_TOUCH: unrelated files` is not a boundary;
- `RUN_COMMANDS: run tests` is not an executable command;
- `ACCEPTANCE_CHECKS: verify works` is not mapped proof;
- `BLOCK_IF: anything risky` is not a concrete stop condition;
- a long pseudo-code plan is not an execution package.

## Human Decision Gate

Ask for a DEV decision or upstream regeneration when package compilation
exposes a structural, contract, ownership, proof, or risk decision not settled
by the brief and pack. The package must block rather than transfer that choice
to coder.
