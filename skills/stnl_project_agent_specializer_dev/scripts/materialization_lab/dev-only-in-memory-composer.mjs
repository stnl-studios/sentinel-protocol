export const allowedFinalSourceRoots = Object.freeze([
  "reference/kernel_lab/",
  "reference/seniorization_lab/",
  "reference/templates/",
  "reference/materialization_lab/contracts/",
]);

export const allowedExplicitTemplateRefs = Object.freeze([
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

const forbiddenRealOperations = Object.freeze([
  "CREATE_REAL",
  "UPDATE_REAL",
  "DELETE_REAL",
  "WRITE_REAL",
]);

const allowedTargetKinds = Object.freeze(["codex", "copilot"]);
const allowedFinalSourceRootSet = new Set(allowedFinalSourceRoots);
const allowedExplicitTemplateRefSet = new Set(allowedExplicitTemplateRefs);
const materializationContractRefSet = new Set(materializationContractRefs);
const allowedPlannedOperationSet = new Set(allowedPlannedOperations);
const forbiddenExecutedOperationSet = new Set(forbiddenExecutedOperations);
const forbiddenRealOperationSet = new Set(forbiddenRealOperations);

const forbiddenPositiveApprovalSemantics = Object.freeze([
  "APPROVED",
  "WRITE_APPROVED",
  "APPROVAL_GRANTED",
  "READY_TO_WRITE",
  "WRITE_UNLOCKED",
  "EXECUTION_APPROVED",
  "MERGE_APPROVED",
]);

const normalizedPositiveApprovalSet = new Set(
  forbiddenPositiveApprovalSemantics.map(normalizeApprovalTerm),
);

const requiredRequestFields = Object.freeze([
  "request_identity",
  "target_agent_id",
  "target_kind",
  "source_refs",
  "kernel_module_refs",
  "senior_profile_refs",
  "template_refs",
  "render_context_plan_ref",
  "target_output_plan_ref",
  "dry_run_boundary_ref",
  "write_approval_boundary_ref",
  "contract_refs",
]);

const forbiddenSignalRules = Object.freeze([
  {
    code: "BLOCKED_PATH_UNSAFE",
    aliases: [
      "target_real_path",
      "real_target_path",
      "target_absolute_path",
      "host_absolute_path",
      "real_target_root",
      "target_root_real",
    ],
    reason: "real Target and host absolute paths are forbidden",
  },
  {
    code: "BLOCKED_TARGET_REAL_READ",
    aliases: [
      "filesystem_read_target",
      "target_read_real",
      "real_target_read",
      "file_content_read_request",
      "read_target_filesystem",
      "target_file_content_read",
    ],
    reason: "Target real read and file content reads are forbidden",
  },
  {
    code: "BLOCKED_TARGET_FILE_MUTATION",
    aliases: [
      "filesystem_write_target",
      "target_write_real",
      "real_target_write",
      "directory_creation_request",
      "file_creation_request",
      "filesystem_write_request",
      "write_target_filesystem",
    ],
    reason: "Target real write and file creation are forbidden",
  },
  {
    code: "BLOCKED_PATH_UNSAFE",
    aliases: [
      "filesystem_stat_request",
      "directory_listing_request",
      "target_directory_listing",
      "target_filesystem_stat",
      "drift_calculation_by_reading_target",
    ],
    reason: "filesystem stat and directory listing against Target are forbidden",
  },
  {
    code: "BLOCKED_GITHUB_WRITE",
    aliases: [
      "github_write_target",
      "github_write_result",
      "pull_request_url",
      "pull_request_create",
      "create_pull_request",
      "commit_hash",
      "branch_name",
      "github_client",
      "octokit",
    ],
    reason: "GitHub write surfaces are forbidden",
  },
  {
    code: "BLOCKED_APPROVAL_TOKEN",
    aliases: [
      "approval_token",
      "approval_signature",
      "approval_registry",
      "approval_registry_entry",
      "approval_signer",
      "signer_created",
      "write_approval_token",
    ],
    reason: "approval token, signature, registry, and signer signals are forbidden",
  },
  {
    code: "BLOCKED_SCRIPT_OUTPUT_UNAUTHORIZED",
    aliases: [
      "persisted_report_path",
      "persistent_report_path",
      "report_file_path",
      "stdout_capture",
      "stdout_capture_path",
      "log_file_path",
      "cache_path",
      "temp_output_path",
      "golden_file_path",
      "snapshot_path",
    ],
    reason: "persistent reports, logs, caches, snapshots, and temp outputs are forbidden",
  },
  {
    code: "BLOCKED_GENERATED_OUTPUT_REQUESTED",
    aliases: [
      "generated_output_real_path",
      "generated_file",
      "generated_file_real",
      "generated_output",
      "materialized_file",
      "materialized_output",
      "materialized_output_real",
      "materialized_output_path",
    ],
    reason: "generated and materialized outputs are forbidden",
  },
  {
    code: "BLOCKED_RUNTIME_MATERIALIZER_CREATED",
    aliases: [
      "runtime_command_payload",
      "runtime_payload",
      "cli_execution_payload",
      "cli_argument_payload",
      "materializer_execution_id",
      "runtime_materializer",
      "loader_payload",
      "loader_created",
      "scenario_selector",
      "target_adapter_payload",
      "target_adapter_real_payload",
      "write_approval_real_payload",
      "real_write_approval_payload",
    ],
    reason: "runtime, CLI, loader, Target Adapter, and real Write Approval payloads are forbidden",
  },
  {
    code: "BLOCKED_UNSAFE_RENDER",
    aliases: [
      "renderer_payload",
      "renderer_output",
      "rendered_content",
      "rendering_execution",
      "apply_template_to_target",
      "render_final_content",
    ],
    reason: "renderer execution and rendered output are forbidden",
  },
  {
    code: "BLOCKED_VALIDATION_WRITE_ATTEMPT",
    aliases: [
      "writer_payload",
      "writer_output",
      "write_execution_id",
      "patch_application",
      "diff_application",
      "apply_patch_to_target",
      "patch_payload",
      "diff_payload",
    ],
    reason: "writer, patch, diff, and write execution signals are forbidden",
  },
  {
    code: "BLOCKED_PRODUCTIVE_SKILL_MUTATION",
    aliases: [
      "productive_skill_path",
      "productive_skill_mutation",
      "productive_skill_template_source",
      "skills/stnl_project_agent_specializer/",
    ],
    reason: "productive skill inspection or mutation is out of scope",
  },
  {
    code: "BLOCKED_BASE_AGENT_FINAL_DEPENDENCY",
    aliases: [
      "reference_agents_final_source",
      "reference_agents_template_source",
      "reference/agents/",
      "reference/agents",
    ],
    reason: "reference/agents cannot be a final source or template source",
  },
  {
    code: "BLOCKED_TEMPLATE_INFERRED",
    aliases: [
      "inferred_template_request",
      "template_inference",
      "template_inference_request",
      "implicit_template_fallback",
      "template_selection_by_output_path",
      "template_selection_by_target_agent",
      "legacy_agent_template_source",
      "nearby_file_template_source",
      "nearby_file",
    ],
    reason: "templates must be explicit and never inferred",
  },
  {
    code: "BLOCKED_SOURCE_MODEL_DEPRECATED_FIELD",
    aliases: ["base_agent_source"],
    reason: "base_agent_source is deprecated and cannot be a final source",
  },
]);

const contractGapSignals = Object.freeze([
  "unmapped_contract_gap",
  "unknown_boundary_gap",
  "unknown_boundary_surface",
  "requires_new_contract",
  "new_contract_required",
  "contract_update_needed",
  "contract_update_needs_separate_decision",
]);

export function composeDevOnlyInMemoryMaterialization(request) {
  const compositionBoundaryResult = validateComposerRequestBoundary(request);
  const sourceChainComposition = composeSourceChain(request);
  const templateRefComposition = composeTemplateRefs(request);
  const renderContextComposition = composeRenderContext(request);
  const targetOutputPlanComposition = composeTargetOutputPlan(request);
  const blocked = compositionBoundaryResult.blocked;
  const approvalState = approvalStateFor(request, blocked);
  const noReadNoWriteEvidence = buildNoReadNoWriteEvidence();
  const nonAuthorizationSummary = buildNonAuthorizationSummary(approvalState);

  const plannedAgentMaterializationModel = buildPlannedAgentMaterializationModel({
    request,
    blocked,
    block_codes: compositionBoundaryResult.block_codes,
    source_chain_composition: sourceChainComposition,
    template_ref_composition: templateRefComposition,
    render_context_composition: renderContextComposition,
    target_output_plan_composition: targetOutputPlanComposition,
  });

  return {
    composer_result_identity: {
      result_kind: "dev_only_in_memory_materialization_composer_result",
      phase: "MATERIALIZATION_DEV_ONLY_IN_MEMORY_COMPOSER_IMPLEMENTATION",
      composer_name: "DEV_ONLY_IN_MEMORY_MATERIALIZATION_COMPOSER",
      result_persistence: "in-memory-only",
      runtime_contract: "none",
      stdout_contract: "none",
      cli_contract: "none",
    },
    composition_boundary_result: compositionBoundaryResult,
    source_chain_composition: sourceChainComposition,
    template_ref_composition: templateRefComposition,
    render_context_composition: renderContextComposition,
    target_output_plan_composition: targetOutputPlanComposition,
    planned_agent_materialization_model: plannedAgentMaterializationModel,
    dry_run_boundary_result: {
      status: blocked ? "BLOCKED" : "PASS",
      dry_run_only: true,
      planned_only_operations_preserved: true,
      write_execution_policy: "prohibits writing",
      write_executed: false,
      patch_applied: false,
      target_real_access_permitted: false,
      planned_path_converted_to_real_path: false,
      persistent_report_written: false,
    },
    write_approval_non_authorization_result: {
      status: blocked ? "BLOCKED" : "PASS",
      approval_state: approvalState,
      still_no_write: true,
      write_authorized: false,
      approval_token_issued: false,
      approval_registry_created: false,
      approval_signature_issued: false,
      signer_created: false,
      real_write_approval_created: false,
      conceptual_eligibility_authorizes_write: false,
    },
    no_read_no_write_evidence: noReadNoWriteEvidence,
    blocking_summary: {
      status: blocked ? "BLOCKED" : "PASS",
      blocked,
      block_codes: [...compositionBoundaryResult.block_codes],
      blockers: [...compositionBoundaryResult.blockers],
    },
    non_authorization_summary: nonAuthorizationSummary,
    audit_expectation_summary: {
      expected_next_phase:
        "MATERIALIZATION_DEV_ONLY_IN_MEMORY_COMPOSER_IMPLEMENTATION_AUDIT",
      expected_audit_mode:
        "read-only/audit-only/no-write/no-fix/no-patch/no-implementation",
      manual_local_dev_only: true,
      pure_functions_only: true,
      in_memory_only: true,
      dry_run_only: true,
      still_no_write: true,
      outside_aggregator: true,
      official_check: false,
      checker_created: false,
      aggregator_child_registered: false,
      contracts_changed: false,
      templates_changed: false,
      fixtures_changed: false,
      productive_skill_touched: false,
    },
  };
}

export function validateComposerRequestBoundary(request) {
  const { blocks, addBlock } = createBlockCollector();

  if (!isRecord(request)) {
    addBlock(
      "BLOCKED_REQUEST_MODEL_INVALID",
      "request",
      "request must be a conceptual in-memory object",
    );
    return buildBoundaryResult(blocks);
  }

  validateForbiddenSignals(request, addBlock);
  validateRequiredRequestFields(request, addBlock);
  validateTargetIdentity(request, addBlock);
  validateSourceRefArray(request.source_refs, "source_refs", addBlock);
  validateSourceRefArray(
    request.kernel_module_refs,
    "kernel_module_refs",
    addBlock,
    "reference/kernel_lab/",
  );
  validateSourceRefArray(
    request.senior_profile_refs,
    "senior_profile_refs",
    addBlock,
    "reference/seniorization_lab/",
  );
  validateTemplateRefArray(request.template_refs, addBlock);
  validateContractRefs(request.contract_refs, addBlock);
  validateTargetOutputEntries(request.planned_output_entries, addBlock);
  validateTargetOutputEntries(request.target_output_entries, addBlock);

  return buildBoundaryResult(blocks);
}

export function composeSourceChain(request) {
  const { blocks, addBlock } = createBlockCollector();

  if (!isRecord(request)) {
    addBlock(
      "BLOCKED_REQUEST_MODEL_INVALID",
      "request",
      "request must be a conceptual in-memory object",
    );
  } else {
    validateSourceRefArray(request.source_refs, "source_refs", addBlock);
    validateSourceRefArray(
      request.kernel_module_refs,
      "kernel_module_refs",
      addBlock,
      "reference/kernel_lab/",
    );
    validateSourceRefArray(
      request.senior_profile_refs,
      "senior_profile_refs",
      addBlock,
      "reference/seniorization_lab/",
    );
    validateContractRefs(request.contract_refs, addBlock);
  }

  const blocked = blocks.length > 0;

  return {
    status: blocked ? "BLOCKED" : "PASS",
    source_chain_kind:
      "kernel_source+senior_profile_source+template_source+materialization_contract_sources",
    allowed_final_source_roots: [...allowedFinalSourceRoots],
    source_refs: acceptedSourceRefs(request?.source_refs),
    kernel_module_refs: acceptedSourceRefs(
      request?.kernel_module_refs,
      "reference/kernel_lab/",
    ),
    senior_profile_refs: acceptedSourceRefs(
      request?.senior_profile_refs,
      "reference/seniorization_lab/",
    ),
    materialization_contract_refs: acceptedContractRefs(request?.contract_refs),
    reference_agents_final_source: false,
    productive_skill_source: false,
    source_files_read: false,
    inferred_source_used: false,
    historical_snapshot_source_used: false,
    blockers: [...blocks],
  };
}

export function composeTemplateRefs(request) {
  const { blocks, addBlock } = createBlockCollector();

  if (!isRecord(request)) {
    addBlock(
      "BLOCKED_REQUEST_MODEL_INVALID",
      "request",
      "request must be a conceptual in-memory object",
    );
  } else {
    validateTemplateRefArray(request.template_refs, addBlock);
  }

  const blocked = blocks.length > 0;

  return {
    status: blocked ? "BLOCKED" : "PASS",
    explicit_template_required: true,
    explicit_template_refs: acceptedTemplateRefs(request?.template_refs),
    allowed_explicit_template_refs: [...allowedExplicitTemplateRefs],
    inferred_template_used: false,
    implicit_template_fallback_used: false,
    template_selected_by_output_path: false,
    template_selected_by_target_agent: false,
    template_created: false,
    template_mutated: false,
    blockers: [...blocks],
  };
}

export function composeRenderContext(request) {
  const { blocks, addBlock } = createBlockCollector();

  if (!isRecord(request)) {
    addBlock(
      "BLOCKED_REQUEST_MODEL_INVALID",
      "request",
      "request must be a conceptual in-memory object",
    );
  } else {
    validateConceptualRef(
      request.render_context_plan_ref,
      "render_context_plan_ref",
      addBlock,
    );
    validateRenderSpecificSignals(request, addBlock);
  }

  const blocked = blocks.length > 0;

  return {
    status: blocked ? "BLOCKED" : "PASS",
    render_context_plan_ref: conceptualRefOrNull(request?.render_context_plan_ref),
    composition_kind: "render-context-composition-only",
    rendering_execution: "not-executed",
    renderer_created: false,
    renderer_executed: false,
    rendered_content_created: false,
    rendered_content_persisted: false,
    template_applied_to_real_target: false,
    placeholder_coverage_expectation: "conceptual-only",
    escaping_expectation: "conceptual-only",
    composition_conflict_expectation: "block-if-detected",
    blockers: [...blocks],
  };
}

export function composeTargetOutputPlan(request) {
  const { blocks, addBlock } = createBlockCollector();

  if (!isRecord(request)) {
    addBlock(
      "BLOCKED_REQUEST_MODEL_INVALID",
      "request",
      "request must be a conceptual in-memory object",
    );
  } else {
    validateTargetIdentity(request, addBlock);
    validateConceptualRef(
      request.target_output_plan_ref,
      "target_output_plan_ref",
      addBlock,
    );
    validateTargetOutputEntries(request.planned_output_entries, addBlock);
    validateTargetOutputEntries(request.target_output_entries, addBlock);
  }

  const blocked = blocks.length > 0;

  return {
    status: blocked ? "BLOCKED" : "PASS",
    target_output_plan_ref: conceptualRefOrNull(request?.target_output_plan_ref),
    conceptual_target_kind: allowedTargetKindOrNull(request?.target_kind),
    canonical_target_id: allowedTargetKindOrNull(request?.target_kind),
    target_agent_id: blocked ? null : stringOrNull(request?.target_agent_id),
    target_root_policy: "conceptual-target-root-only",
    planned_output_root_policy: "target-root-relative-only",
    real_target_path_resolved: false,
    filesystem_stat_executed: false,
    directory_listing_executed: false,
    file_content_read_executed: false,
    filesystem_write_executed: false,
    planned_output_entries: blocked ? [] : plannedOutputEntriesFrom(request),
    blockers: [...blocks],
  };
}

export function buildPlannedAgentMaterializationModel(parts) {
  const blocked = Boolean(parts?.blocked);

  if (blocked) {
    return {
      status: "BLOCKED",
      model_kind: "planned_agent_materialization_model",
      composition_withheld: true,
      block_codes: Array.isArray(parts?.block_codes) ? [...parts.block_codes] : [],
      materialization_execution: "not-executed",
      rendering_execution: "not-executed",
      writer_execution: "not-created",
      target_real_access: "not-attempted",
      write_authorization: "not-authorized-still-no-write",
    };
  }

  const request = parts?.request;
  const sourceChainComposition = parts?.source_chain_composition ?? {};
  const templateRefComposition = parts?.template_ref_composition ?? {};
  const renderContextComposition = parts?.render_context_composition ?? {};
  const targetOutputPlanComposition = parts?.target_output_plan_composition ?? {};

  return {
    status: "ACCEPTED",
    model_kind: "planned_agent_materialization_model",
    model_persistence: "in-memory-only",
    request_identity: conceptualRefOrNull(request?.request_identity),
    target_agent_id: stringOrNull(request?.target_agent_id),
    conceptual_target_kind: allowedTargetKindOrNull(request?.target_kind),
    source_chain_refs: {
      source_refs: [...(sourceChainComposition.source_refs ?? [])],
      kernel_module_refs: [...(sourceChainComposition.kernel_module_refs ?? [])],
      senior_profile_refs: [...(sourceChainComposition.senior_profile_refs ?? [])],
      template_refs: [...(templateRefComposition.explicit_template_refs ?? [])],
      materialization_contract_refs: [
        ...(sourceChainComposition.materialization_contract_refs ?? []),
      ],
    },
    render_context_plan_ref: renderContextComposition.render_context_plan_ref,
    target_output_plan_ref: targetOutputPlanComposition.target_output_plan_ref,
    planned_output_entries: [
      ...(targetOutputPlanComposition.planned_output_entries ?? []),
    ],
    dry_run_boundary_ref: conceptualRefOrNull(request?.dry_run_boundary_ref),
    write_approval_boundary_ref: conceptualRefOrNull(
      request?.write_approval_boundary_ref,
    ),
    dry_run_only: true,
    still_no_write: true,
    materialization_execution: "not-executed",
    rendering_execution: "not-executed",
    writer_execution: "not-created",
    target_real_access: "not-attempted",
    write_authorization: "not-authorized-still-no-write",
  };
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

export function buildNonAuthorizationSummary(
  approvalState = "APPROVAL_NOT_REQUESTED",
) {
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
    approval_token_issued: false,
    approval_registry_created: false,
    approval_signature_issued: false,
    signer_created: false,
    persistent_report_authorized: false,
    generated_content_authorized: false,
    materialized_content_authorized: false,
    patch_or_diff_application_authorized: false,
    commit_authorized: false,
    branch_authorized: false,
    pull_request_authorized: false,
    approval_state: approvalState,
    approval_state_authorizes_write: false,
    conceptual_eligibility_authorizes_write: false,
    eligibility_policy: "still-no-write",
    non_authorized_capabilities: [
      "real materialization",
      "real Target read/write",
      "filesystem access against real Target",
      "writer creation",
      "renderer creation",
      "loader creation",
      "scenario selector creation",
      "real Target Adapter creation",
      "real Write Approval creation",
      "approval token",
      "approval registry",
      "approval signature",
      "signer",
      "persistent report",
      "generated output",
      "materialized output",
      "patch/diff application",
      "GitHub write",
      "productive skill mutation",
      "commit",
      "branch",
      "pull request",
    ],
  };
}

function validateRequiredRequestFields(request, addBlock) {
  for (const field of requiredRequestFields) {
    if (!hasConceptualValue(request[field])) {
      addBlock(
        "BLOCKED_IMPLEMENTATION_SCOPE_INVALID",
        field,
        `${field} is required as a conceptual in-memory input`,
      );
    }
  }
}

function validateTargetIdentity(request, addBlock) {
  if (!isNonEmptyString(request?.target_agent_id)) {
    addBlock(
      "BLOCKED_SOURCE_MODEL_INVALID",
      "target_agent_id",
      "target_agent_id must be a conceptual agent id",
    );
  }

  if (!allowedTargetKinds.includes(request?.target_kind)) {
    addBlock(
      "BLOCKED_TARGET_ROOT_INVALID",
      "target_kind",
      "target_kind must be a conceptual codex or copilot target",
    );
  }
}

function validateForbiddenSignals(request, addBlock) {
  for (const item of flattenValues(request)) {
    const key = item.path.at(-1) ?? "";
    const field = item.path.join(".") || "request";
    const value = typeof item.value === "string" ? item.value : "";

    if (hasContractGapSignal(key) || hasContractGapSignal(value)) {
      addBlock(
        "CONTRACT_UPDATE_NEEDS_SEPARATE_DECISION",
        field,
        "unmapped contract or boundary gap requires a separate decision",
      );
    }

    if (isAbsoluteHostPath(value) || hasTraversal(value)) {
      addBlock(
        "BLOCKED_PATH_UNSAFE",
        field,
        "absolute, file URL, and traversal paths are forbidden",
      );
    }

    if (isNetworkUrl(value)) {
      addBlock(
        value.toLowerCase().includes("github")
          ? "BLOCKED_GITHUB_WRITE"
          : "BLOCKED_RUNTIME_MATERIALIZER_CREATED",
        field,
        "network and GitHub surfaces are forbidden",
      );
    }

    if (isPositiveApprovalSemantics(value)) {
      addBlock(
        "BLOCKED_APPROVAL_POSITIVE_SEMANTICS",
        field,
        "positive write approval semantics are forbidden",
      );
    }

    if (hasExecutedOperationToken(value)) {
      addBlock(
        "BLOCKED_EXECUTED_OPERATION_FORBIDDEN",
        field,
        "executed operation tokens are forbidden",
      );
    }

    if (hasWriteTargetText(value)) {
      addBlock(
        "BLOCKED_VALIDATION_WRITE_ATTEMPT",
        field,
        "write requests to target outputs are forbidden",
      );
    }

    for (const rule of forbiddenSignalRules) {
      if (matchesForbiddenSignal(item, rule)) {
        addBlock(rule.code, field, rule.reason);
      }
    }
  }
}

function validateSourceRefArray(refs, field, addBlock, requiredRoot = null) {
  if (!Array.isArray(refs) || refs.length === 0) {
    addBlock(
      "BLOCKED_SOURCE_MODEL_INVALID",
      field,
      `${field} must list final documentary refs`,
    );
    return;
  }

  for (const ref of refs) {
    const normalized = conceptualRefOrNull(ref);

    if (normalized === null) {
      addBlock(
        "BLOCKED_SOURCE_MODEL_INVALID",
        field,
        `${field} entries must be conceptual refs`,
      );
      continue;
    }

    validateCommonRefBoundary(normalized, field, addBlock);

    if (isHistoricalSnapshotSource(normalized)) {
      addBlock(
        "BLOCKED_SOURCE_MODEL_INVALID",
        field,
        "historical snapshots cannot be final sources",
      );
      continue;
    }

    if (!isAllowedFinalSourceRef(normalized)) {
      addBlock(
        "BLOCKED_SOURCE_MODEL_INVALID",
        field,
        "source ref is outside the final source model",
      );
      continue;
    }

    if (requiredRoot !== null && !normalized.startsWith(requiredRoot)) {
      addBlock(
        "BLOCKED_SOURCE_MODEL_INVALID",
        field,
        `${field} must remain under ${requiredRoot}`,
      );
    }
  }
}

function validateTemplateRefArray(templateRefs, addBlock) {
  if (!Array.isArray(templateRefs) || templateRefs.length === 0) {
    addBlock(
      "BLOCKED_TEMPLATE_MISSING",
      "template_refs",
      "template_refs must be present and explicit",
    );
    return;
  }

  for (const templateRef of templateRefs) {
    const normalized = conceptualRefOrNull(templateRef);

    if (normalized === null) {
      addBlock(
        "BLOCKED_TEMPLATE_MISSING",
        "template_refs",
        "template_refs entries must be conceptual refs",
      );
      continue;
    }

    validateCommonRefBoundary(normalized, "template_refs", addBlock);

    if (!allowedExplicitTemplateRefSet.has(normalized)) {
      addBlock(
        "BLOCKED_TEMPLATE_MISSING",
        "template_refs",
        "template ref must be one of the explicit documentary templates",
      );
    }
  }
}

function validateContractRefs(contractRefs, addBlock) {
  if (!Array.isArray(contractRefs) || contractRefs.length === 0) {
    addBlock(
      "BLOCKED_CONTRACT_CHAIN_INVALID",
      "contract_refs",
      "contract_refs must list the preserved contract chain",
    );
    return;
  }

  const refs = new Set();
  for (const contractRef of contractRefs) {
    const normalized = conceptualRefOrNull(contractRef);

    if (normalized === null) {
      addBlock(
        "BLOCKED_CONTRACT_CHAIN_INVALID",
        "contract_refs",
        "contract_refs entries must be conceptual refs",
      );
      continue;
    }

    validateCommonRefBoundary(normalized, "contract_refs", addBlock);

    if (!materializationContractRefSet.has(normalized)) {
      addBlock(
        "BLOCKED_CONTRACT_CHAIN_INVALID",
        "contract_refs",
        "contract ref must be an existing materialization lab contract ref",
      );
      continue;
    }

    refs.add(normalized);
  }

  for (const requiredContractRef of materializationContractRefs) {
    if (!refs.has(requiredContractRef)) {
      addBlock(
        "BLOCKED_CONTRACT_CHAIN_INVALID",
        "contract_refs",
        "required materialization contract ref is missing",
      );
    }
  }
}

function validateTargetOutputEntries(entries, addBlock) {
  if (entries === undefined) {
    return;
  }

  if (!Array.isArray(entries)) {
    addBlock(
      "BLOCKED_TARGET_ROOT_INVALID",
      "planned_output_entries",
      "planned output entries must be an in-memory array when provided",
    );
    return;
  }

  for (const [index, entry] of entries.entries()) {
    const field = `planned_output_entries.${index}`;

    if (!isRecord(entry)) {
      addBlock(
        "BLOCKED_TARGET_ROOT_INVALID",
        field,
        "planned output entry must be a conceptual object",
      );
      continue;
    }

    const operation = entry.operation;
    if (hasExecutedOperationToken(operation)) {
      addBlock(
        "BLOCKED_EXECUTED_OPERATION_FORBIDDEN",
        `${field}.operation`,
        "executed operation tokens are forbidden",
      );
    } else if (!allowedPlannedOperationSet.has(operation)) {
      addBlock(
        "BLOCKED_PLANNED_OPERATION_INVALID",
        `${field}.operation`,
        "operation must be planned-only",
      );
    }

    const conceptualPath =
      entry.target_root_relative_conceptual_path ??
      entry.conceptual_path ??
      entry.planned_path;

    if (!isNonEmptyString(conceptualPath)) {
      addBlock(
        "BLOCKED_TARGET_ROOT_INVALID",
        `${field}.target_root_relative_conceptual_path`,
        "planned output path must be target-root-relative and conceptual",
      );
      continue;
    }

    if (
      isAbsoluteHostPath(conceptualPath) ||
      hasTraversal(conceptualPath) ||
      isNetworkUrl(conceptualPath)
    ) {
      addBlock(
        "BLOCKED_PATH_UNSAFE",
        `${field}.target_root_relative_conceptual_path`,
        "planned output path must not be real, absolute, network, or traversal",
      );
    }
  }
}

function validateConceptualRef(ref, field, addBlock) {
  const normalized = conceptualRefOrNull(ref);
  if (normalized === null) {
    addBlock(
      "BLOCKED_IMPLEMENTATION_SCOPE_INVALID",
      field,
      `${field} must be a conceptual in-memory ref`,
    );
    return;
  }

  validateCommonRefBoundary(normalized, field, addBlock);
}

function validateCommonRefBoundary(ref, field, addBlock) {
  if (isAbsoluteHostPath(ref) || hasTraversal(ref) || isNetworkUrl(ref)) {
    addBlock(
      "BLOCKED_PATH_UNSAFE",
      field,
      "refs must remain documentary and must not be real paths or URLs",
    );
  }

  if (isReferenceAgentsRef(ref)) {
    addBlock(
      "BLOCKED_BASE_AGENT_FINAL_DEPENDENCY",
      field,
      "reference/agents cannot be a final source",
    );
  }

  if (isProductiveSkillRef(ref)) {
    addBlock(
      "BLOCKED_PRODUCTIVE_SKILL_MUTATION",
      field,
      "productive skill refs are out of scope",
    );
  }
}

function validateRenderSpecificSignals(request, addBlock) {
  for (const item of flattenValues(request)) {
    const field = item.path.join(".") || "request";
    const keyOrValue = `${item.path.at(-1) ?? ""} ${
      typeof item.value === "string" ? item.value : ""
    }`;
    const normalized = normalizeSignal(keyOrValue);

    if (
      normalized.includes("renderer") ||
      normalized.includes("renderedcontent") ||
      normalized.includes("applytemplatetotarget")
    ) {
      addBlock(
        "BLOCKED_UNSAFE_RENDER",
        field,
        "render-context composition cannot become rendering execution",
      );
    }
  }
}

function plannedOutputEntriesFrom(request) {
  const entries = Array.isArray(request?.planned_output_entries)
    ? request.planned_output_entries
    : request?.target_output_entries;

  if (!Array.isArray(entries)) {
    return [];
  }

  return entries.map((entry) => ({
    target_agent_id: stringOrNull(entry.target_agent_id ?? request.target_agent_id),
    conceptual_output_role: stringOrNull(
      entry.conceptual_output_role ?? entry.output_role ?? entry.role,
    ),
    target_root_relative_conceptual_path: normalizeConceptualPath(
      entry.target_root_relative_conceptual_path ??
        entry.conceptual_path ??
        entry.planned_path,
    ),
    operation: entry.operation,
    write_status: "NOT_AUTHORIZED_STILL_NO_WRITE",
  }));
}

function acceptedSourceRefs(refs, requiredRoot = null) {
  return normalizeRefArray(refs).filter(
    (ref) =>
      isAllowedFinalSourceRef(ref) &&
      !isReferenceAgentsRef(ref) &&
      !isProductiveSkillRef(ref) &&
      !isHistoricalSnapshotSource(ref) &&
      (requiredRoot === null || ref.startsWith(requiredRoot)),
  );
}

function acceptedTemplateRefs(refs) {
  return normalizeRefArray(refs).filter((ref) =>
    allowedExplicitTemplateRefSet.has(ref),
  );
}

function acceptedContractRefs(refs) {
  return normalizeRefArray(refs).filter((ref) =>
    materializationContractRefSet.has(ref),
  );
}

function normalizeRefArray(refs) {
  if (!Array.isArray(refs)) {
    return [];
  }

  return refs
    .map(conceptualRefOrNull)
    .filter((ref) => ref !== null);
}

function buildBoundaryResult(blocks) {
  const blocked = blocks.length > 0;

  return {
    status: blocked ? "BLOCKED" : "PASS",
    blocked,
    block_codes: blocks.map((block) => block.code),
    blockers: [...blocks],
    manual_local_dev_only: true,
    pure_functions_only: true,
    in_memory_only: true,
    dry_run_only: true,
    still_no_write: true,
    no_target_real: true,
    no_github: true,
    no_productive_skill_mutation: true,
    no_checker: true,
    no_aggregator_change: true,
  };
}

function createBlockCollector() {
  const blocks = [];

  const addBlock = (code, field, reason) => {
    if (!blocks.some((block) => block.code === code && block.field === field)) {
      blocks.push({ code, field, reason });
    }
  };

  return { blocks, addBlock };
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

function matchesForbiddenSignal(item, rule) {
  const key = item.path.at(-1) ?? "";
  const path = item.path.join(".");
  const value = typeof item.value === "string" ? item.value : "";
  const normalizedKey = normalizeSignal(key);
  const normalizedPath = normalizeSignal(path);
  const normalizedValue = normalizeSignal(value);

  return rule.aliases.some((alias) => {
    const normalizedAlias = normalizeSignal(alias);
    return (
      normalizedKey === normalizedAlias ||
      normalizedPath.includes(normalizedAlias) ||
      normalizedValue.includes(normalizedAlias)
    );
  });
}

function hasContractGapSignal(value) {
  const normalized = normalizeSignal(value);
  return contractGapSignals.some((signal) =>
    normalized.includes(normalizeSignal(signal)),
  );
}

function hasWriteTargetText(value) {
  if (typeof value !== "string") {
    return false;
  }

  const normalized = normalizeSignal(value);
  return (
    normalized.includes("writeagentsmd") ||
    normalized.includes("writegithubagents") ||
    normalized.includes("writecodexagents") ||
    normalized.includes("writecodexconfig") ||
    normalized.includes("writefile") ||
    normalized.includes("createdirectory") ||
    normalized.includes("createfile")
  );
}

function hasExecutedOperationToken(value) {
  if (typeof value !== "string") {
    return false;
  }

  const upperValue = value.toUpperCase();
  return (
    forbiddenExecutedOperationSet.has(upperValue) ||
    forbiddenRealOperationSet.has(upperValue) ||
    upperValue.endsWith("_EXECUTED")
  );
}

function isAllowedFinalSourceRef(ref) {
  return [...allowedFinalSourceRootSet].some((root) => ref.startsWith(root));
}

function isReferenceAgentsRef(ref) {
  const normalized = normalizeConceptualPath(ref).toLowerCase();
  return normalized === "reference/agents" || normalized.startsWith("reference/agents/");
}

function isProductiveSkillRef(ref) {
  return normalizeConceptualPath(ref)
    .toLowerCase()
    .includes("skills/stnl_project_agent_specializer/");
}

function isHistoricalSnapshotSource(ref) {
  const normalized = normalizeConceptualPath(ref).toLowerCase();
  return (
    normalized.includes("reference/materialization_lab/fixtures/expected_outputs/") ||
    normalized.includes("snapshot")
  );
}

function isAbsoluteHostPath(value) {
  return (
    typeof value === "string" &&
    (value.startsWith("/") ||
      /^[A-Za-z]:[\\/]/.test(value) ||
      value.startsWith("file://"))
  );
}

function hasTraversal(value) {
  return (
    typeof value === "string" &&
    normalizeConceptualPath(value)
      .split("/")
      .some((segment) => segment === "..")
  );
}

function isNetworkUrl(value) {
  return (
    typeof value === "string" &&
    (value.startsWith("http://") || value.startsWith("https://"))
  );
}

function flattenValues(value, path = []) {
  if (!isRecord(value) && !Array.isArray(value)) {
    return [{ path, value }];
  }

  const entries = Array.isArray(value)
    ? value.map((entry, index) => [String(index), entry])
    : Object.entries(value);

  return entries.flatMap(([key, entry]) => flattenValues(entry, [...path, key]));
}

function conceptualRefOrNull(value) {
  if (isNonEmptyString(value)) {
    return normalizeConceptualPath(value);
  }

  if (isRecord(value) && isNonEmptyString(value.ref)) {
    return normalizeConceptualPath(value.ref);
  }

  return null;
}

function stringOrNull(value) {
  return isNonEmptyString(value) ? value : null;
}

function allowedTargetKindOrNull(value) {
  return allowedTargetKinds.includes(value) ? value : null;
}

function hasConceptualValue(value) {
  if (isNonEmptyString(value)) {
    return true;
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return isRecord(value) && Object.keys(value).length > 0;
}

function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim() !== "";
}

function normalizeConceptualPath(value) {
  return String(value).trim().replaceAll("\\", "/").replace(/\/+/g, "/");
}

function normalizeSignal(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function normalizeApprovalTerm(value) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().toUpperCase().replace(/[\s-]+/g, "_").replace(/_+/g, "_");
}

function isPositiveApprovalSemantics(value) {
  const normalized = normalizeApprovalTerm(value);
  if (normalized === "") {
    return false;
  }

  const compact = normalized.replaceAll("_", "");
  for (const positiveTerm of normalizedPositiveApprovalSet) {
    const compactPositiveTerm = positiveTerm.replaceAll("_", "");
    if (
      normalized === positiveTerm ||
      normalized.includes(positiveTerm) ||
      compact === compactPositiveTerm ||
      compact.includes(compactPositiveTerm)
    ) {
      return true;
    }
  }

  return false;
}
