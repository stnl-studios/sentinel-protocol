# Validation Runner Kernel Static Checks

Status: future static-check design for
`VALIDATION_RUNNER_KERNEL: initial draft`.

This kernel is `not promoted`, `not CLEAN_EXCELLENT_PASS`, has
`no executable harness yet`, is `dev kernel lab only`, is `non-runtime`, is
`non-production`, and has `no materialization path`.

There is no `validation/check-static.mjs` in this phase. This document records
the future static checks only; it does not implement or authorize executable
harness behavior.

## Future Checks

- `VR-CH-001`: required source template, local snapshot, and initial draft
  kernel Markdown files exist.
- `VR-CH-002`: local snapshot is byte-for-byte equal to
  `templates/agents/validation-runner.agent.md`.
- `VR-CH-003`: kernel directory contains only the authorized initial-draft
  Markdown files and no executable `.mjs` files.
- `VR-CH-004`: every kernel document declares initial draft, not promoted,
  not clean pass, no executable harness, dev lab only, non-runtime,
  non-production, and no materialization path.
- `VR-CH-005`: identity invariants remain present: `validation-runner`,
  `2026.5.1`, `proof-execution`, `minimal-verification`, post-implementation
  entry, concrete implementation, `VALIDATION PACK`, and valid executor
  `READY` with applied-change evidence.
- `VR-CH-006`: terminal verdicts remain limited to `PASS`, `PARTIAL`, `FAIL`,
  and `BLOCKED`.
- `VR-CH-007`: `CORRECTION PACK` remains non-terminal, formal, exactly headed,
  and mutually exclusive with terminal verdicts.
- `VR-CH-008`: `QA CHECKLIST UPDATE` remains compact handoff data and does not
  authorize editing `qa_checklist.md`.
- `VR-CH-009`: `FAIL` remains disproven behavior or contract, while `BLOCKED`
  remains infeasible, absent, invalid, or prevented proof.
- `VR-CH-010`: `PASS` requires direct evidence for critical obligations and
  rejects irrelevant green output.
- `VR-CH-011`: role-drift prohibitions remain explicit: no proof redesign, no
  criteria invention, no silent proof reduction, no code correction, no
  architecture review, no closure, no resync, no durable-doc edits, no invalid
  executor validation, no inferred-evidence proof, no runtime, no
  materialization, and no production path.
- `VR-CH-012`: future golden documentation names positive, partial, fail,
  blocked, correction, and role-drift scenarios.

## Out Of Scope

These future checks will not execute a real agent, materialize artifacts,
inspect a target repo, authorize the productive skill, update global docs,
promote the kernel, or authorize a materializer.
