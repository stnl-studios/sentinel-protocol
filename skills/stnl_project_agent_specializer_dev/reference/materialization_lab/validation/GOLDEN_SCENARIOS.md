# Golden Scenarios

These scenarios define the minimum behavior expected from a future
materialization target resolver and future render-context composer. They are
documentary/dev-only scenarios and do not authorize writing target artifacts.

## Positive Scenarios

### Normalize Legacy `vscode`

Input:

- requested target: `vscode`
- context: target runtime selection

Expected result:

- canonical target: `copilot`
- no target write is performed during this contract phase

### Preserve `codex`

Input:

- requested target: `codex`
- context: target runtime selection

Expected result:

- canonical target: `codex`
- future expected paths remain `.codex/agents/*.toml`,
  `.codex/config.toml`, and `AGENTS.md`
- no target write is performed during this contract phase

### Target With Explicit Template

Input:

- requested target: `codex`
- requested output shape: `AGENTS.md`
- explicit template: `reference/templates/codex/AGENTS.md`

Expected result:

- template source is accepted as explicit
- output shape is recognized as `codex`: `AGENTS.md`
- no target write is performed during this contract phase

### Resolve `copilot` Agent Template

Input:

- requested target: `copilot`
- requested output shape: `.github/agents/*.agent.md`
- explicit template: `reference/templates/copilot/agent.md`

Expected result:

- template source is accepted as explicit
- output shape is recognized as `copilot`: `.github/agents/*.agent.md`
- required placeholders are present before rendering
- no target write is performed during this contract phase

### Resolve `codex` Agent TOML Template

Input:

- requested target: `codex`
- requested output shape: `.codex/agents/*.toml`
- explicit template: `reference/templates/codex/agent.toml`

Expected result:

- template source is accepted as explicit
- output shape is recognized as `codex`: `.codex/agents/*.toml`
- required TOML fields and placeholders are present before rendering
- no target write is performed during this contract phase

### Compose `planner` Render Context For `copilot`

Input:

- requested agent: `planner`
- requested target: `copilot`
- kernel source: `reference/kernel_lab/planner_kernel/`
- senior profile:
  `reference/seniorization_lab/planner_profile/SENIOR_AGENT_PROFILE.md`
- explicit template: `reference/templates/copilot/agent.md`

Expected result:

- a deterministic render context is produced for `planner+copilot`
- common placeholders and Copilot-specific placeholders are populated from
  explicit sources
- YAML-safe render requirements are checked
- no `.github/**` output is written during this contract phase

### Compose `reviewer` Render Context For `codex`

Input:

- requested agent: `reviewer`
- requested target: `codex`
- kernel source: `reference/kernel_lab/reviewer_kernel/`
- senior profile:
  `reference/seniorization_lab/reviewer_profile/SENIOR_AGENT_PROFILE.md`
- explicit template: `reference/templates/codex/agent.toml`

Expected result:

- a deterministic render context is produced for `reviewer+codex`
- common placeholders and Codex-specific placeholders are populated from
  explicit sources
- TOML-safe render requirements are checked
- `{{AGENT_BODY}}` is represented as a TOML-aware string value in the render
  context plan
- no `.codex/**` output and no `AGENTS.md` output are written during this
  contract phase

### Source Model Resync From Kernel Sources

Input:

- requested source model: materialization lab dev bundle
- kernel coverage: all 12 canonical kernel modules under `reference/kernel_lab/`
- parity baseline: `reference/agents/` exists only as a temporary development
  parity baseline

Expected result:

- every canonical agent maps to a real `kernel_source`
- render context planning uses `kernel_source`
- dry-run planned artifact planning uses `kernel_source`
- `reference/agents/` is not a final source
- no fixture, script, generated artifact, persistent report, target real
  read/write, GitHub write, productive skill change, or real materialization is
  performed
- source model resync may report `MATERIALIZATION_SOURCE_MODEL_RESYNC: PASS`

### Validate Modular Senior Profile Inventory

Input:

- requested source inventory: `reference/seniorization_lab/`
- expected profiles: all 12 canonical `*_profile` directories
- profile shape: short `SENIOR_AGENT_PROFILE.md` manifest plus four behavior
  modules under `profile/`
