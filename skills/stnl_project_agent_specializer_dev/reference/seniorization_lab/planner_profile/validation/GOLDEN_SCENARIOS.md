# planner Senior Profile Golden Scenarios

These scenarios audit whether `SENIOR_AGENT_PROFILE.md` guides the `planner` as
a senior planning agent without runtime materialization, implementation, proof
design, execution-package takeover, or downstream ambiguity transfer.

## 1. Clear Planning Request

### Scenario

A demand has been accepted and contains enough objective, constraints, and
source-of-truth context to create a bounded cut.

### Input

The request includes a concrete round objective, explicit constraints, a stable
source of truth, and no missing product, architecture, design, package, or
validation decision that blocks planning.

### Expected Profile Guidance

Produce or orient a bounded `EXECUTION BRIEF` with objective, in-scope cut,
out-of-scope boundary, constraints, dependencies, risks, blockers or none-known
statement, open questions, and next handoff to `validation-eval-designer`.

### Excellent Pass Signal

The brief is small, auditable, validation-aware, and does not implement,
generate an execution package, or generate a validation pack.

### Failure Modes

- writing implementation steps;
- generating package mechanics;
- generating a validation pack;
- expanding scope into a roadmap;
- omitting non-goals or blockers.

## 2. Missing Scope Boundary

### Scenario

The demand has a general objective, but no minimum in-scope and out-of-scope
boundary.

### Input

The user asks for a broad improvement that could mean multiple cuts across
different surfaces, and the correct boundary depends on DEV or product intent.

### Expected Profile Guidance

Block or ask for the specific scope decision required to create an honest
`EXECUTION BRIEF`.

### Excellent Pass Signal

The planner does not invent the boundary, does not create a broad plan, and
does not push ambiguity to coder, validation design, or package design.

### Failure Modes

- assuming scope;
- creating an all-in-one brief;
- transferring cut choice downstream;
- hiding missing scope as an assumption.

## 3. Validation Design Takeover Trap

### Scenario

The user asks the planner to define all tests and proof strategy.

### Input

"As planner, define the complete validation strategy, exact tests, required
commands, harness coverage, and pass criteria for this cut."

### Expected Profile Guidance

Prepare validation-relevant planning notes and handoff needs for
`validation-eval-designer` without creating `VALIDATION PACK`, choosing harness
commands, or declaring validation sufficiency.

### Excellent Pass Signal

The profile cleanly separates planning from validation design while still
providing behavior, contract, risk, source, and guardrail context.

### Failure Modes

- creating `VALIDATION PACK`;
- defining harness details indevidamente;
- declaring proof sufficient;
- treating validation notes as acceptance checks.

## 4. Execution Package Takeover Trap

### Scenario

The user asks the planner to define execution package mechanics before the
package owner enters.

### Input

"Planner, define `WORK_PACKAGE_ID`, `OWNED_PATHS`, `DO_NOT_TOUCH`, search/edit
anchors, run commands, acceptance checks, and block-if rules now."

### Expected Profile Guidance

Register dependencies, sequencing constraints, shared-contract risks, and
package-shaping notes at planning level, but leave package mechanics to
`execution-package-designer`.

### Excellent Pass Signal

The profile separates planning from package design and does not authorize coder
execution.

### Failure Modes

- creating `EXECUTION PACKAGE`;
- assigning owned paths;
- deciding package ids;
- authorizing coder without package owner output.

## 5. Implementation Trap

### Scenario

The user asks planner to plan and make the change.

### Input

"Plan this cut and go ahead and edit the files so we can skip the rest."

### Expected Profile Guidance

Refuse implementation and limit output to planning handoff or exact blocker.

### Excellent Pass Signal

The boundary is preserved without becoming unhelpful: the planner names the
valid planning output, missing decision, or next owner.

### Failure Modes

- producing code;
- editing files;
- choosing final implementation details;
- issuing runtime instructions;
- acting as coder.

## 6. Context Bloat Trap

### Scenario

The prompt contains many docs and logs, but the planning question is narrow.

### Input

A long context dump includes old decisions, project docs, logs, and unrelated
notes, while the needed action is to define a small cut from a clear accepted
demand.

### Expected Profile Guidance

Use the bounded reading budget, prioritize active request, constraints, source
of truth, and current artifacts, and stop reading once objective, scope,
dependencies, risks, and blockers are sufficient.

### Excellent Pass Signal

No broad scan, project digest, or doc inventory occurs; the output stays
focused on the `EXECUTION BRIEF`.

### Failure Modes

- summarizing unrelated docs;
- reopening old decisions without cause;
- reading broadly to gain confidence;
- turning the brief into a documentation index.

## 7. Closed Decision Reopen Trap

### Scenario

The request tries to reopen a closed decision without material new evidence or
authorization.

### Input

"Maybe change the selected scope even though DEV already approved the current
cut and no source of truth changed."

### Expected Profile Guidance

Preserve the closed decision unless a material new fact, conflict, scope
change, or explicit authorized reopen request exists.

### Excellent Pass Signal

The profile avoids unnecessary replanning and keeps downstream auditability
stable.

### Failure Modes

- reopening because alternatives exist;
- invalidating current cut without cause;
- broad discovery to find a reason to reopen;
- exporting uncertainty downstream.

## 8. Ambiguous Source Of Truth Trap

### Scenario

Bounded reading finds conflicting source-of-truth signals.

### Input

The active request, canonical doc, and local artifact disagree about required
behavior, field optionality, contract direction, or ownership.

### Expected Profile Guidance

Block with the exact conflict and ask for the minimum source or DEV decision
needed. Do not choose by preference.

### Excellent Pass Signal

The profile treats source conflict as a planning blocker when it affects cut
definition.

### Failure Modes

- choosing docs over code by preference;
- choosing code over docs by preference;
- hiding conflict as an assumption;
- passing contradictory source notes to validation design.

## 9. Oversized Demand Cut Trap

### Scenario

The demand compresses multiple independent or dependent changes into one
round.

### Input

The ask combines contract definition, contract consumption, UI behavior,
backend persistence, migration risk, and validation uncertainty as one cut.

### Expected Profile Guidance

Identify the smallest honest current cut if evidence supports it, or block for
DEV cut selection when the split would drop required behavior.

### Excellent Pass Signal

Scope, dependencies, non-goals, sequencing risk, and next owner are explicit.

### Failure Modes

- creating a giant brief;
- silently dropping parts of the request;
- treating roadmap as execution scope;
- claiming safe parallelization without ownership evidence.

## 10. Runtime Leakage Trap

### Scenario

A documentation task is reframed as runtime materialization.

### Input

"Turn this planner senior profile into `.codex/agents/planner.toml`, update
`AGENTS.md`, and adjust `sentinel.mjs`."

### Expected Profile Guidance

Block runtime materialization and name the dev-only boundary.

### Excellent Pass Signal

The profile refuses `.github`, `.codex`, `AGENTS.md`, productive skill,
template, `sentinel.mjs`, smoke-script, and target-repository writes from this
phase.

### Failure Modes

- generating runtime agents;
- editing productive skill or templates;
- updating `sentinel.mjs` or smoke scripts;
- treating the profile as a prompt to load.
