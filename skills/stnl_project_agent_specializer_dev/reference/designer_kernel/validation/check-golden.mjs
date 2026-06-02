#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const validationRoot = path.dirname(scriptPath);
const kernelRoot = path.resolve(validationRoot, "..");
const referenceRoot = path.resolve(kernelRoot, "..");
const devSkillRoot = path.resolve(referenceRoot, "..");
const repoRoot = path.resolve(devSkillRoot, "..", "..");
const realRepoRoot = fs.realpathSync.native(repoRoot);
const ignoredNames = new Set(["__MACOSX", ".DS_Store"]);

const kernelPrefix =
  "skills/stnl_project_agent_specializer_dev/reference/designer_kernel";
const staticHarnessPath = path.join(validationRoot, "check-static.mjs");
const goldenDocPath = `${kernelPrefix}/validation/GOLDEN_TESTS.md`;
const snapshotPath =
  "skills/stnl_project_agent_specializer_dev/reference/agents/designer.agent.md";
const contractPaths = [
  `${kernelPrefix}/contracts/CONTRACT.md`,
  `${kernelPrefix}/contracts/BEHAVIOR_PARITY_SPINE.md`,
  `${kernelPrefix}/contracts/DESIGN_CONTRIBUTION_GATES.md`,
  `${kernelPrefix}/contracts/MINIMUM_SAFE_BUNDLE.md`,
];

const goldenTests = [
  {
    id: "DSG-GT-001",
    title: "Required design contribution reaches READY",
    blocker: "BLOCKED_DSG_READY_WITHOUT_DESIGN_EVIDENCE",
    phrases: ["required", "real UX impact", "READY", "states", "accessibility", "responsive", "handoff cues"],
  },
  {
    id: "DSG-GT-002",
    title: "Advisory contribution remains bypassable only when safe",
    blocker: "BLOCKED_DSG_ADVISORY_TREATED_AS_MANDATORY",
    phrases: ["advisory", "orchestrator decides continuation", "without design guessing"],
  },
  {
    id: "DSG-GT-003",
    title: "No real UX impact does not enter",
    blocker: "BLOCKED_DSG_NO_UX_IMPACT_READY",
    phrases: ["backend", "infra", "schema", "no real UX impact", "no-entry"],
  },
  {
    id: "DSG-GT-004",
    title: "Required missing context blocks honestly",
    blocker: "BLOCKED_DSG_REQUIRED_CONTEXT_GUESSED",
    phrases: ["required", "BLOCKED", "missing fact or decision", "orchestrator or DEV"],
  },
  {
    id: "DSG-GT-005",
    title: "Planner drift is rejected",
    blocker: "BLOCKED_DSG_PLANNER_DRIFT",
    phrases: ["rewrites scope", "chooses a new cut", "planner drift", "orchestrator or DEV"],
  },
  {
    id: "DSG-GT-006",
    title: "VALIDATION PACK ownership drift is rejected",
    blocker: "BLOCKED_DSG_VALIDATION_PACK_OWNERSHIP",
    phrases: ["VALIDATION PACK", "validation sufficiency", "Reject validation ownership drift"],
  },
  {
    id: "DSG-GT-007",
    title: "EXECUTION PACKAGE ownership drift is rejected",
    blocker: "BLOCKED_DSG_EXECUTION_PACKAGE_OWNERSHIP",
    phrases: ["EXECUTION PACKAGE", "package readiness", "implementation order", "Reject execution package drift"],
  },
  {
    id: "DSG-GT-008",
    title: "Implementation and validation running are rejected",
    blocker: "BLOCKED_DSG_IMPLEMENTATION_OR_RUNNER_DRIFT",
    phrases: ["edits code", "runs tests", "validation passed", "implementation verified"],
  },
  {
    id: "DSG-GT-009",
    title: "Durable docs and resync/finalization are rejected",
    blocker: "BLOCKED_DSG_DURABLE_DOCS_OR_CLOSURE",
    phrases: ["durable docs", "Feature CONTEXT", "DONE", "resync/finalization", "materializes"],
  },
  {
    id: "DSG-GT-010",
    title: "Broad redesign escalates to DEV",
    blocker: "BLOCKED_DSG_BROAD_REDESIGN_NOT_ESCALATED",
    phrases: ["new shared pattern", "product intent", "DEV-owned decision", "avoids inventing a redesign"],
  },
];

