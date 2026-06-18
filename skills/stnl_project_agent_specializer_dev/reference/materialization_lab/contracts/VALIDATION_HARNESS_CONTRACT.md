# Validation Harness Contract

Status: documentary/dev-only contract.

This contract defines the validation harness and dry-run smoke boundary for a
future senior materializer implementation. It is not a runtime materializer and
does not create runtime scripts.

Validation must run before any real materialization, target-project write,
generated output write, repair, delete, cleanup, or GitHub write can occur in a
separately authorized later phase.

## Non-Runtime Boundary

This contract is a documentary/dev-only validation contract. It defines what a
future harness must check and report before any materialization decision. It
does not implement the harness, create scripts, create fixtures, create
generated outputs, write target files, or mutate the productive skill.

Fixture root and schema documentation may exist only under
`reference/materialization_lab/fixtures/`. Complete documentary fixtures are
authorized only under that root when they match the fixture matrix declared by
`FIXTURE_BOUNDARY_CONTRACT.md`. Their presence supports dev-only validation
and does not authorize target read/write, generated outputs, runtime scripts,
or runtime materialization.

## Validation Layers

A future validation harness must run all layers below before any real
materialization:

- source inventory validation;
- source model validation;
- kernel coverage validation;
- target normalization validation;
- template coverage validation;
- placeholder validation;
- render safety validation;
- dry-run output plan validation;
- write-boundary validation;
- no-target-write validation;
- productive-skill untouched validation;
- fixture boundary validation;
- lazy-load trace fixture validation;
- project scenario matrix fixture validation;
- expected output snapshot policy validation;
- blocked fixture case validation;
- no base-agent final source validation;
- no inferred templates validation;
- no runtime materializer validation.

Each layer must fail closed. A skipped, unknown, or inconclusive layer blocks
the validation verdict rather than allowing materialization to proceed.

## Minimum Future Matrix

The minimum future validation matrix is:

- 12 agents x `copilot`;
- 12 agents x `codex`;
- `codex` config;
- `codex` root instructions.

The 12 canonical agents are:

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

The matrix is complete only when every canonical agent is checked for both
canonical targets and the target-level Codex artifacts are checked. Missing any
agent, target, or Codex target-level artifact blocks with
`BLOCKED_MATRIX_INCOMPLETE`.

The source model layer must also validate complete kernel coverage for the 12
canonical agents. The validation harness must classify `reference/agents/` only
as a temporary development parity baseline and must not treat it as a render,
dry-run, or materialization source.

## Future Fixture Validation

Fixture validation must recognize the fixture root, schema, and authorized
complete fixture matrix:

- `reference/materialization_lab/fixtures/README.md`
- `reference/materialization_lab/fixtures/FIXTURE_SCHEMA.md`
- `reference/materialization_lab/fixtures/projects/README.md`
- `reference/materialization_lab/fixtures/expected_outputs/README.md`
- `reference/materialization_lab/fixtures/expected_outputs/SNAPSHOT_POLICY.md`
- `reference/materialization_lab/fixtures/lazy_load/README.md`
- `reference/materialization_lab/fixtures/blocked_cases/README.md`
- six project `FIXTURE.md` files
- eight lazy-load `FIXTURE.md` files
- ten blocked-case `FIXTURE.md` files
- four expected-output snapshot `FIXTURE.md` files

Fixture validation remains documentary/dev-only. It must validate fixture
boundary, fixture schema, lazy-load trace fixtures, project scenario matrix
fixtures, expected output snapshot policy, blocked fixture cases, no
base-agent final source, no inferred templates, no runtime materializer, no
target real read/write, no GitHub write, and no productive-skill mutation.

Only the declared matrix is complete in this phase. Any fixture outside that
matrix remains unauthorized and must fail closed.

The read-only fixture to render/dry-run integration is validated by
`scripts/materialization_lab/check-fixture-render-dry-run-integration.mjs`.
It uses normalized fixture projections only; it does not create a runtime
materializer, renderer, writer, loader, scenario selector, rendered output,
snapshot, dry-run report, or target artifact. The lazy-load gate remains
independent and must pass through the lazy-load fixture checker before any
render/dry-run integration is accepted. The expected dev-only verdict is
`MATERIALIZATION_FIXTURE_RENDER_DRY_RUN_INTEGRATION_CHECK: PASS`.

## Structured Validation Report

The future validation harness must produce a structured report containing at
least:

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

The report must distinguish planned artifacts from written artifacts. In this
documentary/dev-only phase, written artifacts must be empty or absent, and any
write attempt must block.

## Validation Statuses

Use only these validation statuses:

- `VALIDATION_PASS`
- `VALIDATION_BLOCKED`
- `VALIDATION_FAILED`

