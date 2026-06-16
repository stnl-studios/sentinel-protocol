#!/usr/bin/env node

import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const scriptDir = path.dirname(scriptPath);
const skillRoot = path.resolve(scriptDir, "../..");

const failures = [];
const textCache = new Map();

const expectedScriptPath =
  "scripts/materialization_lab/check-template-coverage.mjs";

const templates = [
  {
    target: "copilot",
    path: "reference/templates/copilot/agent.md",
    outputShape: ".github/agents/*.agent.md",
  },
  {
    target: "codex",
    path: "reference/templates/codex/agent.toml",
    outputShape: ".codex/agents/*.toml",
  },
  {
    target: "codex",
    path: "reference/templates/codex/config.toml",
    outputShape: ".codex/config.toml",
  },
  {
    target: "codex",
    path: "reference/templates/codex/AGENTS.md",
    outputShape: "AGENTS.md",
  },
];

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

const codexRequiredFields = [
  "name",
  "description",
  "model",
  "model_reasoning_effort",
  "sandbox_mode",
  "developer_instructions",
];

const deprecatedBaseAgentSourceField = "base_agent_source";

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

function extractSection(content, heading) {
  const lines = content.split(/\r?\n/);
  const start = lines.findIndex((line) => line === `## ${heading}`);
  if (start === -1) {
    return "";
  }

  const nextHeading = lines.findIndex(
    (line, index) => index > start && line.startsWith("## "),
  );
  const end = nextHeading === -1 ? lines.length : nextHeading;
  return lines.slice(start + 1, end).join("\n");
}

function hasNonAuthorizationStatement(content) {
  const lower = content.toLowerCase();
  return (
    lower.includes("runtime_materialization_authorized: false") ||
    lower.includes("runtime materialization authorized: false") ||
    (
      lower.includes("not a materializer") &&
      lower.includes("does not authorize")
    )
  );
}

async function validateNoTargetArgument() {
  const extraArgs = process.argv.slice(2);
  if (extraArgs.length > 0) {
    recordFailure(
      "target project paths or extra arguments are not accepted by this template coverage validator",
    );
  }
}

async function validateScriptBoundary() {
  const expectedAbs = abs(expectedScriptPath);
  if (path.relative(expectedAbs, scriptPath) !== "") {
    recordFailure(`script is not running from authorized path: ${expectedScriptPath}`);
  }

  await requireFile("scripts/materialization_lab/check-static.mjs");
  await requireFile("scripts/materialization_lab/check-source-inventory.mjs");
  await requireFile(expectedScriptPath);
}

async function validateRequiredFiles() {
  await requireFile("reference/MANIFEST.md");
  await requireFile(contractPath("SOURCE_MODEL_CONTRACT.md"));
  await requireFile(contractPath("TEMPLATES_AND_OUTPUTS_CONTRACT.md"));
  await requireFile(contractPath("RENDERING_AND_COMPOSITION_CONTRACT.md"));
  await requireFile(contractPath("DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md"));
  await requireFile(contractPath("FIXTURE_BOUNDARY_CONTRACT.md"));
  await requireFile(validationPath("STATIC_CHECKS.md"));
  await requireFile(validationPath("EXCELLENT_PASS_EXPECTATIONS.md"));

  for (const template of templates) {
    await requireFile(template.path);
  }
}

async function validateTemplatesAndOutputsContract() {
  const relativePath = contractPath("TEMPLATES_AND_OUTPUTS_CONTRACT.md");
  const content = await readText(relativePath);

  for (const template of templates) {
    requireAll(content, relativePath, [
      template.target,
      template.path,
      template.outputShape,
    ], `template coverage: ${template.path}`);
  }

  requireAll(content, relativePath, [
    "Templates define target output shape only",
    "reference/agents/",
    "Deprecated field `base_agent_source`",
    "kernel_source",
    "senior_profile_source",
    "template_source",
  ], "template source-model boundary");

  const missingSection = extractSection(content, "Explicit Templates Still Missing");
  if (!missingSection.trim()) {
    recordFailure(`${relativePath} missing Explicit Templates Still Missing section`);
    return;
  }

  requireIncludes(
    missingSection,
    relativePath,
    "No expected canonical output shape is currently listed as missing",
    "no canonical missing output shape statement",
  );

  for (const template of templates) {
    if (missingSection.includes(template.outputShape)) {
      recordFailure(
        `${relativePath} lists canonical output shape as missing: ${template.outputShape}`,
      );
    }
  }
}

