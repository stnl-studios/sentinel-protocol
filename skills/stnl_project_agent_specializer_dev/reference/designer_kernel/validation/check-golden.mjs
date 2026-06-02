#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";
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
  "skills/stnl_project_agent_specializer_dev/reference/designer_kernel";
const staticHarnessPath = path.join(validationRoot, "check-static.mjs");
const goldenDocPath = `${kernelPrefix}/validation/GOLDEN_TESTS.md`;
const snapshotPath =
  "skills/stnl_project_agent_specializer_dev/reference/agents/designer.agent.md";
const contractPaths = [
  `${kernelPrefix}/contracts/CONTRACT.md`,
  `${kernelPrefix}/contracts/BEHAVIOR_PARITY_SPINE.md`,
  `${kernelPrefix}/contracts/DESIGN_CONTRIBUTION_GATES.md`,
  `${kernelPrefix}/contracts/MINIMUM_SAFE_BUNDLE.md`,
];

const goldenTests = [
  {
    id: "DSG-GT-001",
    title: "Required design contribution reaches READY",
    blocker: "BLOCKED_DSG_READY_WITHOUT_DESIGN_EVIDENCE",
    sections: {
      "### Objective": ["required", "real UX impact", "READY"],
      "### Input shape": [
        "required",
        "user-facing flow change",
        "visible states",
        "accessibility",
        "responsive impact",
      ],
      "### Expected behavior": [
        "current patterns",
        "practical direction",
        "states and edge cases",
        "accessibility",
        "responsive expectations",
        "handoff cues",
      ],
      "### Fail condition": [
        "READY",
        "real UX impact",
        "current surface evidence",
        "states",
        "accessibility",
        "responsive behavior",
        "downstream handoff cues",
      ],
    },
  },
  {
    id: "DSG-GT-002",
    title: "Advisory contribution remains bypassable only when safe",
    blocker: "BLOCKED_DSG_ADVISORY_TREATED_AS_MANDATORY",
    sections: {
      "### Objective": ["advisory", "mandatory phase"],
      "### Input shape": ["advisory", "not required", "honest execution or validation"],
      "### Expected behavior": [
        "orchestrator decides continuation",
        "bypass is allowed only",
        "without design guessing",
        "must not turn advisory",
      ],
      "### Fail condition": [
        "designer decides round continuation",
        "forces a mandatory design phase",
      ],
    },
  },
  {
    id: "DSG-GT-003",
    title: "No real UX impact does not enter",
    blocker: "BLOCKED_DSG_NO_UX_IMPACT_READY",
    sections: {
      "### Objective": ["pure non-interface work", "design phase"],
      "### Input shape": ["backend", "infra", "schema", "no meaningful user-facing ambiguity"],
      "### Expected behavior": ["no-entry", "no real UX impact", "orchestrator"],
      "### Fail condition": ["READY", "no real UX impact"],
    },
  },
  {
    id: "DSG-GT-004",
    title: "Required missing context blocks honestly",
    blocker: "BLOCKED_DSG_REQUIRED_CONTEXT_GUESSED",
    sections: {
      "### Objective": ["required", "blocks", "unclear"],
      "### Input shape": ["required", "affected surface", "current pattern", "product intent"],
      "### Expected behavior": ["BLOCKED", "missing fact or decision", "orchestrator or DEV"],
      "### Fail condition": ["invents product intent", "current UI reality", "state behavior"],
    },
  },
  {
    id: "DSG-GT-005",
    title: "Planner drift is rejected",
    blocker: "BLOCKED_DSG_PLANNER_DRIFT",
    sections: {
      "### Objective": ["does not become planner"],
      "### Input shape": [
        "rewrites scope",
        "chooses a new cut",
        "owns operational planning",
        "replaces `EXECUTION BRIEF`",
      ],
      "### Expected behavior": ["Reject planner drift", "orchestrator or DEV"],
      "### Fail condition": ["broad planning behavior", "designer output"],
    },
  },
  {
    id: "DSG-GT-006",
    title: "VALIDATION PACK ownership drift is rejected",
    blocker: "BLOCKED_DSG_VALIDATION_PACK_OWNERSHIP",
    sections: {
      "### Objective": ["validation-eval-designer"],
      "### Input shape": [
        "`VALIDATION PACK`",
        "validation sufficiency",
        "persists validation pack content",
      ],
      "### Expected behavior": [
        "Reject validation ownership drift",
        "`validation-eval-designer`",
      ],
      "### Fail condition": ["`VALIDATION PACK` ownership", "designer behavior"],
    },
  },
  {
    id: "DSG-GT-007",
    title: "EXECUTION PACKAGE ownership drift is rejected",
    blocker: "BLOCKED_DSG_EXECUTION_PACKAGE_OWNERSHIP",
    sections: {
      "### Objective": ["execution-package-designer"],
      "### Input shape": [
        "`EXECUTION PACKAGE`",
        "package readiness",
        "coder prompt",
        "implementation order",
      ],
      "### Expected behavior": ["Reject execution package drift", "`coder-frontend`"],
      "### Fail condition": ["`EXECUTION PACKAGE` ownership", "designer behavior"],
    },
  },
  {
    id: "DSG-GT-008",
    title: "Implementation and validation running are rejected",
    blocker: "BLOCKED_DSG_IMPLEMENTATION_OR_RUNNER_DRIFT",
    sections: {
      "### Objective": ["coder", "validation-runner"],
      "### Input shape": [
        "edits code",
        "writes files",
        "runs tests",
        "validation passed",
        "implementation verified",
      ],
      "### Expected behavior": ["Reject implementation", "validation running drift", "validation cues only"],
      "### Fail condition": ["implementation", "validation running", "runner verdicts"],
    },
  },
  {
    id: "DSG-GT-009",
    title: "Durable docs and resync/finalization are rejected",
    blocker: "BLOCKED_DSG_DURABLE_DOCS_OR_CLOSURE",
    sections: {
      "### Objective": ["durable documentation owner", "finalizer", "resync"],
      "### Input shape": [
        "durable docs",
        "`Feature CONTEXT`",
        "`DONE`",
        "resync/finalization",
        "materializes target artifacts",
      ],
      "### Expected behavior": [
        "Reject durable docs",
        "closure",
        "resync/finalization",
        "materialization drift",
      ],
      "### Fail condition": ["durable documentation", "closure", "resync", "materialization behavior"],
    },
  },
  {
    id: "DSG-GT-010",
    title: "Broad redesign escalates to DEV",
    blocker: "BLOCKED_DSG_BROAD_REDESIGN_NOT_ESCALATED",
    sections: {
      "### Objective": ["product-wide redesign", "round-level handoff"],
      "### Input shape": [
        "new shared pattern",
        "broad navigation change",
        "product intent decision",
        "multiple valid directions",
      ],
      "### Expected behavior": ["BLOCKED", "DEV-owned decision", "avoids inventing a redesign"],
      "### Fail condition": ["broad redesign", "product decision", "local design contribution"],
    },
  },
];

