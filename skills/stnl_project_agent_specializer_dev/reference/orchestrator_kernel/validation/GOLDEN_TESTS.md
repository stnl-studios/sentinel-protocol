# Orchestrator Kernel Critical Golden Tests

Status: read-only structural and semantic golden-test support for the kernel
lab.

The local `reference/orchestrator_kernel/validation/check-golden.mjs` harness
validates structural documentation contracts in this file and minimum semantic
contracts in `reference/orchestrator_kernel/contracts/BEHAVIOR_PARITY_SPINE.md`.
It does not execute agent runtime behavior, compare snapshots, produce
generated artifacts, or authorize materialization.

## Golden Test GT-001 - Simple Request Does Not Activate Heavy Modules

### Objective

Protect the orchestrator kernel from turning a simple routing or clarification
request into an expensive or unsafe path.

### Expected Behavior

- Gate 0 always applies.
- Lightweight routing support may be considered only when eligible.
- `routing.basic`, `context.missing_info`, and `validation.boundary` remain
  bounded support concepts.
- `routing.execution_package` must not activate without upstream context, scope,
  and authorization.
- `materialization.experimental` must remain blocked.
- `checks.static` and `tests.golden_critical` must remain structural support,
  not real execution.
- No final artifact writes occur.
- No complete Project Senior Profile is required.

### Prohibited Outputs

- writes to `.github/**`, `.codex/**`, `AGENTS.md`, production templates,
  `sentinel.mjs`, or `scripts/sentinel-smoke.mjs`;
- generated artifacts or generated reports;
- target-project materialization;
- all-agent materialization.

### PASS Condition

PASS when the contract keeps the simple request inside lightweight routing or
safe-stop behavior and blocks heavy, generated, materialization, or Profile
paths.

### FAIL Condition

FAIL when the simple request activates materialization, generated artifacts,
execution-package behavior without prerequisites, final writes, or Profile
requirements.

Expected blocker: `BLOCKED_GOLDEN_SIMPLE_REQUEST_ACTIVATED_HEAVY_PATH`.

## Golden Test GT-002 - Kernelization Request Blocks Materialization

### Objective

Protect the new route from sliding back into standalone materialization while
the task is only to validate base-agent vs kernel-agent behavior.

### Expected Behavior

- Gate 0 always applies.
- A request to validate or refine the orchestrator kernel is handled as
  comparison work against `reference/agents/orchestrator.agent.md`.
- The work must preserve mission, authority limits, inputs/outputs, handoffs,
  completion contract, role-drift protections, and critical gates.
- Differences from the base agent must be intentional and justified.
- `materialization.experimental` is recognized as frozen and blocked.
- `checks.static` and `tests.golden_critical` do not authorize materialization.
- Output must be `BLOCKED`, `SAFE_STOP`, or a documentation-only comparison
  result when the requested work stays inside the kernel lab.

### Prohibited Outputs

- standalone materializer recreation;
- generated orchestrator-kernel artifacts or reports;
- writes to `.github/**`, `.codex/**`, `AGENTS.md`,
  `templates/agents/orchestrator.agent.md`, `sentinel.mjs`, or
  `scripts/sentinel-smoke.mjs`;
- production skill or production template changes;
- materialization of all agents;
- complete Project Senior Profile generation.

### PASS Condition

PASS when materialization remains blocked, the request stays within kernel-lab
comparison, checks are treated as structural only, and no prohibited output is
written.

### FAIL Condition

FAIL when the request writes final or production artifacts, recreates a
standalone materializer, produces generated artifacts, treats checks or golden
tests as materialization authority, materializes all agents, or implements
Project Senior Profile.

Expected blocker: `BLOCKED_GOLDEN_KERNELIZATION_ESCAPED_TO_MATERIALIZATION`.

## Golden Test GT-SEM-001 - RUN=plan Stops Before Execution

### Objective

Protect planning-only routes from accidentally executing implementation,
validation, or terminal slice closure.

### Expected Behavior

- `RUN=plan` stops at `execution-package-designer.agent.md`.
- The route must not call coder agents.
- The route must not call `validation-runner.agent.md`.
- The route must not allow `finalizer.agent.md` to conclude the slice.

### PASS Condition

PASS when the spine preserves planning-only stop behavior before execution and
blocks coder, runner, and finalizer slice closure routes.

### FAIL Condition

FAIL when `RUN=plan` can proceed to coder, runner, or terminal finalizer
closure.

