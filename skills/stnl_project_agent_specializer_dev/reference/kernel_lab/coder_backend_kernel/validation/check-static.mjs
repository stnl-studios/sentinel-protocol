#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const validationRoot = path.dirname(scriptPath);
const kernelRoot = path.resolve(validationRoot, "..");
const referenceRoot = path.resolve(kernelRoot, "..", "..");
const devSkillRoot = path.resolve(referenceRoot, "..");
const repoRoot = path.resolve(devSkillRoot, "..", "..");
const realRepoRoot = fs.realpathSync.native(repoRoot);

const ignoredNames = new Set(["__MACOSX", ".DS_Store"]);
const skippedWalkNames = new Set([".git", "node_modules", ...ignoredNames]);

const kernelPrefix =
  "skills/stnl_project_agent_specializer_dev/reference/kernel_lab/coder_backend_kernel";
const snapshotPath =
  "skills/stnl_project_agent_specializer_dev/reference/agents/coder-backend.agent.md";
const templatePath = "templates/agents/coder-backend.agent.md";

const kernelFiles = [
  "README.md",
  "contracts/CONTRACT.md",
  "contracts/BEHAVIOR_PARITY_SPINE.md",
  "contracts/MINIMUM_SAFE_BUNDLE.md",
  "contracts/BACKEND_EXECUTION_GATES.md",
  "validation/STATIC_CHECKS.md",
  "validation/GOLDEN_TESTS.md",
  "validation/check-static.mjs",
  "validation/check-golden.mjs",
];

const allowedKernelFileSet = new Set(kernelFiles);
const allowedKernelDirSet = new Set(["contracts", "validation"]);
const requiredPaths = [
  templatePath,
  snapshotPath,
  ...kernelFiles.map((relativePath) => `${kernelPrefix}/${relativePath}`),
];

const docs = {
  readme: `${kernelPrefix}/README.md`,
  contract: `${kernelPrefix}/contracts/CONTRACT.md`,
  parity: `${kernelPrefix}/contracts/BEHAVIOR_PARITY_SPINE.md`,
  bundle: `${kernelPrefix}/contracts/MINIMUM_SAFE_BUNDLE.md`,
  gates: `${kernelPrefix}/contracts/BACKEND_EXECUTION_GATES.md`,
  staticDoc: `${kernelPrefix}/validation/STATIC_CHECKS.md`,
  goldenDoc: `${kernelPrefix}/validation/GOLDEN_TESTS.md`,
};
const documentaryPaths = Object.values(docs);

const requiredPromotedStatusTerms = [
  "CLEAN_EXCELLENT_PASS",
  "documentary promotion applied",
  "documentary validation pass",
  "contractual pass",
  "minimum semantic pass",
  "hardened textual executable harness pass",
  "dev kernel lab only",
  "non-runtime",
  "non-production",
  "no materialization path",
];

const prohibitedResidualStatusClaims = [
  { label: "residual phase status", pattern: /\binitial\s+draft\b/i },
  { label: "residual phase status", pattern: /\bnot\s+promoted\b/i },
  { label: "residual phase status", pattern: /\bnot\s+a\s+clean\s+pass\b/i },
  { label: "residual phase status", pattern: /\bpending\s+hardened\s+harness\s+audit\b/i },
  { label: "residual phase status", pattern: /\bpending\s+promotion\s+evaluation\b/i },
  { label: "residual phase status", pattern: /\bpending\s+draft\s+audit\b/i },
  { label: "residual phase status", pattern: /\bpending\s+harness\s+design\b/i },
  { label: "residual phase status", pattern: /\bpending\s+harness\s+creation\b/i },
  {
    label: "static harness absence",
    pattern: /\b(?:there\s+is\s+)?no\s+`?validation\/check-static\.mjs`?\b/i,
  },
  {
    label: "golden harness absence",
    pattern: /\b(?:there\s+is\s+)?no\s+`?validation\/check-golden\.mjs`?\b/i,
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

const prohibitedLiteralResidualPatterns = [
  {
    label: "residual clean-pass proof denial",
    pattern: /\bdo(?:es)?\s+not\s+prove\s+`?CLEAN_EXCELLENT_PASS`?(?=$|[\s,.;:)\]])/i,
  },
];

