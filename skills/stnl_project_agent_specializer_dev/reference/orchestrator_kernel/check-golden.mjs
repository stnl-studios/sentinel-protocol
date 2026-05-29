#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const kernelRoot = path.dirname(scriptPath);
const devSkillRoot = path.resolve(kernelRoot, "..", "..");
const realDevSkillRoot = fs.realpathSync.native(devSkillRoot);
const staticHarnessPath = path.join(kernelRoot, "check-static.mjs");

const ignoredNames = new Set(["__MACOSX", ".DS_Store"]);

const goldenTestsPath = "reference/orchestrator_kernel/GOLDEN_TESTS.md";
const implementedTests = ["GT-001", "GT-002"];

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

function toDevPath(relativePath) {
  if (hasIgnoredPart(relativePath)) {
    return { ignored: true, path: null };
  }

  const absolutePath = path.resolve(devSkillRoot, relativePath);
  if (!isInside(absolutePath, devSkillRoot)) {
    throw new Error(`path escapes dev skill: ${relativePath}`);
  }

  return { ignored: false, path: absolutePath };
}

function realPathInsideDev(absolutePath) {
  const realPath = fs.realpathSync.native(absolutePath);
  if (!isInside(realPath, realDevSkillRoot)) {
    throw new Error(`path escapes dev skill after realpath: ${absolutePath}`);
  }
  return realPath;
}

function readText(relativePath) {
  const resolved = toDevPath(relativePath);
  if (resolved.ignored) return "";
  return fs.readFileSync(realPathInsideDev(resolved.path), "utf8");
}

