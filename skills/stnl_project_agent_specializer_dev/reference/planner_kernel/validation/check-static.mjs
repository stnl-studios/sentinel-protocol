#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const validationRoot = path.dirname(scriptPath);
const plannerKernelRoot = path.resolve(validationRoot, "..");
const referenceRoot = path.resolve(plannerKernelRoot, "..");
const devSkillRoot = path.resolve(referenceRoot, "..");
const repoRoot = path.resolve(devSkillRoot, "..", "..");
const realRepoRoot = fs.realpathSync.native(repoRoot);
const ignoredNames = new Set(["__MACOSX", ".DS_Store"]);
const skippedWalkNames = new Set([".git", "node_modules", ...ignoredNames]);

const requiredPlannerFiles = [
  "skills/stnl_project_agent_specializer_dev/reference/planner_kernel/README.md",
  "skills/stnl_project_agent_specializer_dev/reference/planner_kernel/contracts/CONTRACT.md",
  "skills/stnl_project_agent_specializer_dev/reference/planner_kernel/contracts/BEHAVIOR_PARITY_SPINE.md",
  "skills/stnl_project_agent_specializer_dev/reference/planner_kernel/contracts/MINIMUM_SAFE_BUNDLE.md",
  "skills/stnl_project_agent_specializer_dev/reference/planner_kernel/validation/STATIC_CHECKS.md",
  "skills/stnl_project_agent_specializer_dev/reference/planner_kernel/validation/GOLDEN_TESTS.md",
  "skills/stnl_project_agent_specializer_dev/reference/planner_kernel/validation/check-static.mjs",
  "skills/stnl_project_agent_specializer_dev/reference/planner_kernel/validation/check-golden.mjs",
];

const plannerBundleEntries = [
  "reference/agents/planner.agent.md",
  "reference/planner_kernel/README.md",
  "reference/planner_kernel/contracts/CONTRACT.md",
  "reference/planner_kernel/contracts/BEHAVIOR_PARITY_SPINE.md",
  "reference/planner_kernel/contracts/MINIMUM_SAFE_BUNDLE.md",
  "reference/planner_kernel/validation/STATIC_CHECKS.md",
  "reference/planner_kernel/validation/GOLDEN_TESTS.md",
  "reference/planner_kernel/validation/check-static.mjs",
  "reference/planner_kernel/validation/check-golden.mjs",
];

const globalDocPaths = [
  "skills/stnl_project_agent_specializer_dev/README.md",
  "skills/stnl_project_agent_specializer_dev/SKILL.md",
  "skills/stnl_project_agent_specializer_dev/reference/kernel_lab/README.md",
];

const manifestPath = "skills/stnl_project_agent_specializer_dev/reference/MANIFEST.md";
const plannerDocPaths = [
  "skills/stnl_project_agent_specializer_dev/reference/planner_kernel/README.md",
  "skills/stnl_project_agent_specializer_dev/reference/planner_kernel/contracts/CONTRACT.md",
  "skills/stnl_project_agent_specializer_dev/reference/planner_kernel/contracts/BEHAVIOR_PARITY_SPINE.md",
  "skills/stnl_project_agent_specializer_dev/reference/planner_kernel/contracts/MINIMUM_SAFE_BUNDLE.md",
  "skills/stnl_project_agent_specializer_dev/reference/planner_kernel/validation/STATIC_CHECKS.md",
  "skills/stnl_project_agent_specializer_dev/reference/planner_kernel/validation/GOLDEN_TESTS.md",
];

const contractPaths = [
  "skills/stnl_project_agent_specializer_dev/reference/planner_kernel/contracts/CONTRACT.md",
  "skills/stnl_project_agent_specializer_dev/reference/planner_kernel/contracts/BEHAVIOR_PARITY_SPINE.md",
  "skills/stnl_project_agent_specializer_dev/reference/planner_kernel/contracts/MINIMUM_SAFE_BUNDLE.md",
];

const validationDocPaths = [
  "skills/stnl_project_agent_specializer_dev/reference/planner_kernel/validation/STATIC_CHECKS.md",
  "skills/stnl_project_agent_specializer_dev/reference/planner_kernel/validation/GOLDEN_TESTS.md",
];

