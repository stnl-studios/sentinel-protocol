#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const validationRoot = path.dirname(scriptPath);
const kernelRoot = path.resolve(validationRoot, "..");
const referenceRoot = path.resolve(kernelRoot, "..");
const devSkillRoot = path.resolve(referenceRoot, "..");
const repoRoot = path.resolve(devSkillRoot, "..", "..");
const realRepoRoot = fs.realpathSync.native(repoRoot);
const ignoredNames = new Set(["__MACOSX", ".DS_Store"]);
const skippedWalkNames = new Set([".git", "node_modules", ...ignoredNames]);
const finalPassStatus = ["CLEAN", "EXCELLENT", "PASS"].join("_");

const kernelPrefix =
  "skills/stnl_project_agent_specializer_dev/reference/validation_eval_designer_kernel";
const snapshotPath =
  "skills/stnl_project_agent_specializer_dev/reference/agents/validation-eval-designer.agent.md";
const templatePath = "templates/agents/validation-eval-designer.agent.md";
const manifestPath =
  "skills/stnl_project_agent_specializer_dev/reference/MANIFEST.md";

const kernelFiles = [
  "README.md",
  "contracts/CONTRACT.md",
  "contracts/BEHAVIOR_PARITY_SPINE.md",
  "contracts/HARNESS_DECISION_GATES.md",
  "contracts/MINIMUM_SAFE_BUNDLE.md",
  "validation/STATIC_CHECKS.md",
  "validation/GOLDEN_TESTS.md",
  "validation/check-static.mjs",
  "validation/check-golden.mjs",
];

const requiredPaths = [
  templatePath,
  snapshotPath,
  ...kernelFiles.map((relativePath) => `${kernelPrefix}/${relativePath}`),
];

const manifestEntries = [
  "reference/agents/validation-eval-designer.agent.md",
  ...kernelFiles.map(
    (relativePath) => `reference/validation_eval_designer_kernel/${relativePath}`,
  ),
];

const globalDocPaths = [
  "skills/stnl_project_agent_specializer_dev/README.md",
  "skills/stnl_project_agent_specializer_dev/SKILL.md",
  manifestPath,
  "skills/stnl_project_agent_specializer_dev/reference/kernel_lab/README.md",
];

const documentaryPaths = [
  `${kernelPrefix}/README.md`,
  `${kernelPrefix}/contracts/CONTRACT.md`,
  `${kernelPrefix}/contracts/BEHAVIOR_PARITY_SPINE.md`,
  `${kernelPrefix}/contracts/HARNESS_DECISION_GATES.md`,
  `${kernelPrefix}/contracts/MINIMUM_SAFE_BUNDLE.md`,
  `${kernelPrefix}/validation/STATIC_CHECKS.md`,
  `${kernelPrefix}/validation/GOLDEN_TESTS.md`,
];

const driftTerms = [
  "VALIDATION PASSED",
  "TESTS PASSED",
  "IMPLEMENTATION VERIFIED",
  "CLOSED",
  "patch plan",
  "prompt final do coder",
];

