# Kernel Lab

Status: experimental planning and validation area. It is not an active
materialization flow.

## Objective

The kernel lab validates whether Sentinel agents can be reduced into smaller
kernel agents without losing critical behavior from their respective base
agents.

The first case study is `orchestrator`. The work compares the orchestrator
kernel contracts with `reference/agents/orchestrator.agent.md` and keeps the
productive skill, productive templates, target repositories, installer, smoke
checks, `.github/**`, `.codex/**`, `AGENTS.md`, and external filesystems out of
scope.

## Current Route

The immediate focus is not rebuilding the dev skill materializer. The route is:

1. validate the orchestrator kernel against the copied base orchestrator;
2. extract reusable principles from the orchestrator comparison;
3. kernelize agents by responsibility family;
4. validate the agent package as a coherent set;
5. advance to Project Senior Profile only after agents are stable;
6. rebuild the skill and any complete materialization flow only after agents and
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

## Current Non-Goals

- do not kernelize all agents in one pass;
- do not implement Project Senior Profile here;
- do not reconstruct the skill here;
- do not create a new materializer here;
- do not touch productive skill files, productive templates, or generated target
  artifacts.
