import assert from "node:assert/strict";

import {
  allowedFinalSourceRoots,
  buildNoWriteEvidence,
  buildNonAuthorizationEvidence,
  canonicalAgentToKernel,
  canonicalAgents,
  canonicalTargets,
  codexTargetLevelArtifacts,
  composeDevOnlyInMemoryPackageOrchestration,
  conceptualOutputShapes,
  detectUnsafeSignals,
  explicitTemplateRefs,
  materializationContractRefs,
  validatePackageRequestBoundary,
} from "./dev-only-in-memory-package-orchestrator.mjs";

const exactNoWriteEvidence = Object.freeze({
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
});

const expectedTopLevelSections = Object.freeze([
  "result_identity",
  "phase_identity",
  "package_boundary",
  "canonical_agent_matrix",
  "target_matrix_summary",
  "codex_target_level_artifact_summary",
  "source_coverage_summary",
  "source_chain_summary",
  "template_resolution_summary",
  "render_context_plan_summary",
  "target_output_plan_summary",
  "package_blockers",
  "no_write_evidence",
  "non_authorization_evidence",
  "next_audit_expectation",
]);

function compose(overrides = {}) {
  return composeDevOnlyInMemoryPackageOrchestration(overrides);
}

function assertPass(result, caseName) {
  assertCommonBoundary(result, caseName);
  assert.equal(result.package_blockers.status, "PASS", caseName);
  assert.equal(result.package_blockers.blocked, false, caseName);
  assert.deepEqual(result.package_blockers.block_codes, [], caseName);
  assert.equal(result.phase_identity.status, "PASS", caseName);
  assert.equal(result.package_boundary.pass_or_block_as_single_unit, true);
  assert.equal(result.package_blockers.package_passed_as_integrated_unit, true);
}

function assertBlocked(result, expectedCode, caseName) {
  assertCommonBoundary(result, caseName);
  assert.equal(result.package_blockers.status, "BLOCKED", caseName);
  assert.equal(result.package_blockers.blocked, true, caseName);
  assert.ok(
    result.package_blockers.block_codes.includes(expectedCode),
    `${caseName}: expected ${expectedCode}, got ${result.package_blockers.block_codes.join(
      ", ",
    )}`,
  );
  assert.equal(result.phase_identity.status, "BLOCKED", caseName);
  assert.equal(result.package_blockers.package_passed_as_integrated_unit, false);
}

function assertCommonBoundary(result, caseName) {
  assert.deepEqual(
    Object.keys(result),
    expectedTopLevelSections,
    `${caseName}: top-level package result changed`,
  );
  assert.deepEqual(
    result.no_write_evidence,
    exactNoWriteEvidence,
    `${caseName}: no-write evidence changed`,
  );
  assert.deepEqual(buildNoWriteEvidence(), exactNoWriteEvidence);
  assertNonAuthorizationEvidence(result, caseName);
  assert.equal(result.result_identity.official_check, false, caseName);
  assert.equal(result.result_identity.aggregator_child, false, caseName);
  assert.equal(result.next_audit_expectation.checker_created, false, caseName);
  assert.equal(
    result.next_audit_expectation.aggregator_child_registered,
    false,
    caseName,
  );
  assert.equal(result.next_audit_expectation.tenth_check_created, false, caseName);
  assertNoPositiveWriteAuthorization(result, caseName);
}

