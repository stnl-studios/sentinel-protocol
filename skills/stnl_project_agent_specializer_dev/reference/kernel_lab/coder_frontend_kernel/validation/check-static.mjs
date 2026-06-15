#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const validationRoot = path.dirname(scriptPath);
const kernelRoot = path.resolve(validationRoot, "..");
const referenceRoot = path.resolve(kernelRoot, "..", "..");
const devSkillRoot = path.resolve(referenceRoot, "..");
const repoRoot = path.resolve(devSkillRoot, "..", "..");
const realRepoRoot = fs.realpathSync.native(repoRoot);
const ignoredNames = new Set(["__MACOSX", ".DS_Store"]);
const skippedWalkNames = new Set([".git", "node_modules", ...ignoredNames]);
const cleanPassStatus = ["CLEAN", "EXCELLENT", "PASS"].join("_");
const stalePrePromotionTerms = [
  ["initial", " ", ["dra", "ft"].join("")].join(""),
  ["not", " ", "promoted"].join(""),
  ["not", " ", "a", " ", "clean", " ", "pass"].join(""),
];

const kernelPrefix =
  "skills/stnl_project_agent_specializer_dev/reference/kernel_lab/coder_frontend_kernel";
const snapshotPath =
  "skills/stnl_project_agent_specializer_dev/reference/agents/coder-frontend.agent.md";
const templatePath = "templates/agents/coder-frontend.agent.md";

const kernelFiles = [
  "README.md",
  "contracts/CONTRACT.md",
  "contracts/BEHAVIOR_PARITY_SPINE.md",
  "contracts/MINIMUM_SAFE_BUNDLE.md",
  "contracts/FRONTEND_EXECUTION_GATES.md",
  "validation/STATIC_CHECKS.md",
  "validation/GOLDEN_TESTS.md",
  "validation/check-static.mjs",
  "validation/check-golden.mjs",
];

const allowedKernelFileSet = new Set(kernelFiles);
const allowedKernelDirSet = new Set(["contracts", "validation"]);

const requiredPaths = [
  templatePath,
  snapshotPath,
  ...kernelFiles.map((relativePath) => `${kernelPrefix}/${relativePath}`),
];

const docs = {
  readme: `${kernelPrefix}/README.md`,
  contract: `${kernelPrefix}/contracts/CONTRACT.md`,
  parity: `${kernelPrefix}/contracts/BEHAVIOR_PARITY_SPINE.md`,
  bundle: `${kernelPrefix}/contracts/MINIMUM_SAFE_BUNDLE.md`,
  gates: `${kernelPrefix}/contracts/FRONTEND_EXECUTION_GATES.md`,
  staticDoc: `${kernelPrefix}/validation/STATIC_CHECKS.md`,
  goldenDoc: `${kernelPrefix}/validation/GOLDEN_TESTS.md`,
};
const documentaryPaths = Object.values(docs);

const exactInvalidHandoff = [
  "STATUS: BLOCKED",
  "REASON: required handoff missing or invalid",
  "NEXT_OWNER: orchestrator",
  "REQUEST: replay previous handoff or regenerate from owner",
].join("\n");

const durableDocTerms = [
  "Feature CONTEXT",
  "DONE",
  "ADR",
  "PLAN.md",
  "core",
  "units",
];

const structuralAnchors = [
  ["coder-frontend", [docs.readme, docs.contract, docs.parity]],
  ["agent_version: 2026.5.1", [snapshotPath]],
  ["targeted-local", [docs.readme, docs.contract, docs.parity]],
  ["executor", [docs.readme, docs.contract, docs.parity]],
  ["EXECUTION PACKAGE", [docs.readme, docs.contract, docs.parity, docs.gates]],
  ["WORK_PACKAGE_ID", [docs.readme, docs.contract, docs.parity, docs.gates]],
  ["EXECUTION BRIEF", [docs.readme, docs.contract, docs.parity, docs.gates]],
  ["VALIDATION PACK", [docs.readme, docs.contract, docs.parity, docs.gates]],
  ["READY", [docs.readme, docs.contract, docs.parity, docs.gates]],
  ["BLOCKED", [docs.readme, docs.contract, docs.parity, docs.gates]],
  ["designer.agent.md", [docs.readme, docs.contract, docs.parity, docs.gates]],
  ["stnl_frontend_quality", [docs.readme, docs.contract, docs.parity, docs.gates]],
];

