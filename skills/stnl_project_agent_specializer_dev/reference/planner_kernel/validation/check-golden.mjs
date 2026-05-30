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

const dangerousTerms = [
  "VALIDATION PACK",
  "EXECUTION PACKAGE",
  "WORK_PACKAGE_ID",
  "OWNED_PATHS",
  "DO_NOT_TOUCH",
  "RUN_COMMANDS",
  "ACCEPTANCE_CHECKS",
  "BLOCK_IF",
  "PLAN.md",
  "execution_brief.md",
];

const safePolarityTerms = [
  "must not",
  "does not",
  "do not",
  "not allowed",
  "prohibit",
  "prohibited",
  "fail when",
  "must fail",
  "does not emit",
  "does not create",
  "does not define",
  "must not create",
  "must not define",
  "must not emit",
  "not create",
  "not define",
  "not planner-owned",
  "not a planner",
  "not become",
  "not compile",
  "later owns",
  "downstream owns",
  "belongs to",
  "without defining",
  "out of scope",
  "no axis may authorize",
];

const forbiddenPolarityTerms = [
  "may emit",
  "can emit",
  "allowed to emit",
  "may create",
  "can create",
  "allowed to create",
  "may define",
  "can define",
  "allowed to define",
  "planner owns",
  "planner defines",
  "planner produces",
  "planner authorizes",
  "planner approves",
  "routes directly",
  "approves execution",
];