- validation files: `STATIC_CHECKS.md`, `GOLDEN_SCENARIOS.md`, and
  `EXCELLENT_PASS_EXPECTATIONS.md` under each profile's `validation/`

Expected result:

- `README.md` at `reference/seniorization_lab/README.md` is accepted as a
  canonical top-level documentary item
- each `SENIOR_AGENT_PROFILE.md` is accepted as a short manifest
- the old 13 monolithic sections are not required in the manifest
- all four behavior modules are present for every profile
- every module declares activation metadata, dependencies, and
  `blocks_if_triggered_but_unloaded: true`
- modules 02, 03, and 04 depend only on the same agent's
  identity/boundary module
- `reference/agents/` remains only a temporary development parity baseline and
  is not used as a final materialization source
- no fixture, runtime materializer, target real read/write, `.github/**`,
  `.codex/**`, `AGENTS.md`, GitHub write, productive skill change, or real
  materialization is performed

### Fixture Matrix Exists As Documentary Cases

Input:

- requested validation target: materialization lab fixture matrix
- fixture root: `reference/materialization_lab/fixtures/`

Expected result:

- fixture root exists only under `reference/materialization_lab/fixtures/`
- `README.md` and `FIXTURE_SCHEMA.md` exist
- `projects/README.md`, `expected_outputs/README.md`,
  `lazy_load/README.md`, and `blocked_cases/README.md` exist
- six positive project `FIXTURE.md` files are present
- eight lazy-load `FIXTURE.md` files are present
- ten blocked-case `FIXTURE.md` files are present
- four minimal expected-output snapshot `FIXTURE.md` files and
  `expected_outputs/SNAPSHOT_POLICY.md` are present
- expected-output snapshot fixtures are minimal/documentary and do not contain
  rendered outputs
- no runtime materializer, scenario selector, lazy-load runtime, renderer,
  writer, target artifact, GitHub write, target real read/write, or productive
  skill mutation is performed

### Fixture Render Dry-Run Integration Is Read-Only

Input:

- requested validation target: read-only fixture to render/dry-run integration
- checker:
  `scripts/materialization_lab/check-fixture-render-dry-run-integration.mjs`

Expected result:

- normalized fixture projections are built in memory only
- project fixtures are compared to the abstract render-context matrix and
  selected-agent matrix
- fixture `template_sources` are explicit and resolve under
  `reference/templates/`
- expected-output fixtures stay minimal/documentary and no rendered output or
  full snapshot is created
- `simulated_target_paths` remain relative/documentary strings and
  `forbidden_real_target_paths` are recognized without target read/write
- blocked cases are routed by responsible layer
- lazy-load gate remains independent and no runtime loader is implemented
- expected verdict:
  `MATERIALIZATION_FIXTURE_RENDER_DRY_RUN_INTEGRATION_CHECK: PASS`

### Validation Harness Aggregator Contract Is Documented

Input:

- requested validation target: future Validation Harness Aggregator contract
- contract:
  `reference/materialization_lab/contracts/VALIDATION_HARNESS_AGGREGATOR_CONTRACT.md`

Expected result:

- the contract is documentary/dev-only and creates no executable checker,
  runner, persistent report, dry-run report model, materializer interface,
  target adapter, write approval protocol, runtime materializer, runtime
  renderer, runtime writer, runtime loader, runtime scenario selector, target
  real read/write, GitHub write, productive skill authorization, or final
  source dependency on `reference/agents/`
- the official checklist lists exactly the 9 existing read-only child checks
  in order:
  `check-static.mjs`, `check-source-inventory.mjs`,
  `check-template-coverage.mjs`, `check-fixture-boundary.mjs`,
  `check-lazy-load-fixtures.mjs`, `check-project-scenarios.mjs`,
  `check-render-context.mjs`, `check-dry-run-plan.mjs`, and
  `check-fixture-render-dry-run-integration.mjs`
- the expected future verdict is
  `MATERIALIZATION_VALIDATION_HARNESS_AGGREGATOR_CHECK: PASS`
- the dependency matrix requires each downstream check to depend on its
  prerequisite contract layers, and the integration checker depends on all
  previous checks
- child statuses are `PASS`, `BLOCKED`, `SKIPPED`, `INCONCLUSIVE`,
  `UNKNOWN_CHECK`, `CHECK_FAILED_TO_RUN`, `CHECK_OUTPUT_UNRECOGNIZED`,
  `CHECK_EXIT_CODE_MISMATCH`, and `CHECK_TIMED_OUT`
