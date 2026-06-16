#!/usr/bin/env node

import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const scriptDir = path.dirname(scriptPath);
const skillRoot = path.resolve(scriptDir, "../..");
const fixtureRoot = "reference/materialization_lab/fixtures/lazy_load";
const expectedScriptPath = "scripts/materialization_lab/check-lazy-load-fixtures.mjs";

const failures = [];

const expected = {
  non_trivial_loads_01: {
    pass: true,
    activated: ["01_IDENTITY_AND_BOUNDARY"],
    loaded: ["01_IDENTITY_AND_BOUNDARY"],
    forbidden: ["02_DECISION_AND_READING", "03_RISK_AND_GATES", "04_HANDOFF_EVIDENCE_AND_OUTPUT"],
    blocks: [],
  },
  decision_loads_02: {
    pass: true,
    activated: ["01_IDENTITY_AND_BOUNDARY", "02_DECISION_AND_READING"],
    loaded: ["01_IDENTITY_AND_BOUNDARY", "02_DECISION_AND_READING"],
    forbidden: ["03_RISK_AND_GATES", "04_HANDOFF_EVIDENCE_AND_OUTPUT"],
    blocks: [],
  },
  risk_loads_03: {
    pass: true,
    activated: ["01_IDENTITY_AND_BOUNDARY", "03_RISK_AND_GATES"],
    loaded: ["01_IDENTITY_AND_BOUNDARY", "03_RISK_AND_GATES"],
    forbidden: ["02_DECISION_AND_READING", "04_HANDOFF_EVIDENCE_AND_OUTPUT"],
    blocks: [],
  },
  output_loads_04: {
    pass: true,
    activated: ["01_IDENTITY_AND_BOUNDARY", "04_HANDOFF_EVIDENCE_AND_OUTPUT"],
    loaded: ["01_IDENTITY_AND_BOUNDARY", "04_HANDOFF_EVIDENCE_AND_OUTPUT"],
    forbidden: ["02_DECISION_AND_READING", "03_RISK_AND_GATES"],
    blocks: [],
  },
  load_all_default_blocks: {
    pass: false,
    activated: ["01_IDENTITY_AND_BOUNDARY"],
    loaded: ["01_IDENTITY_AND_BOUNDARY", "02_DECISION_AND_READING", "03_RISK_AND_GATES", "04_HANDOFF_EVIDENCE_AND_OUTPUT"],
    forbidden: [],
    blocks: ["BLOCKED_AGENT_LOADED_ALL_MODULES_BY_DEFAULT"],
  },
  module_03_missing_risk_blocks: {
    pass: false,
    activated: ["01_IDENTITY_AND_BOUNDARY", "03_RISK_AND_GATES"],
    loaded: ["01_IDENTITY_AND_BOUNDARY"],
    forbidden: ["02_DECISION_AND_READING", "04_HANDOFF_EVIDENCE_AND_OUTPUT"],
    blocks: ["BLOCKED_TRIGGERED_GATE_NOT_LOADED", "BLOCKED_RISK_DECISION_WITHOUT_GATES_MODULE"],
  },
  module_04_missing_output_blocks: {
    pass: false,
    activated: ["01_IDENTITY_AND_BOUNDARY", "04_HANDOFF_EVIDENCE_AND_OUTPUT"],
    loaded: ["01_IDENTITY_AND_BOUNDARY"],
    forbidden: ["02_DECISION_AND_READING", "03_RISK_AND_GATES"],
    blocks: ["BLOCKED_OUTPUT_WITHOUT_HANDOFF_EVIDENCE_MODULE"],
  },
  trace_missing_blocks: {
    pass: false,
    activated: ["01_IDENTITY_AND_BOUNDARY", "02_DECISION_AND_READING"],
    loaded: ["01_IDENTITY_AND_BOUNDARY", "02_DECISION_AND_READING"],
    forbidden: ["03_RISK_AND_GATES", "04_HANDOFF_EVIDENCE_AND_OUTPUT"],
    blocks: ["BLOCKED_LAZY_LOAD_TRACE_MISSING"],
  },
};

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

function sameSet(actual, wanted) {
  return actual.length === wanted.length && wanted.every((item) => actual.includes(item));
}

function requireSet(relativePath, label, actual, wanted) {
  if (!sameSet(actual, wanted)) {
    recordFailure(`${relativePath} ${label} mismatch: expected ${wanted.join(", ")}, got ${actual.join(", ")}`);
  }
}

async function validateNoTargetArgument() {
  if (process.argv.slice(2).length > 0) {
    recordFailure("target project paths or extra arguments are not accepted by this lazy-load fixture checker");
  }
}

async function validateScriptBoundary() {
  if (path.relative(abs(expectedScriptPath), scriptPath) !== "") {
    recordFailure(`script is not running from authorized path: ${expectedScriptPath}`);
  }
}

async function validateFixture(name, spec) {
  const relativePath = rel(fixtureRoot, name, "FIXTURE.md");
  if (!(await exists(relativePath))) {
    recordFailure(`missing lazy-load fixture: ${relativePath}`);
    return;
  }

  const metadata = frontmatter(await readText(relativePath), relativePath);
  if (scalar(metadata, "fixture_type") !== (spec.pass ? "lazy_load_positive" : "lazy_load_negative")) {
    recordFailure(`${relativePath} has wrong fixture_type`);
  }
  requireSet(relativePath, "activated_modules", listAfter(metadata, "activated_modules"), spec.activated);
  requireSet(relativePath, "loaded_modules", listAfter(metadata, "loaded_modules"), spec.loaded);
  requireSet(relativePath, "forbidden_modules", listAfter(metadata, "forbidden_modules"), spec.forbidden);
  requireSet(relativePath, "block_codes", listAfter(metadata, "block_codes"), spec.blocks);

  const shouldBlock = scalar(metadata, "should_block");
  const verdict = scalar(metadata, "expected_verdict");
  const dependsOnVerified = scalar(metadata, "depends_on_verified");
  if (spec.pass) {
    if (shouldBlock !== "false" || verdict !== "PASS" || dependsOnVerified !== "true") {
      recordFailure(`${relativePath} positive lazy-load fixture must pass and verify dependencies`);
    }
  } else if (shouldBlock !== "true" || verdict !== "BLOCKED") {
    recordFailure(`${relativePath} negative lazy-load fixture must block`);
  }
}

async function main() {
  await validateNoTargetArgument();
  await validateScriptBoundary();
  for (const [name, spec] of Object.entries(expected)) {
    await validateFixture(name, spec);
  }

  if (failures.length === 0) {
    console.log("MATERIALIZATION_LAZY_LOAD_FIXTURE_CHECK: PASS");
    return;
  }

  console.log("MATERIALIZATION_LAZY_LOAD_FIXTURE_CHECK: FAIL");
  for (const failure of failures) {
    console.log(`- ${failure}`);
  }
  process.exitCode = 1;
}

await main();
