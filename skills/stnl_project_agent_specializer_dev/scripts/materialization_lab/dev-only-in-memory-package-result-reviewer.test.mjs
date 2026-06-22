import assert from "node:assert/strict";
import {
  buildReviewNonAuthorizationEvidence,
  reviewPackageResult,
} from "./dev-only-in-memory-package-result-reviewer.mjs";

const REVIEW_PASS = "REVIEW_PASS";

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

const canonicalKernels = {
  orchestrator: "orchestrator_kernel",
  planner: "planner_kernel",
  "validation-eval-designer": "validation_eval_designer_kernel",
  "execution-package-designer": "execution_package_designer_kernel",
  designer: "designer_kernel",
  "coder-frontend": "coder_frontend_kernel",
  "coder-backend": "coder_backend_kernel",
  "coder-ios": "coder_ios_kernel",
  "validation-runner": "validation_runner_kernel",
  reviewer: "reviewer_kernel",
  finalizer: "finalizer_kernel",
  resync: "resync_kernel",
};

const requiredTemplates = [
  "reference/templates/copilot/agent.md",
  "reference/templates/codex/agent.toml",
  "reference/templates/codex/config.toml",
  "reference/templates/codex/AGENTS.md",
];

const requiredSourceRoots = [
  "reference/kernel_lab/",
  "reference/seniorization_lab/",
  "reference/templates/",
  "reference/materialization_lab/contracts/",
];

function buildNoWriteEvidence() {
  return {
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
  };
}

function buildHappyPackage() {
  const copilotAgents = Object.fromEntries(
    canonicalAgents.map((agent) => [agent, `.github/agents/${agent}.agent.md`]),
  );
  const codexAgents = Object.fromEntries(
    canonicalAgents.map((agent) => [agent, `.codex/agents/${agent}.toml`]),
  );

  return {
    packageStatus: "PACKAGE_PASS",
    canonicalAgents: canonicalAgents.map((agent) => ({
      agent,
      kernel: canonicalKernels[agent],
    })),
    targetMatrixSummary: {
      copilotAgents,
      codexAgents,
    },
    sourceCoverageSummary: {
      finalSourceRoots: requiredSourceRoots,
    },
    templateSummary: {
      templates: requiredTemplates,
      missingTemplates: [],
      ambiguousTemplates: [],
      inferredTemplates: [],
    },
    conceptualOutputShapes: {
      copilotAgents,
      codexAgents,
      codexConfig: ".codex/config.toml",
      codexRootInstructions: "AGENTS.md",
    },
    codexTargetLevelArtifactSummary: {
      config: ".codex/config.toml",
      rootInstructions: "AGENTS.md",
      countedAsAgents: false,
    },
    aggregatorPreservationSummary: {
      changed: false,
      childCheckCount: 9,
      registered: false,
      checkerCreated: false,
      tenthCheckCreated: false,
    },
    noWriteEvidence: buildNoWriteEvidence(),
    nonAuthorizationEvidence: buildReviewNonAuthorizationEvidence(),
    blockers: [],
    unsafeSignals: [],
    notes: [],
  };
}

function clonePackage(packageResult) {
  return JSON.parse(JSON.stringify(packageResult));
}

function changed(mutator) {
  const packageResult = clonePackage(buildHappyPackage());
  mutator(packageResult);
  return packageResult;
}

function assertPass(packageResult, label) {
  const result = reviewPackageResult(packageResult);
  assert.equal(result.status, REVIEW_PASS, label);
  assert.equal(result.writeAuthorizationDenied, true, `${label}: write authorization must be denied`);
  assert.equal(Object.hasOwn(result, "writeAuthorized"), false, `${label}: no writeAuthorized field`);
  assert.equal(Object.hasOwn(result, "authorizedToWrite"), false, `${label}: no authorizedToWrite field`);
  assert.equal(Object.hasOwn(result, "writePermission"), false, `${label}: no writePermission field`);
}

function assertNotPass(packageResult, label) {
  const result = reviewPackageResult(packageResult);
  assert.notEqual(result.status, REVIEW_PASS, label);
  assert.ok(result.findings.length > 0, `${label}: expected findings`);
}

assertPass(buildHappyPackage(), "happy path REVIEW_PASS");

assertNotPass(
  changed((packageResult) => {
    packageResult.canonicalAgents = packageResult.canonicalAgents.slice(0, 11);
  }),
  "incomplete package",
);

assertNotPass(
  changed((packageResult) => {
    delete packageResult.targetMatrixSummary.copilotAgents.resync;
    delete packageResult.conceptualOutputShapes.copilotAgents.resync;
  }),
  "incomplete 12 x copilot matrix",
);

assertNotPass(
  changed((packageResult) => {
    delete packageResult.targetMatrixSummary.codexAgents.resync;
    delete packageResult.conceptualOutputShapes.codexAgents.resync;
  }),
  "incomplete 12 x codex matrix",
);