- final statuses are `PASS` and `BLOCKED`, where `PASS` maps to
  `VALIDATION_PASS` and anything else maps to `VALIDATION_BLOCKED`
- fail-closed rules block missing, skipped, unknown, inconclusive, failed,
  timed-out, stderr, unexpected stdout, exit-code mismatch, child crash,
  `ENOENT`, permission denied, unknown block code, dependency-order failure,
  and stdout extra except trailing newline
- zero-argument policy blocks any CLI argument before child execution, never
  accepts target paths, forbids first-version flags such as `--json`, `--help`,
  and `--list-checks`, and mitigates the `check-static.mjs` extra-argument
  warning by not passing arguments to child checks
- stdout-only policy forbids persistent reports, Markdown reports, JSON files,
  caches, snapshots, temp outputs, artifacts, dry-run reports, and target
  reports
- future child process policy requires fixed allowlist, serial execution,
  `process.execPath`, `spawn` or `execFile` without shell, no child args, no
  target path, fixed cwd, no custom CLI env, stdout/stderr/exit-code capture,
  timeout per check, no persistence, no smoke global, no Git commands, and no
  target real read/write
- aggregator block codes such as `BLOCKED_AGGREGATOR_UNKNOWN_CHECK`,
  `BLOCKED_AGGREGATOR_CHECK_SKIPPED`,
  `BLOCKED_AGGREGATOR_CHECK_FAILED`,
  `BLOCKED_AGGREGATOR_CHECK_OUTPUT_UNRECOGNIZED`,
  `BLOCKED_AGGREGATOR_EXIT_CODE_MISMATCH`,
  `BLOCKED_AGGREGATOR_TARGET_ARG`,
  `BLOCKED_AGGREGATOR_REPORT_UNAUTHORIZED`,
  `BLOCKED_AGGREGATOR_RUNTIME_SCOPE`,
  `BLOCKED_AGGREGATOR_DEPENDENCY_ORDER`, and
  `BLOCKED_AGGREGATOR_TIMEOUT` are documented

### Fixture Schema Is Documentary Only

Input:

- requested validation target: `fixtures/FIXTURE_SCHEMA.md`

Expected result:

- schema defines future fixture metadata fields for source model, selected
  agents, template sources, lazy-load expectation, expected outputs, blocked
  expectation, target safety, and validation
- schema requires dev-only and no-real-write flags
- schema requires explicit `kernel_source`, `senior_profile_source`, and
  `template_source`
- schema treats `reference/agents/` as a forbidden final source
- schema does not authorize runtime validation, target writes, GitHub writes,
  generated outputs, or runtime materializer

### Future Fixture Categories Are Planned Only

Input:

- requested fixture categories: project scenarios, expected outputs,
  lazy-load traces, and blocked cases

Expected result:

- project scenarios document future Backend-only, Frontend-only, iOS-only,
  Fullstack BE + FE, Fullstack BE + iOS, and Fullstack BE + FE + iOS coverage
- expected outputs are fixture-only snapshots and not real target outputs
- lazy-load traces are documentary traces and not a runtime loader
- blocked cases document missing template, inferred template, forbidden target
  path, `reference/agents/` as final source, load-all by completeness, missing
  required lazy-load module, missing lazy-load trace, real `.github` write,
  real `.codex` write, real `AGENTS.md` write, runtime materializer created,
  productive skill mutation, and GitHub write
- no complete fixture payload is created in this phase

### Compose `orchestrator` Copilot Agents Block

Input:

- requested agent: `orchestrator`
- requested target: `copilot`
- explicit template: `reference/templates/copilot/agent.md`

Expected result:

- render context requires `{{COPILOT_ORCHESTRATOR_AGENTS_BLOCK}}`
- the block renders valid YAML or blocks before writing
- non-orchestrator agents may render the same placeholder as a valid empty
  string for its target location
- no target write is performed during this contract phase

### Plan `planner` Copilot Artifact Without Writing

Input:

- requested agent: `planner`
- requested target: `copilot`
- explicit template: `reference/templates/copilot/agent.md`
- planned path: `.github/agents/planner.agent.md`

Expected result:

- dry-run output plan contains one planned artifact entry
- `target_id` is `copilot`
- `agent_id` is `planner`
- `planned_path` is `.github/agents/planner.agent.md`
- operation is `CREATE_PLANNED`, `UPDATE_PLANNED`, or
  `UNCHANGED_PLANNED` according to drift state
- no `.github/**` output is written during this contract phase

### Plan `reviewer` Codex Agent Without Writing

Input:

- requested agent: `reviewer`
- requested target: `codex`
- explicit template: `reference/templates/codex/agent.toml`
- planned path: `.codex/agents/reviewer.toml`

Expected result:

- dry-run output plan contains one planned artifact entry
- `target_id` is `codex`
- `agent_id` is `reviewer`
- `planned_path` is `.codex/agents/reviewer.toml`
- operation is `CREATE_PLANNED`, `UPDATE_PLANNED`, or
  `UNCHANGED_PLANNED` according to drift state
- no `.codex/**` output and no `AGENTS.md` output are written during this
  contract phase

### Plan Codex Config Without Writing

Input:

- requested target: `codex`
- requested output shape: `.codex/config.toml`
- explicit template: `reference/templates/codex/config.toml`

Expected result:

- dry-run output plan contains a planned artifact entry for
  `.codex/config.toml`
- operation is planned only
- no `.codex/config.toml` output is written during this contract phase

### Plan Codex Root Instructions Without Writing

Input:

- requested target: `codex`
- requested output shape: `AGENTS.md`
- explicit template: `reference/templates/codex/AGENTS.md`

Expected result:

- dry-run output plan contains a planned artifact entry for `AGENTS.md`
- operation is planned only
- no `AGENTS.md` output is written during this contract phase

### Validate Full `copilot` Agent Matrix Without Writing

Input:

- requested validation target: `copilot`
- requested agents: all 12 canonical agents
- validation layers: source inventory, target normalization, template coverage,
  placeholder validation, render safety, dry-run output plan, write-boundary,
  no-target-write, and productive-skill untouched

Expected result:

- validation covers 12 agents x `copilot`
- every planned `copilot` artifact remains a dry-run plan entry only
- `write_attempts` is empty
- no `.github/**` output is written during this contract phase
- report status may be `VALIDATION_PASS` only if all validation layers pass

### Validate Full `codex` Agent Matrix Without Writing

Input:

- requested validation target: `codex`
- requested agents: all 12 canonical agents
- validation layers: source inventory, target normalization, template coverage,
  placeholder validation, render safety, dry-run output plan, write-boundary,
  no-target-write, and productive-skill untouched

Expected result:

- validation covers 12 agents x `codex`
- every planned `codex` agent artifact remains a dry-run plan entry only
- `write_attempts` is empty
- no `.codex/**` output and no `AGENTS.md` output are written during this
  contract phase
- report status may be `VALIDATION_PASS` only if all validation layers pass

### Validate Codex Target-Level Artifacts Without Writing

Input:

- requested target: `codex`
- requested target-level artifacts: `.codex/config.toml` and `AGENTS.md`
- explicit templates:
  `reference/templates/codex/config.toml` and
  `reference/templates/codex/AGENTS.md`

Expected result:

- validation includes planned `codex` config and `AGENTS.md` artifacts
- planned artifacts include `.codex/config.toml`
- planned artifacts include `AGENTS.md`
- `write_attempts` is empty
- no `.codex/config.toml` output and no `AGENTS.md` output are written during
  this contract phase

### Future Static Contract Validator In Authorized Path

Input:

- future implementation category: static contract validator
- future script path:
  `skills/stnl_project_agent_specializer_dev/scripts/materialization_lab/`
- authorization status: later step explicitly authorizes script creation

Expected result:

- category is eligible for a later dev-only implementation step
- path is eligible for a later dev-only implementation step
- no script is created during this contract phase
- no runtime execution, target write, fixture, generated output, productive
  skill change, GitHub write, or real materialization is performed

### Future Dry-Run Planner Read-Only Against Target

Input:

- future implementation category: dry-run output planner
- target project access: read-only
- authorization status: later step explicitly authorizes dry-run against a
  target

Expected result:

- category is eligible for a later dev-only implementation step
- target access remains read-only
- any target write remains blocked
- no script is created during this contract phase
- no generated output, fixture, productive skill change, GitHub write, or real
  materialization is performed

