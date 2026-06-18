#!/usr/bin/env node

import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const scriptDir = path.dirname(scriptPath);
const skillRoot = path.resolve(scriptDir, "../..");
const expectedScriptPath =
  "scripts/materialization_lab/check-fixture-render-dry-run-integration.mjs";
const fixtureRoot = "reference/materialization_lab/fixtures";

const failures = [];
const textCache = new Map();

const requiredCheckers = [
  "scripts/materialization_lab/check-static.mjs",
  "scripts/materialization_lab/check-source-inventory.mjs",
  "scripts/materialization_lab/check-template-coverage.mjs",
  "scripts/materialization_lab/check-render-context.mjs",
  "scripts/materialization_lab/check-dry-run-plan.mjs",
  "scripts/materialization_lab/check-fixture-boundary.mjs",
  "scripts/materialization_lab/check-lazy-load-fixtures.mjs",
  "scripts/materialization_lab/check-project-scenarios.mjs",
];

const expectedFixtures = {
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

const explicitTemplates = new Set([
  "reference/templates/copilot/agent.md",
  "reference/templates/codex/agent.toml",
  "reference/templates/codex/config.toml",
  "reference/templates/codex/AGENTS.md",
]);

const expectedProjectAgents = {
  backend_only_happy: [
    "orchestrator",
    "planner",
    "validation-eval-designer",
    "execution-package-designer",
    "coder-backend",
    "validation-runner",
    "reviewer",
    "finalizer",
    "resync",
  ],
  frontend_only_happy: [
    "orchestrator",
    "planner",
    "validation-eval-designer",
    "execution-package-designer",
    "designer",
    "coder-frontend",
    "validation-runner",
    "reviewer",
    "finalizer",
    "resync",
  ],
  ios_only_happy: [
    "orchestrator",
    "planner",
    "validation-eval-designer",
    "execution-package-designer",
    "designer",
    "coder-ios",
    "validation-runner",
    "reviewer",
    "finalizer",
    "resync",
  ],
  fullstack_be_fe_happy: [
    "orchestrator",
    "planner",
    "validation-eval-designer",
    "execution-package-designer",
    "designer",
    "coder-backend",
    "coder-frontend",
    "validation-runner",
    "reviewer",
    "finalizer",
    "resync",
  ],
  fullstack_be_ios_happy: [
    "orchestrator",
    "planner",
    "validation-eval-designer",
    "execution-package-designer",
    "designer",
    "coder-backend",
    "coder-ios",
    "validation-runner",
    "reviewer",
    "finalizer",
    "resync",
  ],
  fullstack_be_fe_ios_happy: [
    "orchestrator",
    "planner",
    "validation-eval-designer",
    "execution-package-designer",
    "designer",
    "coder-backend",
    "coder-frontend",
    "coder-ios",
    "validation-runner",
    "reviewer",
    "finalizer",
    "resync",
  ],
};

const blockedCaseRoutes = {
  missing_template: {
    layers: ["template coverage"],
    blockCodes: ["BLOCKED_TEMPLATE_MISSING"],
  },
  inferred_template: {
    layers: ["template coverage"],
    blockCodes: ["BLOCKED_TEMPLATE_INFERRED"],
  },
  forbidden_target_path: {
    layers: ["dry-run/write-boundary"],
    blockCodes: ["BLOCKED_PATH_UNSAFE"],
  },
  reference_agents_final_source: {
    layers: ["source/render/dry-run/source model"],
    blockCodes: ["BLOCKED_BASE_AGENT_FINAL_DEPENDENCY"],
  },
  write_github_real: {
    layers: ["fixture boundary", "implementation boundary"],
    blockCodes: ["BLOCKED_FIXTURE_ESCAPES_DEV_SKILL", "BLOCKED_TARGET_FILE_MUTATION"],
  },
  write_codex_real: {
    layers: ["fixture boundary", "target write boundary"],
    blockCodes: ["BLOCKED_FIXTURE_ESCAPES_DEV_SKILL", "BLOCKED_TARGET_FILE_MUTATION"],
  },
  write_agents_md_real: {
    layers: ["fixture boundary", "target write boundary"],
    blockCodes: ["BLOCKED_FIXTURE_ESCAPES_DEV_SKILL", "BLOCKED_TARGET_FILE_MUTATION"],
  },
  runtime_materializer_created: {
    layers: ["implementation boundary"],
    blockCodes: ["BLOCKED_RUNTIME_MATERIALIZER_CREATED"],
  },
  productive_skill_mutation: {
    layers: ["implementation boundary"],
    blockCodes: ["BLOCKED_PRODUCTIVE_SKILL_MUTATION"],
  },
  github_write: {
    layers: ["implementation boundary", "GitHub boundary"],
    blockCodes: ["BLOCKED_GITHUB_WRITE"],
  },
};

const fixtureTypeByCategory = {
  projects: "project_positive",
  expected_outputs: "expected_output_snapshot",
};

function recordFailure() {
  failures.push(true);
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
    recordFailure();
    return "";
  }
  try {
    const content = await readFile(abs(relativePath), "utf8");
    textCache.set(relativePath, content);
    return content;
  } catch {
    recordFailure();
    return "";
  }
}