const requiredHarnessBoundaryTerms = [
  "textual executable validation scripts",
  "validation/check-static.mjs",
  "validation/check-golden.mjs",
  "do not execute agent runtime",
  "do not authorize runtime execution",
  "do not authorize a runtime loader",
  "do not authorize materialization path",
  "do not authorize production use",
  "do not authorize productive-skill behavior or change",
  "do not authorize GitHub write",
  "do not authorize target repository write",
  "do not authorize target repo write",
  "do not produce generated reports",
  "do not create fixtures",
  "do not authorize target artifacts",
  "do not authorize active runtime adoption",
  "prove only documentary/dev kernel lab `CLEAN_EXCELLENT_PASS`",
  "active `MANIFEST.md` entry",
];

const allowlistDocPaths = [docs.readme, docs.bundle, docs.staticDoc, docs.goldenDoc];

const expectedReadmeBundleBullets = [
  "`README.md`;",
  "`contracts/CONTRACT.md`;",
  "`contracts/BEHAVIOR_PARITY_SPINE.md`;",
  "`contracts/MINIMUM_SAFE_BUNDLE.md`;",
  "`contracts/BACKEND_EXECUTION_GATES.md`;",
  "`validation/STATIC_CHECKS.md`;",
  "`validation/GOLDEN_TESTS.md`;",
  "`validation/check-static.mjs`;",
  "`validation/check-golden.mjs`.",
];

const exactInvalidHandoff = [
  "STATUS: BLOCKED",
  "REASON: required handoff missing or invalid",
  "NEXT_OWNER: orchestrator",
  "REQUEST: replay previous handoff or regenerate from owner",
].join("\n");

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

function statFileInsideRepo(relativePath) {
  const resolved = toRepoPath(relativePath);
  if (resolved.ignored) return null;
  const stats = fs.statSync(resolved.path);
  const realPath = realPathInsideRepo(resolved.path);
  return { stats, realPath };
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

function walkKernelEntries(relativePath) {
  const resolved = toRepoPath(relativePath);
  const rootReal = realPathInsideRepo(resolved.path);
  const entries = [];

  function visit(absolutePath) {
    for (const dirent of fs.readdirSync(absolutePath, { withFileTypes: true })) {
      if (skippedWalkNames.has(dirent.name)) continue;
      const child = path.join(absolutePath, dirent.name);
      const repoRelative = path
        .relative(rootReal, child)
        .replaceAll(path.sep, "/");

      if (dirent.isSymbolicLink()) {
        entries.push({ path: repoRelative, type: "symlink" });
      } else if (dirent.isDirectory()) {
        realPathInsideRepo(child);
        entries.push({ path: repoRelative, type: "directory" });
        visit(child);
      } else if (dirent.isFile()) {
        realPathInsideRepo(child);
        entries.push({ path: repoRelative, type: "file" });
      } else {
        entries.push({ path: repoRelative, type: "non-regular" });
      }
    }
  }

  visit(rootReal);
  return entries.sort((left, right) => left.path.localeCompare(right.path));
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

function containsAny(text, terms) {
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

function findImproperPositiveClaims(paths, claims) {
  const failures = [];
  for (const relativePath of paths) {
    const segments = sentenceClaimSegments(readText(relativePath));
    for (const segment of segments) {
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
            `${relativePath} has positive or ambiguous ${claim.label}: ${normalize(segment.text).slice(0, 180)}`,
          );
        }
      }
    }
  }
  return failures;
}

function findLiteralProhibitedPatterns(paths, claims) {
  const failures = [];
  for (const relativePath of paths) {
    const text = readText(relativePath);
    for (const claim of claims) {
      const flags = claim.pattern.flags.includes("g")
        ? claim.pattern.flags
        : `${claim.pattern.flags}g`;
      const pattern = new RegExp(claim.pattern.source, flags);
      for (const match of text.matchAll(pattern)) {
        failures.push(`${relativePath} contains ${claim.label}: ${normalize(match[0])}`);
      }
    }
  }
  return failures;
}

