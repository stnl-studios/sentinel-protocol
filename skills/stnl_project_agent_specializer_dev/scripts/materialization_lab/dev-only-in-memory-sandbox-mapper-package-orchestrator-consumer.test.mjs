import assert from "node:assert/strict";

import {
  createSandboxIntegrationMapperResult,
} from "./dev-only-in-memory-sandbox-integration-mapper.mjs";
import {
  createSandboxMinimalImplementationPlan,
} from "./dev-only-in-memory-sandbox-minimal-implementation.mjs";
import {
  SANDBOX_MAPPER_PACKAGE_ORCHESTRATOR_CONSUMER_BLOCKED,
  SANDBOX_MAPPER_PACKAGE_ORCHESTRATOR_CONSUMER_PASS,
  canonicalSandboxMapperPackageOrchestratorConsumerAgents,
  createSandboxMapperPackageOrchestratorConsumerResult,
  requiredSandboxMapperPackageOrchestratorConsumerNoWriteEvidence,
  requiredSandboxMapperPackageOrchestratorConsumerNonAuthorizationEvidenceKeys,
  sandboxMapperPackageOrchestratorConsumerImplementationBoundary,
} from "./dev-only-in-memory-sandbox-mapper-package-orchestrator-consumer.mjs";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function passMapperResult() {
  return createSandboxIntegrationMapperResult(createSandboxMinimalImplementationPlan());
}

function blockedMapperResult() {
  return createSandboxIntegrationMapperResult(
    createSandboxMinimalImplementationPlan({
      githubWriteAttempted: true,
    }),
  );
}

function consume(input) {
  return createSandboxMapperPackageOrchestratorConsumerResult(input);
}

function assertBlocked(input, label) {
  const result =
    arguments.length === 1
      ? createSandboxMapperPackageOrchestratorConsumerResult()
      : consume(input);

  assert.equal(
    result.status,
    SANDBOX_MAPPER_PACKAGE_ORCHESTRATOR_CONSUMER_BLOCKED,
    label,
  );
  assert.equal(result.mapperInputAccepted, false, `${label}: mapper input rejected`);
  assert.equal(result.failClosed.enforced, true, `${label}: fail-closed enforced`);
  assert.equal(result.failClosed.blocked, true, `${label}: fail-closed blocked`);
  assert.ok(result.diagnostics.findings.length > 0, `${label}: findings present`);
  assertNoWriteEvidence(result.noWriteEvidence, `${label}: no-write evidence`);
  assertNonAuthorizationEvidence(
    result.nonAuthorizationEvidence,
    `${label}: non-authorization evidence`,
  );

  return result;
}

function assertNoWriteEvidence(noWriteEvidence, label) {
  assert.deepEqual(
    Object.keys(noWriteEvidence).sort(),
    Object.keys(requiredSandboxMapperPackageOrchestratorConsumerNoWriteEvidence).sort(),
    `${label}: exact no-write evidence keys`,
  );

  for (const [key, expectedValue] of Object.entries(
    requiredSandboxMapperPackageOrchestratorConsumerNoWriteEvidence,
  )) {
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
    [...requiredSandboxMapperPackageOrchestratorConsumerNonAuthorizationEvidenceKeys].sort(),
    `${label}: exact non-authorization evidence keys`,
  );

  for (const key of requiredSandboxMapperPackageOrchestratorConsumerNonAuthorizationEvidenceKeys) {
    assert.equal(nonAuthorizationEvidence[key], false, `${label}: ${key} must be false`);
  }
}

function contaminatedMapperResult(patch) {
  return {
    ...clone(passMapperResult()),
    ...patch,
  };
}

{
  const mapperResult = passMapperResult();
  const result = consume(mapperResult);

  assert.equal(
    result.status,
    SANDBOX_MAPPER_PACKAGE_ORCHESTRATOR_CONSUMER_PASS,
    "mapper result PASS accepted",
  );
  assert.equal(result.mapperInputAccepted, true);
  assert.equal(result.failClosed.blocked, false);
  assert.deepEqual(result.diagnostics.findings, []);
}

assertBlocked(blockedMapperResult(), "mapper result BLOCKED rejected");
assertBlocked("input missing rejected");
assertBlocked(null, "input null rejected");
assertBlocked("not-object", "input non-object rejected");
assertBlocked(contaminatedMapperResult({ status: "READY" }), "unknown status rejected");

{
  const result = consume(passMapperResult());

  assert.deepEqual(
    result.canonicalAgentMatrix.agents,
    [...canonicalSandboxMapperPackageOrchestratorConsumerAgents],
    "12 canonical agents preserved",
  );
  assert.equal(result.canonicalAgentMatrix.agentCount, 12);
  assert.equal(result.canonicalAgentMatrix.exactlyTwelveAgents, true);
}

{
  const result = consume(passMapperResult());

  assert.equal(result.canonicalAgentMatrix.copilotAgentArtifactCount, 12);
  assert.equal(result.canonicalAgentMatrix.codexAgentArtifactCount, 12);
  assert.equal(result.canonicalAgentMatrix.exactlyTwentyFourAgentArtifacts, true);
  assert.equal(
    result.packageOrchestratorConsumerCompatibility.expectedPackageArtifacts.agentArtifacts,
    24,
    "24 agent artifacts preserved",
  );
}

{
  const result = consume(passMapperResult());

  assert.equal(result.canonicalAgentMatrix.targetLevelArtifactCount, 2);
  assert.equal(result.codexTargetLevelArtifactSummary.expectedCount, 2);
  assert.equal(result.codexTargetLevelArtifactSummary.actualCount, 2);
  assert.equal(result.codexTargetLevelArtifactSummary.complete, true);
}

