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

const hardenedStatus =
  "EXECUTION_PACKAGE_DESIGNER_KERNEL: HARDENED_FOR_FINAL_AUDIT";
const prematureStatuses = [
  "EXECUTION_PACKAGE_DESIGNER_KERNEL: CLEAN_EXCELLENT_PASS",
  "EXECUTION_PACKAGE_DESIGNER_KERNEL: DRAFT_READY_FOR_HUMAN_AUDIT",
  "EXECUTION_PACKAGE_DESIGNER_KERNEL: NOT_STARTED_READ_ONLY_CANONICAL_ANALYSIS",
  "EXECUTION_PACKAGE_DESIGNER_KERNEL: UNDER_CONSTRUCTION",
  "EXECUTION_PACKAGE_DESIGNER_KERNEL: NOT_CLEAN_EXCELLENT_PASS_YET",
];
const finalPassStatus = ["CLEAN", "EXCELLENT", "PASS"].join("_");

const kernelPrefix =
  "skills/stnl_project_agent_specializer_dev/reference/execution_package_designer_kernel";
const snapshotPath =
  "skills/stnl_project_agent_specializer_dev/reference/agents/execution-package-designer.agent.md";
const templatePath = "templates/agents/execution-package-designer.agent.md";
const manifestPath =
  "skills/stnl_project_agent_specializer_dev/reference/MANIFEST.md";

const kernelFiles = [
  "README.md",
  "contracts/CONTRACT.md",
  "contracts/BEHAVIOR_PARITY_SPINE.md",
  "contracts/PACKAGE_READINESS_GATES.md",
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
  "reference/agents/execution-package-designer.agent.md",
  ...kernelFiles.map(
    (relativePath) =>
      `reference/execution_package_designer_kernel/${relativePath}`,
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
  `${kernelPrefix}/contracts/PACKAGE_READINESS_GATES.md`,
  `${kernelPrefix}/contracts/MINIMUM_SAFE_BUNDLE.md`,
  `${kernelPrefix}/validation/STATIC_CHECKS.md`,
  `${kernelPrefix}/validation/GOLDEN_TESTS.md`,
];

const safePolarityTerms = [
  "must not",
  "prohibited",
  "reject",
  "refuses",
  "refuse",
  "fail when",
  "fail if",
  "blocks",
  "blocked",
  "not a substitute",
  "does not",
  "do not",
  "cannot",
  "unsafe",
  "negative space",
  "dangerous",
  "forbidden",
  "drift",
  "out of scope",
  "not included",
  "not active",
  "not authorize",
  "not durable",
  "not persisted",
  "not a",
  "prohibitive",
  "blocking",
  "wrongly",
  "unsafe if",
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
      realPathInsideRepo(child);
      const repoRelative = path
        .relative(rootReal, child)
        .replaceAll(path.sep, "/");
      if (dirent.isSymbolicLink()) {
        entries.push(`SYMLINK:${repoRelative}`);
      } else if (dirent.isDirectory()) {
        visit(child);
      } else if (dirent.isFile()) {
        entries.push(repoRelative);
      } else {
        entries.push(`NON_REGULAR:${repoRelative}`);
      }
    }
  }

  visit(rootReal);
  return entries.sort();
}

