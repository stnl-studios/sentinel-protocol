import assert from "node:assert/strict";

import {
  allowedExplicitTemplateRefs,
  buildNoReadNoWriteEvidence,
  buildNonAuthorizationSummary,
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

const expectedAcceptedNonAuthorizationSummary = Object.freeze(
  buildNonAuthorizationSummary("APPROVAL_CONCEPTUALLY_ELIGIBLE"),
);

const expectedBlockedNonAuthorizationSummary = Object.freeze(
  buildNonAuthorizationSummary("APPROVAL_BLOCKED"),
);

function blockedCase(case_name, override_payload, expected_block_code) {
  return {
    case_name,
    override_payload,
    expected_block_code,
    expected_blocked_status: "BLOCKED",
    expected_no_read_no_write_evidence: exactNoReadNoWriteEvidence,
    expected_non_authorization: expectedBlockedNonAuthorizationSummary,
  };
}

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
  assertCommonResultBoundary(
    result,
    caseName,
    expectedAcceptedNonAuthorizationSummary,
  );
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
  assertCommonResultBoundary(
    result,
    caseName,
    expectedBlockedNonAuthorizationSummary,
  );
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

function assertCommonResultBoundary(
  result,
  caseName,
  expectedNonAuthorizationSummary,
) {
  assert.deepEqual(
    Object.keys(result),
    requiredTopLevelSections,
    `${caseName}: top-level result shape changed`,
  );

  assertNoForbiddenOutputFields(result, caseName);
  assertExactNoReadNoWriteEvidence(result, caseName);
  assert.deepEqual(buildNoReadNoWriteEvidence(), exactNoReadNoWriteEvidence);
  assertDryRunStillNoWrite(result, caseName);
  assertWriteApprovalNonAuthorization(
    result,
    expectedNonAuthorizationSummary.approval_state,
    caseName,
  );
  assertExactNonAuthorizationSummary(
    result,
    expectedNonAuthorizationSummary,
    caseName,
  );
  assertAggregatorIsolation(result, caseName);
}

function assertExactNoReadNoWriteEvidence(result, caseName) {
  assert.deepEqual(
    result.no_read_no_write_evidence,
    exactNoReadNoWriteEvidence,
    `${caseName}: no-read/no-write evidence changed`,
  );
}

function assertDryRunStillNoWrite(result, caseName) {
  const status = result.blocking_summary.blocked ? "BLOCKED" : "PASS";

  assert.deepEqual(
    result.dry_run_boundary_result,
    {
      status,
      dry_run_only: true,
      planned_only_operations_preserved: true,
      write_execution_policy: "prohibits writing",
      write_executed: false,
      patch_applied: false,
      target_real_access_permitted: false,
      planned_path_converted_to_real_path: false,
      persistent_report_written: false,
    },
    `${caseName}: dry-run boundary must remain still-no-write`,
  );
}

function assertWriteApprovalNonAuthorization(
  result,
  expectedApprovalState,
  caseName,
) {
  const status = result.blocking_summary.blocked ? "BLOCKED" : "PASS";

  assert.deepEqual(
    result.write_approval_non_authorization_result,
    {
      status,
      approval_state: expectedApprovalState,
      still_no_write: true,
      write_authorized: false,
      approval_token_issued: false,
      approval_registry_created: false,
      approval_signature_issued: false,
      signer_created: false,
      real_write_approval_created: false,
      conceptual_eligibility_authorizes_write: false,
    },
    `${caseName}: write approval must remain non-authorizing`,
  );
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

function assertExactNonAuthorizationSummary(
  result,
  expectedNonAuthorizationSummary,
  caseName,
) {
  assert.deepEqual(
    result.non_authorization_summary,
    expectedNonAuthorizationSummary,
    `${caseName}: non-authorization summary changed`,
  );
}

function assertAggregatorIsolation(result, caseName) {
  assert.equal(
    result.audit_expectation_summary.manual_local_dev_only,
    true,
    `${caseName}: test must remain manual/local/dev-only`,
  );
  assert.equal(
    result.audit_expectation_summary.outside_aggregator,
    true,
    `${caseName}: composer must remain outside Aggregator`,
  );
  assert.equal(
    result.audit_expectation_summary.official_check,
    false,
    `${caseName}: composer test must not become an official check`,
  );
  assert.equal(
    result.audit_expectation_summary.aggregator_child_registered,
    false,
    `${caseName}: composer test must not become an Aggregator child`,
  );
  assert.equal(
    result.audit_expectation_summary.checker_created,
    false,
    `${caseName}: composer test must not create a checker`,
  );
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

assert.throws(
  () =>
    assertNoForbiddenOutputFields(
      { accepted: { nested: { approval_token: "forbidden" } } },
      "recursive forbidden output smoke",
    ),
  /forbidden output field/,
);

function operationOverride(operation) {
  return {
    planned_output_entries: [
      {
        target_agent_id: "planner",
        conceptual_output_role: "codex-agent",
        target_root_relative_conceptual_path: ".codex/agents/planner.toml",
        operation,
      },
    ],
  };
}

const sourceBoundaryNegativeCases = [
  blockedCase(
    "source_refs absent",
    { source_refs: undefined },
    "BLOCKED_SOURCE_MODEL_INVALID",
  ),
  blockedCase(
    "source_refs empty",
    { source_refs: [] },
    "BLOCKED_SOURCE_MODEL_INVALID",
  ),
  blockedCase(
    "source_refs non-array",
    { source_refs: "reference/kernel_lab/planner_kernel/" },
    "BLOCKED_SOURCE_MODEL_INVALID",
  ),
  blockedCase(
    "source_refs outside allowed roots",
    { source_refs: ["docs/planner.md"] },
    "BLOCKED_SOURCE_MODEL_INVALID",
  ),
  blockedCase(
    "reference agents source final",
    { source_refs: ["reference/agents/planner.agent.md"] },
    "BLOCKED_BASE_AGENT_FINAL_DEPENDENCY",
  ),
  blockedCase(
    "reference agents nested source signal",
    { nested_source_model: { ref: "reference/agents/planner.agent.md" } },
    "BLOCKED_BASE_AGENT_FINAL_DEPENDENCY",
  ),
  blockedCase(
    "productive skill source final",
    { source_refs: ["skills/stnl_project_agent_specializer/planner.agent.md"] },
    "BLOCKED_PRODUCTIVE_SKILL_MUTATION",
  ),
  blockedCase(
    "productive skill nested source signal",
    {
      nested_source_model: {
        ref: "skills/stnl_project_agent_specializer/planner.agent.md",
      },
    },
    "BLOCKED_PRODUCTIVE_SKILL_MUTATION",
  ),
  blockedCase(
    "historical snapshot source final",
    {
      source_refs: [
        "reference/materialization_lab/fixtures/expected_outputs/planner.snapshot.md",
      ],
    },
    "BLOCKED_SOURCE_MODEL_INVALID",
  ),
  blockedCase(
    "nearby traversal source final",
    { source_refs: ["../nearby/planner.md"] },
    "BLOCKED_PATH_UNSAFE",
  ),
  blockedCase(
    "base_agent_source deprecated",
    { base_agent_source: "reference/kernel_lab/planner_kernel/legacy.md" },
    "BLOCKED_SOURCE_MODEL_DEPRECATED_FIELD",
  ),
  blockedCase(
    "kernel_module_refs outside kernel lab",
    {
      kernel_module_refs: [
        "reference/seniorization_lab/planner_profile/SENIOR_AGENT_PROFILE.md",
      ],
    },
    "BLOCKED_SOURCE_MODEL_INVALID",
  ),
  blockedCase(
    "senior_profile_refs outside seniorization lab",
    { senior_profile_refs: ["reference/kernel_lab/planner_kernel/"] },
    "BLOCKED_SOURCE_MODEL_INVALID",
  ),
];

const contractRefNegativeCases = [
  blockedCase(
    "contract_refs absent",
    { contract_refs: undefined },
    "BLOCKED_CONTRACT_CHAIN_INVALID",
  ),
  blockedCase(
    "contract_refs empty",
    { contract_refs: [] },
    "BLOCKED_CONTRACT_CHAIN_INVALID",
  ),
  blockedCase(
    "contract_refs non-array",
    {
      contract_refs:
        "reference/materialization_lab/contracts/SOURCE_MODEL_CONTRACT.md",
    },
    "BLOCKED_CONTRACT_CHAIN_INVALID",
  ),
  blockedCase(
    "contract_refs incomplete",
    { contract_refs: materializationContractRefs.slice(0, -1) },
    "BLOCKED_CONTRACT_CHAIN_INVALID",
  ),
  blockedCase(
    "contract_refs unknown",
    {
      contract_refs: [
        ...materializationContractRefs,
        "reference/materialization_lab/contracts/UNKNOWN_CONTRACT.md",
      ],
    },
    "BLOCKED_CONTRACT_CHAIN_INVALID",
  ),
  blockedCase(
    "contract_refs unsafe path",
    {
      contract_refs: [
        ...materializationContractRefs,
        "../contracts/SOURCE_MODEL_CONTRACT.md",
      ],
    },
    "BLOCKED_PATH_UNSAFE",
  ),
  blockedCase(
    "contract_refs reference agents",
    {
      contract_refs: [
        ...materializationContractRefs,
        "reference/agents/planner.agent.md",
      ],
    },
    "BLOCKED_BASE_AGENT_FINAL_DEPENDENCY",
  ),
  blockedCase(
    "contract_refs productive skill",
    {
      contract_refs: [
        ...materializationContractRefs,
        "skills/stnl_project_agent_specializer/planner.agent.md",
      ],
    },
    "BLOCKED_PRODUCTIVE_SKILL_MUTATION",
  ),
];

const templateExplicitnessNegativeCases = [
  blockedCase(
    "template_refs absent",
    { template_refs: undefined },
    "BLOCKED_TEMPLATE_MISSING",
  ),
  blockedCase(
    "template_refs empty",
    { template_refs: [] },
    "BLOCKED_TEMPLATE_MISSING",
  ),
  blockedCase(
    "template_refs non-array",
    { template_refs: "reference/templates/codex/agent.toml" },
    "BLOCKED_TEMPLATE_MISSING",
  ),
  blockedCase(
    "template outside reference/templates",
    {
      template_refs: [
        "reference/materialization_lab/contracts/SOURCE_MODEL_CONTRACT.md",
      ],
    },
    "BLOCKED_TEMPLATE_MISSING",
  ),
  blockedCase(
    "template unknown under reference/templates",
    { template_refs: ["reference/templates/codex/UNKNOWN.md"] },
    "BLOCKED_TEMPLATE_MISSING",
  ),
  blockedCase(
    "template reference agents source",
    { template_refs: ["reference/agents/planner.agent.md"] },
    "BLOCKED_BASE_AGENT_FINAL_DEPENDENCY",
  ),
  blockedCase(
    "template productive skill source",
    { template_refs: ["skills/stnl_project_agent_specializer/agent.toml"] },
    "BLOCKED_PRODUCTIVE_SKILL_MUTATION",
  ),
  blockedCase(
    "template inference by explicit path signal",
    { template_inference: "reference/templates/codex/agent.toml" },
    "BLOCKED_TEMPLATE_INFERRED",
  ),
  blockedCase(
    "template inference by output path",
    { template_selection_by_output_path: ".codex/agents/planner.toml" },
    "BLOCKED_TEMPLATE_INFERRED",
  ),
  blockedCase(
    "template inference by target agent",
    { template_selection_by_target_agent: "planner" },
    "BLOCKED_TEMPLATE_INFERRED",
  ),
  blockedCase(
    "implicit template fallback",
    { implicit_template_fallback: true },
    "BLOCKED_TEMPLATE_INFERRED",
  ),
  blockedCase(
    "nearby template source",
    { nearby_file_template_source: "nearby/agent.toml" },
    "BLOCKED_TEMPLATE_INFERRED",
  ),
  blockedCase(
    "legacy agent template source",
    { legacy_agent_template_source: "legacy/planner.agent.md" },
    "BLOCKED_TEMPLATE_INFERRED",
  ),
  blockedCase(
    "productive skill template source",
    {
      productive_skill_template_source:
        "skills/stnl_project_agent_specializer/agent.toml",
    },
    "BLOCKED_PRODUCTIVE_SKILL_MUTATION",
  ),
  blockedCase(
    "reference agents template source",
    { reference_agents_template_source: "reference/agents/planner.agent.md" },
    "BLOCKED_BASE_AGENT_FINAL_DEPENDENCY",
  ),
];

const semanticAliasNegativeCases = [
  blockedCase(
    "semantic alias snake_case github write",
    { github_write_target: true },
    "BLOCKED_GITHUB_WRITE",
  ),
  blockedCase(
    "semantic alias kebab-case github write",
    { "github-write-target": true },
    "BLOCKED_GITHUB_WRITE",
  ),
  blockedCase(
    "semantic alias camelCase github write",
    { githubWriteTarget: true },
    "BLOCKED_GITHUB_WRITE",
  ),
  blockedCase(
    "semantic alias PascalCase github write",
    { GithubWriteTarget: true },
    "BLOCKED_GITHUB_WRITE",
  ),
  blockedCase(
    "semantic alias space-separated github write",
    { "github write target": true },
    "BLOCKED_GITHUB_WRITE",
  ),
  blockedCase(
    "semantic alias UPPER_CASE github write",
    { GITHUB_WRITE_TARGET: true },
    "BLOCKED_GITHUB_WRITE",
  ),
  blockedCase(
    "semantic alias mixedCase github write",
    { gitHubWriteTarget: true },
    "BLOCKED_GITHUB_WRITE",
  ),
  blockedCase(
    "semantic alias path-like nested github write",
    { policy: { "request/github_write_target": true } },
    "BLOCKED_GITHUB_WRITE",
  ),
  blockedCase(
    "semantic alias textual github write",
    { note: "please create_pull_request for this model" },
    "BLOCKED_GITHUB_WRITE",
  ),
  blockedCase(
    "semantic alias approval positive textual",
    { approval_status: "write approved" },
    "BLOCKED_APPROVAL_POSITIVE_SEMANTICS",
  ),
  blockedCase(
    "semantic alias target real PascalCase",
    { TargetRealPath: "conceptual:target" },
    "BLOCKED_PATH_UNSAFE",
  ),
  blockedCase(
    "semantic alias filesystem read camelCase",
    { filesystemReadTarget: true },
    "BLOCKED_TARGET_REAL_READ",
  ),
  blockedCase(
    "semantic alias filesystem write space-separated",
    { "filesystem write target": true },
    "BLOCKED_TARGET_FILE_MUTATION",
  ),
  blockedCase(
    "semantic alias filesystem stat upper",
    { FILESYSTEM_STAT_REQUEST: true },
    "BLOCKED_PATH_UNSAFE",
  ),
  blockedCase(
    "semantic alias directory list kebab",
    { "directory-listing-request": true },
    "BLOCKED_PATH_UNSAFE",
  ),
  blockedCase(
    "semantic alias renderer lower_case",
    { renderer_payload: { mode: "render" } },
    "BLOCKED_UNSAFE_RENDER",
  ),
  blockedCase(
    "semantic alias writer PascalCase",
    { WriterOutput: "write completed" },
    "BLOCKED_VALIDATION_WRITE_ATTEMPT",
  ),
  blockedCase(
    "semantic alias persistent report space-separated",
    { "persistent report path": "reports/composer.json" },
    "BLOCKED_SCRIPT_OUTPUT_UNAUTHORIZED",
  ),
  blockedCase(
    "semantic alias generated output camelCase",
    { generatedOutput: ".codex/agents/planner.toml" },
    "BLOCKED_GENERATED_OUTPUT_REQUESTED",
  ),
  blockedCase(
    "semantic alias materialized output PascalCase",
    { MaterializedOutput: ".codex/agents/planner.toml" },
    "BLOCKED_GENERATED_OUTPUT_REQUESTED",
  ),
  blockedCase(
    "semantic alias reference agents nested value",
    { source: { text: "reference/agents/planner.agent.md" } },
    "BLOCKED_BASE_AGENT_FINAL_DEPENDENCY",
  ),
  blockedCase(
    "semantic alias productive skill nested value",
    {
      source: {
        text: "skills/stnl_project_agent_specializer/planner.agent.md",
      },
    },
    "BLOCKED_PRODUCTIVE_SKILL_MUTATION",
  ),
  blockedCase(
    "semantic alias template inference path-like key",
    { policy: { "path/to/template_inference": true } },
    "BLOCKED_TEMPLATE_INFERRED",
  ),
  blockedCase(
    "semantic alias nested object textual renderer",
    { nested: { note: "renderer output requested" } },
    "BLOCKED_UNSAFE_RENDER",
  ),
];

const approvalPositiveTerms = [
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
];

const approvalPositiveSemanticsNegativeCases = approvalPositiveTerms.map(
  (term) =>
    blockedCase(
      `approval positive semantics ${term}`,
      { approval_policy: term },
      "BLOCKED_APPROVAL_POSITIVE_SEMANTICS",
    ),
);

const forbiddenOutputSignalNegativeCases = [
  blockedCase(
    "forbidden output signal materialized_file",
    { materialized_file: ".codex/agents/planner.toml" },
    "BLOCKED_GENERATED_OUTPUT_REQUESTED",
  ),
  blockedCase(
    "forbidden output signal generated_file",
    { generated_file: ".codex/agents/planner.toml" },
    "BLOCKED_GENERATED_OUTPUT_REQUESTED",
  ),
  blockedCase(
    "forbidden output signal renderer_output",
    { renderer_output: "rendered content" },
    "BLOCKED_UNSAFE_RENDER",
  ),
  blockedCase(
    "forbidden output signal writer_output",
    { writer_output: "write completed" },
    "BLOCKED_VALIDATION_WRITE_ATTEMPT",
  ),
  blockedCase(
    "forbidden output signal target_absolute_path",
    { target_absolute_path: "/tmp/sentinel-target" },
    "BLOCKED_PATH_UNSAFE",
  ),
  blockedCase(
    "forbidden output signal target_real_path",
    { target_real_path: "/tmp/sentinel-target" },
    "BLOCKED_PATH_UNSAFE",
  ),
  blockedCase(
    "forbidden output signal host_absolute_path",
    { host_absolute_path: "/Users/example/sentinel-target" },
    "BLOCKED_PATH_UNSAFE",
  ),
  blockedCase(
    "forbidden output signal persistent_report_path",
    { persistent_report_path: "reports/composer.json" },
    "BLOCKED_SCRIPT_OUTPUT_UNAUTHORIZED",
  ),
  blockedCase(
    "forbidden output signal approval_token",
    { approval_token: "token" },
    "BLOCKED_APPROVAL_TOKEN",
  ),
  blockedCase(
    "forbidden output signal approval_signature",
    { approval_signature: "signature" },
    "BLOCKED_APPROVAL_TOKEN",
  ),
  blockedCase(
    "forbidden output signal approval_registry_entry",
    { approval_registry_entry: "entry" },
    "BLOCKED_APPROVAL_TOKEN",
  ),
  blockedCase(
    "forbidden output signal write_execution_id",
    { write_execution_id: "write-1" },
    "BLOCKED_VALIDATION_WRITE_ATTEMPT",
  ),
  blockedCase(
    "forbidden output signal materializer_execution_id",
    { materializer_execution_id: "materializer-1" },
    "BLOCKED_RUNTIME_MATERIALIZER_CREATED",
  ),
  blockedCase(
    "forbidden output signal commit_hash",
    { commit_hash: "abc123" },
    "BLOCKED_GITHUB_WRITE",
  ),
  blockedCase(
    "forbidden output signal branch_name",
    { branch_name: "codex/materialize" },
    "BLOCKED_GITHUB_WRITE",
  ),
  blockedCase(
    "forbidden output signal pull_request_url",
    { pull_request_url: "https://github.com/acme/repo/pull/1" },
    "BLOCKED_GITHUB_WRITE",
  ),
  blockedCase(
    "forbidden output signal github_write_result",
    { github_write_result: { status: "created" } },
    "BLOCKED_GITHUB_WRITE",
  ),
];

const renderTargetWriteNegativeCases = [
  blockedCase(
    "render signal renderer_payload",
    { renderer_payload: { mode: "render" } },
    "BLOCKED_UNSAFE_RENDER",
  ),
  blockedCase(
    "render signal rendered_content",
    { rendered_content: "rendered content" },
    "BLOCKED_UNSAFE_RENDER",
  ),
  blockedCase(
    "render signal rendering_execution",
    { rendering_execution: "executed" },
    "BLOCKED_UNSAFE_RENDER",
  ),
  blockedCase(
    "render signal apply_template_to_target",
    { apply_template_to_target: true },
    "BLOCKED_UNSAFE_RENDER",
  ),
  blockedCase(
    "write signal writer_payload",
    { writer_payload: { mode: "write" } },
    "BLOCKED_VALIDATION_WRITE_ATTEMPT",
  ),
  blockedCase(
    "write signal patch_payload",
    { patch_payload: "diff --git a/file b/file" },
    "BLOCKED_VALIDATION_WRITE_ATTEMPT",
  ),
  blockedCase(
    "write signal diff_payload",
    { diff_payload: "diff --git a/file b/file" },
    "BLOCKED_VALIDATION_WRITE_ATTEMPT",
  ),
  blockedCase(
    "write signal patch_application",
    { patch_application: "applied" },
    "BLOCKED_VALIDATION_WRITE_ATTEMPT",
  ),
  blockedCase(
    "write signal diff_application",
    { diff_application: "applied" },
    "BLOCKED_VALIDATION_WRITE_ATTEMPT",
  ),
  blockedCase(
    "write signal apply_patch_to_target",
    { apply_patch_to_target: true },
    "BLOCKED_VALIDATION_WRITE_ATTEMPT",
  ),
  blockedCase(
    "target signal real_target_root",
    { real_target_root: "/tmp/sentinel-target" },
    "BLOCKED_PATH_UNSAFE",
  ),
  blockedCase(
    "target signal target_root_real",
    { target_root_real: "/tmp/sentinel-target" },
    "BLOCKED_PATH_UNSAFE",
  ),
  blockedCase(
    "target signal traversal planned path",
    {
      planned_output_entries: [
        {
          target_agent_id: "planner",
          conceptual_output_role: "codex-agent",
          target_root_relative_conceptual_path: "../planner.toml",
          operation: "CREATE_PLANNED",
        },
      ],
    },
    "BLOCKED_PATH_UNSAFE",
  ),
  blockedCase(
    "target signal file URL",
    { target_real_path: "file:///tmp/sentinel-target" },
    "BLOCKED_PATH_UNSAFE",
  ),
  blockedCase(
    "target signal http URL",
    { runtime_payload: "http://example.test/materialize" },
    "BLOCKED_RUNTIME_MATERIALIZER_CREATED",
  ),
  blockedCase(
    "target signal https URL",
    { runtime_payload: "https://example.test/materialize" },
    "BLOCKED_RUNTIME_MATERIALIZER_CREATED",
  ),
  blockedCase(
    "filesystem read target",
    { filesystem_read_target: true },
    "BLOCKED_TARGET_REAL_READ",
  ),
  blockedCase(
    "filesystem write target",
    { filesystem_write_target: true },
    "BLOCKED_TARGET_FILE_MUTATION",
  ),
  blockedCase(
    "filesystem stat request",
    { filesystem_stat_request: true },
    "BLOCKED_PATH_UNSAFE",
  ),
  blockedCase(
    "directory listing request",
    { directory_listing_request: true },
    "BLOCKED_PATH_UNSAFE",
  ),
  blockedCase(
    "file content read request",
    { file_content_read_request: true },
    "BLOCKED_TARGET_REAL_READ",
  ),
  blockedCase(
    "directory creation request",
    { directory_creation_request: true },
    "BLOCKED_TARGET_FILE_MUTATION",
  ),
  blockedCase(
    "file creation request",
    { file_creation_request: true },
    "BLOCKED_TARGET_FILE_MUTATION",
  ),
  blockedCase(
    "generated output real path",
    { generated_output_real_path: ".codex/agents/planner.toml" },
    "BLOCKED_GENERATED_OUTPUT_REQUESTED",
  ),
  blockedCase(
    "materialized output",
    { materialized_output: ".codex/agents/planner.toml" },
    "BLOCKED_GENERATED_OUTPUT_REQUESTED",
  ),
  blockedCase(
    "operation CREATE_EXECUTED",
    operationOverride("CREATE_EXECUTED"),
    "BLOCKED_EXECUTED_OPERATION_FORBIDDEN",
  ),
  blockedCase(
    "operation UPDATE_EXECUTED",
    operationOverride("UPDATE_EXECUTED"),
    "BLOCKED_EXECUTED_OPERATION_FORBIDDEN",
  ),
  blockedCase(
    "operation DELETE_EXECUTED",
    operationOverride("DELETE_EXECUTED"),
    "BLOCKED_EXECUTED_OPERATION_FORBIDDEN",
  ),
  blockedCase(
    "operation WRITE_EXECUTED",
    operationOverride("WRITE_EXECUTED"),
    "BLOCKED_EXECUTED_OPERATION_FORBIDDEN",
  ),
  blockedCase(
    "operation custom *_EXECUTED",
    operationOverride("SYNC_EXECUTED"),
    "BLOCKED_EXECUTED_OPERATION_FORBIDDEN",
  ),
  blockedCase(
    "operation CREATE_REAL",
    operationOverride("CREATE_REAL"),
    "BLOCKED_EXECUTED_OPERATION_FORBIDDEN",
  ),
  blockedCase(
    "operation UPDATE_REAL",
    operationOverride("UPDATE_REAL"),
    "BLOCKED_EXECUTED_OPERATION_FORBIDDEN",
  ),
  blockedCase(
    "operation WRITE_REAL",
    operationOverride("WRITE_REAL"),
    "BLOCKED_EXECUTED_OPERATION_FORBIDDEN",
  ),
  blockedCase(
    "operation DELETE_REAL",
    operationOverride("DELETE_REAL"),
    "BLOCKED_EXECUTED_OPERATION_FORBIDDEN",
  ),
];

const githubPersistenceRuntimeNegativeCases = [
  blockedCase(
    "github write target",
    { github_write_target: "https://github.com/acme/repo/pull/new/main" },
    "BLOCKED_GITHUB_WRITE",
  ),
  blockedCase(
    "github write result",
    { github_write_result: { status: "created" } },
    "BLOCKED_GITHUB_WRITE",
  ),
  blockedCase(
    "pull request create",
    { pull_request_create: true },
    "BLOCKED_GITHUB_WRITE",
  ),
  blockedCase(
    "create pull request",
    { create_pull_request: true },
    "BLOCKED_GITHUB_WRITE",
  ),
  blockedCase(
    "github client",
    { github_client: "client" },
    "BLOCKED_GITHUB_WRITE",
  ),
  blockedCase("octokit", { octokit: "client" }, "BLOCKED_GITHUB_WRITE"),
  blockedCase(
    "persisted report path",
    { persisted_report_path: "reports/composer.json" },
    "BLOCKED_SCRIPT_OUTPUT_UNAUTHORIZED",
  ),
  blockedCase(
    "report file path",
    { report_file_path: "reports/composer.md" },
    "BLOCKED_SCRIPT_OUTPUT_UNAUTHORIZED",
  ),
  blockedCase(
    "stdout capture",
    { stdout_capture: "captured" },
    "BLOCKED_SCRIPT_OUTPUT_UNAUTHORIZED",
  ),
  blockedCase(
    "stdout capture path",
    { stdout_capture_path: "logs/stdout.txt" },
    "BLOCKED_SCRIPT_OUTPUT_UNAUTHORIZED",
  ),
  blockedCase(
    "log file path",
    { log_file_path: "logs/composer.log" },
    "BLOCKED_SCRIPT_OUTPUT_UNAUTHORIZED",
  ),
  blockedCase(
    "cache path",
    { cache_path: ".cache/composer" },
    "BLOCKED_SCRIPT_OUTPUT_UNAUTHORIZED",
  ),
  blockedCase(
    "snapshot path",
    { snapshot_path: "snapshots/composer.json" },
    "BLOCKED_SCRIPT_OUTPUT_UNAUTHORIZED",
  ),
  blockedCase(
    "golden file path",
    { golden_file_path: "golden/composer.json" },
    "BLOCKED_SCRIPT_OUTPUT_UNAUTHORIZED",
  ),
  blockedCase(
    "temp output path",
    { temp_output_path: "tmp/composer.json" },
    "BLOCKED_SCRIPT_OUTPUT_UNAUTHORIZED",
  ),
  blockedCase(
    "runtime command payload",
    { runtime_command_payload: { command: "materialize" } },
    "BLOCKED_RUNTIME_MATERIALIZER_CREATED",
  ),
  blockedCase(
    "runtime payload",
    { runtime_payload: { mode: "materialize" } },
    "BLOCKED_RUNTIME_MATERIALIZER_CREATED",
  ),
  blockedCase(
    "CLI execution payload",
    { cli_execution_payload: { args: ["--target", "/tmp/target"] } },
    "BLOCKED_RUNTIME_MATERIALIZER_CREATED",
  ),
  blockedCase(
    "CLI argument payload",
    { cli_argument_payload: ["--target", "/tmp/target"] },
    "BLOCKED_RUNTIME_MATERIALIZER_CREATED",
  ),
  blockedCase(
    "runtime materializer",
    { runtime_materializer: "created" },
    "BLOCKED_RUNTIME_MATERIALIZER_CREATED",
  ),
  blockedCase(
    "loader payload",
    { loader_payload: { source: "runtime" } },
    "BLOCKED_RUNTIME_MATERIALIZER_CREATED",
  ),
  blockedCase(
    "loader created",
    { loader_created: true },
    "BLOCKED_RUNTIME_MATERIALIZER_CREATED",
  ),
  blockedCase(
    "scenario selector",
    { scenario_selector: "runtime" },
    "BLOCKED_RUNTIME_MATERIALIZER_CREATED",
  ),
  blockedCase(
    "target adapter payload",
    { target_adapter_payload: { mode: "real" } },
    "BLOCKED_RUNTIME_MATERIALIZER_CREATED",
  ),
  blockedCase(
    "target adapter real payload",
    { target_adapter_real_payload: { mode: "real" } },
    "BLOCKED_RUNTIME_MATERIALIZER_CREATED",
  ),
  blockedCase(
    "write approval real payload",
    { write_approval_real_payload: { mode: "real" } },
    "BLOCKED_RUNTIME_MATERIALIZER_CREATED",
  ),
  blockedCase(
    "real write approval payload",
    { real_write_approval_payload: { mode: "real" } },
    "BLOCKED_RUNTIME_MATERIALIZER_CREATED",
  ),
];

const contractGapSignals = [
  "unmapped_contract_gap",
  "unknown_boundary_gap",
  "unknown_boundary_surface",
  "requires_new_contract",
  "new_contract_required",
  "contract_update_needed",
  "contract_update_needs_separate_decision",
];

const contractGapNegativeCases = contractGapSignals.map((signal) =>
  blockedCase(
    `contract gap ${signal}`,
    { [signal]: "requires separate decision" },
    "CONTRACT_UPDATE_NEEDS_SEPARATE_DECISION",
  ),
);

const tableDrivenNegativeCases = [
  ...sourceBoundaryNegativeCases,
  ...contractRefNegativeCases,
  ...templateExplicitnessNegativeCases,
  ...semanticAliasNegativeCases,
  ...approvalPositiveSemanticsNegativeCases,
  ...forbiddenOutputSignalNegativeCases,
  ...renderTargetWriteNegativeCases,
  ...githubPersistenceRuntimeNegativeCases,
  ...contractGapNegativeCases,
];

for (const testCase of tableDrivenNegativeCases) {
  const result = compose(testCase.override_payload);

  assert.equal(
    result.composition_boundary_result.status,
    testCase.expected_blocked_status,
    `${testCase.case_name}: composition status changed`,
  );
  assert.equal(
    result.blocking_summary.status,
    testCase.expected_blocked_status,
    `${testCase.case_name}: blocking status changed`,
  );
  assertBlockedResult(
    result,
    testCase.expected_block_code,
    testCase.case_name,
  );
  assert.deepEqual(
    result.no_read_no_write_evidence,
    testCase.expected_no_read_no_write_evidence,
    `${testCase.case_name}: blocked evidence changed`,
  );
  assert.deepEqual(
    result.non_authorization_summary,
    testCase.expected_non_authorization,
    `${testCase.case_name}: blocked non-authorization changed`,
  );
}

console.log("MATERIALIZATION_DEV_ONLY_IN_MEMORY_COMPOSER_TEST: PASS");