const negativeFixtures = [
  {
    id: "DSG-NF-001",
    title: "READY for no-entry UX impact",
    expectedBlockers: ["BLOCKED_DSG_NO_UX_IMPACT_READY"],
    inputs: [
      `STATUS: READY
Classification: advisory
Work: backend schema migration only.
UX impact: none.
Design output: looks fine.`,
      `STATUS: READY
Classification: required
Work: pure backend contract update with no meaningful user-facing ambiguity.
Design output: no-entry was skipped and READY was claimed.`,
    ],
  },
  {
    id: "DSG-NF-002",
    title: "Planner drift",
    expectedBlockers: ["BLOCKED_DSG_PLANNER_DRIFT"],
    inputs: [
      `Designer output:
- I will choose a new cut and rewrite scope.
- Replace the EXECUTION BRIEF.
- I own operational planning for the round.`,
    ],
  },
  {
    id: "DSG-NF-003",
    title: "Validation ownership drift",
    expectedBlockers: ["BLOCKED_DSG_VALIDATION_PACK_OWNERSHIP"],
    inputs: [
      `Designer output:
- VALIDATION PACK is complete and sufficient.
- I decide validation sufficiency and persist validation pack content.
- I replace proof-design ownership.`,
    ],
  },
  {
    id: "DSG-NF-004",
    title: "Execution package ownership drift",
    expectedBlockers: ["BLOCKED_DSG_EXECUTION_PACKAGE_OWNERSHIP"],
    inputs: [
      `Designer output:
- EXECUTION PACKAGE is ready.
- Package readiness is approved.
- I provide the coder prompt, executor-owned file list, and implementation order.`,
    ],
  },
  {
    id: "DSG-NF-005",
    title: "Implementation and runner drift",
    expectedBlockers: ["BLOCKED_DSG_IMPLEMENTATION_OR_RUNNER_DRIFT"],
    inputs: [
      `Designer output:
- Edited code and wrote files.
- Ran tests; tests passed.
- Validation passed and implementation verified.`,
    ],
  },
  {
    id: "DSG-NF-006",
    title: "Durable docs and closure drift",
    expectedBlockers: [
      "BLOCKED_DSG_DURABLE_DOCS_OR_CLOSURE",
    ],
    inputs: [
      `Designer output:
- Updated Feature CONTEXT, DONE, ADR, and PLAN.md.
- CLOSED the round and performed resync/finalization with materialization.`,
    ],
  },
  {
    id: "DSG-NF-007",
    title: "Broad redesign without DEV",
    expectedBlockers: ["BLOCKED_DSG_BROAD_REDESIGN_NOT_ESCALATED"],
    inputs: [
      `Designer output:
- Replace the local interface with a product-wide navigation redesign.
- Multiple product directions exist and I pick one without DEV.
- A new shared pattern is introduced without DEV-owned decision.`,
    ],
  },
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

function readText(relativePath) {
  if (hasIgnoredPart(relativePath)) return "";
  const absolutePath = path.resolve(repoRoot, relativePath);
  if (!isInside(absolutePath, repoRoot)) {
    throw new Error(`path escapes repo: ${relativePath}`);
  }
  const realPath = fs.realpathSync.native(absolutePath);
  if (!isInside(realPath, realRepoRoot)) {
    throw new Error(`path escapes repo after realpath: ${relativePath}`);
  }
  return fs.readFileSync(realPath, "utf8");
}

function normalize(text) {
  return text.toLowerCase().replace(/\s+/g, " ");
}

function hasAll(text, phrases) {
  const normalizedText = normalize(text);
  return phrases.every((phrase) => normalizedText.includes(normalize(phrase)));
}

function hasAnyPhraseSet(text, phraseSets) {
  return phraseSets.some((phrases) => hasAll(text, phrases));
}

function sectionFor(text, id) {
  const marker = `## Golden Test ${id}`;
  const start = text.indexOf(marker);
  if (start === -1) return "";
  const next = text.indexOf("\n## Golden Test ", start + marker.length);
  return text.slice(start, next === -1 ? text.length : next);
}

function subsectionFor(section, heading) {
  const start = section.indexOf(heading);
  if (start === -1) return "";
  const next = section.indexOf("\n### ", start + heading.length);
  return section.slice(start, next === -1 ? section.length : next);
}

function classifyNegativeFixture(input) {
  const blockers = [];

  const rules = [
    {
      blocker: "BLOCKED_DSG_NO_UX_IMPACT_READY",
      phraseSets: [
        ["STATUS: READY", "backend schema migration only", "UX impact: none"],
        ["STATUS: READY", "pure backend contract update", "no meaningful user-facing ambiguity"],
      ],
    },
    {
      blocker: "BLOCKED_DSG_PLANNER_DRIFT",
      phraseSets: [
        ["choose a new cut", "rewrite scope"],
        ["Replace the EXECUTION BRIEF"],
        ["own operational planning"],
      ],
    },
    {
      blocker: "BLOCKED_DSG_VALIDATION_PACK_OWNERSHIP",
      phraseSets: [
        ["VALIDATION PACK is complete", "validation sufficiency"],
        ["persist validation pack content"],
        ["replace proof-design ownership"],
      ],
    },
    {
      blocker: "BLOCKED_DSG_EXECUTION_PACKAGE_OWNERSHIP",
      phraseSets: [
        ["EXECUTION PACKAGE is ready", "Package readiness"],
        ["coder prompt", "executor-owned file list"],
        ["implementation order"],
      ],
    },
    {
      blocker: "BLOCKED_DSG_IMPLEMENTATION_OR_RUNNER_DRIFT",
      phraseSets: [
        ["Edited code", "wrote files"],
        ["Ran tests", "tests passed"],
        ["Validation passed", "implementation verified"],
      ],
    },
    {
      blocker: "BLOCKED_DSG_DURABLE_DOCS_OR_CLOSURE",
      phraseSets: [
        ["Updated Feature CONTEXT", "DONE"],
        ["ADR", "PLAN.md"],
        ["CLOSED the round"],
        ["resync/finalization", "materialization"],
      ],
    },
    {
      blocker: "BLOCKED_DSG_BROAD_REDESIGN_NOT_ESCALATED",
      phraseSets: [
        ["product-wide navigation redesign", "without DEV"],
        ["Multiple product directions", "I pick one without DEV"],
        ["new shared pattern", "without DEV-owned decision"],
      ],
    },
  ];

  for (const rule of rules) {
    if (hasAnyPhraseSet(input, rule.phraseSets)) blockers.push(rule.blocker);
  }

  return blockers;
}

const staticResult = spawnSync(process.execPath, [staticHarnessPath], {
  cwd: repoRoot,
  encoding: "utf8",
});

if (staticResult.status !== 0) {
  process.stderr.write(staticResult.stdout);
  process.stderr.write(staticResult.stderr);
  console.error("DSG-GT-000 FAIL check-static.mjs did not pass");
  process.exit(1);
}

console.log("DSG-GT-000 PASS check-static.mjs passed");

const goldenDoc = readText(goldenDocPath);
const snapshot = readText(snapshotPath);
const contracts = contractPaths.map(readText).join("\n");
let ok = true;

const snapshotEvidence = [
  "Designer Agent",
  "Produce strong, practical UX direction",
  "optional per round",
  "real UX",
  "design-contributor",
  "targeted-local",
  "READY",
  "BLOCKED",
  "VALIDATION PACK",
  "does not implement",
  "does not write durable documentation",
  "does not call or perform `Resync`",
];

const contractEvidence = [
  "DRAFT_INITIAL_DESIGNER_KERNEL",
  "optional per round",
  "real UX impact",
  "required",
  "advisory",
  "no durable docs",
  "no `VALIDATION PACK` ownership",
  "no `EXECUTION PACKAGE` ownership",
  "no implementation",
  "no validation running",
  "no resync/finalization",
];

if (!hasAll(snapshot, snapshotEvidence)) {
  console.error("DSG-GT-BASE FAIL local snapshot is missing designer behavior evidence");
  ok = false;
}

if (!hasAll(contracts, contractEvidence)) {
  console.error("DSG-GT-BASE FAIL contracts are missing designer kernel evidence");
  ok = false;
}

for (const fixture of negativeFixtures) {
  const failures = [];
  for (const [index, input] of fixture.inputs.entries()) {
    const blockers = classifyNegativeFixture(input);
    const missingBlockers = fixture.expectedBlockers.filter(
      (blocker) => !blockers.includes(blocker),
    );
    const unexpectedBlockers = blockers.filter(
      (blocker) => !fixture.expectedBlockers.includes(blocker),
    );
    for (const blocker of missingBlockers) {
      failures.push(`variant ${index + 1} accepted without ${blocker}`);
    }
    for (const blocker of unexpectedBlockers) {
      failures.push(`variant ${index + 1} matched unexpected ${blocker}`);
    }
  }
  if (failures.length === 0) {
    console.log(`${fixture.id} PASS ${fixture.title}`);
  } else {
    ok = false;
    for (const failure of failures) console.error(`${fixture.id} FAIL ${failure}`);
  }
}

for (const test of goldenTests) {
  const section = sectionFor(goldenDoc, test.id);
  const failures = [];
  if (!section.startsWith(`## Golden Test ${test.id} - ${test.title}`)) {
    failures.push("missing or mismatched heading");
  }
  for (const [heading, phrases] of Object.entries(test.sections)) {
    const subsection = subsectionFor(section, heading);
    if (!subsection) {
      failures.push(`missing ${heading}`);
      continue;
    }
    if (!hasAll(subsection, phrases)) {
      failures.push(`${heading} missing local semantic evidence`);
    }
  }
  const failCondition = subsectionFor(section, "### Fail condition");
  if (!failCondition.includes(`Expected blocker: \`${test.blocker}\`.`)) {
    failures.push(`missing blocker ${test.blocker}`);
  }

  if (failures.length === 0) {
    console.log(`${test.id} PASS ${test.title}`);
  } else {
    ok = false;
    for (const failure of failures) console.error(`${test.id} FAIL ${failure}`);
  }
}

if (!ok) process.exit(1);
