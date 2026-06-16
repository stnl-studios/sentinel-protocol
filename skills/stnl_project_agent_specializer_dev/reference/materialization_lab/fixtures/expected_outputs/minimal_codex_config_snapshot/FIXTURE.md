---
fixture_id: expected_outputs/minimal_codex_config_snapshot
fixture_type: expected_output_snapshot
status: complete
scenario: minimal codex config snapshot
purpose: Minimal documentary Codex config snapshot policy fixture
dev_only: true
no_real_write: true
source_model:
  kernel_source:
    - reference/kernel_lab/orchestrator_kernel/
  senior_profile_source:
    - reference/seniorization_lab/orchestrator_profile/SENIOR_AGENT_PROFILE.md
  template_source:
    - reference/templates/codex/config.toml
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
target_surface: fixture-only expected output snapshot surface
template_sources:
    - reference/templates/codex/config.toml
lazy_load_expectation:
  demand_type: minimal codex config snapshot
  activated_modules:
    - 01_IDENTITY_AND_BOUNDARY
    - 04_HANDOFF_EVIDENCE_AND_OUTPUT
  loaded_modules:
    - 01_IDENTITY_AND_BOUNDARY
    - 04_HANDOFF_EVIDENCE_AND_OUTPUT
  forbidden_modules:
    - 02_DECISION_AND_READING
    - 03_RISK_AND_GATES
  depends_on_verified: true
  decision_trace_required: false
  output_trace_required: true
expected_outputs:
  mode: fixture-only-documentary
  snapshots:
    - expected_outputs/minimal_codex_config_snapshot/.codex/config.toml
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
    - expected_outputs/minimal_codex_config_snapshot/.codex/config.toml
  forbidden_real_target_paths:
    - .github/**
    - .codex/**
    - AGENTS.md
    - skills/stnl_project_agent_specializer/**
validation:
  responsible_checks:
    - check-fixture-boundary.mjs
  expected_verdict: PASS
---

# Fixture Intent
Minimal documentary Codex config snapshot policy fixture.

# Source Model Evidence
Uses explicit kernel, Senior Profile, template, and materialization contract sources. reference/agents/ is listed only as a forbidden final source.

# Agent Selection Evidence
Selected agents: orchestrator. Resync is included where this is a future package fixture; invocation remains demand-gated by kernels.

# Lazy Load Evidence
Activated modules are 01_IDENTITY_AND_BOUNDARY, 04_HANDOFF_EVIDENCE_AND_OUTPUT and loaded modules are 01_IDENTITY_AND_BOUNDARY, 04_HANDOFF_EVIDENCE_AND_OUTPUT. Forbidden modules remain unloaded unless independently triggered.

# Target Safety Evidence
All paths are simulated fixture-relative strings. No target project, GitHub, productive skill, .github/**, .codex/**, or real AGENTS.md write is authorized.

# Snapshot Policy Evidence
Expected managed notice and placeholder coverage are policy-level expectations from the explicit template source. This fixture does not copy or render the template.

# Expected Result
Expected verdict: PASS. The fixture must pass documentary validation only.
