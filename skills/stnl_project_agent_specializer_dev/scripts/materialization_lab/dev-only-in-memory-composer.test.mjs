import assert from "node:assert/strict";

import {
  allowedExplicitTemplateRefs,
  buildNoReadNoWriteEvidence,
  composeDevOnlyInMemoryMaterialization,
  composeRenderContext,
  composeSourceChain,
  composeTargetOutputPlan,
  composeTemplateRefs,
  materializationContractRefs,
  validateComposerRequestBoundary,
} from "./dev-only-in-memory-composer.mjs";

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

const requiredTopLevelSections = Object.freeze([
  "composer_result_identity",
  "composition_boundary_result",
  "source_chain_composition",
  "template_ref_composition",
  "render_context_composition",
  "target_output_plan_composition",
  "planned_agent_materialization_model",
  "dry_run_boundary_result",
  "write_approval_non_authorization_result",
  "no_read_no_write_evidence",
  "blocking_summary",
  "non_authorization_summary",
  "audit_expectation_summary",
]);

const forbiddenOutputFieldNames = new Set([
  "materialized_file",
  "generated_file",
  "renderer_output",
  "writer_output",
  "target_absolute_path",
  "target_real_path",
  "host_absolute_path",
  "persistent_report_path",
  "approval_token",
  "approval_signature",
  "approval_registry_entry",
  "write_execution_id",
  "materializer_execution_id",
  "commit_hash",
  "branch_name",
  "pull_request_url",
  "github_write_result",
]);

function createComposerRequest(overrides = {}) {
  return {
    request_identity: "conceptual:composer-request:planner-codex",
    target_agent_id: "planner",
    target_kind: "codex",
    source_refs: [
      "reference/kernel_lab/planner_kernel/",
      "reference/seniorization_lab/planner_profile/SENIOR_AGENT_PROFILE.md",
      "reference/templates/codex/agent.toml",
      "reference/materialization_lab/contracts/SOURCE_MODEL_CONTRACT.md",
    ],
    kernel_module_refs: ["reference/kernel_lab/planner_kernel/"],
    senior_profile_refs: [
      "reference/seniorization_lab/planner_profile/SENIOR_AGENT_PROFILE.md",
    ],
    template_refs: [
      "reference/templates/codex/agent.toml",
      "reference/templates/codex/config.toml",
      "reference/templates/codex/AGENTS.md",
    ],
    render_context_plan_ref:
      "conceptual:render-context-plan:dev-only-in-memory",
    target_output_plan_ref:
      "conceptual:target-output-plan:target-root-relative-only",
    dry_run_boundary_ref: "conceptual:dry-run-boundary:still-no-write",
    write_approval_boundary_ref:
      "conceptual:write-approval-boundary:non-authorizing",
    contract_refs: [...materializationContractRefs],
    planned_output_entries: [
      {
        target_agent_id: "planner",
        conceptual_output_role: "codex-agent",
        target_root_relative_conceptual_path: ".codex/agents/planner.toml",
        operation: "CREATE_PLANNED",
      },
      {
        target_agent_id: "planner",
        conceptual_output_role: "codex-config",
        target_root_relative_conceptual_path: ".codex/config.toml",
        operation: "UNCHANGED_PLANNED",
      },
    ],
    approval_requested: true,
    ...overrides,
  };
}

function compose(overrides = {}) {
  return composeDevOnlyInMemoryMaterialization(createComposerRequest(overrides));
}

function assertPassingResult(result, caseName) {
  assertCommonResultBoundary(result, caseName);
  assert.equal(result.composition_boundary_result.status, "PASS", caseName);
  assert.equal(result.blocking_summary.status, "PASS", caseName);
  assert.equal(result.blocking_summary.blocked, false, caseName);
  assert.deepEqual(result.blocking_summary.block_codes, [], caseName);
  assert.equal(
    result.planned_agent_materialization_model.status,
    "ACCEPTED",
    caseName,
  );
}

function assertBlockedResult(result, expectedCode, caseName) {
  assertCommonResultBoundary(result, caseName);
  assert.equal(result.composition_boundary_result.status, "BLOCKED", caseName);
  assert.equal(result.blocking_summary.status, "BLOCKED", caseName);
  assert.equal(result.blocking_summary.blocked, true, caseName);
  assert.ok(
    result.blocking_summary.block_codes.includes(expectedCode),
    `${caseName}: expected ${expectedCode}, got ${result.blocking_summary.block_codes.join(
      ", ",
    )}`,
  );
  assert.equal(
    result.planned_agent_materialization_model.status,
    "BLOCKED",
    caseName,
  );
}

function assertBlocked(overrides, expectedCode, caseName) {
  assertBlockedResult(compose(overrides), expectedCode, caseName);
}

