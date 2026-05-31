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
  "skills/stnl_project_agent_specializer_dev/reference/execution_package_designer_kernel";
const staticHarnessPath = path.join(validationRoot, "check-static.mjs");
const goldenDocPath = `${kernelPrefix}/validation/GOLDEN_TESTS.md`;
const snapshotPath =
  "skills/stnl_project_agent_specializer_dev/reference/agents/execution-package-designer.agent.md";
const contractPaths = [
  `${kernelPrefix}/contracts/CONTRACT.md`,
  `${kernelPrefix}/contracts/BEHAVIOR_PARITY_SPINE.md`,
  `${kernelPrefix}/contracts/PACKAGE_READINESS_GATES.md`,
  `${kernelPrefix}/contracts/MINIMUM_SAFE_BUNDLE.md`,
];

const goldenTests = [
  {
    id: "EPD-GT-001",
    title: "Complete brief and validation pack produce READY",
    blocker: "BLOCKED_EPD_READY_PACKAGE_MISSING_OR_INVALID",
    phrases: [
      "READY",
      "ephemeral `EXECUTION PACKAGE`",
      "PRE_EXECUTION_READINESS",
      "WORK_PACKAGE",
      "OWNED_PATHS",
      "ACCEPTANCE_CHECKS",
    ],
  },
  {
    id: "EPD-GT-002",
    title: "Missing handoff blocks",
    blocker: "BLOCKED_EPD_HANDOFF_MISSING_OR_INVALID_NOT_REJECTED",
    phrases: [
      "No `EXECUTION BRIEF`",
      "no `VALIDATION PACK`",
      "HANDOFF_MISSING",
      "HANDOFF_INVALID",
      "NEXT_OWNER: orchestrator",
    ],
  },
  {
    id: "EPD-GT-003",
    title: "Validation pack obligations must map to acceptance checks",
    blocker: "BLOCKED_EPD_ACCEPTANCE_CHECKS_NOT_MAPPED",
    phrases: [
      "VALIDATION PACK",
      "ACCEPTANCE_CHECKS",
      "generic checks",
      "run tests",
      "verify works",
    ],
  },
  {
    id: "EPD-GT-004",
    title: "Weak ownership boundary blocks",
    blocker: "BLOCKED_EPD_OWNERSHIP_BOUNDARY_WEAK",
    phrases: [
      "OWNED_PATHS",
      "DO_NOT_TOUCH",
      "targeted-local reading",
      "broad discovery",
      "coder is expected to infer edit scope",
    ],
  },
  {
    id: "EPD-GT-005",
    title: "Planner drift blocks",
    blocker: "BLOCKED_EPD_PLANNER_DRIFT",
    phrases: [
      "multiple valid cuts",
      "product behaviors",
      "architecture directions",
      "rewrite the cut",
      "choose a new cut",
    ],
  },
  {
    id: "EPD-GT-006",
    title: "Validation-eval-designer drift blocks",
    blocker: "BLOCKED_EPD_PROOF_DESIGN_DRIFT",
    phrases: [
      "validation pack is too weak",
      "redesign proof",
      "replace the `VALIDATION PACK`",
      "generic test commands",
    ],
  },
  {
    id: "EPD-GT-007",
    title: "Orchestrator drift blocks",
    blocker: "BLOCKED_EPD_ORCHESTRATOR_DRIFT",
    phrases: [
      "parallel execution",
      "parallelization eligibility signal",
      "Returns to orchestrator",
      "Does not call, select, sequence, retry, or manage coders",
    ],
  },
  {
    id: "EPD-GT-008",
    title: "Coder drift blocks",
    blocker: "BLOCKED_EPD_CODER_DRIFT",
    phrases: [
      "pseudo-code",
      "implementation solution shape",
      "Keeps `CHANGE_RULES` as constraints",
      "writes code",
      "implementation strategy",
    ],
  },
  {
    id: "EPD-GT-009",
    title: "MODE=compact preserves safety fields",
    blocker: "BLOCKED_EPD_COMPACT_REMOVED_SAFETY",
    phrases: [
      "MODE=compact",
      "WORK_PACKAGE_ID",
      "OWNED_PATHS",
      "DO_NOT_TOUCH",
      "ACCEPTANCE_CHECKS",
      "BLOCK_IF",
    ],
  },
  {
    id: "EPD-GT-010",
    title: "RUN=plan does not authorize coder entry",
    blocker: "BLOCKED_EPD_RUN_PLAN_AUTHORIZED_CODER_ENTRY",
    phrases: [
      "RUN=plan",
      "preparatory package",
      "does not authorize coder entry",
      "routes to coders",
    ],
  },
  {
    id: "EPD-GT-011",
    title: "Ephemeral package is not persisted",
    blocker: "BLOCKED_EPD_PACKAGE_PERSISTED",
    phrases: [
      "execution_package.md",
      "PLAN.md",
      "persisted package",
      "generated report",
      "Keeps `EXECUTION PACKAGE` ephemeral",
    ],
  },
  {
    id: "EPD-GT-012",
    title: "Header-aware reading routes but does not fill package fields",
    blocker: "BLOCKED_EPD_HEADER_MISUSED_AS_PACKAGE_EVIDENCE",
    phrases: [
      "File Purpose Header",
      "canonical sources",
      "OWNED_PATHS",
      "work-package fields",
      "absent or inconsistent",
    ],
  },
];

