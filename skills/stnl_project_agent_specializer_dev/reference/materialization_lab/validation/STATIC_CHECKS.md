# Static Checks

These checks validate only the documentary/dev-only materialization target,
template, output, rendering, composition, dry-run/write-boundary, validation
harness, and implementation-boundary contracts. Passing them does not
authorize runtime materialization, runtime scripts, or writes to target
projects.

## Required Files

Confirm the fourteen materialization lab contract and validation files exist:

- `reference/materialization_lab/README.md`
- `reference/materialization_lab/contracts/TARGETS_CONTRACT.md`
- `reference/materialization_lab/contracts/SOURCE_MODEL_CONTRACT.md`
- `reference/materialization_lab/contracts/TEMPLATES_AND_OUTPUTS_CONTRACT.md`
- `reference/materialization_lab/contracts/RENDERING_AND_COMPOSITION_CONTRACT.md`
- `reference/materialization_lab/contracts/DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md`
- `reference/materialization_lab/contracts/DRY_RUN_REPORT_MODEL_CONTRACT.md`
- `reference/materialization_lab/contracts/VALIDATION_HARNESS_CONTRACT.md`
- `reference/materialization_lab/contracts/VALIDATION_HARNESS_AGGREGATOR_CONTRACT.md`
- `reference/materialization_lab/contracts/IMPLEMENTATION_BOUNDARY_CONTRACT.md`
- `reference/materialization_lab/contracts/FIXTURE_BOUNDARY_CONTRACT.md`
- `reference/materialization_lab/validation/STATIC_CHECKS.md`
- `reference/materialization_lab/validation/GOLDEN_SCENARIOS.md`
- `reference/materialization_lab/validation/EXCELLENT_PASS_EXPECTATIONS.md`

Confirm the documentary/dev-only fixture root, schema, and complete fixture
matrix exist:

- `reference/materialization_lab/fixtures/README.md`
- `reference/materialization_lab/fixtures/FIXTURE_SCHEMA.md`
- `reference/materialization_lab/fixtures/projects/README.md`
- `reference/materialization_lab/fixtures/expected_outputs/README.md`
- `reference/materialization_lab/fixtures/lazy_load/README.md`
- `reference/materialization_lab/fixtures/blocked_cases/README.md`

Confirm the fixture matrix contains the authorized complete documentary
`FIXTURE.md` cases only: six project fixtures, eight lazy-load fixtures, ten
blocked-case fixtures, four minimal expected-output snapshot fixtures, and
`expected_outputs/SNAPSHOT_POLICY.md`.

Confirm the fixtures remain documentary/dev-only and create no rendered
outputs, no complete rendered snapshots, no runtime materializer, no renderer,
no writer, no loader, no scenario selector, and no target artifacts.

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

Confirm the separately authorized dev-only render-context planner/checker
exists:

- `scripts/materialization_lab/check-render-context.mjs`

Confirm `scripts/materialization_lab/check-render-context.mjs` is a read-only
Node.js ESM render-context planner/checker with no external package
dependency.

Confirm the render-context planner/checker ignores `__MACOSX` and `.DS_Store`.

Confirm the render-context planner/checker rejects target project path
arguments, does not read outside
`skills/stnl_project_agent_specializer_dev/`, does not perform target
read/write, does not create fixtures, does not generate final artifacts, and
does not create persistent reports.

Confirm the render-context planner/checker does not authorize target reads,
target writes, fixtures, generated outputs, reports, GitHub writes,
productive skill changes, changes to `skills/stnl_project_agent_specializer/`,
productive-template changes, historical-audit changes, runtime materializer
behavior, target read/write, or real materialization.

Confirm the expected successful validator output is exactly:

- `MATERIALIZATION_RENDER_CONTEXT_CHECK: PASS`

Confirm the separately authorized dev-only dry-run output plan checker exists:

- `scripts/materialization_lab/check-dry-run-plan.mjs`

Confirm `scripts/materialization_lab/check-dry-run-plan.mjs` is a read-only
Node.js ESM dry-run output plan checker with no external package dependency.

Confirm the dry-run output plan checker ignores `__MACOSX` and `.DS_Store`.

Confirm the dry-run output plan checker rejects target project path arguments,
does not read outside `skills/stnl_project_agent_specializer_dev/`, does not
perform target read/write, does not create fixtures, does not generate final
artifacts, and does not create persistent reports.

Confirm the dry-run output plan checker does not authorize target reads,
target writes, fixtures, generated outputs, reports, GitHub writes,
productive skill changes, changes to `skills/stnl_project_agent_specializer/`,
productive-template changes, historical-audit changes, runtime materializer
behavior, target read/write, or real materialization.

Confirm the dry-run output plan checker validates only abstract planned
artifacts and does not calculate drift against real target files.

Confirm the expected successful validator output is exactly:

- `MATERIALIZATION_DRY_RUN_PLAN_CHECK: PASS`

