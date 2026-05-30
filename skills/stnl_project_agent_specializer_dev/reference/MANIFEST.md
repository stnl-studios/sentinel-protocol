# Reference Bundle Manifest

Skill: `stnl_project_agent_specializer_dev`

Required files:
- `reference/agents/orchestrator.agent.md`
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
- `reference/templates/codex/AGENTS.md`
- `reference/templates/codex/config.toml`

Not active in this dev bundle:
- no standalone orchestrator-kernel materializer is part of the active flow
- no generated orchestrator-kernel artifact is a required or expected output
- no target repository materialization is authorized from this experimental area

Not included as canonical dev references:
- no full reference/agents/** bundle is present; only the copied base orchestrator is bundled for the kernel-lab comparison
- no reference/docs/** bundle is present
