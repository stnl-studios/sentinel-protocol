# Finalizer Kernel Closure Gates

Status: `FINALIZER_KERNEL: CLEAN_EXCELLENT_PASS`.

These gates are documentary/dev-only. They do not authorize runtime,
production, materialization, materializer, runtime loader, GitHub write, target
repo write, generated reports, fixtures, target artifacts, productive skill
activation, template mutation, snapshot mutation, or automatic future
promotion.

## Gates

1. Entry requires terminal round state or explicit execution-stage blockage.
2. Runner verdict is preserved, not reissued.
3. Reviewer signal is preserved when present.
4. Required review missing, unclear, or exposing unresolved material structural
   risk blocks clean closure.
5. Residual correction pack is preserved when budget exhaustion, repeated
   fingerprint or root cause, or non-automatic correction decision occurred.
6. `Feature CONTEXT` update is the minimum honest delta.
7. `DONE: yes` requires a real milestone; runner `PASS`, effort, and green
   checks do not create `DONE` automatically.
8. Resync request requires bounded factual out-of-feature delta.
9. The finalizer does not perform resync.
10. `qa_checklist.md` reconciliation must be runner-backed or reported as an
    explicit process gap.
11. Slice closure requires canonical `SL-001` style ID and evidence.
12. `READY` requires a complete closure ledger.
13. `BLOCKED` is required when closure would require guessing.
14. Runtime/temp handoff discovery through `workspaceStorage`,
    `chat-session-resources`, `content.txt`, scratchpads, or runtime temporary
    files is not allowed.
15. Implementation, planning, proof, review, and resync ownership remain outside
    finalizer scope.
16. `READY` is not runner `PASS`.
17. Runner `FAIL`, `PARTIAL`, and validation-owned `BLOCKED` remain runner
    verdicts, not finalizer statuses.
18. `PLAN.md` and legacy phase artifacts are not durable documentation.
19. Active SPEC `DONE.md` with `closure_status: not_closed` is invalid.
20. Docs/context update without explicit `DONE` and resync decisions is invalid
    closure.

## Blockers

The finalizer emits `BLOCKED` when any gate above cannot be satisfied with
current evidence. It does not compensate by broad discovery, code change,
validation rerun, substitute review, replanning, proof redesign, or resync
execution.
