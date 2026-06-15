# Static Checks

These checks validate only the documentary/dev-only materialization target,
template, output, rendering, composition, dry-run/write-boundary, validation
harness, and implementation-boundary contracts. Passing them does not
authorize runtime materialization, runtime scripts, or writes to target
projects.

## Required Files

Confirm the ten materialization lab files exist:

- `reference/materialization_lab/README.md`
- `reference/materialization_lab/contracts/TARGETS_CONTRACT.md`
- `reference/materialization_lab/contracts/TEMPLATES_AND_OUTPUTS_CONTRACT.md`
- `reference/materialization_lab/contracts/RENDERING_AND_COMPOSITION_CONTRACT.md`
- `reference/materialization_lab/contracts/DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md`
- `reference/materialization_lab/contracts/VALIDATION_HARNESS_CONTRACT.md`
- `reference/materialization_lab/contracts/IMPLEMENTATION_BOUNDARY_CONTRACT.md`
- `reference/materialization_lab/validation/STATIC_CHECKS.md`
- `reference/materialization_lab/validation/GOLDEN_SCENARIOS.md`
- `reference/materialization_lab/validation/EXCELLENT_PASS_EXPECTATIONS.md`

Confirm the four explicit canonical templates exist:

- `reference/templates/copilot/agent.md`
- `reference/templates/codex/agent.toml`
- `reference/templates/codex/AGENTS.md`
- `reference/templates/codex/config.toml`

Confirm the separately authorized dev-only static contract validator exists:

- `scripts/materialization_lab/check-static.mjs`

Confirm `scripts/materialization_lab/check-static.mjs` is a read-only Node.js
ESM static contract validator with no external package dependency.

Confirm the static validator ignores `__MACOSX` and `.DS_Store`.

Confirm the static validator does not authorize target reads, target writes,
fixtures, generated outputs, GitHub writes, productive skill changes,
productive-template changes, historical-audit changes, runtime materializer
behavior, or real materialization.

Confirm the expected successful validator output is exactly:

- `MATERIALIZATION_STATIC_CONTRACT_CHECK: PASS`

Confirm the separately authorized dev-only source inventory validator exists:

- `scripts/materialization_lab/check-source-inventory.mjs`

Confirm `scripts/materialization_lab/check-source-inventory.mjs` is a read-only
Node.js ESM source inventory validator with no external package dependency.

Confirm the source inventory validator ignores `__MACOSX` and `.DS_Store`.

Confirm the source inventory validator does not accept a target project path and
does not read outside `skills/stnl_project_agent_specializer_dev/`.

Confirm the source inventory validator does not authorize target reads, target
writes, fixtures, generated outputs, GitHub writes, productive skill changes,
productive-template changes, historical-audit changes, runtime materializer
behavior, or real materialization.

Confirm the expected successful validator output is exactly:

- `MATERIALIZATION_SOURCE_INVENTORY_CHECK: PASS`

Confirm the separately authorized dev-only template coverage validator exists:

- `scripts/materialization_lab/check-template-coverage.mjs`

Confirm `scripts/materialization_lab/check-template-coverage.mjs` is a
read-only Node.js ESM template coverage validator with no external package
dependency.

Confirm the template coverage validator ignores `__MACOSX` and `.DS_Store`.

Confirm the template coverage validator rejects target project path arguments,
does not read outside `skills/stnl_project_agent_specializer_dev/`, and does
not perform target read/write.

Confirm the template coverage validator does not authorize target reads, target
writes, fixtures, generated outputs, GitHub writes, productive skill changes,
productive-template changes, historical-audit changes, runtime materializer
behavior, or real materialization.

Confirm the expected successful validator output is exactly:

- `MATERIALIZATION_TEMPLATE_COVERAGE_CHECK: PASS`

## Contract Anchors

Confirm `contracts/TARGETS_CONTRACT.md` contains all required anchors:

- `copilot`
- `codex`
- `.github/agents`
- `.codex/agents`
- `.codex/config.toml`
- `AGENTS.md`

Confirm `contracts/TEMPLATES_AND_OUTPUTS_CONTRACT.md` contains all required
anchors:

- `copilot`
- `codex`
- `.github/agents`
- `.codex/agents`
- `.codex/config.toml`
- `AGENTS.md`
- `BLOCKED_TEMPLATE_MISSING`

Confirm `contracts/TEMPLATES_AND_OUTPUTS_CONTRACT.md` records explicit template
coverage for:

