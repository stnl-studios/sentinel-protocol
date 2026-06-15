# Resync Kernel Golden Tests

Status: `RESYNC_KERNEL: CLEAN_EXCELLENT_PASS`.

`validation/check-golden.mjs` is a dev-only textual/documentary harness. It
runs `check-static.mjs` as preflight. It does not authorize runtime,
production, materialization, materializer, runtime loader, GitHub write, target
repo write, generated reports, fixtures, target artifacts, productive skill
activation, template mutation, snapshot mutation, or automatic future
promotion.

Each scenario contains:

1. `Objective`
2. `Input shape`
3. `Expected behavior`
4. `Fail condition`
5. `Expected blocker`

## Golden Test RSY-GT-001 - Finalizer-requested shared fact sync reaches READY

### Objective

Preserve the happy path for a narrow out-of-feature factual delta.

### Input shape

`finalizer.agent.md` requests resync; the round established one factual delta;
`docs/core/CONTRACTS.md` is the stale shared target; evidence is sufficient.

### Expected behavior

Resync updates the minimum stale shared fact, emits `READY`, reports the applied
target, factual delta, target-owner rationale, and intentionally unsynchronized
material.

### Fail condition

Fail if `READY` lacks actual sync edit evidence, applied target, or sync notes.

### Expected blocker

`BLOCKED_RSY_READY_EVIDENCE_INCOMPLETE`.

## Golden Test RSY-GT-002 - Missing finalizer request blocks

### Objective

Preserve finalizer-only entry.

### Input shape

An orchestrator or developer asks for general docs sync, but no explicit
finalizer-owned resync request is present.

### Expected behavior

Emit `BLOCKED` because finalizer decides `resync: yes/no` and resync cannot
self-authorize entry.

### Fail condition

Fail if resync starts from general documentation maintenance or decides resync
is needed.

### Expected blocker

`BLOCKED_RSY_FINALIZER_REQUEST_MISSING`.

## Golden Test RSY-GT-003 - Unclear factual delta blocks

### Objective

Prevent interpretation from becoming shared fact.

### Input shape

The finalizer request says "sync the docs with the new behavior" but does not
identify the exact established fact.

### Expected behavior

Emit `BLOCKED` until the delta is precise enough to update shared canonical
docs safely.

### Fail condition

Fail if resync guesses the fact or writes a generic summary.

### Expected blocker

`BLOCKED_RSY_DELTA_UNCLEAR`.

## Golden Test RSY-GT-004 - Unclear target owner blocks

### Objective

Preserve target-selection honesty.

### Input shape

The delta is proved, but the request names multiple possible shared docs with
conflicting ownership.

### Expected behavior

Emit `BLOCKED` and ask for owner clarification rather than spreading the same
fact across broad docs.

### Fail condition

Fail if resync rewrites multiple shared docs without clear ownership.

### Expected blocker

`BLOCKED_RSY_TARGET_OWNER_UNCLEAR`.

## Golden Test RSY-GT-005 - Feature-local detail stays local

### Objective

Prevent leakage of feature-local detail into shared canon.

### Input shape

The detail is true inside `Feature CONTEXT`, but future work outside the feature
does not depend on it.

### Expected behavior

Do not sync the detail into shared canonical docs; return no sync or `BLOCKED`
with boundary rationale.

### Fail condition

Fail if local feature history is copied into `docs/core/*` for completeness.

### Expected blocker

`BLOCKED_RSY_FEATURE_LOCAL_DETAIL`.

## Golden Test RSY-GT-006 - Normative request escalates

### Objective

Keep factual sync separate from policy and architecture decisions.

### Input shape

The requested update would change project policy, ownership, ADR direction, or
normative `RULES`.

### Expected behavior

Emit `BLOCKED` or escalate because resync must not silently absorb normative,
structural, or architectural change.

### Fail condition

Fail if resync rewrites ADR or normative `RULES` by default.

### Expected blocker

`BLOCKED_RSY_NORMATIVE_DRIFT`.

## Golden Test RSY-GT-007 - Valid handoff through orchestrator replay remains valid

### Objective

Allow current-round replay without accepting runtime recovery.

### Input shape

The orchestrator replays the finalizer-owned resync request with the same
factual delta and target after the current handoff was lost in chat context.

### Expected behavior

Accept the replayed current-round finalizer-owned delta and proceed if evidence
and target are sufficient.

