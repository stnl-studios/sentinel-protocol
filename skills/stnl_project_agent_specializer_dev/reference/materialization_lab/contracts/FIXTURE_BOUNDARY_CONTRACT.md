# Fixture Boundary Contract

Status: documentary/dev-only contract.

This contract defines the documentary boundary for possible future fixtures in
the materialization lab. This task does not create fixtures. Fixture creation
may occur only in a later step that explicitly authorizes fixture creation,
scope, paths, scripts or checkers, and validation use.

## Future Fixture Root

The only future path currently eligible for authorized fixtures is:

- `skills/stnl_project_agent_specializer_dev/reference/materialization_lab/fixtures/`

This path is only a future allowed root. Its mention here does not create the
directory, does not authorize fixture content, and does not authorize any
fixture read/write in this task.

Future fixtures must simulate controlled target project roots. They must never
use a real target project root as the fixture root and must never read from or
write to a real target project as part of fixture setup, fixture execution, or
fixture validation.

## Target-Artifact Boundary Inside Fixtures

Future fixtures may contain `.github/**`, `.codex/**`, and `AGENTS.md` only
inside a fixture root authorized under
`skills/stnl_project_agent_specializer_dev/reference/materialization_lab/fixtures/`.

The same paths outside the authorized fixture root remain prohibited:

- `.github/**`
- `.codex/**`
- `AGENTS.md`

This prohibition applies in this repository root, in any real target project,
in the productive skill, and in any path that escapes the dev skill.

## Future Fixture Script And Checker Boundary

Future fixture scripts or checkers may accept only fixture paths that resolve
inside the authorized fixture root:

- `skills/stnl_project_agent_specializer_dev/reference/materialization_lab/fixtures/`

They must reject absolute paths, traversal paths, symlink-unsafe paths, real
target paths, and any path outside the dev skill. Fixture scripts or checkers
must remain dev-only and must not expand target read/write authority.

## Future Fixture Test Scope

Future fixture tests may validate only controlled materialization-lab behavior,
including:

- source model composition from `kernel_source`, `senior_profile_source`, and
  `template_source`;
- path safety;
- managed notice detection;
- unmanaged collision;
- invalid managed notice;
- drift classification;
- dry-run report shape;
- no-write enforcement.

These fixture tests must use simulated target project roots under the
authorized fixture root only.

Future fixtures, when explicitly authorized, must test the source model
`kernel_source + senior_profile_source + template_source`. They must not test
or require a base-agent-driven final source model.

## Explicit Non-Authorization

Fixtures do not authorize:

- target real read/write;
- GitHub writes;
- productive skill changes;
- real materialization;
- runtime materializer;
- overwrite of manual files outside a fixture;
- creation or alteration of `.github/**`, `.codex/**`, or `AGENTS.md` outside
  the authorized fixture root;
- changes to `skills/stnl_project_agent_specializer/`;
- generated final artifacts;
- persistent reports in this task.

## Blocking Rules

Use these fixture-boundary block codes exactly:

- `BLOCKED_FIXTURE_SCOPE_INVALID`: requested fixture use, fixture content,
  fixture script, or fixture checker is outside the future fixture scope
  allowed by this contract.
- `BLOCKED_FIXTURE_PATH_UNAUTHORIZED`: fixture path is outside
  `skills/stnl_project_agent_specializer_dev/reference/materialization_lab/fixtures/`
  or the fixture root has not been explicitly authorized in a later step.
- `BLOCKED_FIXTURE_TARGET_REAL`: a real target project root is used or read as
  a fixture root.
- `BLOCKED_FIXTURE_WRITE_OUTSIDE_ROOT`: fixture setup, fixture execution, or a
  fixture checker can write outside the authorized fixture root.
- `BLOCKED_FIXTURE_OUTPUT_UNAUTHORIZED`: fixture flow creates or plans output
  that is not explicitly authorized by a later fixture step.
- `BLOCKED_FIXTURE_ESCAPES_DEV_SKILL`: fixture path, script, checker, or
  output escapes `skills/stnl_project_agent_specializer_dev/`.

All fixture blocks are fail-closed. A blocked future fixture flow must not
proceed to fixture creation, target inspection, target mutation, GitHub writes,
productive-skill mutation, report generation, or materialization.
