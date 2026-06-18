# Reference Bundle Manifest

Skill: `stnl_project_agent_specializer_dev`

## Canonical reference organization

The canonical documentary/dev-only reference bundle is organized as:

- `reference/agents/`: temporary development parity baseline used as local dev
  snapshots for comparison only. It is not a final materialization source and
  may be removed after final dev validation.
- `reference/kernel_lab/`: the 12 documentary/dev-only kernels and their
  contracts, validations, and read-only harnesses. This is the primary
  behavior source for the new materialization source model.
- `reference/materialization_lab/`: documentary/dev-only contracts for the
  future senior-agent materialization rewrite, including the canonical target
  IDs, source model contract, explicit template and output-shape contract,
  missing-template blocking rules, rendering/composition contract,
  dry-run/write-boundary contract, Dry-run Report Model contract,
  materializer interface contract, validation harness contract, validation
  harness aggregator contract, implementation-boundary contract,
  fixture-boundary contract, and validation expectations. This is not a
  runtime materializer.
- `reference/seniorization_lab/`: the 12 Senior Agent Profiles, the shared
  `contracts/` layer, and integrated seniorization validations. These profiles
  are seniorization overlays over the kernel behavior source.
- `reference/templates/`: reference/template material only; it defines target
  output shape and is not materialization, a generated artifact target, or a
  runtime output path.
- `reference/MANIFEST.md`: this manifest, the canonical index for the dev
  reference bundle.

## Current status

- `orchestrator_kernel` is frozen as `CLEAN_EXCELLENT_PASS`.
- `planner_kernel` is frozen as `CLEAN_EXCELLENT_PASS` for the documentary,
  contractual, and semantic kernel lab after the separately authorized human
  audit.
- All twelve passes are dev kernel-lab results only. They do not authorize runtime,
  materialization, target-repository writes, productive-skill changes, or a
  materializer.
- `reference/seniorization_lab/` now uses the approved modular Senior
  Agent Profile shape: each of the 12 profiles has a short
  `SENIOR_AGENT_PROFILE.md` manifest and exactly four behavior modules under
  `profile/`: identity/boundary, decision/reading, risk/gates, and
  handoff/evidence/output. The old 13-section monolithic profile shape is
  superseded. The new contracts
  `SENIOR_PROFILE_MODULARIZATION_CONTRACT.md`,
  `BEHAVIOR_MODULE_ACTIVATION_CONTRACT.md`, and
  `RUNTIME_LAZY_LOAD_CONTRACT.md` define the documentary modularization and
  future lazy-load safety model. This status grants no runtime, no
  materialization, no target writes, no GitHub writes, no productive-skill
  mutation, and no final source dependency on `reference/agents/`.
- `reference/materialization_lab/` defines the dev-only target contract for
  future senior-agent materialization, the source model contract, and the
  dev-only templates and outputs contract for canonical `copilot` and `codex`
  outputs. It also defines the documentary render-context composition contract
  for deterministic composition from `kernel_source`, Senior Agent Profiles,
  explicit templates, and target/template/rendering contracts, plus the
  documentary dry-run output-plan and write-boundary contract for future
  planned artifacts, plus the documentary Dry-run Report Model contract for
  future simulation evidence without persistence, target read/write, or
  runtime authorization, plus the documentary materializer interface contract
  for a future dry-run-only conceptual boundary from validated intent to
  planned output entries and Dry-run Report Model compatibility, plus the
  documentary validation harness contract for future pre-materialization
  validation and dry-run smoke reporting, plus the documentary validation
  harness aggregator contract and the separately
  authorized zero-argument stdout-only aggregator checker over the current 9
  read-only checks, plus the documentary implementation-boundary contract for
  the separately authorized dev-only script layer, plus the documentary
  fixture-boundary
  contract, complete documentary fixture matrix, and read-only fixture to
  render/dry-run integration for controlled fixture cases. This phase does not
  authorize runtime
  materialization, generic runner creation,
  target-repository writes, productive-skill changes, productive-template
  changes, GitHub writes, inferred templates, inferred senior profiles,
  generated outputs, runtime scripts, complete fixtures, target project
  mutation, overwrite of manual files, validation writes, or a final
  materializer.
- `reference/materialization_lab/contracts/SOURCE_MODEL_CONTRACT.md` defines
  `reference/kernel_lab/` as the primary behavior source,
  `reference/seniorization_lab/` as seniorization overlay,
  `reference/templates/` as target output shape, and `reference/agents/` as a
  temporary development parity baseline only. Future materialization uses
  `kernel_source + senior_profile_source + template_source` plus target,
  template, and rendering contracts.
- `reference/materialization_lab/contracts/TEMPLATES_AND_OUTPUTS_CONTRACT.md`
  inventories the explicit templates currently present under
  `reference/templates/`, records that the canonical `copilot` agent and
  `codex` agent templates are present, and requires
  `BLOCKED_TEMPLATE_MISSING` whenever a target, target-agent pair, or output
  shape lacks an explicit template.
- `reference/materialization_lab/contracts/RENDERING_AND_COMPOSITION_CONTRACT.md`
  defines the documentary/dev-only render-context composition layer for the 12
  canonical agents and canonical targets. It requires explicit kernel sources,
  Senior Agent Profiles, explicit templates, target/template/rendering
  contracts, YAML-safe and TOML-safe rendering, common and target-specific
  placeholders, and fail-closed blocking via `BLOCKED_SOURCE_MISSING`,
  `BLOCKED_TEMPLATE_MISSING`, `BLOCKED_PLACEHOLDER_MISSING`,
  `BLOCKED_UNSAFE_RENDER`, `BLOCKED_COMPOSITION_CONFLICT`, and the source model
  block codes.
- `reference/materialization_lab/contracts/DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md`
  defines the documentary/dev-only dry-run output-plan and write-boundary layer
  for future planned artifacts. It requires planned operations only
  (`CREATE_PLANNED`, `UPDATE_PLANNED`, `UNCHANGED_PLANNED`,
  `BLOCKED_PLANNED`), `kernel_source` for agent artifacts,
  target-root-relative paths for `copilot` and `codex`, managed-artifact
  notice checks, drift classification, and fail-closed blocking via
  `BLOCKED_TARGET_ROOT_INVALID`, `BLOCKED_PATH_UNSAFE`,
  `BLOCKED_UNMANAGED_COLLISION`, `BLOCKED_INVALID_MANAGED_NOTICE`, and
  `BLOCKED_DRY_RUN_REQUIRED`, while preserving the earlier source, template,
  placeholder, render-safety, and composition block codes.
- `reference/materialization_lab/contracts/DRY_RUN_REPORT_MODEL_CONTRACT.md`
  defines the documentary/dev-only/read-only Dry-run Report Model contract for
  future simulation evidence. It declares the conceptual `dry_run_report`
  top-level shape with report identity, report boundary, source inventory
  snapshot, target intent, agent and output plan entries, gate results,
  lazy-load trace, blocking summary, no-write evidence, and
  non-authorization summary. It does not create an executable schema, runtime
  payload, persistent report, report generator, checker, CLI contract,
  materializer interface, target adapter, renderer, writer, loader, scenario
  selector, target real read/write, GitHub write, productive skill mutation, or
  final dependency on `reference/agents/`. It introduces no new block codes and
  preserves the current 9-check Aggregator unchanged.
