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

The verdict `MATERIALIZATION_SOURCE_MODEL_RESYNC: PASS` may be declared only
when all 12 canonical agents map to real kernel modules, `reference/kernel_lab/`
is the primary behavior source, `reference/agents/` is only a temporary
development parity baseline, render contexts and dry-run planned artifacts use
`kernel_source`, deprecated field `base_agent_source` is absent from final
shapes, and no complete fixture, script, generated artifact, persistent report,
target real read/write, GitHub write, productive skill change, or real
materialization is introduced.

The verdict
`MATERIALIZATION_DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT: EXCELLENT PASS` may be
declared only when the dry-run output-plan, drift, managed-artifact,
path-safety, and write-boundary criteria below are also satisfied.

The verdict
`MATERIALIZATION_VALIDATION_HARNESS_CONTRACT: EXCELLENT PASS` may be declared
only when the validation harness, dry-run smoke, matrix completeness, no-write,
and mutation-boundary criteria below are also satisfied.

The verdict
`MATERIALIZATION_IMPLEMENTATION_BOUNDARY_CONTRACT: EXCELLENT PASS` may be
declared only when the documentary implementation boundary, future dev-only
script scope, authorized script path, read boundary, write prohibition, output
authorization, and block-code criteria below are also satisfied.

The verdict
`MATERIALIZATION_FIXTURE_BOUNDARY_CONTRACT: EXCELLENT PASS` may be declared
only when the fixture boundary, fixture skeleton, fixture schema,
target-artifact containment, real-target prohibition, future fixture
script/checker path restriction, non-authorization limits, and block-code
criteria below are also satisfied.

The verdict `MATERIALIZATION_FIXTURE_CONTRACT_AND_SKELETON_PHASE: PASS` may
be declared only when the fixture root, README, schema, category READMEs,
contract updates, validation documentation, and manifest registrations are
present, while no complete fixture cases, complete snapshots, runtime
materializer, target real read/write, GitHub write, productive-skill mutation,
kernel change, template change, or Senior Profile change is introduced.

The validator output
`MATERIALIZATION_STATIC_CONTRACT_CHECK: PASS` may be accepted only when
`scripts/materialization_lab/check-static.mjs` exists in the authorized
materialization-lab script path and the checker validates the static contract
bundle without reading or writing any target project.

The validator output
`MATERIALIZATION_SOURCE_INVENTORY_CHECK: PASS` may be accepted only when
`scripts/materialization_lab/check-source-inventory.mjs` exists in the
authorized materialization-lab script path and the checker validates the
source inventory bundle without accepting a target project path, reading a
target project, writing a target project, creating complete fixtures, creating
generated outputs, writing GitHub, changing the productive skill, or
performing real materialization.

The validator output
`MATERIALIZATION_TEMPLATE_COVERAGE_CHECK: PASS` may be accepted only when
`scripts/materialization_lab/check-template-coverage.mjs` exists in the
authorized materialization-lab script path and the checker validates template
coverage without accepting a target project path, reading a target project,
writing a target project, creating complete fixtures, creating generated
outputs, writing GitHub, changing the productive skill, or performing real
materialization.

The validator output
`MATERIALIZATION_RENDER_CONTEXT_CHECK: PASS` may be accepted only when
`scripts/materialization_lab/check-render-context.mjs` exists in the
authorized materialization-lab script path and the render-context
planner/checker validates the abstract render-context matrix without accepting
a target project path, reading a target project, writing a target project,
creating complete fixtures, creating generated outputs, creating persistent
reports, writing GitHub, changing the productive skill, or performing real
materialization.

The validator output
`MATERIALIZATION_DRY_RUN_PLAN_CHECK: PASS` may be accepted only when
`scripts/materialization_lab/check-dry-run-plan.mjs` exists in the authorized
materialization-lab script path and the dry-run output plan checker validates
the abstract planned-artifact matrix without accepting a target project path,
reading a target project, writing a target project, calculating drift against
real target files, creating complete fixtures, creating generated outputs,
creating persistent reports, writing GitHub, changing the productive skill, or
performing real materialization.

## Required Criteria

- The twelve materialization lab files exist in
  `reference/materialization_lab/`.
- `SOURCE_MODEL_CONTRACT.md` exists and is classified as
  documentary/dev-only.
- `SOURCE_MODEL_CONTRACT.md` declares `reference/kernel_lab/` as primary
  behavior source, `reference/seniorization_lab/` as seniorization overlay,
  `reference/templates/` as target output shape, and `reference/agents/` only
  as a temporary development parity baseline.
- `SOURCE_MODEL_CONTRACT.md` declares deprecated field `base_agent_source` as
  deprecated materialization source and declares `base_agent_parity_source` only
  as dev-only parity validation metadata.
- `SOURCE_MODEL_CONTRACT.md` declares all 12 canonical `kernel_source`
  mappings and the six source-model block codes:
  `BLOCKED_SOURCE_MODEL_INVALID`, `BLOCKED_BASE_AGENT_FINAL_DEPENDENCY`,
  `BLOCKED_KERNEL_SOURCE_MISSING`, `BLOCKED_KERNEL_COVERAGE_INCOMPLETE`,
  `BLOCKED_PARITY_BASELINE_REQUIRED_AS_FINAL_SOURCE`, and
  `BLOCKED_SOURCE_MODEL_DEPRECATED_FIELD`.
