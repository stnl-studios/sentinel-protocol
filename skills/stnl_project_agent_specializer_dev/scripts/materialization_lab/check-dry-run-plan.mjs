#!/usr/bin/env node

import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const scriptDir = path.dirname(scriptPath);
const skillRoot = path.resolve(scriptDir, "../..");

const failures = [];
const textCache = new Map();

const expectedScriptPath =
  "scripts/materialization_lab/check-dry-run-plan.mjs";

const previousScripts = [
  "scripts/materialization_lab/check-static.mjs",
  "scripts/materialization_lab/check-source-inventory.mjs",
  "scripts/materialization_lab/check-template-coverage.mjs",
  "scripts/materialization_lab/check-render-context.mjs",
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

const targets = [
  {
    id: "copilot",
    agentTemplate: "reference/templates/copilot/agent.md",
    agentOutputShape: ".github/agents/*.agent.md",
    agentPathFor: (agent) => `.github/agents/${agent}.agent.md`,
  },
  {
    id: "codex",
    agentTemplate: "reference/templates/codex/agent.toml",
    agentOutputShape: ".codex/agents/*.toml",
    agentPathFor: (agent) => `.codex/agents/${agent}.toml`,
  },
];

const codexGlobalArtifacts = [
  {
    target_id: "codex",
    agent_id: null,
    output_shape: ".codex/config.toml",
    planned_path: ".codex/config.toml",
    template_source: "reference/templates/codex/config.toml",
    kernel_source: null,
    senior_profile_source: null,
  },
  {
    target_id: "codex",
    agent_id: null,
    output_shape: "AGENTS.md",
    planned_path: "AGENTS.md",
    template_source: "reference/templates/codex/AGENTS.md",
    kernel_source: null,
    senior_profile_source: null,
  },
];

const plannedArtifactFields = [
  "target_id",
  "agent_id",
  "output_shape",
  "planned_path",
  "template_source",
  "kernel_source",
  "senior_profile_source",
  "operation",
  "managed_artifact",
  "existing_file_state",
  "drift_status",
  "blocking_status",
  "block_code",
];

const plannedOperations = [
  "CREATE_PLANNED",
  "UPDATE_PLANNED",
  "UNCHANGED_PLANNED",
  "BLOCKED_PLANNED",
];

const recognizedBlockCodes = [
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
];

const unavailableExistingFileState = "TARGET_STATE_UNAVAILABLE_NO_TARGET_READ";
const unavailableManagedStatus = "MANAGED_STATUS_UNAVAILABLE_NO_TARGET_READ";
const unavailableDriftStatus = "DRIFT_NOT_CALCULATED_NO_TARGET_READ";
const noWriteBlockingStatus = "BLOCKED_NO_TARGET_READ_NO_WRITE_AUTHORIZATION";

function recordFailure(message) {
  failures.push(message);
}

function isIgnoredName(name) {
  return name === "__MACOSX" || name === ".DS_Store";
}

function rel(...parts) {
  return parts.join("/");
}

function abs(relativePath) {
  const normalized = path.normalize(relativePath);
  if (
    path.isAbsolute(normalized) ||
    normalized === ".." ||
    normalized.startsWith(`..${path.sep}`)
  ) {
    throw new Error(`path escapes dev skill root: ${relativePath}`);
  }

  const absolutePath = path.resolve(skillRoot, normalized);
  const relativeToRoot = path.relative(skillRoot, absolutePath);
  if (relativeToRoot.startsWith("..") || path.isAbsolute(relativeToRoot)) {
    throw new Error(`path escapes dev skill root: ${relativePath}`);
  }
  return absolutePath;
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
  if (relativePath.split(/[\\/]/).some(isIgnoredName)) {
    return false;
  }

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

  if (relativePath.split(/[\\/]/).some(isIgnoredName)) {
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

async function readTopLevel(relativePath) {
  try {
    const entries = await readdir(abs(relativePath), { withFileTypes: true });
    return entries.filter((entry) => !isIgnoredName(entry.name));
  } catch (error) {
    recordFailure(`cannot read directory ${relativePath}: ${error.message}`);
    return [];
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

function expectedProfileDir(agentId) {
  return `${agentId.replaceAll("-", "_")}_profile`;
}

function expectedKernelDir(agentId) {
  return `${agentId.replaceAll("-", "_")}_kernel`;
}

const deprecatedBaseAgentSourceField = "base_agent_source";

function buildPlanEntry(entry) {
  return {
    ...entry,
    operation: "BLOCKED_PLANNED",
    managed_artifact: unavailableManagedStatus,
    existing_file_state: unavailableExistingFileState,
    drift_status: unavailableDriftStatus,
    blocking_status: noWriteBlockingStatus,
    block_code: "BLOCKED_DRY_RUN_REQUIRED",
  };
}

function buildDryRunPlan() {
  const plannedArtifacts = [];

  for (const target of targets) {
    for (const agent of agents) {
      plannedArtifacts.push(
        buildPlanEntry({
          target_id: target.id,
          agent_id: agent,
          output_shape: target.agentOutputShape,
          planned_path: target.agentPathFor(agent),
          template_source: target.agentTemplate,
          kernel_source: rel("reference/kernel_lab", kernelByAgent.get(agent)),
          senior_profile_source: rel(
            "reference/seniorization_lab",
            profileByAgent.get(agent),
            "SENIOR_AGENT_PROFILE.md",
          ),
        }),
      );
    }
  }

  for (const artifact of codexGlobalArtifacts) {
    plannedArtifacts.push(buildPlanEntry(artifact));
  }

  return plannedArtifacts;
}

function isSafePlannedPath(plannedPath) {
  if (typeof plannedPath !== "string" || plannedPath.length === 0) {
    return false;
  }

  if (path.posix.isAbsolute(plannedPath) || path.win32.isAbsolute(plannedPath)) {
    return false;
  }

  const parts = plannedPath.split(/[\\/]/);
  if (parts.includes("..") || parts.some((part) => part.length === 0)) {
    return false;
  }

  const normalized = path.posix.normalize(plannedPath.replaceAll("\\", "/"));
  return normalized === plannedPath && !normalized.startsWith("../");
}

async function validateNoTargetArgument() {
  const extraArgs = process.argv.slice(2);
  if (extraArgs.length > 0) {
    recordFailure(
      "target project paths or extra arguments are not accepted by this dry-run plan checker",
    );
  }
}

async function validateScriptBoundary() {
  const expectedAbs = abs(expectedScriptPath);
  if (path.relative(expectedAbs, scriptPath) !== "") {
    recordFailure(`script is not running from authorized path: ${expectedScriptPath}`);
  }

  for (const previousScript of previousScripts) {
    await requireFile(previousScript);
  }
  await requireFile(expectedScriptPath);
}

async function validateRequiredSources() {
  await requireFile("reference/MANIFEST.md");
  await requireFile(contractPath("SOURCE_MODEL_CONTRACT.md"));
  await requireFile(contractPath("TARGETS_CONTRACT.md"));
  await requireFile(contractPath("TEMPLATES_AND_OUTPUTS_CONTRACT.md"));
  await requireFile(contractPath("RENDERING_AND_COMPOSITION_CONTRACT.md"));
  await requireFile(contractPath("DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md"));
  await requireFile(contractPath("FIXTURE_BOUNDARY_CONTRACT.md"));
  await requireFile(validationPath("STATIC_CHECKS.md"));
  await requireFile(validationPath("EXCELLENT_PASS_EXPECTATIONS.md"));

  for (const target of targets) {
    await requireFile(target.agentTemplate);
  }
  for (const artifact of codexGlobalArtifacts) {
    await requireFile(artifact.template_source);
  }
}

async function validateCanonicalAgentIds() {
  for (const agent of agents) {
    const actualKernel = kernelByAgent.get(agent);
    const expectedKernel = expectedKernelDir(agent);
    if (actualKernel !== expectedKernel) {
      recordFailure(
        `kernel mapping mismatch for ${agent}: expected ${expectedKernel}, got ${actualKernel}`,
      );
    }
    await requireFile(rel("reference/kernel_lab", actualKernel));

    const actualProfile = profileByAgent.get(agent);
    const expectedProfile = expectedProfileDir(agent);
    if (actualProfile !== expectedProfile) {
      recordFailure(
        `profile mapping mismatch for ${agent}: expected ${expectedProfile}, got ${actualProfile}`,
      );
    }
    await requireFile(
      rel("reference/seniorization_lab", actualProfile, "SENIOR_AGENT_PROFILE.md"),
    );
  }
}

async function validateCanonicalTargets() {
  const targetEntries = await readTopLevel("reference/templates");
  const expectedTargetDirs = new Set(targets.map((target) => target.id));

  for (const entry of targetEntries) {
    if (!entry.isDirectory()) {
      recordFailure(`reference/templates contains non-directory item: ${entry.name}`);
      continue;
    }

    if (!expectedTargetDirs.has(entry.name)) {
      recordFailure(`reference/templates contains unexpected target: ${entry.name}`);
    }
  }

  const targetsContract = await readText(contractPath("TARGETS_CONTRACT.md"));
  const templatesContract = await readText(
    contractPath("TEMPLATES_AND_OUTPUTS_CONTRACT.md"),
  );

  for (const target of targets) {
    requireIncludes(
      targetsContract,
      contractPath("TARGETS_CONTRACT.md"),
      `- \`${target.id}\``,
      `canonical target: ${target.id}`,
    );
    requireIncludes(
      templatesContract,
      contractPath("TEMPLATES_AND_OUTPUTS_CONTRACT.md"),
      `- \`${target.id}\``,
      `template contract target: ${target.id}`,
    );
  }
}

async function validateDryRunContractAnchors() {
  const relativePath = contractPath("DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md");
  const content = await readText(relativePath);

  requireAll(content, relativePath, plannedOperations, "planned operation");
  requireAll(content, relativePath, plannedArtifactFields, "planned artifact field");
  requireAll(content, relativePath, [
    "kernel_source",
    "temporary development parity baseline",
    "Deprecated field `base_agent_source`",
  ], "source model planned artifact field");
  requireAll(content, relativePath, [
    ".github/agents/<agent>.agent.md",
    ".codex/agents/<agent>.toml",
    ".codex/config.toml",
    "AGENTS.md",
  ], "path mapping");
  requireAll(content, relativePath, [
    "Sentinel managed notice",
    "BLOCKED_UNMANAGED_COLLISION",
    "BLOCKED_INVALID_MANAGED_NOTICE",
    "not be inferred from path shape alone",
  ], "managed artifact policy");
  requireAll(content, relativePath, [
    "Drift Policy",
    "artifact does not exist",
    "matches the planned render",
    "differs from the planned render",
    "existing target-project file state",
  ], "drift policy");
  requireAll(content, relativePath, recognizedBlockCodes, "block code");
}

async function validatePlannedArtifacts() {
  const plan = buildDryRunPlan();

  const copilotArtifacts = plan.filter(
    (entry) =>
      entry.target_id === "copilot" &&
      entry.output_shape === ".github/agents/*.agent.md",
  );
  const codexAgentArtifacts = plan.filter(
    (entry) =>
      entry.target_id === "codex" &&
      entry.output_shape === ".codex/agents/*.toml",
  );
  const codexConfigArtifacts = plan.filter(
    (entry) =>
      entry.target_id === "codex" &&
      entry.output_shape === ".codex/config.toml",
  );
  const codexRootInstructionArtifacts = plan.filter(
    (entry) => entry.target_id === "codex" && entry.output_shape === "AGENTS.md",
  );

  if (copilotArtifacts.length !== 12) {
    recordFailure(`expected 12 copilot agent artifacts, got ${copilotArtifacts.length}`);
  }
  if (codexAgentArtifacts.length !== 12) {
    recordFailure(`expected 12 codex agent artifacts, got ${codexAgentArtifacts.length}`);
  }
  if (codexConfigArtifacts.length !== 1) {
    recordFailure(`expected 1 codex config artifact, got ${codexConfigArtifacts.length}`);
  }
  if (codexRootInstructionArtifacts.length !== 1) {
    recordFailure(
      `expected 1 codex root instructions artifact, got ${codexRootInstructionArtifacts.length}`,
    );
  }
  if (plan.length !== 26) {
    recordFailure(`expected 26 abstract planned artifacts, got ${plan.length}`);
  }

  const seenPaths = new Set();
  const allowedTargetIds = new Set(targets.map((target) => target.id));
  const allowedOperations = new Set(plannedOperations);
  const allowedBlockCodes = new Set(recognizedBlockCodes);
  const expectedCopilotPaths = new Set(
    agents.map((agent) => `.github/agents/${agent}.agent.md`),
  );
  const expectedCodexAgentPaths = new Set(
    agents.map((agent) => `.codex/agents/${agent}.toml`),
  );

  for (const entry of plan) {
    for (const field of plannedArtifactFields) {
      if (!(field in entry)) {
        recordFailure(`${entry.planned_path ?? "unknown artifact"} missing field: ${field}`);
      }
    }

    if (deprecatedBaseAgentSourceField in entry) {
      recordFailure(
        `${entry.planned_path} contains deprecated field: ${deprecatedBaseAgentSourceField}`,
      );
    }

    if (!allowedTargetIds.has(entry.target_id)) {
      recordFailure(`${entry.planned_path} has non-canonical target: ${entry.target_id}`);
    }

    if (!allowedOperations.has(entry.operation)) {
      recordFailure(`${entry.planned_path} has unsupported operation: ${entry.operation}`);
    }

    if (!allowedBlockCodes.has(entry.block_code)) {
      recordFailure(`${entry.planned_path} has unrecognized block code: ${entry.block_code}`);
    }

    if (!isSafePlannedPath(entry.planned_path)) {
      recordFailure(`${entry.planned_path} is not a safe relative planned path`);
    }

    if (seenPaths.has(entry.planned_path)) {
      recordFailure(`duplicate planned path: ${entry.planned_path}`);
    }
    seenPaths.add(entry.planned_path);

    if (
      entry.existing_file_state !== unavailableExistingFileState ||
      entry.managed_artifact !== unavailableManagedStatus ||
      entry.drift_status !== unavailableDriftStatus ||
      entry.blocking_status !== noWriteBlockingStatus
    ) {
      recordFailure(
        `${entry.planned_path} contains target-dependent state that is not abstract/unavailable`,
      );
    }

    if (entry.operation !== "BLOCKED_PLANNED") {
      recordFailure(
        `${entry.planned_path} must remain BLOCKED_PLANNED while target read is unauthorized`,
      );
    }

    await requireFile(entry.template_source);

    if (entry.output_shape === ".github/agents/*.agent.md") {
      if (!agents.includes(entry.agent_id)) {
        recordFailure(`${entry.planned_path} has invalid copilot agent_id`);
      }
      if (!expectedCopilotPaths.has(entry.planned_path)) {
        recordFailure(`${entry.planned_path} is not a canonical copilot agent path`);
      }
      const expectedKernelSource = rel("reference/kernel_lab", kernelByAgent.get(entry.agent_id));
      if (entry.kernel_source !== expectedKernelSource) {
        recordFailure(
          `${entry.planned_path} kernel_source mismatch: expected ${expectedKernelSource}, got ${entry.kernel_source}`,
        );
      }
      await requireFile(entry.kernel_source);
      await requireFile(entry.senior_profile_source);
    } else if (entry.output_shape === ".codex/agents/*.toml") {
      if (!agents.includes(entry.agent_id)) {
        recordFailure(`${entry.planned_path} has invalid codex agent_id`);
      }
      if (!expectedCodexAgentPaths.has(entry.planned_path)) {
        recordFailure(`${entry.planned_path} is not a canonical codex agent path`);
      }
      const expectedKernelSource = rel("reference/kernel_lab", kernelByAgent.get(entry.agent_id));
      if (entry.kernel_source !== expectedKernelSource) {
        recordFailure(
          `${entry.planned_path} kernel_source mismatch: expected ${expectedKernelSource}, got ${entry.kernel_source}`,
        );
      }
      await requireFile(entry.kernel_source);
      await requireFile(entry.senior_profile_source);
    } else if (entry.output_shape === ".codex/config.toml") {
      if (
        entry.agent_id !== null ||
        entry.kernel_source !== null ||
        entry.planned_path !== ".codex/config.toml" ||
        entry.template_source !== "reference/templates/codex/config.toml"
      ) {
        recordFailure("codex config planned artifact has invalid abstract shape");
      }
    } else if (entry.output_shape === "AGENTS.md") {
      if (
        entry.agent_id !== null ||
        entry.kernel_source !== null ||
        entry.planned_path !== "AGENTS.md" ||
        entry.template_source !== "reference/templates/codex/AGENTS.md"
      ) {
        recordFailure("codex root instructions planned artifact has invalid abstract shape");
      }
    } else {
      recordFailure(`${entry.planned_path} has unsupported output shape: ${entry.output_shape}`);
    }
  }
}

async function validateNoRealTargetDriftContract() {
  const dryRun = await readText(contractPath("DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md"));
  requireAll(dryRun, contractPath("DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md"), [
    "Drift status must be computed from explicit sources",
    "the existing target-project file state",
    "This phase does not write artifacts",
    "During this documentary/dev-only phase",
    "writes nothing",
  ], "dry-run no-write/no-guess drift boundary");
}

async function validateFixtureBoundaryNonAuthorization() {
  const relativePath = contractPath("FIXTURE_BOUNDARY_CONTRACT.md");
  const content = await readText(relativePath);

  requireAll(content, relativePath, [
    "This task does not create fixtures",
    "fixture read/write in this task",
    "target real read/write",
    "write to a real target project",
    "generated final artifacts",
    "persistent reports in this task",
    "real materialization",
  ], "fixture boundary non-authorization");
}

async function validateRegistrationDocs() {
  const manifest = await readText("reference/MANIFEST.md");
  requireAll(manifest, "reference/MANIFEST.md", [
    expectedScriptPath,
    "dry-run output plan checker",
    "read-only",
  ], "dry-run checker manifest registration");

  const staticChecks = await readText(validationPath("STATIC_CHECKS.md"));
  requireAll(staticChecks, validationPath("STATIC_CHECKS.md"), [
    expectedScriptPath,
    "dry-run output plan checker",
    "read-only",
    "MATERIALIZATION_DRY_RUN_PLAN_CHECK: PASS",
  ], "dry-run checker static-check registration");

  const expectations = await readText(validationPath("EXCELLENT_PASS_EXPECTATIONS.md"));
  requireAll(expectations, validationPath("EXCELLENT_PASS_EXPECTATIONS.md"), [
    expectedScriptPath,
    "dry-run output plan checker",
    "read-only",
    "MATERIALIZATION_DRY_RUN_PLAN_CHECK: PASS",
  ], "dry-run checker expectation registration");
}

async function main() {
  await validateNoTargetArgument();
  await validateScriptBoundary();
  await validateRequiredSources();
  await validateCanonicalAgentIds();
  await validateCanonicalTargets();
  await validateDryRunContractAnchors();
  await validatePlannedArtifacts();
  await validateNoRealTargetDriftContract();
  await validateFixtureBoundaryNonAuthorization();
  await validateRegistrationDocs();

  if (failures.length === 0) {
    console.log("MATERIALIZATION_DRY_RUN_PLAN_CHECK: PASS");
    return;
  }

  console.log("MATERIALIZATION_DRY_RUN_PLAN_CHECK: FAIL");
  for (const failure of failures) {
    console.log(`- ${failure}`);
  }
  process.exitCode = 1;
}

await main();