function assertCommonResultBoundary(result, caseName) {
  for (const section of requiredTopLevelSections) {
    assert.ok(
      Object.hasOwn(result, section),
      `${caseName}: missing top-level section ${section}`,
    );
  }

  assertNoForbiddenOutputFields(result, caseName);
  assert.deepEqual(
    result.no_read_no_write_evidence,
    exactNoReadNoWriteEvidence,
    caseName,
  );
  assert.deepEqual(buildNoReadNoWriteEvidence(), exactNoReadNoWriteEvidence);
  assert.equal(result.dry_run_boundary_result.write_executed, false, caseName);
  assert.equal(result.dry_run_boundary_result.patch_applied, false, caseName);
  assert.equal(
    result.write_approval_non_authorization_result.still_no_write,
    true,
    caseName,
  );
  assert.equal(
    result.write_approval_non_authorization_result.write_authorized,
    false,
    caseName,
  );
  assert.equal(
    result.write_approval_non_authorization_result.approval_token_issued,
    false,
    caseName,
  );
  assertNonAuthorizationSummary(result, caseName);
}

function assertNoForbiddenOutputFields(value, caseName, path = []) {
  if (Array.isArray(value)) {
    value.forEach((entry, index) =>
      assertNoForbiddenOutputFields(entry, caseName, [...path, String(index)]),
    );
    return;
  }

  if (value && typeof value === "object") {
    for (const [key, entry] of Object.entries(value)) {
      assert.ok(
        !forbiddenOutputFieldNames.has(key),
        `${caseName}: forbidden output field ${[...path, key].join(".")}`,
      );
      assertNoForbiddenOutputFields(entry, caseName, [...path, key]);
    }
  }
}

function assertNonAuthorizationSummary(result, caseName) {
  const summary = result.non_authorization_summary;
  for (const field of [
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
    "approval_token_issued",
    "approval_registry_created",
    "approval_signature_issued",
    "signer_created",
    "persistent_report_authorized",
    "generated_content_authorized",
    "materialized_content_authorized",
    "patch_or_diff_application_authorized",
    "commit_authorized",
    "branch_authorized",
    "pull_request_authorized",
    "approval_state_authorizes_write",
    "conceptual_eligibility_authorizes_write",
  ]) {
    assert.equal(summary[field], false, `${caseName}: ${field} must be false`);
  }

  for (const capability of [
    "real materialization",
    "real Target read/write",
    "writer creation",
    "renderer creation",
    "approval token",
    "persistent report",
    "generated output",
    "materialized output",
    "patch/diff application",
    "GitHub write",
    "productive skill mutation",
    "commit",
    "branch",
    "pull request",
  ]) {
    assert.ok(
      summary.non_authorized_capabilities.includes(capability),
      `${caseName}: missing non-authorization capability ${capability}`,
    );
  }
}

const happy = compose();
assertPassingResult(happy, "happy path conceptual accepted");
assert.equal(
  happy.composer_result_identity.composer_name,
  "DEV_ONLY_IN_MEMORY_MATERIALIZATION_COMPOSER",
);
assert.ok(happy.planned_agent_materialization_model);
assert.equal(
  happy.planned_agent_materialization_model.request_identity,
  "conceptual:composer-request:planner-codex",
);
assert.deepEqual(
  happy.template_ref_composition.explicit_template_refs,
  [
    "reference/templates/codex/agent.toml",
    "reference/templates/codex/config.toml",
    "reference/templates/codex/AGENTS.md",
  ],
);
assert.ok(
  happy.source_chain_composition.source_refs.includes(
    "reference/kernel_lab/planner_kernel/",
  ),
);
assert.ok(
  happy.source_chain_composition.senior_profile_refs.includes(
    "reference/seniorization_lab/planner_profile/SENIOR_AGENT_PROFILE.md",
  ),
);
assert.deepEqual(
  happy.target_output_plan_composition.planned_output_entries.map(
    (entry) => entry.operation,
  ),
  ["CREATE_PLANNED", "UNCHANGED_PLANNED"],
);
assert.equal(happy.audit_expectation_summary.outside_aggregator, true);
assert.equal(happy.audit_expectation_summary.aggregator_child_registered, false);
assert.equal(happy.audit_expectation_summary.checker_created, false);

assert.equal(
  validateComposerRequestBoundary(createComposerRequest()).status,
  "PASS",
);
assert.equal(composeSourceChain(createComposerRequest()).status, "PASS");
assert.equal(composeTemplateRefs(createComposerRequest()).status, "PASS");
assert.equal(composeRenderContext(createComposerRequest()).status, "PASS");
assert.equal(composeTargetOutputPlan(createComposerRequest()).status, "PASS");
assert.deepEqual(
  allowedExplicitTemplateRefs,
  [
    "reference/templates/copilot/agent.md",
    "reference/templates/codex/agent.toml",
    "reference/templates/codex/config.toml",
    "reference/templates/codex/AGENTS.md",
  ],
);

