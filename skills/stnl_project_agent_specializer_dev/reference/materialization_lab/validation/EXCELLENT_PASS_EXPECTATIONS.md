# Excellent Pass Expectations

The verdict `MATERIALIZATION_TARGETS_CONTRACT: EXCELLENT PASS` may be declared
only when all criteria below are satisfied.

The verdict `MATERIALIZATION_TEMPLATES_AND_OUTPUTS_CONTRACT: EXCELLENT PASS`
may be declared only when the template and output criteria below are also
satisfied.

The verdict `MATERIALIZATION_EXPLICIT_TEMPLATES: EXCELLENT PASS` may be
declared only when the explicit agent-template criteria below are also
satisfied.

The verdict
`MATERIALIZATION_RENDERING_AND_COMPOSITION_CONTRACT: EXCELLENT PASS` may be
declared only when the render-context composition criteria below are also
satisfied.

The verdict
`MATERIALIZATION_DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT: EXCELLENT PASS` may be
declared only when the dry-run output-plan, drift, managed-artifact,
path-safety, and write-boundary criteria below are also satisfied.

## Required Criteria

- The eight materialization lab files exist in
  `reference/materialization_lab/`.
- `TARGETS_CONTRACT.md` declares `copilot` and `codex` as the only canonical
  target IDs for the new version.
- `TEMPLATES_AND_OUTPUTS_CONTRACT.md` exists and is classified as
  documentary/dev-only.
- `RENDERING_AND_COMPOSITION_CONTRACT.md` exists and is classified as
  documentary/dev-only.
- `DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md` exists and is classified as
  documentary/dev-only.
- Legacy runtime target terms `vscode`, `VS Code`, `VS Code/GitHub`, and
  `GitHub Agents` normalize to `copilot` only in target-runtime context.
- Historical references in audits, profiles, and old contracts are protected
  from automatic rewrite.
- Future output paths are declared for `copilot` and `codex`.
- The expected output shapes are declared: `copilot`
  `.github/agents/*.agent.md`, `codex` `.codex/agents/*.toml`, `codex`
  `.codex/config.toml`, and `codex` `AGENTS.md`.
- The explicit dev-skill templates currently present are inventoried:
  `reference/templates/copilot/agent.md`,
  `reference/templates/codex/agent.toml`,
  `reference/templates/codex/AGENTS.md`, and
  `reference/templates/codex/config.toml`.
- No expected canonical output shape is listed as currently missing after
  `reference/templates/copilot/agent.md` and
  `reference/templates/codex/agent.toml` are present.
- `reference/templates/copilot/agent.md` explicitly covers
  `.github/agents/*.agent.md`, documents required placeholders, uses
  canonical target `copilot`, preserves `{{AGENT_BODY}}` for the specialized
  Markdown body, and does not authorize runtime materialization.
- `reference/templates/codex/agent.toml` explicitly covers
  `.codex/agents/*.toml`, documents required placeholders, preserves
  `{{AGENT_BODY}}` as the TOML developer-instructions body, includes the
  required Codex fields `name`, `description`, `model`,
  `model_reasoning_effort`, `sandbox_mode`, and `developer_instructions`, and
  does not authorize runtime materialization.
- Both explicit agent templates contain `{{AGENT_ID}}`, `{{AGENT_NAME}}`,
  `{{AGENT_DESCRIPTION}}`, `{{AGENT_BODY}}`, `{{TARGET_ID}}`,
  `{{GENERATED_NOTICE}}`, and `{{SOURCE_VERSION}}`.
- Neither explicit agent template mentions `vscode` as a canonical target.
- The contract explicitly denies runtime materialization, target-repository
  writes, productive-skill changes, productive-template changes, GitHub writes,
  and blind global replacement of legacy terms.
- Any target without an explicit template blocks with
  `BLOCKED_TEMPLATE_MISSING`.
- Any target-agent pair or output shape without an explicit template blocks
  with `BLOCKED_TEMPLATE_MISSING`.
- No template is inferred from output path, legacy name, productive-skill
  template, existing target-project artifact, or naming symmetry.
- Productive templates are allowed only as read-only conceptual reference in
  this phase and never as automatic write sources.
- Rendering/composition sources are explicit: base agent, Senior Agent Profile,
  target template, `TARGETS_CONTRACT.md`, and
  `TEMPLATES_AND_OUTPUTS_CONTRACT.md`.
- The rendering/composition contract declares all 12 canonical agent IDs:
  `orchestrator`, `planner`, `validation-eval-designer`,
  `execution-package-designer`, `designer`, `coder-frontend`,
  `coder-backend`, `coder-ios`, `validation-runner`, `reviewer`, `finalizer`,
  and `resync`.
- A future renderer is required to produce a deterministic render context per
  `agent+target` pair before any output decision, while this phase writes no
  generated artifacts.
- The rendering/composition contract declares the common placeholders
  `{{AGENT_ID}}`, `{{AGENT_NAME}}`, `{{AGENT_DESCRIPTION}}`,
  `{{AGENT_BODY}}`, `{{TARGET_ID}}`, `{{GENERATED_NOTICE}}`, and
  `{{SOURCE_VERSION}}`.
- The rendering/composition contract declares Copilot-specific placeholders
  `{{AGENT_TOOLS}}`, `{{AGENT_MODEL}}`, `{{SPECIALIZATION_REVISION}}`,
  `{{COPILOT_ORCHESTRATOR_AGENTS_BLOCK}}`, and
  `{{READING_SCOPE_CLASS_BLOCK}}`.
