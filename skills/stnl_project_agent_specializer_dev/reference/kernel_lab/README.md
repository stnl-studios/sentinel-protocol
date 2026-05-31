# Kernel Lab

Status: experimental planning and validation area. It is not an active
materialization flow.

## Current matrix

| Kernel | Status | Notes |
| --- | --- | --- |
| `orchestrator_kernel` | `CLEAN_EXCELLENT_PASS` | Frozen. Do not alter its snapshot, contracts, validation docs, or harnesses in planner rounds. |
| `planner_kernel` | `CLEAN_EXCELLENT_PASS` | Frozen after the separately authorized human audit for the documentary, contractual, and semantic kernel lab. |
| `validation_eval_designer_kernel` | `CLEAN_EXCELLENT_PASS` | Frozen after the separately authorized human audit for the documentary, contractual, minimum-semantic dev kernel lab with a hardened executable textual harness. |
| `execution_package_designer_kernel` | `DRAFT_READY_FOR_HUMAN_AUDIT` | Draft only. Snapshot, contracts, and read-only textual harnesses are ready for critical human audit; no pass is claimed. |

## Objective

The kernel lab validates whether Sentinel agents can be reduced into smaller
kernel agents without losing critical behavior from their respective base
agents.

The first two case studies, `orchestrator_kernel` and `planner_kernel`, are
frozen as dev kernel-lab passes. The planner comparison remains anchored to the
local snapshot `reference/agents/planner.agent.md`.

The third case study is `validation_eval_designer_kernel`, anchored to
the local snapshot `reference/agents/validation-eval-designer.agent.md`. Its
current status is
`VALIDATION_EVAL_DESIGNER_KERNEL: CLEAN_EXCELLENT_PASS`.

The fourth authorized case study is the draft
`execution_package_designer_kernel`, anchored to the local snapshot
`reference/agents/execution-package-designer.agent.md`. Its current status is
`EXECUTION_PACKAGE_DESIGNER_KERNEL: DRAFT_READY_FOR_HUMAN_AUDIT`, which means
contracts and read-only harnesses are ready for critical human audit only.

The planner harnesses are
`reference/planner_kernel/validation/check-static.mjs` and
`reference/planner_kernel/validation/check-golden.mjs`. They are executable
read-only blocking validation support only; they do not grant automatic
promotion for this or any future kernel.

The three frozen pass statuses are kernel-lab dev results only. The
`validation_eval_designer_kernel` pass is documentary, contractual, minimum
semantic, and backed by a hardened executable textual harness. The
`execution_package_designer_kernel` draft status is not a pass. None of these
states authorize runtime, materialization, target-repository writes,
productive-skill changes, or a materializer.

The work keeps the productive skill, productive templates, target repositories,
installer, smoke checks, `.github/**`, `.codex/**`, `AGENTS.md`, and external
filesystems out of scope. Productive templates may be cited as copy origins for
declared snapshots, but they are not fallback references during kernel-lab
review.

## Current Route

The immediate focus is not rebuilding the dev skill materializer. The route is:

1. validate the orchestrator kernel as the first frozen coordination case study;
2. validate the planner kernel as the first frozen planning case study against
   the copied planner snapshot;
3. preserve the frozen `validation_eval_designer_kernel` as the first
   proof-design case study against its copied local snapshot;
4. audit the draft `execution_package_designer_kernel` as the first
   execution-package-design case study against its copied local snapshot;
5. kernelize agents by responsibility family, one authorized agent kernel at a
   time;
6. keep every future kernel subject to its own authorization and human audit;
7. extract reusable principles without forcing every agent into one mold;
8. validate the agent package as a coherent set only after future authorized
   rounds;
9. advance to Project Senior Profile only after agents are stable;
10. rebuild the skill and any complete materialization flow only after agents and
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
