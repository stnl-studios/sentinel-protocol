import assert from "node:assert/strict";

import {
  DRY_RUN_PASS,
  buildDryRunNoWriteEvidence,
  buildDryRunNonAuthorizationEvidence,
  buildPackageDryRunMaterializationPlan,
} from "./dev-only-in-memory-package-dry-run-materializer.mjs";

const canonicalAgents = [
  "orchestrator",
  "planner",
  "validation-eval-designer",
  "execution-package-designer",
  "designer",
  "coder-frontend",
  "coder-backend",
  "coder-ios",
  "validation-runner",
  "reviewer",
  "finalizer",
  "resync",
];

const requiredTemplates = [
  "reference/templates/copilot/agent.md",
  "reference/templates/codex/agent.toml",
  "reference/templates/codex/config.toml",
  "reference/templates/codex/AGENTS.md",
];

function buildHappyPackage() {
  const copilotAgents = Object.fromEntries(
    canonicalAgents.map((agent) => [agent, `.github/agents/${agent}.agent.md`]),
  );
  const codexAgents = Object.fromEntries(
    canonicalAgents.map((agent) => [agent, `.codex/agents/${agent}.toml`]),
  );

  return {
    packageStatus: "REVIEW_PASS",
    canonicalAgents: canonicalAgents.map((agent) => ({ agent })),
    targetMatrixSummary: {
      copilotAgents,
      codexAgents,
    },
    conceptualOutputShapes: {
      copilotAgents,
      codexAgents,
      codexConfig: ".codex/config.toml",
      codexRootInstructions: "AGENTS.md",
    },
    templateSummary: {
      templates: requiredTemplates,
      missingTemplates: [],
      ambiguousTemplates: [],
      inferredTemplates: [],
      explicitTemplatesRequired: true,
    },
    codexTargetLevelArtifactSummary: {
      config: ".codex/config.toml",
      rootInstructions: "AGENTS.md",
      countedAsAgents: false,
    },
    aggregatorPreservationSummary: {
      childCheckCount: 9,
      changed: false,
      registered: false,
      childAdded: false,
      checkerCreated: false,
      tenthCheckCreated: false,
    },
    noWriteEvidence: buildDryRunNoWriteEvidence(),
    nonAuthorizationEvidence: buildDryRunNonAuthorizationEvidence(),
    blockers: [],
    needsRevision: [],
    unsafeSignals: [],
  };
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function changed(mutator) {
  const value = clone(buildHappyPackage());
  mutator(value);
  return value;
}

function assertPass(packageResult, label) {
  const result = buildPackageDryRunMaterializationPlan(packageResult);

  assert.equal(result.status, DRY_RUN_PASS, label);
  assert.equal(result.writeAuthorizationDenied, true, `${label}: write authorization must be denied`);
  assert.equal(result.summary.dryRunPassAuthorizesWrite, false, `${label}: DRY_RUN_PASS must not authorize writes`);
  assert.equal(result.summary.realMaterializationAuthorized, false, `${label}: real materialization must not be authorized`);
  assert.deepEqual(result.blockers, [], `${label}: blockers must be empty`);

  return result;
}

function assertNotPass(packageResult, label) {
  const result = buildPackageDryRunMaterializationPlan(packageResult);

  assert.notEqual(result.status, DRY_RUN_PASS, label);
  assert.ok(result.findings.length > 0, `${label}: expected findings`);
  assert.equal(result.writeAuthorizationDenied, true, `${label}: write authorization must remain denied`);
  assert.equal(result.summary.dryRunPassAuthorizesWrite, false, `${label}: non-pass must not authorize writes`);

  return result;
}

{
  const result = assertPass(buildHappyPackage(), "happy path in-memory DRY_RUN_PASS");
  const copilotArtifacts = result.conceptualOutputInventory.filter(
    (artifact) => artifact.targetFamily === "copilot" && artifact.artifactKind === "agent",
  );
  const codexAgentArtifacts = result.conceptualOutputInventory.filter(
    (artifact) => artifact.targetFamily === "codex" && artifact.artifactKind === "agent",
  );
  const codexTargetLevelArtifacts = result.codexTargetLevelArtifacts;

  assert.equal(copilotArtifacts.length, 12, "output inventory must have 12 Copilot agent artifacts");
  assert.equal(codexAgentArtifacts.length, 12, "output inventory must have 12 Codex agent artifacts");
  assert.equal(
    codexTargetLevelArtifacts.some(
      (artifact) => artifact.targetRootRelativePath === ".codex/config.toml",
    ),
    true,
    ".codex/config.toml must exist as target-level artifact",
  );
  assert.equal(
    codexTargetLevelArtifacts.some(
      (artifact) => artifact.targetRootRelativePath === "AGENTS.md",
    ),
    true,
    "AGENTS.md must exist as target-level artifact",
  );
  assert.equal(
    codexAgentArtifacts.some(
      (artifact) => artifact.targetRootRelativePath === ".codex/config.toml",
    ),
    false,
    ".codex/config.toml must not be counted as an agent",
  );
  assert.equal(
    codexAgentArtifacts.some((artifact) => artifact.targetRootRelativePath === "AGENTS.md"),
    false,
    "AGENTS.md must not be counted as an agent",
  );
  assert.equal(
    Object.values(result.noWriteEvidence).every((value) =>
      Array.isArray(value) ? value.length === 0 : value === false,
    ),
    true,
    "output no-write evidence must remain safe",
  );
  assert.equal(
    Object.values(result.nonAuthorizationEvidence).every((value) => value === false),
    true,
    "output non-authorization evidence must remain false",
  );
}

assertNotPass(
  changed((packageResult) => {
    packageResult.canonicalAgents = packageResult.canonicalAgents.slice(0, 11);
  }),
  "agent ausente blocks",
);

assertNotPass(
  changed((packageResult) => {
    packageResult.canonicalAgents.push({ agent: "extra-agent" });
  }),
  "agent extra blocks",
);

assertNotPass(
  changed((packageResult) => {
    delete packageResult.targetMatrixSummary.copilotAgents.resync;
    delete packageResult.conceptualOutputShapes.copilotAgents.resync;
  }),
  "incomplete 12 x copilot matrix blocks",
);

assertNotPass(
  changed((packageResult) => {
    delete packageResult.targetMatrixSummary.codexAgents.resync;
    delete packageResult.conceptualOutputShapes.codexAgents.resync;
  }),
  "incomplete 12 x codex matrix blocks",
);

assertNotPass(
  changed((packageResult) => {
    packageResult.targetMatrixSummary.codexAgents.config = ".codex/config.toml";
  }),
  ".codex/config.toml counted as agent blocks",
);

assertNotPass(
  changed((packageResult) => {
    packageResult.targetMatrixSummary.codexAgents.root = "AGENTS.md";
  }),
  "AGENTS.md counted as agent blocks",
);

assertNotPass(
  changed((packageResult) => {
    packageResult.templateSummary.templates = packageResult.templateSummary.templates.filter(
      (template) => template !== "reference/templates/codex/AGENTS.md",
    );
  }),
  "missing template blocks",
);

assertNotPass(
  changed((packageResult) => {
    packageResult.templateSummary.inferredTemplates = [
      "reference/templates/codex/config.toml",
    ];
  }),
  "inferred template blocks",
);

assertNotPass(
  changed((packageResult) => {
    packageResult.targetMatrixSummary.copilotAgents.orchestrator =
      ".codex/agents/orchestrator.toml";
  }),
  "crossed output shape blocks",
);

assertNotPass(
  changed((packageResult) => {
    delete packageResult.noWriteEvidence;
  }),
  "no-write evidence missing blocks",
);

assertNotPass(
  changed((packageResult) => {
    packageResult.noWriteEvidence.target_write_attempted = true;
  }),
  "no-write evidence contradictory blocks",
);

assertNotPass(
  changed((packageResult) => {
    delete packageResult.nonAuthorizationEvidence;
  }),
  "non-authorization evidence missing blocks",
);

assertNotPass(
  changed((packageResult) => {
    packageResult.nonAuthorizationEvidence.real_writer_authorized = true;
  }),
  "non-authorization evidence contradictory blocks",
);

assertNotPass(
  changed((packageResult) => {
    packageResult.targetMatrixSummary.copilotAgents.orchestrator =
      "/tmp/target/.github/agents/orchestrator.agent.md";
  }),
  "absolute path blocks",
);

assertNotPass(
  changed((packageResult) => {
    packageResult.targetMatrixSummary.codexAgents.orchestrator =
      "../.codex/agents/orchestrator.toml";
  }),
  "path traversal blocks",
);

assertNotPass(
  changed((packageResult) => {
    packageResult.targetRealPath = "/tmp/real-target";
  }),
  "Target real signal blocks",
);

assertNotPass(
  changed((packageResult) => {
    packageResult.githubWriteAttempted = true;
  }),
  "GitHub signal blocks",
);

assertNotPass(
  changed((packageResult) => {
    packageResult.productiveSkillAccessed = true;
  }),
  "productive skill signal blocks",
);

assertNotPass(
  changed((packageResult) => {
    packageResult.rendererCreated = true;
    packageResult.writerCreated = true;
    packageResult.loaderCreated = true;
  }),
  "renderer/writer/loader signal blocks",
);

assertNotPass(
  changed((packageResult) => {
    packageResult.targetAdapterCreated = true;
    packageResult.writeApprovalCreated = true;
    packageResult.approvalTokenIssued = true;
    packageResult.approvalRegistryCreated = true;
    packageResult.approvalSignatureCreated = true;
    packageResult.signerCreated = true;
  }),
  "Target Adapter/Write Approval signal blocks",
);

assertNotPass(
  changed((packageResult) => {
    packageResult.runtimeCreated = true;
    packageResult.cliCreated = true;
    packageResult.schemaOfficial = true;
    packageResult.stdoutContract = "official stdout contract";
  }),
  "runtime/CLI/schema/stdout signal blocks",
);

assertNotPass(
  changed((packageResult) => {
    packageResult.aggregatorPreservationSummary.changed = true;
    packageResult.checkerCreated = true;
    packageResult.tenthCheckCreated = true;
  }),
  "Aggregator/checker/tenth check signal blocks",
);

assertNotPass(
  changed((packageResult) => {
    packageResult.patchApplied = true;
    packageResult.diffApplication = true;
    packageResult.commitCreated = true;
    packageResult.branchCreated = true;
    packageResult.pullRequestCreated = true;
  }),
  "patch/diff/GitHub publishing signal blocks",
);

{
  const result = buildPackageDryRunMaterializationPlan(buildHappyPackage());

  assert.equal(result.status, DRY_RUN_PASS, "DRY_RUN_PASS baseline");
  assert.equal(result.writeAuthorizationDenied, true, "DRY_RUN_PASS must deny writes");
  assert.equal(Object.hasOwn(result, "writeAuthorized"), false, "result must not expose writeAuthorized");
  assert.equal(Object.hasOwn(result, "authorizedToWrite"), false, "result must not expose authorizedToWrite");
  assert.equal(result.summary.dryRunPassAuthorizesWrite, false, "DRY_RUN_PASS cannot authorize writing");
}
