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

const prohibitedGoldenHarnessDriftClaims = [
  { label: "residual phase status", pattern: /\binitial\s+draft\b/i },
  { label: "residual phase status", pattern: /\bnot\s+promoted\b/i },
  { label: "residual phase status", pattern: /\bnot\s+a\s+clean\s+pass\b/i },
  { label: "residual phase status", pattern: /\bpending\s+hardened\s+harness\s+audit\b/i },
  { label: "residual phase status", pattern: /\bpending\s+promotion\s+evaluation\b/i },
  { label: "residual phase status", pattern: /\bpending\s+draft\s+audit\b/i },
  { label: "residual phase status", pattern: /\bpending\s+harness\s+design\b/i },
  { label: "residual phase status", pattern: /\bpending\s+harness\s+creation\b/i },
  {
    label: "golden harness absence",
    pattern: /\b(?:there\s+is\s+)?no\s+`?validation\/check-golden\.mjs`?\b/i,
  },
  {
    label: "static harness absence",
    pattern: /\b(?:there\s+is\s+)?no\s+`?validation\/check-static\.mjs`?\b/i,
  },
  {
    label: "future executable checks",
    pattern: /\bExecutable\s+checks\s+belong\s+to\s+future\s+phases\b/i,
  },
  {
    label: "future harness assertion",
    pattern:
      /\b(?:harness(?:es)?|executable\s+checks?)\s+(?:belongs?|belong|is|are|remains?|remain)\s+(?:to\s+)?future\s+phases?\b/i,
  },
  { label: "pre-harness current state", pattern: /\bpre-harness\b/i },
];

