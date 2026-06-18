# Materialization Lab

This directory is a documentary/dev-only area for the future senior-agent
materialization rewrite of `stnl_project_agent_specializer_dev`.

It defines the canonical target contract and validation expectations for the
next materialization phase. It also defines the explicit template and output
shape contract for the canonical targets, plus the source model contract for
combining kernel source bundles, Senior Agent Profiles, and explicit templates.
It also defines the render-context composition contract, the dry-run
output-plan and write-boundary contract for future artifact planning, and the
dry-run report model contract for future simulation evidence without
persistence, target read/write, or runtime authorization. It also defines the
materializer interface contract as a documentary/dev-only/read-only conceptual
boundary between validated intent, dry-run-only planning, planned output
entries, and the Dry-run Report Model. It also defines the target adapter
contract as a documentary/dev-only/read-only conceptual boundary between
canonical target intent, target surface description, target-root-relative
output planning, and dry-run-only planned artifact compatibility. It also
defines the validation harness contract for future pre-materialization
validation and dry-run smoke reporting. It also defines a dedicated
documentary/dev-only
Validation Harness Aggregator contract and a separately authorized
zero-argument, stdout-only checker over the current 9 read-only checks. It
also defines the documentary implementation boundary for the explicitly
authorized dev-only script layer. It does not authorize runtime
materialization, runtime script creation, target-repository writes,
productive-skill changes, GitHub writes, or changes to productive templates.
It also defines the fixture-boundary contract and the documentary/dev-only
fixture matrix inside the dev skill. The fixtures are complete documentary
`FIXTURE.md` cases, but they do not create rendered outputs, full snapshots,
runtime payloads, target artifacts, or target writes.

## Canonical Scope

- `contracts/TARGETS_CONTRACT.md`: canonical target IDs, legacy-term
  normalization rules, expected future output paths, and blocking rules.
- `contracts/TEMPLATES_AND_OUTPUTS_CONTRACT.md`: explicit template inventory,
  expected output shapes, current missing-template status, and
  `BLOCKED_TEMPLATE_MISSING` rules for the canonical targets.
- `contracts/SOURCE_MODEL_CONTRACT.md`: documentary/dev-only source model
  contract declaring `reference/kernel_lab/` as the primary behavior source,
  `reference/seniorization_lab/` as seniorization overlay,
  `reference/templates/` as target output shape, and `reference/agents/` only
  as a temporary development parity baseline.
- `contracts/RENDERING_AND_COMPOSITION_CONTRACT.md`: documentary/dev-only
  render-context contract for deterministic composition from kernel sources,
  Senior Agent Profiles, target/template contracts, and explicit templates.
- `contracts/DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md`: documentary/dev-only
  dry-run output-plan, drift classification, managed-artifact, path-safety, and
  write-boundary contract for future planned artifacts.
- `contracts/DRY_RUN_REPORT_MODEL_CONTRACT.md`: documentary/dev-only/read-only
  dry-run report model contract for future simulation evidence. It defines
  conceptual sections for report identity, source inventory snapshot, target
  intent, plan entries, gate results, lazy-load trace, blocking summary,
  no-write evidence, and non-authorization summary, while creating no runtime
  payload, persistent report, report generator, materializer, renderer, writer,
  loader, scenario selector, target adapter, target read/write, GitHub write,
  productive-skill mutation, or final dependency on `reference/agents/`.
- `contracts/MATERIALIZER_INTERFACE_CONTRACT.md`:
  documentary/dev-only/read-only contract for a future dry-run-only
  Materializer Interface as a conceptual boundary. It defines conceptual input
  and output models, accepted and blocked inputs, allowed and forbidden
  outputs, lifecycle vocabulary, Dry-run Report Model compatibility,
  render-context and planned-artifact relationships, lazy-load and no-write
  evidence requirements, and non-authorization rules. It creates no runtime
  materializer, executable interface, CLI, runner, target adapter, write
  approval, renderer, writer, loader, scenario selector, persistent report,
  Target real read/write, GitHub write, productive-skill mutation, commit,
  branch, or pull request authorization.
