import assert from "node:assert/strict";

import { composeDevOnlyInMemoryPackageOrchestration } from "./dev-only-in-memory-package-orchestrator.mjs";
import { reviewPackageResult } from "./dev-only-in-memory-package-result-reviewer.mjs";

const REVIEW_PASS = "REVIEW_PASS";
const PACKAGE_PASS = "PACKAGE_PASS";
const REQUIRED_TEMPLATE_REFS = [
  "reference/templates/copilot/agent.md",
  "reference/templates/codex/agent.toml",
  "reference/templates/codex/config.toml",
  "reference/templates/codex/AGENTS.md",
];
const CODEX_CONFIG_PATH = ".codex/config.toml";
const CODEX_ROOT_INSTRUCTIONS_PATH = "AGENTS.md";
const DEV_ONLY_LOCAL_SMOKE_GUARDRAILS = {
  official_check: false,
  aggregator_child: false,
  checker_created: false,
  tenth_check_created: false,
  runtime_created: false,
  cli_created: false,
  schema_official: false,
  target_real_accessed: false,
  github_accessed: false,
  productive_skill_accessed: false,
  persistent_report_written: false,
  snapshot_written: false,
  stdout_capture_written: false,
  materialized_output_written: false,
};

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

function buildReviewInput() {
  return mapPackageResultToReviewInput(orchestrationResult);
}

function expectReviewPass(input, label) {
  const verdict = reviewPackageResult(input);

  assert.equal(verdict.status, REVIEW_PASS, `${label}: expected REVIEW_PASS`);
  assert.deepEqual(verdict.blockers, [], `${label}: blockers must be empty`);
  assert.deepEqual(
    verdict.needsRevision,
    [],
    `${label}: needsRevision must be empty`,
  );
  assert.equal(
    verdict.writeAuthorizationDenied,
    true,
    `${label}: write authorization must remain denied`,
  );
  assert.equal(
    Object.hasOwn(verdict, "writeAuthorized"),
    false,
    `${label}: must not expose writeAuthorized`,
  );
  assert.equal(
    Object.hasOwn(verdict, "authorizedToWrite"),
    false,
    `${label}: must not expose authorizedToWrite`,
  );

  return verdict;
}

function expectReviewNonPass(mutator, label) {
  const input = cloneInMemory(buildReviewInput());

  mutator(input);

  const verdict = reviewPackageResult(input);

  assert.notEqual(verdict.status, REVIEW_PASS, `${label}: expected non-pass`);
  assert.ok(verdict.findings.length > 0, `${label}: expected findings`);
  assert.equal(
    verdict.writeAuthorizationDenied,
    true,
    `${label}: write authorization must remain denied`,
  );
  assert.equal(
    Object.hasOwn(verdict, "writeAuthorized"),
    false,
    `${label}: must not expose writeAuthorized`,
  );
  assert.equal(
    Object.hasOwn(verdict, "authorizedToWrite"),
    false,
    `${label}: must not expose authorizedToWrite`,
  );

  return verdict;
}

function removeFirstKey(object) {
  const [key] = Object.keys(object);

  assert.ok(key, "expected at least one key to remove");
  delete object[key];

  return key;
}

function setFirstValue(object, value) {
  const [key] = Object.keys(object);

  assert.ok(key, "expected at least one key to mutate");
  object[key] = value;

  return key;
}

const orchestrationResult = composeDevOnlyInMemoryPackageOrchestration();

for (const value of Object.values(DEV_ONLY_LOCAL_SMOKE_GUARDRAILS)) {
  assert.equal(value, false);
}

