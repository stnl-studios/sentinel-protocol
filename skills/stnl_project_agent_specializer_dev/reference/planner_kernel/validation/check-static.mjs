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

const plannerKernelAllowlist = new Set([
  "README.md",
  "contracts/CONTRACT.md",
  "contracts/BEHAVIOR_PARITY_SPINE.md",
  "contracts/MINIMUM_SAFE_BUNDLE.md",
  "validation/STATIC_CHECKS.md",
  "validation/GOLDEN_TESTS.md",
  "validation/check-static.mjs",
  "validation/check-golden.mjs",
]);

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
const snapshotPath = "skills/stnl_project_agent_specializer_dev/reference/agents/planner.agent.md";
const templatePath = "templates/agents/planner.agent.md";
const goldenTestsPath = "skills/stnl_project_agent_specializer_dev/reference/planner_kernel/validation/GOLDEN_TESTS.md";

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

const prohibitivePolarityTerms = [
  "must not",
  "does not",
  "do not",
  "not allowed",
  "prohibit",
  "prohibited",
  "fail when",
  "must fail",
  "refuses",
  "does not emit",
  "must not emit",
  "does not create",
  "must not create",
  "does not define",
  "must not define",
  "not create",
  "not define",
  "not a planner",
  "not a durable",
  "not become",
  "not compile",
  "not execute",
  "must not become",
  "must not be written",
  "must never touch",
  "never touch",
  "without defining",
  "without becoming",
  "absence of",
  "no axis may authorize",
];

const downstreamBoundaryTerms = [
  "execution-package-designer later owns",
  "validation-eval-designer later owns",
  "downstream owns",
  "not planner-owned",
  "outside planner authority",
  "belongs to execution-package-designer",
  "belongs to validation-eval-designer",
  "owned by execution-package-designer",
  "owned by validation-eval-designer",
  "execution-package-designer owns",
  "validation-eval-designer owns",
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
  "planner may",
  "planner can",
  "planner should create",
  "planner is allowed",
  "planner owns",
  "planner defines",
  "planner produces",
  "planner generates",
  "planner is responsible for",
  "planner authorizes",
  "planner approves",
  "planner routes",
  "planner executes",
  "permission to implement",
  "routes directly",
  "approves execution",
];

const ambiguousPolarityTerms = [
  "belongs to",
  "later owns",
  "out of scope",
  "no planner prohibition",
];

const guardrailNames = [
  "stnl_frontend_quality",
  "stnl_backend_quality",
  "stnl_backend_sql_quality",
  "stnl_mobile_ios_swift_quality",
];

