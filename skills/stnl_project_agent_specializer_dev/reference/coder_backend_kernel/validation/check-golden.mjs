#!/usr/bin/env node
import childProcess from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const validationRoot = path.dirname(scriptPath);
const kernelRoot = path.resolve(validationRoot, "..");
const referenceRoot = path.resolve(kernelRoot, "..");
const devSkillRoot = path.resolve(referenceRoot, "..");
const repoRoot = path.resolve(devSkillRoot, "..", "..");
const realRepoRoot = fs.realpathSync.native(repoRoot);

const ignoredNames = new Set(["__MACOSX", ".DS_Store"]);
const kernelPrefix =
  "skills/stnl_project_agent_specializer_dev/reference/coder_backend_kernel";
const goldenDoc = `${kernelPrefix}/validation/GOLDEN_TESTS.md`;

const requiredCaseIds = Array.from({ length: 15 }, (_, index) =>
  `CBE-GT-${String(index).padStart(3, "0")}`,
);

const requiredCaseHeadings = [
  "### Objective",
  "### Input shape",
  "### Expected behavior",
  "### Fail condition",
  "### Expected blocker",
];

const requiredTermsByCase = new Map([
  ["CBE-GT-000", [["authorized package", "authorized back-end package"], ["READY"], ["evidence"], ["checks"], ["risk"], ["guardrail"]]],
  ["CBE-GT-001", [["missing EXECUTION PACKAGE", "No EXECUTION PACKAGE"], ["reconstruct"], ["NEXT_OWNER: orchestrator"]]],
  ["CBE-GT-002", [["missing WORK_PACKAGE_ID", "lacks WORK_PACKAGE_ID"], ["infer ownership", "infers ownership"]]],
  ["CBE-GT-003", [["missing EXECUTION BRIEF", "omits EXECUTION BRIEF"], ["local plan"]]],
  ["CBE-GT-004", [["missing VALIDATION PACK", "VALIDATION PACK is absent"], ["validation owner"]]],
  ["CBE-GT-005", [["edit capability"], ["analysis-only"]]],
  ["CBE-GT-006", [["API/schema drift", "API Or Schema Drift"], ["contract basis"]]],
  ["CBE-GT-007", [["auth/authz", "Auth Or Authorization"], ["permission semantics"]]],
  ["CBE-GT-008", [["persistence/migration", "Persistence Or Migration"], ["rollout/backfill", "rollout, or backfill"], ["stnl_backend_sql_quality"]]],
  ["CBE-GT-009", [["transaction"], ["external side effect", "external effects"]]],
  ["CBE-GT-010", [["jobs/integration", "Jobs And Integrations", "job, async, or integration"], ["retry"], ["idempotency"], ["failure"]]],
  ["CBE-GT-011", [["logs/secrets", "logs, errors, secrets"], ["bounded queries", "keeps queries bounded"], ["cache"]]],
  ["CBE-GT-012", [["vendor leakage", "Vendor Leakage"], ["public boundary", "public domain", "public API"]]],
  ["CBE-GT-013", [["planner/package-designer drift", "planner drift"], ["package-designer drift"]]],
  ["CBE-GT-014", [["durable docs", "durable-documentation"], ["finalization"], ["resync"]]],
]);

const results = [];

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

function readText(relativePath) {
  const resolved = toRepoPath(relativePath);
  if (resolved.ignored) return "";
  return fs.readFileSync(realPathInsideRepo(resolved.path), "utf8");
}

function normalize(text) {
  return text.replace(/\s+/g, " ").trim();
}

function normalizeLower(text) {
  return normalize(text).toLowerCase();
}

function record(id, ok, message) {
  results.push({ id, ok, message });
}

function hasAny(text, terms) {
  const lower = normalizeLower(text);
  return terms.some((term) => lower.includes(normalizeLower(term)));
}

function containsAll(text, terms) {
  const lower = normalizeLower(text);
  return terms.every((term) => lower.includes(normalizeLower(term)));
}

function splitBlocks(text) {
  return text
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);
}

function isNegatedOrProhibitive(block) {
  const lower = normalizeLower(block);
  return /\b(not|no|never|without|invalid|missing|prohibit|prohibits|prohibited|reject|rejects|rejected|block|blocks|blocked|fail|fails|failed|failure|unsafe|absent|pending)\b/.test(
    lower,
  ) ||
    /\b(must not|does not|do not|cannot|may not|is not|are not|not an active|not a runtime|not a materialization|not a production|not productive|not a clean pass|does not prove)\b/.test(
      lower,
    );
}

