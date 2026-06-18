# Validation Harness Aggregator Contract

Status: documentary/dev-only contract.

This contract formalizes the future Validation Harness Aggregator for
`materialization_lab`. It does not create an executable checker, runner,
report model, dry-run report, materializer interface, target adapter, write
approval protocol, runtime materializer, runtime loader, renderer, writer,
scenario selector, target read/write flow, GitHub write flow, productive skill
change, or materialization.

The future aggregator is a validation coordinator only. It must run after the
current read-only child checks are contracted and before any later dry-run
report model, materializer interface contract, target adapter contract, write
approval protocol, materializer dry-run-only prototype, or real materializer.
It does not authorize those later phases.

## Explicit Non-Authorization

This contract does not authorize:

- does not authorize an executable aggregator checker in this phase;
- an aggregator runner in this phase;
- persistent reports, Markdown reports, JSON files, caches, snapshots, temp
  outputs, artifacts, dry-run reports, or target reports;
- a dry-run report model;
- a materializer interface;
- a target adapter;
- a write approval protocol;
- a runtime materializer, runtime renderer, runtime writer, runtime loader, or
  runtime scenario selector;
- target real read/write;
- GitHub write;
- changes to `skills/stnl_project_agent_specializer/`;
- productive skill authorization;
- `reference/agents/` as a final source;
- target path arguments;
- `.github/**`, `.codex/**`, or `AGENTS.md` outside authorized fixture
  documents;
- smoke-global execution.

The aggregator output is not a dry-run report. The aggregator result cannot be
used as permission to materialize, write, repair, delete, clean up, publish,
open a PR, or mutate any target.

## Official Child Check Checklist

The first executable aggregator version, if separately authorized later, must
use exactly this fixed child-check allowlist in this exact order:

1. `scripts/materialization_lab/check-static.mjs`

   Expected verdict:
   `MATERIALIZATION_STATIC_CONTRACT_CHECK: PASS`

2. `scripts/materialization_lab/check-source-inventory.mjs`

   Expected verdict:
   `MATERIALIZATION_SOURCE_INVENTORY_CHECK: PASS`

3. `scripts/materialization_lab/check-template-coverage.mjs`

   Expected verdict:
   `MATERIALIZATION_TEMPLATE_COVERAGE_CHECK: PASS`

4. `scripts/materialization_lab/check-fixture-boundary.mjs`

   Expected verdict:
   `MATERIALIZATION_FIXTURE_BOUNDARY_CHECK: PASS`

5. `scripts/materialization_lab/check-lazy-load-fixtures.mjs`

   Expected verdict:
   `MATERIALIZATION_LAZY_LOAD_FIXTURE_CHECK: PASS`

6. `scripts/materialization_lab/check-project-scenarios.mjs`

   Expected verdict:
   `MATERIALIZATION_PROJECT_SCENARIO_FIXTURE_CHECK: PASS`

7. `scripts/materialization_lab/check-render-context.mjs`

   Expected verdict:
   `MATERIALIZATION_RENDER_CONTEXT_CHECK: PASS`

8. `scripts/materialization_lab/check-dry-run-plan.mjs`

   Expected verdict:
   `MATERIALIZATION_DRY_RUN_PLAN_CHECK: PASS`

9. `scripts/materialization_lab/check-fixture-render-dry-run-integration.mjs`

   Expected verdict:
   `MATERIALIZATION_FIXTURE_RENDER_DRY_RUN_INTEGRATION_CHECK: PASS`

Future aggregator expected verdict:

- `MATERIALIZATION_VALIDATION_HARNESS_AGGREGATOR_CHECK: PASS`

No other child check is authorized by this contract. Missing, renamed,
reordered, duplicated, unknown, or extra child checks block.

## Dependency Matrix

`check-static.mjs`:

- `depends_on: none`

`check-source-inventory.mjs`:

- `depends_on:`
- `check-static.mjs`

`check-template-coverage.mjs`:

- `depends_on:`
- `check-static.mjs`
- `check-source-inventory.mjs`

`check-fixture-boundary.mjs`:

- `depends_on:`
- `check-static.mjs`

`check-lazy-load-fixtures.mjs`:

- `depends_on:`
- `check-static.mjs`
- `check-fixture-boundary.mjs`

`check-project-scenarios.mjs`:

- `depends_on:`
- `check-static.mjs`
- `check-source-inventory.mjs`
- `check-template-coverage.mjs`
- `check-fixture-boundary.mjs`

`check-render-context.mjs`:

- `depends_on:`
- `check-static.mjs`
- `check-source-inventory.mjs`
- `check-template-coverage.mjs`
- `check-fixture-boundary.mjs`
- `check-project-scenarios.mjs`

`check-dry-run-plan.mjs`:

- `depends_on:`
- `check-static.mjs`
- `check-source-inventory.mjs`
- `check-template-coverage.mjs`
- `check-render-context.mjs`

`check-fixture-render-dry-run-integration.mjs`:

- `depends_on: all previous checks`

Downstream checks must not be treated as PASS if any dependency failed. A
future aggregator may stop on first block or mark downstream checks as
blocked/skipped, but the final result must be `BLOCKED`.

## Status Model

Child check statuses:

- `PASS`
- `BLOCKED`
- `SKIPPED`
- `INCONCLUSIVE`
- `UNKNOWN_CHECK`
- `CHECK_FAILED_TO_RUN`
- `CHECK_OUTPUT_UNRECOGNIZED`
- `CHECK_EXIT_CODE_MISMATCH`
- `CHECK_TIMED_OUT`

Final aggregator statuses in the first executable version:

- `PASS`
- `BLOCKED`

Mapping:

- `PASS` maps to `VALIDATION_PASS`
- anything else maps to `VALIDATION_BLOCKED`

## Fail-Closed Rules

The future aggregator must fail closed:

- final `PASS` is allowed only when all 9 mandatory checks return exactly the
  expected verdict line and exit code `0`;
- any `SKIPPED` status blocks;
- any `UNKNOWN_CHECK` status blocks;
- any `INCONCLUSIVE` status blocks;
- any missing check blocks;
- any child process failure blocks;
- any timeout blocks;
- exit code `0` without the exact expected PASS line blocks;
- the expected PASS line with any non-zero exit code blocks;
- stdout extra blocks in the first version, except a trailing newline;
- any stderr blocks, even with exit code `0`;
- child crash, `ENOENT`, or permission denied blocks;
- unknown block code remains blocking;
- downstream checks must not be treated as PASS when a dependency failed;
- first-block stop is allowed, and downstream blocked/skipped marking is
  allowed, but final result remains `BLOCKED`.

## Zero-Argument Policy

The first executable aggregator version must accept zero arguments only.

Any CLI argument blocks before executing any child check. Target paths are
never accepted. Flags such as `--json`, `--help`, and `--list-checks` are not
permitted in the first version. If JSON stdout is desired later, it requires a
separate contract.

The previous warning that `check-static.mjs` does not reject extra arguments by
itself is mitigated contractually by the aggregator: the future aggregator must
enforce zero arguments before any child process starts and must not pass CLI
arguments to child checks.

## Stdout And Report Policy

The first executable aggregator version is stdout-only.

It must not create:

- persistent reports;
- Markdown reports;
- JSON files;
- caches;
- snapshots;
- temp outputs;
- artifacts;
- dry-run reports;
- target reports.

Stdout may contain only the minimal contracted aggregate result. A dry-run
report model is a separate future phase. Validation Harness Aggregator output
is not a dry-run report.

## Future Child Process Policy

If a future executable aggregator is separately authorized, it must:

- use the fixed allowlist of the 9 child scripts in this contract;
- execute checks in series;
- use `process.execPath`;
- use `spawn` or `execFile` without a shell;
- not use shell `exec`;
- not accept child arguments;
- not pass target paths;
- use fixed cwd inside `skills/stnl_project_agent_specializer_dev/`;
- not accept custom environment through CLI;
- capture stdout, stderr, and exit code;
- apply a timeout per child check;
- treat timeout as `BLOCKED`;
- treat stderr as `BLOCKED`;
- treat unexpected output as `BLOCKED`;
- not persist results in any file;
- not execute smoke-global commands;
- not execute Git commands;
- not execute target real read/write.

## Aggregator Block Codes

The following aggregator-specific block codes are introduced because existing
codes do not precisely describe child-check aggregation failures:

- `BLOCKED_AGGREGATOR_UNKNOWN_CHECK`
- `BLOCKED_AGGREGATOR_CHECK_SKIPPED`
- `BLOCKED_AGGREGATOR_CHECK_FAILED`
- `BLOCKED_AGGREGATOR_CHECK_OUTPUT_UNRECOGNIZED`
- `BLOCKED_AGGREGATOR_EXIT_CODE_MISMATCH`
- `BLOCKED_AGGREGATOR_TARGET_ARG`
- `BLOCKED_AGGREGATOR_REPORT_UNAUTHORIZED`
- `BLOCKED_AGGREGATOR_RUNTIME_SCOPE`
- `BLOCKED_AGGREGATOR_DEPENDENCY_ORDER`
- `BLOCKED_AGGREGATOR_TIMEOUT`
- `BLOCKED_AGGREGATOR_STDERR_UNEXPECTED`
- `BLOCKED_AGGREGATOR_ARGUMENT_UNSUPPORTED`
- `BLOCKED_AGGREGATOR_CHILD_PROCESS_ERROR`

Unknown aggregator block codes must not be normalized or downgraded to
warnings. They block.

## Phase Ordering

This contract comes before:

- dry-run report model;
- materializer interface contract;
- target adapter contract;
- write approval protocol;
- materializer dry-run-only prototype;
- materializer real.

This contract does not authorize:

- dry-run report persistence;
- target adapter;
- target read/write;
- materializer;
- write approval;
- GitHub write.