const expectedGoldenBlockers = new Map([
  ["PL-GT-001", "BLOCKED_PLANNER_READY_BRIEF_MISSING_OR_INVALID"],
  ["PL-GT-002", "BLOCKED_PLANNER_PRODUCT_AMBIGUITY_INFERRED"],
  ["PL-GT-003", "BLOCKED_PLANNER_BROAD_REQUEST_NOT_HONESTLY_CUT"],
  ["PL-GT-004", "BLOCKED_PLANNER_SOURCE_CONFLICT_HIDDEN"],
  ["PL-GT-005", "BLOCKED_PLANNER_DESIGNER_SIGNAL_MISSING"],
  ["PL-GT-006", "BLOCKED_PLANNER_ABSORBED_EXECUTION_PACKAGE"],
  ["PL-GT-007", "BLOCKED_PLANNER_COMPACT_REMOVED_SAFETY"],
  ["PL-GT-008", "BLOCKED_PLANNER_RUN_PLAN_APPROVED_EXECUTION"],
  ["PL-GT-009", "BLOCKED_PLANNER_SPECULATIVE_VALIDATION_DESIGN"],
  ["PL-GT-010", "BLOCKED_PLANNER_DURABLE_BRIEF_ARTIFACT_CREATED"],
  ["PL-GT-011", "BLOCKED_PLANNER_STRICT_INFERENCE_RELAXED"],
  ["PL-GT-012", "BLOCKED_PLANNER_STANDARD_SAFETY_FLOOR_LOST"],
  ["PL-GT-013", "BLOCKED_PLANNER_RUN_EXECUTE_ABSORBED_PACKAGE"],
  ["PL-GT-014", "BLOCKED_PLANNER_HANDOFF_READY_PARALLEL_GATE"],
  ["PL-GT-015", "BLOCKED_PLANNER_COMPACT_RETURN_REPUBLISHED_BRIEF"],
  ["PL-GT-016", "BLOCKED_PLANNER_HEADER_READING_AUTHORIZED_EXECUTION"],
  ["PL-GT-017", "BLOCKED_PLANNER_SOURCE_HIERARCHY_INVERTED"],
  ["PL-GT-018", "BLOCKED_PLANNER_UNTRUSTED_LOCAL_SOURCE_USED"],
  ["PL-GT-019", "BLOCKED_PLANNER_BROAD_DISCOVERY_USED_TO_AVOID_DECISION"],
  ["PL-GT-020", "BLOCKED_PLANNER_COMPACT_RETURN_SAFETY_OR_ANTI_NARRATION_LOST"],
]);

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
    for (const dirent of fs.readdirSync(absolutePath, { withFileTypes: true })) {
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
      line: match[0],
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

function hasOccurrenceNear(sectionText, target, requiredPolarityTerms, window = 240) {
  return findOccurrences(sectionText, target).some((index) => {
    const near = windowAround(sectionText, index, target, window);
    return requiredPolarityTerms.every((term) => phraseInRaw(near, term));
  });
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

function matchingPolarityTerms(text, terms) {
  return terms.filter((term) => phraseInRaw(text, term));
}

function downstreamBoundaryMatches(text, downstreamBoundary) {
  const direct = matchingPolarityTerms(text, downstreamBoundary);
  const owners = ["execution-package-designer", "validation-eval-designer"];
  const relations = ["later owns", "owns", "belongs to", "owned by"];
  const ownerRelationMatches = [];
  for (const owner of owners) {
    if (!phraseInRaw(text, owner)) continue;
    for (const relation of relations) {
      if (phraseInRaw(text, relation)) ownerRelationMatches.push(`${owner} ${relation}`);
    }
  }
  return [...new Set([...direct, ...ownerRelationMatches])];
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

function validateProhibitionContext(sectionText, terms, prohibitivePolarity, downstreamBoundary, forbiddenPolarity, windows = {}) {
  const localWindows = {
    forbidden: 180,
    prohibitive: 220,
    downstream: 280,
    ambiguous: 220,
    ...windows,
  };
  const failures = [];
  for (const term of terms) {
    for (const index of findOccurrences(sectionText, term)) {
      const forbiddenNear = windowAround(sectionText, index, term, localWindows.forbidden);
      const forbidden = matchingPolarityTerms(forbiddenNear, forbiddenPolarity);
      if (forbidden.length > 0) {
        failures.push(`${term} has forbidden permissive polarity (${forbidden[0]})`);
      }

      const prohibitiveNear = windowAround(sectionText, index, term, localWindows.prohibitive);
      const downstreamNear = windowAround(sectionText, index, term, localWindows.downstream);
      const prohibitive = matchingPolarityTerms(prohibitiveNear, prohibitivePolarity);
      const downstream = downstreamBoundaryMatches(downstreamNear, downstreamBoundary);
      if (prohibitive.length === 0 && downstream.length === 0) {
        const ambiguousNear = windowAround(sectionText, index, term, localWindows.ambiguous);
        const ambiguous = matchingPolarityTerms(ambiguousNear, ambiguousPolarityTerms);
        if (ambiguous.length > 0) {
          failures.push(`${term} has ambiguous insufficient polarity (${ambiguous[0]})`);
        } else {
          failures.push(`${term} lacks explicit prohibitive or downstream-boundary polarity`);
        }
      }
    }
  }
  return [...new Set(failures)];
}

function validateAllowedOnlyAsMetadata(sectionText, names) {
  const failures = [];
  failures.push(...mustContain(sectionText, names));
  failures.push(
    ...mustContain(sectionText, [
      { label: "metadata", phrases: ["metadata", "planning metadata"] },
      { label: "names only", phrases: ["names only", "by name only", "guardrail names"] },
    ])
  );

  const forbiddenPermissions = [
    "may copy",
    "can copy",
    "allowed to copy",
    "may summarize",
    "can summarize",
    "may edit",
    "can edit",
    "may replace",
    "can replace",
    "prove implementation quality",
    "proof of implementation quality",
    "guardrails are agents",
  ];
  for (const name of names) {
    failures.push(...mustNotAppearNear(sectionText, name, forbiddenPermissions, 500));
  }
  return [...new Set(failures)];
}

function validatePathAbsence(root, pattern) {
  return walk(root)
    .map((entry) => entry.relative)
    .filter((relative) => pattern.test(relative));
}

function validateNoUnexpectedFiles(root, allowlist) {
  const rootAbsolute = path.resolve(repoRoot, root);
  return walk(root)
    .filter((entry) => entry.dirent.isFile())
    .map((entry) => path.relative(rootAbsolute, path.resolve(repoRoot, entry.relative)).replaceAll(path.sep, "/"))
    .filter((relative) => !allowlist.has(relative));
}

function detailList(items, prefix) {
  const unique = [...new Set(items)];
  return `${prefix}: ${unique.slice(0, 8).join(", ")}${unique.length > 8 ? ", ..." : ""}`;
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
  const plannerPrefix = "PLANNER" + "_KERNEL";
  const excellentWord = "EXCELLENT";
  const forbiddenTokenPattern = new RegExp(`${plannerPrefix}_[A-Z_]*(?:CLEAN|${excellentWord})[A-Z_]*`, "i");
  return String(text)
    .split(/\r?\n/)
    .filter((line) => /planner_kernel/i.test(line) || forbiddenTokenPattern.test(line))
    .filter((line) => forbiddenTokenPattern.test(line) || /clean_excellent_pass/i.test(line))
    .filter((line) => !/not[_ -]?excellent[_ -]?pass|not excellent pass|under_review|under review|sob revisão|final audit/i.test(line));
}

function checkRequiredFiles() {
  const failures = [];
  for (const file of requiredPlannerFiles) {
    const resolved = toRepoPath(file);
    if (resolved.ignored) continue;
    if (!existsFile(file)) {
      failures.push(`${file} missing or not a regular file`);
      continue;
    }
    const realPath = realPathInsideRepo(resolved.path);
    if (!isInside(realPath, realRepoRoot)) failures.push(`${file} escapes repo`);
  }
  return failures.length > 0
    ? fail("PL-CH-001", "BLOCKED_PLANNER_REQUIRED_FILE_MISSING", detailList(failures, "issue"))
    : pass("PL-CH-001", "required files are regular files within repo containment");
}

function checkSnapshotExistsAndListed() {
  const manifest = readText(manifestPath);
  const failures = [];
  if (!existsFile(snapshotPath)) failures.push("snapshot missing");
  const manifestLines = manifest.split(/\r?\n/).filter((line) => line.includes("reference/agents/planner.agent.md"));
  if (manifestLines.length === 0) failures.push("manifest missing exact planner snapshot path");
  if (!manifestLines.some((line) => /^-\s+`reference\/agents\/planner\.agent\.md`/.test(line.trim()))) {
    failures.push("manifest does not list snapshot as a clear required-file line");
  }
  if (!hasPhrase(manifest, "local dev snapshot")) failures.push("manifest missing local-dev snapshot wording");
  if (!hasPhrase(manifest, "literal")) failures.push("manifest missing literal-copy provenance");
  return failures.length > 0
    ? fail("PL-CH-002", "BLOCKED_PLANNER_SNAPSHOT_MISSING_OR_UNLISTED", detailList(failures, "issue"))
    : pass("PL-CH-002", "local snapshot is present, listed clearly, and marked as audit point");
}

function checkSnapshotLiteralCopy() {
  const failures = [];
  if (!existsFile(templatePath)) failures.push("productive template missing");
  if (!existsFile(snapshotPath)) failures.push("local snapshot missing");
  if (failures.length > 0) {
    return fail("PL-CH-003", "BLOCKED_PLANNER_LITERAL_COPY_UNVERIFIABLE", detailList(failures, "issue"));
  }
  const template = readBuffer(templatePath);
  const snapshot = readBuffer(snapshotPath);
  if (!template.equals(snapshot)) {
    return fail(
      "PL-CH-003",
      "BLOCKED_PLANNER_SNAPSHOT_NOT_LITERAL_COPY",
      "templates/agents/planner.agent.md differs byte-for-byte from reference/agents/planner.agent.md"
    );
  }
  return pass("PL-CH-003", "snapshot is byte-for-byte copy of productive template");
}

function checkManifestListsPlannerBundle() {
  const manifest = readText(manifestPath);
  const listed = new Set([...manifest.matchAll(/^-\s+`([^`]+)`/gm)].map((match) => match[1]));
  const missing = plannerBundleEntries.filter((entry) => !listed.has(entry));
  const plannerListed = [...listed].filter((entry) => entry === "reference/agents/planner.agent.md" || entry.startsWith("reference/planner_kernel/"));
  const unexpected = plannerListed.filter((entry) => !plannerBundleEntries.includes(entry));
  const wildcard = plannerListed.filter((entry) => /[*?]|\.\./.test(entry));
  const failures = [...missing.map((entry) => `missing ${entry}`), ...unexpected.map((entry) => `unexpected ${entry}`), ...wildcard.map((entry) => `ambiguous ${entry}`)];
  return failures.length > 0
    ? fail("PL-CH-004", "BLOCKED_PLANNER_MANIFEST_INCOMPLETE", detailList(failures, "issue"))
    : pass("PL-CH-004", "manifest lists exactly the declared planner snapshot, docs, and harnesses");
}

function checkGlobalDocsPlannerStatus() {
  const failures = [];
  for (const file of globalDocPaths) {
    const text = readText(file);
    if (!hasPhrase(text, "planner_kernel")) failures.push(`${file} missing planner_kernel`);
    failures.push(
      ...mustContainAny(text, [
        "NOT_EXCELLENT_PASS",
        "not excellent pass",
        "UNDER_REVIEW",
        "sob revisão",
        "human final audit",
        "revisão humana",
        "FINAL_AUDIT_REQUIRED",
      ]).map((issue) => `${file} missing ${issue}`)
    );
    const plannerExcellent = plannerLinesDeclaringExcellent(text);
    if (plannerExcellent.length > 0) failures.push(`${file} declares planner excellent/pass`);
  }
  return failures.length > 0
    ? fail("PL-CH-005", "BLOCKED_PLANNER_GLOBAL_DOC_STATUS_INVALID", detailList(failures, "issue"))
    : pass("PL-CH-005", "global docs keep planner under review/not excellent pass");
}

function checkOrchestratorFrozenStatus() {
  const failures = [];
  const weakening = [
    "not clean",
    "not excellent",
    "under review",
    "UNDER_REVIEW",
    "failed",
    "falhou",
    "reopened",
    "reaberto",
    "rebaixado",
    "alterable",
    "alterável",
    "may alter",
    "can alter",
    "planner round can alter",
    "rodada do planner pode alterar",
  ];
  for (const file of [...globalDocPaths, manifestPath]) {
    const text = readText(file);
    if (!hasOccurrenceNear(text, "orchestrator_kernel", ["CLEAN_EXCELLENT_PASS"], 260)) {
      failures.push(`${file} orchestrator_kernel missing CLEAN_EXCELLENT_PASS status`);
    }
    if (!hasOccurrenceNear(text, "orchestrator_kernel", ["frozen"], 320) && !hasOccurrenceNear(text, "orchestrator_kernel", ["congelado"], 320) && !hasOccurrenceNear(text, "orchestrator_kernel", ["preserv"], 320)) {
      failures.push(`${file} orchestrator_kernel missing frozen/preserved polarity`);
    }
    const badLines = text
      .split(/\r?\n/)
      .filter((line) => /orchestrator_kernel/i.test(line))
      .filter((line) => weakening.some((term) => phraseInRaw(line, term)));
    failures.push(...badLines.map((line) => `${file} weakens orchestrator status: ${line.trim()}`));
  }
  return failures.length > 0
    ? fail("PL-CH-006", "BLOCKED_ORCHESTRATOR_FROZEN_STATUS_WEAKENED", detailList(failures, "issue"))
    : pass("PL-CH-006", "orchestrator frozen status remains unweakened");
}

function checkSourceChainUnambiguous() {
  const sourceSections = plannerDocPaths.flatMap((file) =>
    sections(readText(file), /Source alignment/i).map((found) => `\n--- ${file} ---\n${found}`)
  );
  const text = sourceSections.join("\n");
  const failures = [];
  if (sourceSections.length < 3) failures.push("source alignment sections missing or sparse");
  failures.push(
    ...mustContain(text, [
      "templates/agents/planner.agent.md",
      "reference/agents/planner.agent.md",
      "reference/planner_kernel/**",
      { label: "productive/base origin", phrases: ["productive/base origin", "productive template", "base origin", "copy origin"] },
      { label: "local snapshot audit point", phrases: ["local snapshot", "dev snapshot", "audit point", "integrated dev snapshot"] },
      { label: "documentary contract set", phrases: ["documentary kernel", "documentary contract", "contract set"] },
      { label: "no fallback", phrases: ["not a fallback", "no fallback", "must not use fallback", "not a fallback path"] },
    ])
  );
  return failures.length > 0
    ? fail("PL-CH-007", "BLOCKED_PLANNER_SOURCE_CHAIN_AMBIGUOUS", detailList(failures, "missing"))
    : pass("PL-CH-007", "source chain identifies productive origin, local snapshot, contract set, and no fallback");
}

function checkNoPlanningKernelPath() {
  const pathOffenders = validatePathAbsence("skills/stnl_project_agent_specializer_dev/reference", /(^|\/)planning_kernel($|[/.])|planning_kernel/i);
  const text = readMany([...plannerDocPaths, ...globalDocPaths, manifestPath]);
  const unsafeMentions = [];
  for (const index of findOccurrences(text, "planning_kernel")) {
    const near = windowAround(text, index, "planning_kernel", 320);
    const safe = [
      "not a",
      "no `planning_kernel`",
      "no planning_kernel",
      "prohibited",
      "does not authorize",
      "creation of any",
      "not included",
      "no real path",
      "allowed only as prohibitions",
      "does not implement",
      "does not define",
      "must not",
      "não",
      "sem",
    ].some((phrase) => phraseInRaw(near, phrase));
    if (!safe) unsafeMentions.push("planning_kernel mention lacks prohibition polarity");
  }
  const failures = [...pathOffenders.map((entry) => `path ${entry}`), ...unsafeMentions];
  return failures.length > 0
    ? fail("PL-CH-008", "BLOCKED_PLANNING_KERNEL_PATH_OR_TEXT_ALLOWED", detailList(failures, "issue"))
    : pass("PL-CH-008", "no planning_kernel path exists and textual mentions are prohibitive");
}

function checkNoPlannerExcellentStatus() {
  const text = readMany(plannerDocPaths);
  const plannerPrefix = "PLANNER" + "_KERNEL";
  const excellentWord = "EXCELLENT";
  const forbiddenPattern = new RegExp(`${plannerPrefix}_[A-Z_]*(?:CLEAN|${excellentWord})[A-Z_]*`, "gi");
  const forbidden = text.match(forbiddenPattern) || [];
  const lineFailures = plannerLinesDeclaringExcellent(text);
  const failures = [...forbidden, ...lineFailures];
  return failures.length > 0
    ? fail("PL-CH-009", "BLOCKED_PLANNER_EXCELLENT_STATUS_DECLARED", detailList(failures, "forbidden"))
    : pass("PL-CH-009", "planner-kernel docs do not declare planner excellent/pass");
}

function checkNoUnauthorizedSurfaces() {
  const unexpectedFiles = validateNoUnexpectedFiles("skills/stnl_project_agent_specializer_dev/reference/planner_kernel", plannerKernelAllowlist);
  const entries = walk("skills/stnl_project_agent_specializer_dev/reference/planner_kernel");
  const failures = [...unexpectedFiles.map((entry) => `unexpected file ${entry}`)];
  const surfacePattern = /(^|[/_.-])(fixtures?|generated|reports?|materializers?|runtime)([/_.-]|$)/i;
  for (const entry of entries) {
    const localRelative = path.relative(plannerKernelRoot, path.resolve(repoRoot, entry.relative)).replaceAll(path.sep, "/");
    if (entry.dirent.isFile() && /\.(?:mjs|js|cjs)$/i.test(localRelative) && !plannerKernelAllowlist.has(localRelative)) {
      failures.push(`unexpected script ${localRelative}`);
    }
    if (surfacePattern.test(localRelative)) failures.push(`unauthorized surface ${localRelative}`);
  }
  return failures.length > 0
    ? fail("PL-CH-010", "BLOCKED_PLANNER_UNAUTHORIZED_RUNTIME_SURFACE", detailList(failures, "issue"))
    : pass("PL-CH-010", "planner_kernel contains only the allowed documentation and two harnesses");
}

function checkCoreInvariants() {
  const contract = readText(contractPaths[0]);
  const expectations = [
    ["Identity", ["planner", "planning", "bounded-context", "EXECUTION BRIEF", "orchestrator"]],
    ["Mission", ["planner", "small", "honest", "validatable", "EXECUTION BRIEF", { label: "does not implement", phrases: ["does not implement", "not implement"] }]],
    ["Output contract", ["EXECUTION BRIEF", "ephemeral", "current-round", "source of truth", "validation-aware", "guardrail", "orchestrator"]],
    ["Status contract", ["READY", "NEEDS_DEV_DECISION_BASE", "HANDOFF_READY", "not a planner status", "orchestrator"]],
    ["Reading contract", ["bounded-context", "at most 3 local artifacts", "at most 1", "up to 2 additional", "File Purpose Header"]],
    ["Relation contract", ["orchestrator", "validation-eval-designer", "execution-package-designer", "designer", "returns"]],
    ["Completion contract", ["READY", "EXECUTION BRIEF", "small honest cut", "NEEDS_DEV_DECISION_BASE"]],
  ];
  const failures = [];
  for (const [heading, phraseGroups] of expectations) {
    const found = section(contract, heading);
    if (!found) {
      failures.push(`${heading} section missing`);
      continue;
    }
    failures.push(...mustContain(found, phraseGroups).map((issue) => `${heading}: ${issue}`));
  }
  return failures.length > 0
    ? fail("PL-CH-011", "BLOCKED_PLANNER_CORE_INVARIANT_MISSING", detailList(failures, "missing"))
    : pass("PL-CH-011", "core invariants are preserved in the intended contract sections");
}

function checkRoleAbsorptionProhibited() {
  const text = readMany(contractPaths);
  const failures = [];
  failures.push(...mustContain(text, dangerousTerms));
  failures.push(...validateProhibitionContext(text, dangerousTerms, prohibitivePolarityTerms, downstreamBoundaryTerms, forbiddenPolarityTerms));
  failures.push(
    ...mustContain(text, [
      { label: "implementation prohibition", phrases: ["must not implement", "does not implement", "do not implement"] },
      { label: "validation execution prohibition", phrases: ["run validation", "validation execution"] },
      { label: "final verdict prohibition", phrases: ["final verdict", "final-verdict"] },
      { label: "round closure prohibition", phrases: ["close the round", "close a round", "closure"] },
      { label: "resync prohibition", phrases: ["resync"] },
      { label: "durable documentation prohibition", phrases: ["durable documentation"] },
      { label: "discovery engine prohibition", phrases: ["discovery engine", "broad discovery"] },
      { label: "implementation designer prohibition", phrases: ["implementation designer", "design implementation"] },
      { label: "pseudo-orchestrator prohibition", phrases: ["pseudo-orchestrator", "pseudo-orchestration", "orchestrate the round"] },
    ])
  );
  return failures.length > 0
    ? fail("PL-CH-012", "BLOCKED_PLANNER_ROLE_ABSORPTION_WEAKENED", detailList(failures, "issue"))
    : pass("PL-CH-012", "dangerous downstream terms remain prohibitive or downstream-boundary only");
}

function checkOperationalAxes() {
  const text = readMany([...contractPaths, goldenTestsPath]);
  const failures = mustContain(text, [
    { label: "MODE=standard safety floor", phrases: ["MODE=standard preserves", "MODE=standard keeps", "MODE=standard as current planning behavior"] },
    { label: "MODE=strict lower inference", phrases: ["MODE=strict reduces inference", "MODE=strict as lower-inference", "lower-inference planning"] },
    { label: "MODE=compact format only", phrases: ["MODE=compact as format compaction only", "MODE=compact is format compaction", "format compaction only, not safety compaction"] },
    { label: "RUN=execute planning handoff only", phrases: ["`RUN=execute` means the planner may prepare", "RUN=execute means the planner may prepare", "RUN=execute as execution-ready planning", "`RUN=execute`: prepare a valid planning handoff"] },
    { label: "RUN=execute no implementation", phrases: ["does not authorize implementation", "not execution approval", "not approval to implement"] },
    { label: "RUN=execute no package fields", phrases: ["does not authorize implementation, bypass orchestrator routing, or emit executable package fields", "or emit executable package fields", "absence of `EXECUTION PACKAGE`"] },
    { label: "RUN=plan planning-only", phrases: ["RUN=plan remains planning-only", "RUN=plan as planning-only", "planning-only"] },
    { label: "RUN=plan no future approval", phrases: ["without implying implementation approval", "not execution approval", "does not approve execution"] },
    { label: "HANDOFF_READY not gate", phrases: ["HANDOFF_READY is not a planner status", "HANDOFF_READY is not an additional status or gate", "not become a parallel gate"] },
    { label: "compact return no full brief", phrases: ["must not republish", "not republishing the full brief", "does not republish the full"] },
    { label: "compact return no narration", phrases: ["must not narrate", "does not narrate reading", "Do not narrate"] },
  ]);
  return failures.length > 0
    ? fail("PL-CH-013", "BLOCKED_PLANNER_OPERATIONAL_AXIS_WEAKENED", detailList(failures, "missing"))
    : pass("PL-CH-013", "operational axes preserve safety, anti-authorization, and compact-return limits");
}

function checkGuardrailsMetadataOnly() {
  const text = readMany(contractPaths);
  const failures = validateAllowedOnlyAsMetadata(text, guardrailNames);
  failures.push(
    ...mustContain(text, [
      { label: "copy/summarize/edit/replace forbidden", phrases: ["must not copy, summarize, edit, or replace guardrail content", "must not copy guardrail content"] },
      { label: "quality proof forbidden", phrases: ["must not use guardrails as proof of implementation quality", "claim validation proof", "use guardrails as proof of implementation quality"] },
      { label: "not agents", phrases: ["not treat guardrails as agents", "treat guardrails as agents"] },
    ])
  );
  return failures.length > 0
    ? fail("PL-CH-014", "BLOCKED_PLANNER_GUARDRAIL_METADATA_WEAKENED", detailList(failures, "issue"))
    : pass("PL-CH-014", "guardrails are present only as metadata names with copy/proof/agent drift forbidden");
}

function checkValidationDocsAlignWithHarnesses() {
  const text = readMany(validationDocPaths);
  const failures = mustContain(text, [
    "check-static.mjs",
    "check-golden.mjs",
    { label: "read-only executable harnesses", phrases: ["read-only executable", "executable structural", "executable semantic"] },
    { label: "Node built-ins", phrases: ["Node built-ins", "Node built-in"] },
    { label: "path containment", phrases: ["path containment", "repo containment"] },
    { label: "no agent runtime", phrases: ["does not execute agent runtime", "do not execute agent runtime"] },
    { label: "no materializer", phrases: ["does not implement a materializer", "do not implement a materializer"] },
    { label: "no fixtures", phrases: ["does not create fixtures", "do not create fixtures"] },
    { label: "no generated reports", phrases: ["does not produce generated reports", "do not produce generated reports"] },
    { label: "no automatic pass", phrases: ["does not authorize automatic pass", "does not grant automatic pass", "sem pass automático"] },
    { label: "all blocking", phrases: ["All checks are blocking", "All golden tests are blocking", "todos bloqueantes"] },
  ]);
  for (let index = 1; index <= 23; index += 1) {
    const id = `PL-CH-${String(index).padStart(3, "0")}`;
    if (!hasPhrase(text, id)) failures.push(`${id} undocumented`);
  }
  for (let index = 1; index <= 20; index += 1) {
    const id = `PL-GT-${String(index).padStart(3, "0")}`;
    if (!hasPhrase(text, id)) failures.push(`${id} undocumented`);
  }
  const stale = /future checks should|future golden checks should|out of scope\s+[\s\S]*runnable/i.test(text) ? ["stale future/runnable wording"] : [];
  failures.push(...stale);
  return failures.length > 0
    ? fail("PL-CH-015", "BLOCKED_PLANNER_VALIDATION_DOCS_STALE", detailList(failures, "issue"))
    : pass("PL-CH-015", "validation docs describe read-only blocking harnesses and full check/golden coverage");
}

function checkGlobalDocsListHarnessesWithoutAutomaticPass() {
  const files = [...globalDocPaths, manifestPath];
  const failures = [];
  for (const file of files) {
    const text = readText(file);
    if (!text.includes("reference/planner_kernel/validation/check-static.mjs")) failures.push(`${file} missing check-static.mjs`);
    if (!text.includes("reference/planner_kernel/validation/check-golden.mjs")) failures.push(`${file} missing check-golden.mjs`);
    failures.push(
      ...mustContainAny(text, ["block", "bloqueiam", "bloqueante", "blocking support", "apoio bloqueante"]).map(
        () => `${file} missing blocking-support wording`
      )
    );
  }
  const combined = readMany(files);
  failures.push(
    ...mustContainAny(combined, ["does not grant automatic pass", "sem pass automático", "not automatic pass", "não concede pass automático", "human final audit"]).map(
      () => "missing no-automatic-pass/human-review wording"
    )
  );
  if (plannerLinesDeclaringExcellent(combined).length > 0) failures.push("planner excellent/pass status declared in global docs");
  return failures.length > 0
    ? fail("PL-CH-016", "BLOCKED_PLANNER_GLOBAL_HARNESS_DOCS_INVALID", detailList(failures, "issue"))
    : pass("PL-CH-016", "global docs list harnesses as blocking support without automatic pass or orchestrator status drift");
}

function checkReadingContract() {
  const text = readMany(contractPaths);
  const failures = mustContain(text, [
    "bounded-context",
    { label: "budget 3 local artifacts", phrases: ["at most 3 local artifacts", "up to 3 local artifacts"] },
    { label: "at most 1 live artifact", phrases: ["at most 1 live artifact", "at most 1 of those artifacts may be live", "include at most 1 live artifact"] },
    { label: "expansion by at most 2", phrases: ["up to 2 additional targeted artifacts", "at most 2 additional targeted artifacts", "expand by at most 2 targeted artifacts"] },
    { label: "no broad discovery", phrases: ["no broad discovery", "must not perform broad discovery", "stop when the cut requires broad discovery"] },
    { label: "no read-more loop", phrases: ["read more", "additional reading to avoid a DEV decision"] },
    "source-of-truth hierarchy",
    "File Purpose Header",
    "scratchpads",
    "runtime temp files",
    "workspaceStorage",
    "chat-session-resources",
    "content.txt",
    "spec_slices",
    "Planning Interface",
    { label: "Planning Interface is information only", phrases: ["Planning Interface as planning information only", "Planning Interface is planning information only", "information only, never as an executable plan"] },
  ]);
  return failures.length > 0
    ? fail("PL-CH-017", "BLOCKED_PLANNER_READING_CONTRACT_WEAKENED", detailList(failures, "missing"))
    : pass("PL-CH-017", "reading contract preserves bounded budget, source hierarchy, header handling, and untrusted-source limits");
}

function checkHeaderAwareReadingPreserved() {
  const text = readMany([snapshotPath, ...contractPaths]);
  const failures = mustContain(text, [
    "File Purpose Header",
    "read_when",
    "do_not_use_for",
    "canonical_source_for",
    "canonical_source_not_for",
    "token_policy",
    "spec_slices",
    "Planning Interface",
    { label: "header routes reading", phrases: ["route reading", "choose the correct canonical planning source", "consumption map"] },
    { label: "header does not authorize execution", phrases: ["never as an executable plan or execution authorization", "must not infer execution", "must not invent scope"] },
    { label: "acceptance not inferred", phrases: ["acceptance criteria", "acceptance"] },
  ]);
  return failures.length > 0
    ? fail("PL-CH-018", "BLOCKED_PLANNER_HEADER_READING_WEAKENED", detailList(failures, "missing"))
    : pass("PL-CH-018", "header-aware reading keeps canonical fields, spec_slices, and no execution authorization");
}

function checkSourceOfTruthHierarchyPreserved() {
  const text = readMany([snapshotPath, ...contractPaths]);
  const failures = mustContain(text, [
    "Source of truth hierarchy",
    { label: "DEV/orchestrator first", phrases: ["DEV and orchestrator framing first", "resolved DEV and orchestrator framing first"] },
    { label: "canonical docs second", phrases: ["canonical owner docs and project context second", "canonical owner, feature, project, or boundary context"] },
    { label: "live implementation third", phrases: ["specific live implementation, contract, or config evidence third", "live implementation"] },
    { label: "external docs fourth", phrases: ["external dependency docs fourth", "external docs only"] },
    { label: "no docs/code preference", phrases: ["not choose docs or code by preference", "not choose docs over code or code over docs by preference", "chooses docs or code by preference"] },
    { label: "DEV/orchestrator not replaced", phrases: ["must not replace DEV or orchestrator framing", "does not replace resolved DEV or orchestrator framing"] },
  ]);
  return failures.length > 0
    ? fail("PL-CH-019", "BLOCKED_PLANNER_SOURCE_HIERARCHY_WEAKENED", detailList(failures, "missing"))
    : pass("PL-CH-019", "source-of-truth hierarchy keeps DEV/orchestrator framing above docs, code, and external docs");
}

function checkUntrustedLocalSourcesProhibited() {
  const text = readMany(contractPaths);
  const failures = mustContain(text, [
    "scratchpads",
    "runtime temp files",
    "workspaceStorage",
    "chat-session-resources",
    "content.txt",
    { label: "not Sentinel source of truth", phrases: ["not Sentinel source of truth", "as Sentinel source of truth", "never use"] },
  ]);
  failures.push(...mustAppearNear(text, "scratchpads", ["never", "not", "must not"], 240));
  failures.push(...mustAppearNear(text, "workspaceStorage", ["never", "not", "must not"], 240));
  failures.push(...mustAppearNear(text, "content.txt", ["never", "not", "must not", "no"], 240));
  return failures.length > 0
    ? fail("PL-CH-020", "BLOCKED_PLANNER_UNTRUSTED_LOCAL_SOURCE_ALLOWED", detailList(failures, "issue"))
    : pass("PL-CH-020", "untrusted local sources are explicitly barred as Sentinel source of truth");
}

function checkCompactReturnAntiNarration() {
  const text = readMany([snapshotPath, ...contractPaths]);
  const failures = mustContain(text, [
    "compact return",
    { label: "do not republish full brief", phrases: ["not republish", "Do not paste the full brief", "must not republish"] },
    { label: "main chat", phrases: ["main chat", "main-chat"] },
    { label: "do not narrate reading", phrases: ["not narrate reading", "Do not narrate operating steps", "must not narrate"] },
    "searching",
    "inspection",
    "progress",
    "tool usage",
    "scope",
    "blockers",
    "risks",
    "source-of-truth",
    "guardrail",
    "validation-aware notes",
  ]);
  return failures.length > 0
    ? fail("PL-CH-021", "BLOCKED_PLANNER_COMPACT_RETURN_WEAKENED", detailList(failures, "missing"))
    : pass("PL-CH-021", "compact return preserves safety content and anti-narration");
}

function checkDangerousTermsOnlyInAllowedSections() {
  const allowedHeadings = /^(Output contract|Non-authority|Validation-eval-designer|Execution-package-designer|Relation contract|Operational axes contract|Output invariants|Operational axis and delta invariants|Downstream relation invariants|Examples of prohibited drift|Mandatory output|Mandatory prohibitions|Mandatory downstream relationship)$/i;
  const failures = [];
  for (const file of contractPaths) {
    const markdown = readText(file);
    for (const found of markdownHeadings(markdown)) {
      if (found.level === 1) continue;
      const current = section(markdown, new RegExp(`^${escapeRegExp(found.text)}$`, "i"));
      if (!dangerousTerms.some((term) => hasPhrase(current, term))) continue;
      if (!allowedHeadings.test(found.text)) {
        failures.push(`${file}: ${found.text}`);
      }
      failures.push(...validateProhibitionContext(current, dangerousTerms, prohibitivePolarityTerms, downstreamBoundaryTerms, forbiddenPolarityTerms).map((issue) => `${file}: ${found.text}: ${issue}`));
    }
  }
  return failures.length > 0
    ? fail("PL-CH-022", "BLOCKED_PLANNER_DANGEROUS_TERM_CONTEXT_INVALID", detailList(failures, "issue"))
    : pass("PL-CH-022", "dangerous terms appear only in allowed contract sections with safe polarity");
}

function checkGoldenTestsHaveRequiredShape() {
  const markdown = readText(goldenTestsPath);
  const failures = [];
  for (const [id, blocker] of expectedGoldenBlockers) {
    const found = extractGoldenTest(markdown, id);
    if (!found) {
      failures.push(`${id} missing`);
      continue;
    }
    failures.push(...validateGoldenShape(found, blocker).map((issue) => `${id}: ${issue}`));
  }
  return failures.length > 0
    ? fail("PL-CH-023", "BLOCKED_PLANNER_GOLDEN_SHAPE_INVALID", detailList(failures, "issue"))
    : pass("PL-CH-023", "golden tests PL-GT-001 through PL-GT-020 have required blocking shape");
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
  checkHeaderAwareReadingPreserved,
  checkSourceOfTruthHierarchyPreserved,
  checkUntrustedLocalSourcesProhibited,
  checkCompactReturnAntiNarration,
  checkDangerousTermsOnlyInAllowedSections,
  checkGoldenTestsHaveRequiredShape,
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
