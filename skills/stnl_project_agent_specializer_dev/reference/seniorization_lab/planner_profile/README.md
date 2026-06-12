# planner_profile

Module: `planner_profile`

Target agent: `planner`

This module contains the documentary, dev-only Senior Agent Profile for the
canonical `planner` agent.

## Relationship To Canonical Base Agent

The canonical base agent remains the minimum role contract for the `planner`.
This module derives its role boundary from
`reference/agents/planner.agent.md`, especially bounded-context reading,
small-cut planning, ephemeral `EXECUTION BRIEF` ownership, stop/block behavior,
and refusal to implement or absorb downstream roles.

The profile does not reprint the base agent and does not replace it.

## Relationship To Planner Kernel

The planner kernel remains the audit and semantic-preservation source for
kernel-level anchors: planning before proof design, explicit scope boundary,
ephemeral `EXECUTION BRIEF`, anti-inference, bounded reading, no implementation,
no validation-pack takeover, no execution-package takeover, and safe blocking
when required evidence or decisions are missing.

The profile distills these anchors into compact senior judgment rules. It does
not copy the kernel, supersede the kernel, or treat the kernel as runtime.

## Dev-Only Status

This module is documentation-only and dev-only.

It is not runtime behavior, not a prompt for a materialized agent, and must not
be loaded or materialized directly into VS Code, GitHub Agents, Codex, `.github`,
`.codex`, `AGENTS.md`, templates, `sentinel.mjs`, smoke scripts, or target
repositories.

This is the second profile in the 12-profile construction order, but it is not
a partial pilot and does not create a subset strategy. Its shape must remain
compatible with future profiles for the other 10 remaining canonical agents.

`orchestrator_profile` is a reference for shape, density, validation style, and
rigor only. It is not a content source to copy.

## Files

- `README.md` explains module scope, source relationships, dev-only status, and
  validation file purpose.
- `SENIOR_AGENT_PROFILE.md` defines the planner seniority thesis, role
  boundary, kernel-derived anchors, decision heuristics, reading budget, risk
  taxonomy, blockers, handoff discipline, evidence discipline, anti-overreach
  rules, anti-bloat rules, and excellent-pass expectations.
- `validation/STATIC_CHECKS.md` defines static checks for structure,
  declarations, required sections, planner specificity, anti-runtime leakage,
  anti-copying, planning discipline, blocking behavior, and downstream role
  boundaries.
- `validation/GOLDEN_SCENARIOS.md` defines behavioral audit scenarios that
  detect planning quality, scope ambiguity, validation-design takeover,
  execution-package takeover, implementation pressure, context bloat,
  closed-decision reopening, source-of-truth ambiguity, oversized cuts, and
  runtime leakage.
- `validation/EXCELLENT_PASS_EXPECTATIONS.md` defines the local excellent-pass
  quality bar for future audit of this profile.

## Global Contracts

Global contracts belong outside this module. They are not created by this task.
No `seniorization_lab/contracts/` contract is defined here. If future
profile-wide contracts become necessary, that is a separate seniorization-lab
concern and must not be invented inside `planner_profile`.
