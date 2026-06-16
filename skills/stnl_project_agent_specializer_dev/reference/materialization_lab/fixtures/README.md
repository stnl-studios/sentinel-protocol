# Materialization Lab Fixtures

Status: documentary/dev-only skeleton.

This directory is the only fixture root for the materialization lab:

- `skills/stnl_project_agent_specializer_dev/reference/materialization_lab/fixtures/`

Fixtures in this tree are documentary/dev-only support for future validation.
They never authorize target real read/write, GitHub writes, runtime
materialization, a runtime materializer, productive-skill mutation, productive
template mutation, target writes, or writes outside this fixture root.

## Boundary

- Fixture files must live only under this fixture root.
- Fixture paths must not be absolute and must not traverse outside this root.
- Fixture data must not read from or write to a real target project.
- `.github/**`, `.codex/**`, and `AGENTS.md` may appear only as fixture-local
  examples or snapshots under this root.
- Real `.github/**`, `.codex/**`, and `AGENTS.md` paths outside this root
  remain prohibited.
- `reference/agents/` is only a temporary development parity baseline and must
  not be used as a final materialization source.
- Templates must be explicit and must not be inferred from target path,
  runtime naming, nearby files, or historical outputs.
- Lazy load is a safety contract, not an optimization.
- Loading all modules for completeness is a violation.
- Complete positive and negative fixture cases will be created in a later
  phase. This skeleton contains only documentation and category roots.

## Contents

- `FIXTURE_SCHEMA.md`: documentary schema for future fixture metadata.
- `projects/`: future positive project scenario fixtures.
- `expected_outputs/`: future fixture-only expected output snapshots.
- `lazy_load/`: future lazy-load trace fixtures.
- `blocked_cases/`: future negative fixture cases.

## Non-Authorization

This skeleton does not create a project scenario selector, lazy-load runtime,
renderer, writer, runtime materializer, target artifact, rendered snapshot,
GitHub write, target read, target write, or productive-skill change.
