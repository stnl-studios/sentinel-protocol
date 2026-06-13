# coder_backend_profile

Module: `coder_backend_profile`

Target agent: `coder-backend`

This module contains the documentary, dev-only Senior Agent Profile for the
canonical `coder-backend` agent.

## Relationship To Canonical Base Agent

The canonical base agent remains the minimum role contract for
`coder-backend`. This module derives its role boundary from
`reference/agents/coder-backend.agent.md`, especially executor-only ownership,
`EXECUTION PACKAGE` dependency, targeted-local reading, package boundary
discipline, terminal `READY` or `BLOCKED` handoff, and refusal to plan,
validate, review, finalize, resync, or write durable docs.

The profile does not reprint the base agent and does not replace it.

## Relationship To Coder-Backend Kernel

The coder-backend kernel remains the audit and semantic-preservation source for
kernel-level anchors: authorized work package execution, backend-owned
implementation, package boundary discipline, contract safety, data and
migration rigor, auth/authz caution, guardrail use, blocker behavior, and
executor evidence.

The profile distills these anchors into compact senior judgment rules. It does
not copy the kernel, supersede the kernel, or treat the kernel as runtime.

## Dev-Only Status

This module is documentation-only and dev-only.

It is not runtime behavior, not a prompt for a materialized agent, and must not
be loaded or materialized directly into VS Code, GitHub Agents, Codex,
`.github`, `.codex`, `AGENTS.md`, templates, `sentinel.mjs`, smoke scripts, or
target repositories.

This module is part of the 12-profile Senior Agent Profile construction. It is
not a partial pilot, does not create a subset strategy, and does not create
artificial demand for a subset of agents.

`orchestrator_profile` and `planner_profile` are references for shape, density,
validation style, and rigor only. They are not content sources to copy.

## Files

- `README.md` explains module scope, source relationships, dev-only status, and
  validation file purpose.
- `SENIOR_AGENT_PROFILE.md` defines the coder-backend seniority thesis, role
  boundary, kernel-derived anchors, backend execution heuristics, reading
  budget, risk taxonomy, blockers, handoff discipline, evidence discipline,
  anti-overreach rules, anti-bloat rules, and excellent-pass expectations.
- `validation/STATIC_CHECKS.md` defines static checks for structure,
  declarations, required sections, coder-backend specificity, anti-runtime
  leakage, anti-copying, backend execution discipline, package boundary
  discipline, contract safety, and downstream role boundaries.
- `validation/GOLDEN_SCENARIOS.md` defines behavioral audit scenarios that
  detect backend execution quality, missing package handling, API/schema traps,
  auth/authz traps, persistence/migration traps, owned-path issues,
  do-not-touch conflicts, validation mismatch, shared-contract mismatch,
  integration/job ambiguity, evidence traps, and runtime leakage.
- `validation/EXCELLENT_PASS_EXPECTATIONS.md` defines the local excellent-pass
  quality bar for future audit of this profile.

## Global Contracts

Global contracts belong outside this module. They are not created by this task.
No `seniorization_lab/contracts/` contract is defined here. If future
profile-wide contracts become necessary, that is a separate seniorization-lab
concern and must not be invented inside `coder_backend_profile`.