function parseMarkdownHeading(line) {
  const match = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
  if (!match) return null;
  return { level: match[1].length, title: match[2].trim() };
}

function extractMarkdownSectionLines(text, headingTitle, headingLevel) {
  const lines = text.split(/\r?\n/);
  const start = lines.findIndex((line) => {
    const heading = parseMarkdownHeading(line);
    return (
      heading &&
      heading.level === headingLevel &&
      heading.title.toLowerCase() === headingTitle.toLowerCase()
    );
  });

  if (start === -1) return null;

  const section = [];
  for (let index = start + 1; index < lines.length; index += 1) {
    const heading = parseMarkdownHeading(lines[index]);
    if (heading && heading.level <= headingLevel) break;
    section.push(lines[index]);
  }
  return section;
}

function readmeBundleSectionFailures() {
  const readme = readText(docs.readme);
  const section = extractMarkdownSectionLines(readme, "Bundle", 2);
  if (!section) return ["README.md missing ## Bundle section"];

  const bullets = section
    .map((line) => line.match(/^\s*[-*]\s+(.+?)\s*$/))
    .filter(Boolean)
    .map((match) => match[1].trim());
  const expectedSet = new Set(expectedReadmeBundleBullets);
  const counts = new Map();
  for (const bullet of bullets) {
    counts.set(bullet, (counts.get(bullet) || 0) + 1);
  }

  const failures = [];
  for (const expected of expectedReadmeBundleBullets) {
    const count = counts.get(expected) || 0;
    if (count === 0) {
      failures.push(`README.md ## Bundle missing required bullet: ${expected}`);
    } else if (count > 1) {
      failures.push(`README.md ## Bundle duplicates required bullet: ${expected}`);
    }
  }

  for (const bullet of bullets) {
    if (!expectedSet.has(bullet)) {
      failures.push(`README.md ## Bundle has extra bullet: ${bullet}`);
    }
  }

  return failures;
}

function checkRequiredFiles() {
  const failures = [];
  for (const relativePath of requiredPaths) {
    try {
      const file = statFileInsideRepo(relativePath);
      if (file && !file.stats.isFile()) {
        failures.push(`${relativePath} is not a regular file`);
      }
    } catch (error) {
      failures.push(`${relativePath}: ${error.message}`);
    }
  }

  record(
    "CBE-ST-001",
    failures.length === 0,
    failures.length === 0
      ? "canonical template, dev snapshot, and post-harness allowlisted files exist as regular files inside the repo"
      : failures.join("; "),
  );
}

function checkSnapshotParity() {
  const same = readBuffer(snapshotPath).equals(readBuffer(templatePath));
  record(
    "CBE-ST-002",
    same,
    same
      ? "dev snapshot matches canonical coder-backend template byte-for-byte"
      : "dev snapshot differs from canonical coder-backend template",
  );
}

function checkKernelAllowlist() {
  const entries = walkKernelEntries(kernelPrefix);
  const failures = [];

  for (const entry of entries) {
    if (entry.type === "directory") {
      if (!allowedKernelDirSet.has(entry.path)) {
        failures.push(`directory outside allowlist: ${entry.path}`);
      }
    } else if (entry.type === "file") {
      if (!allowedKernelFileSet.has(entry.path)) {
        failures.push(`file outside allowlist: ${entry.path}`);
      }
    } else {
      failures.push(`${entry.type} entry is not allowed: ${entry.path}`);
    }
  }

  for (const requiredFile of allowedKernelFileSet) {
    if (!entries.some((entry) => entry.type === "file" && entry.path === requiredFile)) {
      failures.push(`allowlisted file missing from tree: ${requiredFile}`);
    }
  }

  record(
    "CBE-ST-003",
    failures.length === 0,
    failures.length === 0
      ? "kernel tree exactly matches the post-harness allowlist"
      : failures.join("; "),
  );
}

