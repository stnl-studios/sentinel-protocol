# Dry Run And Write Boundary Contract

Status: documentary/dev-only contract.

This contract defines the dry-run output-plan and write-boundary requirements
for the future senior-agent materialization rewrite of
`stnl_project_agent_specializer_dev`. It is not a runtime materializer and does
not authorize writing generated artifacts.

## Non-Runtime Boundary

This phase does not write artifacts.

The contract only defines how a future materializer must plan writes before any
write can exist in a separately authorized phase. It must not create runtime
scripts, generated outputs, target-project files, `.github/**`, `.codex/**`,
`AGENTS.md`, fixtures, reports, or materialized agents.

Future writing, when it exists, may occur only after a dry-run output plan has
been produced, reviewed, and explicitly approved inside a later phase that
separately authorizes writes.

## Dry-Run Output Plan Requirement

A future materialization flow must produce a dry-run output plan before any
target-project write, generated artifact write, repair, delete, or cleanup.

The dry-run output plan is the only allowed decision surface for future writes.
During this documentary/dev-only phase, every operation in the plan is planned
only and writes nothing.

Each planned artifact entry must include at least:

- `target_id`
- `agent_id`
- `output_shape`
- `planned_path`
- `template_source`
- `base_agent_source`
- `senior_profile_source`
- `operation`
- `managed_artifact`
- `existing_file_state`
- `drift_status`
- `blocking_status`
- `block_code`

The plan must be reproducible from the explicit render context required by
`RENDERING_AND_COMPOSITION_CONTRACT.md` and the explicit target/template
contracts. Missing source, template, placeholder, render-safety, or composition
requirements remain blocking before any output decision.

## Planned Operations

The only future operations allowed in a dry-run output plan are:

- `CREATE_PLANNED`
- `UPDATE_PLANNED`
- `UNCHANGED_PLANNED`
- `BLOCKED_PLANNED`

These are dry-run plan operations only. In this documentary/dev-only phase,
none of these operations writes, creates, updates, deletes, repairs, formats, or
cleans target-project files.

## Output Path Mapping

Planned output paths must be relative to the target project root, never to the
skill repository, the dev skill directory, a template directory, a process
working directory, or a host absolute path.

The canonical planned output path mapping is:

- `copilot` agent: `.github/agents/<agent>.agent.md`
- `codex` agent: `.codex/agents/<agent>.toml`
- `codex` config: `.codex/config.toml`
- `codex` root instructions: `AGENTS.md`

Path traversal, absolute paths, paths outside the target project root, and
symlink-unsafe destinations must block before writing with
`BLOCKED_PATH_UNSAFE`. A missing, non-directory, inaccessible, or otherwise
invalid target project root must block with `BLOCKED_TARGET_ROOT_INVALID`.

## Managed Artifact Policy

Generated artifacts must contain a Sentinel managed notice that identifies the
artifact as managed and ties it to the explicit source template and target.

Artifacts without a valid managed notice must not be overwritten
automatically. A collision with a manual file blocks the plan entry with
`BLOCKED_UNMANAGED_COLLISION`.

An existing file with a malformed, contradictory, ambiguous, or unverifiable
managed notice blocks the plan entry with
`BLOCKED_INVALID_MANAGED_NOTICE`.

The `managed_artifact` field in the dry-run output plan must reflect whether
the existing or planned artifact is governed by a valid Sentinel managed notice.
It must not be inferred from path shape alone.

## Drift Policy

A future planner must classify drift without writing:

- artifact does not exist: `CREATE_PLANNED`
- artifact exists and matches the planned render: `UNCHANGED_PLANNED`
- artifact exists, is managed, and differs from the planned render:
  `UPDATE_PLANNED`
- artifact exists and is not managed: `BLOCKED_PLANNED` with
  `BLOCKED_UNMANAGED_COLLISION`
- artifact exists with an invalid managed notice: `BLOCKED_PLANNED` with
  `BLOCKED_INVALID_MANAGED_NOTICE`

Drift status must be computed from explicit sources, the planned render, and
the existing target-project file state. It must not be guessed from file names,
legacy runtime terminology, productive-skill files, or nearby artifacts.

## Blocking Rules

The future planner must fail closed before any target write or generated
artifact write.

Use these dry-run and write-boundary block codes exactly:

- `BLOCKED_TARGET_ROOT_INVALID`: target project root is absent, not a usable
  directory, inaccessible, or otherwise invalid for safe path resolution.
- `BLOCKED_PATH_UNSAFE`: planned destination is absolute, traverses outside the
  target project root, or is symlink-unsafe.
- `BLOCKED_UNMANAGED_COLLISION`: planned destination already exists without a
  valid Sentinel managed notice.
- `BLOCKED_INVALID_MANAGED_NOTICE`: planned destination contains a malformed,
  contradictory, ambiguous, or unverifiable managed notice.
- `BLOCKED_DRY_RUN_REQUIRED`: a write, repair, delete, cleanup, or mutation is
  attempted without a prior approved dry-run output plan.

The future planner must also preserve the rendering/composition and template
blocks defined by earlier contracts:

- `BLOCKED_SOURCE_MISSING`
- `BLOCKED_TEMPLATE_MISSING`
- `BLOCKED_PLACEHOLDER_MISSING`
- `BLOCKED_UNSAFE_RENDER`
- `BLOCKED_COMPOSITION_CONFLICT`

When any block applies, the planned artifact entry must use
`BLOCKED_PLANNED`, set `blocking_status`, and include the exact `block_code`.

## Explicit Non-Authorization

This contract does not authorize:

- runtime scripts;
- writes;
- target writes;
- generated outputs;
- target project mutation;
- productive skill changes;
- GitHub writes;
- inferred templates;
- inferred senior profiles;
- overwrite of manual files;
- real materialization;
- creation or alteration of `.github/**`, `.codex/**`, or `AGENTS.md` in this
  repo root or any target project;
- changes to `skills/stnl_project_agent_specializer/`.

Any future implementation that attempts to write without an approved dry-run
output plan must block with `BLOCKED_DRY_RUN_REQUIRED`.
