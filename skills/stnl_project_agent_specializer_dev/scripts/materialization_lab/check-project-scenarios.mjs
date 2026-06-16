#!/usr/bin/env node

import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const scriptDir = path.dirname(scriptPath);
const skillRoot = path.resolve(scriptDir, "../..");
const fixtureRoot = "reference/materialization_lab/fixtures/projects";
const expectedScriptPath = "scripts/materialization_lab/check-project-scenarios.mjs";

const failures = [];

const expectedScenarios = {
  backend_only_happy: ["orchestrator", "planner", "validation-eval-designer", "execution-package-designer", "coder-backend", "validation-runner", "reviewer", "finalizer", "resync"],
  frontend_only_happy: ["orchestrator", "planner", "validation-eval-designer", "execution-package-designer", "designer", "coder-frontend", "validation-runner", "reviewer", "finalizer", "resync"],
  ios_only_happy: ["orchestrator", "planner", "validation-eval-designer", "execution-package-designer", "designer", "coder-ios", "validation-runner", "reviewer", "finalizer", "resync"],
  fullstack_be_fe_happy: ["orchestrator", "planner", "validation-eval-designer", "execution-package-designer", "designer", "coder-backend", "coder-frontend", "validation-runner", "reviewer", "finalizer", "resync"],
  fullstack_be_ios_happy: ["orchestrator", "planner", "validation-eval-designer", "execution-package-designer", "designer", "coder-backend", "coder-ios", "validation-runner", "reviewer", "finalizer", "resync"],
  fullstack_be_fe_ios_happy: ["orchestrator", "planner", "validation-eval-designer", "execution-package-designer", "designer", "coder-backend", "coder-frontend", "coder-ios", "validation-runner", "reviewer", "finalizer", "resync"],
};

const requiredTemplateSources = [
  "reference/templates/copilot/agent.md",
  "reference/templates/codex/agent.toml",
  "reference/templates/codex/config.toml",
  "reference/templates/codex/AGENTS.md",
];

function recordFailure(message) {
  failures.push(message);
}

function rel(...parts) {
  return parts.join("/");
}

function abs(relativePath) {
  const normalized = path.normalize(relativePath);
  if (path.isAbsolute(normalized) || normalized.startsWith(`..${path.sep}`)) {
    throw new Error(`path escapes dev skill root: ${relativePath}`);
  }
  return path.resolve(skillRoot, normalized);
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
  try {
    return await readFile(abs(relativePath), "utf8");
  } catch (error) {
    recordFailure(`cannot read ${relativePath}: ${error.message}`);
    return "";
  }
}

function frontmatter(content, relativePath) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    recordFailure(`${relativePath} missing frontmatter`);
    return "";
  }
  return match[1];
}

function scalar(frontmatterText, field) {
  const match = frontmatterText.match(new RegExp(`^\\s*${field}:[ \\t]*(.*)$`, "m"));
  return match ? match[1].trim() : null;
}

function listAfter(frontmatterText, field) {
  const lines = frontmatterText.split(/\r?\n/);
  const fieldIndex = lines.findIndex((line) => line.trim() === `${field}:`);
  if (fieldIndex === -1) {
    recordFailure(`missing field: ${field}`);
    return [];
  }
  const values = [];
  for (let index = fieldIndex + 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (/^[a-zA-Z_][a-zA-Z0-9_]*:/.test(line) || /^  [a-zA-Z_][a-zA-Z0-9_]*:/.test(line)) {
      break;
    }
    const item = line.match(/^\s*-\s+(.*)$/);
    if (item) {
      values.push(item[1].trim());
    }
    if (line.trim() === "[]") {
      return [];
    }
  }
  return values;
}

function sameList(actual, wanted) {
  return actual.length === wanted.length && wanted.every((item, index) => actual[index] === item);
}

async function validateNoTargetArgument() {
  if (process.argv.slice(2).length > 0) {
    recordFailure("target project paths or extra arguments are not accepted by this project scenario fixture checker");
  }
}

async function validateScriptBoundary() {
  if (path.relative(abs(expectedScriptPath), scriptPath) !== "") {
    recordFailure(`script is not running from authorized path: ${expectedScriptPath}`);
  }
}

async function validateScenario(name, expectedAgents) {
  const relativePath = rel(fixtureRoot, name, "FIXTURE.md");
  if (!(await exists(relativePath))) {
    recordFailure(`missing project fixture: ${relativePath}`);
    return;
  }

  const metadata = frontmatter(await readText(relativePath), relativePath);
  const selectedAgents = listAfter(metadata, "selected_agents");
  if (!sameList(selectedAgents, expectedAgents)) {
    recordFailure(`${relativePath} selected_agents mismatch`);
  }
  if (!selectedAgents.includes("resync")) {
    recordFailure(`${relativePath} must include resync in future package`);
  }
  if ((name.includes("frontend") || name.includes("ios") || name.includes("fe_")) && !selectedAgents.includes("designer")) {
    recordFailure(`${relativePath} must include designer for simulated UX surface`);
  }
  for (const templateSource of requiredTemplateSources) {
    if (!listAfter(metadata, "template_sources").includes(templateSource)) {
      recordFailure(`${relativePath} missing explicit template source: ${templateSource}`);
    }
  }
  if (!listAfter(metadata, "forbidden_sources").includes("reference/agents/")) {
    recordFailure(`${relativePath} must forbid reference/agents/ as final source`);
  }
  if (scalar(metadata, "should_block") !== "false") {
    recordFailure(`${relativePath} happy path must declare should_block: false`);
  }
  if (scalar(metadata, "expected_verdict") !== "PASS") {
    recordFailure(`${relativePath} happy path must declare expected_verdict: PASS`);
  }
  if (scalar(metadata, "no_real_write") !== "true") {
    recordFailure(`${relativePath} must declare no_real_write: true`);
  }
  for (const requiredField of ["kernel_source", "senior_profile_source", "template_source", "materialization_contract_source"]) {
    if (listAfter(metadata, requiredField).length === 0) {
      recordFailure(`${relativePath} missing source_model.${requiredField}`);
    }
  }
}

async function main() {
  await validateNoTargetArgument();
  await validateScriptBoundary();
  for (const [name, agents] of Object.entries(expectedScenarios)) {
    await validateScenario(name, agents);
  }

  if (failures.length === 0) {
    console.log("MATERIALIZATION_PROJECT_SCENARIO_FIXTURE_CHECK: PASS");
    return;
  }

  console.log("MATERIALIZATION_PROJECT_SCENARIO_FIXTURE_CHECK: FAIL");
  for (const failure of failures) {
    console.log(`- ${failure}`);
  }
  process.exitCode = 1;
}

await main();