function checkPromotedStatus() {
  const failures = [];
  for (const relativePath of documentaryPaths) {
    const lower = readText(relativePath).toLowerCase();
    for (const term of requiredPromotedStatusTerms) {
      if (!lower.includes(term.toLowerCase())) {
        failures.push(`${relativePath} missing promoted status term: ${term}`);
      }
    }
  }

  record(
    "CBE-ST-004",
    failures.length === 0,
    failures.length === 0
      ? "all primary documents declare CLEAN_EXCELLENT_PASS and dev-only non-runtime boundaries"
      : failures.join("; "),
  );
}

function checkResidualStatusWordingAbsent() {
  const driftFailures = findImproperPositiveClaims(
    documentaryPaths,
    prohibitedResidualStatusClaims,
  );
  const literalFailures = findLiteralProhibitedPatterns(
    documentaryPaths,
    prohibitedLiteralResidualPatterns,
  );
  const failures = [...driftFailures, ...literalFailures];

  record(
    "CBE-ST-013",
    failures.length === 0,
    failures.length === 0
      ? "all primary documents reject stale pre-promotion and phase-status wording"
      : failures.join("; "),
  );
}

function checkReadmeHarnessScripts() {
  const readme = readText(docs.readme);
  const missing = ["validation/check-static.mjs", "validation/check-golden.mjs"].filter(
    (relativePath) => !readme.includes(relativePath),
  );

  record(
    "CBE-ST-014",
    missing.length === 0,
    missing.length === 0
      ? "README.md lists both textual executable harness scripts"
      : `README.md missing harness script(s): ${missing.join(", ")}`,
  );
}

function checkPostHarnessAllowlistDocs() {
  const failures = readmeBundleSectionFailures();

  for (const relativePath of allowlistDocPaths) {
    const text = readText(relativePath);
    for (const kernelFile of kernelFiles) {
      if (!text.includes(kernelFile)) {
        failures.push(`${relativePath} missing post-harness allowlist file: ${kernelFile}`);
      }
    }
  }

  record(
    "CBE-ST-015",
    failures.length === 0,
    failures.length === 0
      ? "README ## Bundle, bundle, static checks, and golden tests recognize the exact nine-file post-harness allowlist"
      : failures.join("; "),
  );
}

function checkHarnessBoundaryDeclarations() {
  const failures = [];

  for (const relativePath of documentaryPaths) {
    const text = readText(relativePath);
    for (const term of requiredHarnessBoundaryTerms) {
      if (!containsAny(text, [term])) {
        failures.push(`${relativePath} missing harness boundary term: ${term}`);
      }
    }
  }

  record(
    "CBE-ST-016",
    failures.length === 0,
    failures.length === 0
      ? "all primary documents separate textual executable harnesses from runtime, materialization, production, writes, fixtures, reports, target artifacts, active adoption, and MANIFEST activation"
      : failures.join("; "),
  );
}

function checkImproperPositiveClaims() {
  const claimPatterns = [
    { label: "runtime pass", pattern: /\bruntime\s+(pass|implementation|loading|loader|validation|execution)\b/i },
    { label: "materialization pass", pattern: /\bmaterialization\s+(pass|path|output|route)\b/i },
    { label: "production authorization", pattern: /\bproduction\s+(authorization|use|path|readiness)\b/i },
    { label: "productive skill authorization", pattern: /\bproductive[-\s]skill\s+(authorization|behavior|change|changes)\b/i },
    { label: "GitHub write authorization", pattern: /\bGitHub\s+(write\s+authorization|writes?)\b/i },
    { label: "target repository write authorization", pattern: /\btarget[-\s]repository\s+(write\s+authorization|writes?|artifacts?|state|pass)\b/i },
    { label: "active runtime adoption", pattern: /\bactive\s+runtime\s+adoption\b/i },
    { label: "canonical template changes", pattern: /\bcanonical\s+template\s+(changes?|write\s+authorization)\b/i },
    { label: "active MANIFEST.md entry", pattern: /\bactive\s+`?MANIFEST\.md`?\s+entry\b/i },
  ];
  const failures = findImproperPositiveClaims(documentaryPaths, claimPatterns);

  record(
    "CBE-ST-005",
    failures.length === 0,
    failures.length === 0
      ? "positive runtime, materialization, production, GitHub, target-repo, adoption, template, and MANIFEST claims are negation-aware blocked"
      : failures.join("; "),
  );
}

