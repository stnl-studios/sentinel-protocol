export const sandboxIntegrationMapperPhase =
  "MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_SANDBOX_MINIMAL_IMPLEMENTATION_INTEGRATION_MAPPER_IMPLEMENTATION_PHASE";

export const SANDBOX_INTEGRATION_MAPPER_PASS = "PASS";
export const SANDBOX_INTEGRATION_MAPPER_BLOCKED = "BLOCKED";

export const canonicalSandboxIntegrationAgents = Object.freeze([
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

export const requiredSandboxIntegrationTemplateReferences = Object.freeze([
  "reference/templates/copilot/agent.md",
  "reference/templates/codex/agent.toml",
  "reference/templates/codex/config.toml",
  "reference/templates/codex/AGENTS.md",
]);

export const requiredSandboxIntegrationNoWriteEvidence = Object.freeze({
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

export const requiredSandboxIntegrationNonAuthorizationEvidenceKeys =
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

export const sandboxIntegrationMapperImplementationBoundary = Object.freeze({
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
});

const COPILOT_AGENT_TEMPLATE = "reference/templates/copilot/agent.md";
const CODEX_AGENT_TEMPLATE = "reference/templates/codex/agent.toml";
const CODEX_CONFIG_TEMPLATE = "reference/templates/codex/config.toml";
const CODEX_ROOT_INSTRUCTIONS_TEMPLATE = "reference/templates/codex/AGENTS.md";

const CODEX_CONFIG_PATH = ".codex/config.toml";
const CODEX_ROOT_INSTRUCTIONS_PATH = "AGENTS.md";

const TARGET_LEVEL_OUTPUT_PATHS = Object.freeze([
  CODEX_CONFIG_PATH,
  CODEX_ROOT_INSTRUCTIONS_PATH,
]);

const TARGET_LEVEL_AGENT_NAMES = Object.freeze([
  CODEX_CONFIG_PATH,
  CODEX_ROOT_INSTRUCTIONS_PATH,
  "codex-config",
  "codex-agents-md",
  "codex-root-instructions",
  "config.toml",
]);

const SAFE_TRUE_KEYS = new Set([
  "devonly",
  "sandboxonly",
  "inmemoryonly",
  "standalone",
  "packagelevel",
  "nowrite",
  "nonauthorizing",
  "manualmanualdevonly",
  "managed",
  "targetlevel",
  "enforced",
  "compatible",
  "structuralcompatibilityonly",
  "templatesexplicit",
  "templatesnotinferred",
  "templatesnotread",
  "exactlytwelveagents",
  "exactlytwentyfouragentartifacts",
  "complete",
]);

const UNSAFE_TRUE_KEY_FRAGMENTS = Object.freeze([
  "targetrealpath",
  "realtargetpath",
  "targetreal",
  "realtarget",
  "targetroot",
  "githubwriteattempted",
  "githubwriteauthorized",
  "githubwrite",
  "productiveskillreadauthorized",
  "productiveskillaccessauthorized",
  "productiveskillassourceauthorized",
  "productiveskillcomparisonauthorized",
  "productiveskillmutationauthorized",
  "productiveskill",
  "persistentoutput",
  "generatedoutput",
  "materializedoutput",
  "persistentreport",
  "aggregatorchangeauthorized",
  "checkercreationauthorized",
  "tenthcheckauthorized",
  "aggregatorchange",
  "checkercreation",
  "tenthcheck",
  "runtimeauthorized",
  "cliauthorized",
  "officialschemaauthorized",
  "stdoutcontractauthorized",
  "runtime",
  "cli",
  "officialschema",
  "stdoutcontract",
  "realrendererauthorized",
  "realwriterauthorized",
  "realloaderauthorized",
  "realrenderer",
  "realwriter",
  "realloader",
  "rendererpayload",
  "writerpayload",
  "loaderpayload",
  "rendererexecuted",
  "writerexecuted",
  "loaderexecuted",
  "realtargetadapterauthorized",
  "realwriteapprovalauthorized",
  "realtargetadapter",
  "realwriteapproval",
  "targetadapterpayload",
  "writeapprovalpayload",
]);

const UNSAFE_NON_EMPTY_STRING_KEY_FRAGMENTS = Object.freeze([
  "targetrealpath",
  "realtargetpath",
  "targetroot",
  "persistentoutputpath",
  "generatedoutputpath",
  "materializedoutputpath",
  "persistentreportpath",
  "runtimepayload",
  "clipayload",
  "clicommand",
  "officialschema",
  "stdoutcontract",
  "rendererpayload",
  "writerpayload",
  "loaderpayload",
  "targetadapterpayload",
  "writeapprovalpayload",
]);

const UNSAFE_STRING_VALUES_BY_KEY_FRAGMENT = Object.freeze([
  ["productiveskill", "skills/stnl_project_agent_specializer/"],
  ["githubwrite", "github"],
  ["aggregatorchange", "aggregator"],
  ["checkercreation", "checker"],
  ["tenthcheck", "tenth"],
]);

export function buildSandboxIntegrationNoWriteEvidence() {
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

export function buildSandboxIntegrationNonAuthorizationEvidence() {
  return Object.fromEntries(
    requiredSandboxIntegrationNonAuthorizationEvidenceKeys.map((key) => [
      key,
      false,
    ]),
  );
}

export function createSandboxIntegrationMapperResult(sandboxPlan) {
  const diagnostics = [];

  if (!isRecord(sandboxPlan)) {
    diagnostics.push(
      blocker(
        "invalid-sandbox-plan-input",
        "Sandbox integration mapper input must be an in-memory object.",
        "$",
      ),
    );
  }

  const safePlan = isRecord(sandboxPlan) ? sandboxPlan : {};

  diagnostics.push(...validateSandboxPlanStatus(safePlan));
  diagnostics.push(...validateCanonicalAgents(safePlan.canonicalAgents));
  diagnostics.push(...validateTemplateReferences(safePlan));
  diagnostics.push(...validateSandboxArtifacts(safePlan));
  diagnostics.push(...validateNoWriteEvidence(safePlan.noWriteEvidence));
  diagnostics.push(
    ...validateNonAuthorizationEvidence(safePlan.nonAuthorizationEvidence),
  );
  diagnostics.push(...detectSandboxIntegrationUnsafeSignals(safePlan));

  const uniqueDiagnostics = dedupeFindings(diagnostics);
  const blocked = uniqueDiagnostics.some(
    (diagnostic) => diagnostic.severity === "blocker",
  );
  const status = blocked
    ? SANDBOX_INTEGRATION_MAPPER_BLOCKED
    : SANDBOX_INTEGRATION_MAPPER_PASS;
  const normalizedSandboxArtifacts = normalizeSandboxArtifacts(
    safePlan.conceptualArtifacts,
  );
  const agentArtifacts = normalizedSandboxArtifacts.filter(
    (artifact) => artifact.targetLevel !== true,
  );
  const targetLevelArtifacts = normalizedSandboxArtifacts.filter(
    (artifact) => artifact.targetLevel === true,
  );
  const copilotArtifacts = agentArtifacts.filter(
    (artifact) => artifact.artifactType === "copilot-agent",
  );
  const codexArtifacts = agentArtifacts.filter(
    (artifact) => artifact.artifactType === "codex-agent",
  );
  const targetMatrixSummary = buildTargetMatrixSummary(
    copilotArtifacts,
    codexArtifacts,
  );
  const codexTargetLevelArtifactSummary =
    buildCodexTargetLevelArtifactSummary(targetLevelArtifacts);
  const canonicalAgentMatrix = buildCanonicalAgentMatrix(
    safePlan.canonicalAgents,
    copilotArtifacts,
    codexArtifacts,
    targetLevelArtifacts,
  );
  const noWriteEvidence = noWriteEvidenceIsExact(safePlan.noWriteEvidence)
    ? cloneNoWriteEvidence(safePlan.noWriteEvidence)
    : buildSandboxIntegrationNoWriteEvidence();
  const nonAuthorizationEvidence = nonAuthorizationEvidenceIsExact(
    safePlan.nonAuthorizationEvidence,
  )
    ? cloneNonAuthorizationEvidence(safePlan.nonAuthorizationEvidence)
    : buildSandboxIntegrationNonAuthorizationEvidence();

  return {
    phase: sandboxIntegrationMapperPhase,
    status,
    normalizedSandboxArtifacts,
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
      reasonCodes: uniqueDiagnostics.map((diagnostic) => diagnostic.code),
    },
    packageLevelCompatibility: buildPackageLevelCompatibility(
      status,
      canonicalAgentMatrix,
      targetMatrixSummary,
      codexTargetLevelArtifactSummary,
    ),
    reviewLayerCompatibility: buildReviewLayerCompatibility(status),
    dryRunMaterializerCompatibility:
      buildDryRunMaterializerCompatibility(status),
    implementationBoundary: { ...sandboxIntegrationMapperImplementationBoundary },
    diagnostics: {
      findings: uniqueDiagnostics,
      counts: {
        canonicalAgents: Array.isArray(safePlan.canonicalAgents)
          ? safePlan.canonicalAgents.length
          : 0,
        normalizedSandboxArtifacts: normalizedSandboxArtifacts.length,
        copilotAgentArtifacts: copilotArtifacts.length,
        codexAgentArtifacts: codexArtifacts.length,
        agentArtifacts: agentArtifacts.length,
        targetLevelArtifacts: targetLevelArtifacts.length,
      },
    },
    recommendation:
      status === SANDBOX_INTEGRATION_MAPPER_PASS
        ? "MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_SANDBOX_MINIMAL_IMPLEMENTATION_INTEGRATION_MAPPER_AUDIT"
        : "Remain blocked until the sandbox plan is PASS, preserves the canonical matrix, and carries complete no-write/non-authorization evidence.",
  };
}

export function detectSandboxIntegrationUnsafeSignals(value) {
  const findings = [];

  visitDeep(value, ({ key, currentValue, path }) => {
    const normalizedKey = normalizeKey(key);

    if (isExplicitUnsafeSignalKey(normalizedKey, currentValue)) {
      findings.push(
        blocker(
          "explicit-unsafe-signal-present",
          "Explicit unsafe signal is present in the in-memory sandbox plan.",
          path,
        ),
      );
    }

    if (
      currentValue === true &&
      !isSafeTrueKey(normalizedKey) &&
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
      UNSAFE_NON_EMPTY_STRING_KEY_FRAGMENTS.some((fragment) =>
        normalizedKey.includes(fragment),
      )
    ) {
      findings.push(
        blocker(
          "forbidden-real-or-persistent-signal",
          `Forbidden real path or persistent output signal detected at ${path}.`,
          path,
        ),
      );
    }

    if (typeof currentValue === "string" && currentValue.length > 0) {
      const normalizedValue = normalizeKey(currentValue);
      for (const [keyFragment, valueFragment] of UNSAFE_STRING_VALUES_BY_KEY_FRAGMENT) {
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

function validateSandboxPlanStatus(sandboxPlan) {
  if (!Object.hasOwn(sandboxPlan, "status")) {
    return [
      blocker(
        "sandbox-plan-status-missing",
        "Sandbox plan status is required.",
        "$.status",
      ),
    ];
  }

  if (sandboxPlan.status === SANDBOX_INTEGRATION_MAPPER_PASS) {
    return [];
  }

  if (sandboxPlan.status === SANDBOX_INTEGRATION_MAPPER_BLOCKED) {
    return [
      blocker(
        "sandbox-plan-status-blocked",
        "Sandbox integration mapper only accepts sandbox plans with PASS status.",
        "$.status",
      ),
    ];
  }

  return [
    blocker(
      "sandbox-plan-status-unknown",
      "Sandbox plan status must be PASS or BLOCKED.",
      "$.status",
    ),
  ];
}

function validateCanonicalAgents(agents) {
  const findings = [];

  if (!Array.isArray(agents)) {
    return [
      blocker(
        "canonical-agents-missing-or-invalid",
        "Sandbox plan must carry canonicalAgents as an in-memory array.",
        "$.canonicalAgents",
      ),
    ];
  }

  if (agents.length !== canonicalSandboxIntegrationAgents.length) {
    findings.push(
      blocker(
        "canonical-agent-count-mismatch",
        "The mapper boundary requires exactly 12 canonical agents.",
        "$.canonicalAgents",
      ),
    );
  }

  if (new Set(agents).size !== agents.length) {
    findings.push(
      blocker(
        "duplicate-canonical-agent",
        "Canonical agents must not contain duplicates.",
        "$.canonicalAgents",
      ),
    );
  }

  for (const agent of canonicalSandboxIntegrationAgents) {
    if (!agents.includes(agent)) {
      findings.push(
        blocker(
          "missing-canonical-agent",
          `Missing canonical agent: ${agent}.`,
          "$.canonicalAgents",
        ),
      );
    }
  }

  for (const agent of agents) {
    if (TARGET_LEVEL_AGENT_NAMES.includes(agent)) {
      findings.push(
        blocker(
          "target-level-artifact-counted-as-agent",
          `Target-level artifact must not be counted as an agent: ${agent}.`,
          "$.canonicalAgents",
        ),
      );
      continue;
    }

    if (!canonicalSandboxIntegrationAgents.includes(agent)) {
      findings.push(
        blocker(
          "unexpected-canonical-agent",
          `Unexpected canonical agent: ${String(agent)}.`,
          "$.canonicalAgents",
        ),
      );
    }
  }

  return findings;
}

function validateTemplateReferences(sandboxPlan) {
  const templateReferences = Object.hasOwn(sandboxPlan, "templateReferences")
    ? sandboxPlan.templateReferences
    : explicitArtifactTemplateReferences(sandboxPlan.conceptualArtifacts);
  const findings = [];

  if (!Array.isArray(templateReferences)) {
    return [
      blocker(
        "template-references-missing-or-invalid",
        "Sandbox plan must carry explicit template references.",
        "$.templateReferences",
      ),
    ];
  }

  for (const templateReference of requiredSandboxIntegrationTemplateReferences) {
    if (!templateReferences.includes(templateReference)) {
      findings.push(
        blocker(
          "missing-required-template-reference",
          `Missing explicit template reference: ${templateReference}.`,
          "$.templateReferences",
        ),
      );
    }
  }

  for (const templateReference of templateReferences) {
    if (!requiredSandboxIntegrationTemplateReferences.includes(templateReference)) {
      findings.push(
        blocker(
          "unexpected-template-reference",
          `Unexpected template reference: ${String(templateReference)}.`,
          "$.templateReferences",
        ),
      );
    }
  }

  return findings;
}

function explicitArtifactTemplateReferences(conceptualArtifacts) {
  if (!Array.isArray(conceptualArtifacts)) {
    return null;
  }

  return [
    ...new Set(
      conceptualArtifacts
        .filter(isRecord)
        .map((artifact) => artifact.templateReference)
        .filter((templateReference) => typeof templateReference === "string"),
    ),
  ];
}

function validateSandboxArtifacts(sandboxPlan) {
  const findings = [];
  const conceptualArtifacts = sandboxPlan.conceptualArtifacts;
  const targetLevelArtifacts = sandboxPlan.targetLevelArtifacts;

  if (!Array.isArray(conceptualArtifacts)) {
    return [
      blocker(
        "conceptual-artifacts-missing-or-invalid",
        "Sandbox plan must carry conceptualArtifacts as an in-memory array.",
        "$.conceptualArtifacts",
      ),
    ];
  }

  if (!Array.isArray(targetLevelArtifacts)) {
    findings.push(
      blocker(
        "target-level-artifacts-missing-or-invalid",
        "Sandbox plan must carry targetLevelArtifacts as an in-memory array.",
        "$.targetLevelArtifacts",
      ),
    );
  }

  for (const [index, artifact] of conceptualArtifacts.entries()) {
    findings.push(...validateSandboxArtifact(artifact, `$.conceptualArtifacts[${index}]`));
  }

  if (Array.isArray(targetLevelArtifacts)) {
    for (const [index, artifact] of targetLevelArtifacts.entries()) {
      findings.push(
        ...validateSandboxArtifact(artifact, `$.targetLevelArtifacts[${index}]`),
      );
    }
  }

  findings.push(...validateArtifactMatrix(conceptualArtifacts));
  findings.push(...validateTargetLevelArtifactList(targetLevelArtifacts));

  return findings;
}

function validateSandboxArtifact(artifact, path) {
  const findings = [];

  if (!isRecord(artifact)) {
    return [
      blocker(
        "sandbox-artifact-not-object",
        "Sandbox artifacts must be in-memory objects.",
        path,
      ),
    ];
  }

  for (const field of [
    "artifactType",
    "targetLevel",
    "conceptualOutputPath",
    "templateReference",
    "managed",
    "ownership",
    "materialized",
    "writeAttempted",
  ]) {
    if (!Object.hasOwn(artifact, field)) {
      findings.push(
        blocker(
          "sandbox-artifact-field-missing",
          `Sandbox artifact is missing required field: ${field}.`,
          path,
        ),
      );
    }
  }

  if (!Object.hasOwn(artifact, "agentId")) {
    findings.push(
      blocker(
        "sandbox-artifact-agent-id-field-missing",
        "Sandbox artifact must explicitly carry agentId, using null for target-level artifacts.",
        path,
      ),
    );
  }

  if (artifact.managed !== true) {
    findings.push(
      blocker(
        "sandbox-artifact-managed-not-true",
        "Sandbox artifacts must remain managed conceptual entries.",
        path,
      ),
    );
  }

  if (artifact.materialized !== false) {
    findings.push(
      blocker(
        "sandbox-artifact-materialized-not-false",
        "Sandbox artifacts must not be materialized.",
        path,
      ),
    );
  }

  if (artifact.writeAttempted !== false) {
    findings.push(
      blocker(
        "sandbox-artifact-write-attempted-not-false",
        "Sandbox artifacts must not attempt writes.",
        path,
      ),
    );
  }

  if (!requiredSandboxIntegrationTemplateReferences.includes(artifact.templateReference)) {
    findings.push(
      blocker(
        "sandbox-artifact-template-reference-not-explicit",
        "Sandbox artifact templateReference must be an explicit required reference.",
        path,
      ),
    );
  }

  if (TARGET_LEVEL_OUTPUT_PATHS.includes(artifact.conceptualOutputPath)) {
    if (artifact.targetLevel !== true) {
      findings.push(
        blocker(
          "target-level-artifact-not-target-level",
          "Target-level artifact paths must be targetLevel=true.",
          path,
        ),
      );
    }

    if (artifact.agentId !== null) {
      findings.push(
        blocker(
          "target-level-artifact-agent-id-present",
          "Target-level artifacts must carry agentId=null.",
          path,
        ),
      );
    }
  }

  if (
    artifact.targetLevel !== true &&
    !canonicalSandboxIntegrationAgents.includes(artifact.agentId)
  ) {
    findings.push(
      blocker(
        "agent-artifact-agent-id-invalid",
        "Agent artifacts must reference one of the 12 canonical agents.",
        path,
      ),
    );
  }

  return findings;
}

function validateArtifactMatrix(conceptualArtifacts) {
  const findings = [];
  const copilotArtifacts = conceptualArtifacts.filter(
    (artifact) => artifact?.artifactType === "copilot-agent",
  );
  const codexArtifacts = conceptualArtifacts.filter(
    (artifact) => artifact?.artifactType === "codex-agent",
  );
  const targetLevelArtifacts = conceptualArtifacts.filter(
    (artifact) => artifact?.targetLevel === true,
  );

  findings.push(
    ...validateAgentArtifactFamily(
      "copilot",
      copilotArtifacts,
      COPILOT_AGENT_TEMPLATE,
      (agent) => `.github/agents/${agent}.agent.md`,
    ),
  );
  findings.push(
    ...validateAgentArtifactFamily(
      "codex",
      codexArtifacts,
      CODEX_AGENT_TEMPLATE,
      (agent) => `.codex/agents/${agent}.toml`,
    ),
  );

  if (copilotArtifacts.length + codexArtifacts.length !== 24) {
    findings.push(
      blocker(
        "agent-artifact-count-mismatch",
        "The sandbox integration mapper requires exactly 24 agent artifacts.",
        "$.conceptualArtifacts",
      ),
    );
  }

  if (targetLevelArtifacts.length !== 2) {
    findings.push(
      blocker(
        "target-level-artifact-count-mismatch",
        "The sandbox integration mapper requires exactly 2 target-level artifacts.",
        "$.conceptualArtifacts",
      ),
    );
  }

  for (const requiredPath of TARGET_LEVEL_OUTPUT_PATHS) {
    const artifact = targetLevelArtifacts.find(
      (candidate) => candidate?.conceptualOutputPath === requiredPath,
    );

    if (!artifact) {
      findings.push(
        blocker(
          "missing-target-level-artifact",
          `Missing target-level artifact: ${requiredPath}.`,
          "$.conceptualArtifacts",
        ),
      );
      continue;
    }

    const expectedTemplate =
      requiredPath === CODEX_CONFIG_PATH
        ? CODEX_CONFIG_TEMPLATE
        : CODEX_ROOT_INSTRUCTIONS_TEMPLATE;

    if (artifact.templateReference !== expectedTemplate) {
      findings.push(
        blocker(
          "target-level-artifact-template-mismatch",
          `Target-level artifact template mismatch for ${requiredPath}.`,
          "$.conceptualArtifacts",
        ),
      );
    }
  }

  return findings;
}

function validateAgentArtifactFamily(
  family,
  artifacts,
  expectedTemplateReference,
  expectedPathForAgent,
) {
  const findings = [];

  if (artifacts.length !== canonicalSandboxIntegrationAgents.length) {
    findings.push(
      blocker(
        `${family}-artifact-count-mismatch`,
        `Exactly 12 ${family} agent artifacts are required.`,
        "$.conceptualArtifacts",
      ),
    );
  }

  for (const agentId of canonicalSandboxIntegrationAgents) {
    const matches = artifacts.filter((artifact) => artifact?.agentId === agentId);

    if (matches.length !== 1) {
      findings.push(
        blocker(
          `${family}-artifact-agent-count-mismatch`,
          `Exactly one ${family} artifact is required for ${agentId}.`,
          "$.conceptualArtifacts",
        ),
      );
      continue;
    }

    const [artifact] = matches;

    if (artifact.conceptualOutputPath !== expectedPathForAgent(agentId)) {
      findings.push(
        blocker(
          `${family}-artifact-path-mismatch`,
          `${family} artifact path is not canonical for ${agentId}.`,
          "$.conceptualArtifacts",
        ),
      );
    }

    if (artifact.templateReference !== expectedTemplateReference) {
      findings.push(
        blocker(
          `${family}-artifact-template-mismatch`,
          `${family} artifact template reference is not canonical for ${agentId}.`,
          "$.conceptualArtifacts",
        ),
      );
    }

    if (artifact.targetLevel !== false) {
      findings.push(
        blocker(
          `${family}-artifact-target-level-mismatch`,
          `${family} agent artifacts must not be target-level artifacts.`,
          "$.conceptualArtifacts",
        ),
      );
    }
  }

  return findings;
}

function validateTargetLevelArtifactList(targetLevelArtifacts) {
  if (!Array.isArray(targetLevelArtifacts)) {
    return [];
  }

  const findings = [];

  if (targetLevelArtifacts.length !== 2) {
    findings.push(
      blocker(
        "target-level-artifacts-list-count-mismatch",
        "targetLevelArtifacts must contain exactly 2 target-level entries.",
        "$.targetLevelArtifacts",
      ),
    );
  }

  for (const requiredPath of TARGET_LEVEL_OUTPUT_PATHS) {
    const artifact = targetLevelArtifacts.find(
      (candidate) => candidate?.conceptualOutputPath === requiredPath,
    );

    if (!artifact) {
      findings.push(
        blocker(
          "target-level-artifacts-list-missing-entry",
          `targetLevelArtifacts is missing ${requiredPath}.`,
          "$.targetLevelArtifacts",
        ),
      );
      continue;
    }

    if (artifact.agentId !== null) {
      findings.push(
        blocker(
          "target-level-artifacts-list-agent-id-present",
          "Target-level artifacts must carry agentId=null.",
          "$.targetLevelArtifacts",
        ),
      );
    }

    if (artifact.targetLevel !== true) {
      findings.push(
        blocker(
          "target-level-artifacts-list-target-level-not-true",
          "Target-level artifacts must carry targetLevel=true.",
          "$.targetLevelArtifacts",
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
        "Sandbox plan must carry noWriteEvidence as an in-memory object.",
        "$.noWriteEvidence",
      ),
    ];
  }

  const expectedKeys = Object.keys(requiredSandboxIntegrationNoWriteEvidence);
  const actualKeys = Object.keys(noWriteEvidence);

  for (const key of expectedKeys) {
    if (!Object.hasOwn(noWriteEvidence, key)) {
      findings.push(
        blocker(
          "no-write-evidence-field-missing",
          `No-write evidence is missing required field: ${key}.`,
          "$.noWriteEvidence",
        ),
      );
      continue;
    }

    const expectedValue = requiredSandboxIntegrationNoWriteEvidence[key];
    const actualValue = noWriteEvidence[key];

    if (Array.isArray(expectedValue)) {
      if (!Array.isArray(actualValue) || actualValue.length !== 0) {
        findings.push(
          blocker(
            "no-write-evidence-array-not-empty",
            `No-write evidence field must be an empty array: ${key}.`,
            "$.noWriteEvidence",
          ),
        );
      }
    } else if (actualValue !== false) {
      findings.push(
        blocker(
          "no-write-evidence-field-not-false",
          `No-write evidence field must be false: ${key}.`,
          "$.noWriteEvidence",
        ),
      );
    }
  }

  for (const key of actualKeys) {
    if (!expectedKeys.includes(key)) {
      findings.push(
        blocker(
          "no-write-evidence-unexpected-field",
          `No-write evidence contains an unexpected field: ${key}.`,
          "$.noWriteEvidence",
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
        "Sandbox plan must carry nonAuthorizationEvidence as an in-memory object.",
        "$.nonAuthorizationEvidence",
      ),
    ];
  }

  for (const key of requiredSandboxIntegrationNonAuthorizationEvidenceKeys) {
    if (!Object.hasOwn(nonAuthorizationEvidence, key)) {
      findings.push(
        blocker(
          "non-authorization-evidence-field-missing",
          `Non-authorization evidence is missing required field: ${key}.`,
          "$.nonAuthorizationEvidence",
        ),
      );
      continue;
    }

    if (nonAuthorizationEvidence[key] !== false) {
      findings.push(
        blocker(
          "non-authorization-evidence-field-not-false",
          `Non-authorization evidence field must be false: ${key}.`,
          "$.nonAuthorizationEvidence",
        ),
      );
    }
  }

  for (const key of Object.keys(nonAuthorizationEvidence)) {
    if (!requiredSandboxIntegrationNonAuthorizationEvidenceKeys.includes(key)) {
      findings.push(
        blocker(
          "non-authorization-evidence-unexpected-field",
          `Non-authorization evidence contains an unexpected field: ${key}.`,
          "$.nonAuthorizationEvidence",
        ),
      );
    }
  }

  return findings;
}

function normalizeSandboxArtifacts(conceptualArtifacts) {
  if (!Array.isArray(conceptualArtifacts)) {
    return [];
  }

  return conceptualArtifacts.filter(isRecord).map((artifact) => ({
    artifactType: artifact.artifactType ?? null,
    agentId: artifact.agentId ?? null,
    targetLevel: artifact.targetLevel === true,
    conceptualOutputPath: artifact.conceptualOutputPath ?? null,
    templateReference: artifact.templateReference ?? null,
    managed: artifact.managed === true,
    ownership: artifact.ownership ?? null,
    materialized: artifact.materialized === true,
    writeAttempted: artifact.writeAttempted === true,
  }));
}

function buildCanonicalAgentMatrix(
  suppliedAgents,
  copilotArtifacts,
  codexArtifacts,
  targetLevelArtifacts,
) {
  const agents = Array.isArray(suppliedAgents) ? [...suppliedAgents] : [];
  const agentArtifacts = [...copilotArtifacts, ...codexArtifacts];
  const targetLevelArtifactNames = new Set(TARGET_LEVEL_AGENT_NAMES);

  return {
    agents,
    agentCount: agents.length,
    copilotAgentArtifactCount: copilotArtifacts.length,
    codexAgentArtifactCount: codexArtifacts.length,
    targetLevelArtifactCount: targetLevelArtifacts.length,
    targetLevelArtifactsAreAgents: agents.some((agent) =>
      targetLevelArtifactNames.has(agent),
    ),
    exactlyTwelveAgents:
      agents.length === 12 &&
      canonicalSandboxIntegrationAgents.every((agent) => agents.includes(agent)),
    exactlyTwentyFourAgentArtifacts: agentArtifacts.length === 24,
  };
}

function buildTargetMatrixSummary(copilotArtifacts, codexArtifacts) {
  const copilotAgents = copilotArtifacts.map((artifact) => artifact.agentId);
  const codexAgents = codexArtifacts.map((artifact) => artifact.agentId);

  return {
    copilotAgents,
    codexAgents,
    expectedCopilotCount: 12,
    expectedCodexCount: 12,
    actualCopilotCount: copilotArtifacts.length,
    actualCodexCount: codexArtifacts.length,
    complete:
      copilotArtifacts.length === 12 &&
      codexArtifacts.length === 12 &&
      canonicalSandboxIntegrationAgents.every(
        (agent) => copilotAgents.includes(agent) && codexAgents.includes(agent),
      ),
  };
}

function buildCodexTargetLevelArtifactSummary(targetLevelArtifacts) {
  const configToml =
    targetLevelArtifacts.find(
      (artifact) => artifact.conceptualOutputPath === CODEX_CONFIG_PATH,
    ) ?? null;
  const agentsMd =
    targetLevelArtifacts.find(
      (artifact) => artifact.conceptualOutputPath === CODEX_ROOT_INSTRUCTIONS_PATH,
    ) ?? null;

  return {
    configToml,
    agentsMd,
    expectedCount: 2,
    actualCount: targetLevelArtifacts.length,
    targetLevel:
      targetLevelArtifacts.length === 2 &&
      targetLevelArtifacts.every((artifact) => artifact.targetLevel === true),
    agentIdAbsent:
      targetLevelArtifacts.length === 2 &&
      targetLevelArtifacts.every((artifact) => artifact.agentId === null),
    complete:
      targetLevelArtifacts.length === 2 &&
      configToml !== null &&
      agentsMd !== null &&
      targetLevelArtifacts.every(
        (artifact) => artifact.targetLevel === true && artifact.agentId === null,
      ),
  };
}

function buildPackageLevelCompatibility(
  status,
  canonicalAgentMatrix,
  targetMatrixSummary,
  codexTargetLevelArtifactSummary,
) {
  const compatible =
    status === SANDBOX_INTEGRATION_MAPPER_PASS &&
    canonicalAgentMatrix.exactlyTwelveAgents &&
    canonicalAgentMatrix.exactlyTwentyFourAgentArtifacts &&
    canonicalAgentMatrix.targetLevelArtifactsAreAgents === false &&
    targetMatrixSummary.complete &&
    codexTargetLevelArtifactSummary.complete;

  return {
    compatible,
    compatibilityKind: "package-level-structural-compatibility",
    structuralCompatibilityOnly: true,
    packageLevel: true,
    inMemoryOnly: true,
    noWrite: true,
    nonAuthorizing: true,
    packageOrchestratorExecuted: false,
    canonicalAgentsPreserved: canonicalAgentMatrix.exactlyTwelveAgents,
    agentArtifactsPreserved: canonicalAgentMatrix.exactlyTwentyFourAgentArtifacts,
    targetLevelArtifactsPreservedAsNonAgents:
      codexTargetLevelArtifactSummary.complete &&
      canonicalAgentMatrix.targetLevelArtifactsAreAgents === false,
    templatesExplicit: true,
    templatesNotInferred: true,
    templatesNotRead: true,
  };
}

function buildReviewLayerCompatibility(status) {
  return {
    compatible: status === SANDBOX_INTEGRATION_MAPPER_PASS,
    compatibilityKind: "review-layer-structural-compatibility",
    structuralCompatibilityOnly: true,
    reviewLayerExecuted: false,
    inMemoryOnly: true,
    noWrite: true,
    nonAuthorizing: true,
    reviewPassAuthorizesWrite: false,
    realTargetAccessed: false,
    githubAccessed: false,
    productiveSkillAccessed: false,
  };
}

function buildDryRunMaterializerCompatibility(status) {
  return {
    compatible: status === SANDBOX_INTEGRATION_MAPPER_PASS,
    compatibilityKind: "dry-run-materializer-structural-compatibility",
    structuralCompatibilityOnly: true,
    dryRunMaterializerExecuted: false,
    inMemoryOnly: true,
    noWrite: true,
    nonAuthorizing: true,
    realMaterializationAuthorized: false,
    generatedOutputCreated: false,
    materializedOutputCreated: false,
    outputPersisted: false,
    persistentReportWritten: false,
    rendererExecuted: false,
    writerExecuted: false,
    loaderExecuted: false,
    targetAdapterExecuted: false,
    writeApprovalExecuted: false,
    runtimePayloadCreated: false,
    cliPayloadCreated: false,
    officialSchemaCreated: false,
    stdoutContractCreated: false,
  };
}

function noWriteEvidenceIsExact(noWriteEvidence) {
  return validateNoWriteEvidence(noWriteEvidence).length === 0;
}

function nonAuthorizationEvidenceIsExact(nonAuthorizationEvidence) {
  return validateNonAuthorizationEvidence(nonAuthorizationEvidence).length === 0;
}

function cloneNoWriteEvidence(noWriteEvidence) {
  return Object.fromEntries(
    Object.entries(requiredSandboxIntegrationNoWriteEvidence).map(([key, expected]) => [
      key,
      Array.isArray(expected) ? [...noWriteEvidence[key]] : noWriteEvidence[key],
    ]),
  );
}

function cloneNonAuthorizationEvidence(nonAuthorizationEvidence) {
  return Object.fromEntries(
    requiredSandboxIntegrationNonAuthorizationEvidenceKeys.map((key) => [
      key,
      nonAuthorizationEvidence[key],
    ]),
  );
}

function isExplicitUnsafeSignalKey(normalizedKey, currentValue) {
  if (normalizedKey !== "unsafesignals" && normalizedKey !== "unsafesignal") {
    return false;
  }

  if (Array.isArray(currentValue)) {
    return currentValue.length > 0;
  }

  if (typeof currentValue === "string") {
    return currentValue.length > 0;
  }

  return currentValue === true;
}

function isSafeTrueKey(normalizedKey) {
  return (
    SAFE_TRUE_KEYS.has(normalizedKey) ||
    normalizedKey.startsWith("no") ||
    normalizedKey.endsWith("denied")
  );
}

function visitDeep(value, visitor, path = "$", key = "") {
  visitor({ key, currentValue: value, path });

  if (Array.isArray(value)) {
    value.forEach((item, index) =>
      visitDeep(item, visitor, `${path}[${index}]`, String(index)),
    );
    return;
  }

  if (!isRecord(value)) {
    return;
  }

  for (const [childKey, childValue] of Object.entries(value)) {
    visitDeep(childValue, visitor, `${path}.${childKey}`, childKey);
  }
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
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function dedupeFindings(findings) {
  const seen = new Set();
  const result = [];

  for (const finding of findings) {
    const key = `${finding.code}:${finding.path}:${finding.message}`;

    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    result.push(finding);
  }

  return result;
}