- `reference/materialization_lab/contracts/MATERIALIZER_INTERFACE_CONTRACT.md`
  defines the documentary/dev-only/read-only Materializer Interface contract
  for a future dry-run-only conceptual boundary. It defines a conceptual input
  model, conceptual output model, lifecycle vocabulary, accepted and blocked
  inputs, allowed and forbidden outputs, source and target-intent rules,
  render-context and planned-artifact relationships, Dry-run Report Model
  compatibility, lazy-load and no-write evidence requirements, persistence
  policy, Aggregator boundary, and non-authorization summary. It creates no
  materializer implementation, executable interface, CLI, runner, target
  adapter, write approval, renderer, writer, loader, scenario selector,
  persistent report, Target real read/write, GitHub write, productive skill
  mutation, commit, branch, pull request, or final dependency on
  `reference/agents/`. It introduces no new block codes and preserves the
  current 9-check Aggregator unchanged.
- `reference/materialization_lab/contracts/VALIDATION_HARNESS_CONTRACT.md`
  defines the documentary/dev-only validation harness and dry-run smoke layer
  for future pre-materialization validation. It requires validation before real
  materialization; covers source inventory, source model, kernel coverage,
  target normalization, template coverage, placeholder, render safety, dry-run
  output plan, write-boundary, no-target-write, and productive-skill untouched
  layers; requires a minimum
  matrix of 12 agents x `copilot`, 12 agents x `codex`, `codex` config, and
  `codex` root instructions; defines structured report fields and statuses
  `VALIDATION_PASS`, `VALIDATION_BLOCKED`, and `VALIDATION_FAILED`; and blocks
  write attempts, productive-skill mutation, target-file mutation, incomplete
  matrix coverage, and unknown block codes.
- `reference/materialization_lab/contracts/VALIDATION_HARNESS_AGGREGATOR_CONTRACT.md`
  defines the documentary/dev-only Validation Harness Aggregator contract and
  its separately authorized executable checker. It lists exactly the 9 current
  read-only child checks in official order, records their expected PASS
  verdicts, defines dependencies, child statuses, final statuses, fail-closed
  rules, zero-argument policy, stdout-only policy, no-persistent-report
  policy, no-target-path policy, no-runtime/materializer policy, child process
  policy with `process.execPath`, `child_process.spawn`, `shell: false`,
  `timeout_per_child_check: 30 seconds`, and the 13 mandatory aggregator block
  codes. It records expected verdicts
  `MATERIALIZATION_VALIDATION_HARNESS_AGGREGATOR_CHECK: PASS` and
  `MATERIALIZATION_VALIDATION_HARNESS_AGGREGATOR_CHECK: BLOCKED`. It does not
  register or create a generic runner, persistent report, dry-run report
  model, materializer interface, target adapter, write approval protocol,
  runtime materializer, renderer, writer, loader, scenario selector, target
  real read/write, GitHub write, or productive skill authorization.
- `reference/materialization_lab/contracts/IMPLEMENTATION_BOUNDARY_CONTRACT.md`
  defines the documentary/dev-only implementation boundary for a later,
  separately authorized script layer. It permits only future static contract
  validator, source inventory validator, template coverage validator,
  render-context planner, dry-run output planner, and validation report
  generator script categories; limits future script paths to
  `skills/stnl_project_agent_specializer_dev/scripts/materialization_lab/` or
  another explicitly registered dev-only path; limits reads to the dev skill
  reference bundle, dev skill root metadata, and later-authorized read-only
  target dry-run access; forbids target, productive-skill, productive-template,
  historical-audit, and GitHub writes; and blocks unauthorized scope, paths,
  write capability, target mutation, productive mutation, and outputs.
- `reference/materialization_lab/contracts/FIXTURE_BOUNDARY_CONTRACT.md`
  defines the documentary/dev-only fixture boundary for the complete
  documentary fixture matrix and controlled fixture cases. It states that the
  authorized complete
  fixtures are documentary `FIXTURE.md` files under the fixture root only; that
  the only fixture root is
  `skills/stnl_project_agent_specializer_dev/reference/materialization_lab/fixtures/`;
  that `FIXTURE_SCHEMA.md` is mandatory; that fixtures must simulate
  controlled target project roots and never use real target project roots;
  that `.github/**`, `.codex/**`, and `AGENTS.md` may appear only as
  documentary path strings in fixture-local examples or snapshot fixtures and
  remain prohibited outside it; that fixture scripts/checkers must accept only
  paths inside the authorized fixture root; and that fixtures do not authorize
  target real read/write, GitHub writes, productive-skill changes, real
  materialization, runtime materializer, or overwrite of manual files outside a
  fixture. It blocks missing root/schema, invalid scope, unauthorized fixture
  paths, absolute/traversal paths, real target roots, writes outside root,
  unauthorized outputs, and paths escaping the dev skill.
- `reference/materialization_lab/fixtures/README.md` defines the
  documentary/dev-only fixture root boundary.
- `reference/materialization_lab/fixtures/FIXTURE_SCHEMA.md` defines the
  documentary schema for future fixture metadata.
- `reference/materialization_lab/fixtures/projects/README.md` records the
  future positive project scenario fixture category.
- `reference/materialization_lab/fixtures/expected_outputs/README.md` records
  the future fixture-only expected output snapshot category.
- `reference/materialization_lab/fixtures/lazy_load/README.md` records the
  future lazy-load trace fixture category.
- `reference/materialization_lab/fixtures/blocked_cases/README.md` records the
  future negative blocked-case fixture category.
- `reference/materialization_lab/fixtures/expected_outputs/SNAPSHOT_POLICY.md`
  records the minimal documentary snapshot policy for expected-output
  fixtures.
- Materialization fixture case files now include six positive project
  fixtures, eight lazy-load trace fixtures, ten blocked-case fixtures, and
  four expected-output snapshot fixtures under
  `reference/materialization_lab/fixtures/`.
- `scripts/materialization_lab/check-static.mjs` is the first separately
  authorized dev-only static contract validator for the materialization lab. It
  is read-only, has no external package dependency, validates only the dev
  reference bundle and registrations, ignores `__MACOSX` and `.DS_Store`, and
  does not authorize target writes, fixtures, generated outputs, GitHub writes,
  productive skill changes, productive-template changes, historical-audit
  changes, runtime materializer behavior, target reads, or real
  materialization.
- `scripts/materialization_lab/check-source-inventory.mjs` is the separately
  authorized dev-only source inventory validator for the materialization lab.
  It is read-only, has no external package dependency, validates only the dev
  skill source inventory and registrations, ignores `__MACOSX` and `.DS_Store`,
  rejects target project path arguments, and does not authorize target reads,
  target writes, fixtures, generated outputs, GitHub writes, productive skill
  changes, productive-template changes, historical-audit changes, runtime
  materializer behavior, or real materialization.
- `scripts/materialization_lab/check-template-coverage.mjs` is the separately
  authorized dev-only template coverage validator for the materialization lab.
  It is read-only, has no external package dependency, validates only the dev
  skill template coverage bundle and registrations, ignores `__MACOSX` and
  `.DS_Store`, rejects target project path arguments, and does not authorize
  target reads, target writes, fixtures, generated outputs, GitHub writes,
  productive skill changes, productive-template changes, historical-audit
  changes, runtime materializer behavior, target read/write, or real
  materialization.