assertBlocked(
  { source_refs: ["reference/agents/planner.agent.md"] },
  "BLOCKED_BASE_AGENT_FINAL_DEPENDENCY",
  "reference/agents blocked as source final",
);
assertBlocked(
  { source_refs: ["skills/stnl_project_agent_specializer/planner.agent.md"] },
  "BLOCKED_PRODUCTIVE_SKILL_MUTATION",
  "productive skill blocked",
);
assertBlocked(
  { template_refs: undefined },
  "BLOCKED_TEMPLATE_MISSING",
  "template_refs missing blocked",
);
assertBlocked(
  { template_refs: [] },
  "BLOCKED_TEMPLATE_MISSING",
  "template_refs empty blocked",
);
assertBlocked(
  {
    template_refs: [
      "reference/materialization_lab/contracts/SOURCE_MODEL_CONTRACT.md",
    ],
  },
  "BLOCKED_TEMPLATE_MISSING",
  "template outside reference/templates blocked",
);
assertBlocked(
  { inferred_template_request: true },
  "BLOCKED_TEMPLATE_INFERRED",
  "template inference blocked",
);
assertBlocked(
  { template_selection_by_output_path: true },
  "BLOCKED_TEMPLATE_INFERRED",
  "template selection by output path blocked",
);
assertBlocked(
  { renderer_payload: { mode: "render" } },
  "BLOCKED_UNSAFE_RENDER",
  "renderer payload blocked",
);
assertBlocked(
  { writer_payload: { mode: "write" } },
  "BLOCKED_VALIDATION_WRITE_ATTEMPT",
  "writer payload blocked",
);
assertBlocked(
  { target_real_path: "/tmp/sentinel-target" },
  "BLOCKED_PATH_UNSAFE",
  "Target real path blocked",
);
assertBlocked(
  { host_absolute_path: "/Users/example/sentinel-target" },
  "BLOCKED_PATH_UNSAFE",
  "host absolute path blocked",
);
assertBlocked(
  { filesystem_read_target: true },
  "BLOCKED_TARGET_REAL_READ",
  "filesystem read target signal blocked",
);
assertBlocked(
  { filesystem_write_target: true },
  "BLOCKED_TARGET_FILE_MUTATION",
  "filesystem write target signal blocked",
);
assertBlocked(
  { filesystem_stat_request: true },
  "BLOCKED_PATH_UNSAFE",
  "filesystem stat signal blocked",
);
assertBlocked(
  { directory_listing_request: true },
  "BLOCKED_PATH_UNSAFE",
  "directory listing signal blocked",
);
assertBlocked(
  { github_write_target: "https://github.com/acme/repo/pull/new/main" },
  "BLOCKED_GITHUB_WRITE",
  "GitHub write blocked",
);
assertBlocked(
  { approval_token: "token" },
  "BLOCKED_APPROVAL_TOKEN",
  "approval token blocked",
);
assertBlocked(
  { approval_signature: "signature" },
  "BLOCKED_APPROVAL_TOKEN",
  "approval signature blocked",
);
assertBlocked(
  { approval_registry: "registry" },
  "BLOCKED_APPROVAL_TOKEN",
  "approval registry blocked",
);
assertBlocked(
  { approval_policy: "WRITE_APPROVED" },
  "BLOCKED_APPROVAL_POSITIVE_SEMANTICS",
  "positive approval semantics blocked",
);
assertBlocked(
  { persisted_report_path: "reports/composer.json" },
  "BLOCKED_SCRIPT_OUTPUT_UNAUTHORIZED",
  "persistent report blocked",
);
assertBlocked(
  { generated_output_real_path: ".codex/agents/planner.toml" },
  "BLOCKED_GENERATED_OUTPUT_REQUESTED",
  "generated output blocked",
);
assertBlocked(
  { materialized_file: ".codex/agents/planner.toml" },
  "BLOCKED_GENERATED_OUTPUT_REQUESTED",
  "materialized output blocked",
);
assertBlocked(
  { runtime_command_payload: { command: "materialize" } },
  "BLOCKED_RUNTIME_MATERIALIZER_CREATED",
  "runtime payload blocked",
);
assertBlocked(
  { cli_execution_payload: { args: ["--target", "/tmp/target"] } },
  "BLOCKED_RUNTIME_MATERIALIZER_CREATED",
  "CLI payload blocked",
);
assertBlocked(
  {
    planned_output_entries: [
      {
        target_agent_id: "planner",
        conceptual_output_role: "codex-agent",
        target_root_relative_conceptual_path: ".codex/agents/planner.toml",
        operation: "CREATE_EXECUTED",
      },
    ],
  },
  "BLOCKED_EXECUTED_OPERATION_FORBIDDEN",
  "executed operation token blocked",
);
assertBlocked(
  { renderer_output: "rendered content" },
  "BLOCKED_UNSAFE_RENDER",
  "forbidden renderer output blocked",
);
assertBlocked(
  { writer_output: "write completed" },
  "BLOCKED_VALIDATION_WRITE_ATTEMPT",
  "forbidden writer output blocked",
);
assertBlocked(
  { approval_registry_entry: "entry" },
  "BLOCKED_APPROVAL_TOKEN",
  "forbidden approval registry entry blocked",
);
assertBlocked(
  { unknown_boundary_gap_signal: "requires new contract surface" },
  "CONTRACT_UPDATE_NEEDS_SEPARATE_DECISION",
  "contract update gap blocked",
);

console.log("MATERIALIZATION_DEV_ONLY_IN_MEMORY_COMPOSER_TEST: PASS");
