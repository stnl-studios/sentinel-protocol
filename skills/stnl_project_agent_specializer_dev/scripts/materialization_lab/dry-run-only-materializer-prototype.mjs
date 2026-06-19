import {
  dryRunOnlyLifecycleSteps,
  explicitTemplateRefs,
  finalSourceRoots,
  materializationContractRefs,
} from "./dry-run-only-materializer-prototype.fixture-model.mjs";

export const allowedPlannedOperations = Object.freeze([
  "CREATE_PLANNED",
  "UPDATE_PLANNED",
  "UNCHANGED_PLANNED",
  "BLOCKED_PLANNED",
]);

export const forbiddenExecutedOperations = Object.freeze([
  "CREATE_EXECUTED",
  "UPDATE_EXECUTED",
  "DELETE_EXECUTED",
  "WRITE_EXECUTED",
]);

export const allowedApprovalStates = Object.freeze([
  "APPROVAL_NOT_REQUESTED",
  "APPROVAL_CONCEPTUALLY_ELIGIBLE",
  "APPROVAL_BLOCKED",
  "APPROVAL_OUT_OF_SCOPE",
]);

const forbiddenPositiveApprovalSemantics = Object.freeze([
  "APPROVED",
  "WRITE_APPROVED",
  "APPROVAL_GRANTED",
  "READY_TO_WRITE",
  "WRITE_UNLOCKED",
  "EXECUTION_APPROVED",
  "MERGE_APPROVED",
]);

const allowedTargets = Object.freeze(["codex", "copilot"]);
const allowedSourceRootSet = new Set(finalSourceRoots);
const allowedTemplateSet = new Set(explicitTemplateRefs);
const requiredContractSet = new Set(materializationContractRefs);
const allowedOperationSet = new Set(allowedPlannedOperations);
const forbiddenOperationSet = new Set(forbiddenExecutedOperations);
const positiveApprovalSet = new Set(forbiddenPositiveApprovalSemantics);

export function runDryRunOnlyMaterializerPrototype(request) {
  const boundaryBlocks = validateDryRunOnlyMaterializerRequest(request);
  const blocked = boundaryBlocks.length > 0;
  const operation = blocked ? "BLOCKED_PLANNED" : request.planned_operation;
  const approvalState = approvalStateFor(request, blocked);
  const noReadNoWriteEvidence = buildNoReadNoWriteEvidence();

  return {
    result_identity: {
      result_kind: "dry_run_materializer_result",
      phase:
        request?.phase ??
        "MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_IMPLEMENTATION",
      lifecycle_steps: [...dryRunOnlyLifecycleSteps],
      result_persistence: "in-memory-only",
      runtime_contract: "none",
    },
    boundary_result: {
      status: blocked ? "BLOCKED" : "PASS",
      fixture_only: true,
      model_only: true,
      in_memory_only: true,
      dev_only: true,
      no_write: true,
      no_target_real: true,
      no_github: true,
      no_productive_skill_mutation: true,
    },
    contract_chain_result: {
      status: blocked ? "BLOCKED" : "PASS",
      contract_refs: blocked ? [] : [...request.contract_refs],
      contract_chain_execution: "not-runtime",
      contracts_preserved: !blocked,
    },
    resolved_source_plan: {
      status: blocked ? "BLOCKED" : "PASS",
      final_source_roots: blocked ? [] : [...request.source_roots],
      reference_agents_final_source: false,
      productive_skill_source: false,
    },
    template_resolution_result: {
      status: blocked ? "BLOCKED" : "PASS",
      explicit_template_refs: blocked ? [] : [...request.template_refs],
      inferred_template_used: false,
      template_inference_allowed: false,
    },
    render_context_plan: {
      status: blocked ? "BLOCKED" : "PASS",
      plan_kind: "conceptual-render-context-plan",
      renderer_created: false,
      renderer_executed: false,
      runtime_loader_created: false,
      scenario_selector_created: false,
    },
    target_adapter_plan: {
      status: blocked ? "BLOCKED" : "PASS",
      plan_kind: "conceptual-target-adapter-plan",
      target_adapter_created: false,
      target_adapter_executed: false,
      target_root_policy: "intent-only",
      planned_output_root_policy: "target-root-relative-only",
      real_target_path_resolved: false,
    },
    output_plan_entries: blocked
      ? []
      : buildPlannedOutputEntries(request, operation),
    dry_run_boundary_result: {
      status: blocked ? "BLOCKED" : "PASS",
      dry_run_required: request?.dry_run_required === true,
      write_execution_policy: "prohibits writing",
      planned_only_operations_preserved: true,
      write_executed: false,
      planned_path_converted_to_real_path: false,
      path_safety_grants_write_permission: false,
      managed_notice_grants_overwrite_permission: false,
      simulated_drift_converted_to_real_drift: false,
    },
    write_approval_protocol_result: {
      status: blocked ? "BLOCKED" : "PASS",
      approval_state: approvalState,
      allowed_approval_states: [...allowedApprovalStates],
      still_no_write: true,
      write_authorized: false,
      approval_token_issued: false,
      approval_registry_created: false,
      signer_created: false,
      real_write_approval_created: false,
      approval_conceptually_eligible_authorizes_write: false,
    },
    dry_run_report_model_ref: {
      ref: "conceptual:dry_run_report_model:v1",
      persistence_policy: "not-persisted",
      persistent_report_written: false,
      report_generator_created: false,
    },
    blocking_summary: {
      status: blocked ? "BLOCKED" : "PASS",
      blocked,
      block_codes: boundaryBlocks.map((block) => block.code),
      blockers: boundaryBlocks,
    },
    no_read_no_write_evidence: noReadNoWriteEvidence,
    non_authorization_summary: buildNonAuthorizationSummary(approvalState),
  };
}

