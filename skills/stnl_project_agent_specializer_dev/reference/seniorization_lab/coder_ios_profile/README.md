# coder_ios_profile

Module: `coder_ios_profile`

Target agent: `coder-ios`

This module contains the documentary, dev-only Senior Agent Profile for the
canonical `coder-ios` agent.

## Relationship To Canonical Base Agent

The canonical base agent remains the minimum role contract for `coder-ios`.
This module derives its role boundary from
`reference/agents/coder-ios.agent.md`, especially executor-only ownership,
`targeted-local` reading, valid `EXECUTION PACKAGE` dependence,
Swift/SwiftUI-first native iOS execution, UIKit interop only when evidenced,
terminal `READY` or `BLOCKED` handoff discipline, and refusal to plan,
package, validate, review, finalize, resync, or materialize runtime artifacts.

The profile does not reprint the base agent and does not replace it.

## Relationship To Coder-iOS Kernel

The `coder_ios_kernel` remains the audit and semantic-preservation source for
kernel-level anchors: current-round package execution, `WORK_PACKAGE_ID`,
`OWNED_PATHS`, `DO_NOT_TOUCH`, `DEPENDS_ON`, `BLOCK_IF`, native iOS platform
discipline, Swift and SwiftUI default path, conditional UIKit interop,
`stnl_mobile_ios_swift_quality`, safe blocker behavior, implementation
evidence, and downstream handoff boundaries.

The profile distills these anchors into compact senior judgment rules. It does
not copy the kernel, supersede the kernel, or treat the kernel as runtime.

## Dev-Only Status

This module is documentation-only and dev-only.

It is explicitly non-runtime, not runtime behavior, not a prompt for a
materialized agent, and must not be loaded or materialized directly into VS
Code, GitHub Agents, Codex, `.github`, `.codex`, `AGENTS.md`, templates,
`sentinel.mjs`, smoke scripts, productive skills, or target repositories.

It must not be materialized directly. Runtime artifacts for VS Code, GitHub
Agents, Codex, or any other target are outside this module and outside this
task.

This profile is part of the 12-profile Senior Agent Profile construction, but
it is not a partial pilot, does not create a subset strategy, and does not
create artificial demand for a smaller set of agents.

Profiles already created in `seniorization_lab/*_profile/` are references for
shape, density, validation style, and rigor only. They are not content sources
to copy into `coder_ios_profile`.

## Files

- `README.md` explains module scope, source relationships, dev-only status,
  validation file purpose, one-of-12 framing, and global-contract boundary.
- `SENIOR_AGENT_PROFILE.md` defines the `coder-ios` seniority thesis,
  canonical role boundary, kernel-derived anchors, iOS execution heuristics,
  reading budget, risk taxonomy, blockers, handoff discipline, evidence
  discipline, anti-overreach rules, anti-bloat rules, and excellent-pass
  expectations.
- `validation/STATIC_CHECKS.md` defines static checks for structure,
  declarations, required sections, `coder-ios` specificity, anti-runtime
  leakage, anti-copying, native iOS execution discipline, package boundary
  discipline, platform safety, evidence, blocking behavior, and downstream
  role boundaries.
- `validation/GOLDEN_SCENARIOS.md` defines behavioral audit scenarios that
  detect valid iOS package execution, missing package handling, path and
  do-not-touch traps, backend contract traps, design/product ambiguity,
  platform constraints, context bloat, evidence traps, runtime leakage, and
  cross-owner takeover.
- `validation/EXCELLENT_PASS_EXPECTATIONS.md` defines the local excellent-pass
  quality bar for future audit of this profile.

## Global Contracts

Global contracts belong outside this module. They are not created by this
task. No `seniorization_lab/contracts/` contract is defined here. If future
profile-wide contracts become necessary, that is a separate seniorization-lab
concern and must not be invented inside `coder_ios_profile`.

## Remaining Profiles After This Scope

The remaining Senior Agent Profiles after this module are:

- `validation_runner_profile`
- `reviewer_profile`
- `finalizer_profile`
- `resync_profile`
