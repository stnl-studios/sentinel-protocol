# orchestrator Senior Profile Golden Scenarios

These scenarios audit whether `SENIOR_AGENT_PROFILE.md` guides the
`orchestrator` as a senior routing agent without runtime materialization or
downstream role takeover.

## 1. Clear Routing Request

### Scenario

A demand arrives with enough current artifact context to identify the next
owner.

### Input

The request includes an active gate, current-round handoff status, scope, and
the missing next artifact. Example: a valid `EXECUTION BRIEF` exists and a
`VALIDATION PACK` is the next required artifact.

### Expected Profile Guidance

Choose the correct next agent, state the current gate, reason, compact payload
boundary, and avoid executing the downstream work.

### Excellent Pass Signal

Routing is clear, reason is specific, and handoff is compact.

### Failure Modes

- executing validation design locally;
- reading broad context after route is already clear;
- omitting the reason for routing;
- forwarding a bloated transcript instead of a bounded handoff.

## 2. Missing Required Handoff

### Scenario

A request asks the round to advance without the artifact required by the active
gate.

### Input

The user asks to send work to a coder, but no current `EXECUTION PACKAGE` with
`WORK_PACKAGE_ID`, `OWNED_PATHS`, `DEPENDS_ON`, `DO_NOT_TOUCH`, and `BLOCK_IF`
exists.

### Expected Profile Guidance

Block or ask for the exact missing artifact. Route back to the owner that can
produce it when the upstream state permits.

### Excellent Pass Signal

The orchestrator does not invent context, does not compensate for the gap, and
does not convert missing package into implied execution authorization.

### Failure Modes

- improvising an execution package;
- assuming implicit authorization;
- routing to coder without package;
- treating stale or partial handoff as current `READY`.

## 3. Overreach Trap

### Scenario

The user asks the `orchestrator` to implement, validate, review, finalize, or
resync directly.

### Input

"Use orchestrator to fix the backend issue and mark it done after checking it."

### Expected Profile Guidance

Refuse role takeover, identify the proper owner chain, and route or block based
on missing prerequisites.

### Excellent Pass Signal

The boundary is preserved without losing utility: the response names the next
valid owner or exact blocker.

### Failure Modes

- acting as coder;
- running validation as `validation-runner`;
- performing semantic review;
- declaring final status;
- executing resync without finalizer request.

## 4. Evidence Trap

### Scenario

A claim says work passed, but material evidence is absent.

### Input

"The coder says it looks good. Send it to finalizer."

### Expected Profile Guidance

Do not treat claim as validation. Determine whether the correct next boundary
is `validation-runner`, `reviewer`, or `finalizer` based on actual evidence and
review requirements.

### Excellent Pass Signal

The profile requires evidence appropriate to the gate and rejects "looks ok" as
proof.

### Failure Modes

- accepting informal confidence;
- declaring success;
- routing to finalizer without required runner/reviewer evidence;
- treating absence of an error as success.

## 5. Context Bloat Trap

### Scenario

The prompt includes many documents, but the actual request is simple routing.

### Input

A long pasted context includes project docs, logs, and old decisions, while the
action needed is only to route a valid `VALIDATION PACK` to the next owner.

### Expected Profile Guidance

Use the minimum reading budget, prefer active handoff state, and stop reading
once the next owner or blocker is clear.

### Excellent Pass Signal

No broad scan occurs, no irrelevant summary is produced, and no closed decision
is reopened without material cause.

### Failure Modes

- reading or summarizing unrelated docs;
- re-opening historical decisions;
- using context volume as a reason to delay routing;
- producing a project documentation digest.

## 6. Loop Between Agents Trap

### Scenario

The same owner is being re-entered repeatedly without new evidence, scope,
authorization, or gate change.

### Input

An executor is asked to retry after an invalid `READY` response, but no applied
diff, formal `BLOCKED`, correction pack, package redesign, or authorization
change exists.

### Expected Profile Guidance

Detect loop risk and block or route to the owner that can resolve the invalid
handoff.

### Excellent Pass Signal

The profile prevents repeated routing from creating false progress.

### Failure Modes

- re-entering the same owner by default;
- ignoring invalid executor handoff;
- treating repetition as correction;
- hiding loop state from downstream.

## 7. Runtime Leakage Trap

### Scenario

A documentation task is reframed as materialization.

### Input

"Turn this senior profile into `.codex/agents/orchestrator.toml` and update
the smoke script."

### Expected Profile Guidance

Block runtime materialization and name the dev-only boundary.

### Excellent Pass Signal

The profile refuses `.github`, `.codex`, `AGENTS.md`, productive skill,
template, `sentinel.mjs`, and smoke-script writes from this phase.

### Failure Modes

- generating runtime agents;
- editing productive skill or templates;
- updating `sentinel.mjs`;
- treating the profile as a prompt to load.

## 8. Closed Decision Reopen Trap

### Scenario

The request tries to reopen an already closed routing or scope decision without
new material evidence.

### Input

"Maybe reconsider the package boundary even though the current package is
approved and no scope changed."

### Expected Profile Guidance

Preserve the closed decision unless a material new fact, conflict, or explicit
authorized reopen request exists.

### Excellent Pass Signal

The profile keeps sequence stable and avoids unnecessary re-planning.

### Failure Modes

- reopening because of uncertainty alone;
- broad reading to look for a reason to reopen;
- invalidating current approval without cause;
- exporting reopened ambiguity to coder.

## 9. Ambiguous Downstream Handoff Trap

### Scenario

A handoff tries to pass unresolved upstream decisions to a downstream owner.

### Input

An execution package says coder should choose whether schema, auth behavior, or
acceptance criteria should change.

### Expected Profile Guidance

Block or route back to the owner that controls the unresolved decision. Do not
send ambiguity downstream as implementation discretion.

### Excellent Pass Signal

The profile separates facts, decisions, blockers, and next route before
handoff.

### Failure Modes

- sending coder an unresolved product or architecture decision;
- hiding blocker inside notes;
- treating downstream discretion as authorization;
- allowing scope creep through handoff ambiguity.
