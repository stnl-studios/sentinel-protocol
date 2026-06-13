# validation_runner_profile

Module: `validation_runner_profile`

Target agent: `validation-runner`

This module contains the documentary, dev-only Senior Agent Profile for the
canonical `validation-runner` agent.

## Relationship To Canonical Base Agent

The canonical base agent remains the minimum role contract for the
`validation-runner`. This module derives its role boundary from
`reference/agents/validation-runner.agent.md`, especially post-implementation
proof execution, `minimal-verification` reading, strict `VALIDATION PACK`
consumption, valid executor `READY` entry, concrete evidence, terminal verdict
discipline, `CORRECTION PACK` exclusivity, and refusal to implement, redesign
proof, review, finalize, resync, or write durable documentation.

The profile does not reprint the base agent and does not replace it.

## Relationship To Validation Runner Kernel

The `validation_runner_kernel` remains the audit and semantic-preservation
source for kernel-level anchors: proof execution after implementation,
obligation-to-evidence mapping, no validation theater, no `PASS` without direct
material evidence, executor handoff validity, current-round `VALIDATION PACK`
authority, terminal verdicts, correction-pack discipline, compact QA handoff,
and no runtime or materialization authorization.

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

This is the ninth profile in the 12-profile construction order, but it is not
a partial pilot and does not create a subset strategy. Its shape must remain
compatible with future profiles for the remaining canonical agents:
`reviewer_profile`, `finalizer_profile`, and `resync_profile`.

Previous senior profiles are references for shape, density, validation style,
and rigor only. They are not content sources to copy.

## Files

- `README.md` explains module scope, source relationships, dev-only status, and
  validation file purpose.
- `SENIOR_AGENT_PROFILE.md` defines the validation-runner seniority thesis,
  role boundary, kernel-derived anchors, decision heuristics, reading budget,
  risk taxonomy, blockers, handoff discipline, evidence discipline,
  anti-overreach rules, anti-bloat rules, and excellent-pass expectations.
- `validation/STATIC_CHECKS.md` defines static checks for structure,
  declarations, required sections, validation-runner specificity,
  proof-execution discipline, obligation-to-evidence mapping, anti-theater
  behavior, anti-runtime leakage, anti-copying, correction-pack discipline, and
  downstream role boundaries.
- `validation/GOLDEN_SCENARIOS.md` defines behavioral audit scenarios that
  detect honest proof execution, missing evidence, validation theater, harness
  blockers, failure correction packs, partial validation, scope drift,
  takeover pressure, conflicting artifacts, and runtime leakage.
- `validation/EXCELLENT_PASS_EXPECTATIONS.md` defines the local excellent-pass
  quality bar for future audit of this profile.

## Global Contracts

Global contracts belong outside this module. They are not created by this
task. No `seniorization_lab/contracts/` contract is defined here. If future
profile-wide contracts become necessary, that is a separate seniorization-lab
concern and must not be invented inside `validation_runner_profile`.