{
  const result = consume(passMapperResult());

  assert.equal(result.canonicalAgentMatrix.targetLevelArtifactsAreAgents, false);
  assert.equal(result.codexTargetLevelArtifactSummary.targetLevel, true);
  assert.equal(result.codexTargetLevelArtifactSummary.agentIdAbsent, true);
  assert.equal(
    result.packageOrchestratorConsumerCompatibility.targetLevelArtifactsPreservedAsNonAgents,
    true,
  );
}

{
  const mapperResult = passMapperResult();
  const result = consume(mapperResult);

  assert.deepEqual(
    result.noWriteEvidence,
    mapperResult.noWriteEvidence,
    "noWriteEvidence preserved",
  );
  assertNoWriteEvidence(result.noWriteEvidence, "happy path no-write evidence");
}

{
  const mapperResult = passMapperResult();
  const result = consume(mapperResult);

  assert.deepEqual(
    result.nonAuthorizationEvidence,
    mapperResult.nonAuthorizationEvidence,
    "nonAuthorizationEvidence preserved",
  );
  assertNonAuthorizationEvidence(
    result.nonAuthorizationEvidence,
    "happy path non-authorization evidence",
  );
}

{
  const mapperResult = clone(passMapperResult());
  mapperResult.nonAuthorizationEvidence.real_writer_authorized = true;

  assertBlocked(mapperResult, "authorization flag true rejected");
}

{
  const mapperResult = contaminatedMapperResult({
    targetRealPath: "/tmp/sentinel-target",
  });

  assertBlocked(mapperResult, "Target real signal rejected");
}

{
  const mapperResult = contaminatedMapperResult({
    githubWriteAttempted: true,
  });

  assertBlocked(mapperResult, "GitHub signal rejected");
}

{
  const mapperResult = contaminatedMapperResult({
    productiveSkillReadAuthorized: true,
  });

  assertBlocked(mapperResult, "productive skill signal rejected");
}

{
  const mapperResult = contaminatedMapperResult({
    outputPersisted: true,
  });

  assertBlocked(mapperResult, "persisted output rejected");
}

{
  const mapperResult = contaminatedMapperResult({
    packageOrchestratorExecuted: true,
  });

  assertBlocked(mapperResult, "package orchestrator execution rejected");
}

{
  const mapperResult = contaminatedMapperResult({
    reviewLayerExecuted: true,
  });

  assertBlocked(mapperResult, "review layer execution rejected");
}

{
  const mapperResult = contaminatedMapperResult({
    dryRunMaterializerExecuted: true,
  });

  assertBlocked(mapperResult, "dry-run materializer execution rejected");
}

{
  const mapperResult = contaminatedMapperResult({
    materializationExecuted: true,
  });

  assertBlocked(mapperResult, "materialization execution rejected");
}

{
  const result = consume(passMapperResult());

  assert.equal(sandboxMapperPackageOrchestratorConsumerImplementationBoundary.importsFs, false);
  assert.equal(sandboxMapperPackageOrchestratorConsumerImplementationBoundary.importsPath, false);
  assert.equal(
    sandboxMapperPackageOrchestratorConsumerImplementationBoundary.importsChildProcess,
    false,
  );
  assert.equal(
    sandboxMapperPackageOrchestratorConsumerImplementationBoundary.importsNetwork,
    false,
  );
  assert.equal(result.implementationBoundary.importsFs, false);
  assert.equal(result.implementationBoundary.importsPath, false);
  assert.equal(result.implementationBoundary.importsChildProcess, false);
  assert.equal(result.implementationBoundary.importsNetwork, false);
}

{
  const result = consume(passMapperResult());
  const compatibility = result.packageOrchestratorConsumerCompatibility;

  assert.equal(compatibility.packageOrchestratorExecuted, false);
  assert.equal(compatibility.reviewLayerExecuted, false);
  assert.equal(compatibility.dryRunMaterializerExecuted, false);
  assert.equal(result.implementationBoundary.packageOrchestratorExecuted, false);
  assert.equal(result.implementationBoundary.reviewLayerExecuted, false);
  assert.equal(result.implementationBoundary.dryRunMaterializerExecuted, false);
}

{
  const result = consume(passMapperResult());

  assert.equal(result.implementationBoundary.aggregatorChanged, false);
  assert.equal(result.packageOrchestratorConsumerCompatibility.aggregatorChanged, false);

  assertBlocked(
    contaminatedMapperResult({ aggregatorChangeAuthorized: true }),
    "Aggregator signal rejected",
  );
}

{
  const result = consume(passMapperResult());

  assert.equal(result.implementationBoundary.checkerCreated, false);
  assert.equal(result.packageOrchestratorConsumerCompatibility.checkerCreated, false);

  assertBlocked(
    contaminatedMapperResult({ checkerCreationAuthorized: true }),
    "checker creation signal rejected",
  );
}

{
  const result = consume(passMapperResult());

  assert.equal(result.implementationBoundary.tenthCheckCreated, false);
  assert.equal(result.packageOrchestratorConsumerCompatibility.tenthCheckCreated, false);

  assertBlocked(
    contaminatedMapperResult({ tenthCheckAuthorized: true }),
    "tenth check signal rejected",
  );
}

{
  const result = consume(passMapperResult());

  assert.equal(
    typeof result.packageOrchestratorConsumerCompatibility,
    "object",
    "happy path compatibility object produced",
  );
  assert.equal(result.packageOrchestratorConsumerCompatibility.compatible, true);
  assert.equal(
    result.packageOrchestratorConsumerCompatibility.structuralCompatibilityOnly,
    true,
  );
}
