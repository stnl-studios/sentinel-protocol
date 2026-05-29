# Orchestrator Kernel Critical Golden Tests

Status: read-only structural golden-test support for the kernel lab.

The local `check-golden.mjs` harness validates these contracts at a structural
documentation level only. It does not execute agent runtime behavior, compare
snapshots, produce generated artifacts, or authorize materialization.

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

## Out Of Scope

- runtime executable harness;
- real fixtures or snapshots;
- target-project materialization;
- generated artifacts;
- full suite;
- kernelization of every agent;
- Project Senior Profile implementation;
- full skill reconstruction.
