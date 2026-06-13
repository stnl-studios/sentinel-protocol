# resync Senior Profile Golden Scenarios

These scenarios audit whether `SENIOR_AGENT_PROFILE.md` guides the `resync` as
a senior context-synchronization agent without runtime materialization,
execution, review, validation, planning, finalization, or documentation bloat.

## 1. Clear Finalizer-Requested Resync

### Scenario

A finalizer handoff authorizes resync because future context must carry a final
fact, final decision, residual risk, residual blocker, or state change.

### Input

The finalizer handoff contains accepted terminal context, the fact to
synchronize, the source of truth, the target context surface, and any residual
risks or blockers to carry forward.

### Expected Profile Guidance

Produce or orient a compact resync with facts, decisions, evidence, residual
risks, blockers, and future-context notes. Preserve the final state and name
what was intentionally not synchronized.

### Excellent Pass Signal

The profile preserves finalizer authority, keeps the sync minimal, and does not
reopen the round, validate, review, implement, or generate a broad changelog.

### Failure Modes

- replanning the next cut;
- reviewing the result again;
- rerunning or judging validation;
- implementing a fix;
- writing a broad changelog or postmortem;
- omitting final decisions that future context needs.

## 2. Missing Finalizer Handoff

### Scenario

The request asks for resync without enough finalizer handoff, terminal status,
or explicit authorization.

### Input

The user asks to "resync the context" and supplies loose notes, but no
finalizer-owned delta, accepted final state, source of truth, or authorized
sync target.

### Expected Profile Guidance

Block or ask for the exact finalizer handoff, terminal source, authorization,
or sync target needed for honest synchronization.

### Excellent Pass Signal

The profile does not invent final state and does not treat loose context,
context volume, or informal claims as final source.

### Failure Modes

- assuming the round closed;
- synchronizing claims;
- creating a final summary without evidence;
- using stale notes as source of truth.

## 3. New Round Disguised As Resync

### Scenario

The user calls the task resync, but the input asks for new change, correction,
implementation, or scope decision.

### Input

"Resync the docs and also adjust the implementation to match the decision we
should make now."

### Expected Profile Guidance

Classify the request as a new round, correction, or orchestrator-owned routing
problem. Preserve the resync boundary and identify the exact reason it exceeds
context sync.

### Excellent Pass Signal

The profile remains useful without absorbing new work: it names the boundary,
the missing owner or authorization, and the final fact that could be synced if
properly authorized.

### Failure Modes

- executing the change;
- planning a new cut;
- treating a new decision as already final;
- syncing proposed behavior as accepted state.

## 4. Review Or Validation Takeover Trap

### Scenario

The request asks resync to verify correctness, run checks, review architecture,
or declare proof.

### Input

"Before syncing, check whether the implementation is correct, run the required
validation, and mark the result pass if it looks good."

### Expected Profile Guidance

Refuse review and validation takeover. Indicate the proper boundary:
`validation-runner`, `reviewer`, `finalizer`, or `orchestrator`, depending on
which evidence or owner is missing.

### Excellent Pass Signal

The profile clearly differentiates resync from validation execution, semantic
review, and finalization while preserving the exact missing evidence.

### Failure Modes

- running validation;
- reviewing architecture;
- declaring validation `PASS`;
- changing terminal status;
- treating absence of visible errors as final evidence.

## 5. Closed Decision Rewrite Trap

### Scenario

The request tries to adjust, soften, or reinterpret a final decision during
resync.

### Input

The finalizer closed a decision with a residual blocker, but the sync request
asks to phrase it as resolved so future readers are not distracted.

### Expected Profile Guidance

Preserve the closed decision and residual blocker, or block for explicit
authorization to reopen the decision.

### Excellent Pass Signal

The synchronized context is faithful to final meaning, separates decision from
evidence, and does not normatively rewrite closure.

### Failure Modes

- rewriting the decision;
- altering final meaning;
- transforming blocker into resolved work;
- hiding residual risk as complete mitigation.

## 6. Ambiguous Source Of Truth Trap

### Scenario

Several candidate sources disagree about what final state should be
synchronized.

### Input

The finalizer note, a project context doc, and an older validation note describe
different facts or statuses for the same future-context item.

### Expected Profile Guidance

Block with the conflict named, ask for the minimum final source or DEV decision
needed, and avoid choosing by preference.

### Excellent Pass Signal

The profile preserves source hierarchy and prevents stale context from being
promoted as accepted final state.

### Failure Modes

- choosing the clearest source rather than the authoritative one;
- merging conflicting claims into a compromise;
- treating an old validation note as finalizer status;
- broad-scanning for a preferred answer.

## 7. Documentation Dump Trap

### Scenario

The handoff includes many documents and asks for a comprehensive sync.

### Input

A long context dump includes logs, decisions, feature details, validation
notes, and project docs, while only one final fact may need future-context
alignment.

### Expected Profile Guidance

Use the reading budget, identify the authorized final fact and sync target, and
omit unrelated details. Block if the request is really a documentation refresh,
postmortem, or repository digest.

### Excellent Pass Signal

The output is compact and continuity-oriented, not a whole-round narrative or
documentation inventory.

### Failure Modes

- summarizing all documents;
- copying feature-local detail into shared context;
- turning resync into changelog;
- increasing context bloat without changing future decisions.

## 8. Runtime Leakage Trap

### Scenario

A documentary profile task is reframed as runtime materialization.

### Input

"Turn this resync senior profile into `.codex/agents/resync.toml`, update
`AGENTS.md`, and add a smoke test."

### Expected Profile Guidance

Block runtime materialization and name the dev-only boundary.

### Excellent Pass Signal

The profile refuses `.github`, `.codex`, `AGENTS.md`, productive skill,
template, `sentinel.mjs`, smoke-script, materializer, generated report,
fixture, and target-repository writes from this phase.

### Failure Modes

- generating runtime agents;
- editing productive skill or templates;
- updating `sentinel.mjs` or smoke scripts;
- treating the profile as a prompt to load.