function checkStructuralAnchors() {
  const anchorChecksByPath = [
    {
      path: snapshotPath,
      anchors: [
        "coder-backend",
        "agent_version: 2026.5.1",
        "targeted-local",
        "EXECUTION PACKAGE",
        "WORK_PACKAGE_ID",
        "EXECUTION BRIEF",
        "VALIDATION PACK",
        "READY",
        "BLOCKED",
        "stnl_backend_quality",
        "stnl_backend_sql_quality",
      ],
    },
    {
      path: docs.readme,
      anchors: [
        "coder-backend",
        "executor",
        "targeted-local",
        "EXECUTION PACKAGE",
        "WORK_PACKAGE_ID",
        "EXECUTION BRIEF",
        "VALIDATION PACK",
        "READY",
        "BLOCKED",
        "validation-runner.agent.md",
        "stnl_backend_quality",
        "stnl_backend_sql_quality",
      ],
    },
    {
      path: docs.contract,
      anchors: [
        "coder-backend",
        "executor",
        "targeted-local",
        "EXECUTION PACKAGE",
        "WORK_PACKAGE_ID",
        "EXECUTION BRIEF",
        "VALIDATION PACK",
        "READY",
        "BLOCKED",
        "NEXT_OWNER: orchestrator",
        "validation-runner.agent.md",
        "stnl_backend_quality",
        "stnl_backend_sql_quality",
      ],
    },
    {
      path: docs.parity,
      anchors: [
        "coder-backend",
        "agent_version: 2026.5.1",
        "targeted-local",
        "executor",
        "EXECUTION PACKAGE",
        "WORK_PACKAGE_ID",
        "EXECUTION BRIEF",
        "VALIDATION PACK",
        "READY",
        "BLOCKED",
        "stnl_backend_quality",
        "stnl_backend_sql_quality",
      ],
    },
    {
      path: docs.bundle,
      anchors: [
        "executor",
        "targeted-local",
        "EXECUTION PACKAGE",
        "WORK_PACKAGE_ID",
        "EXECUTION BRIEF",
        "VALIDATION PACK",
        "READY",
        "BLOCKED",
        "validation-runner.agent.md",
        "stnl_backend_quality",
        "stnl_backend_sql_quality",
      ],
    },
    {
      path: docs.gates,
      anchors: [
        "EXECUTION PACKAGE",
        "WORK_PACKAGE_ID",
        "EXECUTION BRIEF",
        "VALIDATION PACK",
        "READY",
        "BLOCKED",
        "NEXT_OWNER: orchestrator",
        "stnl_backend_quality",
        "stnl_backend_sql_quality",
      ],
    },
    {
      path: docs.staticDoc,
      anchors: [
        "coder-backend",
        "agent_version: 2026.5.1",
        "targeted-local",
        "executor",
        "EXECUTION PACKAGE",
        "WORK_PACKAGE_ID",
        "EXECUTION BRIEF",
        "VALIDATION PACK",
        "READY",
        "BLOCKED",
        "NEXT_OWNER: orchestrator",
        "validation-runner.agent.md",
        "stnl_backend_quality",
        "stnl_backend_sql_quality",
      ],
    },
    {
      path: docs.goldenDoc,
      anchors: [
        "EXECUTION PACKAGE",
        "WORK_PACKAGE_ID",
        "EXECUTION BRIEF",
        "VALIDATION PACK",
        "READY",
        "BLOCKED",
        "stnl_backend_quality",
        "stnl_backend_sql_quality",
      ],
    },
  ];
  const failures = [];

  for (const check of anchorChecksByPath) {
    const text = readText(check.path);
    for (const anchor of check.anchors) {
      if (!text.includes(anchor)) {
        failures.push(`${check.path} missing structural anchor: ${anchor}`);
      }
    }
  }

  record(
    "CBE-ST-006",
    failures.length === 0,
    failures.length === 0
      ? "required backend structural anchors are present in expected sources"
      : failures.join("; "),
  );
}

