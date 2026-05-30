# Orchestrator Kernel Static Checks

Status: read-only structural support for the kernel lab.

The static checks support the current re-start direction. They do not implement
a runtime loader, materializer, target-project writer, final artifact generator,
installer change, smoke change, or authorization gate.

## Purpose

The checks catch structural drift in the dev-skill kernel documents while the
team validates the orchestrator kernel against the copied base orchestrator.
They are intentionally cheap: they inspect only files inside
`skills/stnl_project_agent_specializer_dev/**` and ignore `__MACOSX` and
`.DS_Store`.

They are not a full validation suite and do not prove that a kernel is ready to
replace a base agent. They only protect basic contract shape while the kernel
lab remains outside materialization.

## Required Checks

### CH-001 - Required Kernel-Lab Files Exist

Required files:

- `reference/agents/orchestrator.agent.md`
- `reference/kernel_lab/README.md`
- `reference/orchestrator_kernel/CONTRACT.md`
- `reference/orchestrator_kernel/MINIMUM_SAFE_BUNDLE.md`
- `reference/orchestrator_kernel/BEHAVIOR_PARITY_SPINE.md`
- `reference/orchestrator_kernel/MODULE_INDEX.md`
- `reference/orchestrator_kernel/ACTIVATION_GATES.md`
- `reference/orchestrator_kernel/EXPERIMENTAL_MATERIALIZATION.md`
- `reference/orchestrator_kernel/STATIC_CHECKS.md`
- `reference/orchestrator_kernel/GOLDEN_TESTS.md`
- `reference/orchestrator_kernel/check-static.mjs`
- `reference/orchestrator_kernel/check-golden.mjs`

### CH-002 - Manifest Matches The Frozen Route

`reference/MANIFEST.md` must list real bundled references and must not require:

- `reference/orchestrator_kernel/materialize-orchestrator-kernel.mjs`
- `reference/orchestrator_kernel/check-materialized.mjs`
- `reference/orchestrator_kernel/generated/**`
- absent `reference/agents/**` or `reference/docs/**` globs

### CH-003 - Kernel Lab States The Current Route

`reference/kernel_lab/README.md` must describe the route:

1. validate orchestrator kernel;
2. extract reusable principles;
3. kernelize agents by responsibility family;
4. validate the agent package;
5. advance to Project Senior Profile;
6. rebuild the skill.

### CH-004 - Base Agent Vs Kernel Criteria Are Present

The kernel lab must include criteria requiring preservation of mission,
authority limits, inputs/outputs, handoffs, completion contract, role-drift
protections, critical gates, and intentional differences.

### CH-005 - Materialization Route Stays Frozen

The materialization freeze document must make clear that there is no active
standalone materializer, no active generated artifact deliverable, no target
repo materialization, and no fallback to production sources or external paths.

### CH-006 - Module Index And Gates Do Not Grant Authority

`MODULE_INDEX.md` and `ACTIVATION_GATES.md` must keep modules and gates as
catalog/support contracts only. They must not authorize writing final artifacts,
runtime adoption, or materialization.

### CH-007 - Safe Bundle Remains Mandatory

`MINIMUM_SAFE_BUNDLE.md`, `MODULE_INDEX.md`, and `ACTIVATION_GATES.md` must
preserve the rule that the minimum safe bundle cannot be weakened, bypassed, or
made optional by modules, checks, gates, or future materialization.

### CH-008 - Scope Does Not Escape The Dev Skill

The checks must remain read-only and scoped to
`skills/stnl_project_agent_specializer_dev/**`. They must not require edits to
productive skill files, productive templates, `.github/**`, `.codex/**`,
`AGENTS.md`, `sentinel.mjs`, `scripts/sentinel-smoke.mjs`, `~/.agents/**`, or
external filesystem paths.

### CH-009 - Behavior Parity Spine Is Wired Into Golden Checks

`BEHAVIOR_PARITY_SPINE.md` must exist, `README.md` must list it in the
orchestrator-kernel reading order, and `check-golden.mjs` must reference it as
a required input for semantic golden-test validation.

### CH-010 - Golden-Test Language Is Current

`MODULE_INDEX.md` and `ACTIVATION_GATES.md` must not keep stale wording that
describes the golden contract as exactly two critical golden tests. They must
describe the current structural and semantic golden-test set, including
`GT-001`, `GT-002`, and `GT-SEM-001` through `GT-SEM-006`.

## Out Of Scope

- materializer execution;
- generated artifacts;
- target-project materialization;
- broad repo scans;
- semantic acceptance of kernels;
- kernelization of every agent;
- Project Senior Profile implementation;
- full skill reconstruction.
