#!/usr/bin/env node

import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const scriptDir = path.dirname(scriptPath);
const skillRoot = path.resolve(scriptDir, "../..");

const rel = (...parts) => parts.join("/");
const failures = [];
const textCache = new Map();

const expectedScriptPath =
  "scripts/materialization_lab/check-source-inventory.mjs";
const fixtureRenderDryRunIntegrationChecker =
  "scripts/materialization_lab/check-fixture-render-dry-run-integration.mjs";

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

const materializationContracts = [
  "TARGETS_CONTRACT.md",
  "SOURCE_MODEL_CONTRACT.md",
  "TEMPLATES_AND_OUTPUTS_CONTRACT.md",
  "RENDERING_AND_COMPOSITION_CONTRACT.md",
  "DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md",
  "VALIDATION_HARNESS_CONTRACT.md",
  "IMPLEMENTATION_BOUNDARY_CONTRACT.md",
  "FIXTURE_BOUNDARY_CONTRACT.md",
];

const templates = [
  "reference/templates/copilot/agent.md",
  "reference/templates/codex/agent.toml",
  "reference/templates/codex/config.toml",
  "reference/templates/codex/AGENTS.md",
];

const profileModules = [
  {
    fileName: "01_IDENTITY_AND_BOUNDARY.md",
    moduleType: "01_IDENTITY_AND_BOUNDARY",
    semanticType: "identity_and_boundary",
    dependsOn: [],
  },
  {
    fileName: "02_DECISION_AND_READING.md",
    moduleType: "02_DECISION_AND_READING",
    semanticType: "decision_and_reading",
    dependsOn: ["identity_and_boundary"],
  },
  {
    fileName: "03_RISK_AND_GATES.md",
    moduleType: "03_RISK_AND_GATES",
    semanticType: "risk_and_gates",
    dependsOn: ["identity_and_boundary"],
  },
  {
    fileName: "04_HANDOFF_EVIDENCE_AND_OUTPUT.md",
    moduleType: "04_HANDOFF_EVIDENCE_AND_OUTPUT",
    semanticType: "handoff_evidence_and_output",
    dependsOn: ["identity_and_boundary"],
  },
];

const profileValidationFiles = [
  "STATIC_CHECKS.md",
  "GOLDEN_SCENARIOS.md",
  "EXCELLENT_PASS_EXPECTATIONS.md",
];

const allowedSeniorizationTopLevel = new Set([
  "README.md",
  "contracts",
  "SENIOR_AGENT_PROFILE_AUDIT.md",
  "SENIOR_AGENT_PROFILE_INTEGRATED_VALIDATION.md",
  ...profileByAgent.values(),
]);

function recordFailure(message) {
  failures.push(message);
}

function isIgnoredName(name) {
  return name === "__MACOSX" || name === ".DS_Store";
}

function abs(relativePath) {
  const normalized = path.normalize(relativePath);
  if (path.isAbsolute(normalized) || normalized.startsWith(`..${path.sep}`)) {
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

function requireAny(content, relativePath, anchors, label) {
  if (!anchors.some((anchor) => content.includes(anchor))) {
    recordFailure(
      `${relativePath} missing one of ${label}: ${anchors.join(" | ")}`,
    );
  }
}

function requireAnyLower(content, relativePath, anchors, label) {
  const lower = content.toLowerCase();
  if (!anchors.some((anchor) => lower.includes(anchor.toLowerCase()))) {
    recordFailure(
      `${relativePath} missing one of ${label}: ${anchors.join(" | ")}`,
    );
  }
}

function requireLowerIncludes(content, relativePath, anchor, label = anchor) {
  if (!content.toLowerCase().includes(anchor.toLowerCase())) {
    recordFailure(`${relativePath} missing anchor: ${label}`);
  }
}

function frontmatterBlock(content, relativePath) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    recordFailure(`${relativePath} missing frontmatter metadata block`);
    return "";
  }
  return match[1];
}