function sectionFromH2(markdown, headingPattern) {
  const match = headingPattern.exec(markdown);
  if (!match) return "";

  const start = match.index;
  const rest = markdown.slice(start);
  const next = rest.slice(match[0].length).search(/^##\s+/m);
  return next === -1 ? rest : rest.slice(0, match[0].length + next);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function detailList(items, prefix) {
  return `${prefix}: ${items.slice(0, 4).join(", ")}${items.length > 4 ? ", ..." : ""}`;
}

function pass(id, detail = "contract present") {
  return { id, status: "PASS", detail };
}

function fail(id, blocker, detail) {
  return { id, status: "FAIL", blocker, detail };
}

function runStaticPrecondition() {
  let realStaticHarnessPath;
  try {
    if (!isInside(staticHarnessPath, devSkillRoot)) {
      throw new Error("check-static.mjs escapes dev skill");
    }
    realStaticHarnessPath = realPathInsideDev(staticHarnessPath);
  } catch (error) {
    return fail(
      "STATIC",
      "BLOCKED_GOLDEN_STATIC_CHECKS_FAILED",
      error instanceof Error ? error.message : String(error),
    );
  }

  const result = spawnSync(process.execPath, [realStaticHarnessPath], {
    cwd: devSkillRoot,
    encoding: "utf8",
    stdio: "pipe",
  });

  if (result.error) {
    return fail(
      "STATIC",
      "BLOCKED_GOLDEN_STATIC_CHECKS_FAILED",
      result.error.message,
    );
  }

  if (result.status !== 0) {
    const firstFailure = `${result.stdout || ""}\n${result.stderr || ""}`
      .split(/\r?\n/)
      .find((line) => /\bFAIL\b/.test(line));
    return fail(
      "STATIC",
      "BLOCKED_GOLDEN_STATIC_CHECKS_FAILED",
      firstFailure || `check-static.mjs exited ${result.status ?? "unknown"}`,
    );
  }

  return pass("STATIC", "check-static.mjs passed");
}

function exactGoldenTestIds(markdown) {
  return [...markdown.matchAll(/^## Golden Test (GT-\d{3})\b/gm)].map((match) => match[1]);
}

function hasAll(text, values) {
  return values.every((value) => text.includes(value));
}

function missingRules(section, rules) {
  const missing = [];

  for (const rule of rules) {
    if (rule.pattern && !rule.pattern.test(section)) {
      missing.push(rule.label);
      continue;
    }

    if (rule.any && !rule.any.some((pattern) => pattern.test(section))) {
      missing.push(rule.label);
      continue;
    }

    if (rule.allText && !hasAll(section, rule.allText)) {
      missing.push(rule.label);
      continue;
    }

    if (rule.allPatterns && !rule.allPatterns.every((pattern) => pattern.test(section))) {
      missing.push(rule.label);
    }
  }

  return missing;
}

function checkExactTestScope(markdown) {
  const ids = exactGoldenTestIds(markdown);
  const sortedActual = [...ids].sort();
  const sortedExpected = [...implementedTests].sort();
  const exact =
    sortedActual.length === sortedExpected.length &&
    sortedActual.every((id, index) => id === sortedExpected[index]) &&
    !/\bGT-003\b/.test(markdown);

  if (!exact) {
    return fail(
      "GT-SCOPE",
      "BLOCKED_GOLDEN_SCOPE_DRIFT",
      `expected exactly ${implementedTests.join(", ")}; found ${ids.join(", ") || "none"}`,
    );
  }

  return pass("GT-SCOPE", "exactly GT-001 and GT-002 defined");
}

function checkGt001(markdown) {
  const section = sectionFromH2(markdown, /^## Golden Test GT-001\b.*$/m);
  if (!section) {
    return fail(
      "GT-001",
      "BLOCKED_GOLDEN_SIMPLE_REQUEST_ACTIVATED_HEAVY_PATH",
      "missing GT-001 section",
    );
  }

  const missing = missingRules(section, [
    {
      label: "simple routing or clarification request",
      pattern: /simple routing or clarification request/i,
    },
    {
      label: "Gate 0 always-on",
      any: [/Gate 0 is always applied/i, /Gate 0 always applies/i],
    },
    {
      label: "only lightweight modules when eligible",
      allText: ["routing.basic", "context.missing_info", "validation.boundary"],
      allPatterns: [/Only lightweight modules may be considered when eligible/i],
    },
    {
      label: "routing.execution_package blocked without prerequisites",
      allText: ["routing.execution_package"],
      allPatterns: [/without upstream context,\s+scope,\s+and authorization/i],
    },
    {
      label: "materialization.experimental blocked",
      allText: ["materialization.experimental"],
      allPatterns: [/must remain blocked/i],
    },
    {
      label: "checks.static not real execution",
      allText: ["checks.static"],
      allPatterns: [/must remain without real execution/i],
    },
    {
      label: "tests.golden_critical not real execution",
      allText: ["tests.golden_critical"],
      allPatterns: [/must remain without real execution/i],
    },
    {
      label: "forbidden final writes and artifacts",
      allText: [
        ".github/**",
        ".codex/**",
        "AGENTS.md",
        "production templates",
        "sentinel.mjs",
        "scripts/sentinel-smoke.mjs",
      ],
      allPatterns: [/final artifact writes/i],
    },
    {
      label: "complete Project Senior Profile prohibited",
      pattern: /complete Project Senior Profile requirement/i,
    },
    {
      label: "PASS condition",
      pattern: /^### PASS Condition\s*$/m,
    },
    {
      label: "FAIL condition",
      pattern: /^### FAIL Condition\s*$/m,
    },
    {
      label: "expected blocker",
      allText: ["BLOCKED_GOLDEN_SIMPLE_REQUEST_ACTIVATED_HEAVY_PATH"],
    },
  ]);

  if (missing.length > 0) {
    return fail(
      "GT-001",
      "BLOCKED_GOLDEN_SIMPLE_REQUEST_ACTIVATED_HEAVY_PATH",
      detailList(missing, "missing/weakened"),
    );
  }

  return pass("GT-001", "simple request contract holds");
}

function checkGt002(markdown) {
  const section = sectionFromH2(markdown, /^## Golden Test GT-002\b.*$/m);
  if (!section) {
    return fail(
      "GT-002",
      "BLOCKED_GOLDEN_EXPERIMENTAL_MATERIALIZATION_ESCAPED_PRECONDITIONS",
      "missing GT-002 section",
    );
  }

  const missing = missingRules(section, [
    {
      label: "experimental orchestrator-kernel materialization request",
      pattern: /request to experimentally materialize the orchestrator kernel/i,
    },
    {
      label: "Gate 0 always-on",
      any: [/Gate 0 is always applied/i, /Gate 0 always applies/i],
    },
    {
      label: "materialization.experimental relevant but blocked without flag",
      allText: ["materialization.experimental", "--allow-experimental-materialization"],
      allPatterns: [/identified as relevant,\s+but blocked without/i],
    },
    {
      label: "checks.static read-only contract/harness not materialization authorization",
      allText: ["checks.static", "read-only", "harness"],
      allPatterns: [/not .*authorization .*materialization|not .*materialization authorization|does not authorize materialization/i],
    },
    {
      label: "tests.golden_critical local harness not materialization authorization",
      allText: ["tests.golden_critical", "local", "harness"],
      allPatterns: [/not .*authorization .*materialization|not .*materialization authorization|does not authorize materialization/i],
    },
    {
      label: "blocked or safe-stop output",
      pattern: /Output must be `BLOCKED` or `SAFE_STOP`/i,
    },
    {
      label: "missing preconditions named",
      allPatterns: [
        /explicit authorization/i,
        /--allow-experimental-materialization/i,
        /isolated generated output path/i,
        /authority for final artifacts?|authority to write final artifacts?/i,
      ],
    },
    {
      label: "forbidden final writes and artifacts",
      allText: [
        ".github/**",
        ".codex/**",
        "AGENTS.md",
        "templates/agents/orchestrator.agent.md",
        "sentinel.mjs",
        "scripts/sentinel-smoke.mjs",
      ],
    },
    {
      label: "all-agent materialization prohibited",
      pattern: /materialization of all agents|materialize all agents/i,
    },
    {
      label: "complete Project Senior Profile prohibited",
      pattern: /complete Project Senior Profile/i,
    },
    {
      label: "PASS condition",
      pattern: /^### PASS Condition\s*$/m,
    },
    {
      label: "FAIL condition",
      pattern: /^### FAIL Condition\s*$/m,
    },
    {
      label: "expected blocker",
      allText: ["BLOCKED_GOLDEN_EXPERIMENTAL_MATERIALIZATION_ESCAPED_PRECONDITIONS"],
    },
  ]);

  if (missing.length > 0) {
    return fail(
      "GT-002",
      "BLOCKED_GOLDEN_EXPERIMENTAL_MATERIALIZATION_ESCAPED_PRECONDITIONS",
      detailList(missing, "missing/weakened"),
    );
  }

  return pass("GT-002", "experimental materialization authorization block contract holds");
}

function printResult(result) {
  const blocker = result.blocker ? ` ${result.blocker}` : "";
  console.log(`${result.id} ${result.status}${blocker} ${result.detail}`);
}

const staticResult = runStaticPrecondition();
if (staticResult.status === "FAIL") {
  for (const id of implementedTests) {
    printResult(fail(id, staticResult.blocker, staticResult.detail));
  }
  process.exit(1);
}

let markdown = "";
let scopeResult;
try {
  markdown = readText(goldenTestsPath);
  scopeResult = checkExactTestScope(markdown);
} catch (error) {
  scopeResult = fail(
    "GT-SCOPE",
    "BLOCKED_GOLDEN_SCOPE_DRIFT",
    error instanceof Error ? error.message : String(error),
  );
}

const results = scopeResult.status === "FAIL"
  ? [
      fail("GT-001", "BLOCKED_GOLDEN_SCOPE_DRIFT", scopeResult.detail),
      fail("GT-002", "BLOCKED_GOLDEN_SCOPE_DRIFT", scopeResult.detail),
    ]
  : [checkGt001(markdown), checkGt002(markdown)];

let failed = false;
for (const result of results) {
  if (result.status === "FAIL") failed = true;
  printResult(result);
}

process.exit(failed ? 1 : 0);
