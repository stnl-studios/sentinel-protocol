# Implementation Boundary Contract

Status: documentary/dev-only contract.

This contract defines the documentary implementation boundary for the
separately authorized dev-only script layer in
`stnl_project_agent_specializer_dev`. It authorizes only explicitly listed
dev-only/read-only validators and does not create runtime entrypoints,
fixtures, generated outputs, or target-project writes.

Any implementation step must remain dev-only, must be explicitly authorized,
and must comply with every read/write boundary below before any script is added
or executed.

## Future Script Types

A later step may authorize only these dev-only script categories:

- static contract validator;
- source inventory validator;
- template coverage validator;
- render-context planner;
- dry-run output planner;
- validation report generator;
- fixture validator;
- lazy-load fixture validator;
- project scenario matrix validator;
- expected output snapshot validator;
- blocked case validator;
- read-only fixture to render/dry-run integration validator;
- validation harness aggregator checker.

Any script category outside this list is out of scope unless this contract is
updated first in a documentary/dev-only change.

The fixture-related validator categories are dev-only validators. This phase
authorizes read-only fixture boundary, lazy-load fixture, and project scenario
fixture checkers under the materialization-lab script path. Those checkers may
read fixture files and contracts only; they must not write reports, target
files, GitHub, productive skill files, or generated outputs.

`scripts/materialization_lab/check-fixture-render-dry-run-integration.mjs` is
the read-only fixture to render/dry-run integration checker. It uses
normalized fixture projections only, accepts no target project path, imports no
write-capable filesystem API, creates no runtime materializer, renderer,
writer, loader, scenario selector, rendered output, snapshot, dry-run report,
or target artifact, and keeps the lazy-load gate independent. Its expected
dev-only verdict is
`MATERIALIZATION_FIXTURE_RENDER_DRY_RUN_INTEGRATION_CHECK: PASS`.

`scripts/materialization_lab/check-validation-harness-aggregator.mjs` is the
validation harness aggregator checker. It is dev-only/read-only and may only
coordinate the fixed 9 current materialization-lab child checks in the
contracted order. It accepts zero arguments, passes no arguments to children,
uses `process.execPath`, `child_process.spawn`, `shell: false`, a fixed cwd
inside `skills/stnl_project_agent_specializer_dev/`, stdout-only aggregate
verdicts, `timeout_per_child_check: 30 seconds`, no persistent report, no
target path, and no Git commands. It is not a generic runner and does not
authorize a target adapter, materializer
interface, write approval, runtime materializer, persistent report, dry-run
report persistence, target real read/write, renderer, writer, loader, scenario
selector, GitHub write, or productive skill mutation. Its expected dev-only
verdicts are `MATERIALIZATION_VALIDATION_HARNESS_AGGREGATOR_CHECK: PASS` and
`MATERIALIZATION_VALIDATION_HARNESS_AGGREGATOR_CHECK: BLOCKED`.

## Authorized Future Script Locations

Future scripts may live only under:

- `skills/stnl_project_agent_specializer_dev/scripts/materialization_lab/`

No other future script path is currently authorized. Any different dev-only
path must be explicitly registered in this contract before script creation.

## Future Read Boundary

Future scripts may read only:

- `skills/stnl_project_agent_specializer_dev/reference/**`
- `skills/stnl_project_agent_specializer_dev/README.md`
- `skills/stnl_project_agent_specializer_dev/SKILL.md`
- `skills/stnl_project_agent_specializer_dev/openai.yaml`
- a target project in read-only mode only when a later step explicitly
  authorizes dry-run against a target.

Read access does not imply write access, materialization authority, fixture
authority, or generated-output authority.

## Future Write Boundary

Future scripts must not write:

- any target project;
- `.github/**`;
- `.codex/**`;
- `AGENTS.md`;
- `skills/stnl_project_agent_specializer/`;
- GitHub;
- productive templates;
- historical audits.

Initially permitted future outputs, when separately authorized, may be only
dev-only reports in a path explicitly authorized by this contract. This task
does not authorize those outputs, does not create a report path, and does not
authorize generated outputs.

Any future script with write capability outside an explicitly authorized
dev-only report output must block.

## Blocking Rules

Use these implementation-boundary block codes exactly:

- `BLOCKED_IMPLEMENTATION_SCOPE_INVALID`: requested implementation category is
  outside the future script types allowed by this contract.
- `BLOCKED_SCRIPT_PATH_UNAUTHORIZED`: script location is outside
  `skills/stnl_project_agent_specializer_dev/scripts/materialization_lab/` and
  no other dev-only path is explicitly registered in this contract.
- `BLOCKED_SCRIPT_WRITE_CAPABILITY`: script has write capability outside an
  explicitly authorized dev-only report output.
- `BLOCKED_SCRIPT_TARGET_MUTATION`: script can create, update, delete, repair,
  clean, or mutate any target project file, including `.github/**`,
  `.codex/**`, or `AGENTS.md`.
- `BLOCKED_SCRIPT_PRODUCTIVE_MUTATION`: script can alter
  `skills/stnl_project_agent_specializer/`, productive templates, historical
  audits, or any productive-skill surface.
- `BLOCKED_SCRIPT_OUTPUT_UNAUTHORIZED`: script creates or plans an output path
  not explicitly authorized by this contract for a later dev-only report
  phase.

All blocks are fail-closed. A blocked future implementation must not proceed
to script creation, script execution, report generation, target inspection
beyond authorized read-only dry-run, or materialization.

## Out Of Scope

The following remain out of scope:

- generic runner;
- target adapter;
- materializer interface;
- write approval;
- runtime materializer;
- persistent report;
- target real read/write;
- runtime fixture creation outside the authorized documentary matrix;
- target writes;
- real materialization.

## Explicit Non-Authorization

This stage does not authorize:

- creation of scripts outside the explicitly listed dev-only/read-only
  categories;
- runtime execution;
- runtime fixtures outside the authorized documentary matrix;
- target writes;
- generated outputs;
- persistent reports;
- target adapter;
- materializer interface;
- write approval;
- productive skill changes;
- GitHub writes;
- real materialization;
- runtime materializer;
- changes to `skills/stnl_project_agent_specializer/`;
- creation or alteration of `.github/**`, `.codex/**`, or `AGENTS.md` in this
  repo root or any target project.