const negativeFixtures = [
  {
    id: "EPD-NF-001",
    title: "READY package with weak package fields",
    expectedBlockers: ["BLOCKED_EPD_READY_PACKAGE_MISSING_OR_INVALID"],
    inputs: [
      `STATUS: READY
EXECUTION PACKAGE
PRE_EXECUTION_READINESS: okay
WORK_PACKAGE:
- WORK_PACKAGE_ID: WP-1
- OWNED_PATHS: relevant files
- DO_NOT_TOUCH: unrelated files
- RUN_COMMANDS: run tests
- ACCEPTANCE_CHECKS: verify works
- BLOCK_IF: anything risky`,
      `STATUS: READY
EXECUTION PACKAGE
WORK_PACKAGE:
- WORK_PACKAGE_ID: WP-1
- OWNED_PATHS: TBD
- ACCEPTANCE_CHECKS: TBD
- REQUIRED_QUALITY_GUARDRAILS: none
- BLOCK_IF: unclear`,
    ],
  },
  {
    id: "EPD-NF-002",
    title: "Coordinator or coder drift",
    expectedBlockers: [
      "BLOCKED_EPD_ORCHESTRATOR_DRIFT",
      "BLOCKED_EPD_CODER_DRIFT",
    ],
    inputs: [
      `STATUS: READY
EXECUTION PACKAGE
Route coder-backend first, then retry coder-frontend if it fails.
Parallel execution is approved.
Implementation:
function solve(){ return true }
Pseudo-code dump follows.`,
    ],
  },
  {
    id: "EPD-NF-003",
    title: "Persistence/runtime/final-verdict drift",
    expectedBlockers: ["BLOCKED_EPD_PACKAGE_PERSISTED"],
    inputs: [
      `STATUS: READY
Create execution_package.md and PLAN.md.
Generate report fixture.
VALIDATION PASSED.
TESTS PASSED.
IMPLEMENTATION VERIFIED.`,
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

function sectionFor(text, id) {
  const marker = `## Golden Test ${id}`;
  const start = text.indexOf(marker);
  if (start === -1) return "";
  const next = text.indexOf("\n## Golden Test ", start + marker.length);
  return text.slice(start, next === -1 ? text.length : next);
}

function hasAll(text, phrases) {
  const normalizedText = text.toLowerCase().replace(/\s+/g, " ");
  return phrases.every((phrase) =>
    normalizedText.includes(phrase.toLowerCase().replace(/\s+/g, " ")),
  );
}

function classifyNegativeFixture(input) {
  const blockers = [];
  const ready = /STATUS:\s*READY/i.test(input);
  const weakOwnedPaths = /OWNED_PATHS:\s*(relevant files|TBD)/i.test(input);
  const weakDoNotTouch = /DO_NOT_TOUCH:\s*unrelated files/i.test(input);
  const weakRunCommands = /RUN_COMMANDS:\s*run tests/i.test(input);
  const weakAcceptance = /ACCEPTANCE_CHECKS:\s*(verify works|TBD)/i.test(input);
  const weakBlockIf = /BLOCK_IF:\s*(anything risky|unclear)/i.test(input);

  if (
    ready &&
    /EXECUTION PACKAGE/i.test(input) &&
    [
      weakOwnedPaths,
      weakDoNotTouch,
      weakRunCommands,
      weakAcceptance,
      weakBlockIf,
    ].filter(Boolean).length >= 2
  ) {
    blockers.push("BLOCKED_EPD_READY_PACKAGE_MISSING_OR_INVALID");
  }

  if (
    /(Route coder|retry coder|Parallel execution is approved)/i.test(input)
  ) {
    blockers.push("BLOCKED_EPD_ORCHESTRATOR_DRIFT");
  }

  if (/(function\s+solve|Pseudo-code dump|Implementation:)/i.test(input)) {
    blockers.push("BLOCKED_EPD_CODER_DRIFT");
  }

  if (
    /(execution_package\.md|PLAN\.md|Generate report fixture|VALIDATION PASSED|TESTS PASSED|IMPLEMENTATION VERIFIED)/i.test(
      input,
    )
  ) {
    blockers.push("BLOCKED_EPD_PACKAGE_PERSISTED");
  }

  return blockers;
}

function result(id, failures, success) {
  if (failures.length === 0) {
    console.log(`${id} PASS ${success}`);
    return true;
  }
  console.error(`${id} FAIL`);
  for (const failure of failures) console.error(`- ${failure}`);
  return false;
}

let ok = true;

const staticResult = spawnSync(process.execPath, [staticHarnessPath], {
  cwd: repoRoot,
  encoding: "utf8",
});
if (staticResult.stdout) process.stdout.write(staticResult.stdout);
if (staticResult.stderr) process.stderr.write(staticResult.stderr);
if (staticResult.status !== 0) {
  console.error("EPD-GT-000 FAIL check-static.mjs failed");
  process.exit(1);
}
console.log("EPD-GT-000 PASS check-static.mjs passed");

const goldenDoc = readText(goldenDocPath);
const snapshot = readText(snapshotPath);
const contracts = contractPaths.map(readText).join("\n");
const combined = `${goldenDoc}\n${snapshot}\n${contracts}`;

for (const test of goldenTests) {
  const section = sectionFor(goldenDoc, test.id);
  const failures = [];
  if (!section) {
    failures.push(`missing golden test ${test.id}`);
  } else {
    for (const marker of [
      "### Objective",
      "### Input shape",
      "### Expected behavior",
      "### Fail condition",
      "Expected blocker: `BLOCKED_",
    ]) {
      if (!section.includes(marker)) failures.push(`${test.id} missing ${marker}`);
    }
  }
  if (!combined.includes(test.blocker)) {
    failures.push(`${test.id} missing blocker ${test.blocker}`);
  }
  if (!hasAll(combined, test.phrases)) {
    failures.push(`${test.id} missing required semantic coverage phrases`);
  }
  ok =
    result(test.id, failures, `${test.title} covered by golden doc, snapshot, and contracts`) &&
    ok;
}

for (const fixture of negativeFixtures) {
  const failures = [];
  for (const input of fixture.inputs) {
    const blockers = classifyNegativeFixture(input);
    for (const expectedBlocker of fixture.expectedBlockers) {
      if (!blockers.includes(expectedBlocker)) {
        failures.push(`${fixture.id} did not classify expected ${expectedBlocker}`);
      }
    }
  }
  ok = result(fixture.id, failures, fixture.title) && ok;
}

process.exit(ok ? 0 : 1);