function parseGoldenCases(text) {
  const caseHeadingPattern = /^## (CBE-GT-\d{3})(?:\s+-.*)?$/gm;
  const headings = [];
  let match;

  while ((match = caseHeadingPattern.exec(text)) !== null) {
    headings.push({
      id: match[1],
      index: match.index,
      heading: match[0],
    });
  }

  const sections = headings.map((heading, index) => {
    const end = headings[index + 1]?.index ?? text.length;
    return {
      ...heading,
      text: text.slice(heading.index, end),
    };
  });

  return { headings, sections };
}

function extractSubsection(sectionText, heading) {
  const start = sectionText.indexOf(`${heading}\n`);
  if (start === -1) return "";
  const rest = sectionText.slice(start + heading.length + 1);
  const nextHeading = rest.search(/\n### |\n## /);
  return (nextHeading === -1 ? rest : rest.slice(0, nextHeading)).trim();
}

function runStaticPrecondition() {
  const staticScript = path.join(validationRoot, "check-static.mjs");
  const result = childProcess.spawnSync(process.execPath, [staticScript], {
    cwd: repoRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });

  if (result.status !== 0) {
    record(
      "CBE-GT-PRE",
      false,
      [
        "static precondition failed",
        result.stdout.trim(),
        result.stderr.trim(),
      ]
        .filter(Boolean)
        .join(" | "),
    );
    return false;
  }

  record("CBE-GT-PRE", true, "static precondition passed");
  return true;
}

function checkCaseIdsAndOrder(parsed) {
  const foundIds = parsed.headings.map((heading) => heading.id);
  const seen = new Set();
  const duplicateIds = [];
  for (const id of foundIds) {
    if (seen.has(id)) duplicateIds.push(id);
    seen.add(id);
  }

  const missingCases = requiredCaseIds.filter((id) => !foundIds.includes(id));
  const unexpectedCases = foundIds.filter((id) => !requiredCaseIds.includes(id));
  const orderMatches =
    foundIds.length === requiredCaseIds.length &&
    requiredCaseIds.every((id, index) => foundIds[index] === id);

  const failures = [
    duplicateIds.length ? `duplicate IDs: ${duplicateIds.join(", ")}` : "",
    missingCases.length ? `missing IDs: ${missingCases.join(", ")}` : "",
    unexpectedCases.length ? `unexpected IDs: ${unexpectedCases.join(", ")}` : "",
    !orderMatches ? `order is ${foundIds.join(", ")}` : "",
  ].filter(Boolean);

  record(
    "CBE-GT-STRUCTURE",
    failures.length === 0,
    failures.length === 0
      ? "golden case IDs are unique and in exact required order"
      : failures.join("; "),
  );
}

function checkCaseSections(parsed) {
  const failures = [];

  for (const section of parsed.sections.filter((item) => requiredCaseIds.includes(item.id))) {
    const headingPositions = requiredCaseHeadings.map((heading) => {
      const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return {
        heading,
        positions: [...section.text.matchAll(new RegExp(`^${escaped}$`, "gm"))].map(
          (match) => match.index,
        ),
      };
    });

    const missing = headingPositions
      .filter((item) => item.positions.length === 0)
      .map((item) => item.heading);
    const duplicate = headingPositions
      .filter((item) => item.positions.length > 1)
      .map((item) => item.heading);
    const presentPositions = headingPositions
      .filter((item) => item.positions.length > 0)
      .map((item) => item.positions[0]);
    const ordered = presentPositions.every(
      (position, index) => index === 0 || position > presentPositions[index - 1],
    );
    const blocker = extractSubsection(section.text, "### Expected blocker");

    if (missing.length > 0) failures.push(`${section.id} missing ${missing.join(", ")}`);
    if (duplicate.length > 0) failures.push(`${section.id} duplicate ${duplicate.join(", ")}`);
    if (!ordered) failures.push(`${section.id} headings out of order`);
    if (blocker.length === 0) failures.push(`${section.id} Expected blocker is empty`);
  }

  record(
    "CBE-GT-SECTIONS",
    failures.length === 0,
    failures.length === 0
      ? "every golden case has ordered required subsections and non-empty Expected blocker"
      : failures.join("; "),
  );
}

function checkCaseMinimumTerms(parsed) {
  const failures = [];
  const sectionsById = new Map(parsed.sections.map((section) => [section.id, section]));

  for (const id of requiredCaseIds) {
    const section = sectionsById.get(id);
    if (!section) continue;
    for (const group of requiredTermsByCase.get(id) ?? []) {
      if (!hasAny(section.text, group)) {
        failures.push(`${id} missing [${group.join(" | ")}]`);
      }
    }
  }

  record(
    "CBE-GT-TERMS",
    failures.length === 0,
    failures.length === 0
      ? "each case contains its required minimum terms in its own block"
      : failures.join("; "),
  );
}

function checkExplicitFailureConditions(parsed) {
  const sectionsById = new Map(parsed.sections.map((section) => [section.id, section]));
  const failures = [];
  const readyCase = sectionsById.get("CBE-GT-000");
  const readyExpected = readyCase
    ? extractSubsection(readyCase.text, "### Expected behavior")
    : "";

  if (
    !containsAll(readyExpected, [
      "READY",
      "implementation",
      "evidence",
      "checks run",
      "residual risk",
    ])
  ) {
    failures.push("CBE-GT-000 READY behavior lacks implementation/evidence/checks/risk");
  }

  for (const id of ["CBE-GT-001", "CBE-GT-002", "CBE-GT-003", "CBE-GT-004"]) {
    const section = sectionsById.get(id);
    if (!section) continue;
    const expectedBehavior = extractSubsection(section.text, "### Expected behavior");
    const expectedBlocker = extractSubsection(section.text, "### Expected blocker");
    const activeText = `${expectedBehavior}\n${expectedBlocker}`;
    const activeLocalPlan =
      /\b(local plan|reconstruct|proceeds with implementation|claims validation verdict ownership)\b/i.test(
        activeText,
      ) && !isNegatedOrProhibitive(activeText);
    if (activeLocalPlan) {
      failures.push(`${id} converts missing handoff into local plan or owner substitution`);
    }
  }

  const documentText = parsed.sections.map((section) => section.text).join("\n\n");
  const positiveClaimPatterns = [
    { label: "runtime/materialization/prod", pattern: /\b(runtime\s+(pass|execution|agent runtime)|materialization\s+(pass|path)|production\s+(authorization|use|path|readiness))\b/i },
    { label: "fixture/generated report", pattern: /\b(fixtures?|generated\s+reports?)\b/i },
  ];

  const blocks = splitBlocks(documentText);
  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];
    const inheritedBlock = `${blocks[index - 1] ?? ""}\n${block}`;
    for (const claim of positiveClaimPatterns) {
      if (
        claim.pattern.test(block) &&
        !isNegatedOrProhibitive(block) &&
        !isNegatedOrProhibitive(inheritedBlock)
      ) {
        failures.push(`positive active ${claim.label} claim: ${normalize(block).slice(0, 180)}`);
      }
    }
  }

  record(
    "CBE-GT-NEGATIVE",
    failures.length === 0,
    failures.length === 0
      ? "explicit fail modes remain blocked for READY evidence, missing handoff, positive runtime/materialization/prod claims, and active fixtures/reports"
      : failures.join("; "),
  );
}

function emitAndExit() {
  const failed = results.filter((result) => !result.ok).length;
  const passed = results.length - failed;
  const write = failed > 0 ? console.error : console.log;

  write(`coder_backend_kernel golden check: ${failed > 0 ? "FAIL" : "PASS"}`);
  for (const result of results) {
    write(`${result.ok ? "PASS" : "FAIL"} ${result.id}: ${result.message}`);
  }
  write(`Summary: ${passed} passed, ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
}

function main() {
  try {
    const staticOk = runStaticPrecondition();
    if (staticOk) {
      const parsed = parseGoldenCases(readText(goldenDoc));
      checkCaseIdsAndOrder(parsed);
      checkCaseSections(parsed);
      checkCaseMinimumTerms(parsed);
      checkExplicitFailureConditions(parsed);
    }
  } catch (error) {
    record("CBE-GT-000", false, `unexpected error: ${error.message}`);
  }

  emitAndExit();
}

main();