export function validateDryRunOnlyMaterializerRequest(request) {
  const blocks = [];
  const addBlock = (code, field, reason) => {
    if (!blocks.some((block) => block.code === code && block.field === field)) {
      blocks.push({ code, field, reason });
    }
  };

  if (!isRecord(request)) {
    addBlock(
      "BLOCKED_REQUEST_MODEL_INVALID",
      "request",
      "request must be a conceptual in-memory object",
    );
    return blocks;
  }

  validateForbiddenContent(request, addBlock);

  if (request.request_kind !== "dry_run_materializer_request") {
    addBlock(
      "BLOCKED_REQUEST_KIND_INVALID",
      "request_kind",
      "request_kind must be dry_run_materializer_request",
    );
  }
  if (!allowedTargets.includes(request.canonical_target_id)) {
    addBlock(
      "BLOCKED_TARGET_ROOT_INVALID",
      "canonical_target_id",
      "canonical target id must be conceptual codex or copilot",
    );
  }
  if (!Array.isArray(request.agent_ids) || request.agent_ids.length === 0) {
    addBlock(
      "BLOCKED_SOURCE_MODEL_INVALID",
      "agent_ids",
      "at least one fixture agent id is required",
    );
  }
  if (request.dry_run_required !== true) {
    addBlock(
      "BLOCKED_DRY_RUN_REQUIRED",
      "dry_run_required",
      "dry_run_required must be true",
    );
  }
  if (request.write_execution_policy !== "prohibits writing") {
    addBlock(
      "BLOCKED_VALIDATION_WRITE_ATTEMPT",
      "write_execution_policy",
      "write_execution_policy must prohibit writing",
    );
  }
  if (request.target_read_policy !== "prohibits Target real read") {
    addBlock(
      "BLOCKED_TARGET_REAL_READ",
      "target_read_policy",
      "target_read_policy must prohibit Target real read",
    );
  }
  if (request.target_write_policy !== "prohibits Target real write") {
    addBlock(
      "BLOCKED_TARGET_FILE_MUTATION",
      "target_write_policy",
      "target_write_policy must prohibit Target real write",
    );
  }
  if (request.persistent_report_policy !== "prohibits persistent report") {
    addBlock(
      "BLOCKED_SCRIPT_OUTPUT_UNAUTHORIZED",
      "persistent_report_policy",
      "persistent reports are out of scope",
    );
  }
  if (request.approval_policy !== "conceptual/still-no-write only") {
    addBlock(
      "BLOCKED_APPROVAL_POLICY_INVALID",
      "approval_policy",
      "approval policy must remain conceptual and still-no-write",
    );
  }

  validateSources(request.source_roots, addBlock);
  validateTemplates(request, addBlock);
  validateContracts(request.contract_refs, addBlock);
  validatePlannedOperation(request.planned_operation, addBlock);

  return blocks;
}