const disallowedPathPatterns = [
  /(^|\/)fixtures?(\/|$)/i,
  /(^|\/)generated[-_]?reports?(\/|$)/i,
  /(^|\/)runtime[-_]?loader(\/|\.|$)/i,
  /(^|\/)materializers?(\/|\.|$)/i,
  /(^|\/)materialization(\/|\.|$)/i,
];

const passes = [];
const failures = [];

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

function walkKernelEntries(relativePath) {
  const resolved = toRepoPath(relativePath);
  const rootReal = realPathInsideRepo(resolved.path);
  const entries = [];

  function visit(absolutePath) {
    for (const dirent of fs.readdirSync(absolutePath, { withFileTypes: true })) {
      if (skippedWalkNames.has(dirent.name)) continue;
      const child = path.join(absolutePath, dirent.name);
      const repoRelative = path
        .relative(rootReal, child)
        .replaceAll(path.sep, "/");

      if (dirent.isSymbolicLink()) {
        entries.push({ path: repoRelative, type: "symlink" });
      } else if (dirent.isDirectory()) {
        realPathInsideRepo(child);
        entries.push({ path: repoRelative, type: "directory" });
        visit(child);
      } else if (dirent.isFile()) {
        realPathInsideRepo(child);
        entries.push({ path: repoRelative, type: "file" });
      } else {
        entries.push({ path: repoRelative, type: "non-regular" });
      }
    }
  }

  visit(rootReal);
  return entries.sort((left, right) => left.path.localeCompare(right.path));
}

function walk(relativePath) {
  return walkKernelEntries(relativePath)
    .filter((entry) => entry.type === "file")
    .map((entry) => entry.path);
}

function record(id, ok, message) {
  if (ok) {
    passes.push(`${id}: ${message}`);
  } else {
    failures.push(`${id}: ${message}`);
  }
}

function containsAll(text, terms) {
  return terms.every((term) => text.includes(term));
}

function checkRequiredFiles() {
  const missing = requiredPaths.filter((relativePath) => !existsFile(relativePath));
  record(
    "CFE-ST-001",
    missing.length === 0,
    missing.length === 0
      ? "required template, snapshot, promoted docs, and validation files exist"
      : `missing required files: ${missing.join(", ")}`,
  );
}

function checkKernelAllowlist() {
  const entries = walkKernelEntries(kernelPrefix);
  const badEntries = [];

  for (const entry of entries) {
    if (entry.type === "directory") {
      if (!allowedKernelDirSet.has(entry.path)) {
        badEntries.push(`directory outside allowlist: ${entry.path}`);
      }
    } else if (entry.type === "file") {
      if (!allowedKernelFileSet.has(entry.path)) {
        badEntries.push(`extra regular file: ${entry.path}`);
      }
    } else {
      badEntries.push(`${entry.type} entry: ${entry.path}`);
    }
  }

  record(
    "CFE-ST-012",
    badEntries.length === 0,
    badEntries.length === 0
      ? "kernel tree matches the exact file allowlist and contains no symlink or non-regular entries"
      : `kernel tree contains entries outside the exact allowlist: ${badEntries.join(", ")}`,
  );
}

function checkSnapshotParity() {
  const same = readBuffer(snapshotPath).equals(readBuffer(templatePath));
  record(
    "CFE-ST-002",
    same,
    same
      ? "dev snapshot matches canonical template byte-for-byte"
      : "dev snapshot differs from canonical template",
  );
}

