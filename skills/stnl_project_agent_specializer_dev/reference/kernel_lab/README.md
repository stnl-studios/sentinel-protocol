# Kernel Lab

Status: experimental planning and validation area. It is not an active
materialization flow.

## Current matrix

| Kernel | Status | Notes |
| --- | --- | --- |
| `orchestrator_kernel` | `CLEAN_EXCELLENT_PASS` | Frozen. Do not alter its snapshot, contracts, validation docs, or harnesses in planner rounds. |
| `planner_kernel` | `EXECUTABLE_VALIDATION_ADDED` / `UNDER_REVIEW` | Documentally integrated with a local planner snapshot and read-only harnesses. Not excellent pass; final audit is still required. |

## Objective

The kernel lab validates whether Sentinel agents can be reduced into smaller
kernel agents without losing critical behavior from their respective base
agents.

The first case study, `orchestrator_kernel`, is frozen. The active documented
integration under review is `planner_kernel`, compared with the local snapshot
`reference/agents/planner.agent.md`.

The planner harnesses are
`reference/planner_kernel/validation/check-static.mjs` and
`reference/planner_kernel/validation/check-golden.mjs`. They are executable
read-only validation support only; they do not grant automatic pass.

The work keeps the productive skill, productive templates, target repositories,
installer, smoke checks, `.github/**`, `.codex/**`, `AGENTS.md`, and external
filesystems out of scope. Productive templates may be cited as copy origins for
declared snapshots, but they are not fallback references during kernel-lab
review.

## Current Route

The immediate focus is not rebuilding the dev skill materializer. The route is:

1. validate the orchestrator kernel status as frozen and preserve that result;
2. review the planner kernel against the copied planner snapshot;
3. extract reusable principles without forcing every agent into one mold;
4. kernelize agents by responsibility family, one agent-specific kernel at a
   time;
5. validate the agent package as a coherent set;
6. advance to Project Senior Profile only after agents are stable;
7. rebuild the skill and any complete materialization flow only after agents and
   Profile are stable.

## Validation Criteria

Every base-agent vs kernel-agent comparison must show that the kernel:

- preserves the central mission;
- preserves authority limits;
- preserves inputs and outputs;
- preserves handoffs;
- preserves the completion contract;
- preserves protections against role drift;
- preserves critical gates;
- removes redundancy without removing critical behavior;
- does not depend on materialization, fallback, or nonexistent external
  context;
- keeps all differences intentional and justified.

## Responsibility Families

Suggested ordering by family:

- coordination: `orchestrator`
- planning: `planner`, `execution-package-designer`,
  `validation-eval-designer`
- execution: `designer`, `coder-frontend`, `coder-backend`
- validation: `validation-runner`, `reviewer`
- closure/synchronization: `finalizer`, `resync`

The discipline is shared across families, but the kernel shape may vary by
responsibility. Do not force every agent into the same internal mold.

Each agent gets its own kernel when authorized. A generic shared planning
kernel is prohibited; the planner work is only `planner_kernel`.

## Current Non-Goals

- do not kernelize all agents in one pass;
- do not implement Project Senior Profile here;
- do not reconstruct the skill here;
- do not create a new materializer here;
- do not touch productive skill files, productive templates, or generated target
  artifacts.
- do not create generic shared kernels, runtime adoption paths, planner
  fixtures, planner generated reports, or planner harnesses beyond the two
  declared read-only validation scripts here.