- `contracts/TARGET_ADAPTER_CONTRACT.md`: documentary/dev-only/read-only
  contract for a future dry-run-only conceptual Target Adapter boundary. It
  defines canonical target intent handling, legacy target-term normalization,
  target surface descriptions, target-root-relative planned output roots,
  simulated existing/drift state from fixtures or documentation, path safety,
  managed-artifact compatibility, Materializer Interface compatibility,
  Dry-run Report Model compatibility, no-read/no-write evidence, and
  non-authorization rules. It creates no Target Adapter implementation,
  executable adapter, CLI, runner, filesystem adapter, path resolver, Target
  reader, Target writer, drift detector, materializer, renderer, writer,
  loader, scenario selector, write approval, persistent report, Target real
  read/write, GitHub write, productive-skill mutation, commit, branch, or pull
  request authorization.
- `contracts/VALIDATION_HARNESS_CONTRACT.md`: documentary/dev-only validation
  harness and dry-run smoke contract for future pre-materialization checks,
  structured reporting, no-write enforcement, matrix completeness, and
  productive-skill immutability.
- `contracts/VALIDATION_HARNESS_AGGREGATOR_CONTRACT.md`: documentary/dev-only
  contract for the Validation Harness Aggregator checker. It records the
  official 9-check checklist, order, dependencies, status model, fail-closed
  rules, zero-argument policy, stdout-only policy, no persistent report policy,
  no-target-path policy, no runtime/materializer policy, child process policy
  with `process.execPath`, `child_process.spawn`, `shell: false`,
  `timeout_per_child_check: 30 seconds`, the 13 mandatory aggregator block
  codes, and expected verdicts
  `MATERIALIZATION_VALIDATION_HARNESS_AGGREGATOR_CHECK: PASS` and
  `MATERIALIZATION_VALIDATION_HARNESS_AGGREGATOR_CHECK: BLOCKED`. It creates
  no generic runner, persistent report, dry-run report, runtime materializer,
  renderer, writer, loader, scenario selector, target read/write, GitHub
  write, or productive skill authorization.
- `contracts/IMPLEMENTATION_BOUNDARY_CONTRACT.md`: documentary/dev-only
  implementation boundary for explicitly listed dev-only/read-only script
  categories. The Validation Harness Aggregator checker is one separately
  authorized category and is permitted only as a zero-argument, stdout-only
  gate over the official read-only checks. This does not authorize a generic
  runner, persistent report, dry-run report model, materializer interface,
  target adapter, write approval, runtime materializer, renderer, writer,
  loader, scenario selector, target real read/write, GitHub write, productive
  skill mutation, or real materialization.
- `contracts/FIXTURE_BOUNDARY_CONTRACT.md`: documentary/dev-only fixture
  boundary for the complete fixture matrix and later controlled fixture cases.
  It
  declares the only fixture root, requires `FIXTURE_SCHEMA.md`, limits fixture
  target-artifact paths to that root, distinguishes fixture snapshots from real
  target artifacts, and preserves the prohibition on real target read/write,
  GitHub writes, productive-skill changes, real materialization, runtime
  materializer behavior, and overwrites of manual files outside fixtures.
- `fixtures/README.md`: documentary/dev-only fixture root README.
- `fixtures/FIXTURE_SCHEMA.md`: documentary schema for future fixture metadata.
- `fixtures/projects/README.md`: future positive project scenario category.
- `fixtures/expected_outputs/README.md`: future fixture-only snapshot category.
- `fixtures/lazy_load/README.md`: future lazy-load trace fixture category.
- `fixtures/blocked_cases/README.md`: future negative fixture case category.
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

Source model, rendering, and composition are also contract-only in this phase.
`reference/kernel_lab/` is the primary behavior source. `reference/agents/` is
only a temporary development parity baseline and is removable after final dev
validation. A future renderer must derive a render context per `agent+target`
pair from explicit kernel, senior profile, template, target contract, template
contract, and rendering contract sources, but this phase does not produce
generated outputs or materialize in a target project.