const expectedPlannerKernelFiles = new Set(
  requiredPlannerFiles.map((file) => path.relative("skills/stnl_project_agent_specializer_dev/reference/planner_kernel", file).replaceAll(path.sep, "/"))
);

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
    if (!stats.isFile()) return false;
    realPathInsideRepo(resolved.path);
    return true;
  } catch (error) {
    if (error?.code === "ENOENT") return false;
    throw error;
  }
}

function existsAny(relativePath) {
  const resolved = toRepoPath(relativePath);
  if (resolved.ignored) return false;
  try {
    fs.lstatSync(resolved.path);
    realPathInsideRepo(resolved.path);
    return true;
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
  if (resolved.ignored) return [];
  const rootReal = realPathInsideRepo(resolved.path);
  const entries = [];

  function visit(absolutePath) {
    const dirents = fs.readdirSync(absolutePath, { withFileTypes: true });
    for (const dirent of dirents) {
      if (skippedWalkNames.has(dirent.name)) continue;
      const child = path.join(absolutePath, dirent.name);
      const realChild = realPathInsideRepo(child);
      const repoRelative = path.relative(repoRoot, realChild).replaceAll(path.sep, "/");
      entries.push({ relative: repoRelative, dirent });
      if (dirent.isDirectory()) visit(realChild);
    }
  }

  visit(rootReal);
  return entries;
}

function normalize(text) {
  return text.replace(/\s+/g, " ").trim().toLowerCase();
}

function hasPhrase(text, phrase) {
  return normalize(text).includes(normalize(phrase));
}

function hasAnyPhrase(text, phrases) {
  return phrases.some((phrase) => hasPhrase(text, phrase));
}

function missingPhrases(text, phrases) {
  return phrases.filter((phrase) => !hasPhrase(text, phrase));
}

function missingAlternatives(text, alternatives) {
  return alternatives
    .filter((group) => !hasAnyPhrase(text, group.phrases))
    .map((group) => group.label);
}

function detailList(items, prefix) {
  return `${prefix}: ${items.slice(0, 6).join(", ")}${items.length > 6 ? ", ..." : ""}`;
}

function pass(id, detail = "ok") {
  return { id, status: "PASS", detail };
}

function fail(id, blocker, detail) {
  return { id, status: "FAIL", blocker, detail };
}

function readMany(paths) {
  return paths.map((file) => `\n--- ${file} ---\n${readText(file)}`).join("\n");
}

function plannerLinesDeclaringExcellent(text) {
  return text
    .split(/\r?\n/)
    .filter((line) => /planner_kernel/i.test(line))
    .filter((line) => /clean_excellent_pass|planner_kernel_[a-z_]*excellent|(?<!not_)excellent_pass/i.test(line));
}

function checkRequiredFiles() {
  const missing = requiredPlannerFiles.filter((file) => !existsFile(file));
  if (missing.length > 0) {
    return fail("PL-CH-001", "BLOCKED_PLANNER_REQUIRED_FILE_MISSING", detailList(missing, "missing"));
  }
  return pass("PL-CH-001", "required planner-kernel files exist");
}

function checkSnapshotExistsAndListed() {
  const manifest = readText(manifestPath);
  const snapshot = "skills/stnl_project_agent_specializer_dev/reference/agents/planner.agent.md";
  const failures = [];
  if (!existsFile(snapshot)) failures.push("snapshot missing");
  if (!manifest.includes("reference/agents/planner.agent.md")) failures.push("manifest missing reference/agents/planner.agent.md");
  if (failures.length > 0) {
    return fail("PL-CH-002", "BLOCKED_PLANNER_SNAPSHOT_MISSING_OR_UNLISTED", detailList(failures, "issue"));
  }
  return pass("PL-CH-002", "local planner snapshot exists and is listed");
}

function checkSnapshotLiteralCopy() {
  const templatePath = "templates/agents/planner.agent.md";
  const snapshotPath = "skills/stnl_project_agent_specializer_dev/reference/agents/planner.agent.md";
  const failures = [];
  if (!existsFile(templatePath)) failures.push("productive template missing");
  if (!existsFile(snapshotPath)) failures.push("local snapshot missing");
  if (failures.length > 0) {
    return fail("PL-CH-003", "BLOCKED_PLANNER_LITERAL_COPY_UNVERIFIABLE", detailList(failures, "issue"));
  }

  const template = readBuffer(templatePath);
  const snapshot = readBuffer(snapshotPath);
  if (!template.equals(snapshot)) {
    return fail("PL-CH-003", "BLOCKED_PLANNER_SNAPSHOT_NOT_LITERAL_COPY", "templates/agents/planner.agent.md differs from reference/agents/planner.agent.md");
  }
  return pass("PL-CH-003", "snapshot is byte-for-byte copy of productive template");
}

function checkManifestListsPlannerBundle() {
  const manifest = readText(manifestPath);
  const missing = plannerBundleEntries.filter((entry) => !manifest.includes(entry));
  if (missing.length > 0) {
    return fail("PL-CH-004", "BLOCKED_PLANNER_MANIFEST_INCOMPLETE", detailList(missing, "missing"));
  }
  return pass("PL-CH-004", "manifest lists planner snapshot, docs, and harnesses");
}

function checkGlobalDocsPlannerStatus() {
  const failures = [];
  for (const file of globalDocPaths) {
    const text = readText(file);
    if (!hasPhrase(text, "planner_kernel")) failures.push(`${file} missing planner_kernel`);
    if (!hasAnyPhrase(text, ["not excellent", "NOT_EXCELLENT_PASS", "UNDER_REVIEW", "sob revisão", "human review", "FINAL_AUDIT_REQUIRED"])) {
      failures.push(`${file} missing pending/not-excellent status`);
    }
    const plannerExcellent = plannerLinesDeclaringExcellent(text);
    if (plannerExcellent.length > 0) failures.push(`${file} declares planner excellent`);
  }
  if (failures.length > 0) {
    return fail("PL-CH-005", "BLOCKED_PLANNER_GLOBAL_DOC_STATUS_INVALID", detailList(failures, "issue"));
  }
  return pass("PL-CH-005", "global docs recognize planner without excellent pass");
}

function checkOrchestratorFrozenStatus() {
  const failures = [];
  for (const file of [...globalDocPaths, manifestPath]) {
    const text = readText(file);
    if (!hasPhrase(text, "orchestrator_kernel")) failures.push(`${file} missing orchestrator_kernel`);
    if (!hasPhrase(text, "CLEAN_EXCELLENT_PASS")) failures.push(`${file} missing CLEAN_EXCELLENT_PASS`);
  }
  if (failures.length > 0) {
    return fail("PL-CH-006", "BLOCKED_ORCHESTRATOR_FROZEN_STATUS_WEAKENED", detailList(failures, "issue"));
  }
  return pass("PL-CH-006", "orchestrator frozen status preserved");
}

function checkSourceChainUnambiguous() {
  const text = readMany(plannerDocPaths);
  const missing = [
    "templates/agents/planner.agent.md",
    "reference/agents/planner.agent.md",
    "reference/planner_kernel/**",
  ].filter((phrase) => !text.includes(phrase));
  const missingAlt = missingAlternatives(text, [
    { label: "productive/base origin", phrases: ["productive/base origin", "productive template", "base origin", "copy origin"] },
    { label: "local audit snapshot", phrases: ["local snapshot", "dev snapshot", "audit point", "integrated dev snapshot"] },
    { label: "no fallback when snapshot missing", phrases: ["not a fallback", "no fallback", "must not use fallback", "no undeclared fallback"] },
  ]);
  const failures = [...missing, ...missingAlt];
  if (failures.length > 0) {
    return fail("PL-CH-007", "BLOCKED_PLANNER_SOURCE_CHAIN_AMBIGUOUS", detailList(failures, "missing"));
  }
  return pass("PL-CH-007", "productive origin, local snapshot, and documental kernel are explicit");
}

function checkNoPlanningKernelPath() {
  const offenders = walk(".")
    .map((entry) => entry.relative)
    .filter((relative) => /(^|[/\\])planning_kernel($|[/\\.])|planning_kernel/i.test(relative));
  if (offenders.length > 0) {
    return fail("PL-CH-008", "BLOCKED_PLANNING_KERNEL_PATH_EXISTS", detailList(offenders, "path"));
  }
  return pass("PL-CH-008", "no real planning_kernel path exists");
}

function checkNoPlannerExcellentStatus() {
  const text = readMany(plannerDocPaths);
  const plannerKernelPrefix = "PLANNER" + "_KERNEL";
  const excellentToken = "EXCELLENT";
  const forbiddenPattern = new RegExp(`${plannerKernelPrefix}_[A-Z_]*${excellentToken}[A-Z_]*`, "gi");
  const forbidden = text.match(forbiddenPattern) || [];
  const lineFailures = plannerLinesDeclaringExcellent(text);
  if (forbidden.length > 0 || lineFailures.length > 0) {
    return fail("PL-CH-009", "BLOCKED_PLANNER_EXCELLENT_STATUS_DECLARED", detailList([...forbidden, ...lineFailures], "forbidden"));
  }
  return pass("PL-CH-009", "no planner excellent status declared in planner kernel docs");
}

function checkNoUnauthorizedSurfaces() {
  const entries = walk("skills/stnl_project_agent_specializer_dev/reference/planner_kernel");
  const failures = [];
  const surfacePattern = /(^|[/_-])(fixtures?|generated|reports?|materializers?|runtime)([/._-]|$)/i;

  for (const entry of entries) {
    const localRelative = path
      .relative(plannerKernelRoot, path.resolve(repoRoot, entry.relative))
      .replaceAll(path.sep, "/");
    if (entry.dirent.isFile() && entry.relative.endsWith(".mjs") && !expectedPlannerKernelFiles.has(localRelative)) {
      failures.push(`unexpected harness ${localRelative}`);
    }
    if (surfacePattern.test(localRelative)) failures.push(`unauthorized surface ${localRelative}`);
  }

  if (failures.length > 0) {
    return fail("PL-CH-010", "BLOCKED_PLANNER_UNAUTHORIZED_RUNTIME_SURFACE", detailList(failures, "issue"));
  }
  return pass("PL-CH-010", "no unauthorized runtime/materialization surfaces under planner_kernel");
}

function checkCoreInvariants() {
  const text = readMany(contractPaths);
  const missing = missingPhrases(text, [
    "planner",
    "planning",
    "bounded-context",
    "EXECUTION BRIEF",
    "READY",
    "NEEDS_DEV_DECISION_BASE",
    "ephemeral",
    "current-round",
    "orchestrator",
  ]);
  const missingAlt = missingAlternatives(text, [
    { label: "return to orchestrator", phrases: ["return to orchestrator", "returns to orchestrator", "returned to orchestrator", "return the brief to orchestrator"] },
  ]);
  const failures = [...missing, ...missingAlt];
  if (failures.length > 0) {
    return fail("PL-CH-011", "BLOCKED_PLANNER_CORE_INVARIANT_MISSING", detailList(failures, "missing"));
  }
  return pass("PL-CH-011", "core planner invariants preserved");
}

function checkRoleAbsorptionProhibited() {
  const text = readMany(contractPaths);
  const failures = missingAlternatives(text, [
    { label: "implement", phrases: ["must not implement", "does not implement", "do not implement"] },
    { label: "run validation", phrases: ["run validation", "validation execution"] },
    { label: "final verdict", phrases: ["final verdict", "final-verdict"] },
    { label: "close round", phrases: ["close the round", "close round", "closure"] },
    { label: "resync", phrases: ["resync"] },
    { label: "durable documentation", phrases: ["durable documentation"] },
    { label: "PLAN.md", phrases: ["PLAN.md"] },
    { label: "execution_brief.md", phrases: ["execution_brief.md"] },
    { label: "backlog manager", phrases: ["backlog manager", "manage a backlog"] },
    { label: "discovery engine", phrases: ["discovery engine"] },
    { label: "implementation designer", phrases: ["implementation designer", "design implementation"] },
    { label: "pseudo-orchestrator", phrases: ["pseudo-orchestrator", "pseudo-orchestration"] },
    { label: "VALIDATION PACK", phrases: ["VALIDATION PACK"] },
    { label: "EXECUTION PACKAGE", phrases: ["EXECUTION PACKAGE"] },
    { label: "WORK_PACKAGE_ID", phrases: ["WORK_PACKAGE_ID"] },
    { label: "OWNED_PATHS", phrases: ["OWNED_PATHS"] },
    { label: "DO_NOT_TOUCH", phrases: ["DO_NOT_TOUCH"] },
    { label: "RUN_COMMANDS", phrases: ["RUN_COMMANDS"] },
    { label: "ACCEPTANCE_CHECKS", phrases: ["ACCEPTANCE_CHECKS"] },
    { label: "BLOCK_IF", phrases: ["BLOCK_IF"] },
  ]);
  if (failures.length > 0) {
    return fail("PL-CH-012", "BLOCKED_PLANNER_ROLE_ABSORPTION_WEAKENED", detailList(failures, "missing"));
  }
  return pass("PL-CH-012", "role absorption prohibitions preserved");
}

function checkOperationalAxes() {
  const text = readMany([
    ...contractPaths,
    "skills/stnl_project_agent_specializer_dev/reference/planner_kernel/validation/GOLDEN_TESTS.md",
  ]);
  const failures = missingAlternatives(text, [
    { label: "MODE=standard", phrases: ["MODE=standard"] },
    { label: "MODE=strict", phrases: ["MODE=strict"] },
    { label: "MODE=compact", phrases: ["MODE=compact"] },
    { label: "RUN=execute", phrases: ["RUN=execute"] },
    { label: "RUN=plan", phrases: ["RUN=plan"] },
    { label: "HANDOFF_READY", phrases: ["HANDOFF_READY"] },
    { label: "compact return", phrases: ["compact return", "return compact", "return surface"] },
  ]);
  if (failures.length > 0) {
    return fail("PL-CH-013", "BLOCKED_PLANNER_OPERATIONAL_AXIS_MISSING", detailList(failures, "missing"));
  }
  return pass("PL-CH-013", "operational axes preserved");
}

function checkGuardrailsMetadataOnly() {
  const text = readMany(contractPaths);
  const failures = missingPhrases(text, [
    "stnl_frontend_quality",
    "stnl_backend_quality",
    "stnl_backend_sql_quality",
    "stnl_mobile_ios_swift_quality",
  ]);
  const missingAlt = missingAlternatives(text, [
    { label: "metadata names", phrases: ["metadata names", "names only", "by name only"] },
    { label: "do not copy guardrail content", phrases: ["must not copy guardrail content", "must not copy, summarize, edit, or replace guardrail content", "not copy guardrail content"] },
    { label: "do not treat guardrails as agents", phrases: ["treat guardrails as agents", "not treat guardrails as agents"] },
  ]);
  const allFailures = [...failures, ...missingAlt];
  if (allFailures.length > 0) {
    return fail("PL-CH-014", "BLOCKED_PLANNER_GUARDRAIL_METADATA_WEAKENED", detailList(allFailures, "missing"));
  }
  return pass("PL-CH-014", "guardrails remain metadata names only");
}

function checkValidationDocsAlignWithHarnesses() {
  const text = readMany(validationDocPaths);
  const missing = missingPhrases(text, ["check-static.mjs", "check-golden.mjs"]);
  const missingAlt = missingAlternatives(text, [
    { label: "executable harness wording", phrases: ["executable harness", "harnesses executáveis", "read-only executable"] },
    { label: "no agent runtime", phrases: ["do not execute agent runtime", "does not execute agent runtime", "não executam runtime"] },
    { label: "no materializer", phrases: ["do not implement a materializer", "does not implement a materializer", "sem materializer"] },
    { label: "no fixtures", phrases: ["do not create fixtures", "does not create fixtures", "sem fixtures"] },
    { label: "no generated reports", phrases: ["do not produce generated reports", "does not produce generated reports", "sem generated reports"] },
  ]);
  const stale = /future checks should|future golden checks should|out of scope\s+[\s\S]*runnable/i.test(text) ? ["stale future/runnable wording"] : [];
  const failures = [...missing, ...missingAlt, ...stale];
  if (failures.length > 0) {
    return fail("PL-CH-015", "BLOCKED_PLANNER_VALIDATION_DOCS_STALE", detailList(failures, "issue"));
  }
  return pass("PL-CH-015", "validation docs align with executable harnesses");
}

function checkGlobalDocsListHarnessesWithoutAutomaticPass() {
  const files = [...globalDocPaths, manifestPath];
  const failures = [];
  for (const file of files) {
    const text = readText(file);
    if (!text.includes("reference/planner_kernel/validation/check-static.mjs")) failures.push(`${file} missing check-static.mjs`);
    if (!text.includes("reference/planner_kernel/validation/check-golden.mjs")) failures.push(`${file} missing check-golden.mjs`);
  }
  const combined = readMany(files);
  if (!hasAnyPhrase(combined, ["does not grant automatic pass", "sem pass automático", "not automatic pass", "FINAL_AUDIT_REQUIRED", "human review"])) {
    failures.push("missing no-automatic-pass/human-review wording");
  }
  if (plannerLinesDeclaringExcellent(combined).length > 0) failures.push("planner excellent status declared in global docs");
  if (failures.length > 0) {
    return fail("PL-CH-016", "BLOCKED_PLANNER_GLOBAL_HARNESS_DOCS_INVALID", detailList(failures, "issue"));
  }
  return pass("PL-CH-016", "global docs list planner harnesses without automatic pass");
}

function checkReadingContract() {
  const text = readMany(contractPaths);
  const failures = missingAlternatives(text, [
    { label: "bounded-context", phrases: ["bounded-context"] },
    { label: "budget 3 local artifacts", phrases: ["at most 3 local artifacts", "up to 3 local artifacts"] },
    { label: "at most 1 live artifact", phrases: ["at most 1 of those artifacts may be live", "no more than 1 live artifact", "at most 1 live artifact"] },
    { label: "expansion by at most 2", phrases: ["up to 2 additional targeted artifacts", "at most 2 additional targeted artifacts", "expand by at most 2 targeted artifacts"] },
    { label: "no broad discovery", phrases: ["no broad discovery", "must not perform broad discovery", "stop when the cut requires broad discovery"] },
    { label: "no read-more loop", phrases: ["read more", "additional reading to avoid a DEV decision"] },
    { label: "avoid DEV decision", phrases: ["avoid a DEV decision", "DEV decision"] },
  ]);
  if (failures.length > 0) {
    return fail("PL-CH-017", "BLOCKED_PLANNER_READING_CONTRACT_WEAKENED", detailList(failures, "missing"));
  }
  return pass("PL-CH-017", "bounded reading contract preserved");
}

const checks = [
  checkRequiredFiles,
  checkSnapshotExistsAndListed,
  checkSnapshotLiteralCopy,
  checkManifestListsPlannerBundle,
  checkGlobalDocsPlannerStatus,
  checkOrchestratorFrozenStatus,
  checkSourceChainUnambiguous,
  checkNoPlanningKernelPath,
  checkNoPlannerExcellentStatus,
  checkNoUnauthorizedSurfaces,
  checkCoreInvariants,
  checkRoleAbsorptionProhibited,
  checkOperationalAxes,
  checkGuardrailsMetadataOnly,
  checkValidationDocsAlignWithHarnesses,
  checkGlobalDocsListHarnessesWithoutAutomaticPass,
  checkReadingContract,
];

let failed = false;
for (const check of checks) {
  let result;
  try {
    result = check();
  } catch (error) {
    result = fail("PL-CH-000", "BLOCKED_PLANNER_STATIC_CHECK_ERROR", error instanceof Error ? error.message : String(error));
  }

  if (result.status === "FAIL") failed = true;
  const blocker = result.blocker ? ` ${result.blocker}` : "";
  console.log(`${result.id} ${result.status}${blocker} ${result.detail}`);
}

process.exit(failed ? 1 : 0);