function assertNonAuthorizationEvidence(result, caseName) {
  const evidence = result.non_authorization_evidence;
  assert.equal(evidence.materialization_authorized, false, caseName);
  assert.equal(evidence.target_read_authorized, false, caseName);
  assert.equal(evidence.target_write_authorized, false, caseName);
  assert.equal(evidence.filesystem_access_to_target_authorized, false, caseName);
  assert.equal(evidence.writer_authorized, false, caseName);
  assert.equal(evidence.renderer_authorized, false, caseName);
  assert.equal(evidence.loader_authorized, false, caseName);
  assert.equal(evidence.scenario_selector_authorized, false, caseName);
  assert.equal(evidence.target_adapter_authorized, false, caseName);
  assert.equal(evidence.write_approval_authorized, false, caseName);
  assert.equal(evidence.approval_token_authorized, false, caseName);
  assert.equal(evidence.approval_registry_authorized, false, caseName);
  assert.equal(evidence.approval_signature_authorized, false, caseName);
  assert.equal(evidence.signer_authorized, false, caseName);
  assert.equal(evidence.persistent_report_authorized, false, caseName);
  assert.equal(evidence.generated_output_authorized, false, caseName);
  assert.equal(evidence.materialized_output_authorized, false, caseName);
  assert.equal(evidence.patch_or_diff_application_authorized, false, caseName);
  assert.equal(evidence.github_write_authorized, false, caseName);
  assert.equal(evidence.productive_skill_mutation_authorized, false, caseName);
  assert.equal(evidence.commit_authorized, false, caseName);
  assert.equal(evidence.branch_authorized, false, caseName);
  assert.equal(evidence.pull_request_authorized, false, caseName);
  assert.equal(evidence.package_pass_authorizes_write, false, caseName);
  assert.equal(evidence.eligibility_policy, "still-no-write", caseName);
  assert.ok(evidence.non_authorized_capabilities.includes("real materialization"));
  assert.ok(evidence.non_authorized_capabilities.includes("GitHub write"));
  assert.ok(evidence.non_authorized_capabilities.includes("pull request"));
}

function assertNoPositiveWriteAuthorization(value, caseName) {
  const json = JSON.stringify(value);
  for (const term of [
    "APPROVED",
    "WRITE_APPROVED",
    "APPROVAL_GRANTED",
    "READY_TO_WRITE",
    "WRITE_UNLOCKED",
    "EXECUTION_APPROVED",
    "MERGE_APPROVED",
  ]) {
    assert.equal(json.includes(term), false, `${caseName}: ${term}`);
  }
}

function firstBlockedCode(overrides) {
  return compose(overrides).package_blockers.block_codes[0];
}

function packageSourceRefs() {
  return [
    ...canonicalAgents.map(
      (agent) => `reference/kernel_lab/${canonicalAgentToKernel[agent]}/`,
    ),
    ...canonicalAgents.map((agent) => {
      const profile = agent.replaceAll("-", "_");
      return `reference/seniorization_lab/${profile}_profile/SENIOR_AGENT_PROFILE.md`;
    }),
    ...explicitTemplateRefs,
    ...materializationContractRefs,
  ];
}

function targetMatrixWithEntryPatch(targetId, agentId, patch) {
  return happy.target_output_plan_summary.planned_agent_output_entries.map((entry) =>
    entry.target_id === targetId && entry.agent_id === agentId
      ? { ...entry, ...patch }
      : entry,
  );
}

function semanticallyCrossedTargetMatrixEntries() {
  return happy.target_output_plan_summary.planned_agent_output_entries.map((entry) =>
    entry.target_id === "copilot"
      ? {
          ...entry,
          conceptual_path: `.codex/agents/${entry.agent_id}.toml`,
          template_ref: "reference/templates/codex/agent.toml",
        }
      : {
          ...entry,
          conceptual_path: `.github/agents/${entry.agent_id}.agent.md`,
          template_ref: "reference/templates/copilot/agent.md",
        },
  );
}

