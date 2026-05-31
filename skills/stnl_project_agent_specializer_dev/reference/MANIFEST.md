# Reference Bundle Manifest

Skill: `stnl_project_agent_specializer_dev`

## Current status

- `orchestrator_kernel` is frozen as `CLEAN_EXCELLENT_PASS`.
- `planner_kernel` is frozen as `CLEAN_EXCELLENT_PASS` for the documentary,
  contractual, and semantic kernel lab after the separately authorized human
  audit.
- All three passes are dev kernel-lab results only. They do not authorize runtime,
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
- `execution_package_designer_kernel` is hardened as
  `EXECUTION_PACKAGE_DESIGNER_KERNEL: HARDENED_FOR_FINAL_AUDIT`. This means
  snapshot, documentary contracts, and read-only textual harnesses are hardened
  for final human audit only; it is not a pass and grants no runtime,
  materialization, target-repository write, productive-skill, or materializer
  authorization.
- `reference/agents/execution-package-designer.agent.md` is the local dev
  snapshot derived literally from
  `templates/agents/execution-package-designer.agent.md`.

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

Not included as canonical dev references:
- no full reference/agents/** bundle is present; only copied base snapshots
  required for active kernel-lab comparison are bundled
- no reference/docs/** bundle is present
