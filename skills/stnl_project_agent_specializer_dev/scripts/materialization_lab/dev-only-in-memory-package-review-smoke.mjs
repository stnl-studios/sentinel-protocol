import assert from "node:assert/strict";

import { composeDevOnlyInMemoryPackageOrchestration } from "./dev-only-in-memory-package-orchestrator.mjs";
import { reviewPackageResult } from "./dev-only-in-memory-package-result-reviewer.mjs";

const REVIEW_PASS = "REVIEW_PASS";
const PACKAGE_PASS = "PACKAGE_PASS";

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

const orchestrationResult = composeDevOnlyInMemoryPackageOrchestration();

assert.equal(orchestrationResult.phase_identity.status, "PASS");
assert.equal(orchestrationResult.package_blockers.blocked, false);
assert.equal(Object.hasOwn(orchestrationResult, "packageStatus"), false);
assert.equal(Object.hasOwn(orchestrationResult, "canonicalAgents"), false);
assert.equal(Object.hasOwn(orchestrationResult, "nonAuthorizationEvidence"), false);

const reviewInput = mapPackageResultToReviewInput(orchestrationResult);

assert.notEqual(reviewInput, orchestrationResult);
assert.equal(reviewInput.packageStatus, PACKAGE_PASS);
assert.equal(reviewInput.canonicalAgents.length, 12);
assert.equal(Object.keys(reviewInput.targetMatrixSummary.copilotAgents).length, 12);
assert.equal(Object.keys(reviewInput.targetMatrixSummary.codexAgents).length, 12);
assert.equal(reviewInput.noWriteEvidence.target_read_attempted, false);
assert.equal(reviewInput.noWriteEvidence.target_write_attempted, false);
assert.equal(reviewInput.noWriteEvidence.files_written.length, 0);

for (const value of Object.values(reviewInput.nonAuthorizationEvidence)) {
  assert.equal(value, false);
}

const reviewVerdict = reviewPackageResult(reviewInput);

assert.equal(reviewVerdict.status, REVIEW_PASS);
assert.deepEqual(reviewVerdict.blockers, []);
assert.deepEqual(reviewVerdict.needsRevision, []);
assert.equal(reviewVerdict.writeAuthorizationDenied, true);
assert.equal(Object.hasOwn(reviewVerdict, "writeAuthorized"), false);
assert.equal(Object.hasOwn(reviewVerdict, "authorizedToWrite"), false);
