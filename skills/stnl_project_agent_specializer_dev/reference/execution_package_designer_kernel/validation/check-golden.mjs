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

const goldenTests = [
  ["EPD-GT-001", "BLOCKED_EPD_READY_PACKAGE_MISSING_OR_INVALID", ["STATUS: READY", "PRE_EXECUTION_READINESS", "PACKAGE_SCOPE", "WORK_PACKAGE_ID", "OWNED_PATHS", "ACCEPTANCE_CHECKS"]],
  ["EPD-GT-002", "BLOCKED_EPD_HANDOFF_MISSING", ["EXECUTION BRIEF", "VALIDATION PACK", "HANDOFF_STATUS: HANDOFF_MISSING", "NEXT_OWNER: orchestrator", "REQUEST:", "REASON:"]],
  ["EPD-GT-003", "BLOCKED_EPD_HANDOFF_INVALID", ["invalid or contradictory", "HANDOFF_STATUS: HANDOFF_INVALID", "NEXT_OWNER: orchestrator", "REQUEST:", "REASON:"]],
  ["EPD-GT-004", "BLOCKED_EPD_HANDOFF_STALE_WRONG_ROUND_OR_OWNER", ["stale", "wrong-round", "wrong-owner", "NEXT_OWNER: orchestrator"]],
  ["EPD-GT-005", "BLOCKED_EPD_ACCEPTANCE_CHECKS_NOT_MAPPED", ["VALIDATION PACK", "ACCEPTANCE_CHECKS", "missing proof mapping", "run tests"]],
  ["EPD-GT-006", "BLOCKED_EPD_BROAD_DISCOVERY", ["targeted-local", "broad discovery", "repository-wide scanning", "OWNED_PATHS"]],
  ["EPD-GT-007", "BLOCKED_EPD_PLANNER_DRIFT", ["multiple valid cuts", "architecture directions", "rewrite the cut", "choose a new cut"]],
  ["EPD-GT-008", "BLOCKED_EPD_PROOF_DESIGN_DRIFT", ["VALIDATION PACK", "redesign proof", "replace the `VALIDATION PACK`", "regeneration"]],
  ["EPD-GT-009", "BLOCKED_EPD_ORCHESTRATOR_DRIFT", ["parallelization eligibility signal", "orchestrator", "Does not call, select, sequence, retry, or manage coders"]],
  ["EPD-GT-010", "BLOCKED_EPD_CODER_DRIFT", ["pseudo-code", "writes code", "implementation strategy", "CHANGE_RULES"]],
  ["EPD-GT-011", "BLOCKED_EPD_VALIDATION_RUNNER_DRIFT", ["VALIDATION PASSED", "TESTS PASSED", "IMPLEMENTATION VERIFIED", "runner verdicts"]],
  ["EPD-GT-012", "BLOCKED_EPD_COMPACT_REMOVED_SAFETY", ["MODE=compact", "WORK_PACKAGE_ID", "OWNED_PATHS", "DO_NOT_TOUCH", "ACCEPTANCE_CHECKS", "BLOCK_IF"]],
  ["EPD-GT-013", "BLOCKED_EPD_RUN_PLAN_AUTHORIZED_CODER_ENTRY", ["RUN=plan", "preparatory package", "Does not authorize coder entry"]],
  ["EPD-GT-014", "BLOCKED_EPD_PACKAGE_PERSISTED", ["execution_package.md", "PLAN.md", "durable documentation", "Keeps `EXECUTION PACKAGE` ephemeral"]],
  ["EPD-GT-015", "BLOCKED_EPD_HEADER_MISUSED_AS_PACKAGE_EVIDENCE", ["File Purpose Header", "canonical sources", "OWNED_PATHS", "acceptance checks"]],
  ["EPD-GT-016", "BLOCKED_EPD_HANDOFF_READY_TREATED_AS_READY", ["HANDOFF_READY != READY", "STATUS: READY", "treated as `READY`"]],
  ["EPD-GT-017", "BLOCKED_EPD_REQUEST_REPLAY_FROM_ORCHESTRATOR", ["HANDOFF_STATUS: REQUEST_REPLAY_FROM_ORCHESTRATOR", "REQUEST:", "NEXT_OWNER: orchestrator", "REASON:"]],
  ["EPD-GT-018", "BLOCKED_EPD_REQUEST_REGEN_FROM_OWNER", ["HANDOFF_STATUS: REQUEST_REGEN_FROM_OWNER", "REQUEST:", "NEXT_OWNER: orchestrator", "REASON:"]],
];