- `TARGETS_CONTRACT.md` declares `copilot` and `codex` as the only canonical
  target IDs for the new version.
- `TEMPLATES_AND_OUTPUTS_CONTRACT.md` exists and is classified as
  documentary/dev-only.
- `RENDERING_AND_COMPOSITION_CONTRACT.md` exists and is classified as
  documentary/dev-only.
- `DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md` exists and is classified as
  documentary/dev-only.
- `VALIDATION_HARNESS_CONTRACT.md` exists and is classified as
  documentary/dev-only.
- `VALIDATION_HARNESS_CONTRACT.md` states that it does not create runtime
  scripts.
- `VALIDATION_HARNESS_CONTRACT.md` requires validation before any real
  materialization.
- `IMPLEMENTATION_BOUNDARY_CONTRACT.md` exists and is classified as
  documentary/dev-only.
- `IMPLEMENTATION_BOUNDARY_CONTRACT.md` states that it does not create scripts.
- `IMPLEMENTATION_BOUNDARY_CONTRACT.md` prepares only a later separately
  authorized dev-only implementation step.
- `IMPLEMENTATION_BOUNDARY_CONTRACT.md` allows only these future script
  categories: static contract validator, source inventory validator, template
  coverage validator, render-context planner, dry-run output planner, and
  validation report generator.
- `IMPLEMENTATION_BOUNDARY_CONTRACT.md` authorizes future scripts only inside
  `skills/stnl_project_agent_specializer_dev/scripts/materialization_lab/`, or
  another dev-only path explicitly registered in that contract.
- `IMPLEMENTATION_BOUNDARY_CONTRACT.md` limits future script reads to
  `skills/stnl_project_agent_specializer_dev/reference/**`,
  `skills/stnl_project_agent_specializer_dev/README.md`,
  `skills/stnl_project_agent_specializer_dev/SKILL.md`,
  `skills/stnl_project_agent_specializer_dev/openai.yaml`, and read-only
  target-project access only when a later step authorizes dry-run against a
  target.
- `IMPLEMENTATION_BOUNDARY_CONTRACT.md` forbids future scripts from writing a
  target project, `.github/**`, `.codex/**`, `AGENTS.md`,
  `skills/stnl_project_agent_specializer/`, GitHub, productive templates, or
  historical audits.
- `IMPLEMENTATION_BOUNDARY_CONTRACT.md` states that future outputs initially
  permitted may be only dev-only reports in a path explicitly authorized by
  that contract, and that this task does not authorize those outputs.
- `IMPLEMENTATION_BOUNDARY_CONTRACT.md` states that any future script with
  write capability outside an explicitly authorized dev-only report output
  must block.
- `IMPLEMENTATION_BOUNDARY_CONTRACT.md` declares
  `BLOCKED_IMPLEMENTATION_SCOPE_INVALID`,
  `BLOCKED_SCRIPT_PATH_UNAUTHORIZED`, `BLOCKED_SCRIPT_WRITE_CAPABILITY`,
  `BLOCKED_SCRIPT_TARGET_MUTATION`, `BLOCKED_SCRIPT_PRODUCTIVE_MUTATION`, and
  `BLOCKED_SCRIPT_OUTPUT_UNAUTHORIZED`.
- `IMPLEMENTATION_BOUNDARY_CONTRACT.md` states that runtime materializer,
  complete fixture creation, and target write remain out of scope.
- `IMPLEMENTATION_BOUNDARY_CONTRACT.md` denies script creation, runtime
  execution, complete fixtures, target writes, generated outputs, productive
  skill changes, GitHub writes, and real materialization.
- `FIXTURE_BOUNDARY_CONTRACT.md` exists and is classified as
  documentary/dev-only.
- `FIXTURE_BOUNDARY_CONTRACT.md` states that this phase creates only the
  fixture root, category READMEs, and documentary schema.
- `FIXTURE_BOUNDARY_CONTRACT.md` states that complete positive fixtures,
  complete negative fixtures, rendered snapshots, runtime fixtures, fixture
  scripts, scenario selector, lazy-load runtime, renderer, writer, target
  artifacts, and runtime materializer are not created in this phase.
- `FIXTURE_BOUNDARY_CONTRACT.md` declares
  `skills/stnl_project_agent_specializer_dev/reference/materialization_lab/fixtures/`
  as the only fixture root.
- `FIXTURE_BOUNDARY_CONTRACT.md` requires `FIXTURE_SCHEMA.md`.
- `FIXTURE_BOUNDARY_CONTRACT.md` distinguishes fixture snapshots from real
  target artifacts.
- `FIXTURE_BOUNDARY_CONTRACT.md` requires future fixtures to simulate
  controlled target project roots and never use a real target project root.
- `FIXTURE_BOUNDARY_CONTRACT.md` allows `.github/**`, `.codex/**`, and
  `AGENTS.md` only inside an authorized fixture root and keeps those paths
  prohibited outside that root.
- `FIXTURE_BOUNDARY_CONTRACT.md` requires future fixture scripts/checkers to
  accept only fixture paths inside the authorized fixture root.
- `FIXTURE_BOUNDARY_CONTRACT.md` limits future fixture tests to controlled
  checks such as path safety, managed notice detection, unmanaged collision,
  invalid managed notice, drift classification, dry-run report shape, and
  no-write enforcement.