function hasAll(text, phrases) {
  const normalizedText = text.toLowerCase().replace(/\s+/g, " ");
  return phrases.every((phrase) =>
    normalizedText.includes(phrase.toLowerCase().replace(/\s+/g, " ")),
  );
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

function hasSafePolarity(text, term) {
  return occurrences(text, term).every((index) => {
    const paragraphStart = text.lastIndexOf("\n\n", index);
    const paragraphEnd = text.indexOf("\n\n", index + term.length);
    const paragraph = text
      .slice(
        paragraphStart === -1 ? 0 : paragraphStart + 2,
        paragraphEnd === -1 ? text.length : paragraphEnd,
      )
      .toLowerCase();
    return safePolarityTerms.some((marker) => paragraph.includes(marker));
  });
}

function sectionFor(text, id) {
  const marker = `## Golden Test ${id}`;
  const start = text.indexOf(marker);
  if (start === -1) return "";
  const next = text.indexOf("\n## Golden Test ", start + marker.length);
  return text.slice(start, next === -1 ? text.length : next);
}

function markdownSection(text, heading) {
  const marker = `## ${heading}`;
  const start = text.indexOf(marker);
  if (start === -1) return "";
  const next = text.indexOf("\n## ", start + marker.length);
  return text.slice(start, next === -1 ? text.length : next);
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

{
  const failures = requiredPaths
    .filter((relativePath) => !existsFile(relativePath))
    .map((relativePath) => `missing required file ${relativePath}`);
  ok =
    result("EPD-CH-001", failures, "required source, snapshot, and kernel files present") &&
    ok;
}

{
  const failures = [];
  if (!readBuffer(snapshotPath).equals(readBuffer(templatePath))) {
    failures.push("local snapshot differs from productive/base template");
  }
  ok =
    result("EPD-CH-002", failures, "local snapshot matches productive copy origin byte-for-byte") &&
    ok;
}

{
  const manifest = readText(manifestPath);
  const failures = manifestEntries
    .filter((entry) => !manifest.includes(entry))
    .map((entry) => `manifest missing ${entry}`);
  ok =
    result("EPD-CH-003", failures, "manifest lists snapshot and exact execution-package-designer bundle") &&
    ok;
}

{
  const failures = [];
  for (const relativePath of globalDocPaths) {
    const text = readText(relativePath);
    if (!text.includes(hardenedStatus)) {
      failures.push(`${relativePath} missing hardened-for-final-audit status`);
    }
    for (const status of prematureStatuses) {
      if (text.includes(status)) {
        failures.push(`${relativePath} contains premature or stale status ${status}`);
      }
    }
    const frozenEvidence = [
      "orchestrator_kernel",
      "planner_kernel",
      "validation_eval_designer_kernel",
      finalPassStatus,
    ];
    for (const evidence of frozenEvidence) {
      if (!text.includes(evidence)) {
        failures.push(`${relativePath} missing frozen predecessor evidence ${evidence}`);
      }
    }
  }
  ok =
    result("EPD-CH-004", failures, "global docs record hardened status and frozen predecessors") &&
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
    result("EPD-CH-005", failures, "kernel allowlist contains exactly nine regular docs and harnesses") &&
    ok;
}

{
  const contract = readText(`${kernelPrefix}/contracts/CONTRACT.md`);
  const identity = markdownSection(contract, "Identity");
  const input = markdownSection(contract, "Input Contract");
  const output = markdownSection(contract, "Output Contract");
  const status = markdownSection(contract, "Status Contract");
  const reading = markdownSection(contract, "Reading Contract");
  const sectionRequirements = [
    ["Identity", identity, [
    "execution-package-designer",
    "agent version: `2026.5.1`",
    "execution-package-design",
    "targeted-local",
    ]],
    ["Input Contract", input, [
    "EXECUTION BRIEF",
    "VALIDATION PACK",
    ]],
    ["Output Contract", output, [
    "EXECUTION PACKAGE",
    "PRE_EXECUTION_READINESS",
    "PACKAGE_SCOPE",
    "WORK_PACKAGE_ID",
    "OWNED_PATHS",
    "DO_NOT_TOUCH",
    "RUN_COMMANDS",
    "ACCEPTANCE_CHECKS",
    "REQUIRED_QUALITY_GUARDRAILS",
    "BLOCK_IF",
    "ephemeral",
    ]],
    ["Status Contract", status, [
    "READY",
    "BLOCKED",
    "HANDOFF_MISSING",
    "HANDOFF_INVALID",
    "REQUEST_REPLAY_FROM_ORCHESTRATOR",
    "REQUEST_REGEN_FROM_OWNER",
    ]],
    ["Reading Contract", reading, ["targeted-local", "broad discovery"]],
  ];
  const failures = [];
  for (const [name, section, terms] of sectionRequirements) {
    if (!section) {
      failures.push(`principal contract missing section ${name}`);
      continue;
    }
    for (const term of terms) {
      if (!section.toLowerCase().includes(term.toLowerCase())) {
        failures.push(`${name} missing ${term}`);
      }
    }
  }
  ok =
    result("EPD-CH-006", failures, "principal contract sections preserve required semantics") &&
    ok;
}

{
  const gateText = readText(`${kernelPrefix}/contracts/PACKAGE_READINESS_GATES.md`);
  const requiredTerms = [
    "READY Gate",
    "BLOCKED Gate",
    "Handoff Error Gate",
    "Parallelization Eligibility Gate",
    "Anti-Theater Package Gate",
    "Human Decision Gate",
    "OWNED_PATHS: relevant files",
    "DO_NOT_TOUCH: unrelated files",
    "RUN_COMMANDS: run tests",
    "ACCEPTANCE_CHECKS: verify works",
    "BLOCK_IF: anything risky",
    "orchestrator decides whether to parallelize",
  ];
  const failures = requiredTerms
    .filter((term) => !gateText.toLowerCase().includes(term.toLowerCase()))
    .map((term) => `package readiness gates missing ${term}`);
  ok =
    result("EPD-CH-007", failures, "package readiness gates remain explicit") &&
    ok;
}

{
  const boundaryText = [
    readText(`${kernelPrefix}/contracts/CONTRACT.md`),
    readText(`${kernelPrefix}/contracts/BEHAVIOR_PARITY_SPINE.md`),
  ].join("\n");
  const requiredTerms = [
    "must not become planner",
    "must not become validation-eval-designer",
    "must not become orchestrator",
    "must not become a coder",
    "must not become validation-runner",
    "reviewer",
    "finalizer",
    "resync",
    "materializer",
    "durable documentation",
    "must not implement",
    "must not run checks",
    "must not coordinate",
  ];
  const failures = requiredTerms
    .filter((term) => !boundaryText.toLowerCase().includes(term.toLowerCase()))
    .map((term) => `responsibility boundary missing ${term}`);
  ok =
    result("EPD-CH-008", failures, "responsibility-boundary drift remains prohibited") &&
    ok;
}

{
  const failures = [];
  for (const relativePath of documentaryPaths) {
    const text = readText(relativePath);
    if (!text.includes(hardenedStatus)) {
      failures.push(`${relativePath} missing hardened-for-final-audit status`);
    }
    for (const status of prematureStatuses) {
      if (text.includes(status)) {
        failures.push(`${relativePath} contains premature or stale status ${status}`);
      }
    }
    const prohibitedClaims = [
      "runtime pass",
      "materialization pass",
      "target pass",
      "production authorization",
    ];
    for (const claim of prohibitedClaims) {
      if (text.toLowerCase().includes(claim) && !hasSafePolarity(text, claim)) {
        failures.push(`${relativePath} contains unsafe claim ${claim}`);
      }
    }
  }
  ok =
    result("EPD-CH-009", failures, "hardened bundle has no stale or premature promotion status") &&
    ok;
}

{
  const contract = readText(`${kernelPrefix}/contracts/CONTRACT.md`);
  const status = markdownSection(contract, "Status Contract");
  const boundaries = markdownSection(contract, "Responsibility Boundaries");
  const reading = markdownSection(contract, "Reading Contract");
  const negativeSpace = markdownSection(
    readText(`${kernelPrefix}/contracts/MINIMUM_SAFE_BUNDLE.md`),
    "Mandatory Negative Space",
  );
  const failures = [];
  const requirements = [
    ["Status Contract", status, "STATUS: BLOCKED"],
    ["Status Contract", status, "HANDOFF_STATUS: HANDOFF_MISSING | HANDOFF_INVALID | REQUEST_REPLAY_FROM_ORCHESTRATOR | REQUEST_REGEN_FROM_OWNER"],
    ["Status Contract", status, "REQUEST:"],
    ["Status Contract", status, "NEXT_OWNER:"],
    ["Status Contract", status, "REASON:"],
    ["Status Contract", status, "`STATUS: BLOCKED` does not replace"],
    ["Status Contract", status, "`HANDOFF_READY != READY`"],
    ["Responsibility Boundaries", boundaries, "VALIDATION PASSED"],
    ["Responsibility Boundaries", boundaries, "TESTS PASSED"],
    ["Responsibility Boundaries", boundaries, "IMPLEMENTATION VERIFIED"],
    ["Responsibility Boundaries", boundaries, "PLAN.md"],
    ["Responsibility Boundaries", boundaries, "execution_package.md"],
    ["Reading Contract", reading, "never use broad discovery"],
    ["Mandatory Negative Space", negativeSpace, "permits broad discovery"],
    ["Mandatory Negative Space", negativeSpace, "permits `HANDOFF_READY` as a substitute for `STATUS: READY`"],
    ["Mandatory Negative Space", negativeSpace, "permits `execution_package.md`, `PLAN.md`, durable documentation"],
  ];
  for (const [name, section, term] of requirements) {
    if (!section.toLowerCase().includes(term.toLowerCase())) {
      failures.push(`${name} missing ${term}`);
    }
  }
  ok =
    result("EPD-CH-010", failures, "principal deny-list and recovery envelope remain explicit") &&
    ok;
}

{
  const goldenDoc = readText(`${kernelPrefix}/validation/GOLDEN_TESTS.md`);
  const failures = [];
  for (let index = 1; index <= 18; index += 1) {
    const id = `EPD-GT-${String(index).padStart(3, "0")}`;
    const section = sectionFor(goldenDoc, id);
    if (!section) {
      failures.push(`missing golden test ${id}`);
      continue;
    }
    for (const marker of [
      "### Objective",
      "### Input shape",
      "### Expected behavior",
      "### Fail condition",
      "Expected blocker: `BLOCKED_",
    ]) {
      if (!section.includes(marker)) failures.push(`${id} missing ${marker}`);
    }
  }
  ok =
    result("EPD-CH-011", failures, "golden documentation declares eighteen local scenarios") &&
    ok;
}

{
  const goldenHarness = readText(`${kernelPrefix}/validation/check-golden.mjs`);
  const requiredTerms = [
    "requiredPackageFields",
    "recoveryFields",
    "BLOCKED_EPD_READY_PACKAGE_MISSING_OR_INVALID",
    "BLOCKED_EPD_PACKAGE_PERSISTED",
    "BLOCKED_EPD_PLANNER_DRIFT",
    "BLOCKED_EPD_CODER_DRIFT",
    "BLOCKED_EPD_ORCHESTRATOR_DRIFT",
    "BLOCKED_EPD_VALIDATION_RUNNER_DRIFT",
    "BLOCKED_EPD_HANDOFF_MISSING",
    "BLOCKED_EPD_HANDOFF_INVALID",
    "BLOCKED_EPD_HANDOFF_STALE_WRONG_ROUND_OR_OWNER",
    "BLOCKED_EPD_ACCEPTANCE_CHECKS_NOT_MAPPED",
    "BLOCKED_EPD_BROAD_DISCOVERY",
    "BLOCKED_EPD_HANDOFF_READY_TREATED_AS_READY",
    "BLOCKED_EPD_REQUEST_REPLAY_FROM_ORCHESTRATOR",
    "BLOCKED_EPD_REQUEST_REGEN_FROM_OWNER",
    "BLOCKED_EPD_RECOVERY_ENVELOPE_INVALID",
  ];
  const failures = requiredTerms
    .filter((term) => !goldenHarness.includes(term))
    .map((term) => `golden harness missing ${term}`);
  ok =
    result("EPD-CH-012", failures, "golden harness declares isolated negative fixture classes") &&
    ok;
}

process.exit(ok ? 0 : 1);