- `reference/templates/copilot/agent.md` covering `.github/agents/*.agent.md`
- `reference/templates/codex/agent.toml` covering `.codex/agents/*.toml`
- `reference/templates/codex/config.toml` covering `.codex/config.toml`
- `reference/templates/codex/AGENTS.md` covering `AGENTS.md`

Confirm the contract does not list `copilot` `.github/agents/*.agent.md` or
`codex` `.codex/agents/*.toml` as currently missing.

Confirm `contracts/RENDERING_AND_COMPOSITION_CONTRACT.md` contains all 12
canonical agent IDs:

- `orchestrator`
- `planner`
- `validation-eval-designer`
- `execution-package-designer`
- `designer`
- `coder-frontend`
- `coder-backend`
- `coder-ios`
- `validation-runner`
- `reviewer`
- `finalizer`
- `resync`

Confirm `contracts/RENDERING_AND_COMPOSITION_CONTRACT.md` contains all five
rendering/composition block codes:

- `BLOCKED_SOURCE_MISSING`
- `BLOCKED_TEMPLATE_MISSING`
- `BLOCKED_PLACEHOLDER_MISSING`
- `BLOCKED_UNSAFE_RENDER`
- `BLOCKED_COMPOSITION_CONFLICT`

Confirm `contracts/RENDERING_AND_COMPOSITION_CONTRACT.md` declares the explicit
composition sources:

- `reference/agents/<agent>.agent.md`
- `reference/agents/<agent>.md` as the logical base-agent source slot
- `reference/seniorization_lab/<agent>_profile/SENIOR_AGENT_PROFILE.md`
- `reference/templates/<target>/...`
- `reference/materialization_lab/contracts/TARGETS_CONTRACT.md`
- `reference/materialization_lab/contracts/TEMPLATES_AND_OUTPUTS_CONTRACT.md`

Confirm `contracts/DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md` contains all four
planned operations:

- `CREATE_PLANNED`
- `UPDATE_PLANNED`
- `UNCHANGED_PLANNED`
- `BLOCKED_PLANNED`

Confirm `contracts/DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md` contains the
required dry-run output-plan fields:

- `target_id`
- `agent_id`
- `output_shape`
- `planned_path`
- `template_source`
- `base_agent_source`
- `senior_profile_source`
- `operation`
- `managed_artifact`
- `existing_file_state`
- `drift_status`
- `blocking_status`
- `block_code`

Confirm `contracts/DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md` contains the
canonical target-root-relative output paths:

- `.github/agents/<agent>.agent.md`
- `.codex/agents/<agent>.toml`
- `.codex/config.toml`
- `AGENTS.md`

Confirm `contracts/DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md` contains all five
dry-run/write-boundary block codes:

- `BLOCKED_TARGET_ROOT_INVALID`
- `BLOCKED_PATH_UNSAFE`
- `BLOCKED_UNMANAGED_COLLISION`
- `BLOCKED_INVALID_MANAGED_NOTICE`
- `BLOCKED_DRY_RUN_REQUIRED`

Confirm `contracts/DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md` preserves the
earlier rendering/composition block codes:

- `BLOCKED_SOURCE_MISSING`
- `BLOCKED_TEMPLATE_MISSING`
- `BLOCKED_PLACEHOLDER_MISSING`
- `BLOCKED_UNSAFE_RENDER`
- `BLOCKED_COMPOSITION_CONFLICT`

Confirm `contracts/DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md` declares the managed
artifact policy:

- generated artifacts must contain a Sentinel managed notice;
- artifacts without a valid managed notice must not be overwritten
  automatically;
- manual-file collisions block with `BLOCKED_UNMANAGED_COLLISION`;
- invalid managed notices block with `BLOCKED_INVALID_MANAGED_NOTICE`;
- managed status is not inferred from path shape alone.

Confirm `contracts/VALIDATION_HARNESS_CONTRACT.md` exists and is classified as
documentary/dev-only.

Confirm `contracts/VALIDATION_HARNESS_CONTRACT.md` states that it does not
create runtime scripts.

Confirm `contracts/VALIDATION_HARNESS_CONTRACT.md` requires validation before
any real materialization.

Confirm `contracts/VALIDATION_HARNESS_CONTRACT.md` contains all validation
layers:

- source inventory validation;
- target normalization validation;
- template coverage validation;
- placeholder validation;
- render safety validation;
- dry-run output plan validation;
- write-boundary validation;
- no-target-write validation;
- productive-skill untouched validation.

Confirm `contracts/VALIDATION_HARNESS_CONTRACT.md` declares the minimum future
matrix:

- 12 agents x `copilot`;
- 12 agents x `codex`;
- `codex` config;
- `codex` root instructions.

Confirm `contracts/VALIDATION_HARNESS_CONTRACT.md` contains all 12 canonical
agent IDs:

- `orchestrator`
- `planner`
- `validation-eval-designer`
- `execution-package-designer`
- `designer`
- `coder-frontend`
- `coder-backend`
- `coder-ios`
- `validation-runner`
- `reviewer`
- `finalizer`
- `resync`

Confirm `contracts/VALIDATION_HARNESS_CONTRACT.md` declares the required
structured report fields:

- `validation_id`
- `status`
- `checked_contracts`
- `agent_matrix`
- `target_matrix`
- `planned_artifacts`
- `blocked_artifacts`
- `write_attempts`
- `productive_skill_changes`
- `target_file_changes`
- `block_codes`

Confirm `contracts/VALIDATION_HARNESS_CONTRACT.md` declares the only validation
statuses:

- `VALIDATION_PASS`
- `VALIDATION_BLOCKED`
- `VALIDATION_FAILED`

Confirm `contracts/VALIDATION_HARNESS_CONTRACT.md` contains all five
validation-harness block codes:

- `BLOCKED_VALIDATION_WRITE_ATTEMPT`
- `BLOCKED_PRODUCTIVE_SKILL_MUTATION`
- `BLOCKED_TARGET_FILE_MUTATION`
- `BLOCKED_MATRIX_INCOMPLETE`
- `BLOCKED_UNKNOWN_BLOCK_CODE`

Confirm `contracts/VALIDATION_HARNESS_CONTRACT.md` states that unknown block
codes block with `BLOCKED_UNKNOWN_BLOCK_CODE`.

Confirm `contracts/VALIDATION_HARNESS_CONTRACT.md` states that fixtures may
exist only in a later explicitly authorized step.

Confirm `contracts/VALIDATION_HARNESS_CONTRACT.md` does not authorize runtime
scripts, fixtures, target writes, generated outputs, productive skill changes,
GitHub writes, or real materialization.

Confirm `contracts/IMPLEMENTATION_BOUNDARY_CONTRACT.md` exists and is
classified as documentary/dev-only.

Confirm `contracts/IMPLEMENTATION_BOUNDARY_CONTRACT.md` states that it does
not create scripts.

Confirm `contracts/IMPLEMENTATION_BOUNDARY_CONTRACT.md` states that it
prepares only a later separately authorized dev-only implementation step.

Confirm `contracts/IMPLEMENTATION_BOUNDARY_CONTRACT.md` allows only these
future script categories:

- static contract validator;
- source inventory validator;
- template coverage validator;
- render-context planner;
- dry-run output planner;
- validation report generator.

Confirm `contracts/IMPLEMENTATION_BOUNDARY_CONTRACT.md` authorizes the future
script path:

- `skills/stnl_project_agent_specializer_dev/scripts/materialization_lab/`

Confirm `contracts/IMPLEMENTATION_BOUNDARY_CONTRACT.md` declares the future
read boundary:

- `skills/stnl_project_agent_specializer_dev/reference/**`
- `skills/stnl_project_agent_specializer_dev/README.md`
- `skills/stnl_project_agent_specializer_dev/SKILL.md`
- `skills/stnl_project_agent_specializer_dev/openai.yaml`
- target project read-only access only when a later step authorizes dry-run
  against a target.

Confirm `contracts/IMPLEMENTATION_BOUNDARY_CONTRACT.md` declares that future
scripts must not write:

- target project;
- `.github/**`;
- `.codex/**`;
- `AGENTS.md`;
- `skills/stnl_project_agent_specializer/`;
- GitHub;
- productive templates;
- historical audits.

Confirm `contracts/IMPLEMENTATION_BOUNDARY_CONTRACT.md` contains all six
implementation-boundary block codes:

- `BLOCKED_IMPLEMENTATION_SCOPE_INVALID`
- `BLOCKED_SCRIPT_PATH_UNAUTHORIZED`
- `BLOCKED_SCRIPT_WRITE_CAPABILITY`
- `BLOCKED_SCRIPT_TARGET_MUTATION`
- `BLOCKED_SCRIPT_PRODUCTIVE_MUTATION`
- `BLOCKED_SCRIPT_OUTPUT_UNAUTHORIZED`

