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

Fixtures may exist only in a later step that explicitly authorizes fixture
creation and scopes where those fixtures may live. Until that later
authorization exists, fixture absence is intentional.

## Validation Layers

A future validation harness must run all layers below before any real
materialization:

- source inventory validation;
- target normalization validation;
- template coverage validation;
- placeholder validation;
- render safety validation;
- dry-run output plan validation;
- write-boundary validation;
- no-target-write validation;
- productive-skill untouched validation.

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

Unknown block codes must not be ignored, normalized, or treated as warnings.
They block the validation verdict with `BLOCKED_UNKNOWN_BLOCK_CODE`.

## Contract Inputs

The future validation harness must check this contract together with:

- `TARGETS_CONTRACT.md`
- `TEMPLATES_AND_OUTPUTS_CONTRACT.md`
- `RENDERING_AND_COMPOSITION_CONTRACT.md`
- `DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md`

The validation harness must also preserve earlier source, template,
placeholder, render-safety, composition, dry-run, path-safety, and managed
artifact block codes defined by those contracts.

## Explicit Non-Authorization

This contract does not authorize:

- runtime scripts;
- target writes;
- generated outputs;
- fixtures;
- productive skill changes;
- GitHub writes;
- real materialization;
- changes to `skills/stnl_project_agent_specializer/`;
- creation or alteration of `.github/**`, `.codex/**`, or `AGENTS.md` in this
  repo root or any target project.
