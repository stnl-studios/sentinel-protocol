#!/usr/bin/env node
import childProcess from "node:child_process";
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

const kernelPrefix =
  "skills/stnl_project_agent_specializer_dev/reference/kernel_lab/coder_frontend_kernel";
const goldenDoc = `${kernelPrefix}/validation/GOLDEN_TESTS.md`;
const docs = {
  contract: `${kernelPrefix}/contracts/CONTRACT.md`,
  parity: `${kernelPrefix}/contracts/BEHAVIOR_PARITY_SPINE.md`,
  bundle: `${kernelPrefix}/contracts/MINIMUM_SAFE_BUNDLE.md`,
  gates: `${kernelPrefix}/contracts/FRONTEND_EXECUTION_GATES.md`,
  goldenDoc,
};

const requiredCaseIds = Array.from({ length: 16 }, (_, index) =>
  `CFE-GT-${String(index).padStart(3, "0")}`,
);

const requiredCaseHeadings = [
  "### Objective",
  "### Input shape",
  "### Expected behavior",
  "### Fail condition",
  "### Expected blocker",
];

const requiredTermsByCase = new Map([
  ["CFE-GT-000", [["READY"], ["changed paths"], ["checks"], ["residual risk"], ["stnl_frontend_quality"]]],
  ["CFE-GT-001", [["EXECUTION PACKAGE"], ["BLOCKED"], ["NEXT_OWNER: orchestrator"]]],
  ["CFE-GT-002", [["WORK_PACKAGE_ID"], ["BLOCKED"]]],
  ["CFE-GT-003", [["EXECUTION BRIEF"], ["BLOCKED"]]],
  ["CFE-GT-004", [["VALIDATION PACK"], ["BLOCKED"]]],
  ["CFE-GT-005", [["edit capability"], ["BLOCKED"]]],
  ["CFE-GT-006", [["read-only"], ["BLOCKED"]]],
  ["CFE-GT-007", [["planner"], ["BLOCKED"]]],
  ["CFE-GT-008", [["designer.agent.md"], ["design owner"], ["BLOCKED"]]],
  ["CFE-GT-009", [["validation-runner"], ["verdict"], ["BLOCKED"]]],
  ["CFE-GT-010", [["Feature CONTEXT"], ["DONE"], ["ADR"], ["PLAN.md"], ["BLOCKED"]]],
  ["CFE-GT-011", [["designer.agent.md"], ["UX"], ["BLOCKED"]]],
  ["CFE-GT-012", [["READY"], ["implementation evidence"], ["BLOCKED"]]],
  ["CFE-GT-013", [["checks"], ["final validation verdict"]]],
  ["CFE-GT-014", [["stnl_frontend_quality"], ["BLOCKED"]]],
  ["CFE-GT-015", [["authorized package"], ["scope"], ["BLOCKED"]]],
]);

const passes = [];
const failures = [];

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

function record(id, ok, message) {
  if (ok) {
    passes.push(`${id}: ${message}`);
  } else {
    failures.push(`${id}: ${message}`);
  }
}

