#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const validationRoot = path.dirname(scriptPath);
const plannerKernelRoot = path.resolve(validationRoot, "..");
const referenceRoot = path.resolve(plannerKernelRoot, "..");
const devSkillRoot = path.resolve(referenceRoot, "..");
const repoRoot = path.resolve(devSkillRoot, "..", "..");
const realRepoRoot = fs.realpathSync.native(repoRoot);
const staticHarnessPath = path.join(validationRoot, "check-static.mjs");
const ignoredNames = new Set(["__MACOSX", ".DS_Store"]);

const goldenTestsPath = "skills/stnl_project_agent_specializer_dev/reference/planner_kernel/validation/GOLDEN_TESTS.md";
const snapshotPath = "skills/stnl_project_agent_specializer_dev/reference/agents/planner.agent.md";
const contractPaths = [
  "skills/stnl_project_agent_specializer_dev/reference/planner_kernel/contracts/CONTRACT.md",
  "skills/stnl_project_agent_specializer_dev/reference/planner_kernel/contracts/BEHAVIOR_PARITY_SPINE.md",
  "skills/stnl_project_agent_specializer_dev/reference/planner_kernel/contracts/MINIMUM_SAFE_BUNDLE.md",
];

const goldenTests = [
  {
    id: "PL-GT-001",
    title: "Simple bounded request produces READY",
    blocker: "BLOCKED_PLANNER_READY_BRIEF_MISSING_OR_INVALID",
    doc: ["clear scope", "stable source of truth", "READY", "ephemeral `EXECUTION BRIEF`", "returns to orchestrator"],
    snapshot: ["STATUS: READY", "EXECUTION BRIEF", "ephemeral current-round handoff", "out-of-scope", "source of truth", "dependencies", "risks", "validation-aware", "guardrails"],
    contract: ["READY", "EXECUTION BRIEF", "ephemeral current-round handoff", "smallest honest in-scope cut", "explicit out-of-scope boundary", "source of truth", "dependencies and blockers", "validation-aware notes", "return to orchestrator"],
  },
  {
    id: "PL-GT-002",
    title: "Product ambiguity blocks",
    blocker: "BLOCKED_PLANNER_PRODUCT_AMBIGUITY_INFERRED",
    doc: ["product", "user-flow", "public-contract", "payload", "NEEDS_DEV_DECISION_BASE", "smallest concrete question"],
    snapshot: ["NEEDS_DEV_DECISION_BASE", "product behavior", "user flow", "public contract", "payload", "required or optional fields", "ask the smallest concrete question"],
    contract: ["NEEDS_DEV_DECISION_BASE", "product", "permission", "payload", "business-rule", "missing decision or fact", "minimum question or source needed to unblock"],
  },
  {
    id: "PL-GT-003",
    title: "Broad request is cut honestly or blocked",
    blocker: "BLOCKED_PLANNER_BROAD_REQUEST_NOT_HONESTLY_CUT",
    doc: ["broad outcome", "smallest honest validatable cut", "excludes adjacent or future work", "NEEDS_DEV_DECISION_BASE"],
    snapshot: ["smallest validatable cut", "explicitly out of scope", "broad outcome", "narrowest honest boundary", "stop and escalate"],
    contract: ["smallest honest in-scope cut", "explicit out-of-scope boundary", "request cannot be reduced to a small and truthful cut", "broad discovery", "NEEDS_DEV_DECISION_BASE"],
  },
  {
    id: "PL-GT-004",
    title: "Docs/code conflict blocks when it affects intent",
    blocker: "BLOCKED_PLANNER_SOURCE_CONFLICT_HIDDEN",
    doc: ["canonical documentation", "specific live artifact", "NEEDS_DEV_DECISION_BASE", "active source of truth"],
    snapshot: ["canonical docs and live code disagree", "source of truth", "conflict between SPEC, docs, and code", "NEEDS_DEV_DECISION_BASE"],
    contract: ["live code and canonical docs conflict", "source-of-truth conflict", "source-of-truth fact", "NEEDS_DEV_DECISION_BASE"],
  },
  {
    id: "PL-GT-005",
    title: "Real UX/UI impact signals designer",
    blocker: "BLOCKED_PLANNER_DESIGNER_SIGNAL_MISSING",
    doc: ["UX", "UI", "accessibility", "designer-involvement signal", "does not replace `designer`"],
    snapshot: ["UX, interaction, accessibility, or visual signals", "designer.agent.md", "should be involved", "does not replace the designer"],
    contract: ["UX", "UI", "accessibility", "responsiveness", "visual consistency", "designer", "does not replace `designer`"],
  },
  {
    id: "PL-GT-006",
    title: "Multi-surface cut does not become work package",
    blocker: "BLOCKED_PLANNER_ABSORBED_EXECUTION_PACKAGE",
    doc: ["multiple surfaces", "high-level sequencing", "WORK_PACKAGE_ID", "OWNED_PATHS", "returns to orchestrator"],
    snapshot: ["multiple execution owners", "high-level package-shaping notes", "WORK_PACKAGE_ID", "OWNED_PATHS", "RUN_COMMANDS", "ACCEPTANCE_CHECKS", "BLOCK_IF"],
    contract: ["high-level sequencing", "EXECUTION PACKAGE", "WORK_PACKAGE_ID", "OWNED_PATHS", "DO_NOT_TOUCH", "RUN_COMMANDS", "ACCEPTANCE_CHECKS", "BLOCK_IF"],
  },
  {
    id: "PL-GT-007",
    title: "MODE=compact preserves required planning content",
    blocker: "BLOCKED_PLANNER_COMPACT_REMOVED_SAFETY",
    doc: ["MODE=compact", "scope", "out-of-scope", "source of truth", "blockers", "risks", "validation-aware notes"],
    snapshot: ["MODE=compact", "shorter `EXECUTION BRIEF` only when safe", "preserve scope", "risks", "blockers", "required decisions", "do not turn ambiguity into assumption"],
    contract: ["MODE=compact", "format compaction only", "not safety compaction", "risks", "blockers", "scope", "guardrails"],
  },
  {
    id: "PL-GT-008",
    title: "RUN=plan does not approve execution",
    blocker: "BLOCKED_PLANNER_RUN_PLAN_APPROVED_EXECUTION",
    doc: ["RUN=plan", "planning-only", "implementation has been approved", "routes to coders"],
    snapshot: ["RUN=plan", "plan only", "do not write as if implementation has been approved or released", "ready_to_execute"],
    contract: ["RUN=plan", "planning-only", "ready_to_execute", "without implying implementation approval", "not execution approval"],
  },
  {
    id: "PL-GT-009",
    title: "Uncertain validation does not become speculative proof",
    blocker: "BLOCKED_PLANNER_SPECULATIVE_VALIDATION_DESIGN",
    doc: ["validation feasibility", "validation-aware notes", "VALIDATION PACK", "proof verdicts", "acceptance checks"],
    snapshot: ["validation feasibility", "validation-aware notes", "do not absorb proof design", "VALIDATION PACK", "proof designer"],
    contract: ["validation feasibility", "validation-aware notes", "does not create `VALIDATION PACK`", "design the proof", "claim validation sufficiency"],
  },
  {
    id: "PL-GT-010",
    title: "Durable brief-file request fails",
    blocker: "BLOCKED_PLANNER_DURABLE_BRIEF_ARTIFACT_CREATED",
    doc: ["PLAN.md", "execution_brief.md", "durable planning file", "ephemeral current-round handoff"],
    snapshot: ["PLAN.md", "execution_brief.md", "durable documentation", "ephemeral", "does not write it to the workspace"],
    contract: ["PLAN.md", "execution_brief.md", "durable documentation", "ephemeral current-round handoff", "workspace file"],
  },
  {
    id: "PL-GT-011",
    title: "MODE=strict blocks earlier without changing role",
    blocker: "BLOCKED_PLANNER_STRICT_INFERENCE_RELAXED",
    doc: ["MODE=strict", "lower-inference planning", "NEEDS_DEV_DECISION_BASE", "bounded-context"],
    snapshot: ["MODE=strict", "reduce inference", "block earlier on material ambiguity", "bounded-context", "NEEDS_DEV_DECISION_BASE"],
    contract: ["MODE=strict", "reduces inference", "blocks earlier on material ambiguity", "bounded-context", "NEEDS_DEV_DECISION_BASE"],
  },
  {
    id: "PL-GT-012",
    title: "MODE=standard keeps the safety floor",
    blocker: "BLOCKED_PLANNER_STANDARD_SAFETY_FLOOR_LOST",
    doc: ["MODE=standard", "READY", "ephemeral `EXECUTION BRIEF`", "NEEDS_DEV_DECISION_BASE", "bounded reading"],
    snapshot: ["MODE=standard", "current planning behavior", "READY", "NEEDS_DEV_DECISION_BASE", "bounded-context"],
    contract: ["MODE=standard", "current planning behavior", "READY", "NEEDS_DEV_DECISION_BASE", "bounded-context"],
  },
  {
    id: "PL-GT-013",
    title: "RUN=execute does not emit execution package fields",
    blocker: "BLOCKED_PLANNER_RUN_EXECUTE_ABSORBED_PACKAGE",
    doc: ["RUN=execute", "READY", "returns to orchestrator", "EXECUTION PACKAGE", "WORK_PACKAGE_ID"],
    snapshot: ["RUN=execute", "READY", "orchestrator", "EXECUTION PACKAGE", "WORK_PACKAGE_ID", "OWNED_PATHS", "RUN_COMMANDS", "ACCEPTANCE_CHECKS"],
    contract: ["RUN=execute", "READY", "orchestrator", "EXECUTION PACKAGE", "WORK_PACKAGE_ID", "OWNED_PATHS", "RUN_COMMANDS", "ACCEPTANCE_CHECKS"],
  },
  {
    id: "PL-GT-014",
    title: "HANDOFF_READY is not a parallel gate",
    blocker: "BLOCKED_PLANNER_HANDOFF_READY_PARALLEL_GATE",
    doc: ["HANDOFF_READY", "STATUS: READY", "additional status", "skip orchestrator validation"],
    snapshot: ["HANDOFF_READY", "not a substitute", "parallel gate", "STATUS: READY", "orchestrator validates"],
    contract: ["HANDOFF_READY", "not a planner status", "parallel gate", "STATUS: READY", "returned to the orchestrator"],
  },
  {
    id: "PL-GT-015",
    title: "Compact return does not republish brief or narrate operation",
    blocker: "BLOCKED_PLANNER_COMPACT_RETURN_REPUBLISHED_BRIEF",
    doc: ["Compact Agent Return Contract", "full `EXECUTION BRIEF`", "narrate", "decision-useful", "scope", "blockers", "risks", "guardrails", "validation"],
    snapshot: ["Compact Agent Return Contract", "Do not narrate operating steps", "Do not paste the full brief into the main chat", "return compact handoff status plus at most 3 bullets", "decision-useful", "Do not narrate reading, searching, inspection, progress, or tool usage", "do not republish the full `EXECUTION BRIEF`"],
    contract: ["compact return", "not republish", "full `EXECUTION BRIEF`", "main chat", "decision-useful", "must not narrate", "scope", "blockers", "risks", "guardrails", "validation-aware notes"],
  },
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

function realPathInsideRepo(absolutePath) {
  const realPath = fs.realpathSync.native(absolutePath);
  if (!isInside(realPath, realRepoRoot)) {
    throw new Error(`path escapes repo after realpath: ${absolutePath}`);
  }
  return realPath;
}

function readText(relativePath) {
  if (hasIgnoredPart(relativePath)) return "";
  const absolutePath = path.resolve(repoRoot, relativePath);
  if (!isInside(absolutePath, repoRoot)) {
    throw new Error(`path escapes repo: ${relativePath}`);
  }
  return fs.readFileSync(realPathInsideRepo(absolutePath), "utf8");
}

function normalize(text) {
  return text.replace(/\s+/g, " ").trim().toLowerCase();
}

function hasPhrase(text, phrase) {
  return normalize(text).includes(normalize(phrase));
}

function missingPhrases(text, phrases) {
  return phrases.filter((phrase) => !hasPhrase(text, phrase));
}

function detailList(items, prefix) {
  return `${prefix}: ${items.slice(0, 6).join(", ")}${items.length > 6 ? ", ..." : ""}`;
}

function pass(id, detail = "contract present") {
  return { id, status: "PASS", detail };
}

function fail(id, blocker, detail) {
  return { id, status: "FAIL", blocker, detail };
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function sectionFromH2(markdown, id) {
  const pattern = new RegExp(`^## Golden Test ${escapeRegExp(id)}\\b.*$`, "m");
  const match = pattern.exec(markdown);
  if (!match) return "";
  const start = match.index;
  const rest = markdown.slice(start);
  const next = rest.slice(match[0].length).search(/^##\s+/m);
  return next === -1 ? rest : rest.slice(0, match[0].length + next);
}

function runStaticPrecondition() {
  try {
    if (!isInside(staticHarnessPath, repoRoot)) {
      throw new Error("check-static.mjs escapes repo");
    }
    const result = spawnSync(process.execPath, [realPathInsideRepo(staticHarnessPath)], {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: "pipe",
    });
    if (result.error) throw result.error;
    if (result.status !== 0) {
      const firstFailure = `${result.stdout || ""}\n${result.stderr || ""}`
        .split(/\r?\n/)
        .find((line) => /\bFAIL\b/.test(line));
      return fail("PL-GT-000", "BLOCKED_PLANNER_STATIC_PRECONDITION_FAILED", firstFailure || `check-static.mjs exited ${result.status ?? "unknown"}`);
    }
  } catch (error) {
    return fail("PL-GT-000", "BLOCKED_PLANNER_STATIC_PRECONDITION_FAILED", error instanceof Error ? error.message : String(error));
  }
  return pass("PL-GT-000", "check-static.mjs passed");
}

function checkGolden(test, goldenDoc, snapshot, contracts) {
  const section = sectionFromH2(goldenDoc, test.id);
  if (!section) return fail(test.id, test.blocker, `missing ${test.id} section`);

  const heading = section.split(/\r?\n/, 1)[0] || "";
  const failures = [];
  if (!heading.includes(test.title)) failures.push(`title mismatch, expected "${test.title}"`);
  if (!section.includes(test.blocker)) failures.push(`missing expected blocker ${test.blocker}`);
  failures.push(...missingPhrases(section, test.doc).map((phrase) => `golden doc missing ${phrase}`));
  failures.push(...missingPhrases(snapshot, test.snapshot).map((phrase) => `snapshot missing ${phrase}`));
  failures.push(...missingPhrases(contracts, test.contract).map((phrase) => `contracts missing ${phrase}`));

  if (failures.length > 0) {
    return fail(test.id, test.blocker, detailList(failures, "issue"));
  }
  return pass(test.id, `${test.title} covered by golden doc, snapshot, and contracts`);
}

const results = [runStaticPrecondition()];
let failed = results.some((result) => result.status === "FAIL");

if (!failed) {
  const goldenDoc = readText(goldenTestsPath);
  const snapshot = readText(snapshotPath);
  const contracts = contractPaths.map((file) => `\n--- ${file} ---\n${readText(file)}`).join("\n");

  for (const test of goldenTests) {
    results.push(checkGolden(test, goldenDoc, snapshot, contracts));
  }
}

for (const result of results) {
  const blocker = result.blocker ? ` ${result.blocker}` : "";
  console.log(`${result.id} ${result.status}${blocker} ${result.detail}`);
}

process.exit(failed || results.some((result) => result.status === "FAIL") ? 1 : 0);
