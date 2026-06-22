import assert from "node:assert/strict";

import { composeDevOnlyInMemoryPackageOrchestration } from "./dev-only-in-memory-package-orchestrator.mjs";
import { reviewPackageResult } from "./dev-only-in-memory-package-result-reviewer.mjs";
import {
  DRY_RUN_PASS,
  buildPackageDryRunMaterializationPlan,
} from "./dev-only-in-memory-package-dry-run-materializer.mjs";

const REVIEW_PASS = "REVIEW_PASS";
const PACKAGE_PASS = "PACKAGE_PASS";
const CODEX_CONFIG_PATH = ".codex/config.toml";
const CODEX_ROOT_INSTRUCTIONS_PATH = "AGENTS.md";
const REQUIRED_TEMPLATE_REFS = Object.freeze([
  "reference/templates/copilot/agent.md",
  "reference/templates/codex/agent.toml",
  "reference/templates/codex/config.toml",
  "reference/templates/codex/AGENTS.md",
]);

const EXACT_NO_WRITE_EVIDENCE = Object.freeze({
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

const EXACT_NON_AUTHORIZATION_EVIDENCE = Object.freeze({
  real_materialization_authorized: false,
  real_target_read_authorized: false,
  real_target_write_authorized: false,
  filesystem_access_against_real_target_authorized: false,
  real_writer_authorized: false,
  real_renderer_authorized: false,
  real_loader_authorized: false,
  real_scenario_selector_authorized: false,
  real_target_adapter_authorized: false,
  real_write_approval_authorized: false,
  approval_token_authorized: false,
  approval_registry_authorized: false,
  approval_signature_authorized: false,
  signer_authorized: false,
  persistent_report_authorized: false,
  generated_output_authorized: false,
  materialized_output_authorized: false,
  patch_or_diff_application_authorized: false,
  github_write_authorized: false,
  productive_skill_access_authorized: false,
  productive_skill_mutation_authorized: false,
  commit_authorized: false,
  branch_authorized: false,
  pull_request_authorized: false,
  aggregator_change_authorized: false,
  checker_creation_authorized: false,
  tenth_check_authorized: false,
});

const DEV_ONLY_LOCAL_GUARDRAILS = Object.freeze({
  official_check: false,
  aggregator_child: false,
  checker_created: false,
  tenth_check_created: false,
  runtime_created: false,
  cli_created: false,
  schema_official: false,
  stdout_contract_created: false,
  target_real_accessed: false,
  github_accessed: false,
  productive_skill_accessed: false,
  renderer_created: false,
  writer_created: false,
  loader_created: false,
  target_adapter_created: false,
  write_approval_created: false,
  approval_token_issued: false,
  persistent_report_written: false,
  generated_output_written: false,
  materialized_output_written: false,
  patch_or_diff_applied: false,
  commit_created: false,
  branch_created: false,
  pull_request_created: false,
});

function cloneInMemory(value) {
  return JSON.parse(JSON.stringify(value));
}

function entriesByAgent(entries = []) {
  return Object.fromEntries(
    entries.map((entry) => [entry.agent_id, entry.conceptual_path]),
  );
}

function mapCanonicalAgents(packageResult) {
  return packageResult.canonical_agent_matrix.agents.map((entry) => ({
    agent: entry.agent_id,
    kernel: entry.kernel_id,
    agentId: entry.agent_id,
    kernelId: entry.kernel_id,
    kernelRef: entry.kernel_ref,
    seniorProfileRef: entry.senior_profile_ref,
    packageMember: entry.package_member,
  }));
}

function mapNonAuthorizationEvidence(packageResult) {
  const evidence = packageResult.non_authorization_evidence;

  return {
    real_materialization_authorized: evidence.materialization_authorized,
    real_target_read_authorized: evidence.target_read_authorized,
    real_target_write_authorized: evidence.target_write_authorized,
    filesystem_access_against_real_target_authorized:
      evidence.filesystem_access_to_target_authorized,
    real_writer_authorized: evidence.writer_authorized,
    real_renderer_authorized: evidence.renderer_authorized,
    real_loader_authorized: evidence.loader_authorized,
    real_scenario_selector_authorized: evidence.scenario_selector_authorized,
    real_target_adapter_authorized: evidence.target_adapter_authorized,
    real_write_approval_authorized: evidence.write_approval_authorized,
    approval_token_authorized: evidence.approval_token_authorized,
    approval_registry_authorized: evidence.approval_registry_authorized,
    approval_signature_authorized: evidence.approval_signature_authorized,
    signer_authorized: evidence.signer_authorized,
    persistent_report_authorized: evidence.persistent_report_authorized,
    generated_output_authorized: evidence.generated_output_authorized,
    materialized_output_authorized: evidence.materialized_output_authorized,
    patch_or_diff_application_authorized:
      evidence.patch_or_diff_application_authorized,
    github_write_authorized: evidence.github_write_authorized,
    productive_skill_access_authorized:
      packageResult.source_coverage_summary.productive_skill_source,
    productive_skill_mutation_authorized:
      evidence.productive_skill_mutation_authorized,
    commit_authorized: evidence.commit_authorized,
    branch_authorized: evidence.branch_authorized,
    pull_request_authorized: evidence.pull_request_authorized,
    aggregator_change_authorized:
      packageResult.next_audit_expectation.aggregator_child_registered,
    checker_creation_authorized:
      packageResult.next_audit_expectation.checker_created,
    tenth_check_authorized:
      packageResult.next_audit_expectation.tenth_check_created,
  };
}

function mapPackageResultToReviewInput(packageResult) {
  const copilotAgents = entriesByAgent(
    packageResult.target_matrix_summary.copilot.entries,
  );
  const codexAgents = entriesByAgent(packageResult.target_matrix_summary.codex.entries);
  const codexTargetArtifacts = Object.fromEntries(
    packageResult.codex_target_level_artifact_summary.artifacts.map((artifact) => [
      artifact.artifact_id,
      artifact.conceptual_path,
    ]),
  );

  return {
    packageStatus:
      packageResult.phase_identity.status === "PASS"
        ? PACKAGE_PASS
        : packageResult.phase_identity.status,
    canonicalAgents: mapCanonicalAgents(packageResult),
    canonicalKernelMapping: {
      ...packageResult.canonical_agent_matrix.agent_to_kernel,
    },
    targetMatrixSummary: {
      copilotAgents,
      codexAgents,
    },
    sourceCoverageSummary: {
      finalSourceRoots: [
        ...packageResult.source_coverage_summary.allowed_final_source_roots,
      ],
    },
    templateSummary: {
      templates: [
        ...packageResult.template_resolution_summary.explicit_template_refs,
      ],
      missingTemplates: [],
      ambiguousTemplates: [],
      inferredTemplates: [],
      explicitTemplatesRequired: true,
    },
    conceptualOutputShapes: {
      copilotAgents,
      codexAgents,
      codexConfig: codexTargetArtifacts["codex-config"],
      codexRootInstructions: codexTargetArtifacts["codex-agents-md"],
    },
    codexTargetLevelArtifactSummary: {
      config: codexTargetArtifacts["codex-config"],
      rootInstructions: codexTargetArtifacts["codex-agents-md"],
      countedAsAgents:
        packageResult.codex_target_level_artifact_summary.treated_as_agents,
    },
    aggregatorPreservationSummary: {
      childCheckCount: 9,
      changed: false,
      registered: false,
      childAdded: false,
      checkerCreated: packageResult.next_audit_expectation.checker_created,
      tenthCheckCreated: packageResult.next_audit_expectation.tenth_check_created,
    },
    noWriteEvidence: cloneInMemory(packageResult.no_write_evidence),
    nonAuthorizationEvidence: mapNonAuthorizationEvidence(packageResult),
    blockers: cloneInMemory(packageResult.package_blockers.blockers),
    needsRevision: [],
    unsafeSignals: [],
  };
}

function mapReviewPassToDryRunInput(reviewInput, reviewVerdict) {
  assert.equal(reviewVerdict.status, REVIEW_PASS);
  assert.equal(reviewVerdict.writeAuthorizationDenied, true);

  return {
    ...cloneInMemory(reviewInput),
    packageStatus: reviewVerdict.status,
    reviewStatus: reviewVerdict.status,
    reviewWriteAuthorizationDenied: reviewVerdict.writeAuthorizationDenied,
  };
}

function assertExactNoWriteEvidence(evidence, label) {
  assert.deepEqual(evidence, EXACT_NO_WRITE_EVIDENCE, label);
}

function assertExactNonAuthorizationEvidence(evidence, label) {
  assert.deepEqual(evidence, EXACT_NON_AUTHORIZATION_EVIDENCE, label);
}

function assertNoAuthorizationFields(value, label) {
  assert.equal(Object.hasOwn(value, "writeAuthorized"), false, label);
  assert.equal(Object.hasOwn(value, "authorizedToWrite"), false, label);
  assert.equal(Object.hasOwn(value, "writePermission"), false, label);
  assert.equal(Object.hasOwn(value, "materializationAuthorized"), false, label);
  assert.equal(Object.hasOwn(value, "authorizedToMaterialize"), false, label);
}

function assertCanonicalArtifactModel(reviewInput, dryRunPlan) {
  assert.equal(reviewInput.canonicalAgents.length, 12);
  assert.equal(Object.keys(reviewInput.targetMatrixSummary.copilotAgents).length, 12);
  assert.equal(Object.keys(reviewInput.targetMatrixSummary.codexAgents).length, 12);
  assert.equal(reviewInput.codexTargetLevelArtifactSummary.config, CODEX_CONFIG_PATH);
  assert.equal(
    reviewInput.codexTargetLevelArtifactSummary.rootInstructions,
    CODEX_ROOT_INSTRUCTIONS_PATH,
  );
  assert.equal(reviewInput.codexTargetLevelArtifactSummary.countedAsAgents, false);
  assert.equal(
    Object.values(reviewInput.targetMatrixSummary.codexAgents).includes(CODEX_CONFIG_PATH),
    false,
  );
  assert.equal(
    Object.values(reviewInput.targetMatrixSummary.codexAgents).includes(
      CODEX_ROOT_INSTRUCTIONS_PATH,
    ),
    false,
  );

  const copilotAgentArtifacts = dryRunPlan.conceptualOutputInventory.filter(
    (artifact) =>
      artifact.targetFamily === "copilot" && artifact.artifactKind === "agent",
  );
  const codexAgentArtifacts = dryRunPlan.conceptualOutputInventory.filter(
    (artifact) =>
      artifact.targetFamily === "codex" && artifact.artifactKind === "agent",
  );

  assert.equal(copilotAgentArtifacts.length, 12);
  assert.equal(codexAgentArtifacts.length, 12);
  assert.equal(dryRunPlan.codexTargetLevelArtifacts.length, 2);
  assert.equal(
    dryRunPlan.codexTargetLevelArtifacts.some(
      (artifact) => artifact.targetRootRelativePath === CODEX_CONFIG_PATH,
    ),
    true,
  );
  assert.equal(
    dryRunPlan.codexTargetLevelArtifacts.some(
      (artifact) => artifact.targetRootRelativePath === CODEX_ROOT_INSTRUCTIONS_PATH,
    ),
    true,
  );
  assert.equal(
    codexAgentArtifacts.some(
      (artifact) => artifact.targetRootRelativePath === CODEX_CONFIG_PATH,
    ),
    false,
  );
  assert.equal(
    codexAgentArtifacts.some(
      (artifact) =>
        artifact.targetRootRelativePath === CODEX_ROOT_INSTRUCTIONS_PATH,
    ),
    false,
  );
}

for (const value of Object.values(DEV_ONLY_LOCAL_GUARDRAILS)) {
  assert.equal(value, false);
}

const packageResult = composeDevOnlyInMemoryPackageOrchestration();

assert.equal(packageResult.phase_identity.status, "PASS");
assert.equal(packageResult.package_blockers.blocked, false);
assert.equal(packageResult.result_identity.official_check, false);
assert.equal(packageResult.result_identity.aggregator_child, false);
assert.equal(packageResult.result_identity.runtime_contract, "none");
assert.equal(packageResult.result_identity.stdout_contract, "none");
assert.equal(packageResult.result_identity.cli_contract, "none");
assert.equal(packageResult.next_audit_expectation.official_check, false);
assert.equal(packageResult.next_audit_expectation.checker_created, false);
assert.equal(packageResult.next_audit_expectation.aggregator_child_registered, false);
assert.equal(packageResult.next_audit_expectation.tenth_check_created, false);
assertExactNoWriteEvidence(
  packageResult.no_write_evidence,
  "orchestrator no-write evidence",
);

const reviewInput = mapPackageResultToReviewInput(packageResult);

assert.equal(reviewInput.packageStatus, PACKAGE_PASS);
assertExactNoWriteEvidence(reviewInput.noWriteEvidence, "review input no-write evidence");
assertExactNonAuthorizationEvidence(
  reviewInput.nonAuthorizationEvidence,
  "review input non-authorization evidence",
);
assert.equal(reviewInput.aggregatorPreservationSummary.childCheckCount, 9);
assert.equal(reviewInput.aggregatorPreservationSummary.changed, false);
assert.equal(reviewInput.aggregatorPreservationSummary.registered, false);
assert.equal(reviewInput.aggregatorPreservationSummary.childAdded, false);
assert.equal(reviewInput.aggregatorPreservationSummary.checkerCreated, false);
assert.equal(reviewInput.aggregatorPreservationSummary.tenthCheckCreated, false);
for (const templateRef of REQUIRED_TEMPLATE_REFS) {
  assert.equal(reviewInput.templateSummary.templates.includes(templateRef), true);
}

const reviewVerdict = reviewPackageResult(reviewInput);

assert.equal(reviewVerdict.status, REVIEW_PASS);
assert.deepEqual(reviewVerdict.blockers, []);
assert.deepEqual(reviewVerdict.needsRevision, []);
assert.equal(reviewVerdict.writeAuthorizationDenied, true);
assertNoAuthorizationFields(reviewVerdict, "review verdict must remain non-authorizing");
assertExactNonAuthorizationEvidence(
  reviewVerdict.nonAuthorizationEvidence,
  "review verdict non-authorization evidence",
);

const dryRunInput = mapReviewPassToDryRunInput(reviewInput, reviewVerdict);

assert.equal(dryRunInput.packageStatus, REVIEW_PASS);
assert.equal(dryRunInput.reviewStatus, REVIEW_PASS);
assert.equal(dryRunInput.reviewWriteAuthorizationDenied, true);
assertExactNoWriteEvidence(dryRunInput.noWriteEvidence, "dry-run input no-write evidence");
assertExactNonAuthorizationEvidence(
  dryRunInput.nonAuthorizationEvidence,
  "dry-run input non-authorization evidence",
);

const dryRunPlan = buildPackageDryRunMaterializationPlan(dryRunInput);

assert.equal(dryRunPlan.status, DRY_RUN_PASS);
assert.deepEqual(dryRunPlan.blockers, []);
assert.deepEqual(dryRunPlan.needsRevision, []);
assert.equal(dryRunPlan.writeAuthorizationDenied, true);
assert.equal(dryRunPlan.summary.dryRunPassAuthorizesWrite, false);
assert.equal(dryRunPlan.summary.realMaterializationAuthorized, false);
assert.equal(dryRunPlan.summary.noWrite, true);
assert.equal(dryRunPlan.summary.noTargetReal, true);
assert.equal(dryRunPlan.summary.noGitHub, true);
assert.equal(dryRunPlan.summary.noProductiveSkill, true);
assert.equal(dryRunPlan.summary.nonChecker, true);
assert.equal(dryRunPlan.summary.nonAggregatorChild, true);
assert.equal(dryRunPlan.summary.nonAuthorizing, true);
assertNoAuthorizationFields(dryRunPlan, "dry-run plan must remain non-authorizing");
assertExactNoWriteEvidence(dryRunPlan.noWriteEvidence, "dry-run output no-write evidence");
assertExactNonAuthorizationEvidence(
  dryRunPlan.nonAuthorizationEvidence,
  "dry-run output non-authorization evidence",
);
assertCanonicalArtifactModel(reviewInput, dryRunPlan);

console.log(
  "MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PACKAGE_REVIEW_DRY_RUN_MATERIALIZER_INTEGRATION_SMOKE: PASS",
);