const safePolarityTerms = [
  "must not",
  "prohibited",
  "reject",
  "rejection",
  "attempts to",
  "drift",
  "fail if",
  "cannot",
  "does not",
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

function toRepoPath(relativePath) {
  if (hasIgnoredPart(relativePath)) return { ignored: true, path: null };
  const absolutePath = path.resolve(repoRoot, relativePath);
  if (!isInside(absolutePath, repoRoot)) {
    throw new Error(`path escapes repo: ${relativePath}`);
  }
  return { ignored: false, path: absolutePath };
}

function realPathInsideRepo(absolutePath) {
  const realPath = fs.realpathSync.native(absolutePath);
  if (!isInside(realPath, realRepoRoot)) {
    throw new Error(`path escapes repo after realpath: ${absolutePath}`);
  }
  return realPath;
}

function existsFile(relativePath) {
  const resolved = toRepoPath(relativePath);
  if (resolved.ignored) return true;
  try {
    const stats = fs.statSync(resolved.path);
    return stats.isFile() && Boolean(realPathInsideRepo(resolved.path));
  } catch (error) {
    if (error?.code === "ENOENT") return false;
    throw error;
  }
}

function readText(relativePath) {
  const resolved = toRepoPath(relativePath);
  if (resolved.ignored) return "";
  return fs.readFileSync(realPathInsideRepo(resolved.path), "utf8");
}

function readBuffer(relativePath) {
  const resolved = toRepoPath(relativePath);
  if (resolved.ignored) return Buffer.alloc(0);
  return fs.readFileSync(realPathInsideRepo(resolved.path));
}

function walk(relativePath) {
  const resolved = toRepoPath(relativePath);
  const rootReal = realPathInsideRepo(resolved.path);
  const entries = [];

  function visit(absolutePath) {
    for (const dirent of fs.readdirSync(absolutePath, { withFileTypes: true })) {
      if (skippedWalkNames.has(dirent.name)) continue;
      const child = path.join(absolutePath, dirent.name);
      const realChild = realPathInsideRepo(child);
      const repoRelative = path
        .relative(rootReal, realChild)
        .replaceAll(path.sep, "/");
      if (dirent.isDirectory()) visit(realChild);
      if (dirent.isFile()) entries.push(repoRelative);
    }
  }

  visit(rootReal);
  return entries.sort();
}

function hasAll(text, phrases) {
  const lowerText = text.toLowerCase();
  return phrases.every((phrase) => lowerText.includes(phrase.toLowerCase()));
}

function occurrences(text, term) {
  const indexes = [];
  const lowerText = text.toLowerCase();
  const lowerTerm = term.toLowerCase();
  let cursor = 0;
  while ((cursor = lowerText.indexOf(lowerTerm, cursor)) !== -1) {
    indexes.push(cursor);
    cursor += lowerTerm.length;
  }
  return indexes;
}

function hasSafePolarity(text, term, radius = 360) {
  return occurrences(text, term).every((index) => {
    const start = Math.max(0, index - radius);
    const end = Math.min(text.length, index + term.length + radius);
    const window = text.slice(start, end).toLowerCase();
    return safePolarityTerms.some((marker) => window.includes(marker));
  });
}

function result(id, failures, success) {
  if (failures.length === 0) {
    console.log(`${id} PASS ${success}`);
    return true;
  }
  for (const failure of failures) console.error(`${id} FAIL ${failure}`);
  return false;
}

let ok = true;

{
  const failures = requiredPaths.filter((relativePath) => !existsFile(relativePath));
  ok =
    result("VED-CH-001", failures, "required source, snapshot, and kernel files present") &&
    ok;
}

{
  const failures = [];
  if (
    existsFile(templatePath) &&
    existsFile(snapshotPath) &&
    !readBuffer(templatePath).equals(readBuffer(snapshotPath))
  ) {
    failures.push("local snapshot is not a byte-for-byte copy of productive origin");
  }
  ok =
    result("VED-CH-002", failures, "local snapshot matches productive copy origin byte-for-byte") &&
    ok;
}

{
  const manifest = readText(manifestPath);
  const failures = manifestEntries
    .filter((entry) => !manifest.includes(`- \`${entry}\``))
    .map((entry) => `manifest missing ${entry}`);
  ok =
    result("VED-CH-003", failures, "manifest lists snapshot and exact validation-eval-designer bundle") &&
    ok;
}

{
  const failures = [];
  for (const relativePath of globalDocPaths) {
    const text = readText(relativePath);
    if (!text.includes("VALIDATION_EVAL_DESIGNER_KERNEL: UNDER_CONSTRUCTION")) {
      failures.push(`${relativePath} missing construction status`);
    }
    if (!text.includes("orchestrator_kernel") || !text.includes(finalPassStatus)) {
      failures.push(`${relativePath} missing frozen orchestrator status`);
    }
    if (!text.includes("planner_kernel") || !text.includes(finalPassStatus)) {
      failures.push(`${relativePath} missing frozen planner status`);
    }
    if (
      text.includes(`VALIDATION_EVAL_DESIGNER_KERNEL: ${finalPassStatus}`)
    ) {
      failures.push(`${relativePath} prematurely grants final validation-eval-designer status`);
    }
  }
  ok =
    result("VED-CH-004", failures, "global docs keep construction status and frozen predecessors") &&
    ok;
}

{
  const actual = walk(kernelPrefix);
  const expected = [...kernelFiles].sort();
  const failures = [];
  for (const file of actual) {
    if (!expected.includes(file)) failures.push(`unexpected kernel file ${file}`);
  }
  for (const file of expected) {
    if (!actual.includes(file)) failures.push(`missing allowlisted kernel file ${file}`);
  }
  ok =
    result("VED-CH-005", failures, "kernel allowlist contains exactly nine docs and harnesses") &&
    ok;
}

const documentaryText = documentaryPaths.map(readText).join("\n");

{
  const requiredTerms = [
    "validation-eval-designer",
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
    "HARNESS_DECISION_GATES.md",
    "anti-theater",
    "ephemeral",
  ];
  const failures = requiredTerms
    .filter((term) => !documentaryText.toLowerCase().includes(term.toLowerCase()))
    .map((term) => `kernel documentation missing ${term}`);
  ok =
    result("VED-CH-006", failures, "identity, handoffs, statuses, and ephemeral proof-design terms preserved") &&
    ok;
}

{
  const gateText = readText(`${kernelPrefix}/contracts/HARNESS_DECISION_GATES.md`);
  const requiredTerms = [
    "teste inexistente != sempre BLOCK",
    "teste existente != sempre READY",
    "READY Gate",
    "NEEDS_DEV_DECISION_HARNESS Gate",
    "Anti-Theater Gate",
    "Light Validation Gate",
    "Human Decision Gate",
    "build",
    "lint",
    "smoke",
    "manual",
    "visual snapshot",
    "residual risk",
  ];
  const failures = requiredTerms
    .filter((term) => !gateText.toLowerCase().includes(term.toLowerCase()))
    .map((term) => `harness decision gates missing ${term}`);
  ok =
    result("VED-CH-007", failures, "standalone harness decision gates remain explicit") &&
    ok;
}

{
  const requiredTerms = [
    "npm test",
    "lint passes for a business-rule change",
    "build passes but does not cover the expected regression",
    "manual check has no observable criterion",
    "visual snapshot has no defined scenario or state",
    "generic smoke is presented as proof of behavioral change",
  ];
  const failures = requiredTerms
    .filter((term) => !documentaryText.toLowerCase().includes(term.toLowerCase()))
    .map((term) => `anti-theater coverage missing ${term}`);
  ok =
    result("VED-CH-008", failures, "anti-theater validation examples remain explicit") &&
    ok;
}

{
  const boundaryText = [
    readText(`${kernelPrefix}/contracts/CONTRACT.md`),
    readText(`${kernelPrefix}/contracts/BEHAVIOR_PARITY_SPINE.md`),
  ].join("\n");
  const requiredTerms = [
    "must not become planner",
    "must not become validation-runner",
    "must not become execution-package-designer",
    "must not redesign scope",
    "must not execute checks",
    "must not emit a `patch plan`",
    "must not emit a `prompt final do coder`",
  ];
  const failures = requiredTerms
    .filter((term) => !boundaryText.toLowerCase().includes(term.toLowerCase()))
    .map((term) => `responsibility boundary missing ${term}`);
  ok =
    result("VED-CH-009", failures, "planner, runner, and package-designer drift remain prohibited") &&
    ok;
}

{
  const failures = documentaryText.includes(finalPassStatus)
    ? ["kernel bundle contains premature final-pass status"]
    : [];
  ok =
    result("VED-CH-010", failures, "kernel bundle contains no premature final-pass status") &&
    ok;
}

{
  const failures = [];
  for (const term of driftTerms) {
    if (!documentaryText.toLowerCase().includes(term.toLowerCase())) {
      failures.push(`deny-list evidence missing ${term}`);
      continue;
    }
    if (!hasSafePolarity(documentaryText, term)) {
      failures.push(`unsafe permissive context found for ${term}`);
    }
  }
  const planningKernel = ["planning", "kernel"].join(" ");
  const genericPlanningKernel = ["generic", planningKernel].join(" ");
  if (documentaryText.toLowerCase().includes(planningKernel)) {
    failures.push(`kernel docs contain prohibited ${planningKernel}`);
  }
  if (documentaryText.toLowerCase().includes(genericPlanningKernel)) {
    failures.push(`kernel docs contain prohibited ${genericPlanningKernel}`);
  }
  ok =
    result("VED-CH-011", failures, "role-drift literals remain deny-listed with safe polarity") &&
    ok;
}

{
  const goldenText = readText(`${kernelPrefix}/validation/GOLDEN_TESTS.md`);
  const failures = [];
  for (let number = 1; number <= 10; number += 1) {
    const id = `VED-GT-${String(number).padStart(3, "0")}`;
    if (!goldenText.includes(`## Golden Test ${id}`)) {
      failures.push(`golden documentation missing ${id}`);
    }
  }
  ok =
    result("VED-CH-012", failures, "golden documentation declares ten blocking scenarios") &&
    ok;
}

if (!ok) process.exit(1);
