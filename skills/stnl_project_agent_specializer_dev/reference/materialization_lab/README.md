# Materialization Lab

This directory is a documentary/dev-only area for the future senior-agent
materialization rewrite of `stnl_project_agent_specializer_dev`.

It defines the canonical target contract and validation expectations for the
next materialization phase. It also defines the explicit template and output
shape contract for the canonical targets, plus the source model contract for
combining kernel source bundles, Senior Agent Profiles, and explicit templates.
It also defines the render-context composition contract, the dry-run
output-plan and write-boundary contract for future artifact planning, and the
validation harness contract for future pre-materialization validation and
dry-run smoke reporting. It also defines the documentary implementation
boundary for a later, separately authorized dev-only script layer. It does not
authorize runtime
materialization, runtime script creation, target-repository writes,
productive-skill changes, GitHub writes, or changes to productive templates.
It also defines the fixture-boundary contract and the documentary/dev-only
fixture skeleton inside the dev skill, without creating complete fixture cases
or complete snapshots in this phase.

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
- `contracts/VALIDATION_HARNESS_CONTRACT.md`: documentary/dev-only validation
  harness and dry-run smoke contract for future pre-materialization checks,
  structured reporting, no-write enforcement, matrix completeness, and
  productive-skill immutability.
- `contracts/IMPLEMENTATION_BOUNDARY_CONTRACT.md`: documentary/dev-only
  implementation boundary for a later, separately authorized dev-only script
  layer. It lists allowed future script categories, script locations, read
  sources, write prohibitions, output limits, and implementation-boundary block
  codes, but does not create or authorize scripts in this phase.
- `contracts/FIXTURE_BOUNDARY_CONTRACT.md`: documentary/dev-only fixture
  boundary for the fixture skeleton and later controlled fixture cases. It
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

Implementation-boundary planning is also contract-only in this phase. A later
step may authorize only dev-only scripts for static contract validation, source
inventory validation, template coverage validation, render-context planning,
dry-run output planning, and validation report generation. Future scripts may
live only in
`skills/stnl_project_agent_specializer_dev/scripts/materialization_lab/`, or
another dev-only path explicitly registered by
`IMPLEMENTATION_BOUNDARY_CONTRACT.md`. This phase does not create scripts,
runtime execution, fixtures, target writes, generated outputs, productive-skill
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

The fixture case phase adds these read-only checkers:

- `scripts/materialization_lab/check-fixture-boundary.mjs`
- `scripts/materialization_lab/check-lazy-load-fixtures.mjs`
- `scripts/materialization_lab/check-project-scenarios.mjs`

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

## Fixture Skeleton Pass Criterion

`MATERIALIZATION_FIXTURE_CONTRACT_AND_SKELETON_PHASE: PASS` requires:

- the fixture root exists only under
  `reference/materialization_lab/fixtures/`;
- `fixtures/README.md` and `fixtures/FIXTURE_SCHEMA.md` exist;
- `projects/`, `expected_outputs/`, `lazy_load/`, and `blocked_cases/` exist
  with README files;
- the skeleton contains no complete positive or negative fixture cases;
- no complete rendered snapshots are created;
- fixture paths do not escape the root and do not use absolute or traversal
  paths;
- contracts and validation docs recognize fixture boundary, fixture schema,
  future project scenario fixtures, future expected-output snapshots, future
  lazy-load trace fixtures, and future blocked cases;
- no runtime materializer, renderer, writer, scenario selector, target real
  read/write, GitHub write, productive-skill mutation, kernel change,
  template change, Senior Profile change, or `reference/agents/` final-source
  dependency is introduced.
