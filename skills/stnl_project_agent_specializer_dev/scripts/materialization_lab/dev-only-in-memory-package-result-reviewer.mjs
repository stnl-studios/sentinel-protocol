export const packageResultReviewPhase =
  "MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PACKAGE_RESULT_REVIEW_LAYER_IMPLEMENTATION";

const REVIEW_PASS = "REVIEW_PASS";
const REVIEW_BLOCKED = "REVIEW_BLOCKED";
const REVIEW_NEEDS_REVISION = "REVIEW_NEEDS_REVISION";

const CANONICAL_AGENTS = [
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

const CANONICAL_KERNELS = {
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

const ALLOWED_SOURCE_ROOTS = [
  "reference/kernel_lab/",
  "reference/seniorization_lab/",
  "reference/templates/",
  "reference/materialization_lab/contracts/",
];

const REQUIRED_TEMPLATES = [
  "reference/templates/copilot/agent.md",
  "reference/templates/codex/agent.toml",
  "reference/templates/codex/config.toml",
  "reference/templates/codex/AGENTS.md",
];

const CODEX_CONFIG_PATH = ".codex/config.toml";
const CODEX_ROOT_INSTRUCTIONS_PATH = "AGENTS.md";

const EXPECTED_NO_WRITE_EVIDENCE = {
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

const NON_AUTHORIZATION_KEYS = [
  "real_materialization_authorized",
  "real_target_read_authorized",
  "real_target_write_authorized",
  "filesystem_access_against_real_target_authorized",
  "real_writer_authorized",
  "real_renderer_authorized",
  "real_loader_authorized",
  "real_scenario_selector_authorized",
  "real_target_adapter_authorized",
  "real_write_approval_authorized",
  "approval_token_authorized",
  "approval_registry_authorized",
  "approval_signature_authorized",
  "signer_authorized",
  "persistent_report_authorized",
  "generated_output_authorized",
  "materialized_output_authorized",
  "patch_or_diff_application_authorized",
  "github_write_authorized",
  "productive_skill_access_authorized",
  "productive_skill_mutation_authorized",
  "commit_authorized",
  "branch_authorized",
  "pull_request_authorized",
  "aggregator_change_authorized",
  "checker_creation_authorized",
  "tenth_check_authorized",
];

const FORBIDDEN_POSITIVE_WRITE_VOCABULARY = [
  "APPROVED",
  "WRITE_APPROVED",
  "APPROVAL_GRANTED",
  "READY_TO_WRITE",
  "WRITE_UNLOCKED",
  "EXECUTION_APPROVED",
  "MERGE_APPROVED",
];

const MANDATORY_SECTIONS = [
  "packageStatus",
  "canonicalAgents",
  "targetMatrixSummary",
  "sourceCoverageSummary",
  "templateSummary",
  "conceptualOutputShapes",
  "codexTargetLevelArtifactSummary",
  "noWriteEvidence",
  "nonAuthorizationEvidence",
];

const UNSAFE_TRUTHY_KEYS = new Set([
  "aggregatorchanged",
  "aggregatormodified",
  "registeredinaggregator",
  "addedtoaggregator",
  "aggregatorchildcreated",
  "aggregatorchildadded",
  "officialcheckcreated",
  "checkercreated",
  "checkercreationattempted",
  "tenthcheckcreated",
  "tenthcheckattempted",
  "targetreadattempted",
  "targetwriteattempted",
  "targetprobed",
  "realtargetaccessed",
  "targetrealaccessed",
  "filesystemaccessattempted",
  "filesystemstatattempted",
  "directorylistingattempted",
  "filecontentreadattempted",
  "filewriteattempted",
  "persistentreportwritten",
  "githubwriteattempted",
  "githubrequestattempted",
  "productiveskillaccessed",
  "productiveskillmutationattempted",
  "approvaltokenissued",
  "writeexecuted",
  "patchapplied",
  "commitcreated",
  "branchcreated",
  "pullrequestcreated",
  "codextargetlevelartifactscountedasagents",
  "codextargetartifactscountedasagents",
  "agentsreviewedasindependentphases",
  "agentbyagentmaterialization",
  "agentbyagentreviewasprimaryproof",
  "independentphases",
  "partialsuccess",
  "partialpackagesuccess",
  "reviewpassauthorizeswriting",
  "packagepassauthorizeswriting",
  "writeauthorized",
  "authorizedtowrite",
]);

export function buildReviewNonAuthorizationEvidence() {
  return Object.fromEntries(NON_AUTHORIZATION_KEYS.map((key) => [key, false]));
}

export function detectReviewUnsafeSignals(packageResult) {
  const signals = [];
  const explicitUnsafeSignals = packageResult?.unsafeSignals;

  for (const signal of normalizeExplicitSignals(explicitUnsafeSignals)) {
    signals.push({
      severity: "blocker",
      code: "unsafe-signal-present",
      message: "Explicit unsafe signal is present in the in-memory package result.",
      path: signal.path,
    });
  }

  visitDeep(packageResult, ({ key, value, path }) => {
    const keyText = key === undefined ? "" : String(key);
    const normalizedKey = normalizeKey(keyText);
    const normalizedPath = normalizeKey(path);

    if (value === true && UNSAFE_TRUTHY_KEYS.has(normalizedKey)) {
      signals.push({
        severity: "blocker",
        code: "unsafe-truthy-signal",
        message: `Unsafe signal ${keyText} is true.`,
        path,
      });
    }

    if (
      value === true &&
      normalizedPath.includes("aggregator") &&
      /(changed|modified|registered|added|child|tenth|checker)/.test(normalizedKey)
    ) {
      signals.push({
        severity: "blocker",
        code: "aggregator-signal",
        message: "Aggregator mutation or registration signal is present.",
        path,
      });
    }

    if (
      value === true &&
      normalizedPath.includes("checker") &&
      /(created|creation|registered|added)/.test(normalizedKey)
    ) {
      signals.push({
        severity: "blocker",
        code: "checker-signal",
        message: "Checker creation or registration signal is present.",
        path,
      });
    }

    if (
      value === true &&
      normalizedPath.includes("tenth") &&
      normalizedPath.includes("check")
    ) {
      signals.push({
        severity: "blocker",
        code: "tenth-check-signal",
        message: "Tenth-check signal is present.",
        path,
      });
    }

    if (typeof value === "string") {
      for (const term of FORBIDDEN_POSITIVE_WRITE_VOCABULARY) {
        if (hasExactToken(value, term)) {
          signals.push({
            severity: "blocker",
            code: "positive-write-vocabulary",
            message: `Forbidden positive write vocabulary is present: ${term}.`,
            path,
          });
        }
      }

      if (hasWriteAuthorizingPhrase(value)) {
        signals.push({
          severity: "blocker",
          code: "write-authorizing-phrase",
          message: "Write-authorizing language is present.",
          path,
        });
      }

      if (looksLikePath(value) && isHostAbsolutePath(value)) {
        signals.push({
          severity: "blocker",
          code: "host-absolute-path",
          message: "Host absolute path is present.",
          path,
        });
      }

      if (looksLikePath(value) && hasTraversalPath(value)) {
        signals.push({
          severity: "blocker",
          code: "traversal-path",
          message: "Traversal path is present.",
          path,
        });
      }

      if (hasForbiddenRuntimeSurface(value)) {
        signals.push({
          severity: "blocker",
          code: "forbidden-runtime-surface",
          message: "Forbidden runtime, filesystem, network, GitHub, or productive skill surface is referenced.",
          path,
        });
      }
    }

    for (const term of FORBIDDEN_POSITIVE_WRITE_VOCABULARY) {
      if (keyText && hasExactToken(keyText, term)) {
        signals.push({
          severity: "blocker",
          code: "positive-write-vocabulary",
          message: `Forbidden positive write vocabulary is present: ${term}.`,
          path,
        });
      }
    }
  });

  return uniqueFindings(signals);
}

export function validateReviewInputBoundary(packageResult) {
  const findings = [];

  if (!isRecord(packageResult)) {
    return [
      blocker(
        "invalid-review-input",
        "Review input must be an in-memory package result-like object.",
        "$",
      ),
    ];
  }

  for (const section of MANDATORY_SECTIONS) {
    if (packageResult[section] === undefined || packageResult[section] === null) {
      findings.push(
        blocker(
          "missing-review-evidence-section",
          `Missing mandatory in-memory review evidence section: ${section}.`,
          `$.${section}`,
        ),
      );
    }
  }

  findings.push(...reviewPackageStatus(packageResult));
  findings.push(...reviewCanonicalAgents(packageResult));
  findings.push(...reviewTargetMatrixAndOutputShapes(packageResult));
  findings.push(...reviewSourceCoverage(packageResult));
  findings.push(...reviewTemplateCoverage(packageResult));
  findings.push(...reviewCodexTargetLevelArtifacts(packageResult));
  findings.push(...reviewNoWriteEvidence(packageResult));
  findings.push(...reviewNonAuthorizationEvidence(packageResult));
  findings.push(...reviewAggregatorPreservation(packageResult));
  findings.push(...reviewPackageDeclaredFindings(packageResult));

  return uniqueFindings(findings);
}

export function reviewPackageResult(packageResult) {
  const findings = uniqueFindings([
    ...validateReviewInputBoundary(packageResult),
    ...detectReviewUnsafeSignals(packageResult),
  ]);

  const blockers = findings.filter((finding) => finding.severity === "blocker");
  const needsRevision = findings.filter(
    (finding) => finding.severity === "needs_revision",
  );

  const status =
    blockers.length > 0
      ? REVIEW_BLOCKED
      : needsRevision.length > 0
        ? REVIEW_NEEDS_REVISION
        : REVIEW_PASS;

  return {
    phase: packageResultReviewPhase,
    status,
    summary:
      status === REVIEW_PASS
        ? "The in-memory package result appears complete, consistent, and boundary-safe within the reviewed dimensions."
        : "The in-memory package result did not pass the dev-only review layer.",
    findings,
    blockers,
    needsRevision,
    reviewedDimensions: [
      "integrated-canonical-package",
      "canonical-kernel-mapping",
      "conceptual-target-matrix",
      "source-boundary",
      "template-coverage",
      "codex-target-level-artifacts",
      "no-write-evidence",
      "non-authorization-evidence",
      "aggregator-boundary",
      "unsafe-signal-detection",
    ],
    nonAuthorizationEvidence: buildReviewNonAuthorizationEvidence(),
    writeAuthorizationDenied: true,
    nextAction:
      status === REVIEW_PASS
        ? "Dev-only in-memory review may be considered complete for this package result; it remains non-authorizing."
        : "Revise the in-memory package result evidence before considering another dev-only review.",
  };
}

function reviewPackageStatus(packageResult) {
  const findings = [];
  const status = readStatusLike(packageResult.packageStatus);

  if (!status) {
    findings.push(
      blocker(
        "missing-package-status",
        "Package status evidence is missing.",
        "$.packageStatus",
      ),
    );
  } else if (!isPassLikeStatus(status)) {
    findings.push(
      needsRevision(
        "package-status-not-pass",
        "Package status is not a complete package pass.",
        "$.packageStatus",
      ),
    );
  }

  if (
    packageResult.partialSuccess === true ||
    packageResult.partialPackageSuccess === true ||
    packageResult.packageStatus?.partialSuccess === true
  ) {
    findings.push(
      blocker(
        "partial-success-cannot-be-package-success",
        "Partial success cannot be treated as full package success.",
        "$.partialSuccess",
      ),
    );
  }

  return findings;
}

function reviewCanonicalAgents(packageResult) {
  const findings = [];
  const records = extractAgentRecords(packageResult.canonicalAgents);
  const agentNames = records.map((record) => record.agent).filter(Boolean);
  const agentSet = new Set(agentNames);

  if (records.length === 0) {
    findings.push(
      blocker(
        "missing-canonical-agents",
        "Canonical agent package evidence is missing.",
        "$.canonicalAgents",
      ),
    );
    return findings;
  }

  for (const agent of CANONICAL_AGENTS) {
    if (!agentSet.has(agent)) {
      findings.push(
        blocker(
          "missing-canonical-agent",
          `Missing canonical agent: ${agent}.`,
          "$.canonicalAgents",
        ),
      );
    }
  }

  for (const agent of agentSet) {
    if (!CANONICAL_AGENTS.includes(agent)) {
      findings.push(
        blocker(
          "unexpected-canonical-agent",
          `Unexpected agent in canonical package: ${agent}.`,
          "$.canonicalAgents",
        ),
      );
    }
  }

  if (records.length !== CANONICAL_AGENTS.length) {
    findings.push(
      blocker(
        "canonical-agent-count-mismatch",
        "The integrated package must contain exactly 12 canonical agents.",
        "$.canonicalAgents",
      ),
    );
  }

  if (Array.isArray(packageResult.canonicalAgents)) {
    const order = records.map((record) => record.agent);
    if (
      order.length === CANONICAL_AGENTS.length &&
      !CANONICAL_AGENTS.every((agent, index) => order[index] === agent)
    ) {
      findings.push(
        needsRevision(
          "canonical-agent-order-drift",
          "Canonical agents are present but not in canonical full-flow order.",
          "$.canonicalAgents",
        ),
      );
    }
  }

  const kernelMap = {
    ...extractKernelMap(packageResult.canonicalKernelMapping),
    ...extractKernelMap(packageResult.kernelMapping),
  };

  for (const record of records) {
    if (record.agent && record.kernel) {
      kernelMap[record.agent] = record.kernel;
    }
  }

  for (const agent of CANONICAL_AGENTS) {
    if (kernelMap[agent] !== CANONICAL_KERNELS[agent]) {
      findings.push(
        blocker(
          "canonical-kernel-mismatch",
          `Canonical kernel mapping is missing or incorrect for ${agent}.`,
          "$.canonicalAgents",
        ),
      );
    }
  }

  return findings;
}

function reviewTargetMatrixAndOutputShapes(packageResult) {
  const findings = [];
  const copilot = extractArtifactMap(packageResult, "copilot");
  const codex = extractArtifactMap(packageResult, "codex");

  for (const agent of CANONICAL_AGENTS) {
    const requiredCopilotPath = expectedCopilotPath(agent);
    const actualCopilotPath = copilot.map.get(agent);
    if (!actualCopilotPath) {
      findings.push(
        blocker(
          "missing-copilot-artifact",
          `Missing conceptual Copilot artifact for canonical agent: ${agent}.`,
          "$.targetMatrixSummary",
        ),
      );
    } else if (actualCopilotPath !== requiredCopilotPath) {
      findings.push(
        blocker(
          "copilot-output-shape-mismatch",
          `Copilot artifact for ${agent} must use ${requiredCopilotPath}.`,
          "$.conceptualOutputShapes",
        ),
      );
    }

    const requiredCodexPath = expectedCodexPath(agent);
    const actualCodexPath = codex.map.get(agent);
    if (!actualCodexPath) {
      findings.push(
        blocker(
          "missing-codex-artifact",
          `Missing conceptual Codex artifact for canonical agent: ${agent}.`,
          "$.targetMatrixSummary",
        ),
      );
    } else if (actualCodexPath !== requiredCodexPath) {
      findings.push(
        blocker(
          "codex-output-shape-mismatch",
          `Codex artifact for ${agent} must use ${requiredCodexPath}.`,
          "$.conceptualOutputShapes",
        ),
      );
    }
  }

  for (const artifactPath of [...copilot.paths, ...codex.paths]) {
    findings.push(...validateConceptualPath(artifactPath, "$.conceptualOutputShapes"));
  }

  for (const artifactPath of copilot.paths) {
    if (isCodexAgentPath(artifactPath)) {
      findings.push(
        blocker(
          "crossed-output-shape",
          "Copilot artifact is using the Codex output shape.",
          "$.conceptualOutputShapes",
        ),
      );
    }
  }

  for (const artifactPath of codex.paths) {
    if (isCopilotAgentPath(artifactPath)) {
      findings.push(
        blocker(
          "crossed-output-shape",
          "Codex artifact is using the Copilot output shape.",
          "$.conceptualOutputShapes",
        ),
      );
    }

    if (
      artifactPath === CODEX_CONFIG_PATH ||
      artifactPath === CODEX_ROOT_INSTRUCTIONS_PATH
    ) {
      findings.push(
        blocker(
          "codex-target-level-artifact-counted-as-agent",
          "Codex target-level artifacts must not be counted as agents.",
          "$.targetMatrixSummary",
        ),
      );
    }
  }

  return findings;
}

function reviewSourceCoverage(packageResult) {
  const findings = [];
  const roots = extractSourceRoots(packageResult.sourceCoverageSummary);

  if (roots.length === 0) {
    findings.push(
      blocker(
        "missing-source-coverage",
        "Final source root evidence is missing.",
        "$.sourceCoverageSummary",
      ),
    );
    return findings;
  }

  for (const root of roots) {
    findings.push(...validateConceptualPath(root, "$.sourceCoverageSummary"));

    if (root.startsWith("reference/agents/")) {
      findings.push(
        blocker(
          "historical-agent-source-used-as-final-source",
          "reference/agents/ must not be treated as a final source root.",
          "$.sourceCoverageSummary",
        ),
      );
    }

    if (!ALLOWED_SOURCE_ROOTS.some((allowedRoot) => rootMatches(root, allowedRoot))) {
      findings.push(
        blocker(
          "source-boundary-violation",
          `Source root is outside the allowed final source roots: ${root}.`,
          "$.sourceCoverageSummary",
        ),
      );
    }
  }

  for (const requiredRoot of ALLOWED_SOURCE_ROOTS) {
    if (!roots.some((root) => rootMatches(root, requiredRoot))) {
      findings.push(
        blocker(
          "missing-required-source-root",
          `Missing required final source root coverage: ${requiredRoot}.`,
          "$.sourceCoverageSummary",
        ),
      );
    }
  }

  return findings;
}

function reviewTemplateCoverage(packageResult) {
  const findings = [];
  const summary = packageResult.templateSummary;
  const templates = extractTemplatePaths(summary);

  if (templates.length === 0) {
    findings.push(
      blocker(
        "missing-template-summary",
        "Explicit template coverage evidence is missing.",
        "$.templateSummary",
      ),
    );
    return findings;
  }

  for (const template of templates) {
    findings.push(...validateConceptualPath(template, "$.templateSummary"));
  }

  for (const template of REQUIRED_TEMPLATES) {
    if (!templates.includes(template)) {
      findings.push(
        blocker(
          "missing-template",
          `Missing required explicit template: ${template}.`,
          "$.templateSummary",
        ),
      );
    }
  }

  if (hasNonEmptyEvidence(summary?.missingTemplates)) {
    findings.push(
      blocker(
        "missing-template-declared",
        "Template summary declares missing templates.",
        "$.templateSummary.missingTemplates",
      ),
    );
  }

  if (
    summary?.ambiguousTemplate === true ||
    summary?.ambiguousTemplates === true ||
    hasNonEmptyEvidence(summary?.ambiguousTemplates)
  ) {
    findings.push(
      blocker(
        "ambiguous-template",
        "Template summary contains ambiguous template evidence.",
        "$.templateSummary",
      ),
    );
  }

  if (
    summary?.inferredTemplate === true ||
    summary?.inferredTemplates === true ||
    hasNonEmptyEvidence(summary?.inferredTemplates)
  ) {
    findings.push(
      blocker(
        "inferred-template",
        "Template summary contains inferred template evidence.",
        "$.templateSummary",
      ),
    );
  }

  return findings;
}

function reviewCodexTargetLevelArtifacts(packageResult) {
  const findings = [];
  const paths = collectStrings([
    packageResult.codexTargetLevelArtifactSummary,
    packageResult.conceptualOutputShapes,
  ]);
  const hasConfig = paths.includes(CODEX_CONFIG_PATH);
  const hasRootInstructions = paths.includes(CODEX_ROOT_INSTRUCTIONS_PATH);
  const summary = packageResult.codexTargetLevelArtifactSummary;

  if (!hasConfig) {
    findings.push(
      blocker(
        "missing-codex-config-artifact",
        "Missing conceptual Codex config target-level artifact.",
        "$.codexTargetLevelArtifactSummary",
      ),
    );
  }

  if (!hasRootInstructions) {
    findings.push(
      blocker(
        "missing-codex-root-instructions-artifact",
        "Missing conceptual Codex root instructions target-level artifact.",
        "$.codexTargetLevelArtifactSummary",
      ),
    );
  }

  if (
    summary?.countedAsAgents === true ||
    summary?.codexTargetLevelArtifactsCountedAsAgents === true ||
    summary?.targetLevelArtifactsCountedAsAgents === true
  ) {
    findings.push(
      blocker(
        "codex-target-level-artifact-counted-as-agent",
        "Codex target-level artifacts must not be counted as agents.",
        "$.codexTargetLevelArtifactSummary",
      ),
    );
  }

  for (const artifactPath of paths) {
    if (looksLikePath(artifactPath)) {
      findings.push(...validateConceptualPath(artifactPath, "$.codexTargetLevelArtifactSummary"));
    }
  }

  return findings;
}

function reviewNoWriteEvidence(packageResult) {
  const findings = [];
  const evidence = packageResult.noWriteEvidence;

  if (!isRecord(evidence)) {
    findings.push(
      blocker(
        "missing-no-write-evidence",
        "No-write evidence must be present as an in-memory object.",
        "$.noWriteEvidence",
      ),
    );
    return findings;
  }

  for (const [field, expected] of Object.entries(EXPECTED_NO_WRITE_EVIDENCE)) {
    if (!(field in evidence)) {
      findings.push(
        blocker(
          "missing-no-write-evidence-field",
          `Missing no-write evidence field: ${field}.`,
          `$.noWriteEvidence.${field}`,
        ),
      );
      continue;
    }

    const actual = evidence[field];
    if (Array.isArray(expected)) {
      if (!Array.isArray(actual) || actual.length !== 0) {
        findings.push(
          blocker(
            "no-write-evidence-contradiction",
            `${field} must be an empty array.`,
            `$.noWriteEvidence.${field}`,
          ),
        );
      }
      continue;
    }

    if (actual !== expected) {
      findings.push(
        blocker(
          "no-write-evidence-contradiction",
          `${field} must be exactly false.`,
          `$.noWriteEvidence.${field}`,
        ),
      );
    }
  }

  return findings;
}

function reviewNonAuthorizationEvidence(packageResult) {
  const findings = [];
  const evidence = packageResult.nonAuthorizationEvidence;

  if (!isRecord(evidence)) {
    findings.push(
      blocker(
        "missing-non-authorization-evidence",
        "Non-authorization evidence must be present as an in-memory object.",
        "$.nonAuthorizationEvidence",
      ),
    );
    return findings;
  }

  for (const key of NON_AUTHORIZATION_KEYS) {
    if (!(key in evidence)) {
      findings.push(
        blocker(
          "missing-non-authorization-evidence-field",
          `Missing non-authorization evidence field: ${key}.`,
          `$.nonAuthorizationEvidence.${key}`,
        ),
      );
      continue;
    }

    if (evidence[key] !== false) {
      findings.push(
        blocker(
          "non-authorization-evidence-contradiction",
          `${key} must be exactly false.`,
          `$.nonAuthorizationEvidence.${key}`,
        ),
      );
    }
  }

  return findings;
}

function reviewAggregatorPreservation(packageResult) {
  const findings = [];
  const summary = packageResult.aggregatorPreservationSummary;

  if (!isRecord(summary)) {
    return findings;
  }

  if (summary.childCheckCount !== undefined && summary.childCheckCount !== 9) {
    findings.push(
      blocker(
        "aggregator-child-check-count-changed",
        "Aggregator child check count must remain exactly 9.",
        "$.aggregatorPreservationSummary.childCheckCount",
      ),
    );
  }

  if (Array.isArray(summary.officialChildChecks) && summary.officialChildChecks.length !== 9) {
    findings.push(
      blocker(
        "aggregator-child-check-list-changed",
        "Aggregator official child check list must remain exactly 9 entries.",
        "$.aggregatorPreservationSummary.officialChildChecks",
      ),
    );
  }

  if (
    summary.changed === true ||
    summary.registered === true ||
    summary.childAdded === true ||
    summary.tenthCheckCreated === true ||
    summary.checkerCreated === true
  ) {
    findings.push(
      blocker(
        "aggregator-boundary-violation",
        "Aggregator summary declares mutation, registration, checker creation, or tenth-check creation.",
        "$.aggregatorPreservationSummary",
      ),
    );
  }

  return findings;
}

function reviewPackageDeclaredFindings(packageResult) {
  const findings = [];

  if (hasNonEmptyEvidence(packageResult.blockers)) {
    findings.push(
      blocker(
        "package-declared-blockers",
        "Package result declares blockers.",
        "$.blockers",
      ),
    );
  }

  if (hasNonEmptyEvidence(packageResult.needsRevision)) {
    findings.push(
      needsRevision(
        "package-declared-needs-revision",
        "Package result declares in-memory revision needs.",
        "$.needsRevision",
      ),
    );
  }

  return findings;
}

function extractAgentRecords(value) {
  if (Array.isArray(value)) {
    return value
      .map((entry) => {
        if (typeof entry === "string") {
          return { agent: entry, kernel: undefined };
        }
        if (isRecord(entry)) {
          return {
            agent: entry.agent ?? entry.name ?? entry.id ?? entry.slug,
            kernel: entry.kernel ?? entry.kernelName ?? entry.canonicalKernel,
          };
        }
        return { agent: undefined, kernel: undefined };
      })
      .filter((record) => record.agent !== undefined);
  }

  if (isRecord(value)) {
    return Object.entries(value).map(([agent, entry]) => {
      if (typeof entry === "string") {
        return { agent, kernel: entry };
      }
      if (isRecord(entry)) {
        return {
          agent: entry.agent ?? entry.name ?? agent,
          kernel: entry.kernel ?? entry.kernelName ?? entry.canonicalKernel,
        };
      }
      return { agent, kernel: undefined };
    });
  }

  return [];
}

function extractKernelMap(value) {
  if (!isRecord(value)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value).map(([agent, entry]) => {
      if (typeof entry === "string") {
        return [agent, entry];
      }
      if (isRecord(entry)) {
        return [agent, entry.kernel ?? entry.kernelName ?? entry.canonicalKernel];
      }
      return [agent, undefined];
    }),
  );
}

function extractArtifactMap(packageResult, kind) {
  const matrix = packageResult.targetMatrixSummary ?? {};
  const shapes = packageResult.conceptualOutputShapes ?? {};
  const fieldNames =
    kind === "copilot"
      ? [
          "copilot",
          "copilotAgents",
          "copilotArtifacts",
          "copilotAgentArtifacts",
          "copilotAgentPaths",
        ]
      : [
          "codex",
          "codexAgents",
          "codexArtifacts",
          "codexAgentArtifacts",
          "codexAgentPaths",
        ];

  const candidates = [
    ...fieldNames.map((field) => matrix[field]),
    ...fieldNames.map((field) => shapes[field]),
  ].filter((candidate) => candidate !== undefined && candidate !== null);

  const map = new Map();
  const paths = [];

  for (const candidate of candidates) {
    for (const entry of artifactEntries(candidate, kind)) {
      if (entry.path) {
        paths.push(entry.path);
      }
      if (entry.agent && entry.path && CANONICAL_AGENTS.includes(entry.agent)) {
        map.set(entry.agent, entry.path);
      }
    }
  }

  return { map, paths };
}

function artifactEntries(value, kind) {
  if (Array.isArray(value)) {
    return value.flatMap((entry) => artifactEntries(entry, kind));
  }

  if (typeof value === "string") {
    return [{ agent: parseAgentFromPath(value, kind) ?? value, path: value }];
  }

  if (isRecord(value)) {
    const directPath =
      value.path ??
      value.outputPath ??
      value.targetPath ??
      value.artifactPath ??
      value.artifact ??
      value.conceptualPath;

    if (typeof directPath === "string") {
      return [
        {
          agent:
            value.agent ??
            value.name ??
            value.id ??
            value.slug ??
            parseAgentFromPath(directPath, kind),
          path: directPath,
        },
      ];
    }

    return Object.entries(value).flatMap(([agent, entry]) => {
      if (typeof entry === "string") {
        return [
          {
            agent: CANONICAL_AGENTS.includes(agent)
              ? agent
              : parseAgentFromPath(entry, kind) ?? entry,
            path: entry,
          },
        ];
      }

      if (isRecord(entry)) {
        const nestedPath =
          entry.path ??
          entry.outputPath ??
          entry.targetPath ??
          entry.artifactPath ??
          entry.artifact ??
          entry.conceptualPath;
        if (typeof nestedPath === "string") {
          return [
            {
              agent:
                entry.agent ??
                entry.name ??
                entry.id ??
                entry.slug ??
                (CANONICAL_AGENTS.includes(agent) ? agent : parseAgentFromPath(nestedPath, kind)),
              path: nestedPath,
            },
          ];
        }
      }

      return artifactEntries(entry, kind);
    });
  }

  return [];
}

function extractSourceRoots(summary) {
  if (Array.isArray(summary)) {
    return summary.filter((entry) => typeof entry === "string");
  }

  if (!isRecord(summary)) {
    return [];
  }

  const roots =
    summary.finalSourceRoots ??
    summary.allowedFinalSourceRoots ??
    summary.sourceRoots ??
    summary.sources;

  if (Array.isArray(roots)) {
    return roots.filter((entry) => typeof entry === "string");
  }

  return collectStrings(summary).filter((entry) => entry.startsWith("reference/"));
}

function extractTemplatePaths(summary) {
  if (Array.isArray(summary)) {
    return summary.filter((entry) => typeof entry === "string");
  }

  if (!isRecord(summary)) {
    return [];
  }

  const templates =
    summary.templates ??
    summary.explicitTemplates ??
    summary.requiredTemplates ??
    summary.templatePaths;

  if (Array.isArray(templates)) {
    return templates.filter((entry) => typeof entry === "string");
  }

  return collectStrings(summary).filter((entry) => entry.startsWith("reference/templates/"));
}

function collectStrings(value) {
  const strings = [];
  visitDeep(value, ({ value: visitedValue }) => {
    if (typeof visitedValue === "string") {
      strings.push(visitedValue);
    }
  });
  return strings;
}

function normalizeExplicitSignals(value) {
  if (value === undefined || value === null || value === false) {
    return [];
  }

  if (Array.isArray(value)) {
    return value
      .map((entry, index) => ({ entry, path: `$.unsafeSignals[${index}]` }))
      .filter(({ entry }) => entry !== undefined && entry !== null && entry !== false);
  }

  if (isRecord(value)) {
    return Object.entries(value)
      .map(([key, entry]) => ({ entry, path: `$.unsafeSignals.${key}` }))
      .filter(({ entry }) => hasNonEmptyEvidence(entry));
  }

  if (typeof value === "string" && value.trim() === "") {
    return [];
  }

  return [{ entry: value, path: "$.unsafeSignals" }];
}

function validateConceptualPath(value, path) {
  const findings = [];

  if (typeof value !== "string" || value.trim() === "") {
    findings.push(
      blocker(
        "invalid-conceptual-path",
        "Conceptual path evidence must be a non-empty string.",
        path,
      ),
    );
    return findings;
  }

  if (isHostAbsolutePath(value)) {
    findings.push(
      blocker("host-absolute-path", "Conceptual paths must not be host absolute paths.", path),
    );
  }

  if (hasTraversalPath(value)) {
    findings.push(
      blocker("traversal-path", "Conceptual paths must not contain traversal segments.", path),
    );
  }

  if (value.includes("\\")) {
    findings.push(
      blocker("host-path-separator", "Conceptual paths must use target-root-relative slash paths.", path),
    );
  }

  if (/^https?:\/\//i.test(value) || /^file:\/\//i.test(value)) {
    findings.push(
      blocker("network-or-file-url", "Conceptual paths must not be URLs or file URLs.", path),
    );
  }

  return findings;
}

function expectedCopilotPath(agent) {
  return `.github/agents/${agent}.agent.md`;
}

function expectedCodexPath(agent) {
  return `.codex/agents/${agent}.toml`;
}

function parseAgentFromPath(value, kind) {
  const pattern =
    kind === "copilot"
      ? /^\.github\/agents\/([^/]+)\.agent\.md$/
      : /^\.codex\/agents\/([^/]+)\.toml$/;
  const match = pattern.exec(value);
  return match?.[1];
}

function isCopilotAgentPath(value) {
  return /^\.github\/agents\/[^/]+\.agent\.md$/.test(value);
}

function isCodexAgentPath(value) {
  return /^\.codex\/agents\/[^/]+\.toml$/.test(value);
}

function readStatusLike(value) {
  if (typeof value === "string") {
    return value;
  }
  if (isRecord(value) && typeof value.status === "string") {
    return value.status;
  }
  if (isRecord(value) && typeof value.packageStatus === "string") {
    return value.packageStatus;
  }
  return "";
}

function isPassLikeStatus(value) {
  const normalized = String(value).toUpperCase();
  return (
    normalized.includes("PASS") &&
    !normalized.includes("PARTIAL") &&
    !normalized.includes("FAIL") &&
    !normalized.includes("BLOCK") &&
    !normalized.includes("NEEDS")
  );
}

function rootMatches(root, allowedRoot) {
  return root === allowedRoot || root === allowedRoot.slice(0, -1) || root.startsWith(allowedRoot);
}

function hasNonEmptyEvidence(value) {
  if (value === undefined || value === null || value === false) {
    return false;
  }
  if (value === true) {
    return true;
  }
  if (typeof value === "string") {
    return value.trim() !== "";
  }
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  if (isRecord(value)) {
    return Object.values(value).some((entry) => hasNonEmptyEvidence(entry));
  }
  return Boolean(value);
}

function looksLikePath(value) {
  return (
    value.includes("/") ||
    value.includes("\\") ||
    /\.(md|toml|json|mjs|js|txt)$/i.test(value)
  );
}

function isHostAbsolutePath(value) {
  return (
    value.startsWith("/") ||
    /^[A-Za-z]:[\\/]/.test(value) ||
    value.startsWith("\\\\") ||
    /^file:\/\//i.test(value)
  );
}

function hasTraversalPath(value) {
  return value.split(/[\\/]+/).includes("..");
}

function hasExactToken(value, token) {
  const pattern = new RegExp(`(^|[^A-Z0-9_])${escapeRegExp(token)}([^A-Z0-9_]|$)`, "i");
  return pattern.test(value);
}

function hasWriteAuthorizingPhrase(value) {
  return (
    /\b(write|materiali[sz]ation|execution|commit|branch|pull request|github)\b.{0,40}\b(authori[sz]ed|allowed|unlocked|granted|permitted)\b/i.test(
      value,
    ) ||
    /\b(authori[sz]ed|allowed|unlocked|granted|permitted)\b.{0,40}\b(write|materiali[sz]ation|execution|commit|branch|pull request|github)\b/i.test(
      value,
    )
  );
}

function hasForbiddenRuntimeSurface(value) {
  return /\b(filesystem stat|directory listing|file content read|file write|network api|github api|productive skill)\b/i.test(
    value,
  );
}

function normalizeKey(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]/g, "");
}

function blocker(code, message, path) {
  return { severity: "blocker", code, message, path };
}

function needsRevision(code, message, path) {
  return { severity: "needs_revision", code, message, path };
}

function uniqueFindings(findings) {
  const seen = new Set();
  const unique = [];

  for (const finding of findings) {
    const key = `${finding.severity}|${finding.code}|${finding.message}|${finding.path}`;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(finding);
    }
  }

  return unique;
}

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function visitDeep(value, visitor, path = "$", seen = new WeakSet(), key = undefined) {
  visitor({ key, value, path });

  if (value === null || typeof value !== "object") {
    return;
  }

  if (seen.has(value)) {
    return;
  }
  seen.add(value);

  if (Array.isArray(value)) {
    value.forEach((entry, index) => {
      visitDeep(entry, visitor, `${path}[${index}]`, seen, String(index));
    });
    return;
  }

  for (const [entryKey, entryValue] of Object.entries(value)) {
    visitDeep(entryValue, visitor, `${path}.${entryKey}`, seen, entryKey);
  }
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