Dry-run/write-boundary planning is also contract-only in this phase. A future
materialization flow must produce a dry-run output plan before any write, and
each planned artifact must record target, agent, output shape, planned path,
template source, `kernel_source`, senior-profile source, operation,
managed-artifact state, existing-file state, drift status, blocking status, and
block code. Deprecated field `base_agent_source` must not appear in final
dry-run planned artifacts. During this documentary/dev-only phase, all
operations are only planned: `CREATE_PLANNED`, `UPDATE_PLANNED`,
`UNCHANGED_PLANNED`, and `BLOCKED_PLANNED` write nothing.

Dry-run report model planning is also contract-only in this phase.
`DRY_RUN_REPORT_MODEL_CONTRACT.md` defines a conceptual `dry_run_report` shape
for future simulation evidence. It requires report boundary, source inventory
snapshot, target intent, agent and output plan entries, gate results,
lazy-load trace, blocking summary, no-write evidence, and
non-authorization summary. The model is not a runtime payload, executable
schema, checker, CLI contract, persistent report, report generator, target
adapter, renderer, writer, loader, scenario selector, materializer interface,
or authorization for Target real read/write. It preserves
`reference/agents/` only as a temporary development parity baseline and never
as final source.

Materializer interface planning is also contract-only in this phase.
`MATERIALIZER_INTERFACE_CONTRACT.md` defines a future dry-run-only interface as
a conceptual boundary from validated materialization intent to dry-run-only
planning, conceptual planned output entries, and conceptual Dry-run Report
Model compatibility. It is not an executable interface, TypeScript interface,
JavaScript module, runtime payload, JSON schema, CLI contract, runner, target
adapter, write approval protocol, renderer, writer, loader, scenario selector,
persistent report, or authorization for Target real read/write.

Target adapter planning is also contract-only in this phase.
`TARGET_ADAPTER_CONTRACT.md` defines a future dry-run-only conceptual adapter
boundary from canonical target intent to target surface description,
target-root-relative output planning, and planned-artifact compatibility. It is
not an executable adapter, filesystem adapter, path resolver, Target reader,
Target writer, drift detector, runtime payload, CLI contract, runner,
materializer, renderer, writer, loader, scenario selector, write approval,
persistent report, or authorization for Target real read/write.

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

Composition sources are explicit: `reference/kernel_lab/<agent>_kernel/`,
`reference/seniorization_lab/<agent>_profile/SENIOR_AGENT_PROFILE.md`,
`reference/templates/<target>/...`,
`reference/materialization_lab/contracts/TARGETS_CONTRACT.md`,
`reference/materialization_lab/contracts/TEMPLATES_AND_OUTPUTS_CONTRACT.md`,
and `reference/materialization_lab/contracts/RENDERING_AND_COMPOSITION_CONTRACT.md`.
Missing sources block with `BLOCKED_SOURCE_MISSING`; missing kernel sources
block with `BLOCKED_KERNEL_SOURCE_MISSING`; incomplete kernel coverage blocks
with `BLOCKED_KERNEL_COVERAGE_INCOMPLETE`; final dependency on
`reference/agents/` blocks with `BLOCKED_BASE_AGENT_FINAL_DEPENDENCY`; missing
placeholders block with `BLOCKED_PLACEHOLDER_MISSING`; unsafe YAML/TOML
rendering blocks with `BLOCKED_UNSAFE_RENDER`; conflicts between kernel source
bundles and Senior Agent Profiles block with `BLOCKED_COMPOSITION_CONFLICT`.

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
source inventory, source model, kernel coverage, target normalization, template
coverage, placeholders, render safety, dry-run output plans, write boundaries,
absence of target writes, and absence of productive-skill changes. The minimum
future matrix is 12 agents x `copilot`, 12 agents x `codex`, `codex` config,
and `codex` root instructions.
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

