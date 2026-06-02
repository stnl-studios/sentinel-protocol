#!/usr/bin/env node
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
const skippedWalkNames = new Set([".git", "node_modules", ...ignoredNames]);
const draftStatus = "DRAFT_INITIAL_DESIGNER_KERNEL";
const finalPassToken = ["CLEAN", "EXCELLENT", "PASS"].join("_");

const kernelPrefix =
  "skills/stnl_project_agent_specializer_dev/reference/designer_kernel";
const snapshotPath =
  "skills/stnl_project_agent_specializer_dev/reference/agents/designer.agent.md";
const templatePath = "templates/agents/designer.agent.md";

const kernelFiles = [
  "README.md",
  "contracts/CONTRACT.md",
  "contracts/BEHAVIOR_PARITY_SPINE.md",
  "contracts/DESIGN_CONTRIBUTION_GATES.md",
  "contracts/MINIMUM_SAFE_BUNDLE.md",
  "validation/STATIC_CHECKS.md",
  "validation/GOLDEN_TESTS.md",
  "validation/check-static.mjs",
  "validation/check-golden.mjs",
];

const requiredPaths = [
  templatePath,
  snapshotPath,
  ...kernelFiles.map((relativePath) => `${kernelPrefix}/${relativePath}`),
];

const documentaryPaths = [
  `${kernelPrefix}/README.md`,
  `${kernelPrefix}/contracts/CONTRACT.md`,
  `${kernelPrefix}/contracts/BEHAVIOR_PARITY_SPINE.md`,
  `${kernelPrefix}/contracts/DESIGN_CONTRIBUTION_GATES.md`,
  `${kernelPrefix}/contracts/MINIMUM_SAFE_BUNDLE.md`,
  `${kernelPrefix}/validation/STATIC_CHECKS.md`,
  `${kernelPrefix}/validation/GOLDEN_TESTS.md`,
];

const sectionRequirements = [
  {
    id: "DSG-CH-005",
    path: `${kernelPrefix}/contracts/CONTRACT.md`,
    sections: [
      ["## Identity", ["designer", "2026.5.1", "design-contributor", "targeted-local"]],
      ["## Mission", ["practical UX direction", "real UX impact"]],
      ["## Output Contract", ["ephemeral", "UX Audit", "Interaction Spec", "Handoff Notes", "Design Review", "State Matrix"]],
    ],
    success: "contract identity and output modes are preserved",
  },
  {
    id: "DSG-CH-006",
    path: `${kernelPrefix}/contracts/DESIGN_CONTRIBUTION_GATES.md`,
    sections: [
      ["## Entry Gate", ["real UX impact", "user flow", "accessibility", "responsive", "visual consistency"]],
      ["## Classification Gate", ["orchestrator", "required", "advisory"]],
      ["## Advisory Bypass Gate", ["without design guessing", "execution and validation"]],
    ],
    success: "entry and classification gates preserve optional design contribution",
  },
  {
    id: "DSG-CH-007",
    path: `${kernelPrefix}/contracts/CONTRACT.md`,
    sections: [
      ["## Status Contract", ["READY", "deliberately difficult", "BLOCKED", "honest", "required", "advisory"]],
    ],
    success: "status contract preserves difficult READY and honest BLOCKED",
  },
  {
    id: "DSG-CH-008",
    path: `${kernelPrefix}/contracts/CONTRACT.md`,
    sections: [
      ["## Responsibility Boundaries", ["no `VALIDATION PACK` ownership", "no `EXECUTION PACKAGE` ownership", "no implementation", "no validation running", "no resync/finalization", "no durable docs"]],
    ],
    success: "responsibility boundaries reject role drift",
  },
  {
    id: "DSG-CH-009",
    path: `${kernelPrefix}/contracts/CONTRACT.md`,
    sections: [
      ["## Reading Contract", ["targeted-local", "affected interface", "avoid broad repository discovery"]],
    ],
    success: "reading contract remains targeted-local",
  },
];

const safePolarityTerms = [
  "must not",
  "do not",
  "does not",
  "no ",
  "reject",
  "rejected",
  "prohibit",
  "prohibited",
  "drift",
  "negative space",
  "fail if",
  "unsafe",
  "never means",
  "input shape",
  "expected blocker",
  "the designer output creates or owns",
  "the output edits",
  "the output writes",
  "not ",
  "without becoming",
  "without design guessing",
];

const dangerousTerms = [
  "VALIDATION PACK",
  "EXECUTION PACKAGE",
  "no implementation",
  "validation running",
  "tests passed",
  "validation passed",
  "implementation verified",
  "closed",
  "Feature CONTEXT",
  "DONE",
  "ADR",
  "PLAN.md",
  "resync",
  "finalization",
  "materialization",
  "durable docs",
];

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