assertNotPass(
  changed((packageResult) => {
    delete packageResult.codexTargetLevelArtifactSummary.config;
    delete packageResult.conceptualOutputShapes.codexConfig;
  }),
  "missing Codex target-level artifacts",
);

assertNotPass(
  changed((packageResult) => {
    packageResult.codexTargetLevelArtifactSummary.countedAsAgents = true;
    packageResult.targetMatrixSummary.codexAgents.config = ".codex/config.toml";
  }),
  "Codex target-level artifacts treated as agents",
);

assertNotPass(
  changed((packageResult) => {
    packageResult.sourceCoverageSummary.finalSourceRoots = [
      "reference/kernel_lab/",
      "reference/seniorization_lab/",
      "reference/templates/",
      "reference/agents/",
    ];
  }),
  "source boundary violation",
);

assertNotPass(
  changed((packageResult) => {
    packageResult.templateSummary.templates = packageResult.templateSummary.templates.filter(
      (template) => template !== "reference/templates/codex/AGENTS.md",
    );
  }),
  "missing template",
);

assertNotPass(
  changed((packageResult) => {
    packageResult.templateSummary.ambiguousTemplates = ["reference/templates/codex/agent.toml"];
  }),
  "ambiguous template",
);

assertNotPass(
  changed((packageResult) => {
    packageResult.templateSummary.inferredTemplates = ["reference/templates/codex/config.toml"];
  }),
  "inferred template",
);

assertNotPass(
  changed((packageResult) => {
    packageResult.targetMatrixSummary.copilotAgents.orchestrator =
      ".codex/agents/orchestrator.toml";
    packageResult.conceptualOutputShapes.copilotAgents.orchestrator =
      ".codex/agents/orchestrator.toml";
  }),
  "crossed output shape",
);

assertNotPass(
  changed((packageResult) => {
    delete packageResult.noWriteEvidence;
  }),
  "no-write evidence missing",
);

assertNotPass(
  changed((packageResult) => {
    packageResult.noWriteEvidence.target_write_attempted = true;
  }),
  "no-write evidence true",
);

assertNotPass(
  changed((packageResult) => {
    delete packageResult.nonAuthorizationEvidence;
  }),
  "non-authorization evidence missing",
);

assertNotPass(
  changed((packageResult) => {
    packageResult.unsafeSignals = ["real writer requested"];
  }),
  "unsafe signal present",
);

assertNotPass(
  changed((packageResult) => {
    packageResult.notes = ["READY_TO_WRITE"];
  }),
  "positive write vocabulary present",
);

assertNotPass(
  changed((packageResult) => {
    packageResult.aggregatorPreservationSummary.changed = true;
  }),
  "Aggregator signal",
);

assertNotPass(
  changed((packageResult) => {
    packageResult.checkerCreated = true;
  }),
  "checker signal",
);

assertNotPass(
  changed((packageResult) => {
    packageResult.tenthCheckCreated = true;
  }),
  "tenth-check signal",
);

assertNotPass(
  changed((packageResult) => {
    packageResult.targetRealPath = "/tmp/real-target";
  }),
  "Target real path",
);

assertNotPass(
  changed((packageResult) => {
    packageResult.targetMatrixSummary.copilotAgents.orchestrator =
      "/Users/example/.github/agents/orchestrator.agent.md";
  }),
  "host absolute path",
);

assertNotPass(
  changed((packageResult) => {
    packageResult.targetMatrixSummary.codexAgents.orchestrator =
      "../.codex/agents/orchestrator.toml";
  }),
  "traversal path",
);

assertNotPass(
  changed((packageResult) => {
    packageResult.filesystemStatAttempted = true;
  }),
  "filesystem stat/list/read/write signal",
);

assertNotPass(
  changed((packageResult) => {
    packageResult.githubWriteAttempted = true;
  }),
  "GitHub signal",
);

assertNotPass(
  changed((packageResult) => {
    packageResult.productiveSkillAccessed = true;
  }),
  "productive skill signal",
);

assertNotPass(
  changed((packageResult) => {
    packageResult.partialSuccess = true;
  }),
  "partial success treated incorrectly as package success",
);

{
  const result = reviewPackageResult(buildHappyPackage());
  assert.equal(result.status, REVIEW_PASS, "REVIEW_PASS baseline");
  assert.equal(result.writeAuthorizationDenied, true, "REVIEW_PASS must deny write authorization");
  assert.equal(
    Object.values(result.nonAuthorizationEvidence).every((value) => value === false),
    true,
    "REVIEW_PASS non-authorization evidence must stay false",
  );
  assert.equal(
    /APPROVED|WRITE_APPROVED|APPROVAL_GRANTED|READY_TO_WRITE|WRITE_UNLOCKED|EXECUTION_APPROVED|MERGE_APPROVED/.test(
      JSON.stringify(result),
    ),
    false,
    "REVIEW_PASS result must not contain positive write vocabulary",
  );
}