function checkPromotionStatusAndNoStaleWording() {
  const badStatusFiles = [];
  const staleFiles = [];

  for (const relativePath of documentaryPaths) {
    const text = readText(relativePath);
    if (!text.includes(`Status: \`${cleanPassStatus}\`.`)) {
      badStatusFiles.push(`${relativePath} missing clean-pass status`);
    }
  }

  for (const entry of walk(kernelPrefix)) {
    if (!allowedKernelFileSet.has(entry)) continue;
    const relativePath = `${kernelPrefix}/${entry}`;
    const text = readText(relativePath).toLowerCase();
    const foundTerms = stalePrePromotionTerms.filter((term) =>
      text.includes(term),
    );
    if (foundTerms.length > 0) {
      staleFiles.push(`${relativePath} contains stale pre-promotion wording`);
    }
  }

  const checkFailures = [...badStatusFiles, ...staleFiles];
  record(
    "CFE-ST-003",
    checkFailures.length === 0,
    checkFailures.length === 0
      ? "documentary files declare clean pass and contain no stale pre-promotion wording"
      : `promotion status or wording failures: ${checkFailures.join(", ")}`,
  );
}

function checkNoDisallowedPaths() {
  const badEntries = walkKernelEntries(kernelPrefix)
    .map((entry) => entry.path)
    .filter((entry) =>
      disallowedPathPatterns.some((pattern) => pattern.test(entry)),
    );
  record(
    "CFE-ST-004",
    badEntries.length === 0,
    badEntries.length === 0
      ? "no fixture, generated-report, runtime-loader, materializer, or materialization paths exist"
      : `disallowed paths exist: ${badEntries.join(", ")}`,
  );
}

function checkStructuralAnchors() {
  const missing = [];
  for (const [anchor, paths] of structuralAnchors) {
    for (const file of paths) {
      if (!readText(file).includes(anchor)) {
        missing.push(`${file} missing ${anchor}`);
      }
    }
  }
  record(
    "CFE-ST-005",
    missing.length === 0,
    missing.length === 0
      ? "required structural anchors are present in expected docs"
      : missing.join("; "),
  );
}

function checkInvalidHandoffShape() {
  const required = [docs.contract, docs.parity, docs.gates];
  const missing = required.filter((file) => !readText(file).includes(exactInvalidHandoff));
  record(
    "CFE-ST-006",
    missing.length === 0,
    missing.length === 0
      ? "invalid required-handoff shape remains exact"
      : `exact invalid handoff shape missing from: ${missing.join(", ")}`,
  );
}

function checkDurableDocsProhibited() {
  const checkedDocs = [docs.contract, docs.parity, docs.bundle, docs.gates];
  const missing = [];
  for (const file of checkedDocs) {
    const text = readText(file);
    for (const term of durableDocTerms) {
      if (!text.includes(term)) {
        missing.push(`${file} missing durable-doc exclusion ${term}`);
      }
    }
  }
  record(
    "CFE-ST-007",
    missing.length === 0,
    missing.length === 0
      ? "durable documentation exclusions are preserved"
      : missing.join("; "),
  );
}

function checkReadyRequiresEvidence() {
  const contract = readText(docs.contract);
  const parity = readText(docs.parity);
  const gates = readText(docs.gates);
  const ok =
    containsAll(contract, [
      "READY",
      "implementation evidence",
      "changed paths",
      "checks run",
      "residual risk",
      "A positive handoff without applied implementation evidence",
      "invalid.",
    ]) &&
    containsAll(parity, [
      "READY",
      "changed paths or equivalent implementation evidence",
      "checks run",
      "residual risk",
      "If these conditions are not met, `READY` is unsafe.",
    ]) &&
    containsAll(gates, [
      "READY",
      "changed paths or equivalent implementation evidence",
      "checks run",
      "residual risk",
      "completion claim without",
      "implementation evidence",
    ]);
  record(
    "CFE-ST-008",
    ok,
    ok
      ? "READY requires implementation evidence, checks, paths, and risk"
      : "READY evidence requirements are incomplete",
  );
}