- `FIXTURE_BOUNDARY_CONTRACT.md` does not authorize target real read/write,
  GitHub writes, productive skill changes, real materialization, runtime
  materializer, or overwrite of manual files outside a fixture.
- `FIXTURE_BOUNDARY_CONTRACT.md` declares
  `BLOCKED_FIXTURE_ROOT_MISSING`,
  `BLOCKED_FIXTURE_SCHEMA_MISSING`,
  `BLOCKED_FIXTURE_SCOPE_INVALID`,
  `BLOCKED_FIXTURE_PATH_UNAUTHORIZED`, `BLOCKED_FIXTURE_TARGET_REAL`,
  `BLOCKED_FIXTURE_PATH_TRAVERSAL`, `BLOCKED_FIXTURE_ABSOLUTE_PATH`,
  `BLOCKED_FIXTURE_WRITE_OUTSIDE_ROOT`,
  `BLOCKED_FIXTURE_OUTPUT_UNAUTHORIZED`, and
  `BLOCKED_FIXTURE_ESCAPES_DEV_SKILL`.
- `fixtures/README.md` exists and states that fixtures are documentary/dev-only,
  live only inside `reference/materialization_lab/fixtures/`, never authorize
  target real read/write, GitHub write, runtime materializer, or target writes,
  and may contain `.github/**`, `.codex/**`, and `AGENTS.md` only as
  fixture-local examples or snapshots.
- `fixtures/FIXTURE_SCHEMA.md` exists and defines future fixture metadata for
  `fixture_id`, `fixture_type`, `status`, `scenario`, `purpose`, `dev_only`,
  `no_real_write`, `source_model`, `selected_agents`, `target_surface`,
  `template_sources`, `lazy_load_expectation`, `expected_outputs`,
  `blocked_expectation`, `target_safety`, and `validation`.
- `fixtures/projects/README.md` exists and documents future Backend-only,
  Frontend-only, iOS-only, Fullstack BE + FE, Fullstack BE + iOS, and
  Fullstack BE + FE + iOS positive fixtures.
- `fixtures/expected_outputs/README.md` exists and states that snapshots are
  fixture-only, not real outputs, derive from explicit templates, and are not
  created in this phase.
- `fixtures/lazy_load/README.md` exists and states that lazy-load validation is
  simulated by trace fixture, not runtime loader, load-all by default blocks,
  activated module not loaded blocks, depends_on must be respected, and
  missing trace blocks.
- `fixtures/blocked_cases/README.md` exists and documents future negative
  categories for missing template, inferred template, forbidden target path,
  `reference/agents/` as final source, load-all by completeness, missing
  required lazy-load module, missing lazy-load trace, real `.github` write,
  real `.codex` write, real `AGENTS.md` write, runtime materializer created,
  productive skill mutation, and GitHub write.
- The fixture skeleton contains no complete positive project fixture, no
  complete blocked case, no complete lazy-load trace payload, and no complete
  expected-output snapshot.
- `scripts/materialization_lab/check-static.mjs` exists as the first
  separately authorized dev-only static contract validator implementation.
- `scripts/materialization_lab/check-static.mjs` is read-only, uses Node.js ESM,
  has no external package dependency, and ignores `__MACOSX` and `.DS_Store`.
- `scripts/materialization_lab/check-static.mjs` validates required contracts,
  validation files, explicit templates, 12 kernel sources, 12 Senior Agent
  Profiles, target/path anchors, placeholders, planned operations, validation
  statuses, and declared block codes.
- `scripts/materialization_lab/check-static.mjs` does not authorize target
  reads, target writes, fixtures, generated outputs, GitHub writes, productive
  skill changes, productive-template changes, historical-audit changes,
  runtime materializer behavior, or real materialization.
- `scripts/materialization_lab/check-static.mjs` prints
  `MATERIALIZATION_STATIC_CONTRACT_CHECK: PASS` when the static contract bundle
  passes, or `MATERIALIZATION_STATIC_CONTRACT_CHECK: FAIL` with a clear failure
  list when it does not.
- `scripts/materialization_lab/check-source-inventory.mjs` exists as the
  separately authorized dev-only source inventory validator implementation.
- `scripts/materialization_lab/check-source-inventory.mjs` is read-only, uses
  Node.js ESM, has no external package dependency, ignores `__MACOSX` and
  `.DS_Store`, rejects target project path arguments, and reads only inside
  `skills/stnl_project_agent_specializer_dev/`.
- `scripts/materialization_lab/check-source-inventory.mjs` validates exactly
  the 12 canonical kernel modules in `reference/kernel_lab/`, exactly the 12
  modular Senior Agent Profiles in `reference/seniorization_lab/`, the
  explicit kebab-case agent ID to underscore kernel/profile directory mapping,
  current `reference/agents/` parity baseline classification when present, and
  absence of non-ignored extra profile directories outside known
  canonical/global seniorization items. `README.md` at
  `reference/seniorization_lab/README.md` is an accepted top-level
  documentary item.
- `scripts/materialization_lab/check-source-inventory.mjs` validates base-agent
  identity, mission, required output, status/role signal, and handoff or
  boundary anchors.
- `scripts/materialization_lab/check-source-inventory.mjs` validates each
  Senior Agent Profile as a modular bundle, not as the old 13-section
  monolithic profile. `SENIOR_AGENT_PROFILE.md` is a short manifest and the
  checker must not require legacy sections such as `## 1. Profile Status` or
  `## 3. Canonical Role Boundary` inside that manifest.
