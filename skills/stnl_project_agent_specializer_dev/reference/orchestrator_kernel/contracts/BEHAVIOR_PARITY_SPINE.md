# Orchestrator Kernel Behavior Parity Spine

Status: experimental behavior-parity spine for kernel-lab validation.

This document records the compact operational spine the experimental
`orchestrator kernel` must preserve from the base `orchestrator.agent.md`.

It is authoritative only for the kernel lab. It does not materialize an agent,
does not replace the base orchestrator, does not authorize generated artifacts,
and does not change the productive skill, productive templates, or main
Sentinel flow.

The goal is behavioral parity at the routing-safety level, not a full copy of
the base agent.

## Axis Contract

The kernel must detect operational axes in this order:

1. `RUN`
2. `MODE`
3. `FLOW`

Defaults are `RUN=execute`, `MODE=standard`, and `FLOW=supervised`.

Supported values:

- `RUN=execute`: normal route may proceed through execution gates when all
  required artifacts and approvals are valid.
- `RUN=plan`: stop at `execution-package-designer.agent.md`; do not call
  coders, do not route execution approval as authorization to execute, do not
  route to `validation-runner.agent.md`, and do not let
  `finalizer.agent.md` conclude a slice.
- `MODE=standard`: normal protocol behavior.
- `MODE=compact`: format-only compaction; same gates, blockers, proof
  requirements, handoff validity, and safety obligations.
- `MODE=strict`: stronger proof, mandatory reviewer, lower tolerance for
  ambiguity, and earlier blocker on unresolved uncertainty.
- `FLOW=supervised`: DEV approval is required only at canonical DEV gates or
  human decision boundaries.
- `FLOW=autonomous`: continue only through safe cycles that do not require
  product, contract, schema, auth, permission, payload, business-rule, or other
  normative decisions.
  When a normative decision is required, block or escalate instead of deciding.

No axis may permit invented requirements, skipped gates, ignored blockers,
weakened proof, or compacted safety.

## Canonical Status Contract

The kernel may emit these canonical route statuses:

- `NEEDS_DEV_DECISION_BASE`
- `NEEDS_DEV_DECISION_HARNESS`
- `NEEDS_DEV_APPROVAL_EXECUTION`
- `APPROVED_EXECUTION`
- `SKIP_EXECUTION_APPROVAL`
- `HANDOFF_MISSING`
- `HANDOFF_INVALID`
- `REQUEST_REPLAY_FROM_ORCHESTRATOR`
- `REQUEST_REGEN_FROM_OWNER`
- `READY`

Operational blocker or mode signals that must remain recognizable:

- `MODE_COMPACT_REJECTED`
- `EXECUTOR_HANDOFF_INVALID`
- `EXECUTOR_LOOP_DETECTED`
- `BLOCKED`
- `PARTIAL`
- `FAIL`

`HANDOFF_READY` is optional metadata only. It must not replace `READY` or create
another readiness gate.

## Main Gate Chain

The compact canonical chain is:

`Base gate -> Planner -> Validation/eval design -> Harness gate -> Execution package design -> Execution approval -> Specialist coder execution -> Validation run -> Reviewer when applicable -> Correction loop when corrigible and budget remains -> Finalization -> Resync only if requested`

Minimum gate requirements:

- Base gate requires request framing, source of truth, product or boundary
  intent, and enough context to choose the next owner.
- Planning requires a current-round `EXECUTION BRIEF` from `planner.agent.md`.
- Validation/eval design requires a current-round `VALIDATION PACK` from
  `validation-eval-designer.agent.md`.
- Harness gate must resolve `READY` validation proof or
  `NEEDS_DEV_DECISION_HARNESS` before approval or execution.
- Execution package design requires a current-round `EXECUTION PACKAGE` from
  `execution-package-designer.agent.md`.
- Execution approval requires `APPROVED_EXECUTION` or
  `SKIP_EXECUTION_APPROVAL` for the same current cut.
- Executor gate requires terminal executor `READY` with applied-change evidence
  or formal `BLOCKED` with exact cause and partial-edit state when applicable.
- Runner/reviewer gate requires runner verdict and required review resolution,
  or a valid `CORRECTION PACK`.
- Final gate requires `finalizer.agent.md` for every terminal outcome.

Do not reuse readiness, approval, pack, or proof after a material cut-boundary
change.

## Ephemeral Artifact Contract

The following are mandatory current-round handoff artifacts when their gate is
active. They are ephemeral handoffs, not required durable files:

