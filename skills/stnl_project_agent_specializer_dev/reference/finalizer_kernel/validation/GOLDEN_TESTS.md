# Finalizer Kernel Golden Tests

Status: `FINALIZER_KERNEL: CLEAN_EXCELLENT_PASS`.

`validation/check-golden.mjs` is a dev-only textual/documentary harness. It runs
`check-static.mjs` as preflight. It does not authorize runtime, production,
materialization, materializer, runtime loader, GitHub write, target repo write,
generated reports, fixtures, target artifacts, productive skill activation,
template mutation, snapshot mutation, or automatic future promotion.

Each scenario contains:

1. `Objective`
2. `Input shape`
3. `Expected behavior`
4. `Fail condition`
5. `Expected blocker`

## Golden Test FNL-GT-001 - Runner PASS with sufficient evidence closes READY

### Objective

Preserve honest clean closure after runner `PASS`.

### Input shape

Runner verdict is `PASS`; execution evidence is sufficient; no unresolved
required review risk remains; reviewer signal is preserved when present.

### Expected behavior

Emit finalizer `READY`, update `Feature CONTEXT`, record closure ledger, and
make explicit `DONE: yes/no` plus `resync: yes/no` decisions.

### Fail condition

Fail if the ledger, Feature CONTEXT delta, DONE decision, or resync decision is
missing.

### Expected blocker

`BLOCKED_FNL_READY_LEDGER_INCOMPLETE`.

## Golden Test FNL-GT-002 - Runner PASS does not create DONE automatically

### Objective

Protect milestone honesty.

### Input shape

Runner verdict is `PASS`, but no real milestone was established.

### Expected behavior

Emit closure with `DONE: no` and explain that runner `PASS` is not automatic
milestone history.

### Fail condition

Fail if effort, green checks, or runner `PASS` creates `DONE` automatically.

### Expected blocker

`BLOCKED_FNL_DONE_INFLATION`.

## Golden Test FNL-GT-003 - Runner FAIL is preserved as runner verdict

### Objective

Keep runner verdict ownership separate from finalizer status.

### Input shape

Runner verdict is `FAIL` with evidence.

### Expected behavior

Preserve runner `FAIL`, consolidate durable failure truth when useful, and emit
only finalizer `READY` or `BLOCKED`.

### Fail condition

Fail if the finalizer reissues `FAIL` or converts it into runner `PASS`.

### Expected blocker

`BLOCKED_FNL_RUNNER_VERDICT_REISSUED`.

## Golden Test FNL-GT-004 - Runner PARTIAL requires honest residual work

### Objective

Prevent partial proof from becoming complete delivery.

### Input shape

Runner verdict is `PARTIAL` with proved and unproved portions.

### Expected behavior

Preserve runner `PARTIAL`, record pending or residual work, keep confidence
bounded, and avoid milestone inflation.

### Fail condition

Fail if partial progress is documented as complete closure.

### Expected blocker

`BLOCKED_FNL_PARTIAL_AS_DONE`.

## Golden Test FNL-GT-005 - Runner BLOCKED remains validation-owned blockage

### Objective

Preserve validation-owned blockage.

### Input shape

Runner verdict is validation-owned `BLOCKED`.

### Expected behavior

Preserve the blockage as runner output and consolidate current unconfirmed
state without treating blocked proof as partial success.

### Fail condition

Fail if validation-owned `BLOCKED` becomes finalizer verdict or success.

### Expected blocker

`BLOCKED_FNL_VALIDATION_BLOCKAGE_LOST`.

## Golden Test FNL-GT-006 - Execution-stage blockage before validation is preserved

### Objective

Handle pre-validation blockage without synthetic runner verdict.

### Input shape

Execution blocked before validation could honestly run.

### Expected behavior

Preserve execution-stage blockage and state that validation never ran.

### Fail condition

Fail if the blockage becomes synthetic runner `FAIL`, `PARTIAL`, or `BLOCKED`.

### Expected blocker

`BLOCKED_FNL_SYNTHETIC_RUNNER_VERDICT`.