const goldenTests = [
  {
    id: "PL-GT-001",
    title: "Simple bounded request produces READY",
    blocker: "BLOCKED_PLANNER_READY_BRIEF_MISSING_OR_INVALID",
    doc: ["clear scope", "stable source of truth", "READY", "ephemeral `EXECUTION BRIEF`", "source of truth", "risks", "validation-aware notes", "guardrail names", "returns to orchestrator"],
    snapshot: ["STATUS: READY", "EXECUTION BRIEF", "ephemeral current-round handoff", "source of truth", "dependencies", "risks", "validation-aware", "guardrails"],
    contracts: ["READY", "EXECUTION BRIEF", "ephemeral current-round handoff", "smallest honest in-scope cut", "explicit out-of-scope boundary", "source of truth", "dependencies and blockers", "validation-aware notes", "return to orchestrator"],
  },
  {
    id: "PL-GT-002",
    title: "Product ambiguity blocks",
    blocker: "BLOCKED_PLANNER_PRODUCT_AMBIGUITY_INFERRED",
    doc: ["product", "user-flow", "public-contract", "payload", "NEEDS_DEV_DECISION_BASE", "smallest concrete question"],
    snapshot: ["NEEDS_DEV_DECISION_BASE", "product behavior", "user flow", "public contract", "payload", "required or optional fields", "ask the smallest concrete question"],
    contracts: ["NEEDS_DEV_DECISION_BASE", "product", "permission", "payload", "business-rule", "missing decision or fact", "minimum question or source needed to unblock"],
  },
  {
    id: "PL-GT-003",
    title: "Broad request is cut honestly or blocked",
    blocker: "BLOCKED_PLANNER_BROAD_REQUEST_NOT_HONESTLY_CUT",
    doc: ["broad outcome", "smallest honest validatable cut", "excludes adjacent or future work", "NEEDS_DEV_DECISION_BASE"],
    snapshot: ["smallest validatable cut", "explicitly out of scope", "broad outcome", "narrowest honest boundary", "stop and escalate"],
    contracts: ["smallest honest in-scope cut", "explicit out-of-scope boundary", "request cannot be reduced to a small and truthful cut", "broad discovery", "NEEDS_DEV_DECISION_BASE"],
  },
  {
    id: "PL-GT-004",
    title: "Docs/code conflict blocks when it affects intent",
    blocker: "BLOCKED_PLANNER_SOURCE_CONFLICT_HIDDEN",
    doc: ["canonical documentation", "specific live artifact", "NEEDS_DEV_DECISION_BASE", "active source of truth"],
    snapshot: ["canonical docs and live code disagree", "source of truth", "conflict between SPEC, docs, and code", "NEEDS_DEV_DECISION_BASE"],
    contracts: ["live code and canonical docs conflict", "source-of-truth conflict", "source-of-truth fact", "NEEDS_DEV_DECISION_BASE"],
  },
  {
    id: "PL-GT-005",
    title: "Real UX/UI impact signals designer",
    blocker: "BLOCKED_PLANNER_DESIGNER_SIGNAL_MISSING",
    doc: ["UX", "UI", "accessibility", "designer-involvement signal", "does not replace `designer`"],
    snapshot: ["UX, interaction, accessibility, or visual signals", "designer.agent.md", "should be involved", "does not replace the designer"],
    contracts: ["UX", "UI", "accessibility", "responsiveness", "visual consistency", "designer", "does not replace `designer`"],
  },
  {
    id: "PL-GT-006",
    title: "Multi-surface cut does not become work package",
    blocker: "BLOCKED_PLANNER_ABSORBED_EXECUTION_PACKAGE",
    doc: ["multiple surfaces", "high-level sequencing", "WORK_PACKAGE_ID", "OWNED_PATHS", "returns to orchestrator"],
    snapshot: ["multiple execution owners", "high-level package-shaping notes", "WORK_PACKAGE_ID", "OWNED_PATHS", "RUN_COMMANDS", "ACCEPTANCE_CHECKS", "BLOCK_IF"],
    contracts: ["high-level sequencing", "EXECUTION PACKAGE", "WORK_PACKAGE_ID", "OWNED_PATHS", "DO_NOT_TOUCH", "RUN_COMMANDS", "ACCEPTANCE_CHECKS", "BLOCK_IF"],
    dangerous: ["EXECUTION PACKAGE", "WORK_PACKAGE_ID", "OWNED_PATHS", "DO_NOT_TOUCH", "RUN_COMMANDS", "ACCEPTANCE_CHECKS", "BLOCK_IF"],
  },
  {
    id: "PL-GT-007",
    title: "MODE=compact preserves required planning content",
    blocker: "BLOCKED_PLANNER_COMPACT_REMOVED_SAFETY",
    doc: ["MODE=compact", "scope", "out-of-scope", "source of truth", "blockers", "risks", "validation-aware notes"],
    snapshot: ["MODE=compact", "shorter `EXECUTION BRIEF` only when safe", "preserve scope", "risks", "blockers", "required decisions", "do not turn ambiguity into assumption"],
    contracts: ["MODE=compact", "format compaction only", "not safety compaction", "risks", "blockers", "scope", "guardrails"],
  },
  {
    id: "PL-GT-008",
    title: "RUN=plan does not approve execution",
    blocker: "BLOCKED_PLANNER_RUN_PLAN_APPROVED_EXECUTION",
    doc: ["RUN=plan", "planning-only", "implementation has been approved", "routes to coders"],
    snapshot: ["RUN=plan", "plan only", "do not write as if implementation has been approved or released", "ready_to_execute"],
    contracts: ["RUN=plan", "planning-only", "ready_to_execute", "without implying implementation approval", "not execution approval"],
  },
  {
    id: "PL-GT-009",
    title: "Uncertain validation does not become speculative proof",
    blocker: "BLOCKED_PLANNER_SPECULATIVE_VALIDATION_DESIGN",
    doc: ["validation feasibility", "validation-aware notes", "VALIDATION PACK", "proof verdicts", "acceptance checks"],
    snapshot: ["validation feasibility", "validation-aware notes", "do not absorb proof design", "VALIDATION PACK", "proof designer"],
    contracts: ["validation feasibility", "validation-aware notes", "does not create `VALIDATION PACK`", "design the proof", "claim validation sufficiency"],
    dangerous: ["VALIDATION PACK", "ACCEPTANCE_CHECKS"],
  },
  {
    id: "PL-GT-010",
    title: "Durable brief-file request fails",
    blocker: "BLOCKED_PLANNER_DURABLE_BRIEF_ARTIFACT_CREATED",
    doc: ["PLAN.md", "execution_brief.md", "durable planning file", "ephemeral current-round handoff"],
    snapshot: ["PLAN.md", "execution_brief.md", "durable documentation", "ephemeral", "does not write it to the workspace"],
    contracts: ["PLAN.md", "execution_brief.md", "durable documentation", "ephemeral current-round handoff", "workspace file"],
    dangerous: ["PLAN.md", "execution_brief.md"],
  },
  {
    id: "PL-GT-011",
    title: "MODE=strict blocks earlier without changing role",
    blocker: "BLOCKED_PLANNER_STRICT_INFERENCE_RELAXED",
    doc: ["MODE=strict", "lower-inference planning", "NEEDS_DEV_DECISION_BASE", "bounded-context"],
    snapshot: ["MODE=strict", "reduce inference", "block earlier on material ambiguity", "bounded-context", "NEEDS_DEV_DECISION_BASE"],
    contracts: ["MODE=strict", "reduces inference", "blocks earlier on material ambiguity", "bounded-context", "NEEDS_DEV_DECISION_BASE"],
  },
  {
    id: "PL-GT-012",
    title: "MODE=standard keeps the safety floor",
    blocker: "BLOCKED_PLANNER_STANDARD_SAFETY_FLOOR_LOST",
    doc: ["MODE=standard", "READY", "ephemeral `EXECUTION BRIEF`", "NEEDS_DEV_DECISION_BASE", "bounded reading"],
    snapshot: ["MODE=standard", "current planning behavior", "READY", "NEEDS_DEV_DECISION_BASE", "bounded-context"],
    contracts: ["MODE=standard", "current planning behavior", "READY", "NEEDS_DEV_DECISION_BASE", "bounded-context"],
  },
  {
    id: "PL-GT-013",
    title: "RUN=execute does not emit execution package fields",
    blocker: "BLOCKED_PLANNER_RUN_EXECUTE_ABSORBED_PACKAGE",
    doc: ["RUN=execute", "READY", "returns to orchestrator", "EXECUTION PACKAGE", "WORK_PACKAGE_ID"],
    snapshot: ["RUN=execute", "READY", "orchestrator", "EXECUTION PACKAGE", "WORK_PACKAGE_ID", "OWNED_PATHS", "RUN_COMMANDS", "ACCEPTANCE_CHECKS"],
    contracts: ["RUN=execute", "orchestrator", "EXECUTION PACKAGE", "WORK_PACKAGE_ID", "OWNED_PATHS", "RUN_COMMANDS", "ACCEPTANCE_CHECKS"],
    dangerous: ["EXECUTION PACKAGE", "WORK_PACKAGE_ID", "OWNED_PATHS", "DO_NOT_TOUCH", "RUN_COMMANDS", "ACCEPTANCE_CHECKS", "BLOCK_IF"],
  },
  {
    id: "PL-GT-014",
    title: "HANDOFF_READY is not a parallel gate",
    blocker: "BLOCKED_PLANNER_HANDOFF_READY_PARALLEL_GATE",
    doc: ["HANDOFF_READY", "STATUS: READY", "additional status", "skip orchestrator validation"],
    snapshot: ["HANDOFF_READY", "not a substitute", "parallel gate", "STATUS: READY", "orchestrator validates"],
    contracts: ["HANDOFF_READY", "not a planner status", "parallel gate", "STATUS: READY", "returned to the orchestrator"],
  },
  {
    id: "PL-GT-015",
    title: "Compact return does not republish brief or narrate operation",
    blocker: "BLOCKED_PLANNER_COMPACT_RETURN_REPUBLISHED_BRIEF",
    doc: ["Compact Agent Return Contract", "full `EXECUTION BRIEF`", "narrate", "decision-useful", "scope", "blockers", "risks", "guardrails", "validation"],
    snapshot: ["Compact Agent Return Contract", "Do not narrate operating steps", "Do not paste the full brief into the main chat", "return compact handoff status plus at most 3 bullets", "decision-useful"],
    contracts: ["compact return", "not republish", "full `EXECUTION BRIEF`", "main chat", "decision-useful", "must not narrate", "scope", "blockers", "risks", "guardrails", "validation-aware notes"],
  },
  {
    id: "PL-GT-016",
    title: "Header-aware reading does not authorize execution",
    blocker: "BLOCKED_PLANNER_HEADER_READING_AUTHORIZED_EXECUTION",
    doc: ["File Purpose Header", "spec_slices", "Planning Interface", "execution authorization", "acceptance", "blockers"],
    snapshot: ["File Purpose Header", "read_when", "canonical_source_for", "spec_slices.md", "Planning Interface", "never as an executable plan or execution authorization", "Do not infer an execution plan"],
    contracts: ["File Purpose Header", "read_when", "canonical_source_for", "spec_slices", "Planning Interface", "must not infer execution", "execution authorization"],
  },
  {
    id: "PL-GT-017",
    title: "Source-of-truth hierarchy preserves DEV/orchestrator framing",
    blocker: "BLOCKED_PLANNER_SOURCE_HIERARCHY_INVERTED",
    doc: ["DEV/orchestrator framing first", "canonical owner docs", "live implementation", "external dependency docs", "preference"],
    snapshot: ["Source of truth hierarchy", "resolved DEV and orchestrator framing first", "canonical owner docs and project context second", "specific live implementation", "external dependency docs fourth"],
    contracts: ["Source-of-truth hierarchy", "DEV and orchestrator framing first", "canonical owner docs and project context second", "specific live implementation", "external dependency docs fourth", "not choose docs or code by preference"],
  },
  {
    id: "PL-GT-018",
    title: "Untrusted local sources are not Sentinel source of truth",
    blocker: "BLOCKED_PLANNER_UNTRUSTED_LOCAL_SOURCE_USED",
    doc: ["scratchpads", "runtime temp files", "workspaceStorage", "chat-session-resources", "content.txt", "source of truth"],
    snapshot: ["bounded-context", "Read only the minimum canon", "Source of truth hierarchy", "Do not scan broadly unless"],
    contracts: ["scratchpads", "runtime temp files", "workspaceStorage", "chat-session-resources", "content.txt", "not Sentinel source of truth"],
  },
  {
    id: "PL-GT-019",
    title: "Broad discovery/read-more loop blocks instead of expanding",
    blocker: "BLOCKED_PLANNER_BROAD_DISCOVERY_USED_TO_AVOID_DECISION",
    doc: ["broad discovery", "read-more loop", "NEEDS_DEV_DECISION_BASE", "bounded-context"],
    snapshot: ["Do not scan broadly unless", "If the cut still does not stabilize", "stop and escalate", "NEEDS_DEV_DECISION_BASE"],
    contracts: ["broad discovery", "read more", "additional reading to avoid a DEV decision", "NEEDS_DEV_DECISION_BASE", "bounded-context"],
  },
  {
    id: "PL-GT-020",
    title: "Compact return keeps safety while avoiding operation narration",
    blocker: "BLOCKED_PLANNER_COMPACT_RETURN_SAFETY_OR_ANTI_NARRATION_LOST",
    doc: ["compact return", "not narrate", "tool usage", "scope", "blockers", "risks", "source", "guardrails", "validation notes"],
    snapshot: ["Compact Agent Return Contract", "Do not narrate operating steps", "Do not paste the full brief into the main chat", "scope", "blockers", "risks", "source of truth", "guardrails"],
    contracts: ["compact return", "must not narrate", "tool usage", "scope", "blockers", "risks", "source-of-truth", "guardrail", "validation-aware notes"],
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
  return String(text).replace(/\s+/g, " ").trim().toLowerCase();
}

function hasPhrase(text, phrase) {
  return normalize(text).includes(normalize(phrase));
}

function groupLabel(group) {
  if (typeof group === "string") return group;
  if (Array.isArray(group)) return group.join(" | ");
  return group.label;
}

function groupPhrases(group) {
  if (typeof group === "string") return [group];
  if (Array.isArray(group)) return group;
  return group.phrases;
}

function mustContain(sectionText, phraseGroups) {
  return phraseGroups
    .filter((group) => !groupPhrases(group).some((phrase) => hasPhrase(sectionText, phrase)))
    .map((group) => groupLabel(group));
}

function mustContainAny(sectionText, phraseGroups) {
  const found = phraseGroups.some((group) => groupPhrases(group).some((phrase) => hasPhrase(sectionText, phrase)));
  return found ? [] : [`one of: ${phraseGroups.map((group) => groupLabel(group)).join(" / ")}`];
}

function mustNotContain(sectionText, forbidden) {
  return forbidden.filter((phrase) => hasPhrase(sectionText, phrase));
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function markdownHeadings(markdown) {
  const pattern = /^(#{1,6})\s+(.+?)\s*$/gm;
  const headings = [];
  let match;
  while ((match = pattern.exec(markdown)) !== null) {
    headings.push({
      index: match.index,
      level: match[1].length,
      text: match[2].trim(),
    });
  }
  return headings;
}

function headingMatches(text, matcher) {
  const cleanText = normalize(text);
  if (matcher instanceof RegExp) {
    matcher.lastIndex = 0;
    return matcher.test(text) || matcher.test(cleanText);
  }
  const cleanMatcher = normalize(matcher);
  return cleanText === cleanMatcher || cleanText.startsWith(`${cleanMatcher} `);
}

function section(markdown, headingOrPattern) {
  const headings = markdownHeadings(markdown);
  for (let index = 0; index < headings.length; index += 1) {
    const current = headings[index];
    if (!headingMatches(current.text, headingOrPattern)) continue;
    const next = headings.slice(index + 1).find((heading) => heading.level <= current.level);
    const end = next ? next.index : markdown.length;
    return markdown.slice(current.index, end);
  }
  return "";
}

function sections(markdown, headingPattern) {
  const headings = markdownHeadings(markdown);
  const found = [];
  for (let index = 0; index < headings.length; index += 1) {
    const current = headings[index];
    if (!headingMatches(current.text, headingPattern)) continue;
    const next = headings.slice(index + 1).find((heading) => heading.level <= current.level);
    const end = next ? next.index : markdown.length;
    found.push(markdown.slice(current.index, end));
  }
  return found;
}

function mustContainHeading(sectionText, heading) {
  const pattern = new RegExp(`^#{1,6}\\s+${escapeRegExp(heading)}\\s*$`, "mi");
  return pattern.test(sectionText) ? [] : [`heading ${heading}`];
}

function extractGoldenTest(markdown, id) {
  return section(markdown, new RegExp(`^Golden Test ${escapeRegExp(id)}\\b`, "i"));
}

function findOccurrences(text, target) {
  const lower = String(text).toLowerCase();
  const needle = String(target).toLowerCase();
  const offsets = [];
  let index = lower.indexOf(needle);
  while (index !== -1) {
    offsets.push(index);
    index = lower.indexOf(needle, index + needle.length);
  }
  return offsets;
}

function windowAround(text, index, target, window) {
  const start = Math.max(0, index - window);
  const end = Math.min(text.length, index + String(target).length + window);
  return text.slice(start, end);
}

function phraseInRaw(text, phrase) {
  return String(text).toLowerCase().includes(String(phrase).toLowerCase());
}

function mustAppearNear(sectionText, target, requiredPolarityTerms, window = 240) {
  const occurrences = findOccurrences(sectionText, target);
  if (occurrences.length === 0) return [`${target} missing`];
  const missing = occurrences.filter((index) => {
    const near = windowAround(sectionText, index, target, window);
    return !requiredPolarityTerms.some((term) => phraseInRaw(near, term));
  });
  return missing.length > 0 ? [`${target} not near required polarity`] : [];
}

function mustNotAppearNear(sectionText, target, forbiddenPolarityTerms, window = 240) {
  const failures = [];
  for (const index of findOccurrences(sectionText, target)) {
    const near = windowAround(sectionText, index, target, window);
    for (const term of forbiddenPolarityTerms) {
      if (phraseInRaw(near, term)) failures.push(`${target} near ${term}`);
    }
  }
  return failures;
}

function validateGoldenShape(sectionText, expectedBlocker) {
  const failures = [];
  failures.push(...mustContainHeading(sectionText, "Objective"));
  failures.push(...mustContainHeading(sectionText, "Input shape"));
  failures.push(...mustContainHeading(sectionText, "Expected behavior"));
  failures.push(...mustContainHeading(sectionText, "Fail condition"));
  if (!hasPhrase(sectionText, "Expected blocker:")) failures.push("Expected blocker field");
  if (!hasPhrase(sectionText, expectedBlocker)) failures.push(`Expected blocker ${expectedBlocker}`);
  return failures;
}

function validateProhibitionContext(sectionText, terms, safePolarity, forbiddenPolarity, window = 900) {
  const failures = [];
  for (const term of terms) {
    for (const index of findOccurrences(sectionText, term)) {
      const near = windowAround(sectionText, index, term, window);
      const hasSafe = safePolarity.some((safe) => phraseInRaw(near, safe));
      const forbidden = forbiddenPolarity.filter((bad) => phraseInRaw(near, bad));
      if (forbidden.length > 0 && !hasSafe) failures.push(`${term} near permissive polarity ${forbidden[0]}`);
      if (!hasSafe) failures.push(`${term} lacks safe/downstream polarity`);
    }
  }
  return [...new Set(failures)];
}

function validateAllowedOnlyAsMetadata(sectionText, guardrailNames) {
  const failures = mustContain(sectionText, guardrailNames);
  failures.push(...mustContain(sectionText, ["metadata", { label: "names only", phrases: ["names only", "guardrail names", "by name only"] }]));
  return [...new Set(failures)];
}

function validatePathAbsence(root, pattern) {
  const absoluteRoot = path.resolve(repoRoot, root);
  if (!isInside(absoluteRoot, repoRoot)) throw new Error(`path escapes repo: ${root}`);
  const realRoot = realPathInsideRepo(absoluteRoot);
  const offenders = [];
  function visit(absolutePath) {
    for (const dirent of fs.readdirSync(absolutePath, { withFileTypes: true })) {
      if (ignoredNames.has(dirent.name)) continue;
      const child = realPathInsideRepo(path.join(absolutePath, dirent.name));
      const relative = path.relative(repoRoot, child).replaceAll(path.sep, "/");
      if (pattern.test(relative)) offenders.push(relative);
      if (dirent.isDirectory()) visit(child);
    }
  }
  visit(realRoot);
  return offenders;
}

function validateNoUnexpectedFiles(root, allowlist) {
  const absoluteRoot = path.resolve(repoRoot, root);
  if (!isInside(absoluteRoot, repoRoot)) throw new Error(`path escapes repo: ${root}`);
  const realRoot = realPathInsideRepo(absoluteRoot);
  const unexpected = [];
  function visit(absolutePath) {
    for (const dirent of fs.readdirSync(absolutePath, { withFileTypes: true })) {
      if (ignoredNames.has(dirent.name)) continue;
      const child = realPathInsideRepo(path.join(absolutePath, dirent.name));
      if (dirent.isDirectory()) {
        visit(child);
      } else {
        const local = path.relative(realRoot, child).replaceAll(path.sep, "/");
        if (!allowlist.has(local)) unexpected.push(local);
      }
    }
  }
  visit(realRoot);
  return unexpected;
}

function detailList(items, prefix) {
  const unique = [...new Set(items)];
  return `${prefix}: ${unique.slice(0, 8).join(", ")}${unique.length > 8 ? ", ..." : ""}`;
}

function pass(id, detail = "contract present") {
  return { id, status: "PASS", detail };
}

function fail(id, blocker, detail) {
  return { id, status: "FAIL", blocker, detail };
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
  const found = extractGoldenTest(goldenDoc, test.id);
  if (!found) return fail(test.id, test.blocker, `missing ${test.id} section`);

  const heading = found.split(/\r?\n/, 1)[0] || "";
  const failures = [];
  if (!heading.includes(test.title)) failures.push(`title mismatch, expected "${test.title}"`);
  failures.push(...validateGoldenShape(found, test.blocker));
  failures.push(...mustContain(found, test.doc).map((phrase) => `golden doc missing ${phrase}`));
  failures.push(...mustContain(snapshot, test.snapshot).map((phrase) => `snapshot missing ${phrase}`));
  failures.push(...mustContain(contracts, test.contracts).map((phrase) => `contracts missing ${phrase}`));

  if (test.dangerous) {
    const terms = test.dangerous.filter((term) => dangerousTerms.includes(term));
    failures.push(...validateProhibitionContext(found, terms, safePolarityTerms, forbiddenPolarityTerms).map((issue) => `golden polarity ${issue}`));
    failures.push(...validateProhibitionContext(snapshot, terms, safePolarityTerms, forbiddenPolarityTerms).map((issue) => `snapshot polarity ${issue}`));
    failures.push(...validateProhibitionContext(contracts, terms, safePolarityTerms, forbiddenPolarityTerms).map((issue) => `contract polarity ${issue}`));
  }

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

  const accidentalPlanningKernel = validatePathAbsence("skills/stnl_project_agent_specializer_dev/reference", /(^|\/)planning_kernel($|[/.])|planning_kernel/i);
  const unexpectedPlannerFiles = validateNoUnexpectedFiles(
    "skills/stnl_project_agent_specializer_dev/reference/planner_kernel",
    new Set([
      "README.md",
      "contracts/CONTRACT.md",
      "contracts/BEHAVIOR_PARITY_SPINE.md",
      "contracts/MINIMUM_SAFE_BUNDLE.md",
      "validation/STATIC_CHECKS.md",
      "validation/GOLDEN_TESTS.md",
      "validation/check-static.mjs",
      "validation/check-golden.mjs",
    ])
  );
  if (accidentalPlanningKernel.length > 0 || unexpectedPlannerFiles.length > 0) {
    results.push(
      fail(
        "PL-GT-000",
        "BLOCKED_PLANNER_STATIC_PRECONDITION_FAILED",
        detailList([...accidentalPlanningKernel, ...unexpectedPlannerFiles], "unexpected path")
      )
    );
    failed = true;
  }

  if (!failed) {
    const guardrailFailures = validateAllowedOnlyAsMetadata(contracts, [
      "stnl_frontend_quality",
      "stnl_backend_quality",
      "stnl_backend_sql_quality",
      "stnl_mobile_ios_swift_quality",
    ]);
    if (guardrailFailures.length > 0) {
      results.push(fail("PL-GT-000", "BLOCKED_PLANNER_STATIC_PRECONDITION_FAILED", detailList(guardrailFailures, "guardrail issue")));
      failed = true;
    }
  }

  if (!failed) {
    for (const test of goldenTests) {
      results.push(checkGolden(test, goldenDoc, snapshot, contracts));
    }
  }
}

for (const result of results) {
  const blocker = result.blocker ? ` ${result.blocker}` : "";
  console.log(`${result.id} ${result.status}${blocker} ${result.detail}`);
}

process.exit(failed || results.some((result) => result.status === "FAIL") ? 1 : 0);
