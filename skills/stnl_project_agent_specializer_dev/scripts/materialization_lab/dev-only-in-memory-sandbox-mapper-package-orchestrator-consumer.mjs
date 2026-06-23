export const sandboxMapperPackageOrchestratorConsumerPhase =
  "MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_SANDBOX_MAPPER_PACKAGE_ORCHESTRATOR_CONSUMER_IMPLEMENTATION_PHASE";

export const SANDBOX_MAPPER_PACKAGE_ORCHESTRATOR_CONSUMER_PASS = "PASS";
export const SANDBOX_MAPPER_PACKAGE_ORCHESTRATOR_CONSUMER_BLOCKED = "BLOCKED";

export const canonicalSandboxMapperPackageOrchestratorConsumerAgents =
  Object.freeze([
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

export const requiredSandboxMapperPackageOrchestratorConsumerNoWriteEvidence =
  Object.freeze({
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

export const requiredSandboxMapperPackageOrchestratorConsumerNonAuthorizationEvidenceKeys =
  Object.freeze([
    "real_materialization_authorized",
    "sandbox_materialization_executed",
    "real_target_read_authorized",
    "real_target_write_authorized",
    "filesystem_access_against_real_target_authorized",
    "real_writer_authorized",
    "real_renderer_authorized",
    "real_loader_authorized",
    "real_scenario_selector_authorized",
    "real_target_adapter_authorized",
    "real_write_approval_authorized",
    "approval_token_issued",
    "approval_registry_authorized",
    "approval_signature_authorized",
    "signer_authorized",
    "persistent_report_authorized",
    "generated_output_authorized",
    "materialized_output_authorized",
    "patch_or_diff_application_authorized",
    "github_write_authorized",
    "productive_skill_access_authorized",
    "productive_skill_read_authorized",
    "productive_skill_comparison_authorized",
    "productive_skill_as_source_authorized",
    "productive_skill_mutation_authorized",
    "commit_authorized",
    "branch_authorized",
    "pull_request_authorized",
    "aggregator_change_authorized",
    "checker_creation_authorized",
    "tenth_check_authorized",
  ]);

export const sandboxMapperPackageOrchestratorConsumerImplementationBoundary =
  Object.freeze({
    devOnly: true,
    standalone: true,
    inMemoryOnly: true,
    noWrite: true,
    nonAuthorizing: true,
    packageLevelStructuralCompatibilityOnly: true,
    importsFs: false,
    importsPath: false,
    importsChildProcess: false,
    importsNetwork: false,
    packageOrchestratorExecuted: false,
    reviewLayerExecuted: false,
    dryRunMaterializerExecuted: false,
    realTargetAccessed: false,
    githubAccessed: false,
    productiveSkillAccessed: false,
    rendererExecuted: false,
    writerExecuted: false,
    loaderExecuted: false,
    targetAdapterExecuted: false,
    writeApprovalExecuted: false,
    runtimePayloadCreated: false,
    cliPayloadCreated: false,
    officialSchemaCreated: false,
    stdoutContractCreated: false,
    persistentReportWritten: false,
    outputPersisted: false,
    materializationExecuted: false,
    aggregatorChanged: false,
    checkerCreated: false,
    tenthCheckCreated: false,
  });

const COPILOT_AGENT_TEMPLATE = "reference/templates/copilot/agent.md";
const CODEX_AGENT_TEMPLATE = "reference/templates/codex/agent.toml";
const CODEX_CONFIG_TEMPLATE = "reference/templates/codex/config.toml";
const CODEX_ROOT_INSTRUCTIONS_TEMPLATE = "reference/templates/codex/AGENTS.md";

const CODEX_CONFIG_PATH = ".codex/config.toml";
const CODEX_ROOT_INSTRUCTIONS_PATH = "AGENTS.md";

const REQUIRED_TEMPLATE_REFERENCES = Object.freeze([
  COPILOT_AGENT_TEMPLATE,
  CODEX_AGENT_TEMPLATE,
  CODEX_CONFIG_TEMPLATE,
  CODEX_ROOT_INSTRUCTIONS_TEMPLATE,
]);

const SAFE_TRUE_KEYS = new Set([
  "agentidabsent",
  "canonicalagentspreserved",
  "compatible",
  "complete",
  "devonly",
  "enforced",
  "exactlytwelveagents",
  "exactlytwentyfouragentartifacts",
  "inmemoryonly",
  "managed",
  "mapperinputaccepted",
  "nonauthorizing",
  "nowrite",
  "packagelevel",
  "packagelevelstructuralcompatibilityonly",
  "standalone",
  "structuralcompatibilityonly",
  "targetlevel",
  "targetlevelartifactspreservedasnonagents",
  "templatesexplicit",
  "templatesnotinferred",
  "templatesnotread",
]);

const UNSAFE_TRUE_KEY_FRAGMENTS = Object.freeze([
  "aggregator",
  "approvalregistry",
  "approvalsignature",
  "approvaltoken",
  "authorized",
  "authorization",
  "branch",
  "checker",
  "childprocess",
  "cli",
  "commit",
  "diff",
  "directorylistingattempted",
  "dryrunmaterializerexecuted",
  "executed",
  "filecontentreadattempted",
  "filesystemstatattempted",
  "generatedoutput",
  "github",
  "http",
  "https",
  "loader",
  "materialization",
  "materialized",
  "net",
  "officialschema",
  "outputpersisted",
  "packageorchestratorexecuted",
  "patch",
  "persistentoutput",
  "persistentreport",
  "productiveskill",
  "pullrequest",
  "realtarget",
  "renderer",
  "reviewlayerexecuted",
  "runtime",
  "sandboxmaterializationexecuted",
  "signer",
  "stdoutcontract",
  "targetadapter",
  "targetreadattempted",
  "targetreal",
  "targetwriteattempted",
  "tenthcheck",
  "tls",
  "writeapproval",
  "writeattempted",
  "writeexecuted",
  "writer",
]);

const UNSAFE_NON_EMPTY_STRING_KEY_FRAGMENTS = Object.freeze([
  "aggregatorchange",
  "branchname",
  "clipayload",
  "clicommand",
  "commitsha",
  "diffpayload",
  "generatedoutputpath",
  "githubsignal",
  "githubwrite",
  "loaderpayload",
  "materializedoutputpath",
  "officialschema",
  "patchpayload",
  "persistentoutputpath",
  "persistentreportpath",
  "productiveskill",
  "pullrequest",
  "realtarget",
  "rendererpayload",
  "runtimepayload",
  "stdoutcontract",
  "targetadapterpayload",
  "targetreal",
  "targetroot",
  "writeapprovalpayload",
  "writerpayload",
]);

const UNSAFE_STRING_VALUES_BY_KEY_FRAGMENT = Object.freeze([
  ["productiveskill", "skills/stnl_project_agent_specializer/"],
  ["github", "github"],
  ["aggregator", "aggregator"],
  ["checker", "checker"],
  ["tenthcheck", "tenth"],
]);

const POSITIVE_AUTHORIZATION_VALUES = new Set([
  "approved",
  "writeapproved",
  "approvalgranted",
  "readytowrite",
  "writeunlocked",
  "executionapproved",
  "mergeapproved",
]);

export function buildSandboxMapperPackageOrchestratorConsumerNoWriteEvidence() {
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

export function buildSandboxMapperPackageOrchestratorConsumerNonAuthorizationEvidence() {
  return Object.fromEntries(
    requiredSandboxMapperPackageOrchestratorConsumerNonAuthorizationEvidenceKeys.map(
      (key) => [key, false],
    ),
  );
}

export function createSandboxMapperPackageOrchestratorConsumerResult(
  mapperResult,
) {
  const diagnostics = [];
  const inputProvided = arguments.length > 0;

  if (!inputProvided) {
    diagnostics.push(
      blocker(
        "mapper-result-input-missing",
        "Mapper result input is required.",
        "$",
      ),
    );
  }

  if (mapperResult === null) {
    diagnostics.push(
      blocker(
        "mapper-result-input-null",
        "Mapper result input must not be null.",
        "$",
      ),
    );
  }

  if (inputProvided && mapperResult !== null && !isRecord(mapperResult)) {
    diagnostics.push(
      blocker(
        "mapper-result-input-not-object",
        "Mapper result input must be an in-memory object.",
        "$",
      ),
    );
  }

  const safeMapperResult = isRecord(mapperResult) ? mapperResult : {};

  diagnostics.push(...validateMapperStatus(safeMapperResult));
  diagnostics.push(...validateMapperFailClosed(safeMapperResult.failClosed));
  diagnostics.push(...validateMapperDiagnostics(safeMapperResult.diagnostics));
  diagnostics.push(...validateCanonicalAgentMatrix(safeMapperResult));
  diagnostics.push(...validateTargetMatrixSummary(safeMapperResult));
  diagnostics.push(...validateCodexTargetLevelArtifactSummary(safeMapperResult));
  diagnostics.push(...validateMapperCompatibility(safeMapperResult));
  diagnostics.push(...validateMapperImplementationBoundary(safeMapperResult));
  diagnostics.push(...validateNoWriteEvidence(safeMapperResult.noWriteEvidence));
  diagnostics.push(
    ...validateNonAuthorizationEvidence(
      safeMapperResult.nonAuthorizationEvidence,
    ),
  );
  diagnostics.push(
    ...detectSandboxMapperPackageOrchestratorConsumerUnsafeSignals(
      safeMapperResult,
    ),
  );

  const uniqueDiagnostics = dedupeFindings(diagnostics);
  const blocked = uniqueDiagnostics.some(
    (diagnostic) => diagnostic.severity === "blocker",
  );
  const status = blocked
    ? SANDBOX_MAPPER_PACKAGE_ORCHESTRATOR_CONSUMER_BLOCKED
    : SANDBOX_MAPPER_PACKAGE_ORCHESTRATOR_CONSUMER_PASS;

  const canonicalAgentMatrix =
    canonicalAgentMatrixIsStructurallyValid(
      safeMapperResult.canonicalAgentMatrix,
    )
      ? cloneRecord(safeMapperResult.canonicalAgentMatrix)
      : buildBlockedCanonicalAgentMatrix(safeMapperResult.canonicalAgentMatrix);
  const targetMatrixSummary = targetMatrixSummaryIsStructurallyValid(
    safeMapperResult.targetMatrixSummary,
  )
    ? cloneRecord(safeMapperResult.targetMatrixSummary)
    : buildBlockedTargetMatrixSummary(safeMapperResult.targetMatrixSummary);
  const codexTargetLevelArtifactSummary =
    codexTargetLevelArtifactSummaryIsStructurallyValid(
      safeMapperResult.codexTargetLevelArtifactSummary,
    )
      ? cloneRecord(safeMapperResult.codexTargetLevelArtifactSummary)
      : buildBlockedCodexTargetLevelArtifactSummary(
          safeMapperResult.codexTargetLevelArtifactSummary,
        );
  const noWriteEvidence = noWriteEvidenceIsExact(
    safeMapperResult.noWriteEvidence,
  )
    ? cloneNoWriteEvidence(safeMapperResult.noWriteEvidence)
    : buildSandboxMapperPackageOrchestratorConsumerNoWriteEvidence();
  const nonAuthorizationEvidence = nonAuthorizationEvidenceIsExact(
    safeMapperResult.nonAuthorizationEvidence,
  )
    ? cloneNonAuthorizationEvidence(safeMapperResult.nonAuthorizationEvidence)
    : buildSandboxMapperPackageOrchestratorConsumerNonAuthorizationEvidence();
  const mapperInputAccepted =
    status === SANDBOX_MAPPER_PACKAGE_ORCHESTRATOR_CONSUMER_PASS;

  return {
    phase: sandboxMapperPackageOrchestratorConsumerPhase,
    status,
    mapperInputAccepted,
    packageOrchestratorConsumerCompatibility:
      buildPackageOrchestratorConsumerCompatibility(
        mapperInputAccepted,
        canonicalAgentMatrix,
        targetMatrixSummary,
        codexTargetLevelArtifactSummary,
      ),
    canonicalAgentMatrix,
    targetMatrixSummary,
    codexTargetLevelArtifactSummary,
    noWriteEvidence,
    nonAuthorizationEvidence,
    failClosed: {
      enforced: true,
      blocked,
      inMemoryOnly: true,
      noWrite: true,
      nonAuthorizing: true,
      packageLevelStructuralCompatibilityOnly: true,
      packageOrchestratorExecuted: false,
      reviewLayerExecuted: false,
      dryRunMaterializerExecuted: false,
      materializationExecuted: false,
      mapperFailClosed: isRecord(safeMapperResult.failClosed)
        ? cloneRecord(safeMapperResult.failClosed)
        : null,
      reasonCodes: uniqueDiagnostics.map((diagnostic) => diagnostic.code),
    },
    implementationBoundary: {
      ...sandboxMapperPackageOrchestratorConsumerImplementationBoundary,
    },
    diagnostics: {
      findings: uniqueDiagnostics,
      counts: {
        canonicalAgents: Array.isArray(canonicalAgentMatrix.agents)
          ? canonicalAgentMatrix.agents.length
          : 0,
        copilotAgentArtifacts:
          numberOrZero(canonicalAgentMatrix.copilotAgentArtifactCount) ||
          numberOrZero(targetMatrixSummary.actualCopilotCount),
        codexAgentArtifacts:
          numberOrZero(canonicalAgentMatrix.codexAgentArtifactCount) ||
          numberOrZero(targetMatrixSummary.actualCodexCount),
        agentArtifacts:
          numberOrZero(canonicalAgentMatrix.copilotAgentArtifactCount) +
          numberOrZero(canonicalAgentMatrix.codexAgentArtifactCount),
        targetLevelArtifacts: numberOrZero(
          canonicalAgentMatrix.targetLevelArtifactCount,
        ),
      },
    },
    recommendation: mapperInputAccepted
      ? "Mapper result is accepted only as in-memory package-level structural compatibility input; still no-write and non-authorizing."
      : "Remain BLOCKED until the mapper result is PASS, clean, structurally compatible, and carries exact no-write/non-authorization evidence.",
  };
}

export function detectSandboxMapperPackageOrchestratorConsumerUnsafeSignals(
  value,
) {
  const findings = [];
  const seen = new WeakSet();

  visitDeep(value, "$", seen, ({ key, currentValue, path }) => {
    const normalizedKey = normalizeKey(key);

    if (
      currentValue === true &&
      !SAFE_TRUE_KEYS.has(normalizedKey) &&
      UNSAFE_TRUE_KEY_FRAGMENTS.some((fragment) =>
        normalizedKey.includes(fragment),
      )
    ) {
      findings.push(
        blocker(
          "forbidden-true-signal",
          `Forbidden true signal detected at ${path}.`,
          path,
        ),
      );
    }

    if (
      typeof currentValue === "string" &&
      currentValue.length > 0 &&
      POSITIVE_AUTHORIZATION_VALUES.has(normalizeKey(currentValue))
    ) {
      findings.push(
        blocker(
          "positive-authorization-vocabulary",
          `Positive authorization vocabulary detected at ${path}.`,
          path,
        ),
      );
    }

    if (
      typeof currentValue === "string" &&
      currentValue.length > 0 &&
      UNSAFE_NON_EMPTY_STRING_KEY_FRAGMENTS.some((fragment) =>
        normalizedKey.includes(fragment),
      )
    ) {
      findings.push(
        blocker(
          "forbidden-real-operational-or-persistent-string-signal",
          `Forbidden real, operational, or persistent string signal detected at ${path}.`,
          path,
        ),
      );
    }

    if (typeof currentValue === "string" && currentValue.length > 0) {
      const normalizedValue = normalizeKey(currentValue);
      for (const [
        keyFragment,
        valueFragment,
      ] of UNSAFE_STRING_VALUES_BY_KEY_FRAGMENT) {
        if (
          normalizedKey.includes(keyFragment) &&
          normalizedValue.includes(normalizeKey(valueFragment))
        ) {
          findings.push(
            blocker(
              "forbidden-string-signal",
              `Forbidden string signal detected at ${path}.`,
              path,
            ),
          );
        }
      }
    }
  });

  return dedupeFindings(findings);
}

function validateMapperStatus(mapperResult) {
  if (!Object.hasOwn(mapperResult, "status")) {
    return [
      blocker(
        "mapper-result-status-missing",
        "Mapper result status is required.",
        "$.status",
      ),
    ];
  }

  if (mapperResult.status === SANDBOX_MAPPER_PACKAGE_ORCHESTRATOR_CONSUMER_PASS) {
    return [];
  }

  if (
    mapperResult.status === SANDBOX_MAPPER_PACKAGE_ORCHESTRATOR_CONSUMER_BLOCKED
  ) {
    return [
      blocker(
        "mapper-result-status-blocked",
        "Package orchestrator consumer only accepts mapper results with PASS status.",
        "$.status",
      ),
    ];
  }

  return [
    blocker(
      "mapper-result-status-unknown",
      "Mapper result status must be PASS or BLOCKED.",
      "$.status",
    ),
  ];
}

function validateMapperFailClosed(failClosed) {
  const findings = [];

  if (!isRecord(failClosed)) {
    return [
      blocker(
        "mapper-fail-closed-missing-or-invalid",
        "Mapper result must carry failClosed as an in-memory object.",
        "$.failClosed",
      ),
    ];
  }

  if (failClosed.enforced !== true) {
    findings.push(
      blocker(
        "mapper-fail-closed-not-enforced",
        "Mapper result failClosed.enforced must be true.",
        "$.failClosed.enforced",
      ),
    );
  }

  if (failClosed.blocked !== false) {
    findings.push(
      blocker(
        "mapper-fail-closed-blocked",
        "Mapper result failClosed.blocked must be false for accepted input.",
        "$.failClosed.blocked",
      ),
    );
  }

  return findings;
}

function validateMapperDiagnostics(diagnostics) {
  if (!isRecord(diagnostics) || !Array.isArray(diagnostics.findings)) {
    return [
      blocker(
        "mapper-diagnostics-missing-or-invalid",
        "Mapper result must carry diagnostics.findings as an in-memory array.",
        "$.diagnostics.findings",
      ),
    ];
  }

  if (diagnostics.findings.length > 0) {
    return [
      blocker(
        "mapper-diagnostics-not-clean",
        "Mapper result must be clean before package orchestrator consumer compatibility.",
        "$.diagnostics.findings",
      ),
    ];
  }

  return [];
}

function validateCanonicalAgentMatrix(mapperResult) {
  const matrix = mapperResult.canonicalAgentMatrix;
  const findings = [];

  if (!isRecord(matrix)) {
    return [
      blocker(
        "canonical-agent-matrix-missing-or-invalid",
        "Mapper result must carry canonicalAgentMatrix as an in-memory object.",
        "$.canonicalAgentMatrix",
      ),
    ];
  }

  if (!sameOrderedValues(matrix.agents, canonicalSandboxMapperPackageOrchestratorConsumerAgents)) {
    findings.push(
      blocker(
        "canonical-agent-list-mismatch",
        "Consumer compatibility requires exactly the 12 canonical agents in order.",
        "$.canonicalAgentMatrix.agents",
      ),
    );
  }

  if (matrix.agentCount !== 12 || matrix.exactlyTwelveAgents !== true) {
    findings.push(
      blocker(
        "canonical-agent-count-mismatch",
        "Consumer compatibility requires exactly 12 canonical agents.",
        "$.canonicalAgentMatrix.agentCount",
      ),
    );
  }

  if (
    matrix.copilotAgentArtifactCount !== 12 ||
    matrix.codexAgentArtifactCount !== 12 ||
    matrix.exactlyTwentyFourAgentArtifacts !== true
  ) {
    findings.push(
      blocker(
        "agent-artifact-count-mismatch",
        "Consumer compatibility requires exactly 24 agent artifacts.",
        "$.canonicalAgentMatrix",
      ),
    );
  }

  if (
    matrix.targetLevelArtifactCount !== 2 ||
    matrix.targetLevelArtifactsAreAgents !== false
  ) {
    findings.push(
      blocker(
        "target-level-artifact-count-or-agent-status-mismatch",
        "Consumer compatibility requires exactly 2 target-level artifacts and they must not be agents.",
        "$.canonicalAgentMatrix",
      ),
    );
  }

  return findings;
}

function validateTargetMatrixSummary(mapperResult) {
  const summary = mapperResult.targetMatrixSummary;
  const findings = [];

  if (!isRecord(summary)) {
    return [
      blocker(
        "target-matrix-summary-missing-or-invalid",
        "Mapper result must carry targetMatrixSummary as an in-memory object.",
        "$.targetMatrixSummary",
      ),
    ];
  }

  if (!sameOrderedValues(summary.copilotAgents, canonicalSandboxMapperPackageOrchestratorConsumerAgents)) {
    findings.push(
      blocker(
        "copilot-agent-matrix-mismatch",
        "Consumer compatibility requires 12 Copilot agent entries.",
        "$.targetMatrixSummary.copilotAgents",
      ),
    );
  }

  if (!sameOrderedValues(summary.codexAgents, canonicalSandboxMapperPackageOrchestratorConsumerAgents)) {
    findings.push(
      blocker(
        "codex-agent-matrix-mismatch",
        "Consumer compatibility requires 12 Codex agent entries.",
        "$.targetMatrixSummary.codexAgents",
      ),
    );
  }

  if (
    summary.expectedCopilotCount !== 12 ||
    summary.expectedCodexCount !== 12 ||
    summary.actualCopilotCount !== 12 ||
    summary.actualCodexCount !== 12 ||
    summary.complete !== true
  ) {
    findings.push(
      blocker(
        "target-matrix-count-mismatch",
        "Consumer compatibility requires complete 12 x Copilot and 12 x Codex coverage.",
        "$.targetMatrixSummary",
      ),
    );
  }

  return findings;
}

function validateCodexTargetLevelArtifactSummary(mapperResult) {
  const summary = mapperResult.codexTargetLevelArtifactSummary;
  const findings = [];

  if (!isRecord(summary)) {
    return [
      blocker(
        "codex-target-level-artifact-summary-missing-or-invalid",
        "Mapper result must carry codexTargetLevelArtifactSummary as an in-memory object.",
        "$.codexTargetLevelArtifactSummary",
      ),
    ];
  }

  if (
    summary.expectedCount !== 2 ||
    summary.actualCount !== 2 ||
    summary.targetLevel !== true ||
    summary.agentIdAbsent !== true ||
    summary.complete !== true
  ) {
    findings.push(
      blocker(
        "codex-target-level-artifact-summary-mismatch",
        "Consumer compatibility requires exactly 2 complete Codex target-level artifacts.",
        "$.codexTargetLevelArtifactSummary",
      ),
    );
  }

  findings.push(
    ...validateTargetLevelArtifact(
      summary.configToml,
      "codex-config",
      CODEX_CONFIG_PATH,
      CODEX_CONFIG_TEMPLATE,
      "$.codexTargetLevelArtifactSummary.configToml",
    ),
  );
  findings.push(
    ...validateTargetLevelArtifact(
      summary.agentsMd,
      "codex-root-instructions",
      CODEX_ROOT_INSTRUCTIONS_PATH,
      CODEX_ROOT_INSTRUCTIONS_TEMPLATE,
      "$.codexTargetLevelArtifactSummary.agentsMd",
    ),
  );

  return findings;
}

function validateTargetLevelArtifact(
  artifact,
  artifactType,
  conceptualOutputPath,
  templateReference,
  path,
) {
  const findings = [];

  if (!isRecord(artifact)) {
    return [
      blocker(
        "target-level-artifact-missing-or-invalid",
        "Target-level artifact summary entry must be an in-memory object.",
        path,
      ),
    ];
  }

  if (
    artifact.artifactType !== artifactType ||
    artifact.agentId !== null ||
    artifact.targetLevel !== true ||
    artifact.conceptualOutputPath !== conceptualOutputPath ||
    artifact.templateReference !== templateReference ||
    artifact.managed !== true ||
    artifact.materialized !== false ||
    artifact.writeAttempted !== false
  ) {
    findings.push(
      blocker(
        "target-level-artifact-shape-mismatch",
        "Target-level artifacts must remain explicit non-agent conceptual no-write entries.",
        path,
      ),
    );
  }

  return findings;
}

function validateMapperCompatibility(mapperResult) {
  const compatibility = mapperResult.packageLevelCompatibility;
  const findings = [];

  if (!isRecord(compatibility)) {
    return [
      blocker(
        "mapper-package-level-compatibility-missing-or-invalid",
        "Mapper result must carry packageLevelCompatibility as an in-memory object.",
        "$.packageLevelCompatibility",
      ),
    ];
  }

  for (const [field, expectedValue] of Object.entries({
    compatible: true,
    structuralCompatibilityOnly: true,
    packageLevel: true,
    inMemoryOnly: true,
    noWrite: true,
    nonAuthorizing: true,
    packageOrchestratorExecuted: false,
    canonicalAgentsPreserved: true,
    agentArtifactsPreserved: true,
    targetLevelArtifactsPreservedAsNonAgents: true,
    templatesExplicit: true,
    templatesNotInferred: true,
    templatesNotRead: true,
  })) {
    if (compatibility[field] !== expectedValue) {
      findings.push(
        blocker(
          "mapper-package-level-compatibility-field-mismatch",
          `Mapper packageLevelCompatibility.${field} is not compatible.`,
          `$.packageLevelCompatibility.${field}`,
        ),
      );
    }
  }

  return findings;
}

function validateMapperImplementationBoundary(mapperResult) {
  const boundary = mapperResult.implementationBoundary;
  const findings = [];

  if (!isRecord(boundary)) {
    return [
      blocker(
        "mapper-implementation-boundary-missing-or-invalid",
        "Mapper result must carry implementationBoundary as an in-memory object.",
        "$.implementationBoundary",
      ),
    ];
  }

  for (const [field, expectedValue] of Object.entries({
    devOnly: true,
    standalone: true,
    inMemoryOnly: true,
    noWrite: true,
    nonAuthorizing: true,
    importsFs: false,
    importsPath: false,
    importsChildProcess: false,
    importsNetwork: false,
    packageOrchestratorExecuted: false,
    reviewLayerExecuted: false,
    dryRunMaterializerExecuted: false,
    realTargetAccessed: false,
    githubAccessed: false,
    productiveSkillAccessed: false,
    rendererExecuted: false,
    writerExecuted: false,
    loaderExecuted: false,
    targetAdapterExecuted: false,
    writeApprovalExecuted: false,
    runtimePayloadCreated: false,
    cliPayloadCreated: false,
    officialSchemaCreated: false,
    stdoutContractCreated: false,
    persistentReportWritten: false,
    outputPersisted: false,
    materializationExecuted: false,
    aggregatorChanged: false,
    checkerCreated: false,
    tenthCheckCreated: false,
  })) {
    if (boundary[field] !== expectedValue) {
      findings.push(
        blocker(
          "mapper-implementation-boundary-field-mismatch",
          `Mapper implementationBoundary.${field} violates consumer boundaries.`,
          `$.implementationBoundary.${field}`,
        ),
      );
    }
  }

  return findings;
}

function validateNoWriteEvidence(noWriteEvidence) {
  const findings = [];

  if (!isRecord(noWriteEvidence)) {
    return [
      blocker(
        "no-write-evidence-missing-or-invalid",
        "Mapper result must carry noWriteEvidence as an in-memory object.",
        "$.noWriteEvidence",
      ),
    ];
  }

  const expectedKeys = Object.keys(
    requiredSandboxMapperPackageOrchestratorConsumerNoWriteEvidence,
  );
  const actualKeys = Object.keys(noWriteEvidence);

  if (!sameUnorderedValues(actualKeys, expectedKeys)) {
    findings.push(
      blocker(
        "no-write-evidence-key-mismatch",
        "noWriteEvidence must preserve exactly the required keys.",
        "$.noWriteEvidence",
      ),
    );
  }

  for (const [key, expectedValue] of Object.entries(
    requiredSandboxMapperPackageOrchestratorConsumerNoWriteEvidence,
  )) {
    if (Array.isArray(expectedValue)) {
      if (!Array.isArray(noWriteEvidence[key]) || noWriteEvidence[key].length !== 0) {
        findings.push(
          blocker(
            "no-write-evidence-array-not-empty",
            `${key} must be an empty array.`,
            `$.noWriteEvidence.${key}`,
          ),
        );
      }
      continue;
    }

    if (noWriteEvidence[key] !== false) {
      findings.push(
        blocker(
          "no-write-evidence-value-not-false",
          `${key} must be false.`,
          `$.noWriteEvidence.${key}`,
        ),
      );
    }
  }

  return findings;
}

function validateNonAuthorizationEvidence(nonAuthorizationEvidence) {
  const findings = [];

  if (!isRecord(nonAuthorizationEvidence)) {
    return [
      blocker(
        "non-authorization-evidence-missing-or-invalid",
        "Mapper result must carry nonAuthorizationEvidence as an in-memory object.",
        "$.nonAuthorizationEvidence",
      ),
    ];
  }

  const expectedKeys = [
    ...requiredSandboxMapperPackageOrchestratorConsumerNonAuthorizationEvidenceKeys,
  ];
  const actualKeys = Object.keys(nonAuthorizationEvidence);

  if (!sameUnorderedValues(actualKeys, expectedKeys)) {
    findings.push(
      blocker(
        "non-authorization-evidence-key-mismatch",
        "nonAuthorizationEvidence must preserve exactly the required keys.",
        "$.nonAuthorizationEvidence",
      ),
    );
  }

  for (const key of expectedKeys) {
    if (nonAuthorizationEvidence[key] !== false) {
      findings.push(
        blocker(
          "non-authorization-evidence-value-not-false",
          `${key} must be false.`,
          `$.nonAuthorizationEvidence.${key}`,
        ),
      );
    }
  }

  return findings;
}

function buildPackageOrchestratorConsumerCompatibility(
  compatible,
  canonicalAgentMatrix,
  targetMatrixSummary,
  codexTargetLevelArtifactSummary,
) {
  return {
    compatible,
    compatibilityKind:
      "package-orchestrator-consumer-structural-compatibility",
    structuralCompatibilityOnly: true,
    packageLevel: true,
    mapperInputAccepted: compatible,
    inMemoryOnly: true,
    noWrite: true,
    nonAuthorizing: true,
    packageOrchestratorExecuted: false,
    reviewLayerExecuted: false,
    dryRunMaterializerExecuted: false,
    materializationExecuted: false,
    rendererExecuted: false,
    writerExecuted: false,
    loaderExecuted: false,
    targetAdapterExecuted: false,
    writeApprovalExecuted: false,
    targetRealAccessed: false,
    githubAccessed: false,
    productiveSkillAccessed: false,
    outputPersisted: false,
    persistentReportWritten: false,
    aggregatorChanged: false,
    checkerCreated: false,
    tenthCheckCreated: false,
    canonicalAgentsPreserved:
      canonicalAgentMatrix.exactlyTwelveAgents === true &&
      sameOrderedValues(
        canonicalAgentMatrix.agents,
        canonicalSandboxMapperPackageOrchestratorConsumerAgents,
      ),
    agentArtifactsPreserved:
      canonicalAgentMatrix.exactlyTwentyFourAgentArtifacts === true &&
      targetMatrixSummary.complete === true,
    targetLevelArtifactsPreservedAsNonAgents:
      canonicalAgentMatrix.targetLevelArtifactsAreAgents === false &&
      codexTargetLevelArtifactSummary.complete === true &&
      codexTargetLevelArtifactSummary.agentIdAbsent === true,
    templatesExplicit: true,
    templatesNotInferred: true,
    templatesNotRead: true,
    expectedPackageArtifacts: {
      agentArtifacts: 24,
      targetLevelArtifacts: 2,
      totalArtifacts: 26,
    },
  };
}

function canonicalAgentMatrixIsStructurallyValid(matrix) {
  return (
    isRecord(matrix) &&
    sameOrderedValues(
      matrix.agents,
      canonicalSandboxMapperPackageOrchestratorConsumerAgents,
    ) &&
    matrix.agentCount === 12 &&
    matrix.copilotAgentArtifactCount === 12 &&
    matrix.codexAgentArtifactCount === 12 &&
    matrix.targetLevelArtifactCount === 2 &&
    matrix.targetLevelArtifactsAreAgents === false &&
    matrix.exactlyTwelveAgents === true &&
    matrix.exactlyTwentyFourAgentArtifacts === true
  );
}

function targetMatrixSummaryIsStructurallyValid(summary) {
  return (
    isRecord(summary) &&
    sameOrderedValues(
      summary.copilotAgents,
      canonicalSandboxMapperPackageOrchestratorConsumerAgents,
    ) &&
    sameOrderedValues(
      summary.codexAgents,
      canonicalSandboxMapperPackageOrchestratorConsumerAgents,
    ) &&
    summary.expectedCopilotCount === 12 &&
    summary.expectedCodexCount === 12 &&
    summary.actualCopilotCount === 12 &&
    summary.actualCodexCount === 12 &&
    summary.complete === true
  );
}

function codexTargetLevelArtifactSummaryIsStructurallyValid(summary) {
  return (
    isRecord(summary) &&
    summary.expectedCount === 2 &&
    summary.actualCount === 2 &&
    summary.targetLevel === true &&
    summary.agentIdAbsent === true &&
    summary.complete === true &&
    targetLevelArtifactIsStructurallyValid(
      summary.configToml,
      "codex-config",
      CODEX_CONFIG_PATH,
      CODEX_CONFIG_TEMPLATE,
    ) &&
    targetLevelArtifactIsStructurallyValid(
      summary.agentsMd,
      "codex-root-instructions",
      CODEX_ROOT_INSTRUCTIONS_PATH,
      CODEX_ROOT_INSTRUCTIONS_TEMPLATE,
    )
  );
}

function targetLevelArtifactIsStructurallyValid(
  artifact,
  artifactType,
  conceptualOutputPath,
  templateReference,
) {
  return (
    isRecord(artifact) &&
    artifact.artifactType === artifactType &&
    artifact.agentId === null &&
    artifact.targetLevel === true &&
    artifact.conceptualOutputPath === conceptualOutputPath &&
    artifact.templateReference === templateReference &&
    artifact.managed === true &&
    artifact.materialized === false &&
    artifact.writeAttempted === false
  );
}

function noWriteEvidenceIsExact(noWriteEvidence) {
  if (!isRecord(noWriteEvidence)) {
    return false;
  }

  const expected = requiredSandboxMapperPackageOrchestratorConsumerNoWriteEvidence;

  if (!sameUnorderedValues(Object.keys(noWriteEvidence), Object.keys(expected))) {
    return false;
  }

  for (const [key, expectedValue] of Object.entries(expected)) {
    if (Array.isArray(expectedValue)) {
      if (!Array.isArray(noWriteEvidence[key]) || noWriteEvidence[key].length !== 0) {
        return false;
      }
      continue;
    }

    if (noWriteEvidence[key] !== false) {
      return false;
    }
  }

  return true;
}

function nonAuthorizationEvidenceIsExact(nonAuthorizationEvidence) {
  if (!isRecord(nonAuthorizationEvidence)) {
    return false;
  }

  const expectedKeys = [
    ...requiredSandboxMapperPackageOrchestratorConsumerNonAuthorizationEvidenceKeys,
  ];

  if (!sameUnorderedValues(Object.keys(nonAuthorizationEvidence), expectedKeys)) {
    return false;
  }

  return expectedKeys.every((key) => nonAuthorizationEvidence[key] === false);
}

function buildBlockedCanonicalAgentMatrix(matrix) {
  return {
    agents: Array.isArray(matrix?.agents) ? [...matrix.agents] : [],
    agentCount: Array.isArray(matrix?.agents) ? matrix.agents.length : 0,
    expectedAgentCount: 12,
    copilotAgentArtifactCount: numberOrZero(matrix?.copilotAgentArtifactCount),
    codexAgentArtifactCount: numberOrZero(matrix?.codexAgentArtifactCount),
    targetLevelArtifactCount: numberOrZero(matrix?.targetLevelArtifactCount),
    targetLevelArtifactsAreAgents:
      typeof matrix?.targetLevelArtifactsAreAgents === "boolean"
        ? matrix.targetLevelArtifactsAreAgents
        : null,
    exactlyTwelveAgents: false,
    exactlyTwentyFourAgentArtifacts: false,
  };
}

function buildBlockedTargetMatrixSummary(summary) {
  return {
    copilotAgents: Array.isArray(summary?.copilotAgents)
      ? [...summary.copilotAgents]
      : [],
    codexAgents: Array.isArray(summary?.codexAgents)
      ? [...summary.codexAgents]
      : [],
    expectedCopilotCount: 12,
    expectedCodexCount: 12,
    actualCopilotCount: numberOrZero(summary?.actualCopilotCount),
    actualCodexCount: numberOrZero(summary?.actualCodexCount),
    complete: false,
  };
}

function buildBlockedCodexTargetLevelArtifactSummary(summary) {
  return {
    configToml: isRecord(summary?.configToml)
      ? cloneRecord(summary.configToml)
      : null,
    agentsMd: isRecord(summary?.agentsMd) ? cloneRecord(summary.agentsMd) : null,
    expectedCount: 2,
    actualCount: numberOrZero(summary?.actualCount),
    targetLevel: summary?.targetLevel === true,
    agentIdAbsent: summary?.agentIdAbsent === true,
    complete: false,
  };
}

function cloneNoWriteEvidence(noWriteEvidence) {
  return {
    ...noWriteEvidence,
    files_written: [...noWriteEvidence.files_written],
  };
}

function cloneNonAuthorizationEvidence(nonAuthorizationEvidence) {
  return Object.fromEntries(
    requiredSandboxMapperPackageOrchestratorConsumerNonAuthorizationEvidenceKeys.map(
      (key) => [key, nonAuthorizationEvidence[key]],
    ),
  );
}

function cloneRecord(value) {
  if (Array.isArray(value)) {
    return value.map(cloneRecord);
  }

  if (isRecord(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, currentValue]) => [
        key,
        cloneRecord(currentValue),
      ]),
    );
  }

  return value;
}

function visitDeep(value, path, seen, visitor, key = "$") {
  visitor({ key, currentValue: value, path });

  if (Array.isArray(value)) {
    for (const [index, entry] of value.entries()) {
      visitDeep(entry, `${path}[${index}]`, seen, visitor, String(index));
    }
    return;
  }

  if (!isRecord(value)) {
    return;
  }

  if (seen.has(value)) {
    return;
  }
  seen.add(value);

  for (const [entryKey, entryValue] of Object.entries(value)) {
    visitDeep(entryValue, `${path}.${entryKey}`, seen, visitor, entryKey);
  }
}

function sameOrderedValues(actual, expected) {
  return (
    Array.isArray(actual) &&
    Array.isArray(expected) &&
    actual.length === expected.length &&
    actual.every((value, index) => value === expected[index])
  );
}

function sameUnorderedValues(actual, expected) {
  if (!Array.isArray(actual) || !Array.isArray(expected)) {
    return false;
  }

  if (actual.length !== expected.length) {
    return false;
  }

  const actualSet = new Set(actual);
  const expectedSet = new Set(expected);

  if (actualSet.size !== expectedSet.size) {
    return false;
  }

  for (const value of expectedSet) {
    if (!actualSet.has(value)) {
      return false;
    }
  }

  return true;
}

function dedupeFindings(findings) {
  const seen = new Set();
  const deduped = [];

  for (const finding of findings) {
    const key = `${finding.severity}:${finding.code}:${finding.path}`;

    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    deduped.push(finding);
  }

  return deduped;
}

function blocker(code, message, path) {
  return {
    severity: "blocker",
    code,
    message,
    path,
  };
}

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function normalizeKey(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]/g, "");
}

function numberOrZero(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}
