#!/usr/bin/env node

import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const scriptDir = path.dirname(scriptPath);
const skillRoot = path.resolve(scriptDir, "../..");
const fixtureRoot = "reference/materialization_lab/fixtures";
const expectedScriptPath = "scripts/materialization_lab/check-fixture-boundary.mjs";

const failures = [];
const textCache = new Map();

const allowedFixtures = {
  projects: [
    "backend_only_happy",
    "frontend_only_happy",
    "ios_only_happy",
    "fullstack_be_fe_happy",
    "fullstack_be_ios_happy",
    "fullstack_be_fe_ios_happy",
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
  expected_outputs: [
    "minimal_copilot_agent_snapshot",
    "minimal_codex_agent_snapshot",
    "minimal_codex_config_snapshot",
    "minimal_agents_md_snapshot",
  ],
};

const requiredFixtureFields = [
  "fixture_id",
  "fixture_type",
  "status",
  "scenario",
  "purpose",
  "dev_only",
  "no_real_write",
  "source_model",
  "kernel_source",
  "senior_profile_source",
  "template_source",
  "materialization_contract_source",
  "forbidden_sources",
  "selected_agents",
  "target_surface",
  "template_sources",
  "lazy_load_expectation",
  "demand_type",
  "activated_modules",
  "loaded_modules",
  "forbidden_modules",
  "depends_on_verified",
  "decision_trace_required",
  "output_trace_required",
  "expected_outputs",
  "mode",
  "snapshots",
  "forbidden_real_paths",
  "blocked_expectation",
  "should_block",
  "block_codes",
  "target_safety",
  "fixture_root",
  "simulated_target_paths",
  "forbidden_real_target_paths",
  "validation",
  "responsible_checks",
  "expected_verdict",
];

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

async function readDir(relativePath) {
  try {
    const entries = await readdir(abs(relativePath), { withFileTypes: true });
    return entries.filter((entry) => !isIgnoredName(entry.name));
  } catch (error) {
    recordFailure(`cannot read directory ${relativePath}: ${error.message}`);
    return [];
  }
}

async function requireFile(relativePath) {
  if (!(await exists(relativePath))) {
    recordFailure(`missing required file: ${relativePath}`);
    return false;
  }
  return true;
}

function frontmatterBlock(content, relativePath) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    recordFailure(`${relativePath} missing frontmatter metadata block`);
    return "";
  }
  return match[1];
}