- `scripts/materialization_lab/check-source-inventory.mjs` validates each
  short manifest for identity, status/purpose, documentary/dev-only or
  non-runtime boundary, the four behavior module paths, lazy-load or activation
  model, semantic preservation in modules, modular profile linkage,
  materialization/runtime non-authorization, and target-output/write-boundary
  anchors.
- `scripts/materialization_lab/check-source-inventory.mjs` validates each
  profile contains `README.md`, `SENIOR_AGENT_PROFILE.md`,
  `profile/01_IDENTITY_AND_BOUNDARY.md`,
  `profile/02_DECISION_AND_READING.md`,
  `profile/03_RISK_AND_GATES.md`,
  `profile/04_HANDOFF_EVIDENCE_AND_OUTPUT.md`,
  `validation/STATIC_CHECKS.md`, `validation/GOLDEN_SCENARIOS.md`, and
  `validation/EXCELLENT_PASS_EXPECTATIONS.md`.
- `scripts/materialization_lab/check-source-inventory.mjs` validates every
  behavior module declares `module_id:`, `module_type:`, `agent_id:`,
  `purpose:`, `load_when:`, `do_not_load_when:`, `depends_on:`, and
  `blocks_if_triggered_but_unloaded: true`.
- `scripts/materialization_lab/check-source-inventory.mjs` validates module
  dependencies fail-closed: module 01 has no behavior-module dependency, and
  modules 02, 03, and 04 depend only on the same agent's
  identity/boundary module. Empty dependencies for modules 02, 03, or 04 and
  cross-agent dependencies block.
- The source inventory expectations recognize the modular profile block codes
  `BLOCKED_REQUIRED_MODULE_NOT_LOADED`,
  `BLOCKED_TRIGGERED_GATE_NOT_LOADED`,
  `BLOCKED_LAZY_LOAD_TRACE_MISSING`,
  `BLOCKED_PROFILE_PART_DEPENDENCY_MISSING`,
  `BLOCKED_BEHAVIOR_MODULE_WITHOUT_LOAD_WHEN`,
  `BLOCKED_BEHAVIOR_MODULE_WITHOUT_DO_NOT_LOAD_WHEN`,
  `BLOCKED_AGENT_LOADED_ALL_MODULES_BY_DEFAULT`,
  `BLOCKED_AGENT_DECIDED_WITHOUT_DECISION_MODULE`,
  `BLOCKED_OUTPUT_WITHOUT_HANDOFF_EVIDENCE_MODULE`,
  `BLOCKED_RISK_DECISION_WITHOUT_GATES_MODULE`,
  `BLOCKED_PROFILE_PARTS_RECOMBINED_AS_MONOLITH`,
  `BLOCKED_WEAK_PROFILE_MANIFEST`, and `BLOCKED_KERNEL_ANCHOR_LOSS`.
- Lazy load is accepted only as a safety contract: an activated module is
  mandatory, a non-activated module must not be loaded for completeness,
  load-all by default is a violation, and a later runtime/materializer must
  trace material decisions. This phase validates only the documentary
  inventory contract and implements no runtime loader or materializer.
- `scripts/materialization_lab/check-source-inventory.mjs` validates the four
  explicit templates, `reference/MANIFEST.md`,
  `scripts/materialization_lab/check-static.mjs`, and its own manifest
  registration.
- `scripts/materialization_lab/check-source-inventory.mjs` does not authorize
  target reads, target writes, fixtures, generated outputs, GitHub writes,
  productive skill changes, productive-template changes, historical-audit
  changes, runtime materializer behavior, or real materialization.
- `scripts/materialization_lab/check-source-inventory.mjs` prints
  `MATERIALIZATION_SOURCE_INVENTORY_CHECK: PASS` when the source inventory
  bundle passes, or `MATERIALIZATION_SOURCE_INVENTORY_CHECK: FAIL` with a clear
  failure list when it does not.
- `scripts/materialization_lab/check-template-coverage.mjs` exists as the
  separately authorized dev-only template coverage validator implementation.
- `scripts/materialization_lab/check-template-coverage.mjs` is read-only, uses
  Node.js ESM, has no external package dependency, ignores `__MACOSX` and
  `.DS_Store`, rejects target project path arguments, and reads only inside
  `skills/stnl_project_agent_specializer_dev/`.
- `scripts/materialization_lab/check-template-coverage.mjs` validates the four
  explicit templates, their registered output shapes, absence of missing
  canonical output shapes, required placeholders, required Codex TOML fields,
  Copilot frontmatter/body placement, template non-authorization, absence of
  `vscode` as a canonical target in templates, dry-run path mappings,
  `reference/MANIFEST.md`, and the existing materialization-lab validators.
- `scripts/materialization_lab/check-template-coverage.mjs` does not authorize
  target reads, target writes, fixtures, generated outputs, GitHub writes,
  productive skill changes, productive-template changes, historical-audit
  changes, runtime materializer behavior, or real materialization.
- `scripts/materialization_lab/check-template-coverage.mjs` prints
  `MATERIALIZATION_TEMPLATE_COVERAGE_CHECK: PASS` when the template coverage
  bundle passes, or `MATERIALIZATION_TEMPLATE_COVERAGE_CHECK: FAIL` with a
  clear failure list when it does not.
- `scripts/materialization_lab/check-render-context.mjs` exists as the
  separately authorized dev-only render-context planner/checker implementation.