### Future Fixture Root Inside Authorized Path

Input:

- future fixture root:
  `skills/stnl_project_agent_specializer_dev/reference/materialization_lab/fixtures/example-target/`
- authorization status: later step explicitly authorizes fixture creation

Expected result:

- fixture root is eligible for a later dev-only fixture step
- fixture represents a simulated target project root
- no fixture is created during this contract phase
- no target real read/write, GitHub write, productive skill change, runtime
  materializer, or real materialization is performed

### Future Fixture Target Artifacts Inside Authorized Root

Input:

- future fixture root:
  `skills/stnl_project_agent_specializer_dev/reference/materialization_lab/fixtures/example-target/`
- future fixture files: `.github/**`, `.codex/**`, and `AGENTS.md`
- authorization status: later step explicitly authorizes fixture creation

Expected result:

- `.github/**`, `.codex/**`, and `AGENTS.md` are eligible only because they
  are inside the authorized fixture root
- those paths remain prohibited outside the authorized fixture root
- no fixture is created during this contract phase
- no target real read/write, GitHub write, productive skill change, runtime
  materializer, or real materialization is performed

## Negative Scenarios

### Missing Explicit Template

Input:

- requested target: `copilot`
- requested agent: any senior agent
- no explicit template exists for the requested target-agent pair

Expected result:

- block before writing
- return `BLOCKED_TEMPLATE_MISSING`

### Inferred Template Blocks

Input:

- requested output shape has no explicit `template_source`
- fixture or render plan tries to infer a template from output path or runtime
  naming

Expected result:

- block before rendering, dry-run planning, snapshot comparison, or writing
- return `BLOCKED_TEMPLATE_INFERRED`

### Missing Kernel Source

Input:

- requested target: `copilot`
- requested agent: a canonical agent ID
- matching `reference/kernel_lab/<agent>_kernel/` is absent or lacks its real
  minimum documentation/contract bundle

Expected result:

- block before composing render context
- return `BLOCKED_KERNEL_SOURCE_MISSING`

### Deprecated `base_agent_source` Negative Scenario

Input:

- requested target: `copilot`
- requested agent: a canonical agent ID
- deprecated field `base_agent_source` is required as final source

Expected result:

- block before composing render context
- return `BLOCKED_SOURCE_MODEL_DEPRECATED_FIELD`

### Missing Senior Profile Source

Input:

- requested target: `codex`
- requested agent: a canonical agent ID
- matching
  `reference/seniorization_lab/<agent>_profile/SENIOR_AGENT_PROFILE.md` is
  absent

Expected result:

- block before composing render context
- return `BLOCKED_SOURCE_MISSING`

### Weak Modular Profile Manifest

Input:

- requested source inventory: a canonical Senior Agent Profile
- `SENIOR_AGENT_PROFILE.md` exists but does not identify the modular profile,
  status/purpose, dev-only/non-runtime boundary, four behavior modules,
  lazy-load or activation model, semantic preservation, or write boundary

Expected result:

- block source inventory validation
- return or report `BLOCKED_WEAK_PROFILE_MANIFEST`
- do not infer the missing semantics from old monolithic section names

### Recombined Monolithic Profile

Input:

- requested source inventory: a canonical Senior Agent Profile
- `SENIOR_AGENT_PROFILE.md` attempts to restore the old 13-section profile
  body instead of remaining a short manifest over behavior modules

Expected result:

- block source inventory validation
- return or report `BLOCKED_PROFILE_PARTS_RECOMBINED_AS_MONOLITH`
- preserve the approved modular profile shape

### Missing Behavior Module Metadata

Input:

- requested source inventory: a canonical Senior Agent Profile module
- a behavior module is missing `load_when:`, `do_not_load_when:`,
  `depends_on:`, or `blocks_if_triggered_but_unloaded: true`

Expected result:

- block source inventory validation
- return or report the matching block code:
  `BLOCKED_BEHAVIOR_MODULE_WITHOUT_LOAD_WHEN`,
  `BLOCKED_BEHAVIOR_MODULE_WITHOUT_DO_NOT_LOAD_WHEN`,
  `BLOCKED_PROFILE_PART_DEPENDENCY_MISSING`, or
  `BLOCKED_REQUIRED_MODULE_NOT_LOADED`