Validation Harness Aggregator checking is a dev-only/read-only gate in this
phase. `VALIDATION_HARNESS_AGGREGATOR_CONTRACT.md` defines the checker over
the current 9 read-only checks:

- `scripts/materialization_lab/check-static.mjs`
- `scripts/materialization_lab/check-source-inventory.mjs`
- `scripts/materialization_lab/check-template-coverage.mjs`
- `scripts/materialization_lab/check-fixture-boundary.mjs`
- `scripts/materialization_lab/check-lazy-load-fixtures.mjs`
- `scripts/materialization_lab/check-project-scenarios.mjs`
- `scripts/materialization_lab/check-render-context.mjs`
- `scripts/materialization_lab/check-dry-run-plan.mjs`
- `scripts/materialization_lab/check-fixture-render-dry-run-integration.mjs`

The aggregator checker is registered as
`scripts/materialization_lab/check-validation-harness-aggregator.mjs`. Its
expected verdicts are `MATERIALIZATION_VALIDATION_HARNESS_AGGREGATOR_CHECK: PASS`
and `MATERIALIZATION_VALIDATION_HARNESS_AGGREGATOR_CHECK: BLOCKED`. It accepts
zero arguments only, blocks before child
execution on any argument, never accepts a target path, passes no child arguments,
run child checks in the official dependency order, and be stdout-only. It uses
`process.execPath`, `child_process.spawn`, `shell: false`, captures stdout,
stderr, exit code, signal, and spawn error, and applies
`timeout_per_child_check: 30 seconds`. It must not create persistent
reports, Markdown reports, JSON files, caches, snapshots, temp outputs,
artifacts, dry-run reports, target reports, runtime
materializer, renderer, writer, loader, scenario selector, target real
read/write, GitHub write, or productive skill changes. The warning that
`check-static.mjs` does not reject extra arguments by itself is mitigated by
the aggregator contract because the aggregator must enforce zero arguments and
must not pass arguments to child checks.

Implementation-boundary planning is also contract-only in this phase. A later
step may authorize only dev-only scripts for static contract validation, source
inventory validation, template coverage validation, render-context planning,
dry-run output planning, validation report generation, fixture validation, and
the validation harness aggregator checker. Future scripts may live only in
`skills/stnl_project_agent_specializer_dev/scripts/materialization_lab/`, or
another dev-only path explicitly registered by
`IMPLEMENTATION_BOUNDARY_CONTRACT.md`. This phase creates only the explicitly
authorized aggregator checker and does not create a generic runner, target
adapter, materializer interface, write approval, persistent report, runtime
execution, fixtures, target writes, generated outputs, productive-skill
changes, GitHub writes, or real materialization.

Implementation-boundary failures block with
`BLOCKED_IMPLEMENTATION_SCOPE_INVALID`,
`BLOCKED_SCRIPT_PATH_UNAUTHORIZED`, `BLOCKED_SCRIPT_WRITE_CAPABILITY`,
`BLOCKED_SCRIPT_TARGET_MUTATION`, `BLOCKED_SCRIPT_PRODUCTIVE_MUTATION`, or
`BLOCKED_SCRIPT_OUTPUT_UNAUTHORIZED`.

Fixture-boundary planning now includes complete documentary/dev-only fixtures.
The only fixture root is
`skills/stnl_project_agent_specializer_dev/reference/materialization_lab/fixtures/`.
The root contains `README.md`, `FIXTURE_SCHEMA.md`, category READMEs, the
expected-output `SNAPSHOT_POLICY.md`, and the authorized `FIXTURE.md` matrix
for positive projects, lazy-load traces, blocked cases, and minimal expected
output snapshots. These are fixture documents only, not runtime payloads.

Fixtures must simulate controlled target project roots and must never use a
real target project root. Fixture scripts/checkers must accept only paths
inside the authorized fixture root. `.github/**`, `.codex/**`, and `AGENTS.md`
may appear only as documentary path strings inside fixture-local examples or
snapshot fixtures; those paths remain prohibited outside that root.

