# Reference Bundle Manifest

Skill: `stnl_project_agent_specializer_dev`

## Current status

- `orchestrator_kernel` is frozen as `CLEAN_EXCELLENT_PASS`.
- `planner_kernel` is frozen as `CLEAN_EXCELLENT_PASS` for the documentary,
  contractual, and semantic kernel lab after the separately authorized human
  audit.
- All five passes are dev kernel-lab results only. They do not authorize runtime,
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
- `coder_frontend_kernel` is an initial documentary draft only. It is not
  promoted, not a clean pass, and has only read-only documentary/textual
  blocking validation harness support. It has no runtime loading,
  materialization path, target-repository write authorization, productive-skill
  authorization, GitHub write authorization, production use, or
  canonical-template write authorization.
- `reference/agents/coder-frontend.agent.md` is the local dev snapshot derived
  literally from `templates/agents/coder-frontend.agent.md`.

Required files:
- `reference/agents/orchestrator.agent.md`
- `reference/agents/planner.agent.md`
- `reference/kernel_lab/README.md`
- `reference/orchestrator_kernel/contracts/CONTRACT.md`
- `reference/orchestrator_kernel/contracts/MINIMUM_SAFE_BUNDLE.md`
- `reference/orchestrator_kernel/contracts/BEHAVIOR_PARITY_SPINE.md`
- `reference/orchestrator_kernel/contracts/MODULE_INDEX.md`
- `reference/orchestrator_kernel/contracts/ACTIVATION_GATES.md`
- `reference/orchestrator_kernel/contracts/EXPERIMENTAL_MATERIALIZATION.md`
- `reference/orchestrator_kernel/validation/STATIC_CHECKS.md`
- `reference/orchestrator_kernel/validation/GOLDEN_TESTS.md`
- `reference/orchestrator_kernel/validation/check-static.mjs`
- `reference/orchestrator_kernel/validation/check-golden.mjs`
- `reference/planner_kernel/README.md`
- `reference/planner_kernel/contracts/CONTRACT.md`
- `reference/planner_kernel/contracts/BEHAVIOR_PARITY_SPINE.md`
- `reference/planner_kernel/contracts/MINIMUM_SAFE_BUNDLE.md`
- `reference/planner_kernel/validation/STATIC_CHECKS.md`
- `reference/planner_kernel/validation/GOLDEN_TESTS.md`
- `reference/planner_kernel/validation/check-static.mjs`
- `reference/planner_kernel/validation/check-golden.mjs`
- `reference/agents/validation-eval-designer.agent.md`
- `reference/validation_eval_designer_kernel/README.md`
- `reference/validation_eval_designer_kernel/contracts/CONTRACT.md`
- `reference/validation_eval_designer_kernel/contracts/BEHAVIOR_PARITY_SPINE.md`
- `reference/validation_eval_designer_kernel/contracts/HARNESS_DECISION_GATES.md`
- `reference/validation_eval_designer_kernel/contracts/MINIMUM_SAFE_BUNDLE.md`
- `reference/validation_eval_designer_kernel/validation/STATIC_CHECKS.md`
- `reference/validation_eval_designer_kernel/validation/GOLDEN_TESTS.md`
- `reference/validation_eval_designer_kernel/validation/check-static.mjs`
- `reference/validation_eval_designer_kernel/validation/check-golden.mjs`
- `reference/agents/execution-package-designer.agent.md`
- `reference/execution_package_designer_kernel/README.md`
- `reference/execution_package_designer_kernel/contracts/CONTRACT.md`
- `reference/execution_package_designer_kernel/contracts/BEHAVIOR_PARITY_SPINE.md`
- `reference/execution_package_designer_kernel/contracts/PACKAGE_READINESS_GATES.md`
- `reference/execution_package_designer_kernel/contracts/MINIMUM_SAFE_BUNDLE.md`
- `reference/execution_package_designer_kernel/validation/STATIC_CHECKS.md`
- `reference/execution_package_designer_kernel/validation/GOLDEN_TESTS.md`
- `reference/execution_package_designer_kernel/validation/check-static.mjs`
- `reference/execution_package_designer_kernel/validation/check-golden.mjs`
- `reference/agents/designer.agent.md`
- `reference/designer_kernel/README.md`
- `reference/designer_kernel/contracts/CONTRACT.md`
- `reference/designer_kernel/contracts/BEHAVIOR_PARITY_SPINE.md`
- `reference/designer_kernel/contracts/DESIGN_CONTRIBUTION_GATES.md`
- `reference/designer_kernel/contracts/MINIMUM_SAFE_BUNDLE.md`
- `reference/designer_kernel/validation/STATIC_CHECKS.md`
- `reference/designer_kernel/validation/GOLDEN_TESTS.md`
- `reference/designer_kernel/validation/check-static.mjs`
- `reference/designer_kernel/validation/check-golden.mjs`
- `reference/agents/coder-frontend.agent.md`
- `reference/coder_frontend_kernel/README.md`
- `reference/coder_frontend_kernel/contracts/CONTRACT.md`
- `reference/coder_frontend_kernel/contracts/BEHAVIOR_PARITY_SPINE.md`
- `reference/coder_frontend_kernel/contracts/MINIMUM_SAFE_BUNDLE.md`
- `reference/coder_frontend_kernel/contracts/FRONTEND_EXECUTION_GATES.md`
- `reference/coder_frontend_kernel/validation/STATIC_CHECKS.md`
- `reference/coder_frontend_kernel/validation/GOLDEN_TESTS.md`
- `reference/coder_frontend_kernel/validation/check-static.mjs`
- `reference/coder_frontend_kernel/validation/check-golden.mjs`
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
  automatic promotion, runtime loader, GitHub writer, production use, or
  target-writer flow is part of this bundle

Not included as canonical dev references:
- no full reference/agents/** bundle is present; only copied base snapshots
  required for active kernel-lab comparison are bundled
- no reference/docs/** bundle is present