function scalar(frontmatter, field) {
  const match = frontmatter.match(new RegExp(`^\\s*${field}:[ \\t]*(.*)$`, "m"));
  return match ? match[1].trim().replace(/^["']|["']$/g, "") : null;
}

function listAfter(frontmatter, field) {
  const lines = frontmatter.split(/\r?\n/);
  const fieldIndex = lines.findIndex((line) => line.trim() === `${field}:`);
  if (fieldIndex === -1) {
    return null;
  }

  const values = [];
  for (let index = fieldIndex + 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (/^[a-zA-Z_][a-zA-Z0-9_]*:/.test(line)) {
      break;
    }
    if (/^  [a-zA-Z_][a-zA-Z0-9_]*:/.test(line) && !line.trim().startsWith("-")) {
      break;
    }
    const item = line.match(/^\s*-\s+(.*)$/);
    if (item) {
      values.push(item[1].trim().replace(/^["']|["']$/g, ""));
    }
    if (line.trim() === "[]") {
      return [];
    }
  }
  return values;
}

function allDeclaredBlockCodes(content) {
  return new Set(content.match(/BLOCKED_[A-Z0-9_]+/g) ?? []);
}

function isUnsafePath(value) {
  return (
    path.posix.isAbsolute(value) ||
    path.win32.isAbsolute(value) ||
    value.split(/[\\/]/).includes("..")
  );
}

function validatePathList(values, relativePath, field) {
  for (const value of values ?? []) {
    if (isUnsafePath(value)) {
      recordFailure(`${relativePath} has unsafe ${field}: ${value}`);
    }
  }
}

async function validateNoTargetArgument() {
  if (process.argv.slice(2).length > 0) {
    recordFailure("target project paths or extra arguments are not accepted by this fixture boundary checker");
  }
}

async function validateScriptBoundary() {
  if (path.relative(abs(expectedScriptPath), scriptPath) !== "") {
    recordFailure(`script is not running from authorized path: ${expectedScriptPath}`);
  }
}

async function validateFixtureTree() {
  await requireFile(rel(fixtureRoot, "README.md"));
  await requireFile(rel(fixtureRoot, "FIXTURE_SCHEMA.md"));
  await requireFile(rel(fixtureRoot, "expected_outputs/SNAPSHOT_POLICY.md"));

  const rootEntries = await readDir(fixtureRoot);
  const allowedRoot = new Set(["README.md", "FIXTURE_SCHEMA.md", ...Object.keys(allowedFixtures)]);
  for (const entry of rootEntries) {
    if (!allowedRoot.has(entry.name)) {
      recordFailure(`${fixtureRoot} contains unauthorized entry: ${entry.name}`);
    }
  }

  for (const [category, fixtureNames] of Object.entries(allowedFixtures)) {
    const categoryPath = rel(fixtureRoot, category);
    await requireFile(rel(categoryPath, "README.md"));
    const allowed = new Set(["README.md", ...fixtureNames]);
    if (category === "expected_outputs") {
      allowed.add("SNAPSHOT_POLICY.md");
    }

    for (const entry of await readDir(categoryPath)) {
      if (!allowed.has(entry.name)) {
        recordFailure(`${categoryPath} contains unauthorized fixture entry: ${entry.name}`);
      }
    }

    for (const fixtureName of fixtureNames) {
      const fixtureDir = rel(categoryPath, fixtureName);
      const fixtureFile = rel(fixtureDir, "FIXTURE.md");
      await requireFile(fixtureFile);
      for (const entry of await readDir(fixtureDir)) {
        if (entry.name !== "FIXTURE.md") {
          recordFailure(`${fixtureDir} contains unauthorized payload file: ${entry.name}`);
        }
      }
    }
  }
}

async function validateFixtureFile(relativePath, knownBlockCodes) {
  const content = await readText(relativePath);
  const frontmatter = frontmatterBlock(content, relativePath);

  for (const field of requiredFixtureFields) {
    if (!new RegExp(`(^|\\n)\\s*${field}:`, "m").test(frontmatter)) {
      recordFailure(`${relativePath} missing fixture schema field: ${field}`);
    }
  }

  if (scalar(frontmatter, "status") !== "complete") {
    recordFailure(`${relativePath} must declare status: complete`);
  }
  if (scalar(frontmatter, "dev_only") !== "true") {
    recordFailure(`${relativePath} must declare dev_only: true`);
  }
  if (scalar(frontmatter, "no_real_write") !== "true") {
    recordFailure(`${relativePath} must declare no_real_write: true`);
  }
  if (scalar(frontmatter, "fixture_root") !== "reference/materialization_lab/fixtures/") {
    recordFailure(`${relativePath} must use the authorized fixture_root`);
  }

  const forbiddenSources = listAfter(frontmatter, "forbidden_sources") ?? [];
  if (!forbiddenSources.includes("reference/agents/")) {
    recordFailure(`${relativePath} must list reference/agents/ as forbidden source`);
  }

  validatePathList(listAfter(frontmatter, "kernel_source"), relativePath, "kernel_source");
  validatePathList(listAfter(frontmatter, "senior_profile_source"), relativePath, "senior_profile_source");
  validatePathList(listAfter(frontmatter, "template_source"), relativePath, "template_source");
  validatePathList(listAfter(frontmatter, "template_sources"), relativePath, "template_sources");
  validatePathList(listAfter(frontmatter, "snapshots"), relativePath, "snapshots");
  validatePathList(listAfter(frontmatter, "simulated_target_paths"), relativePath, "simulated_target_paths");

  const shouldBlock = scalar(frontmatter, "should_block");
  const blockCodes = listAfter(frontmatter, "block_codes") ?? [];
  if (shouldBlock === "true" && blockCodes.length === 0) {
    recordFailure(`${relativePath} blocks but declares no block_codes`);
  }
  if (shouldBlock === "false" && blockCodes.length !== 0) {
    recordFailure(`${relativePath} passes but declares block_codes`);
  }
  for (const blockCode of blockCodes) {
    if (!knownBlockCodes.has(blockCode)) {
      recordFailure(`${relativePath} declares unknown block code: ${blockCode}`);
    }
  }

  for (const section of [
    "# Fixture Intent",
    "# Source Model Evidence",
    "# Agent Selection Evidence",
    "# Lazy Load Evidence",
    "# Target Safety Evidence",
    "# Expected Result",
  ]) {
    if (!content.includes(section)) {
      recordFailure(`${relativePath} missing documentary section: ${section}`);
    }
  }
}

async function validateFixtureContents() {
  const contractAndValidationText = [
    "reference/materialization_lab/contracts/SOURCE_MODEL_CONTRACT.md",
    "reference/materialization_lab/contracts/TEMPLATES_AND_OUTPUTS_CONTRACT.md",
    "reference/materialization_lab/contracts/RENDERING_AND_COMPOSITION_CONTRACT.md",
    "reference/materialization_lab/contracts/DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md",
    "reference/materialization_lab/contracts/VALIDATION_HARNESS_CONTRACT.md",
    "reference/materialization_lab/contracts/IMPLEMENTATION_BOUNDARY_CONTRACT.md",
    "reference/materialization_lab/contracts/FIXTURE_BOUNDARY_CONTRACT.md",
    "reference/materialization_lab/validation/STATIC_CHECKS.md",
    "reference/materialization_lab/validation/GOLDEN_SCENARIOS.md",
    "reference/materialization_lab/validation/EXCELLENT_PASS_EXPECTATIONS.md",
  ];
  const knownBlockCodes = new Set();
  for (const relativePath of contractAndValidationText) {
    for (const blockCode of allDeclaredBlockCodes(await readText(relativePath))) {
      knownBlockCodes.add(blockCode);
    }
  }

  for (const [category, fixtureNames] of Object.entries(allowedFixtures)) {
    for (const fixtureName of fixtureNames) {
      await validateFixtureFile(rel(fixtureRoot, category, fixtureName, "FIXTURE.md"), knownBlockCodes);
    }
  }
}

async function walk(relativePath, visit) {
  for (const entry of await readDir(relativePath)) {
    const entryPath = rel(relativePath, entry.name);
    await visit(entryPath, entry);
    if (entry.isDirectory()) {
      await walk(entryPath, visit);
    }
  }
}

async function validateNoRealArtifacts() {
  await walk("reference/materialization_lab/fixtures/expected_outputs", (entryPath, entry) => {
    if (!entry.isFile()) {
      return;
    }
    if (entry.name !== "FIXTURE.md" && entry.name !== "README.md" && entry.name !== "SNAPSHOT_POLICY.md") {
      recordFailure(`expected_outputs contains real snapshot payload file: ${entryPath}`);
    }
  });

  await walk(".", (entryPath, entry) => {
    if (entryPath.split(/[\\/]/).some(isIgnoredName)) {
      return;
    }
    if (entryPath.startsWith(`${fixtureRoot}/`)) {
      return;
    }
    if (entryPath === "./reference/templates/codex/AGENTS.md") {
      return;
    }
    if (entry.isDirectory() && (entry.name === ".github" || entry.name === ".codex")) {
      recordFailure(`real target artifact directory exists outside fixtures: ${entryPath}`);
    }
    if (entry.isFile() && entry.name === "AGENTS.md") {
      recordFailure(`real AGENTS.md exists outside fixtures: ${entryPath}`);
    }
  });
}

async function validateNoRuntimeEntrypoints() {
  const forbiddenNames = [
    "materializer.mjs",
    "renderer.mjs",
    "writer.mjs",
    "loader.mjs",
    "scenario-selector.mjs",
  ];
  for (const fileName of forbiddenNames) {
    if (await exists(rel("scripts/materialization_lab", fileName))) {
      recordFailure(`forbidden runtime entrypoint exists: scripts/materialization_lab/${fileName}`);
    }
  }
}

async function main() {
  await validateNoTargetArgument();
  await validateScriptBoundary();
  await validateFixtureTree();
  await validateFixtureContents();
  await validateNoRealArtifacts();
  await validateNoRuntimeEntrypoints();

  if (failures.length === 0) {
    console.log("MATERIALIZATION_FIXTURE_BOUNDARY_CHECK: PASS");
    return;
  }

  console.log("MATERIALIZATION_FIXTURE_BOUNDARY_CHECK: FAIL");
  for (const failure of failures) {
    console.log(`- ${failure}`);
  }
  process.exitCode = 1;
}

await main();
