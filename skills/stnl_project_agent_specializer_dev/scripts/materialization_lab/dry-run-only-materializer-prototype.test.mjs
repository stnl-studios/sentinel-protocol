import assert from "node:assert/strict";

import {
  allowedPlannedOperations,
  forbiddenExecutedOperations,
  runDryRunOnlyMaterializerPrototype,
} from "./dry-run-only-materializer-prototype.mjs";
import { createDryRunOnlyFixtureRequest } from "./dry-run-only-materializer-prototype.fixture-model.mjs";

function runFixture(overrides = {}) {
  return runDryRunOnlyMaterializerPrototype(
    createDryRunOnlyFixtureRequest(overrides),
  );
}

function assertBlocked(overrides, expectedBlockCode) {
  const result = runFixture(overrides);
  assert.equal(result.boundary_result.status, "BLOCKED");
  assert.equal(result.blocking_summary.blocked, true);
  assert.ok(result.blocking_summary.block_codes.includes(expectedBlockCode));
  assertNoReadNoWriteEvidence(result);
  return result;
}

function assertNoReadNoWriteEvidence(result) {
  assert.deepEqual(result.no_read_no_write_evidence, {
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
}

const happy = runFixture();
assert.equal(happy.boundary_result.status, "PASS");
assert.equal(happy.boundary_result.fixture_only, true);
assert.equal(happy.boundary_result.model_only, true);
assert.equal(happy.boundary_result.in_memory_only, true);
assert.ok(happy.output_plan_entries.length > 0);
assert.ok(
  happy.output_plan_entries.every((entry) =>
    allowedPlannedOperations.includes(entry.operation),
  ),
);
assert.ok(
  happy.output_plan_entries.every(
    (entry) => !forbiddenExecutedOperations.includes(entry.operation),
  ),
);
assertNoReadNoWriteEvidence(happy);
assert.ok(happy.non_authorization_summary);
assert.equal(
  happy.write_approval_protocol_result.approval_state,
  "APPROVAL_CONCEPTUALLY_ELIGIBLE",
);
assert.equal(happy.write_approval_protocol_result.write_authorized, false);
assert.equal(
  happy.write_approval_protocol_result.approval_conceptually_eligible_authorizes_write,
  false,
);

assertBlocked({ dry_run_required: false }, "BLOCKED_DRY_RUN_REQUIRED");
assertBlocked(
  { write_execution_policy: "allows writing" },
  "BLOCKED_VALIDATION_WRITE_ATTEMPT",
);
assertBlocked(
  { target_read_policy: "allows Target real read" },
  "BLOCKED_TARGET_REAL_READ",
);
assertBlocked(
  { target_write_policy: "allows Target real write" },
  "BLOCKED_TARGET_FILE_MUTATION",
);
assertBlocked(
  { persistent_report_policy: "writes persistent report" },
  "BLOCKED_SCRIPT_OUTPUT_UNAUTHORIZED",
);
assertBlocked(
  { approval_policy: "READY_TO_WRITE" },
  "BLOCKED_APPROVAL_POSITIVE_SEMANTICS",
);
assertBlocked(
  {
    source_roots: [
      "reference/kernel_lab/",
      "reference/agents/",
      "reference/templates/",
    ],
  },
  "BLOCKED_BASE_AGENT_FINAL_DEPENDENCY",
);
assertBlocked({ template_refs: [] }, "BLOCKED_TEMPLATE_MISSING");
assertBlocked(
  {
    template_policy: {
      explicit_only: false,
      inference_source: "nearby file",
    },
  },
  "BLOCKED_TEMPLATE_INFERRED",
);
assertBlocked({ source_roots: ["/tmp/sentinel-target"] }, "BLOCKED_PATH_UNSAFE");
assertBlocked(
  { real_target_path: "skills/stnl_project_agent_specializer/AGENTS.md" },
  "BLOCKED_PATH_UNSAFE",
);
assertBlocked({ approval_token: "fixture-token" }, "BLOCKED_APPROVAL_TOKEN");
assertBlocked(
  { write_execution_id: "fixture-write-execution-id" },
  "BLOCKED_WRITE_EXECUTION_ID",
);
assertBlocked(
  { planned_operation: "CREATE_EXECUTED" },
  "BLOCKED_EXECUTED_OPERATION_FORBIDDEN",
);
assertBlocked(
  { generated_file: ".codex/agents/planner.toml" },
  "BLOCKED_GENERATED_OUTPUT_REQUESTED",
);
assertBlocked(
  { mandatory_runtime_payload: { required: true } },
  "BLOCKED_RUNTIME_PAYLOAD_REQUIRED",
);

console.log("MATERIALIZATION_DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_TEST: PASS");
