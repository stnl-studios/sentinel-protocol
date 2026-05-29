#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const kernelRoot = path.dirname(scriptPath);
const devSkillRoot = path.resolve(kernelRoot, "..", "..");
const realDevSkillRoot = fs.realpathSync.native(devSkillRoot);

const artifactPath = "reference/orchestrator_kernel/generated/orchestrator.kernel.agent.md";
const reportPath = "reference/orchestrator_kernel/generated/orchestrator.kernel.report.json";
const basePath = "reference/agents/orchestrator.agent.md";
const materializerPath = "reference/orchestrator_kernel/materialize-orchestrator-kernel.mjs";
const allowedOutputRoot = "reference/orchestrator_kernel/generated";

const forbiddenOutputs = [
  ".github/agents/orchestrator.agent.md",
  ".codex/agents/orchestrator.toml",
  ".codex/config.toml",
  "AGENTS.md",
  "templates/agents/orchestrator.agent.md",
  "sentinel.mjs",
  "scripts/sentinel-smoke.mjs",
];

const ignoredNames = new Set(["__MACOSX", ".DS_Store"]);

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
  if (hasIgnoredPart(relativePath)) {
    throw new Error(`ignored path is not a valid check input: ${relativePath}`);
  }

  const absolutePath = path.resolve(devSkillRoot, relativePath);
  if (!isInside(absolutePath, devSkillRoot)) {
    throw new Error(`path escapes dev skill: ${relativePath}`);
  }

  return absolutePath;
}

function realPathInsideDev(absolutePath) {
  const realPath = fs.realpathSync.native(absolutePath);
  if (!isInside(realPath, realDevSkillRoot)) {
    throw new Error(`path escapes dev skill after realpath: ${absolutePath}`);
  }
  return realPath;
}

function readRequired(relativePath) {
  const absolutePath = toDevPath(relativePath);
  return fs.readFileSync(realPathInsideDev(absolutePath), "utf8");
}

function existsFile(relativePath) {
  try {
    const absolutePath = toDevPath(relativePath);
    const stats = fs.statSync(absolutePath);
    if (!stats.isFile()) return false;
    realPathInsideDev(absolutePath);
    return true;
  } catch (error) {
    if (error?.code === "ENOENT") return false;
    throw error;
  }
}

function sha256(text) {
  return crypto.createHash("sha256").update(text, "utf8").digest("hex");
}

function pass(id, detail = "ok") {
  return { id, status: "PASS", detail };
}

function fail(id, blocker, detail) {
  return { id, status: "FAIL", blocker, detail };
}

function detailList(items, prefix) {
  return `${prefix}: ${items.slice(0, 4).join(", ")}${items.length > 4 ? ", ..." : ""}`;
}

function loadReport() {
  return JSON.parse(readRequired(reportPath));
}

function checkOutputsExist() {
  const missing = [artifactPath, reportPath].filter((file) => !existsFile(file));
  if (missing.length > 0) {
    return fail(
      "MT-001",
      "BLOCKED_MATERIALIZED_OUTPUT_MISSING",
      detailList(missing, "missing"),
    );
  }
  return pass("MT-001", "generated artifact and report exist");
}

function checkReportShape(report) {
  const missing = [];
  if (report.status !== "MATERIALIZED_EXPERIMENTAL") missing.push("status");
  if (report.scope !== "orchestrator-only") missing.push("scope");
  if (report.installable !== false) missing.push("installable=false");
  if (report.final_artifact !== false) missing.push("final_artifact=false");
  if (report.allowed_output_root !== allowedOutputRoot) missing.push("allowed_output_root");
  if (report.output !== artifactPath) missing.push("output path");
  if (report.report !== reportPath) missing.push("report path");
  if (!report.source_files?.baseOrchestrator?.sha256) missing.push("base source hash");

  if (missing.length > 0) {
    return fail("MT-002", "BLOCKED_MATERIALIZED_REPORT_INVALID", detailList(missing, "missing/invalid"));
  }
  return pass("MT-002", "report shape valid");
}

function checkHashes(report) {
  const artifact = readRequired(artifactPath);
  const base = readRequired(basePath);
  const mismatches = [];

  if (report.generated?.sha256 !== sha256(artifact)) mismatches.push("generated sha256");
  if (report.source_files?.baseOrchestrator?.sha256 !== sha256(base)) mismatches.push("base sha256");

  if (mismatches.length > 0) {
    return fail("MT-003", "BLOCKED_MATERIALIZED_HASH_MISMATCH", detailList(mismatches, "mismatch"));
  }
  return pass("MT-003", "hashes match sources");
}

function checkArtifactBoundaries() {
  const artifact = readRequired(artifactPath);
  const requiredText = [
    "orchestrator-kernel-experimental",
    "experimental: true",
    "installable: false",
    "materialization_scope: orchestrator-only",
    "not a production template",
    "not an installed agent",
    "not a target artifact",
    "## Source Boundary",
    "### Irremovable responsibilities",
    "### Kernel limits",
    "### Mandatory Rules",
    "### Evaluation Order",
    "### Initial Module Mapping",
    "### Status it may emit",
    "### Anti-role-drift rules",
    "### Completion contract",
  ];
  const missing = requiredText.filter((text) => !artifact.includes(text));

  if (missing.length > 0) {
    return fail("MT-004", "BLOCKED_MATERIALIZED_ARTIFACT_BOUNDARY_INVALID", detailList(missing, "missing"));
  }
  return pass("MT-004", "artifact keeps experimental boundaries");
}

function checkForbiddenOutputs() {
  const touched = [];
  for (const output of forbiddenOutputs) {
    const absoluteFromRepoRoot = path.resolve(devSkillRoot, "..", "..", output);
    if (fs.existsSync(absoluteFromRepoRoot)) {
      // Existing source files may legitimately exist in the repo. This check only verifies
      // that the materializer never reports them as generated outputs.
      continue;
    }
  }

  const materializer = readRequired(materializerPath);
  const missingProtections = [];
  if (!materializer.includes("--allow-experimental-materialization")) {
    missingProtections.push("authorization flag");
  }
  if (!materializer.includes(allowedOutputRoot)) {
    missingProtections.push("allowed output root");
  }
  for (const output of forbiddenOutputs) {
    if (!materializer.includes(output)) missingProtections.push(output);
  }

  if (missingProtections.length > 0 || touched.length > 0) {
    return fail(
      "MT-005",
      "BLOCKED_MATERIALIZED_FORBIDDEN_OUTPUT_GUARD_INVALID",
      detailList([...missingProtections, ...touched], "issue"),
    );
  }
  return pass("MT-005", "forbidden-output guards present");
}

let report = null;
const checks = [
  checkOutputsExist,
  () => {
    report = loadReport();
    return checkReportShape(report);
  },
  () => checkHashes(report),
  checkArtifactBoundaries,
  checkForbiddenOutputs,
];

let failed = false;
for (const check of checks) {
  let result;
  try {
    result = check();
  } catch (error) {
    result = fail(
      "MT-ERROR",
      "BLOCKED_MATERIALIZED_CHECK_FAILED_CLOSED",
      error instanceof Error ? error.message : String(error),
    );
  }
  if (result.status === "FAIL") failed = true;
  const blocker = result.blocker ? ` ${result.blocker}` : "";
  console.log(`${result.id} ${result.status}${blocker} ${result.detail}`);
}

process.exit(failed ? 1 : 0);