function existsFile(relativePath) {
  const resolved = toRepoPath(relativePath);
  if (resolved.ignored) return true;
  try {
    const stats = fs.statSync(resolved.path);
    return stats.isFile() && Boolean(realPathInsideRepo(resolved.path));
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
  const rootReal = realPathInsideRepo(resolved.path);
  const entries = [];

  function visit(absolutePath) {
    for (const dirent of fs.readdirSync(absolutePath, { withFileTypes: true })) {
      if (skippedWalkNames.has(dirent.name)) continue;
      const child = path.join(absolutePath, dirent.name);
      realPathInsideRepo(child);
      const repoRelative = path
        .relative(rootReal, child)
        .replaceAll(path.sep, "/");
      if (dirent.isSymbolicLink()) {
        entries.push(`SYMLINK:${repoRelative}`);
      } else if (dirent.isDirectory()) {
        visit(child);
      } else if (dirent.isFile()) {
        entries.push(repoRelative);
      } else {
        entries.push(`NON_REGULAR:${repoRelative}`);
      }
    }
  }

  visit(rootReal);
  return entries.sort();
}

function normalize(text) {
  return text.toLowerCase().replace(/\s+/g, " ");
}

function hasAll(text, phrases) {
  const normalizedText = normalize(text);
  return phrases.every((phrase) => normalizedText.includes(normalize(phrase)));
}

function sectionFor(text, heading) {
  const start = text.indexOf(heading);
  if (start === -1) return "";
  const next = text.indexOf("\n## ", start + heading.length);
  return text.slice(start, next === -1 ? text.length : next);
}

function occurrences(text, term) {
  const indexes = [];
  const lowerText = text.toLowerCase();
  const lowerTerm = term.toLowerCase();
  let cursor = 0;
  while ((cursor = lowerText.indexOf(lowerTerm, cursor)) !== -1) {
    indexes.push(cursor);
    cursor += lowerTerm.length;
  }
  return indexes;
}

function hasSafePolarity(text, term) {
  return occurrences(text, term).every((index) => {
    const paragraphStart = text.lastIndexOf("\n\n", index);
    const paragraphEnd = text.indexOf("\n\n", index + term.length);
    const paragraph = text
      .slice(
        paragraphStart === -1 ? 0 : paragraphStart + 2,
        paragraphEnd === -1 ? text.length : paragraphEnd,
      )
      .toLowerCase();
    return safePolarityTerms.some((marker) => paragraph.includes(marker));
  });
}

function result(id, failures, success) {
  if (failures.length === 0) {
    console.log(`${id} PASS ${success}`);
    return true;
  }
  for (const failure of failures) console.error(`${id} FAIL ${failure}`);
  return false;
}

let ok = true;

{
  const failures = requiredPaths.filter((relativePath) => !existsFile(relativePath));
  ok = result("DSG-CH-001", failures, "required files present") && ok;
}

{
  const failures = [];
  if (
    existsFile(templatePath) &&
    existsFile(snapshotPath) &&
    !readBuffer(templatePath).equals(readBuffer(snapshotPath))
  ) {
    failures.push("local snapshot is not a byte-for-byte copy of source template");
  }
  ok = result("DSG-CH-002", failures, "snapshot matches source template") && ok;
}

{
  const actual = walk(kernelPrefix);
  const expected = [...kernelFiles].sort();
  const failures = [];
  for (const file of actual) {
    if (!expected.includes(file)) failures.push(`unexpected kernel file ${file}`);
  }
  for (const file of expected) {
    if (!actual.includes(file)) failures.push(`missing kernel file ${file}`);
  }
  ok = result("DSG-CH-003", failures, "kernel file allowlist is exact") && ok;
}

{
  const failures = [];
  for (const relativePath of documentaryPaths) {
    const text = readText(relativePath);
    if (!text.includes(draftStatus)) {
      failures.push(`${relativePath} missing ${draftStatus}`);
    }
    if (text.includes(finalPassToken)) {
      failures.push(`${relativePath} contains prohibited final pass token`);
    }
  }
  ok = result("DSG-CH-004", failures, "documentary files keep draft status") && ok;
}

for (const requirement of sectionRequirements) {
  const text = readText(requirement.path);
  const failures = [];
  for (const [heading, phrases] of requirement.sections) {
    const section = sectionFor(text, heading);
    if (!section) {
      failures.push(`${requirement.path} missing section ${heading}`);
      continue;
    }
    if (!hasAll(section, phrases)) {
      failures.push(`${requirement.path} section ${heading} missing semantic evidence`);
    }
  }
  ok = result(requirement.id, failures, requirement.success) && ok;
}

{
  const text = documentaryPaths.map(readText).join("\n");
  const failures = [];
  for (const term of dangerousTerms) {
    if (!text.toLowerCase().includes(term.toLowerCase())) {
      failures.push(`deny-list evidence missing ${term}`);
      continue;
    }
    if (!hasSafePolarity(text, term)) {
      failures.push(`unsafe permissive context found for ${term}`);
    }
  }
  ok = result("DSG-CH-010", failures, "dangerous terms appear only with safe polarity") && ok;
}

{
  const goldenText = readText(`${kernelPrefix}/validation/GOLDEN_TESTS.md`);
  const failures = [];
  for (let number = 1; number <= 10; number += 1) {
    const id = `DSG-GT-${String(number).padStart(3, "0")}`;
    if (!goldenText.includes(`## Golden Test ${id}`)) {
      failures.push(`golden documentation missing ${id}`);
    }
  }
  ok = result("DSG-CH-011", failures, "golden documentation declares ten scenarios") && ok;
}

{
  const fixtureText = readText(`${kernelPrefix}/validation/check-golden.mjs`);
  const requiredTerms = [
    "negativeFixtures",
    "classifyNegativeFixture",
    "BLOCKED_DSG_NO_UX_IMPACT_READY",
    "BLOCKED_DSG_PLANNER_DRIFT",
    "BLOCKED_DSG_VALIDATION_PACK_OWNERSHIP",
    "BLOCKED_DSG_EXECUTION_PACKAGE_OWNERSHIP",
    "BLOCKED_DSG_IMPLEMENTATION_OR_RUNNER_DRIFT",
    "BLOCKED_DSG_DURABLE_DOCS_OR_CLOSURE",
    "BLOCKED_DSG_BROAD_REDESIGN_NOT_ESCALATED",
  ];
  const failures = requiredTerms
    .filter((term) => !fixtureText.includes(term))
    .map((term) => `golden harness missing ${term}`);
  ok = result("DSG-CH-012", failures, "golden harness declares negative fixture classes") && ok;
}

if (!ok) process.exit(1);
