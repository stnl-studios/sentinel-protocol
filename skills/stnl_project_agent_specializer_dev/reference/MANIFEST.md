# Reference Bundle Manifest

Skill: `stnl_project_agent_specializer_dev`

## Current status

- `orchestrator_kernel` is frozen as `CLEAN_EXCELLENT_PASS`.
- `planner_kernel` is documentally integrated for the kernel lab and remains
  `NOT_EXCELLENT_PASS`.
- `planner_kernel` now has read-only executable validation harnesses as
  blocking support, but this does not grant automatic pass; human final audit
  is still required.
- `reference/agents/planner.agent.md` is the local dev snapshot derived
  literally from `templates/agents/planner.agent.md`.
- No `planning_kernel` exists in this bundle.

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
- `reference/templates/codex/AGENTS.md`
- `reference/templates/codex/config.toml`

Not active in this dev bundle:
- no standalone orchestrator-kernel materializer is part of the active flow
- no generated orchestrator-kernel artifact is a required or expected output
- no target repository materialization is authorized from this experimental area
- no planner runtime, planner materializer, planner fixture, generated report,
  automatic planner pass, or target-writer flow is part of this bundle

Not included as canonical dev references:
- no full reference/agents/** bundle is present; only copied base snapshots
  required for active kernel-lab comparison are bundled
- no reference/docs/** bundle is present
