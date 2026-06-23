import assert from "node:assert/strict";

import {
  createSandboxMinimalImplementationPlan,
  requiredNoWriteEvidence,
  requiredNonAuthorizationEvidenceKeys,
} from "./dev-only-in-memory-sandbox-minimal-implementation.mjs";
import {
  SANDBOX_INTEGRATION_MAPPER_BLOCKED,
  SANDBOX_INTEGRATION_MAPPER_PASS,
  canonicalSandboxIntegrationAgents,
  createSandboxIntegrationMapperResult,
  requiredSandboxIntegrationNoWriteEvidence,
  requiredSandboxIntegrationNonAuthorizationEvidenceKeys,
  sandboxIntegrationMapperImplementationBoundary,
} from "./dev-only-in-memory-sandbox-integration-mapper.mjs";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function passPlan() {
  return createSandboxMinimalImplementationPlan();
}

function blockedPlan() {
  return createSandboxMinimalImplementationPlan({
    nonAuthorizationEvidence: {
      ...Object.fromEntries(requiredNonAuthorizationEvidenceKeys.map((key) => [key, false])),
      real_writer_authorized: true,
    },
  });
}

function map(input) {
  return createSandboxIntegrationMapperResult(input);
}

function assertBlocked(input, label) {
  const result = map(input);

  assert.equal(result.status, SANDBOX_INTEGRATION_MAPPER_BLOCKED, label);
  assert.equal(result.failClosed.enforced, true, `${label}: fail-closed enforced`);
  assert.equal(result.failClosed.blocked, true, `${label}: fail-closed blocked`);
  assert.ok(result.diagnostics.findings.length > 0, `${label}: diagnostics present`);
  assertNoWriteEvidence(result.noWriteEvidence, `${label}: mapper no-write evidence`);
  assertNonAuthorizationEvidence(
    result.nonAuthorizationEvidence,
    `${label}: mapper non-authorization evidence`,
  );

  return result;
}

function assertNoWriteEvidence(noWriteEvidence, label) {
  assert.deepEqual(
    Object.keys(noWriteEvidence).sort(),
    Object.keys(requiredSandboxIntegrationNoWriteEvidence).sort(),
    `${label}: exact no-write evidence keys`,
  );
  assert.deepEqual(
    Object.keys(noWriteEvidence).sort(),
    Object.keys(requiredNoWriteEvidence).sort(),
    `${label}: sandbox no-write evidence keys preserved`,
  );

  for (const [key, expectedValue] of Object.entries(requiredSandboxIntegrationNoWriteEvidence)) {
    if (Array.isArray(expectedValue)) {
      assert.deepEqual(noWriteEvidence[key], [], `${label}: ${key} must be []`);
    } else {
      assert.equal(noWriteEvidence[key], false, `${label}: ${key} must be false`);
    }
  }
}

function assertNonAuthorizationEvidence(nonAuthorizationEvidence, label) {
  assert.deepEqual(
    Object.keys(nonAuthorizationEvidence).sort(),
    [...requiredSandboxIntegrationNonAuthorizationEvidenceKeys].sort(),
    `${label}: exact non-authorization evidence keys`,
  );
  assert.deepEqual(
    Object.keys(nonAuthorizationEvidence).sort(),
    [...requiredNonAuthorizationEvidenceKeys].sort(),
    `${label}: sandbox non-authorization evidence keys preserved`,
  );

  for (const key of requiredSandboxIntegrationNonAuthorizationEvidenceKeys) {
    assert.equal(nonAuthorizationEvidence[key], false, `${label}: ${key} must be false`);
  }
}

{
  const result = map(passPlan());

  assert.equal(result.status, SANDBOX_INTEGRATION_MAPPER_PASS, "PASS sandbox accepted");
  assert.equal(result.packageLevelCompatibility.compatible, true);
  assert.equal(result.reviewLayerCompatibility.compatible, true);
  assert.equal(result.dryRunMaterializerCompatibility.compatible, true);
  assert.equal(result.packageLevelCompatibility.packageOrchestratorExecuted, false);
  assert.equal(result.reviewLayerCompatibility.reviewLayerExecuted, false);
  assert.equal(
    result.dryRunMaterializerCompatibility.dryRunMaterializerExecuted,
    false,
  );
}

