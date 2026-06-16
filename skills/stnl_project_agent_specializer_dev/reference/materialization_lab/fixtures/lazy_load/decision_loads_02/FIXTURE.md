---
fixture_id: lazy_load/decision_loads_02
fixture_type: lazy_load_positive
status: complete
scenario: material decision load
purpose: Material decision activates modules 01 and 02
dev_only: true
no_real_write: true
source_model:
  kernel_source:
    - reference/kernel_lab/planner_kernel/
  senior_profile_source:
    - reference/seniorization_lab/planner_profile/SENIOR_AGENT_PROFILE.md
  template_source:
    - reference/templates/copilot/agent.md
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
    - planner
target_surface: fixture-only simulated target surface
template_sources:
    - reference/templates/copilot/agent.md
lazy_load_expectation:
  demand_type: material decision load
  activated_modules:
    - 01_IDENTITY_AND_BOUNDARY
    - 02_DECISION_AND_READING
  loaded_modules:
    - 01_IDENTITY_AND_BOUNDARY
    - 02_DECISION_AND_READING
  forbidden_modules:
    - 03_RISK_AND_GATES
    - 04_HANDOFF_EVIDENCE_AND_OUTPUT
  depends_on_verified: true
  decision_trace_required: true
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
  should_block: false
  block_codes:
    []
target_safety:
  fixture_root: reference/materialization_lab/fixtures/
  simulated_target_paths:
    - lazy_load/decision_loads_02/trace.yaml
  forbidden_real_target_paths:
    - .github/**
    - .codex/**
    - AGENTS.md
    - skills/stnl_project_agent_specializer/**
validation:
  responsible_checks:
    - check-fixture-boundary.mjs
    - check-lazy-load-fixtures.mjs
  expected_verdict: PASS
---

# Fixture Intent
Material decision activates modules 01 and 02.

# Source Model Evidence
Uses explicit kernel, Senior Profile, template, and materialization contract sources. reference/agents/ is listed only as a forbidden final source.

# Agent Selection Evidence
Selected agents: planner. Resync is included where this is a future package fixture; invocation remains demand-gated by kernels.

# Lazy Load Evidence
Activated modules are 01_IDENTITY_AND_BOUNDARY, 02_DECISION_AND_READING and loaded modules are 01_IDENTITY_AND_BOUNDARY, 02_DECISION_AND_READING. Forbidden modules remain unloaded unless independently triggered.

# Target Safety Evidence
All paths are simulated fixture-relative strings. No target project, GitHub, productive skill, .github/**, .codex/**, or real AGENTS.md write is authorized.

# Expected Result
Expected verdict: PASS. The fixture must pass documentary validation only.