### Invalid Behavior Module Dependency

Input:

- requested source inventory: a canonical Senior Agent Profile module
- module 02, 03, or 04 has empty `depends_on:`, depends on another module
  instead of module 01, or depends on a different agent's module

Expected result:

- block source inventory validation
- return or report `BLOCKED_PROFILE_PART_DEPENDENCY_MISSING`

### Load-All By Default Attempt

Input:

- future runtime/materializer attempts to load every behavior module for
  completeness when only a subset was activated by real demand

Expected result:

- block before runtime prompt assembly or materialization
- return `BLOCKED_AGENT_LOADED_ALL_MODULES_BY_DEFAULT`
- explain that lazy load is a safety contract, not an optimization

### Unknown Target Without Explicit Template

Input:

- requested target: any non-canonical target
- requested output shape: any output shape
- no explicit template exists in the dev skill for that target/output pair

Expected result:

- block before writing
- return `BLOCKED_TEMPLATE_MISSING`

### Required Placeholder Missing

Input:

- requested target: `copilot` or `codex`
- requested output shape has an explicit dev-skill template
- the explicit template is missing a required placeholder such as
  `{{AGENT_BODY}}`, `{{AGENT_ID}}`, or `{{TARGET_ID}}`

Expected result:

- block before writing
- return `BLOCKED_PLACEHOLDER_MISSING`
- explain that the explicit template is structurally incomplete

### TOML Unsafe Body

Input:

- requested target: `codex`
- requested agent: `reviewer`
- composed `{{AGENT_BODY}}` cannot be represented as a safe TOML string value

Expected result:

- block before writing
- return `BLOCKED_UNSAFE_RENDER`
- explain that Codex output must be TOML-safe

### Kernel Source And Senior Profile Conflict

Input:

- requested target: `copilot` or `codex`
- requested agent: any canonical agent ID
- kernel source and Senior Agent Profile conflict on role class, mission,
  handoff, status semantics, or other protocol-significant behavior

Expected result:

- block before writing
- return `BLOCKED_COMPOSITION_CONFLICT`
- explain that seniorization cannot erase or contradict the kernel
  contract

### Base Agent Final Dependency

Input:

- requested target: `copilot` or `codex`
- requested agent: any canonical agent ID
- `reference/agents/` is used as a final render, dry-run, or materialization
  dependency instead of only as a temporary development parity baseline

Expected result:

- block before rendering or dry-run planning
- return `BLOCKED_BASE_AGENT_FINAL_DEPENDENCY`

### Productive Template Reuse Attempt

Input:

- requested target: `copilot` or `codex`
- requested output shape has no explicit dev-skill template
- implementation attempts to reuse a productive
  `skills/stnl_project_agent_specializer/` template automatically

Expected result:

- block before writing
- return `BLOCKED_TEMPLATE_MISSING`
- explain that productive templates may be read only as conceptual reference
  in this phase, never as an automatic source of writing

### Infer Template By Path

Input:

- requested output path: `.github/agents/planner.agent.md` or
  `.codex/agents/planner.toml`
- no explicit template is declared for the corresponding output shape

Expected result:

- block before writing
- return `BLOCKED_TEMPLATE_MISSING`
- explain that output paths do not imply template availability

### Productive Skill Mutation

Input:

- request asks to change `skills/stnl_project_agent_specializer/`

Expected result:

- block the change
- explain that this contract phase is dev-only and does not authorize
  productive-skill edits

### Blind Global Legacy Replacement

Input:

- request asks for a global replacement of `VS Code`, `VS Code/GitHub`, or
  `vscode`

Expected result:

- block the change
- normalize only runtime target-selection terms through the canonical target
  resolver
- preserve historical references in audits, profiles, and old contracts unless
  separately authorized and justified

### Invalid Target Root

Input:

- requested target: `codex`
- target project root is missing, not a directory, inaccessible, or otherwise
  invalid for safe path resolution

Expected result:

- dry-run output plan blocks before writing
- operation is `BLOCKED_PLANNED`
- return `BLOCKED_TARGET_ROOT_INVALID`

### Path Traversal Destination

Input:

- requested target: `copilot`
- requested agent: `planner`
- planned path resolves to `../.github/agents/planner.agent.md` or another
  destination outside the target project root