- `scripts/materialization_lab/check-render-context.mjs` is read-only, uses
  Node.js ESM, has no external package dependency, ignores `__MACOSX` and
  `.DS_Store`, rejects target project path arguments, and reads only inside
  `skills/stnl_project_agent_specializer_dev/`.
- `scripts/materialization_lab/check-render-context.mjs` validates exactly the
  12 canonical agent IDs, exactly the canonical targets `copilot` and `codex`,
  the explicit kebab-case agent ID to underscore profile directory mapping,
  and the existence of the three earlier materialization-lab validators.
- `scripts/materialization_lab/check-render-context.mjs` validates every
  `agent+target` pair has a `kernel_source`, Senior Agent Profile source,
  explicit template source, target contract source, template/output contract
  source, and rendering/composition contract source.
- `scripts/materialization_lab/check-render-context.mjs` validates
  `reference/templates/copilot/agent.md` for `copilot` and
  `reference/templates/codex/agent.toml` for `codex`.
- `scripts/materialization_lab/check-render-context.mjs` validates common
  placeholder values for `{{AGENT_ID}}`, `{{AGENT_NAME}}`,
  `{{AGENT_DESCRIPTION}}`, `{{AGENT_BODY}}`, `{{TARGET_ID}}`,
  `{{GENERATED_NOTICE}}`, and `{{SOURCE_VERSION}}` for every `agent+target`
  pair.
- `scripts/materialization_lab/check-render-context.mjs` validates Copilot
  target-specific placeholder values for `{{AGENT_TOOLS}}`,
  `{{AGENT_MODEL}}`, `{{SPECIALIZATION_REVISION}}`,
  `{{COPILOT_ORCHESTRATOR_AGENTS_BLOCK}}`, and
  `{{READING_SCOPE_CLASS_BLOCK}}`, and validates Codex target-specific
  placeholder values for `{{AGENT_MODEL}}`,
  `{{MODEL_REASONING_EFFORT}}`, and `{{SANDBOX_MODE}}`.
- `scripts/materialization_lab/check-render-context.mjs` validates every
  abstract render context includes `agent_id`, `target_id`,
  `kernel_source`, `senior_profile_source`, `template_source`,
  `target_contract_source`, `template_contract_source`,
  `rendering_contract_source`, `required_placeholder_values`,
  `target_specific_placeholder_values`, `escaping_mode`, `safety_verdict`,
  `source_version_input`, `generated_notice_representation`, and
  `composition_conflict_verdict`.
- `scripts/materialization_lab/check-render-context.mjs` validates
  `orchestrator+copilot` requires
  `{{COPILOT_ORCHESTRATOR_AGENTS_BLOCK}}`, while non-orchestrator `copilot`
  contexts permit `{{COPILOT_ORCHESTRATOR_AGENTS_BLOCK}}` as an empty valid
  string.
- `scripts/materialization_lab/check-render-context.mjs` validates YAML-safe
  mode for `copilot` render contexts and TOML-safe mode for `codex` render
  contexts.
- `scripts/materialization_lab/check-render-context.mjs` recognizes
  `BLOCKED_SOURCE_MISSING`, `BLOCKED_TEMPLATE_MISSING`,
  `BLOCKED_PLACEHOLDER_MISSING`, `BLOCKED_UNSAFE_RENDER`, and
  `BLOCKED_COMPOSITION_CONFLICT`.
- `scripts/materialization_lab/check-render-context.mjs` validates its own
  registration in `reference/MANIFEST.md`,
  `reference/materialization_lab/validation/STATIC_CHECKS.md`, and
  `reference/materialization_lab/validation/EXCELLENT_PASS_EXPECTATIONS.md`.
- `scripts/materialization_lab/check-render-context.mjs` does not authorize
  target reads, target writes, fixtures, generated outputs, persistent reports,
  GitHub writes, productive skill changes, changes to
  `skills/stnl_project_agent_specializer/`, productive-template changes,
  historical-audit changes, runtime materializer behavior, target read/write,
  or real materialization.
- `scripts/materialization_lab/check-render-context.mjs` prints
  `MATERIALIZATION_RENDER_CONTEXT_CHECK: PASS` when the abstract render-context
  matrix passes, or `MATERIALIZATION_RENDER_CONTEXT_CHECK: FAIL` with a clear
  failure list when it does not.
- `scripts/materialization_lab/check-dry-run-plan.mjs` exists as the
  separately authorized dev-only dry-run output plan checker implementation.
- `scripts/materialization_lab/check-dry-run-plan.mjs` is read-only, uses
  Node.js ESM, has no external package dependency, ignores `__MACOSX` and
  `.DS_Store`, rejects target project path arguments, and reads only inside
  `skills/stnl_project_agent_specializer_dev/`.
- `scripts/materialization_lab/check-dry-run-plan.mjs` validates exactly the
  12 canonical agent IDs, exactly the canonical targets `copilot` and `codex`,
  the explicit kebab-case agent ID to underscore profile directory mapping,
  and the existence of the four earlier materialization-lab validators.
- `scripts/materialization_lab/check-dry-run-plan.mjs` validates the abstract
  planned-artifact matrix: 12 `copilot` agent artifacts, 12 `codex` agent
  artifacts, 1 `codex` config artifact, and 1 `codex` root instructions
  artifact.