assert.equal(orchestrationResult.phase_identity.status, "PASS");
assert.equal(orchestrationResult.package_blockers.blocked, false);
assert.equal(orchestrationResult.result_identity.official_check, false);
assert.equal(orchestrationResult.result_identity.aggregator_child, false);
assert.equal(orchestrationResult.result_identity.runtime_contract, "none");
assert.equal(orchestrationResult.result_identity.stdout_contract, "none");
assert.equal(orchestrationResult.result_identity.cli_contract, "none");
assert.equal(orchestrationResult.next_audit_expectation.official_check, false);
assert.equal(orchestrationResult.next_audit_expectation.checker_created, false);
assert.equal(
  orchestrationResult.next_audit_expectation.aggregator_child_registered,
  false,
);
assert.equal(
  orchestrationResult.next_audit_expectation.tenth_check_created,
  false,
);
assert.equal(orchestrationResult.no_write_evidence.target_read_attempted, false);
assert.equal(orchestrationResult.no_write_evidence.github_write_attempted, false);
assert.equal(
  orchestrationResult.no_write_evidence.productive_skill_mutation_attempted,
  false,
);
assert.equal(orchestrationResult.no_write_evidence.persistent_report_written, false);
assert.equal(
  orchestrationResult.codex_target_level_artifact_summary.materialized_output_created,
  false,
);
assert.equal(Object.hasOwn(orchestrationResult, "packageStatus"), false);
assert.equal(Object.hasOwn(orchestrationResult, "canonicalAgents"), false);
assert.equal(Object.hasOwn(orchestrationResult, "nonAuthorizationEvidence"), false);
assert.notEqual(
  reviewPackageResult(orchestrationResult).status,
  REVIEW_PASS,
  "raw orchestrator result must not be accepted directly as review success",
);

const reviewInput = buildReviewInput();
const conceptualPaths = [
  ...Object.values(reviewInput.targetMatrixSummary.copilotAgents),
  ...Object.values(reviewInput.targetMatrixSummary.codexAgents),
  reviewInput.conceptualOutputShapes.codexConfig,
  reviewInput.conceptualOutputShapes.codexRootInstructions,
];

assert.notEqual(reviewInput, orchestrationResult);
assert.equal(reviewInput.packageStatus, PACKAGE_PASS);
assert.equal(reviewInput.canonicalAgents.length, 12);
assert.equal(Object.keys(reviewInput.targetMatrixSummary.copilotAgents).length, 12);
assert.equal(Object.keys(reviewInput.targetMatrixSummary.codexAgents).length, 12);
assert.equal(
  reviewInput.codexTargetLevelArtifactSummary.config,
  CODEX_CONFIG_PATH,
);
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
for (const templateRef of REQUIRED_TEMPLATE_REFS) {
  assert.equal(reviewInput.templateSummary.templates.includes(templateRef), true);
}
for (const conceptualPath of conceptualPaths) {
  assert.equal(conceptualPath.startsWith("/"), false);
  assert.equal(conceptualPath.split("/").includes(".."), false);
}
assert.equal(reviewInput.noWriteEvidence.target_read_attempted, false);
assert.equal(reviewInput.noWriteEvidence.target_write_attempted, false);
assert.equal(reviewInput.noWriteEvidence.files_written.length, 0);
assert.equal(reviewInput.noWriteEvidence.persistent_report_written, false);
assert.equal(reviewInput.noWriteEvidence.github_write_attempted, false);
assert.equal(reviewInput.noWriteEvidence.productive_skill_mutation_attempted, false);
assert.equal(reviewInput.aggregatorPreservationSummary.changed, false);
assert.equal(reviewInput.aggregatorPreservationSummary.registered, false);
assert.equal(reviewInput.aggregatorPreservationSummary.checkerCreated, false);
assert.equal(reviewInput.aggregatorPreservationSummary.tenthCheckCreated, false);

for (const value of Object.values(reviewInput.nonAuthorizationEvidence)) {
  assert.equal(value, false);
}

expectReviewPass(reviewInput, "happy path");

expectReviewNonPass((input) => {
  const agent = removeFirstKey(input.targetMatrixSummary.copilotAgents);

  delete input.conceptualOutputShapes.copilotAgents[agent];
}, "incomplete Copilot matrix");

expectReviewNonPass((input) => {
  const agent = removeFirstKey(input.targetMatrixSummary.codexAgents);

  delete input.conceptualOutputShapes.codexAgents[agent];
}, "incomplete Codex matrix");

expectReviewNonPass((input) => {
  const [removed] = input.canonicalAgents;

  input.canonicalAgents = input.canonicalAgents.slice(1);
  delete input.canonicalKernelMapping[removed.agent];
}, "missing canonical agent");