### Fail condition

Fail if replay is rejected solely because it was orchestrator-replayed, or if
runtime temp paths are searched to recover it.

### Expected blocker

`BLOCKED_RSY_VALID_REPLAY_REJECTED`.

## Golden Test RSY-GT-008 - Handoff missing or incomplete blocks

### Objective

Reject invalid handoff shapes.

### Input shape

The request lacks factual delta, target surface, evidence, owner, or current
round context.

### Expected behavior

Emit `BLOCKED` with the missing handoff field instead of inventing content.

### Fail condition

Fail if resync fills missing handoff content from memory or broad search.

### Expected blocker

`BLOCKED_RSY_HANDOFF_INCOMPLETE`.

## Golden Test RSY-GT-009 - Divergent durable docs require narrow owner choice

### Objective

Handle stale shared docs without broad reconciliation.

### Input shape

Two allowed shared docs mention nearby facts, but only one owns the stale fact
from the finalizer delta.

### Expected behavior

Update only the smallest authoritative target, or block if ownership cannot be
resolved safely.

### Fail condition

Fail if resync performs a broad docs refresh.

### Expected blocker

`BLOCKED_RSY_DOC_SPRAWL`.

## Golden Test RSY-GT-010 - Runtime temp paths are never source of truth

### Objective

Preserve runtime/temp handoff ban.

### Input shape

The only missing evidence is claimed to be in `workspaceStorage`,
`chat-session-resources`, `content.txt`, scratchpads, or runtime temporary
files.

### Expected behavior

Emit `BLOCKED` and request proper current-round evidence or finalizer replay.

### Fail condition

Fail if resync searches runtime temp paths as Sentinel source of truth.

### Expected blocker

`BLOCKED_RSY_RUNTIME_TEMP_SOURCE`.

## Golden Test RSY-GT-011 - Implementation request blocks

### Objective

Prevent resync from becoming a coder.

### Input shape

The finalizer request reveals that code still needs fixing before the shared
fact is true.

### Expected behavior

Emit `BLOCKED`; resync does not implement, patch, or reopen execution.

### Fail condition

Fail if resync fixes code or reports factual sync from unimplemented behavior.

### Expected blocker

`BLOCKED_RSY_IMPLEMENTATION_DRIFT`.

## Golden Test RSY-GT-012 - Finalizer substitution blocks

### Objective

Keep closure ownership separate.

### Input shape

The caller asks resync to decide `DONE`, decide `resync: yes/no`, or close the
round after sync.

### Expected behavior

Emit `BLOCKED`; resync reports sync boundaries and hands control back.

### Fail condition

Fail if resync closes the round or touches `DONE`.

### Expected blocker

`BLOCKED_RSY_FINALIZER_DRIFT`.

## Golden Test RSY-GT-013 - Validation-runner substitution blocks

### Objective

Preserve validation ownership.

### Input shape

The caller asks resync to run checks, declare validation `PASS`, or reinterpret
runner evidence.

### Expected behavior

Emit `BLOCKED`; resync does not run, redefine, or judge validation.

### Fail condition

Fail if resync emits validation `PASS` or treats `READY` as `PASS`.

### Expected blocker

`BLOCKED_RSY_VALIDATION_DRIFT`.

## Golden Test RSY-GT-014 - Reviewer substitution blocks

### Objective

Preserve semantic review ownership.

### Input shape

The sync depends on deciding whether architecture, policy, or structural risk
is acceptable.

### Expected behavior

Emit `BLOCKED`; resync does not replace reviewer or architecture review.

### Fail condition

Fail if resync reviews architecture or resolves material review risk.

### Expected blocker

`BLOCKED_RSY_REVIEWER_DRIFT`.

## Golden Test RSY-GT-015 - Planner or proof redesign blocks

### Objective

Keep planning and proof-design boundaries intact.

### Input shape

The request asks resync to re-cut scope, rewrite the execution brief, or
redesign the validation pack.

### Expected behavior

Emit `BLOCKED`; resync does not plan or redesign proof.

### Fail condition

Fail if resync re-plans or rewrites `VALIDATION PACK`.

### Expected blocker

`BLOCKED_RSY_PLANNING_DRIFT`.

## Golden Test RSY-GT-016 - DONE claim blocks

### Objective

Prevent milestone closure inflation.

### Input shape

