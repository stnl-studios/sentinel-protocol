# coder_frontend_profile

Module: `coder_frontend_profile`

Target agent: `coder-frontend`

This module contains the documentary, dev-only Senior Agent Profile for the
canonical `coder-frontend` agent.

## Relationship To Canonical Base Agent

The canonical base agent remains the minimum role contract for the
`coder-frontend`. This module derives its role boundary from
`reference/agents/coder-frontend.agent.md`, especially executor-only ownership,
`targeted-local` reading, `EXECUTION PACKAGE` dependence, `READY`/`BLOCKED`
terminal handoff discipline, front-end implementation authority, and refusal to
plan, package, validate, review, finalize, resync, or materialize runtime
artifacts.

The profile does not reprint the base agent and does not replace it.

## Relationship To Coder Front-End Kernel

The `coder_frontend_kernel` remains the audit and semantic-preservation source
for kernel-level anchors: authorized front-end execution, package boundary,
`WORK_PACKAGE_ID`, `OWNED_PATHS`, `DO_NOT_TOUCH`, `DEPENDS_ON`, `BLOCK_IF`,
front-end quality guardrails, accessibility and responsive behavior, UI
contract discipline, evidence, and exact blockers.

The profile distills these anchors into compact senior judgment rules. It does
not copy the kernel, supersede the kernel, or treat the kernel as runtime.

## Dev-Only Status

This module is documentation-only and dev-only.

It is not runtime behavior, not a prompt for a materialized agent, and must not
be loaded or materialized directly into VS Code, GitHub Agents, Codex,
`.github`, `.codex`, `AGENTS.md`, templates, `sentinel.mjs`, smoke scripts, or
target repositories.

This is one of the 12 Senior Agent Profiles, but it is not a partial pilot and
does not create a subset strategy. Its shape must remain compatible with
future profiles for the remaining canonical agents.

`orchestrator_profile` and `planner_profile` are references for shape, density,
validation style, and rigor only. They are not content sources to copy.

## Files

- `README.md` explains module scope, source relationships, dev-only status,
  validation file purpose, one-of-12 framing, and global-contract boundary.
- `SENIOR_AGENT_PROFILE.md` defines the `coder-frontend` seniority thesis,
  canonical role boundary, kernel-derived anchors, decision heuristics, reading
  budget, risk taxonomy, blockers, handoff discipline, evidence discipline,
  anti-overreach rules, anti-bloat rules, and excellent-pass expectations.
- `validation/STATIC_CHECKS.md` defines static checks for structure,
  declarations, required sections, front-end specificity, anti-runtime leakage,
  anti-copying, package-bound execution, evidence, blocking behavior, and
  downstream role boundaries.
- `validation/GOLDEN_SCENARIOS.md` defines behavioral audit scenarios that
  detect valid package execution, missing package handling, path-boundary
  conflicts, backend contract traps, design/product traps, dependency gates,
  refactor scope creep, validation-claim traps, accessibility/responsiveness
  risk, and runtime leakage.
- `validation/EXCELLENT_PASS_EXPECTATIONS.md` defines the local excellent-pass
  quality bar for future audit of this profile.

## Global Contracts

Global contracts belong outside this module. They are not created by this task.
No `seniorization_lab/contracts/` contract is defined here. If future
profile-wide contracts become necessary, that is a separate seniorization-lab
concern and must not be invented inside `coder_frontend_profile`.
