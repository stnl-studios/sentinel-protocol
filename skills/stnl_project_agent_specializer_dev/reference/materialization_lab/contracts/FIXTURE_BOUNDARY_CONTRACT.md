# Fixture Boundary Contract

Status: documentary/dev-only contract.

This contract defines the boundary for the materialization lab fixture
skeleton and controlled fixtures. The previous skeleton phase created the
fixture root, category READMEs, and documentary schema. This phase authorizes
complete documentary/dev-only fixture cases only under that root: positive
project fixtures, lazy-load trace fixtures, blocked-case fixtures, and minimal
expected-output snapshot fixtures. It does not create rendered outputs,
runtime fixtures, a scenario selector, a lazy-load runtime, a renderer, a
writer, target artifacts, or a runtime materializer.

This authorization covers complete positive fixtures and complete negative fixtures
only as documentary `FIXTURE.md` files. Rendered snapshots remain forbidden;
expected-output snapshot fixtures are minimal documentary metadata, not
rendered snapshots.

## Authorized Fixture Root

The only fixture root is:

- `skills/stnl_project_agent_specializer_dev/reference/materialization_lab/fixtures/`

The root must contain only documentary/dev-only fixture material and the
authorized fixture material:

- `README.md`
- `FIXTURE_SCHEMA.md`
- `projects/README.md`
- `expected_outputs/README.md`
- `expected_outputs/SNAPSHOT_POLICY.md`
- `lazy_load/README.md`
- `blocked_cases/README.md`
- authorized `projects/*/FIXTURE.md`
- authorized `expected_outputs/*/FIXTURE.md`
- authorized `lazy_load/*/FIXTURE.md`
- authorized `blocked_cases/*/FIXTURE.md`

The root and schema are mandatory for future fixture work. Missing root blocks
with `BLOCKED_FIXTURE_ROOT_MISSING`. Missing schema blocks with
`BLOCKED_FIXTURE_SCHEMA_MISSING`.

## Fixture Schema

Complete fixtures must follow
`reference/materialization_lab/fixtures/FIXTURE_SCHEMA.md`. The schema is
documentary only. It does not authorize runtime validation, target real
read/write, generated outputs, GitHub writes, productive-skill mutation, or a
runtime materializer.

Future fixture metadata must declare fixture identity, type, status, scenario,
purpose, dev-only/no-real-write flags, explicit source model, selected agents,
target surface, explicit template sources, lazy-load expectations, fixture-only
expected outputs, blocked expectations, target-safety constraints, and
validation expectations.

## Path Boundary

All fixture paths must resolve inside the authorized fixture root. Fixture
paths must be repository-relative paths under the root. Absolute paths,
traversal paths, symlink-unsafe paths, real target paths, and paths outside
`skills/stnl_project_agent_specializer_dev/` are prohibited.

Path violations block as follows:

- fixture root absent: `BLOCKED_FIXTURE_ROOT_MISSING`
- fixture schema absent: `BLOCKED_FIXTURE_SCHEMA_MISSING`
- fixture path outside the root: `BLOCKED_FIXTURE_PATH_UNAUTHORIZED`
- traversal path such as `../`: `BLOCKED_FIXTURE_PATH_TRAVERSAL`
- absolute path: `BLOCKED_FIXTURE_ABSOLUTE_PATH`
- path or output escaping the dev skill:
  `BLOCKED_FIXTURE_ESCAPES_DEV_SKILL`

## Target-Artifact Boundary Inside Fixtures

Fixture-only `.github/**`, `.codex/**`, and `AGENTS.md` may appear only as
documentary strings inside authorized `FIXTURE.md` files or snapshot policy
fixtures under the authorized fixture root. This phase does not create real
`.github/**`, `.codex/**`, or `AGENTS.md` files, even inside fixtures.

The same paths outside the authorized fixture root remain prohibited:

- `.github/**`
- `.codex/**`
- `AGENTS.md`

This prohibition applies in this repository root, in any real target project,
in the productive skill, and in any path that escapes the dev skill.

## Snapshot Versus Target Artifact

A fixture expected-output snapshot is documentary fixture data under
`reference/materialization_lab/fixtures/`. It is not a generated artifact, not
a target artifact, not materialization output, and not proof that target write
is safe.