expectReviewNonPass((input) => {
  input.canonicalAgents.push({
    agent: "non-canonical-agent",
    kernel: "non_canonical_kernel",
  });
  input.canonicalKernelMapping["non-canonical-agent"] = "non_canonical_kernel";
  input.targetMatrixSummary.copilotAgents["non-canonical-agent"] =
    ".github/agents/non-canonical-agent.agent.md";
  input.targetMatrixSummary.codexAgents["non-canonical-agent"] =
    ".codex/agents/non-canonical-agent.toml";
  input.conceptualOutputShapes.copilotAgents["non-canonical-agent"] =
    ".github/agents/non-canonical-agent.agent.md";
  input.conceptualOutputShapes.codexAgents["non-canonical-agent"] =
    ".codex/agents/non-canonical-agent.toml";
}, "extra non-canonical agent");

expectReviewNonPass((input) => {
  input.canonicalAgents[0].kernel = "wrong_kernel";
}, "incorrect kernel mapping");

expectReviewNonPass((input) => {
  input.targetMatrixSummary.codexAgents["codex-config"] = CODEX_CONFIG_PATH;
  input.conceptualOutputShapes.codexAgents["codex-config"] = CODEX_CONFIG_PATH;
  input.codexTargetLevelArtifactSummary.countedAsAgents = true;
}, ".codex/config.toml counted as agent");

expectReviewNonPass((input) => {
  input.targetMatrixSummary.codexAgents["codex-root-instructions"] =
    CODEX_ROOT_INSTRUCTIONS_PATH;
  input.conceptualOutputShapes.codexAgents["codex-root-instructions"] =
    CODEX_ROOT_INSTRUCTIONS_PATH;
  input.codexTargetLevelArtifactSummary.countedAsAgents = true;
}, "AGENTS.md counted as agent");

expectReviewNonPass((input) => {
  const [missingTemplate] = input.templateSummary.templates.splice(0, 1);

  input.templateSummary.missingTemplates = [missingTemplate];
}, "missing required template");

expectReviewNonPass((input) => {
  input.templateSummary.inferredTemplates = [
    "reference/templates/codex/agent.toml",
  ];
}, "inferred template");

expectReviewNonPass((input) => {
  input.templateSummary.ambiguousTemplates = [
    "reference/templates/copilot/agent.md",
  ];
}, "ambiguous template");

expectReviewNonPass((input) => {
  const agent = setFirstValue(
    input.targetMatrixSummary.copilotAgents,
    ".codex/agents/orchestrator.toml",
  );

  input.conceptualOutputShapes.copilotAgents[agent] =
    ".codex/agents/orchestrator.toml";
}, "crossed output shape");

expectReviewNonPass((input) => {
  const agent = setFirstValue(
    input.targetMatrixSummary.copilotAgents,
    "/Users/example/.github/agents/orchestrator.agent.md",
  );

  input.conceptualOutputShapes.copilotAgents[agent] =
    "/Users/example/.github/agents/orchestrator.agent.md";
}, "host absolute path in conceptual output shape");

expectReviewNonPass((input) => {
  const agent = setFirstValue(
    input.targetMatrixSummary.codexAgents,
    "../.codex/agents/orchestrator.toml",
  );

  input.conceptualOutputShapes.codexAgents[agent] =
    "../.codex/agents/orchestrator.toml";
}, "traversal path in conceptual output shape");

expectReviewNonPass((input) => {
  input.targetRealAccessed = true;
}, "Target real signal");

expectReviewNonPass((input) => {
  input.githubWriteAttempted = true;
}, "GitHub signal");

expectReviewNonPass((input) => {
  input.productiveSkillAccessed = true;
}, "productive skill signal");

expectReviewNonPass((input) => {
  delete input.noWriteEvidence;
}, "missing no-write evidence");

expectReviewNonPass((input) => {
  input.noWriteEvidence.target_write_attempted = true;
  input.noWriteEvidence.files_written = ["conceptual-output-created"];
}, "contradictory no-write evidence");

expectReviewNonPass((input) => {
  delete input.nonAuthorizationEvidence;
}, "missing non-authorization evidence");

expectReviewNonPass((input) => {
  input.unsafeSignals = ["APPROVED", "WRITE_APPROVED", "READY_TO_WRITE"];
}, "positive approval/write vocabulary");

expectReviewNonPass((input) => {
  input.aggregatorPreservationSummary.changed = true;
  input.aggregatorPreservationSummary.registered = true;
}, "Aggregator change signal");

expectReviewNonPass((input) => {
  input.aggregatorPreservationSummary.checkerCreated = true;
}, "checker creation signal");

expectReviewNonPass((input) => {
  input.aggregatorPreservationSummary.tenthCheckCreated = true;
}, "tenth check signal");