- `scripts/materialization_lab/check-dry-run-plan.mjs` validates every
  abstract planned artifact includes `target_id`, `agent_id`, `output_shape`,
  `planned_path`, `template_source`, `kernel_source`,
  `senior_profile_source`, `operation`, `managed_artifact`,
  `existing_file_state`, `drift_status`, `blocking_status`, and `block_code`.
- `scripts/materialization_lab/check-dry-run-plan.mjs` validates planned paths
  for `copilot` `.github/agents/<agent>.agent.md`, `codex` agents
  `.codex/agents/<agent>.toml`, `codex` config `.codex/config.toml`, and
  `codex` root instructions `AGENTS.md`.
- `scripts/materialization_lab/check-dry-run-plan.mjs` validates planned paths
  are relative, not absolute, and contain no traversal.
- `scripts/materialization_lab/check-dry-run-plan.mjs` validates planned
  operations are limited to `CREATE_PLANNED`, `UPDATE_PLANNED`,
  `UNCHANGED_PLANNED`, and `BLOCKED_PLANNED`.
- `scripts/materialization_lab/check-dry-run-plan.mjs` validates that, because
  target read is not authorized in this implementation, target-dependent state
  remains abstract/unavailable, drift is not calculated against real target
  files, and no write is authorized.
- `scripts/materialization_lab/check-dry-run-plan.mjs` validates
  `DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md` contains planned operations,
  required planned-artifact fields, path mappings, managed artifact policy,
  drift policy, and block codes.
- `scripts/materialization_lab/check-dry-run-plan.mjs` recognizes
  `BLOCKED_TARGET_ROOT_INVALID`, `BLOCKED_PATH_UNSAFE`,
  `BLOCKED_UNMANAGED_COLLISION`, `BLOCKED_INVALID_MANAGED_NOTICE`,
  `BLOCKED_DRY_RUN_REQUIRED`, `BLOCKED_SOURCE_MISSING`,
  `BLOCKED_TEMPLATE_MISSING`, `BLOCKED_PLACEHOLDER_MISSING`,
  `BLOCKED_UNSAFE_RENDER`, and `BLOCKED_COMPOSITION_CONFLICT`.
- `scripts/materialization_lab/check-dry-run-plan.mjs` validates its own
  registration in `reference/MANIFEST.md`,
  `reference/materialization_lab/validation/STATIC_CHECKS.md`, and
  `reference/materialization_lab/validation/EXCELLENT_PASS_EXPECTATIONS.md`.
- `scripts/materialization_lab/check-dry-run-plan.mjs` does not authorize
  target reads, target writes, fixtures, generated outputs, persistent reports,
  GitHub writes, productive skill changes, changes to
  `skills/stnl_project_agent_specializer/`, productive-template changes,
  historical-audit changes, runtime materializer behavior, target read/write,
  drift calculation against real target files, or real materialization.
- `scripts/materialization_lab/check-dry-run-plan.mjs` prints
  `MATERIALIZATION_DRY_RUN_PLAN_CHECK: PASS` when the abstract dry-run plan
  matrix passes, or `MATERIALIZATION_DRY_RUN_PLAN_CHECK: FAIL` with a clear
  failure list when it does not.
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
- Rendering/composition sources are explicit: kernel source, Senior Agent
  Profile, target template, `TARGETS_CONTRACT.md`,
  `TEMPLATES_AND_OUTPUTS_CONTRACT.md`, and
  `RENDERING_AND_COMPOSITION_CONTRACT.md`.
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
  kernel mission, boundaries, handoff, role class, status, invariants, and
  operating rules while incorporating seniorization without erasing kernel
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
  `planned_path`, `template_source`, `kernel_source`,
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
- The validation harness contract declares all validation layers: source
  inventory validation, target normalization validation, template coverage
  validation, placeholder validation, render safety validation, dry-run output
  plan validation, write-boundary validation, no-target-write validation, and
  productive-skill untouched validation.
- The validation harness contract declares the minimum future matrix: 12 agents
  x `copilot`, 12 agents x `codex`, `codex` config, and `codex` root
  instructions.
- The validation harness contract declares the same 12 canonical agent IDs used
  by the rendering/composition contract.
- The validation harness contract requires a structured report containing
  `validation_id`, `status`, `checked_contracts`, `agent_matrix`,
  `target_matrix`, `planned_artifacts`, `blocked_artifacts`, `write_attempts`,
  `productive_skill_changes`, `target_file_changes`, and `block_codes`.
- The validation harness contract declares the only validation statuses:
  `VALIDATION_PASS`, `VALIDATION_BLOCKED`, and `VALIDATION_FAILED`.
- The validation harness contract blocks any write attempt during validation
  with `BLOCKED_VALIDATION_WRITE_ATTEMPT`.
- The validation harness contract blocks any change to
  `skills/stnl_project_agent_specializer/` with
  `BLOCKED_PRODUCTIVE_SKILL_MUTATION`.
- The validation harness contract blocks any mutation of `.github/**`,
  `.codex/**`, or `AGENTS.md` outside a later explicitly authorized fixture
  with `BLOCKED_TARGET_FILE_MUTATION`.
- The validation harness contract blocks incomplete matrix coverage with
  `BLOCKED_MATRIX_INCOMPLETE`.
- The validation harness contract blocks unknown block codes with
  `BLOCKED_UNKNOWN_BLOCK_CODE`.