async function readDir(relativePath) {
  try {
    const entries = await readdir(abs(relativePath), { withFileTypes: true });
    return entries.filter((entry) => !isIgnoredName(entry.name));
  } catch {
    recordFailure();
    return [];
  }
}

async function requireFile(relativePath) {
  if (!(await exists(relativePath))) {
    recordFailure();
    return false;
  }
  return true;
}

function frontmatter(content) {
  return content.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? "";
}

function scalar(metadata, field) {
  const match = metadata.match(new RegExp(`^\\s*${field}:[ \\t]*(.*)$`, "m"));
  return match ? match[1].trim().replace(/^["']|["']$/g, "") : null;
}

function listAfter(metadata, field) {
  const lines = metadata.split(/\r?\n/);
  const fieldIndex = lines.findIndex((line) => line.trim() === `${field}:`);
  if (fieldIndex === -1) {
    return [];
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

function sameList(actual, expected) {
  return actual.length === expected.length && expected.every((item, index) => actual[index] === item);
}

function sameSet(actual, expected) {
  return actual.length === expected.length && expected.every((item) => actual.includes(item));
}

function isUnsafePath(value) {
  return (
    path.posix.isAbsolute(value) ||
    path.win32.isAbsolute(value) ||
    value.split(/[\\/]/).includes("..")
  );
}

function hasRealTargetPath(value) {
  return (
    value === ".github" ||
    value === ".codex" ||
    value === "AGENTS.md" ||
    value.startsWith(".github/") ||
    value.startsWith(".codex/") ||
    value.startsWith("skills/stnl_project_agent_specializer/")
  );
}

function hasFinalReferenceAgentsSource(projection) {
  const sourceValues = [
    ...projection.source_model.kernel_source,
    ...projection.source_model.senior_profile_source,
    ...projection.source_model.template_source,
    ...projection.source_model.materialization_contract_source,
  ];
  return sourceValues.some((value) => value.includes("reference/agents/"));
}

async function projectionFor(relativePath) {
  const content = await readText(relativePath);
  const metadata = frontmatter(content);
  if (!metadata) {
    recordFailure();
  }
  return {
    fixture_path: relativePath,
    fixture_id: scalar(metadata, "fixture_id"),
    fixture_type: scalar(metadata, "fixture_type"),
    scenario: scalar(metadata, "scenario"),
    dev_only: scalar(metadata, "dev_only") === "true",
    no_real_write: scalar(metadata, "no_real_write") === "true",
    selected_agents: listAfter(metadata, "selected_agents"),
    target_surface: scalar(metadata, "target_surface"),
    source_model: {
      kernel_source: listAfter(metadata, "kernel_source"),
      senior_profile_source: listAfter(metadata, "senior_profile_source"),
      template_source: listAfter(metadata, "template_source"),
      materialization_contract_source: listAfter(metadata, "materialization_contract_source"),
      forbidden_sources: listAfter(metadata, "forbidden_sources"),
    },
    template_sources: listAfter(metadata, "template_sources"),
    expected_outputs: {
      mode: scalar(metadata, "mode"),
      snapshots: listAfter(metadata, "snapshots"),
      forbidden_real_paths: listAfter(metadata, "forbidden_real_paths"),
    },
    target_safety: {
      fixture_root: scalar(metadata, "fixture_root"),
      simulated_target_paths: listAfter(metadata, "simulated_target_paths"),
      forbidden_real_target_paths: listAfter(metadata, "forbidden_real_target_paths"),
    },
    blocked_expectation: {
      should_block: scalar(metadata, "should_block") === "true",
      block_codes: listAfter(metadata, "block_codes"),
    },
    validation: {
      responsible_checks: listAfter(metadata, "responsible_checks"),
      expected_verdict: scalar(metadata, "expected_verdict"),
    },
    content,
  };
}

async function collectDeclaredBlockCodes() {
  const roots = [
    "reference/materialization_lab/contracts",
    "reference/materialization_lab/validation",
    "reference/seniorization_lab/contracts",
  ];
  const codes = new Set();

  async function visit(relativePath) {
    const entries = await readDir(relativePath);
    for (const entry of entries) {
      const child = rel(relativePath, entry.name);
      if (entry.isDirectory()) {
        await visit(child);
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        const content = await readText(child);
        for (const code of content.match(/BLOCKED_[A-Z0-9_]+/g) ?? []) {
          codes.add(code);
        }
      }
    }
  }

  for (const root of roots) {
    await visit(root);
  }
  return codes;
}

async function validateNoTargetArgument() {
  if (process.argv.slice(2).length > 0) {
    recordFailure();
  }
}

async function validateScriptBoundary() {
  if (path.relative(abs(expectedScriptPath), scriptPath) !== "") {
    recordFailure();
  }
  for (const checker of requiredCheckers) {
    await requireFile(checker);
  }
}

async function validateInventory() {
  await requireFile(rel(fixtureRoot, "README.md"));
  await requireFile(rel(fixtureRoot, "FIXTURE_SCHEMA.md"));
  await requireFile(rel(fixtureRoot, "expected_outputs/SNAPSHOT_POLICY.md"));

  for (const [category, fixtureNames] of Object.entries(expectedFixtures)) {
    const entries = await readDir(rel(fixtureRoot, category));
    const directories = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
    if (!sameSet(directories, fixtureNames)) {
      recordFailure();
    }
    for (const fixtureName of fixtureNames) {
      await requireFile(rel(fixtureRoot, category, fixtureName, "FIXTURE.md"));
    }
  }
}

async function validateTemplates(projection) {
  const combined = [
    ...projection.source_model.template_source,
    ...projection.template_sources,
  ];
  if (combined.length === 0) {
    recordFailure();
  }

  for (const templateSource of combined) {
    if (!templateSource || !templateSource.startsWith("reference/templates/")) {
      recordFailure();
      continue;
    }
    if (projection.fixture_id === "blocked_cases/missing_template") {
      if (templateSource !== "reference/templates/missing/agent.md") {
        recordFailure();
      }
      continue;
    }
    if (!explicitTemplates.has(templateSource) || !(await exists(templateSource))) {
      recordFailure();
    }
  }
}

function validateSourceModel(projection) {
  for (const field of [
    "kernel_source",
    "senior_profile_source",
    "template_source",
    "materialization_contract_source",
  ]) {
    if (projection.source_model[field].length === 0) {
      recordFailure();
    }
  }
  if (!projection.source_model.forbidden_sources.includes("reference/agents/")) {
    recordFailure();
  }
  if (projection.content.includes("base_agent_source")) {
    recordFailure();
  }
  if (hasFinalReferenceAgentsSource(projection)) {
    recordFailure();
  }
}

function validateTargetSafety(projection) {
  if (projection.target_safety.fixture_root !== `${fixtureRoot}/`) {
    recordFailure();
  }
  if (projection.target_safety.simulated_target_paths.length === 0) {
    recordFailure();
  }
  for (const simulatedPath of projection.target_safety.simulated_target_paths) {
    if (isUnsafePath(simulatedPath) || hasRealTargetPath(simulatedPath)) {
      recordFailure();
    }
  }
  for (const expectedForbidden of [
    ".github/**",
    ".codex/**",
    "AGENTS.md",
    "skills/stnl_project_agent_specializer/**",
  ]) {
    if (!projection.target_safety.forbidden_real_target_paths.includes(expectedForbidden)) {
      recordFailure();
    }
    if (!projection.expected_outputs.forbidden_real_paths.includes(expectedForbidden)) {
      recordFailure();
    }
  }
}

function validateCommonProjection(projection) {
  for (const field of [
    "fixture_id",
    "fixture_type",
    "scenario",
    "target_surface",
  ]) {
    if (!projection[field]) {
      recordFailure();
    }
  }
  if (!projection.dev_only || !projection.no_real_write) {
    recordFailure();
  }
  if (!projection.expected_outputs.mode?.includes("fixture-only")) {
    recordFailure();
  }
  validateSourceModel(projection);
  validateTargetSafety(projection);
}

function validateProjectFixture(name, projection) {
  if (projection.fixture_type !== fixtureTypeByCategory.projects) {
    recordFailure();
  }
  if (!sameList(projection.selected_agents, expectedProjectAgents[name])) {
    recordFailure();
  }
  if (!sameSet(projection.template_sources, [...explicitTemplates])) {
    recordFailure();
  }
  if (projection.blocked_expectation.should_block) {
    recordFailure();
  }
  if (projection.validation.expected_verdict !== "PASS") {
    recordFailure();
  }
}

async function validateExpectedOutputFixture(name, projection) {
  if (projection.fixture_type !== fixtureTypeByCategory.expected_outputs) {
    recordFailure();
  }
  if (projection.blocked_expectation.should_block) {
    recordFailure();
  }
  if (projection.validation.expected_verdict !== "PASS") {
    recordFailure();
  }
  if (projection.expected_outputs.snapshots.length === 0) {
    recordFailure();
  }
  const fixtureDir = rel(fixtureRoot, "expected_outputs", name);
  const entries = await readDir(fixtureDir);
  if (!sameSet(entries.map((entry) => entry.name), ["FIXTURE.md"])) {
    recordFailure();
  }
  for (const snapshotPath of projection.expected_outputs.snapshots) {
    if (isUnsafePath(snapshotPath) || !snapshotPath.startsWith(`expected_outputs/${name}/`)) {
      recordFailure();
    }
    if (await exists(rel(fixtureRoot, snapshotPath))) {
      recordFailure();
    }
  }
  if (!projection.content.includes("does not copy or render the template")) {
    recordFailure();
  }
}

function validateBlockedCase(name, projection, declaredBlockCodes) {
  const route = blockedCaseRoutes[name];
  if (!route) {
    recordFailure();
    return;
  }
  if (projection.fixture_type !== "blocked_case") {
    recordFailure();
  }
  if (!projection.blocked_expectation.should_block) {
    recordFailure();
  }
  if (projection.validation.expected_verdict !== "BLOCKED") {
    recordFailure();
  }
  if (!sameSet(projection.blocked_expectation.block_codes, route.blockCodes)) {
    recordFailure();
  }
  if (route.layers.length === 0) {
    recordFailure();
  }
  for (const blockCode of projection.blocked_expectation.block_codes) {
    if (!declaredBlockCodes.has(blockCode)) {
      recordFailure();
    }
  }
}

function validateLazyGate(projection, declaredBlockCodes) {
  if (!projection.fixture_id?.startsWith("lazy_load/")) {
    return;
  }
  if (!projection.validation.responsible_checks.includes("check-lazy-load-fixtures.mjs")) {
    recordFailure();
  }
  if (!projection.content.includes("No target project")) {
    recordFailure();
  }
  for (const blockCode of projection.blocked_expectation.block_codes) {
    if (!declaredBlockCodes.has(blockCode)) {
      recordFailure();
    }
  }
  if (projection.scenario === "load all default") {
    if (
      !projection.blocked_expectation.block_codes.includes(
        "BLOCKED_AGENT_LOADED_ALL_MODULES_BY_DEFAULT",
      )
    ) {
      recordFailure();
    }
  }
}

async function validateNoRealArtifacts() {
  for (const realPath of [".github", ".codex", "AGENTS.md"]) {
    if (await exists(realPath)) {
      recordFailure();
    }
  }
}

async function validateRegistrationDocs() {
  const requiredAnchors = [
    expectedScriptPath,
    "MATERIALIZATION_FIXTURE_RENDER_DRY_RUN_INTEGRATION_CHECK: PASS",
    "normalized fixture",
    "projections",
    "read-only fixture to render/dry-run integration",
    "lazy-load gate",
    "independent",
  ];
  for (const doc of [
    "reference/MANIFEST.md",
    "reference/materialization_lab/README.md",
    "reference/materialization_lab/contracts/VALIDATION_HARNESS_CONTRACT.md",
    "reference/materialization_lab/contracts/RENDERING_AND_COMPOSITION_CONTRACT.md",
    "reference/materialization_lab/contracts/DRY_RUN_AND_WRITE_BOUNDARY_CONTRACT.md",
    "reference/materialization_lab/contracts/TEMPLATES_AND_OUTPUTS_CONTRACT.md",
    "reference/materialization_lab/contracts/FIXTURE_BOUNDARY_CONTRACT.md",
    "reference/materialization_lab/contracts/IMPLEMENTATION_BOUNDARY_CONTRACT.md",
    "reference/materialization_lab/validation/STATIC_CHECKS.md",
    "reference/materialization_lab/validation/GOLDEN_SCENARIOS.md",
    "reference/materialization_lab/validation/EXCELLENT_PASS_EXPECTATIONS.md",
  ]) {
    const content = await readText(doc);
    for (const anchor of requiredAnchors) {
      if (!content.includes(anchor)) {
        recordFailure();
      }
    }
  }
}

async function main() {
  await validateNoTargetArgument();
  await validateScriptBoundary();
  await validateInventory();
  await validateNoRealArtifacts();
  await validateRegistrationDocs();

  const declaredBlockCodes = await collectDeclaredBlockCodes();

  for (const [category, names] of Object.entries(expectedFixtures)) {
    for (const name of names) {
      const projection = await projectionFor(rel(fixtureRoot, category, name, "FIXTURE.md"));
      validateCommonProjection(projection);
      await validateTemplates(projection);

      if (category === "projects") {
        validateProjectFixture(name, projection);
      } else if (category === "expected_outputs") {
        await validateExpectedOutputFixture(name, projection);
      } else if (category === "blocked_cases") {
        validateBlockedCase(name, projection, declaredBlockCodes);
      } else if (category === "lazy_load") {
        validateLazyGate(projection, declaredBlockCodes);
      }
    }
  }

  if (failures.length === 0) {
    console.log("MATERIALIZATION_FIXTURE_RENDER_DRY_RUN_INTEGRATION_CHECK: PASS");
    return;
  }

  console.log("MATERIALIZATION_FIXTURE_RENDER_DRY_RUN_INTEGRATION_CHECK: BLOCKED");
  process.exitCode = 1;
}

await main();
