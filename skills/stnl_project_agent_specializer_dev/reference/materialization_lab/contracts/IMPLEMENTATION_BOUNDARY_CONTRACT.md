# Implementation Boundary Contract

Status: documentary/dev-only contract.

This contract defines the documentary implementation boundary for a later,
separately authorized dev-only script layer in
`stnl_project_agent_specializer_dev`. It does not create scripts, runtime
entrypoints, fixtures, generated outputs, or target-project writes.

This contract prepares a future implementation step only. That later step must
remain dev-only, must be explicitly authorized, and must comply with every
read/write boundary below before any script is added or executed.

## Future Script Types

A later step may authorize only these dev-only script categories:

- static contract validator;
- source inventory validator;
- template coverage validator;
- render-context planner;
- dry-run output planner;
- validation report generator.

Any script category outside this list is out of scope unless this contract is
updated first in a documentary/dev-only change.

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

- runtime materializer;
- fixture creation;
- target writes;
- real materialization.

## Explicit Non-Authorization

This stage does not authorize:

- creation of scripts;
- runtime execution;
- fixtures;
- target writes;
- generated outputs;
- productive skill changes;
- GitHub writes;
- real materialization;
- runtime materializer;
- changes to `skills/stnl_project_agent_specializer/`;
- creation or alteration of `.github/**`, `.codex/**`, or `AGENTS.md` in this
  repo root or any target project.
