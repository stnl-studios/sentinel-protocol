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

const goldenScenarioRequirements = [
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

function sourceBlock(text, startMarker, endMarker) {
  const start = text.indexOf(startMarker);
  if (start === -1) return "";
  const next = text.indexOf(endMarker, start + startMarker.length);
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
      if (!hasAll(section, [term])) {
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
  const sectionRequirements = [
    ["READY Gate", [
      "EXECUTION BRIEF",
      "VALIDATION PACK",
      "PRE_EXECUTION_READINESS",
      "WORK_PACKAGE_ID",
      "OWNED_PATHS",
      "DO_NOT_TOUCH",
      "RUN_COMMANDS",
      "ACCEPTANCE_CHECKS",
      "BLOCK_IF",
    ]],
    ["BLOCKED Gate", [
      "ACCEPTANCE_CHECKS",
      "targeted-local reading",
      "broad discovery equivalent to implementation",
    ]],
    ["Handoff Error Gate", [
      "STATUS: BLOCKED",
      "HANDOFF_STATUS:",
      "REQUEST:",
      "NEXT_OWNER: orchestrator",
      "REASON:",
      "`STATUS: BLOCKED` does not replace",
    ]],
    ["HANDOFF_READY Is Not READY Gate", ["HANDOFF_READY != READY", "STATUS: READY"]],
    ["Parallelization Eligibility Gate", ["orchestrator decides whether to parallelize"]],
    ["Anti-Theater Package Gate", [
      "OWNED_PATHS: relevant files",
      "DO_NOT_TOUCH: unrelated files",
      "RUN_COMMANDS: run tests",
      "ACCEPTANCE_CHECKS: verify works",
      "BLOCK_IF: anything risky",
    ]],
    ["Human Decision Gate", ["DEV decision", "block rather than transfer that choice to coder"]],
  ];
  const failures = [];
  for (const [name, terms] of sectionRequirements) {
    const section = markdownSection(gateText, name);
    if (!section) {
      failures.push(`package readiness gates missing section ${name}`);
      continue;
    }
    for (const term of terms) {
      if (!hasAll(section, [term])) {
        failures.push(`${name} missing ${term}`);
      }
    }
  }
  ok =
    result("EPD-CH-007", failures, "package readiness gates remain explicit in canonical sections") &&
    ok;
}

{
  const contract = readText(`${kernelPrefix}/contracts/CONTRACT.md`);
  const paritySpine = readText(`${kernelPrefix}/contracts/BEHAVIOR_PARITY_SPINE.md`);
  const sectionRequirements = [
    ["CONTRACT Responsibility Boundaries", markdownSection(contract, "Responsibility Boundaries"), [
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
    ]],
    ["BEHAVIOR_PARITY_SPINE Required Negative Behaviors", markdownSection(paritySpine, "Required Negative Behaviors"), [
      "become planner or rewrite the cut",
      "become validation-eval-designer or redesign proof",
      "become orchestrator or coordinate coders",
      "become coder or implement",
      "become validation-runner or execute checks",
      "execution_package.md",
      "PLAN.md",
      "broad discovery",
    ]],
    ["BEHAVIOR_PARITY_SPINE Dangerous Drift Rejections", markdownSection(paritySpine, "Dangerous Drift Rejections"), [
      "VALIDATION PASSED",
      "TESTS PASSED",
      "IMPLEMENTATION VERIFIED",
      "routes directly to coder",
      "returning to orchestrator",
    ]],
  ];
  const failures = [];
  for (const [name, section, terms] of sectionRequirements) {
    if (!section) {
      failures.push(`responsibility boundary missing section ${name}`);
      continue;
    }
    for (const term of terms) {
      if (!hasAll(section, [term])) {
        failures.push(`${name} missing ${term}`);
      }
    }
  }
  ok =
    result("EPD-CH-008", failures, "responsibility-boundary drift remains prohibited in canonical sections") &&
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
  for (const [id, blocker, phrases] of goldenScenarioRequirements) {
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
      `Expected blocker: \`${blocker}\`.`,
    ]) {
      if (!section.includes(marker)) failures.push(`${id} missing ${marker}`);
    }
    if (!hasAll(section, phrases)) failures.push(`${id} missing local semantic evidence`);
  }
  ok =
    result("EPD-CH-011", failures, "golden documentation keeps eighteen section-local scenarios") &&
    ok;
}

{
  const goldenHarness = readText(`${kernelPrefix}/validation/check-golden.mjs`);
  const snapshotDerivation = sourceBlock(
    goldenHarness,
    "const snapshot = readText(snapshotPath);",
    "\n\nfunction classifyNegativeFixture(input)",
  );
  const classifier = sourceBlock(
    goldenHarness,
    "function classifyNegativeFixture(input) {",
    "\n}\n\nfunction completePackage()",
  );
  const recoveryStatuses = sourceBlock(
    goldenHarness,
    "const recoveryHandoffStatuses = [",
    "\n];",
  );
  const fixtureDeclarations = sourceBlock(
    goldenHarness,
    "const negativeFixtures = [",
    "\n];\n\nfunction result",
  );
  const fixtureTerms = [
    "requiredPackageFields.map",
    "preExecutionReadinessFields.map",
    "packageScopeFields.map",
    "recoveryHandoffStatuses.flatMap",
    "recoveryFields.map",
    "BLOCKED_EPD_READY_PACKAGE_MISSING_OR_INVALID",
    "BLOCKED_EPD_RECOVERY_ENVELOPE_INVALID",
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
  ];
  const failures = [];
  for (const term of [
    "PRE_EXECUTION_READINESS",
    "PACKAGE_SCOPE",
    "WORK_PACKAGE",
    "fieldsFromSnapshotSection",
  ]) {
    if (!snapshotDerivation.includes(term)) {
      failures.push(`snapshot-derived subfield declaration missing ${term}`);
    }
  }
  for (const term of [
    "HANDOFF_MISSING",
    "HANDOFF_INVALID",
    "REQUEST_REPLAY_FROM_ORCHESTRATOR",
    "REQUEST_REGEN_FROM_OWNER",
  ]) {
    if (!recoveryStatuses.includes(term)) {
      failures.push(`recovery handoff-status declaration missing ${term}`);
    }
  }
  for (const term of ["hasRecoveryEnvelopeSignal", "HANDOFF_STATUS:", "recoveryFields.some"]) {
    if (!classifier.includes(term)) {
      failures.push(`negative-fixture classifier missing ${term}`);
    }
  }
  if (classifier.includes("RECOVERY ENVELOPE")) {
    failures.push("negative-fixture classifier depends on artificial RECOVERY ENVELOPE literal");
  }
  for (const term of fixtureTerms) {
    if (!fixtureDeclarations.includes(term)) {
      failures.push(`negative-fixture declaration block missing ${term}`);
    }
  }
  ok =
    result("EPD-CH-012", failures, "golden harness declares section-scoped isolated negative fixture classes") &&
    ok;
}

process.exit(ok ? 0 : 1);
