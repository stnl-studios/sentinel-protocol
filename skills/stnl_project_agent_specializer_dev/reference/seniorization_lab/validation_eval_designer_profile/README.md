# validation_eval_designer_profile

Module: `validation_eval_designer_profile`

Target agent: `validation-eval-designer`

This module contains the documentary, dev-only Senior Agent Profile for the
canonical `validation-eval-designer` agent.

## Relationship To Canonical Base Agent

The canonical base agent remains the minimum role contract for the
`validation-eval-designer`. This module derives its role boundary from
`reference/agents/validation-eval-designer.agent.md`, especially proof design,
targeted-local reading, ephemeral `VALIDATION PACK` ownership, harness
judgment, anti-theater behavior, and refusal to execute validation.

The profile does not reprint the base agent and does not replace it.

## Relationship To Validation Eval Designer Kernel

The `validation_eval_designer_kernel` remains the audit and
semantic-preservation source for kernel-level anchors: proof design before
execution package design, validation design separate from validation execution,
ephemeral `VALIDATION PACK`, `NEEDS_DEV_DECISION_HARNESS`, anti-theater
validation, harness decision gates, and role boundaries.

The profile distills these anchors into compact senior judgment rules. It does
not copy the kernel, supersede the kernel, or treat the kernel as runtime.

## Dev-Only Status

This module is documentation-only and dev-only.

It is explicitly non-runtime, not runtime behavior, not a prompt for a
materialized agent, and must not be loaded or materialized directly into VS
Code, GitHub Agents, Codex, `.github`, `.codex`, `AGENTS.md`, templates,
`sentinel.mjs`, smoke scripts, or target repositories.

This is the third profile in the 12-profile construction order, but it is not a
partial pilot and does not create a subset strategy. Its shape must remain
compatible with future profiles for the other 9 remaining canonical agents.

`orchestrator_profile` and `planner_profile` are references for shape, density,
validation style, and rigor only. They are not content sources to copy.

## Files

- `README.md` explains module scope, source relationships, dev-only status, and
  validation file purpose.
- `SENIOR_AGENT_PROFILE.md` defines the validation-eval-designer seniority
  thesis, role boundary, kernel-derived anchors, decision heuristics, reading
  budget, risk taxonomy, blockers, handoff discipline, evidence discipline,
  anti-overreach rules, anti-bloat rules, and excellent-pass expectations.
- `validation/STATIC_CHECKS.md` defines static checks for structure,
  declarations, required sections, validation-eval-designer specificity,
  proof-design discipline, harness decision discipline, anti-theater behavior,
  anti-runtime leakage, anti-copying, and downstream role boundaries.
- `validation/GOLDEN_SCENARIOS.md` defines behavioral audit scenarios that
  detect honest validation design, missing brief handling, harness ambiguity,
  validation theater, validation-runner takeover, execution-package takeover,
  implementation pressure, source ambiguity, required versus advisory
  validation, context bloat, and runtime leakage.
- `validation/EXCELLENT_PASS_EXPECTATIONS.md` defines the local excellent-pass
  quality bar for future audit of this profile.

## Global Contracts

Global contracts belong outside this module. They are not created by this task.
No `seniorization_lab/contracts/` contract is defined here. If future
profile-wide contracts become necessary, that is a separate seniorization-lab
concern and must not be invented inside `validation_eval_designer_profile`.
