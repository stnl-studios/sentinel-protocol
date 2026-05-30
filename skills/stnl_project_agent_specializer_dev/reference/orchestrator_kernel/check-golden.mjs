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
const behaviorSpinePath = "reference/orchestrator_kernel/BEHAVIOR_PARITY_SPINE.md";

const structuralTests = ["GT-001", "GT-002"];
const semanticTests = ["GT-SEM-001", "GT-SEM-002", "GT-SEM-003", "GT-SEM-004", "GT-SEM-005", "GT-SEM-006"];
const implementedTests = [...structuralTests, ...semanticTests];
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

function normalizeWhitespace(text) {
  return text.replace(/\s+/g, " ").trim();
}

function hasPhrase(text, phrase) {
  return normalizeWhitespace(text).includes(normalizeWhitespace(phrase));
}

function missingPhrases(text, phrases) {
  return phrases.filter((phrase) => !hasPhrase(text, phrase));
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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
  return [...markdown.matchAll(/^## Golden Test ([A-Z0-9-]+)\b/gm)].map((match) => match[1]);
}

function checkExactTestScope(markdown) {
  const ids = exactGoldenTestIds(markdown);
  const expected = [...implementedTests].sort();
  const found = [...ids].sort();
  const exact =
    ids.length === implementedTests.length &&
    found.every((id, index) => id === expected[index]);
  if (!exact) {
    return fail("GT-SCOPE", "BLOCKED_GOLDEN_SCOPE_DRIFT", `expected exactly ${implementedTests.join(", ")}; found ${ids.join(", ") || "none"}`);
  }
  return pass("GT-SCOPE", "expected structural and semantic goldens defined");
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

function semanticSection(markdown, id, blocker, requiredText) {
  const section = sectionFromH2(markdown, new RegExp(`^## Golden Test ${escapeRegExp(id)}\\b.*$`, "m"));
  if (!section) {
    return fail(id, blocker, `missing ${id} section`);
  }
  const missing = missingPhrases(section, requiredText);
  if (missing.length > 0) {
    return fail(id, blocker, detailList(missing, "missing golden doc"));
  }
  return null;
}

function checkSemanticContract(markdown, spine, id, blocker, requiredDoc, requiredSpine, detail) {
  const docFailure = semanticSection(markdown, id, blocker, [...requiredDoc, blocker]);
  if (docFailure) return docFailure;

  const missing = missingPhrases(spine, requiredSpine);
  if (missing.length > 0) {
    return fail(id, blocker, detailList(missing, "missing spine contract"));
  }

  return pass(id, detail);
}

function checkGtSem001(markdown, spine) {
  return checkSemanticContract(
    markdown,
    spine,
    "GT-SEM-001",
    "BLOCKED_SEM_RUN_PLAN_ESCAPED_TO_EXECUTION",
    [
      "RUN=plan",
      "execution-package-designer.agent.md",
      "coder",
      "validation-runner.agent.md",
      "finalizer.agent.md",
      "conclude the slice",
    ],
    [
      "`RUN=plan`: stop at `execution-package-designer.agent.md`",
      "do not call coders",
      "do not route to `validation-runner.agent.md`",
      "do not let `finalizer.agent.md` conclude a slice",
    ],
    "RUN=plan stops before execution"
  );
}

function checkGtSem002(markdown, spine) {
  return checkSemanticContract(
    markdown,
    spine,
    "GT-SEM-002",
    "BLOCKED_SEM_COMPACT_WEAKENED_SAFETY",
    [
      "MODE=compact",
      "format-only compaction",
      "gates",
      "blockers",
      "proof requirements",
      "handoff validity",
      "safety obligations",
    ],
    [
      "`MODE=compact`: format-only compaction",
      "same gates, blockers, proof requirements, handoff validity, and safety obligations",
      "No axis may permit invented requirements, skipped gates, ignored blockers, weakened proof, or compacted safety",
    ],
    "MODE=compact preserves safety obligations"
  );
}

function checkGtSem003(markdown, spine) {
  return checkSemanticContract(
    markdown,
    spine,
    "GT-SEM-003",
    "BLOCKED_SEM_AUTONOMOUS_NORMATIVE_DECISION",
    [
      "FLOW=autonomous",
      "product",
      "contract",
      "schema",
      "auth",
      "permission",
      "payload",
      "business-rule",
      "normative decision",
      "block or escalate",
    ],
    [
      "`FLOW=autonomous`: continue only through safe cycles",
      "product, contract, schema, auth, permission, payload, business-rule, or other normative decisions",
      "When a normative decision is required, block or escalate instead of deciding",
    ],
    "FLOW=autonomous blocks normative decisions"
  );
}

function checkGtSem004(markdown, spine) {
  return checkSemanticContract(
    markdown,
    spine,
    "GT-SEM-004",
    "BLOCKED_SEM_EXECUTOR_HANDOFF_ADVANCED_INVALID",
    [
      "Executor",
      "READY",
      "applied implementation evidence",
      "EXECUTOR_HANDOFF_INVALID",
      "HANDOFF_INVALID",
      "REQUEST_REPLAY_FROM_ORCHESTRATOR",
      "REQUEST_REGEN_FROM_OWNER",
      "runner",
      "reviewer",
      "finalizer",
    ],
    [
      "Executor gate requires terminal executor `READY` with applied-change evidence",
      "Executor handoffs are invalid unless they are",
      "`READY` with applied implementation evidence",
      "Treat command logs, progress reports, analysis, pseudo-plans, broad rediscovery, narrative summaries, implicit terminal states, and evidence-free `READY` as `EXECUTOR_HANDOFF_INVALID`",
      "`REQUEST_REPLAY_FROM_ORCHESTRATOR`, or `REQUEST_REGEN_FROM_OWNER`",
      "Do not route forward",
      "Route post-execution to `validation-runner.agent.md` only after a valid executor artifact",
    ],
    "invalid executor handoff cannot advance"
  );
}

function checkGtSem005(markdown, spine) {
  return checkSemanticContract(
    markdown,
    spine,
    "GT-SEM-005",
    "BLOCKED_SEM_CORRECTION_BUDGET_ESCAPED",
    [
      "at most 2",
      "at most 1",
      "fingerprint",
      "root cause",
      "budget exhaustion",
      "finalizer.agent.md",
      "residual pack and evidence",
    ],
    [
      "at most 2 automatic correction rounds per slice or round",
      "at most 1 automatic correction attempt for the same fingerprint or root cause",
      "new issues may route only while budget remains",
      "repeated issues or budget exhaustion route to `finalizer.agent.md` with residual pack and evidence",
    ],
    "correction budget routes to finalizer when exhausted or repeated"
  );
}

function checkGtSem006(markdown, spine) {
  return checkSemanticContract(
    markdown,
    spine,
    "GT-SEM-006",
    "BLOCKED_SEM_FINALIZER_RESYNC_BOUNDARY_WEAKENED",
    [
      "terminal outcome",
      "finalizer.agent.md",
      "resync.agent.md",
      "explicitly requires",
      "stnl_project_context MODE=RESYNC",
    ],
    [
      "Every terminal round outcome routes through `finalizer.agent.md`",
      "budget exhaustion",
      "Do not declare slice closure locally",
      "Do not reopen or trigger `resync.agent.md` unless `finalizer.agent.md` explicitly requires it",
      "Do not confuse `stnl_project_context MODE=RESYNC` with `resync.agent.md`",
      "route explicit feature drift to `stnl_project_context MODE=RESYNC`",
    ],
    "finalizer and resync boundaries are enforced"
  );
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
let spine = "";
let scopeResult;
try {
  markdown = readText(goldenTestsPath);
  spine = readText(behaviorSpinePath);
  scopeResult = checkExactTestScope(markdown);
} catch (error) {
  scopeResult = fail("GT-SCOPE", "BLOCKED_GOLDEN_SCOPE_DRIFT", error instanceof Error ? error.message : String(error));
}

const results =
  scopeResult.status === "FAIL"
    ? [scopeResult]
    : [
        checkGt001(markdown),
        checkGt002(markdown),
        checkGtSem001(markdown, spine),
        checkGtSem002(markdown, spine),
        checkGtSem003(markdown, spine),
        checkGtSem004(markdown, spine),
        checkGtSem005(markdown, spine),
        checkGtSem006(markdown, spine),
      ];
for (const result of results) {
  if (result.status === "FAIL") failed = true;
  const blocker = result.blocker ? ` ${result.blocker}` : "";
  console.log(`${result.id} ${result.status}${blocker} ${result.detail}`);
}

process.exit(failed ? 1 : 0);