Fixture expected outputs are snapshots under the fixture root, not generated
artifacts and not real target artifacts. They do not authorize target
read/write. Lazy-load fixture traces are documentary validation inputs, not a
runtime loader. Load-all by completeness is a violation, and missing required
lazy-load trace blocks future validation.

Fixture-boundary failures block with `BLOCKED_FIXTURE_SCOPE_INVALID`,
`BLOCKED_FIXTURE_PATH_UNAUTHORIZED`, `BLOCKED_FIXTURE_TARGET_REAL`,
`BLOCKED_FIXTURE_WRITE_OUTSIDE_ROOT`,
`BLOCKED_FIXTURE_OUTPUT_UNAUTHORIZED`, or
`BLOCKED_FIXTURE_ESCAPES_DEV_SKILL`. Fixture root, schema, traversal, and
absolute-path failures block with `BLOCKED_FIXTURE_ROOT_MISSING`,
`BLOCKED_FIXTURE_SCHEMA_MISSING`, `BLOCKED_FIXTURE_PATH_TRAVERSAL`, or
`BLOCKED_FIXTURE_ABSOLUTE_PATH`.

The authorized fixtures test `kernel_source + senior_profile_source +
template_source`, not a base-agent-driven source model.

The read-only fixture to render/dry-run integration is registered as
`scripts/materialization_lab/check-fixture-render-dry-run-integration.mjs`.
It uses normalized fixture projections to connect project fixtures,
expected-output fixtures, blocked cases, explicit template sources, abstract
render-context compatibility, dry-run simulated paths, and forbidden real
target paths. The lazy-load gate remains independent. The expected checker
verdict is
`MATERIALIZATION_FIXTURE_RENDER_DRY_RUN_INTEGRATION_CHECK: PASS`.

The fixture case phase adds these read-only checkers:

- `scripts/materialization_lab/check-fixture-boundary.mjs`
- `scripts/materialization_lab/check-lazy-load-fixtures.mjs`
- `scripts/materialization_lab/check-project-scenarios.mjs`
- `scripts/materialization_lab/check-fixture-render-dry-run-integration.mjs`

## Source Model Resync Pass Criterion

`MATERIALIZATION_SOURCE_MODEL_RESYNC: PASS` requires:

- `SOURCE_MODEL_CONTRACT.md` exists and is registered.
- All 12 canonical agents map to real kernel modules under
  `reference/kernel_lab/`.
- Render contexts require `kernel_source`, not deprecated field `base_agent_source`.
- Dry-run planned artifacts require `kernel_source`, not deprecated field `base_agent_source`.
- `reference/agents/` is classified only as a temporary development parity
  baseline.
- No fixture, script, generated artifact, persistent report, GitHub write,
  productive skill change, target real read/write, or real materialization is
  introduced.

## Dry-run Report Model Contract Pass Criterion

`MATERIALIZATION_DRY_RUN_REPORT_MODEL_CONTRACT: PASS` requires:

- `contracts/DRY_RUN_REPORT_MODEL_CONTRACT.md` exists and is documentary,
  dev-only, and read-only;
- the conceptual `dry_run_report` shape includes identity, boundary, source
  inventory snapshot, target intent, agent plan entries, output plan entries,
  gate results, lazy-load trace, blocking summary, no-write evidence, and
  non-authorization summary;
- no persistent report, runtime payload, materializer, renderer, writer,
  loader, scenario selector, target adapter, checker, CLI contract, Target
  real read/write, GitHub write, productive-skill mutation, or real
  materialization is introduced;
- `reference/agents/` remains forbidden as final source;
- planned operations remain only `CREATE_PLANNED`, `UPDATE_PLANNED`,
  `UNCHANGED_PLANNED`, and `BLOCKED_PLANNED`;