const happy = compose();
assertPass(happy, "happy path full-flow package");
assert.equal(
  happy.result_identity.result_kind,
  "dev_only_in_memory_package_orchestration_result",
);
assert.equal(happy.result_identity.option, "OPTION_C_NEW_THIN_PACKAGE_LEVEL_MODULE");
assert.deepEqual(canonicalTargets, ["copilot", "codex"]);
assert.deepEqual(allowedFinalSourceRoots, [
  "reference/kernel_lab/",
  "reference/seniorization_lab/",
  "reference/templates/",
  "reference/materialization_lab/contracts/",
]);
assert.deepEqual(explicitTemplateRefs, [
  "reference/templates/copilot/agent.md",
  "reference/templates/codex/agent.toml",
  "reference/templates/codex/config.toml",
  "reference/templates/codex/AGENTS.md",
]);
assert.deepEqual(Object.keys(canonicalAgentToKernel), canonicalAgents);
assert.deepEqual(Object.values(canonicalAgentToKernel), [
  "orchestrator_kernel",
  "planner_kernel",
  "validation_eval_designer_kernel",
  "execution_package_designer_kernel",
  "designer_kernel",
  "coder_frontend_kernel",
  "coder_backend_kernel",
  "coder_ios_kernel",
  "validation_runner_kernel",
  "reviewer_kernel",
  "finalizer_kernel",
  "resync_kernel",
]);
assert.equal(happy.canonical_agent_matrix.expected_agent_count, 12);
assert.equal(happy.canonical_agent_matrix.agents.length, 12);
assert.equal(happy.canonical_agent_matrix.complete, true);
assert.equal(happy.target_matrix_summary.copilot.entries.length, 12);
assert.equal(happy.target_matrix_summary.codex.entries.length, 12);
assert.equal(happy.target_matrix_summary.copilot.complete, true);
assert.equal(happy.target_matrix_summary.codex.complete, true);
for (const entry of happy.target_matrix_summary.copilot.entries) {
  assert.equal(entry.conceptual_artifact_kind, "agent");
  assert.equal(entry.template_ref, "reference/templates/copilot/agent.md");
  assert.equal(
    entry.conceptual_path,
    `.github/agents/${entry.agent_id}.agent.md`,
  );
}
for (const entry of happy.target_matrix_summary.codex.entries) {
  assert.equal(entry.conceptual_artifact_kind, "agent");
  assert.equal(entry.template_ref, "reference/templates/codex/agent.toml");
  assert.equal(entry.conceptual_path, `.codex/agents/${entry.agent_id}.toml`);
}
assert.equal(
  happy.target_matrix_summary.expected_total_agent_target_entries,
  24,
);
assert.deepEqual(conceptualOutputShapes, {
  copilot_agent: ".github/agents/*.agent.md",
  codex_agent: ".codex/agents/*.toml",
  codex_config: ".codex/config.toml",
  codex_agents_md: "AGENTS.md",
});
assert.ok(
  happy.codex_target_level_artifact_summary.artifacts.some(
    (artifact) => artifact.conceptual_path === ".codex/config.toml",
  ),
);
assert.ok(
  happy.codex_target_level_artifact_summary.artifacts.some(
    (artifact) => artifact.conceptual_path === "AGENTS.md",
  ),
);
assert.equal(
  happy.codex_target_level_artifact_summary.treated_as_agents,
  false,
);
assert.equal(
  happy.canonical_agent_matrix.agents.some(
    (agent) => agent.agent_id === ".codex/config.toml",
  ),
  false,
);
assert.equal(
  happy.canonical_agent_matrix.agents.some((agent) => agent.agent_id === "AGENTS.md"),
  false,
);
assert.deepEqual(
  codexTargetLevelArtifacts.map((artifact) => artifact.template_ref),
  [
    "reference/templates/codex/config.toml",
    "reference/templates/codex/AGENTS.md",
  ],
);
for (const artifact of happy.codex_target_level_artifact_summary.artifacts) {
  assert.equal(artifact.target_id, "codex");
  assert.equal(artifact.artifact_level, "target-level");
  assert.equal(artifact.treated_as_agent, false);
}
assert.equal(happy.source_coverage_summary.reference_agents_final_source, false);
assert.equal(happy.source_coverage_summary.base_agent_source_used, false);
assert.equal(happy.source_coverage_summary.source_files_read, false);
assert.equal(happy.template_resolution_summary.inferred_template_used, false);
assert.equal(happy.target_output_plan_summary.real_target_path_resolved, false);
assert.equal(happy.target_output_plan_summary.output_persisted, false);
assert.equal(
  happy.target_output_plan_summary.materialized_output_created,
  false,
);
assert.equal(happy.non_authorization_evidence.package_pass_authorizes_write, false);
assert.deepEqual(buildNonAuthorizationEvidence("PASS"), happy.non_authorization_evidence);
const dangerousNonAuthorizationEvidence =
  buildNonAuthorizationEvidence("WRITE_APPROVED");