- `scripts/materialization_lab/check-render-context.mjs` is the separately
  authorized dev-only render-context planner/checker for the materialization
  lab. It is read-only, has no external package dependency, validates only the
  dev skill abstract render-context matrix and registrations, ignores
  `__MACOSX` and `.DS_Store`, rejects target project path arguments, and does
  not authorize target reads, target writes, fixtures, generated outputs,
  persistent reports, GitHub writes, productive skill changes, changes to
  `skills/stnl_project_agent_specializer/`, productive-template changes,
  historical-audit changes, runtime materializer behavior, target read/write,
  or real materialization.
- `scripts/materialization_lab/check-dry-run-plan.mjs` is the separately
  authorized dev-only dry-run output plan checker for the materialization lab.
  It is read-only, has no external package dependency, validates only the dev
  skill abstract planned-artifact matrix and registrations, ignores
  `__MACOSX` and `.DS_Store`, rejects target project path arguments, and does
  not authorize target reads, target writes, fixtures, generated outputs,
  persistent reports, GitHub writes, productive skill changes, changes to
  `skills/stnl_project_agent_specializer/`, productive-template changes,
  historical-audit changes, runtime materializer behavior, target read/write,
  or real materialization. It validates abstract planned artifacts only and
  does not calculate drift against real target files.
- `scripts/materialization_lab/check-fixture-boundary.mjs` is the separately
  authorized read-only fixture boundary checker for the materialization lab.
  It validates the authorized fixture matrix, schema metadata, target-safety
  declarations, block codes, and absence of real target artifacts outside
  fixtures.
- `scripts/materialization_lab/check-lazy-load-fixtures.mjs` is the separately
  authorized read-only lazy-load fixture checker. It validates the declared
  positive and negative lazy-load trace fixtures without implementing a loader.
- `scripts/materialization_lab/check-project-scenarios.mjs` is the separately
  authorized read-only project scenario fixture checker. It validates the six
  positive scenario fixtures and selected-agent matrix without implementing a
  scenario selector.
- `scripts/materialization_lab/check-fixture-render-dry-run-integration.mjs`
  is the separately authorized read-only fixture to render/dry-run integration
  checker. It uses normalized fixture projections to validate project fixtures,
  expected-output fixtures, blocked cases by responsible layer, explicit
  template sources, abstract render-context compatibility, dry-run simulated
  paths, and forbidden real target paths. The lazy-load gate remains
  independent. It creates no renderer, materializer, writer, loader, scenario
  selector, rendered output, complete snapshot, target artifact, or persistent
  report. Expected verdict:
  `MATERIALIZATION_FIXTURE_RENDER_DRY_RUN_INTEGRATION_CHECK: PASS`.
- `scripts/materialization_lab/check-validation-harness-aggregator.mjs` is the
  separately authorized dev-only/read-only Validation Harness Aggregator gate.
  It runs exactly the 9 current child checks in official order using
  `process.execPath`, `child_process.spawn`, `shell: false`, a fixed
  `skills/stnl_project_agent_specializer_dev/` cwd, no child arguments, and
  `timeout_per_child_check: 30 seconds`. It accepts zero arguments only,
  blocks target/flag arguments before executing any child check, emits only
  `MATERIALIZATION_VALIDATION_HARNESS_AGGREGATOR_CHECK: PASS` or
  `MATERIALIZATION_VALIDATION_HARNESS_AGGREGATOR_CHECK: BLOCKED`, persists no
  report, reads/writes no real target, creates no runtime/materializer/
  renderer/writer/loader/scenario selector, runs no Git command, and does not
  authorize GitHub write or productive skill mutation.
- `planner_kernel` has read-only executable validation harnesses as blocking
  support, but harness success does not grant automatic promotion for this or
  any future kernel.
- `reference/agents/planner.agent.md` is the local dev snapshot derived
  literally from `templates/agents/planner.agent.md`.
- No `planning_kernel` exists in this bundle.
- `validation_eval_designer_kernel` is promoted as
  `VALIDATION_EVAL_DESIGNER_KERNEL: CLEAN_EXCELLENT_PASS` for the documentary,
  contractual, minimum-semantic dev kernel lab with a hardened executable
  textual harness after the separately authorized human audit.
- `reference/agents/validation-eval-designer.agent.md` is the local dev snapshot
  derived literally from
  `templates/agents/validation-eval-designer.agent.md`.
- The `validation_eval_designer_kernel` harnesses are read-only blocking
  support only. They do not grant automatic promotion, runtime,
  materialization, target-repository writes, productive-skill authorization,
  or materializer authorization.
- `execution_package_designer_kernel` is frozen as
  `EXECUTION_PACKAGE_DESIGNER_KERNEL: CLEAN_EXCELLENT_PASS` after final human
  audit with `CLEAN_AUDIT_PASS_FOR_PROMOTION_RECOMMENDATION`. This pass is
  limited to the documentary, contractual, minimum-semantic dev kernel lab with
  a hardened executable textual harness; it grants no runtime,
  materialization, target-repository write, productive-skill, materializer, or
  production-agent authorization.
- `reference/agents/execution-package-designer.agent.md` is the local dev
  snapshot derived literally from
  `templates/agents/execution-package-designer.agent.md`.
- `designer_kernel` is frozen as `CLEAN_EXCELLENT_PASS` after controlled
  documentary promotion. This pass is limited to the documentary, contractual,
  minimum-semantic dev kernel lab with a hardened executable textual harness
  and final human audit authorization; it grants no runtime,
  materialization, target-repository write, productive-skill, materializer,
  GitHub write, target repo write, or production-agent authorization.
- `reference/agents/designer.agent.md` is the local dev snapshot derived
  literally from `templates/agents/designer.agent.md`.
- `coder_frontend_kernel` is frozen as `CLEAN_EXCELLENT_PASS` after controlled
  documentary promotion. This pass is limited to the documentary, contractual,
  minimum-semantic dev kernel lab with a hardened executable textual harness
  and final human audit authorization. It grants no runtime loading,
  materialization path, target-repository write authorization, productive-skill
  authorization, GitHub write authorization, production use, generated reports,
  fixtures, target artifacts, or canonical-template write authorization.
- `reference/agents/coder-frontend.agent.md` is the local dev snapshot derived
  literally from `templates/agents/coder-frontend.agent.md`.
- `coder_backend_kernel` is frozen as `CLEAN_EXCELLENT_PASS` after controlled
  documentary promotion. This pass is limited to the documentary, contractual,
  minimum-semantic dev kernel lab with a hardened executable textual harness
  and final human audit authorization. It grants no runtime loading,
  materialization path, target-repository write authorization, productive-skill
  authorization, GitHub write authorization, production use, generated reports,
  fixtures, target artifacts, active runtime adoption, or canonical-template
  write authorization.
- `reference/agents/coder-backend.agent.md` is the local dev snapshot derived
  literally from `templates/agents/coder-backend.agent.md`.
