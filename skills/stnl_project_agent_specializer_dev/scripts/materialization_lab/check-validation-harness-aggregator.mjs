#!/usr/bin/env node

import { spawn } from "node:child_process";
import { constants } from "node:fs";
import { access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const skillRoot = path.resolve(scriptDir, "../..");
const timeoutPerChildMs = 30_000;

const passVerdict = "MATERIALIZATION_VALIDATION_HARNESS_AGGREGATOR_CHECK: PASS";
const blockedVerdict =
  "MATERIALIZATION_VALIDATION_HARNESS_AGGREGATOR_CHECK: BLOCKED";

const blockCodes = {
  unknownCheck: "BLOCKED_AGGREGATOR_UNKNOWN_CHECK",
  checkSkipped: "BLOCKED_AGGREGATOR_CHECK_SKIPPED",
  checkFailed: "BLOCKED_AGGREGATOR_CHECK_FAILED",
  outputUnrecognized: "BLOCKED_AGGREGATOR_CHECK_OUTPUT_UNRECOGNIZED",
  exitCodeMismatch: "BLOCKED_AGGREGATOR_EXIT_CODE_MISMATCH",
  targetArg: "BLOCKED_AGGREGATOR_TARGET_ARG",
  reportUnauthorized: "BLOCKED_AGGREGATOR_REPORT_UNAUTHORIZED",
  runtimeScope: "BLOCKED_AGGREGATOR_RUNTIME_SCOPE",
  dependencyOrder: "BLOCKED_AGGREGATOR_DEPENDENCY_ORDER",
  timeout: "BLOCKED_AGGREGATOR_TIMEOUT",
  stderrUnexpected: "BLOCKED_AGGREGATOR_STDERR_UNEXPECTED",
  argumentUnsupported: "BLOCKED_AGGREGATOR_ARGUMENT_UNSUPPORTED",
  childProcessError: "BLOCKED_AGGREGATOR_CHILD_PROCESS_ERROR",
};

const childChecks = [
  {
    relativePath: "scripts/materialization_lab/check-static.mjs",
    expectedStdout: "MATERIALIZATION_STATIC_CONTRACT_CHECK: PASS",
  },
  {
    relativePath: "scripts/materialization_lab/check-source-inventory.mjs",
    expectedStdout: "MATERIALIZATION_SOURCE_INVENTORY_CHECK: PASS",
  },
  {
    relativePath: "scripts/materialization_lab/check-template-coverage.mjs",
    expectedStdout: "MATERIALIZATION_TEMPLATE_COVERAGE_CHECK: PASS",
  },
  {
    relativePath: "scripts/materialization_lab/check-fixture-boundary.mjs",
    expectedStdout: "MATERIALIZATION_FIXTURE_BOUNDARY_CHECK: PASS",
  },
  {
    relativePath: "scripts/materialization_lab/check-lazy-load-fixtures.mjs",
    expectedStdout: "MATERIALIZATION_LAZY_LOAD_FIXTURE_CHECK: PASS",
  },
  {
    relativePath: "scripts/materialization_lab/check-project-scenarios.mjs",
    expectedStdout: "MATERIALIZATION_PROJECT_SCENARIO_FIXTURE_CHECK: PASS",
  },
  {
    relativePath: "scripts/materialization_lab/check-render-context.mjs",
    expectedStdout: "MATERIALIZATION_RENDER_CONTEXT_CHECK: PASS",
  },
  {
    relativePath: "scripts/materialization_lab/check-dry-run-plan.mjs",
    expectedStdout: "MATERIALIZATION_DRY_RUN_PLAN_CHECK: PASS",
  },
  {
    relativePath: "scripts/materialization_lab/check-fixture-render-dry-run-integration.mjs",
    expectedStdout: "MATERIALIZATION_FIXTURE_RENDER_DRY_RUN_INTEGRATION_CHECK: PASS",
  },
];

function emitBlocked() {
  console.log(blockedVerdict);
  process.exitCode = 1;
}

function isFlagLike(argument) {
  return argument.startsWith("-");
}

function validateNoArguments() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    return null;
  }

  if (args.some(isFlagLike)) {
    return blockCodes.argumentUnsupported;
  }

  return blockCodes.targetArg;
}

function childPath(relativePath) {
  const resolved = path.resolve(skillRoot, relativePath);
  const relativeToRoot = path.relative(skillRoot, resolved);
  if (relativeToRoot.startsWith("..") || path.isAbsolute(relativeToRoot)) {
    return null;
  }
  return resolved;
}

function stdoutMatchesExpected(stdout, expectedStdout) {
  return (
    stdout === expectedStdout ||
    stdout === `${expectedStdout}\n` ||
    stdout === `${expectedStdout}\r\n`
  );
}

function childReturnedRecognizedFailure(stdout, expectedStdout) {
  const firstLine = stdout.split(/\r?\n/, 1)[0];
  const statusPrefix = expectedStdout.replace(": PASS", ": ");
  return (
    firstLine === `${statusPrefix}FAIL` ||
    firstLine === `${statusPrefix}BLOCKED`
  );
}

async function runChild(check) {
  const absoluteChildPath = childPath(check.relativePath);
  if (absoluteChildPath === null) {
    return { blockCode: blockCodes.unknownCheck };
  }

  try {
    await access(absoluteChildPath, constants.R_OK);
  } catch {
    return { blockCode: blockCodes.childProcessError };
  }

  return await new Promise((resolve) => {
    let stdout = "";
    let stderr = "";
    let spawnError = null;
    let timedOut = false;

    const child = spawn(process.execPath, [absoluteChildPath], {
      cwd: skillRoot,
      shell: false,
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true,
    });

    const timeout = setTimeout(() => {
      timedOut = true;
      child.kill("SIGTERM");
    }, timeoutPerChildMs);

    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");

    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("error", (error) => {
      spawnError = error;
    });
    child.on("close", (exitCode, signal) => {
      clearTimeout(timeout);

      if (timedOut) {
        resolve({ blockCode: blockCodes.timeout });
        return;
      }
      if (spawnError !== null) {
        resolve({ blockCode: blockCodes.childProcessError });
        return;
      }
      resolve({ stdout, stderr, exitCode, signal });
    });
  });
}

function validateChildResult(check, result) {
  if (result.blockCode) {
    return result.blockCode;
  }

  if (result.stderr !== "") {
    return blockCodes.stderrUnexpected;
  }

  const hasExpectedStdout = stdoutMatchesExpected(
    result.stdout,
    check.expectedStdout,
  );

  if (hasExpectedStdout && result.exitCode === 0 && result.signal === null) {
    return null;
  }

  if (hasExpectedStdout && result.exitCode !== 0) {
    return blockCodes.exitCodeMismatch;
  }

  if (result.signal !== null) {
    return blockCodes.childProcessError;
  }

  if (childReturnedRecognizedFailure(result.stdout, check.expectedStdout)) {
    return blockCodes.checkFailed;
  }

  if (result.exitCode === 0) {
    return blockCodes.outputUnrecognized;
  }

  return blockCodes.checkFailed;
}

async function main() {
  const argumentBlock = validateNoArguments();
  if (argumentBlock !== null) {
    emitBlocked();
    return;
  }

  for (const check of childChecks) {
    const result = await runChild(check);
    const blockCode = validateChildResult(check, result);
    if (blockCode !== null) {
      emitBlocked();
      return;
    }
  }

  console.log(passVerdict);
}

await main();
