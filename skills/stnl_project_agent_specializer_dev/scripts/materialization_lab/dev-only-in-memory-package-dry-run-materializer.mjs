export const packageDryRunMaterializerPhase =
  "MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PACKAGE_DRY_RUN_MATERIALIZER_IMPLEMENTATION";

export const DRY_RUN_PASS = "DRY_RUN_PASS";
export const DRY_RUN_BLOCKED = "DRY_RUN_BLOCKED";
export const DRY_RUN_NEEDS_REVISION = "DRY_RUN_NEEDS_REVISION";

const CANONICAL_AGENTS = Object.freeze([
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
]);

const REQUIRED_TEMPLATES = Object.freeze([
  "reference/templates/copilot/agent.md",
  "reference/templates/codex/agent.toml",
  "reference/templates/codex/config.toml",
  "reference/templates/codex/AGENTS.md",
]);

const CODEX_CONFIG_PATH = ".codex/config.toml";
const CODEX_ROOT_INSTRUCTIONS_PATH = "AGENTS.md";

const EXPECTED_NO_WRITE_EVIDENCE = Object.freeze({
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

const NON_AUTHORIZATION_KEYS = Object.freeze([
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
]);

const PASS_LIKE_STATUSES = new Set([
  "PASS",
  "PACKAGE_PASS",
  "REVIEW_PASS",
  "DRY_RUN_PASS",
]);

const SAFE_NEGATIVE_VALUES = new Set([
  "",
  "none",
  "false",
  "no",
  "notcreated",
  "notauthorized",
  "notrequested",
  "denied",
  "prohibited",
  "forbidden",
  "disabled",
  "inmemoryonly",
  "nowrite",
]);

const POSITIVE_WRITE_VOCABULARY = Object.freeze([
  "APPROVED",
  "WRITE_APPROVED",
  "APPROVAL_GRANTED",
  "READY_TO_WRITE",
  "WRITE_UNLOCKED",
  "EXECUTION_APPROVED",
  "MERGE_APPROVED",
]);

const UNSAFE_TRUE_KEY_RULES = Object.freeze([
  ["target-real-signal", ["targetreal", "realtarget", "targetprobed"]],
  [
    "filesystem-access-signal",
    [
      "filesystemaccess",
      "filesystemstat",
      "directorylisting",
      "filecontentread",
      "fileread",
      "filewrite",
      "targetread",
      "targetwrite",
    ],
  ],
  ["github-write-signal", ["githubwrite", "githubrequest", "octokit"]],
  [
    "productive-skill-signal",
    ["productiveskillaccess", "productiveskillmutation", "productiveskill"],
  ],
  ["renderer-real-signal", ["realrenderer", "renderercreated", "rendererexecuted"]],
  ["writer-signal", ["realwriter", "writercreated", "writerexecuted", "writeexecuted"]],
  ["loader-signal", ["realloader", "loadercreated", "loaderexecuted"]],
  ["target-adapter-signal", ["targetadapter", "realtargetadapter"]],
  ["write-approval-signal", ["writeapproval", "realwriteapproval"]],
  [
    "approval-credential-signal",
    ["approvaltoken", "approvalregistry", "approvalsignature", "signer"],
  ],
  ["runtime-cli-schema-stdout-signal", ["runtimecreated", "clicreated", "schemaofficial", "stdoutcontract"]],
  [
    "persistent-output-signal",
    ["persistentreport", "outputpersisted", "snapshot", "cache", "materializedoutput", "generatedoutput"],
  ],
  ["patch-diff-signal", ["patchapplied", "patchapplication", "diffapplied", "diffapplication"]],
  ["github-publishing-signal", ["commitcreated", "branchcreated", "pullrequestcreated"]],
  [
    "aggregator-checker-signal",
    ["aggregatorchanged", "aggregatorchild", "registeredinaggregator", "checkercreated", "checkercreation", "tenthcheck"],
  ],
]);

const UNSAFE_TEXT_RULES = Object.freeze([
  [
    "target-real-signal",
    [
      /real[-_\s]?target[-_\s]?(path|root|access|read|write)/,
      /target[-_\s]?real[-_\s]?(path|root|access|read|write)/,
      /host[-_\s]?absolute[-_\s]?path/,
    ],
  ],
  [
    "filesystem-access-signal",
    [
      /filesystem[-_\s]?(access|stat|listing|read|write)/,
      /directory[-_\s]?listing/,
      /file[-_\s]?(content[-_\s]?)?read/,
      /file[-_\s]?write/,
    ],
  ],
  ["github-write-signal", [/github[-_\s]?(write|request|api|client|mutation)/, /octokit/]],
  [
    "productive-skill-signal",
    [/productive[-_\s]?skill[-_\s]?(access|mutation|source|path)/],
  ],
  [
    "renderer-real-signal",
    [/real[-_\s]?renderer/, /renderer[-_\s]?(created|executed|payload|output)/, /rendered[-_\s]?content/, /render[-_\s]?final/],
  ],
  [
    "writer-signal",
    [/real[-_\s]?writer/, /writer[-_\s]?(created|executed|payload|output)/, /write[-_\s]?execution/],
  ],
  ["loader-signal", [/real[-_\s]?loader/, /loader[-_\s]?(created|executed|payload)/]],
  ["target-adapter-signal", [/target[-_\s]?adapter/, /real[-_\s]?target[-_\s]?adapter/]],
  ["write-approval-signal", [/write[-_\s]?approval/, /real[-_\s]?write[-_\s]?approval/]],
  [
    "approval-credential-signal",
    [/approval[-_\s]?token/, /approval[-_\s]?registry/, /approval[-_\s]?signature/, /approval[-_\s]?signer/, /\bsigner\b/, /signer[-_\s]?(created|issued)/],
  ],
  [
    "runtime-cli-schema-stdout-signal",
    [
      /runtime[-_\s]?(created|contract|payload|materializer|surface)/,
      /cli[-_\s]?(created|contract|command|argument|surface)/,
      /stdout[-_\s]?contract/,
      /official[-_\s]?schema/,
      /schema[-_\s]?oficial/,
      /schema[-_\s]?official/,
    ],
  ],
  [
    "persistent-output-signal",
    [
      /persistent[-_\s]?(output|report)/,
      /output[-_\s]?persisted/,
      /stdout[-_\s]?capture/,
      /snapshot/,
      /cache/,
      /materialized[-_\s]?output/,
      /generated[-_\s]?(output|file|artifact)/,
    ],
  ],
  [
    "patch-diff-signal",
    [/patch[-_\s]?(applied|application|payload)/, /diff[-_\s]?(applied|application|payload)/],
  ],
  [
    "github-publishing-signal",
    [/commit[-_\s]?created/, /branch[-_\s]?created/, /pull[-_\s]?request[-_\s]?created/, /create[-_\s]?pull[-_\s]?request/],
  ],
  [
    "aggregator-checker-signal",
    [
      /aggregator[-_\s]?(change|changed|modified|child|registered)/,
      /checker[-_\s]?(created|creation|registered)/,
      /tenth[-_\s]?check/,
      /decimo[-_\s]?check/,
      /d[eé]cimo[-_\s]?check/,
    ],
  ],
]);

export function buildDryRunNoWriteEvidence() {
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

export function buildDryRunNonAuthorizationEvidence() {
  return Object.fromEntries(NON_AUTHORIZATION_KEYS.map((key) => [key, false]));
}

export function buildPackageDryRunMaterializationPlan(packageResult) {
  const boundaryFindings = validatePackageDryRunInputBoundary(packageResult);
  const unsafeSignals = detectDryRunUnsafeSignals(packageResult);
  const findings = uniqueFindings([...boundaryFindings, ...unsafeSignals]);
  const blockers = findings.filter((finding) => finding.severity === "blocker");
  const needsRevision = findings.filter(
    (finding) => finding.severity === "needs_revision",
  );
  const status =
    blockers.length > 0
      ? DRY_RUN_BLOCKED
      : needsRevision.length > 0
        ? DRY_RUN_NEEDS_REVISION
        : DRY_RUN_PASS;

  const conceptualOutputInventory = buildConceptualOutputInventory();
  const targetRootRelativePaths = conceptualOutputInventory.map(
    (artifact) => artifact.targetRootRelativePath,
  );

  return {
    phase: packageDryRunMaterializerPhase,
    status,
    writeAuthorizationDenied: true,
    canonicalAgents: [...CANONICAL_AGENTS],
    conceptualOutputInventory,
    targetRootRelativePaths,
    templateToOutputMapping: buildTemplateToOutputMapping(),
    perTargetArtifactGrouping: buildPerTargetArtifactGrouping(conceptualOutputInventory),
    codexTargetLevelArtifacts: buildCodexTargetLevelArtifacts(),
    blockedUnsafeSignals: unsafeSignals,
    findings,
    blockers,
    needsRevision,
    noWriteEvidence: buildDryRunNoWriteEvidence(),
    nonAuthorizationEvidence: buildDryRunNonAuthorizationEvidence(),
    summary: {
      resultKind: "in-memory-conceptual-package-dry-run-materialization-plan",
      packageLevel: true,
      devOnly: true,
      standalone: true,
      inMemoryOnly: true,
      noWrite: true,
      noTargetReal: true,
      noGitHub: true,
      noProductiveSkill: true,
      nonChecker: true,
      nonAggregatorChild: true,
      nonAuthorizing: true,
      dryRunPassAuthorizesWrite: false,
      realMaterializationAuthorized: false,
      notFile: true,
      notReport: true,
      notSnapshot: true,
      notCache: true,
      notStdoutContract: true,
      notMaterializedOutput: true,
      notPatch: true,
      notAppliedDiff: true,
      notWriteApproval: true,
      expectedArtifactCount: conceptualOutputInventory.length,
      expectedCopilotAgentArtifacts: CANONICAL_AGENTS.length,
      expectedCodexAgentArtifacts: CANONICAL_AGENTS.length,
      expectedCodexTargetLevelArtifacts: 2,
      statusReason:
        status === DRY_RUN_PASS
          ? "The input package evidence satisfies the dev-only in-memory dry-run boundary and remains non-authorizing."
          : "The input package evidence is blocked or needs revision; no write or materialization authority is granted.",
    },
  };
}

export function validatePackageDryRunInputBoundary(packageResult) {
  const findings = [];

  if (!isRecord(packageResult)) {
    return [
      blocker(
        "invalid-package-dry-run-input",
        "Package dry-run input must be an in-memory object.",
        "$",
      ),
    ];
  }

  findings.push(...validatePackageStatus(packageResult));
  findings.push(...validateCanonicalAgentPackage(packageResult));
  findings.push(...validateTargetMatrix(packageResult));
  findings.push(...validateExplicitTemplates(packageResult));
  findings.push(...validateCodexTargetLevelArtifacts(packageResult));
  findings.push(...validateNoWriteEvidence(packageResult));
  findings.push(...validateNonAuthorizationEvidence(packageResult));
  findings.push(...validateAggregatorBoundary(packageResult));
  findings.push(...validateDeclaredBlocks(packageResult));

  return uniqueFindings(findings);
}

export function detectDryRunUnsafeSignals(packageResult) {
  const findings = [];

  if (!isRecord(packageResult)) {
    return findings;
  }

  for (const signal of normalizeExplicitSignals(
    packageResult.unsafeSignals ?? packageResult.unsafe_signals,
  )) {
    findings.push(
      blocker(
        "unsafe-signal-present",
        "Explicit unsafe signal is present in the in-memory package result.",
        signal.path,
      ),
    );
  }

  visitDeep(packageResult, ({ key, value, path }) => {
    const keyText = key === undefined ? "" : String(key);
    const normalizedKey = normalizeKey(keyText);

    if (value === true) {
      for (const [code, fragments] of UNSAFE_TRUE_KEY_RULES) {
        if (fragments.some((fragment) => normalizedKey.includes(fragment))) {
          findings.push(
            blocker(
              code,
              `Unsafe true signal is present at ${path}.`,
              path,
            ),
          );
        }
      }
    }

    if (typeof value === "string") {
      if (looksLikePath(value) && isUnsafeConceptualPath(value)) {
        findings.push(
          blocker(
            isAbsolutePath(value) ? "absolute-path-signal" : "path-traversal-signal",
            "Absolute or traversal path is present in the in-memory package result.",
            path,
          ),
        );
      }

      const normalizedValue = normalizeText(value);
      const compactValue = normalizeKey(value);
      const compactKey = normalizeKey(keyText);
      for (const positiveTerm of POSITIVE_WRITE_VOCABULARY) {
        if (
          compactValue.includes(normalizeKey(positiveTerm)) ||
          compactKey.includes(normalizeKey(positiveTerm))
        ) {
          findings.push(
            blocker(
              "positive-write-authorization-vocabulary",
              `Forbidden positive write vocabulary is present: ${positiveTerm}.`,
              path,
            ),
          );
        }
      }

      if (!isSafeNegativeValue(value)) {
        for (const [code, regexes] of UNSAFE_TEXT_RULES) {
          if (regexes.some((regex) => regex.test(normalizedValue))) {
            findings.push(
              blocker(
                code,
                `Unsafe conceptual signal is present at ${path}.`,
                path,
              ),
            );
          }
        }
      }
    }
  });

  return uniqueFindings(findings);
}

function validatePackageStatus(packageResult) {
  const findings = [];
  const status =
    packageResult.packageStatus ??
    packageResult.package_status ??
    packageResult.reviewStatus ??
    packageResult.review_status ??
    packageResult.phase_identity?.status ??
    packageResult.status;

  if (status !== undefined && !PASS_LIKE_STATUSES.has(String(status))) {
    findings.push(
      blocker(
        "package-status-not-pass",
        "Package dry-run input status is not pass-like.",
        "$.packageStatus",
      ),
    );
  }

  if (
    packageResult.partialSuccess === true ||
    packageResult.partial_success === true ||
    packageResult.partialPackageSuccess === true ||
    packageResult.partial_package_success === true
  ) {
    findings.push(
      blocker(
        "partial-package-success-forbidden",
        "Partial success cannot satisfy the package-level dry-run boundary.",
        "$.partialSuccess",
      ),
    );
  }

  return findings;
}

function validateCanonicalAgentPackage(packageResult) {
  const findings = [];
  const records = extractAgentRecords(packageResult);
  const agents = records.map((record) => record.agent).filter(Boolean);
  const agentSet = new Set(agents);

  if (records.length === 0) {
    findings.push(
      blocker(
        "missing-canonical-agents",
        "The package must provide canonical agent evidence.",
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
          isTargetLevelArtifactName(agent)
            ? "target-level-artifact-counted-as-agent"
            : "unexpected-canonical-agent",
          `Unexpected agent-like package member: ${agent}.`,
          "$.canonicalAgents",
        ),
      );
    }
  }

  if (records.length !== CANONICAL_AGENTS.length) {
    findings.push(
      blocker(
        "canonical-agent-count-mismatch",
        "The package must contain exactly 12 canonical agents.",
        "$.canonicalAgents",
      ),
    );
  }

  if (agentSet.size !== agents.length) {
    findings.push(
      blocker(
        "duplicate-canonical-agent",
        "The package must not duplicate canonical agents.",
        "$.canonicalAgents",
      ),
    );
  }

  return findings;
}

function validateTargetMatrix(packageResult) {
  const findings = [];
  const copilotRecords = extractArtifactRecords(packageResult, "copilot");
  const codexRecords = extractArtifactRecords(packageResult, "codex");

  findings.push(...validateAgentArtifactSet("copilot", copilotRecords));
  findings.push(...validateAgentArtifactSet("codex", codexRecords));

  for (const record of [...copilotRecords, ...codexRecords]) {
    findings.push(...validateTargetRootRelativePath(record.path, record.sourcePath));
  }

  for (const record of copilotRecords) {
    if (record.path?.startsWith(".codex/agents/")) {
      findings.push(
        blocker(
          "crossed-output-shape",
          "Copilot artifact is using the Codex agent output shape.",
          record.sourcePath,
        ),
      );
    }
  }

  for (const record of codexRecords) {
    if (record.path?.startsWith(".github/agents/")) {
      findings.push(
        blocker(
          "crossed-output-shape",
          "Codex artifact is using the Copilot agent output shape.",
          record.sourcePath,
        ),
      );
    }

    if (
      record.path === CODEX_CONFIG_PATH ||
      record.path === CODEX_ROOT_INSTRUCTIONS_PATH ||
      isTargetLevelArtifactName(record.agent)
    ) {
      findings.push(
        blocker(
          "codex-target-level-artifact-counted-as-agent",
          "Codex target-level artifacts must not be counted as agents.",
          record.sourcePath,
        ),
      );
    }
  }

  return findings;
}

function validateAgentArtifactSet(kind, records) {
  const findings = [];

  for (const agent of CANONICAL_AGENTS) {
    const expectedPath =
      kind === "copilot" ? expectedCopilotPath(agent) : expectedCodexPath(agent);
    const actualPaths = records
      .filter((record) => record.agent === agent)
      .map((record) => record.path);

    if (actualPaths.length === 0) {
      findings.push(
        blocker(
          `missing-${kind}-artifact`,
          `Missing conceptual ${kind} artifact for canonical agent: ${agent}.`,
          `$.${kind}`,
        ),
      );
      continue;
    }

    if (!actualPaths.includes(expectedPath)) {
      findings.push(
        blocker(
          `${kind}-output-shape-mismatch`,
          `${kind} artifact for ${agent} must use ${expectedPath}.`,
          `$.${kind}`,
        ),
      );
    }
  }

  for (const record of records) {
    if (!CANONICAL_AGENTS.includes(record.agent)) {
      findings.push(
        blocker(
          isTargetLevelArtifactName(record.agent)
            ? "target-level-artifact-counted-as-agent"
            : `unexpected-${kind}-artifact-agent`,
          `Unexpected ${kind} artifact agent: ${record.agent}.`,
          record.sourcePath,
        ),
      );
    }
  }

  const uniqueAgentPathPairs = new Set(
    records.map((record) => `${record.agent}:${record.path}`),
  );
  if (uniqueAgentPathPairs.size !== records.length) {
    findings.push(
      blocker(
        `duplicate-${kind}-artifact`,
        `${kind} artifact matrix must not contain duplicates.`,
        `$.${kind}`,
      ),
    );
  }

  return findings;
}

function validateExplicitTemplates(packageResult) {
  const findings = [];
  const templateSummary =
    packageResult.templateSummary ??
    packageResult.template_summary ??
    packageResult.template_resolution_summary ??
    packageResult.templates;
  const templates = extractTemplatePaths(templateSummary);

  if (templates.length === 0) {
    findings.push(
      blocker(
        "missing-template-summary",
        "Explicit template evidence is missing.",
        "$.templateSummary",
      ),
    );
    return findings;
  }

  for (const template of templates) {
    findings.push(...validateTargetRootRelativePath(template, "$.templateSummary"));
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

  if (
    templateSummary?.explicit_templates_required === false ||
    templateSummary?.explicitTemplatesRequired === false
  ) {
    findings.push(
      blocker(
        "explicit-templates-not-required",
        "Templates must be explicit and required.",
        "$.templateSummary",
      ),
    );
  }

  if (
    templateSummary?.inferredTemplate === true ||
    templateSummary?.inferred_template_used === true ||
    templateSummary?.fallback_template_used === true ||
    hasNonEmptyEvidence(templateSummary?.inferredTemplates) ||
    hasNonEmptyEvidence(templateSummary?.inferred_template_refs)
  ) {
    findings.push(
      blocker(
        "inferred-template",
        "Template summary contains inferred template evidence.",
        "$.templateSummary",
      ),
    );
  }

  if (
    templateSummary?.missingTemplate === true ||
    hasNonEmptyEvidence(templateSummary?.missingTemplates) ||
    hasNonEmptyEvidence(templateSummary?.missing_template_refs)
  ) {
    findings.push(
      blocker(
        "missing-template-declared",
        "Template summary declares missing templates.",
        "$.templateSummary",
      ),
    );
  }

  if (
    templateSummary?.ambiguousTemplate === true ||
    hasNonEmptyEvidence(templateSummary?.ambiguousTemplates) ||
    hasNonEmptyEvidence(templateSummary?.ambiguous_template_refs)
  ) {
    findings.push(
      blocker(
        "ambiguous-template",
        "Template summary contains ambiguous template evidence.",
        "$.templateSummary",
      ),
    );
  }

  return findings;
}

function validateCodexTargetLevelArtifacts(packageResult) {
  const findings = [];
  const paths = extractCodexTargetLevelPaths(packageResult);

  if (!paths.includes(CODEX_CONFIG_PATH)) {
    findings.push(
      blocker(
        "missing-codex-config-artifact",
        "Missing conceptual .codex/config.toml target-level artifact.",
        "$.codexTargetLevelArtifacts",
      ),
    );
  }

  if (!paths.includes(CODEX_ROOT_INSTRUCTIONS_PATH)) {
    findings.push(
      blocker(
        "missing-codex-root-instructions-artifact",
        "Missing conceptual AGENTS.md target-level artifact.",
        "$.codexTargetLevelArtifacts",
      ),
    );
  }

  for (const artifactPath of paths) {
    findings.push(...validateTargetRootRelativePath(artifactPath, "$.codexTargetLevelArtifacts"));
  }

  const summary =
    packageResult.codexTargetLevelArtifactSummary ??
    packageResult.codex_target_level_artifact_summary ??
    {};
  if (
    summary.countedAsAgents === true ||
    summary.counted_as_agents === true ||
    summary.treatedAsAgents === true ||
    summary.treated_as_agents === true ||
    summary.codexTargetLevelArtifactsCountedAsAgents === true
  ) {
    findings.push(
      blocker(
        "codex-target-level-artifacts-counted-as-agents",
        ".codex/config.toml and AGENTS.md must remain target-level artifacts.",
        "$.codexTargetLevelArtifactSummary",
      ),
    );
  }

  return findings;
}

function validateNoWriteEvidence(packageResult) {
  const findings = [];
  const evidence = packageResult.noWriteEvidence ?? packageResult.no_write_evidence;

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

    if (actual !== false) {
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

function validateNonAuthorizationEvidence(packageResult) {
  const findings = [];
  const evidence =
    packageResult.nonAuthorizationEvidence ?? packageResult.non_authorization_evidence;

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

  for (const field of NON_AUTHORIZATION_KEYS) {
    if (!(field in evidence)) {
      findings.push(
        blocker(
          "missing-non-authorization-evidence-field",
          `Missing non-authorization evidence field: ${field}.`,
          `$.nonAuthorizationEvidence.${field}`,
        ),
      );
      continue;
    }

    if (evidence[field] !== false) {
      findings.push(
        blocker(
          "non-authorization-evidence-contradiction",
          `${field} must be exactly false.`,
          `$.nonAuthorizationEvidence.${field}`,
        ),
      );
    }
  }

  return findings;
}

function validateAggregatorBoundary(packageResult) {
  const findings = [];
  const summary =
    packageResult.aggregatorPreservationSummary ??
    packageResult.aggregator_preservation_summary ??
    packageResult.next_audit_expectation ??
    {};

  if (!isRecord(summary)) {
    return findings;
  }

  if (
    summary.childCheckCount !== undefined &&
    summary.childCheckCount !== 9
  ) {
    findings.push(
      blocker(
        "aggregator-child-check-count-changed",
        "Aggregator child check count must remain exactly 9.",
        "$.aggregatorPreservationSummary.childCheckCount",
      ),
    );
  }

  if (
    summary.child_check_count !== undefined &&
    summary.child_check_count !== 9
  ) {
    findings.push(
      blocker(
        "aggregator-child-check-count-changed",
        "Aggregator child check count must remain exactly 9.",
        "$.aggregatorPreservationSummary.child_check_count",
      ),
    );
  }

  if (
    summary.changed === true ||
    summary.registered === true ||
    summary.childAdded === true ||
    summary.aggregator_child_registered === true ||
    summary.checkerCreated === true ||
    summary.checker_created === true ||
    summary.tenthCheckCreated === true ||
    summary.tenth_check_created === true
  ) {
    findings.push(
      blocker(
        "aggregator-boundary-violation",
        "Aggregator mutation, checker creation, or tenth-check creation is declared.",
        "$.aggregatorPreservationSummary",
      ),
    );
  }

  return findings;
}

function validateDeclaredBlocks(packageResult) {
  const findings = [];

  if (hasNonEmptyEvidence(packageResult.blockers) || hasNonEmptyEvidence(packageResult.package_blockers?.blockers)) {
    findings.push(
      blocker(
        "package-declared-blockers",
        "Package result declares blockers.",
        "$.blockers",
      ),
    );
  }

  if (hasNonEmptyEvidence(packageResult.needsRevision) || hasNonEmptyEvidence(packageResult.needs_revision)) {
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

function buildConceptualOutputInventory() {
  const copilotArtifacts = CANONICAL_AGENTS.map((agent) => ({
    artifactId: `copilot:${agent}`,
    targetFamily: "copilot",
    artifactKind: "agent",
    agent,
    targetRootRelativePath: expectedCopilotPath(agent),
    outputShape: ".github/agents/<agent>.agent.md",
    templateRef: "reference/templates/copilot/agent.md",
    materialized: false,
    writeAuthorizationDenied: true,
  }));

  const codexArtifacts = CANONICAL_AGENTS.map((agent) => ({
    artifactId: `codex:${agent}`,
    targetFamily: "codex",
    artifactKind: "agent",
    agent,
    targetRootRelativePath: expectedCodexPath(agent),
    outputShape: ".codex/agents/<agent>.toml",
    templateRef: "reference/templates/codex/agent.toml",
    materialized: false,
    writeAuthorizationDenied: true,
  }));

  return [
    ...copilotArtifacts,
    ...codexArtifacts,
    ...buildCodexTargetLevelArtifacts(),
  ];
}

function buildCodexTargetLevelArtifacts() {
  return [
    {
      artifactId: "codex-config",
      targetFamily: "codex",
      artifactKind: "target-level",
      agent: null,
      targetRootRelativePath: CODEX_CONFIG_PATH,
      outputShape: ".codex/config.toml",
      templateRef: "reference/templates/codex/config.toml",
      countedAsAgent: false,
      materialized: false,
      writeAuthorizationDenied: true,
    },
    {
      artifactId: "codex-root-instructions",
      targetFamily: "codex",
      artifactKind: "target-level",
      agent: null,
      targetRootRelativePath: CODEX_ROOT_INSTRUCTIONS_PATH,
      outputShape: "AGENTS.md",
      templateRef: "reference/templates/codex/AGENTS.md",
      countedAsAgent: false,
      materialized: false,
      writeAuthorizationDenied: true,
    },
  ];
}

function buildTemplateToOutputMapping() {
  return {
    "reference/templates/copilot/agent.md": CANONICAL_AGENTS.map(expectedCopilotPath),
    "reference/templates/codex/agent.toml": CANONICAL_AGENTS.map(expectedCodexPath),
    "reference/templates/codex/config.toml": [CODEX_CONFIG_PATH],
    "reference/templates/codex/AGENTS.md": [CODEX_ROOT_INSTRUCTIONS_PATH],
  };
}

function buildPerTargetArtifactGrouping(inventory) {
  return {
    copilot: {
      agentArtifacts: inventory.filter((artifact) => artifact.targetFamily === "copilot"),
      targetLevelArtifacts: [],
    },
    codex: {
      agentArtifacts: inventory.filter(
        (artifact) =>
          artifact.targetFamily === "codex" && artifact.artifactKind === "agent",
      ),
      targetLevelArtifacts: inventory.filter(
        (artifact) =>
          artifact.targetFamily === "codex" &&
          artifact.artifactKind === "target-level",
      ),
    },
  };
}

function extractAgentRecords(packageResult) {
  const candidates = [
    packageResult.canonicalAgents,
    packageResult.canonical_agents,
    packageResult.canonical_agent_matrix?.agents,
    packageResult.canonicalAgentMatrix?.agents,
  ];

  for (const candidate of candidates) {
    const records = normalizeAgentRecords(candidate);
    if (records.length > 0) {
      return records;
    }
  }

  return [];
}

function normalizeAgentRecords(value) {
  if (Array.isArray(value)) {
    return value
      .map((entry) => {
        if (typeof entry === "string") {
          return { agent: entry };
        }
        if (!isRecord(entry)) {
          return { agent: undefined };
        }
        return {
          agent:
            entry.agent ??
            entry.agent_id ??
            entry.agentId ??
            entry.name ??
            entry.id ??
            entry.slug,
        };
      })
      .filter((record) => record.agent !== undefined);
  }

  if (isRecord(value)) {
    return Object.entries(value).map(([agent, entry]) => {
      if (isRecord(entry)) {
        return {
          agent:
            entry.agent ??
            entry.agent_id ??
            entry.agentId ??
            entry.name ??
            entry.id ??
            agent,
        };
      }
      return { agent };
    });
  }

  return [];
}

function extractArtifactRecords(packageResult, kind) {
  const matrix = packageResult.targetMatrixSummary ?? packageResult.target_matrix_summary ?? {};
  const shapes = packageResult.conceptualOutputShapes ?? packageResult.conceptual_output_shapes ?? {};
  const planSummary =
    packageResult.targetOutputPlanSummary ?? packageResult.target_output_plan_summary ?? {};
  const fields =
    kind === "copilot"
      ? [
          "copilot",
          "copilotAgents",
          "copilot_agents",
          "copilotArtifacts",
          "copilot_artifacts",
          "copilotAgentArtifacts",
          "copilot_agent_artifacts",
          "copilotAgentPaths",
          "copilot_agent_paths",
        ]
      : [
          "codex",
          "codexAgents",
          "codex_agents",
          "codexArtifacts",
          "codex_artifacts",
          "codexAgentArtifacts",
          "codex_agent_artifacts",
          "codexAgentPaths",
          "codex_agent_paths",
        ];

  const candidates = [
    ...fields.map((field) => matrix[field]),
    ...fields.map((field) => matrix[kind]?.[field]),
    matrix[kind]?.entries,
    ...fields.map((field) => shapes[field]),
    ...fields.map((field) => shapes[kind]?.[field]),
    shapes[kind]?.entries,
    planSummary.planned_agent_output_entries,
    planSummary.plannedAgentOutputEntries,
  ];

  const records = [];
  for (const candidate of candidates) {
    records.push(...normalizeArtifactRecords(candidate, kind));
  }

  return uniqueArtifactRecords(records);
}

function normalizeArtifactRecords(value, kind) {
  if (Array.isArray(value)) {
    return value
      .flatMap((entry, index) => artifactRecordFromEntry(entry, String(index), kind))
      .filter((record) => record.agent !== undefined || record.path !== undefined);
  }

  if (isRecord(value)) {
    if (Array.isArray(value.entries)) {
      return normalizeArtifactRecords(value.entries, kind);
    }

    return Object.entries(value)
      .flatMap(([agent, entry]) => artifactRecordFromEntry(entry, agent, kind))
      .filter((record) => record.agent !== undefined || record.path !== undefined);
  }

  return [];
}

function artifactRecordFromEntry(entry, fallbackAgent, kind) {
  if (typeof entry === "string") {
    return [
      {
        agent: inferAgentFromPath(entry) ?? fallbackAgent,
        path: entry,
        sourcePath: `$.${kind}.${fallbackAgent}`,
      },
    ];
  }

  if (!isRecord(entry)) {
    return [];
  }

  const targetId = entry.target_id ?? entry.targetId ?? entry.targetFamily;
  if (targetId !== undefined && targetId !== kind) {
    return [];
  }

  const path =
    entry.conceptual_path ??
    entry.conceptualPath ??
    entry.planned_path ??
    entry.plannedPath ??
    entry.output_path ??
    entry.outputPath ??
    entry.targetRootRelativePath ??
    entry.path;
  const agent =
    entry.agent ??
    entry.agent_id ??
    entry.agentId ??
    entry.name ??
    entry.id ??
    inferAgentFromPath(path) ??
    fallbackAgent;

  return [
    {
      agent,
      path,
      sourcePath: `$.${kind}.${agent}`,
    },
  ];
}

function extractTemplatePaths(summary) {
  const candidates = [
    summary?.templates,
    summary?.templateRefs,
    summary?.template_refs,
    summary?.explicitTemplateRefs,
    summary?.explicit_template_refs,
    summary?.requiredTemplateRefs,
    summary?.required_template_refs,
  ];

  for (const candidate of candidates) {
    const paths = normalizeStringList(candidate);
    if (paths.length > 0) {
      return paths;
    }
  }

  if (Array.isArray(summary)) {
    return normalizeStringList(summary);
  }

  return [];
}

function extractCodexTargetLevelPaths(packageResult) {
  const summary =
    packageResult.codexTargetLevelArtifactSummary ??
    packageResult.codex_target_level_artifact_summary ??
    {};
  const shapes = packageResult.conceptualOutputShapes ?? packageResult.conceptual_output_shapes ?? {};
  const planSummary =
    packageResult.targetOutputPlanSummary ?? packageResult.target_output_plan_summary ?? {};
  const candidates = [
    summary.config,
    summary.codexConfig,
    summary.codex_config,
    summary.rootInstructions,
    summary.root_instructions,
    summary.codexRootInstructions,
    summary.codex_root_instructions,
    summary.required_paths,
    summary.requiredPaths,
    summary.artifacts,
    shapes.codexConfig,
    shapes.codex_config,
    shapes.codexRootInstructions,
    shapes.codex_root_instructions,
    planSummary.planned_codex_target_level_entries,
    planSummary.plannedCodexTargetLevelEntries,
  ];

  return uniqueStrings(candidates.flatMap(normalizePathEvidence));
}

function normalizePathEvidence(value) {
  if (typeof value === "string") {
    return [value];
  }
  if (Array.isArray(value)) {
    return value.flatMap(normalizePathEvidence);
  }
  if (isRecord(value)) {
    const direct =
      value.conceptual_path ??
      value.conceptualPath ??
      value.planned_path ??
      value.plannedPath ??
      value.path ??
      value.targetRootRelativePath;
    if (typeof direct === "string") {
      return [direct];
    }
    return Object.values(value).flatMap(normalizePathEvidence);
  }
  return [];
}

function validateTargetRootRelativePath(value, path) {
  const findings = [];

  if (typeof value !== "string" || value.length === 0) {
    findings.push(
      blocker(
        "missing-output-shape",
        "Conceptual output path must be a non-empty target-root-relative string.",
        path,
      ),
    );
    return findings;
  }

  if (isAbsolutePath(value)) {
    findings.push(
      blocker(
        "absolute-path",
        "Conceptual output path must not be absolute.",
        path,
      ),
    );
  }

  if (hasTraversalPath(value)) {
    findings.push(
      blocker(
        "path-traversal",
        "Conceptual output path must not contain path traversal.",
        path,
      ),
    );
  }

  if (value.includes("\\")) {
    findings.push(
      blocker(
        "non-canonical-path-separator",
        "Conceptual output path must use forward slash separators only.",
        path,
      ),
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

function inferAgentFromPath(value) {
  if (typeof value !== "string") {
    return undefined;
  }

  const copilotMatch = value.match(/^\.github\/agents\/(.+)\.agent\.md$/);
  if (copilotMatch) {
    return copilotMatch[1];
  }

  const codexMatch = value.match(/^\.codex\/agents\/(.+)\.toml$/);
  if (codexMatch) {
    return codexMatch[1];
  }

  return undefined;
}

function isTargetLevelArtifactName(value) {
  return [
    CODEX_CONFIG_PATH,
    CODEX_ROOT_INSTRUCTIONS_PATH,
    "codex-config",
    "codex_config",
    "config",
    "agents-md",
    "agents_md",
    "root-instructions",
    "root_instructions",
  ].includes(String(value));
}

function normalizeStringList(value) {
  if (Array.isArray(value)) {
    return value
      .map((entry) => {
        if (typeof entry === "string") {
          return entry;
        }
        if (isRecord(entry)) {
          return entry.ref ?? entry.path ?? entry.templateRef ?? entry.template_ref;
        }
        return undefined;
      })
      .filter((entry) => typeof entry === "string");
  }

  if (isRecord(value)) {
    return Object.values(value).flatMap(normalizeStringList);
  }

  return [];
}

function normalizeExplicitSignals(value) {
  if (value === undefined || value === null || value === false) {
    return [];
  }
  if (Array.isArray(value)) {
    return value.length === 0
      ? []
      : value.map((entry, index) => ({ path: `$.unsafeSignals.${index}`, entry }));
  }
  if (isRecord(value)) {
    return Object.keys(value).length === 0
      ? []
      : Object.keys(value).map((key) => ({ path: `$.unsafeSignals.${key}` }));
  }
  if (typeof value === "string" && value.trim() === "") {
    return [];
  }
  return [{ path: "$.unsafeSignals" }];
}

function uniqueArtifactRecords(records) {
  const seen = new Set();
  const unique = [];

  for (const record of records) {
    const key = `${record.agent}:${record.path}`;
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    unique.push(record);
  }

  return unique;
}

function uniqueStrings(values) {
  return [...new Set(values.filter((value) => typeof value === "string"))];
}

function uniqueFindings(findings) {
  const seen = new Set();
  const unique = [];

  for (const finding of findings) {
    const key = `${finding.severity}:${finding.code}:${finding.path}:${finding.message}`;
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    unique.push(finding);
  }

  return unique;
}

function blocker(code, message, path) {
  return { severity: "blocker", code, message, path };
}

function needsRevision(code, message, path) {
  return { severity: "needs_revision", code, message, path };
}

function hasNonEmptyEvidence(value) {
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  if (isRecord(value)) {
    return Object.keys(value).length > 0;
  }
  return value === true || (typeof value === "string" && value.trim() !== "");
}

function visitDeep(value, visitor, path = "$", key = undefined, seen = new Set()) {
  visitor({ key, value, path });

  if (!isRecord(value) && !Array.isArray(value)) {
    return;
  }

  if (seen.has(value)) {
    return;
  }
  seen.add(value);

  const entries = Array.isArray(value)
    ? value.map((entry, index) => [String(index), entry])
    : Object.entries(value);

  for (const [childKey, childValue] of entries) {
    visitDeep(childValue, visitor, `${path}.${childKey}`, childKey, seen);
  }
}

function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function looksLikePath(value) {
  return (
    typeof value === "string" &&
    (value.includes("/") ||
      value.includes("\\") ||
      value.startsWith(".") ||
      /^[A-Za-z]:[\\/]/.test(value) ||
      value.startsWith("file://"))
  );
}

function isUnsafeConceptualPath(value) {
  return isAbsolutePath(value) || hasTraversalPath(value);
}

function isAbsolutePath(value) {
  return (
    typeof value === "string" &&
    (value.startsWith("/") ||
      /^[A-Za-z]:[\\/]/.test(value) ||
      value.startsWith("file://"))
  );
}

function hasTraversalPath(value) {
  if (typeof value !== "string") {
    return false;
  }
  const normalized = value.replaceAll("\\", "/");
  return normalized.split("/").includes("..");
}

function normalizeKey(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]/g, "");
}

function normalizeText(value) {
  return String(value).toLowerCase().replace(/\s+/g, " ").trim();
}

function isSafeNegativeValue(value) {
  const normalized = normalizeKey(value);
  return SAFE_NEGATIVE_VALUES.has(normalized);
}
