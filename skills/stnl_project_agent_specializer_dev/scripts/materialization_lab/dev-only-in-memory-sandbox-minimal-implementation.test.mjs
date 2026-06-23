import assert from "node:assert/strict";

import {
  SANDBOX_MINIMAL_IMPLEMENTATION_BLOCKED,
  SANDBOX_MINIMAL_IMPLEMENTATION_PASS,
  buildSandboxNoWriteEvidence,
  buildSandboxNonAuthorizationEvidence,
  canonicalSandboxAgents,
  createSandboxMinimalImplementationPlan,
  requiredNoWriteEvidence,
  requiredNonAuthorizationEvidenceKeys,
  requiredSandboxTemplateReferences,
} from "./dev-only-in-memory-sandbox-minimal-implementation.mjs";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function assertBlocked(input, label) {
  const result = createSandboxMinimalImplementationPlan(input);

  assert.equal(result.status, SANDBOX_MINIMAL_IMPLEMENTATION_BLOCKED, label);
  assert.equal(result.failClosed.enforced, true, `${label}: fail-closed must be enforced`);
  assert.equal(result.failClosed.blocked, true, `${label}: result must be blocked`);
  assert.ok(result.diagnostics.findings.length > 0, `${label}: findings must be present`);
  assertNoWriteEvidence(result.noWriteEvidence, `${label}: public no-write evidence`);
  assertNonAuthorizationEvidence(
    result.nonAuthorizationEvidence,
    `${label}: public non-authorization evidence`,
  );

  return result;
}

function assertNoWriteEvidence(noWriteEvidence, label) {
  assert.deepEqual(
    Object.keys(noWriteEvidence).sort(),
    Object.keys(requiredNoWriteEvidence).sort(),
    `${label}: exact no-write evidence keys`,
  );

  for (const [key, expectedValue] of Object.entries(requiredNoWriteEvidence)) {
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
    [...requiredNonAuthorizationEvidenceKeys].sort(),
    `${label}: exact non-authorization evidence keys`,
  );

  for (const key of requiredNonAuthorizationEvidenceKeys) {
    assert.equal(nonAuthorizationEvidence[key], false, `${label}: ${key} must be false`);
  }
}

{
  const result = createSandboxMinimalImplementationPlan();

  assert.equal(result.status, SANDBOX_MINIMAL_IMPLEMENTATION_PASS, "happy path PASS");
  assert.deepEqual(
    result.canonicalAgents,
    [...canonicalSandboxAgents],
    "happy path must preserve exactly 12 canonical agents",
  );

  const copilotArtifacts = result.conceptualArtifacts.filter(
    (artifact) => artifact.artifactType === "copilot-agent",
  );
  const codexArtifacts = result.conceptualArtifacts.filter(
    (artifact) => artifact.artifactType === "codex-agent",
  );
  const targetLevelArtifacts = result.targetLevelArtifacts;
  const agentArtifacts = result.conceptualArtifacts.filter(
    (artifact) => artifact.targetLevel !== true,
  );

  assert.equal(copilotArtifacts.length, 12, "must produce 12 Copilot artifacts");
  assert.equal(codexArtifacts.length, 12, "must produce 12 Codex artifacts");
  assert.equal(targetLevelArtifacts.length, 2, "must produce 2 target-level artifacts");
  assert.equal(
    agentArtifacts.some(
      (artifact) =>
        artifact.conceptualOutputPath === ".codex/config.toml" ||
        artifact.conceptualOutputPath === "AGENTS.md",
    ),
    false,
    "target-level artifacts must not count as agents",
  );
  assert.equal(
    targetLevelArtifacts.every(
      (artifact) => artifact.targetLevel === true && artifact.agentId === null,
    ),
    true,
    "target-level artifacts must be targetLevel=true and agentId=null",
  );
  assert.equal(result.boundaries.targetLevelArtifactsAreAgents, false);

  assertNoWriteEvidence(result.noWriteEvidence, "happy path");
  assertNonAuthorizationEvidence(result.nonAuthorizationEvidence, "happy path");
  assert.deepEqual(result.noWriteEvidence.files_written, [], "files_written must be []");
  assert.equal(
    result.conceptualArtifacts.every((artifact) => artifact.materialized === false),
    true,
    "all artifacts must be materialized=false",
  );
  assert.equal(
    result.conceptualArtifacts.every((artifact) => artifact.writeAttempted === false),
    true,
    "all artifacts must be writeAttempted=false",
  );
}

assertBlocked(
  {
    canonicalAgents: [...canonicalSandboxAgents, "extra-agent"],
  },
  "extra canonical agent blocks",
);

assertBlocked(
  {
    canonicalAgents: canonicalSandboxAgents.slice(0, 11),
  },
  "missing canonical agent blocks",
);

assertBlocked(
  {
    canonicalAgents: [
      ...canonicalSandboxAgents.slice(0, 11),
      ".codex/config.toml",
    ],
  },
  "target-level artifact counted as agent blocks",
);

{
  const conceptualArtifacts = clone(
    createSandboxMinimalImplementationPlan().conceptualArtifacts,
  );
  delete conceptualArtifacts[0].templateReference;

  assertBlocked(
    {
      conceptualArtifacts,
    },
    "missing artifact templateReference blocks",
  );
}

assertBlocked(
  {
    nonAuthorizationEvidence: {
      ...buildSandboxNonAuthorizationEvidence(),
      real_writer_authorized: true,
    },
  },
  "authorization flag true blocks",
);

assertBlocked(
  {
    noWriteEvidence: {
      ...buildSandboxNoWriteEvidence(),
      target_write_attempted: true,
    },
  },
  "no-write evidence true blocks",
);

assertBlocked(
  {
    noWriteEvidence: {
      target_read_attempted: false,
    },
  },
  "incomplete no-write evidence blocks",
);

assertBlocked(
  {
    templateReferences: requiredSandboxTemplateReferences.slice(1),
  },
  "missing required template reference blocks",
);

{
  const conceptualArtifacts = clone(
    createSandboxMinimalImplementationPlan().conceptualArtifacts,
  );
  conceptualArtifacts[0].materialized = true;

  assertBlocked(
    {
      conceptualArtifacts,
    },
    "conceptual artifact materialized=true blocks",
  );
}

{
  const conceptualArtifacts = clone(
    createSandboxMinimalImplementationPlan().conceptualArtifacts,
  );
  conceptualArtifacts[0].writeAttempted = true;

  assertBlocked(
    {
      conceptualArtifacts,
    },
    "conceptual artifact writeAttempted=true blocks",
  );
}

{
  const nonAuthorizationEvidence = buildSandboxNonAuthorizationEvidence();
  delete nonAuthorizationEvidence.real_target_read_authorized;

  assertBlocked(
    {
      nonAuthorizationEvidence,
    },
    "incomplete non-authorization evidence blocks",
  );
}

assertBlocked(
  {
    targetRealPath: "/tmp/sentinel-target",
  },
  "target real signal blocks",
);

assertBlocked(
  {
    githubWriteAttempted: true,
  },
  "github write signal blocks",
);

assertBlocked(
  {
    productiveSkillReadAuthorized: true,
  },
  "productive skill signal blocks",
);

assertBlocked(
  {
    persistentOutputPath: "/tmp/sentinel-output.json",
  },
  "persistent output signal blocks",
);
