# Materialization Lab

This directory is a documentary/dev-only area for the future senior-agent
materialization rewrite of `stnl_project_agent_specializer_dev`.

It defines the canonical target contract and validation expectations for the
next materialization phase. It also defines the explicit template and output
shape contract for the canonical targets, plus the render-context composition
contract for combining base agents, Senior Agent Profiles, and explicit
templates. It also defines the dry-run output-plan and write-boundary contract
for future artifact planning. It also defines the validation harness contract
for future pre-materialization validation and dry-run smoke reporting. It does
not authorize runtime materialization, target-repository writes,
productive-skill changes, GitHub writes, or changes to productive templates.

## Canonical Scope

- `contracts/TARGETS_CONTRACT.md`: canonical target IDs, legacy-term
  normalization rules, expected future output paths, and blocking rules.
- `contracts/TEMPLATES_AND_OUTPUTS_CONTRACT.md`: explicit template inventory,
  expected output shapes, current missing-template status, and
  `BLOCKED_TEMPLATE_MISSING` rules for the canonical targets.
- `contracts/RENDERING_AND_COMPOSITION_CONTRACT.md`: documentary/dev-only
  render-context contract for deterministic composition from base agents,
  Senior Agent Profiles, target/template contracts, and explicit templates.
- `contracts/DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md`: documentary/dev-only
  dry-run output-plan, drift classification, managed-artifact, path-safety, and
  write-boundary contract for future planned artifacts.
- `contracts/VALIDATION_HARNESS_CONTRACT.md`: documentary/dev-only validation
  harness and dry-run smoke contract for future pre-materialization checks,
  structured reporting, no-write enforcement, matrix completeness, and
  productive-skill immutability.
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

Dry-run/write-boundary planning is also contract-only in this phase. A future
materialization flow must produce a dry-run output plan before any write, and
each planned artifact must record target, agent, output shape, planned path,
template source, base-agent source, senior-profile source, operation,
managed-artifact state, existing-file state, drift status, blocking status, and
block code. During this documentary/dev-only phase, all operations are only
planned: `CREATE_PLANNED`, `UPDATE_PLANNED`, `UNCHANGED_PLANNED`, and
`BLOCKED_PLANNED` write nothing.

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

Future output paths must be relative to the target project root: `copilot`
agents plan to `.github/agents/<agent>.agent.md`, `codex` agents plan to
`.codex/agents/<agent>.toml`, Codex config plans to `.codex/config.toml`, and
Codex root instructions plan to `AGENTS.md`. Invalid target roots block with
`BLOCKED_TARGET_ROOT_INVALID`; unsafe paths block with `BLOCKED_PATH_UNSAFE`;
manual-file collisions block with `BLOCKED_UNMANAGED_COLLISION`; invalid
managed notices block with `BLOCKED_INVALID_MANAGED_NOTICE`; and any attempted
write without an approved dry-run output plan blocks with
`BLOCKED_DRY_RUN_REQUIRED`.

Validation harness planning is also contract-only in this phase. A future
validation harness must run before any real materialization and must validate
source inventory, target normalization, template coverage, placeholders, render
safety, dry-run output plans, write boundaries, absence of target writes, and
absence of productive-skill changes. The minimum future matrix is 12 agents x
`copilot`, 12 agents x `codex`, `codex` config, and `codex` root instructions.
The future report must include `validation_id`, `status`, `checked_contracts`,
`agent_matrix`, `target_matrix`, `planned_artifacts`, `blocked_artifacts`,
`write_attempts`, `productive_skill_changes`, `target_file_changes`, and
`block_codes`.

The only validation statuses are `VALIDATION_PASS`, `VALIDATION_BLOCKED`, and
`VALIDATION_FAILED`. Validation writes block with
`BLOCKED_VALIDATION_WRITE_ATTEMPT`; productive-skill mutations block with
`BLOCKED_PRODUCTIVE_SKILL_MUTATION`; target file mutations in `.github/**`,
`.codex/**`, or `AGENTS.md` outside a later explicitly authorized fixture block
with `BLOCKED_TARGET_FILE_MUTATION`; incomplete matrix coverage blocks with
`BLOCKED_MATRIX_INCOMPLETE`; and unknown block codes block with
`BLOCKED_UNKNOWN_BLOCK_CODE`.