const requiredGoldenHarnessSeparationTerms = [
  "textual executable validation scripts",
  "CLEAN_EXCELLENT_PASS",
  "documentary promotion applied",
  "hardened textual executable harness pass",
  "non-runtime",
  "no materialization path",
  "prove only documentary/dev kernel lab `CLEAN_EXCELLENT_PASS`",
  "do not authorize runtime execution",
  "do not authorize materialization path",
  "do not authorize production use",
  "do not authorize target artifacts",
  "do not authorize active runtime adoption",
];

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

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function splitSentences(line) {
  return line
    .split(/(?<=[.!?;])\s+|(?<=:)\s+(?=[A-Z`])/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function previousMeaningfulLine(lines, startIndex) {
  for (let index = startIndex - 1; index >= 0; index -= 1) {
    const line = lines[index].trim();
    if (line.length > 0) return line;
  }
  return "";
}

function isListItem(sentence) {
  return /^\s*[-*]\s+/.test(sentence);
}

function isProhibitiveListContext(context) {
  return /\b(prohibits?|prohibited|prohibitions?|forbidden|blocks?|blocked|rejects?|rejected|invalid|excluded|exclusions?|must not|does not authorize|do not authorize|not authorized|not allowed|not permitted)\b/i.test(
    context,
  );
}

function hasPositiveActivationVerb(sentence) {
  return /\b(is|are|be|being|been|becomes?|become|remains?|remain)\s+(authorized|allowed|permitted|active|enabled|available|produced|created|generated|executed|loaded|materialized|written|ready)\b/i.test(
    sentence,
  ) ||
    /\b(authorizes?|allows?|permits?|produces?|creates?|generates?|executes?|loads?|materializes?|enables?)\b/i.test(
      sentence,
    );
}

function sentenceClaimSegments(text) {
  const lines = text.split(/\r?\n/);
  const segments = [];
  let paragraph = "";
  let paragraphContext = "";
  let activeListContext = "";
  let listItem = "";
  let listItemContext = "";

  function addSentences(source, context) {
    for (const sentence of splitSentences(source)) {
      segments.push({ text: sentence, context });
    }
  }

  function flushParagraph() {
    if (paragraph.trim().length > 0) {
      addSentences(paragraph, paragraphContext);
      paragraph = "";
      paragraphContext = "";
    }
  }

  function flushListItem() {
    if (listItem.trim().length > 0) {
      addSentences(listItem, listItemContext);
      listItem = "";
      listItemContext = "";
    }
  }

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const trimmed = line.trim();

    if (trimmed.length === 0) {
      flushListItem();
      flushParagraph();
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      flushListItem();
      flushParagraph();
      const context = activeListContext || previousMeaningfulLine(lines, index);
      listItem = trimmed;
      listItemContext = context;
      continue;
    }

    if (listItem.length > 0 && /^\s+/.test(line)) {
      listItem = `${listItem} ${trimmed}`;
      continue;
    }

    flushListItem();

    if (/^#{1,6}\s+/.test(trimmed)) {
      flushParagraph();
      activeListContext = trimmed;
      addSentences(line, previousMeaningfulLine(lines, index));
      continue;
    }

    if (trimmed.endsWith(":")) {
      flushParagraph();
      activeListContext = trimmed;
      addSentences(line, previousMeaningfulLine(lines, index));
      continue;
    }

    if (paragraph.length === 0) {
      paragraphContext = previousMeaningfulLine(lines, index);
    }
    paragraph = paragraph.length === 0 ? trimmed : `${paragraph} ${trimmed}`;
  }

  flushListItem();
  flushParagraph();
  return segments;
}

function claimIsDirectlyNegatedOrProhibitive(sentence, claimText, context) {
  const claim = escapeRegExp(claimText.trim()).replace(/\s+/g, "\\s+");
  const beforeClaim = String.raw`[^.!?;\n]{0,260}${claim}`;
  const afterClaim = String.raw`${claim}[^.!?;\n]{0,260}`;
  const directNoClaim = new RegExp(String.raw`\bno\s+${claim}\b`, "i");
  const positiveAfterClaim = new RegExp(String.raw`${claim}(?:\s+(?:is|are|remains?|remain|becomes?|become|must\s+be|should\s+be))?\s+(?:authorized|authorised|allowed|permitted|active|enabled|available|produced|created|generated|executed|loaded|materialized|written|ready)\b`, "i");

  if (!directNoClaim.test(sentence) && positiveAfterClaim.test(sentence)) {
    return false;
  }

  const directPatterns = [
    new RegExp(String.raw`\b(?:must|does|do|did|may|can|is|are|was|were|should)\s+not\s+(?:claim|authorize|authorise|allow|permit|prove|implement|execute|enter|load|materialize|write|produce|create|generate|use|promote|return|emit|alter|touch|include|contain|become|introduce|mean|means)\b${beforeClaim}`, "i"),
    new RegExp(String.raw`\b(?:cannot|never)\s+(?:claim|authorize|authorise|allow|permit|prove|implement|execute|enter|load|materialize|write|produce|create|generate|use|promote|return|emit|alter|touch|include|contain|become|introduce|mean|means)\b${beforeClaim}`, "i"),
    new RegExp(String.raw`\bnot\s+(?:authorized|authorised|allowed|permitted)\s+(?:for|to|as)?${beforeClaim}`, "i"),
    new RegExp(String.raw`\bnot\s+(?:an?\s+)?${claim}\b`, "i"),
    directNoClaim,
    new RegExp(String.raw`\bno\b${beforeClaim}`, "i"),
    new RegExp(String.raw`\b(?:prohibits?|prohibited|forbids?|forbidden|blocks?|blocked|rejects?|rejected|invalidates?|invalid|unsafe|absent|excluded)\b${beforeClaim}`, "i"),
    new RegExp(String.raw`${afterClaim}\b(?:is|are|remains?|remain|must\s+remain|must\s+be|should\s+remain|should\s+be)?\s*(?:not\s+)?(?:authorized|authorised|allowed|permitted|prohibited|forbidden|blocked|rejected|invalid|unsafe|absent|excluded)\b`, "i"),
    new RegExp(String.raw`${afterClaim}\b(?:must|may|can|does|do|is|are)\s+not\b`, "i"),
  ];

  if (directPatterns.some((pattern) => pattern.test(sentence))) return true;

  return (
    isListItem(sentence) &&
    isProhibitiveListContext(context) &&
    !hasPositiveActivationVerb(sentence)
  );
}

function hasImproperPositiveClaim(text, claims) {
  for (const segment of sentenceClaimSegments(text)) {
    for (const claim of claims) {
      const flags = claim.pattern.flags.includes("g")
        ? claim.pattern.flags
        : `${claim.pattern.flags}g`;
      const pattern = new RegExp(claim.pattern.source, flags);
      const matches = [...segment.text.matchAll(pattern)];
      for (const match of matches) {
        if (!claimIsDirectlyNegatedOrProhibitive(segment.text, match[0], segment.context)) {
          return true;
        }
      }
    }
  }
  return false;
}

function findImproperClaimsInText(text, claims) {
  const failures = [];

  for (const segment of sentenceClaimSegments(text)) {
    for (const claim of claims) {
      const flags = claim.pattern.flags.includes("g")
        ? claim.pattern.flags
        : `${claim.pattern.flags}g`;
      const pattern = new RegExp(claim.pattern.source, flags);
      const matches = [...segment.text.matchAll(pattern)];
      for (const match of matches) {
        if (claimIsDirectlyNegatedOrProhibitive(segment.text, match[0], segment.context)) {
          continue;
        }
        failures.push(
          `positive or ambiguous ${claim.label}: ${normalize(segment.text).slice(0, 180)}`,
        );
      }
    }
  }

  return failures;
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

function checkGoldenHarnessBoundary(text) {
  const driftFailures = findImproperClaimsInText(text, prohibitedGoldenHarnessDriftClaims);
  const missingSeparation = requiredGoldenHarnessSeparationTerms.filter(
    (term) => !containsAll(text, [term]),
  );
  const failures = [
    ...driftFailures,
    ...missingSeparation.map((term) => `missing harness separation term: ${term}`),
  ];

  record(
    "CBE-GT-HARNESS",
    failures.length === 0,
    failures.length === 0
      ? "golden document keeps textual executable harnesses separate from future/inexistent harness, runtime, materialization, production, and automatic future promotion claims"
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
    const activeLocalPlan = hasImproperPositiveClaim(activeText, [
      {
        label: "local handoff substitution",
        pattern:
          /\b(local plan|reconstruct|proceeds with implementation|claims validation verdict ownership)\b/i,
      },
    ]);
    if (activeLocalPlan) {
      failures.push(`${id} converts missing handoff into local plan or owner substitution`);
    }
  }

  const documentText = parsed.sections.map((section) => section.text).join("\n\n");
  const positiveClaimPatterns = [
    { label: "runtime/materialization/prod", pattern: /\b(runtime\s+(pass|execution|agent runtime)|materialization\s+(pass|path)|production\s+(authorization|use|path|readiness))\b/i },
    { label: "fixture/generated report", pattern: /\b(fixtures?|generated\s+reports?)\b/i },
  ];

  const segments = sentenceClaimSegments(documentText);
  for (const segment of segments) {
    for (const claim of positiveClaimPatterns) {
      const flags = claim.pattern.flags.includes("g")
        ? claim.pattern.flags
        : `${claim.pattern.flags}g`;
      const pattern = new RegExp(claim.pattern.source, flags);
      const matches = [...segment.text.matchAll(pattern)];
      for (const match of matches) {
        if (claimIsDirectlyNegatedOrProhibitive(segment.text, match[0], segment.context)) {
          continue;
        }
        failures.push(`positive active ${claim.label} claim: ${normalize(segment.text).slice(0, 180)}`);
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
      const goldenText = readText(goldenDoc);
      checkGoldenHarnessBoundary(goldenText);
      const parsed = parseGoldenCases(goldenText);
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