function checkValidationDocsPromotionAwareNoAutomaticFuturePromotion() {
  const staticText = readText(docs.staticDoc);
  const goldenText = readText(docs.goldenDoc);
  const requiredTerms = [
    cleanPassStatus,
    "promotion-aware",
    "does not authorize runtime pass",
    "automatic",
    "future",
    "promotion",
  ];
  const ok = [staticText, goldenText].every((text) =>
    requiredTerms.every((term) => text.includes(term)),
  );
  record(
    "CFE-ST-009",
    ok,
    ok
      ? "validation docs declare promotion-aware support with no automatic future promotion"
      : "validation docs missing promotion-aware or no-automatic-future-promotion declarations",
  );
}

function checkBundleListsHarness() {
  const bundle = readText(docs.bundle);
  const required = [
    "reference/agents/coder-frontend.agent.md",
    "reference/kernel_lab/coder_frontend_kernel/README.md",
    "reference/kernel_lab/coder_frontend_kernel/contracts/CONTRACT.md",
    "reference/kernel_lab/coder_frontend_kernel/contracts/BEHAVIOR_PARITY_SPINE.md",
    "reference/kernel_lab/coder_frontend_kernel/contracts/MINIMUM_SAFE_BUNDLE.md",
    "reference/kernel_lab/coder_frontend_kernel/contracts/FRONTEND_EXECUTION_GATES.md",
    "reference/kernel_lab/coder_frontend_kernel/validation/STATIC_CHECKS.md",
    "reference/kernel_lab/coder_frontend_kernel/validation/GOLDEN_TESTS.md",
    "reference/kernel_lab/coder_frontend_kernel/validation/check-static.mjs",
    "reference/kernel_lab/coder_frontend_kernel/validation/check-golden.mjs",
    "read-only",
    "blocking",
    cleanPassStatus,
    "final human audit authorization",
    "automatic promotion",
  ];
  const missing = required.filter((term) => !bundle.includes(term));
  record(
    "CFE-ST-010",
    missing.length === 0,
    missing.length === 0
      ? "minimum safe bundle includes only the authorized documentary harness"
      : `minimum safe bundle missing: ${missing.join(", ")}`,
  );
}

function checkStaticDocRequirements() {
  const text = readText(docs.staticDoc);
  const required = [
    "runtime loader",
    "materialization path",
    "production use",
    "target repository writes",
    "GitHub writes",
    "canonical template changes",
    "generated reports",
    "fixtures",
    cleanPassStatus,
  ];
  const missing = required.filter((term) => !text.includes(term));
  record(
    "CFE-ST-011",
    missing.length === 0,
    missing.length === 0
      ? "static documentation lists required prohibitions"
      : `static documentation missing prohibitions: ${missing.join(", ")}`,
  );
}

function main() {
  try {
    checkRequiredFiles();
    checkKernelAllowlist();
    checkSnapshotParity();
    checkPromotionStatusAndNoStaleWording();
    checkNoDisallowedPaths();
    checkStructuralAnchors();
    checkInvalidHandoffShape();
    checkDurableDocsProhibited();
    checkReadyRequiresEvidence();
    checkValidationDocsPromotionAwareNoAutomaticFuturePromotion();
    checkBundleListsHarness();
    checkStaticDocRequirements();
  } catch (error) {
    failures.push(`CFE-ST-000: unexpected error: ${error.message}`);
  }

  if (failures.length > 0) {
    console.error("coder_frontend_kernel static check: FAIL");
    for (const failure of failures) console.error(`FAIL ${failure}`);
    console.error(`Summary: ${passes.length} passed, ${failures.length} failed`);
    process.exit(1);
  }

  console.log("coder_frontend_kernel static check: PASS");
  for (const pass of passes) console.log(`PASS ${pass}`);
  console.log(`Summary: ${passes.length} passed, 0 failed`);
}

main();
