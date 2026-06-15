# Materialization Lab

This directory is a documentary/dev-only area for the future senior-agent
materialization rewrite of `stnl_project_agent_specializer_dev`.

It defines the canonical target contract and validation expectations for the
next materialization phase. It also defines the explicit template and output
shape contract for the canonical targets. It does not authorize runtime
materialization, target-repository writes, productive-skill changes, GitHub
writes, or changes to productive templates.

## Canonical Scope

- `contracts/TARGETS_CONTRACT.md`: canonical target IDs, legacy-term
  normalization rules, expected future output paths, and blocking rules.
- `contracts/TEMPLATES_AND_OUTPUTS_CONTRACT.md`: explicit template inventory,
  expected output shapes, missing template gaps, and
  `BLOCKED_TEMPLATE_MISSING` rules for the canonical targets.
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

Templates must be explicit. A target, target-agent pair, or output shape
without an explicit template blocks with `BLOCKED_TEMPLATE_MISSING`; no
template may be inferred from output path, legacy naming, or the productive
skill.