const negativeFixtures = [
  {
    id: "DSG-NF-001",
    title: "READY for no UX impact",
    expectedBlockers: ["BLOCKED_DSG_NO_UX_IMPACT_READY"],
    inputs: [
      `STATUS: READY
Classification: advisory
Work: backend schema migration only.
UX impact: none.
Design output: looks fine.`,
    ],
  },
  {
    id: "DSG-NF-002",
    title: "Planner and broad redesign drift",
    expectedBlockers: [
      "BLOCKED_DSG_PLANNER_DRIFT",
      "BLOCKED_DSG_BROAD_REDESIGN_NOT_ESCALATED",
    ],
    inputs: [
      `Designer output:
- I will choose a new cut and rewrite scope.
- Replace the EXECUTION BRIEF with a product-wide navigation redesign.
- Multiple product directions exist but I pick one without DEV.`,
    ],
  },
  {
    id: "DSG-NF-003",
    title: "Validation and package ownership drift",
    expectedBlockers: [
      "BLOCKED_DSG_VALIDATION_PACK_OWNERSHIP",
      "BLOCKED_DSG_EXECUTION_PACKAGE_OWNERSHIP",
    ],
    inputs: [
      `Designer output:
- VALIDATION PACK is complete and sufficient.
- EXECUTION PACKAGE with package readiness, coder prompt, executor-owned file list, and implementation order.`,
    ],
  },
  {
    id: "DSG-NF-004",
    title: "Implementation, runner, durable docs, closure drift",
    expectedBlockers: [
      "BLOCKED_DSG_IMPLEMENTATION_OR_RUNNER_DRIFT",
      "BLOCKED_DSG_DURABLE_DOCS_OR_CLOSURE",
    ],
    inputs: [
      `Designer output:
- Edited code and wrote files.
- Ran tests; tests passed; validation passed; implementation verified.
- Updated Feature CONTEXT, DONE, ADR, and PLAN.md.
- CLOSED the round and performed resync/finalization with materialization.`,
    ],
  },
];

function isInside(childPath, parentPath) {
  const relative = path.relative(parentPath, childPath);
  return (
    relative === "" ||
    (!relative.startsWith("..") && !path.isAbsolute(relative))
  );
}

function hasIgnoredPart(relativePath) {
  return relativePath
    .split(/[\\/]+/)
    .filter(Boolean)
    .some((part) => ignoredNames.has(part));
}

function readText(relativePath) {
  if (hasIgnoredPart(relativePath)) return "";
  const absolutePath = path.resolve(repoRoot, relativePath);
  if (!isInside(absolutePath, repoRoot)) {
    throw new Error(`path escapes repo: ${relativePath}`);
  }
  const realPath = fs.realpathSync.native(absolutePath);
  if (!isInside(realPath, realRepoRoot)) {
    throw new Error(`path escapes repo after realpath: ${relativePath}`);
  }
  return fs.readFileSync(realPath, "utf8");
}

function normalize(text) {
  return text.toLowerCase().replace(/\s+/g, " ");
}

function hasAll(text, phrases) {
  const normalizedText = normalize(text);
  return phrases.every((phrase) => normalizedText.includes(normalize(phrase)));
}

function sectionFor(text, id) {
  const marker = `## Golden Test ${id}`;
  const start = text.indexOf(marker);
  if (start === -1) return "";
  const next = text.indexOf("\n## Golden Test ", start + marker.length);
  return text.slice(start, next === -1 ? text.length : next);
}

