import assert from "node:assert/strict";

import {
  allowedPlannedOperations,
  forbiddenExecutedOperations,
  runDryRunOnlyMaterializerPrototype,
} from "./dry-run-only-materializer-prototype.mjs";
import {
  createDryRunOnlyFixtureRequest,
  finalSourceRoots,
  materializationContractRefs,
} from "./dry-run-only-materializer-prototype.fixture-model.mjs";

const requiredTopLevelSections = Object.freeze([
  "result_identity",
  "boundary_result",
  "contract_chain_result",
  "resolved_source_plan",
  "template_resolution_result",
  "render_context_plan",
  "target_adapter_plan",
  "output_plan_entries",
  "dry_run_boundary_result",
  "write_approval_protocol_result",
  "dry_run_report_model_ref",
  "blocking_summary",
  "no_read_no_write_evidence",
  "non_authorization_summary",
]);

const exactNoReadNoWriteEvidence = Object.freeze({
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

const nonAuthorizationFalseFields = Object.freeze([
  "materialization_authorized",
  "target_read_authorized",
  "target_write_authorized",
  "filesystem_access_to_target_authorized",
  "github_write_authorized",
  "productive_skill_mutation_authorized",
  "writer_created",
  "renderer_created",
  "loader_created",
  "scenario_selector_created",
  "target_adapter_created",
  "write_approval_created",
  "approval_state_authorizes_write",
  "approval_conceptually_eligible_authorizes_write",
]);

const forbiddenResultFieldNames = new Set([
  "persistent_report_path",
  "approval_token",
  "write_execution_id",
  "commit_hash",
  "branch_name",
  "pull_request_url",
  "target_real_path",
  "target_absolute_path",
  "file_content_real",
  "generated_file_real",
  "materialized_output_real",
]);

const forbiddenResultStringTokens = Object.freeze([
  "/tmp/",
  "/Users/",
  "file://",
  "file_content_real",
  "generated_file_real",
  "materialized_output_real",
]);

function runFixture(overrides = {}) {
  return runDryRunOnlyMaterializerPrototype(
    createDryRunOnlyFixtureRequest(overrides),
  );
}

function assertBlocked(overrides, expectedBlockCode, caseName) {
  return assertBlockedResult(runFixture(overrides), expectedBlockCode, caseName);
}

function assertBlockedRaw(request, expectedBlockCode, caseName) {
  return assertBlockedResult(
    runDryRunOnlyMaterializerPrototype(request),
    expectedBlockCode,
    caseName,
  );
}

function assertBlockedResult(result, expectedBlockCode, caseName) {
  assertCommonResultBoundary(result, caseName);
  assert.equal(result.boundary_result.status, "BLOCKED", caseName);
  assert.equal(result.blocking_summary.status, "BLOCKED", caseName);
  assert.equal(result.blocking_summary.blocked, true, caseName);
  assert.ok(
    result.blocking_summary.block_codes.includes(expectedBlockCode),
    `${caseName}: expected ${expectedBlockCode}, got ${result.blocking_summary.block_codes.join(
      ", ",
    )}`,
  );
  return result;
}

function assertPassingResult(result, caseName) {
  assertCommonResultBoundary(result, caseName);
  assert.equal(result.boundary_result.status, "PASS", caseName);
  assert.equal(result.blocking_summary.status, "PASS", caseName);
  assert.equal(result.blocking_summary.blocked, false, caseName);
  assert.deepEqual(result.blocking_summary.block_codes, [], caseName);
}

function assertCommonResultBoundary(result, caseName) {
  assertRequiredTopLevelSections(result, caseName);
  assertNoForbiddenResultFields(result, caseName);
  assertNoReadNoWriteEvidence(result, caseName);
  assertNonAuthorizationSummary(result, caseName);
  assertWriteApprovalStillNoWrite(result, caseName);
}

function assertRequiredTopLevelSections(result, caseName) {
  for (const section of requiredTopLevelSections) {
    assert.ok(
      Object.hasOwn(result, section),
      `${caseName}: missing top-level section ${section}`,
    );
  }
}

function assertNoForbiddenResultFields(value, caseName, path = []) {
  if (Array.isArray(value)) {
    value.forEach((entry, index) =>
      assertNoForbiddenResultFields(entry, caseName, [...path, String(index)]),
    );
    return;
  }

  if (value && typeof value === "object") {
    for (const [key, entry] of Object.entries(value)) {
      assert.ok(
        !forbiddenResultFieldNames.has(key),
        `${caseName}: forbidden result field ${[...path, key].join(".")}`,
      );
      assertNoForbiddenResultFields(entry, caseName, [...path, key]);
    }
    return;
  }

  if (typeof value === "string") {
    for (const token of forbiddenResultStringTokens) {
      assert.ok(
        !value.includes(token),
        `${caseName}: forbidden result token ${token} at ${path.join(".")}`,
      );
    }
    assert.ok(
      !isAbsoluteHostPath(value),
      `${caseName}: absolute host path leaked at ${path.join(".")}`,
    );
  }
}

function assertNoReadNoWriteEvidence(result, caseName) {
  assert.deepEqual(
    result.no_read_no_write_evidence,
    exactNoReadNoWriteEvidence,
    caseName,
  );
}

function assertNonAuthorizationSummary(result, caseName) {
  for (const field of nonAuthorizationFalseFields) {
    assert.equal(
      result.non_authorization_summary[field],
      false,
      `${caseName}: ${field} must remain false`,
    );
  }
}

function assertWriteApprovalStillNoWrite(result, caseName) {
  assert.equal(
    result.write_approval_protocol_result.still_no_write,
    true,
    `${caseName}: approval protocol must remain still-no-write`,
  );
  for (const field of [
    "write_authorized",
    "approval_token_issued",
    "approval_registry_created",
    "signer_created",
    "real_write_approval_created",
    "approval_conceptually_eligible_authorizes_write",
  ]) {
    assert.equal(
      result.write_approval_protocol_result[field],
      false,
      `${caseName}: ${field} must remain false`,
    );
  }
}

function assertPassingPlannedOnly(result, expectedOperation, caseName) {
  assert.ok(result.output_plan_entries.length > 0, caseName);
  for (const entry of result.output_plan_entries) {
    assert.ok(
      allowedPlannedOperations.includes(entry.operation),
      `${caseName}: operation ${entry.operation} must be planned-only`,
    );
    assert.equal(entry.operation, expectedOperation, caseName);
    assert.ok(
      !forbiddenExecutedOperations.includes(entry.operation),
      `${caseName}: executed operation leaked`,
    );
    assert.ok(
      !String(entry.operation).endsWith("_EXECUTED"),
      `${caseName}: *_EXECUTED operation leaked`,
    );
  }
}

function assertPassingPathsStayConceptual(result, caseName) {
  assert.equal(
    result.target_adapter_plan.planned_output_root_policy,
    "target-root-relative-only",
    caseName,
  );
  assert.equal(result.target_adapter_plan.real_target_path_resolved, false, caseName);
  assert.equal(
    result.dry_run_boundary_result.planned_path_converted_to_real_path,
    false,
    caseName,
  );
  for (const entry of result.output_plan_entries) {
    assert.ok(!isAbsoluteHostPath(entry.planned_path), caseName);
    assert.ok(!entry.planned_path.includes(".."), caseName);
    assert.ok(
      entry.planned_path.startsWith(".codex/agents/") ||
        entry.planned_path.startsWith(".github/agents/"),
      `${caseName}: planned path must stay target-root-relative`,
    );
  }
}

function isAbsoluteHostPath(value) {
  return (
    typeof value === "string" &&
    (value.startsWith("/") || /^[A-Za-z]:[\\/]/.test(value) || value.startsWith("file://"))
  );
}

const happy = runFixture();
assertPassingResult(happy, "happy path");
assert.equal(happy.boundary_result.fixture_only, true);
assert.equal(happy.boundary_result.model_only, true);
assert.equal(happy.boundary_result.in_memory_only, true);
assert.deepEqual(happy.resolved_source_plan.final_source_roots, finalSourceRoots);
assertPassingPlannedOnly(happy, "CREATE_PLANNED", "happy path");
assertPassingPathsStayConceptual(happy, "happy path");
assert.equal(
  happy.write_approval_protocol_result.approval_state,
  "APPROVAL_CONCEPTUALLY_ELIGIBLE",
);
assert.equal(
  happy.write_approval_protocol_result.approval_conceptually_eligible_authorizes_write,
  false,
);

for (const plannedOperation of allowedPlannedOperations) {
  const result = runFixture({ planned_operation: plannedOperation });
  assertPassingResult(result, `planned operation ${plannedOperation}`);
  assertPassingPlannedOnly(result, plannedOperation, `planned operation ${plannedOperation}`);
}

const requestShapeCases = [
  {
    name: "request null",
    request: null,
    code: "BLOCKED_REQUEST_MODEL_INVALID",
  },
  {
    name: "request undefined",
    request: undefined,
    code: "BLOCKED_REQUEST_MODEL_INVALID",
  },
  {
    name: "request string",
    request: "dry-run request",
    code: "BLOCKED_REQUEST_MODEL_INVALID",
  },
  {
    name: "request array",
    request: [],
    code: "BLOCKED_REQUEST_MODEL_INVALID",
  },
];

for (const { name, request, code } of requestShapeCases) {
  assertBlockedRaw(request, code, name);
}

for (const { name, overrides, code } of [
  {
    name: "request without request_kind",
    overrides: { request_kind: undefined },
    code: "BLOCKED_REQUEST_KIND_INVALID",
  },
  {
    name: "invalid request_kind",
    overrides: { request_kind: "materialize_now" },
    code: "BLOCKED_REQUEST_KIND_INVALID",
  },
  {
    name: "invalid canonical_target_id",
    overrides: { canonical_target_id: "vscode" },
    code: "BLOCKED_TARGET_ROOT_INVALID",
  },
  {
    name: "agent_ids missing",
    overrides: { agent_ids: undefined },
    code: "BLOCKED_SOURCE_MODEL_INVALID",
  },
  {
    name: "agent_ids empty",
    overrides: { agent_ids: [] },
    code: "BLOCKED_SOURCE_MODEL_INVALID",
  },
  {
    name: "agent_ids non-array",
    overrides: { agent_ids: "planner" },
    code: "BLOCKED_SOURCE_MODEL_INVALID",
  },
]) {
  assertBlocked(overrides, code, name);
}

for (const { name, sourceRoots, code } of [
  {
    name: "source_roots missing",
    sourceRoots: undefined,
    code: "BLOCKED_SOURCE_MODEL_INVALID",
  },
  {
    name: "source_roots empty",
    sourceRoots: [],
    code: "BLOCKED_SOURCE_MODEL_INVALID",
  },
  {
    name: "source_roots non-array",
    sourceRoots: "reference/kernel_lab/",
    code: "BLOCKED_SOURCE_MODEL_INVALID",
  },
  {
    name: "source root unknown",
    sourceRoots: ["reference/unknown/"],
    code: "BLOCKED_SOURCE_MODEL_INVALID",
  },
  {
    name: "source root reference agents no slash",
    sourceRoots: ["reference/agents"],
    code: "BLOCKED_BASE_AGENT_FINAL_DEPENDENCY",
  },
  {
    name: "source root reference agents slash",
    sourceRoots: ["reference/agents/"],
    code: "BLOCKED_BASE_AGENT_FINAL_DEPENDENCY",
  },
  {
    name: "source root reference agents child",
    sourceRoots: ["reference/agents/foo"],
    code: "BLOCKED_BASE_AGENT_FINAL_DEPENDENCY",
  },
  {
    name: "source root productive skill",
    sourceRoots: ["skills/stnl_project_agent_specializer/"],
    code: "BLOCKED_PATH_UNSAFE",
  },
  {
    name: "source root traversal",
    sourceRoots: ["../reference/kernel_lab/"],
    code: "BLOCKED_PATH_UNSAFE",
  },
  {
    name: "source root absolute path",
    sourceRoots: ["/tmp/sentinel-target"],
    code: "BLOCKED_PATH_UNSAFE",
  },
]) {
  assertBlocked({ source_roots: sourceRoots }, code, name);
}

const contractRefsWithoutFirstRequired = materializationContractRefs.slice(1);

for (const { name, contractRefs, code } of [
  {
    name: "contract_refs missing",
    contractRefs: undefined,
    code: "BLOCKED_CONTRACT_CHAIN_INVALID",
  },
  {
    name: "contract_refs non-array",
    contractRefs: "reference/materialization_lab/contracts/SOURCE_MODEL_CONTRACT.md",
    code: "BLOCKED_CONTRACT_CHAIN_INVALID",
  },
  {
    name: "contract_refs empty",
    contractRefs: [],
    code: "BLOCKED_CONTRACT_CHAIN_INVALID",
  },
  {
    name: "contract_refs required missing",
    contractRefs: contractRefsWithoutFirstRequired,
    code: "BLOCKED_CONTRACT_CHAIN_INVALID",
  },
  {
    name: "contract_refs absolute path",
    contractRefs: [...materializationContractRefs, "/tmp/SOURCE_MODEL_CONTRACT.md"],
    code: "BLOCKED_PATH_UNSAFE",
  },
  {
    name: "contract_refs traversal",
    contractRefs: [
      ...materializationContractRefs,
      "../reference/materialization_lab/contracts/SOURCE_MODEL_CONTRACT.md",
    ],
    code: "BLOCKED_PATH_UNSAFE",
  },
  {
    name: "contract_refs productive skill",
    contractRefs: [
      ...materializationContractRefs,
      "skills/stnl_project_agent_specializer/reference/materialization_lab/contracts/SOURCE_MODEL_CONTRACT.md",
    ],
    code: "BLOCKED_PATH_UNSAFE",
  },
  {
    name: "contract_refs unknown replacing required",
    contractRefs: [
      "reference/materialization_lab/contracts/UNKNOWN_CONTRACT.md",
      ...contractRefsWithoutFirstRequired,
    ],
    code: "BLOCKED_CONTRACT_CHAIN_INVALID",
  },
]) {
  assertBlocked({ contract_refs: contractRefs }, code, name);
}

for (const { name, overrides, code } of [
  {
    name: "template_refs missing",
    overrides: { template_refs: undefined },
    code: "BLOCKED_TEMPLATE_MISSING",
  },
  {
    name: "template_refs non-array",
    overrides: { template_refs: "reference/templates/codex/agent.toml" },
    code: "BLOCKED_TEMPLATE_MISSING",
  },
  {
    name: "template_refs empty",
    overrides: { template_refs: [] },
    code: "BLOCKED_TEMPLATE_MISSING",
  },
  {
    name: "template_refs unknown",
    overrides: { template_refs: ["reference/templates/codex/unknown.toml"] },
    code: "BLOCKED_TEMPLATE_MISSING",
  },
  {
    name: "template_refs outside templates",
    overrides: {
      template_refs: [
        "reference/materialization_lab/contracts/SOURCE_MODEL_CONTRACT.md",
      ],
    },
    code: "BLOCKED_TEMPLATE_MISSING",
  },
  {
    name: "template_refs absolute path",
    overrides: { template_refs: ["/tmp/agent.toml"] },
    code: "BLOCKED_PATH_UNSAFE",
  },
  {
    name: "template_refs traversal",
    overrides: { template_refs: ["../reference/templates/codex/agent.toml"] },
    code: "BLOCKED_PATH_UNSAFE",
  },
  {
    name: "template inferred by path",
    overrides: { template_inference_by_path: true },
    code: "BLOCKED_TEMPLATE_INFERRED",
  },
  {
    name: "template inferred by nearby file",
    overrides: { template_policy: { explicit_only: true, source: "nearby file" } },
    code: "BLOCKED_TEMPLATE_INFERRED",
  },
  {
    name: "template inferred by legacy target",
    overrides: { template_policy: { explicit_only: true, source: "legacy target" } },
    code: "BLOCKED_TEMPLATE_INFERRED",
  },
  {
    name: "template inferred by implicit convention",
    overrides: {
      template_policy: { explicit_only: true, source: "implicit convention" },
    },
    code: "BLOCKED_TEMPLATE_INFERRED",
  },
]) {
  assertBlocked(overrides, code, name);
}

for (const approvalPolicy of [
  "APPROVED",
  "WRITE_APPROVED",
  "APPROVAL_GRANTED",
  "READY_TO_WRITE",
  "WRITE_UNLOCKED",
  "EXECUTION_APPROVED",
  "MERGE_APPROVED",
  "approved",
  "write-approved",
  "ready to write",
  "write unlocked",
  "approval granted",
]) {
  const result = assertBlocked(
    { approval_policy: approvalPolicy },
    "BLOCKED_APPROVAL_POSITIVE_SEMANTICS",
    `approval positive semantics ${approvalPolicy}`,
  );
  assert.ok(
    !result.blocking_summary.block_codes.includes(
      "BLOCKED_APPROVAL_POLICY_INVALID",
    ),
    `approval positive semantics ${approvalPolicy}: should not fall through to generic policy invalid`,
  );
}

const invalidApprovalPolicy = assertBlocked(
  { approval_policy: "manual-review-pending" },
  "BLOCKED_APPROVAL_POLICY_INVALID",
  "approval invalid non-positive",
);
assert.ok(
  !invalidApprovalPolicy.blocking_summary.block_codes.includes(
    "BLOCKED_APPROVAL_POSITIVE_SEMANTICS",
  ),
  "approval invalid non-positive should preserve generic policy invalid",
);

for (const { name, overrides, code } of [
  {
    name: "path safety tmp",
    overrides: { path_probe: "/tmp/sentinel-target" },
    code: "BLOCKED_PATH_UNSAFE",
  },
  {
    name: "path safety users",
    overrides: { path_probe: "/Users/example/project" },
    code: "BLOCKED_PATH_UNSAFE",
  },
  {
    name: "path safety file url",
    overrides: { path_probe: "file:///tmp/sentinel-target" },
    code: "BLOCKED_PATH_UNSAFE",
  },
  {
    name: "path safety windows absolute",
    overrides: { path_probe: "C:\\Users\\example\\sentinel-target" },
    code: "BLOCKED_PATH_UNSAFE",
  },
  {
    name: "path safety windows traversal",
    overrides: { path_probe: "..\\sentinel-target" },
    code: "BLOCKED_PATH_UNSAFE",
  },
  {
    name: "path safety posix traversal",
    overrides: { path_probe: "../sentinel-target" },
    code: "BLOCKED_PATH_UNSAFE",
  },
  {
    name: "path safety target real indicator",
    overrides: { path_probe: "target_real_path" },
    code: "BLOCKED_PATH_UNSAFE",
  },
  {
    name: "path safety target absolute indicator",
    overrides: { target_absolute_path: "target_absolute_path" },
    code: "BLOCKED_PATH_UNSAFE",
  },
  {
    name: "path safety productive skill",
    overrides: { path_probe: "skills/stnl_project_agent_specializer/" },
    code: "BLOCKED_PATH_UNSAFE",
  },
  {
    name: "generated codex output requested",
    overrides: { generated_file: ".codex/agents/planner.toml" },
    code: "BLOCKED_GENERATED_OUTPUT_REQUESTED",
  },
  {
    name: "generated github output requested",
    overrides: { generated_file: ".github/agents/planner.agent.md" },
    code: "BLOCKED_GENERATED_OUTPUT_REQUESTED",
  },
  {
    name: "generated AGENTS output requested",
    overrides: { generated_file: "AGENTS.md" },
    code: "BLOCKED_GENERATED_OUTPUT_REQUESTED",
  },
]) {
  assertBlocked(overrides, code, name);
}

for (const { operation, code } of [
  { operation: "CREATE_EXECUTED", code: "BLOCKED_EXECUTED_OPERATION_FORBIDDEN" },
  { operation: "UPDATE_EXECUTED", code: "BLOCKED_EXECUTED_OPERATION_FORBIDDEN" },
  { operation: "DELETE_EXECUTED", code: "BLOCKED_EXECUTED_OPERATION_FORBIDDEN" },
  { operation: "WRITE_EXECUTED", code: "BLOCKED_EXECUTED_OPERATION_FORBIDDEN" },
  { operation: "SOMETHING_EXECUTED", code: "BLOCKED_EXECUTED_OPERATION_FORBIDDEN" },
  { operation: "CREATE_REAL", code: "BLOCKED_PLANNED_OPERATION_INVALID" },
  { operation: "WRITE_REAL", code: "BLOCKED_PLANNED_OPERATION_INVALID" },
  { operation: "DELETE_REAL", code: "BLOCKED_PLANNED_OPERATION_INVALID" },
  { operation: "SOMETHING_PLANNED", code: "BLOCKED_PLANNED_OPERATION_INVALID" },
  { operation: undefined, code: "BLOCKED_PLANNED_OPERATION_INVALID" },
]) {
  assertBlocked(
    { planned_operation: operation },
    code,
    `planned operation ${String(operation)}`,
  );
}

for (const { name, overrides, code } of [
  {
    name: "dry_run_required false",
    overrides: { dry_run_required: false },
    code: "BLOCKED_DRY_RUN_REQUIRED",
  },
  {
    name: "write execution policy allows writing",
    overrides: { write_execution_policy: "allows writing" },
    code: "BLOCKED_VALIDATION_WRITE_ATTEMPT",
  },
  {
    name: "target read policy allows real read",
    overrides: { target_read_policy: "allows Target real read" },
    code: "BLOCKED_TARGET_REAL_READ",
  },
  {
    name: "target write policy allows real write",
    overrides: { target_write_policy: "allows Target real write" },
    code: "BLOCKED_TARGET_FILE_MUTATION",
  },
  {
    name: "persistent report policy writes report",
    overrides: { persistent_report_policy: "writes persistent report" },
    code: "BLOCKED_SCRIPT_OUTPUT_UNAUTHORIZED",
  },
  {
    name: "approval token requested",
    overrides: { approval_token: "fixture-token" },
    code: "BLOCKED_APPROVAL_TOKEN",
  },
  {
    name: "write execution id requested",
    overrides: { write_execution_id: "fixture-write-execution-id" },
    code: "BLOCKED_WRITE_EXECUTION_ID",
  },
  {
    name: "mandatory runtime payload requested",
    overrides: { mandatory_runtime_payload: { required: true } },
    code: "BLOCKED_RUNTIME_PAYLOAD_REQUIRED",
  },
]) {
  assertBlocked(overrides, code, name);
}

console.log("MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_TEST: PASS");
