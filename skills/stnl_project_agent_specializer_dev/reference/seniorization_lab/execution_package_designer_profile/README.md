# execution_package_designer_profile

Module: `execution_package_designer_profile`

Target agent: `execution-package-designer`

This module contains the documentary, dev-only Senior Agent Profile for the
canonical `execution-package-designer` agent.

## Relationship To Canonical Base Agent

The canonical base agent remains the minimum role contract for the
`execution-package-designer`. This module derives its role boundary from
`reference/agents/execution-package-designer.agent.md`, especially targeted-local
reading, ephemeral `EXECUTION PACKAGE` ownership, package boundary discipline,
handoff recovery, and refusal to implement, coordinate coders, execute
validation, review, finalize, or resync.

The profile does not reprint the base agent and does not replace it.

## Relationship To Execution Package Designer Kernel

The `execution_package_designer_kernel` remains the audit and
semantic-preservation source for kernel-level anchors: package design after
planning and validation design, ephemeral `EXECUTION PACKAGE`, package
readiness gates, owner-safe work packages, proof-obligation mapping, no
planner takeover, no validation-design takeover, no coder takeover, and no
runtime or materialization authorization.

The profile distills these anchors into compact senior judgment rules. It does
not copy the kernel, supersede the kernel, or treat the kernel as runtime.

## Dev-Only Status

This module is documentation-only and dev-only.

It is explicitly non-runtime, not runtime behavior, not a prompt for a
materialized agent, and must not be loaded or materialized directly into VS
Code, GitHub Agents, Codex, `.github`, `.codex`, `AGENTS.md`, templates,
`sentinel.mjs`, smoke scripts, or target repositories.

It must not be materialized directly. Runtime artifacts for VS Code, GitHub
Agents, Codex, or any other target are outside this module and outside this
task.

This is the fourth profile in the 12-profile construction order, but it is not
a partial pilot and does not create a subset strategy. Its shape must remain
compatible with future profiles for the other 8 remaining canonical agents.

`orchestrator_profile`, `planner_profile`, and
`validation_eval_designer_profile` are references for shape, density,
validation style, and rigor only. They are not content sources to copy.

## Files

- `README.md` explains module scope, source relationships, dev-only status, and
  validation file purpose.
- `SENIOR_AGENT_PROFILE.md` defines the execution-package-designer seniority
  thesis, role boundary, kernel-derived anchors, decision heuristics, reading
  budget, risk taxonomy, blockers, handoff discipline, evidence discipline,
  anti-overreach rules, anti-bloat rules, and excellent-pass expectations.
- `validation/STATIC_CHECKS.md` defines static checks for structure,
  declarations, required sections, execution-package-designer specificity,
  package boundary discipline, owner-safe fields, anti-runtime leakage,
  anti-copying, blocking behavior, and downstream role boundaries.
- `validation/GOLDEN_SCENARIOS.md` defines behavioral audit scenarios that
  detect honest execution-package design, missing validation pack handling,
  planning/validation conflicts, ownership ambiguity, command and acceptance
  check invention, implementation pressure, validation-design takeover, context
  bloat, runtime leakage, and downstream ambiguity transfer.
- `validation/EXCELLENT_PASS_EXPECTATIONS.md` defines the local excellent-pass
  quality bar for future audit of this profile.

## Global Contracts

Global contracts belong outside this module. They are not created by this
task. No `seniorization_lab/contracts/` contract is defined here. If future
profile-wide contracts become necessary, that is a separate seniorization-lab
concern and must not be invented inside `execution_package_designer_profile`.