function runStaticPrecondition() {
  const staticScript = path.join(validationRoot, "check-static.mjs");
  const result = childProcess.spawnSync(
    process.execPath,
    [staticScript],
    {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  if (result.status !== 0) {
    failures.push(
      [
        "CFE-GT-000-PRE: static precondition failed",
        result.stdout.trim(),
        result.stderr.trim(),
      ]
        .filter(Boolean)
        .join("\n"),
    );
    return false;
  }
  passes.push("CFE-GT-000-PRE: static precondition passed");
  return true;
}

function extractCase(text, id) {
  return parseGoldenCases(text).sections.find((section) => section.id === id) ?? null;
}

function parseGoldenCases(text) {
  const caseHeadingPattern = /^## (CFE-GT-\d{3}) - .*$/gm;
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

function checkGoldenCaseFormat() {
  const text = readText(goldenDoc);
  const { headings, sections } = parseGoldenCases(text);
  const foundIds = headings.map((heading) => heading.id);
  const seenIds = new Set();
  const duplicateIds = [];
  const missingCases = requiredCaseIds.filter((id) => !foundIds.includes(id));
  const unexpectedCases = foundIds.filter((id) => !requiredCaseIds.includes(id));
  const orderMatches =
    foundIds.length === requiredCaseIds.length &&
    requiredCaseIds.every((id, index) => foundIds[index] === id);
  const malformed = [];

  for (const id of foundIds) {
    if (seenIds.has(id)) duplicateIds.push(id);
    seenIds.add(id);
  }

  for (const section of sections.filter((item) => requiredCaseIds.includes(item.id))) {
    const headingPositions = requiredCaseHeadings.map((heading) => ({
      heading,
      positions: [...section.text.matchAll(new RegExp(`^${heading}$`, "gm"))].map(
        (match) => match.index,
      ),
    }));
    const missingHeadings = headingPositions
      .filter((item) => item.positions.length === 0)
      .map((item) => item.heading);
    const duplicateHeadings = headingPositions
      .filter((item) => item.positions.length > 1)
      .map((item) => item.heading);
    const presentPositions = headingPositions
      .filter((item) => item.positions.length > 0)
      .map((item) => item.positions[0]);
    const headingsInOrder = presentPositions.every(
      (position, index) => index === 0 || position > presentPositions[index - 1],
    );

    if (
      missingHeadings.length > 0 ||
      duplicateHeadings.length > 0 ||
      !headingsInOrder
    ) {
      malformed.push(
        [
          `${section.id}`,
          missingHeadings.length ? `missing ${missingHeadings.join(", ")}` : "",
          duplicateHeadings.length
            ? `duplicate ${duplicateHeadings.join(", ")}`
            : "",
          !headingsInOrder ? "headings out of order" : "",
        ]
          .filter(Boolean)
          .join(" "),
      );
    }
  }

  const ok =
    duplicateIds.length === 0 &&
    missingCases.length === 0 &&
    unexpectedCases.length === 0 &&
    orderMatches &&
    malformed.length === 0;

  record(
    "CFE-GT-001",
    ok,
    ok
      ? "all 16 golden cases are unique, complete, ordered, and use ordered required headings"
      : [
          duplicateIds.length ? `duplicate case IDs: ${duplicateIds.join(", ")}` : "",
          missingCases.length ? `missing cases: ${missingCases.join(", ")}` : "",
          unexpectedCases.length
            ? `unexpected cases: ${unexpectedCases.join(", ")}`
            : "",
          !orderMatches
            ? `case order is not exact: expected ${requiredCaseIds.join(", ")}`
            : "",
          malformed.length ? `malformed cases: ${malformed.join("; ")}` : "",
        ]
          .filter(Boolean)
          .join("; "),
  );
}

function checkGoldenCaseMinimumTerms() {
  const text = readText(goldenDoc);
  const missing = [];

  for (const id of requiredCaseIds) {
    const section = extractCase(text, id);
    if (!section) {
      continue;
    }
    for (const group of requiredTermsByCase.get(id) ?? []) {
      if (!hasAny(section.text, group)) {
        missing.push(`${id} missing [${group.join(" | ")}]`);
      }
    }
  }

  record(
    "CFE-GT-004",
    missing.length === 0,
    missing.length === 0
      ? "each golden case contains its required minimum terms"
      : missing.join("; "),
  );
}

function hasAny(text, terms) {
  return terms.some((term) => text.includes(term));
}

function checkGroup(label, file, groups) {
  const text = readText(file);
  const missing = [];
  for (const group of groups) {
    if (!hasAny(text, group)) missing.push(`[${group.join(" | ")}]`);
  }
  return missing.length === 0 ? null : `${label}: ${missing.join(", ")}`;
}

function checkSemanticAnchors() {
  const checks = [
    checkGroup("required handoffs block", docs.contract, [
      ["EXECUTION PACKAGE"],
      ["WORK_PACKAGE_ID"],
      ["EXECUTION BRIEF"],
      ["VALIDATION PACK"],
      ["If required input is absent", "Return `BLOCKED` when"],
      ["required handoff missing or invalid"],
    ]),
    checkGroup("edit capability and read-only block", docs.contract, [
      ["edit capability"],
      ["execution capability"],
      ["only allows read or analysis", "environment only allows read"],
      ["BLOCKED"],
    ]),
    checkGroup("role drift is prohibited", docs.contract, [
      ["must not become planner"],
      ["must not become designer"],
      ["must not become validation-eval-designer"],
      ["must not become execution-package-designer"],
      ["must not become validation-runner", "must not become validation-runner or reviewer"],
      ["no validation verdict of record"],
    ]),
    checkGroup("durable docs are prohibited", docs.contract, [
      ["no durable docs"],
      ["Feature CONTEXT"],
      ["DONE"],
      ["ADR"],
      ["PLAN.md"],
      ["core"],
      ["units"],
    ]),
    checkGroup("READY requires evidence", docs.parity, [
      ["`READY` requires all relevant evidence"],
      ["real implementation was applied"],
      ["changed paths or equivalent implementation evidence"],
      ["checks run"],
      ["residual risk"],
      ["If these conditions are not met, `READY` is unsafe."],
    ]),
    checkGroup("local checks are not final verdict", docs.contract, [
      ["checks run"],
      ["no validation verdict of record"],
      ["no replacement of runner or reviewer outputs"],
    ]),
    checkGroup("front-end guardrail is mandatory", docs.gates, [
      ["stnl_frontend_quality"],
      ["binding structural guardrail", "package-level front-end quality guardrail"],
      ["Fail when safe completion would require violating `stnl_frontend_quality`"],
    ]),
    checkGroup("scope outside package blocks", docs.contract, [
      ["authorized package boundary"],
      ["change only what is required"],
      ["broad refactors", "architecture rewrites"],
      ["authorized package", "front-end cut safely"],
    ]),
    checkGroup("designer direction is consumed but not owned", docs.gates, [
      ["designer.agent.md"],
      ["becoming the design owner"],
      ["inventing user flow", "product intent"],
    ]),
  ].filter(Boolean);

  record(
    "CFE-GT-002",
    checks.length === 0,
    checks.length === 0
      ? "semantic anchors are covered by equivalent contract groups"
      : checks.join("; "),
  );
}

function checkGoldenDocCaseAnchors() {
  const text = readText(goldenDoc);
  const requiredAnchors = [
    "CFE-GT-000",
    "CFE-GT-001",
    "CFE-GT-002",
    "CFE-GT-003",
    "CFE-GT-004",
    "CFE-GT-005",
    "CFE-GT-006",
    "CFE-GT-007",
    "CFE-GT-008",
    "CFE-GT-009",
    "CFE-GT-010",
    "CFE-GT-011",
    "CFE-GT-012",
    "CFE-GT-013",
    "CFE-GT-014",
    "CFE-GT-015",
    "EXECUTION PACKAGE",
    "WORK_PACKAGE_ID",
    "EXECUTION BRIEF",
    "VALIDATION PACK",
    "edit capability",
    "read-only",
    "planner",
    "designer",
    "validation-runner",
    "durable documentation",
    "READY",
    "implementation evidence",
    "final validation verdict",
    "stnl_frontend_quality",
    "authorized package",
  ];
  const missing = requiredAnchors.filter((anchor) => !text.includes(anchor));
  record(
    "CFE-GT-003",
    missing.length === 0,
    missing.length === 0
      ? "golden test document covers all required scenario anchors"
      : `golden test document missing anchors: ${missing.join(", ")}`,
  );
}

function main() {
  try {
    if (runStaticPrecondition()) {
      checkGoldenCaseFormat();
      checkSemanticAnchors();
      checkGoldenDocCaseAnchors();
      checkGoldenCaseMinimumTerms();
    }
  } catch (error) {
    failures.push(`CFE-GT-000: unexpected error: ${error.message}`);
  }

  if (failures.length > 0) {
    console.error("coder_frontend_kernel golden check: FAIL");
    for (const failure of failures) console.error(`FAIL ${failure}`);
    console.error(`Summary: ${passes.length} passed, ${failures.length} failed`);
    process.exit(1);
  }

  console.log("coder_frontend_kernel golden check: PASS");
  for (const pass of passes) console.log(`PASS ${pass}`);
  console.log(`Summary: ${passes.length} passed, 0 failed`);
}

main();
