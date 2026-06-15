# Materialization Lab

This directory is a documentary/dev-only area for the future senior-agent
materialization rewrite of `stnl_project_agent_specializer_dev`.

It defines the canonical target contract and validation expectations for the
next materialization phase. It does not authorize runtime materialization,
target-repository writes, productive-skill changes, GitHub writes, or changes
to productive templates.

## Canonical Scope

- `contracts/TARGETS_CONTRACT.md`: canonical target IDs, legacy-term
  normalization rules, expected future output paths, and blocking rules.
- `validation/STATIC_CHECKS.md`: required static checks for this contract
  phase.
- `validation/GOLDEN_SCENARIOS.md`: minimum positive and negative scenarios
  the future materializer must preserve.
- `validation/EXCELLENT_PASS_EXPECTATIONS.md`: criteria for declaring this
  contract phase excellent.

## Current Phase Boundary

This lab is only a contract layer. It is not the final runtime materializer and
must not be treated as permission to write `.github/**`, `.codex/**`, or
`AGENTS.md` in any target project.