- `coder_ios_kernel` is frozen as
  `CODER_IOS_KERNEL: CLEAN_EXCELLENT_PASS` after controlled documentary
  promotion. This pass is limited to the documentary, contractual,
  minimum-semantic dev kernel lab with a hardened executable textual harness
  and final human audit authorization. It grants no runtime loading,
  materialization path, target-repository write authorization, productive-skill
  authorization, GitHub write authorization, production use, generated reports,
  fixtures, target artifacts, active runtime adoption, durable documentation
  ownership, `DONE`, resync decision ownership, validation-runner/reviewer/
  finalizer/resync substitution, frontend-web substitution, backend
  substitution, runtime/temp source-of-truth recovery, or canonical-template
  write authorization.
- `reference/agents/coder-ios.agent.md` is the local dev snapshot derived
  literally from `templates/agents/coder-ios.agent.md`.
- `validation_runner_kernel` is frozen as
  `VALIDATION_RUNNER_KERNEL: CLEAN_EXCELLENT_PASS` after controlled documentary
  promotion. This pass is limited to the documentary, contractual,
  minimum-semantic dev kernel lab with a hardened executable textual harness
  and final human authorization. It grants no runtime loading,
  materialization path, target-repository write authorization,
  productive-skill authorization, GitHub write authorization, production use,
  generated reports, fixtures, target artifacts, active runtime adoption,
  materializer authorization, or canonical-template write authorization.
- `reference/agents/validation-runner.agent.md` is the local dev snapshot
  derived literally from `templates/agents/validation-runner.agent.md`.
- `reviewer_kernel` is frozen as
  `REVIEWER_KERNEL: CLEAN_EXCELLENT_PASS` after controlled documentary
  promotion. This pass is limited to the documentary, contractual,
  minimum-semantic dev kernel lab with a hardened executable textual harness
  and final human authorization. It grants no runtime loading,
  materialization path, target-repository write authorization,
  productive-skill authorization, GitHub write authorization, production use,
  generated reports, fixtures, target artifacts, active runtime adoption,
  materializer authorization, runtime loader authorization, or
  canonical-template write authorization.
- `reference/agents/reviewer.agent.md` is the local dev snapshot derived
  literally from `templates/agents/reviewer.agent.md`.
- `finalizer_kernel` is frozen as
  `FINALIZER_KERNEL: CLEAN_EXCELLENT_PASS` after controlled documentary
  promotion. This pass is limited to the documentary, contractual,
  minimum-semantic dev kernel lab with a hardened executable textual harness
  and final human authorization. It grants no runtime loading,
  materialization path, target-repository write authorization,
  productive-skill authorization, GitHub write authorization, production use,
  generated reports, fixtures, target artifacts, active runtime adoption,
  materializer authorization, runtime loader authorization, resync execution,
  runner/reviewer substitution, or canonical-template write authorization.
- `reference/agents/finalizer.agent.md` is the local dev snapshot derived
  literally from `templates/agents/finalizer.agent.md`.
- `resync_kernel` is frozen as
  `RESYNC_KERNEL: CLEAN_EXCELLENT_PASS` after controlled documentary promotion.
  This pass is limited to the documentary, contractual, minimum-semantic dev
  kernel lab with a hardened executable textual harness and final human
  authorization. It grants no runtime loading, materialization path,
  target-repository write authorization, productive-skill authorization,
  GitHub write authorization, production use, generated reports, fixtures,
  target artifacts, active runtime adoption, materializer authorization,
  runtime loader authorization, closure ownership, `DONE`, implementation,
  validation-runner/reviewer/planner/coder substitution, normative-rule rewrite,
  or canonical-template write authorization.
- `reference/agents/resync.agent.md` is the local dev snapshot derived
  literally from `templates/agents/resync.agent.md`.