assertBlocked(blockedPlan(), "sandbox BLOCKED rejected");
assertBlocked(undefined, "missing input rejected");
assertBlocked(null, "null input rejected");
assertBlocked("not-object", "non-object input rejected");
assertBlocked({ ...passPlan(), status: "READY" }, "unknown sandbox status rejected");

{
  const result = map(passPlan());

  assert.deepEqual(
    result.canonicalAgentMatrix.agents,
    [...canonicalSandboxIntegrationAgents],
    "exactly 12 agents preserved",
  );
  assert.equal(result.canonicalAgentMatrix.agentCount, 12);
  assert.equal(result.canonicalAgentMatrix.exactlyTwelveAgents, true);
}

{
  const result = map(passPlan());

  assert.equal(result.canonicalAgentMatrix.copilotAgentArtifactCount, 12);
  assert.equal(result.canonicalAgentMatrix.codexAgentArtifactCount, 12);
  assert.equal(result.canonicalAgentMatrix.exactlyTwentyFourAgentArtifacts, true);
  assert.equal(
    result.normalizedSandboxArtifacts.filter((artifact) => artifact.targetLevel !== true)
      .length,
    24,
    "24 agent artifacts preserved",
  );
}

{
  const result = map(passPlan());

  assert.equal(result.canonicalAgentMatrix.targetLevelArtifactCount, 2);
  assert.equal(result.codexTargetLevelArtifactSummary.expectedCount, 2);
  assert.equal(result.codexTargetLevelArtifactSummary.actualCount, 2);
  assert.equal(result.codexTargetLevelArtifactSummary.complete, true);
}

{
  const result = map(passPlan());

  assert.equal(result.canonicalAgentMatrix.targetLevelArtifactsAreAgents, false);
  assert.equal(result.codexTargetLevelArtifactSummary.targetLevel, true);
  assert.equal(result.codexTargetLevelArtifactSummary.agentIdAbsent, true);
  assert.equal(
    result.codexTargetLevelArtifactSummary.configToml.conceptualOutputPath,
    ".codex/config.toml",
  );
  assert.equal(
    result.codexTargetLevelArtifactSummary.agentsMd.conceptualOutputPath,
    "AGENTS.md",
  );
}

{
  const result = map(passPlan());

  assertNoWriteEvidence(result.noWriteEvidence, "PASS propagation");
  assert.deepEqual(result.noWriteEvidence.files_written, []);
}

{
  const result = map(passPlan());

  assertNonAuthorizationEvidence(result.nonAuthorizationEvidence, "PASS propagation");
}

{
  const plan = clone(passPlan());
  plan.conceptualArtifacts.pop();

  assertBlocked(plan, "artifact matrix alteration rejected");
}

{
  const plan = clone(passPlan());
  plan.nonAuthorizationEvidence.real_target_write_authorized = true;

  assertBlocked(plan, "authorization flag true rejected");
}

{
  const plan = clone(passPlan());
  plan.targetRealPath = "/tmp/sentinel-target";

  assertBlocked(plan, "Target real signal rejected");
}

{
  const plan = clone(passPlan());
  plan.githubWriteAttempted = true;

  assertBlocked(plan, "GitHub signal rejected");
}

{
  const plan = clone(passPlan());
  plan.productiveSkillReadAuthorized = true;

  assertBlocked(plan, "productive skill signal rejected");
}

{
  const plan = clone(passPlan());
  plan.persistentOutputPath = "/tmp/sentinel-output.json";

  assertBlocked(plan, "persistent output signal rejected");
}

{
  const plan = clone(passPlan());
  plan.outputPersisted = true;

  assertBlocked(plan, "output persisted signal rejected");
}

{
  const plan = clone(passPlan());
  plan.packageOrchestratorExecuted = true;

  assertBlocked(plan, "package orchestrator execution signal rejected");
}

{
  const plan = clone(passPlan());
  plan.reviewLayerExecuted = true;

  assertBlocked(plan, "review layer execution signal rejected");
}

{
  const plan = clone(passPlan());
  plan.dryRunMaterializerExecuted = true;

  assertBlocked(plan, "dry-run materializer execution signal rejected");
}

{
  const plan = clone(passPlan());
  plan.aggregatorChangeAuthorized = true;

  assertBlocked(plan, "Aggregator signal rejected");
}