- The validation harness contract recognizes fixture boundary, fixture schema,
  lazy-load trace fixture, project scenario matrix fixture, expected output
  snapshot policy, blocked fixture case, no base-agent final source, no
  inferred templates, and no runtime materializer validation.
- The validation harness contract denies runtime scripts, target writes,
  generated outputs, complete fixtures, productive skill changes, GitHub
  writes, and real materialization.
- The implementation-boundary contract allows future static contract validator
  scripts only in a later explicitly authorized step and only in an authorized
  dev-only path.
- The implementation-boundary contract allows future dry-run output planner
  scripts only when target access remains read-only and a later step explicitly
  authorizes dry-run against a target.
- The implementation-boundary contract blocks future script paths outside
  `skills/stnl_project_agent_specializer_dev/scripts/materialization_lab/` or
  another explicitly registered dev-only path with
  `BLOCKED_SCRIPT_PATH_UNAUTHORIZED`.
- The implementation-boundary contract blocks future script target mutation
  with `BLOCKED_SCRIPT_TARGET_MUTATION`.
- The implementation-boundary contract blocks future productive-skill or
  productive-template mutation with `BLOCKED_SCRIPT_PRODUCTIVE_MUTATION`.
- The implementation-boundary contract blocks unauthorized future outputs with
  `BLOCKED_SCRIPT_OUTPUT_UNAUTHORIZED`.
- The implementation-boundary contract blocks attempts to create scripts in
  this documentary phase unless a later implementation step has explicitly
  authorized script creation.
- The fixture-boundary contract blocks invalid fixture scope with
  `BLOCKED_FIXTURE_SCOPE_INVALID`.
- The fixture-boundary contract blocks fixture paths outside
  `skills/stnl_project_agent_specializer_dev/reference/materialization_lab/fixtures/`
  with `BLOCKED_FIXTURE_PATH_UNAUTHORIZED`.
- The fixture-boundary contract blocks real target project roots used as
  fixtures with `BLOCKED_FIXTURE_TARGET_REAL`.
- The fixture-boundary contract blocks writes outside the authorized fixture
  root with `BLOCKED_FIXTURE_WRITE_OUTSIDE_ROOT`.
- The fixture-boundary contract blocks unauthorized fixture outputs with
  `BLOCKED_FIXTURE_OUTPUT_UNAUTHORIZED`.
- The fixture-boundary contract blocks fixture paths, scripts, checkers, or
  outputs that escape `skills/stnl_project_agent_specializer_dev/` with
  `BLOCKED_FIXTURE_ESCAPES_DEV_SKILL`.
- The current separately authorized implementation is limited to read-only
  materialization-lab validators under `scripts/materialization_lab/`:
  `check-static.mjs`, `check-source-inventory.mjs`,
  `check-template-coverage.mjs`, `check-render-context.mjs`, and
  `check-dry-run-plan.mjs`.
- `MATERIALIZATION_STATIC_CONTRACT_CHECK: PASS` is valid only as evidence that
  the static documentary/dev-only contract bundle and checker registration
  passed; it is not evidence of render correctness, dry-run output correctness,
  target safety against a real repo, fixture readiness, generated output
  readiness, or real materialization readiness.
- `MATERIALIZATION_SOURCE_INVENTORY_CHECK: PASS` is valid only as evidence that
  the dev-only source inventory bundle and checker registration passed; it is
  not evidence of render correctness, template rendering correctness, dry-run
  output correctness, target safety against a real repo, fixture readiness,
  generated output readiness, or real materialization readiness.
- `MATERIALIZATION_TEMPLATE_COVERAGE_CHECK: PASS` is valid only as evidence
  that the dev-only template coverage bundle and checker registration passed;
  it is not evidence of render correctness, template rendering correctness,
  dry-run output correctness, target safety against a real repo, fixture
  readiness, generated output readiness, GitHub write readiness, productive
  skill readiness, or real materialization readiness.
- `MATERIALIZATION_RENDER_CONTEXT_CHECK: PASS` is valid only as evidence that
  the dev-only abstract render-context matrix and checker registration passed;
  it is not evidence of materialized render output, dry-run output correctness,
  target safety against a real repo, fixture readiness, generated output
  readiness, report readiness, GitHub write readiness, productive skill
  readiness, or real materialization readiness.
- `MATERIALIZATION_DRY_RUN_PLAN_CHECK: PASS` is valid only as evidence that
  the dev-only abstract dry-run planned-artifact matrix and checker
  registration passed; it is not evidence of target-state correctness, real
  drift correctness, write readiness, fixture readiness, generated output
  readiness, report readiness, GitHub write readiness, productive skill
  readiness, or real materialization readiness.
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
outputs, productive-skill edits, GitHub writes, final dependency on
`reference/agents/`, deprecated field `base_agent_source`, or silent conflict
resolution between kernel sources and Senior Agent Profiles.

Do not declare
`MATERIALIZATION_DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT: EXCELLENT PASS` if any
check depends on target writes, generated outputs, runtime scripts, missing
dry-run plans, unapproved writes, path traversal, absolute paths, symlink-unsafe
destinations, unmanaged overwrites, invalid managed notices, inferred
templates, inferred sources, productive-skill edits, GitHub writes, or mutation
of `.github/**`, `.codex/**`, or `AGENTS.md` in this repo root or any target
project.

