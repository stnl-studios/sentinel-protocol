export const dryRunOnlyLifecycleSteps = Object.freeze([
  "RECEIVE_DRY_RUN_REQUEST",
  "VALIDATE_REQUEST_BOUNDARY",
  "VALIDATE_CONTRACT_CHAIN",
  "RESOLVE_FINAL_SOURCES",
  "VALIDATE_EXPLICIT_TEMPLATES",
  "BUILD_RENDER_CONTEXT_PLAN",
  "BUILD_TARGET_ADAPTER_PLAN",
  "BUILD_PLANNED_OUTPUT_ENTRIES",
  "EVALUATE_DRY_RUN_AND_WRITE_BOUNDARY",
  "EVALUATE_WRITE_APPROVAL_PROTOCOL_AS_STILL_NO_WRITE",
  "BUILD_DRY_RUN_REPORT_MODEL",
  "RETURN_DRY_RUN_ONLY_RESULT",
]);

export const finalSourceRoots = Object.freeze([
  "reference/kernel_lab/",
  "reference/seniorization_lab/",
  "reference/templates/",
  "reference/materialization_lab/contracts/",
]);

export const explicitTemplateRefs = Object.freeze([
  "reference/templates/copilot/agent.md",
  "reference/templates/codex/agent.toml",
  "reference/templates/codex/config.toml",
  "reference/templates/codex/AGENTS.md",
]);

export const materializationContractRefs = Object.freeze([
  "reference/materialization_lab/contracts/SOURCE_MODEL_CONTRACT.md",
  "reference/materialization_lab/contracts/TARGETS_CONTRACT.md",
  "reference/materialization_lab/contracts/TEMPLATES_AND_OUTPUTS_CONTRACT.md",
  "reference/materialization_lab/contracts/RENDERING_AND_COMPOSITION_CONTRACT.md",
  "reference/materialization_lab/contracts/DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md",
  "reference/materialization_lab/contracts/DRY_RUN_REPORT_MODEL_CONTRACT.md",
  "reference/materialization_lab/contracts/MATERIALIZER_INTERFACE_CONTRACT.md",
  "reference/materialization_lab/contracts/TARGET_ADAPTER_CONTRACT.md",
  "reference/materialization_lab/contracts/WRITE_APPROVAL_PROTOCOL_CONTRACT.md",
  "reference/materialization_lab/contracts/DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_CONTRACT.md",
  "reference/materialization_lab/contracts/VALIDATION_HARNESS_CONTRACT.md",
  "reference/materialization_lab/contracts/FIXTURE_BOUNDARY_CONTRACT.md",
  "reference/materialization_lab/contracts/VALIDATION_HARNESS_AGGREGATOR_CONTRACT.md",
  "reference/materialization_lab/contracts/IMPLEMENTATION_BOUNDARY_CONTRACT.md",
]);

export const fixtureAgentIds = Object.freeze([
  "orchestrator",
  "planner",
  "coder-backend",
]);

export function createDryRunOnlyFixtureRequest(overrides = {}) {
  return {
    request_kind: "dry_run_materializer_request",
    phase: "MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_IMPLEMENTATION",
    canonical_target_id: "codex",
    legacy_target_terms: [],
    agent_ids: [...fixtureAgentIds],
    source_roots: [...finalSourceRoots],
    template_refs: [
      "reference/templates/codex/agent.toml",
      "reference/templates/codex/config.toml",
      "reference/templates/codex/AGENTS.md",
    ],
    contract_refs: [...materializationContractRefs],
    target_adapter_request_ref: "conceptual:target_adapter_request:fixture-only",
    materializer_interface_request_ref:
      "conceptual:materializer_interface_request:fixture-only",
    dry_run_required: true,
    write_execution_policy: "prohibits writing",
    target_read_policy: "prohibits Target real read",
    target_write_policy: "prohibits Target real write",
    persistent_report_policy: "prohibits persistent report",
    approval_policy: "conceptual/still-no-write only",
    approval_requested: true,
    template_policy: {
      explicit_only: true,
      inference_allowed: false,
    },
    render_context_policy: {
      mode: "conceptual-plan-only",
      renderer_execution: "prohibited",
    },
    target_adapter_policy: {
      mode: "conceptual-plan-only",
      real_adapter_execution: "prohibited",
    },
    dry_run_policy: {
      result_persistence: "in-memory-only",
      planned_operations_only: true,
    },
    write_approval_policy: {
      state_vocabulary: "conceptual-still-no-write-only",
      token_issuance: "prohibited",
    },
    report_model_policy: {
      dry_run_report_model_ref: "conceptual:dry_run_report_model:v1",
      persistent_report: "prohibited",
    },
    boundary_policy: {
      fixture_only: true,
      model_only: true,
      in_memory_only: true,
      no_target_real: true,
      no_write: true,
      no_github: true,
      no_productive_skill_mutation: true,
    },
    planned_operation: "CREATE_PLANNED",
    ...overrides,
  };
}