`VALIDATION_PASS` is allowed only when every required layer, matrix entry,
contract anchor, no-write boundary, and productive-skill boundary passes.

`VALIDATION_BLOCKED` is required when a known block condition prevents a safe
validation pass before execution or materialization.

`VALIDATION_FAILED` is reserved for a completed validation run that detects a
contract violation or inconsistent result that is not merely blocked by missing
or unsafe prerequisites.

## Block Codes

Use these validation-harness block codes exactly:

- `BLOCKED_VALIDATION_WRITE_ATTEMPT`: any write attempt occurs during
  validation.
- `BLOCKED_PRODUCTIVE_SKILL_MUTATION`: any change is detected in
  `skills/stnl_project_agent_specializer/`.
- `BLOCKED_TARGET_FILE_MUTATION`: any mutation of `.github/**`, `.codex/**`,
  or `AGENTS.md` occurs outside a fixture explicitly authorized by a later
  phase.
- `BLOCKED_MATRIX_INCOMPLETE`: the minimum future matrix does not cover all
  12 agents for both canonical targets, `codex` config, and `codex` root
  instructions.
- `BLOCKED_UNKNOWN_BLOCK_CODE`: an unknown block code appears in the validation
  report, planned artifacts, blocked artifacts, or validation layer output.
- `BLOCKED_SOURCE_MODEL_INVALID`: source-model roles, precedence, or source
  composition contradict `SOURCE_MODEL_CONTRACT.md`.
- `BLOCKED_BASE_AGENT_FINAL_DEPENDENCY`: final render, dry-run, or
  materialization depends on `reference/agents/`.
- `BLOCKED_KERNEL_SOURCE_MISSING`: a required kernel module or its real
  minimum documentation/contract bundle is missing.
- `BLOCKED_KERNEL_COVERAGE_INCOMPLETE`: the 12 canonical agent to kernel
  module mappings are incomplete.
- `BLOCKED_PARITY_BASELINE_REQUIRED_AS_FINAL_SOURCE`: the temporary
  development parity baseline is required as a final source.
- `BLOCKED_SOURCE_MODEL_DEPRECATED_FIELD`: deprecated field `base_agent_source`
  appears in final render context or final dry-run planned artifact shape.
- `BLOCKED_TEMPLATE_INFERRED`: a target, target-agent pair, output shape, or
  fixture attempts to infer a template instead of using an explicit
  `template_source`.
- `BLOCKED_RUNTIME_MATERIALIZER_CREATED`: a runtime materializer, runtime
  loader, renderer, writer, or materialization entrypoint is created in a
  validation or fixture phase.
- `BLOCKED_GITHUB_WRITE`: validation, fixture setup, fixture execution,
  materialization planning, or any related step attempts a GitHub write.
- `BLOCKED_FIXTURE_ROOT_MISSING`: required fixture root is absent.
- `BLOCKED_FIXTURE_SCHEMA_MISSING`: required fixture schema is absent.
- `BLOCKED_FIXTURE_PATH_TRAVERSAL`: fixture path traverses outside the fixture
  root.
- `BLOCKED_FIXTURE_ABSOLUTE_PATH`: fixture path is absolute instead of
  repository-relative under the fixture root.

Unknown block codes must not be ignored, normalized, or treated as warnings.
They block the validation verdict with `BLOCKED_UNKNOWN_BLOCK_CODE`.

## Contract Inputs

The future validation harness must check this contract together with:

- `TARGETS_CONTRACT.md`
- `SOURCE_MODEL_CONTRACT.md`
- `TEMPLATES_AND_OUTPUTS_CONTRACT.md`
- `RENDERING_AND_COMPOSITION_CONTRACT.md`
- `DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md`
- `FIXTURE_BOUNDARY_CONTRACT.md`

The validation harness must also preserve earlier source, template,
placeholder, render-safety, composition, dry-run, path-safety, and managed
artifact block codes defined by those contracts.

Future fixtures must test
`kernel_source + senior_profile_source + template_source`, not a
base-agent-driven source model. They must also validate that lazy load is a
safety contract, load-all by completeness is a violation, material decisions
leave trace, and output/handoff scenarios load the handoff/evidence/output
module when required.

## Explicit Non-Authorization

This contract does not authorize:

- runtime scripts;
- target writes;
- generated outputs;
- runtime fixtures;
- fixtures outside the authorized documentary matrix;
- productive skill changes;
- GitHub writes;
- runtime materializer;
- real materialization;
- changes to `skills/stnl_project_agent_specializer/`;
- creation or alteration of `.github/**`, `.codex/**`, or `AGENTS.md` in this
  repo root or any target project.