Confirm the documentary/dev-only Dry-run Report Model contract exists:

- `reference/materialization_lab/contracts/DRY_RUN_REPORT_MODEL_CONTRACT.md`

Confirm the contract defines a conceptual `dry_run_report` shape with
`report_identity`, `report_boundary`, `source_inventory_snapshot`,
`target_intent`, `agent_plan_entries`, `output_plan_entries`, `gate_results`,
`lazy_load_trace`, `blocking_summary`, `no_write_evidence`, and
`non_authorization_summary`.

Confirm the contract is not an executable schema, runtime payload, persistent
report, report generator, checker, CLI contract, materializer interface,
target adapter, renderer, writer, loader, scenario selector, target real
read/write authorization, GitHub write authorization, productive-skill
mutation authorization, or final dependency on `reference/agents/`.

Confirm the contract preserves planned-only operations
`CREATE_PLANNED`, `UPDATE_PLANNED`, `UNCHANGED_PLANNED`, and
`BLOCKED_PLANNED`, forbids executed operation tokens, requires no-write
evidence, requires non-authorization summary, treats lazy-load as a safety
contract, introduces no new block codes, and does not expand the 9 official
checks or the Aggregator Checker.

Confirm the separately authorized dev-only read-only fixture to render/dry-run
integration checker exists:

- `scripts/materialization_lab/check-fixture-render-dry-run-integration.mjs`

Confirm `scripts/materialization_lab/check-fixture-render-dry-run-integration.mjs`
uses normalized fixture projections only and validates project fixtures,
expected-output fixtures, blocked cases by responsible layer, explicit
template sources, abstract render context compatibility,
`simulated_target_paths`, `forbidden_real_target_paths`, and that the
lazy-load gate remains independent.

Confirm the read-only fixture to render/dry-run integration checker rejects
target project path arguments, reads only inside
`skills/stnl_project_agent_specializer_dev/`, imports no write-capable Node
filesystem API, writes no persistent report, creates no rendered output, and
does not calculate drift against real target files.

Confirm the expected successful validator output is exactly:

- `MATERIALIZATION_FIXTURE_RENDER_DRY_RUN_INTEGRATION_CHECK: PASS`

Confirm the dedicated documentary/dev-only Validation Harness Aggregator
contract exists:

- `reference/materialization_lab/contracts/VALIDATION_HARNESS_AGGREGATOR_CONTRACT.md`

Confirm the aggregator contract registers only the separately authorized
dev-only/read-only checker
`scripts/materialization_lab/check-validation-harness-aggregator.mjs` and does
not create a generic runner, persistent report, dry-run report model,
materializer interface, target adapter, write approval protocol, runtime
materializer, renderer, writer, loader, scenario selector, target real
read/write, GitHub write, productive skill authorization, or final dependency
on `reference/agents/`.

Confirm the aggregator checker checklist lists exactly the 9 read-only child
checks in this official order and with these expected verdicts:

- `scripts/materialization_lab/check-static.mjs`:
  `MATERIALIZATION_STATIC_CONTRACT_CHECK: PASS`
- `scripts/materialization_lab/check-source-inventory.mjs`:
  `MATERIALIZATION_SOURCE_INVENTORY_CHECK: PASS`
- `scripts/materialization_lab/check-template-coverage.mjs`:
  `MATERIALIZATION_TEMPLATE_COVERAGE_CHECK: PASS`
- `scripts/materialization_lab/check-fixture-boundary.mjs`:
  `MATERIALIZATION_FIXTURE_BOUNDARY_CHECK: PASS`
- `scripts/materialization_lab/check-lazy-load-fixtures.mjs`:
  `MATERIALIZATION_LAZY_LOAD_FIXTURE_CHECK: PASS`
- `scripts/materialization_lab/check-project-scenarios.mjs`:
  `MATERIALIZATION_PROJECT_SCENARIO_FIXTURE_CHECK: PASS`
- `scripts/materialization_lab/check-render-context.mjs`:
  `MATERIALIZATION_RENDER_CONTEXT_CHECK: PASS`
- `scripts/materialization_lab/check-dry-run-plan.mjs`:
  `MATERIALIZATION_DRY_RUN_PLAN_CHECK: PASS`
- `scripts/materialization_lab/check-fixture-render-dry-run-integration.mjs`:
  `MATERIALIZATION_FIXTURE_RENDER_DRY_RUN_INTEGRATION_CHECK: PASS`

Confirm the aggregator checker expected verdicts are:

- `MATERIALIZATION_VALIDATION_HARNESS_AGGREGATOR_CHECK: PASS`
- `MATERIALIZATION_VALIDATION_HARNESS_AGGREGATOR_CHECK: BLOCKED`

Confirm the separately authorized executable aggregator checker exists:

- `scripts/materialization_lab/check-validation-harness-aggregator.mjs`

