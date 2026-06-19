#!/usr/bin/env node

import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const skillRoot = path.resolve(scriptDir, "../..");

const rel = (...parts) => parts.join("/");
const abs = (relativePath) => path.join(skillRoot, relativePath);

const failures = [];
const textCache = new Map();

const materializationContracts = [
  "TARGETS_CONTRACT.md",
  "SOURCE_MODEL_CONTRACT.md",
  "TEMPLATES_AND_OUTPUTS_CONTRACT.md",
  "RENDERING_AND_COMPOSITION_CONTRACT.md",
  "DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md",
  "DRY_RUN_REPORT_MODEL_CONTRACT.md",
  "MATERIALIZER_INTERFACE_CONTRACT.md",
  "TARGET_ADAPTER_CONTRACT.md",
  "WRITE_APPROVAL_PROTOCOL_CONTRACT.md",
  "DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_CONTRACT.md",
  "VALIDATION_HARNESS_CONTRACT.md",
  "VALIDATION_HARNESS_AGGREGATOR_CONTRACT.md",
  "IMPLEMENTATION_BOUNDARY_CONTRACT.md",
  "FIXTURE_BOUNDARY_CONTRACT.md",
];

const validationFiles = [
  "STATIC_CHECKS.md",
  "GOLDEN_SCENARIOS.md",
  "EXCELLENT_PASS_EXPECTATIONS.md",
];

const fixtureRenderDryRunIntegrationChecker =
  "scripts/materialization_lab/check-fixture-render-dry-run-integration.mjs";
const validationHarnessAggregatorChecker =
  "scripts/materialization_lab/check-validation-harness-aggregator.mjs";

const aggregatorPassVerdict =
  "MATERIALIZATION_VALIDATION_HARNESS_AGGREGATOR_CHECK: PASS";
const aggregatorBlockedVerdict =
  "MATERIALIZATION_VALIDATION_HARNESS_AGGREGATOR_CHECK: BLOCKED";

const aggregatorChildChecks = [
  {
    relativePath: "scripts/materialization_lab/check-static.mjs",
    expectedStdout: "MATERIALIZATION_STATIC_CONTRACT_CHECK: PASS",
  },
  {
    relativePath: "scripts/materialization_lab/check-source-inventory.mjs",
    expectedStdout: "MATERIALIZATION_SOURCE_INVENTORY_CHECK: PASS",
  },
  {
    relativePath: "scripts/materialization_lab/check-template-coverage.mjs",
    expectedStdout: "MATERIALIZATION_TEMPLATE_COVERAGE_CHECK: PASS",
  },
  {
    relativePath: "scripts/materialization_lab/check-fixture-boundary.mjs",
    expectedStdout: "MATERIALIZATION_FIXTURE_BOUNDARY_CHECK: PASS",
  },
  {
    relativePath: "scripts/materialization_lab/check-lazy-load-fixtures.mjs",
    expectedStdout: "MATERIALIZATION_LAZY_LOAD_FIXTURE_CHECK: PASS",
  },
  {
    relativePath: "scripts/materialization_lab/check-project-scenarios.mjs",
    expectedStdout: "MATERIALIZATION_PROJECT_SCENARIO_FIXTURE_CHECK: PASS",
  },
  {
    relativePath: "scripts/materialization_lab/check-render-context.mjs",
    expectedStdout: "MATERIALIZATION_RENDER_CONTEXT_CHECK: PASS",
  },
  {
    relativePath: "scripts/materialization_lab/check-dry-run-plan.mjs",
    expectedStdout: "MATERIALIZATION_DRY_RUN_PLAN_CHECK: PASS",
  },
  {
    relativePath:
      "scripts/materialization_lab/check-fixture-render-dry-run-integration.mjs",
    expectedStdout:
      "MATERIALIZATION_FIXTURE_RENDER_DRY_RUN_INTEGRATION_CHECK: PASS",
  },
];

const fixtureSkeletonFiles = [
  "reference/materialization_lab/fixtures/README.md",
  "reference/materialization_lab/fixtures/FIXTURE_SCHEMA.md",
  "reference/materialization_lab/fixtures/projects/README.md",
  "reference/materialization_lab/fixtures/expected_outputs/README.md",
  "reference/materialization_lab/fixtures/lazy_load/README.md",
  "reference/materialization_lab/fixtures/blocked_cases/README.md",
];

const fixtureCategoryDirs = [
  "projects",
  "expected_outputs",
  "lazy_load",
  "blocked_cases",
];

const authorizedFixtureEntries = {
  projects: [
    "backend_only_happy",
    "frontend_only_happy",
    "ios_only_happy",
    "fullstack_be_fe_happy",
    "fullstack_be_ios_happy",
    "fullstack_be_fe_ios_happy",
  ],
  expected_outputs: [
    "SNAPSHOT_POLICY.md",
    "minimal_copilot_agent_snapshot",
    "minimal_codex_agent_snapshot",
    "minimal_codex_config_snapshot",
    "minimal_agents_md_snapshot",
  ],
  lazy_load: [
    "non_trivial_loads_01",
    "decision_loads_02",
    "risk_loads_03",
    "output_loads_04",
    "load_all_default_blocks",
    "module_03_missing_risk_blocks",
    "module_04_missing_output_blocks",
    "trace_missing_blocks",
  ],
  blocked_cases: [
    "missing_template",
    "inferred_template",
    "forbidden_target_path",
    "reference_agents_final_source",
    "write_github_real",
    "write_codex_real",
    "write_agents_md_real",
    "runtime_materializer_created",
    "productive_skill_mutation",
    "github_write",
  ],
};

const templates = [
  "reference/templates/copilot/agent.md",
  "reference/templates/codex/agent.toml",
  "reference/templates/codex/config.toml",
  "reference/templates/codex/AGENTS.md",
];

