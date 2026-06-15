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

const materializationContracts = [
  "TARGETS_CONTRACT.md",
  "TEMPLATES_AND_OUTPUTS_CONTRACT.md",
  "RENDERING_AND_COMPOSITION_CONTRACT.md",
  "DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md",
  "VALIDATION_HARNESS_CONTRACT.md",
  "IMPLEMENTATION_BOUNDARY_CONTRACT.md",
];

const templates = [
  "reference/templates/copilot/agent.md",
  "reference/templates/codex/agent.toml",
  "reference/templates/codex/config.toml",
  "reference/templates/codex/AGENTS.md",
];

const allowedSeniorizationTopLevel = new Set([
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

function requireAny(content, relativePath, anchors, label) {
  if (!anchors.some((anchor) => content.includes(anchor))) {
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

function expectedProfileDir(agentId) {
  return `${agentId.replaceAll("-", "_")}_profile`;
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
    await requireFile(
      rel("reference/seniorization_lab", profileDir, "SENIOR_AGENT_PROFILE.md"),
    );

    const expectedDir = expectedProfileDir(agent);
    if (profileDir !== expectedDir) {
      recordFailure(
        `profile mapping mismatch for ${agent}: expected ${expectedDir}, got ${profileDir}`,
      );
    }
  }
}

async function validateBaseAgentAnchors() {
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

async function validateSeniorProfileAnchors() {
  for (const [agent, profileDir] of profileByAgent.entries()) {
    const relativePath = rel(
      "reference/seniorization_lab",
      profileDir,
      "SENIOR_AGENT_PROFILE.md",
    );
    const content = await readText(relativePath);

    requireIncludes(
      content,
      relativePath,
      `# ${agent} Senior Agent Profile`,
      "profile identity",
    );
    requireIncludes(
      content,
      relativePath,
      "## 1. Profile Status",
      "profile status section",
    );
    requireIncludes(
      content,
      relativePath,
      "## 3. Canonical Role Boundary",
      "seniorization boundary equivalent",
    );
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
    requireAny(
      content,
      relativePath,
      [
        "materialize runtime artifacts in this phase",
        "runtime materialization",
        "materialized agent prompt",
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
  }
}

async function validateTemplatesAndManifest() {
  for (const template of templates) {
    await requireFile(template);
  }

  const manifest = await readText("reference/MANIFEST.md");

  for (const agent of agents) {
    requireIncludes(
      manifest,
      "reference/MANIFEST.md",
      rel("reference/agents", `${agent}.agent.md`),
      `manifest base agent: ${agent}`,
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
}

async function main() {
  await validateNoTargetArgument();
  await validateScriptBoundary();
  await validateAgentInventory();
  await validateProfileInventory();
  await validateBaseAgentAnchors();
  await validateSeniorProfileAnchors();
  await validateTemplatesAndManifest();

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
