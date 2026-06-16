---
fixture_id: blocked_cases/write_agents_md_real
fixture_type: blocked_case
status: complete
scenario: real AGENTS md write
purpose: Real AGENTS.md write outside fixture must block
dev_only: true
no_real_write: true
source_model:
  kernel_source:
    - reference/kernel_lab/orchestrator_kernel/
  senior_profile_source:
    - reference/seniorization_lab/orchestrator_profile/SENIOR_AGENT_PROFILE.md
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
target_surface: fixture-only simulated target surface
template_sources:
    - reference/templates/copilot/agent.md
    - reference/templates/codex/agent.toml
    - reference/templates/codex/config.toml
    - reference/templates/codex/AGENTS.md
lazy_load_expectation:
  demand_type: real AGENTS md write
  activated_modules:
    - 01_IDENTITY_AND_BOUNDARY
  loaded_modules:
    - 01_IDENTITY_AND_BOUNDARY
  forbidden_modules:
    - 02_DECISION_AND_READING
    - 03_RISK_AND_GATES
    - 04_HANDOFF_EVIDENCE_AND_OUTPUT
  depends_on_verified: true
  decision_trace_required: false
  output_trace_required: false
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
  should_block: true
  block_codes:
    - BLOCKED_FIXTURE_ESCAPES_DEV_SKILL
    - BLOCKED_TARGET_FILE_MUTATION
target_safety:
  fixture_root: reference/materialization_lab/fixtures/
  simulated_target_paths:
    - blocked_cases/write_agents_md_real/simulated_input.md
  forbidden_real_target_paths:
    - .github/**
    - .codex/**
    - AGENTS.md
    - skills/stnl_project_agent_specializer/**
validation:
  responsible_checks:
    - check-fixture-boundary.mjs
  expected_verdict: BLOCKED
---

# Fixture Intent
Real AGENTS.md write outside fixture must block.

# Source Model Evidence
Uses explicit kernel, Senior Profile, template, and materialization contract sources. reference/agents/ is listed only as a forbidden final source.

# Agent Selection Evidence
Selected agents: orchestrator. Resync is included where this is a future package fixture; invocation remains demand-gated by kernels.

# Lazy Load Evidence
Activated modules are 01_IDENTITY_AND_BOUNDARY and loaded modules are 01_IDENTITY_AND_BOUNDARY. Forbidden modules remain unloaded unless independently triggered.

# Target Safety Evidence
All paths are simulated fixture-relative strings. No target project, GitHub, productive skill, .github/**, .codex/**, or real AGENTS.md write is authorized.

# Expected Result
Expected verdict: BLOCKED. The fixture must block with the declared block codes.
