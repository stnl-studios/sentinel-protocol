# Materialization Lab

This directory is a documentary/dev-only area for the future senior-agent
materialization rewrite of `stnl_project_agent_specializer_dev`.

It defines the canonical target contract and validation expectations for the
next materialization phase. It also defines the explicit template and output
shape contract for the canonical targets, plus the render-context composition
contract for combining base agents, Senior Agent Profiles, and explicit
templates. It does not authorize runtime materialization, target-repository
writes, productive-skill changes, GitHub writes, or changes to productive
templates.

## Canonical Scope

- `contracts/TARGETS_CONTRACT.md`: canonical target IDs, legacy-term
  normalization rules, expected future output paths, and blocking rules.
- `contracts/TEMPLATES_AND_OUTPUTS_CONTRACT.md`: explicit template inventory,
  expected output shapes, current missing-template status, and
  `BLOCKED_TEMPLATE_MISSING` rules for the canonical targets.
- `contracts/RENDERING_AND_COMPOSITION_CONTRACT.md`: documentary/dev-only
  render-context contract for deterministic composition from base agents,
  Senior Agent Profiles, target/template contracts, and explicit templates.
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

Rendering and composition are also contract-only in this phase. A future
renderer must derive a render context per `agent+target` pair from explicit
sources, but this phase does not produce generated outputs or materialize in a
target project.

Templates must be explicit. A target, target-agent pair, or output shape
without an explicit template blocks with `BLOCKED_TEMPLATE_MISSING`; no
template may be inferred from output path, legacy naming, or the productive
skill.

The current explicit template set covers the canonical output shapes:

- `reference/templates/copilot/agent.md` for `copilot`
  `.github/agents/*.agent.md`
- `reference/templates/codex/agent.toml` for `codex`
  `.codex/agents/*.toml`
- `reference/templates/codex/config.toml` for `codex`
  `.codex/config.toml`
- `reference/templates/codex/AGENTS.md` for `codex` `AGENTS.md`

These templates are source references only. Their presence does not authorize
runtime scripts, target-repository writes, productive-skill changes, GitHub
writes, or materialization in `.github/**`, `.codex/**`, or `AGENTS.md`.

Composition sources are explicit: `reference/agents/<agent>.agent.md`,
`reference/seniorization_lab/<agent>_profile/SENIOR_AGENT_PROFILE.md`,
`reference/templates/<target>/...`,
`reference/materialization_lab/contracts/TARGETS_CONTRACT.md`, and
`reference/materialization_lab/contracts/TEMPLATES_AND_OUTPUTS_CONTRACT.md`.
Missing sources block with `BLOCKED_SOURCE_MISSING`; missing placeholders block
with `BLOCKED_PLACEHOLDER_MISSING`; unsafe YAML/TOML rendering blocks with
`BLOCKED_UNSAFE_RENDER`; conflicts between base agents and Senior Agent
Profiles block with `BLOCKED_COMPOSITION_CONFLICT`.
