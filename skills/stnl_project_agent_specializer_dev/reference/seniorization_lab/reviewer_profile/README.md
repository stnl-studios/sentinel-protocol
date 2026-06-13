# reviewer_profile

Module: `reviewer_profile`

Target agent: `reviewer`

This module contains the documentary, dev-only Senior Agent Profile for the
canonical `reviewer` agent.

## Relationship To Canonical Base Agent

The canonical base agent remains the minimum role contract for the `reviewer`.
This module derives its role boundary from
`reference/agents/reviewer.agent.md`, especially `review-minimal` reading,
post-implementation review, required/advisory review classification,
`REVIEW_CLEAR`, `REVIEW_RISK`, `CORRECTION PACK`, and refusal to implement,
execute validation, finalize, resync, or write durable documentation.

The profile does not reprint the base agent and does not replace it.

## Relationship To Reviewer Kernel

The reviewer kernel remains the audit and semantic-preservation source for
kernel-level anchors: semantic review of a concrete artifact or diff,
material-risk classification, correction-pack discipline, bounded reading,
proof ownership separation, finalizer boundary, resync boundary, and no generic
opinion review.

The profile distills these anchors into compact senior judgment rules. It does
not copy the kernel, supersede the kernel, or treat the kernel as runtime.

## Dev-Only Status

This module is documentation-only and dev-only.

It is not runtime behavior, not a prompt for a materialized agent, and must not
be loaded or materialized directly into VS Code, GitHub Agents, Codex,
`.github`, `.codex`, `AGENTS.md`, templates, `sentinel.mjs`, smoke scripts, or
target repositories.

This profile is part of the 12-profile construction sequence, but it is not a
partial pilot and does not create a subset strategy.

Existing senior profiles are references for shape, density, validation style,
and rigor only. They are not content sources to copy into `reviewer_profile`.

## Files

- `README.md` explains module scope, source relationships, dev-only status, and
  validation file purpose.
- `SENIOR_AGENT_PROFILE.md` defines the reviewer seniority thesis, role
  boundary, kernel-derived anchors, decision heuristics, reading budget, risk
  taxonomy, blockers, handoff discipline, evidence discipline, anti-overreach
  rules, anti-bloat rules, and excellent-pass expectations.
- `validation/STATIC_CHECKS.md` defines static checks for structure,
  declarations, required sections, reviewer specificity, semantic review
  discipline, materiality, evidence, verdict boundaries, anti-runtime leakage,
  anti-copying, and role containment.
- `validation/GOLDEN_SCENARIOS.md` defines behavioral audit scenarios that
  detect clear review behavior, missing artifact handling, evidence traps,
  advisory-versus-blocker mistakes, material risk handling, role takeover,
  scope reopening, broad audit behavior, correction handoff, and runtime
  leakage.
- `validation/EXCELLENT_PASS_EXPECTATIONS.md` defines the local excellent-pass
  quality bar for future audit of this profile.

## Global Contracts

Global contracts belong outside this module. They are not created by this task.
No `seniorization_lab/contracts/` contract is defined here. If future
profile-wide contracts become necessary, that is a separate seniorization-lab
concern and must not be invented inside `reviewer_profile`.
