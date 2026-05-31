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
  "skills/stnl_project_agent_specializer_dev/reference/validation_eval_designer_kernel";
const staticHarnessPath = path.join(validationRoot, "check-static.mjs");
const goldenDocPath = `${kernelPrefix}/validation/GOLDEN_TESTS.md`;
const snapshotPath =
  "skills/stnl_project_agent_specializer_dev/reference/agents/validation-eval-designer.agent.md";
const contractPaths = [
  `${kernelPrefix}/contracts/CONTRACT.md`,
  `${kernelPrefix}/contracts/BEHAVIOR_PARITY_SPINE.md`,
  `${kernelPrefix}/contracts/HARNESS_DECISION_GATES.md`,
  `${kernelPrefix}/contracts/MINIMUM_SAFE_BUNDLE.md`,
];

const goldenTests = [
  {
    id: "VED-GT-001",
    title: "Sufficient observable proof allows READY",
    blocker: "BLOCKED_VED_READY_PACK_MISSING_OR_WEAK",
    phrases: ["READY", "ephemeral `VALIDATION PACK`", "proof obligations", "evidence modes", "observable proof"],
  },
  {
    id: "VED-GT-002",
    title: "Critical weak harness asks DEV",
    blocker: "BLOCKED_VED_CRITICAL_WEAK_HARNESS_READY",
    phrases: ["critical changed surface", "absent, fragile, or misleading harness", "NEEDS_DEV_DECISION_HARNESS", "residual risk"],
  },
  {
    id: "VED-GT-003",
    title: "Missing EXECUTION BRIEF blocks",
    blocker: "BLOCKED_VED_HANDOFF_MISSING_NOT_REJECTED",
    phrases: ["No `EXECUTION BRIEF`", "HANDOFF_MISSING", "REQUEST_REPLAY_FROM_ORCHESTRATOR", "REQUEST_REGEN_FROM_OWNER"],
  },
  {
    id: "VED-GT-004",
    title: "Invalid EXECUTION BRIEF blocks",
    blocker: "BLOCKED_VED_HANDOFF_INVALID_NOT_REJECTED",
    phrases: ["too weak or ambiguous", "HANDOFF_INVALID", "request regeneration", "invents scope"],
  },
  {
    id: "VED-GT-005",
    title: "Generic build lint smoke cannot prove behavior",
    blocker: "BLOCKED_VED_GENERIC_CHECK_THEATER_ACCEPTED",
    phrases: ["build", "lint", "generic smoke", "`npm test` success", "Reject `READY`"],
  },
  {
    id: "VED-GT-006",
    title: "Vague manual validation blocks",
    blocker: "BLOCKED_VED_VAGUE_MANUAL_PROOF_ACCEPTED",
    phrases: ["manual check", "visual snapshot", "scenario", "observable result", "falsifiable"],
  },
  {
    id: "VED-GT-007",
    title: "Planner drift blocks",
    blocker: "BLOCKED_VED_PLANNER_DRIFT",
    phrases: ["redesign scope", "choose a new cut", "replace the", "`EXECUTION BRIEF`", "validation design becomes planning"],
  },
  {
    id: "VED-GT-008",
    title: "Validation-runner drift blocks",
    blocker: "BLOCKED_VED_RUNNER_DRIFT",
    phrases: ["run checks", "VALIDATION PASSED", "TESTS PASSED", "IMPLEMENTATION VERIFIED", "CLOSED", "runner verdict"],
  },
  {
    id: "VED-GT-009",
    title: "Execution-package drift blocks",
    blocker: "BLOCKED_VED_EXECUTION_PACKAGE_DRIFT",
    phrases: ["patch plan", "prompt final do coder", "implementation order", "`EXECUTION PACKAGE`", "acceptance checks"],
  },
  {
    id: "VED-GT-010",
    title: "VALIDATION PACK remains ephemeral",
    blocker: "BLOCKED_VED_PACK_PERSISTED",
    phrases: ["validation_pack.md", "persisted stand-in", "`VALIDATION PACK` ephemeral", "durable pack file"],
  },
];