Confirm `scripts/materialization_lab/check-validation-harness-aggregator.mjs`
is a read-only Node.js ESM checker with no external package dependency.

Confirm the aggregator checker accepts zero arguments only, blocks any
argument before child execution, maps target/path-like arguments internally to
`BLOCKED_AGGREGATOR_TARGET_ARG`, maps flag-like arguments such as `--json`,
`--help`, and `--list-checks` internally to
`BLOCKED_AGGREGATOR_ARGUMENT_UNSUPPORTED`, and never prints block codes to
stdout.

Confirm the aggregator checker uses the exact 9-child allowlist above in the
official order, uses `process.execPath`, `child_process.spawn`, `shell: false`,
fixed cwd inside `skills/stnl_project_agent_specializer_dev/`, no child
arguments, no custom CLI environment, captures stdout, stderr, exit code,
signal, and spawn error, applies `timeout_per_child_check: 30 seconds`, kills
timed-out children, and performs no retry.

Confirm the aggregator checker accepts child stdout only when it is exactly the
expected PASS line with optional trailing newline, blocks any prefix, suffix,
extra line, stderr output, exit-code mismatch, timeout, spawn error, signal,
missing child, or recognized child failure, and stops on the first
blocked/failing child.

Confirm the aggregator checker prints exactly one aggregate stdout line:

- `MATERIALIZATION_VALIDATION_HARNESS_AGGREGATOR_CHECK: PASS`
- `MATERIALIZATION_VALIDATION_HARNESS_AGGREGATOR_CHECK: BLOCKED`

Confirm the aggregator checker creates no JSON, Markdown, persistent report,
cache, snapshot, temp output, artifact, dry-run report, target report,
runtime/materializer/renderer/writer/loader/scenario selector, target real
read/write, Git command, GitHub write, or productive skill mutation.

Confirm the aggregator contract documents the required dependency matrix:
`check-static.mjs` has no dependencies;
`check-source-inventory.mjs` depends on `check-static.mjs`;
`check-template-coverage.mjs` depends on `check-static.mjs` and
`check-source-inventory.mjs`; `check-fixture-boundary.mjs` depends on
`check-static.mjs`; `check-lazy-load-fixtures.mjs` depends on
`check-static.mjs` and `check-fixture-boundary.mjs`;
`check-project-scenarios.mjs` depends on `check-static.mjs`,
`check-source-inventory.mjs`, `check-template-coverage.mjs`, and
`check-fixture-boundary.mjs`; `check-render-context.mjs` depends on
`check-static.mjs`, `check-source-inventory.mjs`,
`check-template-coverage.mjs`, `check-fixture-boundary.mjs`, and
`check-project-scenarios.mjs`; `check-dry-run-plan.mjs` depends on
`check-static.mjs`, `check-source-inventory.mjs`,
`check-template-coverage.mjs`, and `check-render-context.mjs`; and
`check-fixture-render-dry-run-integration.mjs` depends on all previous checks.

Confirm the aggregator status model contains child statuses `PASS`, `BLOCKED`,
`SKIPPED`, `INCONCLUSIVE`, `UNKNOWN_CHECK`, `CHECK_FAILED_TO_RUN`,
`CHECK_OUTPUT_UNRECOGNIZED`, `CHECK_EXIT_CODE_MISMATCH`, and
`CHECK_TIMED_OUT`; final statuses `PASS` and `BLOCKED`; and mapping
`PASS -> VALIDATION_PASS`, anything else -> `VALIDATION_BLOCKED`.

Confirm the aggregator fail-closed rules require every mandatory child check to
return exactly the expected PASS line with exit code 0, block on missing,
skipped, unknown, inconclusive, failed, timed-out, stderr, unrecognized output,
exit-code mismatch, child crash, `ENOENT`, permission denied, unknown block
code, dependency failure, and stdout extra except trailing newline.

Confirm the aggregator zero-argument policy accepts zero arguments only, blocks
any argument before child execution, never accepts target paths, forbids
`--json`, `--help`, and `--list-checks` in the first version, and mitigates the
`check-static.mjs` extra-argument warning by not passing arguments to child
checks.

Confirm the aggregator stdout-only policy allows only minimal contracted
stdout and forbids persistent reports, Markdown reports, JSON files, caches,
snapshots, temp outputs, artifacts, dry-run reports, and target reports.

Confirm the aggregator child process policy requires a fixed 9-script
allowlist, serial execution, `process.execPath`, `child_process.spawn`,
`shell: false`, no `exec`, no child args, no target path, fixed dev-skill cwd,
no custom CLI env, stdout/stderr/exit-code/signal/spawn-error capture,
`timeout_per_child_check: 30 seconds`, no persistence, no smoke global, no Git
commands, and no target real read/write.

Confirm the aggregator block codes are documented as the 13-code mandatory
set, with no pending optional aggregator block codes:

- `BLOCKED_AGGREGATOR_UNKNOWN_CHECK`
- `BLOCKED_AGGREGATOR_CHECK_SKIPPED`
- `BLOCKED_AGGREGATOR_CHECK_FAILED`
- `BLOCKED_AGGREGATOR_CHECK_OUTPUT_UNRECOGNIZED`
- `BLOCKED_AGGREGATOR_EXIT_CODE_MISMATCH`
- `BLOCKED_AGGREGATOR_TARGET_ARG`
- `BLOCKED_AGGREGATOR_REPORT_UNAUTHORIZED`
- `BLOCKED_AGGREGATOR_RUNTIME_SCOPE`
- `BLOCKED_AGGREGATOR_DEPENDENCY_ORDER`
- `BLOCKED_AGGREGATOR_TIMEOUT`
- `BLOCKED_AGGREGATOR_STDERR_UNEXPECTED`
- `BLOCKED_AGGREGATOR_ARGUMENT_UNSUPPORTED`
- `BLOCKED_AGGREGATOR_CHILD_PROCESS_ERROR`

Confirm unknown aggregator block codes remain blocking and no aggregator block
code authorizes runtime behavior, target write, persistent reports, dry-run
report persistence, materialization, renderer/writer/loader/scenario-selector
creation, GitHub write, or productive skill mutation.

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

Confirm `contracts/SOURCE_MODEL_CONTRACT.md` contains all six source-model
block codes:

- `BLOCKED_SOURCE_MODEL_INVALID`
- `BLOCKED_BASE_AGENT_FINAL_DEPENDENCY`
- `BLOCKED_KERNEL_SOURCE_MISSING`
- `BLOCKED_KERNEL_COVERAGE_INCOMPLETE`
- `BLOCKED_PARITY_BASELINE_REQUIRED_AS_FINAL_SOURCE`
- `BLOCKED_SOURCE_MODEL_DEPRECATED_FIELD`

Confirm `contracts/SOURCE_MODEL_CONTRACT.md` declares:

- `reference/kernel_lab/` is the primary behavior source.
- `reference/agents/` is a temporary development parity baseline.
- `reference/agents/` is not a final materialization source.
- Deprecated field `base_agent_source` is deprecated as materialization source.
- `base_agent_parity_source` is dev-only parity validation metadata only.
- Future materialization uses `kernel_source`, `senior_profile_source`,
  `template_source`, `target_contract_source`, `template_contract_source`, and
  `rendering_contract_source`.

Confirm `contracts/RENDERING_AND_COMPOSITION_CONTRACT.md` declares the explicit
composition sources:

- `reference/kernel_lab/<agent>_kernel/`
- `reference/seniorization_lab/<agent>_profile/SENIOR_AGENT_PROFILE.md`
- `reference/templates/<target>/...`
- `reference/materialization_lab/contracts/TARGETS_CONTRACT.md`
- `reference/materialization_lab/contracts/TEMPLATES_AND_OUTPUTS_CONTRACT.md`
- `reference/materialization_lab/contracts/RENDERING_AND_COMPOSITION_CONTRACT.md`

Confirm `contracts/RENDERING_AND_COMPOSITION_CONTRACT.md` declares that
`reference/agents/` is only a temporary development parity baseline and that
deprecated field `base_agent_source` must not appear in final render context.

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
- `kernel_source`
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

Confirm `contracts/DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md` declares that
deprecated field `base_agent_source` must not appear in final planned artifact
shape and that planned agent artifacts use `kernel_source`.

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
- source model validation;
- kernel coverage validation;
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

Confirm `contracts/VALIDATION_HARNESS_CONTRACT.md` recognizes fixture boundary
validation, lazy-load trace fixture validation, project scenario matrix fixture
validation, expected output snapshot policy validation, blocked fixture case
validation, no base-agent final source validation, no inferred templates
validation, and no runtime materializer validation.

Confirm `contracts/VALIDATION_HARNESS_CONTRACT.md` does not authorize runtime
scripts, fixtures, target writes, generated outputs, productive skill changes,
GitHub writes, or real materialization.

Confirm `contracts/IMPLEMENTATION_BOUNDARY_CONTRACT.md` exists and is
classified as documentary/dev-only.

Confirm `contracts/IMPLEMENTATION_BOUNDARY_CONTRACT.md` states that it does
not create scripts outside explicitly listed dev-only/read-only categories.

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
- validation harness aggregator checker.

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
script creation outside explicitly listed dev-only/read-only categories,
generic runner, target adapter, materializer interface, write approval, runtime
execution, fixtures, target writes, generated outputs, persistent reports,
productive skill changes, GitHub writes, real materialization, runtime
materializer, target real read/write, or fixture creation.

Confirm `contracts/FIXTURE_BOUNDARY_CONTRACT.md` exists and is classified as
documentary/dev-only.

Confirm `contracts/FIXTURE_BOUNDARY_CONTRACT.md` states that this phase
creates only the fixture root, category READMEs, and documentary schema.

