#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const kernelRoot = path.dirname(scriptPath);
const devSkillRoot = path.resolve(kernelRoot, "..", "..");
const realDevSkillRoot = fs.realpathSync.native(devSkillRoot);
const ignoredNames = new Set(["__MACOSX", ".DS_Store"]);

const requiredFiles = [
  "reference/agents/orchestrator.agent.md",
  "reference/kernel_lab/README.md",
  "reference/orchestrator_kernel/CONTRACT.md",
  "reference/orchestrator_kernel/MINIMUM_SAFE_BUNDLE.md",
  "reference/orchestrator_kernel/MODULE_INDEX.md",
  "reference/orchestrator_kernel/ACTIVATION_GATES.md",
  "reference/orchestrator_kernel/EXPERIMENTAL_MATERIALIZATION.md",
  "reference/orchestrator_kernel/STATIC_CHECKS.md",
  "reference/orchestrator_kernel/GOLDEN_TESTS.md",
  "reference/orchestrator_kernel/check-static.mjs",
  "reference/orchestrator_kernel/check-golden.mjs",
];

const removedRouteReferences = [
  "reference/orchestrator_kernel/materialize-orchestrator-kernel.mjs",
  "reference/orchestrator_kernel/check-materialized.mjs",
  "reference/orchestrator_kernel/generated/**",
];

const initialModules = [
  "routing.basic",
  "context.missing_info",
  "routing.execution_package",
  "validation.boundary",
  "materialization.experimental",
  "checks.static",
  "tests.golden_critical",
];