export function buildNoReadNoWriteEvidence() {
  return {
    target_read_attempted: false,
    target_write_attempted: false,
    filesystem_stat_attempted: false,
    directory_listing_attempted: false,
    file_content_read_attempted: false,
    files_written: [],
    persistent_report_written: false,
    github_write_attempted: false,
    productive_skill_mutation_attempted: false,
    approval_token_issued: false,
    write_executed: false,
    patch_applied: false,
    commit_created: false,
    branch_created: false,
    pull_request_created: false,
  };
}

function validateSources(sourceRoots, addBlock) {
  if (!Array.isArray(sourceRoots) || sourceRoots.length === 0) {
    addBlock(
      "BLOCKED_SOURCE_MODEL_INVALID",
      "source_roots",
      "source_roots must list final documentary roots",
    );
    return;
  }

  for (const sourceRoot of sourceRoots) {
    const normalized = normalizeConceptualPath(sourceRoot);
    if (normalized === "reference/agents" || normalized.startsWith("reference/agents/")) {
      addBlock(
        "BLOCKED_BASE_AGENT_FINAL_DEPENDENCY",
        "source_roots",
        "reference/agents/ cannot be a final source",
      );
      continue;
    }
    if (!allowedSourceRootSet.has(ensureTrailingSlash(normalized))) {
      addBlock(
        "BLOCKED_SOURCE_MODEL_INVALID",
        "source_roots",
        "source root is outside the final source model",
      );
    }
  }
}

function validateTemplates(request, addBlock) {
  if (hasTemplateInferenceSignal(request)) {
    addBlock(
      "BLOCKED_TEMPLATE_INFERRED",
      "template_policy",
      "templates must be explicit and never inferred",
    );
  }

  if (!Array.isArray(request.template_refs) || request.template_refs.length === 0) {
    addBlock(
      "BLOCKED_TEMPLATE_MISSING",
      "template_refs",
      "template_refs must be present and explicit",
    );
    return;
  }

  for (const templateRef of request.template_refs) {
    const normalized = normalizeConceptualPath(templateRef);
    if (!allowedTemplateSet.has(normalized)) {
      addBlock(
        "BLOCKED_TEMPLATE_MISSING",
        "template_refs",
        "template ref must be one of the explicit documentary templates",
      );
    }
  }
}

function validateContracts(contractRefs, addBlock) {
  if (!Array.isArray(contractRefs)) {
    addBlock(
      "BLOCKED_CONTRACT_CHAIN_INVALID",
      "contract_refs",
      "contract_refs must list the preserved contract chain",
    );
    return;
  }

  const refs = new Set(contractRefs.map(normalizeConceptualPath));
  for (const requiredContract of requiredContractSet) {
    if (!refs.has(requiredContract)) {
      addBlock(
        "BLOCKED_CONTRACT_CHAIN_INVALID",
        "contract_refs",
        "required contract ref is missing",
      );
    }
  }
}

function validatePlannedOperation(operation, addBlock) {
  if (forbiddenOperationSet.has(operation) || String(operation).endsWith("_EXECUTED")) {
    addBlock(
      "BLOCKED_EXECUTED_OPERATION_FORBIDDEN",
      "planned_operation",
      "executed operation tokens are forbidden",
    );
    return;
  }
  if (!allowedOperationSet.has(operation)) {
    addBlock(
      "BLOCKED_PLANNED_OPERATION_INVALID",
      "planned_operation",
      "operation must be planned-only",
    );
  }
}

