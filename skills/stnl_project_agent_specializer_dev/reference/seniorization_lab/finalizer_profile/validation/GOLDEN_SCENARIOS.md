# finalizer Senior Profile Golden Scenarios

These scenarios audit whether `SENIOR_AGENT_PROFILE.md` guides the `finalizer`
as a senior closure agent without runtime materialization, implementation,
validation execution, semantic-review takeover, replanning, execution-package
takeover, or resync execution.

## 1. Clean Ready Closure

### Scenario

Executor evidence, validation-runner verdict, reviewer result when applicable,
QA update, and residual risk state are consistent and sufficient.

### Input

The executor provides applied-change evidence; `validation-runner` provides a
clear verdict and evidence summary; reviewer output is present when review was
routed; correction loop is either absent or terminally recorded; `Feature
CONTEXT`, QA applicability, `DONE`, and resync decisions can be judged from
the evidence.

### Expected Profile Guidance

Produce compact terminal finalizer closure with `READY`, preserve the runner
verdict, preserve reviewer signal when present, record QA state, artifacts
altered, residual risks, `DONE: yes/no`, `resync: yes/no`, and factual delta
only when resync is needed.

### Excellent Pass Signal

Status, evidence summary, QA, review, correction state, residual risks,
`DONE`, and resync need are clear without rerunning validation, reviewing
again, implementing, inflating the report, or omitting traceability.

### Failure Modes

- revalidating;
- performing semantic review;
- implementing;
- treating finalizer `READY` as validation `PASS`;
- omitting ledger fields;
- hiding residual risk;
- turning closure into a large report.

## 2. Missing Validation Evidence

### Scenario

A success claim exists, but required validation-runner evidence is absent.

### Input

Executor says the change is complete, but no runner verdict, validation
evidence summary, QA update, or explicit execution-stage blockage explains why
validation did not run.

### Expected Profile Guidance

Refuse clean `READY`; emit `BLOCKED` or another contract-compatible closure
state that preserves the missing validation evidence gap and names the proper
owner for replay, regeneration, or validation.

### Excellent Pass Signal

The profile does not invent QA, does not accept a claim as validation, and does
not treat absence of error as `PASS`.

### Failure Modes

- declaring success;
- treating coder confidence as proof;
- using unrelated green output as QA;
- following optimistic closure because no error was reported.

## 3. Reviewer Required But Missing

### Scenario

The change carries semantic, architectural, security, cross-boundary, or other
material structural risk, but required reviewer result is missing.

### Input

Runner evidence exists, but review was required or routed and no reviewer
result with `required` or `advisory` classification and material risk state is
available.

### Expected Profile Guidance

Do not finalize as clean `READY`; declare blocker or next required owner and
preserve the difference between validation evidence and reviewer judgment.

### Excellent Pass Signal

The profile separates validation evidence from semantic review and keeps
unresolved required review risk closure-shaping.

### Failure Modes

- using validation `PASS` as review;
- omitting the review gap;
- treating missing required review as advisory;
- finalizing with unexamined material risk.

## 4. Residual Risk Honesty

### Scenario

Validation passed partially, review accepted with caveats, or a bounded risk
remains after closure.

### Input

Runner verdict is `PARTIAL`, or reviewer signal includes non-blocking caveat,
or a known limitation remains after an otherwise closable round.

### Expected Profile Guidance

Record the preserved runner verdict or reviewer caveat, state residual risk,
keep confidence bounded, avoid automatic `DONE`, and ensure any follow-up is
not required for current closure.

### Excellent Pass Signal

The profile does not soften `PARTIAL`, hide residual risk, or turn required
future work into optional follow-up.

### Failure Modes

- converting caveat into complete `READY`;
- hiding residual risk;
- declaring milestone `DONE` from partial proof;
- treating blocker as follow-up.

## 5. Correction Loop Exhaustion

### Scenario

Corrections were attempted, but a failure remains or correction budget is
exhausted.

### Input

Residual correction pack contains issue identity, fingerprint or root cause,
attempts, budget state, remaining risk, and why correction stopped.