Confirm `contracts/FIXTURE_BOUNDARY_CONTRACT.md` states that complete positive
fixtures, complete negative fixtures, rendered snapshots, runtime fixtures,
fixture scripts, scenario selector, lazy-load runtime, renderer, writer, target
artifacts, and runtime materializer are not created in this phase.

Confirm `contracts/FIXTURE_BOUNDARY_CONTRACT.md` declares the only fixture
root:

- `skills/stnl_project_agent_specializer_dev/reference/materialization_lab/fixtures/`

Confirm `contracts/FIXTURE_BOUNDARY_CONTRACT.md` states that future fixtures
must simulate controlled target project roots and must never use a real target
project root.

Confirm `contracts/FIXTURE_BOUNDARY_CONTRACT.md` states that `.github/**`,
`.codex/**`, and `AGENTS.md` may appear only inside an authorized fixture root
and remain prohibited outside that root.

Confirm `contracts/FIXTURE_BOUNDARY_CONTRACT.md` states that future fixture
scripts/checkers must accept only fixture paths inside the authorized fixture
root.

Confirm `contracts/FIXTURE_BOUNDARY_CONTRACT.md` requires
`FIXTURE_SCHEMA.md`, declares fixture expected-output snapshots as
documentary fixture data rather than target artifacts, and states that
lazy-load trace fixtures are not runtime loaders.

Confirm `contracts/FIXTURE_BOUNDARY_CONTRACT.md` states that future fixture
tests may validate fixture boundary, fixture schema, project scenario matrix,
source model composition, explicit template selection, no inferred templates,
path safety, managed notice detection, unmanaged collision, invalid managed
notice, drift classification, expected output snapshot policy, dry-run report
shape, lazy-load trace fixtures, blocked fixture cases, and no-write
enforcement.

Confirm `contracts/FIXTURE_BOUNDARY_CONTRACT.md` states that future fixtures do
not authorize target real read/write, GitHub writes, productive skill changes,
real materialization, runtime materializer, or overwrite of manual files
outside a fixture.

Confirm `contracts/FIXTURE_BOUNDARY_CONTRACT.md` contains all six
fixture-boundary block codes:

- `BLOCKED_FIXTURE_SCOPE_INVALID`
- `BLOCKED_FIXTURE_PATH_UNAUTHORIZED`
- `BLOCKED_FIXTURE_TARGET_REAL`
- `BLOCKED_FIXTURE_WRITE_OUTSIDE_ROOT`
- `BLOCKED_FIXTURE_OUTPUT_UNAUTHORIZED`
- `BLOCKED_FIXTURE_ESCAPES_DEV_SKILL`

Confirm `contracts/FIXTURE_BOUNDARY_CONTRACT.md` also contains the fixture
skeleton/path block codes:

- `BLOCKED_FIXTURE_ROOT_MISSING`
- `BLOCKED_FIXTURE_SCHEMA_MISSING`
- `BLOCKED_FIXTURE_PATH_TRAVERSAL`
- `BLOCKED_FIXTURE_ABSOLUTE_PATH`

Confirm the current separately authorized implementation is limited to
`scripts/materialization_lab/check-static.mjs` as a static contract validator
and `scripts/materialization_lab/check-source-inventory.mjs` as a source
inventory validator, plus
`scripts/materialization_lab/check-template-coverage.mjs` as a template
coverage validator, plus
`scripts/materialization_lab/check-render-context.mjs` as a render-context
planner/checker, plus
`scripts/materialization_lab/check-dry-run-plan.mjs` as a dry-run output plan
checker, plus
`scripts/materialization_lab/check-validation-harness-aggregator.mjs` as a
validation harness aggregator checker.

Confirm that this implementation remains dev-only and read-only and does not
create reports, fixtures, generated artifacts, target artifacts, `.github/**`,
`.codex/**`, or `AGENTS.md`.

Confirm the source model resync criterion is:

- `MATERIALIZATION_SOURCE_MODEL_RESYNC: PASS`
- `SOURCE_MODEL_CONTRACT.md` exists and is registered.
- 12 kernel modules are mapped from canonical agent IDs.
- render context uses `kernel_source`, not deprecated field `base_agent_source`.
- dry-run planned artifact uses `kernel_source`, not deprecated field `base_agent_source`.
- base agents are classified only as a temporary development parity baseline.
- no fixture, script, generated artifact, persistent report, target real
  read/write, GitHub write, productive skill change, or real materialization is
  introduced.

## Source Inventory Validator Checks

Confirm `scripts/materialization_lab/check-source-inventory.mjs` classifies
the current 12 base-agent snapshots under `reference/agents/` as a temporary
development parity baseline:

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
exactly the 12 modular Senior Agent Profiles under
`reference/seniorization_lab/`:

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

Confirm each Senior Agent Profile directory contains this modular shape:

- `README.md`
- `SENIOR_AGENT_PROFILE.md`
- `profile/01_IDENTITY_AND_BOUNDARY.md`
- `profile/02_DECISION_AND_READING.md`
- `profile/03_RISK_AND_GATES.md`
- `profile/04_HANDOFF_EVIDENCE_AND_OUTPUT.md`
- `validation/STATIC_CHECKS.md`
- `validation/GOLDEN_SCENARIOS.md`
- `validation/EXCELLENT_PASS_EXPECTATIONS.md`

Confirm `SENIOR_AGENT_PROFILE.md` is validated as a short manifest, not as the
old 13-section monolithic profile. The validator must not require legacy
sections such as `## 1. Profile Status` or
`## 3. Canonical Role Boundary` inside the manifest.

Confirm each short manifest has robust signals for status/purpose,
documentary/dev-only and non-runtime boundary, the four behavior module paths,
lazy-load or activation model, semantic preservation in the modules, modular
profile linkage, materialization/runtime non-authorization, and target-output
write boundary.

Confirm the source inventory validator checks each behavior module frontmatter
for:

- `module_id:`
- `module_type:`
- `agent_id:`
- `purpose:`
- `load_when:`
- `do_not_load_when:`
- `depends_on:`
- `blocks_if_triggered_but_unloaded: true`

Confirm the source inventory validator treats lazy load as a safety contract:
activated modules are mandatory, inactive modules must not be loaded for
completeness, load-all by default is a violation, and material decisions must
leave a trace in a later runtime/materializer phase.

Confirm module dependencies are validated fail-closed:

- `01_IDENTITY_AND_BOUNDARY` has no behavior-module dependency.
- `02_DECISION_AND_READING` depends on the same agent's identity/boundary
  module.
- `03_RISK_AND_GATES` depends on the same agent's identity/boundary module.
- `04_HANDOFF_EVIDENCE_AND_OUTPUT` depends on the same agent's
  identity/boundary module.
- Empty dependencies for modules 02, 03, or 04 block.
- Cross-agent dependencies block.

Confirm the source inventory validator recognizes these modular profile block
codes where applicable:

- `BLOCKED_REQUIRED_MODULE_NOT_LOADED`
- `BLOCKED_TRIGGERED_GATE_NOT_LOADED`
- `BLOCKED_LAZY_LOAD_TRACE_MISSING`
- `BLOCKED_PROFILE_PART_DEPENDENCY_MISSING`
- `BLOCKED_BEHAVIOR_MODULE_WITHOUT_LOAD_WHEN`
- `BLOCKED_BEHAVIOR_MODULE_WITHOUT_DO_NOT_LOAD_WHEN`
- `BLOCKED_AGENT_LOADED_ALL_MODULES_BY_DEFAULT`
- `BLOCKED_AGENT_DECIDED_WITHOUT_DECISION_MODULE`
- `BLOCKED_OUTPUT_WITHOUT_HANDOFF_EVIDENCE_MODULE`
- `BLOCKED_RISK_DECISION_WITHOUT_GATES_MODULE`
- `BLOCKED_PROFILE_PARTS_RECOMBINED_AS_MONOLITH`
- `BLOCKED_WEAK_PROFILE_MANIFEST`
- `BLOCKED_KERNEL_ANCHOR_LOSS`

Confirm the source inventory validator enforces the explicit kebab-case agent
ID to underscore profile directory mapping.

Confirm the source inventory validator fails when `reference/agents/` contains
an extra non-ignored agent item.

Confirm the source inventory validator fails when
`reference/seniorization_lab/` contains an extra non-ignored profile directory
outside the 12 expected profile directories, `contracts/`, the known global
audit/validation files, `README.md`, or canonical global items.

Confirm the source inventory validator checks each current parity baseline
base-agent snapshot for identity, mission, required output, status/role signal,
and handoff or boundary anchors without treating it as a final source.

Confirm the source inventory validator checks each Senior Agent Profile
manifest and its four behavior modules for modular structure, activation
metadata, dependency safety, documentary/dev-only or non-runtime boundary,
materialization/runtime non-authorization, and target-output/write-boundary
anchors.

Confirm the source inventory validator checks the four explicit templates,
`reference/MANIFEST.md`, `scripts/materialization_lab/check-static.mjs`, and
its own manifest registration.

Confirm the source inventory validator validates the 12 kernel modules under
`reference/kernel_lab/` with this explicit mapping:

- `orchestrator` -> `orchestrator_kernel`
- `planner` -> `planner_kernel`
- `validation-eval-designer` -> `validation_eval_designer_kernel`
- `execution-package-designer` -> `execution_package_designer_kernel`
- `designer` -> `designer_kernel`
- `coder-frontend` -> `coder_frontend_kernel`
- `coder-backend` -> `coder_backend_kernel`
- `coder-ios` -> `coder_ios_kernel`
- `validation-runner` -> `validation_runner_kernel`
- `reviewer` -> `reviewer_kernel`
- `finalizer` -> `finalizer_kernel`
- `resync` -> `resync_kernel`