function checkInvalidHandoffShape() {
  const required = [docs.contract, docs.parity, docs.gates, docs.staticDoc];
  const missing = required.filter((relativePath) => !readText(relativePath).includes(exactInvalidHandoff));

  record(
    "CBE-ST-007",
    missing.length === 0,
    missing.length === 0
      ? "exact invalid required-handoff shape appears intact"
      : `exact invalid handoff missing from: ${missing.join(", ")}`,
  );
}

function checkDurableDocExclusions() {
  const checkedDocs = [docs.contract, docs.parity, docs.bundle, docs.gates, docs.staticDoc, docs.goldenDoc];
  const terms = ["Feature CONTEXT", "DONE", "ADR", "PLAN.md", "core", "units"];
  const failures = [];

  for (const term of terms) {
    if (!checkedDocs.some((relativePath) => readText(relativePath).includes(term))) {
      failures.push(`missing durable-doc exclusion: ${term}`);
    }
  }

  record(
    "CBE-ST-008",
    failures.length === 0,
    failures.length === 0
      ? "durable documentation exclusions are present"
      : failures.join("; "),
  );
}

function checkBackendExecutionGateCoverage() {
  const gates = readText(docs.gates);
  const checks = [
    ["API/schema drift", ["API And Schema Contract Drift Gate", "API/schema", "schema contract drift"]],
    ["auth/authz", ["Auth And Authorization Gate", "auth/authz"]],
    ["persistence", ["Persistence Gate"]],
    ["migration", ["Migration Gate"]],
    ["transaction", ["Transaction Gate"]],
    ["jobs/async", ["Jobs And Async Gate", "job, async"]],
    ["integration", ["Integration Gate"]],
    ["logs/secrets", ["Logs And Secrets Gate", "log/secret"]],
    ["bounded queries", ["Bounded Queries Gate", "bounded-query"]],
    ["cache", ["Cache Gate"]],
    ["rollout/backfill", ["Rollout And Backfill Gate", "rollout/backfill"]],
    ["external side effects inside transactions", ["External Side Effects Inside Transactions Gate", "side effects occur inside transactions"]],
    ["vendor leakage as derived refinement", ["Vendor Leakage Boundary Gate", "safety refinement derived"]],
    ["stnl_backend_quality", ["stnl_backend_quality"]],
    ["stnl_backend_sql_quality", ["stnl_backend_sql_quality"]],
    ["role drift", ["Drift Gates", "become planner"]],
  ];
  const failures = checks
    .filter(([, terms]) => !containsAny(gates, terms))
    .map(([label]) => `missing gate coverage: ${label}`);

  record(
    "CBE-ST-009",
    failures.length === 0,
    failures.length === 0
      ? "backend execution gates cover API, auth, persistence, migration, transaction, async, integration, secrets, query, cache, rollout, side-effect, vendor, guardrail, and drift risks"
      : failures.join("; "),
  );
}

function checkFrontendVocabularyBlocked() {
  const frontendClaims = [
    { label: "UI", pattern: /\bUI\b/ },
    { label: "UX", pattern: /\bUX\b/ },
    { label: "accessibility", pattern: /\baccessibility\b/i },
    { label: "responsive", pattern: /\bresponsive\b/i },
    { label: "routing", pattern: /\brouting\b/i },
    { label: "component state", pattern: /\bcomponent\s+state\b/i },
    { label: "designer handoff", pattern: /\bdesigner\s+handoff\b/i },
  ];
  const failures = findImproperPositiveClaims(documentaryPaths, frontendClaims);

  record(
    "CBE-ST-010",
    failures.length === 0,
    failures.length === 0
      ? "frontend vocabulary is absent or appears only in negated/prohibitive context"
      : failures.join("; "),
  );
}

