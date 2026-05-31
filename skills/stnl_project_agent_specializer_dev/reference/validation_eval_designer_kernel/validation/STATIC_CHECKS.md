# Validation Eval Designer Kernel Static Checks

Status: read-only executable structural support for
`VALIDATION_EVAL_DESIGNER_KERNEL: CLEAN_EXCELLENT_PASS`.

This pass is limited to the documentary, contractual, minimum-semantic dev
kernel lab with a hardened executable textual harness.

The local harness is
`reference/validation_eval_designer_kernel/validation/check-static.mjs`. It
uses Node built-ins only, is read-only, keeps real paths inside the repository,
ignores `__MACOSX` and `.DS_Store`, prints one line per check, and exits `1`
when a check fails.

Passing the harness does not execute agent runtime, implement a materializer,
write target-repository artifacts, change the productive skill, or grant
automatic promotion, runtime pass, materialization pass, target-repository
pass, productive-skill authorization, or materializer authorization.

## Implemented Checks

- `VED-CH-001`: required source, snapshot, kernel docs, and harness files exist.
- `VED-CH-002`: local snapshot is byte-for-byte equal to its productive copy
  origin.
- `VED-CH-003`: manifest lists the snapshot and exact kernel bundle.
- `VED-CH-004`: global docs declare the promoted dev kernel-lab status for this
  kernel while frozen orchestrator and planner statuses remain intact.
- `VED-CH-005`: kernel directory contains only the nine authorized regular
  files; symlinks and other non-regular entries are rejected.
- `VED-CH-006`: identity, agent version `2026.5.1`, `EXECUTION BRIEF`,
  ephemeral `VALIDATION PACK`,
  `READY`, `NEEDS_DEV_DECISION_HARNESS`, `HANDOFF_MISSING`,
  `HANDOFF_INVALID`, replay/regen, `proof-design`, and `targeted-local` remain.
- `VED-CH-007`: `HARNESS_DECISION_GATES.md` remains separate and protects
  strong proof, weak harness blocking, light validation, and human decisions.
- `VED-CH-008`: anti-theater examples remain explicit.
- `VED-CH-009`: planner, validation-runner, execution-package-designer,
  finalizer, resync, materializer, and durable-documentation drift remain
  explicitly prohibited.
- `VED-CH-010`: promoted dev kernel-lab status remains explicit while stale
  construction and pre-promotion markers are absent from this kernel bundle.
- `VED-CH-011`: dangerous role-drift, persisted-pack, and parallel-handoff
  literals appear only in explicit rejection contexts.
- `VED-CH-012`: golden documentation declares the ten required blocking cases.
- `VED-CH-013`: operational modes, header-aware reading, conditional risk
  tracks, stack quality guardrails, and compact handoff nuance remain explicit.
- `VED-CH-014`: golden harness and documentation retain three classified
  negative fixture classes, their embedded variants, and their required
  blockers.

## Out Of Scope

These checks do not execute a real agent, materialize artifacts, inspect a
target repo, authorize the productive skill, or authorize a materializer.