assert.equal(
  dangerousNonAuthorizationEvidence.status,
  "NOT_AUTHORIZED_STILL_NO_WRITE",
);
assert.equal(dangerousNonAuthorizationEvidence.eligibility_policy, "still-no-write");
assert.equal(dangerousNonAuthorizationEvidence.materialization_authorized, false);
assert.equal(dangerousNonAuthorizationEvidence.target_write_authorized, false);
assert.equal(dangerousNonAuthorizationEvidence.write_approval_authorized, false);
assert.equal(dangerousNonAuthorizationEvidence.approval_token_authorized, false);
assertNoPositiveWriteAuthorization(
  dangerousNonAuthorizationEvidence,
  "non-authorization evidence sanitizes dangerous external status",
);
assert.equal(validatePackageRequestBoundary({}).status, "PASS");
assert.deepEqual(detectUnsafeSignals({}).map((block) => block.code), []);

const blockedCases = [
  [
    "agent-level request",
    { request_level: "agent" },
    "BLOCKED_AGENT_LEVEL_REQUEST",
  ],
  [
    "missing canonical agent",
    { agents: canonicalAgents.slice(0, -1) },
    "BLOCKED_AGENT_LIST_INCOMPLETE",
  ],
  [
    "duplicate canonical agent",
    { agents: [...canonicalAgents, "planner"] },
    "BLOCKED_AGENT_DUPLICATE",
  ],
  [
    "missing kernel mapping",
    {
      agent_to_kernel: Object.fromEntries(
        Object.entries(canonicalAgentToKernel).filter(([agent]) => agent !== "planner"),
      ),
    },
    "BLOCKED_KERNEL_MAPPING_MISSING",
  ],
  [
    "copilot matrix incomplete",
    {
      target_matrix_entries: happy.target_output_plan_summary.planned_agent_output_entries.filter(
        (entry) =>
          !(entry.target_id === "copilot" && entry.agent_id === "planner"),
      ),
    },
    "BLOCKED_COPILOT_MATRIX_INCOMPLETE",
  ],
  [
    "codex matrix incomplete",
    {
      target_matrix_entries: happy.target_output_plan_summary.planned_agent_output_entries.filter(
        (entry) => !(entry.target_id === "codex" && entry.agent_id === "planner"),
      ),
    },
    "BLOCKED_CODEX_MATRIX_INCOMPLETE",
  ],
  [
    "copilot with Codex agent output shape",
    {
      target_matrix_entries: targetMatrixWithEntryPatch("copilot", "orchestrator", {
        conceptual_path: ".codex/agents/orchestrator.toml",
      }),
    },
    "BLOCKED_TARGET_MATRIX_OUTPUT_SHAPE_INVALID",
  ],
  [
    "copilot with Codex agent template",
    {
      target_matrix_entries: targetMatrixWithEntryPatch("copilot", "orchestrator", {
        template_ref: "reference/templates/codex/agent.toml",
      }),
    },
    "BLOCKED_TARGET_MATRIX_TEMPLATE_MISMATCH",
  ],
  [
    "codex with Copilot agent output shape",
    {
      target_matrix_entries: targetMatrixWithEntryPatch("codex", "orchestrator", {
        conceptual_path: ".github/agents/orchestrator.agent.md",
      }),
    },
    "BLOCKED_TARGET_MATRIX_OUTPUT_SHAPE_INVALID",
  ],
  [
    "codex with Copilot agent template",
    {
      target_matrix_entries: targetMatrixWithEntryPatch("codex", "orchestrator", {
        template_ref: "reference/templates/copilot/agent.md",
      }),
    },
    "BLOCKED_TARGET_MATRIX_TEMPLATE_MISMATCH",
  ],
  [
    ".codex/config.toml treated as agent in target matrix",
    {
      target_matrix_entries: targetMatrixWithEntryPatch("codex", "orchestrator", {
        conceptual_path: ".codex/config.toml",
        template_ref: "reference/templates/codex/config.toml",
      }),
    },
    "BLOCKED_CODEX_TARGET_LEVEL_ARTIFACT_AS_AGENT",
  ],
  [
    "AGENTS.md treated as agent in target matrix",
    {
      target_matrix_entries: targetMatrixWithEntryPatch("codex", "orchestrator", {
        conceptual_path: "AGENTS.md",
        template_ref: "reference/templates/codex/AGENTS.md",
      }),
    },
    "BLOCKED_CODEX_TARGET_LEVEL_ARTIFACT_AS_AGENT",
  ],
  [
    "complete but semantically crossed target matrix",
    { target_matrix_entries: semanticallyCrossedTargetMatrixEntries() },
    "BLOCKED_TARGET_MATRIX_OUTPUT_SHAPE_INVALID",
  ],
  [
    "missing codex config",
    {
      codex_target_level_artifacts: codexTargetLevelArtifacts.filter(
        (artifact) => artifact.conceptual_path !== ".codex/config.toml",
      ),
    },
    "BLOCKED_CODEX_TARGET_LEVEL_ARTIFACT_MISSING",
  ],
  [
    "missing AGENTS.md",
    {
      codex_target_level_artifacts: codexTargetLevelArtifacts.filter(
        (artifact) => artifact.conceptual_path !== "AGENTS.md",
      ),
    },
    "BLOCKED_CODEX_TARGET_LEVEL_ARTIFACT_MISSING",
  ],
  [
    "codex config target-level artifact with agent template",
    {
      codex_target_level_artifacts: codexTargetLevelArtifacts.map((artifact) =>
        artifact.conceptual_path === ".codex/config.toml"
          ? {
              ...artifact,
              template_ref: "reference/templates/codex/agent.toml",
            }
          : artifact,
      ),
    },
    "BLOCKED_CODEX_TARGET_LEVEL_TEMPLATE_MISMATCH",
  ],
  [
    "AGENTS.md target-level artifact with agent template",
    {
      codex_target_level_artifacts: codexTargetLevelArtifacts.map((artifact) =>
        artifact.conceptual_path === "AGENTS.md"
          ? {
              ...artifact,
              template_ref: "reference/templates/codex/agent.toml",
            }
          : artifact,
      ),
    },
    "BLOCKED_CODEX_TARGET_LEVEL_TEMPLATE_MISMATCH",
  ],
  [
    "codex config target-level artifact marked as agent level",
    {
      codex_target_level_artifacts: codexTargetLevelArtifacts.map((artifact) =>
        artifact.conceptual_path === ".codex/config.toml"
          ? { ...artifact, artifact_level: "agent" }
          : artifact,
      ),
    },
    "BLOCKED_CODEX_TARGET_LEVEL_ARTIFACT_AS_AGENT",
  ],
  [
    "codex target-level artifact as agent",
    { agents: [...canonicalAgents, ".codex/config.toml"] },
    "BLOCKED_CODEX_TARGET_LEVEL_ARTIFACT_AS_AGENT",
  ],
  [
    "source root outside allowed roots",
    { source_refs: ["docs/agent.md"] },
    "BLOCKED_SOURCE_ROOT_FORBIDDEN",
  ],
  [
    "reference agents as source final",
    { source_refs: ["reference/agents/planner.agent.md"] },
    "BLOCKED_REFERENCE_AGENTS_FINAL_SOURCE",
  ],
  [
    "base_agent_source deprecated",
    { base_agent_source: "reference/agents/planner.agent.md" },
    "BLOCKED_REFERENCE_AGENTS_FINAL_SOURCE",
  ],
  [
    "template missing",
    { template_refs: explicitTemplateRefs.slice(0, -1) },
    "BLOCKED_TEMPLATE_MISSING",
  ],
  [
    "template ambiguous duplicate",
    { template_refs: [...explicitTemplateRefs, explicitTemplateRefs[0]] },
    "BLOCKED_TEMPLATE_AMBIGUOUS",
  ],
  [
    "template inferred",
    { template_inference: "reference/templates/codex/agent.toml" },
    "BLOCKED_TEMPLATE_INFERRED",
  ],
  [
    "template from reference agents",
    { template_refs: ["reference/agents/planner.agent.md"] },
    "BLOCKED_REFERENCE_AGENTS_FINAL_SOURCE",
  ],
  [
    "absolute path",
    { target_matrix_entries: [{ ...happy.target_matrix_summary.codex.entries[0], conceptual_path: "/absolute-target/planner.toml" }] },
    "BLOCKED_PATH_UNSAFE",
  ],
  [
    "real Target path",
    { real_target_root: "/absolute-target" },
    "BLOCKED_PATH_UNSAFE",
  ],
  [
    "traversal path",
    { source_refs: ["reference/kernel_lab/../agents/planner.md"] },
    "BLOCKED_PATH_UNSAFE",
  ],
  [
    "filesystem stat signal",
    { filesystem_stat_request: true },
    "BLOCKED_TARGET_FILESYSTEM_INSPECTION",
  ],
  [
    "directory listing signal",
    { directory_listing_request: true },
    "BLOCKED_TARGET_FILESYSTEM_INSPECTION",
  ],
  [
    "file content read signal",
    { file_content_read_request: true },
    "BLOCKED_TARGET_REAL_READ",
  ],
  [
    "filesystem write signal",
    { filesystem_write_target: true },
    "BLOCKED_TARGET_REAL_WRITE",
  ],
  [
    "output persisted signal",
    { persistent_report_path: "reports/package.json" },
    "BLOCKED_OUTPUT_PERSISTENCE_SIGNAL",
  ],
  [
    "generated output signal",
    { generated_output: ".codex/agents/planner.toml" },
    "BLOCKED_GENERATED_OR_MATERIALIZED_OUTPUT_SIGNAL",
  ],
  [
    "materialized output signal",
    { materialized_output: ".codex/agents/planner.toml" },
    "BLOCKED_GENERATED_OR_MATERIALIZED_OUTPUT_SIGNAL",
  ],
  [
    "GitHub write signal",
    { github_write: true },
    "BLOCKED_GITHUB_WRITE_SIGNAL",
  ],
  [
    "productive skill signal",
    { productive_skill_path: "skills/stnl_project_agent_specializer/SKILL.md" },
    "BLOCKED_PRODUCTIVE_SKILL_SIGNAL",
  ],
  [
    "writer signal",
    { writer_payload: { mode: "write" } },
    "BLOCKED_WRITER_SIGNAL",
  ],
  [
    "renderer signal",
    { renderer_payload: { mode: "render" } },
    "BLOCKED_RENDERER_SIGNAL",
  ],
  [
    "runtime materializer signal",
    { runtime_materializer: true },
    "BLOCKED_RUNTIME_MATERIALIZER_SIGNAL",
  ],
  [
    "loader signal",
    { loader_created: true },
    "BLOCKED_LOADER_OR_SELECTOR_SIGNAL",
  ],
  [
    "scenario selector signal",
    { scenario_selector_created: true },
    "BLOCKED_LOADER_OR_SELECTOR_SIGNAL",
  ],
  [
    "Target Adapter signal",
    { target_adapter_payload: {} },
    "BLOCKED_TARGET_ADAPTER_SIGNAL",
  ],
  [
    "Target Adapter direct signal",
    { target_adapter: true },
    "BLOCKED_TARGET_ADAPTER_SIGNAL",
  ],
  [
    "Write Approval signal",
    { write_approval_payload: {} },
    "BLOCKED_WRITE_APPROVAL_SIGNAL",
  ],
  [
    "Write Approval direct signal",
    { write_approval: true },
    "BLOCKED_WRITE_APPROVAL_SIGNAL",
  ],
  [
    "approval token signal",
    { approval_token: "token" },
    "BLOCKED_WRITE_APPROVAL_SIGNAL",
  ],
  [
    "approval registry signal",
    { approval_registry: true },
    "BLOCKED_WRITE_APPROVAL_SIGNAL",
  ],
  [
    "signer signal",
    { signer: true },
    "BLOCKED_WRITE_APPROVAL_SIGNAL",
  ],
  [
    "target read signal",
    { target_read: true },
    "BLOCKED_TARGET_REAL_READ",
  ],
  [
    "target stat signal",
    { target_stat: true },
    "BLOCKED_TARGET_FILESYSTEM_INSPECTION",
  ],
  [
    "target list signal",
    { target_list: true },
    "BLOCKED_TARGET_FILESYSTEM_INSPECTION",
  ],
  [
    "target write signal",
    { target_write: true },
    "BLOCKED_TARGET_REAL_WRITE",
  ],
  [
    "APPROVED status signal",
    { status: "APPROVED" },
    "BLOCKED_POSITIVE_WRITE_AUTHORIZATION_SIGNAL",
  ],
  [
    "WRITE_APPROVED signal",
    { WRITE_APPROVED: true },
    "BLOCKED_POSITIVE_WRITE_AUTHORIZATION_SIGNAL",
  ],
  [
    "APPROVAL_GRANTED status signal",
    { status: "APPROVAL_GRANTED" },
    "BLOCKED_POSITIVE_WRITE_AUTHORIZATION_SIGNAL",
  ],
  [
    "READY_TO_WRITE status signal",
    { status: "READY_TO_WRITE" },
    "BLOCKED_POSITIVE_WRITE_AUTHORIZATION_SIGNAL",
  ],
  [
    "WRITE_UNLOCKED status signal",
    { status: "WRITE_UNLOCKED" },
    "BLOCKED_POSITIVE_WRITE_AUTHORIZATION_SIGNAL",
  ],
  [
    "EXECUTION_APPROVED status signal",
    { status: "EXECUTION_APPROVED" },
    "BLOCKED_POSITIVE_WRITE_AUTHORIZATION_SIGNAL",
  ],
  [
    "MERGE_APPROVED status signal",
    { status: "MERGE_APPROVED" },
    "BLOCKED_POSITIVE_WRITE_AUTHORIZATION_SIGNAL",
  ],
  [
    "checker signal",
    { checker_created: true },
    "BLOCKED_CHECKER_OR_AGGREGATOR_SIGNAL",
  ],
  [
    "Aggregator child signal",
    { aggregator_child_registered: true },
    "BLOCKED_CHECKER_OR_AGGREGATOR_SIGNAL",
  ],
  [
    "tenth check signal",
    { tenth_check: true },
    "BLOCKED_CHECKER_OR_AGGREGATOR_SIGNAL",
  ],
  [
    "stdout capture file signal",
    { stdout_capture_file: "stdout.txt" },
    "BLOCKED_OUTPUT_PERSISTENCE_SIGNAL",
  ],
];