Required files:
- `reference/seniorization_lab/README.md`
- `reference/seniorization_lab/SENIOR_AGENT_PROFILE_AUDIT.md`
- `reference/seniorization_lab/SENIOR_AGENT_PROFILE_INTEGRATED_VALIDATION.md`
- `reference/seniorization_lab/contracts/README.md`
- `reference/seniorization_lab/contracts/CONTRACT.md`
- `reference/seniorization_lab/contracts/SENIOR_PROFILE_MODULARIZATION_CONTRACT.md`
- `reference/seniorization_lab/contracts/BEHAVIOR_MODULE_ACTIVATION_CONTRACT.md`
- `reference/seniorization_lab/contracts/RUNTIME_LAZY_LOAD_CONTRACT.md`
- `reference/seniorization_lab/contracts/MINIMUM_SAFE_BUNDLE.md`
- `reference/seniorization_lab/contracts/PROFILE_SET_INDEX.md`
- `reference/seniorization_lab/contracts/HANDOFF_CHAIN_CONTRACT.md`
- `reference/seniorization_lab/contracts/INTEGRATED_VALIDATION_GATES.md`
- `reference/seniorization_lab/orchestrator_profile/README.md`
- `reference/seniorization_lab/orchestrator_profile/SENIOR_AGENT_PROFILE.md`
- `reference/seniorization_lab/orchestrator_profile/profile/01_IDENTITY_AND_BOUNDARY.md`
- `reference/seniorization_lab/orchestrator_profile/profile/02_DECISION_AND_READING.md`
- `reference/seniorization_lab/orchestrator_profile/profile/03_RISK_AND_GATES.md`
- `reference/seniorization_lab/orchestrator_profile/profile/04_HANDOFF_EVIDENCE_AND_OUTPUT.md`
- `reference/seniorization_lab/orchestrator_profile/validation/STATIC_CHECKS.md`
- `reference/seniorization_lab/orchestrator_profile/validation/GOLDEN_SCENARIOS.md`
- `reference/seniorization_lab/orchestrator_profile/validation/EXCELLENT_PASS_EXPECTATIONS.md`
- `reference/seniorization_lab/planner_profile/README.md`
- `reference/seniorization_lab/planner_profile/SENIOR_AGENT_PROFILE.md`
- `reference/seniorization_lab/planner_profile/profile/01_IDENTITY_AND_BOUNDARY.md`
- `reference/seniorization_lab/planner_profile/profile/02_DECISION_AND_READING.md`
- `reference/seniorization_lab/planner_profile/profile/03_RISK_AND_GATES.md`
- `reference/seniorization_lab/planner_profile/profile/04_HANDOFF_EVIDENCE_AND_OUTPUT.md`
- `reference/seniorization_lab/planner_profile/validation/STATIC_CHECKS.md`
- `reference/seniorization_lab/planner_profile/validation/GOLDEN_SCENARIOS.md`
- `reference/seniorization_lab/planner_profile/validation/EXCELLENT_PASS_EXPECTATIONS.md`
- `reference/seniorization_lab/validation_eval_designer_profile/README.md`
- `reference/seniorization_lab/validation_eval_designer_profile/SENIOR_AGENT_PROFILE.md`
- `reference/seniorization_lab/validation_eval_designer_profile/profile/01_IDENTITY_AND_BOUNDARY.md`
- `reference/seniorization_lab/validation_eval_designer_profile/profile/02_DECISION_AND_READING.md`
- `reference/seniorization_lab/validation_eval_designer_profile/profile/03_RISK_AND_GATES.md`
- `reference/seniorization_lab/validation_eval_designer_profile/profile/04_HANDOFF_EVIDENCE_AND_OUTPUT.md`
- `reference/seniorization_lab/validation_eval_designer_profile/validation/STATIC_CHECKS.md`
- `reference/seniorization_lab/validation_eval_designer_profile/validation/GOLDEN_SCENARIOS.md`
- `reference/seniorization_lab/validation_eval_designer_profile/validation/EXCELLENT_PASS_EXPECTATIONS.md`
- `reference/seniorization_lab/execution_package_designer_profile/README.md`
- `reference/seniorization_lab/execution_package_designer_profile/SENIOR_AGENT_PROFILE.md`
- `reference/seniorization_lab/execution_package_designer_profile/profile/01_IDENTITY_AND_BOUNDARY.md`
- `reference/seniorization_lab/execution_package_designer_profile/profile/02_DECISION_AND_READING.md`
- `reference/seniorization_lab/execution_package_designer_profile/profile/03_RISK_AND_GATES.md`
- `reference/seniorization_lab/execution_package_designer_profile/profile/04_HANDOFF_EVIDENCE_AND_OUTPUT.md`
- `reference/seniorization_lab/execution_package_designer_profile/validation/STATIC_CHECKS.md`
- `reference/seniorization_lab/execution_package_designer_profile/validation/GOLDEN_SCENARIOS.md`
- `reference/seniorization_lab/execution_package_designer_profile/validation/EXCELLENT_PASS_EXPECTATIONS.md`
- `reference/seniorization_lab/designer_profile/README.md`
- `reference/seniorization_lab/designer_profile/SENIOR_AGENT_PROFILE.md`
- `reference/seniorization_lab/designer_profile/profile/01_IDENTITY_AND_BOUNDARY.md`
- `reference/seniorization_lab/designer_profile/profile/02_DECISION_AND_READING.md`
- `reference/seniorization_lab/designer_profile/profile/03_RISK_AND_GATES.md`
- `reference/seniorization_lab/designer_profile/profile/04_HANDOFF_EVIDENCE_AND_OUTPUT.md`
- `reference/seniorization_lab/designer_profile/validation/STATIC_CHECKS.md`
- `reference/seniorization_lab/designer_profile/validation/GOLDEN_SCENARIOS.md`
- `reference/seniorization_lab/designer_profile/validation/EXCELLENT_PASS_EXPECTATIONS.md`
- `reference/seniorization_lab/coder_frontend_profile/README.md`
- `reference/seniorization_lab/coder_frontend_profile/SENIOR_AGENT_PROFILE.md`
- `reference/seniorization_lab/coder_frontend_profile/profile/01_IDENTITY_AND_BOUNDARY.md`
- `reference/seniorization_lab/coder_frontend_profile/profile/02_DECISION_AND_READING.md`
- `reference/seniorization_lab/coder_frontend_profile/profile/03_RISK_AND_GATES.md`
- `reference/seniorization_lab/coder_frontend_profile/profile/04_HANDOFF_EVIDENCE_AND_OUTPUT.md`
- `reference/seniorization_lab/coder_frontend_profile/validation/STATIC_CHECKS.md`
- `reference/seniorization_lab/coder_frontend_profile/validation/GOLDEN_SCENARIOS.md`
- `reference/seniorization_lab/coder_frontend_profile/validation/EXCELLENT_PASS_EXPECTATIONS.md`
- `reference/seniorization_lab/coder_backend_profile/README.md`
- `reference/seniorization_lab/coder_backend_profile/SENIOR_AGENT_PROFILE.md`
- `reference/seniorization_lab/coder_backend_profile/profile/01_IDENTITY_AND_BOUNDARY.md`
- `reference/seniorization_lab/coder_backend_profile/profile/02_DECISION_AND_READING.md`
- `reference/seniorization_lab/coder_backend_profile/profile/03_RISK_AND_GATES.md`
- `reference/seniorization_lab/coder_backend_profile/profile/04_HANDOFF_EVIDENCE_AND_OUTPUT.md`
- `reference/seniorization_lab/coder_backend_profile/validation/STATIC_CHECKS.md`
- `reference/seniorization_lab/coder_backend_profile/validation/GOLDEN_SCENARIOS.md`
- `reference/seniorization_lab/coder_backend_profile/validation/EXCELLENT_PASS_EXPECTATIONS.md`
- `reference/seniorization_lab/coder_ios_profile/README.md`
- `reference/seniorization_lab/coder_ios_profile/SENIOR_AGENT_PROFILE.md`
- `reference/seniorization_lab/coder_ios_profile/profile/01_IDENTITY_AND_BOUNDARY.md`
- `reference/seniorization_lab/coder_ios_profile/profile/02_DECISION_AND_READING.md`
- `reference/seniorization_lab/coder_ios_profile/profile/03_RISK_AND_GATES.md`
- `reference/seniorization_lab/coder_ios_profile/profile/04_HANDOFF_EVIDENCE_AND_OUTPUT.md`
- `reference/seniorization_lab/coder_ios_profile/validation/STATIC_CHECKS.md`
- `reference/seniorization_lab/coder_ios_profile/validation/GOLDEN_SCENARIOS.md`
- `reference/seniorization_lab/coder_ios_profile/validation/EXCELLENT_PASS_EXPECTATIONS.md`
- `reference/seniorization_lab/validation_runner_profile/README.md`
- `reference/seniorization_lab/validation_runner_profile/SENIOR_AGENT_PROFILE.md`
- `reference/seniorization_lab/validation_runner_profile/profile/01_IDENTITY_AND_BOUNDARY.md`
- `reference/seniorization_lab/validation_runner_profile/profile/02_DECISION_AND_READING.md`
- `reference/seniorization_lab/validation_runner_profile/profile/03_RISK_AND_GATES.md`
- `reference/seniorization_lab/validation_runner_profile/profile/04_HANDOFF_EVIDENCE_AND_OUTPUT.md`
- `reference/seniorization_lab/validation_runner_profile/validation/STATIC_CHECKS.md`
- `reference/seniorization_lab/validation_runner_profile/validation/GOLDEN_SCENARIOS.md`
- `reference/seniorization_lab/validation_runner_profile/validation/EXCELLENT_PASS_EXPECTATIONS.md`
- `reference/seniorization_lab/reviewer_profile/README.md`
- `reference/seniorization_lab/reviewer_profile/SENIOR_AGENT_PROFILE.md`
- `reference/seniorization_lab/reviewer_profile/profile/01_IDENTITY_AND_BOUNDARY.md`
- `reference/seniorization_lab/reviewer_profile/profile/02_DECISION_AND_READING.md`
- `reference/seniorization_lab/reviewer_profile/profile/03_RISK_AND_GATES.md`
- `reference/seniorization_lab/reviewer_profile/profile/04_HANDOFF_EVIDENCE_AND_OUTPUT.md`
- `reference/seniorization_lab/reviewer_profile/validation/STATIC_CHECKS.md`
- `reference/seniorization_lab/reviewer_profile/validation/GOLDEN_SCENARIOS.md`
- `reference/seniorization_lab/reviewer_profile/validation/EXCELLENT_PASS_EXPECTATIONS.md`
- `reference/seniorization_lab/finalizer_profile/README.md`
- `reference/seniorization_lab/finalizer_profile/SENIOR_AGENT_PROFILE.md`
- `reference/seniorization_lab/finalizer_profile/profile/01_IDENTITY_AND_BOUNDARY.md`
- `reference/seniorization_lab/finalizer_profile/profile/02_DECISION_AND_READING.md`
- `reference/seniorization_lab/finalizer_profile/profile/03_RISK_AND_GATES.md`
- `reference/seniorization_lab/finalizer_profile/profile/04_HANDOFF_EVIDENCE_AND_OUTPUT.md`
- `reference/seniorization_lab/finalizer_profile/validation/STATIC_CHECKS.md`
- `reference/seniorization_lab/finalizer_profile/validation/GOLDEN_SCENARIOS.md`
- `reference/seniorization_lab/finalizer_profile/validation/EXCELLENT_PASS_EXPECTATIONS.md`
- `reference/seniorization_lab/resync_profile/README.md`
- `reference/seniorization_lab/resync_profile/SENIOR_AGENT_PROFILE.md`
- `reference/seniorization_lab/resync_profile/profile/01_IDENTITY_AND_BOUNDARY.md`
- `reference/seniorization_lab/resync_profile/profile/02_DECISION_AND_READING.md`
- `reference/seniorization_lab/resync_profile/profile/03_RISK_AND_GATES.md`
- `reference/seniorization_lab/resync_profile/profile/04_HANDOFF_EVIDENCE_AND_OUTPUT.md`
- `reference/seniorization_lab/resync_profile/validation/STATIC_CHECKS.md`
- `reference/seniorization_lab/resync_profile/validation/GOLDEN_SCENARIOS.md`
- `reference/seniorization_lab/resync_profile/validation/EXCELLENT_PASS_EXPECTATIONS.md`
- `reference/agents/orchestrator.agent.md`
- `reference/agents/planner.agent.md`
- `reference/kernel_lab/README.md`
- `reference/kernel_lab/orchestrator_kernel/contracts/CONTRACT.md`
- `reference/kernel_lab/orchestrator_kernel/contracts/MINIMUM_SAFE_BUNDLE.md`
- `reference/kernel_lab/orchestrator_kernel/contracts/BEHAVIOR_PARITY_SPINE.md`
- `reference/kernel_lab/orchestrator_kernel/contracts/MODULE_INDEX.md`
- `reference/kernel_lab/orchestrator_kernel/contracts/ACTIVATION_GATES.md`
- `reference/kernel_lab/orchestrator_kernel/contracts/EXPERIMENTAL_MATERIALIZATION.md`
- `reference/kernel_lab/orchestrator_kernel/validation/STATIC_CHECKS.md`
- `reference/kernel_lab/orchestrator_kernel/validation/GOLDEN_TESTS.md`
- `reference/kernel_lab/orchestrator_kernel/validation/check-static.mjs`
- `reference/kernel_lab/orchestrator_kernel/validation/check-golden.mjs`
- `reference/kernel_lab/planner_kernel/README.md`
- `reference/kernel_lab/planner_kernel/contracts/CONTRACT.md`
- `reference/kernel_lab/planner_kernel/contracts/BEHAVIOR_PARITY_SPINE.md`
- `reference/kernel_lab/planner_kernel/contracts/MINIMUM_SAFE_BUNDLE.md`
- `reference/kernel_lab/planner_kernel/validation/STATIC_CHECKS.md`
- `reference/kernel_lab/planner_kernel/validation/GOLDEN_TESTS.md`
- `reference/kernel_lab/planner_kernel/validation/check-static.mjs`
- `reference/kernel_lab/planner_kernel/validation/check-golden.mjs`
- `reference/agents/validation-eval-designer.agent.md`
- `reference/kernel_lab/validation_eval_designer_kernel/README.md`
- `reference/kernel_lab/validation_eval_designer_kernel/contracts/CONTRACT.md`
- `reference/kernel_lab/validation_eval_designer_kernel/contracts/BEHAVIOR_PARITY_SPINE.md`
- `reference/kernel_lab/validation_eval_designer_kernel/contracts/HARNESS_DECISION_GATES.md`
- `reference/kernel_lab/validation_eval_designer_kernel/contracts/MINIMUM_SAFE_BUNDLE.md`
- `reference/kernel_lab/validation_eval_designer_kernel/validation/STATIC_CHECKS.md`
- `reference/kernel_lab/validation_eval_designer_kernel/validation/GOLDEN_TESTS.md`
- `reference/kernel_lab/validation_eval_designer_kernel/validation/check-static.mjs`
- `reference/kernel_lab/validation_eval_designer_kernel/validation/check-golden.mjs`
- `reference/agents/execution-package-designer.agent.md`
- `reference/kernel_lab/execution_package_designer_kernel/README.md`
- `reference/kernel_lab/execution_package_designer_kernel/contracts/CONTRACT.md`
- `reference/kernel_lab/execution_package_designer_kernel/contracts/BEHAVIOR_PARITY_SPINE.md`
- `reference/kernel_lab/execution_package_designer_kernel/contracts/PACKAGE_READINESS_GATES.md`
- `reference/kernel_lab/execution_package_designer_kernel/contracts/MINIMUM_SAFE_BUNDLE.md`
- `reference/kernel_lab/execution_package_designer_kernel/validation/STATIC_CHECKS.md`
- `reference/kernel_lab/execution_package_designer_kernel/validation/GOLDEN_TESTS.md`
- `reference/kernel_lab/execution_package_designer_kernel/validation/check-static.mjs`
- `reference/kernel_lab/execution_package_designer_kernel/validation/check-golden.mjs`
- `reference/agents/designer.agent.md`
- `reference/kernel_lab/designer_kernel/README.md`
- `reference/kernel_lab/designer_kernel/contracts/CONTRACT.md`
- `reference/kernel_lab/designer_kernel/contracts/BEHAVIOR_PARITY_SPINE.md`
- `reference/kernel_lab/designer_kernel/contracts/DESIGN_CONTRIBUTION_GATES.md`
- `reference/kernel_lab/designer_kernel/contracts/MINIMUM_SAFE_BUNDLE.md`
- `reference/kernel_lab/designer_kernel/validation/STATIC_CHECKS.md`
- `reference/kernel_lab/designer_kernel/validation/GOLDEN_TESTS.md`
- `reference/kernel_lab/designer_kernel/validation/check-static.mjs`
- `reference/kernel_lab/designer_kernel/validation/check-golden.mjs`
- `reference/agents/coder-frontend.agent.md`
- `reference/kernel_lab/coder_frontend_kernel/README.md`
- `reference/kernel_lab/coder_frontend_kernel/contracts/CONTRACT.md`
- `reference/kernel_lab/coder_frontend_kernel/contracts/BEHAVIOR_PARITY_SPINE.md`
- `reference/kernel_lab/coder_frontend_kernel/contracts/MINIMUM_SAFE_BUNDLE.md`
- `reference/kernel_lab/coder_frontend_kernel/contracts/FRONTEND_EXECUTION_GATES.md`
- `reference/kernel_lab/coder_frontend_kernel/validation/STATIC_CHECKS.md`
- `reference/kernel_lab/coder_frontend_kernel/validation/GOLDEN_TESTS.md`
- `reference/kernel_lab/coder_frontend_kernel/validation/check-static.mjs`
- `reference/kernel_lab/coder_frontend_kernel/validation/check-golden.mjs`
- `reference/agents/coder-backend.agent.md`
- `reference/kernel_lab/coder_backend_kernel/README.md`
- `reference/kernel_lab/coder_backend_kernel/contracts/CONTRACT.md`
- `reference/kernel_lab/coder_backend_kernel/contracts/BEHAVIOR_PARITY_SPINE.md`
- `reference/kernel_lab/coder_backend_kernel/contracts/MINIMUM_SAFE_BUNDLE.md`
- `reference/kernel_lab/coder_backend_kernel/contracts/BACKEND_EXECUTION_GATES.md`
- `reference/kernel_lab/coder_backend_kernel/validation/STATIC_CHECKS.md`
- `reference/kernel_lab/coder_backend_kernel/validation/GOLDEN_TESTS.md`
- `reference/kernel_lab/coder_backend_kernel/validation/check-static.mjs`
- `reference/kernel_lab/coder_backend_kernel/validation/check-golden.mjs`
- `reference/agents/coder-ios.agent.md`
- `reference/kernel_lab/coder_ios_kernel/README.md`
- `reference/kernel_lab/coder_ios_kernel/contracts/CONTRACT.md`
- `reference/kernel_lab/coder_ios_kernel/contracts/BEHAVIOR_PARITY_SPINE.md`
- `reference/kernel_lab/coder_ios_kernel/contracts/MINIMUM_SAFE_BUNDLE.md`
- `reference/kernel_lab/coder_ios_kernel/contracts/CODER_IOS_GATES.md`
- `reference/kernel_lab/coder_ios_kernel/validation/STATIC_CHECKS.md`
- `reference/kernel_lab/coder_ios_kernel/validation/GOLDEN_TESTS.md`
- `reference/kernel_lab/coder_ios_kernel/validation/check-static.mjs`
- `reference/kernel_lab/coder_ios_kernel/validation/check-golden.mjs`
- `reference/agents/validation-runner.agent.md`
- `reference/kernel_lab/validation_runner_kernel/README.md`
- `reference/kernel_lab/validation_runner_kernel/contracts/CONTRACT.md`
- `reference/kernel_lab/validation_runner_kernel/contracts/BEHAVIOR_PARITY_SPINE.md`
- `reference/kernel_lab/validation_runner_kernel/contracts/MINIMUM_SAFE_BUNDLE.md`
- `reference/kernel_lab/validation_runner_kernel/contracts/PROOF_EXECUTION_GATES.md`
- `reference/kernel_lab/validation_runner_kernel/validation/STATIC_CHECKS.md`
- `reference/kernel_lab/validation_runner_kernel/validation/GOLDEN_TESTS.md`
- `reference/kernel_lab/validation_runner_kernel/validation/check-static.mjs`
- `reference/kernel_lab/validation_runner_kernel/validation/check-golden.mjs`
- `reference/agents/reviewer.agent.md`
- `reference/kernel_lab/reviewer_kernel/README.md`
- `reference/kernel_lab/reviewer_kernel/contracts/CONTRACT.md`
- `reference/kernel_lab/reviewer_kernel/contracts/BEHAVIOR_PARITY_SPINE.md`
- `reference/kernel_lab/reviewer_kernel/contracts/MINIMUM_SAFE_BUNDLE.md`
- `reference/kernel_lab/reviewer_kernel/contracts/SEMANTIC_REVIEW_GATES.md`
- `reference/kernel_lab/reviewer_kernel/validation/STATIC_CHECKS.md`
- `reference/kernel_lab/reviewer_kernel/validation/GOLDEN_TESTS.md`
- `reference/kernel_lab/reviewer_kernel/validation/check-static.mjs`
- `reference/kernel_lab/reviewer_kernel/validation/check-golden.mjs`
- `reference/agents/finalizer.agent.md`
- `reference/kernel_lab/finalizer_kernel/README.md`
- `reference/kernel_lab/finalizer_kernel/contracts/CONTRACT.md`
- `reference/kernel_lab/finalizer_kernel/contracts/BEHAVIOR_PARITY_SPINE.md`
- `reference/kernel_lab/finalizer_kernel/contracts/MINIMUM_SAFE_BUNDLE.md`
- `reference/kernel_lab/finalizer_kernel/contracts/CLOSURE_GATES.md`
- `reference/kernel_lab/finalizer_kernel/validation/STATIC_CHECKS.md`
- `reference/kernel_lab/finalizer_kernel/validation/GOLDEN_TESTS.md`
- `reference/kernel_lab/finalizer_kernel/validation/check-static.mjs`
- `reference/kernel_lab/finalizer_kernel/validation/check-golden.mjs`
- `reference/agents/resync.agent.md`
- `reference/kernel_lab/resync_kernel/README.md`
- `reference/kernel_lab/resync_kernel/contracts/CONTRACT.md`
- `reference/kernel_lab/resync_kernel/contracts/BEHAVIOR_PARITY_SPINE.md`
- `reference/kernel_lab/resync_kernel/contracts/MINIMUM_SAFE_BUNDLE.md`
- `reference/kernel_lab/resync_kernel/contracts/RESYNC_GATES.md`
- `reference/kernel_lab/resync_kernel/validation/STATIC_CHECKS.md`
- `reference/kernel_lab/resync_kernel/validation/GOLDEN_TESTS.md`
- `reference/kernel_lab/resync_kernel/validation/check-static.mjs`
- `reference/kernel_lab/resync_kernel/validation/check-golden.mjs`
- `reference/materialization_lab/README.md`
- `reference/materialization_lab/contracts/TARGETS_CONTRACT.md`
- `reference/materialization_lab/contracts/SOURCE_MODEL_CONTRACT.md`
- `reference/materialization_lab/contracts/TEMPLATES_AND_OUTPUTS_CONTRACT.md`
- `reference/materialization_lab/contracts/RENDERING_AND_COMPOSITION_CONTRACT.md`
- `reference/materialization_lab/contracts/DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md`
- `reference/materialization_lab/contracts/DRY_RUN_REPORT_MODEL_CONTRACT.md`
- `reference/materialization_lab/contracts/MATERIALIZER_INTERFACE_CONTRACT.md`
- `reference/materialization_lab/contracts/VALIDATION_HARNESS_CONTRACT.md`
- `reference/materialization_lab/contracts/VALIDATION_HARNESS_AGGREGATOR_CONTRACT.md`
- `reference/materialization_lab/contracts/IMPLEMENTATION_BOUNDARY_CONTRACT.md`
- `reference/materialization_lab/contracts/FIXTURE_BOUNDARY_CONTRACT.md`
- `reference/materialization_lab/validation/STATIC_CHECKS.md`
- `reference/materialization_lab/validation/GOLDEN_SCENARIOS.md`
- `reference/materialization_lab/validation/EXCELLENT_PASS_EXPECTATIONS.md`
- `reference/materialization_lab/fixtures/README.md`
- `reference/materialization_lab/fixtures/FIXTURE_SCHEMA.md`
- `reference/materialization_lab/fixtures/projects/README.md`
- `reference/materialization_lab/fixtures/projects/backend_only_happy/FIXTURE.md`
- `reference/materialization_lab/fixtures/projects/frontend_only_happy/FIXTURE.md`
- `reference/materialization_lab/fixtures/projects/ios_only_happy/FIXTURE.md`
- `reference/materialization_lab/fixtures/projects/fullstack_be_fe_happy/FIXTURE.md`
- `reference/materialization_lab/fixtures/projects/fullstack_be_ios_happy/FIXTURE.md`
- `reference/materialization_lab/fixtures/projects/fullstack_be_fe_ios_happy/FIXTURE.md`
- `reference/materialization_lab/fixtures/lazy_load/README.md`
- `reference/materialization_lab/fixtures/lazy_load/non_trivial_loads_01/FIXTURE.md`
- `reference/materialization_lab/fixtures/lazy_load/decision_loads_02/FIXTURE.md`
- `reference/materialization_lab/fixtures/lazy_load/risk_loads_03/FIXTURE.md`
- `reference/materialization_lab/fixtures/lazy_load/output_loads_04/FIXTURE.md`
- `reference/materialization_lab/fixtures/lazy_load/load_all_default_blocks/FIXTURE.md`
- `reference/materialization_lab/fixtures/lazy_load/module_03_missing_risk_blocks/FIXTURE.md`
- `reference/materialization_lab/fixtures/lazy_load/module_04_missing_output_blocks/FIXTURE.md`
- `reference/materialization_lab/fixtures/lazy_load/trace_missing_blocks/FIXTURE.md`
- `reference/materialization_lab/fixtures/blocked_cases/README.md`
- `reference/materialization_lab/fixtures/blocked_cases/missing_template/FIXTURE.md`
- `reference/materialization_lab/fixtures/blocked_cases/inferred_template/FIXTURE.md`
- `reference/materialization_lab/fixtures/blocked_cases/forbidden_target_path/FIXTURE.md`
- `reference/materialization_lab/fixtures/blocked_cases/reference_agents_final_source/FIXTURE.md`
- `reference/materialization_lab/fixtures/blocked_cases/write_github_real/FIXTURE.md`
- `reference/materialization_lab/fixtures/blocked_cases/write_codex_real/FIXTURE.md`
- `reference/materialization_lab/fixtures/blocked_cases/write_agents_md_real/FIXTURE.md`
- `reference/materialization_lab/fixtures/blocked_cases/runtime_materializer_created/FIXTURE.md`
- `reference/materialization_lab/fixtures/blocked_cases/productive_skill_mutation/FIXTURE.md`
- `reference/materialization_lab/fixtures/blocked_cases/github_write/FIXTURE.md`
- `reference/materialization_lab/fixtures/expected_outputs/README.md`
- `reference/materialization_lab/fixtures/expected_outputs/SNAPSHOT_POLICY.md`
- `reference/materialization_lab/fixtures/expected_outputs/minimal_copilot_agent_snapshot/FIXTURE.md`
- `reference/materialization_lab/fixtures/expected_outputs/minimal_codex_agent_snapshot/FIXTURE.md`
- `reference/materialization_lab/fixtures/expected_outputs/minimal_codex_config_snapshot/FIXTURE.md`
- `reference/materialization_lab/fixtures/expected_outputs/minimal_agents_md_snapshot/FIXTURE.md`
- `scripts/materialization_lab/check-static.mjs`
- `scripts/materialization_lab/check-source-inventory.mjs`
- `scripts/materialization_lab/check-template-coverage.mjs`
- `scripts/materialization_lab/check-render-context.mjs`
- `scripts/materialization_lab/check-dry-run-plan.mjs`
- `scripts/materialization_lab/check-fixture-boundary.mjs`
- `scripts/materialization_lab/check-lazy-load-fixtures.mjs`
- `scripts/materialization_lab/check-project-scenarios.mjs`
- `scripts/materialization_lab/check-fixture-render-dry-run-integration.mjs`
- `scripts/materialization_lab/check-validation-harness-aggregator.mjs`
- `reference/templates/copilot/agent.md`
- `reference/templates/codex/agent.toml`
- `reference/templates/codex/AGENTS.md`
- `reference/templates/codex/config.toml`