function metadataValue(frontmatter, field) {
  const match = frontmatter.match(new RegExp(`^${field}:[ \\t]*(.*)$`, "m"));
  if (!match) {
    return null;
  }
  return match[1].trim().replace(/^["']|["']$/g, "");
}

function metadataList(frontmatter, field) {
  const fieldMatch = frontmatter.match(new RegExp(`^${field}:[ \\t]*(.*)$`, "m"));
  if (!fieldMatch) {
    return null;
  }

  const inlineValue = fieldMatch[1].trim();
  if (inlineValue === "[]") {
    return [];
  }
  if (inlineValue) {
    return [inlineValue.replace(/^["']|["']$/g, "")];
  }

  const lines = frontmatter.split(/\r?\n/);
  const fieldIndex = lines.findIndex((line) => line.startsWith(`${field}:`));
  const values = [];
  for (let index = fieldIndex + 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (/^[a-zA-Z_][a-zA-Z0-9_]*:/.test(line)) {
      break;
    }
    const itemMatch = line.match(/^\s*-\s*(.*)$/);
    if (itemMatch) {
      values.push(itemMatch[1].trim().replace(/^["']|["']$/g, ""));
    }
  }
  return values;
}

function requireMetadataField(frontmatter, relativePath, field) {
  if (!new RegExp(`^${field}:`, "m").test(frontmatter)) {
    recordFailure(`${relativePath} missing metadata field: ${field}`);
  }
}

function requireNonEmptyMetadataList(frontmatter, relativePath, field, blockCode) {
  const values = metadataList(frontmatter, field);
  if (values === null) {
    recordFailure(`${relativePath} missing metadata field: ${field} (${blockCode})`);
    return [];
  }
  if (values.length === 0) {
    recordFailure(`${relativePath} has empty metadata field: ${field} (${blockCode})`);
  }
  return values;
}

function expectedProfileDir(agentId) {
  return `${agentId.replaceAll("-", "_")}_profile`;
}

function expectedKernelDir(agentId) {
  return `${agentId.replaceAll("-", "_")}_kernel`;
}

function kernelPath(agentId, ...parts) {
  return rel("reference/kernel_lab", kernelByAgent.get(agentId), ...parts);
}

async function validateNoTargetArgument() {
  const extraArgs = process.argv.slice(2);
  if (extraArgs.length > 0) {
    recordFailure(
      "target project paths or extra arguments are not accepted by this source inventory validator",
    );
  }
}

async function validateScriptBoundary() {
  const expectedAbs = abs(expectedScriptPath);
  if (path.relative(expectedAbs, scriptPath) !== "") {
    recordFailure(`script is not running from authorized path: ${expectedScriptPath}`);
  }

  await requireFile("scripts/materialization_lab/check-static.mjs");
  await requireFile(expectedScriptPath);
}

async function validateAgentInventory() {
  const sourceModel = await readText(
    "reference/materialization_lab/contracts/SOURCE_MODEL_CONTRACT.md",
  );
  requireAll(sourceModel, "reference/materialization_lab/contracts/SOURCE_MODEL_CONTRACT.md", [
    "reference/kernel_lab/",
    "reference/seniorization_lab/",
    "reference/templates/",
    "temporary development parity baseline",
    "not a final materialization source",
    "may be removed after final validation",
    "base_agent_source",
  ], "base agent parity baseline classification");

  if (!(await exists("reference/agents"))) {
    requireIncludes(
      sourceModel,
      "reference/materialization_lab/contracts/SOURCE_MODEL_CONTRACT.md",
      "may be removed after final validation",
      "future absence of reference/agents does not invalidate final source model",
    );
    return;
  }

  const expectedAgentFiles = new Set(
    agents.map((agent) => `${agent}.agent.md`),
  );
  const entries = await readTopLevel("reference/agents");

  for (const entry of entries) {
    if (!entry.isFile()) {
      recordFailure(`reference/agents contains non-file item: ${entry.name}`);
      continue;
    }

    if (!expectedAgentFiles.has(entry.name)) {
      recordFailure(`reference/agents contains unexpected item: ${entry.name}`);
    }
  }

  for (const fileName of expectedAgentFiles) {
    await requireFile(rel("reference/agents", fileName));
  }
}

async function validateKernelInventory() {
  const entries = await readTopLevel("reference/kernel_lab");
  const expectedKernelDirs = new Set(kernelByAgent.values());

  for (const entry of entries) {
    if (entry.name === "README.md" && entry.isFile()) {
      continue;
    }

    if (!expectedKernelDirs.has(entry.name)) {
      recordFailure(`reference/kernel_lab contains unexpected top-level item: ${entry.name}`);
      continue;
    }

    if (!entry.isDirectory()) {
      recordFailure(`reference/kernel_lab/${entry.name} must be a kernel directory`);
    }
  }

  for (const agent of agents) {
    const expectedKernel = expectedKernelDir(agent);
    const actualKernel = kernelByAgent.get(agent);
    if (actualKernel !== expectedKernel) {
      recordFailure(
        `kernel mapping mismatch for ${agent}: expected ${expectedKernel}, got ${actualKernel}`,
      );
    }

    await requireFile(kernelPath(agent, "README.md"));
    await requireFile(kernelPath(agent, "contracts", "CONTRACT.md"));
    await requireFile(kernelPath(agent, "contracts", "MINIMUM_SAFE_BUNDLE.md"));
    await requireFile(kernelPath(agent, "contracts", "BEHAVIOR_PARITY_SPINE.md"));
    await requireFile(kernelPath(agent, "validation", "STATIC_CHECKS.md"));
    await requireFile(kernelPath(agent, "validation", "GOLDEN_TESTS.md"));

    const contract = await readText(kernelPath(agent, "contracts", "CONTRACT.md"));
    requireAny(
      contract,
      kernelPath(agent, "contracts", "CONTRACT.md"),
      ["Status:", "##", "#"],
      "kernel contractual documentation",
    );
  }
}

async function validateProfileInventory() {
  const entries = await readTopLevel("reference/seniorization_lab");
  const expectedProfileDirs = new Set(profileByAgent.values());

  for (const entry of entries) {
    if (!allowedSeniorizationTopLevel.has(entry.name)) {
      recordFailure(
        `reference/seniorization_lab contains unexpected top-level item: ${entry.name}`,
      );
      continue;
    }

    if (expectedProfileDirs.has(entry.name) && !entry.isDirectory()) {
      recordFailure(
        `reference/seniorization_lab/${entry.name} must be a profile directory`,
      );
    }

    if (entry.name === "contracts" && !entry.isDirectory()) {
      recordFailure("reference/seniorization_lab/contracts must be a directory");
    }
  }

  for (const [agent, profileDir] of profileByAgent.entries()) {
    await requireFile(rel("reference/seniorization_lab", profileDir, "README.md"));
    await requireFile(
      rel("reference/seniorization_lab", profileDir, "SENIOR_AGENT_PROFILE.md"),
    );
    for (const module of profileModules) {
      await requireFile(
        rel("reference/seniorization_lab", profileDir, "profile", module.fileName),
      );
    }
    for (const validationFile of profileValidationFiles) {
      await requireFile(
        rel("reference/seniorization_lab", profileDir, "validation", validationFile),
      );
    }

    const expectedDir = expectedProfileDir(agent);
    if (profileDir !== expectedDir) {
      recordFailure(
        `profile mapping mismatch for ${agent}: expected ${expectedDir}, got ${profileDir}`,
      );
    }
  }
}

async function validateBaseAgentAnchors() {
  if (!(await exists("reference/agents"))) {
    return;
  }

  for (const agent of agents) {
    const relativePath = rel("reference/agents", `${agent}.agent.md`);
    const content = await readText(relativePath);

    requireIncludes(content, relativePath, `name: ${agent}`, "agent id");
    requireIncludes(content, relativePath, "## Mission", "mission section");
    requireIncludes(
      content,
      relativePath,
      "## Required output",
      "required output section",
    );
    requireAny(
      content,
      relativePath,
      ["## Status it may emit", "## Review signal it may emit", "role class:"],
      "status/role signal",
    );
    requireAny(
      content,
      relativePath,
      ["## Handoff", "## Handoff validity", "handoff", "boundary"],
      "handoff/boundary anchor",
    );
  }
}

function validateShortProfileManifest(content, relativePath, agent) {
  requireLowerIncludes(
    content,
    relativePath,
    `${agent} senior agent profile`,
    "profile manifest identity",
  );
  requireLowerIncludes(content, relativePath, "status:", "manifest status");
  requireLowerIncludes(content, relativePath, "purpose:", "manifest purpose");
  requireLowerIncludes(
    content,
    relativePath,
    "dev-only",
    "documentary/dev-only boundary",
  );
  requireLowerIncludes(
    content,
    relativePath,
    "non-runtime",
    "non-runtime boundary",
  );
  requireAnyLower(
    content,
    relativePath,
    ["lazy load", "lazy-load", "activation model", "activated"],
    "lazy-load or activation model",
  );
  requireAnyLower(
    content,
    relativePath,
    ["preserve", "preserves", "preserved"],
    "semantic preservation signal",
  );
  requireAnyLower(
    content,
    relativePath,
    ["behavior modules", "four-module", "modular profile", "profile/"],
    "modular profile linkage",
  );
  requireAny(
    content,
    relativePath,
    [
      "materialize runtime artifacts in this phase",
      "runtime materialization",
      "materialized agent prompt",
      "not a materializer",
    ],
    "materialization/runtime non-authorization",
  );
  requireAny(
    content,
    relativePath,
    [
      ".github",
      ".codex",
      "AGENTS.md",
      "target artifacts",
      "target repo",
      "target repositories",
    ],
    "target-write/runtime-output boundary",
  );

  for (const module of profileModules) {
    requireIncludes(
      content,
      relativePath,
      rel("profile", module.fileName),
      `behavior module path: ${module.fileName}`,
    );
  }

  if (
    content.includes("## 1. Profile Status") ||
    content.includes("## 3. Canonical Role Boundary")
  ) {
    recordFailure(
      `${relativePath} appears to recombine old monolithic profile sections (BLOCKED_PROFILE_PARTS_RECOMBINED_AS_MONOLITH)`,
    );
  }
}

function validateProfileModule(content, relativePath, agent, module) {
  const frontmatter = frontmatterBlock(content, relativePath);
  const requiredFields = [
    "module_id",
    "module_type",
    "agent_id",
    "purpose",
    "load_when",
    "do_not_load_when",
    "depends_on",
    "blocks_if_triggered_but_unloaded",
  ];
  for (const field of requiredFields) {
    requireMetadataField(frontmatter, relativePath, field);
  }

  const moduleId = metadataValue(frontmatter, "module_id");
  const moduleType = metadataValue(frontmatter, "module_type");
  const agentId = metadataValue(frontmatter, "agent_id");
  const blocksIfTriggered = metadataValue(
    frontmatter,
    "blocks_if_triggered_but_unloaded",
  );
  const expectedModuleId = `${agent}.${module.semanticType}`;

  if (moduleId !== expectedModuleId) {
    recordFailure(
      `${relativePath} module_id must be ${expectedModuleId}, got ${moduleId ?? "missing"}`,
    );
  }
  if (moduleType !== module.moduleType) {
    recordFailure(
      `${relativePath} module_type must be ${module.moduleType}, got ${moduleType ?? "missing"}`,
    );
  }
  if (agentId !== agent) {
    recordFailure(`${relativePath} agent_id must be ${agent}, got ${agentId ?? "missing"}`);
  }
  if (blocksIfTriggered !== "true") {
    recordFailure(
      `${relativePath} blocks_if_triggered_but_unloaded must be true (BLOCKED_REQUIRED_MODULE_NOT_LOADED)`,
    );
  }

  requireNonEmptyMetadataList(
    frontmatter,
    relativePath,
    "load_when",
    "BLOCKED_BEHAVIOR_MODULE_WITHOUT_LOAD_WHEN",
  );
  requireNonEmptyMetadataList(
    frontmatter,
    relativePath,
    "do_not_load_when",
    "BLOCKED_BEHAVIOR_MODULE_WITHOUT_DO_NOT_LOAD_WHEN",
  );

  const dependencies = metadataList(frontmatter, "depends_on");
  if (dependencies === null) {
    recordFailure(
      `${relativePath} missing depends_on metadata (BLOCKED_PROFILE_PART_DEPENDENCY_MISSING)`,
    );
    return;
  }

  const expectedDependencies = module.dependsOn.map(
    (semanticType) => `${agent}.${semanticType}`,
  );
  if (module.dependsOn.length === 0) {
    if (dependencies.length !== 0) {
      recordFailure(
        `${relativePath} module 01 must not depend on another behavior module (BLOCKED_PROFILE_PART_DEPENDENCY_MISSING)`,
      );
    }
    return;
  }

  if (dependencies.length === 0) {
    recordFailure(
      `${relativePath} depends_on must not be empty for ${module.moduleType} (BLOCKED_PROFILE_PART_DEPENDENCY_MISSING)`,
    );
  }

  for (const dependency of dependencies) {
    if (!dependency.startsWith(`${agent}.`)) {
      recordFailure(
        `${relativePath} has cross-agent dependency ${dependency} (BLOCKED_PROFILE_PART_DEPENDENCY_MISSING)`,
      );
    }
    if (!expectedDependencies.includes(dependency)) {
      recordFailure(
        `${relativePath} depends_on must contain only ${expectedDependencies.join(", ")}, got ${dependency} (BLOCKED_PROFILE_PART_DEPENDENCY_MISSING)`,
      );
    }
  }

  for (const expectedDependency of expectedDependencies) {
    if (!dependencies.includes(expectedDependency)) {
      recordFailure(
        `${relativePath} missing dependency ${expectedDependency} (BLOCKED_PROFILE_PART_DEPENDENCY_MISSING)`,
      );
    }
  }
}

async function validateSeniorProfileManifestsAndModules() {
  for (const [agent, profileDir] of profileByAgent.entries()) {
    const relativePath = rel(
      "reference/seniorization_lab",
      profileDir,
      "SENIOR_AGENT_PROFILE.md",
    );
    const content = await readText(relativePath);
    validateShortProfileManifest(content, relativePath, agent);

    for (const module of profileModules) {
      const modulePath = rel(
        "reference/seniorization_lab",
        profileDir,
        "profile",
        module.fileName,
      );
      validateProfileModule(await readText(modulePath), modulePath, agent, module);
    }
  }
}

async function validateSeniorProfileManifestRegistration() {
  const manifest = await readText("reference/MANIFEST.md");

  for (const [agent, profileDir] of profileByAgent.entries()) {
    requireIncludes(
      manifest,
      "reference/MANIFEST.md",
      rel("reference/seniorization_lab", profileDir, "README.md"),
      `manifest profile README: ${agent}`,
    );
    requireIncludes(
      manifest,
      "reference/MANIFEST.md",
      rel("reference/seniorization_lab", profileDir, "SENIOR_AGENT_PROFILE.md"),
      `manifest profile manifest: ${agent}`,
    );
    for (const module of profileModules) {
      requireIncludes(
        manifest,
        "reference/MANIFEST.md",
        rel("reference/seniorization_lab", profileDir, "profile", module.fileName),
        `manifest profile module ${module.fileName}: ${agent}`,
      );
    }
    for (const validationFile of profileValidationFiles) {
      requireIncludes(
        manifest,
        "reference/MANIFEST.md",
        rel("reference/seniorization_lab", profileDir, "validation", validationFile),
        `manifest profile validation ${validationFile}: ${agent}`,
      );
    }
  }
}

async function validateTemplatesAndManifest() {
  for (const template of templates) {
    await requireFile(template);
  }

  const manifest = await readText("reference/MANIFEST.md");

  requireIncludes(
    manifest,
    "reference/MANIFEST.md",
    "temporary development parity baseline",
    "manifest classifies reference/agents as parity baseline",
  );

  for (const [agent, kernelDir] of kernelByAgent.entries()) {
    requireIncludes(
      manifest,
      "reference/MANIFEST.md",
      rel("reference/kernel_lab", kernelDir, "contracts", "CONTRACT.md"),
      `manifest kernel contract: ${agent}`,
    );
  }

  for (const contract of materializationContracts) {
    requireIncludes(
      manifest,
      "reference/MANIFEST.md",
      rel("reference/materialization_lab/contracts", contract),
      `manifest materialization contract: ${contract}`,
    );
  }

  for (const template of templates) {
    requireIncludes(
      manifest,
      "reference/MANIFEST.md",
      template,
      `manifest template: ${template}`,
    );
  }

  requireIncludes(
    manifest,
    "reference/MANIFEST.md",
    "scripts/materialization_lab/check-static.mjs",
    "manifest static validator",
  );
  requireIncludes(
    manifest,
    "reference/MANIFEST.md",
    expectedScriptPath,
    "manifest source inventory validator",
  );
  await requireFile(fixtureRenderDryRunIntegrationChecker);
  requireIncludes(
    manifest,
    "reference/MANIFEST.md",
    fixtureRenderDryRunIntegrationChecker,
    "manifest fixture render/dry-run integration validator",
  );
  await validateSeniorProfileManifestRegistration();
}

async function validateFixtureBoundaryInventory() {
  const fixtureRoot = "reference/materialization_lab/fixtures";
  const expectedFixtureFiles = [
    "README.md",
    "FIXTURE_SCHEMA.md",
    "projects/README.md",
    "expected_outputs/README.md",
    "expected_outputs/SNAPSHOT_POLICY.md",
    "lazy_load/README.md",
    "blocked_cases/README.md",
    "projects/backend_only_happy/FIXTURE.md",
    "projects/frontend_only_happy/FIXTURE.md",
    "projects/ios_only_happy/FIXTURE.md",
    "projects/fullstack_be_fe_happy/FIXTURE.md",
    "projects/fullstack_be_ios_happy/FIXTURE.md",
    "projects/fullstack_be_fe_ios_happy/FIXTURE.md",
    "lazy_load/non_trivial_loads_01/FIXTURE.md",
    "lazy_load/decision_loads_02/FIXTURE.md",
    "lazy_load/risk_loads_03/FIXTURE.md",
    "lazy_load/output_loads_04/FIXTURE.md",
    "lazy_load/load_all_default_blocks/FIXTURE.md",
    "lazy_load/module_03_missing_risk_blocks/FIXTURE.md",
    "lazy_load/module_04_missing_output_blocks/FIXTURE.md",
    "lazy_load/trace_missing_blocks/FIXTURE.md",
    "blocked_cases/missing_template/FIXTURE.md",
    "blocked_cases/inferred_template/FIXTURE.md",
    "blocked_cases/forbidden_target_path/FIXTURE.md",
    "blocked_cases/reference_agents_final_source/FIXTURE.md",
    "blocked_cases/write_github_real/FIXTURE.md",
    "blocked_cases/write_codex_real/FIXTURE.md",
    "blocked_cases/write_agents_md_real/FIXTURE.md",
    "blocked_cases/runtime_materializer_created/FIXTURE.md",
    "blocked_cases/productive_skill_mutation/FIXTURE.md",
    "blocked_cases/github_write/FIXTURE.md",
    "expected_outputs/minimal_copilot_agent_snapshot/FIXTURE.md",
    "expected_outputs/minimal_codex_agent_snapshot/FIXTURE.md",
    "expected_outputs/minimal_codex_config_snapshot/FIXTURE.md",
    "expected_outputs/minimal_agents_md_snapshot/FIXTURE.md",
  ];
  const authorizedCategoryEntries = {
    projects: [
      "README.md",
      "backend_only_happy",
      "frontend_only_happy",
      "ios_only_happy",
      "fullstack_be_fe_happy",
      "fullstack_be_ios_happy",
      "fullstack_be_fe_ios_happy",
    ],
    expected_outputs: [
      "README.md",
      "SNAPSHOT_POLICY.md",
      "minimal_copilot_agent_snapshot",
      "minimal_codex_agent_snapshot",
      "minimal_codex_config_snapshot",
      "minimal_agents_md_snapshot",
    ],
    lazy_load: [
      "README.md",
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
      "README.md",
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

  for (const fixtureFile of expectedFixtureFiles) {
    await requireFile(rel(fixtureRoot, fixtureFile));
  }

  const allowedRootEntries = new Set([
    "README.md",
    "FIXTURE_SCHEMA.md",
    "projects",
    "expected_outputs",
    "lazy_load",
    "blocked_cases",
  ]);
  const rootEntries = await readdir(abs(fixtureRoot), { withFileTypes: true });
  for (const entry of rootEntries) {
    if (isIgnoredName(entry.name)) {
      continue;
    }
    if (!allowedRootEntries.has(entry.name)) {
      recordFailure(`${fixtureRoot} contains unexpected fixture skeleton entry: ${entry.name}`);
    }
  }

  for (const category of ["projects", "expected_outputs", "lazy_load", "blocked_cases"]) {
    const categoryPath = rel(fixtureRoot, category);
    const entries = await readdir(abs(categoryPath), { withFileTypes: true });
    const authorizedEntries = new Set(authorizedCategoryEntries[category]);
    for (const entry of entries) {
      if (isIgnoredName(entry.name)) {
        continue;
      }
      if (!authorizedEntries.has(entry.name)) {
        recordFailure(`${categoryPath} contains unauthorized complete fixture payload: ${entry.name}`);
        continue;
      }
      if (entry.name.endsWith(".md") && !entry.isFile()) {
        recordFailure(`${categoryPath}/${entry.name} must be a file`);
      }
      if (!entry.name.endsWith(".md") && !entry.isDirectory()) {
        recordFailure(`${categoryPath}/${entry.name} must be a fixture directory`);
      }
    }
  }

  if (!(await exists(fixtureRoot))) {
    recordFailure(
      "reference/materialization_lab/fixtures skeleton root is missing",
    );
  }

  const manifest = await readText("reference/MANIFEST.md");
  requireIncludes(
    manifest,
    "reference/MANIFEST.md",
    "reference/materialization_lab/contracts/FIXTURE_BOUNDARY_CONTRACT.md",
    "manifest fixture boundary contract",
  );
  for (const fixtureFile of expectedFixtureFiles) {
    requireIncludes(
      manifest,
      "reference/MANIFEST.md",
      rel(fixtureRoot, fixtureFile),
      `manifest fixture skeleton file: ${fixtureFile}`,
    );
  }
}

async function main() {
  await validateNoTargetArgument();
  await validateScriptBoundary();
  await validateAgentInventory();
  await validateKernelInventory();
  await validateProfileInventory();
  await validateBaseAgentAnchors();
  await validateSeniorProfileManifestsAndModules();
  await validateTemplatesAndManifest();
  await validateFixtureBoundaryInventory();

  if (failures.length === 0) {
    console.log("MATERIALIZATION_SOURCE_INVENTORY_CHECK: PASS");
    return;
  }

  console.log("MATERIALIZATION_SOURCE_INVENTORY_CHECK: FAIL");
  for (const failure of failures) {
    console.log(`- ${failure}`);
  }
  process.exitCode = 1;
}

await main();
