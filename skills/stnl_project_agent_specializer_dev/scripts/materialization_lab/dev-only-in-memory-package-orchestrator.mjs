export const packageOrchestrationPhase =
  "MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PACKAGE_ORCHESTRATION_IMPLEMENTATION";

export const canonicalAgents = Object.freeze([
  "orchestrator",
  "planner",
  "validation-eval-designer",
  "execution-package-designer",
  "designer",
  "coder-frontend",
  "coder-backend",
  "coder-ios",
  "validation-runner",
  "reviewer",
  "finalizer",
  "resync",
]);

export const canonicalAgentToKernel = Object.freeze({
  orchestrator: "orchestrator_kernel",
  planner: "planner_kernel",
  "validation-eval-designer": "validation_eval_designer_kernel",
  "execution-package-designer": "execution_package_designer_kernel",
  designer: "designer_kernel",
  "coder-frontend": "coder_frontend_kernel",
  "coder-backend": "coder_backend_kernel",
  "coder-ios": "coder_ios_kernel",
  "validation-runner": "validation_runner_kernel",
  reviewer: "reviewer_kernel",
  finalizer: "finalizer_kernel",
  resync: "resync_kernel",
});

export const canonicalTargets = Object.freeze(["copilot", "codex"]);

export const allowedFinalSourceRoots = Object.freeze([
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

export const codexTargetLevelArtifacts = Object.freeze([
  {
    artifact_id: "codex-config",
    target_id: "codex",
    conceptual_path: ".codex/config.toml",
    template_ref: "reference/templates/codex/config.toml",
    artifact_level: "target-level",
    treated_as_agent: false,
  },
  {
    artifact_id: "codex-agents-md",
    target_id: "codex",
    conceptual_path: "AGENTS.md",
    template_ref: "reference/templates/codex/AGENTS.md",
    artifact_level: "target-level",
    treated_as_agent: false,
  },
]);

export const conceptualOutputShapes = Object.freeze({
  copilot_agent: ".github/agents/*.agent.md",
  codex_agent: ".codex/agents/*.toml",
  codex_config: ".codex/config.toml",
  codex_agents_md: "AGENTS.md",
});

const explicitTemplateRefSet = new Set(explicitTemplateRefs);
const materializationContractRefSet = new Set(materializationContractRefs);
const allowedFinalSourceRootSet = new Set(allowedFinalSourceRoots);

const plannedOperations = Object.freeze([
  "CREATE_PLANNED",
  "UPDATE_PLANNED",
  "UNCHANGED_PLANNED",
  "BLOCKED_PLANNED",
]);

const forbiddenExecutedOperations = Object.freeze([
  "CREATE_EXECUTED",
  "UPDATE_EXECUTED",
  "DELETE_EXECUTED",
  "WRITE_EXECUTED",
  "CREATE_REAL",
  "UPDATE_REAL",
  "DELETE_REAL",
  "WRITE_REAL",
]);

const codexTargetLevelArtifactPaths = new Set(
  codexTargetLevelArtifacts.map((artifact) => artifact.conceptual_path),
);

const profileByAgent = Object.freeze({
  orchestrator: "orchestrator_profile",
  planner: "planner_profile",
  "validation-eval-designer": "validation_eval_designer_profile",
  "execution-package-designer": "execution_package_designer_profile",
  designer: "designer_profile",
  "coder-frontend": "coder_frontend_profile",
  "coder-backend": "coder_backend_profile",
  "coder-ios": "coder_ios_profile",
  "validation-runner": "validation_runner_profile",
  reviewer: "reviewer_profile",
  finalizer: "finalizer_profile",
  resync: "resync_profile",
});

const forbiddenSignalRules = Object.freeze([
  {
    code: "BLOCKED_AGENT_LEVEL_REQUEST",
    aliases: [
      "agent_level_request",
      "single_agent_request",
      "agent_by_agent",
      "one_agent_at_a_time",
      "microphase",
      "micro_phase",
      "twelve_microphases",
    ],
    reason: "the package orchestration request must remain package-level",
  },
  {
    code: "BLOCKED_TARGET_REAL_PATH",
    aliases: [
      "real_target_path",
      "target_real_path",
      "real_target_root",
      "target_root_real",
      "host_absolute_path",
      "target_absolute_path",
    ],
    reason: "real Target roots and host absolute paths are forbidden",
  },
  {
    code: "BLOCKED_TARGET_REAL_READ",
    aliases: [
      "target_read_real",
      "real_target_read",
      "target_file_content_read",
      "file_content_read_request",
      "filesystem_read_target",
      "read_target_filesystem",
      "drift_calculation_by_reading_target",
    ],
    reason: "Target filesystem reads and drift reads are forbidden",
  },
  {
    code: "BLOCKED_TARGET_REAL_WRITE",
    aliases: [
      "target_write_real",
      "real_target_write",
      "filesystem_write_target",
      "write_target_filesystem",
      "directory_creation_request",
      "file_creation_request",
      "filesystem_write_request",
    ],
    reason: "Target filesystem writes are forbidden",
  },
  {
    code: "BLOCKED_TARGET_FILESYSTEM_INSPECTION",
    aliases: [
      "filesystem_stat_request",
      "target_filesystem_stat",
      "directory_listing_request",
      "target_directory_listing",
      "target_drift_check",
    ],
    reason: "Target stat, listing, and drift inspection are forbidden",
  },
  {
    code: "BLOCKED_OUTPUT_PERSISTENCE_SIGNAL",
    aliases: [
      "persistent_report",
      "persistent_report_path",
      "report_file_path",
      "stdout_capture",
      "stdout_capture_file",
      "stdout_capture_path",
      "cache_path",
      "snapshot_path",
      "temp_output_path",
      "log_file_path",
    ],
    reason: "persistent reports, caches, snapshots, logs, and stdout capture files are forbidden",
  },
  {
    code: "BLOCKED_GENERATED_OR_MATERIALIZED_OUTPUT_SIGNAL",
    aliases: [
      "generated_output",
      "generated_file",
      "generated_artifact",
      "materialized_output",
      "materialized_file",
      "materialized_artifact",
      "output_written",
    ],
    reason: "generated and materialized output signals are forbidden",
  },
  {
    code: "BLOCKED_GITHUB_WRITE_SIGNAL",
    aliases: [
      "github_write",
      "github_client",
      "octokit",
      "commit_hash",
      "commit_created",
      "branch_name",
      "branch_created",
      "pull_request",
      "pull_request_url",
      "pull_request_created",
      "create_pull_request",
      "release_created",
      "issue_created",
      "check_artifact",
    ],
    reason: "GitHub write, commit, branch, pull request, issue, release, and check artifacts are forbidden",
  },
  {
    code: "BLOCKED_PRODUCTIVE_SKILL_SIGNAL",
    aliases: [
      "productive_skill",
      "productive_skill_path",
      "productive_skill_mutation",
      "productive_skill_template_source",
      "skills/stnl_project_agent_specializer/",
    ],
    reason: "productive skill read, source use, and mutation are forbidden",
  },
  {
    code: "BLOCKED_RUNTIME_MATERIALIZER_SIGNAL",
    aliases: [
      "runtime_materializer",
      "runtime_payload",
      "runtime_command_payload",
      "cli_execution_payload",
      "cli_argument_payload",
      "materializer_execution_id",
    ],
    reason: "runtime materializer, CLI, and runtime payload surfaces are forbidden",
  },
  {
    code: "BLOCKED_RENDERER_SIGNAL",
    aliases: [
      "renderer",
      "renderer_payload",
      "renderer_output",
      "rendered_content",
      "rendering_execution",
      "render_final_content",
      "apply_template_to_target",
    ],
    reason: "renderer and rendered content signals are forbidden",
  },
  {
    code: "BLOCKED_WRITER_SIGNAL",
    aliases: [
      "writer",
      "writer_payload",
      "writer_output",
      "write_execution_id",
      "patch_payload",
      "diff_payload",
      "patch_application",
      "diff_application",
      "apply_patch_to_target",
    ],
    reason: "writer, patch, diff, and write execution signals are forbidden",
  },
  {
    code: "BLOCKED_LOADER_OR_SELECTOR_SIGNAL",
    aliases: [
      "loader",
      "loader_payload",
      "loader_created",
      "scenario_selector",
      "scenario_selector_created",
    ],
    reason: "loader and scenario selector signals are forbidden",
  },
  {
    code: "BLOCKED_TARGET_ADAPTER_SIGNAL",
    aliases: [
      "target_adapter_payload",
      "target_adapter_real_payload",
      "target_adapter_created",
      "real_target_adapter",
    ],
    reason: "real Target Adapter signals are forbidden",
  },
  {
    code: "BLOCKED_WRITE_APPROVAL_SIGNAL",
    aliases: [
      "write_approval_real",
      "write_approval_payload",
      "approval_token",
      "approval_signature",
      "approval_registry",
      "approval_signer",
      "signer_created",
    ],
    reason: "Write Approval, approval token, registry, signature, and signer signals are forbidden",
  },
  {
    code: "BLOCKED_CHECKER_OR_AGGREGATOR_SIGNAL",
    aliases: [
      "checker_created",
      "check_created",
      "new_checker",
      "aggregator_child",
      "aggregator_child_registered",
      "aggregator_change",
      "tenth_check",
      "tenth_official_check",
      "package_orchestration_checker",
    ],
    reason: "checker creation, Aggregator child registration, and a tenth check are forbidden",
  },
  {
    code: "BLOCKED_REFERENCE_AGENTS_FINAL_SOURCE",
    aliases: [
      "reference/agents",
      "reference_agents_final_source",
      "reference_agents_template_source",
    ],
    reason: "reference/agents cannot be a final source or template source",
  },
  {
    code: "BLOCKED_SOURCE_MODEL_DEPRECATED_FIELD",
    aliases: ["base_agent_source"],
    reason: "base_agent_source cannot be a final source or render context field",
  },
  {
    code: "BLOCKED_TEMPLATE_INFERRED",
    aliases: [
      "template_inference",
      "inferred_template",
      "implicit_template_fallback",
      "template_selected_by_output_path",
      "template_selection_by_output_path",
      "template_selection_by_target_agent",
      "nearby_file_template_source",
      "legacy_agent_template_source",
      "snapshot_template_source",
    ],
    reason: "templates must be explicit and must not be inferred",
  },
]);

export function composeDevOnlyInMemoryPackageOrchestration(request = {}) {
  const { blocks, addBlock } = createBlockCollector();
  const safeRequest = isRecord(request) ? request : {};

  if (!isRecord(request)) {
    addBlock(
      "BLOCKED_REQUEST_MODEL_INVALID",
      "request",
      "request must be an in-memory object",
    );
  }

  validateForbiddenSignals(safeRequest, addBlock);
  validatePackageLevelRequest(safeRequest, addBlock);

  const agents = resolveAgentList(safeRequest);
  const targets = resolveTargets(safeRequest);
  const agentToKernel = resolveAgentToKernel(safeRequest);
  const templateRefs = resolveTemplateRefs(safeRequest, addBlock);
  const contractRefs = resolveContractRefs(safeRequest, addBlock);
  const sourceRefs = resolveSourceRefs(safeRequest, templateRefs, contractRefs);

  validateCanonicalAgents(agents, addBlock);
  validateAgentToKernel(agentToKernel, agents, addBlock);
  validateTargets(targets, addBlock);
  validateSourceRefs(sourceRefs, addBlock);
  validateSourceCoverage(sourceRefs, agents, addBlock);
  validateTemplateRefs(templateRefs, addBlock);
  validateContractRefs(contractRefs, addBlock);

  const agentMatrix = buildCanonicalAgentMatrix(agents, agentToKernel);
  const targetMatrixEntries = resolveTargetMatrixEntries(
    safeRequest,
    agents,
    templateRefs,
  );
  validateTargetMatrixEntries(targetMatrixEntries, agents, targets, addBlock);

  const codexArtifacts = resolveCodexTargetLevelArtifacts(safeRequest);
  validateCodexTargetLevelArtifacts(codexArtifacts, agents, addBlock);

  const blocked = blocks.length > 0;
  const status = blocked ? "BLOCKED" : "PASS";
  const blockCodes = blocks.map((block) => block.code);

  return {
    result_identity: {
      result_kind: "dev_only_in_memory_package_orchestration_result",
      phase: packageOrchestrationPhase,
      option: "OPTION_C_NEW_THIN_PACKAGE_LEVEL_MODULE",
      module_name: "DEV_ONLY_IN_MEMORY_PACKAGE_ORCHESTRATOR",
      result_persistence: "in-memory-only",
      package_level: true,
      runtime_contract: "none",
      stdout_contract: "none",
      cli_contract: "none",
      official_check: false,
      aggregator_child: false,
    },
    phase_identity: {
      status,
      implementation_phase: packageOrchestrationPhase,
      expected_verdict_on_success: `${packageOrchestrationPhase}: PASS`,
      manual_local_dev_only: true,
      dry_run_only: true,
      in_memory_only: true,
      no_write: true,
    },
    package_boundary: {
      status,
      package_boundary_kind: "full-flow-integrated-package",
      pass_or_block_as_single_unit: true,
      agent_level_flow_allowed: false,
      microphase_flow_allowed: false,
      isolated_fixture_as_primary_proof_allowed: false,
      partial_matrix_success_allowed: false,
      real_target_root_accepted: false,
      absolute_host_path_accepted: false,
      productive_skill_access_allowed: false,
      composer_relationship:
        "separate thin package-level module; composer preserved as precedent/component only",
    },
    canonical_agent_matrix: {
      status,
      expected_agent_count: canonicalAgents.length,
      actual_agent_count: agents.length,
      complete: sameOrderedValues(agents, canonicalAgents),
      agents: agentMatrix,
      agent_to_kernel: Object.fromEntries(
        canonicalAgents.map((agent) => [agent, agentToKernel[agent] ?? null]),
      ),
      codex_target_level_artifacts_are_agents: false,
      package_success_requires_all_agents: true,
    },
    target_matrix_summary: buildTargetMatrixSummary(
      status,
      targetMatrixEntries,
      agents,
      targets,
    ),
    codex_target_level_artifact_summary: {
      status,
      artifact_count: codexArtifacts.length,
      artifacts: codexArtifacts.map((artifact) => ({ ...artifact })),
      required_paths: [".codex/config.toml", "AGENTS.md"],
      treated_as_agents: false,
      target_root_relative_only: true,
      generated_output_created: false,
      materialized_output_created: false,
    },
    source_coverage_summary: {
      status,
      allowed_final_source_roots: [...allowedFinalSourceRoots],
      final_source_refs: [...sourceRefs],
      kernel_source_refs: kernelRefsFor(agents),
      senior_profile_refs: seniorProfileRefsFor(agents),
      template_source_refs: [...templateRefs],
      materialization_contract_refs: [...contractRefs],
      reference_agents_final_source: false,
      productive_skill_source: false,
      base_agent_source_used: false,
      source_files_read: false,
      inferred_source_used: false,
      historical_snapshot_source_used: false,
    },
    source_chain_summary: {
      status,
      source_chain_kind:
        "kernel_source+senior_profile_source+template_source+materialization_contract_sources",
      per_agent_source_chain: agents.map((agent) => ({
        agent_id: agent,
        kernel_source_ref: kernelRefFor(agent),
        senior_profile_ref: seniorProfileRefFor(agent),
        template_refs: [
          "reference/templates/copilot/agent.md",
          "reference/templates/codex/agent.toml",
        ],
      })),
      package_contract_refs: [...contractRefs],
      renderer_payload_created: false,
      loader_created: false,
      scenario_selector_created: false,
    },
    template_resolution_summary: {
      status,
      explicit_templates_required: true,
      explicit_template_refs: [...templateRefs],
      required_template_refs: [...explicitTemplateRefs],
      template_count: templateRefs.length,
      inferred_template_used: false,
      ambiguous_template_used: false,
      missing_template_allowed: false,
      snapshot_template_used: false,
      reference_agents_template_used: false,
      productive_skill_template_used: false,
      fallback_template_used: false,
    },
    render_context_plan_summary: {
      status,
      plan_kind: "conceptual-render-context-plan-summary",
      render_contexts_planned: blocked ? 0 : targetMatrixEntries.length + codexArtifacts.length,
      agent_render_contexts_planned: blocked ? 0 : targetMatrixEntries.length,
      codex_target_level_render_contexts_planned: blocked
        ? 0
        : codexArtifacts.length,
      base_agent_source_present: false,
      renderer_created: false,
      rendering_executed: false,
      rendered_content_created: false,
      generated_notice_representation: "conceptual-only",
      placeholder_expectation: "conceptual-only",
      composition_conflict_policy: "block-if-detected",
    },
    target_output_plan_summary: {
      status,
      plan_kind: "conceptual-target-output-plan-summary",
      target_root_policy: "target-root-relative-conceptual-strings-only",
      output_shapes: { ...conceptualOutputShapes },
      planned_agent_output_entries: blocked
        ? []
        : targetMatrixEntries.map((entry) => ({ ...entry })),
      planned_codex_target_level_entries: blocked
        ? []
        : codexArtifacts.map((artifact) => ({
            target_id: artifact.target_id,
            artifact_id: artifact.artifact_id,
            conceptual_path: artifact.conceptual_path,
            template_ref: artifact.template_ref,
            operation: "CREATE_PLANNED",
            write_status: "NOT_AUTHORIZED_STILL_NO_WRITE",
          })),
      real_target_path_resolved: false,
      filesystem_stat_attempted: false,
      directory_listing_attempted: false,
      file_content_read_attempted: false,
      filesystem_write_attempted: false,
      output_persisted: false,
      materialized_output_created: false,
    },
    package_blockers: {
      status,
      blocked,
      block_codes: blockCodes,
      blockers: blocks.map((block) => ({ ...block })),
      package_passed_as_integrated_unit: !blocked,
      partial_success_reported: false,
    },
    no_write_evidence: buildNoWriteEvidence(),
    non_authorization_evidence: buildNonAuthorizationEvidence(status),
    next_audit_expectation: {
      expected_next_phase:
        "MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PACKAGE_ORCHESTRATION_IMPLEMENTATION_AUDIT",
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
      tenth_check_created: false,
      contracts_changed: false,
      templates_changed: false,
      fixtures_changed: false,
      composer_changed: false,
      productive_skill_touched: false,
    },
  };
}

export function buildNoWriteEvidence() {
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

export function buildNonAuthorizationEvidence(status = "PASS") {
  return {
    status,
    materialization_authorized: false,
    target_read_authorized: false,
    target_write_authorized: false,
    filesystem_access_to_target_authorized: false,
    writer_authorized: false,
    renderer_authorized: false,
    loader_authorized: false,
    scenario_selector_authorized: false,
    target_adapter_authorized: false,
    write_approval_authorized: false,
    approval_token_authorized: false,
    approval_registry_authorized: false,
    approval_signature_authorized: false,
    signer_authorized: false,
    persistent_report_authorized: false,
    generated_output_authorized: false,
    materialized_output_authorized: false,
    patch_or_diff_application_authorized: false,
    github_write_authorized: false,
    productive_skill_mutation_authorized: false,
    commit_authorized: false,
    branch_authorized: false,
    pull_request_authorized: false,
    package_pass_authorizes_write: false,
    eligibility_policy: "still-no-write",
    non_authorized_capabilities: [
      "real materialization",
      "real Target read/write",
      "filesystem access against real Target",
      "writer",
      "renderer",
      "loader",
      "scenario selector",
      "real Target Adapter",
      "real Write Approval",
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

export function detectUnsafeSignals(value) {
  const { blocks, addBlock } = createBlockCollector();
  validateForbiddenSignals(value, addBlock);
  return blocks.map((block) => ({ ...block }));
}

export function validatePackageRequestBoundary(request = {}) {
  const { blocks, addBlock } = createBlockCollector();
  if (!isRecord(request)) {
    addBlock(
      "BLOCKED_REQUEST_MODEL_INVALID",
      "request",
      "request must be an in-memory object",
    );
    return buildBoundaryResult(blocks);
  }

  validateForbiddenSignals(request, addBlock);
  validatePackageLevelRequest(request, addBlock);
  return buildBoundaryResult(blocks);
}

function buildBoundaryResult(blocks) {
  const blocked = blocks.length > 0;
  return {
    status: blocked ? "BLOCKED" : "PASS",
    blocked,
    block_codes: blocks.map((block) => block.code),
    blockers: blocks.map((block) => ({ ...block })),
    manual_local_dev_only: true,
    pure_functions_only: true,
    in_memory_only: true,
    dry_run_only: true,
    still_no_write: true,
    no_target_real: true,
    no_github_write: true,
    no_productive_skill: true,
    no_checker: true,
    no_aggregator_change: true,
  };
}

function validatePackageLevelRequest(request, addBlock) {
  if (
    request.package_level === false ||
    request.request_level === "agent" ||
    request.flow_level === "agent" ||
    request.agent_level_request === true ||
    request.single_agent_request === true ||
    hasOwn(request, "target_agent_id") ||
    hasOwn(request, "agent_id")
  ) {
    addBlock(
      "BLOCKED_AGENT_LEVEL_REQUEST",
      "request",
      "package orchestration must not accept agent-level flow",
    );
  }
}

function resolveAgentList(request) {
  if (hasOwn(request, "agents")) {
    return Array.isArray(request.agents)
      ? request.agents.map(normalizeConceptualPath)
      : [];
  }

  return [...canonicalAgents];
}

function resolveTargets(request) {
  if (hasOwn(request, "targets")) {
    return Array.isArray(request.targets)
      ? request.targets.map(normalizeConceptualPath)
      : [];
  }

  return [...canonicalTargets];
}

function resolveAgentToKernel(request) {
  if (isRecord(request.agent_to_kernel)) {
    return { ...request.agent_to_kernel };
  }

  return { ...canonicalAgentToKernel };
}

function resolveTemplateRefs(request, addBlock) {
  const templateRefs = hasOwn(request, "template_refs")
    ? request.template_refs
    : explicitTemplateRefs;

  if (!Array.isArray(templateRefs)) {
    addBlock(
      "BLOCKED_TEMPLATE_MISSING",
      "template_refs",
      "template_refs must be an explicit array",
    );
    return [];
  }

  return templateRefs.map(normalizeConceptualPath);
}

function resolveContractRefs(request, addBlock) {
  const contractRefs = hasOwn(request, "contract_refs")
    ? request.contract_refs
    : materializationContractRefs;

  if (!Array.isArray(contractRefs)) {
    addBlock(
      "BLOCKED_CONTRACT_CHAIN_INVALID",
      "contract_refs",
      "contract_refs must be an explicit array",
    );
    return [];
  }

  return contractRefs.map(normalizeConceptualPath);
}

function resolveSourceRefs(request, templateRefs, contractRefs) {
  if (hasOwn(request, "source_refs")) {
    return Array.isArray(request.source_refs)
      ? request.source_refs.map(normalizeConceptualPath)
      : [];
  }

  return [
    ...kernelRefsFor(canonicalAgents),
    ...seniorProfileRefsFor(canonicalAgents),
    ...templateRefs,
    ...contractRefs,
  ];
}

function resolveTargetMatrixEntries(request, agents, templateRefs) {
  if (hasOwn(request, "target_matrix_entries")) {
    return Array.isArray(request.target_matrix_entries)
      ? request.target_matrix_entries.map(normalizeTargetMatrixEntry)
      : [];
  }

  const refs = new Set(templateRefs);
  const copilotTemplate = refs.has("reference/templates/copilot/agent.md")
    ? "reference/templates/copilot/agent.md"
    : null;
  const codexTemplate = refs.has("reference/templates/codex/agent.toml")
    ? "reference/templates/codex/agent.toml"
    : null;

  return agents.flatMap((agent) => [
    {
      target_id: "copilot",
      agent_id: agent,
      conceptual_artifact_kind: "agent",
      conceptual_path: `.github/agents/${agent}.agent.md`,
      template_ref: copilotTemplate,
      operation: "CREATE_PLANNED",
      write_status: "NOT_AUTHORIZED_STILL_NO_WRITE",
    },
    {
      target_id: "codex",
      agent_id: agent,
      conceptual_artifact_kind: "agent",
      conceptual_path: `.codex/agents/${agent}.toml`,
      template_ref: codexTemplate,
      operation: "CREATE_PLANNED",
      write_status: "NOT_AUTHORIZED_STILL_NO_WRITE",
    },
  ]);
}

function resolveCodexTargetLevelArtifacts(request) {
  if (hasOwn(request, "codex_target_level_artifacts")) {
    return Array.isArray(request.codex_target_level_artifacts)
      ? request.codex_target_level_artifacts.map((artifact) => ({
          artifact_id: stringOrNull(artifact?.artifact_id),
          target_id: stringOrNull(artifact?.target_id),
          conceptual_path: normalizeConceptualPath(artifact?.conceptual_path),
          template_ref: normalizeConceptualPath(artifact?.template_ref),
          artifact_level: stringOrNull(artifact?.artifact_level),
          treated_as_agent: artifact?.treated_as_agent === true,
        }))
      : [];
  }

  return codexTargetLevelArtifacts.map((artifact) => ({ ...artifact }));
}

function validateCanonicalAgents(agents, addBlock) {
  if (!Array.isArray(agents) || agents.length === 0) {
    addBlock(
      "BLOCKED_AGENT_LIST_INCOMPLETE",
      "agents",
      "the canonical package must include all 12 agents",
    );
    return;
  }

  const seen = new Set();
  for (const agent of agents) {
    validateCommonConceptualString(agent, "agents", addBlock);
    if (seen.has(agent)) {
      addBlock(
        "BLOCKED_AGENT_DUPLICATE",
        "agents",
        "the canonical package cannot contain duplicate agents",
      );
    }
    seen.add(agent);

    if (codexTargetLevelArtifactPaths.has(agent)) {
      addBlock(
        "BLOCKED_CODEX_TARGET_LEVEL_ARTIFACT_AS_AGENT",
        "agents",
        "Codex target-level artifacts must not be treated as agents",
      );
    }
  }

  for (const canonicalAgent of canonicalAgents) {
    if (!seen.has(canonicalAgent)) {
      addBlock(
        "BLOCKED_AGENT_LIST_INCOMPLETE",
        "agents",
        "the canonical package must include all 12 agents",
      );
    }
  }

  for (const agent of seen) {
    if (!canonicalAgents.includes(agent)) {
      addBlock(
        "BLOCKED_AGENT_LIST_UNKNOWN",
        "agents",
        "only canonical agents may appear in the package",
      );
    }
  }
}

function validateAgentToKernel(agentToKernel, agents, addBlock) {
  if (!isRecord(agentToKernel)) {
    addBlock(
      "BLOCKED_KERNEL_MAPPING_MISSING",
      "agent_to_kernel",
      "agent_to_kernel must map every canonical agent",
    );
    return;
  }

  for (const agent of canonicalAgents) {
    if (!hasOwn(agentToKernel, agent)) {
      addBlock(
        "BLOCKED_KERNEL_MAPPING_MISSING",
        "agent_to_kernel",
        "every canonical agent requires a kernel mapping",
      );
      continue;
    }

    if (agentToKernel[agent] !== canonicalAgentToKernel[agent]) {
      addBlock(
        "BLOCKED_KERNEL_MAPPING_INVALID",
        "agent_to_kernel",
        "agent-to-kernel mapping must match the canonical full-flow mapping",
      );
    }
  }

  for (const agent of agents) {
    if (!hasOwn(canonicalAgentToKernel, agent)) {
      continue;
    }

    if (!hasOwn(agentToKernel, agent)) {
      addBlock(
        "BLOCKED_KERNEL_MAPPING_MISSING",
        "agent_to_kernel",
        "every package agent requires a kernel mapping",
      );
    }
  }
}

function validateTargets(targets, addBlock) {
  const seen = new Set(targets);

  for (const target of targets) {
    validateCommonConceptualString(target, "targets", addBlock);
    if (!canonicalTargets.includes(target)) {
      addBlock(
        "BLOCKED_TARGET_MATRIX_INCOMPLETE",
        "targets",
        "only copilot and codex are canonical targets",
      );
    }
  }

  for (const target of canonicalTargets) {
    if (!seen.has(target)) {
      addBlock(
        "BLOCKED_TARGET_MATRIX_INCOMPLETE",
        "targets",
        "the package must include copilot and codex targets",
      );
    }
  }
}

function validateSourceRefs(sourceRefs, addBlock) {
  if (!Array.isArray(sourceRefs) || sourceRefs.length === 0) {
    addBlock(
      "BLOCKED_SOURCE_COVERAGE_INCOMPLETE",
      "source_refs",
      "source_refs must provide final source coverage",
    );
    return;
  }

  for (const sourceRef of sourceRefs) {
    validateCommonConceptualString(sourceRef, "source_refs", addBlock);

    if (isReferenceAgentsRef(sourceRef)) {
      addBlock(
        "BLOCKED_REFERENCE_AGENTS_FINAL_SOURCE",
        "source_refs",
        "reference/agents cannot be a final source",
      );
      continue;
    }

    if (isProductiveSkillRef(sourceRef)) {
      addBlock(
        "BLOCKED_PRODUCTIVE_SKILL_SIGNAL",
        "source_refs",
        "productive skill refs are out of scope",
      );
      continue;
    }

    if (isHistoricalSnapshotRef(sourceRef)) {
      addBlock(
        "BLOCKED_SOURCE_ROOT_FORBIDDEN",
        "source_refs",
        "historical snapshots and fixtures cannot be final sources",
      );
      continue;
    }

    if (!isAllowedFinalSourceRef(sourceRef)) {
      addBlock(
        "BLOCKED_SOURCE_ROOT_FORBIDDEN",
        "source_refs",
        "final source roots must be restricted to the allowed documentary roots",
      );
    }
  }
}

function validateSourceCoverage(sourceRefs, agents, addBlock) {
  const refSet = new Set(sourceRefs);

  for (const agent of agents) {
    if (!canonicalAgents.includes(agent)) {
      continue;
    }

    if (!refSet.has(kernelRefFor(agent))) {
      addBlock(
        "BLOCKED_SOURCE_COVERAGE_INCOMPLETE",
        "source_refs",
        "kernel source coverage must exist for every canonical agent",
      );
    }

    if (!refSet.has(seniorProfileRefFor(agent))) {
      addBlock(
        "BLOCKED_SOURCE_COVERAGE_INCOMPLETE",
        "source_refs",
        "Senior Profile source coverage must exist for every canonical agent",
      );
    }
  }
}

function validateTemplateRefs(templateRefs, addBlock) {
  if (!Array.isArray(templateRefs) || templateRefs.length === 0) {
    addBlock(
      "BLOCKED_TEMPLATE_MISSING",
      "template_refs",
      "all four explicit templates are required",
    );
    return;
  }

  const seen = new Set();
  for (const templateRef of templateRefs) {
    validateCommonConceptualString(templateRef, "template_refs", addBlock);

    if (seen.has(templateRef)) {
      addBlock(
        "BLOCKED_TEMPLATE_AMBIGUOUS",
        "template_refs",
        "duplicate template refs are ambiguous",
      );
    }
    seen.add(templateRef);

    if (isReferenceAgentsRef(templateRef)) {
      addBlock(
        "BLOCKED_REFERENCE_AGENTS_FINAL_SOURCE",
        "template_refs",
        "reference/agents cannot be a template source",
      );
      continue;
    }

    if (!explicitTemplateRefSet.has(templateRef)) {
      addBlock(
        "BLOCKED_TEMPLATE_MISSING",
        "template_refs",
        "template refs must be one of the four explicit package templates",
      );
    }
  }

  for (const requiredTemplateRef of explicitTemplateRefs) {
    if (!seen.has(requiredTemplateRef)) {
      addBlock(
        "BLOCKED_TEMPLATE_MISSING",
        "template_refs",
        "all four explicit package templates are required",
      );
    }
  }
}

function validateContractRefs(contractRefs, addBlock) {
  if (!Array.isArray(contractRefs) || contractRefs.length === 0) {
    addBlock(
      "BLOCKED_CONTRACT_CHAIN_INVALID",
      "contract_refs",
      "contract refs must list the materialization contract chain",
    );
    return;
  }

  const seen = new Set();
  for (const contractRef of contractRefs) {
    validateCommonConceptualString(contractRef, "contract_refs", addBlock);

    if (!materializationContractRefSet.has(contractRef)) {
      addBlock(
        "BLOCKED_CONTRACT_CHAIN_INVALID",
        "contract_refs",
        "contract refs must remain inside the known materialization contract chain",
      );
    }
    seen.add(contractRef);
  }

  for (const requiredContractRef of materializationContractRefs) {
    if (!seen.has(requiredContractRef)) {
      addBlock(
        "BLOCKED_CONTRACT_CHAIN_INVALID",
        "contract_refs",
        "the materialization contract chain is incomplete",
      );
    }
  }
}

function validateTargetMatrixEntries(entries, agents, targets, addBlock) {
  if (!Array.isArray(entries)) {
    addBlock(
      "BLOCKED_TARGET_MATRIX_INCOMPLETE",
      "target_matrix_entries",
      "target matrix entries must be an array",
    );
    return;
  }

  const requiredPairs = new Set(
    canonicalAgents.flatMap((agent) =>
      canonicalTargets.map((target) => `${target}:${agent}`),
    ),
  );
  const seenPairs = new Set();
  const targetSet = new Set(targets);
  const agentSet = new Set(agents);

  for (const [index, entry] of entries.entries()) {
    const field = `target_matrix_entries.${index}`;
    if (!isRecord(entry)) {
      addBlock(
        "BLOCKED_TARGET_MATRIX_INCOMPLETE",
        field,
        "target matrix entry must be an object",
      );
      continue;
    }

    validateCommonConceptualString(entry.target_id, `${field}.target_id`, addBlock);
    validateCommonConceptualString(entry.agent_id, `${field}.agent_id`, addBlock);
    validateCommonConceptualString(
      entry.conceptual_path,
      `${field}.conceptual_path`,
      addBlock,
    );

    if (!targetSet.has(entry.target_id) || !canonicalTargets.includes(entry.target_id)) {
      addBlock(
        "BLOCKED_TARGET_MATRIX_INCOMPLETE",
        field,
        "target matrix entries must target copilot or codex",
      );
    }

    if (!agentSet.has(entry.agent_id) || !canonicalAgents.includes(entry.agent_id)) {
      addBlock(
        "BLOCKED_TARGET_MATRIX_INCOMPLETE",
        field,
        "target matrix entries must cover canonical package agents",
      );
    }

    if (!plannedOperations.includes(entry.operation)) {
      addBlock(
        "BLOCKED_PLANNED_OPERATION_INVALID",
        `${field}.operation`,
        "target matrix operations must remain planned-only",
      );
    }

    if (forbiddenExecutedOperations.includes(String(entry.operation).toUpperCase())) {
      addBlock(
        "BLOCKED_EXECUTED_OPERATION_FORBIDDEN",
        `${field}.operation`,
        "executed operations are forbidden",
      );
    }

    if (!explicitTemplateRefSet.has(entry.template_ref)) {
      addBlock(
        "BLOCKED_TEMPLATE_MISSING",
        `${field}.template_ref`,
        "target matrix entries must use explicit templates",
      );
    }

    const pair = `${entry.target_id}:${entry.agent_id}`;
    if (seenPairs.has(pair)) {
      addBlock(
        "BLOCKED_TARGET_MATRIX_DUPLICATE",
        field,
        "target matrix entries cannot duplicate an agent-target pair",
      );
    }
    seenPairs.add(pair);
  }

  for (const requiredPair of requiredPairs) {
    if (!seenPairs.has(requiredPair)) {
      addBlock(
        requiredPair.startsWith("copilot:")
          ? "BLOCKED_COPILOT_MATRIX_INCOMPLETE"
          : "BLOCKED_CODEX_MATRIX_INCOMPLETE",
        "target_matrix_entries",
        "the package must include a complete 12 x target matrix",
      );
    }
  }
}

function validateCodexTargetLevelArtifacts(artifacts, agents, addBlock) {
  if (!Array.isArray(artifacts) || artifacts.length === 0) {
    addBlock(
      "BLOCKED_CODEX_TARGET_LEVEL_ARTIFACT_MISSING",
      "codex_target_level_artifacts",
      "Codex target-level artifacts must include config and AGENTS.md",
    );
    return;
  }

  const paths = new Set();
  for (const [index, artifact] of artifacts.entries()) {
    const field = `codex_target_level_artifacts.${index}`;
    if (!isRecord(artifact)) {
      addBlock(
        "BLOCKED_CODEX_TARGET_LEVEL_ARTIFACT_MISSING",
        field,
        "Codex target-level artifact entries must be objects",
      );
      continue;
    }

    validateCommonConceptualString(
      artifact.conceptual_path,
      `${field}.conceptual_path`,
      addBlock,
    );
    paths.add(artifact.conceptual_path);

    if (artifact.target_id !== "codex") {
      addBlock(
        "BLOCKED_CODEX_TARGET_LEVEL_ARTIFACT_MISSING",
        field,
        "Codex target-level artifacts must target codex",
      );
    }

    if (artifact.treated_as_agent === true) {
      addBlock(
        "BLOCKED_CODEX_TARGET_LEVEL_ARTIFACT_AS_AGENT",
        field,
        "Codex target-level artifacts must not be treated as agents",
      );
    }

    if (agents.includes(artifact.conceptual_path)) {
      addBlock(
        "BLOCKED_CODEX_TARGET_LEVEL_ARTIFACT_AS_AGENT",
        field,
        "Codex target-level artifacts must remain separate from agent identities",
      );
    }

    if (!explicitTemplateRefSet.has(artifact.template_ref)) {
      addBlock(
        "BLOCKED_TEMPLATE_MISSING",
        `${field}.template_ref`,
        "Codex target-level artifacts must use explicit Codex templates",
      );
    }
  }

  for (const requiredPath of [".codex/config.toml", "AGENTS.md"]) {
    if (!paths.has(requiredPath)) {
      addBlock(
        "BLOCKED_CODEX_TARGET_LEVEL_ARTIFACT_MISSING",
        "codex_target_level_artifacts",
        "Codex config and AGENTS.md conceptual artifacts are required",
      );
    }
  }
}

function buildCanonicalAgentMatrix(agents, agentToKernel) {
  return agents.map((agent) => ({
    agent_id: agent,
    kernel_id: stringOrNull(agentToKernel[agent]),
    kernel_ref: canonicalAgents.includes(agent) ? kernelRefFor(agent) : null,
    senior_profile_ref: canonicalAgents.includes(agent)
      ? seniorProfileRefFor(agent)
      : null,
    package_member: canonicalAgents.includes(agent),
  }));
}

function buildTargetMatrixSummary(status, entries, agents, targets) {
  const byTarget = Object.fromEntries(
    canonicalTargets.map((target) => {
      const targetEntries = entries.filter((entry) => entry.target_id === target);
      const coveredAgents = new Set(targetEntries.map((entry) => entry.agent_id));
      return [
        target,
        {
          target_id: target,
          expected_agent_count: canonicalAgents.length,
          actual_agent_count: coveredAgents.size,
          complete:
            canonicalAgents.every((agent) => coveredAgents.has(agent)) &&
            targets.includes(target) &&
            agents.length === canonicalAgents.length,
          entries: targetEntries.map((entry) => ({ ...entry })),
        },
      ];
    }),
  );

  return {
    status,
    matrix_kind: "12 x copilot + 12 x codex",
    canonical_targets: [...canonicalTargets],
    expected_agent_entries_per_target: canonicalAgents.length,
    expected_total_agent_target_entries:
      canonicalAgents.length * canonicalTargets.length,
    actual_total_agent_target_entries: entries.length,
    copilot: byTarget.copilot,
    codex: byTarget.codex,
    codex_target_level_artifacts_are_agents: false,
    partial_matrix_success_allowed: false,
    package_success_requires_complete_target_matrix: true,
  };
}

function normalizeTargetMatrixEntry(entry) {
  return {
    target_id: normalizeConceptualPath(entry?.target_id),
    agent_id: normalizeConceptualPath(entry?.agent_id),
    conceptual_artifact_kind: normalizeConceptualPath(
      entry?.conceptual_artifact_kind ?? "agent",
    ),
    conceptual_path: normalizeConceptualPath(
      entry?.conceptual_path ??
        entry?.target_root_relative_conceptual_path ??
        entry?.planned_path,
    ),
    template_ref: normalizeConceptualPath(entry?.template_ref),
    operation: normalizeConceptualPath(entry?.operation),
    write_status: "NOT_AUTHORIZED_STILL_NO_WRITE",
  };
}

function validateForbiddenSignals(value, addBlock) {
  for (const item of flattenValues(value)) {
    const field = item.path.join(".") || "request";
    const key = item.path.at(-1) ?? "";
    const stringValue = typeof item.value === "string" ? item.value : "";

    if (isAbsoluteHostPath(stringValue) || hasTraversal(stringValue)) {
      addBlock(
        "BLOCKED_PATH_UNSAFE",
        field,
        "absolute paths, file URLs, and traversal paths are forbidden",
      );
    }

    if (isNetworkUrl(stringValue)) {
      addBlock(
        stringValue.toLowerCase().includes("github")
          ? "BLOCKED_GITHUB_WRITE_SIGNAL"
          : "BLOCKED_RUNTIME_MATERIALIZER_SIGNAL",
        field,
        "network URLs are outside the in-memory package boundary",
      );
    }

    if (forbiddenExecutedOperations.includes(stringValue.toUpperCase())) {
      addBlock(
        "BLOCKED_EXECUTED_OPERATION_FORBIDDEN",
        field,
        "executed operation tokens are forbidden",
      );
    }

    for (const rule of forbiddenSignalRules) {
      if (matchesForbiddenSignal(item, rule)) {
        addBlock(rule.code, field, rule.reason);
      }
    }
  }
}

function validateCommonConceptualString(value, field, addBlock) {
  if (!isNonEmptyString(value)) {
    addBlock(
      "BLOCKED_CONCEPTUAL_REF_INVALID",
      field,
      "conceptual refs must be non-empty strings",
    );
    return;
  }

  if (isAbsoluteHostPath(value) || hasTraversal(value) || isNetworkUrl(value)) {
    addBlock(
      "BLOCKED_PATH_UNSAFE",
      field,
      "conceptual refs must remain target-root-relative or documentary",
    );
  }
}

function kernelRefsFor(agents) {
  return agents
    .filter((agent) => canonicalAgents.includes(agent))
    .map(kernelRefFor);
}

function seniorProfileRefsFor(agents) {
  return agents
    .filter((agent) => canonicalAgents.includes(agent))
    .map(seniorProfileRefFor);
}

function kernelRefFor(agent) {
  return `reference/kernel_lab/${canonicalAgentToKernel[agent]}/`;
}

function seniorProfileRefFor(agent) {
  return `reference/seniorization_lab/${profileByAgent[agent]}/SENIOR_AGENT_PROFILE.md`;
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

function isHistoricalSnapshotRef(ref) {
  const normalized = normalizeConceptualPath(ref).toLowerCase();
  return (
    normalized.includes("reference/materialization_lab/fixtures/") ||
    normalized.includes("snapshot")
  );
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

function flattenValues(value, path = []) {
  if (!isRecord(value) && !Array.isArray(value)) {
    return [{ path, value }];
  }

  const entries = Array.isArray(value)
    ? value.map((entry, index) => [String(index), entry])
    : Object.entries(value);

  return [
    { path, value },
    ...entries.flatMap(([key, entry]) => flattenValues(entry, [...path, key])),
  ];
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

function sameOrderedValues(left, right) {
  return (
    left.length === right.length &&
    left.every((entry, index) => entry === right[index])
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

function normalizeConceptualPath(value) {
  return String(value ?? "").trim().replaceAll("\\", "/").replace(/\/+/g, "/");
}

function normalizeSignal(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function stringOrNull(value) {
  return isNonEmptyString(value) ? value : null;
}

function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim() !== "";
}

function hasOwn(value, key) {
  return Object.prototype.hasOwnProperty.call(value, key);
}
