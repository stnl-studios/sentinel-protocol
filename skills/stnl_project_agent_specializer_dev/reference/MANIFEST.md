# Reference Bundle Manifest

Skill: `stnl_project_agent_specializer_dev`

Required files:
- `reference/agents/orchestrator.agent.md`
- `reference/orchestrator_kernel/CONTRACT.md`
- `reference/orchestrator_kernel/MINIMUM_SAFE_BUNDLE.md`
- `reference/orchestrator_kernel/MODULE_INDEX.md`
- `reference/orchestrator_kernel/ACTIVATION_GATES.md`
- `reference/orchestrator_kernel/EXPERIMENTAL_MATERIALIZATION.md`
- `reference/orchestrator_kernel/STATIC_CHECKS.md`
- `reference/orchestrator_kernel/GOLDEN_TESTS.md`
- `reference/orchestrator_kernel/check-static.mjs`
- `reference/orchestrator_kernel/check-golden.mjs`
- `reference/orchestrator_kernel/materialize-orchestrator-kernel.mjs`
- `reference/orchestrator_kernel/check-materialized.mjs`
- `reference/templates/codex/AGENTS.md`
- `reference/templates/codex/config.toml`

Generated experimental outputs:
- `reference/orchestrator_kernel/generated/orchestrator.kernel.agent.md`
- `reference/orchestrator_kernel/generated/orchestrator.kernel.report.json`

Not included as canonical dev references:
- no full reference/agents/** bundle is present; only the copied base orchestrator is bundled for the isolated experiment
- no reference/docs/** bundle is present