const negativeFixtures = [
  {
    id: "VED-NF-001",
    title: "READY theater with generic command success",
    expectedBlockers: ["BLOCKED_VED_GENERIC_CHECK_THEATER_ACCEPTED"],
    inputs: [
      `STATUS: READY
VALIDATION PACK:
- Change: critical business-rule behavior.
- Evidence: npm test passed, lint passed, build passed, generic smoke passed.
- No touched-surface test.
- No observable business-rule assertion.`,
      `STATUS: READY
VALIDATION PACK:
- Change: critical business-rule behavior.
- Evidence: npm test passed and generic smoke passed.
- Tests are adjacent but do not touch the changed claim.
- No observable behavioral assertion.`,
    ],
  },
  {
    id: "VED-NF-002",
    title: "READY with vague manual evidence",
    expectedBlockers: ["BLOCKED_VED_VAGUE_MANUAL_PROOF_ACCEPTED"],
    inputs: [
      `STATUS: READY
VALIDATION PACK:
- Manual check: looks good.
- Visual snapshot reviewed.
- No scenario, no state, no action, no observable result.`,
      `STATUS: READY
VALIDATION PACK:
- Manual check: seems fine.
- Visual snapshot reviewed.
- Missing scenario, state, action, and observable result.`,
    ],
  },
  {
    id: "VED-NF-003",
    title: "Runner, execution-package, and persistence drift",
    expectedBlockers: [
      "BLOCKED_VED_RUNNER_DRIFT",
      "BLOCKED_VED_EXECUTION_PACKAGE_DRIFT",
      "BLOCKED_VED_PACK_PERSISTED",
    ],
    inputs: [
      `STATUS: READY
VALIDATION PASSED
TESTS PASSED
IMPLEMENTATION VERIFIED
CLOSED
patch plan
prompt final do coder
validation_pack.md`,
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
  const genericSuccessCount = [
    /npm test passed/i,
    /lint passed/i,
    /build passed/i,
    /generic smoke passed/i,
  ].filter((pattern) => pattern.test(input)).length;

  if (
    ready &&
    /critical business-rule behavior/i.test(input) &&
    genericSuccessCount >= 2 &&
    /(No touched-surface test|adjacent but do not touch the changed claim)/i.test(
      input,
    ) &&
    /No observable (business-rule|behavioral) assertion/i.test(input)
  ) {
    blockers.push("BLOCKED_VED_GENERIC_CHECK_THEATER_ACCEPTED");
  }

  if (
    ready &&
    /Manual check:\s*(looks good|seems fine)/i.test(input) &&
    /Visual snapshot reviewed/i.test(input) &&
    /(No scenario, no state, no action, no observable result|Missing scenario, state, action, and observable result)/i.test(
      input,
    )
  ) {
    blockers.push("BLOCKED_VED_VAGUE_MANUAL_PROOF_ACCEPTED");
  }

  if (
    /(VALIDATION PASSED|TESTS PASSED|IMPLEMENTATION VERIFIED|CLOSED)/i.test(input)
  ) {
    blockers.push("BLOCKED_VED_RUNNER_DRIFT");
  }

  if (/(patch plan|prompt final do coder)/i.test(input)) {
    blockers.push("BLOCKED_VED_EXECUTION_PACKAGE_DRIFT");
  }

  if (/validation_pack\.md/i.test(input)) {
    blockers.push("BLOCKED_VED_PACK_PERSISTED");
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
  console.error("VED-GT-000 FAIL check-static.mjs did not pass");
  process.exit(1);
}

console.log("VED-GT-000 PASS check-static.mjs passed");

const goldenDoc = readText(goldenDocPath);
const snapshot = readText(snapshotPath);
const contracts = contractPaths.map(readText).join("\n");
let ok = true;

const sharedSnapshotEvidence = [
  "EXECUTION BRIEF",
  "VALIDATION PACK",
  "READY",
  "NEEDS_DEV_DECISION_HARNESS",
  "HANDOFF_MISSING",
  "HANDOFF_INVALID",
  "REQUEST_REPLAY_FROM_ORCHESTRATOR",
  "REQUEST_REGEN_FROM_OWNER",
  "proof-design",
  "targeted-local",
  "ephemeral",
  "agent_version: 2026.5.1",
];

const sharedContractEvidence = [
  "sufficient, proportional, observable",
  "anti-theater",
  "teste inexistente != sempre BLOCK",
  "teste existente != sempre READY",
  "must not become planner",
  "must not become validation-runner",
  "must not become execution-package-designer",
  "agent version: `2026.5.1`",
];

if (!hasAll(snapshot, sharedSnapshotEvidence)) {
  console.error("VED-GT-BASE FAIL local snapshot is missing shared behavior evidence");
  ok = false;
}

if (!hasAll(contracts, sharedContractEvidence)) {
  console.error("VED-GT-BASE FAIL contracts are missing shared kernel evidence");
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
    for (const failure of failures) {
      console.error(`${test.id} FAIL ${failure}`);
    }
  }
}

if (!ok) process.exit(1);
