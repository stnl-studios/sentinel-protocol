#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const kernelRoot = path.dirname(scriptPath);
const devSkillRoot = path.resolve(kernelRoot, "..", "..");

const ignoredNames = new Set(["__MACOSX", ".DS_Store"]);

const requiredContractFiles = [
  "reference/orchestrator_kernel/CONTRACT.md",
  "reference/orchestrator_kernel/MINIMUM_SAFE_BUNDLE.md",
  "reference/orchestrator_kernel/MODULE_INDEX.md",
  "reference/orchestrator_kernel/ACTIVATION_GATES.md",
  "reference/orchestrator_kernel/EXPERIMENTAL_MATERIALIZATION.md",
  "reference/orchestrator_kernel/STATIC_CHECKS.md",
  "reference/orchestrator_kernel/GOLDEN_TESTS.md",
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

const forbiddenOutputs = [
  ".github/agents/orchestrator.agent.md",
  ".codex/agents/orchestrator.toml",
  ".codex/config.toml",
  "AGENTS.md",
  "templates/agents/orchestrator.agent.md",
  "sentinel.mjs",
  "scripts/sentinel-smoke.mjs",
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
  if (hasIgnoredPart(relativePath)) {
    return { ignored: true, path: null };
  }

  const absolutePath = path.resolve(devSkillRoot, relativePath);
  if (!isInside(absolutePath, devSkillRoot)) {
    throw new Error(`path escapes dev skill: ${relativePath}`);
  }

  return { ignored: false, path: absolutePath };
}

function existsFile(relativePath) {
  const resolved = toDevPath(relativePath);
  if (resolved.ignored) return true;

  try {
    return fs.statSync(resolved.path).isFile();
  } catch (error) {
    if (error?.code === "ENOENT") return false;
    throw error;
  }
}

function readText(relativePath) {
  const resolved = toDevPath(relativePath);
  if (resolved.ignored) return "";
  return fs.readFileSync(resolved.path, "utf8");
}

function sectionFromHeading(markdown, headingPattern) {
  const match = headingPattern.exec(markdown);
  if (!match) return "";

  const start = match.index;
  const rest = markdown.slice(start);
  const next = rest.slice(match[0].length).search(/^#{1,3}\s+/m);
  return next === -1 ? rest : rest.slice(0, match[0].length + next);
}

function moduleEntry(markdown, moduleId) {
  return sectionFromHeading(
    markdown,
    new RegExp(`^###\\s+\`${escapeRegExp(moduleId)}\`\\s*$`, "m"),
  );
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function detailList(items, prefix) {
  return `${prefix}: ${items.slice(0, 4).join(", ")}${items.length > 4 ? ", ..." : ""}`;
}

function pass(id, detail = "ok") {
  return { id, status: "PASS", detail };
}

function fail(id, blocker, detail) {
  return { id, status: "FAIL", blocker, detail };
}

function checkRequiredFiles() {
  const missing = requiredContractFiles.filter((file) => !existsFile(file));
  if (missing.length > 0) {
    return fail(
      "CH-001",
      "BLOCKED_STATIC_REQUIRED_FILE_MISSING",
      detailList(missing, "missing"),
    );
  }
  return pass("CH-001", "required contracts present");
}

function checkSkillReferences() {
  if (!existsFile("SKILL.md")) {
    return fail(
      "CH-002",
      "BLOCKED_STATIC_SKILL_REFERENCE_BROKEN",
      "missing: SKILL.md",
    );
  }

  const skill = readText("SKILL.md");
  const matches = [...skill.matchAll(/reference\/orchestrator_kernel\/[A-Za-z0-9_.-]+\.md/g)]
    .map((match) => match[0])
    .filter((reference) => !hasIgnoredPart(reference));
  const uniqueReferences = [...new Set(matches)];
  const broken = uniqueReferences.filter((reference) => !existsFile(reference));

  if (broken.length > 0) {
    return fail(
      "CH-002",
      "BLOCKED_STATIC_SKILL_REFERENCE_BROKEN",
      detailList(broken, "broken"),
    );
  }

  return pass("CH-002", `${uniqueReferences.length} dev references valid`);
}

function checkModuleIndex() {
  const moduleIndex = readText("reference/orchestrator_kernel/MODULE_INDEX.md");
  const missing = [];
  const ambiguous = [];

  for (const moduleId of initialModules) {
    const headingCount = [...moduleIndex.matchAll(
      new RegExp(`^###\\s+\`${escapeRegExp(moduleId)}\`\\s*$`, "gm"),
    )].length;
    const fieldCount = [...moduleIndex.matchAll(
      new RegExp(`\`module_id\`:\\s+\`${escapeRegExp(moduleId)}\``, "g"),
    )].length;

    if (headingCount === 0 || fieldCount === 0) {
      missing.push(moduleId);
    } else if (headingCount !== 1 || fieldCount !== 1) {
      ambiguous.push(moduleId);
    }
  }

  if (missing.length > 0 || ambiguous.length > 0) {
    const detail = [
      missing.length > 0 ? detailList(missing, "missing") : null,
      ambiguous.length > 0 ? detailList(ambiguous, "ambiguous") : null,
    ].filter(Boolean).join("; ");
    return fail("CH-003", "BLOCKED_STATIC_MODULE_INDEX_INCOMPLETE", detail);
  }

  return pass("CH-003", "initial modules present");
}

function checkActivationGateCoverage() {
  const activationGates = readText("reference/orchestrator_kernel/ACTIVATION_GATES.md");
  const missing = [];
  const ambiguous = [];

  for (const moduleId of initialModules) {
    const rows = [...activationGates.matchAll(
      new RegExp(`^\\|\\s*\`${escapeRegExp(moduleId)}\`\\s*\\|\\s*Gate\\s+[0-3][^|]*\\|`, "gm"),
    )];
    if (rows.length === 0) {
      missing.push(moduleId);
    } else if (rows.length > 1) {
      ambiguous.push(moduleId);
    }
  }

  if (missing.length > 0 || ambiguous.length > 0) {
    const detail = [
      missing.length > 0 ? detailList(missing, "missing") : null,
      ambiguous.length > 0 ? detailList(ambiguous, "ambiguous") : null,
    ].filter(Boolean).join("; ");
    return fail("CH-004", "BLOCKED_STATIC_GATE_MAPPING_INCOMPLETE", detail);
  }

  return pass("CH-004", "initial modules mapped");
}

function checkBlockedModulesStayBlocked() {
  const moduleIndex = readText("reference/orchestrator_kernel/MODULE_INDEX.md");
  const activationGates = readText("reference/orchestrator_kernel/ACTIVATION_GATES.md");
  const staticChecks = readText("reference/orchestrator_kernel/STATIC_CHECKS.md");
  const goldenTests = readText("reference/orchestrator_kernel/GOLDEN_TESTS.md");

  const materializationEntry = moduleEntry(moduleIndex, "materialization.experimental");
  const checksEntry = moduleEntry(moduleIndex, "checks.static");
  const goldenEntry = moduleEntry(moduleIndex, "tests.golden_critical");
  const failures = [];

  if (!/- `safe_to_auto_activate`:\s*No\./.test(materializationEntry)) {
    failures.push("materialization.experimental safe_to_auto_activate not No");
  }

  if (!/^\|\s*`materialization\.experimental`\s*\|\s*Gate 3 stop\/block\s*\|/m.test(activationGates)) {
    failures.push("materialization.experimental not Gate 3 stop/block");
  }

  const staticAuthorityText = `${checksEntry}\n${activationGates}\n${staticChecks}`;
  if (!/(not a materialization grant|do not grant authority or release materialization|do not authorize real materialization|authorizing materialization)/i.test(staticAuthorityText)) {
    failures.push("checks.static lacks materialization-authority prohibition");
  }

  const goldenAuthorityText = `${goldenEntry}\n${activationGates}\n${goldenTests}`;
  if (!/not a full suite/i.test(goldenAuthorityText)) {
    failures.push("tests.golden_critical lacks full-suite limitation");
  }
  if (!/(does not implement an executable harness|no executable harness|without a future harness|future runnable test harness)/i.test(goldenAuthorityText)) {
    failures.push("tests.golden_critical lacks executable-proof limitation");
  }
  if (!/(do not grant authority or release materialization by themselves|neither one authorizes materialization by itself|authorizing materialization by themselves)/i.test(goldenAuthorityText)) {
    failures.push("tests.golden_critical lacks materialization-authority limitation");
  }

  if (failures.length > 0) {
    return fail(
      "CH-005",
      "BLOCKED_STATIC_BLOCKED_MODULE_WEAKENED",
      detailList(failures, "weakened"),
    );
  }

  return pass("CH-005", "blocked modules remain blocked");
}

function checkForbiddenOutputs() {
  const materialization = readText("reference/orchestrator_kernel/EXPERIMENTAL_MATERIALIZATION.md");
  const prohibited = sectionFromHeading(materialization, /^## Prohibited Outputs\s*$/m);
  const missing = forbiddenOutputs.filter((output) => !prohibited.includes(output));

  if (missing.length > 0) {
    return fail(
      "CH-006",
      "BLOCKED_STATIC_FORBIDDEN_OUTPUT_WEAKENED",
      detailList(missing, "missing"),
    );
  }

  return pass("CH-006", "forbidden outputs prohibited");
}

function checkSafeBundleMandatory() {
  const minimumSafeBundle = readText("reference/orchestrator_kernel/MINIMUM_SAFE_BUNDLE.md");
  const moduleIndex = readText("reference/orchestrator_kernel/MODULE_INDEX.md");
  const activationGates = readText("reference/orchestrator_kernel/ACTIVATION_GATES.md");
  const staticChecks = readText("reference/orchestrator_kernel/STATIC_CHECKS.md");
  const failures = [];

  if (!/minimum safe bundle is mandatory/i.test(minimumSafeBundle)) {
    failures.push("MINIMUM_SAFE_BUNDLE.md missing mandatory statement");
  }
  if (!/must never remove, override, weaken, or make conditional/i.test(minimumSafeBundle)) {
    failures.push("MINIMUM_SAFE_BUNDLE.md missing anti-weakening statement");
  }
  if (!/No module may weaken, override, replace, or make conditional the minimum safe\s+bundle/i.test(moduleIndex)) {
    failures.push("MODULE_INDEX.md missing module anti-weakening rule");
  }
  if (!/No gate may weaken,\s+override,\s+make optional,\s+or bypass any non-optional protection/i.test(activationGates)) {
    failures.push("ACTIVATION_GATES.md missing gate anti-bypass rule");
  }
  if (!/cannot be removed,\s+overridden,\s+weakened,\s+made\s+conditional,\s+or bypassed/i.test(staticChecks)) {
    failures.push("STATIC_CHECKS.md missing check/materializer anti-bypass rule");
  }

  const combined = `${minimumSafeBundle}\n${moduleIndex}\n${activationGates}\n${staticChecks}`;
  const weakeningPatterns = [
    /minimum safe bundle is optional/i,
    /safe bundle is optional/i,
    /safe bundle may be bypassed/i,
    /safe bundle can be bypassed/i,
    /static checks replace the minimum safe bundle/i,
    /materialization replaces the minimum safe bundle/i,
  ];
  for (const pattern of weakeningPatterns) {
    if (pattern.test(combined)) {
      failures.push(`weakening phrase: ${pattern.source}`);
      break;
    }
  }

  if (failures.length > 0) {
    return fail(
      "CH-007",
      "BLOCKED_STATIC_SAFE_BUNDLE_WEAKENED",
      detailList(failures, "weakened"),
    );
  }

  return pass("CH-007", "safe bundle remains mandatory");
}

function checkDevSkillScope() {
  const staticChecks = readText("reference/orchestrator_kernel/STATIC_CHECKS.md");
  const failures = [];

  if (!/(documental|documentation|structural)/i.test(staticChecks)) {
    failures.push("missing documentary/structural scope");
  }
  if (!/skills\/stnl_project_agent_specializer_dev\/\*\*/.test(staticChecks)) {
    failures.push("missing dev-skill path boundary");
  }
  if (!/do not require production skill edits,\s+final\s+artifact writes,\s+runtime\s+loader changes,\s+installer changes,\s+smoke changes/i.test(staticChecks)) {
    failures.push("missing outside-edit prohibition");
  }
  if (!/without runtime execution,\s+broad discovery,\s+generated artifacts,\s+or semantic review/i.test(staticChecks)) {
    failures.push("missing cheap structural input limitation");
  }

  if (failures.length > 0) {
    return fail(
      "CH-008",
      "BLOCKED_STATIC_SCOPE_ESCAPED_DEV_SKILL",
      detailList(failures, "scope issue"),
    );
  }

  return pass("CH-008", "static checks scoped to dev skill");
}

const checks = [
  { id: "CH-001", run: checkRequiredFiles },
  { id: "CH-002", run: checkSkillReferences },
  { id: "CH-003", run: checkModuleIndex },
  { id: "CH-004", run: checkActivationGateCoverage },
  { id: "CH-005", run: checkBlockedModulesStayBlocked },
  { id: "CH-006", run: checkForbiddenOutputs },
  { id: "CH-007", run: checkSafeBundleMandatory },
  { id: "CH-008", run: checkDevSkillScope },
];

let failed = false;

for (const check of checks) {
  let result;
  try {
    result = check.run();
  } catch (error) {
    result = fail(
      check.id,
      "BLOCKED_STATIC_SCOPE_ESCAPED_DEV_SKILL",
      error instanceof Error ? error.message : String(error),
    );
  }

  if (result.status === "FAIL") failed = true;
  const blocker = result.blocker ? ` ${result.blocker}` : "";
  console.log(`${result.id} ${result.status}${blocker} ${result.detail}`);
}

process.exit(failed ? 1 : 0);