Expected result:

- dry-run output plan blocks before writing
- operation is `BLOCKED_PLANNED`
- return `BLOCKED_PATH_UNSAFE`

### Existing Manual File Collision

Input:

- requested target: `codex`
- requested agent: `reviewer`
- planned path `.codex/agents/reviewer.toml` already exists without a valid
  Sentinel managed notice

Expected result:

- dry-run output plan blocks before writing
- operation is `BLOCKED_PLANNED`
- return `BLOCKED_UNMANAGED_COLLISION`

### Invalid Managed Notice

Input:

- requested target: `codex`
- requested output shape: `AGENTS.md`
- existing `AGENTS.md` contains a malformed, contradictory, ambiguous, or
  unverifiable managed notice

Expected result:

- dry-run output plan blocks before writing
- operation is `BLOCKED_PLANNED`
- return `BLOCKED_INVALID_MANAGED_NOTICE`

### Write Without Approved Dry Run

Input:

- implementation attempts to create, update, delete, repair, clean, or mutate
  any target artifact before an approved dry-run output plan exists

Expected result:

- block before writing
- return `BLOCKED_DRY_RUN_REQUIRED`

### Write Attempt During Validation

Input:

- future validation harness attempts to create, update, delete, repair, clean,
  or mutate any file while running validation

Expected result:

- validation blocks
- report status is `VALIDATION_BLOCKED`
- return `BLOCKED_VALIDATION_WRITE_ATTEMPT`

### Productive Skill Mutation During Validation

Input:

- future validation harness detects a change under
  `skills/stnl_project_agent_specializer/`

Expected result:

- validation blocks
- report status is `VALIDATION_BLOCKED`
- return `BLOCKED_PRODUCTIVE_SKILL_MUTATION`

### Target File Mutation Outside Authorized Fixture

Input:

- future validation detects mutation of `.github/**`, `.codex/**`, or
  `AGENTS.md`
- no later explicitly authorized fixture scope covers the mutation

Expected result:

- validation blocks
- report status is `VALIDATION_BLOCKED`
- return `BLOCKED_TARGET_FILE_MUTATION`

### Incomplete Validation Matrix

Input:

- validation covers only 11 agents for `copilot`
- or validation omits any `codex` agent
- or validation omits `codex` config
- or validation omits `codex` root instructions

Expected result:

- validation blocks
- report status is `VALIDATION_BLOCKED`
- return `BLOCKED_MATRIX_INCOMPLETE`

### Unknown Block Code In Validation Report

Input:

- future validation report, planned artifact, blocked artifact, or validation
  layer output contains a block code not declared by the materialization lab
  contracts

Expected result:

- validation blocks
- report status is `VALIDATION_BLOCKED`
- return `BLOCKED_UNKNOWN_BLOCK_CODE`

### Script Outside Authorized Materialization Lab Path

Input:

- future script path:
  `skills/stnl_project_agent_specializer_dev/scripts/other/check-static.mjs`
- no other dev-only path is explicitly registered by
  `IMPLEMENTATION_BOUNDARY_CONTRACT.md`

Expected result:

- block before script creation
- return `BLOCKED_SCRIPT_PATH_UNAUTHORIZED`

### Script With Target Write Capability

Input:

- future script category: dry-run output planner
- script can create, update, delete, repair, clean, or mutate a target project
  file

Expected result:

- block before script creation or execution
- return `BLOCKED_SCRIPT_TARGET_MUTATION`

### Script Alters Productive Skill

Input:

- future script category: source inventory validator
- script can alter `skills/stnl_project_agent_specializer/` or productive
  templates

Expected result:

- block before script creation or execution
- return `BLOCKED_SCRIPT_PRODUCTIVE_MUTATION`

### Unauthorized Script Output

Input:

- future script category: validation report generator
- script writes an output path not explicitly authorized by
  `IMPLEMENTATION_BOUNDARY_CONTRACT.md`

Expected result:

- block before output creation
- return `BLOCKED_SCRIPT_OUTPUT_UNAUTHORIZED`

### Script Creation During This Documentary Phase

Input:

- request attempts to create a materialization-lab script in this task
- no later implementation step has explicitly authorized script creation

Expected result:

- block script creation under the documentary implementation boundary
- return `BLOCKED_IMPLEMENTATION_SCOPE_INVALID`

### Fixture Outside Authorized Path

Input:

- requested fixture root:
  `skills/stnl_project_agent_specializer_dev/reference/materialization_lab/tmp-fixtures/example-target/`
- authorization status: later fixture step is not scoped to this path

Expected result:

- block before fixture creation or fixture validation
- return `BLOCKED_FIXTURE_PATH_UNAUTHORIZED`

### Real Target Used As Fixture

Input:

- requested fixture root: a real target project root
- fixture mode attempts to treat the real project as fixture data

Expected result:

- block before target read/write
- return `BLOCKED_FIXTURE_TARGET_REAL`

### Fixture Write Outside Fixture Root

Input:

- requested fixture root:
  `skills/stnl_project_agent_specializer_dev/reference/materialization_lab/fixtures/example-target/`
- future fixture setup attempts to write `../outside-fixture/AGENTS.md`

Expected result:

- block before writing
- return `BLOCKED_FIXTURE_WRITE_OUTSIDE_ROOT`

### Unauthorized Fixture Output

Input:

- future fixture checker attempts to create a persistent report or generated
  output not explicitly authorized by the later fixture step

Expected result:

- block before output creation
- return `BLOCKED_FIXTURE_OUTPUT_UNAUTHORIZED`

### Fixture Escapes Dev Skill

Input:

- requested fixture path resolves outside
  `skills/stnl_project_agent_specializer_dev/`

Expected result:

- block before fixture creation, fixture validation, or output planning
- return `BLOCKED_FIXTURE_ESCAPES_DEV_SKILL`

## Materialization Fixture Cases Phase

Expected positive project fixtures:

- `projects/backend_only_happy/FIXTURE.md`
- `projects/frontend_only_happy/FIXTURE.md`
- `projects/ios_only_happy/FIXTURE.md`
- `projects/fullstack_be_fe_happy/FIXTURE.md`
- `projects/fullstack_be_ios_happy/FIXTURE.md`
- `projects/fullstack_be_fe_ios_happy/FIXTURE.md`

Expected lazy-load fixtures:

- `lazy_load/non_trivial_loads_01/FIXTURE.md`
- `lazy_load/decision_loads_02/FIXTURE.md`
- `lazy_load/risk_loads_03/FIXTURE.md`
- `lazy_load/output_loads_04/FIXTURE.md`
- `lazy_load/load_all_default_blocks/FIXTURE.md`
- `lazy_load/module_03_missing_risk_blocks/FIXTURE.md`
- `lazy_load/module_04_missing_output_blocks/FIXTURE.md`
- `lazy_load/trace_missing_blocks/FIXTURE.md`

Expected blocked-case fixtures:

- `blocked_cases/missing_template/FIXTURE.md`
- `blocked_cases/inferred_template/FIXTURE.md`
- `blocked_cases/forbidden_target_path/FIXTURE.md`
- `blocked_cases/reference_agents_final_source/FIXTURE.md`
- `blocked_cases/write_github_real/FIXTURE.md`
- `blocked_cases/write_codex_real/FIXTURE.md`
- `blocked_cases/write_agents_md_real/FIXTURE.md`
- `blocked_cases/runtime_materializer_created/FIXTURE.md`
- `blocked_cases/productive_skill_mutation/FIXTURE.md`
- `blocked_cases/github_write/FIXTURE.md`

Expected output snapshot fixtures:

- `expected_outputs/SNAPSHOT_POLICY.md`
- `expected_outputs/minimal_copilot_agent_snapshot/FIXTURE.md`
- `expected_outputs/minimal_codex_agent_snapshot/FIXTURE.md`
- `expected_outputs/minimal_codex_config_snapshot/FIXTURE.md`
- `expected_outputs/minimal_agents_md_snapshot/FIXTURE.md`

The expected checker verdicts are:

- `MATERIALIZATION_FIXTURE_BOUNDARY_CHECK: PASS`
- `MATERIALIZATION_LAZY_LOAD_FIXTURE_CHECK: PASS`
- `MATERIALIZATION_PROJECT_SCENARIO_FIXTURE_CHECK: PASS`
- `MATERIALIZATION_FIXTURE_RENDER_DRY_RUN_INTEGRATION_CHECK: PASS`