Confirm `contracts/IMPLEMENTATION_BOUNDARY_CONTRACT.md` states that future
outputs initially permitted may be only dev-only reports in an explicitly
authorized path, and that this task does not authorize those outputs.

Confirm `contracts/IMPLEMENTATION_BOUNDARY_CONTRACT.md` states that any future
script with write capability outside an authorized dev-only report output must
block.

Confirm `contracts/IMPLEMENTATION_BOUNDARY_CONTRACT.md` does not authorize
script creation, runtime execution, fixtures, target writes, generated outputs,
productive skill changes, GitHub writes, real materialization, runtime
materializer, or fixture creation.

Confirm the current separately authorized implementation is limited to
`scripts/materialization_lab/check-static.mjs` as a static contract validator
and `scripts/materialization_lab/check-source-inventory.mjs` as a source
inventory validator, plus
`scripts/materialization_lab/check-template-coverage.mjs` as a template
coverage validator.

Confirm that this implementation remains dev-only and read-only and does not
create reports, fixtures, generated artifacts, target artifacts, `.github/**`,
`.codex/**`, or `AGENTS.md`.

## Source Inventory Validator Checks

Confirm `scripts/materialization_lab/check-source-inventory.mjs` validates
exactly the 12 canonical base agents under `reference/agents/`:

- `orchestrator.agent.md`
- `planner.agent.md`
- `validation-eval-designer.agent.md`
- `execution-package-designer.agent.md`
- `designer.agent.md`
- `coder-frontend.agent.md`
- `coder-backend.agent.md`
- `coder-ios.agent.md`
- `validation-runner.agent.md`
- `reviewer.agent.md`
- `finalizer.agent.md`
- `resync.agent.md`

Confirm `scripts/materialization_lab/check-source-inventory.mjs` validates
exactly the 12 Senior Agent Profiles under `reference/seniorization_lab/`:

- `orchestrator_profile/SENIOR_AGENT_PROFILE.md`
- `planner_profile/SENIOR_AGENT_PROFILE.md`
- `validation_eval_designer_profile/SENIOR_AGENT_PROFILE.md`
- `execution_package_designer_profile/SENIOR_AGENT_PROFILE.md`
- `designer_profile/SENIOR_AGENT_PROFILE.md`
- `coder_frontend_profile/SENIOR_AGENT_PROFILE.md`
- `coder_backend_profile/SENIOR_AGENT_PROFILE.md`
- `coder_ios_profile/SENIOR_AGENT_PROFILE.md`
- `validation_runner_profile/SENIOR_AGENT_PROFILE.md`
- `reviewer_profile/SENIOR_AGENT_PROFILE.md`
- `finalizer_profile/SENIOR_AGENT_PROFILE.md`
- `resync_profile/SENIOR_AGENT_PROFILE.md`

Confirm the source inventory validator enforces the explicit kebab-case agent
ID to underscore profile directory mapping.

Confirm the source inventory validator fails when `reference/agents/` contains
an extra non-ignored agent item.

Confirm the source inventory validator fails when
`reference/seniorization_lab/` contains an extra non-ignored profile directory
outside the 12 expected profile directories, `contracts/`, the known global
audit/validation files, or canonical global items.

Confirm the source inventory validator checks each base agent for identity,
mission, required output, status/role signal, and handoff or boundary anchors.

Confirm the source inventory validator checks each Senior Agent Profile for
identity, profile status, canonical role boundary, documentary/dev-only or
non-runtime boundary, materialization/runtime non-authorization, and
target-output/write-boundary anchors.

Confirm the source inventory validator checks the four explicit templates,
`reference/MANIFEST.md`, `scripts/materialization_lab/check-static.mjs`, and
its own manifest registration.

## Template Coverage Validator Checks

Confirm `scripts/materialization_lab/check-template-coverage.mjs` validates the
existence of the four explicit templates:

- `reference/templates/copilot/agent.md`
- `reference/templates/codex/agent.toml`
- `reference/templates/codex/config.toml`
- `reference/templates/codex/AGENTS.md`

Confirm the template coverage validator validates that
`contracts/TEMPLATES_AND_OUTPUTS_CONTRACT.md` registers the four explicit
templates and output shapes:

- `copilot`: `.github/agents/*.agent.md`
- `codex`: `.codex/agents/*.toml`
- `codex`: `.codex/config.toml`
- `codex`: `AGENTS.md`

Confirm the template coverage validator validates that no canonical expected
output shape is listed as missing.

Confirm the template coverage validator validates required placeholders for
`reference/templates/copilot/agent.md` and
`reference/templates/codex/agent.toml`, including common placeholders and
target-specific placeholders.

Confirm the template coverage validator validates the required Codex TOML
fields: `name`, `description`, `model`, `model_reasoning_effort`,
`sandbox_mode`, and `developer_instructions`.

Confirm the template coverage validator validates that
`reference/templates/copilot/agent.md` contains frontmatter delimited by `---`
and places `{{AGENT_BODY}}` after the frontmatter.

Confirm the template coverage validator validates that templates document
`runtime_materialization_authorized: false` or equivalent non-authorization and
do not mention `vscode` as a canonical target.

Confirm the template coverage validator validates that
`contracts/DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md` contains the path mappings
for `.github/agents/<agent>.agent.md`, `.codex/agents/<agent>.toml`,
`.codex/config.toml`, and `AGENTS.md`.

Confirm the template coverage validator validates that `reference/MANIFEST.md`
lists the four templates and
`scripts/materialization_lab/check-template-coverage.mjs`.

## Template Placeholder Checks

Confirm `reference/templates/copilot/agent.md` contains all required
placeholders:

- `{{AGENT_ID}}`
- `{{AGENT_NAME}}`
- `{{AGENT_DESCRIPTION}}`
- `{{AGENT_BODY}}`
- `{{TARGET_ID}}`
- `{{GENERATED_NOTICE}}`
- `{{SOURCE_VERSION}}`
- `{{AGENT_TOOLS}}`
- `{{AGENT_MODEL}}`
- `{{SPECIALIZATION_REVISION}}`
- `{{COPILOT_ORCHESTRATOR_AGENTS_BLOCK}}`
- `{{READING_SCOPE_CLASS_BLOCK}}`

Confirm `reference/templates/codex/agent.toml` contains all required
placeholders:

- `{{AGENT_ID}}`
- `{{AGENT_NAME}}`
- `{{AGENT_DESCRIPTION}}`
- `{{AGENT_BODY}}`
- `{{TARGET_ID}}`
- `{{GENERATED_NOTICE}}`
- `{{SOURCE_VERSION}}`
- `{{AGENT_MODEL}}`
- `{{MODEL_REASONING_EFFORT}}`
- `{{SANDBOX_MODE}}`

Confirm both explicit agent templates document the placeholders, preserve the
agent body/instructions as a placeholder, and do not mention `vscode` as a
canonical target.

Confirm `contracts/RENDERING_AND_COMPOSITION_CONTRACT.md` lists the common
required placeholders:

- `{{AGENT_ID}}`
- `{{AGENT_NAME}}`
- `{{AGENT_DESCRIPTION}}`
- `{{AGENT_BODY}}`
- `{{TARGET_ID}}`
- `{{GENERATED_NOTICE}}`
- `{{SOURCE_VERSION}}`

Confirm `contracts/RENDERING_AND_COMPOSITION_CONTRACT.md` lists the
target-specific placeholders for `copilot`:

- `{{AGENT_TOOLS}}`
- `{{AGENT_MODEL}}`
- `{{SPECIALIZATION_REVISION}}`
- `{{COPILOT_ORCHESTRATOR_AGENTS_BLOCK}}`
- `{{READING_SCOPE_CLASS_BLOCK}}`

Confirm `contracts/RENDERING_AND_COMPOSITION_CONTRACT.md` lists the
target-specific placeholders for `codex`:

- `{{AGENT_MODEL}}`
- `{{MODEL_REASONING_EFFORT}}`
- `{{SANDBOX_MODE}}`

Confirm both explicit agent templates and
`contracts/RENDERING_AND_COMPOSITION_CONTRACT.md` state that they do not
authorize runtime materialization, runtime scripts, target-project writes,
GitHub writes, or writes to `.github/**`, `.codex/**`, or `AGENTS.md`.

Confirm `contracts/DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md` states that it does
not authorize runtime scripts, target writes, generated outputs, target project
mutation, productive skill changes, GitHub writes, inferred templates, or
overwrite of manual files.