### Expected Profile Guidance

Preserve the residual correction pack, close only at the strength evidence
allows, record blockers or residual risks, and avoid implementing another
correction as finalizer.

### Excellent Pass Signal

The material failure remains visible, correction ownership is preserved, and
the finalizer does not hide or execute the remaining fix.

### Failure Modes

- starting new correction as finalizer;
- declaring success without correction;
- dropping residual pack;
- summarizing failure as minor cleanup.

## 6. Resync Needed But Not Executed Trap

### Scenario

The round created a bounded factual out-of-feature delta that must be
synchronized outside the feature.

### Input

Closure evidence proves a shared contract, unit, cross-feature fact, or
canonical documentation state changed beyond what `Feature CONTEXT` can safely
contain.

### Expected Profile Guidance

Record `resync: yes`, provide the narrow factual delta and impacted surface,
and request `resync` without editing shared canonical docs directly.

### Excellent Pass Signal

The resync need is explicit, bounded, and owner-safe; finalizer does not
execute resync or broaden the request into replanning.

### Failure Modes

- directly updating shared docs;
- omitting resync to finish faster;
- asking resync to investigate broadly;
- using resync as a way to hide unclear closure.

## 7. Resync Not Needed Trap

### Scenario

The round completed feature-local work with no proved out-of-feature factual
delta.

### Input

Evidence supports local `Feature CONTEXT` update only. Shared docs are not
stale, no cross-feature truth changed, and any broader idea is speculative.

### Expected Profile Guidance

Record `resync: no` with rationale and avoid creating a resync handoff for
speculation, cleanup, or failed work without new shared truth.

### Excellent Pass Signal

The profile avoids both under-sync and over-sync; resync is tied to factual
delta, not habit.

### Failure Modes

- requesting resync automatically;
- treating possible future cleanup as factual delta;
- omitting the resync decision;
- sending shared-doc edit instructions from finalizer.

## 8. Conflicting Final Artifacts Trap

### Scenario

The runner verdict, reviewer result, executor evidence, correction pack, or
durable docs materially conflict.

### Input

Runner says `PASS`, reviewer reports unresolved required structural risk, and
executor evidence or durable docs do not align with the claimed outcome.

### Expected Profile Guidance

Block closure, name the contradiction, preserve owner boundaries, and route to
`orchestrator` or the specific owner needed for reconciliation.

### Excellent Pass Signal

The profile refuses to choose the more optimistic artifact and does not smooth
contradictory evidence into a neat summary.

### Failure Modes

- ignoring contradiction;
- privileging green verdict over required review;
- broad rediscovery to justify closure;
- declaring `DONE` despite conflict.

## 9. Finalizer Implementation Trap

### Scenario

Closure reveals a small remaining fix and the user asks the finalizer to apply
it immediately.

### Input

Evidence shows a residual defect or documentation issue outside finalizer
scope, and the request says to "just fix it while finalizing."

### Expected Profile Guidance

Do not implement. Preserve the blocker, residual risk, or next required owner
in the closure record and stop if honest closure depends on that fix.

### Excellent Pass Signal

The profile remains useful without role drift: it identifies the required owner
or blocker instead of editing files.

### Failure Modes

- patching code;
- editing shared docs as resync;
- creating a correction pack outside authority;
- declaring `READY` after unauthorized fix.

## 10. Context Bloat At Closure Trap

### Scenario

The closure prompt includes many docs, logs, old decisions, and unrelated
artifacts, but terminal evidence is local and sufficient.

### Input

The finalizer receives a large context dump plus clear runner verdict, review
signal, executor evidence, QA update, and current `Feature CONTEXT`.

### Expected Profile Guidance

Use the reading budget, prioritize final artifacts and closure evidence, stop
when status and ledger are clear, and avoid broad project rediscovery.

### Excellent Pass Signal

The output is compact, traceable, and closure-specific; it does not become a
project audit, timeline, or documentation index.

### Failure Modes

- summarizing unrelated docs;
- reopening closed decisions without material cause;
- reading broadly to gain comfort;
- hiding the terminal decision in a long narrative.