## Golden Test FNL-GT-007 - Required reviewer missing or material risk blocks

### Objective

Preserve required review force.

### Input shape

Review was required, but reviewer output is missing, unclear, or reports
unresolved material structural risk.

### Expected behavior

Emit finalizer `BLOCKED` until the required review signal is available or the
material risk is resolved by the proper owner.

### Fail condition

Fail if clean closure ignores required review risk.

### Expected blocker

`BLOCKED_FNL_REQUIRED_REVIEW_RISK`.

## Golden Test FNL-GT-008 - Advisory reviewer signal is preserved without auto-block

### Objective

Preserve advisory review without overstating it.

### Input shape

Reviewer signal is `advisory` and contains no unresolved material structural
risk.

### Expected behavior

Preserve the advisory signal in the ledger without blocking automatically.

### Fail condition

Fail if advisory signal is dropped or treated as required by default.

### Expected blocker

`BLOCKED_FNL_ADVISORY_REVIEW_MISCLASSIFIED`.

## Golden Test FNL-GT-009 - Residual correction pack is preserved

### Objective

Keep correction-loop residue visible.

### Input shape

Budget exhaustion, repeated fingerprint or root cause, or non-automatic
correction decision produced a residual correction pack.

### Expected behavior

Preserve issue IDs, fingerprints or root causes, attempts, budget state, why
correction stopped, and remaining risk.

### Fail condition

Fail if residual correction material is softened, dropped, or executed by the
finalizer.

### Expected blocker

`BLOCKED_FNL_RESIDUAL_PACK_MISSING`.

## Golden Test FNL-GT-010 - QA checklist uses runner-backed evidence

### Objective

Protect QA evidence ownership.

### Input shape

Active SPEC has `qa_checklist.md` and runner supplied `QA CHECKLIST UPDATE`.

### Expected behavior

Reconcile checklist entries only from runner-backed evidence.

### Fail condition

Fail if QA success is invented from effort, intention, reviewer signal, or
unrelated green output.

### Expected blocker

`BLOCKED_FNL_QA_SUCCESS_INVENTED`.

## Golden Test FNL-GT-011 - Missing required checklist becomes process gap

### Objective

Preserve SPEC lifecycle ownership.

### Input shape

SPEC is `Execution Ready`, lacks `qa_checklist.md`, and lacks
`qa_tracking: not_applicable`.

### Expected behavior

Report an explicit process gap rather than create checklist content as
finalizer-owned success.

### Fail condition

Fail if missing checklist is treated as success or silent non-applicability.

### Expected blocker

`BLOCKED_FNL_QA_PROCESS_GAP`.

## Golden Test FNL-GT-012 - Slice-scoped closure requires SL-001 and evidence

### Objective

Preserve canonical slice closure.

### Input shape

Round is slice-scoped.

### Expected behavior

Require `SL-001` style ID and classify `concluida`, `parcial`, or `bloqueada`
with evidence, pending work or blockers, residual pack when any, resync
decision, and next eligible slice.

### Fail condition

Fail if slice status is declared without canonical ID or evidence.

### Expected blocker

`BLOCKED_FNL_SLICE_EVIDENCE_MISSING`.

## Golden Test FNL-GT-013 - Bounded out-of-feature delta requests resync

### Objective

Preserve resync decision without resync execution.

### Input shape

Round creates or exposes bounded factual out-of-feature delta.

### Expected behavior

Record `resync: yes`, provide narrow factual delta, and request
`resync.agent.md` without executing resync.

### Fail condition

Fail if finalizer performs resync or edits shared canonical docs directly.

### Expected blocker

`BLOCKED_FNL_RESYNC_BOUNDARY_DRIFT`.

## Golden Test FNL-GT-014 - Unbounded out-of-feature delta blocks

### Objective

Avoid speculative resync handoff.

### Input shape

Out-of-feature impact exists but cannot be bounded honestly.

### Expected behavior

Emit finalizer `BLOCKED` until the factual delta is bounded.

### Fail condition