Confirm `contracts/VALIDATION_HARNESS_CONTRACT.md` states that it does not
authorize runtime scripts, fixtures, target writes, generated outputs,
productive skill changes, GitHub writes, or real materialization.

## Rendering Safety Checks

Confirm `contracts/RENDERING_AND_COMPOSITION_CONTRACT.md` requires:

- Copilot frontmatter to be YAML-safe;
- Copilot block placeholders to render valid YAML or a valid empty string;
- Codex output to be TOML-safe;
- `{{AGENT_BODY}}` in Codex to be emitted by a TOML-aware renderer as a valid
  TOML string value;
- unsafe generated notices or unsafe placeholder values to block with
  `BLOCKED_UNSAFE_RENDER`;
- conflicts between base agent and Senior Agent Profile to block with
  `BLOCKED_COMPOSITION_CONFLICT`.

## Template Inference Guard

Confirm `contracts/TEMPLATES_AND_OUTPUTS_CONTRACT.md` states that templates
must not be inferred from output path, legacy naming, the productive skill, or
existing target-project artifacts.

## Blocking Boundaries

Confirm the materialization lab does not authorize:

- writes to any target project;
- changes to `.github/**`, `.codex/**`, or `AGENTS.md` in a target project;
- changes to `skills/stnl_project_agent_specializer/`;
- changes to the productive skill;
- changes to productive templates;
- inferred templates;
- inferred senior profiles;
- generated outputs;
- runtime scripts.

Confirm `contracts/RENDERING_AND_COMPOSITION_CONTRACT.md` does not authorize
runtime scripts or target writes.

Confirm `contracts/DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md` requires a dry-run
output plan before any future write and blocks any write attempted without an
approved dry-run output plan with `BLOCKED_DRY_RUN_REQUIRED`.

Confirm `contracts/VALIDATION_HARNESS_CONTRACT.md` blocks any write attempt
during validation with `BLOCKED_VALIDATION_WRITE_ATTEMPT`.

Confirm `contracts/VALIDATION_HARNESS_CONTRACT.md` blocks productive skill
mutation with `BLOCKED_PRODUCTIVE_SKILL_MUTATION`.

Confirm `contracts/VALIDATION_HARNESS_CONTRACT.md` blocks mutation of
`.github/**`, `.codex/**`, or `AGENTS.md` outside a later explicitly
authorized fixture with `BLOCKED_TARGET_FILE_MUTATION`.

Confirm `contracts/VALIDATION_HARNESS_CONTRACT.md` blocks incomplete 12 agents
x `copilot` / 12 agents x `codex` coverage with
`BLOCKED_MATRIX_INCOMPLETE`.

Confirm `contracts/VALIDATION_HARNESS_CONTRACT.md` blocks unknown block codes
with `BLOCKED_UNKNOWN_BLOCK_CODE`.

Confirm `contracts/IMPLEMENTATION_BOUNDARY_CONTRACT.md` blocks invalid future
implementation scope with `BLOCKED_IMPLEMENTATION_SCOPE_INVALID`.

Confirm `contracts/IMPLEMENTATION_BOUNDARY_CONTRACT.md` blocks future scripts
outside `skills/stnl_project_agent_specializer_dev/scripts/materialization_lab/`
or another explicitly registered dev-only path with
`BLOCKED_SCRIPT_PATH_UNAUTHORIZED`.

Confirm `contracts/IMPLEMENTATION_BOUNDARY_CONTRACT.md` blocks future scripts
with unauthorized write capability with `BLOCKED_SCRIPT_WRITE_CAPABILITY`.

Confirm `contracts/IMPLEMENTATION_BOUNDARY_CONTRACT.md` blocks future target
mutation with `BLOCKED_SCRIPT_TARGET_MUTATION`.

Confirm `contracts/IMPLEMENTATION_BOUNDARY_CONTRACT.md` blocks future
productive-skill or productive-template mutation with
`BLOCKED_SCRIPT_PRODUCTIVE_MUTATION`.

Confirm `contracts/IMPLEMENTATION_BOUNDARY_CONTRACT.md` blocks future outputs
that are not explicitly authorized with `BLOCKED_SCRIPT_OUTPUT_UNAUTHORIZED`.

## Legacy Rewrite Guard

Confirm the contract blocks blind/global replacement of legacy terms and
preserves historical references unless a separately scoped and justified
migration authorizes a specific edit.