const requiredPackageFields = [
  "PRE_EXECUTION_READINESS",
  "PACKAGE_SCOPE",
  "WORK_PACKAGE_ID",
  "OBJECTIVE",
  "GOAL",
  "OWNER_CANDIDATE",
  "OWNED_PATHS",
  "SEARCH_ANCHORS",
  "EDIT_ANCHORS",
  "DEPENDS_ON",
  "DO_NOT_TOUCH",
  "CHANGE_RULES",
  "PERMITTED_LOCAL_DECISIONS",
  "FORBIDDEN_INFERENCES",
  "REQUIRES_DEV_DECISION_IF",
  "RUN_COMMANDS",
  "ACCEPTANCE_CHECKS",
  "REQUIRED_QUALITY_GUARDRAILS",
  "BLOCK_IF",
];
const recoveryFields = ["STATUS", "HANDOFF_STATUS", "REQUEST", "NEXT_OWNER", "REASON"];

function isInside(childPath, parentPath) {
  const relative = path.relative(parentPath, childPath);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

function hasIgnoredPart(relativePath) {
  return relativePath.split(/[\\/]+/).filter(Boolean).some((part) => ignoredNames.has(part));
}

function readText(relativePath) {
  if (hasIgnoredPart(relativePath)) return "";
  const absolutePath = path.resolve(repoRoot, relativePath);
  if (!isInside(absolutePath, repoRoot)) throw new Error(`path escapes repo: ${relativePath}`);
  const realPath = fs.realpathSync.native(absolutePath);
  if (!isInside(realPath, realRepoRoot)) throw new Error(`path escapes repo after realpath: ${relativePath}`);
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
  return phrases.every((phrase) => normalizedText.includes(phrase.toLowerCase().replace(/\s+/g, " ")));
}

function fieldPresent(input, field) {
  return new RegExp(`(?:^|\\n)(?:- )?${field}:`, "i").test(input);
}

function classifyNegativeFixture(input) {
  const blockers = [];
  const readyPackage = /STATUS:\s*READY/i.test(input) && /EXECUTION PACKAGE/i.test(input);
  if (readyPackage && requiredPackageFields.some((field) => !fieldPresent(input, field))) {
    blockers.push("BLOCKED_EPD_READY_PACKAGE_MISSING_OR_INVALID");
  }
  if (/(execution_package\.md|PLAN\.md|durable documentation|persisted package|generated report)/i.test(input)) blockers.push("BLOCKED_EPD_PACKAGE_PERSISTED");
  if (/(rewrite the cut|choose a new cut|choose architecture|re-plan scope)/i.test(input)) blockers.push("BLOCKED_EPD_PLANNER_DRIFT");
  if (/(function\s+solve|pseudo-code dump|implementation strategy|writes code)/i.test(input)) blockers.push("BLOCKED_EPD_CODER_DRIFT");
  if (/(route coder|retry coder|parallel execution is approved|final sequence)/i.test(input)) blockers.push("BLOCKED_EPD_ORCHESTRATOR_DRIFT");
  if (/(VALIDATION PASSED|TESTS PASSED|IMPLEMENTATION VERIFIED)/i.test(input)) blockers.push("BLOCKED_EPD_VALIDATION_RUNNER_DRIFT");
  if (/HANDOFF_STATUS:\s*HANDOFF_MISSING/i.test(input)) blockers.push("BLOCKED_EPD_HANDOFF_MISSING");
  if (/HANDOFF_STATUS:\s*HANDOFF_INVALID/i.test(input)) blockers.push("BLOCKED_EPD_HANDOFF_INVALID");
  if (/(stale handoff|wrong-round handoff|wrong-owner handoff)/i.test(input)) blockers.push("BLOCKED_EPD_HANDOFF_STALE_WRONG_ROUND_OR_OWNER");
  if (/missing proof mapping|ACCEPTANCE_CHECKS:\s*(unmapped|generic|run tests)/i.test(input)) blockers.push("BLOCKED_EPD_ACCEPTANCE_CHECKS_NOT_MAPPED");
  if (/(broad discovery|scan entire repository|repository-wide scanning)/i.test(input)) blockers.push("BLOCKED_EPD_BROAD_DISCOVERY");
  if (/HANDOFF_READY(?:\s+treated as\s+|\s*:\s*)READY/i.test(input)) blockers.push("BLOCKED_EPD_HANDOFF_READY_TREATED_AS_READY");
  if (/HANDOFF_STATUS:\s*REQUEST_REPLAY_FROM_ORCHESTRATOR/i.test(input)) blockers.push("BLOCKED_EPD_REQUEST_REPLAY_FROM_ORCHESTRATOR");
  if (/HANDOFF_STATUS:\s*REQUEST_REGEN_FROM_OWNER/i.test(input)) blockers.push("BLOCKED_EPD_REQUEST_REGEN_FROM_OWNER");
  if (/RECOVERY ENVELOPE/i.test(input) && recoveryFields.some((field) => !fieldPresent(input, field))) {
    blockers.push("BLOCKED_EPD_RECOVERY_ENVELOPE_INVALID");
  }
  return blockers;
}

function completePackage() {
  return `STATUS: READY
EXECUTION PACKAGE
PRE_EXECUTION_READINESS: bounded
PACKAGE_SCOPE: bounded
WORK_PACKAGE:
${requiredPackageFields.slice(2).map((field) => `- ${field}: present`).join("\n")}`;
}

function withoutField(input, field) {
  return input.split("\n").filter((line) => !new RegExp(`^(?:- )?${field}:`, "i").test(line)).join("\n");
}

const completeRecoveryEnvelope = `RECOVERY ENVELOPE
STATUS: BLOCKED
HANDOFF_STATUS: REQUEST_REPLAY_FROM_ORCHESTRATOR
REQUEST: replay current-round handoff
NEXT_OWNER: orchestrator
REASON: consumer lost current-round handoff`;

const negativeFixtures = [
  ...requiredPackageFields.map((field) => ({
    id: `EPD-NF-MISSING-${field}`,
    expected: "BLOCKED_EPD_READY_PACKAGE_MISSING_OR_INVALID",
    input: withoutField(completePackage(), field),
  })),
  ...recoveryFields.map((field) => ({
    id: `EPD-NF-RECOVERY-MISSING-${field}`,
    expected: "BLOCKED_EPD_RECOVERY_ENVELOPE_INVALID",
    input: withoutField(completeRecoveryEnvelope, field),
  })),
  { id: "EPD-NF-PACKAGE-PERSISTED", expected: "BLOCKED_EPD_PACKAGE_PERSISTED", input: "Create execution_package.md, PLAN.md, durable documentation, and a generated report." },
  { id: "EPD-NF-PLANNER-DRIFT", expected: "BLOCKED_EPD_PLANNER_DRIFT", input: "Rewrite the cut and choose architecture." },
  { id: "EPD-NF-CODER-DRIFT", expected: "BLOCKED_EPD_CODER_DRIFT", input: "Pseudo-code dump with function solve() and implementation strategy." },
  { id: "EPD-NF-ORCHESTRATOR-DRIFT", expected: "BLOCKED_EPD_ORCHESTRATOR_DRIFT", input: "Route coder-backend first; parallel execution is approved." },
  { id: "EPD-NF-VALIDATION-RUNNER-DRIFT", expected: "BLOCKED_EPD_VALIDATION_RUNNER_DRIFT", input: "VALIDATION PASSED. TESTS PASSED. IMPLEMENTATION VERIFIED." },
  { id: "EPD-NF-HANDOFF-MISSING", expected: "BLOCKED_EPD_HANDOFF_MISSING", input: "STATUS: BLOCKED\nHANDOFF_STATUS: HANDOFF_MISSING" },
  { id: "EPD-NF-HANDOFF-INVALID", expected: "BLOCKED_EPD_HANDOFF_INVALID", input: "STATUS: BLOCKED\nHANDOFF_STATUS: HANDOFF_INVALID" },
  { id: "EPD-NF-HANDOFF-STALE", expected: "BLOCKED_EPD_HANDOFF_STALE_WRONG_ROUND_OR_OWNER", input: "stale handoff" },
  { id: "EPD-NF-HANDOFF-WRONG-ROUND", expected: "BLOCKED_EPD_HANDOFF_STALE_WRONG_ROUND_OR_OWNER", input: "wrong-round handoff" },
  { id: "EPD-NF-HANDOFF-WRONG-OWNER", expected: "BLOCKED_EPD_HANDOFF_STALE_WRONG_ROUND_OR_OWNER", input: "wrong-owner handoff" },
  { id: "EPD-NF-MISSING-PROOF-MAPPING", expected: "BLOCKED_EPD_ACCEPTANCE_CHECKS_NOT_MAPPED", input: "missing proof mapping" },
  { id: "EPD-NF-BROAD-DISCOVERY", expected: "BLOCKED_EPD_BROAD_DISCOVERY", input: "Use broad discovery and scan entire repository." },
  { id: "EPD-NF-HANDOFF-READY-AS-READY", expected: "BLOCKED_EPD_HANDOFF_READY_TREATED_AS_READY", input: "HANDOFF_READY treated as READY" },
  { id: "EPD-NF-REPLAY-RECOVERY", expected: "BLOCKED_EPD_REQUEST_REPLAY_FROM_ORCHESTRATOR", input: completeRecoveryEnvelope },
  { id: "EPD-NF-REGEN-RECOVERY", expected: "BLOCKED_EPD_REQUEST_REGEN_FROM_OWNER", input: completeRecoveryEnvelope.replace("REQUEST_REPLAY_FROM_ORCHESTRATOR", "REQUEST_REGEN_FROM_OWNER") },
];

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
const staticResult = spawnSync(process.execPath, [staticHarnessPath], { cwd: repoRoot, encoding: "utf8" });
if (staticResult.stdout) process.stdout.write(staticResult.stdout);
if (staticResult.stderr) process.stderr.write(staticResult.stderr);
if (staticResult.status !== 0) {
  console.error("EPD-GT-000 FAIL check-static.mjs failed");
  process.exit(1);
}
console.log("EPD-GT-000 PASS check-static.mjs passed");

const goldenDoc = readText(goldenDocPath);
for (const [id, blocker, phrases] of goldenTests) {
  const section = sectionFor(goldenDoc, id);
  const failures = [];
  if (!section) {
    failures.push(`missing golden test ${id}`);
  } else {
    for (const marker of ["### Objective", "### Input shape", "### Expected behavior", "### Fail condition", `Expected blocker: \`${blocker}\`.`]) {
      if (!section.includes(marker)) failures.push(`${id} missing ${marker}`);
    }
    if (!hasAll(section, phrases)) failures.push(`${id} missing local semantic evidence`);
  }
  ok = result(id, failures, "scenario has complete local evidence") && ok;
}

for (const fixture of negativeFixtures) {
  const failures = classifyNegativeFixture(fixture.input).includes(fixture.expected)
    ? []
    : [`did not classify expected ${fixture.expected}`];
  ok = result(fixture.id, failures, "isolated negative fixture classified") && ok;
}

process.exit(ok ? 0 : 1);
