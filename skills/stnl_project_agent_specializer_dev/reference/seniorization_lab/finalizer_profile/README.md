# finalizer_profile

Module: `finalizer_profile`

Target agent: `finalizer`

This module contains the documentary, dev-only Senior Agent Profile for the
canonical `finalizer` agent.

## Relationship To Canonical Base Agent

The canonical base agent remains the minimum role contract for the `finalizer`.
This module derives its role boundary from
`reference/agents/finalizer.agent.md`, especially closure ownership,
`minimal-verification` reading, runner verdict preservation, reviewer signal
preservation when review entered the round, residual correction pack
preservation, closure ledger discipline, `DONE: yes/no`, `resync: yes/no`, and
refusal to implement, validate, review, replan, or execute resync.

The profile does not reprint the base agent and does not replace it.

## Relationship To Finalizer Kernel

The `finalizer_kernel` remains the audit and semantic-preservation source for
kernel-level anchors: terminal closure after validation or explicit
pre-validation blockage, evidence-based closure, no fake `READY`, no invented
QA, explicit `DONE` and resync decisions, minimum honest `Feature CONTEXT`
delta, slice closure discipline, residual correction preservation, no runtime
materialization, and no downstream role takeover.

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

This profile is part of the 12-profile construction sequence. According to the
current phase context, after this `finalizer_profile` the remaining informed
profile is `resync_profile`.

This is not a partial pilot and does not create a subset strategy. Prior senior
profiles are references for shape, density, validation style, and rigor only.
They are not content sources to copy into `finalizer_profile`.

## Files

- `README.md` explains module scope, source relationships, dev-only status,
  series framing, and validation file purpose.
- `SENIOR_AGENT_PROFILE.md` defines the finalizer seniority thesis, role
  boundary, kernel-derived anchors, decision heuristics, reading budget, risk
  taxonomy, blockers, handoff discipline, evidence discipline,
  anti-overreach rules, anti-bloat rules, and excellent-pass expectations.
- `validation/STATIC_CHECKS.md` defines static checks for structure,
  declarations, required sections, finalizer specificity, closure discipline,
  terminal status separation, evidence-based closure, anti-runtime leakage,
  anti-copying, residual risk handling, resync boundary, and downstream role
  containment.
- `validation/GOLDEN_SCENARIOS.md` defines behavioral audit scenarios that
  detect clean closure, missing validation evidence, missing required review,
  residual risk honesty, correction-loop exhaustion, resync traps, conflicting
  final artifacts, implementation pressure, and closure-time context bloat.
- `validation/EXCELLENT_PASS_EXPECTATIONS.md` defines the local excellent-pass
  quality bar for future audit of this profile.

## Global Contracts

Global contracts belong outside this module. They are not created by this
task. No `seniorization_lab/contracts/` contract is defined here.

The current tree does not contain a `seniorization_lab/contracts/` directory.
This module does not invent global contracts to compensate for that absence. If
future profile-wide contracts become necessary, that is a separate
seniorization-lab concern and must not be created inside `finalizer_profile`.