Do not declare
`MATERIALIZATION_VALIDATION_HARNESS_CONTRACT: EXCELLENT PASS` if any check
depends on runtime scripts, target writes, generated outputs, fixtures,
productive-skill edits, GitHub writes, real materialization, incomplete
12-agent coverage for `copilot` or `codex`, missing `codex` config/root
instruction validation, ignored write attempts, ignored target-file mutations,
ignored productive-skill mutations, unknown block codes, or undocumented
assumptions.

Do not declare
`MATERIALIZATION_IMPLEMENTATION_BOUNDARY_CONTRACT: EXCELLENT PASS` if any check
depends on script creation in this task, runtime execution, fixtures,
target-project writes, generated outputs, productive-skill edits, productive
template edits, historical-audit edits, GitHub writes, real materialization,
runtime materializer, unauthorized script paths, unauthorized write capability,
non-read-only target access, unauthorized outputs, unknown script categories,
or undocumented assumptions.

Do not declare
`MATERIALIZATION_FIXTURE_BOUNDARY_CONTRACT: EXCELLENT PASS` if any check
depends on complete fixture creation in this task, fixture paths outside
`skills/stnl_project_agent_specializer_dev/reference/materialization_lab/fixtures/`,
real target project roots, target real read/write, `.github/**`, `.codex/**`,
or `AGENTS.md` outside an authorized fixture root, GitHub writes,
productive-skill edits, real materialization, runtime materializer behavior,
overwrite of manual files outside a fixture, unauthorized fixture outputs,
paths escaping `skills/stnl_project_agent_specializer_dev/`, or undocumented
assumptions.

Do not accept `MATERIALIZATION_STATIC_CONTRACT_CHECK: PASS` if the checker
depends on target reads, target writes, fixtures, generated outputs,
productive-skill edits, productive-template edits, historical-audit edits,
GitHub writes, real materialization, runtime materializer behavior, external
packages, undocumented assumptions, or mutation of `.github/**`, `.codex/**`,
or `AGENTS.md`.

Do not accept `MATERIALIZATION_SOURCE_INVENTORY_CHECK: PASS` if the checker
depends on target reads, target writes, fixtures, generated outputs,
productive-skill edits, productive-template edits, historical-audit edits,
GitHub writes, real materialization, runtime materializer behavior, external
packages, undocumented assumptions, target project path arguments, reading
outside `skills/stnl_project_agent_specializer_dev/`, or mutation of
`.github/**`, `.codex/**`, or `AGENTS.md`.

Do not accept `MATERIALIZATION_TEMPLATE_COVERAGE_CHECK: PASS` if the checker
depends on target reads, target writes, fixtures, generated outputs,
productive-skill edits, productive-template edits, historical-audit edits,
GitHub writes, real materialization, runtime materializer behavior, external
packages, undocumented assumptions, target project path arguments, reading
outside `skills/stnl_project_agent_specializer_dev/`, target read/write, or
mutation of `.github/**`, `.codex/**`, or `AGENTS.md`.

Do not accept `MATERIALIZATION_RENDER_CONTEXT_CHECK: PASS` if the checker
depends on target reads, target writes, fixtures, generated outputs,
persistent reports, productive-skill edits, productive-template edits,
historical-audit edits, GitHub writes, real materialization, runtime
materializer behavior, external packages, undocumented assumptions, target
project path arguments, reading outside
`skills/stnl_project_agent_specializer_dev/`, target read/write, mutation of
`.github/**`, `.codex/**`, or `AGENTS.md`, or changes to
`skills/stnl_project_agent_specializer/`.

Do not accept `MATERIALIZATION_DRY_RUN_PLAN_CHECK: PASS` if the checker
depends on target reads, target writes, fixtures, generated outputs,
persistent reports, productive-skill edits, productive-template edits,
historical-audit edits, GitHub writes, real materialization, runtime
materializer behavior, external packages, undocumented assumptions, target
project path arguments, reading outside
`skills/stnl_project_agent_specializer_dev/`, target read/write, drift
calculation against real target files, mutation of `.github/**`, `.codex/**`,
or `AGENTS.md`, or changes to `skills/stnl_project_agent_specializer/`.

Do not accept `MATERIALIZATION_FIXTURE_BOUNDARY_CHECK: PASS` if the checker
accepts target project path arguments, writes reports, writes target files,
creates real `.github/**`, `.codex/**`, or `AGENTS.md` outside fixtures,
writes GitHub, changes the productive skill, creates runtime materializer
files, accepts fixtures outside the authorized matrix, or ignores unknown block
codes.

Do not accept `MATERIALIZATION_LAZY_LOAD_FIXTURE_CHECK: PASS` if the checker
implements a loader, accepts target project paths, skips activated/loaded
module validation, ignores load-all default blocking, ignores missing module
blocking, ignores missing trace blocking, or writes any output.

Do not accept `MATERIALIZATION_PROJECT_SCENARIO_FIXTURE_CHECK: PASS` if the
checker accepts target project paths, changes the selected-agent matrix,
omits `resync` from a future package fixture, omits `designer` where UX is
simulated, allows inferred templates, allows `reference/agents/` as final
source, or writes any output.

The verdict `MATERIALIZATION_FIXTURE_CASES_PHASE: PASS` may be declared only
when all authorized fixtures, snapshot policy, contract updates, validation
docs, manifest entries, and read-only fixture checkers exist and all
materialization-lab checks pass without target real read/write, GitHub write,
productive skill mutation, runtime materializer, renderer, writer, loader, or
scenario selector creation.