Fail if speculative resync request or direct shared-doc edit is produced.

### Expected blocker

`BLOCKED_FNL_UNBOUNDED_RESYNC_DELTA`.

## Golden Test FNL-GT-015 - Runner evidence contradiction blocks

### Objective

Protect evidence reconciliation.

### Input shape

Runner verdict and observed evidence materially contradict each other.

### Expected behavior

Emit finalizer `BLOCKED` instead of smoothing contradiction into closure.

### Fail condition

Fail if contradiction is ignored.

### Expected blocker

`BLOCKED_FNL_VERDICT_EVIDENCE_CONTRADICTION`.

## Golden Test FNL-GT-016 - Incomplete closure ledger blocks

### Objective

Keep ledger mandatory.

### Input shape

Closure record lacks verdict or blockage, reviewer signal when present,
residual pack when present, artifacts altered, DONE decision, or resync
decision.

### Expected behavior

Emit finalizer `BLOCKED`.

### Fail condition

Fail if `READY` is emitted with an incomplete ledger.

### Expected blocker

`BLOCKED_FNL_LEDGER_INCOMPLETE`.

## Golden Test FNL-GT-017 - Boundary drift request is blocked

### Objective

Protect role boundaries.

### Input shape

Attempted request asks for implementation, fixing, replanning, validation rerun,
review substitution, proof redesign, cut redefinition, or resync execution.

### Expected behavior

Block the boundary drift and route to the proper owner when applicable.

### Fail condition

Fail if boundary drift is accepted.

### Expected blocker

`BLOCKED_FNL_BOUNDARY_DRIFT`.

## Golden Test FNL-GT-018 - Runtime temp handoff search is blocked

### Objective

Prevent non-canonical handoff discovery.

### Input shape

Attempted request searches `workspaceStorage`, `chat-session-resources`,
`content.txt`, scratchpads, or runtime temporary files for handoffs.

### Expected behavior

Reject the search and request replay or regeneration through the protocol owner.

### Fail condition

Fail if runtime/temp search is treated as Sentinel source of truth.

### Expected blocker

`BLOCKED_FNL_RUNTIME_TEMP_SEARCH`.

## Golden Test FNL-GT-019 - PLAN.md is not durable documentation

### Objective

Prevent legacy artifact promotion.

### Input shape

Closure tries to use `PLAN.md` or a legacy phase artifact as durable
documentation.

### Expected behavior

Reject the artifact as durable closure documentation.

### Fail condition

Fail if legacy phase artifact is accepted as durable docs.

### Expected blocker

`BLOCKED_FNL_LEGACY_DURABLE_DOC`.

## Golden Test FNL-GT-020 - Active SPEC DONE.md with not_closed is blocked

### Objective

Protect active SPEC closure state.

### Input shape

Active SPEC folder has `feature_spec.md` with `closure_status: not_closed` and a
request would create `DONE.md` there.

### Expected behavior

Block `DONE.md` in the active SPEC folder.

### Fail condition

Fail if active SPEC `DONE.md` is accepted.

### Expected blocker

`BLOCKED_FNL_ACTIVE_SPEC_DONE`.

## Golden Test FNL-GT-021 - Context update needs DONE and resync decisions

### Objective

Prevent weak docs-only closure.

### Input shape

Closure updates docs/context but omits explicit `DONE` and resync decisions.

### Expected behavior

Treat closure as invalid until both decisions are explicit.

### Fail condition

Fail if docs/context update alone is accepted as `READY`.

### Expected blocker

`BLOCKED_FNL_MISSING_DONE_RESYNC_DECISIONS`.

## Golden Test FNL-GT-022 - READY is not runner PASS

### Objective

Keep finalizer status separate from validation verdict.

### Input shape

Closure language tries to interpret finalizer `READY` as runner `PASS`.

### Expected behavior

Block the interpretation and preserve `READY` only as finalizer closure status.

### Fail condition

Fail if `READY` is treated as validation `PASS`.

### Expected blocker

`BLOCKED_FNL_READY_AS_PASS`.