A real target artifact is any `.github/**`, `.codex/**`, `AGENTS.md`, or other
materialized output outside the fixture root. Fixture snapshots never authorize
real target artifacts, target reads, target writes, overwrite of manual files,
or generated output writes.

## Authorized Fixture Matrix

The complete documentary fixture matrix authorized in this phase is:

- six positive project fixtures under `projects/`;
- four positive and four negative lazy-load trace fixtures under
  `lazy_load/`;
- ten negative blocked-case fixtures under `blocked_cases/`;
- `expected_outputs/SNAPSHOT_POLICY.md`;
- four minimal expected-output snapshot fixtures under `expected_outputs/`.

Any fixture outside this matrix blocks with `BLOCKED_FIXTURE_SCOPE_INVALID`.

## Fixture Test Scope

Fixture tests may validate only controlled materialization-lab behavior,
including:

- fixture boundary and root containment;
- fixture schema completeness;
- project scenario matrix coverage;
- source model composition from `kernel_source`, `senior_profile_source`, and
  `template_source`;
- explicit template selection and missing-template blocking;
- no inferred templates;
- path safety;
- managed notice detection;
- unmanaged collision;
- invalid managed notice;
- drift classification;
- expected output snapshot policy;
- dry-run report shape;
- lazy-load trace fixtures;
- blocked fixture cases;
- no-write enforcement.

Fixtures must use simulated target project roots under the authorized
fixture root only. They must never use a real target project root and must
never read from or write to a real target project as part of fixture setup,
fixture execution, or fixture validation.

Fixtures must test the source model
`kernel_source + senior_profile_source + template_source`. They must not test
or require a base-agent-driven final source model, and `reference/agents/`
must not become a final source.

## Explicit Non-Authorization

Fixtures do not authorize:

- target real read/write;
- GitHub writes;
- productive skill changes;
- productive template changes;
- real materialization;
- runtime materializer;
- runtime loader;
- renderer;
- writer;
- scenario selector;
- overwrite of manual files outside a fixture;
- creation or alteration of `.github/**`, `.codex/**`, or `AGENTS.md` outside
  the authorized fixture root;
- changes to `skills/stnl_project_agent_specializer/`;
- generated final artifacts;
- persistent reports in this phase.

## Blocking Rules

Use these fixture-boundary block codes exactly:

- `BLOCKED_FIXTURE_ROOT_MISSING`: the fixture root is required by a fixture
  phase or fixture validation and is absent.
- `BLOCKED_FIXTURE_SCHEMA_MISSING`: `FIXTURE_SCHEMA.md` is required by a
  fixture phase or fixture validation and is absent.
- `BLOCKED_FIXTURE_SCOPE_INVALID`: requested fixture use, fixture content,
  fixture script, or fixture checker is outside the fixture scope allowed by
  this contract.
- `BLOCKED_FIXTURE_PATH_UNAUTHORIZED`: fixture path is outside
  `skills/stnl_project_agent_specializer_dev/reference/materialization_lab/fixtures/`.
- `BLOCKED_FIXTURE_PATH_TRAVERSAL`: fixture path traverses outside the
  fixture root.
- `BLOCKED_FIXTURE_ABSOLUTE_PATH`: fixture path is absolute instead of
  repository-relative under the fixture root.
- `BLOCKED_FIXTURE_TARGET_REAL`: a real target project root is used or read as
  a fixture root.
- `BLOCKED_FIXTURE_WRITE_OUTSIDE_ROOT`: fixture setup, fixture execution, or a
  fixture checker can write outside the authorized fixture root.
- `BLOCKED_FIXTURE_OUTPUT_UNAUTHORIZED`: fixture flow creates or plans output
  that is not explicitly allowed by the fixture schema and fixture phase.
- `BLOCKED_FIXTURE_ESCAPES_DEV_SKILL`: fixture path, script, checker, or
  output escapes `skills/stnl_project_agent_specializer_dev/`.

All fixture blocks are fail-closed. A blocked future fixture flow must not
proceed to fixture creation, target inspection, target mutation, GitHub writes,
productive-skill mutation, report generation, runtime materializer creation,
or materialization. Fixture writes outside root remain prohibited.