function validateForbiddenContent(request, addBlock) {
  for (const item of flattenRequestValues(request)) {
    const key = item.path.at(-1) ?? "";
    const pathText = item.path.join(".").toLowerCase();
    const value = typeof item.value === "string" ? item.value : "";
    const upperValue = value.toUpperCase();
    const lowerKey = key.toLowerCase();
    const lowerValue = value.toLowerCase();

    if (isAbsoluteHostPath(value) || value.includes("..")) {
      addBlock("BLOCKED_PATH_UNSAFE", key, "absolute and traversal paths are forbidden");
    }
    if (
      lowerValue.includes("skills/stnl_project_agent_specializer/") ||
      lowerValue.includes("target_real_path") ||
      pathText.includes("real_target_path") ||
      pathText.includes("target_absolute_path") ||
      lowerKey === "real_target_path" ||
      lowerKey === "target_absolute_path"
    ) {
      addBlock("BLOCKED_PATH_UNSAFE", key, "real Target paths are forbidden");
    }
    if (
      pathText.includes("approval_token") ||
      lowerKey === "approval_token" ||
      lowerValue.includes("approval_token")
    ) {
      addBlock("BLOCKED_APPROVAL_TOKEN", key, "approval tokens are forbidden");
    }
    if (
      pathText.includes("write_execution_id") ||
      lowerKey === "write_execution_id" ||
      lowerValue.includes("write_execution_id")
    ) {
      addBlock(
        "BLOCKED_WRITE_EXECUTION_ID",
        key,
        "write execution ids are forbidden",
      );
    }
    if (
      pathText.includes("runtime_payload") ||
      pathText.includes("mandatory_runtime_payload") ||
      lowerKey === "runtime_payload" ||
      lowerKey === "mandatory_runtime_payload" ||
      lowerValue.includes("mandatory runtime payload")
    ) {
      addBlock(
        "BLOCKED_RUNTIME_PAYLOAD_REQUIRED",
        key,
        "runtime payload requirements are forbidden",
      );
    }
    if (
      pathText.includes("generated_file") ||
      pathText.includes("materialized_output") ||
      lowerKey === "generated_file" ||
      lowerKey === "materialized_output" ||
      lowerValue.includes("generated file") ||
      lowerValue.includes("materialized output")
    ) {
      addBlock(
        "BLOCKED_GENERATED_OUTPUT_REQUESTED",
        key,
        "generated and materialized outputs are forbidden",
      );
    }
    if (
      pathText.includes("persistent_report_path") ||
      lowerKey === "persistent_report_path" ||
      lowerValue.includes("persistent_report_path")
    ) {
      addBlock(
        "BLOCKED_SCRIPT_OUTPUT_UNAUTHORIZED",
        key,
        "persistent report paths are forbidden",
      );
    }
    if (
      pathText.includes("cli_argument_requirement") ||
      lowerKey === "cli_argument_requirement" ||
      lowerValue.includes("cli argument")
    ) {
      addBlock("BLOCKED_RUNTIME_PAYLOAD_REQUIRED", key, "CLI requirements are forbidden");
    }
    if (
      positiveApprovalSet.has(upperValue) ||
      forbiddenPositiveApprovalSemantics.some((term) => upperValue.includes(term))
    ) {
      addBlock(
        "BLOCKED_APPROVAL_POSITIVE_SEMANTICS",
        key,
        "positive write approval semantics are forbidden",
      );
    }
    if (forbiddenOperationSet.has(upperValue) || upperValue.endsWith("_EXECUTED")) {
      addBlock(
        "BLOCKED_EXECUTED_OPERATION_FORBIDDEN",
        key,
        "executed operation tokens are forbidden",
      );
    }
  }

  for (const key of [
    "convert_planned_to_executed",
    "path_safety_grants_write_permission",
    "managed_notice_grants_overwrite_permission",
    "simulated_drift_requires_real_drift",
  ]) {
    if (request[key] === true) {
      addBlock(
        "BLOCKED_DRY_RUN_REQUIRED",
        key,
        "dry-run concepts cannot be converted into write execution",
      );
    }
  }
}