Confirm the source inventory validator validates each kernel module has a real
minimum documentation/contract bundle already present and treats
`reference/agents/` only as a temporary development parity baseline.

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

## Render Context Planner/Checker Checks

Confirm `scripts/materialization_lab/check-render-context.mjs` validates
exactly the 12 canonical agent IDs:

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

Confirm the render-context planner/checker validates exactly the two canonical
targets:

- `copilot`
- `codex`

Confirm the render-context planner/checker validates every `agent+target` pair
has explicit sources for:

- kernel source;
- Senior Agent Profile source;
- explicit template source;
- target contract source;
- template/output contract source;
- rendering/composition contract source.

Confirm the render-context planner/checker validates the explicit agent
template source for each target:

- `copilot`: `reference/templates/copilot/agent.md`
- `codex`: `reference/templates/codex/agent.toml`

Confirm the render-context planner/checker validates common placeholder values
for every `agent+target` pair:

- `{{AGENT_ID}}`
- `{{AGENT_NAME}}`
- `{{AGENT_DESCRIPTION}}`
- `{{AGENT_BODY}}`
- `{{TARGET_ID}}`
- `{{GENERATED_NOTICE}}`
- `{{SOURCE_VERSION}}`

Confirm the render-context planner/checker validates target-specific
placeholder values:

- `copilot`: `{{AGENT_TOOLS}}`, `{{AGENT_MODEL}}`,
  `{{SPECIALIZATION_REVISION}}`,
  `{{COPILOT_ORCHESTRATOR_AGENTS_BLOCK}}`, and
  `{{READING_SCOPE_CLASS_BLOCK}}`
- `codex`: `{{AGENT_MODEL}}`, `{{MODEL_REASONING_EFFORT}}`, and
  `{{SANDBOX_MODE}}`

Confirm the render-context planner/checker validates that every abstract render
context contains:

- `agent_id`
- `target_id`
- `kernel_source`
- `senior_profile_source`
- `template_source`
- `target_contract_source`
- `template_contract_source`
- `rendering_contract_source`
- `required_placeholder_values`
- `target_specific_placeholder_values`
- `escaping_mode`
- `safety_verdict`
- `source_version_input`
- `generated_notice_representation`
- `composition_conflict_verdict`

Confirm the render-context planner/checker validates that
`orchestrator+copilot` requires
`{{COPILOT_ORCHESTRATOR_AGENTS_BLOCK}}`.

Confirm the render-context planner/checker validates that non-orchestrator
`copilot` contexts permit `{{COPILOT_ORCHESTRATOR_AGENTS_BLOCK}}` as an empty
valid string.

Confirm the render-context planner/checker validates that `copilot` contexts
use YAML-safe mode and `codex` contexts use TOML-safe mode.

Confirm the render-context planner/checker recognizes these rendering and
composition block codes:

- `BLOCKED_SOURCE_MISSING`
- `BLOCKED_TEMPLATE_MISSING`
- `BLOCKED_PLACEHOLDER_MISSING`
- `BLOCKED_UNSAFE_RENDER`
- `BLOCKED_COMPOSITION_CONFLICT`

Confirm the render-context planner/checker validates that
`reference/MANIFEST.md` lists
`scripts/materialization_lab/check-render-context.mjs`.

Confirm the render-context planner/checker validates that the three earlier
materialization-lab scripts still exist:

- `scripts/materialization_lab/check-static.mjs`
- `scripts/materialization_lab/check-source-inventory.mjs`
- `scripts/materialization_lab/check-template-coverage.mjs`

## Dry-Run Output Plan Checker Checks

Confirm `scripts/materialization_lab/check-dry-run-plan.mjs` validates exactly
the 12 canonical agent IDs:

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

Confirm the dry-run output plan checker validates exactly the two canonical
targets:

- `copilot`
- `codex`

Confirm the dry-run output plan checker validates this abstract
planned-artifact matrix:

- 12 `copilot` agent artifacts;
- 12 `codex` agent artifacts;
- 1 `codex` config artifact;
- 1 `codex` root instructions artifact.

Confirm every abstract planned artifact contains:

- `target_id`
- `agent_id`
- `output_shape`
- `planned_path`
- `template_source`
- `kernel_source`
- `senior_profile_source`
- `operation`
- `managed_artifact`
- `existing_file_state`
- `drift_status`
- `blocking_status`
- `block_code`

Confirm the dry-run output plan checker validates these planned paths:

- `copilot`: `.github/agents/<agent>.agent.md`
- `codex` agents: `.codex/agents/<agent>.toml`
- `codex` config: `.codex/config.toml`
- `codex` root instructions: `AGENTS.md`