const agents = [
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

const profileByAgent = new Map([
  ["orchestrator", "orchestrator_profile"],
  ["planner", "planner_profile"],
  ["validation-eval-designer", "validation_eval_designer_profile"],
  ["execution-package-designer", "execution_package_designer_profile"],
  ["designer", "designer_profile"],
  ["coder-frontend", "coder_frontend_profile"],
  ["coder-backend", "coder_backend_profile"],
  ["coder-ios", "coder_ios_profile"],
  ["validation-runner", "validation_runner_profile"],
  ["reviewer", "reviewer_profile"],
  ["finalizer", "finalizer_profile"],
  ["resync", "resync_profile"],
]);

const kernelByAgent = new Map([
  ["orchestrator", "orchestrator_kernel"],
  ["planner", "planner_kernel"],
  ["validation-eval-designer", "validation_eval_designer_kernel"],
  ["execution-package-designer", "execution_package_designer_kernel"],
  ["designer", "designer_kernel"],
  ["coder-frontend", "coder_frontend_kernel"],
  ["coder-backend", "coder_backend_kernel"],
  ["coder-ios", "coder_ios_kernel"],
  ["validation-runner", "validation_runner_kernel"],
  ["reviewer", "reviewer_kernel"],
  ["finalizer", "finalizer_kernel"],
  ["resync", "resync_kernel"],
]);

const commonPlaceholders = [
  "{{AGENT_ID}}",
  "{{AGENT_NAME}}",
  "{{AGENT_DESCRIPTION}}",
  "{{AGENT_BODY}}",
  "{{TARGET_ID}}",
  "{{GENERATED_NOTICE}}",
  "{{SOURCE_VERSION}}",
];

const copilotPlaceholders = [
  "{{AGENT_TOOLS}}",
  "{{AGENT_MODEL}}",
  "{{SPECIALIZATION_REVISION}}",
  "{{COPILOT_ORCHESTRATOR_AGENTS_BLOCK}}",
  "{{READING_SCOPE_CLASS_BLOCK}}",
];

const codexPlaceholders = [
  "{{AGENT_MODEL}}",
  "{{MODEL_REASONING_EFFORT}}",
  "{{SANDBOX_MODE}}",
];

const plannedOperations = [
  "CREATE_PLANNED",
  "UPDATE_PLANNED",
  "UNCHANGED_PLANNED",
  "BLOCKED_PLANNED",
];

const executedOperations = [
  "CREATE_EXECUTED",
  "UPDATE_EXECUTED",
  "DELETE_EXECUTED",
  "WRITE_EXECUTED",
];

const validationStatuses = [
  "VALIDATION_PASS",
  "VALIDATION_BLOCKED",
  "VALIDATION_FAILED",
];

const blockCodesByContract = {
  "reference/materialization_lab/contracts/SOURCE_MODEL_CONTRACT.md": [
    "BLOCKED_SOURCE_MODEL_INVALID",
    "BLOCKED_BASE_AGENT_FINAL_DEPENDENCY",
    "BLOCKED_KERNEL_SOURCE_MISSING",
    "BLOCKED_KERNEL_COVERAGE_INCOMPLETE",
    "BLOCKED_PARITY_BASELINE_REQUIRED_AS_FINAL_SOURCE",
    "BLOCKED_SOURCE_MODEL_DEPRECATED_FIELD",
  ],
  "reference/materialization_lab/contracts/TEMPLATES_AND_OUTPUTS_CONTRACT.md": [
    "BLOCKED_TEMPLATE_MISSING",
  ],
  "reference/materialization_lab/contracts/RENDERING_AND_COMPOSITION_CONTRACT.md": [
    "BLOCKED_SOURCE_MODEL_INVALID",
    "BLOCKED_BASE_AGENT_FINAL_DEPENDENCY",
    "BLOCKED_KERNEL_SOURCE_MISSING",
    "BLOCKED_KERNEL_COVERAGE_INCOMPLETE",
    "BLOCKED_PARITY_BASELINE_REQUIRED_AS_FINAL_SOURCE",
    "BLOCKED_SOURCE_MODEL_DEPRECATED_FIELD",
    "BLOCKED_SOURCE_MISSING",
    "BLOCKED_TEMPLATE_MISSING",
    "BLOCKED_PLACEHOLDER_MISSING",
    "BLOCKED_UNSAFE_RENDER",
    "BLOCKED_COMPOSITION_CONFLICT",
  ],
  "reference/materialization_lab/contracts/DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md": [
    "BLOCKED_TARGET_ROOT_INVALID",
    "BLOCKED_PATH_UNSAFE",
    "BLOCKED_UNMANAGED_COLLISION",
    "BLOCKED_INVALID_MANAGED_NOTICE",
    "BLOCKED_DRY_RUN_REQUIRED",
    "BLOCKED_SOURCE_MODEL_INVALID",
    "BLOCKED_BASE_AGENT_FINAL_DEPENDENCY",
    "BLOCKED_KERNEL_SOURCE_MISSING",
    "BLOCKED_KERNEL_COVERAGE_INCOMPLETE",
    "BLOCKED_PARITY_BASELINE_REQUIRED_AS_FINAL_SOURCE",
    "BLOCKED_SOURCE_MODEL_DEPRECATED_FIELD",
    "BLOCKED_SOURCE_MISSING",
    "BLOCKED_TEMPLATE_MISSING",
    "BLOCKED_PLACEHOLDER_MISSING",
    "BLOCKED_UNSAFE_RENDER",
    "BLOCKED_COMPOSITION_CONFLICT",
  ],
  "reference/materialization_lab/contracts/VALIDATION_HARNESS_CONTRACT.md": [
    "BLOCKED_VALIDATION_WRITE_ATTEMPT",
    "BLOCKED_PRODUCTIVE_SKILL_MUTATION",
    "BLOCKED_TARGET_FILE_MUTATION",
    "BLOCKED_MATRIX_INCOMPLETE",
    "BLOCKED_UNKNOWN_BLOCK_CODE",
    "BLOCKED_TEMPLATE_INFERRED",
    "BLOCKED_RUNTIME_MATERIALIZER_CREATED",
    "BLOCKED_GITHUB_WRITE",
    "BLOCKED_FIXTURE_ROOT_MISSING",
    "BLOCKED_FIXTURE_SCHEMA_MISSING",
    "BLOCKED_FIXTURE_PATH_TRAVERSAL",
    "BLOCKED_FIXTURE_ABSOLUTE_PATH",
  ],
  "reference/materialization_lab/contracts/VALIDATION_HARNESS_AGGREGATOR_CONTRACT.md": [
    "BLOCKED_AGGREGATOR_UNKNOWN_CHECK",
    "BLOCKED_AGGREGATOR_CHECK_SKIPPED",
    "BLOCKED_AGGREGATOR_CHECK_FAILED",
    "BLOCKED_AGGREGATOR_CHECK_OUTPUT_UNRECOGNIZED",
    "BLOCKED_AGGREGATOR_EXIT_CODE_MISMATCH",
    "BLOCKED_AGGREGATOR_TARGET_ARG",
    "BLOCKED_AGGREGATOR_REPORT_UNAUTHORIZED",
    "BLOCKED_AGGREGATOR_RUNTIME_SCOPE",
    "BLOCKED_AGGREGATOR_DEPENDENCY_ORDER",
    "BLOCKED_AGGREGATOR_TIMEOUT",
    "BLOCKED_AGGREGATOR_STDERR_UNEXPECTED",
    "BLOCKED_AGGREGATOR_ARGUMENT_UNSUPPORTED",
    "BLOCKED_AGGREGATOR_CHILD_PROCESS_ERROR",
  ],
  "reference/materialization_lab/contracts/IMPLEMENTATION_BOUNDARY_CONTRACT.md": [
    "BLOCKED_IMPLEMENTATION_SCOPE_INVALID",
    "BLOCKED_SCRIPT_PATH_UNAUTHORIZED",
    "BLOCKED_SCRIPT_WRITE_CAPABILITY",
    "BLOCKED_SCRIPT_TARGET_MUTATION",
    "BLOCKED_SCRIPT_PRODUCTIVE_MUTATION",
    "BLOCKED_SCRIPT_OUTPUT_UNAUTHORIZED",
  ],
  "reference/materialization_lab/contracts/FIXTURE_BOUNDARY_CONTRACT.md": [
    "BLOCKED_FIXTURE_SCOPE_INVALID",
    "BLOCKED_FIXTURE_ROOT_MISSING",
    "BLOCKED_FIXTURE_SCHEMA_MISSING",
    "BLOCKED_FIXTURE_PATH_UNAUTHORIZED",
    "BLOCKED_FIXTURE_PATH_TRAVERSAL",
    "BLOCKED_FIXTURE_ABSOLUTE_PATH",
    "BLOCKED_FIXTURE_TARGET_REAL",
    "BLOCKED_FIXTURE_WRITE_OUTSIDE_ROOT",
    "BLOCKED_FIXTURE_OUTPUT_UNAUTHORIZED",
    "BLOCKED_FIXTURE_ESCAPES_DEV_SKILL",
  ],
};

const forbiddenAuthorizations = [
  "runtime materializer",
  "target read/write",
  "target real read/write",
  "target writes",
  "generated outputs",
  "generated final artifacts",
  "runtime fixtures",
  "fixtures outside the authorized documentary matrix",
  "fixture writes outside root",
  "paths outside the authorized fixture root",
  "persistent reports",
  "productive skill changes",
  "GitHub writes",
  "real materialization",
];

function recordFailure(message) {
  failures.push(message);
}

async function exists(relativePath) {
  try {
    await access(abs(relativePath));
    return true;
  } catch {
    return false;
  }
}

async function requireFile(relativePath) {
  if (!(await exists(relativePath))) {
    recordFailure(`missing required file: ${relativePath}`);
    return false;
  }
  return true;
}

async function readText(relativePath) {
  if (textCache.has(relativePath)) {
    return textCache.get(relativePath);
  }

  if (relativePath.includes("__MACOSX") || relativePath.endsWith(".DS_Store")) {
    recordFailure(`refusing ignored path: ${relativePath}`);
    return "";
  }

  try {
    const content = await readFile(abs(relativePath), "utf8");
    textCache.set(relativePath, content);
    return content;
  } catch (error) {
    recordFailure(`cannot read ${relativePath}: ${error.message}`);
    return "";
  }
}

function requireIncludes(content, relativePath, anchor, label = anchor) {
  if (!content.includes(anchor)) {
    recordFailure(`${relativePath} missing anchor: ${label}`);
  }
}

function requireAll(content, relativePath, anchors, groupLabel) {
  for (const anchor of anchors) {
    requireIncludes(content, relativePath, anchor, `${groupLabel}: ${anchor}`);
  }
}

function contractPath(fileName) {
  return rel("reference/materialization_lab/contracts", fileName);
}

function validationPath(fileName) {
  return rel("reference/materialization_lab/validation", fileName);
}

function hasForbiddenPositiveAuthorization(line, term) {
  const lowerLine = line.toLowerCase();
  const lowerTerm = term.toLowerCase();

  if (!lowerLine.includes("authoriz") || !lowerLine.includes(lowerTerm)) {
    return false;
  }

  const denialMarkers = [
    "does not authorize",
    "do not authorize",
    "does not grant",
    "not authorize",
    "non-authorization",
    "unauthoriz",
    "no ",
    "must not",
    "forbid",
    "forbids",
    "forbidden",
    "denies",
    "deny",
    "never authorize",
    "out of scope",
    "without",
    "future path",
    "future fixture",
    "future fixtures",
    "does not create",
    "not full",
    "only minimal documentary",
    "later step",
    "later authorization",
    "separately authorized",
    "authorized fixture root",
    "outside the authorized documentary matrix",
    "authorized fixtures",
    "blocked_",
    "future outputs",
    "only inside",
    "remain prohibited",
    "outside the authorized fixture root",
    "separate explicit authorization",
    "real write authorization",
  ];

  return !denialMarkers.some((marker) => lowerLine.includes(marker));
}

async function validateRequiredFiles() {
  await requireFile("reference/MANIFEST.md");

  for (const contract of materializationContracts) {
    await requireFile(contractPath(contract));
  }

  for (const validation of validationFiles) {
    await requireFile(validationPath(validation));
  }

  for (const fixtureFile of fixtureSkeletonFiles) {
    await requireFile(fixtureFile);
  }

  for (const template of templates) {
    await requireFile(template);
  }

  await requireFile(fixtureRenderDryRunIntegrationChecker);
  await requireFile(validationHarnessAggregatorChecker);

  for (const agent of agents) {
    await requireFile(rel("reference/kernel_lab", kernelByAgent.get(agent)));
  }

  for (const [agent, profileDir] of profileByAgent.entries()) {
    await requireFile(
      rel("reference/seniorization_lab", profileDir, "SENIOR_AGENT_PROFILE.md"),
    );
    if (!agents.includes(agent)) {
      recordFailure(`profile map contains unknown agent: ${agent}`);
    }
  }
}

async function validateContractAnchors() {
  const targets = await readText(contractPath("TARGETS_CONTRACT.md"));
  requireAll(targets, contractPath("TARGETS_CONTRACT.md"), [
    "copilot",
    "codex",
    ".github/agents",
    ".codex/agents",
    ".codex/config.toml",
    "AGENTS.md",
  ], "target anchor");

  const templatesContract = await readText(
    contractPath("TEMPLATES_AND_OUTPUTS_CONTRACT.md"),
  );
  requireAll(templatesContract, contractPath("TEMPLATES_AND_OUTPUTS_CONTRACT.md"), [
    "copilot",
    "codex",
    ".github/agents",
    ".codex/agents",
    ".codex/config.toml",
    "AGENTS.md",
    "reference/templates/copilot/agent.md",
    "reference/templates/codex/agent.toml",
    "reference/templates/codex/config.toml",
    "reference/templates/codex/AGENTS.md",
    "BLOCKED_TEMPLATE_MISSING",
  ], "template/output anchor");

  const sourceModel = await readText(contractPath("SOURCE_MODEL_CONTRACT.md"));
  requireAll(sourceModel, contractPath("SOURCE_MODEL_CONTRACT.md"), [
    "Status: documentary/dev-only contract.",
    "reference/kernel_lab/",
    "primary behavior source",
    "reference/agents/",
    "temporary development parity baseline",
    "not a final materialization source",
    "may be removed after final validation",
    "Deprecated field `base_agent_source`",
    "deprecated as a materialization source",
    "base_agent_parity_source",
    "dev-only parity validation metadata",
    "kernel_source",
    "senior_profile_source",
    "template_source",
    "target_contract_source",
    "template_contract_source",
    "rendering_contract_source",
    "target real read/write",
    "fixtures",
    "generated outputs",
    "persistent reports",
    "real materialization",
  ], "source model anchor");
  for (const [agent, kernelDir] of kernelByAgent.entries()) {
    requireAll(sourceModel, contractPath("SOURCE_MODEL_CONTRACT.md"), [
      agent,
      kernelDir,
      rel("reference/kernel_lab", kernelDir),
    ], `source model kernel mapping: ${agent}`);
  }

  const rendering = await readText(
    contractPath("RENDERING_AND_COMPOSITION_CONTRACT.md"),
  );
  requireAll(rendering, contractPath("RENDERING_AND_COMPOSITION_CONTRACT.md"), agents, "agent id");
  requireAll(rendering, contractPath("RENDERING_AND_COMPOSITION_CONTRACT.md"), [
    "reference/kernel_lab/<agent>_kernel/",
    "reference/seniorization_lab/<agent>_profile/SENIOR_AGENT_PROFILE.md",
    "reference/templates/<target>/...",
    "reference/materialization_lab/contracts/SOURCE_MODEL_CONTRACT.md",
    "reference/materialization_lab/contracts/TARGETS_CONTRACT.md",
    "reference/materialization_lab/contracts/TEMPLATES_AND_OUTPUTS_CONTRACT.md",
    "reference/materialization_lab/contracts/RENDERING_AND_COMPOSITION_CONTRACT.md",
    "primary behavior source",
    "temporary development parity baseline",
    "kernel_source",
  ], "composition source");
  requireAll(rendering, contractPath("RENDERING_AND_COMPOSITION_CONTRACT.md"), commonPlaceholders, "common placeholder");
  requireAll(rendering, contractPath("RENDERING_AND_COMPOSITION_CONTRACT.md"), copilotPlaceholders, "copilot placeholder");
  requireAll(rendering, contractPath("RENDERING_AND_COMPOSITION_CONTRACT.md"), codexPlaceholders, "codex placeholder");

  const dryRun = await readText(contractPath("DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md"));
  requireAll(dryRun, contractPath("DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md"), plannedOperations, "planned operation");
  requireAll(dryRun, contractPath("DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md"), [
    "kernel_source",
    "Deprecated field `base_agent_source`",
    "The dry-run output plan must not depend on `reference/agents/`",
  ], "dry-run source model");
  requireAll(dryRun, contractPath("DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md"), [
    ".github/agents/<agent>.agent.md",
    ".codex/agents/<agent>.toml",
    ".codex/config.toml",
    "AGENTS.md",
  ], "planned path");

  const dryRunReportModel = await readText(
    contractPath("DRY_RUN_REPORT_MODEL_CONTRACT.md"),
  );
  requireAll(
    dryRunReportModel,
    contractPath("DRY_RUN_REPORT_MODEL_CONTRACT.md"),
    [
      "Status: documentary/dev-only/read-only contract.",
      "dry_run_report",
      "report_identity",
      "report_boundary",
      "source_inventory_snapshot",
      "target_intent",
      "agent_plan_entries",
      "output_plan_entries",
      "gate_results",
      "lazy_load_trace",
      "blocking_summary",
      "no_write_evidence",
      "non_authorization_summary",
      "not a runtime payload",
      "persistent report",
      "target real read/write",
      "reference/agents/",
      "final source",
      "does not expand the Aggregator Checker",
      "Aggregator stdout must remain outside persistent report storage.",
    ],
    "dry-run report model contract",
  );
  requireAll(
    dryRunReportModel,
    contractPath("DRY_RUN_REPORT_MODEL_CONTRACT.md"),
    plannedOperations,
    "dry-run report model planned operation",
  );
  requireAll(
    dryRunReportModel,
    contractPath("DRY_RUN_REPORT_MODEL_CONTRACT.md"),
    executedOperations,
    "dry-run report model executed operation",
  );

  const materializerInterface = await readText(
    contractPath("MATERIALIZER_INTERFACE_CONTRACT.md"),
  );
  requireAll(
    materializerInterface,
    contractPath("MATERIALIZER_INTERFACE_CONTRACT.md"),
    [
      "Status: documentary/dev-only/read-only contract.",
      "dry-run-only Materializer Interface",
      "materializer_interface_request",
      "materializer_interface_result",
      "output_plan_entries",
      "dry_run_report_model_ref",
      "no_write_evidence",
      "non_authorization_summary",
      "compatibility with the existing Dry-run Report Model",
      "planned output entries",
      "runtime payload",
      "CLI contract",
      "runner",
      "real writer",
      "real renderer",
      "runtime loader",
      "runtime scenario selector",
      "target adapter",
      "write approval",
      "Target real read/write",
      "reference/agents/",
      "final source",
      "expand the Aggregator",
      "does not make the Aggregator a runtime dependency",
    ],
    "materializer interface contract",
  );
  requireAll(
    materializerInterface,
    contractPath("MATERIALIZER_INTERFACE_CONTRACT.md"),
    plannedOperations,
    "materializer interface planned operation",
  );
  requireAll(
    materializerInterface,
    contractPath("MATERIALIZER_INTERFACE_CONTRACT.md"),
    executedOperations,
    "materializer interface executed operation",
  );

  const targetAdapter = await readText(
    contractPath("TARGET_ADAPTER_CONTRACT.md"),
  );
  requireAll(targetAdapter, contractPath("TARGET_ADAPTER_CONTRACT.md"), [
    "Status: documentary/dev-only/read-only contract.",
    "future conceptual Target Adapter boundary",
    "target_adapter_request",
    "target_adapter_result",
    "target-root-relative",
    "planned output roots",
    "filesystem adapter",
    "path resolver",
    "Target reader",
    "Target writer",
    "real drift detector",
    "absolute host path",
    "path safety",
    "managed-artifact",
    "simulated_existing_state",
    "simulated_drift_state",
    "no_read_no_write_evidence",
    "non_authorization_summary",
    "Target real read/write",
    "reference/agents/",
    "final source",
    "Aggregator remains unchanged",
    "does not make the Aggregator a runtime dependency",
  ], "target adapter contract");
  requireAll(
    targetAdapter,
    contractPath("TARGET_ADAPTER_CONTRACT.md"),
    plannedOperations,
    "target adapter planned operation",
  );
  requireAll(
    targetAdapter,
    contractPath("TARGET_ADAPTER_CONTRACT.md"),
    executedOperations,
    "target adapter executed operation",
  );

  const writeApproval = await readText(
    contractPath("WRITE_APPROVAL_PROTOCOL_CONTRACT.md"),
  );
  requireAll(
    writeApproval,
    contractPath("WRITE_APPROVAL_PROTOCOL_CONTRACT.md"),
    [
      "Status: documentary/dev-only/read-only contract.",
      "conceptual Write Approval Protocol",
      "still-no-write boundary",
      "write_approval_request",
      "write_approval_result",
      "write_approval_evidence_bundle",
      "approval token",
      "approval registry",
      "real signer",
      "real writer",
      "Target writer",
      "filesystem writer",
      "approval_state",
      "APPROVAL_NOT_REQUESTED",
      "APPROVAL_CONCEPTUALLY_ELIGIBLE",
      "APPROVAL_BLOCKED",
      "APPROVAL_OUT_OF_SCOPE",
      "APPROVED",
      "WRITE_APPROVED",
      "APPROVAL_GRANTED",
      "READY_TO_WRITE",
      "WRITE_UNLOCKED",
      "EXECUTION_APPROVED",
      "MERGE_APPROVED",
      "commit, branch, or pull request",
      "no_read_no_write_evidence",
      "non_authorization_summary",
      "Target real read/write",
      "reference/agents/",
      "final source",
      "This contract introduces no tenth child check and no Aggregator policy change.",
    ],
    "write approval protocol contract",
  );
  requireAll(
    writeApproval,
    contractPath("WRITE_APPROVAL_PROTOCOL_CONTRACT.md"),
    plannedOperations,
    "write approval protocol planned operation",
  );
  requireAll(
    writeApproval,
    contractPath("WRITE_APPROVAL_PROTOCOL_CONTRACT.md"),
    executedOperations,
    "write approval protocol executed operation",
  );

  const dryRunOnlyPrototype = await readText(
    contractPath("DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_CONTRACT.md"),
  );
  requireAll(
    dryRunOnlyPrototype,
    contractPath("DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_CONTRACT.md"),
    [
      "Status: documentary/dev-only/read-only contract.",
      "Dry Run Only Materializer Prototype Contract",
      "dry_run_materializer_request",
      "dry_run_materializer_result",
      "request-boundary-normalizer",
      "contract-chain-verifier",
      "source-plan-resolver",
      "template-plan-verifier",
      "render-context-planner",
      "target-adapter-planner",
      "planned-output-builder",
      "dry-run-boundary-evaluator",
      "write-approval-protocol-evaluator",
      "dry-run-report-model-builder",
      "result-boundary-enforcer",
      "No file, code module, script, CLI, runner, executable interface, or runtime",
      "runtime materializer",
      "renderer",
      "writer",
      "loader",
      "scenario selector",
      "Target Adapter implementation",
      "Write Approval implementation",
      "approval token",
      "approval registry",
      "persistent report",
      "Target real read/write",
      "zero persistence",
      "no_read_no_write_evidence",
      "non_authorization_summary",
      "reference/agents/",
      "final source",
      "lazy-load remains a safety contract",
      "Aggregator Checker remains exactly 9 checks",
    ],
    "dry-run-only materializer prototype contract",
  );
  requireAll(
    dryRunOnlyPrototype,
    contractPath("DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_CONTRACT.md"),
    plannedOperations,
    "dry-run-only materializer prototype planned operation",
  );
  requireAll(
    dryRunOnlyPrototype,
    contractPath("DRY_RUN_ONLY_MATERIALIZER_PROTOTYPE_CONTRACT.md"),
    executedOperations,
    "dry-run-only materializer prototype executed operation",
  );

  const validation = await readText(contractPath("VALIDATION_HARNESS_CONTRACT.md"));
  requireAll(validation, contractPath("VALIDATION_HARNESS_CONTRACT.md"), validationStatuses, "validation status");
  requireAll(validation, contractPath("VALIDATION_HARNESS_CONTRACT.md"), agents, "validation matrix agent");
  requireAll(validation, contractPath("VALIDATION_HARNESS_CONTRACT.md"), [
    "source model validation",
    "kernel coverage validation",
    "12 agents x `copilot`",
    "12 agents x `codex`",
    "`codex` config",
    "`codex` root instructions",
  ], "validation matrix");

  const aggregator = await readText(
    contractPath("VALIDATION_HARNESS_AGGREGATOR_CONTRACT.md"),
  );
  requireAll(aggregator, contractPath("VALIDATION_HARNESS_AGGREGATOR_CONTRACT.md"), [
    validationHarnessAggregatorChecker,
    aggregatorPassVerdict,
    aggregatorBlockedVerdict,
    "zero arguments",
    "stdout-only",
    "no-persistent-report",
    "no-target-path",
    "no-runtime/materializer",
    "process.execPath",
    "child_process.spawn",
    "shell: false",
    "not use `exec`",
    "timeout_per_child_check: 30 seconds",
    "capture stdout, stderr, exit code, signal, and spawn error",
    "generic runner",
    "target adapter",
    "write approval",
    "runtime materializer",
    "persistent report",
    "target real read/write",
  ], "validation harness aggregator");
  for (const check of aggregatorChildChecks) {
    requireAll(aggregator, contractPath("VALIDATION_HARNESS_AGGREGATOR_CONTRACT.md"), [
      check.relativePath,
      check.expectedStdout,
    ], `validation harness aggregator child: ${check.relativePath}`);
  }

  const implementation = await readText(
    contractPath("IMPLEMENTATION_BOUNDARY_CONTRACT.md"),
  );
  requireAll(implementation, contractPath("IMPLEMENTATION_BOUNDARY_CONTRACT.md"), [
    "static contract validator",
    "source inventory validator",
    "template coverage validator",
    "render-context planner",
    "dry-run output planner",
    "validation report generator",
    "validation harness aggregator checker",
    validationHarnessAggregatorChecker,
    aggregatorPassVerdict,
    aggregatorBlockedVerdict,
    "generic runner",
    "target adapter",
    "materializer interface",
    "write approval",
    "persistent report",
    "target real read/write",
    "skills/stnl_project_agent_specializer_dev/scripts/materialization_lab/",
    "skills/stnl_project_agent_specializer_dev/reference/**",
    "skills/stnl_project_agent_specializer_dev/README.md",
    "skills/stnl_project_agent_specializer_dev/SKILL.md",
    "skills/stnl_project_agent_specializer_dev/openai.yaml",
  ], "implementation boundary");

  const fixture = await readText(contractPath("FIXTURE_BOUNDARY_CONTRACT.md"));
  requireAll(fixture, contractPath("FIXTURE_BOUNDARY_CONTRACT.md"), [
    "Status: documentary/dev-only contract.",
    "fixture root, category READMEs, and documentary schema",
    "complete positive fixtures",
    "complete negative fixtures",
    "rendered snapshots",
    "skills/stnl_project_agent_specializer_dev/reference/materialization_lab/fixtures/",
    "FIXTURE_SCHEMA.md",
    "repository-relative paths under the root",
    "Absolute paths",
    "traversal paths",
    "fixture expected-output snapshot",
    "not a generated artifact",
    "use a real target project root",
    "write to a real target project",
    ".github/**",
    ".codex/**",
    "AGENTS.md",
    "paths outside the authorized fixture root remain prohibited",
    "target real read/write",
    "generated final artifacts",
    "persistent reports in this phase",
  ], "fixture boundary");
}

async function validateFixtureSkeleton() {
  const fixtureRoot = "reference/materialization_lab/fixtures";
  const rootEntries = await readdir(abs(fixtureRoot), { withFileTypes: true });
  const allowedRootEntries = new Set([
    "README.md",
    "FIXTURE_SCHEMA.md",
    ...fixtureCategoryDirs,
  ]);

  for (const entry of rootEntries) {
    if (entry.name === "__MACOSX" || entry.name === ".DS_Store") {
      continue;
    }
    if (!allowedRootEntries.has(entry.name)) {
      recordFailure(`${fixtureRoot} contains unexpected skeleton entry: ${entry.name}`);
      continue;
    }
    if (fixtureCategoryDirs.includes(entry.name) && !entry.isDirectory()) {
      recordFailure(`${fixtureRoot}/${entry.name} must be a directory`);
    }
    if (["README.md", "FIXTURE_SCHEMA.md"].includes(entry.name) && !entry.isFile()) {
      recordFailure(`${fixtureRoot}/${entry.name} must be a file`);
    }
  }

  for (const categoryDir of fixtureCategoryDirs) {
    const categoryPath = rel(fixtureRoot, categoryDir);
    const entries = await readdir(abs(categoryPath), { withFileTypes: true });
    const allowedEntries = new Set([
      "README.md",
      ...(authorizedFixtureEntries[categoryDir] ?? []),
    ]);
    for (const entry of entries) {
      if (entry.name === "__MACOSX" || entry.name === ".DS_Store") {
        continue;
      }
      if (!allowedEntries.has(entry.name)) {
        recordFailure(`${categoryPath} contains unauthorized fixture payload: ${entry.name}`);
        continue;
      }
      if (entry.name === "README.md" && !entry.isFile()) {
        recordFailure(`${categoryPath}/README.md must be a file`);
      } else if (entry.name === "SNAPSHOT_POLICY.md" && !entry.isFile()) {
        recordFailure(`${categoryPath}/SNAPSHOT_POLICY.md must be a file`);
      } else if (!["README.md", "SNAPSHOT_POLICY.md"].includes(entry.name)) {
        if (!entry.isDirectory()) {
          recordFailure(`${categoryPath}/${entry.name} must be a fixture directory`);
          continue;
        }
        await requireFile(rel(categoryPath, entry.name, "FIXTURE.md"));
      }
    }
  }

  const fixtureReadme = await readText(rel(fixtureRoot, "README.md"));
  requireAll(fixtureReadme, rel(fixtureRoot, "README.md"), [
    "documentary/dev-only",
    "never authorize target real read/write",
    "GitHub writes",
    "runtime",
    ".github/**",
    ".codex/**",
    "AGENTS.md",
    "reference/agents/",
    "not be used as a final materialization source",
    "Templates must be explicit",
    "Lazy load is a safety contract",
    "Loading all modules for completeness is a violation",
    "Complete positive and negative fixture cases are authorized in this phase",
  ], "fixture README boundary");

  const fixtureSchema = await readText(rel(fixtureRoot, "FIXTURE_SCHEMA.md"));
  requireAll(fixtureSchema, rel(fixtureRoot, "FIXTURE_SCHEMA.md"), [
    "fixture_id:",
    "fixture_type:",
    "status:",
    "scenario:",
    "purpose:",
    "dev_only:",
    "no_real_write:",
    "source_model:",
    "kernel_source:",
    "senior_profile_source:",
    "template_source:",
    "materialization_contract_source:",
    "forbidden_sources:",
    "selected_agents:",
    "target_surface:",
    "template_sources:",
    "lazy_load_expectation:",
    "demand_type:",
    "activated_modules:",
    "loaded_modules:",
    "forbidden_modules:",
    "depends_on_verified:",
    "decision_trace_required:",
    "output_trace_required:",
    "expected_outputs:",
    "snapshots:",
    "forbidden_real_paths:",
    "blocked_expectation:",
    "should_block:",
    "block_codes:",
    "target_safety:",
    "fixture_root:",
    "simulated_target_paths:",
    "forbidden_real_target_paths:",
    "validation:",
    "responsible_checks:",
    "expected_verdict:",
    "documentation only",
  ], "fixture schema field");

  const projectsReadme = await readText(rel(fixtureRoot, "projects/README.md"));
  requireAll(projectsReadme, rel(fixtureRoot, "projects/README.md"), [
    "Backend-only",
    "Frontend-only",
    "iOS-only",
    "Fullstack BE + FE",
    "Fullstack BE + iOS",
    "Fullstack BE + FE + iOS",
    "This phase authorizes positive project fixtures",
  ], "fixture projects README");

  const expectedOutputsReadme = await readText(
    rel(fixtureRoot, "expected_outputs/README.md"),
  );
  requireAll(expectedOutputsReadme, rel(fixtureRoot, "expected_outputs/README.md"), [
    "fixture-only",
    "not real outputs",
    "must not be written to a real target",
    "Templates must not be inferred",
    "Minimal documentary snapshot fixtures are authorized in this phase",
  ], "fixture expected outputs README");

  const lazyLoadReadme = await readText(rel(fixtureRoot, "lazy_load/README.md"));
  requireAll(lazyLoadReadme, rel(fixtureRoot, "lazy_load/README.md"), [
    "not create a runtime loader",
    "Module 01 is required",
    "Module 02 is required",
    "Module 03 is required",
    "Module 04 is required",
    "Load-all by default blocks",
    "An activated module that is not loaded blocks",
    "Missing trace blocks",
    "This phase authorizes the declared positive and negative lazy-load trace",
  ], "fixture lazy load README");

  const blockedCasesReadme = await readText(rel(fixtureRoot, "blocked_cases/README.md"));
  requireAll(blockedCasesReadme, rel(fixtureRoot, "blocked_cases/README.md"), [
    "missing template",
    "inferred template",
    "forbidden target path",
    "`reference/agents/` as final source",
    "load-all for completeness",
    "missing required lazy-load module",
    "missing lazy-load trace",
    "write `.github` real",
    "write `.codex` real",
    "write `AGENTS.md` real",
    "runtime materializer created",
    "productive skill mutation",
    "GitHub write",
    "This phase creates complete blocked-case fixture documents only",
  ], "fixture blocked cases README");
}

async function validateTemplatePlaceholders() {
  const copilotTemplate = await readText("reference/templates/copilot/agent.md");
  requireAll(copilotTemplate, "reference/templates/copilot/agent.md", [
    ...commonPlaceholders,
    ...copilotPlaceholders,
  ], "template placeholder");

  const codexTemplate = await readText("reference/templates/codex/agent.toml");
  requireAll(codexTemplate, "reference/templates/codex/agent.toml", [
    ...commonPlaceholders,
    ...codexPlaceholders,
  ], "template placeholder");

  requireAll(codexTemplate, "reference/templates/codex/agent.toml", [
    "name =",
    "description =",
    "model =",
    "model_reasoning_effort =",
    "sandbox_mode =",
    "developer_instructions =",
  ], "codex required field");
}

async function validateBlockCodes() {
  for (const [relativePath, blockCodes] of Object.entries(blockCodesByContract)) {
    const content = await readText(relativePath);
    requireAll(content, relativePath, blockCodes, "block code");
  }

  const allKnownBlockCodes = new Set(Object.values(blockCodesByContract).flat());
  const validation = await readText(contractPath("VALIDATION_HARNESS_CONTRACT.md"));
  for (const blockCode of allKnownBlockCodes) {
    if (blockCode.startsWith("BLOCKED_") && !validation.includes(blockCode)) {
      const earlierContractsMention =
        blockCode.startsWith("BLOCKED_VALIDATION_") ||
        blockCode.startsWith("BLOCKED_PRODUCTIVE_") ||
        blockCode.startsWith("BLOCKED_TARGET_FILE_") ||
        blockCode.startsWith("BLOCKED_MATRIX_") ||
        blockCode.startsWith("BLOCKED_UNKNOWN_");
      if (earlierContractsMention) {
        recordFailure(
          `${contractPath("VALIDATION_HARNESS_CONTRACT.md")} missing validation block code: ${blockCode}`,
        );
      }
    }
  }
}

async function validateNonAuthorization() {
  const contractTexts = [];

  for (const contract of materializationContracts) {
    const relativePath = contractPath(contract);
    const content = await readText(relativePath);
    contractTexts.push([relativePath, content]);
  }

  const combined = contractTexts.map(([, content]) => content).join("\n");
  for (const term of forbiddenAuthorizations) {
    if (!combined.toLowerCase().includes(term.toLowerCase())) {
      recordFailure(`contracts do not mention forbidden authorization boundary: ${term}`);
    }
  }

  for (const [relativePath, content] of contractTexts) {
    const paragraphs = content.split(/\n\s*\n/);
    for (const [index, paragraph] of paragraphs.entries()) {
      const compactParagraph = paragraph.replace(/\s+/g, " ").trim();
      for (const term of forbiddenAuthorizations) {
        if (hasForbiddenPositiveAuthorization(compactParagraph, term)) {
          recordFailure(
            `${relativePath} paragraph ${index + 1} appears to authorize forbidden scope: ${term}`,
          );
        }
      }
    }
  }
}

async function validateStaticValidatorRegistration() {
  const manifest = await readText("reference/MANIFEST.md");
  requireAll(manifest, "reference/MANIFEST.md", [
    "scripts/materialization_lab/check-static.mjs",
    "static contract validator",
    "read-only",
  ], "static validator manifest registration");

  const staticChecks = await readText(validationPath("STATIC_CHECKS.md"));
  requireAll(staticChecks, validationPath("STATIC_CHECKS.md"), [
    "scripts/materialization_lab/check-static.mjs",
    "MATERIALIZATION_STATIC_CONTRACT_CHECK: PASS",
    "read-only",
  ], "static validator checks registration");

  const expectations = await readText(validationPath("EXCELLENT_PASS_EXPECTATIONS.md"));
  requireAll(expectations, validationPath("EXCELLENT_PASS_EXPECTATIONS.md"), [
    "scripts/materialization_lab/check-static.mjs",
    "MATERIALIZATION_STATIC_CONTRACT_CHECK: PASS",
    "read-only",
  ], "static validator expectation registration");

  for (const relativePath of [
    "reference/MANIFEST.md",
    validationPath("STATIC_CHECKS.md"),
    validationPath("GOLDEN_SCENARIOS.md"),
    validationPath("EXCELLENT_PASS_EXPECTATIONS.md"),
    contractPath("VALIDATION_HARNESS_CONTRACT.md"),
    contractPath("RENDERING_AND_COMPOSITION_CONTRACT.md"),
    contractPath("DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md"),
    contractPath("TEMPLATES_AND_OUTPUTS_CONTRACT.md"),
    contractPath("FIXTURE_BOUNDARY_CONTRACT.md"),
    contractPath("IMPLEMENTATION_BOUNDARY_CONTRACT.md"),
  ]) {
    const content = await readText(relativePath);
    requireAll(content, relativePath, [
      fixtureRenderDryRunIntegrationChecker,
      "read-only fixture to render/dry-run integration",
      "normalized fixture",
      "projections",
      "lazy-load gate",
      "independent",
      "MATERIALIZATION_FIXTURE_RENDER_DRY_RUN_INTEGRATION_CHECK: PASS",
    ], "fixture render/dry-run integration registration");
  }
}

async function validateAggregatorCheckerRegistration() {
  const aggregatorScript = await readText(validationHarnessAggregatorChecker);

  requireAll(aggregatorScript, validationHarnessAggregatorChecker, [
    "#!/usr/bin/env node",
    "import { spawn } from \"node:child_process\";",
    "process.argv.slice(2)",
    "process.execPath",
    "shell: false",
    "cwd: skillRoot",
    "stdio: [\"ignore\", \"pipe\", \"pipe\"]",
    "timeoutPerChildMs = 30_000",
    "child.kill(\"SIGTERM\")",
    "stdoutMatchesExpected",
    "childReturnedRecognizedFailure",
    aggregatorPassVerdict,
    aggregatorBlockedVerdict,
  ], "validation harness aggregator checker implementation");

  for (const check of aggregatorChildChecks) {
    requireAll(aggregatorScript, validationHarnessAggregatorChecker, [
      `relativePath: "${check.relativePath}"`,
      `expectedStdout: "${check.expectedStdout}"`,
    ], `validation harness aggregator child implementation: ${check.relativePath}`);
  }

  const childPositions = aggregatorChildChecks.map((check) =>
    aggregatorScript.indexOf(`relativePath: "${check.relativePath}"`),
  );
  for (const [index, position] of childPositions.entries()) {
    if (position === -1) {
      recordFailure(
        `${validationHarnessAggregatorChecker} missing child check: ${aggregatorChildChecks[index].relativePath}`,
      );
      continue;
    }
    if (index > 0 && childPositions[index - 1] > position) {
      recordFailure(
        `${validationHarnessAggregatorChecker} child checks are not in official aggregator order`,
      );
    }
  }

  for (const blockCode of blockCodesByContract[
    contractPath("VALIDATION_HARNESS_AGGREGATOR_CONTRACT.md")
  ]) {
    requireIncludes(
      aggregatorScript,
      validationHarnessAggregatorChecker,
      blockCode,
      `aggregator checker block code: ${blockCode}`,
    );
  }

  for (const forbiddenImplementation of [
    "exec(",
    "execFile(",
    "writeFile",
    "appendFile",
    "mkdir",
    "rm(",
    "rmdir",
    "createWriteStream",
  ]) {
    if (aggregatorScript.includes(forbiddenImplementation)) {
      recordFailure(
        `${validationHarnessAggregatorChecker} contains forbidden implementation token: ${forbiddenImplementation}`,
      );
    }
  }

  for (const relativePath of [
    "reference/MANIFEST.md",
    "reference/materialization_lab/README.md",
    validationPath("STATIC_CHECKS.md"),
    validationPath("GOLDEN_SCENARIOS.md"),
    validationPath("EXCELLENT_PASS_EXPECTATIONS.md"),
    contractPath("VALIDATION_HARNESS_AGGREGATOR_CONTRACT.md"),
    contractPath("IMPLEMENTATION_BOUNDARY_CONTRACT.md"),
  ]) {
    const content = await readText(relativePath);
    requireAll(content, relativePath, [
      validationHarnessAggregatorChecker,
      aggregatorPassVerdict,
      aggregatorBlockedVerdict,
      "zero arguments",
      "stdout-only",
      "child_process.spawn",
      "shell: false",
      "timeout_per_child_check: 30 seconds",
      "persistent report",
      "target real read/write",
      "generic runner",
    ], "validation harness aggregator checker registration");
  }
}

async function main() {
  await validateRequiredFiles();
  await validateContractAnchors();
  await validateFixtureSkeleton();
  await validateTemplatePlaceholders();
  await validateBlockCodes();
  await validateNonAuthorization();
  await validateStaticValidatorRegistration();
  await validateAggregatorCheckerRegistration();

  if (failures.length === 0) {
    console.log("MATERIALIZATION_STATIC_CONTRACT_CHECK: PASS");
    return;
  }

  console.log("MATERIALIZATION_STATIC_CONTRACT_CHECK: FAIL");
  for (const failure of failures) {
    console.log(`- ${failure}`);
  }
  process.exitCode = 1;
}

await main();