- `EXECUTION BRIEF`: planner-owned routeable planning handoff.
- `VALIDATION PACK`: validation/eval-designer-owned proof design and harness
  handoff.
- `EXECUTION PACKAGE`: execution-package-designer-owned package with bounded
  `WORK_PACKAGE_ID`, `OWNED_PATHS`, `DEPENDS_ON`, `DO_NOT_TOUCH`, and
  `BLOCK_IF`.
- `CORRECTION PACK`: runner/reviewer-owned formal correction handoff for
  routeable in-scope issues.
- `QA CHECKLIST UPDATE`: runner-owned compact handoff preserved for finalizer
  when validation ran or was attempted; if absent, the route must state that no
  runner evidence exists because validation never honestly ran.

`EXECUTION BRIEF`, `VALIDATION PACK`, and `EXECUTION PACKAGE` are valid only
from their current-round owner or from an orchestrator replay of the same
current context.

## Invalid Handoff Rules

A handoff is invalid when it lacks the next owner, active boundary, explicit
status, minimum contract note or blocker, or required current-round artifact.

Preparation handoffs are invalid when they are missing, stale, ambiguous,
informal, speculative, partial, hidden behind scratch/runtime files, or marked
`READY` without the required current-round brief, pack, or package.

Executor handoffs are invalid unless they are:

- `READY` with applied implementation evidence; or
- `BLOCKED` with exact cause, touched files, partial work left behind, and
  reusability state when partial edits exist.

Treat command logs, progress reports, analysis, pseudo-plans, broad
rediscovery, narrative summaries, implicit terminal states, and evidence-free
`READY` as `EXECUTOR_HANDOFF_INVALID`.

Re-entering the same executor without applied diff, formal `BLOCKED`, or a
material gate, scope, or authorization change is `EXECUTOR_LOOP_DETECTED`.

On `HANDOFF_MISSING`, `HANDOFF_INVALID`,
`REQUEST_REPLAY_FROM_ORCHESTRATOR`, or `REQUEST_REGEN_FROM_OWNER`, replay the
current context, regenerate through the previous owner, return the correct
gate, or block when canonical state is insufficient. Do not route forward.

Do not hand off to an absent owner, nonexistent `.agent.md`, invalid route, or
owner whose required current-round artifact is missing.

## Correction Loop Contract

Runner/reviewer corrigible in-scope problems must return through orchestrator
as one formal `CORRECTION PACK`, not scattered comments.

A valid `CORRECTION PACK` includes issue id, fingerprint or root cause,
evidence, affected surface, impact, expected correction, applicable guardrail,
and in-scope corrigibility.

Reject loose narrative correction requests, drip-fed comments, generic "fix the
problems" requests, and any handoff that combines `CORRECTION PACK` with a
terminal verdict/status.

Correction budget:

- at most 2 automatic correction rounds per slice or round
- at most 1 automatic correction attempt for the same fingerprint or root cause
- new issues may route only while budget remains
- repeated issues or budget exhaustion route to `finalizer.agent.md` with
  residual pack and evidence

The orchestrator chooses package reuse, package redesign, DEV decision, or
terminal closure. Reuse the current `EXECUTION PACKAGE` only when the correction
remains inside the same `WORK_PACKAGE_ID`, boundaries, ownership,
`DO_NOT_TOUCH`, validation expectation, risk profile, likely files/surfaces, and
execution scope. Otherwise route to `execution-package-designer.agent.md`
before coder entry.

Automatic correction cannot expand scope, bypass package design, redesign the
cut, perform broad refactor, or authorize new behavior.

## Finalizer And Resync Boundaries

Every terminal round outcome routes through `finalizer.agent.md`, including
`READY`, `PARTIAL`, `FAIL`, validation `BLOCKED`, pre-validation blockage,
executor `BLOCKED`, honest partial delivery, budget exhaustion, and residual
non-automatic issues.

If execution blocks before honest validation, skip runner/reviewer and route to
`finalizer.agent.md`.

When validation ran or was attempted, preserve the runner `QA CHECKLIST UPDATE`
or explicitly state that no runner evidence exists because validation never
honestly ran.

Do not declare slice closure locally. Slice closure, residual evidence, pending
work, resync need, and next eligible slice belong to `finalizer.agent.md`.

Do not reopen or trigger `resync.agent.md` unless `finalizer.agent.md`
explicitly requires it. Do not confuse `stnl_project_context MODE=RESYNC` with
`resync.agent.md`.

## Owner Selection And Guardrails

Minimum owner routing:

- Route base factual gaps to `stnl_project_context MODE=BOOTSTRAP`; route
  explicit feature drift to `stnl_project_context MODE=RESYNC`.
- Route satisfied base gate to `planner.agent.md`.
- Route after `EXECUTION BRIEF` to `validation-eval-designer.agent.md`.
- Route after `READY` `VALIDATION PACK` to
  `execution-package-designer.agent.md`.
- Route after valid package and execution approval to the proper coder.
- Route post-execution to `validation-runner.agent.md` only after a valid
  executor artifact.
- Route to `reviewer.agent.md` only when semantic or architectural risk
  justifies it, or always in `MODE=strict`.
- Route closure only to `finalizer.agent.md`.

Coder selection:

- Web/browser UI: `coder-frontend.agent.md`
- API/service/persistence/auth/job/integration/runtime:
  `coder-backend.agent.md`
- Native Swift/SwiftUI/UIKit iOS: `coder-ios.agent.md`
- Real UX, interaction, accessibility, responsive, or visual consistency:
  `designer.agent.md`

Activate conditional risk tracks only for material security, performance,
migration/schema, or observability/release-safety risk. Missing a relevant risk
track is a routing defect; universalizing risk tracks is also a defect.

Stack quality guardrails are downstream constraints, not owner replacements:

- Web/browser UI: `stnl_frontend_quality`
- Server/API/service/domain/job/auth/integration/runtime:
  `stnl_backend_quality`
- Persistence/data access/query/ORM/NoSQL/cache/migration/transaction/index:
  `stnl_backend_sql_quality`
- Native Swift/SwiftUI/UIKit iOS: `stnl_mobile_ios_swift_quality`

Pass active guardrails through brief, validation pack, execution package,
executor handoff, runner, reviewer, and finalizer when relevant.

Before executor handoff, confirm that the selected runtime has the material edit
and execution capability required for the authorized cut. Missing capability is
an operational blocker, not permission for router-side fallback execution.

## Reading Contract

Reading scope remains `routing-minimal`.

Read in this order:

1. DEV request and active gate state.
2. Runtime capability notes.
3. One nearest owner doc or canonical boundary note only when needed.
4. One local implementation artifact only if gate, owner, boundary, or
   capability remains unresolved.

Source of truth order:

1. Resolved DEV intent and current gate state.
2. Agent capability and nearest owner context.
3. Boundary-local docs.
4. Live code, contracts, and tests only as last-resort routing evidence.

Do not scan broadly unless gate, owner, boundary, or capability ambiguity
survives minimum routing and cannot be resolved honestly otherwise.

When a `File Purpose Header` exists, use it to route reading and skip
irrelevant auxiliaries, but do not let headers replace exact content, decisions,
ownership, validation evidence, or gate state.

Never search `workspaceStorage`, `chat-session-resources`, `content.txt`,
scratchpads, or temp runtime files for preparation handoffs.

## Output Packet Contract

The main chat is a route/status surface, not an execution log.

Return compact route information only: current gate, next owner or stop,
blocker/DEV decision, terminal status, and relevant delta.

In Codex visual mode, emit a compact `ROUTE_PACKET`:

- `STATUS`: `ROUTE_READY`, `BLOCKED`, or `TERMINAL`
- `CURRENT_GATE`
- `NEXT_OWNER`
- `REASON`
- `PAYLOAD`
- `BLOCKER`

Omit full artifacts, full contracts, SPECs, checklists, logs, diffs, and
verbatim subagent output unless DEV explicitly asks.

The packet must remain delta-only and route once the next honest owner or
blocker is clear.

## Completion Contract

The kernel completes a routing turn only by emitting a truthful current gate
status.

Emit `READY` only when the next owner has bounded context. Coder routing also
requires the current `EXECUTION PACKAGE` and relevant `WORK_PACKAGE_ID`.

Correction routing requires a valid `CORRECTION PACK`, remaining budget, and
either explicit current-package reuse or a route back to
`execution-package-designer.agent.md`.

Completion evidence must identify route, owner, source of truth, and
stop/escalation basis. Preparation completion requires handoff plus status or
the exact missing fact/decision. Runner/reviewer/finalizer routing requires
valid executor `READY` evidence or formal `BLOCKED`.

Before claiming completion, check for unresolved source-of-truth conflict,
shared-contract volatility, unsafe parallelization, missing capability,
approval or harness ambiguity, boundary ownership drift, and router drift into
discovery.

If the next safe state is handoff, blocker, or DEV escalation, stop reading and
emit that state. Do not perform downstream work locally.