async function validateTemplatePlaceholders() {
  const copilotPath = "reference/templates/copilot/agent.md";
  const copilot = await readText(copilotPath);
  requireAll(copilot, copilotPath, [
    ...commonPlaceholders,
    ...copilotPlaceholders,
  ], "copilot placeholder");

  const codexPath = "reference/templates/codex/agent.toml";
  const codex = await readText(codexPath);
  requireAll(codex, codexPath, [
    ...commonPlaceholders,
    ...codexPlaceholders,
  ], "codex placeholder");

  for (const field of codexRequiredFields) {
    const fieldPattern = new RegExp(`^${field}\\s*=`, "m");
    if (!fieldPattern.test(codex)) {
      recordFailure(`${codexPath} missing required TOML field: ${field}`);
    }
  }
}

async function validateCopilotFrontmatter() {
  const relativePath = "reference/templates/copilot/agent.md";
  const content = await readText(relativePath);
  const lines = content.split(/\r?\n/);
  if (lines[0] !== "---") {
    recordFailure(`${relativePath} must start with frontmatter delimiter ---`);
    return;
  }

  const closingIndex = lines.findIndex((line, index) => index > 0 && line === "---");
  if (closingIndex === -1) {
    recordFailure(`${relativePath} missing closing frontmatter delimiter ---`);
    return;
  }

  const bodyIndex = lines.findIndex((line) => line.includes("{{AGENT_BODY}}"));
  if (bodyIndex <= closingIndex) {
    recordFailure(`${relativePath} must place {{AGENT_BODY}} after frontmatter`);
  }
}

async function validateTemplateNonAuthorizationAndLegacyGuard() {
  for (const template of templates) {
    const content = await readText(template.path);
    const lower = content.toLowerCase();

    if (!hasNonAuthorizationStatement(content)) {
      recordFailure(
        `${template.path} missing runtime_materialization_authorized: false or equivalent non-authorization`,
      );
    }

    if (/vscode/i.test(content)) {
      recordFailure(`${template.path} mentions vscode as a template target term`);
    }

    if (
      lower.includes("reference/agents/") ||
      lower.includes(deprecatedBaseAgentSourceField)
    ) {
      recordFailure(
        `${template.path} declares deprecated base-agent materialization source`,
      );
    }
  }
}

async function validateDryRunPathMappings() {
  const relativePath = contractPath("DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md");
  const content = await readText(relativePath);
  requireAll(content, relativePath, [
    ".github/agents/<agent>.agent.md",
    ".codex/agents/<agent>.toml",
    ".codex/config.toml",
    "AGENTS.md",
  ], "canonical output path mapping");
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

async function validateManifestAndValidatorDocs() {
  const manifest = await readText("reference/MANIFEST.md");
  for (const template of templates) {
    requireIncludes(
      manifest,
      "reference/MANIFEST.md",
      template.path,
      `manifest template: ${template.path}`,
    );
  }
  requireAll(manifest, "reference/MANIFEST.md", [
    "reference/materialization_lab/contracts/SOURCE_MODEL_CONTRACT.md",
    "primary behavior source",
    expectedScriptPath,
    "template coverage validator",
    "read-only",
  ], "template coverage validator manifest registration");

  const staticChecks = await readText(validationPath("STATIC_CHECKS.md"));
  requireAll(staticChecks, validationPath("STATIC_CHECKS.md"), [
    expectedScriptPath,
    "template coverage validator",
    "read-only",
    "MATERIALIZATION_TEMPLATE_COVERAGE_CHECK: PASS",
  ], "template coverage validator static-check registration");

  const expectations = await readText(validationPath("EXCELLENT_PASS_EXPECTATIONS.md"));
  requireAll(expectations, validationPath("EXCELLENT_PASS_EXPECTATIONS.md"), [
    expectedScriptPath,
    "template coverage validator",
    "read-only",
    "MATERIALIZATION_TEMPLATE_COVERAGE_CHECK: PASS",
  ], "template coverage validator expectation registration");
}

async function main() {
  await validateNoTargetArgument();
  await validateScriptBoundary();
  await validateRequiredFiles();
  await validateTemplatesAndOutputsContract();
  await validateTemplatePlaceholders();
  await validateCopilotFrontmatter();
  await validateTemplateNonAuthorizationAndLegacyGuard();
  await validateDryRunPathMappings();
  await validateFixtureBoundaryNonAuthorization();
  await validateManifestAndValidatorDocs();

  if (failures.length === 0) {
    console.log("MATERIALIZATION_TEMPLATE_COVERAGE_CHECK: PASS");
    return;
  }

  console.log("MATERIALIZATION_TEMPLATE_COVERAGE_CHECK: FAIL");
  for (const failure of failures) {
    console.log(`- ${failure}`);
  }
  process.exitCode = 1;
}

await main();
