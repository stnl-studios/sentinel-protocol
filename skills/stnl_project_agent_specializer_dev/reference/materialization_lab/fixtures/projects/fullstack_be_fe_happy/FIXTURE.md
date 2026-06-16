---
fixture_id: projects/fullstack_be_fe_happy
fixture_type: project_positive
status: complete
scenario: fullstack-be-fe-happy
purpose: Fullstack BE + FE happy project package
dev_only: true
no_real_write: true
source_model:
  kernel_source:
    - reference/kernel_lab/orchestrator_kernel/
    - reference/kernel_lab/planner_kernel/
    - reference/kernel_lab/validation_eval_designer_kernel/
    - reference/kernel_lab/execution_package_designer_kernel/
    - reference/kernel_lab/designer_kernel/
    - reference/kernel_lab/coder_backend_kernel/
    - reference/kernel_lab/coder_frontend_kernel/
    - reference/kernel_lab/validation_runner_kernel/
    - reference/kernel_lab/reviewer_kernel/
    - reference/kernel_lab/finalizer_kernel/
    - reference/kernel_lab/resync_kernel/
  senior_profile_source:
    - reference/seniorization_lab/orchestrator_profile/SENIOR_AGENT_PROFILE.md
    - reference/seniorization_lab/planner_profile/SENIOR_AGENT_PROFILE.md
    - reference/seniorization_lab/validation_eval_designer_profile/SENIOR_AGENT_PROFILE.md
    - reference/seniorization_lab/execution_package_designer_profile/SENIOR_AGENT_PROFILE.md
    - reference/seniorization_lab/designer_profile/SENIOR_AGENT_PROFILE.md
    - reference/seniorization_lab/coder_backend_profile/SENIOR_AGENT_PROFILE.md
    - reference/seniorization_lab/coder_frontend_profile/SENIOR_AGENT_PROFILE.md
    - reference/seniorization_lab/validation_runner_profile/SENIOR_AGENT_PROFILE.md
    - reference/seniorization_lab/reviewer_profile/SENIOR_AGENT_PROFILE.md
    - reference/seniorization_lab/finalizer_profile/SENIOR_AGENT_PROFILE.md
    - reference/seniorization_lab/resync_profile/SENIOR_AGENT_PROFILE.md
  template_source:
    - reference/templates/copilot/agent.md
    - reference/templates/codex/agent.toml
    - reference/templates/codex/config.toml
    - reference/templates/codex/AGENTS.md
  materialization_contract_source:
    - reference/materialization_lab/contracts/SOURCE_MODEL_CONTRACT.md
    - reference/materialization_lab/contracts/TARGETS_CONTRACT.md
    - reference/materialization_lab/contracts/TEMPLATES_AND_OUTPUTS_CONTRACT.md
    - reference/materialization_lab/contracts/RENDERING_AND_COMPOSITION_CONTRACT.md
    - reference/materialization_lab/contracts/DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md
    - reference/materialization_lab/contracts/FIXTURE_BOUNDARY_CONTRACT.md
    - reference/materialization_lab/contracts/VALIDATION_HARNESS_CONTRACT.md
  forbidden_sources:
    - reference/agents/
selected_agents:
    - orchestrator
    - planner
    - validation-eval-designer
    - execution-package-designer
    - designer
    - coder-backend
    - coder-frontend
    - validation-runner
    - reviewer
    - finalizer
    - resync
target_surface: fixture-only simulated target surface
template_sources:
    - reference/templates/copilot/agent.md
    - reference/templates/codex/agent.toml
    - reference/templates/codex/config.toml
    - reference/templates/codex/AGENTS.md
lazy_load_expectation:
  demand_type: fullstack-be-fe-happy
  activated_modules:
    - 01_IDENTITY_AND_BOUNDARY
  loaded_modules:
    - 01_IDENTITY_AND_BOUNDARY
  forbidden_modules:
    - 02_DECISION_AND_READING
    - 03_RISK_AND_GATES
  depends_on_verified: true
  decision_trace_required: false
  output_trace_required: true
expected_outputs:
  mode: fixture-only-documentary
  snapshots:
    []
  forbidden_real_paths:
    - .github/**
    - .codex/**
    - AGENTS.md
    - skills/stnl_project_agent_specializer/**
blocked_expectation:
  should_block: false
  block_codes:
    []
target_safety:
  fixture_root: reference/materialization_lab/fixtures/
  simulated_target_paths:
    - projects/fullstack_be_fe_happy/simulated_target/docs/INDEX.md
    - projects/fullstack_be_fe_happy/simulated_target/package.manifest
  forbidden_real_target_paths:
    - .github/**
    - .codex/**
    - AGENTS.md
    - skills/stnl_project_agent_specializer/**
validation:
  responsible_checks:
    - check-fixture-boundary.mjs
    - check-project-scenarios.mjs
  expected_verdict: PASS
---

# Fixture Intent
Fullstack BE + FE happy project package.

# Source Model Evidence
Uses explicit kernel, Senior Profile, template, and materialization contract sources. reference/agents/ is listed only as a forbidden final source.

# Agent Selection Evidence
Selected agents: orchestrator, planner, validation-eval-designer, execution-package-designer, designer, coder-backend, coder-frontend, validation-runner, reviewer, finalizer, resync. Resync is included where this is a future package fixture; invocation remains demand-gated by kernels.

# Lazy Load Evidence
Activated modules are 01_IDENTITY_AND_BOUNDARY and loaded modules are 01_IDENTITY_AND_BOUNDARY. Forbidden modules remain unloaded unless independently triggered.

# Target Safety Evidence
All paths are simulated fixture-relative strings. No target project, GitHub, productive skill, .github/**, .codex/**, or real AGENTS.md write is authorized.

# Expected Result
Expected verdict: PASS. The fixture must pass documentary validation only.