for (const [caseName, overrides, expectedCode] of blockedCases) {
  assertBlocked(compose(overrides), expectedCode, caseName);
  assert.equal(
    firstBlockedCode(overrides) !== undefined,
    true,
    `${caseName}: should produce at least one block code`,
  );
}

assert.equal(
  compose({
    base_agent_source: "reference/kernel_lab/planner_kernel/",
  }).package_blockers.block_codes.includes("BLOCKED_SOURCE_MODEL_DEPRECATED_FIELD"),
  true,
);
assert.equal(
  compose({
    source_refs: packageSourceRefs(),
  }).package_blockers.status,
  "PASS",
);
assert.equal(
  compose({
    contract_refs: materializationContractRefs.slice(0, -1),
  }).package_blockers.block_codes.includes("BLOCKED_CONTRACT_CHAIN_INVALID"),
  true,
);
assert.equal(
  validatePackageRequestBoundary({ target_agent_id: "planner" }).block_codes.includes(
    "BLOCKED_AGENT_LEVEL_REQUEST",
  ),
  true,
);
assert.equal(
  detectUnsafeSignals({ create_pull_request: true })
    .map((block) => block.code)
    .includes("BLOCKED_GITHUB_WRITE_SIGNAL"),
  true,
);

console.log(
  "MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PACKAGE_ORCHESTRATION_IMPLEMENTATION_TEST: PASS",
);