Not active in this dev bundle:
- no standalone orchestrator-kernel materializer is part of the active flow
- no materialization-lab runtime materializer is part of the active flow
- no generated orchestrator-kernel artifact is a required or expected output
- no target repository materialization is authorized from this experimental area
- no planner runtime, planner materializer, planner fixture, generated report,
  automatic planner promotion, or target-writer flow is part of this bundle
- no `validation-eval-designer` runtime, materializer, fixture, generated
  report, automatic promotion, or target-writer flow is part of this bundle
- no `execution-package-designer` runtime, materializer, fixture, generated
  report, automatic promotion, or target-writer flow is part of this bundle
- no `designer` runtime, materializer, fixture, generated report, automatic
  promotion, GitHub writer, or target-writer flow is part of this bundle
- no `coder-frontend` runtime, materializer, fixture, generated report,
  automatic future promotion, runtime loader, GitHub writer, production use, or
  target-writer flow is part of this bundle
- no `coder-backend` runtime, materializer, fixture, generated report,
  automatic future promotion, runtime loader, materialization path, active
  runtime adoption, GitHub writer, production use, target artifacts, or
  target-writer flow is part of this bundle
- no `coder-ios` runtime, materializer, fixture, generated report, automatic
  future promotion, runtime loader, materialization path, active runtime
  adoption, GitHub writer, production use, target artifacts, durable
  documentation ownership, `DONE`, resync decision ownership,
  validation-runner/reviewer/finalizer/resync substitution, frontend-web
  substitution, backend substitution, runtime/temp source-of-truth recovery, or
  target-writer flow is part of this bundle