function checkProhibitedArtifactsBlocked() {
  const pathPatterns = [
    /(^|\/)fixtures?(\/|$)/i,
    /(^|\/)generated[-_]?reports?(\/|$)/i,
    /(^|\/)runtime[-_]?loader(\/|\.|$)/i,
    /(^|\/)materializers?(\/|\.|$)/i,
    /(^|\/)materialization(\/|\.|$)/i,
    /(^|\/)target[-_]?artifacts?(\/|$)/i,
  ];
  const semanticClaims = [
    { label: "fixtures", pattern: /\bfixtures?\b/i },
    { label: "generated reports", pattern: /\bgenerated\s+reports?\b/i },
    { label: "runtime loader", pattern: /\bruntime\s+loader\b/i },
    { label: "materializer path", pattern: /\bmaterializer\s+paths?\b/i },
    { label: "materialization path", pattern: /\bmaterialization\s+paths?\b/i },
    { label: "target artifacts", pattern: /\btarget\s+artifacts?\b/i },
  ];
  const badEntries = walkKernelEntries(kernelPrefix)
    .map((entry) => entry.path)
    .filter((entry) => pathPatterns.some((pattern) => pattern.test(entry)));
  const semanticFailures = findImproperPositiveClaims(documentaryPaths, semanticClaims);
  const failures = [
    ...badEntries.map((entry) => `prohibited artifact path: ${entry}`),
    ...semanticFailures,
  ];

  record(
    "CBE-ST-011",
    failures.length === 0,
    failures.length === 0
      ? "fixtures, generated reports, runtime loader, materializer, materialization, and target artifacts are absent or negation-aware blocked"
      : failures.join("; "),
  );
}

function checkHandoffEvidencePreserved() {
  const contract = readText(docs.contract);
  const parity = readText(docs.parity);
  const gates = readText(docs.gates);
  const golden = readText(docs.goldenDoc);
  const ok =
    containsAll(contract, [
      "READY",
      "changed paths or equivalent implementation evidence",
      "checks run or honestly not run",
      "residual risk",
      "A positive handoff without applied implementation evidence is invalid.",
      "BLOCKED",
      "When required preparation handoff is missing or invalid",
    ]) &&
    containsAll(parity, [
      "READY",
      "changed paths or equivalent implementation evidence",
      "checks run are listed",
      "checks not run are honestly listed",
      "residual risk is explicit",
      "If these conditions are not met, `READY` is unsafe.",
      "`BLOCKED` is required",
    ]) &&
    containsAll(gates, [
      "READY",
      "changed paths or equivalent implementation evidence",
      "checks run",
      "checks not run and why",
      "residual risk",
      "completion claim without implementation evidence",
      "When required preparation handoff is missing or invalid",
    ]) &&
    containsAll(golden, [
      "READY",
      "implementation evidence",
      "checks",
      "residual risk",
      "missing or invalid",
      "BLOCKED",
    ]);

  record(
    "CBE-ST-012",
    ok,
    ok
      ? "READY evidence and required BLOCKED handoff evidence are preserved"
      : "handoff evidence requirements are incomplete",
  );
}

function emitAndExit() {
  const failed = results.filter((result) => !result.ok).length;
  const passed = results.length - failed;
  const write = failed > 0 ? console.error : console.log;

  write(`coder_backend_kernel static check: ${failed > 0 ? "FAIL" : "PASS"}`);
  for (const result of results) {
    write(`${result.ok ? "PASS" : "FAIL"} ${result.id}: ${result.message}`);
  }
  write(`Summary: ${passed} passed, ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
}

function main() {
  try {
    checkRequiredFiles();
    checkSnapshotParity();
    checkKernelAllowlist();
    checkPromotedStatus();
    checkResidualStatusWordingAbsent();
    checkReadmeHarnessScripts();
    checkPostHarnessAllowlistDocs();
    checkHarnessBoundaryDeclarations();
    checkImproperPositiveClaims();
    checkStructuralAnchors();
    checkInvalidHandoffShape();
    checkDurableDocExclusions();
    checkBackendExecutionGateCoverage();
    checkFrontendVocabularyBlocked();
    checkProhibitedArtifactsBlocked();
    checkHandoffEvidencePreserved();
  } catch (error) {
    record("CBE-ST-000", false, `unexpected error: ${error.message}`);
  }

  emitAndExit();
}

main();