function buildPlannedOutputEntries(request, operation) {
  return request.agent_ids.map((agentId) => ({
    target_id: request.canonical_target_id,
    agent_id: agentId,
    output_shape:
      request.canonical_target_id === "copilot"
        ? ".github/agents/*.agent.md"
        : ".codex/agents/*.toml",
    planned_path:
      request.canonical_target_id === "copilot"
        ? `.github/agents/${agentId}.agent.md`
        : `.codex/agents/${agentId}.toml`,
    template_source:
      request.canonical_target_id === "copilot"
        ? "reference/templates/copilot/agent.md"
        : "reference/templates/codex/agent.toml",
    kernel_source: `reference/kernel_lab/${agentId.replaceAll("-", "_")}_kernel/`,
    senior_profile_source: `reference/seniorization_lab/${agentId.replaceAll(
      "-",
      "_",
    )}_profile/SENIOR_AGENT_PROFILE.md`,
    operation,
    managed_artifact: "SIMULATED_MANAGED_STATUS_ONLY",
    existing_file_state: "TARGET_STATE_UNAVAILABLE_NO_TARGET_READ",
    drift_status: "DRIFT_NOT_CALCULATED_NO_TARGET_READ",
    blocking_status: "NOT_BLOCKED",
    block_code: null,
    write_status: "NOT_AUTHORIZED_STILL_NO_WRITE",
  }));
}

function buildNonAuthorizationSummary(approvalState) {
  return {
    materialization_authorized: false,
    target_read_authorized: false,
    target_write_authorized: false,
    filesystem_access_to_target_authorized: false,
    github_write_authorized: false,
    productive_skill_mutation_authorized: false,
    writer_created: false,
    renderer_created: false,
    loader_created: false,
    scenario_selector_created: false,
    target_adapter_created: false,
    write_approval_created: false,
    approval_state: approvalState,
    approval_state_authorizes_write: false,
    approval_conceptually_eligible_authorizes_write: false,
  };
}

function approvalStateFor(request, blocked) {
  if (blocked) {
    return "APPROVAL_BLOCKED";
  }
  if (request?.approval_requested === true) {
    return "APPROVAL_CONCEPTUALLY_ELIGIBLE";
  }
  return "APPROVAL_NOT_REQUESTED";
}

function hasTemplateInferenceSignal(value) {
  for (const item of flattenRequestValues(value)) {
    const key = item.path.at(-1) ?? "";
    const lowerKey = key.toLowerCase();
    if (item.value === true && lowerKey.includes("inference")) {
      return true;
    }
    if (typeof item.value === "string") {
      const lowerValue = item.value.toLowerCase();
      if (
        lowerValue.includes("infer") ||
        lowerValue.includes("nearby file") ||
        lowerValue.includes("legacy target") ||
        lowerValue.includes("implicit")
      ) {
        return true;
      }
    }
  }
  return value?.template_policy?.explicit_only === false;
}

function flattenRequestValues(value, path = []) {
  if (!isRecord(value) && !Array.isArray(value)) {
    return [{ path, value }];
  }
  const entries = Array.isArray(value)
    ? value.map((entry, index) => [String(index), entry])
    : Object.entries(value);
  return entries.flatMap(([key, entry]) => flattenRequestValues(entry, [...path, key]));
}

function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeConceptualPath(value) {
  return String(value).replaceAll("\\", "/").replace(/\/+/g, "/");
}

function ensureTrailingSlash(value) {
  return value.endsWith("/") ? value : `${value}/`;
}

function isAbsoluteHostPath(value) {
  return (
    typeof value === "string" &&
    (value.startsWith("/") || /^[A-Za-z]:[\\/]/.test(value) || value.startsWith("file://"))
  );
}
