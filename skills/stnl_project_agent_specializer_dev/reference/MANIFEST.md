# Reference Bundle Manifest

Skill: `stnl_project_agent_specializer_dev`

## Canonical reference organization

The canonical documentary/dev-only reference bundle is organized as:

- `reference/agents/`: canonical base agents used as local dev snapshots for
  comparison and anchoring.
- `reference/kernel_lab/`: the 12 documentary/dev-only kernels and their
  contracts, validations, and read-only harnesses.
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
- `reference/templates/codex/AGENTS.md`
- `reference/templates/codex/config.toml`

Not active in this dev bundle:
- no standalone orchestrator-kernel materializer is part of the active flow
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