- executed operation tokens remain forbidden;
- lazy-load remains a safety contract, not an optimization;
- the Aggregator Checker remains the same stdout-only gate over exactly the 9
  current read-only checks and does not become a report generator.

## Materializer Interface Contract Pass Criterion

`MATERIALIZATION_MATERIALIZER_INTERFACE_CONTRACT: PASS` requires:

- `contracts/MATERIALIZER_INTERFACE_CONTRACT.md` exists and is documentary,
  dev-only, and read-only;
- the contract defines only a conceptual dry-run-only boundary between
  validated materialization intent, dry-run-only planning, planned output
  entries, and the Dry-run Report Model;
- the contract does not implement or authorize a materializer, executable
  interface, CLI, runner, target adapter, write approval, renderer, writer,
  loader, scenario selector, persistent report, Target real read/write,
  GitHub write, productive-skill mutation, commit, branch, pull request, or
  real materialization;
- final sources remain `reference/kernel_lab/`,
  `reference/seniorization_lab/`, `reference/templates/`, and
  `reference/materialization_lab/contracts/`;
- `reference/agents/` remains forbidden as final source;
- explicit templates, planned-only operations, no-write evidence,
  non-authorization summary, and lazy-load as safety contract remain
  mandatory;
- the Aggregator Checker remains unchanged with exactly the 9 current
  read-only checks and no report-generator behavior;
- no new block code is introduced without a separately justified owning
  contract.

## Target Adapter Contract Pass Criterion

`MATERIALIZATION_TARGET_ADAPTER_CONTRACT: PASS` requires:

- `contracts/TARGET_ADAPTER_CONTRACT.md` exists and is documentary, dev-only,
  and read-only;
- the contract defines only a conceptual dry-run-only boundary between
  canonical target intent, target surface description, target-root-relative
  output planning, and dry-run-only planned artifact compatibility;
- the contract does not implement or authorize a Target Adapter, executable
  adapter, CLI, runner, filesystem adapter, path resolver, Target reader,
  Target writer, drift detector, materializer, renderer, writer, loader,
  scenario selector, write approval, persistent report, Target real
  read/write, GitHub write, productive-skill mutation, commit, branch, pull
  request, or real materialization;
- `TARGETS_CONTRACT.md` remains owner of canonical target IDs and legacy
  target-term normalization;
- target intent remains separated from any real Target;
- target surfaces and planned paths remain target-root-relative and
  documentary;
- simulated target state and drift remain restricted to authorized fixtures or
  documentation;
- planned-only operations, no-read/no-write evidence, non-authorization
  summary, path safety, managed-artifact policy, and fixture boundary remain
  mandatory;
- the Aggregator Checker remains unchanged with exactly the 9 current
  read-only checks and no report-generator behavior;
- no new block code is introduced without a separately justified owning
  contract.

## Fixture Matrix Pass Criterion

`MATERIALIZATION_FIXTURE_CASES_PHASE: PASS` requires:

- the fixture root exists only under
  `reference/materialization_lab/fixtures/`;
- `fixtures/README.md` and `fixtures/FIXTURE_SCHEMA.md` exist;
- `projects/`, `expected_outputs/`, `lazy_load/`, and `blocked_cases/` exist
  with README files;
- the authorized complete documentary `FIXTURE.md` matrix exists: six project
  fixtures, eight lazy-load fixtures, ten blocked-case fixtures, four minimal
  expected-output snapshot fixtures, and `expected_outputs/SNAPSHOT_POLICY.md`;
- no complete rendered snapshots are created;
- fixture paths do not escape the root and do not use absolute or traversal
  paths;
- contracts and validation docs recognize fixture boundary, fixture schema,
  project scenario fixtures, expected-output snapshot fixtures, lazy-load trace
  fixtures, blocked cases, and read-only fixture to render/dry-run
  integration;
- no runtime materializer, renderer, writer, scenario selector, target real
  read/write, GitHub write, productive-skill mutation, kernel change,
  template change, Senior Profile change, or `reference/agents/` final-source
  dependency is introduced.
