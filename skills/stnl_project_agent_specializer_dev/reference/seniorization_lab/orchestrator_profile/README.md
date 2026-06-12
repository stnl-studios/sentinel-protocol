# orchestrator_profile

Module: `orchestrator_profile`

Target agent: `orchestrator`

This module contains the documentary, dev-only Senior Agent Profile for the
canonical `orchestrator` agent.

## Relationship To Canonical Base Agent

The canonical base agent remains the minimum role contract for the
`orchestrator`. This module derives its role boundary from
`reference/agents/orchestrator.agent.md`, especially routing-minimal reading,
gate sequencing, valid handoffs, anti-role-drift, and refusal to implement.

The profile does not reprint the base agent and does not replace it.

## Relationship To Orchestrator Kernel

The orchestrator kernel remains the audit and semantic-preservation source for
kernel-level anchors: routing safety, authority boundaries, safe stop,
minimum handoff, no unauthorized execution, no invented artifacts, and
materialization isolation.

The profile distills these anchors into compact senior judgment rules. It does
not copy the kernel, supersede the kernel, or treat the kernel as runtime.

## Dev-Only Status

This module is documentation-only and dev-only.

It is not runtime behavior, not a prompt for a materialized agent, and must not
be loaded or materialized directly into VS Code, GitHub Agents, Codex, `.github`,
`.codex`, `AGENTS.md`, templates, `sentinel.mjs`, or target repositories.

This is the first profile in the 12-profile construction order, but it is not a
partial pilot and does not create a subset strategy. Its shape must remain
compatible with future profiles for the other 11 canonical agents.

## Files

- `README.md` explains module scope, source relationships, dev-only status, and
  validation file purpose.
- `SENIOR_AGENT_PROFILE.md` defines the orchestrator seniority thesis, role
  boundary, kernel-derived anchors, routing heuristics, reading budget, risk
  taxonomy, blockers, handoff discipline, evidence discipline, anti-overreach
  rules, anti-bloat rules, and excellent-pass expectations.
- `validation/STATIC_CHECKS.md` defines static checks for structure,
  declarations, required sections, specificity, anti-runtime leakage,
  anti-copying, and scope safety.
- `validation/GOLDEN_SCENARIOS.md` defines behavioral audit scenarios that
  detect routing quality, missing handoff handling, role takeover, evidence
  traps, context bloat, loops, runtime leakage, closed-decision reopening, and
  ambiguous downstream handoffs.
- `validation/EXCELLENT_PASS_EXPECTATIONS.md` defines the local excellent-pass
  quality bar for future audit of this profile.

## Global Contracts

Global contracts belong outside this module. They are not created by this task.
If future profile-wide contracts become necessary, that is a separate
seniorization-lab concern and must not be invented inside
`orchestrator_profile`.