function isInside(childPath, parentPath) {
  const relative = path.relative(parentPath, childPath);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

function hasIgnoredPart(relativePath) {
  return relativePath
    .split(/[\\/]+/)
    .filter(Boolean)
    .some((part) => ignoredNames.has(part));
}

function toDevPath(relativePath) {
  if (hasIgnoredPart(relativePath)) return { ignored: true, path: null };
  const absolutePath = path.resolve(devSkillRoot, relativePath);
  if (!isInside(absolutePath, devSkillRoot)) {
    throw new Error(`path escapes dev skill: ${relativePath}`);
  }
  return { ignored: false, path: absolutePath };
}

function realPathInsideDev(absolutePath) {
  const realPath = fs.realpathSync.native(absolutePath);
  if (!isInside(realPath, realDevSkillRoot)) {
    throw new Error(`path escapes dev skill after realpath: ${absolutePath}`);
  }
  return realPath;
}

function existsFile(relativePath) {
  const resolved = toDevPath(relativePath);
  if (resolved.ignored) return true;
  try {
    const stats = fs.statSync(resolved.path);
    if (!stats.isFile()) return false;
    realPathInsideDev(resolved.path);
    return true;
  } catch (error) {
    if (error?.code === "ENOENT") return false;
    throw error;
  }
}

function readText(relativePath) {
  const resolved = toDevPath(relativePath);
  if (resolved.ignored) return "";
  return fs.readFileSync(realPathInsideDev(resolved.path), "utf8");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function detailList(items, prefix) {
  return `${prefix}: ${items.slice(0, 5).join(", ")}${items.length > 5 ? ", ..." : ""}`;
}

function pass(id, detail = "ok") {
  return { id, status: "PASS", detail };
}

function fail(id, blocker, detail) {
  return { id, status: "FAIL", blocker, detail };
}

function hasAll(text, values) {
  return values.every((value) => text.includes(value));
}

function checkRequiredFiles() {
  const missing = requiredFiles.filter((file) => !existsFile(file));
  if (missing.length > 0) {
    return fail("CH-001", "BLOCKED_STATIC_REQUIRED_FILE_MISSING", detailList(missing, "missing"));
  }
  return pass("CH-001", "kernel-lab files present");
}

function checkManifestFrozenRoute() {
  const manifest = readText("reference/MANIFEST.md");
  const missing = [
    "reference/agents/orchestrator.agent.md",
    "reference/kernel_lab/README.md",
    "reference/orchestrator_kernel/check-static.mjs",
    "reference/orchestrator_kernel/check-golden.mjs",
  ].filter((entry) => !manifest.includes(`\`${entry}\``));
  const stale = removedRouteReferences.filter((entry) => manifest.includes(`\`${entry}\``));
  const ambiguous = ["`reference/agents/**`", "`reference/docs/**`"].filter((entry) => manifest.includes(entry));
  const failures = [...missing.map((entry) => `missing ${entry}`), ...stale.map((entry) => `stale ${entry}`), ...ambiguous.map((entry) => `ambiguous ${entry}`)];
  if (failures.length > 0) {
    return fail("CH-002", "BLOCKED_STATIC_DEV_MANIFEST_AMBIGUOUS", detailList(failures, "manifest issue"));
  }
  return pass("CH-002", "manifest matches frozen route");
}

function checkKernelLabRoute() {
  const lab = readText("reference/kernel_lab/README.md");
  const required = [
    "validate the orchestrator kernel",
    "extract reusable principles",
    "kernelize agents by responsibility family",
    "validate the agent package",
    "Project Senior Profile",
    "rebuild the skill",
  ];
  const missing = required.filter((text) => !lab.includes(text));
  if (missing.length > 0) {
    return fail("CH-003", "BLOCKED_STATIC_KERNEL_LAB_ROUTE_INCOMPLETE", detailList(missing, "missing"));
  }
  return pass("CH-003", "kernel-lab route present");
}

function checkKernelCriteria() {
  const lab = readText("reference/kernel_lab/README.md");
  const required = [
    "central mission",
    "authority limits",
    "inputs and outputs",
    "handoffs",
    "completion contract",
    "role drift",
    "critical gates",
    "removes redundancy",
    "nonexistent external",
    "intentional and justified",
  ];
  const missing = required.filter((text) => !lab.includes(text));
  if (missing.length > 0) {
    return fail("CH-004", "BLOCKED_STATIC_KERNEL_CRITERIA_INCOMPLETE", detailList(missing, "missing"));
  }
  return pass("CH-004", "base-agent vs kernel criteria present");
}

function checkMaterializationFrozen() {
  const materialization = readText("reference/orchestrator_kernel/EXPERIMENTAL_MATERIALIZATION.md");
  const required = [
    "no standalone",
    "no generated",
    "no writes to a target repo",
    "no fallback",
    "production skill",
    "external filesystem",
  ];
  const missing = required.filter((text) => !materialization.includes(text));
  if (missing.length > 0) {
    return fail("CH-005", "BLOCKED_STATIC_MATERIALIZATION_FREEZE_WEAKENED", detailList(missing, "missing"));
  }
  return pass("CH-005", "materialization route frozen");
}

function checkModuleIndexAndGates() {
  const moduleIndex = readText("reference/orchestrator_kernel/MODULE_INDEX.md");
  const gates = readText("reference/orchestrator_kernel/ACTIVATION_GATES.md");
  const failures = [];

  for (const moduleId of initialModules) {
    const moduleHeading = new RegExp(`^###\\s+\`${escapeRegExp(moduleId)}\`\\s*$`, "m");
    const gateRow = new RegExp(`^\\|\\s*\`${escapeRegExp(moduleId)}\`\\s*\\|\\s*Gate\\s+[0-3][^|]*\\|`, "m");
    if (!moduleHeading.test(moduleIndex)) failures.push(`missing module ${moduleId}`);
    if (!gateRow.test(gates)) failures.push(`missing gate ${moduleId}`);
  }

  if (!/does not grant authority/i.test(moduleIndex)) failures.push("module index authority statement missing");
  if (!/Gates cannot authorize writing to final artifacts/i.test(gates)) failures.push("gate final-artifact authority block missing");
  if (!/current dev route is kernel-lab comparison only/i.test(gates)) failures.push("gate materialization freeze missing");

  if (failures.length > 0) {
    return fail("CH-006", "BLOCKED_STATIC_MODULE_GATE_AUTHORITY_WEAKENED", detailList(failures, "issue"));
  }
  return pass("CH-006", "modules and gates remain non-authorizing");
}

function checkSafeBundleMandatory() {
  const safeBundle = readText("reference/orchestrator_kernel/MINIMUM_SAFE_BUNDLE.md");
  const moduleIndex = readText("reference/orchestrator_kernel/MODULE_INDEX.md");
  const gates = readText("reference/orchestrator_kernel/ACTIVATION_GATES.md");
  const failures = [];

  if (!/minimum safe bundle is mandatory/i.test(safeBundle)) failures.push("safe bundle mandatory statement missing");
  if (!/must never remove, override, weaken, or make conditional/i.test(safeBundle)) failures.push("safe bundle anti-weakening statement missing");
  if (!/No module may weaken, override, replace, or make conditional the minimum safe\s+bundle/i.test(moduleIndex)) failures.push("module anti-weakening rule missing");
  if (!/No gate may weaken,\s+override,\s+make optional,\s+or bypass any non-optional protection/i.test(gates)) failures.push("gate anti-bypass rule missing");

  if (failures.length > 0) {
    return fail("CH-007", "BLOCKED_STATIC_SAFE_BUNDLE_WEAKENED", detailList(failures, "issue"));
  }
  return pass("CH-007", "safe bundle remains mandatory");
}

function checkDevScope() {
  const staticChecks = readText("reference/orchestrator_kernel/STATIC_CHECKS.md");
  const required = [
    "read-only",
    "skills/stnl_project_agent_specializer_dev/**",
    "productive skill",
    "productive templates",
    ".github/**",
    ".codex/**",
    "AGENTS.md",
    "sentinel.mjs",
    "scripts/sentinel-smoke.mjs",
    "~/.agents/**",
    "external filesystem",
  ];
  const missing = required.filter((text) => !staticChecks.includes(text));
  if (missing.length > 0) {
    return fail("CH-008", "BLOCKED_STATIC_SCOPE_ESCAPED_DEV_SKILL", detailList(missing, "missing"));
  }
  return pass("CH-008", "checks scoped to dev skill");
}

const checks = [
  checkRequiredFiles,
  checkManifestFrozenRoute,
  checkKernelLabRoute,
  checkKernelCriteria,
  checkMaterializationFrozen,
  checkModuleIndexAndGates,
  checkSafeBundleMandatory,
  checkDevScope,
];

let failed = false;
for (const check of checks) {
  let result;
  try {
    result = check();
  } catch (error) {
    result = fail("STATIC", "BLOCKED_STATIC_SCOPE_ESCAPED_DEV_SKILL", error instanceof Error ? error.message : String(error));
  }

  if (result.status === "FAIL") failed = true;
  const blocker = result.blocker ? ` ${result.blocker}` : "";
  console.log(`${result.id} ${result.status}${blocker} ${result.detail}`);
}

process.exit(failed ? 1 : 0);