- The rendering/composition contract declares Codex-specific placeholders
  `{{AGENT_MODEL}}`, `{{MODEL_REASONING_EFFORT}}`, and `{{SANDBOX_MODE}}`.
- The rendering/composition contract requires YAML-safe Copilot frontmatter,
  valid Copilot YAML block placeholders or valid empty strings, TOML-safe Codex
  output, and TOML-aware rendering of Codex `{{AGENT_BODY}}`.
- The rendering/composition contract defines generated notice rules for
  Copilot Markdown and Codex TOML comments and blocks unsafe notices.
- The rendering/composition contract requires `{{AGENT_BODY}}` to preserve
  base-agent mission, boundaries, handoff, role class, status, invariants, and
  operating rules while incorporating seniorization without erasing base
  contracts.
- The rendering/composition contract declares
  `BLOCKED_SOURCE_MISSING`, `BLOCKED_TEMPLATE_MISSING`,
  `BLOCKED_PLACEHOLDER_MISSING`, `BLOCKED_UNSAFE_RENDER`, and
  `BLOCKED_COMPOSITION_CONFLICT`.
- The rendering/composition contract denies target writes, runtime scripts,
  generated outputs, productive skill changes, GitHub writes, inferred
  templates, and inferred senior profiles.
- The dry-run/write-boundary contract requires a dry-run output plan before any
  future target write, generated artifact write, repair, delete, or cleanup.
- The dry-run output plan requires `target_id`, `agent_id`, `output_shape`,
  `planned_path`, `template_source`, `base_agent_source`,
  `senior_profile_source`, `operation`, `managed_artifact`,
  `existing_file_state`, `drift_status`, `blocking_status`, and `block_code`
  for each planned artifact.
- The dry-run/write-boundary contract declares the only planned operations:
  `CREATE_PLANNED`, `UPDATE_PLANNED`, `UNCHANGED_PLANNED`, and
  `BLOCKED_PLANNED`.
- The dry-run/write-boundary contract states that all planned operations are
  dry-run only in this documentary/dev-only phase and write nothing.
- The dry-run/write-boundary contract declares target-root-relative output
  paths for `copilot` `.github/agents/<agent>.agent.md`, `codex`
  `.codex/agents/<agent>.toml`, `codex` `.codex/config.toml`, and `codex`
  `AGENTS.md`.
- The dry-run/write-boundary contract blocks invalid target roots, unsafe
  paths, unmanaged collisions, invalid managed notices, and writes attempted
  without an approved dry-run output plan.
- The dry-run/write-boundary contract declares the block codes
  `BLOCKED_TARGET_ROOT_INVALID`, `BLOCKED_PATH_UNSAFE`,
  `BLOCKED_UNMANAGED_COLLISION`, `BLOCKED_INVALID_MANAGED_NOTICE`, and
  `BLOCKED_DRY_RUN_REQUIRED`.
- The dry-run/write-boundary contract preserves
  `BLOCKED_SOURCE_MISSING`, `BLOCKED_TEMPLATE_MISSING`,
  `BLOCKED_PLACEHOLDER_MISSING`, `BLOCKED_UNSAFE_RENDER`, and
  `BLOCKED_COMPOSITION_CONFLICT`.
- The dry-run/write-boundary contract requires generated artifacts to contain a
  Sentinel managed notice, forbids automatic overwrite of artifacts without a
  valid managed notice, and blocks conflicts with manual files.
- The dry-run/write-boundary contract denies runtime scripts, writes, generated
  outputs, target project mutation, productive skill changes, GitHub writes,
  inferred templates, inferred senior profiles, and overwrite of manual files.
- `openai.yaml` describes targets as `copilot` or `codex`.
- `reference/MANIFEST.md` records `reference/materialization_lab/` as a
  dev-only contract area, not a final runtime materializer.
- No file under `skills/stnl_project_agent_specializer/` is changed.

## Failure Conditions

Do not declare `MATERIALIZATION_TARGETS_CONTRACT: EXCELLENT PASS` if any check
depends on inferred templates, target writes, productive-skill edits, broad
legacy-term replacement, or undocumented assumptions.

Do not declare
`MATERIALIZATION_TEMPLATES_AND_OUTPUTS_CONTRACT: EXCELLENT PASS` if any check
depends on inferred templates, automatic productive-template reuse,
target-project writes, runtime scripts, productive-skill edits, or undocumented
assumptions.

Do not declare `MATERIALIZATION_EXPLICIT_TEMPLATES: EXCELLENT PASS` if either
explicit agent template is absent, lacks required placeholders, omits the
target-specific output shape, authorizes runtime materialization, treats
productive templates as an automatic source, or reintroduces `vscode` as a
canonical target.

Do not declare
`MATERIALIZATION_RENDERING_AND_COMPOSITION_CONTRACT: EXCELLENT PASS` if any
check depends on inferred sources, inferred templates, inferred senior
profiles, unsafe YAML/TOML rendering, target writes, runtime scripts, generated
outputs, productive-skill edits, GitHub writes, or silent conflict resolution
between base agents and Senior Agent Profiles.

Do not declare
`MATERIALIZATION_DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT: EXCELLENT PASS` if any
check depends on target writes, generated outputs, runtime scripts, missing
dry-run plans, unapproved writes, path traversal, absolute paths, symlink-unsafe
destinations, unmanaged overwrites, invalid managed notices, inferred
templates, inferred sources, productive-skill edits, GitHub writes, or mutation
of `.github/**`, `.codex/**`, or `AGENTS.md` in this repo root or any target
project.
