# Orchestrator Kernel Materialization Freeze

Status: frozen route, retained only as boundary documentation.

The previous standalone experimental materialization path for the orchestrator
kernel is no longer the active route. The dev skill does not currently provide
a materializer, does not expect generated artifacts, and does not authorize
writing target repository artifacts.

## Current Meaning

This document now records what is intentionally not active:

- no standalone `materialize-orchestrator-kernel.mjs` flow;
- no generated orchestrator-kernel artifact as a deliverable;
- no generated report as a deliverable;
- no writes to a target repo;
- no fallback to production skill files, production templates, `~/.agents/**`,
  or external filesystem sources.

The useful part of the old experiment is the discipline it exposed: a kernel
must be compared with its base agent and must preserve critical behavior before
any future materialization path can be rebuilt.

## Active Direction

The active work is the kernel lab:

- compare the orchestrator kernel contracts with
  `reference/agents/orchestrator.agent.md`;
- validate that mission, authority, inputs/outputs, handoffs, completion
  contract, anti-role-drift protections, and critical gates are preserved;
- justify every intentional difference;
- use the orchestrator result to define reusable principles;
- kernelize remaining agents by responsibility family later;
- defer Project Senior Profile and skill reconstruction until agents are stable.

## Prohibited Outputs

This dev area must not create or modify:

- `.github/agents/orchestrator.agent.md`
- `.codex/agents/orchestrator.toml`
- `.codex/config.toml`
- `AGENTS.md`
- `templates/agents/orchestrator.agent.md`
- `sentinel.mjs`
- `scripts/sentinel-smoke.mjs`
- generated orchestrator-kernel artifacts
- generated orchestrator-kernel reports
- materialization of all agents
- complete Project Senior Profile

## Blocking Rules

Block when a request asks this dev skill to:

- run or recreate a standalone materializer;
- produce generated artifacts as an active deliverable;
- write final target artifacts;
- touch productive skill files or productive templates;
- use fallback to production sources or external filesystem paths;
- kernelize every agent in this task;
- implement Project Senior Profile;
- rebuild the full skill/materialization flow.

## Relationship To Current Checks

`check-static.mjs` and `check-golden.mjs` are read-only structural supports.
They may confirm that the freeze and kernel-lab contracts remain coherent, but
they do not authorize materialization, target writes, or runtime adoption.