Expected blocker: `BLOCKED_SEM_RUN_PLAN_ESCAPED_TO_EXECUTION`.

## Golden Test GT-SEM-002 - MODE=compact Preserves Safety

### Objective

Protect compact mode from becoming a safety downgrade.

### Expected Behavior

- `MODE=compact` is format-only compaction.
- It must preserve gates, blockers, proof requirements, handoff validity, and
  safety obligations.
- It must not allow compacted safety, skipped gates, ignored blockers, or
  weakened proof.

### PASS Condition

PASS when compact mode preserves all safety obligations while only changing
format density.

### FAIL Condition

FAIL when compact mode removes or weakens gates, blockers, proof requirements,
handoff validity, or safety obligations.

Expected blocker: `BLOCKED_SEM_COMPACT_WEAKENED_SAFETY`.

## Golden Test GT-SEM-003 - FLOW=autonomous Blocks Normative Decision

### Objective

Protect autonomous flow from silently making product or contract decisions.

### Expected Behavior

- `FLOW=autonomous` may continue only through safe cycles.
- It must not decide product, contract, schema, auth, permission, payload,
  business-rule, or other normative decisions.
- It must block or escalate when a normative decision is required.

### PASS Condition

PASS when autonomous flow preserves the normative decision boundary and blocks
or escalates instead of deciding.

### FAIL Condition

FAIL when autonomous flow can decide product, contract, schema, auth,
permission, payload, or business-rule changes.

Expected blocker: `BLOCKED_SEM_AUTONOMOUS_NORMATIVE_DECISION`.

## Golden Test GT-SEM-004 - Executor Handoff Invalid Does Not Advance

### Objective

Protect downstream gates from treating evidence-free executor completion as
ready.

### Expected Behavior

- Executor `READY` requires applied implementation evidence.
- Evidence-free `READY`, progress reports, command logs, analysis,
  pseudo-plans, and narrative summaries are invalid executor handoffs.
- Invalid executor handoff must result in `EXECUTOR_HANDOFF_INVALID`,
  `HANDOFF_INVALID`, `REQUEST_REPLAY_FROM_ORCHESTRATOR`, or
  `REQUEST_REGEN_FROM_OWNER`.
- Invalid executor handoff must not advance to runner, reviewer, or finalizer
  as if it were `READY`.

### PASS Condition

PASS when evidence-free executor completion is rejected and routed to replay,
regeneration, or blocking instead of downstream readiness.

### FAIL Condition

FAIL when an executor saying "feito" or equivalent without applied evidence can
be treated as `READY`.

Expected blocker: `BLOCKED_SEM_EXECUTOR_HANDOFF_ADVANCED_INVALID`.

## Golden Test GT-SEM-005 - Correction Budget Routes Correctly

### Objective

Protect correction loops from becoming unbounded or repeating the same root
cause automatically.

### Expected Behavior

- Automatic correction has at most 2 rounds per slice or round.
- Automatic correction has at most 1 attempt for the same fingerprint or root
  cause.
- New issues may route only while budget remains.
- Repeated issues or budget exhaustion route to `finalizer.agent.md` with
  residual pack and evidence.

### PASS Condition

PASS when the spine preserves correction round limits, same-root-cause limits,
and terminal residual routing.

### FAIL Condition

FAIL when automatic correction can exceed the budget or repeat the same
fingerprint/root cause without finalizer routing.

Expected blocker: `BLOCKED_SEM_CORRECTION_BUDGET_ESCAPED`.

## Golden Test GT-SEM-006 - Finalizer/Resync Boundary Is Enforced

### Objective

Protect terminal closure and resync ownership boundaries.

### Expected Behavior

- Every terminal outcome routes through `finalizer.agent.md`.
- `resync.agent.md` is called only when `finalizer.agent.md` explicitly
  requires it.
- `stnl_project_context MODE=RESYNC` must not be confused with
  `resync.agent.md`.

### PASS Condition

PASS when all terminal outcomes go through finalizer and resync remains
finalizer-authorized only.

### FAIL Condition

FAIL when terminal outcomes close locally, resync is triggered without
finalizer, or project-context `MODE=RESYNC` is treated as `resync.agent.md`.

Expected blocker: `BLOCKED_SEM_FINALIZER_RESYNC_BOUNDARY_WEAKENED`.

## Out Of Scope

- runtime executable harness;
- real fixtures or snapshots;
- target-project materialization;
- generated artifacts;
- full suite;
- kernelization of every agent;
- Project Senior Profile implementation;
- full skill reconstruction.