Confirm the dry-run output plan checker validates that planned paths are
relative, are not absolute, and do not contain traversal.

Confirm the dry-run output plan checker validates operations are limited to:

- `CREATE_PLANNED`
- `UPDATE_PLANNED`
- `UNCHANGED_PLANNED`
- `BLOCKED_PLANNED`

Confirm the dry-run output plan checker validates that, because target read is
not authorized in this implementation, target-dependent state remains
abstract/unavailable and does not authorize write:

- `existing_file_state` remains unavailable;
- `managed_artifact` remains unavailable;
- `drift_status` is not calculated against real target files;
- `blocking_status` remains blocked/no-write.

Confirm the dry-run output plan checker validates
`contracts/DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md` contains planned
operations, required planned-artifact fields, path mappings, managed artifact
policy, drift policy, and block codes.

Confirm the dry-run output plan checker recognizes these dry-run,
write-boundary, rendering, and composition block codes:

- `BLOCKED_TARGET_ROOT_INVALID`
- `BLOCKED_PATH_UNSAFE`
- `BLOCKED_UNMANAGED_COLLISION`
- `BLOCKED_INVALID_MANAGED_NOTICE`
- `BLOCKED_DRY_RUN_REQUIRED`
- `BLOCKED_SOURCE_MISSING`
- `BLOCKED_TEMPLATE_MISSING`
- `BLOCKED_PLACEHOLDER_MISSING`
- `BLOCKED_UNSAFE_RENDER`
- `BLOCKED_COMPOSITION_CONFLICT`

Confirm the dry-run output plan checker validates that
`reference/MANIFEST.md` lists
`scripts/materialization_lab/check-dry-run-plan.mjs`.

Confirm the dry-run output plan checker validates that the four earlier
materialization-lab scripts still exist:

- `scripts/materialization_lab/check-static.mjs`
- `scripts/materialization_lab/check-source-inventory.mjs`
- `scripts/materialization_lab/check-template-coverage.mjs`
- `scripts/materialization_lab/check-render-context.mjs`

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

Confirm `contracts/FIXTURE_BOUNDARY_CONTRACT.md` blocks invalid fixture scope
with `BLOCKED_FIXTURE_SCOPE_INVALID`.

Confirm `contracts/FIXTURE_BOUNDARY_CONTRACT.md` blocks fixture paths outside
`skills/stnl_project_agent_specializer_dev/reference/materialization_lab/fixtures/`
with `BLOCKED_FIXTURE_PATH_UNAUTHORIZED`.

Confirm `contracts/FIXTURE_BOUNDARY_CONTRACT.md` blocks any real target
project root used as a fixture with `BLOCKED_FIXTURE_TARGET_REAL`.

Confirm `contracts/FIXTURE_BOUNDARY_CONTRACT.md` blocks any write outside the
authorized fixture root with `BLOCKED_FIXTURE_WRITE_OUTSIDE_ROOT`.

Confirm `contracts/FIXTURE_BOUNDARY_CONTRACT.md` blocks unauthorized fixture
outputs with `BLOCKED_FIXTURE_OUTPUT_UNAUTHORIZED`.

Confirm `contracts/FIXTURE_BOUNDARY_CONTRACT.md` blocks fixture paths, scripts,
checkers, or outputs that escape
`skills/stnl_project_agent_specializer_dev/` with
`BLOCKED_FIXTURE_ESCAPES_DEV_SKILL`.

## Legacy Rewrite Guard

Confirm the contract blocks blind/global replacement of legacy terms and
preserves historical references unless a separately scoped and justified
migration authorizes a specific edit.

## Fixture Cases Phase Checks

Confirm the authorized fixture case matrix exists:

- six positive project `FIXTURE.md` files;
- eight lazy-load `FIXTURE.md` files;
- ten blocked-case `FIXTURE.md` files;
- `reference/materialization_lab/fixtures/expected_outputs/SNAPSHOT_POLICY.md`;
- four minimal expected-output snapshot `FIXTURE.md` files.

Confirm the separately authorized read-only fixture checkers exist:

- `scripts/materialization_lab/check-fixture-boundary.mjs`
- `scripts/materialization_lab/check-lazy-load-fixtures.mjs`
- `scripts/materialization_lab/check-project-scenarios.mjs`

Confirm those checkers reject target project path arguments, read only inside
`skills/stnl_project_agent_specializer_dev/`, validate fixture files without
writing reports or outputs, and do not create a runtime materializer, runtime
loader, renderer, writer, scenario selector, target real read/write, GitHub
write, or productive-skill mutation.

Confirm the expected successful validator outputs are exactly:

- `MATERIALIZATION_FIXTURE_BOUNDARY_CHECK: PASS`
- `MATERIALIZATION_LAZY_LOAD_FIXTURE_CHECK: PASS`
- `MATERIALIZATION_PROJECT_SCENARIO_FIXTURE_CHECK: PASS`