{
  const plan = clone(passPlan());
  plan.checkerCreationAuthorized = true;

  assertBlocked(plan, "checker signal rejected");
}

{
  const plan = clone(passPlan());
  plan.tenthCheckAuthorized = true;

  assertBlocked(plan, "tenth check signal rejected");
}

{
  const plan = clone(passPlan());
  plan.runtimeAuthorized = true;

  assertBlocked(plan, "runtime signal rejected");
}

{
  const plan = clone(passPlan());
  plan.cliAuthorized = true;

  assertBlocked(plan, "CLI signal rejected");
}

{
  const plan = clone(passPlan());
  plan.officialSchemaAuthorized = true;

  assertBlocked(plan, "official schema signal rejected");
}

{
  const plan = clone(passPlan());
  plan.stdoutContractAuthorized = true;

  assertBlocked(plan, "stdout contract signal rejected");
}

{
  const plan = clone(passPlan());
  plan.realRendererAuthorized = true;

  assertBlocked(plan, "renderer signal rejected");
}

{
  const plan = clone(passPlan());
  plan.realWriterAuthorized = true;

  assertBlocked(plan, "writer signal rejected");
}

{
  const plan = clone(passPlan());
  plan.realLoaderAuthorized = true;

  assertBlocked(plan, "loader signal rejected");
}

{
  const plan = clone(passPlan());
  plan.realTargetAdapterAuthorized = true;

  assertBlocked(plan, "Target Adapter signal rejected");
}

{
  const plan = clone(passPlan());
  plan.realWriteApprovalAuthorized = true;

  assertBlocked(plan, "Write Approval signal rejected");
}

{
  const plan = clone(passPlan());
  plan.conceptualArtifacts[0].materialized = true;

  assertBlocked(plan, "materialized artifact rejected");
}

{
  const plan = clone(passPlan());
  plan.conceptualArtifacts[0].writeAttempted = true;

  assertBlocked(plan, "writeAttempted artifact rejected");
}

{
  const plan = clone(passPlan());
  plan.noWriteEvidence.target_write_attempted = true;

  assertBlocked(plan, "no-write evidence true rejected");
}

{
  const plan = clone(passPlan());
  delete plan.noWriteEvidence.files_written;

  assertBlocked(plan, "incomplete no-write evidence rejected");
}

{
  const plan = clone(passPlan());
  delete plan.nonAuthorizationEvidence.real_loader_authorized;

  assertBlocked(plan, "incomplete non-authorization evidence rejected");
}

{
  const plan = clone(passPlan());
  plan.canonicalAgents = [...plan.canonicalAgents, "extra-agent"];

  assertBlocked(plan, "extra agent rejected");
}

{
  const plan = clone(passPlan());
  plan.canonicalAgents = plan.canonicalAgents.slice(0, 11);

  assertBlocked(plan, "missing agent rejected");
}

{
  const plan = clone(passPlan());
  plan.canonicalAgents = [...canonicalSandboxIntegrationAgents.slice(0, 11), "AGENTS.md"];

  assertBlocked(plan, "target-level artifact counted as agent rejected");
}

{
  const plan = clone(passPlan());
  const agentsMdArtifact = plan.conceptualArtifacts.find(
    (artifact) => artifact.conceptualOutputPath === "AGENTS.md",
  );
  delete agentsMdArtifact.templateReference;

  assertBlocked(plan, "template reference omission rejected");
}

{
  const result = map(passPlan());

  assert.equal(sandboxIntegrationMapperImplementationBoundary.importsFs, false);
  assert.equal(result.implementationBoundary.importsFs, false);
  assert.equal(result.implementationBoundary.importsPath, false);
  assert.equal(result.implementationBoundary.importsChildProcess, false);
  assert.equal(result.implementationBoundary.importsNetwork, false);
}

{
  const result = map(passPlan());

  assert.equal(
    result.normalizedSandboxArtifacts.every(
      (artifact) =>
        artifact.materialized === false && artifact.writeAttempted === false,
    ),
    true,
    "mapper does not materialize output",
  );
  assert.equal(result.implementationBoundary.outputPersisted, false);
  assert.equal(result.implementationBoundary.persistentReportWritten, false);
  assert.equal(result.implementationBoundary.materializationExecuted, false);
}
