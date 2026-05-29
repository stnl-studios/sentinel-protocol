#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const kernelRoot = path.dirname(scriptPath);
const devSkillRoot = path.resolve(kernelRoot, "..", "..");
const realDevSkillRoot = fs.realpathSync.native(devSkillRoot);
const staticHarnessPath = path.join(kernelRoot, "check-static.mjs");
const goldenTestsPath = "reference/orchestrator_kernel/GOLDEN_TESTS.md";

const implementedTests = ["GT-001", "GT-002"];
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

function realPathInsideDev(absolutePath) {
  const realPath = fs.realpathSync.native(absolutePath);
  if (!isInside(realPath, realDevSkillRoot)) {
    throw new Error(`path escapes dev skill after realpath: ${absolutePath}`);
  }
  return realPath;
}

function readText(relativePath) {
  if (hasIgnoredPart(relativePath)) return "";
  const absolutePath = path.resolve(devSkillRoot, relativePath);
  if (!isInside(absolutePath, devSkillRoot)) {
    throw new Error(`path escapes dev skill: ${relativePath}`);
  }
  return fs.readFileSync(realPathInsideDev(absolutePath), "utf8");
}

function sectionFromH2(markdown, headingPattern) {
  const match = headingPattern.exec(markdown);
  if (!match) return "";
  const start = match.index;
  const rest = markdown.slice(start);
  const next = rest.slice(match[0].length).search(/^##\s+/m);
  return next === -1 ? rest : rest.slice(0, match[0].length + next);
}

function detailList(items, prefix) {
  return `${prefix}: ${items.slice(0, 5).join(", ")}${items.length > 5 ? ", ..." : ""}`;
}

function pass(id, detail = "contract present") {
  return { id, status: "PASS", detail };
}

function fail(id, blocker, detail) {
  return { id, status: "FAIL", blocker, detail };
}

function hasAll(text, values) {
  return values.every((value) => text.includes(value));
}

function runStaticPrecondition() {
  try {
    if (!isInside(staticHarnessPath, devSkillRoot)) {
      throw new Error("check-static.mjs escapes dev skill");
    }
    const result = spawnSync(process.execPath, [realPathInsideDev(staticHarnessPath)], {
      cwd: devSkillRoot,
      encoding: "utf8",
      stdio: "pipe",
    });
    if (result.error) throw result.error;
    if (result.status !== 0) {
      const firstFailure = `${result.stdout || ""}\n${result.stderr || ""}`
        .split(/\r?\n/)
        .find((line) => /\bFAIL\b/.test(line));
      return fail("STATIC", "BLOCKED_GOLDEN_STATIC_CHECKS_FAILED", firstFailure || `check-static.mjs exited ${result.status ?? "unknown"}`);
    }
  } catch (error) {
    return fail("STATIC", "BLOCKED_GOLDEN_STATIC_CHECKS_FAILED", error instanceof Error ? error.message : String(error));
  }
  return pass("STATIC", "check-static.mjs passed");
}

function exactGoldenTestIds(markdown) {
  return [...markdown.matchAll(/^## Golden Test (GT-\d{3})\b/gm)].map((match) => match[1]);
}

function checkExactTestScope(markdown) {
  const ids = exactGoldenTestIds(markdown);
  const exact =
    ids.length === implementedTests.length &&
    [...ids].sort().every((id, index) => id === [...implementedTests].sort()[index]);
  if (!exact || /\bGT-003\b/.test(markdown)) {
    return fail("GT-SCOPE", "BLOCKED_GOLDEN_SCOPE_DRIFT", `expected exactly ${implementedTests.join(", ")}; found ${ids.join(", ") || "none"}`);
  }
  return pass("GT-SCOPE", "exactly GT-001 and GT-002 defined");
}

function checkGt001(markdown) {
  const section = sectionFromH2(markdown, /^## Golden Test GT-001\b.*$/m);
  if (!section) {
    return fail("GT-001", "BLOCKED_GOLDEN_SIMPLE_REQUEST_ACTIVATED_HEAVY_PATH", "missing GT-001 section");
  }
  const requiredText = [
    "simple routing or clarification",
    "Gate 0 always applies",
    "routing.basic",
    "context.missing_info",
    "validation.boundary",
    "routing.execution_package",
    "materialization.experimental",
    "No final artifact writes",
    "No complete Project Senior Profile",
    "generated artifacts",
    "target-project materialization",
    "BLOCKED_GOLDEN_SIMPLE_REQUEST_ACTIVATED_HEAVY_PATH",
  ];
  const missing = requiredText.filter((text) => !section.includes(text));
  if (missing.length > 0) {
    return fail("GT-001", "BLOCKED_GOLDEN_SIMPLE_REQUEST_ACTIVATED_HEAVY_PATH", detailList(missing, "missing"));
  }
  return pass("GT-001", "simple request contract holds");
}

function checkGt002(markdown) {
  const section = sectionFromH2(markdown, /^## Golden Test GT-002\b.*$/m);
  if (!section) {
    return fail("GT-002", "BLOCKED_GOLDEN_KERNELIZATION_ESCAPED_TO_MATERIALIZATION", "missing GT-002 section");
  }
  const requiredText = [
    "comparison work",
    "reference/agents/orchestrator.agent.md",
    "mission",
    "authority limits",
    "inputs/outputs",
    "handoffs",
    "completion contract",
    "role-drift protections",
    "critical gates",
    "Differences",
    "materialization.experimental",
    "do not authorize materialization",
    "standalone materializer",
    "generated orchestrator-kernel artifacts",
    "materialization of all agents",
    "complete Project Senior Profile",
    "BLOCKED_GOLDEN_KERNELIZATION_ESCAPED_TO_MATERIALIZATION",
  ];
  const missing = requiredText.filter((text) => !section.includes(text));
  if (!hasAll(section, [".github/**", ".codex/**", "AGENTS.md", "sentinel.mjs", "scripts/sentinel-smoke.mjs"])) {
    missing.push("forbidden productive/root paths");
  }
  if (missing.length > 0) {
    return fail("GT-002", "BLOCKED_GOLDEN_KERNELIZATION_ESCAPED_TO_MATERIALIZATION", detailList(missing, "missing"));
  }
  return pass("GT-002", "kernelization stays outside materialization");
}

const staticResult = runStaticPrecondition();
if (staticResult.status === "FAIL") {
  for (const id of implementedTests) {
    const result = fail(id, staticResult.blocker, staticResult.detail);
    console.log(`${result.id} ${result.status} ${result.blocker} ${result.detail}`);
  }
  process.exit(1);
}

let failed = false;
let markdown = "";
let scopeResult;
try {
  markdown = readText(goldenTestsPath);
  scopeResult = checkExactTestScope(markdown);
} catch (error) {
  scopeResult = fail("GT-SCOPE", "BLOCKED_GOLDEN_SCOPE_DRIFT", error instanceof Error ? error.message : String(error));
}

const results = scopeResult.status === "FAIL" ? [scopeResult] : [checkGt001(markdown), checkGt002(markdown)];
for (const result of results) {
  if (result.status === "FAIL") failed = true;
  const blocker = result.blocker ? ` ${result.blocker}` : "";
  console.log(`${result.id} ${result.status}${blocker} ${result.detail}`);
}

process.exit(failed ? 1 : 0);
