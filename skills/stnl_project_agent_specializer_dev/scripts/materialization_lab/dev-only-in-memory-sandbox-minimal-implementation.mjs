export const sandboxMinimalImplementationPhase =
  "MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_SANDBOX_MINIMAL_IMPLEMENTATION_PHASE";

export const SANDBOX_MINIMAL_IMPLEMENTATION_PASS = "PASS";
export const SANDBOX_MINIMAL_IMPLEMENTATION_BLOCKED = "BLOCKED";

export const canonicalSandboxAgents = Object.freeze([
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

export const requiredSandboxTemplateReferences = Object.freeze([
  "reference/templates/copilot/agent.md",
  "reference/templates/codex/agent.toml",
  "reference/templates/codex/config.toml",
  "reference/templates/codex/AGENTS.md",
]);

export const requiredNoWriteEvidence = Object.freeze({
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

export const requiredNonAuthorizationEvidenceKeys = Object.freeze([
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
  "config.toml",
]);

const FORBIDDEN_TRUE_KEY_FRAGMENTS = Object.freeze([
  "authorized",
  "authorization",
  "sandboxmaterializationexecuted",
  "targetreadattempted",
  "targetwriteattempted",
  "filesystemstatattempted",
  "directorylistingattempted",
  "filecontentreadattempted",
  "githubwriteattempted",
  "productiveskillmutationattempted",
  "approvaltokenissued",
  "writeexecuted",
  "patchapplied",
  "commitcreated",
  "branchcreated",
  "pullrequestcreated",
  "materialized",
  "writeattempted",
  "targetreal",
  "realtarget",
  "githubwrite",
  "productiveskill",
  "persistentreport",
  "persistentoutput",
  "generatedoutput",
  "materializedoutput",
  "aggregatorchange",
  "checkercreation",
  "tenthcheck",
]);

const FORBIDDEN_NON_EMPTY_STRING_KEY_FRAGMENTS = Object.freeze([
  "targetrealpath",
  "realtargetpath",
  "targetrealroot",
  "realtargetroot",
  "targetroot",
  "persistentreportpath",
  "persistentoutputpath",
  "generatedoutputpath",
  "materializedoutputpath",
]);

export function buildSandboxNoWriteEvidence() {
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

export function buildSandboxNonAuthorizationEvidence() {
  return Object.fromEntries(
    requiredNonAuthorizationEvidenceKeys.map((key) => [key, false]),
  );
}

export function buildSandboxTargetLevelArtifacts() {
  return [
    {
      artifactType: "codex-config",
      agentId: null,
      targetLevel: true,
      conceptualOutputPath: CODEX_CONFIG_PATH,
      templateReference: CODEX_CONFIG_TEMPLATE,
      managed: true,
      ownership: "conceptual-dev-only-managed-no-write",
      materialized: false,
      writeAttempted: false,
    },
    {
      artifactType: "codex-root-instructions",
      agentId: null,
      targetLevel: true,
      conceptualOutputPath: CODEX_ROOT_INSTRUCTIONS_PATH,
      templateReference: CODEX_ROOT_INSTRUCTIONS_TEMPLATE,
      managed: true,
      ownership: "conceptual-dev-only-managed-no-write",
      materialized: false,
      writeAttempted: false,
    },
  ];
}

export function buildSandboxAgentArtifacts() {
  return canonicalSandboxAgents.flatMap((agentId) => [
    {
      artifactType: "copilot-agent",
      agentId,
      targetLevel: false,
      conceptualOutputPath: `.github/agents/${agentId}.agent.md`,
      templateReference: COPILOT_AGENT_TEMPLATE,
      managed: true,
      ownership: "conceptual-dev-only-managed-no-write",
      materialized: false,
      writeAttempted: false,
    },
    {
      artifactType: "codex-agent",
      agentId,
      targetLevel: false,
      conceptualOutputPath: `.codex/agents/${agentId}.toml`,
      templateReference: CODEX_AGENT_TEMPLATE,
      managed: true,
      ownership: "conceptual-dev-only-managed-no-write",
      materialized: false,
      writeAttempted: false,
    },
  ]);
}

export function buildSandboxConceptualArtifacts() {
  return [
    ...buildSandboxAgentArtifacts(),
    ...buildSandboxTargetLevelArtifacts(),
  ];
}

export function createSandboxMinimalImplementationPlan(input = {}) {
  const diagnostics = [];

  if (!isRecord(input)) {
    diagnostics.push(blocker("invalid-input", "Input must be an in-memory object.", "$"));
  }

  const safeInput = isRecord(input) ? input : {};
  const suppliedAgents = Object.hasOwn(safeInput, "canonicalAgents")
    ? safeInput.canonicalAgents
    : canonicalSandboxAgents;
  const suppliedTemplateReferences = Object.hasOwn(safeInput, "templateReferences")
    ? safeInput.templateReferences
    : requiredSandboxTemplateReferences;
  const suppliedConceptualArtifacts = Object.hasOwn(safeInput, "conceptualArtifacts")
    ? safeInput.conceptualArtifacts
    : buildSandboxConceptualArtifacts();
  const suppliedTargetLevelArtifacts = Object.hasOwn(safeInput, "targetLevelArtifacts")
    ? safeInput.targetLevelArtifacts
    : buildSandboxTargetLevelArtifacts();
  const suppliedNoWriteEvidence = Object.hasOwn(safeInput, "noWriteEvidence")
    ? safeInput.noWriteEvidence
    : buildSandboxNoWriteEvidence();
  const suppliedNonAuthorizationEvidence = Object.hasOwn(
    safeInput,
    "nonAuthorizationEvidence",
  )
    ? safeInput.nonAuthorizationEvidence
    : buildSandboxNonAuthorizationEvidence();

  diagnostics.push(...validateCanonicalAgents(suppliedAgents));
  diagnostics.push(...validateTemplateReferences(suppliedTemplateReferences));
  diagnostics.push(
    ...validateConceptualArtifacts(
      suppliedConceptualArtifacts,
      suppliedTargetLevelArtifacts,
      suppliedTemplateReferences,
    ),
  );
  diagnostics.push(...validateNoWriteEvidence(suppliedNoWriteEvidence));
  diagnostics.push(
    ...validateNonAuthorizationEvidence(suppliedNonAuthorizationEvidence),
  );
  diagnostics.push(...detectUnsafeSignals(safeInput));

  const blocked = diagnostics.some((diagnostic) => diagnostic.severity === "blocker");
  const status = blocked
    ? SANDBOX_MINIMAL_IMPLEMENTATION_BLOCKED
    : SANDBOX_MINIMAL_IMPLEMENTATION_PASS;
  const conceptualArtifacts = buildSandboxConceptualArtifacts();
  const targetLevelArtifacts = buildSandboxTargetLevelArtifacts();

  return {
    phase: sandboxMinimalImplementationPhase,
    status,
    canonicalAgents: [...canonicalSandboxAgents],
    conceptualArtifacts,
    targetLevelArtifacts,
    boundaries: {
      devOnly: true,
      sandboxOnly: true,
      inMemoryOnly: true,
      standalone: true,
      packageLevel: true,
      noWrite: true,
      nonAuthorizing: true,
      noTargetReal: true,
      noGitHub: true,
      noProductiveSkill: true,
      noRenderer: true,
      noWriter: true,
      noLoader: true,
      noTargetAdapter: true,
      noWriteApproval: true,
      noRuntime: true,
      noCli: true,
      noOfficialSchema: true,
      noStdoutContract: true,
      noAggregatorChange: true,
      noCheckerCreation: true,
      noTenthCheck: true,
      materializationExecuted: false,
      sandboxMaterializationExecuted: false,
      targetLevelArtifactsAreAgents: false,
    },
    noWriteEvidence: buildSandboxNoWriteEvidence(),
    nonAuthorizationEvidence: buildSandboxNonAuthorizationEvidence(),
    failClosed: {
      enforced: true,
      blocked,
      reasonCodes: diagnostics.map((diagnostic) => diagnostic.code),
    },
    diagnostics: {
      findings: diagnostics,
      counts: {
        canonicalAgents: canonicalSandboxAgents.length,
        copilotAgentArtifacts: conceptualArtifacts.filter(
          (artifact) => artifact.artifactType === "copilot-agent",
        ).length,
        codexAgentArtifacts: conceptualArtifacts.filter(
          (artifact) => artifact.artifactType === "codex-agent",
        ).length,
        targetLevelArtifacts: targetLevelArtifacts.length,
        totalConceptualArtifacts: conceptualArtifacts.length,
      },
    },
    notes: [
      "Result is an in-memory conceptual sandbox plan only.",
      "No template content is read; template references are explicit conceptual IDs.",
      "No Target real, GitHub, productive skill, renderer, writer, loader, Target Adapter, Write Approval, runtime, CLI, official schema, stdout contract, Aggregator change, checker, or tenth check is authorized.",
    ],
    recommendation:
      status === SANDBOX_MINIMAL_IMPLEMENTATION_PASS
        ? "MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_SANDBOX_MINIMAL_IMPLEMENTATION_AUDIT"
        : "Remain blocked until the in-memory proposal satisfies all sandbox no-write and non-authorization boundaries.",
  };
}

function validateCanonicalAgents(agents) {
  const findings = [];

  if (!Array.isArray(agents)) {
    return [
      blocker(
        "canonical-agents-not-array",
        "Canonical agents must be provided as an in-memory array.",
        "$.canonicalAgents",
      ),
    ];
  }

  if (agents.length !== canonicalSandboxAgents.length) {
    findings.push(
      blocker(
        "canonical-agent-count-mismatch",
        "The canonical model must contain exactly 12 agents.",
        "$.canonicalAgents",
      ),
    );
  }

  const agentSet = new Set(agents);

  if (agentSet.size !== agents.length) {
    findings.push(
      blocker(
        "duplicate-canonical-agent",
        "The canonical agent list must not contain duplicates.",
        "$.canonicalAgents",
      ),
    );
  }

  for (const agent of canonicalSandboxAgents) {
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

    if (!canonicalSandboxAgents.includes(agent)) {
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

function validateTemplateReferences(templateReferences) {
  const findings = [];

  if (!Array.isArray(templateReferences)) {
    return [
      blocker(
        "template-references-not-array",
        "Template references must be an explicit in-memory array.",
        "$.templateReferences",
      ),
    ];
  }

  for (const templateReference of requiredSandboxTemplateReferences) {
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

  return findings;
}

function validateConceptualArtifacts(
  conceptualArtifacts,
  targetLevelArtifacts,
  templateReferences,
) {
  const findings = [];

  if (!Array.isArray(conceptualArtifacts)) {
    return [
      blocker(
        "conceptual-artifacts-not-array",
        "Conceptual artifacts must be an in-memory array.",
        "$.conceptualArtifacts",
      ),
    ];
  }

  if (!Array.isArray(targetLevelArtifacts)) {
    findings.push(
      blocker(
        "target-level-artifacts-not-array",
        "Target-level artifacts must be an in-memory array.",
        "$.targetLevelArtifacts",
      ),
    );
  }

  const templateReferenceSet = new Set(
    Array.isArray(templateReferences) ? templateReferences : [],
  );

  for (const [index, artifact] of conceptualArtifacts.entries()) {
    const path = `$.conceptualArtifacts[${index}]`;

    if (!isRecord(artifact)) {
      findings.push(
        blocker(
          "conceptual-artifact-not-object",
          "Conceptual artifact entries must be in-memory objects.",
          path,
        ),
      );
      continue;
    }

    if (!artifact.artifactType) {
      findings.push(
        blocker("artifact-type-missing", "Artifact type is required.", path),
      );
    }

    if (!artifact.templateReference) {
      findings.push(
        blocker(
          "artifact-template-reference-missing",
          "Artifact templateReference must be explicit.",
          path,
        ),
      );
    } else if (!templateReferenceSet.has(artifact.templateReference)) {
      findings.push(
        blocker(
          "artifact-template-reference-not-explicit",
          "Artifact templateReference must be present in the explicit template reference list.",
          path,
        ),
      );
    }

    if (artifact.materialized !== false) {
      findings.push(
        blocker(
          "artifact-materialized-not-false",
          "Conceptual artifacts must not be marked as materialized.",
          path,
        ),
      );
    }

    if (artifact.writeAttempted !== false) {
      findings.push(
        blocker(
          "artifact-write-attempted-not-false",
          "Conceptual artifacts must not be marked as writeAttempted.",
          path,
        ),
      );
    }

    if (artifact.managed !== true) {
      findings.push(
        blocker(
          "artifact-managed-not-true",
          "Conceptual artifacts must declare managed ownership.",
          path,
        ),
      );
    }

    if (!artifact.ownership) {
      findings.push(
        blocker(
          "artifact-ownership-missing",
          "Conceptual artifacts must declare ownership.",
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

      if (artifact.agentId !== null && artifact.agentId !== undefined) {
        findings.push(
          blocker(
            "target-level-artifact-has-agent-id",
            "Target-level artifacts must not carry an agentId.",
            path,
          ),
        );
      }
    } else if (artifact.targetLevel === true) {
      findings.push(
        blocker(
          "agent-artifact-marked-target-level",
          "Only .codex/config.toml and AGENTS.md may be target-level artifacts.",
          path,
        ),
      );
    } else if (!canonicalSandboxAgents.includes(artifact.agentId)) {
      findings.push(
        blocker(
          "agent-artifact-agent-id-invalid",
          "Agent artifacts must reference one of the 12 canonical agents.",
          path,
        ),
      );
    }
  }

  findings.push(...validateArtifactMatrix(conceptualArtifacts));
  findings.push(...validateTargetLevelArtifactList(targetLevelArtifacts));

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

  if (targetLevelArtifacts.length !== 2) {
    findings.push(
      blocker(
        "target-level-artifact-count-mismatch",
        "Exactly 2 target-level artifacts are required.",
        "$.conceptualArtifacts",
      ),
    );
  }

  for (const requiredPath of TARGET_LEVEL_OUTPUT_PATHS) {
    const artifact = targetLevelArtifacts.find(
      (candidate) => candidate.conceptualOutputPath === requiredPath,
    );

    if (!artifact) {
      findings.push(
        blocker(
          "missing-target-level-artifact",
          `Missing target-level artifact: ${requiredPath}.`,
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

  if (artifacts.length !== canonicalSandboxAgents.length) {
    findings.push(
      blocker(
        `${family}-artifact-count-mismatch`,
        `Exactly 12 ${family} agent artifacts are required.`,
        "$.conceptualArtifacts",
      ),
    );
  }

  for (const agentId of canonicalSandboxAgents) {
    const matches = artifacts.filter((artifact) => artifact.agentId === agentId);

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
    const expectedPath = expectedPathForAgent(agentId);

    if (artifact.conceptualOutputPath !== expectedPath) {
      findings.push(
        blocker(
          `${family}-artifact-path-mismatch`,
          `${family} artifact path is not the expected conceptual output path for ${agentId}.`,
          "$.conceptualArtifacts",
        ),
      );
    }

    if (artifact.templateReference !== expectedTemplateReference) {
      findings.push(
        blocker(
          `${family}-artifact-template-mismatch`,
          `${family} artifact template reference is not explicit and canonical for ${agentId}.`,
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
        "The targetLevelArtifacts field must contain exactly 2 entries.",
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
    } else if (artifact.agentId !== null && artifact.agentId !== undefined) {
      findings.push(
        blocker(
          "target-level-artifacts-list-agent-id-present",
          "Target-level artifacts must not include agentId.",
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
        "no-write-evidence-not-object",
        "No-write evidence must be an in-memory object.",
        "$.noWriteEvidence",
      ),
    ];
  }

  const expectedKeys = Object.keys(requiredNoWriteEvidence);
  const actualKeys = Object.keys(noWriteEvidence);
  const unexpectedKeys = actualKeys.filter((key) => !expectedKeys.includes(key));

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

    const expectedValue = requiredNoWriteEvidence[key];
    const actualValue = noWriteEvidence[key];

    if (Array.isArray(expectedValue)) {
      if (!Array.isArray(actualValue) || actualValue.length !== 0) {
        findings.push(
          blocker(
            "no-write-evidence-field-not-empty-array",
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

  for (const key of unexpectedKeys) {
    findings.push(
      blocker(
        "no-write-evidence-unexpected-field",
        `No-write evidence contains an unexpected field: ${key}.`,
        "$.noWriteEvidence",
      ),
    );
  }

  return findings;
}

function validateNonAuthorizationEvidence(nonAuthorizationEvidence) {
  const findings = [];

  if (!isRecord(nonAuthorizationEvidence)) {
    return [
      blocker(
        "non-authorization-evidence-not-object",
        "Non-authorization evidence must be an in-memory object.",
        "$.nonAuthorizationEvidence",
      ),
    ];
  }

  for (const key of requiredNonAuthorizationEvidenceKeys) {
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

  for (const [key, value] of Object.entries(nonAuthorizationEvidence)) {
    if (!requiredNonAuthorizationEvidenceKeys.includes(key) && value === true) {
      findings.push(
        blocker(
          "unexpected-authorization-flag-true",
          `Unexpected authorization-like flag is true: ${key}.`,
          "$.nonAuthorizationEvidence",
        ),
      );
    }
  }

  return findings;
}

function detectUnsafeSignals(value) {
  const findings = [];

  visitDeep(value, ({ key, currentValue, path }) => {
    const normalizedKey = normalizeKey(key);

    if (
      currentValue === true &&
      FORBIDDEN_TRUE_KEY_FRAGMENTS.some((fragment) =>
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
      FORBIDDEN_NON_EMPTY_STRING_KEY_FRAGMENTS.some((fragment) =>
        normalizedKey.includes(fragment),
      )
    ) {
      findings.push(
        blocker(
          "forbidden-real-path-or-persistent-output-signal",
          `Forbidden real path or persistent output signal detected at ${path}.`,
          path,
        ),
      );
    }
  });

  return dedupeFindings(findings);
}

function visitDeep(value, visitor, path = "$", key = "") {
  visitor({ key, currentValue: value, path });

  if (Array.isArray(value)) {
    value.forEach((item, index) => visitDeep(item, visitor, `${path}[${index}]`, String(index)));
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