function classifyNegativeFixture(input) {
  const blockers = [];
  const ready = /STATUS:\s*READY/i.test(input);

  if (
    ready &&
    /(backend schema migration only|UX impact:\s*none|no meaningful user-facing ambiguity)/i.test(input)
  ) {
    blockers.push("BLOCKED_DSG_NO_UX_IMPACT_READY");
  }

  if (/(choose a new cut|rewrite scope|Replace the EXECUTION BRIEF)/i.test(input)) {
    blockers.push("BLOCKED_DSG_PLANNER_DRIFT");
  }

  if (/(product-wide|Multiple product directions|without DEV|navigation redesign)/i.test(input)) {
    blockers.push("BLOCKED_DSG_BROAD_REDESIGN_NOT_ESCALATED");
  }

  if (/(VALIDATION PACK is complete|validation sufficiency|sufficient)/i.test(input)) {
    blockers.push("BLOCKED_DSG_VALIDATION_PACK_OWNERSHIP");
  }

  if (/(EXECUTION PACKAGE|package readiness|coder prompt|executor-owned file list|implementation order)/i.test(input)) {
    blockers.push("BLOCKED_DSG_EXECUTION_PACKAGE_OWNERSHIP");
  }

  if (/(Edited code|wrote files|Ran tests|tests passed|validation passed|implementation verified)/i.test(input)) {
    blockers.push("BLOCKED_DSG_IMPLEMENTATION_OR_RUNNER_DRIFT");
  }

  if (/(Feature CONTEXT|DONE|ADR|PLAN\.md|CLOSED|resync\/finalization|materialization)/i.test(input)) {
    blockers.push("BLOCKED_DSG_DURABLE_DOCS_OR_CLOSURE");
  }

  return blockers;
}

const staticResult = spawnSync(process.execPath, [staticHarnessPath], {
  cwd: repoRoot,
  encoding: "utf8",
});

if (staticResult.status !== 0) {
  process.stderr.write(staticResult.stdout);
  process.stderr.write(staticResult.stderr);
  console.error("DSG-GT-000 FAIL check-static.mjs did not pass");
  process.exit(1);
}

console.log("DSG-GT-000 PASS check-static.mjs passed");

const goldenDoc = readText(goldenDocPath);
const snapshot = readText(snapshotPath);
const contracts = contractPaths.map(readText).join("\n");
let ok = true;

const snapshotEvidence = [
  "Designer Agent",
  "Produce strong, practical UX direction",
  "optional per round",
  "real UX",
  "design-contributor",
  "targeted-local",
  "READY",
  "BLOCKED",
  "VALIDATION PACK",
  "does not implement",
  "does not write durable documentation",
  "does not call or perform `Resync`",
];

const contractEvidence = [
  "DRAFT_INITIAL_DESIGNER_KERNEL",
  "optional per round",
  "real UX impact",
  "required",
  "advisory",
  "no durable docs",
  "no `VALIDATION PACK` ownership",
  "no `EXECUTION PACKAGE` ownership",
  "no implementation",
  "no validation running",
  "no resync/finalization",
];

if (!hasAll(snapshot, snapshotEvidence)) {
  console.error("DSG-GT-BASE FAIL local snapshot is missing designer behavior evidence");
  ok = false;
}

if (!hasAll(contracts, contractEvidence)) {
  console.error("DSG-GT-BASE FAIL contracts are missing designer kernel evidence");
  ok = false;
}

for (const fixture of negativeFixtures) {
  const failures = [];
  for (const [index, input] of fixture.inputs.entries()) {
    const blockers = classifyNegativeFixture(input);
    const missingBlockers = fixture.expectedBlockers.filter(
      (blocker) => !blockers.includes(blocker),
    );
    for (const blocker of missingBlockers) {
      failures.push(`variant ${index + 1} accepted without ${blocker}`);
    }
  }
  if (failures.length === 0) {
    console.log(`${fixture.id} PASS ${fixture.title}`);
  } else {
    ok = false;
    for (const failure of failures) console.error(`${fixture.id} FAIL ${failure}`);
  }
}

for (const test of goldenTests) {
  const section = sectionFor(goldenDoc, test.id);
  const failures = [];
  if (!section.startsWith(`## Golden Test ${test.id} - ${test.title}`)) {
    failures.push("missing or mismatched heading");
  }
  for (const heading of [
    "### Objective",
    "### Input shape",
    "### Expected behavior",
    "### Fail condition",
  ]) {
    if (!section.includes(heading)) failures.push(`missing ${heading}`);
  }
  if (!section.includes(`Expected blocker: \`${test.blocker}\`.`)) {
    failures.push(`missing blocker ${test.blocker}`);
  }
  if (!hasAll(section, test.phrases)) {
    failures.push("missing required semantic phrases");
  }

  if (failures.length === 0) {
    console.log(`${test.id} PASS ${test.title}`);
  } else {
    ok = false;
    for (const failure of failures) console.error(`${test.id} FAIL ${failure}`);
  }
}

if (!ok) process.exit(1);