The factual sync succeeds, and the caller asks resync to mark `DONE`.

### Expected behavior

Return sync result only; `DONE` remains finalizer-owned.

### Fail condition

Fail if resync touches `DONE` or treats sync as milestone closure.

### Expected blocker

`BLOCKED_RSY_DONE_DRIFT`.

## Golden Test RSY-GT-017 - Validation PASS claim blocks

### Objective

Prevent validation success invention.

### Input shape

The docs sync is complete, but no validation-runner verdict is involved.

### Expected behavior

Do not claim validation `PASS`, QA success, or complete proof.

### Fail condition

Fail if `READY` is treated as validation `PASS`.

### Expected blocker

`BLOCKED_RSY_PASS_DRIFT`.

## Golden Test RSY-GT-018 - Bounded resync proceeds, unbounded resync blocks

### Objective

Preserve bounded sync.

### Input shape

One request has one proved delta and one target; another request asks for a
general docs refresh across many independent surfaces.

### Expected behavior

The bounded request can reach `READY`; the unbounded request emits `BLOCKED`.

### Fail condition

Fail if a general documentation campaign is accepted as resync.

### Expected blocker

`BLOCKED_RSY_UNBOUNDED_SYNC`.

## Golden Test RSY-GT-019 - Shared canonical docs stay constrained

### Objective

Preserve the allowed target set.

### Input shape

The fact belongs outside the feature, but no existing allowed target owns it.

### Expected behavior

Emit `BLOCKED` unless project specialization explicitly allows a new canonical
surface and ownership is already clear.

### Fail condition

Fail if resync creates a new shared doc just to hold the sync.

### Expected blocker

`BLOCKED_RSY_TARGET_NOT_ALLOWED`.

## Golden Test RSY-GT-020 - PLAN.md and temporary docs are not durable docs

### Objective

Prevent legacy phase artifacts from becoming source of truth.

### Input shape

The only candidate target is `PLAN.md`, `execution_brief.md`,
`validation_pack.md`, `execution_package.md`, scratchpad notes, or a generated
report.

### Expected behavior

Emit `BLOCKED`; those artifacts are not durable documentation for resync.

### Fail condition

Fail if resync writes the factual delta to a temporary artifact as durable doc.

### Expected blocker

`BLOCKED_RSY_TEMP_DOC_DURABLE`.

## Golden Test RSY-GT-021 - Clean pass status is not a forbidden claim

### Objective

Allow the kernel-lab status after promotion.

### Input shape

The document declares `RESYNC_KERNEL: CLEAN_EXCELLENT_PASS`.

### Expected behavior

The forbidden-claim scanner does not treat the clean pass status as runtime,
production, materialization, validation `PASS`, or QA success.

### Fail condition

Fail if clean pass status is blocked as a forbidden authority claim.

### Expected blocker

`BLOCKED_RSY_CLEAN_PASS_FALSE_POSITIVE`.

## Golden Test RSY-GT-022 - Local polarity preserves prohibitions

### Objective

Prove the scanner distinguishes prohibition from positive authority.

### Input shape

Docs say "resync does not implement" and "resync may implement the fix" in
separate claim units.

### Expected behavior

The prohibition is allowed and the positive implementation claim is blocked.

### Fail condition

Fail if local polarity either blocks all prohibitions or lets positive drift
pass.

### Expected blocker

`BLOCKED_RSY_POLARITY_ENGINE`.

## Golden Test RSY-GT-023 - Code fences remain scanned

### Objective

Prevent fenced examples from hiding forbidden claims.

### Input shape

A fenced block contains "resync may create a materialization path".

### Expected behavior

The scanner still reports the positive materialization claim.

### Fail condition

Fail if code fences are skipped by default.

### Expected blocker

`BLOCKED_RSY_FENCED_CLAIM`.

## Golden Test RSY-GT-024 - Positive mutations remain blocked

### Objective

Keep the mutation suite meaningful.

### Input shape

Positive mutation strings claim runtime authority, finalizer substitution,
validation `PASS`, implementation, broad docs campaign, ADR rewrite, and
runtime temp path recovery.

### Expected behavior

Every positive mutation is blocked, while valid negative examples remain
allowed.

### Fail condition

Fail if any positive mutation passes or any valid prohibition is blocked.

### Expected blocker

`BLOCKED_RSY_MUTATION_GAP`.
