# Reference Bundle Manifest

Skill: `stnl_project_agent_specializer_dev`

## Canonical reference organization

The canonical documentary/dev-only reference bundle is organized as:

- `reference/agents/`: canonical base agents used as local dev snapshots for
  comparison and anchoring.
- `reference/kernel_lab/`: the 12 documentary/dev-only kernels and their
  contracts, validations, and read-only harnesses.
- `reference/materialization_lab/`: documentary/dev-only contracts for the
  future senior-agent materialization rewrite, including the canonical target
  IDs, explicit template and output-shape contract, missing-template blocking
  rules, rendering/composition contract, dry-run/write-boundary contract,
  validation harness contract, implementation-boundary contract, and validation
  expectations. This is not a runtime materializer.
- `reference/seniorization_lab/`: the 12 Senior Agent Profiles, the shared
  `contracts/` layer, and integrated seniorization validations.
- `reference/templates/`: reference/template material only; it is not
  materialization, a generated artifact target, or a runtime output path.
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
- `reference/materialization_lab/` defines the dev-only target contract for
  future senior-agent materialization and the dev-only templates and outputs
  contract for canonical `copilot` and `codex` outputs. It also defines the
  documentary render-context composition contract for deterministic composition
  from base agents, Senior Agent Profiles, explicit templates, and
  target/template contracts, plus the documentary dry-run output-plan and
  write-boundary contract for future planned artifacts, plus the documentary
  validation harness contract for future pre-materialization validation and
  dry-run smoke reporting, plus the documentary implementation-boundary
  contract for a later separately authorized dev-only script layer. This phase
  does not authorize runtime materialization, runtime script creation,
  target-repository writes, productive-skill changes, productive-template
  changes, GitHub writes, inferred templates, inferred senior profiles,
  generated outputs, runtime scripts, fixtures, target project mutation,
  overwrite of manual files, validation writes, or a final materializer.
- `reference/materialization_lab/contracts/TEMPLATES_AND_OUTPUTS_CONTRACT.md`
  inventories the explicit templates currently present under
  `reference/templates/`, records that the canonical `copilot` agent and
  `codex` agent templates are present, and requires
  `BLOCKED_TEMPLATE_MISSING` whenever a target, target-agent pair, or output
  shape lacks an explicit template.
- `reference/materialization_lab/contracts/RENDERING_AND_COMPOSITION_CONTRACT.md`
  defines the documentary/dev-only render-context composition layer for the 12
  canonical agents and canonical targets. It requires explicit base agents,
  Senior Agent Profiles, explicit templates, target/template contracts,
  YAML-safe and TOML-safe rendering, common and target-specific placeholders,
  and fail-closed blocking via `BLOCKED_SOURCE_MISSING`,
  `BLOCKED_TEMPLATE_MISSING`, `BLOCKED_PLACEHOLDER_MISSING`,
  `BLOCKED_UNSAFE_RENDER`, and `BLOCKED_COMPOSITION_CONFLICT`.
- `reference/materialization_lab/contracts/DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md`
  defines the documentary/dev-only dry-run output-plan and write-boundary layer
  for future planned artifacts. It requires planned operations only
  (`CREATE_PLANNED`, `UPDATE_PLANNED`, `UNCHANGED_PLANNED`,
  `BLOCKED_PLANNED`), target-root-relative paths for `copilot` and `codex`,
  managed-artifact notice checks, drift classification, and fail-closed
  blocking via `BLOCKED_TARGET_ROOT_INVALID`, `BLOCKED_PATH_UNSAFE`,
  `BLOCKED_UNMANAGED_COLLISION`, `BLOCKED_INVALID_MANAGED_NOTICE`, and
  `BLOCKED_DRY_RUN_REQUIRED`, while preserving the earlier source, template,
  placeholder, render-safety, and composition block codes.
- `reference/materialization_lab/contracts/VALIDATION_HARNESS_CONTRACT.md`
  defines the documentary/dev-only validation harness and dry-run smoke layer
  for future pre-materialization validation. It requires validation before real
  materialization; covers source inventory, target normalization, template
  coverage, placeholder, render safety, dry-run output plan, write-boundary,
  no-target-write, and productive-skill untouched layers; requires a minimum
  matrix of 12 agents x `copilot`, 12 agents x `codex`, `codex` config, and
  `codex` root instructions; defines structured report fields and statuses
  `VALIDATION_PASS`, `VALIDATION_BLOCKED`, and `VALIDATION_FAILED`; and blocks
  write attempts, productive-skill mutation, target-file mutation, incomplete
  matrix coverage, and unknown block codes.
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
- `reference/materialization_lab/contracts/TEMPLATES_AND_OUTPUTS_CONTRACT.md`
- `reference/materialization_lab/contracts/RENDERING_AND_COMPOSITION_CONTRACT.md`
- `reference/materialization_lab/contracts/DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md`
- `reference/materialization_lab/contracts/VALIDATION_HARNESS_CONTRACT.md`
- `reference/materialization_lab/contracts/IMPLEMENTATION_BOUNDARY_CONTRACT.md`
- `reference/materialization_lab/validation/STATIC_CHECKS.md`
- `reference/materialization_lab/validation/GOLDEN_SCENARIOS.md`
- `reference/materialization_lab/validation/EXCELLENT_PASS_EXPECTATIONS.md`
- `scripts/materialization_lab/check-static.mjs`
- `scripts/materialization_lab/check-source-inventory.mjs`
- `scripts/materialization_lab/check-template-coverage.mjs`
- `scripts/materialization_lab/check-render-context.mjs`
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