- no `validation-runner` runtime, materializer, fixture, generated report,
  automatic future promotion, runtime loader, materialization path, active
  runtime adoption, GitHub writer, production use, target artifacts,
  productive-skill activation, canonical-template mutation, or target-writer
  flow is part of this bundle
- no `reviewer` runtime, materializer, fixture, generated report, automatic
  future promotion, runtime loader, materialization path, active runtime
  adoption, GitHub writer, production use, target artifacts, productive-skill
  activation, canonical-template mutation, or target-writer flow is part of
  this bundle
- no `finalizer` runtime, materializer, fixture, generated report, automatic
  future promotion, runtime loader, materialization path, active runtime
  adoption, GitHub writer, production use, target artifacts, productive-skill
  activation, canonical-template mutation, resync execution,
  runner/reviewer-substitution flow, or target-writer flow is part of this
  bundle
- no `resync` runtime, materializer, fixture, generated report, automatic
  future promotion, runtime loader, materialization path, active runtime
  adoption, GitHub writer, production use, target artifacts, productive-skill
  activation, canonical-template mutation, closure ownership, `DONE`,
  implementation, validation-runner/reviewer/planner/coder substitution,
  normative-rule rewrite, or target-writer flow is part of this bundle

Not included as canonical dev references:
- no full reference/agents/** bundle is present; only copied base snapshots
  required for active kernel-lab comparison are bundled
- no reference/docs/** bundle is present
